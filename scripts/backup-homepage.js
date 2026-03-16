const {getCliClient} = require('sanity/cli')
const fs = require('fs')

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})
  const doc = await client.fetch('*[_type == "homepage"][0]')

  if (!doc || !doc._id) {
    throw new Error('No homepage document found')
  }

  const ts = new Date().toISOString().replace(/[:.]/g, '-')
  const file = `backups/homepage-${ts}.json`
  fs.writeFileSync(file, JSON.stringify(doc, null, 2), 'utf8')
  console.log(`Backup written to ${file}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
