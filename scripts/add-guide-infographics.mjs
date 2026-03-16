import fs from "node:fs/promises";
import path from "node:path";
import {getCliClient} from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-01-01",
});

const guides = [
  {
    slug: "tesla-model-3-buying-guide",
    category: "Buying Guide",
    titleEn: "Tesla Model 3 key buying checkpoints",
    titleBg: "Ключови точки при покупка на Tesla Model 3",
    textEn: "Visual summary of the most important checks before buying a used Tesla Model 3.",
    textBg: "Визуално обобщение на най-важните проверки преди покупка на употребявана Tesla Model 3.",
    stats: [
      ["Range", "420–510 km", "⚡"],
      ["Battery", "LFP / NCA", "🔋"],
      ["Charging", "AC / DC", "🔌"],
      ["Focus", "Battery check", "✅"],
    ],
    checklistEn: [
      ["Battery health", "Check degradation and charging history", "🔋"],
      ["Body condition", "Inspect paint and panel gaps", "🛠"],
      ["Tyres", "Look for uneven wear", "🛞"],
      ["Documents", "Verify service and ownership papers", "📄"],
    ],
    checklistBg: [
      ["Батерия", "Провери деградация и история на зареждане", "🔋"],
      ["Купе", "Огледай боя и фуги", "🛠"],
      ["Гуми", "Търси неравномерно износване", "🛞"],
      ["Документи", "Провери сервизна и собственическа история", "📄"],
    ],
  },
  {
    slug: "tesla-model-y-buying-guide",
    category: "Buying Guide",
    titleEn: "Tesla Model Y practical buyer summary",
    titleBg: "Практично обобщение за купувача на Tesla Model Y",
    textEn: "Quick visual summary for evaluating a used Tesla Model Y.",
    textBg: "Бързо визуално обобщение за оценка на употребявана Tesla Model Y.",
    stats: [
      ["Space", "Family friendly", "👨‍👩‍👧‍👦"],
      ["Range", "Strong real use", "⚡"],
      ["Battery", "Check health", "🔋"],
      ["Focus", "Cargo + tyres", "✅"],
    ],
    checklistEn: [
      ["Battery", "Check real range and degradation", "🔋"],
      ["Cargo area", "Inspect rear floor and trim", "📦"],
      ["Alignment", "Watch tyre wear", "🛞"],
      ["Software", "Confirm updates and features", "💻"],
    ],
    checklistBg: [
      ["Батерия", "Провери реален пробег и деградация", "🔋"],
      ["Багажник", "Огледай пода и облицовките", "📦"],
      ["Реглаж", "Следи износването на гумите", "🛞"],
      ["Софтуер", "Потвърди ъпдейти и функции", "💻"],
    ],
  },
  {
    slug: "used-tesla-checklist",
    category: "Buying Guide",
    titleEn: "Used Tesla inspection checklist",
    titleBg: "Чеклист за оглед на употребявана Tesla",
    textEn: "A quick visual checklist for the most important inspection areas.",
    textBg: "Бърз визуален чеклист за най-важните точки при оглед.",
    stats: [
      ["Battery", "Health first", "🔋"],
      ["Body", "Paint and gaps", "🛠"],
      ["Tyres", "Wear pattern", "🛞"],
      ["Docs", "Ownership trail", "📄"],
    ],
    checklistEn: [
      ["Battery", "Review health and charging", "🔋"],
      ["Exterior", "Inspect repairs and paint", "🎨"],
      ["Chassis", "Check suspension and brakes", "🧰"],
      ["Documents", "Confirm ownership papers", "📄"],
    ],
    checklistBg: [
      ["Батерия", "Прегледай здраве и зареждане", "🔋"],
      ["Екстериор", "Провери ремонти и боя", "🎨"],
      ["Шаси", "Провери окачване и спирачки", "🧰"],
      ["Документи", "Потвърди собствеността", "📄"],
    ],
  },
  {
    slug: "tesla-battery-health-explained",
    category: "Battery",
    titleEn: "Tesla battery health snapshot",
    titleBg: "Обобщение за здравето на Tesla батерията",
    textEn: "Simple visual explanation of the factors that shape Tesla battery condition.",
    textBg: "Лесно визуално обяснение на факторите, които влияят на състоянието на батерията.",
    stats: [
      ["Mileage", "Key factor", "🛣"],
      ["DC charging", "Use matters", "⚡"],
      ["Heat", "Can accelerate wear", "🌡"],
      ["Goal", "Stable degradation", "📉"],
    ],
    checklistEn: [
      ["Mileage", "Assess total distance travelled", "🛣"],
      ["Charging", "Review fast charging habits", "⚡"],
      ["Climate", "Consider high heat exposure", "🌡"],
      ["Testing", "Compare range with expected values", "📊"],
    ],
    checklistBg: [
      ["Пробег", "Оцени общото изминато разстояние", "🛣"],
      ["Зареждане", "Прегледай навиците за бързо зареждане", "⚡"],
      ["Климат", "Вземи предвид високите температури", "🌡"],
      ["Тест", "Сравни пробега с очакваните стойности", "📊"],
    ],
  },
  {
    slug: "lfp-vs-nca-tesla-batteries",
    category: "Battery",
    titleEn: "LFP vs NCA battery comparison",
    titleBg: "Сравнение между LFP и NCA батерии",
    textEn: "Quick visual comparison of Tesla LFP and NCA battery chemistry.",
    textBg: "Бързо визуално сравнение на Tesla LFP и NCA батерии.",
    stats: [
      ["LFP", "Durability", "🔋"],
      ["NCA", "Performance", "🚀"],
      ["Use case", "Depends on buyer", "👤"],
      ["Focus", "Charging pattern", "🔌"],
    ],
    checklistEn: [
      ["LFP", "Great for frequent high charge", "🔋"],
      ["NCA", "Strong performance and range", "🚀"],
      ["Climate", "Consider daily conditions", "🌍"],
      ["Profile", "Match battery to your usage", "👤"],
    ],
    checklistBg: [
      ["LFP", "Подходяща за често високо зареждане", "🔋"],
      ["NCA", "Силна динамика и пробег", "🚀"],
      ["Климат", "Съобрази ежедневните условия", "🌍"],
      ["Профил", "Съобрази батерията с употребата", "👤"],
    ],
  },
  {
    slug: "tesla-charging-guide-europe",
    category: "Charging",
    titleEn: "Tesla charging in Europe summary",
    titleBg: "Обобщение за зареждане на Tesla в Европа",
    textEn: "Visual overview of home charging, AC/DC charging and daily charging habits.",
    textBg: "Визуален преглед на домашно зареждане, AC/DC зареждане и ежедневни навици.",
    stats: [
      ["Home AC", "Daily convenience", "🏠"],
      ["DC", "Road trips", "🛣"],
      ["Habit", "Charge wisely", "🔌"],
      ["Cost", "Depends on location", "€"],
    ],
    checklistEn: [
      ["Home setup", "Check available power and charger", "🏠"],
      ["AC charging", "Ideal for overnight use", "🔌"],
      ["DC charging", "Best for long trips", "🛣"],
      ["Routine", "Keep battery in sensible range", "✅"],
    ],
    checklistBg: [
      ["Домашна инсталация", "Провери наличната мощност и зарядно", "🏠"],
      ["AC зареждане", "Подходящо за нощно ползване", "🔌"],
      ["DC зареждане", "Най-добро за дълги пътувания", "🛣"],
      ["Рутина", "Дръж батерията в разумен диапазон", "✅"],
    ],
  },
  {
    slug: "tesla-supercharger-costs-europe",
    category: "Charging",
    titleEn: "Supercharger cost overview",
    titleBg: "Обобщение на разходите за Supercharger",
    textEn: "Visual summary of the main factors that influence Tesla Supercharger costs.",
    textBg: "Визуално обобщение на основните фактори, които влияят на разходите за Tesla Supercharger.",
    stats: [
      ["Country", "Pricing varies", "🌍"],
      ["Time", "May affect rate", "🕒"],
      ["Speed", "Influences session", "⚡"],
      ["Trip cost", "Energy driven", "€"],
    ],
    checklistEn: [
      ["Country", "Check local pricing", "🌍"],
      ["Time", "Watch time-based differences", "🕒"],
      ["Consumption", "Estimate route efficiency", "📉"],
      ["Planning", "Compare charge stops", "🧭"],
    ],
    checklistBg: [
      ["Държава", "Провери местните цени", "🌍"],
      ["Час", "Следи разлики по време", "🕒"],
      ["Разход", "Оцени ефективността по маршрут", "📉"],
      ["Планиране", "Сравни зарядните спирки", "🧭"],
    ],
  },
  {
    slug: "tesla-model-3-vs-bmw-i4",
    category: "Comparison",
    titleEn: "Tesla Model 3 vs BMW i4 snapshot",
    titleBg: "Tesla Model 3 срещу BMW i4 накратко",
    textEn: "Fast comparison of efficiency, charging and ownership priorities.",
    textBg: "Бързо сравнение на ефективност, зареждане и ключови приоритети.",
    stats: [
      ["Efficiency", "Model 3 focus", "📉"],
      ["Interior feel", "i4 focus", "🛋"],
      ["Charging", "Network matters", "⚡"],
      ["Ownership", "Use case decides", "✅"],
    ],
    checklistEn: [
      ["Efficiency", "Compare real consumption", "📉"],
      ["Charging", "Assess network convenience", "⚡"],
      ["Software", "Review route planning", "💻"],
      ["Cost", "Estimate total ownership", "€"],
    ],
    checklistBg: [
      ["Ефективност", "Сравни реалния разход", "📉"],
      ["Зареждане", "Оцени удобството на мрежата", "⚡"],
      ["Софтуер", "Прегледай планирането на маршрути", "💻"],
      ["Цена", "Изчисли общите разходи", "€"],
    ],
  },
  {
    slug: "tesla-model-y-vs-audi-q4-etron",
    category: "Comparison",
    titleEn: "Tesla Model Y vs Audi Q4 e-tron snapshot",
    titleBg: "Tesla Model Y срещу Audi Q4 e-tron накратко",
    textEn: "Short visual comparison for space, charging and family usability.",
    textBg: "Кратко визуално сравнение за пространство, зареждане и семейна употреба.",
    stats: [
      ["Space", "Family priority", "👨‍👩‍👧‍👦"],
      ["Efficiency", "Daily cost factor", "📉"],
      ["Charging", "Convenience matters", "⚡"],
      ["Use case", "Depends on lifestyle", "✅"],
    ],
    checklistEn: [
      ["Cabin", "Check rear comfort and storage", "🛋"],
      ["Efficiency", "Compare real road use", "📉"],
      ["Charging", "Assess trip convenience", "⚡"],
      ["Family use", "Match to daily needs", "👨‍👩‍👧‍👦"],
    ],
    checklistBg: [
      ["Купе", "Провери комфорт и място", "🛋"],
      ["Ефективност", "Сравни реалната употреба", "📉"],
      ["Зареждане", "Оцени удобството при пътуване", "⚡"],
      ["Семейна употреба", "Съобрази с ежедневните нужди", "👨‍👩‍👧‍👦"],
    ],
  },
  {
    slug: "used-tesla-prices-europe",
    category: "Market Insight",
    titleEn: "Used Tesla price drivers",
    titleBg: "Какво движи цените на употребявани Tesla",
    textEn: "Visual summary of the main price factors across Europe.",
    textBg: "Визуално обобщение на основните фактори за цените в Европа.",
    stats: [
      ["Mileage", "Major factor", "🛣"],
      ["Battery", "Affects value", "🔋"],
      ["Trim", "Changes pricing", "⭐"],
      ["Country", "Market differences", "🌍"],
    ],
    checklistEn: [
      ["Mileage", "Compare with condition", "🛣"],
      ["Battery", "Review degradation and chemistry", "🔋"],
      ["Spec", "Trim and options matter", "⭐"],
      ["Market", "Compare by country and supply", "🌍"],
    ],
    checklistBg: [
      ["Пробег", "Сравни със състоянието", "🛣"],
      ["Батерия", "Прегледай деградация и химия", "🔋"],
      ["Оборудване", "Има значение за цената", "⭐"],
      ["Пазар", "Сравни по държава и предлагане", "🌍"],
    ],
  },
  {
    slug: "tesla-ownership-costs-europe",
    category: "Tesla Ownership",
    titleEn: "Tesla ownership cost snapshot",
    titleBg: "Обобщение на разходите за притежание на Tesla",
    textEn: "Visual overview of charging, maintenance, tyres and insurance costs.",
    textBg: "Визуален преглед на зареждане, поддръжка, гуми и застраховка.",
    stats: [
      ["Charging", "Monthly base", "🔌"],
      ["Tyres", "Wear item", "🛞"],
      ["Insurance", "Location sensitive", "🛡"],
      ["Maintenance", "Lower but not zero", "🧰"],
    ],
    checklistEn: [
      ["Charging", "Estimate home and public spend", "🔌"],
      ["Tyres", "Plan for performance tyre wear", "🛞"],
      ["Insurance", "Compare by market", "🛡"],
      ["Maintenance", "Track suspension and brakes", "🧰"],
    ],
    checklistBg: [
      ["Зареждане", "Оцени домашните и публичните разходи", "🔌"],
      ["Гуми", "Планирай износването", "🛞"],
      ["Застраховка", "Сравни по пазар", "🛡"],
      ["Поддръжка", "Следи окачване и спирачки", "🧰"],
    ],
  },
];

function svgTemplate({title, subtitle, category, stats}) {
  const cards = stats
    .map((item, i) => {
      const x = 60 + (i % 2) * 420;
      const y = 250 + Math.floor(i / 2) * 140;
      return `
      <rect x="${x}" y="${y}" width="360" height="100" rx="20" fill="#ffffff" stroke="#e5e7eb"/>
      <text x="${x + 24}" y="${y + 38}" font-size="18" font-weight="700" fill="#111827">${escapeXml(item[2] || "")} ${escapeXml(item[0])}</text>
      <text x="${x + 24}" y="${y + 72}" font-size="28" font-weight="800" fill="#111827">${escapeXml(item[1])}</text>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="900" height="560" viewBox="0 0 900 560" xmlns="http://www.w3.org/2000/svg">
    <rect width="900" height="560" fill="#f8fafc"/>
    <rect x="30" y="30" width="840" height="500" rx="28" fill="#f3f4f6" stroke="#e5e7eb"/>
    <text x="60" y="90" font-size="14" font-weight="700" fill="#6b7280">${escapeXml(category.toUpperCase())}</text>
    <text x="60" y="145" font-size="34" font-weight="800" fill="#111827">${escapeXml(title)}</text>
    <text x="60" y="185" font-size="18" font-weight="500" fill="#4b5563">${escapeXml(subtitle)}</text>
    ${cards}
    <text x="60" y="500" font-size="14" font-weight="700" fill="#6b7280">Voltique guide visual</text>
  </svg>`;
}

function escapeXml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function localeString(en, bg) {
  return {en, bg};
}

function makeGuideVisualBlock({style, titleEn, titleBg, textEn, textBg, imageRef, itemsEn, itemsBg}) {
  const block = {
    _type: "guideVisual",
    _key: cryptoLikeKey(),
    style,
    title: localeString(titleEn, titleBg),
    text: {en: textEn, bg: textBg},
  };

  if (imageRef) {
    block.image = {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: imageRef,
      },
    };
  }

  if (itemsEn && itemsBg) {
    block.items = itemsEn.map((item, idx) => ({
      _key: cryptoLikeKey(),
      label: localeString(item[0], itemsBg[idx][0]),
      value: item[1],
      icon: item[2],
    }));
  }

  return block;
}

function cryptoLikeKey() {
  return Math.random().toString(36).slice(2, 12);
}

async function uploadSvg(slug, title, subtitle, category, stats) {
  const dir = path.join(process.cwd(), "tmp-infographics");
  await fs.mkdir(dir, {recursive: true});
  const filePath = path.join(dir, `${slug}.svg`);
  const svg = svgTemplate({title, subtitle, category, stats});
  await fs.writeFile(filePath, svg, "utf8");
  const stream = await fs.open(filePath, "r");
  try {
    const asset = await client.assets.upload("image", stream.createReadStream(), {
      filename: `${slug}.svg`,
      contentType: "image/svg+xml",
    });
    return asset._id;
  } finally {
    await stream.close();
  }
}

async function main() {
  const posts = await client.fetch(`*[_type=="post" && defined(slug.current)]{_id, slug, bodyEn, bodyBg}`);
  const bySlug = new Map(posts.map((p) => [p.slug?.current, p]));

  for (const guide of guides) {
    const post = bySlug.get(guide.slug);
    if (!post?._id) {
      console.log(`skip: ${guide.slug} not found`);
      continue;
    }

    const assetId = await uploadSvg(
      guide.slug,
      guide.titleEn,
      guide.textEn,
      guide.category,
      guide.stats
    );

    const infographic = makeGuideVisualBlock({
      style: "infographic",
      titleEn: guide.titleEn,
      titleBg: guide.titleBg,
      textEn: guide.textEn,
      textBg: guide.textBg,
      imageRef: assetId,
    });

    const statCard = makeGuideVisualBlock({
      style: "statCard",
      titleEn: "Key stats",
      titleBg: "Ключови показатели",
      textEn: "Quick technical and buying summary.",
      textBg: "Бързо техническо и покупателно обобщение.",
      itemsEn: guide.stats,
      itemsBg: guide.stats,
    });

    const checklist = makeGuideVisualBlock({
      style: "checklistBox",
      titleEn: "What to verify",
      titleBg: "Какво да проверите",
      textEn: "Core checkpoints before making a decision.",
      textBg: "Основни проверки преди финално решение.",
      itemsEn: guide.checklistEn,
      itemsBg: guide.checklistBg,
    });

    const hasVisualEn = Array.isArray(post.bodyEn) && post.bodyEn.some((b) => b?._type === "guideVisual");
    const hasVisualBg = Array.isArray(post.bodyBg) && post.bodyBg.some((b) => b?._type === "guideVisual");

    const nextBodyEn = hasVisualEn ? post.bodyEn : [infographic, statCard, checklist, ...(post.bodyEn || [])];
    const nextBodyBg = hasVisualBg ? post.bodyBg : [infographic, statCard, checklist, ...(post.bodyBg || [])];

    await client.patch(post._id).set({
      bodyEn: nextBodyEn,
      bodyBg: nextBodyBg,
    }).commit();

    console.log(`updated: ${guide.slug}`);
  }

  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
