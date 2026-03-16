import fs from "node:fs/promises";
import path from "node:path";
import {getCliClient} from "sanity/cli";

const client = getCliClient({apiVersion: "2025-01-01"});

const ARTICLES = [
  {slug: "tesla-model-3-buying-guide", category: "Buying Guide"},
  {slug: "tesla-model-y-buying-guide", category: "Buying Guide"},
  {slug: "used-tesla-checklist", category: "Buying Guide"},
  {slug: "tesla-battery-health-explained", category: "Battery"},
  {slug: "lfp-vs-nca-tesla-batteries", category: "Battery"},
  {slug: "tesla-charging-guide-europe", category: "Charging"},
  {slug: "tesla-supercharger-costs-europe", category: "Charging"},
  {slug: "tesla-model-3-vs-bmw-i4", category: "Comparison"},
  {slug: "tesla-model-y-vs-audi-q4-etron", category: "Comparison"},
  {slug: "used-tesla-prices-europe", category: "Market Insight"},
  {slug: "tesla-ownership-costs-europe", category: "Tesla Ownership"},
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
      <rect x="${x}" y="${y}" width="${size * 1.2}" height="${size * 0.65}" rx="${size * 0.1}" fill="none" stroke="${accent}" stroke-width="8"/>
      <rect x="${x + size * 1.2}" y="${y + size * 0.2}" width="${size * 0.16}" height="${size * 0.25}" rx="4" fill="${accent}"/>
      <rect x="${x + size * 0.14}" y="${y + size * 0.12}" width="${size * 0.18}" height="${size * 0.4}" rx="6" fill="${accent}" opacity="0.95"/>
      <rect x="${x + size * 0.42}" y="${y + size * 0.12}" width="${size * 0.18}" height="${size * 0.4}" rx="6" fill="${accent}" opacity="0.75"/>
      <rect x="${x + size * 0.70}" y="${y + size * 0.12}" width="${size * 0.18}" height="${size * 0.4}" rx="6" fill="${accent}" opacity="0.55"/>
    `;
  }

  if (category === "Charging") {
    return `
      <rect x="${x + size * 0.18}" y="${y + size * 0.08}" width="${size * 0.55}" height="${size * 0.58}" rx="${size * 0.14}" fill="none" stroke="${accent}" stroke-width="8"/>
      <line x1="${x + size * 0.32}" y1="${y}" x2="${x + size * 0.32}" y2="${y + size * 0.14}" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
      <line x1="${x + size * 0.58}" y1="${y}" x2="${x + size * 0.58}" y2="${y + size * 0.14}" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
      <path d="M ${x + size * 0.45} ${y + size * 0.66} L ${x + size * 0.45} ${y + size * 0.92}" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
      <path d="M ${x + size * 0.45} ${y + size * 0.92} C ${x + size * 0.45} ${y + size * 1.02}, ${x + size * 0.72} ${y + size * 1.02}, ${x + size * 0.72} ${y + size * 0.88}" stroke="${accent}" stroke-width="8" fill="none" stroke-linecap="round"/>
    `;
  }

  if (category === "Comparison") {
    return `
      <rect x="${x}" y="${y + size * 0.14}" width="${size * 0.48}" height="${size * 0.58}" rx="${size * 0.12}" fill="none" stroke="${accent}" stroke-width="8"/>
      <rect x="${x + size * 0.62}" y="${y + size * 0.14}" width="${size * 0.48}" height="${size * 0.58}" rx="${size * 0.12}" fill="none" stroke="${accent}" stroke-width="8"/>
      <path d="M ${x + size * 0.48} ${y + size * 0.42} L ${x + size * 0.62} ${y + size * 0.42}" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
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
      <path d="M ${x + size * 0.36} ${y + size * 0.08} L ${x + size * 0.68} ${y + size * 0.20} L ${x + size * 0.68} ${y + size * 0.56} C ${x + size * 0.68} ${y + size * 0.80}, ${x + size * 0.52} ${y + size * 0.96}, ${x + size * 0.36} ${y + size * 1.02} C ${x + size * 0.20} ${y + size * 0.96}, ${x + size * 0.04} ${y + size * 0.80}, ${x + size * 0.04} ${y + size * 0.56} L ${x + size * 0.04} ${y + size * 0.20} Z" fill="none" stroke="${accent}" stroke-width="8"/>
      <circle cx="${x + size * 0.86}" cy="${y + size * 0.34}" r="${size * 0.16}" fill="none" stroke="${accent}" stroke-width="8"/>
      <path d="M ${x + size * 0.86} ${y + size * 0.24} L ${x + size * 0.86} ${y + size * 0.44}" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
      <path d="M ${x + size * 0.78} ${y + size * 0.34} L ${x + size * 0.94} ${y + size * 0.34}" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
    `;
  }

  return `
    <path d="M ${x + size * 0.18} ${y + size * 0.58} L ${x + size * 0.22} ${y + size * 0.86} L ${x + size * 0.74} ${y + size * 0.86} L ${x + size * 0.80} ${y + size * 0.54}" stroke="${accent}" stroke-width="8" fill="none" stroke-linejoin="round"/>
    <circle cx="${x + size * 0.30}" cy="${y + size * 0.88}" r="${size * 0.08}" fill="${accent}"/>
    <circle cx="${x + size * 0.66}" cy="${y + size * 0.88}" r="${size * 0.08}" fill="${accent}"/>
    <path d="M ${x + size * 0.44} ${y + size * 0.44} L ${x + size * 0.56} ${y + size * 0.58} L ${x + size * 0.78} ${y + size * 0.28}" stroke="${accent}" stroke-width="8" fill="none" stroke-linecap="round"/>
  `;
}

function cleanInfographicSvg(category) {
  const style = styleMap[category] ?? styleMap["Buying Guide"];

  const card = (x, y) => `
    <rect x="${x}" y="${y}" width="410" height="170" rx="24" fill="${style.soft}" stroke="#e5e7eb"/>
    ${categoryIcon(category, x + 130, y + 36, 92, style.accent)}
  `;

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="1200" height="700" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="700" fill="#f8fafc"/>
    <rect x="40" y="40" width="1120" height="620" rx="34" fill="#ffffff" stroke="#e5e7eb"/>
    <rect x="80" y="80" width="1040" height="540" rx="28" fill="#f8fafc" stroke="#e5e7eb"/>
    ${card(110, 160)}
    ${card(680, 160)}
    ${card(110, 390)}
    ${card(680, 390)}
  </svg>`;
}

async function uploadSvg(filename, svg) {
  const dir = path.join(process.cwd(), "tmp-guide-assets-clean");
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

    const newAssetId = await uploadSvg(`clean-info-${article.slug}.svg`, cleanInfographicSvg(article.category));

    const patchVisuals = (blocks = []) =>
      blocks.map((block) => {
        if (block?._type === "guideVisual" && block?.style === "infographic") {
          return {
            ...block,
            image: {
              _type: "image",
              asset: {_type: "reference", _ref: newAssetId},
            },
          };
        }
        return block;
      });

    await client.patch(post._id).set({
      bodyEn: patchVisuals(post.bodyEn || []),
      bodyBg: patchVisuals(post.bodyBg || []),
    }).commit();

    console.log(`updated: ${article.slug}`);
  }

  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
