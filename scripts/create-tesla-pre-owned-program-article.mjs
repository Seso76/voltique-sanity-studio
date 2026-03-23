import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '45q738u1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const slug = 'tesla-pre-owned-program'
const now = '2026-03-24T10:00:00Z'

const k = () => Math.random().toString(36).slice(2, 10)

const block = (style, text, extra = {}) => ({
  _type: 'block',
  _key: k(),
  ...(style ? {style} : {}),
  ...extra,
  children: [{_type: 'span', _key: k(), text}],
})

const item = (labelEn, labelBg, value, icon) => ({
  _type: 'guideVisualItem',
  _key: k(),
  label: {en: labelEn, bg: labelBg},
  value,
  icon,
})

const visual = (style, titleEn, titleBg, textEn, textBg, items) => ({
  _type: 'guideVisual',
  _key: k(),
  style,
  title: {en: titleEn, bg: titleBg},
  text: {en: textEn, bg: textBg},
  items,
})

const bodyEn = [
  visual(
    'statCard',
    'Tesla Pre-Owned buyer snapshot',
    'Обобщение за Tesla Pre-Owned',
    'Tesla Pre-Owned is usually not the cheapest route, but it can be one of the safest ways to buy a used Tesla when you value lower uncertainty, cleaner process and warranty support.',
    'Tesla Pre-Owned обикновено не е най-евтиният вариант, но често е един от най-сигурните начини за покупка на употребявана Tesla, ако цените по-нисък риск, по-чист процес и гаранционна сигурност.',
    [
      item('Main advantage', 'Основно предимство', 'Lower buyer risk', '✅'),
      item('Main trade-off', 'Основен компромис', 'Usually higher price', '💶'),
      item('Best for', 'Най-подходящо за', 'Buyers who value clarity', '🧭'),
    ]
  ),

  block('normal', 'Tesla Pre-Owned is Tesla’s own used-car channel. For many buyers, the biggest value is not just the car itself, but the lower uncertainty around inspection, warranty context and purchase flow.'),

  block('h2', 'What Tesla Pre-Owned usually includes'),
  block('normal', 'The exact package can vary by market and car, but in general Tesla Pre-Owned listings are attractive because the vehicle comes through Tesla’s own ecosystem rather than an unknown third-party path.'),
  block(null, 'Tesla-handled sales process', {listItem: 'bullet', level: 1}),
  block(null, 'Clearer ownership transition and account logic', {listItem: 'bullet', level: 1}),
  block(null, 'Potential warranty support or added warranty context depending on market and vehicle', {listItem: 'bullet', level: 1}),
  block(null, 'Higher buyer confidence than many random used listings', {listItem: 'bullet', level: 1}),

  block('h2', 'Main advantages'),
  block('normal', 'The biggest advantage is reduced buyer risk. You are usually paying not only for the car, but for a cleaner process and lower uncertainty.'),
  block(null, 'Lower risk than many private listings', {listItem: 'bullet', level: 1}),
  block(null, 'More trust in the transaction flow', {listItem: 'bullet', level: 1}),
  block(null, 'Better fit for buyers who want fewer surprises', {listItem: 'bullet', level: 1}),

  block('h2', 'What to verify carefully'),
  block('normal', 'Tesla Pre-Owned is not a magic shield. You still need to verify the exact condition, warranty coverage, cosmetic state and real fit for your use case.'),
  block(null, 'What warranty is active right now', {listItem: 'bullet', level: 1}),
  block(null, 'Whether extra warranty is included or not', {listItem: 'bullet', level: 1}),
  block(null, 'Battery, tyres, brakes and cosmetic condition', {listItem: 'bullet', level: 1}),
  block(null, 'Whether the price premium is justified versus private market options', {listItem: 'bullet', level: 1}),

  block('h2', 'Tesla Pre-Owned vs private seller'),
  block('normal', 'A private seller can offer a better headline price, but often with much more uncertainty. Tesla Pre-Owned usually makes more sense for buyers who prefer a cleaner risk profile over chasing the cheapest deal.'),

  block('h2', 'When it makes the most sense'),
  block('normal', 'Tesla Pre-Owned makes the most sense when you want a used Tesla but still care strongly about purchase confidence, warranty logic and a more structured buying path.'),

  block('h2', 'Practical takeaway'),
  block('normal', 'Think of Tesla Pre-Owned as a lower-risk lane, not necessarily a lower-price lane. If the warranty details are clear and the premium over the open market is reasonable, it can be one of the smartest ways to buy a used Tesla.'),
]

const bodyBg = [
  visual(
    'statCard',
    'Tesla Pre-Owned buyer snapshot',
    'Обобщение за Tesla Pre-Owned',
    'Tesla Pre-Owned is usually not the cheapest route, but it can be one of the safest ways to buy a used Tesla when you value lower uncertainty, cleaner process and warranty support.',
    'Tesla Pre-Owned обикновено не е най-евтиният вариант, но често е един от най-сигурните начини за покупка на употребявана Tesla, ако цените по-нисък риск, по-чист процес и гаранционна сигурност.',
    [
      item('Main advantage', 'Основно предимство', 'По-нисък риск за купувача', '✅'),
      item('Main trade-off', 'Основен компромис', 'Обикновено по-висока цена', '💶'),
      item('Best for', 'Най-подходящо за', 'Купувачи, които ценят яснота', '🧭'),
    ]
  ),

  block('normal', 'Tesla Pre-Owned е собственият канал на Tesla за употребявани автомобили. За много купувачи най-голямата стойност не е само в самия автомобил, а в по-ниската несигурност около инспекцията, гаранционния контекст и самия процес на покупка.'),

  block('h2', 'Какво обикновено включва Tesla Pre-Owned'),
  block('normal', 'Точният пакет може да варира според пазара и конкретния автомобил, но като цяло Tesla Pre-Owned е привлекателен, защото колата идва през екосистемата на Tesla, а не по неясен път от трета страна.'),
  block(null, 'Процес на продажба, управляван от Tesla', {listItem: 'bullet', level: 1}),
  block(null, 'По-ясен трансфер на собственост и Tesla account логика', {listItem: 'bullet', level: 1}),
  block(null, 'Възможна гаранционна сигурност или допълнителен гаранционен контекст според пазара и автомобила', {listItem: 'bullet', level: 1}),
  block(null, 'По-висока увереност за купувача спрямо много случайни обяви', {listItem: 'bullet', level: 1}),

  block('h2', 'Основни предимства'),
  block('normal', 'Най-голямото предимство е по-ниският риск за купувача. На практика често плащате не само за колата, а и за по-чист процес и по-малка несигурност.'),
  block(null, 'По-нисък риск спрямо много частни обяви', {listItem: 'bullet', level: 1}),
  block(null, 'Повече доверие в самата сделка', {listItem: 'bullet', level: 1}),
  block(null, 'По-добър избор за купувачи, които искат по-малко изненади', {listItem: 'bullet', level: 1}),

  block('h2', 'Какво да проверите внимателно'),
  block('normal', 'Tesla Pre-Owned не е магически щит. Все пак трябва да се провери точното състояние, гаранционното покритие, козметичното състояние и реалният fit спрямо вашия сценарий на употреба.'),
  block(null, 'Каква гаранция е активна в момента', {listItem: 'bullet', level: 1}),
  block(null, 'Има ли допълнителна гаранция или не', {listItem: 'bullet', level: 1}),
  block(null, 'Батерия, гуми, спирачки и козметично състояние', {listItem: 'bullet', level: 1}),
  block(null, 'Оправдана ли е ценовата премия спрямо частния пазар', {listItem: 'bullet', level: 1}),

  block('h2', 'Tesla Pre-Owned срещу частен продавач'),
  block('normal', 'Частен продавач може да предложи по-добра цена на пръв поглед, но обикновено с много повече несигурност. Tesla Pre-Owned често има повече смисъл за купувачи, които предпочитат по-чист risk profile, а не най-ниската възможна цена.'),

  block('h2', 'Кога има най-много смисъл'),
  block('normal', 'Tesla Pre-Owned има най-много смисъл, когато искате употребявана Tesla, но държите силно на увереността при покупката, гаранционната логика и по-структуриран път до сделката.'),

  block('h2', 'Практичен извод'),
  block('normal', 'Гледайте на Tesla Pre-Owned като на път с по-нисък риск, а не непременно с по-ниска цена. Ако гаранционните детайли са ясни и премията спрямо свободния пазар е разумна, това може да е един от най-умните начини да купите употребявана Tesla.'),
]

const doc = {
  _type: 'post',
  title: {
    en: 'Tesla Pre-Owned Program Explained',
    bg: 'Tesla Pre-Owned Program - какво включва',
  },
  slug: {
    _type: 'slug',
    current: slug,
  },
  featured: false,
  publishedAt: now,
  category: 'Buying Guide',
  excerpt: {
    en: 'What Tesla Pre-Owned usually includes, what to verify, and when the extra confidence is worth the premium.',
    bg: 'Какво обикновено включва Tesla Pre-Owned, какво да проверите и кога допълнителната сигурност си струва ценовата премия.',
  },
  seoTitle: {
    en: 'Tesla Pre-Owned Program Explained',
    bg: 'Tesla Pre-Owned Program - какво включва',
  },
  seoDescription: {
    en: 'A practical guide to Tesla Pre-Owned: benefits, warranty logic, trade-offs and when it makes sense over private listings.',
    bg: 'Практично ръководство за Tesla Pre-Owned: предимства, гаранционна логика, компромиси и кога има повече смисъл от частна обява.',
  },
  bodyEn,
  bodyBg,
}

const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{_id}`, {slug})

if (existing?._id) {
  await client.patch(existing._id).set(doc).commit()
  console.log(`updated ${slug}`)
} else {
  await client.create(doc)
  console.log(`created ${slug}`)
}
