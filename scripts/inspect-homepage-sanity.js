const {getCliClient} = require('sanity/cli')

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})
  const homepage = await client.fetch('*[_type == "homepage"][0]')
  console.log(JSON.stringify(homepage, null, 2))
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
