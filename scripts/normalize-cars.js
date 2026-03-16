const {getCliClient} = require('sanity/cli')

function detectModel(title = '') {
  const t = title.toLowerCase()

  if (t.includes('model 3')) return 'Model 3'
  if (t.includes('model y')) return 'Model Y'
  if (t.includes('model s')) return 'Model S'
  if (t.includes('model x')) return 'Model X'

  return null
}

function normalizeDrive(drive) {
  if (!drive) return null
  const d = String(drive).trim().toLowerCase()

  if (d === 'rwd') return 'RWD'
  if (d === 'awd') return 'AWD'

  return drive
}

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})
  const docs = await client.fetch(`
    *[_type == "car" && !(_id in path("drafts.**"))]{
      _id,
      title,
      model,
      drive
    }
  `)

  if (!docs || !docs.length) {
    throw new Error('No published car documents found')
  }

  for (const doc of docs) {
    const nextModel = doc.model || detectModel(doc.title)
    const nextDrive = normalizeDrive(doc.drive)

    await client
      .patch(doc._id)
      .set({
        ...(nextModel ? {model: nextModel} : {}),
        ...(nextDrive ? {drive: nextDrive} : {}),
      })
      .commit()

    console.log(`Normalized car: ${doc._id} | ${doc.title || 'Untitled'}`)
  }

  console.log(`Done. Normalized ${docs.length} published car document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
