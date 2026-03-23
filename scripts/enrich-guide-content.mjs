import {getCliClient} from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

function key() {
  return Math.random().toString(36).slice(2, 12);
}

function block(style, text) {
  return {
    _type: "block",
    _key: key(),
    style,
    children: [{ _type: "span", text }],
  };
}

function bullet(text) {
  return {
    _type: "block",
    _key: key(),
    listItem: "bullet",
    children: [{ _type: "span", text }],
  };
}

function research(titleEn, titleBg, introEn, introBg, bulletsEn, bulletsBg) {
  return {
    en: [
      block("h2", titleEn),
      block("normal", introEn),
      ...bulletsEn.map(bullet),
    ],
    bg: [
      block("h2", titleBg),
      block("normal", introBg),
      ...bulletsBg.map(bullet),
    ],
  };
}

function insight(titleEn, titleBg, textEn, textBg) {
  return {
    en: [
      block("h2", titleEn),
      block("blockquote", textEn),
    ],
    bg: [
      block("h2", titleBg),
      block("blockquote", textBg),
    ],
  };
}

const articles = [
  {
    slug: "tesla-model-3-buying-guide",
    en: [
      block("normal", "The Tesla Model 3 remains one of the strongest used EV choices in Europe because it combines efficiency, software maturity, charging ecosystem access, and a clean ownership experience. For many buyers, it is still the benchmark for everyday premium EV usability."),
      block("h2", "Tesla Model 3 overview"),
      block("normal", "For many buyers, the Model 3 is the entry point into premium electric mobility. It offers strong efficiency, useful daily range, and a driving experience that still feels modern years after production."),
      ...research(
        "Research context: range, battery, and charging",
        "Практически контекст: пробег, батерия и зареждане",
        "Used Model 3 evaluation should not rely on catalogue range alone. Buyers need to combine battery chemistry, real driving profile, climate, and charging routine to understand the car properly.",
        "Оценката на употребявана Model 3 не трябва да се базира само на каталогичния пробег. Нужно е да се комбинират химията на батерията, реалният профил на шофиране, климатът и рутината на зареждане.",
        [
          "WLTP figures are useful for comparing versions, but real motorway and winter range can differ materially.",
          "Battery condition often matters more than headline mileage when two cars have similar pricing.",
          "Charging history helps explain whether displayed range behaviour is likely to remain stable.",
        ],
        [
          "WLTP стойностите са полезни за сравнение между версии, но реалният магистрален и зимен пробег може да се различава съществено.",
          "Състоянието на батерията често е по-важно от самия пробег, когато две коли са на сходна цена.",
          "Историята на зареждане помага да се разбере дали поведението на пробега вероятно ще остане стабилно.",
        ]
      ).en,
      block("h2", "Battery options and chemistry"),
      block("h3", "LFP battery"),
      block("normal", "LFP versions are attractive for buyers who want durable daily charging habits and predictable long-term ownership."),
      block("h3", "NCA battery"),
      block("normal", "NCA versions can offer strong performance and long range, but battery history and charging behaviour are especially important."),
      ...insight(
        "Voltique insight: what buyers often underestimate",
        "Voltique insight: какво купувачите често подценяват",
        "Many buyers focus too heavily on model year and too lightly on battery behaviour, tyre condition, and charging pattern. In practice, those factors often shape ownership quality more than one extra option or one year difference.",
        "Много купувачи се фокусират прекалено върху моделната година и недостатъчно върху поведението на батерията, състоянието на гумите и начина на зареждане. На практика именно тези фактори често влияят повече на качеството на притежание от една допълнителна екстра или една година разлика."
      ).en,
      block("h2", "What to inspect before buying"),
      bullet("Battery health, degradation and consistency of displayed range"),
      bullet("Charging history and whether the car relied heavily on DC fast charging"),
      bullet("Paint repairs, panel gaps, glass condition and previous accidents"),
      bullet("Tyre wear, suspension noises and brake condition"),
      bullet("Software status, app access and ownership transfer readiness"),
      block("h2", "Ownership costs"),
      block("normal", "Ownership cost depends on charging location, tyre wear, insurance market, and annual mileage. In many cases, the Model 3 remains cheaper to run than comparable premium combustion cars."),
      block("h2", "Who should buy a used Tesla Model 3"),
      block("normal", "It is especially well suited for buyers who want high daily efficiency, a strong charging ecosystem, and a clean software-driven ownership experience."),
      block("h2", "Final buying conclusion"),
      block("normal", "A used Tesla Model 3 can be an excellent value purchase in 2026, provided battery condition, charging history, and structural condition are checked carefully. The best cars are usually the ones where specification, battery behaviour, and ownership history align cleanly — not simply the cheapest listing.")
    ],
    bg: [
      block("normal", "Tesla Model 3 остава един от най-силните избори сред употребяваните електромобили в Европа, защото съчетава ефективност, зрял софтуер, достъп до зарядната екосистема и чисто изживяване при притежание. За много купувачи тя все още е еталон за ежедневна premium EV употреба."),
      block("h2", "Общ преглед на Tesla Model 3"),
      block("normal", "За много купувачи Model 3 е входът към премиум електрическата мобилност. Предлага добра ефективност, полезен ежедневен пробег и усещане за модерност дори години след производството."),
      ...research(
        "Research context: range, battery, and charging",
        "Практически контекст: пробег, батерия и зареждане",
        "Used Model 3 evaluation should not rely on catalogue range alone. Buyers need to combine battery chemistry, real driving profile, climate, and charging routine to understand the car properly.",
        "Оценката на употребявана Model 3 не трябва да се базира само на каталогичния пробег. Нужно е да се комбинират химията на батерията, реалният профил на шофиране, климатът и рутината на зареждане.",
        [
          "WLTP figures are useful for comparing versions, but real motorway and winter range can differ materially.",
          "Battery condition often matters more than headline mileage when two cars have similar pricing.",
          "Charging history helps explain whether displayed range behaviour is likely to remain stable.",
        ],
        [
          "WLTP стойностите са полезни за сравнение между версии, но реалният магистрален и зимен пробег може да се различава съществено.",
          "Състоянието на батерията често е по-важно от самия пробег, когато две коли са на сходна цена.",
          "Историята на зареждане помага да се разбере дали поведението на пробега вероятно ще остане стабилно.",
        ]
      ).bg,
      block("h2", "Батерии и химия"),
      block("h3", "LFP батерия"),
      block("normal", "LFP версиите са атрактивни за купувачи, които искат по-спокойни навици на ежедневно зареждане и предвидимо дългосрочно притежание."),
      block("h3", "NCA батерия"),
      block("normal", "NCA версиите могат да предложат силна динамика и добър пробег, но историята на батерията и навиците за зареждане са особено важни."),
      ...insight(
        "Voltique insight: what buyers often underestimate",
        "Voltique insight: какво купувачите често подценяват",
        "Many buyers focus too heavily on model year and too lightly on battery behaviour, tyre condition, and charging pattern. In practice, those factors often shape ownership quality more than one extra option or one year difference.",
        "Много купувачи се фокусират прекалено върху моделната година и недостатъчно върху поведението на батерията, състоянието на гумите и начина на зареждане. На практика именно тези фактори често влияят повече на качеството на притежание от една допълнителна екстра или една година разлика."
      ).bg,
      block("h2", "Какво да се провери преди покупка"),
      bullet("Здраве на батерията, деградация и постоянство на показвания пробег"),
      bullet("История на зареждане и дали автомобилът е ползвал често DC бързо зареждане"),
      bullet("Ремонти по боята, фуги, състояние на стъклата и предишни удари"),
      bullet("Износване на гуми, шумове от окачването и състояние на спирачките"),
      bullet("Софтуер, достъп до приложението и готовност за прехвърляне на собствеността"),
      block("h2", "Разходи за притежание"),
      block("normal", "Разходите зависят от мястото на зареждане, износването на гумите, цената на застраховката и годишния пробег. В много случаи Model 3 остава по-евтин за поддръжка от сравними премиум автомобили с ДВГ."),
      block("h2", "За кого е подходяща употребявана Tesla Model 3"),
      block("normal", "Подходяща е за купувачи, които търсят висока ефективност, силна зарядна екосистема и чисто, софтуерно ориентирано изживяване при притежание."),
      block("h2", "Финално заключение"),
      block("normal", "Употребяваната Tesla Model 3 може да бъде отлична покупка през 2026 г., стига батерията, историята на зареждане и конструктивното състояние да бъдат проверени внимателно. Най-добрите автомобили обикновено са тези, при които спецификацията, поведението на батерията и историята на притежание се подреждат чисто — не просто най-евтината обява.")
    ],
  },
  {
    slug: "tesla-model-y-buying-guide",
    en: [
      block("normal", "The Tesla Model Y is one of the most practical EVs on the European used market because it combines crossover usability with Tesla efficiency and charging convenience. For many households, it is where EV practicality and Tesla ecosystem advantages meet most clearly."),
      block("h2", "Why Model Y is so popular"),
      block("normal", "Model Y offers more cargo flexibility and a higher seating position than Model 3, which makes it especially attractive for families and longer-distance users."),
      ...research(
        "Research context: practicality, weight, and efficiency",
        "Практически контекст: практичност, тегло и ефективност",
        "Model Y is often bought for space and flexibility, but buyers should remember that extra practicality also comes with heavier weight, tyre load, and somewhat different energy use compared with a sedan.",
        "Model Y често се купува заради пространството и гъвкавостта, но купувачите трябва да имат предвид, че допълнителната практичност идва и с по-високо тегло, натоварване върху гумите и различно енергийно поведение спрямо седан.",
        [
          "Real-world efficiency matters more than catalogue numbers for family and motorway use.",
          "Tyre condition can reveal a lot about alignment, usage pattern, and ownership quality.",
          "Cargo flexibility and rear-seat practicality are major value drivers for many buyers.",
        ],
        [
          "Реалната ефективност е по-важна от каталогичните числа при семейна и магистрална употреба.",
          "Състоянието на гумите често показва много за реглажа, профила на употреба и качеството на поддръжка.",
          "Гъвкавият багажен обем и практичността на задния ред са основни фактори за стойността при много купувачи.",
        ]
      ).en,
      block("h2", "Battery and daily range"),
      block("normal", "Battery chemistry, seasonal efficiency and charging habits all shape the long-term ownership value of a used Model Y."),
      ...insight(
        "Voltique insight: the practical mistake buyers make",
        "Voltique insight: практичната грешка, която купувачите правят",
        "Many buyers assume that more space automatically means the better choice. In reality, Model Y is strongest when the buyer will actually use the extra cabin height, cargo flexibility, or family practicality often enough to justify the higher running load.",
        "Много купувачи приемат, че повече пространство автоматично означава по-добър избор. На практика Model Y е най-силна тогава, когато купувачът реално ще използва по-високото купе, по-гъвкавия багажник или семейната практичност достатъчно често, за да оправдае по-високото натоварване в ежедневната употреба."
      ).en,
      block("h2", "What to inspect carefully"),
      bullet("Tyres and alignment because heavier EVs can show wear quickly"),
      bullet("Rear cargo area, trim pieces and interior wear"),
      bullet("Battery health and software condition"),
      bullet("Panel fit, glass and accident history"),
      block("h2", "Family use and practicality"),
      block("normal", "For buyers who need more boot space, easier child-seat access and versatile cabin use, Model Y often feels more practical than a sedan."),
      block("h2", "Final buying conclusion"),
      block("normal", "A used Tesla Model Y is often a strong family EV buy when the battery, condition and specification match the asking price. The best examples are not only practical on paper, but cleanly maintained and correctly positioned for how the owner will actually use the car.")
    ],
    bg: [
      block("normal", "Tesla Model Y е един от най-практичните електромобили на европейския пазар за употребявани коли, защото съчетава кросоувър удобство с Tesla ефективност и лесно зареждане. За много домакинства това е точката, в която EV практичността и предимствата на Tesla екосистемата се срещат най-ясно."),
      block("h2", "Защо Model Y е толкова популярна"),
      block("normal", "Model Y предлага повече багажно пространство и по-висока позиция на седене от Model 3, което я прави особено привлекателна за семейства и хора, които пътуват повече."),
      ...research(
        "Research context: practicality, weight, and efficiency",
        "Практически контекст: практичност, тегло и ефективност",
        "Model Y is often bought for space and flexibility, but buyers should remember that extra practicality also comes with heavier weight, tyre load, and somewhat different energy use compared with a sedan.",
        "Model Y често се купува заради пространството и гъвкавостта, но купувачите трябва да имат предвид, че допълнителната практичност идва и с по-високо тегло, натоварване върху гумите и различно енергийно поведение спрямо седан.",
        [
          "Real-world efficiency matters more than catalogue numbers for family and motorway use.",
          "Tyre condition can reveal a lot about alignment, usage pattern, and ownership quality.",
          "Cargo flexibility and rear-seat practicality are major value drivers for many buyers.",
        ],
        [
          "Реалната ефективност е по-важна от каталогичните числа при семейна и магистрална употреба.",
          "Състоянието на гумите често показва много за реглажа, профила на употреба и качеството на поддръжка.",
          "Гъвкавият багажен обем и практичността на задния ред са основни фактори за стойността при много купувачи.",
        ]
      ).bg,
      block("h2", "Батерия и ежедневен пробег"),
      block("normal", "Химията на батерията, сезонната ефективност и навиците за зареждане влияят върху дългосрочната стойност на употребявана Model Y."),
      ...insight(
        "Voltique insight: the practical mistake buyers make",
        "Voltique insight: практичната грешка, която купувачите правят",
        "Many buyers assume that more space automatically means the better choice. In reality, Model Y is strongest when the buyer will actually use the extra cabin height, cargo flexibility, or family practicality often enough to justify the higher running load.",
        "Много купувачи приемат, че повече пространство автоматично означава по-добър избор. На практика Model Y е най-силна тогава, когато купувачът реално ще използва по-високото купе, по-гъвкавия багажник или семейната практичност достатъчно често, за да оправдае по-високото натоварване в ежедневната употреба."
      ).bg,
      block("h2", "Какво трябва да се огледа внимателно"),
      bullet("Гуми и реглаж, защото тежките EV автомобили могат бързо да покажат износване"),
      bullet("Задно товарно пространство, интериорни панели и следи от употреба"),
      bullet("Здраве на батерията и състояние на софтуера"),
      bullet("Фуги, стъкла и история на удари"),
      block("h2", "Семейна употреба и практичност"),
      block("normal", "За купувачи, които търсят повече място, по-лесен достъп за детски седалки и гъвкав интериор, Model Y често е по-практична от седан."),
      block("h2", "Финално заключение"),
      block("normal", "Употребяваната Tesla Model Y често е много добър семеен EV избор, когато батерията, състоянието и спецификацията отговарят на цената. Най-добрите екземпляри не са само практични на хартия, а и чисто поддържани и правилно позиционирани спрямо реалната употреба на собственика.")
    ],
  },
  {
    slug: "lfp-vs-nca-tesla-batteries",
    en: [
      block("normal", "Battery chemistry matters because it changes charging strategy, durability expectations, and the type of buyer each Tesla suits best. For used-car buyers, it also shapes how calm or demanding day-to-day ownership may feel."),
      block("h2", "LFP basics"),
      block("normal", "LFP batteries are known for durability, thermal stability and flexibility in daily charging routines."),
      block("h2", "NCA basics"),
      block("normal", "NCA batteries are associated with strong performance and often very competitive range figures."),
      ...research(
        "Research context: chemistry and ownership logic",
        "Практически контекст: химия и логика на притежание",
        "Battery chemistry is not only a technical topic. It changes the charging routine, the tolerance for high state of charge, long-distance behaviour, and how the buyer should interpret battery health over time.",
        "Химията на батерията не е само техническа тема. Тя променя рутината на зареждане, толеранса към висок заряд, поведението при дълъг път и начина, по който купувачът трябва да оценява състоянието на батерията във времето.",
        [
          "LFP generally supports calmer routine charging habits.",
          "NCA often rewards more deliberate daily charge management.",
          "The right chemistry depends on climate, usage profile, and charging access.",
        ],
        [
          "LFP обикновено позволява по-спокойни ежедневни навици на зареждане.",
          "NCA често се отплаща при по-внимателно управление на ежедневния заряд.",
          "Правилната химия зависи от климата, профила на употреба и достъпа до зареждане.",
        ]
      ).en,
      block("h2", "Charging differences"),
      bullet("LFP can be more tolerant of frequent high charge states"),
      bullet("NCA often benefits from more careful daily charging strategy"),
      ...insight(
        "Voltique insight: chemistry is a buyer-fit question",
        "Voltique insight: химията е въпрос на buyer fit",
        "The mistake is to ask which chemistry is universally better. The more useful question is which chemistry better matches the buyer’s routine, climate, and charging access.",
        "Грешката е да се пита коя химия е универсално по-добра. По-полезният въпрос е коя химия съвпада по-добре с рутината, климата и достъпа до зареждане на конкретния купувач."
      ).en,
      block("h2", "Which battery suits which buyer"),
      block("normal", "LFP often suits urban and routine-focused ownership, while NCA can suit drivers prioritising range and performance."),
      block("h2", "Conclusion"),
      block("normal", "Neither chemistry is universally better. The right choice depends on climate, usage profile, charging access, and the kind of ownership routine the buyer wants.")
    ],
    bg: [
      block("normal", "Химията на батерията има значение, защото променя стратегията на зареждане, очакванията за издръжливост и типа купувач, за когото конкретната Tesla е най-подходяща. При употребяван автомобил тя определя и дали ежедневната употреба ще се усеща по-спокойна или по-взискателна."),
      block("h2", "Основи при LFP"),
      block("normal", "LFP батериите са известни с добра издръжливост, термична стабилност и по-гъвкави навици при ежедневно зареждане."),
      block("h2", "Основи при NCA"),
      block("normal", "NCA батериите се свързват със силна динамика и често много конкурентен пробег."),
      ...research(
        "Research context: chemistry and ownership logic",
        "Практически контекст: химия и логика на притежание",
        "Battery chemistry is not only a technical topic. It changes the charging routine, the tolerance for high state of charge, long-distance behaviour, and how the buyer should interpret battery health over time.",
        "Химията на батерията не е само техническа тема. Тя променя рутината на зареждане, толеранса към висок заряд, поведението при дълъг път и начина, по който купувачът трябва да оценява състоянието на батерията във времето.",
        [
          "LFP generally supports calmer routine charging habits.",
          "NCA often rewards more deliberate daily charge management.",
          "The right chemistry depends on climate, usage profile, and charging access.",
        ],
        [
          "LFP обикновено позволява по-спокойни ежедневни навици на зареждане.",
          "NCA често се отплаща при по-внимателно управление на ежедневния заряд.",
          "Правилната химия зависи от климата, профила на употреба и достъпа до зареждане.",
        ]
      ).bg,
      block("h2", "Разлики при зареждането"),
      bullet("LFP може да понася по-добре по-често високо ниво на заряд"),
      bullet("NCA често изисква по-внимателна ежедневна стратегия на зареждане"),
      ...insight(
        "Voltique insight: chemistry is a buyer-fit question",
        "Voltique insight: химията е въпрос на buyer fit",
        "The mistake is to ask which chemistry is universally better. The more useful question is which chemistry better matches the buyer’s routine, climate, and charging access.",
        "Грешката е да се пита коя химия е универсално по-добра. По-полезният въпрос е коя химия съвпада по-добре с рутината, климата и достъпа до зареждане на конкретния купувач."
      ).bg,
      block("h2", "Коя батерия подхожда на кой купувач"),
      block("normal", "LFP често подхожда на градска и рутинна употреба, докато NCA може да е по-подходяща за шофьори, които търсят пробег и динамика."),
      block("h2", "Заключение"),
      block("normal", "Нито една химия не е универсално по-добра. Правилният избор зависи от климата, профила на употреба, достъпа до зареждане и типа ежедневна рутина, който купувачът иска.")
    ],
  },
];

async function main() {
  const posts = await client.fetch(`*[_type=="post" && defined(slug.current)]{_id, "slug": slug.current}`);
  const map = new Map(posts.map((p) => [p.slug, p._id]));

  for (const article of articles) {
    const id = map.get(article.slug);
    if (!id) {
      console.log(`skip: ${article.slug}`);
      continue;
    }

    const existing = await client.fetch(`*[_id==$id][0]{bodyEn, bodyBg}`, {id});

    const visualsEn = Array.isArray(existing?.bodyEn) ? existing.bodyEn.filter((b) => b?._type === "guideVisual") : [];
    const visualsBg = Array.isArray(existing?.bodyBg) ? existing.bodyBg.filter((b) => b?._type === "guideVisual") : [];

    await client.patch(id).set({
      bodyEn: [...visualsEn, ...article.en],
      bodyBg: [...visualsBg, ...article.bg],
    }).commit();

    console.log(`updated: ${article.slug}`);
  }

  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
