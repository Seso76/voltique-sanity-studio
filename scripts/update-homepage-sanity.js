const {getCliClient} = require('sanity/cli')

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})

  const homepage = await client.fetch('*[_type == "homepage"][0]{_id}')

  if (!homepage || !homepage._id) {
    throw new Error('No homepage document found')
  }

  await client
    .patch(homepage._id)
    .set({
      hero: {
        badge: {
          en: 'Tesla Pre-Owned Certified',
          bg: 'Tesla Pre-Owned Certified',
        },
        title: {
          en: 'Verified Tesla inventory you can trust',
          bg: 'Проверени Tesla автомобили, на които можеш да се довериш',
        },
        subtitle: {
          en: 'Browse carefully selected Tesla Pre-Owned Certified vehicles with transparent details, clean presentation, and fast access to availability.',
          bg: 'Разгледай внимателно подбрани Tesla Pre-Owned Certified автомобили с прозрачни детайли, изчистено представяне и бърз достъп до наличностите.',
        },
      },
    })
    .commit({autoGenerateArrayKeys: true})

  console.log(`Homepage updated successfully: ${homepage._id}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
