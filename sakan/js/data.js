/* =========================================================
   SAKAN REALTY — demo data
   Everything an agency changes lives here: brand, contacts,
   licences, districts, listings, projects, agents.
   All numbers/licences below are SAMPLE placeholders.
   ========================================================= */

const BRAND = {
  nameAr: "سكن العقارية",
  nameEn: "Sakan Realty",
  taglineAr: "عقارك القادم في الرياض.. بثقة ووضوح",
  taglineEn: "Your next property in Riyadh — clear, licensed, fast",
  phone: "+966 50 000 0000",
  phoneRaw: "966500000000",
  whatsapp: "966500000000",
  email: "info@sakan-demo.sa",
  cr: "1010000000",
  fal: "1200000000",
  vat: "300000000000003",
  addressAr: "طريق الملك فهد، حي العليا، الرياض 12211",
  addressEn: "King Fahd Rd, Al Olaya, Riyadh 12211",
  hoursAr: "الأحد – الخميس ٩ص – ٩م · السبت ٤م – ٩م",
  hoursEn: "Sun – Thu 9am – 9pm · Sat 4pm – 9pm",
  social: { x: "#", instagram: "#", snapchat: "#", tiktok: "#", linkedin: "#" }
};

/* Stylised Riyadh map: x/y on a 1000 x 720 canvas (north = top) */
const DISTRICTS = [
  { id: "arid",     ar: "العارض",      en: "Al Arid",       x: 560, y: 70,  zone: "north" },
  { id: "malqa",    ar: "الملقا",      en: "Al Malqa",      x: 430, y: 170, zone: "north" },
  { id: "hittin",   ar: "حطين",        en: "Hittin",        x: 300, y: 200, zone: "north" },
  { id: "narjis",   ar: "النرجس",      en: "Al Narjis",     x: 610, y: 150, zone: "north" },
  { id: "yasmin",   ar: "الياسمين",    en: "Al Yasmin",     x: 560, y: 230, zone: "north" },
  { id: "sahafa",   ar: "الصحافة",     en: "Al Sahafa",     x: 480, y: 270, zone: "north" },
  { id: "aqiq",     ar: "العقيق",      en: "Al Aqiq",       x: 400, y: 280, zone: "north" },
  { id: "nakheel",  ar: "النخيل",      en: "Al Nakheel",    x: 350, y: 350, zone: "center" },
  { id: "muruj",    ar: "المروج",      en: "Al Muruj",      x: 470, y: 370, zone: "center" },
  { id: "olaya",    ar: "العليا",      en: "Al Olaya",      x: 450, y: 450, zone: "center" },
  { id: "diriyah",  ar: "الدرعية",     en: "Diriyah",       x: 170, y: 330, zone: "west" },
  { id: "qurtubah", ar: "قرطبة",       en: "Qurtubah",      x: 720, y: 300, zone: "east" },
  { id: "rawdah",   ar: "الروضة",      en: "Al Rawdah",     x: 690, y: 420, zone: "east" },
  { id: "hamra",    ar: "الحمراء",     en: "Al Hamra",      x: 780, y: 380, zone: "east" },
  { id: "maather",  ar: "المعذر",      en: "Al Maather",    x: 350, y: 500, zone: "center" },
  { id: "tuwaiq",   ar: "طويق",        en: "Tuwaiq",        x: 140, y: 560, zone: "west" }
];

const TYPES = {
  villa:     { ar: "فيلا",          en: "Villa" },
  apartment: { ar: "شقة",           en: "Apartment" },
  floor:     { ar: "دور",           en: "Floor" },
  duplex:    { ar: "دوبلكس",        en: "Duplex" },
  townhouse: { ar: "تاون هاوس",     en: "Townhouse" },
  land:      { ar: "أرض",           en: "Land" },
  building:  { ar: "عمارة",         en: "Building" },
  office:    { ar: "مكتب",          en: "Office" },
  shop:      { ar: "محل تجاري",     en: "Shop" },
  compound:  { ar: "فيلا في مجمع",  en: "Compound villa" }
};

const AMENITIES = {
  pool:     { ar: "مسبح خاص",       en: "Private pool",     i: "🏊" },
  garden:   { ar: "حديقة",          en: "Garden",           i: "🌿" },
  elevator: { ar: "مصعد",           en: "Elevator",         i: "🛗" },
  parking:  { ar: "موقف خاص",       en: "Private parking",  i: "🚗" },
  ac:       { ar: "تكييف مركزي",    en: "Central A/C",      i: "❄️" },
  maid:     { ar: "غرفة خادمة",     en: "Maid's room",      i: "🧺" },
  driver:   { ar: "غرفة سائق",      en: "Driver's room",    i: "🚪" },
  majlis:   { ar: "مجلس رجال",      en: "Men's majlis",     i: "🛋️" },
  annex:    { ar: "ملحق",           en: "Annex",            i: "🏠" },
  smart:    { ar: "نظام منزل ذكي",  en: "Smart home",       i: "📱" },
  security: { ar: "حراسة ٢٤/٧",     en: "24/7 security",    i: "🛡️" },
  gym:      { ar: "نادي رياضي",     en: "Gym",              i: "🏋️" },
  kitchen:  { ar: "مطبخ راكب",      en: "Fitted kitchen",   i: "🍳" },
  fiber:    { ar: "ألياف بصرية",    en: "Fiber internet",   i: "📶" },
  solar:    { ar: "طاقة شمسية",     en: "Solar panels",     i: "☀️" },
  furnished:{ ar: "مؤثث",           en: "Furnished",        i: "🪑" }
};

const FACADES = {
  north: { ar: "شمالية", en: "North" }, south: { ar: "جنوبية", en: "South" },
  east:  { ar: "شرقية",  en: "East"  }, west:  { ar: "غربية",  en: "West"  },
  corner:{ ar: "زاوية (شارعين)", en: "Corner (2 streets)" }
};

const TENANTS = {
  families: { ar: "عوائل", en: "Families" },
  singles:  { ar: "عزاب",  en: "Singles" },
  any:      { ar: "الكل",  en: "Any" },
  company:  { ar: "شركات", en: "Companies" }
};

const AGENTS = [
  { id: "a1", ar: "فيصل العتيبي", en: "Faisal Al-Otaibi", roleAr: "مستشار سكني – شمال الرياض", roleEn: "Residential advisor – North Riyadh", wa: "966500000001", langs: "AR · EN", deals: 140, color: "#0f4c4a" },
  { id: "a2", ar: "نورة السبيعي", en: "Noura Al-Subaie", roleAr: "مستشارة تأجير وعوائل",     roleEn: "Leasing & family homes",            wa: "966500000002", langs: "AR · EN", deals: 210, color: "#8a5a2b" },
  { id: "a3", ar: "خالد المطيري", en: "Khalid Al-Mutairi", roleAr: "العقار التجاري والاستثماري", roleEn: "Commercial & investment",         wa: "966500000003", langs: "AR · EN · UR", deals: 95, color: "#33415c" },
  { id: "a4", ar: "ريم الحربي",   en: "Reem Al-Harbi",   roleAr: "مشاريع البيع على الخارطة",   roleEn: "Off-plan projects",                 wa: "966500000004", langs: "AR · EN · FR", deals: 120, color: "#6b3e5e" }
];

/* purpose: sale | rent   price: SAR (rent = per year) */
const LISTINGS = [
  { id: "RY1024", purpose: "sale", type: "villa", district: "malqa", price: 3250000, area: 375, beds: 5, baths: 6, age: 1, facade: "north", street: 20, floor: null, tenant: null,
    amen: ["pool","garden","maid","driver","majlis","smart","ac","parking"], featured: true, isNew: true, agent: "a1", art: "villa", tod: 1,
    titleAr: "فيلا مودرن بمسبح – الملقا", titleEn: "Modern villa with pool – Al Malqa",
    descAr: "فيلا دورين وملحق بتصميم عصري، واجهة شمالية على شارع ٢٠م، صالة بارتفاع مزدوج، مجلس رجال بمدخل مستقل، مسبح خاص وحديقة. قريبة من طريق الملك فهد وطريق أنس بن مالك.",
    descEn: "Two floors plus annex in a clean modern design, north-facing on a 20 m street. Double-height living room, men's majlis with its own entrance, private pool and garden. Minutes from King Fahd Rd and Anas Bin Malik Rd." },
  { id: "RY1031", purpose: "rent", type: "apartment", district: "yasmin", price: 65000, area: 160, beds: 3, baths: 3, age: 2, facade: "south", street: 15, floor: 2, tenant: "families",
    amen: ["elevator","parking","ac","kitchen","fiber"], featured: true, isNew: false, agent: "a2", art: "apartment", tod: 0,
    titleAr: "شقة عوائل ٣ غرف – الياسمين", titleEn: "3-bed family apartment – Al Yasmin",
    descAr: "شقة واسعة في الدور الثاني مع مصعد وموقف خاص، مطبخ راكب ومكيفات. الدفع على دفعتين أو أربع دفعات، والعقد يوثق عبر منصة إيجار.",
    descEn: "Spacious second-floor apartment with lift and private parking, fitted kitchen and A/C installed. Pay in 2 or 4 instalments; contract registered on Ejar." },
  { id: "RY1037", purpose: "sale", type: "apartment", district: "narjis", price: 945000, area: 148, beds: 3, baths: 3, age: 0, facade: "east", street: 18, floor: 1, tenant: null,
    amen: ["elevator","parking","ac","smart","fiber"], featured: true, isNew: true, agent: "a1", art: "apartment", tod: 2,
    titleAr: "شقة تمليك جديدة – النرجس", titleEn: "Brand-new apartment for sale – Al Narjis",
    descAr: "شقة جديدة لم تسكن، ضمانات على الهيكل والسباكة والكهرباء، مناسبة للتمويل العقاري ومؤهلة لبرنامج سكني.",
    descEn: "Never lived in, with structural, plumbing and electrical warranties. Mortgage-ready and eligible for the Sakani programme." },
  { id: "RY1042", purpose: "rent", type: "floor", district: "qurtubah", price: 55000, area: 220, beds: 4, baths: 3, age: 6, facade: "west", street: 15, floor: 1, tenant: "families",
    amen: ["parking","ac","maid","majlis"], featured: false, isNew: false, agent: "a2", art: "floor", tod: 0,
    titleAr: "دور أرضي بمدخل مستقل – قرطبة", titleEn: "Ground floor, private entrance – Qurtubah",
    descAr: "دور أرضي في فيلا بمدخل وسطح مستقل، مجلس ومقلط وصالة، غرفة خادمة، قريب من المدارس والجامعات.",
    descEn: "Ground floor of a villa with its own entrance, majlis, dining hall and living room, maid's room. Close to schools and universities." },
  { id: "RY1049", purpose: "sale", type: "duplex", district: "hittin", price: 2150000, area: 290, beds: 4, baths: 5, age: 3, facade: "corner", street: 25, floor: null, tenant: null,
    amen: ["garden","ac","maid","majlis","parking","annex"], featured: true, isNew: false, agent: "a1", art: "duplex", tod: 2,
    titleAr: "دوبلكس زاوية – حطين", titleEn: "Corner duplex – Hittin",
    descAr: "دوبلكس على زاوية بشارعين، تشطيب فاخر وإضاءة طبيعية ممتازة، سطح خاص وملحق علوي.",
    descEn: "Corner duplex on two streets with premium finishing and great natural light. Private roof and upper annex." },
  { id: "RY1053", purpose: "sale", type: "land", district: "arid", price: 1080000, area: 600, beds: 0, baths: 0, age: null, facade: "north", street: 30, floor: null, tenant: null,
    amen: [], featured: false, isNew: true, agent: "a3", art: "land", tod: 1,
    titleAr: "أرض سكنية ٦٠٠م² على شارع ٣٠ – العارض", titleEn: "600 m² residential plot on 30 m street – Al Arid",
    descAr: "أرض سكنية مستوية بصك إلكتروني، واجهة شمالية، في مخطط معتمد بخدمات كاملة. السعر ١٨٠٠ ريال للمتر.",
    descEn: "Flat residential plot with an electronic deed, north-facing, in an approved plan with full services. SAR 1,800 per m²." },
  { id: "RY1058", purpose: "rent", type: "office", district: "olaya", price: 180000, area: 240, beds: 0, baths: 2, age: 8, facade: "east", street: 60, floor: 9, tenant: "company",
    amen: ["elevator","parking","ac","security","fiber"], featured: true, isNew: false, agent: "a3", art: "office", tod: 3,
    titleAr: "مكتب إداري بإطلالة – العليا", titleEn: "Office with a view – Al Olaya",
    descAr: "مكتب مجهز في برج إداري على طريق الملك فهد، ٣ مواقف، أمن ٢٤ ساعة، مناسب للمقرات الإقليمية.",
    descEn: "Fitted office in a tower on King Fahd Rd with 3 parking bays and 24/7 security. Suitable for a regional HQ." },
  { id: "RY1062", purpose: "rent", type: "shop", district: "sahafa", price: 90000, area: 110, beds: 0, baths: 1, age: 4, facade: "south", street: 40, floor: 0, tenant: "company",
    amen: ["parking","ac"], featured: false, isNew: false, agent: "a3", art: "shop", tod: 1,
    titleAr: "محل تجاري على شارع تجاري – الصحافة", titleEn: "Retail unit on a commercial street – Al Sahafa",
    descAr: "محل بواجهة زجاجية على شارع ٤٠م، مواقف أمامية، مناسب للمقاهي والصيدليات والمعارض.",
    descEn: "Glass-front unit on a 40 m street with front parking. Suits cafés, pharmacies and showrooms." },
  { id: "RY1066", purpose: "sale", type: "building", district: "rawdah", price: 7500000, area: 900, beds: 0, baths: 0, age: 5, facade: "corner", street: 30, floor: null, tenant: null,
    amen: ["elevator","parking"], featured: false, isNew: false, agent: "a3", art: "building", tod: 3,
    titleAr: "عمارة سكنية تجارية مؤجرة بالكامل – الروضة", titleEn: "Fully leased mixed-use building – Al Rawdah",
    descAr: "عمارة ٣ أدوار + معارض، ١٢ شقة و٤ محلات، دخل سنوي ٦٤٠ ألف ريال، عقود موثقة في إيجار.",
    descEn: "3 floors + showrooms: 12 apartments and 4 shops. Annual income SAR 640k, all leases on Ejar." },
  { id: "RY1071", purpose: "rent", type: "compound", district: "diriyah", price: 220000, area: 320, beds: 4, baths: 4, age: 3, facade: "south", street: 12, floor: null, tenant: "any",
    amen: ["pool","gym","security","garden","furnished","ac","fiber"], featured: true, isNew: false, agent: "a2", art: "compound", tod: 1,
    titleAr: "فيلا مفروشة في كمبوند – الدرعية", titleEn: "Furnished compound villa – Diriyah",
    descAr: "فيلا مفروشة في مجمع سكني متكامل: مسبح، نادي، ملاعب، أمن وصيانة. مناسبة للعائلات المنتقلة والشركات.",
    descEn: "Furnished villa in a full-service compound: pool, gym, courts, security and maintenance. Ideal for relocating families and companies." },
  { id: "RY1075", purpose: "sale", type: "villa", district: "hittin", price: 6800000, area: 625, beds: 6, baths: 7, age: 2, facade: "corner", street: 30, floor: null, tenant: null,
    amen: ["pool","garden","elevator","maid","driver","majlis","smart","annex","solar"], featured: true, isNew: false, agent: "a1", art: "villa", tod: 3,
    titleAr: "قصر صغير بمصعد ومسبح – حطين", titleEn: "Grand villa with lift and pool – Hittin",
    descAr: "فيلا فاخرة على أرض ٦٢٥م²، مصعد، مسبح داخلي، ملحق ضيافة، نظام ذكي كامل، ألواح شمسية.",
    descEn: "Luxury villa on a 625 m² plot with lift, pool, guest annex, full smart-home system and solar panels." },
  { id: "RY1080", purpose: "sale", type: "apartment", district: "qurtubah", price: 720000, area: 128, beds: 3, baths: 2, age: 4, facade: "north", street: 15, floor: 3, tenant: null,
    amen: ["elevator","parking","ac"], featured: false, isNew: false, agent: "a2", art: "apartment", tod: 1,
    titleAr: "شقة ٣ غرف بسعر مناسب – قرطبة", titleEn: "Affordable 3-bed apartment – Qurtubah",
    descAr: "شقة في الدور الثالث مع مصعد، قريبة من مترو الرياض والخدمات. مناسبة لأول منزل.",
    descEn: "Third-floor apartment with lift, close to Riyadh Metro and services. A good first home." },
  { id: "RY1084", purpose: "rent", type: "apartment", district: "aqiq", price: 42000, area: 70, beds: 1, baths: 1, age: 1, facade: "east", street: 20, floor: 4, tenant: "singles",
    amen: ["elevator","furnished","ac","fiber","gym"], featured: false, isNew: true, agent: "a2", art: "apartment", tod: 3,
    titleAr: "شقة غرفة مفروشة – العقيق", titleEn: "Furnished 1-bed apartment – Al Aqiq",
    descAr: "شقة مفروشة بالكامل قرب كافد والمركز المالي، تشمل الإنترنت والنادي. عقد سنوي أو ٦ أشهر.",
    descEn: "Fully furnished, near KAFD, with internet and gym included. Annual or 6-month contract." },
  { id: "RY1089", purpose: "sale", type: "townhouse", district: "muruj", price: 1650000, area: 210, beds: 4, baths: 4, age: 0, facade: "south", street: 16, floor: null, tenant: null,
    amen: ["garden","ac","parking","smart"], featured: false, isNew: true, agent: "a4", art: "townhouse", tod: 0,
    titleAr: "تاون هاوس جديد – المروج", titleEn: "New townhouse – Al Muruj",
    descAr: "تاون هاوس بحديقة أمامية، تصميم عملي للعائلة الصغيرة، ضمان ١٠ سنوات على الهيكل.",
    descEn: "Townhouse with front garden and a practical layout for young families. 10-year structural warranty." },
  { id: "RY1093", purpose: "rent", type: "villa", district: "nakheel", price: 160000, area: 400, beds: 5, baths: 6, age: 9, facade: "west", street: 20, floor: null, tenant: "families",
    amen: ["garden","maid","driver","majlis","ac","parking"], featured: false, isNew: false, agent: "a2", art: "villa", tod: 2,
    titleAr: "فيلا للإيجار – النخيل", titleEn: "Villa for rent – Al Nakheel",
    descAr: "فيلا دورين بحديقة واسعة في حي هادئ، مجلس ومقلط، غرفتي خادمة وسائق.",
    descEn: "Two-storey villa with a large garden in a quiet street, majlis and dining hall, maid's and driver's rooms." },
  { id: "RY1097", purpose: "sale", type: "land", district: "tuwaiq", price: 640000, area: 400, beds: 0, baths: 0, age: null, facade: "east", street: 20, floor: null, tenant: null,
    amen: [], featured: false, isNew: false, agent: "a3", art: "land", tod: 2,
    titleAr: "أرض ٤٠٠م² – طويق", titleEn: "400 m² plot – Tuwaiq",
    descAr: "أرض سكنية في مخطط مكتمل الخدمات، قريبة من طريق جدة. السعر ١٦٠٠ ريال للمتر.",
    descEn: "Residential plot in a fully serviced plan near Jeddah Rd. SAR 1,600 per m²." }
];

/* REGA fields generated per listing (sample numbers only) */
LISTINGS.forEach((l, i) => {
  l.adLicense = "71" + String(10000000 + i * 7919).slice(0, 8);
  l.adExpiry = new Date(2027, (i * 3) % 12, 5 + i).toISOString().slice(0, 10);
  l.deed = "3" + String(100000000000 + i * 104729).slice(0, 11);
  l.posted = new Date(2026, 10, 13 - (i * 2) % 28).toISOString().slice(0, 10);
  const d = DISTRICTS.find(x => x.id === l.district);
  l.mx = Math.round(d.x + 55 * Math.cos(i * 1.3));
  l.my = Math.round(d.y - 30 + 38 * Math.sin(i * 1.3));
});

const PROJECTS = [
  { id: "reem", ar: "رِيم جاردنز", en: "Reem Gardens", district: "narjis", progress: 62, handover: "Q4 2027", from: 1450000, units: 84, sold: 51,
    plan: [10, 40, 50], art: "townhouse",
    typesAr: ["تاون هاوس ٣ غرف – ١٩٠م²", "تاون هاوس ٤ غرف – ٢٣٠م²", "فيلا ٥ غرف – ٣٢٠م²"],
    typesEn: ["3-bed townhouse – 190 m²", "4-bed townhouse – 230 m²", "5-bed villa – 320 m²"],
    descAr: "مجتمع سكني مسوّر بحدائق ومسارات مشي وناد اجتماعي، على بعد دقائق من طريق الملك سلمان.",
    descEn: "A gated community with gardens, walking trails and a clubhouse, minutes from King Salman Rd." },
  { id: "towers", ar: "أبراج سكن", en: "Sakan Towers", district: "sahafa", progress: 35, handover: "Q2 2028", from: 780000, units: 210, sold: 96,
    plan: [5, 25, 70], art: "office",
    typesAr: ["شقة غرفة – ٧٥م²", "شقة غرفتين – ١١٠م²", "شقة ٣ غرف – ١٥٥م²"],
    typesEn: ["1-bed – 75 m²", "2-bed – 110 m²", "3-bed – 155 m²"],
    descAr: "برجان سكنيان بخدمات فندقية، مسبح على السطح، قريب من محطة المترو.",
    descEn: "Two residential towers with hotel-style services and a rooftop pool, next to a metro station." },
  { id: "wurud", ar: "دار الورود", en: "Dar Al Wurud", district: "muruj", progress: 88, handover: "Q2 2027", from: 1150000, units: 40, sold: 36,
    plan: [20, 30, 50], art: "duplex",
    typesAr: ["دوبلكس ٤ غرف – ٢٤٠م²", "دوبلكس زاوية – ٢٨٠م²"],
    typesEn: ["4-bed duplex – 240 m²", "Corner duplex – 280 m²"],
    descAr: "مشروع دوبلكسات بتشطيب جاهز، الاستلام خلال أشهر.",
    descEn: "Turn-key duplexes, handover within months." }
];
