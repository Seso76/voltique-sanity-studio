const {getCliClient} = require('sanity/cli')

function detectModel(title = '') {
  const t = String(title).toLowerCase()

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

function hasYearInTitle(title, year) {
  if (!title || !year) return false
  return new RegExp(`\\b${year}\\b`).test(String(title))
}

function buildSeoTitle(doc) {
  const baseTitle =
    doc.title ||
    [doc.brand || 'Tesla', doc.model, doc.variant].filter(Boolean).join(' ') ||
    'Tesla'

  const yearPart =
    doc.year && !hasYearInTitle(baseTitle, doc.year) ? ` ${doc.year}` : ''

  return `${baseTitle}${yearPart} | Tesla Pre-Owned Certified | Voltique`
}

function buildSeoDescription(doc) {
  const parts = []

  const title =
    doc.title ||
    [doc.brand || 'Tesla', doc.model, doc.variant].filter(Boolean).join(' ') ||
    'Tesla vehicle'

  parts.push(title)

  if (doc.mileage) parts.push(`${doc.mileage} km`)
  if (doc.drive) parts.push(doc.drive)
  if (doc.batteryChemistry) parts.push(doc.batteryChemistry)
  if (doc.colorExterior) parts.push(doc.colorExterior)
  if (doc.status) parts.push(`status: ${doc.status}`)

  return `${parts.join(' • ')}. Available through Voltique with transparent presentation and a curated Tesla buying experience.`
}

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})

  const docs = await client.fetch(`
    *[_type == "car" && !(_id in path("drafts.**"))]{
      _id,
      title,
      slug,
      brand,
      model,
      variant,
      year,
      mileage,
      drive,
      batteryChemistry,
      colorExterior,
      status
    }
  `)

  if (!docs || !docs.length) {
    throw new Error('No published car documents found')
  }

  for (const doc of docs) {
    const normalizedModel = doc.model || detectModel(doc.title)
    const normalizedDrive = normalizeDrive(doc.drive)

    const enrichedDoc = {
      ...doc,
      brand: doc.brand || 'Tesla',
      model: normalizedModel || doc.model,
      drive: normalizedDrive || doc.drive,
    }

    await client
      .patch(doc._id)
      .set({
        brand: enrichedDoc.brand,
        ...(enrichedDoc.model ? {model: enrichedDoc.model} : {}),
        ...(enrichedDoc.drive ? {drive: enrichedDoc.drive} : {}),
        seoTitle: buildSeoTitle(enrichedDoc),
        seoDescription: buildSeoDescription(enrichedDoc),
      })
      .commit()

    console.log(`Synced car: ${doc._id} | ${doc.title || 'Untitled'}`)
  }

  console.log(`Done. Synced ${docs.length} published car document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
