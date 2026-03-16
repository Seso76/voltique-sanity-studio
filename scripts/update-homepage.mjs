import {createClient} from '@sanity/client'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const homepageData = {
  seo: {
    title: {
      en: 'Tesla Pre-Owned Certified | Verified Electric Cars',
      bg: 'Tesla Pre-Owned Certified | Проверени електрически автомобили',
    },
    description: {
      en: 'Explore Tesla Pre-Owned Certified vehicles with transparent information, trusted selection, and fast access to available stock.',
      bg: 'Разгледайте Tesla Pre-Owned Certified автомобили с прозрачна информация, подбран избор и бърз достъп до наличните обяви.',
    },
  },

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
    primaryCta: {
      label: {
        en: 'View available cars',
        bg: 'Виж наличните автомобили',
      },
      href: '/cars',
    },
    secondaryCta: {
      label: {
        en: 'Request consultation',
        bg: 'Поискай консултация',
      },
      href: '/contact',
    },
  },

  highlights: [
    {
      _key: 'tesla-certified',
      title: {
        en: 'Tesla Pre-Owned Certified',
        bg: 'Tesla Pre-Owned Certified',
      },
      text: {
        en: 'Focused selection of certified Tesla pre-owned vehicles.',
        bg: 'Фокусиран подбор от сертифицирани употребявани Tesla автомобили.',
      },
    },
    {
      _key: 'transparent-info',
      title: {
        en: 'Transparent information',
        bg: 'Прозрачна информация',
      },
      text: {
        en: 'Clean listings with clear specs, condition, and vehicle details.',
        bg: 'Изчистени обяви с ясни спецификации, състояние и детайли за автомобила.',
      },
    },
    {
      _key: 'fast-access',
      title: {
        en: 'Fast access to stock',
        bg: 'Бърз достъп до наличности',
      },
      text: {
        en: 'Quick overview of currently available Tesla vehicles.',
        bg: 'Бърз преглед на наличните в момента Tesla автомобили.',
      },
    },
  ],

  inventoryIntro: {
    title: {
      en: 'Only Tesla Pre-Owned Certified vehicles',
      bg: 'Само Tesla Pre-Owned Certified автомобили',
    },
    text: {
      en: 'Our platform is focused on Tesla Pre-Owned Certified inventory, presented in a clean and structured way for easier browsing and comparison.',
      bg: 'Платформата е фокусирана върху Tesla Pre-Owned Certified наличности, представени по изчистен и структуриран начин за по-лесно разглеждане и сравнение.',
    },
  },

  stats: [
    {
      _key: 'stat-1',
      value: '100%',
      label: {
        en: 'Tesla focused',
        bg: 'Фокус върху Tesla',
      },
    },
    {
      _key: 'stat-2',
      value: 'Certified',
      label: {
        en: 'Pre-Owned inventory',
        bg: 'сертифицирани наличности',
      },
    },
    {
      _key: 'stat-3',
      value: 'EU',
      label: {
        en: 'Market coverage',
        bg: 'пазарно покритие',
      },
    },
  ],
}

async function run() {
  if (!client.config().token) {
    throw new Error('Missing SANITY_API_TOKEN in environment variables.')
  }

  const homepage = await client.fetch(`*[_type == "homepage"][0]{_id}`)

  if (!homepage?._id) {
    throw new Error('No homepage document found. Make sure a document with _type == "homepage" exists.')
  }

  await client
    .patch(homepage._id)
    .set(homepageData)
    .commit({autoGenerateArrayKeys: true})

  console.log(`Homepage updated successfully: ${homepage._id}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
