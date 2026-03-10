import {getCliClient} from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

function block(style, text) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 12),
    style,
    children: [{ _type: "span", text }],
  };
}

function bullet(text) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 12),
    listItem: "bullet",
    children: [{ _type: "span", text }],
  };
}

const articles = [
  {
    slug: "tesla-model-3-buying-guide",
    en: [
      block("normal", "The Tesla Model 3 remains one of the strongest used EV choices in Europe because it combines efficiency, strong software, access to charging infrastructure and a mature ownership ecosystem."),
      block("h2", "Tesla Model 3 overview"),
      block("normal", "For many buyers, the Model 3 is the entry point into premium electric mobility. It offers strong efficiency, useful daily range and a driving experience that still feels modern years after production."),
      block("h2", "Battery options and chemistry"),
      block("h3", "LFP battery"),
      block("normal", "LFP versions are attractive for buyers who want durable daily charging habits and predictable long-term ownership."),
      block("h3", "NCA battery"),
      block("normal", "NCA versions can offer strong performance and long range, but battery history and charging behaviour are especially important."),
      block("h2", "What to inspect before buying"),
      bullet("Battery health, degradation and consistency of displayed range"),
      bullet("Charging history and whether the car relied heavily on DC fast charging"),
      bullet("Paint repairs, panel gaps, glass condition and previous accidents"),
      bullet("Tyre wear, suspension noises and brake condition"),
      bullet("Software status, app access and ownership transfer readiness"),
      block("h2", "Ownership costs"),
      block("normal", "Ownership cost depends on charging location, tyre wear, insurance market and annual mileage. In many cases, the Model 3 remains cheaper to run than comparable premium combustion cars."),
      block("h2", "Who should buy a used Tesla Model 3"),
      block("normal", "It is especially well suited for buyers who want high daily efficiency, a strong charging ecosystem and a clean, software-driven ownership experience."),
      block("h2", "Final buying conclusion"),
      block("normal", "A used Tesla Model 3 can be an excellent value purchase in 2025, provided battery condition, charging history and structural condition are checked carefully.")
    ],
    bg: [
      block("normal", "Tesla Model 3 остава един от най-силните избори сред употребяваните електромобили в Европа, защото съчетава ефективност, силен софтуер, достъп до зарядна инфраструктура и зряла екосистема за притежание."),
      block("h2", "Общ преглед на Tesla Model 3"),
      block("normal", "За много купувачи Model 3 е входът към премиум електрическата мобилност. Предлага добра ефективност, полезен ежедневен пробег и усещане за модерност дори години след производството."),
      block("h2", "Батерии и химия"),
      block("h3", "LFP батерия"),
      block("normal", "LFP версиите са атрактивни за купувачи, които искат по-спокойни навици на ежедневно зареждане и предвидимо дългосрочно притежание."),
      block("h3", "NCA батерия"),
      block("normal", "NCA версиите могат да предложат силна динамика и добър пробег, но историята на батерията и навиците за зареждане са особено важни."),
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
      block("normal", "Употребяваната Tesla Model 3 може да бъде отлична покупка през 2025 г., стига батерията, историята на зареждане и конструктивното състояние да бъдат проверени внимателно.")
    ],
  },
  {
    slug: "tesla-model-y-buying-guide",
    en: [
      block("normal", "The Tesla Model Y is one of the most practical EVs on the European used market because it combines crossover usability with Tesla efficiency and charging convenience."),
      block("h2", "Why Model Y is so popular"),
      block("normal", "Model Y offers more cargo flexibility and a higher seating position than Model 3, which makes it especially attractive for families and longer-distance users."),
      block("h2", "Battery and daily range"),
      block("normal", "Battery chemistry, seasonal efficiency and charging habits all shape the long-term ownership value of a used Model Y."),
      block("h2", "What to inspect carefully"),
      bullet("Tyres and alignment because heavier EVs can show wear quickly"),
      bullet("Rear cargo area, trim pieces and interior wear"),
      bullet("Battery health and software condition"),
      bullet("Panel fit, glass and accident history"),
      block("h2", "Family use and practicality"),
      block("normal", "For buyers who need more boot space, easier child-seat access and versatile cabin use, Model Y often feels more practical than a sedan."),
      block("h2", "Final buying conclusion"),
      block("normal", "A used Tesla Model Y is often a strong family EV buy when the battery, condition and specification match the asking price.")
    ],
    bg: [
      block("normal", "Tesla Model Y е един от най-практичните електромобили на европейския пазар за употребявани коли, защото съчетава кросоувър удобство с Tesla ефективност и лесно зареждане."),
      block("h2", "Защо Model Y е толкова популярна"),
      block("normal", "Model Y предлага повече багажно пространство и по-висока позиция на седене от Model 3, което я прави особено привлекателна за семейства и хора, които пътуват повече."),
      block("h2", "Батерия и ежедневен пробег"),
      block("normal", "Химията на батерията, сезонната ефективност и навиците за зареждане влияят върху дългосрочната стойност на употребявана Model Y."),
      block("h2", "Какво трябва да се огледа внимателно"),
      bullet("Гуми и реглаж, защото тежките EV автомобили могат бързо да покажат износване"),
      bullet("Задно товарно пространство, интериорни панели и следи от употреба"),
      bullet("Здраве на батерията и състояние на софтуера"),
      bullet("Фуги, стъкла и история на удари"),
      block("h2", "Семейна употреба и практичност"),
      block("normal", "За купувачи, които търсят повече място, по-лесен достъп за детски седалки и гъвкав интериор, Model Y често е по-практична от седан."),
      block("h2", "Финално заключение"),
      block("normal", "Употребяваната Tesla Model Y често е много добър семеен EV избор, когато батерията, състоянието и спецификацията отговарят на цената.")
    ],
  },
  {
    slug: "used-tesla-checklist",
    en: [
      block("normal", "A used Tesla can be an excellent purchase, but only if the inspection goes beyond cosmetics and covers battery, charging history, software and structural condition."),
      block("h2", "Battery and charging checklist"),
      bullet("Review battery health and estimated real-world range"),
      bullet("Check whether the car was regularly DC fast charged"),
      bullet("Confirm charging speed and charging behaviour"),
      block("h2", "Exterior and structural inspection"),
      bullet("Inspect paint differences, panel alignment and glass"),
      bullet("Look for signs of repaired accident damage"),
      bullet("Check wheels, tyres and underbody condition"),
      block("h2", "Interior and software"),
      bullet("Test screen responsiveness, navigation and app pairing"),
      bullet("Inspect seats, trim and visible wear"),
      bullet("Check software version and premium features"),
      block("h2", "Documents and ownership"),
      bullet("Verify registration, service history and ownership papers"),
      bullet("Confirm that ownership can be transferred correctly"),
      block("h2", "Conclusion"),
      block("normal", "The best used Tesla purchases are made when battery, condition, documentation and charging history are all verified together.")
    ],
    bg: [
      block("normal", "Употребяваната Tesla може да бъде отлична покупка, но само ако огледът не се ограничи до козметиката, а включва батерия, история на зареждане, софтуер и конструктивно състояние."),
      block("h2", "Чеклист за батерия и зареждане"),
      bullet("Прегледай здравето на батерията и реалния очакван пробег"),
      bullet("Провери дали автомобилът е зареждан често на DC бързи станции"),
      bullet("Потвърди скоростта на зареждане и поведението при зареждане"),
      block("h2", "Външен и конструктивен оглед"),
      bullet("Огледай разлики в боята, фуги и стъкла"),
      bullet("Търси следи от ремонти след удари"),
      bullet("Провери джанти, гуми и долната част на автомобила"),
      block("h2", "Интериор и софтуер"),
      bullet("Тествай екрана, навигацията и свързването с приложението"),
      bullet("Огледай седалки, облицовки и следи от износване"),
      bullet("Провери версията на софтуера и активните функции"),
      block("h2", "Документи и собственост"),
      bullet("Потвърди регистрация, сервизна история и документи за собственост"),
      bullet("Увери се, че автомобилът може да бъде прехвърлен коректно"),
      block("h2", "Заключение"),
      block("normal", "Най-добрите покупки на употребявана Tesla се правят, когато батерията, състоянието, документацията и историята на зареждане се проверяват заедно.")
    ],
  },
  {
    slug: "tesla-battery-health-explained",
    en: [
      block("normal", "Battery health is one of the most important concepts in used Tesla evaluation because it directly influences range, value retention and buyer confidence."),
      block("h2", "What battery health actually means"),
      block("normal", "Battery health describes how much usable capacity remains compared with the battery’s original state when new."),
      block("h2", "What drives battery degradation"),
      bullet("High mileage over time"),
      bullet("Frequent DC fast charging"),
      bullet("Consistent exposure to high temperatures"),
      bullet("Driving and charging habits"),
      block("h2", "How buyers should evaluate battery condition"),
      block("normal", "Battery condition should be assessed with range behaviour, charging pattern, age and the car’s usage profile rather than with one number alone."),
      block("h2", "What good battery health looks like"),
      block("normal", "A healthy used Tesla usually shows stable behaviour, predictable range and no signs of abnormal charging or thermal issues."),
      block("h2", "Conclusion"),
      block("normal", "Battery health is not just a technical detail. It is one of the biggest drivers of used Tesla value and ownership confidence.")
    ],
    bg: [
      block("normal", "Здравето на батерията е една от най-важните теми при оценка на употребявана Tesla, защото влияе директно върху пробега, остатъчната стойност и увереността на купувача."),
      block("h2", "Какво всъщност означава здраве на батерията"),
      block("normal", "Здравето на батерията показва каква част от използваемия капацитет е останала спрямо първоначалното състояние на батерията като нова."),
      block("h2", "Какво води до деградация"),
      bullet("Голям пробег във времето"),
      bullet("Често DC бързо зареждане"),
      bullet("Постоянно излагане на високи температури"),
      bullet("Начин на шофиране и зареждане"),
      block("h2", "Как купувачите трябва да оценяват състоянието"),
      block("normal", "Състоянието на батерията трябва да се оценява чрез реалния пробег, навиците на зареждане, възрастта и начина на употреба, а не само по едно число."),
      block("h2", "Как изглежда добра батерия"),
      block("normal", "Здравата употребявана Tesla обикновено показва стабилно поведение, предвидим пробег и липса на необичайни отклонения при зареждане или температура."),
      block("h2", "Заключение"),
      block("normal", "Здравето на батерията не е просто технически детайл. То е един от най-важните фактори за стойността и спокойствието при покупка на употребявана Tesla.")
    ],
  },
  {
    slug: "lfp-vs-nca-tesla-batteries",
    en: [
      block("normal", "Battery chemistry matters because it changes charging strategy, durability expectations and the type of buyer each Tesla suits best."),
      block("h2", "LFP basics"),
      block("normal", "LFP batteries are known for durability, thermal stability and flexibility in daily charging routines."),
      block("h2", "NCA basics"),
      block("normal", "NCA batteries are associated with strong performance and often very competitive range figures."),
      block("h2", "Charging differences"),
      bullet("LFP can be more tolerant of frequent high charge states"),
      bullet("NCA often benefits from more careful daily charging strategy"),
      block("h2", "Which battery suits which buyer"),
      block("normal", "LFP often suits urban and routine-focused ownership, while NCA can suit drivers prioritising range and performance."),
      block("h2", "Conclusion"),
      block("normal", "Neither chemistry is universally better. The right choice depends on climate, usage profile and charging access.")
    ],
    bg: [
      block("normal", "Химията на батерията има значение, защото променя стратегията на зареждане, очакванията за издръжливост и типа купувач, за когото конкретната Tesla е най-подходяща."),
      block("h2", "Основи при LFP"),
      block("normal", "LFP батериите са известни с добра издръжливост, термична стабилност и по-гъвкави навици при ежедневно зареждане."),
      block("h2", "Основи при NCA"),
      block("normal", "NCA батериите се свързват със силна динамика и често много конкурентен пробег."),
      block("h2", "Разлики при зареждането"),
      bullet("LFP може да понася по-добре по-често високо ниво на заряд"),
      bullet("NCA често изисква по-внимателна ежедневна стратегия на зареждане"),
      block("h2", "Коя батерия подхожда на кой купувач"),
      block("normal", "LFP често подхожда на градска и рутинна употреба, докато NCA може да е по-подходяща за шофьори, които търсят пробег и динамика."),
      block("h2", "Заключение"),
      block("normal", "Нито една химия не е универсално по-добра. Правилният избор зависи от климата, профила на употреба и достъпа до зареждане.")
    ],
  },
  {
    slug: "tesla-charging-guide-europe",
    en: [
      block("normal", "Charging is one of the biggest advantages of Tesla ownership, but buyers still need to understand the difference between home charging, AC public charging and DC fast charging."),
      block("h2", "Home charging"),
      block("normal", "Home charging is often the most cost-effective and convenient way to live with a Tesla day to day."),
      block("h2", "AC vs DC charging"),
      block("h3", "AC charging"),
      block("normal", "AC charging is ideal for regular overnight charging and predictable daily use."),
      block("h3", "DC charging"),
      block("normal", "DC charging is most useful for motorway travel, long-distance trips and time-sensitive charging stops."),
      block("h2", "Smart charging habits"),
      bullet("Match charging routine to battery chemistry"),
      bullet("Avoid unnecessary high-charge storage"),
      bullet("Use fast charging strategically, not by default"),
      block("h2", "Conclusion"),
      block("normal", "Understanding charging habits properly helps buyers reduce cost, protect battery health and improve ownership confidence.")
    ],
    bg: [
      block("normal", "Зареждането е едно от най-големите предимства при притежание на Tesla, но купувачите все пак трябва да разбират разликата между домашно зареждане, публично AC зареждане и DC бързо зареждане."),
      block("h2", "Домашно зареждане"),
      block("normal", "Домашното зареждане често е най-икономичният и удобен начин за ежедневна употреба на Tesla."),
      block("h2", "AC срещу DC зареждане"),
      block("h3", "AC зареждане"),
      block("normal", "AC зареждането е идеално за редовно нощно зареждане и предвидима ежедневна употреба."),
      block("h3", "DC зареждане"),
      block("normal", "DC зареждането е най-полезно при магистрално каране, дълги пътувания и когато времето е важно."),
      block("h2", "Умни навици на зареждане"),
      bullet("Съобразявай рутината с химията на батерията"),
      bullet("Избягвай ненужно дълго стоене на висок заряд"),
      bullet("Използвай бързото зареждане стратегически, а не по навик"),
      block("h2", "Заключение"),
      block("normal", "Правилното разбиране на навиците за зареждане помага на купувачите да намалят разходите, да пазят батерията и да повишат увереността при притежание.")
    ],
  },
  {
    slug: "tesla-supercharger-costs-europe",
    en: [
      block("normal", "Supercharger cost is a key ownership topic for Tesla buyers who expect regular long-distance travel or cross-border driving in Europe."),
      block("h2", "What shapes Supercharger prices"),
      bullet("Country and local market pricing"),
      bullet("Time of day and station usage"),
      bullet("Vehicle efficiency and weather"),
      block("h2", "Why total trip cost matters more than one session"),
      block("normal", "The true cost of a long trip depends not only on the charger price but also on efficiency, average speed, temperature and route profile."),
      block("h2", "How to manage charging cost"),
      bullet("Use home charging where possible"),
      bullet("Plan long stops efficiently"),
      bullet("Compare total travel energy, not only station price"),
      block("h2", "Conclusion"),
      block("normal", "Supercharger cost is best understood as part of overall trip planning, not as an isolated number.")
    ],
    bg: [
      block("normal", "Разходът за Supercharger е важна тема за Tesla купувачите, които планират редовни дълги пътувания или каране между държави в Европа."),
      block("h2", "Какво определя цените на Supercharger"),
      bullet("Държава и местно ценообразуване"),
      bullet("Час на деня и натовареност на станцията"),
      bullet("Ефективност на автомобила и климатични условия"),
      block("h2", "Защо общата цена на пътуването е по-важна от една сесия"),
      block("normal", "Реалната цена на дълго пътуване зависи не само от тарифата на зарядната станция, но и от ефективността, средната скорост, температурата и профила на маршрута."),
      block("h2", "Как да управляваш разходите за зареждане"),
      bullet("Използвай домашно зареждане, когато е възможно"),
      bullet("Планирай дългите спирания по-ефективно"),
      bullet("Сравнявай общата енергия за пътуването, а не само цената на станцията"),
      block("h2", "Заключение"),
      block("normal", "Разходът за Supercharger се разбира най-добре като част от цялостното планиране на пътуването, а не като изолирано число.")
    ],
  },
  {
    slug: "tesla-model-3-vs-bmw-i4",
    en: [
      block("normal", "The Tesla Model 3 and BMW i4 target similar buyers, but the ownership logic behind them can be different depending on efficiency, software expectations and charging access."),
      block("h2", "Efficiency and range"),
      block("normal", "Efficiency influences not only range, but also long-term charging cost and daily ownership convenience."),
      block("h2", "Charging ecosystem"),
      block("normal", "Charging convenience matters as much as vehicle specification, especially for buyers who travel often."),
      block("h2", "Software and cabin experience"),
      block("normal", "Some buyers prioritise route planning and software, while others value a more traditional premium cabin feel."),
      block("h2", "Who each model suits"),
      block("normal", "Model 3 often suits buyers who value efficiency and software, while the i4 may appeal to those who prefer a more conventional premium brand experience."),
      block("h2", "Conclusion"),
      block("normal", "The best choice depends on whether efficiency and software or cabin feel and brand preference matter more to the buyer.")
    ],
    bg: [
      block("normal", "Tesla Model 3 и BMW i4 са насочени към сходни купувачи, но логиката на притежание при тях може да е различна според ефективността, очакванията за софтуер и достъпа до зареждане."),
      block("h2", "Ефективност и пробег"),
      block("normal", "Ефективността влияе не само на пробега, но и на дългосрочните разходи за зареждане и ежедневното удобство."),
      block("h2", "Зарядна екосистема"),
      block("normal", "Удобството при зареждане е толкова важно, колкото и спецификацията на автомобила, особено за купувачи, които пътуват често."),
      block("h2", "Софтуер и усещане в купето"),
      block("normal", "Някои купувачи дават приоритет на планирането на маршрути и софтуера, докато други предпочитат по-традиционно премиум усещане в интериора."),
      block("h2", "За кого е по-подходящ всеки модел"),
      block("normal", "Model 3 често подхожда на купувачи, които ценят ефективността и софтуера, докато i4 може да се хареса на хора, които предпочитат по-класическо премиум изживяване."),
      block("h2", "Заключение"),
      block("normal", "Най-добрият избор зависи от това дали ефективността и софтуерът или усещането в купето и предпочитанието към марката са по-важни за купувача.")
    ],
  },
  {
    slug: "tesla-model-y-vs-audi-q4-etron",
    en: [
      block("normal", "Model Y and Audi Q4 e-tron both target practical EV buyers, but they differ in efficiency, charging approach and everyday usage priorities."),
      block("h2", "Space and usability"),
      block("normal", "Space is not only about boot litres, but also access, cabin practicality and storage flexibility."),
      block("h2", "Efficiency and charging"),
      block("normal", "Efficiency affects range, route planning and long-term energy cost more than many buyers initially expect."),
      block("h2", "Who should choose which model"),
      block("normal", "Model Y often suits buyers focused on charging convenience and EV efficiency, while the Q4 e-tron may appeal more to those prioritising traditional premium design cues."),
      block("h2", "Conclusion"),
      block("normal", "The right choice depends on whether the buyer values Tesla ecosystem advantages or prefers Audi’s design and brand feel.")
    ],
    bg: [
      block("normal", "Model Y и Audi Q4 e-tron са насочени към практични EV купувачи, но се различават по ефективност, подход към зареждането и приоритети в ежедневната употреба."),
      block("h2", "Пространство и практичност"),
      block("normal", "Пространството не е само въпрос на литри багажник, а и на достъп, организация в купето и гъвкавост на съхранението."),
      block("h2", "Ефективност и зареждане"),
      block("normal", "Ефективността влияе върху пробега, планирането на маршрути и дългосрочната цена на енергията повече, отколкото много купувачи очакват."),
      block("h2", "Кой модел за кого е по-подходящ"),
      block("normal", "Model Y често е подходящ за купувачи, които търсят удобно зареждане и силна EV ефективност, докато Q4 e-tron може да е по-привлекателен за хора, които ценят по-традиционен премиум дизайн."),
      block("h2", "Заключение"),
      block("normal", "Правилният избор зависи от това дали купувачът цени предимствата на Tesla екосистемата или предпочита дизайна и усещането на Audi.")
    ],
  },
  {
    slug: "used-tesla-prices-europe",
    en: [
      block("normal", "Used Tesla prices in Europe are shaped by a mix of battery chemistry, trim level, country-specific demand, condition and supply."),
      block("h2", "What influences used Tesla prices most"),
      bullet("Mileage and age"),
      bullet("Battery type and battery condition"),
      bullet("Trim, drivetrain and options"),
      bullet("Country market conditions and tax logic"),
      block("h2", "Why buyers must compare more than headline price"),
      block("normal", "A lower price can hide weaker battery condition, poor repair history or weaker specification, so price must always be judged against quality."),
      block("h2", "How to evaluate value"),
      block("normal", "The best value is often found where condition, battery state, market timing and specification align correctly."),
      block("h2", "Conclusion"),
      block("normal", "Used Tesla pricing in Europe should be understood through total value, not only sticker price.")
    ],
    bg: [
      block("normal", "Цените на употребявани Tesla в Европа се формират от комбинация между химия на батерията, ниво на оборудване, търсене по държави, състояние и предлагане."),
      block("h2", "Какво влияе най-много върху цените"),
      bullet("Пробег и възраст"),
      bullet("Тип и състояние на батерията"),
      bullet("Оборудване, задвижване и опции"),
      bullet("Пазарни условия и данъчна логика по държави"),
      block("h2", "Защо купувачите трябва да сравняват повече от крайната цена"),
      block("normal", "По-ниската цена може да крие по-слабо състояние на батерията, лоша история на ремонти или по-слаба спецификация, затова цената винаги трябва да се оценява спрямо качеството."),
      block("h2", "Как да се оценява стойността"),
      block("normal", "Най-добрата стойност често се намира там, където състоянието, батерията, пазарният момент и спецификацията са балансирани правилно."),
      block("h2", "Заключение"),
      block("normal", "Цените на употребявани Tesla в Европа трябва да се разбират през общата стойност, а не само през цената на етикета.")
    ],
  },
  {
    slug: "tesla-ownership-costs-europe",
    en: [
      block("normal", "Tesla ownership costs in Europe are often lower than buyers expect, but they still depend on charging pattern, tyres, insurance and annual mileage."),
      block("h2", "Main ownership cost areas"),
      bullet("Charging and electricity price"),
      bullet("Tyres and wear rate"),
      bullet("Insurance level"),
      bullet("Maintenance and occasional suspension or brake work"),
      block("h2", "Why charging profile matters so much"),
      block("normal", "Home charging can substantially improve running costs, while heavy public fast charging changes the cost picture."),
      block("h2", "How buyers should estimate real monthly cost"),
      block("normal", "The best estimate combines mileage, charging access, insurance market and tyre budget rather than using generic assumptions."),
      block("h2", "Conclusion"),
      block("normal", "Tesla ownership cost is usually manageable and predictable when buyers understand the real cost drivers before purchase.")
    ],
    bg: [
      block("normal", "Разходите за притежание на Tesla в Европа често са по-ниски, отколкото купувачите очакват, но все пак зависят от начина на зареждане, гумите, застраховката и годишния пробег."),
      block("h2", "Основни категории разходи"),
      bullet("Зареждане и цена на електроенергията"),
      bullet("Гуми и темп на износване"),
      bullet("Ниво на застраховка"),
      bullet("Поддръжка и евентуални ремонти по окачване или спирачки"),
      block("h2", "Защо профилът на зареждане е толкова важен"),
      block("normal", "Домашното зареждане може значително да подобри текущите разходи, докато честото публично бързо зареждане променя цялата картина."),
      block("h2", "Как купувачите да изчислят реалния месечен разход"),
      block("normal", "Най-добрата оценка комбинира пробег, достъп до зареждане, застрахователен пазар и бюджет за гуми, вместо да използва общи предположения."),
      block("h2", "Заключение"),
      block("normal", "Разходите за притежание на Tesla обикновено са управляеми и предвидими, когато купувачите разбират реалните фактори още преди покупката.")
    ],
  }
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
