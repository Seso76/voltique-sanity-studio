import fs from 'fs'
import path from 'path'

const outDir = path.join(process.cwd(), 'scripts', 'generated-guide-covers')

const covers = [
  {
    slug: 'tesla-model-3-buying-guide',
    category: 'Buying Guide',
    title: 'Tesla Model 3\nBuying Guide',
    accent: '#111111',
    shape: 'sedan',
  },
  {
    slug: 'tesla-model-y-buying-guide',
    category: 'Buying Guide',
    title: 'Tesla Model Y\nBuying Guide',
    accent: '#111111',
    shape: 'suv',
  },
  {
    slug: 'used-tesla-checklist',
    category: 'Buying Guide',
    title: 'Used Tesla\nChecklist',
    accent: '#111111',
    shape: 'check',
  },
  {
    slug: 'tesla-battery-health-explained',
    category: 'Battery',
    title: 'Tesla Battery\nHealth',
    accent: '#1f2937',
    shape: 'battery',
  },
  {
    slug: 'lfp-vs-nca-tesla-batteries',
    category: 'Battery',
    title: 'LFP vs NCA\nTesla Batteries',
    accent: '#1f2937',
    shape: 'cells',
  },
  {
    slug: 'tesla-charging-guide-europe',
    category: 'Charging',
    title: 'Tesla Charging\nGuide Europe',
    accent: '#0f172a',
    shape: 'plug',
  },
  {
    slug: 'tesla-supercharger-costs-europe',
    category: 'Charging',
    title: 'Supercharger\nCosts Europe',
    accent: '#0f172a',
    shape: 'bolt',
  },
  {
    slug: 'tesla-model-3-vs-bmw-i4',
    category: 'Comparison',
    title: 'Model 3\nvs BMW i4',
    accent: '#111111',
    shape: 'compare',
  },
  {
    slug: 'tesla-model-y-vs-audi-q4-etron',
    category: 'Comparison',
    title: 'Model Y\nvs Audi Q4 e-tron',
    accent: '#111111',
    shape: 'compare',
  },
  {
    slug: 'used-tesla-prices-europe',
    category: 'Market Insight',
    title: 'Used Tesla\nPrices Europe',
    accent: '#111111',
    shape: 'bars',
  },
  {
    slug: 'tesla-ownership-costs-europe',
    category: 'Tesla Ownership',
    title: 'Tesla Ownership\nCosts Europe',
    accent: '#111111',
    shape: 'coins',
  },
  {
    slug: 'tesla-pre-owned-program',
    category: 'Buying Guide',
    title: 'Tesla Pre-Owned\nProgram',
    accent: '#111111',
    shape: 'shield',
  },
]

function shapeSvg(shape, accent) {
  if (shape === 'battery') {
    return `
      <rect x="865" y="150" width="150" height="290" rx="24" fill="none" stroke="${accent}" stroke-width="14"/>
      <rect x="1015" y="240" width="18" height="110" rx="8" fill="${accent}"/>
      <rect x="895" y="180" width="90" height="58" rx="12" fill="${accent}" opacity="0.18"/>
      <rect x="895" y="254" width="90" height="58" rx="12" fill="${accent}" opacity="0.38"/>
      <rect x="895" y="328" width="90" height="58" rx="12" fill="${accent}" opacity="0.72"/>
    `
  }

  if (shape === 'cells') {
    return `
      <rect x="850" y="170" width="70" height="250" rx="30" fill="none" stroke="${accent}" stroke-width="12"/>
      <rect x="935" y="170" width="70" height="250" rx="30" fill="none" stroke="${accent}" stroke-width="12"/>
      <rect x="1020" y="170" width="70" height="250" rx="30" fill="none" stroke="${accent}" stroke-width="12"/>
      <line x1="885" y1="150" x2="1055" y2="150" stroke="${accent}" stroke-width="10"/>
    `
  }

  if (shape === 'plug') {
    return `
      <path d="M920 170 L920 270 Q920 330 870 360 L840 378" fill="none" stroke="${accent}" stroke-width="16" stroke-linecap="round"/>
      <rect x="945" y="170" width="96" height="130" rx="26" fill="none" stroke="${accent}" stroke-width="14"/>
      <line x1="972" y1="130" x2="972" y2="170" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>
      <line x1="1014" y1="130" x2="1014" y2="170" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>
    `
  }

  if (shape === 'bolt') {
    return `
      <path d="M960 150 L900 280 H970 L930 430 L1040 260 H970 L1010 150 Z" fill="${accent}" opacity="0.9"/>
    `
  }

  if (shape === 'compare') {
    return `
      <rect x="840" y="180" width="120" height="200" rx="26" fill="none" stroke="${accent}" stroke-width="12"/>
      <rect x="990" y="180" width="120" height="200" rx="26" fill="none" stroke="${accent}" stroke-width="12"/>
      <line x1="960" y1="280" x2="990" y2="280" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
    `
  }

  if (shape === 'bars') {
    return `
      <rect x="860" y="300" width="52" height="120" rx="12" fill="${accent}" opacity="0.35"/>
      <rect x="935" y="240" width="52" height="180" rx="12" fill="${accent}" opacity="0.55"/>
      <rect x="1010" y="180" width="52" height="240" rx="12" fill="${accent}" opacity="0.85"/>
    `
  }

  if (shape === 'coins') {
    return `
      <ellipse cx="930" cy="235" rx="76" ry="24" fill="none" stroke="${accent}" stroke-width="12"/>
      <path d="M854 235 V320 C854 333 888 346 930 346 C972 346 1006 333 1006 320 V235" fill="none" stroke="${accent}" stroke-width="12"/>
      <ellipse cx="1018" cy="280" rx="68" ry="22" fill="none" stroke="${accent}" stroke-width="12"/>
      <path d="M950 280 V350 C950 362 980 374 1018 374 C1056 374 1086 362 1086 350 V280" fill="none" stroke="${accent}" stroke-width="12"/>
    `
  }

  if (shape === 'shield') {
    return `
      <path d="M970 150 L1060 188 V278 C1060 352 1018 404 970 434 C922 404 880 352 880 278 V188 Z" fill="none" stroke="${accent}" stroke-width="14"/>
      <path d="M930 292 L958 322 L1014 250" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
    `
  }

  if (shape === 'check') {
    return `
      <rect x="850" y="155" width="230" height="280" rx="28" fill="none" stroke="${accent}" stroke-width="12"/>
      <line x1="900" y1="230" x2="1030" y2="230" stroke="${accent}" stroke-width="10" opacity="0.35"/>
      <line x1="900" y1="290" x2="1030" y2="290" stroke="${accent}" stroke-width="10" opacity="0.35"/>
      <line x1="900" y1="350" x2="1030" y2="350" stroke="${accent}" stroke-width="10" opacity="0.35"/>
      <path d="M872 288 L890 306 L920 270" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    `
  }

  if (shape === 'suv') {
    return `
      <path d="M850 330 L890 250 H1020 L1080 300 V360 H850 Z" fill="none" stroke="${accent}" stroke-width="12" stroke-linejoin="round"/>
      <circle cx="905" cy="372" r="28" fill="none" stroke="${accent}" stroke-width="12"/>
      <circle cx="1035" cy="372" r="28" fill="none" stroke="${accent}" stroke-width="12"/>
    `
  }

  return `
    <path d="M840 340 L890 270 H1010 L1080 320 V360 H840 Z" fill="none" stroke="${accent}" stroke-width="12" stroke-linejoin="round"/>
    <circle cx="905" cy="372" r="28" fill="none" stroke="${accent}" stroke-width="12"/>
    <circle cx="1020" cy="372" r="28" fill="none" stroke="${accent}" stroke-width="12"/>
  `
}

function buildSvg({title, category, accent, shape}) {
  const lines = title.split('\n')
  const titleTspans = lines
    .map((line, i) => `<tspan x="96" dy="${i === 0 ? 0 : 62}">${line}</tspan>`)
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="900" fill="#F7F7F5"/>
  <rect x="52" y="52" width="1496" height="796" rx="34" fill="#FCFCFB" stroke="#E9E7E2" stroke-width="2"/>
  <rect x="96" y="110" width="220" height="34" rx="17" fill="${accent}" opacity="0.08"/>
  <text x="116" y="132" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" letter-spacing="0.08em" fill="${accent}">${category.toUpperCase()}</text>
  <text x="96" y="255" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" fill="#111111">${titleTspans}</text>
  <text x="96" y="790" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#111111">Voltique</text>
  <text x="96" y="820" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#6B7280">Minimal Tesla guide cover</text>
  <g>${shapeSvg(shape, accent)}</g>
</svg>`
}

for (const cover of covers) {
  fs.writeFileSync(
    path.join(outDir, `${cover.slug}.svg`),
    buildSvg(cover),
    'utf8'
  )
}

console.log(`generated ${covers.length} SVG covers in ${outDir}`)
