import fs from 'fs'
import path from 'path'

const outDir = path.join(process.cwd(), 'scripts', 'generated-guide-covers-v3-cars')
fs.mkdirSync(outDir, {recursive: true})

const covers = [
  {
    slug: 'tesla-model-3-buying-guide',
    category: 'Buying Guide',
    title: 'Tesla Model 3\nBuying Guide',
    accent: '#111111',
    motif: 'model3',
  },
  {
    slug: 'tesla-model-3-vs-bmw-i4',
    category: 'Comparison',
    title: 'Model 3\nvs BMW i4',
    accent: '#111111',
    motif: 'model3-vs-i4',
  },
  {
    slug: 'tesla-model-y-buying-guide',
    category: 'Buying Guide',
    title: 'Tesla Model Y\nBuying Guide',
    accent: '#111111',
    motif: 'modely',
  },
  {
    slug: 'tesla-model-y-vs-audi-q4-etron',
    category: 'Comparison',
    title: 'Model Y\nvs Audi Q4 e-tron',
    accent: '#111111',
    motif: 'modely-vs-q4',
  },
]

function motifSvg(motif, accent) {
  if (motif === 'model3') {
    return `
      <path d="M960 505 L1015 392 H1256 L1340 466 V528 H960 Z" fill="none" stroke="${accent}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M1036 392 C1086 356 1188 350 1240 392" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
      <circle cx="1064" cy="546" r="29" fill="none" stroke="${accent}" stroke-width="10"/>
      <circle cx="1260" cy="546" r="29" fill="none" stroke="${accent}" stroke-width="10"/>
      <line x1="1092" y1="432" x2="1204" y2="432" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.22"/>
    `
  }

  if (motif === 'modely') {
    return `
      <path d="M954 510 L1018 366 H1266 L1350 454 V528 H954 Z" fill="none" stroke="${accent}" stroke-width="10" stroke-linejoin="round"/>
      <path d="M1048 366 C1102 332 1206 332 1260 366" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
      <circle cx="1068" cy="548" r="29" fill="none" stroke="${accent}" stroke-width="10"/>
      <circle cx="1272" cy="548" r="29" fill="none" stroke="${accent}" stroke-width="10"/>
      <line x1="1094" y1="432" x2="1218" y2="432" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.22"/>
    `
  }

  if (motif === 'model3-vs-i4') {
    return `
      <path d="M870 520 L914 432 H1038 L1096 486 V536 H870 Z" fill="none" stroke="${accent}" stroke-width="8" stroke-linejoin="round"/>
      <circle cx="944" cy="550" r="22" fill="none" stroke="${accent}" stroke-width="8"/>
      <circle cx="1026" cy="550" r="22" fill="none" stroke="${accent}" stroke-width="8"/>

      <line x1="1118" y1="492" x2="1152" y2="492" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>

      <path d="M1178 520 L1224 438 H1348 L1402 488 V536 H1178 Z" fill="none" stroke="${accent}" stroke-width="8" stroke-linejoin="round"/>
      <circle cx="1252" cy="550" r="22" fill="none" stroke="${accent}" stroke-width="8"/>
      <circle cx="1332" cy="550" r="22" fill="none" stroke="${accent}" stroke-width="8"/>
      <line x1="1238" y1="456" x2="1308" y2="456" stroke="${accent}" stroke-width="7" stroke-linecap="round" opacity="0.22"/>
    `
  }

  return `
    <path d="M864 522 L916 410 H1044 L1102 482 V536 H864 Z" fill="none" stroke="${accent}" stroke-width="8" stroke-linejoin="round"/>
    <circle cx="944" cy="552" r="22" fill="none" stroke="${accent}" stroke-width="8"/>
    <circle cx="1034" cy="552" r="22" fill="none" stroke="${accent}" stroke-width="8"/>

    <line x1="1122" y1="494" x2="1154" y2="494" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>

    <path d="M1180 522 L1234 404 H1360 L1416 474 V536 H1180 Z" fill="none" stroke="${accent}" stroke-width="8" stroke-linejoin="round"/>
    <circle cx="1260" cy="552" r="22" fill="none" stroke="${accent}" stroke-width="8"/>
    <circle cx="1348" cy="552" r="22" fill="none" stroke="${accent}" stroke-width="8"/>
  `
}

function buildSvg({title, category, accent, motif}) {
  const lines = title.split('\n')
  const titleTspans = lines
    .map((line, i) => `<tspan x="110" dy="${i === 0 ? 0 : 74}">${line}</tspan>`)
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#F6F5F2"/>
  <rect x="46" y="46" width="1508" height="808" rx="40" fill="#FCFCFA" stroke="#E8E5DE" stroke-width="2"/>
  <circle cx="1268" cy="300" r="210" fill="${accent}" opacity="0.035"/>
  <circle cx="1345" cy="615" r="118" fill="${accent}" opacity="0.03"/>
  <rect x="110" y="120" width="228" height="38" rx="19" fill="${accent}" opacity="0.08"/>
  <text x="132" y="145" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" letter-spacing="0.08em" fill="${accent}">${category.toUpperCase()}</text>
  <text x="110" y="292" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="700" fill="#111111">${titleTspans}</text>
  <text x="110" y="768" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#111111">Voltique</text>
  <text x="110" y="802" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#6B7280">Premium used Tesla editorial guide</text>
  <g>${motifSvg(motif, accent)}</g>
</svg>`
}

for (const cover of covers) {
  fs.writeFileSync(
    path.join(outDir, `${cover.slug}.svg`),
    buildSvg(cover),
    'utf8'
  )
}

console.log(`generated ${covers.length} v3 car covers in ${outDir}`)
