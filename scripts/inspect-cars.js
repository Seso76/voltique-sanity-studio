const {getCliClient} = require('sanity/cli')

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})

  const docs = await client.fetch(`
    *[_type == "car" && !(_id in path("drafts.**"))][0...50]{
      _id,
      _type,
      title,
      slug,
      brand,
      model,
      variant,
      featured,
      sortOrder,
      price,
      year,
      mileage,
      drive,
      range,
      battery,
      batteryChemistry,
      colorExterior,
      colorInterior,
      highlights,
      description,
      conditionSummary,
      originCountry,
      ownersCount,
      serviceInfo,
      accidentInfo,
      status,
      seoTitle,
      seoDescription,
      teslaWarrantyUsedUntilDate,
      teslaWarrantyUsedUntilKm,
      teslaWarrantyBatteryUntilDate,
      teslaWarrantyBatteryUntilKm
    }
  `)

  console.log(JSON.stringify(docs, null, 2))
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
