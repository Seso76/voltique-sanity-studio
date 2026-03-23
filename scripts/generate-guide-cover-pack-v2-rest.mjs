import fs from 'fs'
import path from 'path'

const outDir = path.join(process.cwd(), 'scripts', 'generated-guide-covers-v2-rest')

fs.mkdirSync(outDir, {recursive: true})

const covers = [
  {
    slug: 'tesla-model-3-buying-guide',
    category: 'Buying Guide',
    title: 'Tesla Model 3\nBuying Guide',
    accent: '#111111',
    motif: 'sedan',
  },
  {
    slug: 'tesla-model-y-buying-guide',
    category: 'Buying Guide',
    title: 'Tesla Model Y\nBuying Guide',
    accent: '#111111',
    motif: 'suv',
  },
  {
    slug: 'tesla-battery-health-explained',
    category: 'Battery',
    title: 'Tesla Battery\nHealth',
    accent: '#1F2937',
    motif: 'battery-health',
  },
  {
    slug: 'tesla-charging-guide-europe',
    category: 'Charging',
    title: 'Tesla Charging\nGuide Europe',
    accent: '#0F172A',
    motif: 'plug',
  },
  {
    slug: 'tesla-supercharger-costs-europe',
    category: 'Charging',
    title: 'Supercharger\nCosts Europe',
    accent: '#0F172A',
    motif: 'bolt',
  },
  {
    slug: 'tesla-model-3-vs-bmw-i4',
    category: 'Comparison',
    title: 'Model 3\nvs BMW i4',
    accent: '#111111',
    motif: 'compare-sedan',
  },
  {
    slug: 'tesla-model-y-vs-audi-q4-etron',
    category: 'Comparison',
    title: 'Model Y\nvs Audi Q4 e-tron',
    accent: '#111111',
    motif: 'compare-suv',
  },
  {
    slug: 'used-tesla-prices-europe',
    category: 'Market Insight',
    title: 'Used Tesla\nPrices Europe',
    accent: '#111111',
    motif: 'bars',
  },
  {
    slug: 'tesla-ownership-costs-europe',
    category: 'Tesla Ownership',
    title: 'Tesla Ownership\nCosts Europe',
    accent: '#111111',
    motif: 'coins',
  },
]

function motifSvg(motif, accent) {
  if (motif === 'sedan') {
    return `
      <path d="M980 470 L1038 355 H1228 L1316 432 V518 H980 Z" fill="none" stroke="${accent}" stroke-width="10" stroke-linejoin="round"/>
      <circle cx="1076" cy="536" r="30" fill="none" stroke="${accent}" stroke-width="10"/>
      <circle cx="1248" cy="536" r="30" fill="none" stroke="${accent}" stroke-width="10"/>
      <line x1="1085" y1="355" x2="1165" y2="355" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
    `
  }

  if (motif === 'suv') {
    return `
      <path d="M976 478 L1040 340 H1242 L1330 424 V522 H976 Z" fill="none" stroke="${accent}" stroke-width="10" stroke-linejoin="round"/>
      <circle cx="1080" cy="540" r="30" fill="none" stroke="${accent}" stroke-width="10"/>
      <circle cx="1258" cy="540" r="30" fill="none" stroke="${accent}" stroke-width="10"/>
      <line x1="1096" y1="340" x2="1196" y2="340" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
    `
  }

  if (motif === 'battery-health') {
    return `
      <rect x="1010" y="190" width="280" height="410" rx="34" fill="none" stroke="${accent}" stroke-width="10"/>
      <rect x="1290" y="330" width="24" height="130" rx="12" fill="${accent}" opacity="0.9"/>
      <path d="M1090 430 C1112 390 1160 372 1202 390 C1248 410 1260 462 1228 500 C1206 526 1166 542 1114 540" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
      <path d="M1110 360 C1160 330 1226 330 1272 366" fill="none" stroke="${accent}" stroke-width="10" opacity="0.2" stroke-linecap="round"/>
      <path d="M1110 556 C1160 586 1226 586 1272 550" fill="none" stroke="${accent}" stroke-width="10" opacity="0.2" stroke-linecap="round"/>
    `
  }

  if (motif === 'plug') {
    return `
      <path d="M1062 214 L1062 324 Q1062 382 1012 416 L980 436" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
      <rect x="1088" y="214" width="122" height="156" rx="28" fill="none" stroke="${accent}" stroke-width="10"/>
      <line x1="1120" y1="168" x2="1120" y2="214" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
      <line x1="1178" y1="168" x2="1178" y2="214" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
      <path d="M1010 438 L950 494" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
    `
  }

  if (motif === 'bolt') {
    return `
      <path d="M1154 180 L1066 354 H1166 L1118 596 L1274 320 H1176 L1228 180 Z" fill="${accent}" opacity="0.92"/>
    `
  }

  if (motif === 'compare-sedan') {
    return `
      <path d="M932 500 L974 420 H1088 L1146 472 V528 H932 Z" fill="none" stroke="${accent}" stroke-width="9" stroke-linejoin="round"/>
      <circle cx="1002" cy="542" r="24" fill="none" stroke="${accent}" stroke-width="9"/>
      <circle cx="1086" cy="542" r="24" fill="none" stroke="${accent}" stroke-width="9"/>
      <path d="M1168 500 L1210 420 H1324 L1382 472 V528 H1168 Z" fill="none" stroke="${accent}" stroke-width="9" stroke-linejoin="round"/>
      <circle cx="1238" cy="542" r="24" fill="none" stroke="${accent}" stroke-width="9"/>
      <circle cx="1322" cy="542" r="24" fill="none" stroke="${accent}" stroke-width="9"/>
      <line x1="1124" y1="474" x2="1158" y2="474" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
    `
  }

  if (motif === 'compare-suv') {
    return `
      <path d="M924 506 L972 396 H1098 L1160 462 V532 H924 Z" fill="none" stroke="${accent}" stroke-width="9" stroke-linejoin="round"/>
      <circle cx="1002" cy="546" r="24" fill="none" stroke="${accent}" stroke-width="9"/>
      <circle cx="1092" cy="546" r="24" fill="none" stroke="${accent}" stroke-width="9"/>
      <path d="M1168 506 L1218 396 H1342 L1400 462 V532 H1168 Z" fill="none" stroke="${accent}" stroke-width="9" stroke-linejoin="round"/>
      <circle cx="1246" cy="546" r="24" fill="none" stroke="${accent}" stroke-width="9"/>
      <circle cx="1332" cy="546" r="24" fill="none" stroke="${accent}" stroke-width="9"/>
      <line x1="1130" y1="478" x2="1160" y2="478" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
    `
  }

  if (motif === 'bars') {
    return `
      <rect x="1020" y="430" width="72" height="170" rx="16" fill="${accent}" opacity="0.22"/>
      <rect x="1122" y="340" width="72" height="260" rx="16" fill="${accent}" opacity="0.5"/>
      <rect x="1224" y="248" width="72" height="352" rx="16" fill="${accent}" opacity="0.9"/>
      <path d="M1018 300 C1080 286 1148 286 1210 252 C1240 236 1270 210 1302 184" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
    `
  }

  if (motif === 'coins') {
    return `
      <ellipse cx="1096" cy="332" rx="92" ry="28" fill="none" stroke="${accent}" stroke-width="10"/>
      <path d="M1004 332 V436 C1004 452 1046 468 1096 468 C1146 468 1188 452 1188 436 V332" fill="none" stroke="${accent}" stroke-width="10"/>
      <ellipse cx="1230" cy="430" rx="82" ry="26" fill="none" stroke="${accent}" stroke-width="10"/>
      <path d="M1148 430 V514 C1148 528 1184 542 1230 542 C1276 542 1312 528 1312 514 V430" fill="none" stroke="${accent}" stroke-width="10"/>
    `
  }

  return ''
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

console.log(`generated ${covers.length} v2-rest SVG covers in ${outDir}`)
