import fs from "node:fs/promises";
import path from "node:path";
import {getCliClient} from "sanity/cli";

const client = getCliClient({apiVersion: "2025-01-01"});

const ARTICLES = [
  {slug: "tesla-model-3-buying-guide", category: "Buying Guide", alt: "Tesla Model 3 guide cover"},
  {slug: "tesla-model-y-buying-guide", category: "Buying Guide", alt: "Tesla Model Y guide cover"},
  {slug: "used-tesla-checklist", category: "Buying Guide", alt: "Used Tesla checklist cover"},
  {slug: "tesla-battery-health-explained", category: "Battery", alt: "Tesla battery health guide cover"},
  {slug: "lfp-vs-nca-tesla-batteries", category: "Battery", alt: "Tesla battery chemistry comparison cover"},
  {slug: "tesla-charging-guide-europe", category: "Charging", alt: "Tesla charging guide cover"},
  {slug: "tesla-supercharger-costs-europe", category: "Charging", alt: "Tesla Supercharger cost guide cover"},
  {slug: "tesla-model-3-vs-bmw-i4", category: "Comparison", alt: "Tesla Model 3 vs BMW i4 comparison cover"},
  {slug: "tesla-model-y-vs-audi-q4-etron", category: "Comparison", alt: "Tesla Model Y vs Audi Q4 e-tron comparison cover"},
  {slug: "used-tesla-prices-europe", category: "Market Insight", alt: "Used Tesla prices in Europe cover"},
  {slug: "tesla-ownership-costs-europe", category: "Tesla Ownership", alt: "Tesla ownership costs guide cover"},
];

const styleMap = {
  "Buying Guide": {accent: "#111111", soft: "#f3f4f6"},
  "Battery": {accent: "#1f2937", soft: "#eef2f7"},
  "Charging": {accent: "#0f172a", soft: "#eef6ff"},
  "Comparison": {accent: "#111827", soft: "#f5f3ff"},
  "Market Insight": {accent: "#111827", soft: "#f3f4f6"},
  "Tesla Ownership": {accent: "#111827", soft: "#f3f4f6"},
};

function categoryIcon(category, x, y, size, accent) {
  if (category === "Battery") {
    return `
      <rect x="${x}" y="${y}" width="${size * 1.2}" height="${size * 0.65}" rx="${size * 0.1}" fill="none" stroke="${accent}" stroke-width="10"/>
      <rect x="${x + size * 1.2}" y="${y + size * 0.2}" width="${size * 0.16}" height="${size * 0.25}" rx="4" fill="${accent}"/>
      <rect x="${x + size * 0.14}" y="${y + size * 0.12}" width="${size * 0.18}" height="${size * 0.4}" rx="6" fill="${accent}" opacity="0.95"/>
      <rect x="${x + size * 0.42}" y="${y + size * 0.12}" width="${size * 0.18}" height="${size * 0.4}" rx="6" fill="${accent}" opacity="0.75"/>
      <rect x="${x + size * 0.70}" y="${y + size * 0.12}" width="${size * 0.18}" height="${size * 0.4}" rx="6" fill="${accent}" opacity="0.55"/>
    `;
  }

  if (category === "Charging") {
    return `
      <rect x="${x + size * 0.18}" y="${y + size * 0.08}" width="${size * 0.55}" height="${size * 0.58}" rx="${size * 0.14}" fill="none" stroke="${accent}" stroke-width="10"/>
      <line x1="${x + size * 0.32}" y1="${y}" x2="${x + size * 0.32}" y2="${y + size * 0.14}" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
      <line x1="${x + size * 0.58}" y1="${y}" x2="${x + size * 0.58}" y2="${y + size * 0.14}" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
      <path d="M ${x + size * 0.45} ${y + size * 0.66} L ${x + size * 0.45} ${y + size * 0.92}" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
      <path d="M ${x + size * 0.45} ${y + size * 0.92} C ${x + size * 0.45} ${y + size * 1.02}, ${x + size * 0.72} ${y + size * 1.02}, ${x + size * 0.72} ${y + size * 0.88}" stroke="${accent}" stroke-width="10" fill="none" stroke-linecap="round"/>
    `;
  }

  if (category === "Comparison") {
    return `
      <rect x="${x}" y="${y + size * 0.14}" width="${size * 0.48}" height="${size * 0.58}" rx="${size * 0.12}" fill="none" stroke="${accent}" stroke-width="10"/>
      <rect x="${x + size * 0.62}" y="${y + size * 0.14}" width="${size * 0.48}" height="${size * 0.58}" rx="${size * 0.12}" fill="none" stroke="${accent}" stroke-width="10"/>
      <path d="M ${x + size * 0.48} ${y + size * 0.42} L ${x + size * 0.62} ${y + size * 0.42}" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
    `;
  }

  if (category === "Market Insight") {
    return `
      <rect x="${x}" y="${y + size * 0.48}" width="${size * 0.18}" height="${size * 0.38}" rx="8" fill="${accent}"/>
      <rect x="${x + size * 0.26}" y="${y + size * 0.30}" width="${size * 0.18}" height="${size * 0.56}" rx="8" fill="${accent}" opacity="0.8"/>
      <rect x="${x + size * 0.52}" y="${y + size * 0.18}" width="${size * 0.18}" height="${size * 0.68}" rx="8" fill="${accent}" opacity="0.65"/>
    `;
  }

  if (category === "Tesla Ownership") {
    return `
      <path d="M ${x + size * 0.36} ${y + size * 0.08} L ${x + size * 0.68} ${y + size * 0.20} L ${x + size * 0.68} ${y + size * 0.56} C ${x + size * 0.68} ${y + size * 0.80}, ${x + size * 0.52} ${y + size * 0.96}, ${x + size * 0.36} ${y + size * 1.02} C ${x + size * 0.20} ${y + size * 0.96}, ${x + size * 0.04} ${y + size * 0.80}, ${x + size * 0.04} ${y + size * 0.56} L ${x + size * 0.04} ${y + size * 0.20} Z" fill="none" stroke="${accent}" stroke-width="10"/>
      <circle cx="${x + size * 0.86}" cy="${y + size * 0.34}" r="${size * 0.16}" fill="none" stroke="${accent}" stroke-width="10"/>
      <path d="M ${x + size * 0.86} ${y + size * 0.24} L ${x + size * 0.86} ${y + size * 0.44}" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
      <path d="M ${x + size * 0.78} ${y + size * 0.34} L ${x + size * 0.94} ${y + size * 0.34}" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
    `;
  }

  return `
    <path d="M ${x + size * 0.18} ${y + size * 0.58} L ${x + size * 0.22} ${y + size * 0.86} L ${x + size * 0.74} ${y + size * 0.86} L ${x + size * 0.80} ${y + size * 0.54}" stroke="${accent}" stroke-width="10" fill="none" stroke-linejoin="round"/>
    <circle cx="${x + size * 0.30}" cy="${y + size * 0.88}" r="${size * 0.08}" fill="${accent}"/>
    <circle cx="${x + size * 0.66}" cy="${y + size * 0.88}" r="${size * 0.08}" fill="${accent}"/>
    <path d="M ${x + size * 0.44} ${y + size * 0.44} L ${x + size * 0.56} ${y + size * 0.58} L ${x + size * 0.78} ${y + size * 0.28}" stroke="${accent}" stroke-width="10" fill="none" stroke-linecap="round"/>
  `;
}

function singleCoverSvg(category) {
  const style = styleMap[category] ?? styleMap["Buying Guide"];

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
    <rect width="1600" height="900" fill="#f8fafc"/>
    <rect x="64" y="64" width="1472" height="772" rx="42" fill="${style.soft}" stroke="#e5e7eb"/>
    <rect x="120" y="120" width="1360" height="660" rx="36" fill="#ffffff" stroke="#e5e7eb"/>
    <rect x="930" y="180" width="420" height="420" rx="40" fill="${style.soft}" stroke="#e5e7eb"/>
    ${categoryIcon(category, 1030, 270, 220, style.accent)}
  </svg>`;
}

async function uploadSvg(filename, svg) {
  const dir = path.join(process.cwd(), "tmp-guide-assets-single-cover");
  await fs.mkdir(dir, {recursive: true});
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, svg, "utf8");
  const handle = await fs.open(filePath, "r");
  try {
    const asset = await client.assets.upload("image", handle.createReadStream(), {
      filename,
      contentType: "image/svg+xml",
    });
    return asset._id;
  } finally {
    await handle.close();
  }
}

async function main() {
  const posts = await client.fetch(`*[_type=="post" && defined(slug.current)]{_id,"slug":slug.current,bodyEn,bodyBg}`);
  const postMap = new Map(posts.map((p) => [p.slug, p]));

  for (const article of ARTICLES) {
    const post = postMap.get(article.slug);
    if (!post?._id) {
      console.log(`skip: ${article.slug}`);
      continue;
    }

    const coverAssetId = await uploadSvg(`single-cover-${article.slug}.svg`, singleCoverSvg(article.category));

    const removeInfographic = (blocks = []) =>
      blocks.filter((block) => !(block?._type === "guideVisual" && block?.style === "infographic"));

    await client.patch(post._id).set({
      coverImage: {
        _type: "image",
        asset: {_type: "reference", _ref: coverAssetId},
        alt: article.alt,
      },
      bodyEn: removeInfographic(post.bodyEn || []),
      bodyBg: removeInfographic(post.bodyBg || []),
    }).commit();

    console.log(`updated: ${article.slug}`);
  }

  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
