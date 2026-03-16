const {getCliClient} = require('sanity/cli')

function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const cars = [
  {
    title: 'Tesla Model 3 2022 RWD 42000km',
    brand: 'Tesla',
    model: 'Model 3',
    variant: 'RWD',
    price: 28900,
    year: 2022,
    mileage: 42000,
    drive: 'RWD',
    range: 491,
    battery: 60,
    batteryChemistry: 'LFP',
    colorExterior: 'White',
    colorInterior: 'Black',
    description: 'Tesla Pre-Owned vehicle with transparent presentation and curated buying experience.',
    conditionSummary: 'Very good overall condition.',
    originCountry: 'Germany',
    ownersCount: 1,
    serviceInfo: 'Service history available.',
    accidentInfo: 'No known major accidents.',
    status: 'available',
    featured: false,
    highlights: ['Low mileage', 'LFP battery', 'Tesla Pre-Owned Certified positioning'],
    teslaWarrantyUsedUntilDate: null,
    teslaWarrantyUsedUntilKm: null,
    teslaWarrantyBatteryUntilDate: null,
    teslaWarrantyBatteryUntilKm: null,
  },
  {
    title: 'Tesla Model Y 2023 AWD 31000km',
    brand: 'Tesla',
    model: 'Model Y',
    variant: 'Long Range',
    price: 37900,
    year: 2023,
    mileage: 31000,
    drive: 'AWD',
    range: 533,
    battery: 75,
    batteryChemistry: 'NMC',
    colorExterior: 'Midnight Silver',
    colorInterior: 'Black',
    description: 'Clean Tesla Model Y with balanced specs and clear documentation.',
    conditionSummary: 'Clean condition inside and out.',
    originCountry: 'Netherlands',
    ownersCount: 1,
    serviceInfo: 'Tesla service records available.',
    accidentInfo: 'No known accidents.',
    status: 'available',
    featured: true,
    highlights: ['AWD', 'Long Range', 'Featured car'],
    teslaWarrantyUsedUntilDate: null,
    teslaWarrantyUsedUntilKm: null,
    teslaWarrantyBatteryUntilDate: null,
    teslaWarrantyBatteryUntilKm: null,
  },
  {
    title: 'Tesla Model 3 2021 Performance 58000km',
    brand: 'Tesla',
    model: 'Model 3',
    variant: 'Performance',
    price: 33900,
    year: 2021,
    mileage: 58000,
    drive: 'AWD',
    range: 547,
    battery: 75,
    batteryChemistry: 'NCA',
    colorExterior: 'Red',
    colorInterior: 'White',
    description: 'Performance-oriented Tesla with strong specs and transparent presentation.',
    conditionSummary: 'Good condition with normal wear.',
    originCountry: 'Belgium',
    ownersCount: 2,
    serviceInfo: 'Service history partially available.',
    accidentInfo: 'Minor cosmetic repair reported.',
    status: 'reserved',
    featured: false,
    highlights: ['Performance', 'AWD', 'White interior'],
    teslaWarrantyUsedUntilDate: null,
    teslaWarrantyUsedUntilKm: null,
    teslaWarrantyBatteryUntilDate: null,
    teslaWarrantyBatteryUntilKm: null,
  },
]

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
  parts.push(doc.title || [doc.brand || 'Tesla', doc.model, doc.variant].filter(Boolean).join(' ') || 'Tesla vehicle')
  if (doc.mileage) parts.push(`${doc.mileage} km`)
  if (doc.drive) parts.push(doc.drive)
  if (doc.batteryChemistry) parts.push(doc.batteryChemistry)
  if (doc.colorExterior) parts.push(doc.colorExterior)
  if (doc.status) parts.push(`status: ${doc.status}`)

  return `${parts.join(' • ')}. Available through Voltique with transparent presentation and a curated Tesla buying experience.`
}

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})

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
      slug: {
        _type: 'slug',
        current: slug,
      },
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
