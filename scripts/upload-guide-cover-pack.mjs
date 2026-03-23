import fs from 'fs'
import path from 'path'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '45q738u1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const coverDir = path.join(process.cwd(), 'scripts', 'generated-guide-covers')

const altMap = {
  'tesla-model-3-buying-guide': 'Tesla Model 3 guide cover',
  'tesla-model-y-buying-guide': 'Tesla Model Y guide cover',
  'used-tesla-checklist': 'Used Tesla checklist cover',
  'tesla-battery-health-explained': 'Tesla battery health guide cover',
  'lfp-vs-nca-tesla-batteries': 'Tesla battery chemistry comparison cover',
  'tesla-charging-guide-europe': 'Tesla charging guide cover',
  'tesla-supercharger-costs-europe': 'Tesla Supercharger cost guide cover',
  'tesla-model-3-vs-bmw-i4': 'Tesla Model 3 vs BMW i4 comparison cover',
  'tesla-model-y-vs-audi-q4-etron': 'Tesla Model Y vs Audi Q4 e-tron comparison cover',
  'used-tesla-prices-europe': 'Used Tesla prices in Europe cover',
  'tesla-ownership-costs-europe': 'Tesla ownership costs guide cover',
  'tesla-pre-owned-program': 'Tesla Pre-Owned program guide cover',
}

async function main() {
  const files = fs.readdirSync(coverDir).filter((f) => f.endsWith('.svg')).sort()

  for (const file of files) {
    const slug = file.replace(/\.svg$/i, '')
    const filePath = path.join(coverDir, file)

    const doc = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{_id, slug}`,
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
          alt: altMap[slug] ?? `${slug} cover`,
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      })
      .commit()

    console.log(`patched coverImage for ${slug}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
