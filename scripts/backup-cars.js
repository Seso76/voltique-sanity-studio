const {getCliClient} = require('sanity/cli')
const fs = require('fs')

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})
  const docs = await client.fetch('*[_type == "car"] | order(_createdAt asc)')

  if (!docs || !docs.length) {
    throw new Error('No car documents found')
  }

  const ts = new Date().toISOString().replace(/[:.]/g, '-')
  const file = `backups/cars-${ts}.json`
  fs.writeFileSync(file, JSON.stringify(docs, null, 2), 'utf8')
  console.log(`Backup written to ${file}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
