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
      title: {
        _type: 'localeString',
        en: 'Voltique — Tesla Pre-Owned Certified',
        bg: 'Voltique — Tesla Pre-Owned Certified',
      },
      seoTitle: {
        _type: 'localeString',
        en: 'Voltique — Tesla Pre-Owned Certified | Verified Tesla Cars',
        bg: 'Voltique — Tesla Pre-Owned Certified | Проверени Tesla автомобили',
      },
      seoDescription: {
        _type: 'localeText',
        en: 'Voltique presents Tesla Pre-Owned Certified vehicles with transparent information, curated selection and a calm buying experience.',
        bg: 'Voltique представя Tesla Pre-Owned Certified автомобили с прозрачна информация, подбрана селекция и спокоен процес на покупка.',
      },
      heroTitle: {
        _type: 'localeString',
        en: 'Tesla Pre-Owned Certified — selected with care',
        bg: 'Tesla Pre-Owned Certified — подбрани с внимание',
      },
      heroSubtitle: {
        _type: 'localeText',
        en: 'Browse carefully selected Tesla Pre-Owned Certified vehicles with clear specifications, transparent documentation and a clean buying experience.',
        bg: 'Разгледайте внимателно подбрани Tesla Pre-Owned Certified автомобили с ясни спецификации, прозрачна документация и изчистен процес на покупка.',
      },
      heroCTA: {
        _type: 'localeString',
        en: 'Explore available Tesla',
        bg: 'Разгледайте наличните Tesla',
      },
      intro: {
        _type: 'localeText',
        en: 'Voltique is a boutique Tesla platform focused on Tesla Pre-Owned Certified vehicles. Instead of overwhelming choice, the platform offers a curated selection with verified details, transparent presentation and practical support throughout the buying journey.',
        bg: 'Voltique е бутикова Tesla платформа, фокусирана върху Tesla Pre-Owned Certified автомобили. Вместо прекалено много избор, платформата предлага подбрана селекция с проверени детайли, прозрачно представяне и практическа подкрепа през целия процес на покупка.',
      },
      hero: {
        badge: {
          en: 'Tesla Pre-Owned Certified',
          bg: 'Tesla Pre-Owned Certified',
        },
        title: {
          en: 'Tesla Pre-Owned Certified — selected with care',
          bg: 'Tesla Pre-Owned Certified — подбрани с внимание',
        },
        subtitle: {
          en: 'Browse carefully selected Tesla Pre-Owned Certified vehicles with clear specifications, transparent documentation and a clean buying experience.',
          bg: 'Разгледайте внимателно подбрани Tesla Pre-Owned Certified автомобили с ясни спецификации, прозрачна документация и изчистен процес на покупка.',
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
