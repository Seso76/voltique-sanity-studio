import fs from "node:fs/promises";
import path from "node:path";
import {getCliClient} from "sanity/cli";

const client = getCliClient({apiVersion: "2025-01-01"});

function key() {
  return Math.random().toString(36).slice(2, 12);
}

function locale(en, bg) {
  return {en, bg};
}

function block(style, text) {
  return {
    _type: "block",
    _key: key(),
    style,
    children: [{_type: "span", text}],
  };
}

function bullet(text) {
  return {
    _type: "block",
    _key: key(),
    listItem: "bullet",
    children: [{_type: "span", text}],
  };
}

function visual({style, titleEn, titleBg, textEn, textBg, imageRef, items}) {
  const result = {
    _type: "guideVisual",
    _key: key(),
    style,
    title: locale(titleEn, titleBg),
    text: locale(textEn, textBg),
  };

  if (imageRef) {
    result.image = {
      _type: "image",
      asset: {_type: "reference", _ref: imageRef},
    };
  }

  if (items?.length) {
    result.items = items.map((item) => ({
      _key: key(),
      icon: item.icon ?? "",
      label: locale(item.en, item.bg),
      value: item.value ?? "",
    }));
  }

  return result;
}

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
      <path d="M ${x + size * 0.24} ${y + size * 0.84} L ${x + size * 0.86} ${y + size * 0.84}" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
    `;
  }

  if (category === "Market Insight") {
    return `
      <rect x="${x}" y="${y + size * 0.48}" width="${size * 0.18}" height="${size * 0.38}" rx="8" fill="${accent}"/>
      <rect x="${x + size * 0.26}" y="${y + size * 0.30}" width="${size * 0.18}" height="${size * 0.56}" rx="8" fill="${accent}" opacity="0.8"/>
      <rect x="${x + size * 0.52}" y="${y + size * 0.18}" width="${size * 0.18}" height="${size * 0.68}" rx="8" fill="${accent}" opacity="0.65"/>
      <path d="M ${x + size * 0.02} ${y + size * 0.72} C ${x + size * 0.22} ${y + size * 0.54}, ${x + size * 0.42} ${y + size * 0.62}, ${x + size * 0.68} ${y + size * 0.28}" stroke="${accent}" stroke-width="8" fill="none" stroke-linecap="round"/>
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
    <path d="M ${x + size * 0.16} ${y + size * 0.56} C ${x + size * 0.26} ${y + size * 0.26}, ${x + size * 0.48} ${y + size * 0.16}, ${x + size * 0.78} ${y + size * 0.24}" stroke="${accent}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M ${x + size * 0.18} ${y + size * 0.58} L ${x + size * 0.22} ${y + size * 0.86} L ${x + size * 0.74} ${y + size * 0.86} L ${x + size * 0.80} ${y + size * 0.54}" stroke="${accent}" stroke-width="8" fill="none" stroke-linejoin="round"/>
    <circle cx="${x + size * 0.30}" cy="${y + size * 0.88}" r="${size * 0.08}" fill="${accent}"/>
    <circle cx="${x + size * 0.66}" cy="${y + size * 0.88}" r="${size * 0.08}" fill="${accent}"/>
    <path d="M ${x + size * 0.44} ${y + size * 0.44} L ${x + size * 0.56} ${y + size * 0.58} L ${x + size * 0.78} ${y + size * 0.28}" stroke="${accent}" stroke-width="8" fill="none" stroke-linecap="round"/>
  `;
}

function coverSvg(category) {
  const style = styleMap[category] ?? styleMap["Buying Guide"];
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
    <rect width="1600" height="900" fill="#f8fafc"/>
    <rect x="64" y="64" width="1472" height="772" rx="42" fill="${style.soft}" stroke="#e5e7eb"/>
    <rect x="120" y="120" width="1360" height="660" rx="36" fill="#ffffff" stroke="#e5e7eb"/>
    <rect x="160" y="160" width="320" height="20" rx="10" fill="${style.accent}" opacity="0.12"/>
    <rect x="160" y="210" width="220" height="16" rx="8" fill="${style.accent}" opacity="0.08"/>
    <rect x="160" y="250" width="180" height="16" rx="8" fill="${style.accent}" opacity="0.06"/>
    <rect x="880" y="180" width="420" height="420" rx="40" fill="${style.soft}" stroke="#e5e7eb"/>
    ${categoryIcon(category, 980, 270, 220, style.accent)}
    <rect x="160" y="620" width="520" height="36" rx="18" fill="${style.accent}" opacity="0.05"/>
    <rect x="160" y="680" width="420" height="28" rx="14" fill="${style.accent}" opacity="0.05"/>
    <rect x="880" y="650" width="420" height="48" rx="24" fill="${style.accent}" opacity="0.06"/>
  </svg>`;
}

function infographicSvg(category) {
  const style = styleMap[category] ?? styleMap["Buying Guide"];
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="1200" height="700" viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="700" fill="#f8fafc"/>
    <rect x="40" y="40" width="1120" height="620" rx="34" fill="#ffffff" stroke="#e5e7eb"/>
    <rect x="80" y="90" width="200" height="18" rx="9" fill="${style.accent}" opacity="0.10"/>
    <rect x="80" y="130" width="300" height="14" rx="7" fill="${style.accent}" opacity="0.06"/>
    <rect x="80" y="220" width="470" height="170" rx="24" fill="${style.soft}" stroke="#e5e7eb"/>
    <rect x="650" y="220" width="470" height="170" rx="24" fill="${style.soft}" stroke="#e5e7eb"/>
    <rect x="80" y="430" width="470" height="170" rx="24" fill="${style.soft}" stroke="#e5e7eb"/>
    <rect x="650" y="430" width="470" height="170" rx="24" fill="${style.soft}" stroke="#e5e7eb"/>
    ${categoryIcon(category, 200, 255, 90, style.accent)}
    ${categoryIcon(category, 770, 255, 90, style.accent)}
    ${categoryIcon(category, 200, 465, 90, style.accent)}
    ${categoryIcon(category, 770, 465, 90, style.accent)}
    <rect x="320" y="280" width="160" height="16" rx="8" fill="${style.accent}" opacity="0.12"/>
    <rect x="320" y="318" width="120" height="12" rx="6" fill="${style.accent}" opacity="0.08"/>
    <rect x="890" y="280" width="160" height="16" rx="8" fill="${style.accent}" opacity="0.12"/>
    <rect x="890" y="318" width="120" height="12" rx="6" fill="${style.accent}" opacity="0.08"/>
    <rect x="320" y="490" width="160" height="16" rx="8" fill="${style.accent}" opacity="0.12"/>
    <rect x="320" y="528" width="120" height="12" rx="6" fill="${style.accent}" opacity="0.08"/>
    <rect x="890" y="490" width="160" height="16" rx="8" fill="${style.accent}" opacity="0.12"/>
    <rect x="890" y="528" width="120" height="12" rx="6" fill="${style.accent}" opacity="0.08"/>
  </svg>`;
}

async function uploadSvg(filename, svg) {
  const dir = path.join(process.cwd(), "tmp-guide-assets");
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

const ARTICLES = [
  {
    slug: "tesla-model-3-buying-guide",
    category: "Buying Guide",
    coverAlt: "Tesla Model 3 guide cover",
    infographicTitleEn: "Model 3 buyer snapshot",
    infographicTitleBg: "Обобщение за купувача на Model 3",
    infographicTextEn: "Simple visual summary for a used Model 3 evaluation.",
    infographicTextBg: "Кратко визуално обобщение за оценка на употребявана Model 3.",
    stats: [
      {icon: "⚡", en: "Range", bg: "Пробег", value: "420–510 km"},
      {icon: "🔋", en: "Battery", bg: "Батерия", value: "LFP / NCA"},
      {icon: "🔌", en: "Charging", bg: "Зареждане", value: "AC / DC"},
      {icon: "✅", en: "Focus", bg: "Фокус", value: "Battery check"},
    ],
    checklist: [
      {icon: "🔋", en: "Battery health", bg: "Здраве на батерията"},
      {icon: "🧾", en: "Charging history", bg: "История на зареждане"},
      {icon: "🛠", en: "Body and paint", bg: "Купе и боя"},
      {icon: "🛞", en: "Tyres and suspension", bg: "Гуми и окачване"},
    ],
    en: [
      block("normal", "The Tesla Model 3 is still one of the most relevant used EV purchases in Europe because it combines strong efficiency, good software support and access to Tesla’s charging ecosystem."),
      block("h2", "Why the Model 3 remains attractive"),
      block("normal", "For many buyers, the Model 3 offers the best balance between technology, operating cost and long-term usability. It feels modern, efficient and easy to live with if the condition is right."),
      block("h2", "Battery chemistry and charging behaviour"),
      block("h3", "LFP versions"),
      block("normal", "LFP variants are attractive for drivers who want durable daily use and less stress around regular charging. They are often appreciated for stable behaviour in everyday ownership."),
      block("h3", "NCA versions"),
      block("normal", "NCA versions can deliver strong performance and useful real-world range. When buying used, the charging pattern and battery condition become especially important."),
      block("h2", "What to inspect before buying"),
      bullet("Battery health, displayed range and consistency in charging behaviour"),
      bullet("Body condition, paint quality, panel fit and accident history"),
      bullet("Tyre wear, suspension noises and brake condition"),
      bullet("Ownership transfer readiness, software status and app access"),
      block("h2", "Ownership costs and daily usability"),
      block("normal", "A Model 3 can remain cost-effective when home charging is available and the car is not hiding expensive wear items. Tyres, insurance and battery condition all influence the real ownership picture."),
      block("h2", "Final verdict"),
      block("normal", "A used Tesla Model 3 is a strong 2025 buy when the battery, charging history and physical condition match the asking price. The best examples combine healthy battery behaviour with clear ownership history."),
    ],
    bg: [
      block("normal", "Tesla Model 3 остава една от най-смислените покупки на употребяван електромобил в Европа, защото съчетава добра ефективност, силен софтуер и достъп до зарядната екосистема на Tesla."),
      block("h2", "Защо Model 3 остава толкова атрактивна"),
      block("normal", "За много купувачи Model 3 предлага най-добрия баланс между технологии, разходи за употреба и дългосрочна практичност. Автомобилът се усеща модерен, ефективен и лесен за живеене, ако състоянието му е добро."),
      block("h2", "Химия на батерията и поведение при зареждане"),
      block("h3", "LFP версии"),
      block("normal", "LFP вариантите са привлекателни за шофьори, които искат по-спокойна ежедневна употреба и по-малко притеснение около редовното зареждане. Често се ценят заради стабилното си поведение."),
      block("h3", "NCA версии"),
      block("normal", "NCA вариантите могат да предложат добра динамика и полезен реален пробег. При употребяван автомобил историята на зареждане и състоянието на батерията стават особено важни."),
      block("h2", "Какво да се провери преди покупка"),
      bullet("Здраве на батерията, показван пробег и последователност при зареждане"),
      bullet("Състояние на купето, боята, фугите и история на удари"),
      bullet("Износване на гуми, шумове от окачването и състояние на спирачките"),
      bullet("Готовност за прехвърляне на собствеността, софтуер и достъп до приложението"),
      block("h2", "Разходи за притежание и ежедневна употреба"),
      block("normal", "Model 3 може да остане изгодна за поддръжка, ако има възможност за домашно зареждане и автомобилът не крие скъпи консумативи. Гуми, застраховка и състояние на батерията определят реалната картина."),
      block("h2", "Финална оценка"),
      block("normal", "Употребяваната Tesla Model 3 е силна покупка през 2025 г., когато батерията, историята на зареждане и общото състояние отговарят на цената. Най-добрите екземпляри съчетават здрава батерия и ясна история."),
    ],
  },
  {
    slug: "tesla-model-y-buying-guide",
    category: "Buying Guide",
    coverAlt: "Tesla Model Y guide cover",
    infographicTitleEn: "Model Y buyer snapshot",
    infographicTitleBg: "Обобщение за купувача на Model Y",
    infographicTextEn: "Practical visual guide for a used Model Y evaluation.",
    infographicTextBg: "Практично визуално ръководство за оценка на употребявана Model Y.",
    stats: [
      {icon: "👨‍👩‍👧‍👦", en: "Use", bg: "Употреба", value: "Family-ready"},
      {icon: "⚡", en: "Range", bg: "Пробег", value: "Strong daily use"},
      {icon: "📦", en: "Space", bg: "Пространство", value: "More cargo"},
      {icon: "✅", en: "Focus", bg: "Фокус", value: "Tyres + battery"},
    ],
    checklist: [
      {icon: "🔋", en: "Battery condition", bg: "Състояние на батерията"},
      {icon: "📦", en: "Cargo area", bg: "Багажно пространство"},
      {icon: "🛞", en: "Tyres and alignment", bg: "Гуми и реглаж"},
      {icon: "💻", en: "Software features", bg: "Софтуерни функции"},
    ],
    en: [
      block("normal", "The Tesla Model Y is one of the most practical EVs on the used market because it combines crossover versatility with Tesla efficiency and charging convenience."),
      block("h2", "Why buyers choose the Model Y"),
      block("normal", "For many households, the Model Y solves the need for more cargo flexibility, easier family use and higher seating position without giving up the efficiency advantages of Tesla ownership."),
      block("h2", "Battery, range and charging"),
      block("normal", "The battery condition, charging habits and seasonal efficiency all shape the long-term value of a used Model Y. Buyers should focus on real usage profile rather than brochure claims alone."),
      block("h2", "What deserves extra inspection"),
      bullet("Tyres and alignment because weight and torque can accelerate wear"),
      bullet("Rear cargo floor, trim and family-use wear"),
      bullet("Battery state, charging history and software condition"),
      bullet("Paint consistency, glass and accident repair quality"),
      block("h2", "Who benefits most from a used Model Y"),
      block("normal", "A used Model Y suits buyers who need more flexibility than a sedan but still want low running cost, modern software and an EV-friendly charging experience."),
      block("h2", "Final verdict"),
      block("normal", "A used Model Y is often a very strong family EV buy when specification, battery condition and general wear are aligned with the price."),
    ],
    bg: [
      block("normal", "Tesla Model Y е един от най-практичните електромобили на пазара за употребявани автомобили, защото съчетава кросоувър гъвкавост с Tesla ефективност и удобно зареждане."),
      block("h2", "Защо купувачите избират Model Y"),
      block("normal", "За много семейства Model Y решава нуждата от повече багажно пространство, по-лесна семейна употреба и по-висока позиция на седене, без да се губят предимствата на Tesla ефективността."),
      block("h2", "Батерия, пробег и зареждане"),
      block("normal", "Състоянието на батерията, навиците на зареждане и сезонната ефективност определят дългосрочната стойност на една употребявана Model Y. Важно е да се гледа реалният профил на употреба."),
      block("h2", "Какво заслужава допълнителен оглед"),
      bullet("Гуми и реглаж, защото теглото и въртящият момент ускоряват износването"),
      bullet("Подът на багажника, облицовките и следите от семейна употреба"),
      bullet("Състояние на батерията, история на зареждане и софтуер"),
      bullet("Постоянство на боята, стъкла и качество на ремонтите след удар"),
      block("h2", "За кого е най-подходяща"),
      block("normal", "Употребяваната Model Y е подходяща за купувачи, които искат повече гъвкавост от седан, но държат на ниски разходи, модерен софтуер и добро EV изживяване."),
      block("h2", "Финална оценка"),
      block("normal", "Употребяваната Model Y често е много силен семеен EV избор, когато оборудването, батерията и степента на износване са в баланс с цената."),
    ],
  },
  {
    slug: "used-tesla-checklist",
    category: "Buying Guide",
    coverAlt: "Used Tesla checklist cover",
    infographicTitleEn: "Used Tesla checklist snapshot",
    infographicTitleBg: "Обобщение на чеклист за употребявана Tesla",
    infographicTextEn: "Core checks before you make a buying decision.",
    infographicTextBg: "Основни проверки преди финално решение за покупка.",
    stats: [
      {icon: "🔋", en: "Battery", bg: "Батерия", value: "Check first"},
      {icon: "🛠", en: "Body", bg: "Купе", value: "Repair signs"},
      {icon: "🧾", en: "Docs", bg: "Документи", value: "Ownership trail"},
      {icon: "💻", en: "Software", bg: "Софтуер", value: "App + features"},
    ],
    checklist: [
      {icon: "🔋", en: "Battery and range", bg: "Батерия и пробег"},
      {icon: "🎨", en: "Paint and repairs", bg: "Боя и ремонти"},
      {icon: "🛞", en: "Tyres and wheels", bg: "Гуми и джанти"},
      {icon: "📄", en: "Documents and transfer", bg: "Документи и прехвърляне"},
    ],
    en: [
      block("normal", "A used Tesla can be an excellent buy, but only when the inspection goes beyond cosmetics and covers battery behaviour, charging history, structure and ownership documentation."),
      block("h2", "Battery and charging checks"),
      bullet("Review battery condition and expected real-world range"),
      bullet("Look at charging history and frequent DC use"),
      bullet("Check whether charging behaviour appears stable and predictable"),
      block("h2", "Exterior and structural inspection"),
      bullet("Inspect paint differences, panel alignment and glass"),
      bullet("Look for signs of accident repair or structural work"),
      bullet("Check wheel condition, tyre wear and underbody clues"),
      block("h2", "Interior and software"),
      bullet("Test screen responsiveness and app pairing"),
      bullet("Inspect wear on seats, trim and controls"),
      bullet("Confirm key features and software status"),
      block("h2", "Documents and ownership"),
      bullet("Review registration and ownership papers"),
      bullet("Check whether ownership transfer can be completed smoothly"),
      block("h2", "Final verdict"),
      block("normal", "The safest used Tesla purchases happen when battery, body, software and paperwork are all verified together instead of being judged separately."),
    ],
    bg: [
      block("normal", "Употребяваната Tesla може да бъде отлична покупка, но само когато огледът не се ограничава до козметиката, а включва поведението на батерията, историята на зареждане, конструкцията и документите за собственост."),
      block("h2", "Проверки на батерията и зареждането"),
      bullet("Прегледай състоянието на батерията и очаквания реален пробег"),
      bullet("Провери историята на зареждане и честото DC ползване"),
      bullet("Виж дали поведението при зареждане изглежда стабилно и предвидимо"),
      block("h2", "Външен и конструктивен оглед"),
      bullet("Огледай разлики в боята, фугите и стъклата"),
      bullet("Търси следи от ремонти след удар или конструктивна намеса"),
      bullet("Провери джанти, износване на гумите и признаци от долната част"),
      block("h2", "Интериор и софтуер"),
      bullet("Тествай екрана и свързването с приложението"),
      bullet("Огледай износването на седалки, облицовки и бутони"),
      bullet("Потвърди активните функции и версията на софтуера"),
      block("h2", "Документи и собственост"),
      bullet("Прегледай регистрационни и собственически документи"),
      bullet("Провери дали прехвърлянето на собствеността може да стане безпроблемно"),
      block("h2", "Финална оценка"),
      block("normal", "Най-сигурните покупки на употребявана Tesla се правят, когато батерията, купето, софтуерът и документите се проверяват заедно, а не поотделно."),
    ],
  },
  {
    slug: "tesla-battery-health-explained",
    category: "Battery",
    coverAlt: "Tesla battery health guide cover",
    infographicTitleEn: "Battery health snapshot",
    infographicTitleBg: "Обобщение за здравето на батерията",
    infographicTextEn: "Simple visual explanation of the main battery condition factors.",
    infographicTextBg: "Кратко визуално обяснение на основните фактори за състоянието на батерията.",
    stats: [
      {icon: "🛣", en: "Mileage", bg: "Пробег", value: "Key factor"},
      {icon: "⚡", en: "DC use", bg: "DC зареждане", value: "Can matter"},
      {icon: "🌡", en: "Heat", bg: "Температура", value: "Affects wear"},
      {icon: "📉", en: "Goal", bg: "Цел", value: "Stable decline"},
    ],
    checklist: [
      {icon: "🔋", en: "Capacity behaviour", bg: "Поведение на капацитета"},
      {icon: "⚡", en: "Charging pattern", bg: "Модел на зареждане"},
      {icon: "🌡", en: "Thermal exposure", bg: "Температурно натоварване"},
      {icon: "📊", en: "Range consistency", bg: "Постоянство на пробега"},
    ],
    en: [
      block("normal", "Battery health is one of the most important topics in used Tesla buying because it directly influences practical range, long-term value and buyer confidence."),
      block("h2", "What battery health really means"),
      block("normal", "Battery health describes how much usable capacity remains compared with the original battery state. It is not just one number but a wider picture of how the car has aged."),
      block("h2", "Main causes of degradation"),
      bullet("High accumulated mileage"),
      bullet("Frequent fast charging over long periods"),
      bullet("Repeated exposure to heat"),
      bullet("Driving style and charging routine"),
      block("h2", "How buyers should judge battery condition"),
      block("normal", "Battery condition should be evaluated together with range behaviour, charging history, age, climate exposure and how the car was actually used."),
      block("h2", "What healthy battery behaviour looks like"),
      block("normal", "A healthy used Tesla usually delivers stable range estimates, predictable charging and no obvious signs of abnormal thermal or degradation behaviour."),
      block("h2", "Final verdict"),
      block("normal", "Battery health is not a minor technical detail. It is one of the strongest drivers of used Tesla quality, value retention and ownership confidence."),
    ],
    bg: [
      block("normal", "Здравето на батерията е една от най-важните теми при покупка на употребявана Tesla, защото влияе директно върху практичния пробег, дългосрочната стойност и увереността на купувача."),
      block("h2", "Какво всъщност означава здраве на батерията"),
      block("normal", "Здравето на батерията показва каква част от използваемия капацитет е останала спрямо първоначалното състояние. Това не е просто едно число, а цялостна картина на стареенето."),
      block("h2", "Основни причини за деградация"),
      bullet("Голям натрупан пробег"),
      bullet("Често бързо зареждане за дълги периоди"),
      bullet("Повтарящо се излагане на топлина"),
      bullet("Стил на шофиране и рутина на зареждане"),
      block("h2", "Как купувачите да оценяват батерията"),
      block("normal", "Състоянието на батерията трябва да се гледа заедно с поведението на пробега, историята на зареждане, възрастта, климатичните условия и реалната употреба на автомобила."),
      block("h2", "Как изглежда здрава батерия"),
      block("normal", "Здравата употребявана Tesla обикновено дава стабилни оценки за пробег, предвидимо зареждане и няма очевидни признаци за необичайно термично или деградационно поведение."),
      block("h2", "Финална оценка"),
      block("normal", "Здравето на батерията не е второстепенен технически детайл. То е един от най-силните фактори за качеството, стойността и спокойствието при притежание на употребявана Tesla."),
    ],
  },
  {
    slug: "lfp-vs-nca-tesla-batteries",
    category: "Battery",
    coverAlt: "Tesla battery chemistry comparison cover",
    infographicTitleEn: "LFP vs NCA snapshot",
    infographicTitleBg: "LFP срещу NCA накратко",
    infographicTextEn: "Minimal visual comparison of the two main Tesla battery chemistries.",
    infographicTextBg: "Минималистично визуално сравнение на двете основни Tesla батерийни химии.",
    stats: [
      {icon: "🔋", en: "LFP", bg: "LFP", value: "Durability"},
      {icon: "🚀", en: "NCA", bg: "NCA", value: "Performance"},
      {icon: "🔌", en: "Charging", bg: "Зареждане", value: "Different habits"},
      {icon: "👤", en: "Fit", bg: "Подходяща за", value: "Use case"},
    ],
    checklist: [
      {icon: "🔋", en: "Daily charge tolerance", bg: "Толеранс към ежедневно зареждане"},
      {icon: "🚀", en: "Performance priority", bg: "Приоритет към динамика"},
      {icon: "🌍", en: "Climate conditions", bg: "Климатични условия"},
      {icon: "🧭", en: "Driving profile", bg: "Профил на шофиране"},
    ],
    en: [
      block("normal", "Tesla battery chemistry matters because it changes charging strategy, durability expectations and the type of driving profile each version supports best."),
      block("h2", "What LFP usually offers"),
      block("normal", "LFP batteries are often appreciated for stable daily use, predictable behaviour and strong durability in routine charging scenarios."),
      block("h2", "What NCA usually offers"),
      block("normal", "NCA batteries are often associated with strong performance and competitive range figures, especially for buyers who prioritise dynamic use."),
      block("h2", "Charging differences"),
      bullet("LFP is generally more comfortable with frequent high daily charge"),
      bullet("NCA usually benefits from more careful long-term charge strategy"),
      block("h2", "Which chemistry suits which buyer"),
      block("normal", "The better choice depends on climate, access to charging, route profile and whether the buyer values range, durability or driving feel most."),
      block("h2", "Final verdict"),
      block("normal", "Neither chemistry is universally superior. The correct battery is the one that matches the ownership pattern and expectations of the buyer."),
    ],
    bg: [
      block("normal", "Химията на Tesla батерията има значение, защото променя стратегията на зареждане, очакванията за издръжливост и типа шофиране, за който конкретният вариант е най-подходящ."),
      block("h2", "Какво обикновено предлага LFP"),
      block("normal", "LFP батериите често се ценят заради стабилната ежедневна употреба, предвидимото поведение и добрата издръжливост при рутинно зареждане."),
      block("h2", "Какво обикновено предлага NCA"),
      block("normal", "NCA батериите често се свързват със силна динамика и конкурентен пробег, особено за купувачи, които ценят по-спортно усещане."),
      block("h2", "Разлики при зареждането"),
      bullet("LFP обикновено е по-спокойна при често високо ежедневно зареждане"),
      bullet("NCA обикновено печели от по-внимателна дългосрочна стратегия на заряд"),
      block("h2", "Коя химия за кого е по-подходяща"),
      block("normal", "По-добрият избор зависи от климата, достъпа до зареждане, профила на маршрута и това дали купувачът цени повече пробег, издръжливост или динамика."),
      block("h2", "Финална оценка"),
      block("normal", "Нито една химия не е универсално по-добра. Правилната батерия е тази, която съответства на реалния модел на притежание и очакванията на купувача."),
    ],
  },
  {
    slug: "tesla-charging-guide-europe",
    category: "Charging",
    coverAlt: "Tesla charging guide cover",
    infographicTitleEn: "Charging snapshot",
    infographicTitleBg: "Обобщение за зареждането",
    infographicTextEn: "Minimal visual overview of home, AC and DC charging.",
    infographicTextBg: "Минималистичен визуален преглед на домашно, AC и DC зареждане.",
    stats: [
      {icon: "🏠", en: "Home", bg: "Домашно", value: "Daily base"},
      {icon: "🔌", en: "AC", bg: "AC", value: "Overnight"},
      {icon: "⚡", en: "DC", bg: "DC", value: "Trip-focused"},
      {icon: "✅", en: "Habit", bg: "Навик", value: "Charge wisely"},
    ],
    checklist: [
      {icon: "🏠", en: "Home setup", bg: "Домашна инсталация"},
      {icon: "🔌", en: "AC routine", bg: "AC рутина"},
      {icon: "⚡", en: "DC planning", bg: "DC планиране"},
      {icon: "🔋", en: "Battery-friendly habits", bg: "Навици щадящи батерията"},
    ],
    en: [
      block("normal", "Charging is one of the strongest advantages of Tesla ownership, but buyers still need to understand how home charging, AC public charging and DC fast charging serve different roles."),
      block("h2", "Home charging as the foundation"),
      block("normal", "For most owners, home charging is the cheapest and most convenient way to keep a Tesla ready for daily use. It often defines the overall ownership experience."),
      block("h2", "AC and DC charging serve different purposes"),
      block("h3", "AC charging"),
      block("normal", "AC charging is best for overnight use, workplace charging and predictable daily routines."),
      block("h3", "DC charging"),
      block("normal", "DC fast charging is most useful for road trips, motorway travel and situations where time matters more than price."),
      block("h2", "What makes a healthy charging routine"),
      bullet("Charge according to battery chemistry and daily needs"),
      bullet("Avoid leaving the car at unnecessarily high charge for long periods"),
      bullet("Use fast charging strategically rather than automatically"),
      block("h2", "Final verdict"),
      block("normal", "A well-understood charging routine reduces cost, supports battery condition and makes Tesla ownership far easier to manage."),
    ],
    bg: [
      block("normal", "Зареждането е едно от най-силните предимства при притежание на Tesla, но купувачите все пак трябва да разбират каква е ролята на домашното, публичното AC и DC бързото зареждане."),
      block("h2", "Домашното зареждане като основа"),
      block("normal", "За повечето собственици домашното зареждане е най-евтиният и удобен начин да държат Tesla готова за ежедневна употреба. Често то определя цялостното усещане от притежанието."),
      block("h2", "AC и DC имат различни роли"),
      block("h3", "AC зареждане"),
      block("normal", "AC зареждането е най-подходящо за нощно ползване, зареждане на работа и предвидими ежедневни рутини."),
      block("h3", "DC зареждане"),
      block("normal", "DC бързото зареждане е най-полезно при пътувания, магистрално каране и ситуации, в които времето е по-важно от цената."),
      block("h2", "Как изглежда здравословна рутина на зареждане"),
      bullet("Зареждай според химията на батерията и ежедневните нужди"),
      bullet("Не оставяй автомобила ненужно дълго на висок заряд"),
      bullet("Използвай бързото зареждане стратегически, а не автоматично"),
      block("h2", "Финална оценка"),
      block("normal", "Добре разбраната рутина на зареждане намалява разходите, подпомага състоянието на батерията и прави притежанието на Tesla значително по-лесно."),
    ],
  },
  {
    slug: "tesla-supercharger-costs-europe",
    category: "Charging",
    coverAlt: "Tesla Supercharger cost guide cover",
    infographicTitleEn: "Supercharger cost snapshot",
    infographicTitleBg: "Обобщение на разходите за Supercharger",
    infographicTextEn: "Minimal visual summary of the factors that shape charging cost on long trips.",
    infographicTextBg: "Минималистично визуално обобщение на факторите, които формират цената на зареждането при дълги пътувания.",
    stats: [
      {icon: "🌍", en: "Country", bg: "Държава", value: "Pricing varies"},
      {icon: "🕒", en: "Time", bg: "Час", value: "Can matter"},
      {icon: "📉", en: "Consumption", bg: "Разход", value: "Trip driver"},
      {icon: "€", en: "Cost", bg: "Цена", value: "Route-based"},
    ],
    checklist: [
      {icon: "🌍", en: "Local pricing", bg: "Местни тарифи"},
      {icon: "🧭", en: "Trip planning", bg: "Планиране на маршрут"},
      {icon: "📉", en: "Efficiency estimate", bg: "Оценка на ефективност"},
      {icon: "🏠", en: "Home charging share", bg: "Дял на домашно зареждане"},
    ],
    en: [
      block("normal", "Supercharger cost is an important ownership topic for Tesla drivers who expect regular motorway travel or cross-border driving within Europe."),
      block("h2", "What actually shapes Supercharger pricing"),
      bullet("Country-specific pricing and tax structure"),
      bullet("Station usage and time-based differences"),
      bullet("Vehicle efficiency and weather conditions"),
      block("h2", "Why full trip cost matters more than one charging session"),
      block("normal", "A trip is shaped not only by station price but also by energy consumption, speed, temperature and route profile. Looking at one charging stop alone can be misleading."),
      block("h2", "How to keep travel charging cost under control"),
      bullet("Use home charging whenever possible"),
      bullet("Plan long-distance stops intelligently"),
      bullet("Compare total travel energy, not only individual charger prices"),
      block("h2", "Final verdict"),
      block("normal", "The best way to think about Supercharger cost is as part of total travel planning rather than as an isolated standalone number."),
    ],
    bg: [
      block("normal", "Разходът за Supercharger е важна тема за Tesla шофьорите, които очакват редовно магистрално каране или пътуване между държави в Европа."),
      block("h2", "Какво всъщност определя цените на Supercharger"),
      bullet("Ценообразуване и данъчна логика по държави"),
      bullet("Натовареност на станцията и разлики според времето"),
      bullet("Ефективност на автомобила и климатични условия"),
      block("h2", "Защо общата цена на пътуването е по-важна от една зарядна сесия"),
      block("normal", "Едно пътуване се определя не само от цената на станцията, но и от разхода на енергия, скоростта, температурата и профила на маршрута. Самостоятелната сесия може да бъде подвеждаща."),
      block("h2", "Как да държиш разходите под контрол"),
      bullet("Използвай домашно зареждане, когато е възможно"),
      bullet("Планирай дългите пътувания по-умно"),
      bullet("Сравнявай общата енергия за маршрута, а не само цената на отделна станция"),
      block("h2", "Финална оценка"),
      block("normal", "Най-добрият начин да се мисли за цената на Supercharger е като част от цялостното планиране на пътуването, а не като изолирано число."),
    ],
  },
  {
    slug: "tesla-model-3-vs-bmw-i4",
    category: "Comparison",
    coverAlt: "Tesla Model 3 vs BMW i4 comparison cover",
    infographicTitleEn: "Model 3 vs i4 snapshot",
    infographicTitleBg: "Model 3 срещу i4 накратко",
    infographicTextEn: "Minimal visual comparison of efficiency, charging and ownership priorities.",
    infographicTextBg: "Минималистично визуално сравнение на ефективност, зареждане и приоритети при притежание.",
    stats: [
      {icon: "📉", en: "Efficiency", bg: "Ефективност", value: "Model 3 edge"},
      {icon: "🛋", en: "Cabin feel", bg: "Купе", value: "i4 appeal"},
      {icon: "⚡", en: "Charging", bg: "Зареждане", value: "Network matters"},
      {icon: "✅", en: "Choice", bg: "Избор", value: "Use case"},
    ],
    checklist: [
      {icon: "📉", en: "Real consumption", bg: "Реален разход"},
      {icon: "⚡", en: "Charging access", bg: "Достъп до зареждане"},
      {icon: "💻", en: "Software preference", bg: "Предпочитание към софтуер"},
      {icon: "🛋", en: "Cabin expectation", bg: "Очакване за интериор"},
    ],
    en: [
      block("normal", "Tesla Model 3 and BMW i4 target similar premium EV buyers, but they do not win for the same reasons. The better choice depends on what the buyer values most."),
      block("h2", "Efficiency and range logic"),
      block("normal", "Efficiency affects not only range but also charging cost, route planning and long-term ownership practicality. This is where many buyers feel the biggest everyday difference."),
      block("h2", "Charging ecosystem"),
      block("normal", "Charging convenience matters as much as official specification, especially for buyers who travel regularly across regions or countries."),
      block("h2", "Software versus traditional premium feel"),
      block("normal", "Some buyers prioritise route planning, software and app integration, while others want a more conventional premium interior and brand experience."),
      block("h2", "Who should choose which car"),
      block("normal", "Model 3 often fits buyers who value efficiency and Tesla ecosystem strengths. The i4 can appeal more to buyers who prioritise cabin feel and a classic premium brand identity."),
      block("h2", "Final verdict"),
      block("normal", "The right choice depends on whether efficiency and software or cabin feel and traditional premium character matter more in daily use."),
    ],
    bg: [
      block("normal", "Tesla Model 3 и BMW i4 са насочени към сходни премиум EV купувачи, но не печелят по едни и същи причини. По-добрият избор зависи от това какво е по-важно за конкретния човек."),
      block("h2", "Логика на ефективността и пробега"),
      block("normal", "Ефективността влияе не само на пробега, но и на цената на зареждане, планирането на маршрута и дългосрочната практичност. Тук много купувачи усещат най-голямата разлика."),
      block("h2", "Зарядна екосистема"),
      block("normal", "Удобството при зареждане е също толкова важно, колкото и официалната спецификация, особено за хора, които пътуват редовно между региони и държави."),
      block("h2", "Софтуер срещу класическо премиум усещане"),
      block("normal", "Някои купувачи дават приоритет на планирането на маршрути, софтуера и интеграцията с приложението, докато други искат по-традиционен премиум интериор и усещане за марка."),
      block("h2", "Кой трябва да избере кой автомобил"),
      block("normal", "Model 3 често подхожда на купувачи, които ценят ефективността и силните страни на Tesla екосистемата. i4 може да е по-привлекателен за хора, които търсят по-класическо премиум усещане."),
      block("h2", "Финална оценка"),
      block("normal", "Правилният избор зависи от това дали в ежедневната употреба са по-важни ефективността и софтуерът или интериорното усещане и традиционният премиум характер."),
    ],
  },
  {
    slug: "tesla-model-y-vs-audi-q4-etron",
    category: "Comparison",
    coverAlt: "Tesla Model Y vs Audi Q4 e-tron comparison cover",
    infographicTitleEn: "Model Y vs Q4 e-tron snapshot",
    infographicTitleBg: "Model Y срещу Q4 e-tron накратко",
    infographicTextEn: "Minimal visual comparison of family practicality and charging priorities.",
    infographicTextBg: "Минималистично визуално сравнение на семейна практичност и приоритети при зареждане.",
    stats: [
      {icon: "👨‍👩‍👧‍👦", en: "Family use", bg: "Семейна употреба", value: "Key lens"},
      {icon: "📦", en: "Space", bg: "Пространство", value: "Layout matters"},
      {icon: "⚡", en: "Charging", bg: "Зареждане", value: "Convenience"},
      {icon: "📉", en: "Efficiency", bg: "Ефективност", value: "Daily cost"},
    ],
    checklist: [
      {icon: "📦", en: "Storage flexibility", bg: "Гъвкавост на мястото"},
      {icon: "⚡", en: "Trip charging ease", bg: "Леснота при пътуване"},
      {icon: "🛋", en: "Cabin preference", bg: "Предпочитание към интериора"},
      {icon: "📉", en: "Running cost", bg: "Текущ разход"},
    ],
    en: [
      block("normal", "Tesla Model Y and Audi Q4 e-tron both target practical EV buyers, but they differ in how they balance efficiency, charging convenience and cabin priorities."),
      block("h2", "Space and everyday practicality"),
      block("normal", "Practicality is not only about luggage capacity. It is also about cabin layout, loading ease, storage logic and how the car fits family life."),
      block("h2", "Efficiency and charging comfort"),
      block("normal", "Efficiency affects daily energy cost, while charging convenience shapes how relaxed long-distance ownership feels over time."),
      block("h2", "What kind of buyer each car suits"),
      block("normal", "Model Y often suits buyers who value Tesla ecosystem advantages and efficiency. Q4 e-tron may appeal more to buyers who prefer a traditional premium visual and tactile feel."),
      block("h2", "Final verdict"),
      block("normal", "The better family EV depends on whether the buyer gives more weight to Tesla’s ecosystem and efficiency or to Audi’s design character and cabin identity."),
    ],
    bg: [
      block("normal", "Tesla Model Y и Audi Q4 e-tron са насочени към практични EV купувачи, но се различават по начина, по който балансират ефективност, удобство при зареждане и приоритети в интериора."),
      block("h2", "Пространство и ежедневна практичност"),
      block("normal", "Практичността не е само въпрос на литри в багажника. Тя е свързана и с подредбата на купето, удобството при товарене и това как автомобилът пасва на семейния живот."),
      block("h2", "Ефективност и комфорт при зареждане"),
      block("normal", "Ефективността влияе на ежедневния енергиен разход, а удобството при зареждане определя колко спокойно се усеща дългосрочната употреба при пътувания."),
      block("h2", "За какъв купувач е подходящ всеки модел"),
      block("normal", "Model Y често е подходящ за купувачи, които ценят Tesla екосистемата и ефективността. Q4 e-tron може да се хареса повече на хора, които предпочитат по-традиционно премиум усещане."),
      block("h2", "Финална оценка"),
      block("normal", "По-добрият семеен EV зависи от това дали купувачът дава по-голяма тежест на Tesla екосистемата и ефективността или на дизайна и интериорната идентичност на Audi."),
    ],
  },
  {
    slug: "used-tesla-prices-europe",
    category: "Market Insight",
    coverAlt: "Used Tesla prices in Europe cover",
    infographicTitleEn: "Used Tesla price snapshot",
    infographicTitleBg: "Обобщение на цените на употребявани Tesla",
    infographicTextEn: "Minimal visual summary of the main price drivers in Europe.",
    infographicTextBg: "Минималистично визуално обобщение на основните фактори за цените в Европа.",
    stats: [
      {icon: "🛣", en: "Mileage", bg: "Пробег", value: "Major factor"},
      {icon: "🔋", en: "Battery", bg: "Батерия", value: "Value driver"},
      {icon: "⭐", en: "Spec", bg: "Оборудване", value: "Changes price"},
      {icon: "🌍", en: "Market", bg: "Пазар", value: "Country-specific"},
    ],
    checklist: [
      {icon: "🛣", en: "Mileage vs condition", bg: "Пробег спрямо състояние"},
      {icon: "🔋", en: "Battery chemistry", bg: "Химия на батерията"},
      {icon: "⭐", en: "Trim and options", bg: "Ниво и опции"},
      {icon: "🌍", en: "Country demand", bg: "Търсене по държави"},
    ],
    en: [
      block("normal", "Used Tesla prices in Europe are influenced by more than age and mileage. Battery chemistry, market timing, trim and country-specific demand all shape value."),
      block("h2", "What affects used Tesla pricing the most"),
      bullet("Mileage and vehicle age"),
      bullet("Battery type and battery condition"),
      bullet("Specification, trim level and drivetrain"),
      bullet("Country market conditions and local demand"),
      block("h2", "Why headline price can be misleading"),
      block("normal", "A lower asking price does not automatically mean better value. Weak battery condition, poor repair quality or limited specification can distort the picture."),
      block("h2", "How buyers should judge value"),
      block("normal", "The best value appears where battery condition, vehicle quality, equipment and market timing are aligned rather than simply cheap."),
      block("h2", "Final verdict"),
      block("normal", "Used Tesla pricing in Europe should be understood through overall value quality, not only through the sticker number."),
    ],
    bg: [
      block("normal", "Цените на употребявани Tesla в Европа се влияят от много повече неща от възрастта и пробега. Химията на батерията, моментът на пазара, нивото на оборудване и търсенето по държави формират стойността."),
      block("h2", "Какво влияе най-много върху цената"),
      bullet("Пробег и възраст на автомобила"),
      bullet("Тип и състояние на батерията"),
      bullet("Спецификация, ниво на оборудване и задвижване"),
      bullet("Пазарни условия и местно търсене"),
      block("h2", "Защо крайната цена може да подвежда"),
      block("normal", "По-ниската обявена цена не означава автоматично по-добра стойност. Слаба батерия, некачествени ремонти или по-бедна спецификация могат да изкривят картината."),
      block("h2", "Как купувачите да оценяват стойността"),
      block("normal", "Най-добрата стойност се появява там, където състоянието на батерията, качеството на автомобила, оборудването и пазарният момент са в баланс, а не просто там, където цената е ниска."),
      block("h2", "Финална оценка"),
      block("normal", "Цените на употребявани Tesla в Европа трябва да се разбират през общото качество на стойността, а не само през числото на етикета."),
    ],
  },
  {
    slug: "tesla-ownership-costs-europe",
    category: "Tesla Ownership",
    coverAlt: "Tesla ownership costs guide cover",
    infographicTitleEn: "Ownership cost snapshot",
    infographicTitleBg: "Обобщение на разходите за притежание",
    infographicTextEn: "Minimal visual summary of the main Tesla ownership cost areas.",
    infographicTextBg: "Минималистично визуално обобщение на основните разходи при притежание на Tesla.",
    stats: [
      {icon: "🔌", en: "Charging", bg: "Зареждане", value: "Monthly base"},
      {icon: "🛞", en: "Tyres", bg: "Гуми", value: "Wear item"},
      {icon: "🛡", en: "Insurance", bg: "Застраховка", value: "Market-based"},
      {icon: "🧰", en: "Maintenance", bg: "Поддръжка", value: "Lower, not zero"},
    ],
    checklist: [
      {icon: "🔌", en: "Home and public charging", bg: "Домашно и публично зареждане"},
      {icon: "🛞", en: "Tyre wear planning", bg: "Планиране за гуми"},
      {icon: "🛡", en: "Insurance comparison", bg: "Сравнение на застраховка"},
      {icon: "🧰", en: "Suspension and brakes", bg: "Окачване и спирачки"},
    ],
    en: [
      block("normal", "Tesla ownership costs in Europe are often more manageable than many buyers expect, but they still depend on charging pattern, tyre wear, insurance and annual mileage."),
      block("h2", "Main cost areas"),
      bullet("Charging and electricity spend"),
      bullet("Tyres and wear rate"),
      bullet("Insurance level by market"),
      bullet("Maintenance, brakes and suspension over time"),
      block("h2", "Why charging profile matters so much"),
      block("normal", "A car charged mainly at home can look very different in monthly cost compared with one that relies heavily on public or fast charging."),
      block("h2", "How to estimate real ownership cost"),
      block("normal", "The best estimate combines mileage, charging access, insurance environment and tyre budget rather than using generic assumptions from the internet."),
      block("h2", "Final verdict"),
      block("normal", "Tesla ownership cost is usually predictable and manageable when buyers understand the real cost drivers before they buy."),
    ],
    bg: [
      block("normal", "Разходите за притежание на Tesla в Европа често са по-управляеми, отколкото много купувачи очакват, но все пак зависят от начина на зареждане, износването на гумите, застраховката и годишния пробег."),
      block("h2", "Основни категории разходи"),
      bullet("Зареждане и разход за електроенергия"),
      bullet("Гуми и темп на износване"),
      bullet("Ниво на застраховка според пазара"),
      bullet("Поддръжка, спирачки и окачване във времето"),
      block("h2", "Защо профилът на зареждане е толкова важен"),
      block("normal", "Автомобил, който се зарежда основно у дома, може да изглежда много различно като месечен разход спрямо такъв, който разчита силно на публично или бързо зареждане."),
      block("h2", "Как да се оцени реалният разход"),
      block("normal", "Най-добрата оценка комбинира пробег, достъп до зареждане, застрахователна среда и бюджет за гуми, вместо да използва общи предположения от интернет."),
      block("h2", "Финална оценка"),
      block("normal", "Разходите за притежание на Tesla обикновено са предвидими и управляеми, когато купувачът разбира реалните фактори още преди покупката."),
    ],
  },
];

async function main() {
  const posts = await client.fetch(`*[_type=="post" && defined(slug.current)]{_id, "slug": slug.current}`);
  const postMap = new Map(posts.map((p) => [p.slug, p._id]));

  for (const article of ARTICLES) {
    const id = postMap.get(article.slug);
    if (!id) {
      console.log(`skip: ${article.slug}`);
      continue;
    }

    const coverAssetId = await uploadSvg(`cover-${article.slug}.svg`, coverSvg(article.category));
    const infographicAssetId = await uploadSvg(`info-${article.slug}.svg`, infographicSvg(article.category));

    const bodyEn = [
      visual({
        style: "infographic",
        titleEn: article.infographicTitleEn,
        titleBg: article.infographicTitleBg,
        textEn: article.infographicTextEn,
        textBg: article.infographicTextBg,
        imageRef: infographicAssetId,
      }),
      ...article.en.slice(0, 2),
      visual({
        style: "statCard",
        titleEn: "Key guide signals",
        titleBg: "Ключови ориентири",
        textEn: "Quick reference points for a faster evaluation.",
        textBg: "Бързи ориентири за по-лесна оценка.",
        items: article.stats,
      }),
      ...article.en.slice(2, 8),
      visual({
        style: "checklistBox",
        titleEn: "Practical checkpoints",
        titleBg: "Практични проверки",
        textEn: "Simple checkpoints that support a better decision.",
        textBg: "Кратки проверки, които помагат за по-добро решение.",
        items: article.checklist,
      }),
      ...article.en.slice(8),
    ];

    const bodyBg = [
      visual({
        style: "infographic",
        titleEn: article.infographicTitleEn,
        titleBg: article.infographicTitleBg,
        textEn: article.infographicTextEn,
        textBg: article.infographicTextBg,
        imageRef: infographicAssetId,
      }),
      ...article.bg.slice(0, 2),
      visual({
        style: "statCard",
        titleEn: "Key guide signals",
        titleBg: "Ключови ориентири",
        textEn: "Quick reference points for a faster evaluation.",
        textBg: "Бързи ориентири за по-лесна оценка.",
        items: article.stats,
      }),
      ...article.bg.slice(2, 8),
      visual({
        style: "checklistBox",
        titleEn: "Practical checkpoints",
        titleBg: "Практични проверки",
        textEn: "Simple checkpoints that support a better decision.",
        textBg: "Кратки проверки, които помагат за по-добро решение.",
        items: article.checklist,
      }),
      ...article.bg.slice(8),
    ];

    await client
      .patch(id)
      .set({
        coverImage: {
          _type: "image",
          asset: {_type: "reference", _ref: coverAssetId},
          alt: article.coverAlt,
        },
        bodyEn,
        bodyBg,
      })
      .commit();

    console.log(`updated: ${article.slug}`);
  }

  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
