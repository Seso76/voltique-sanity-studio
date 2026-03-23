import fs from 'fs'
import path from 'path'

const outDir = path.join(process.cwd(), 'scripts', 'generated-guide-covers-v2')

const covers = [
  {
    slug: 'used-tesla-checklist',
    category: 'Buying Guide',
    title: 'Used Tesla\nChecklist',
    accent: '#111111',
    motif: 'checklist',
  },
  {
    slug: 'lfp-vs-nca-tesla-batteries',
    category: 'Battery',
    title: 'LFP vs NCA\nTesla Batteries',
    accent: '#1F2937',
    motif: 'battery',
  },
  {
    slug: 'tesla-pre-owned-program',
    category: 'Buying Guide',
    title: 'Tesla Pre-Owned\nProgram',
    accent: '#111111',
    motif: 'shield',
  },
]

function motifSvg(motif, accent) {
  if (motif === 'checklist') {
    return `
      <rect x="980" y="160" width="360" height="520" rx="34" fill="none" stroke="${accent}" stroke-width="10"/>
      <rect x="1040" y="235" width="180" height="18" rx="9" fill="${accent}" opacity="0.16"/>
      <rect x="1040" y="330" width="220" height="18" rx="9" fill="${accent}" opacity="0.16"/>
      <rect x="1040" y="425" width="170" height="18" rx="9" fill="${accent}" opacity="0.16"/>
      <path d="M1032 300 L1052 320 L1088 278" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1032 395 L1052 415 L1088 373" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1032 490 L1052 510 L1088 468" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    `
  }

  if (motif === 'battery') {
    return `
      <rect x="1000" y="180" width="300" height="430" rx="34" fill="none" stroke="${accent}" stroke-width="10"/>
      <rect x="1300" y="330" width="26" height="130" rx="12" fill="${accent}" opacity="0.9"/>
      <rect x="1055" y="225" width="190" height="72" rx="16" fill="${accent}" opacity="0.08"/>
      <rect x="1055" y="320" width="190" height="72" rx="16" fill="${accent}" opacity="0.22"/>
      <rect x="1055" y="415" width="190" height="72" rx="16" fill="${accent}" opacity="0.46"/>
      <rect x="1055" y="510" width="190" height="72" rx="16" fill="${accent}" opacity="0.82"/>
    `
  }

  return `
    <path d="M1148 165 L1295 225 V373 C1295 495 1228 581 1148 633 C1068 581 1001 495 1001 373 V225 Z" fill="none" stroke="${accent}" stroke-width="10"/>
    <path d="M1080 386 L1126 432 L1216 322" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
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

console.log(`generated ${covers.length} v2 SVG covers in ${outDir}`)
