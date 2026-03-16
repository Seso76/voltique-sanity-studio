const {getCliClient} = require('sanity/cli')

function hasYearInTitle(title, year) {
  if (!title || !year) return false
  return new RegExp(`\\b${year}\\b`).test(title)
}

function buildSeoTitle(doc) {
  const parts = []

  if (doc.title) {
    parts.push(doc.title)
  } else {
    const fallback = [doc.brand || 'Tesla', doc.model, doc.variant].filter(Boolean).join(' ')
    parts.push(fallback || 'Tesla')
  }

  if (doc.year && !hasYearInTitle(parts[0], doc.year)) {
    parts.push(String(doc.year))
  }

  return `${parts.join(' ')} | Tesla Pre-Owned Certified | Voltique`
}

function buildSeoDescription(doc) {
  const parts = []

  const title = doc.title || [doc.brand || 'Tesla', doc.model, doc.variant].filter(Boolean).join(' ') || 'Tesla vehicle'
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
      brand,
      model,
      variant,
      year,
      mileage,
      drive,
      batteryChemistry,
      colorExterior,
      status,
      slug
    }
  `)

  if (!docs || !docs.length) {
    throw new Error('No published car documents found')
  }

  for (const doc of docs) {
    await client
      .patch(doc._id)
      .set({
        brand: doc.brand || 'Tesla',
        seoTitle: buildSeoTitle(doc),
        seoDescription: buildSeoDescription(doc),
      })
      .commit()

    console.log(`Updated published car: ${doc._id} | ${doc.title || 'Untitled'}`)
  }

  console.log(`Done. Updated ${docs.length} published car document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
