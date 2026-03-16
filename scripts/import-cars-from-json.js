const {getCliClient} = require('sanity/cli')
const fs = require('fs')

function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
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
  parts.push(
    doc.title ||
      [doc.brand || 'Tesla', doc.model, doc.variant].filter(Boolean).join(' ') ||
      'Tesla vehicle'
  )

  if (doc.mileage) parts.push(`${doc.mileage} km`)
  if (doc.drive) parts.push(doc.drive)
  if (doc.batteryChemistry) parts.push(doc.batteryChemistry)
  if (doc.colorExterior) parts.push(doc.colorExterior)
  if (doc.status) parts.push(`status: ${doc.status}`)

  return `${parts.join(' • ')}. Available through Voltique with transparent presentation and a curated Tesla buying experience.`
}

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})
  const cars = JSON.parse(fs.readFileSync('scripts/cars-to-import.json', 'utf8'))

  for (const car of cars) {
    const slug = slugify(car.title)

    const existing = await client.fetch(
      '*[_type == "car" && slug.current == $slug][0]{_id,title}',
      {slug}
    )

    if (existing?._id) {
      console.log(`Skipped existing car: ${existing._id} | ${existing.title}`)
      continue
    }

    const doc = {
      _type: 'car',
      ...car,
      brand: car.brand || 'Tesla',
      slug: {_type: 'slug', current: slug},
      seoTitle: buildSeoTitle(car),
      seoDescription: buildSeoDescription(car),
    }

    const created = await client.create(doc)
    console.log(`Created car: ${created._id} | ${created.title}`)
  }

  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
