const {getCliClient} = require('sanity/cli')

const updates = [
  {
    slug: 'test-model-3',
    status: 'sold'
  },
  {
    slug: 'test-model-y',
    status: 'sold'
  },
  {
    slug: 'model-3-2021-lfp-61000km',
    status: 'reserved'
  }
]

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})

  for (const u of updates) {
    const doc = await client.fetch(
      '*[_type == "car" && slug.current == $slug][0]{_id,title}',
      {slug: u.slug}
    )

    if (!doc?._id) {
      console.log(`Car not found for slug: ${u.slug}`)
      continue
    }

    await client.patch(doc._id).set({status: u.status}).commit()

    console.log(`Updated status: ${doc.title} → ${u.status}`)
  }

  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
