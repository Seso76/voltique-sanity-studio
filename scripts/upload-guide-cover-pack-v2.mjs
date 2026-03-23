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

const coverDir = path.join(process.cwd(), 'scripts', 'generated-guide-covers-v2')

const altMap = {
  'used-tesla-checklist': 'Used Tesla checklist minimalist cover v2',
  'lfp-vs-nca-tesla-batteries': 'LFP vs NCA Tesla batteries minimalist cover v2',
  'tesla-pre-owned-program': 'Tesla Pre-Owned program minimalist cover v2',
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

    console.log(`patched v2 coverImage for ${slug}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
