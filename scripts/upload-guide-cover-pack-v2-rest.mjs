import fs from 'fs'
import path from 'path'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '45q738u1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN,
})

const coverDir = path.join(process.cwd(), 'scripts', 'generated-guide-covers-v2-rest')

const altMap = {
  'tesla-model-3-buying-guide': 'Tesla Model 3 buying guide minimalist cover v2',
  'tesla-model-y-buying-guide': 'Tesla Model Y buying guide minimalist cover v2',
  'tesla-battery-health-explained': 'Tesla battery health minimalist cover v2',
  'tesla-charging-guide-europe': 'Tesla charging guide Europe minimalist cover v2',
  'tesla-supercharger-costs-europe': 'Tesla Supercharger costs Europe minimalist cover v2',
  'tesla-model-3-vs-bmw-i4': 'Tesla Model 3 vs BMW i4 minimalist comparison cover v2',
  'tesla-model-y-vs-audi-q4-etron': 'Tesla Model Y vs Audi Q4 e-tron minimalist comparison cover v2',
  'used-tesla-prices-europe': 'Used Tesla prices Europe minimalist cover v2',
  'tesla-ownership-costs-europe': 'Tesla ownership costs Europe minimalist cover v2',
}

async function main() {
  const files = fs.readdirSync(coverDir).filter((f) => f.endsWith('.svg')).sort()

  for (const file of files) {
    const slug = file.replace(/\.svg$/i, '')
    const filePath = path.join(coverDir, file)

    const doc = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{_id}`,
      {slug}
    )

    if (!doc?._id) {
      console.log(`skip ${slug} (post not found)`)
      continue
    }

    const stream = fs.createReadStream(filePath)
    const asset = await client.assets.upload('image', stream, {
      filename: file,
      contentType: 'image/svg+xml',
    })

    await client
      .patch(doc._id)
      .set({
        coverImage: {
          _type: 'image',
          alt: altMap[slug] ?? `${slug} cover v2`,
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      })
      .commit()

    console.log(`patched v2-rest coverImage for ${slug}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
