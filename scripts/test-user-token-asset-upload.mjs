import fs from 'fs'
import path from 'path'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '45q738u1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const filePath = path.join(process.cwd(), 'scripts', 'generated-guide-covers-v2-rest', 'tesla-model-3-buying-guide.svg')

async function main() {
  const stream = fs.createReadStream(filePath)
  const asset = await client.assets.upload('image', stream, {
    filename: 'tesla-model-3-buying-guide.svg',
    contentType: 'image/svg+xml',
  })
  console.log(JSON.stringify(asset, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
