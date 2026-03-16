const {getCliClient} = require('sanity/cli')

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})
  const doc = await client.fetch('*[_type == "car" && !(_id in path("drafts.**"))][0]')
  console.log(JSON.stringify(doc, null, 2))
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
