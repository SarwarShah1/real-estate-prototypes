// Dhilal Communities — all sample content.
export const P = {
  hero: "photo-1670589953882-b94c9cb380f5", villaA: "photo-1685514823717-7e1ff6ee0563", villaB: "photo-1745761320791-5ae142edee8c",
  terrace: "photo-1678575326996-a1bf09b86158", living: "photo-1758448755778-90ebf4d0f1e7", bed: "photo-1758448755969-8791367cf5c5",
  living2: "photo-1757924461488-ef9ad0670978", kitchen: "photo-1671197244266-73129c97c096", int3: "photo-1768144092684-c1a5dd6c7aad",
  int4: "photo-1750420556288-d0e32a6f517b", garden: "photo-1766867054439-bc2f50974f02", pool: "photo-1610641818989-c2051b5e2cfd",
  gym: "photo-1758957646695-ec8bce3df462", courts: "photo-1689942963385-f5bd03f3b270", kids: "photo-1772209177472-fc37fdfd4484",
  cafe: "photo-1751956066306-c5684cbcf385", gate: "photo-1674222709212-a6a7e378ac40", town1: "photo-1598232973707-41b8faa2592c",
  town2: "photo-1672626881472-b96d3eb5445e", town3: "photo-1785553766146-c7c5856eba39", aerial: "photo-1499310392581-322cec0355a6",
  crane1: "photo-1599707254554-027aeb4deacd", crane2: "photo-1569169513673-2cecbfc943a9", crane3: "photo-1576577610667-c9ea0ac983fd",
  apt1: "photo-1682184805271-11671b7ecf4c", apt2: "photo-1715985160053-d339e8b6eb94", apt3: "photo-1741764014072-68953e93cd48"
};

export const CITIES = { riyadh: { en: "Riyadh", ar: "الرياض" }, jeddah: { en: "Jeddah", ar: "جدة" }, khobar: { en: "Al Khobar", ar: "الخبر" } };
export const STATUS = {
  offplan: { en: "Off-plan · under construction", ar: "على الخارطة · قيد الإنشاء", short: { en: "Off-plan", ar: "على الخارطة" } },
  ready: { en: "Ready to move in", ar: "جاهزة للسكن", short: { en: "Ready", ar: "جاهزة" } },
  soon: { en: "Coming soon", ar: "قريباً", short: { en: "Coming soon", ar: "قريباً" } }
};
export const TYPES = { villa: { en: "Villa", ar: "فيلا" }, townhouse: { en: "Townhouse", ar: "تاون هاوس" } };

const MILESTONES_OFFPLAN = [
  { k: "booking", pct: 10, en: "On signing the Wafi contract", ar: "عند توقيع عقد وافي" },
  { k: "found", pct: 20, en: "Foundations complete", ar: "اكتمال الأساسات" },
  { k: "struct", pct: 20, en: "Structure complete", ar: "اكتمال الهيكل الإنشائي" },
  { k: "finish", pct: 20, en: "Finishes and MEP complete", ar: "اكتمال التشطيبات والأعمال الكهروميكانيكية" },
  { k: "hand", pct: 30, en: "On handover of keys", ar: "عند تسليم المفاتيح" }
];

export const COMMUNITIES = [
  {
    slug: "narjis-gardens", name: { en: "Narjis Gardens", ar: "حدائق النرجس" }, city: "riyadh",
    district: { en: "Al Narjis, North Riyadh", ar: "حي النرجس، شمال الرياض" }, status: "offplan", types: ["villa", "townhouse"],
    from: 2150000, homes: 214, handover: { en: "Q4 2027", ar: "الربع الرابع ٢٠٢٧" }, progress: 46,
    hero: "living", photos: ["hero", "villaA", "garden", "pool", "kids", "courts"],
    tag: { en: "Shaded family villas around a 3-hectare park, minutes from King Salman Road.", ar: "فلل عائلية تظللها الأشجار حول منتزه بمساحة ٣ هكتارات، على بعد دقائق من طريق الملك سلمان." },
    intro: { en: "Narjis Gardens is a gated community of 214 villas and townhouses arranged around a central park, with shaded walking loops, a mosque, a community clubhouse and separate family and ladies' facilities. Every home has a guest majlis with its own entrance.", ar: "حدائق النرجس مجمع مسوّر يضم ٢١٤ فلة وتاون هاوس حول منتزه مركزي، مع ممرات مشي مظللة ومسجد ونادٍ اجتماعي ومرافق منفصلة للعائلات والسيدات. ولكل منزل مجلس ضيوف بمدخل مستقل." },
    amenities: ["mosque", "park", "pool", "ladies", "gym", "padel", "kids", "retail", "security"],
    nearby: [[{ en: "King Salman Road", ar: "طريق الملك سلمان" }, 4], [{ en: "International schools", ar: "مدارس عالمية" }, 7], [{ en: "King Khalid Airport", ar: "مطار الملك خالد" }, 18], [{ en: "KAFD", ar: "مركز الملك عبدالله المالي" }, 22]],
    wafi: "WF-2026-0418", escrow: { en: "Sample National Bank · project escrow account", ar: "البنك الوطني (عينة) · حساب ضمان المشروع" },
    plan: MILESTONES_OFFPLAN,
    progressLog: [
      { d: "2026-03", en: "Ground-breaking and site enabling", ar: "وضع حجر الأساس وتجهيز الموقع", done: true, ph: "crane1" },
      { d: "2026-07", en: "Foundations complete, phase 1", ar: "اكتمال الأساسات، المرحلة الأولى", done: true, ph: "crane2" },
      { d: "2026-11", en: "Structure rising, 61 homes", ar: "ارتفاع الهيكل الإنشائي لـ ٦١ منزلاً", done: true, ph: "crane3" },
      { d: "2027-04", en: "Clubhouse and park landscaping", ar: "النادي وتنسيق المنتزه", done: false },
      { d: "2027-12", en: "Phase 1 handover", ar: "تسليم المرحلة الأولى", done: false }
    ],
    sales: { en: "Sales centre: Anas Ibn Malik Rd, Al Narjis", ar: "مركز المبيعات: طريق أنس بن مالك، النرجس" }, hours: { en: "Sat–Thu 10am–10pm", ar: "السبت–الخميس ١٠ص–١٠م" },
    lots: "SSASRSSASSAASRSSSAASSSSARSASSSSASSRSASSA"
  },
  {
    slug: "qurtuba-courtyards", name: { en: "Qurtuba Courtyards", ar: "أفنية قرطبة" }, city: "riyadh",
    district: { en: "Qurtuba, East Riyadh", ar: "حي قرطبة، شرق الرياض" }, status: "ready", types: ["townhouse"],
    from: 1380000, homes: 96, handover: { en: "Completed 2026", ar: "مكتمل ٢٠٢٦" }, progress: 100,
    hero: "town1", photos: ["town1", "town2", "living2", "kitchen", "garden", "kids"],
    tag: { en: "Courtyard townhouses, ready to move in, beside the King Abdullah Road metro line.", ar: "تاون هاوس بأفنية داخلية، جاهزة للسكن، بجوار خط المترو على طريق الملك عبدالله." },
    intro: { en: "Qurtuba Courtyards is a completed neighbourhood of 96 townhouses, each built around a private shaded courtyard. Keys are handed over within 30 days of signing, and Sakani-eligible buyers can use their support towards the price.", ar: "أفنية قرطبة حي مكتمل يضم ٩٦ تاون هاوس، كل منها مبني حول فناء خاص مظلل. تُسلَّم المفاتيح خلال ٣٠ يوماً من التوقيع، ويمكن للمستفيدين من سكني استخدام دعمهم في السعر." },
    amenities: ["mosque", "park", "kids", "gym", "retail", "security"],
    nearby: [[{ en: "Metro station", ar: "محطة المترو" }, 5], [{ en: "Riyadh Front", ar: "واجهة الرياض" }, 10], [{ en: "Schools", ar: "مدارس" }, 6], [{ en: "King Khalid Airport", ar: "مطار الملك خالد" }, 15]],
    wafi: null, escrow: null, plan: null, progressLog: null,
    sales: { en: "Show home: Qurtuba, Gate 2", ar: "المنزل النموذجي: قرطبة، البوابة ٢" }, hours: { en: "Daily 9am–9pm", ar: "يومياً ٩ص–٩م" },
    lots: "SSSASSSSASSSASSSSSASSSSASSSSSA"
  },
  {
    slug: "khobar-grove", name: { en: "Khobar Grove", ar: "بستان الخبر" }, city: "khobar",
    district: { en: "Al Hamra, Al Khobar", ar: "حي الحمراء، الخبر" }, status: "offplan", types: ["villa", "townhouse"],
    from: 1690000, homes: 138, handover: { en: "Q2 2027", ar: "الربع الثاني ٢٠٢٧" }, progress: 78,
    hero: "villaB", photos: ["villaB", "terrace", "int3", "pool", "gym", "cafe"],
    tag: { en: "Villas and townhouses near the Corniche, 78% built, handover mid-2027.", ar: "فلل وتاون هاوس قرب الكورنيش، نسبة الإنجاز ٧٨٪، والتسليم منتصف ٢٠٢٧." },
    intro: { en: "Khobar Grove brings 138 homes within ten minutes of the Khobar Corniche and the King Fahd Causeway road. Construction is 78% complete, so buyers who reserve now still have time to choose their finishes.", ar: "بستان الخبر يضم ١٣٨ منزلاً على بعد عشر دقائق من كورنيش الخبر وطريق جسر الملك فهد. نسبة الإنجاز ٧٨٪، ما يتيح لمن يحجز الآن اختيار التشطيبات." },
    amenities: ["mosque", "park", "pool", "ladies", "gym", "kids", "security"],
    nearby: [[{ en: "Khobar Corniche", ar: "كورنيش الخبر" }, 9], [{ en: "King Fahd Causeway", ar: "جسر الملك فهد" }, 20], [{ en: "Dhahran", ar: "الظهران" }, 12], [{ en: "King Fahd Airport", ar: "مطار الملك فهد" }, 35]],
    wafi: "WF-2025-1192", escrow: { en: "Sample Gulf Bank · project escrow account", ar: "بنك الخليج (عينة) · حساب ضمان المشروع" },
    plan: MILESTONES_OFFPLAN,
    progressLog: [
      { d: "2025-05", en: "Ground-breaking", ar: "وضع حجر الأساس", done: true, ph: "crane1" },
      { d: "2025-11", en: "All foundations complete", ar: "اكتمال جميع الأساسات", done: true, ph: "crane2" },
      { d: "2026-06", en: "Structure complete, all homes", ar: "اكتمال الهيكل لجميع المنازل", done: true, ph: "crane3" },
      { d: "2026-11", en: "Facades and interiors under way", ar: "الواجهات والتشطيبات الداخلية جارية", done: true, ph: "int4" },
      { d: "2027-06", en: "Handover", ar: "التسليم", done: false }
    ],
    sales: { en: "Sales centre: Prince Turki St, Al Khobar", ar: "مركز المبيعات: شارع الأمير تركي، الخبر" }, hours: { en: "Sat–Thu 4pm–10pm", ar: "السبت–الخميس ٤م–١٠م" },
    lots: "SSASSSRSSSASSSSSASSRSSSSAS"
  },
  {
    slug: "obhur-shores", name: { en: "Obhur Shores", ar: "شواطئ أبحر" }, city: "jeddah",
    district: { en: "North Obhur, Jeddah", ar: "أبحر الشمالية، جدة" }, status: "soon", types: ["villa"],
    from: null, homes: 64, handover: { en: "Launching Q1 2027", ar: "الإطلاق الربع الأول ٢٠٢٧" }, progress: 0,
    hero: "pool", photos: ["pool", "terrace", "apt1", "apt2", "cafe", "garden"],
    tag: { en: "Sixty-four sea-breeze villas on Obhur Creek. Register for launch prices.", ar: "أربع وستون فلة على شرم أبحر. سجّل اهتمامك لأسعار الإطلاق." },
    intro: { en: "Obhur Shores is our first Jeddah community: 64 villas with private pools, stepping down towards Obhur Creek. Prices will be released to registered buyers first.", ar: "شواطئ أبحر أول مجتمعاتنا في جدة: ٦٤ فلة بمسابح خاصة تتدرج نحو شرم أبحر. تُعلن الأسعار للمسجلين أولاً." },
    amenities: ["mosque", "beach", "pool", "ladies", "gym", "kids", "security"],
    nearby: [[{ en: "Obhur Creek", ar: "شرم أبحر" }, 2], [{ en: "King Abdulaziz Airport", ar: "مطار الملك عبدالعزيز" }, 20], [{ en: "Red Sea Mall", ar: "رد سي مول" }, 18], [{ en: "Schools", ar: "مدارس" }, 8]],
    wafi: null, escrow: null, plan: null, progressLog: null,
    sales: { en: "Register to visit the launch gallery", ar: "سجّل لزيارة معرض الإطلاق" }, hours: { en: "By appointment", ar: "بموعد مسبق" },
    lots: ""
  }
];

export const AMEN = {
  mosque: { en: "Community mosque", ar: "مسجد المجمع" }, park: { en: "Central park", ar: "منتزه مركزي" }, pool: { en: "Family pool", ar: "مسبح عائلي" },
  ladies: { en: "Ladies' pool and gym", ar: "مسبح ونادي للسيدات" }, gym: { en: "Fitness club", ar: "نادي رياضي" }, padel: { en: "Padel courts", ar: "ملاعب بادل" },
  kids: { en: "Kids' club", ar: "نادي الأطفال" }, retail: { en: "Daily-needs retail", ar: "محلات احتياجات يومية" }, security: { en: "Gated, 24/7 security", ar: "مسوّر، أمن على مدار الساعة" },
  beach: { en: "Private beach club", ar: "نادٍ شاطئي خاص" }
};

// Home designs. floors: [en, ar, [[roomEn, roomAr, w, h, x, y]...]] coordinates on a 100x70 grid for the plan drawing.
export const DESIGNS = [
  { slug: "arjuwan", c: "narjis-gardens", type: "townhouse", name: { en: "The Arjuwan", ar: "الأرجوان" }, beds: 3, baths: 4, built: 245, plot: 200, price: 2150000, ph: ["town2", "living2", "kitchen"],
    floors: [["Ground", "الأرضي", [["Majlis", "مجلس", 34, 30, 0, 0], ["Living", "معيشة", 40, 30, 34, 0], ["Kitchen", "مطبخ", 26, 30, 74, 0], ["Courtyard", "فناء", 40, 40, 0, 30], ["Dining", "طعام", 34, 40, 40, 30], ["Maid", "خادمة", 26, 40, 74, 30]]], ["First", "الأول", [["Master", "النوم الرئيسية", 44, 36, 0, 0], ["Bed 2", "نوم ٢", 28, 36, 44, 0], ["Bed 3", "نوم ٣", 28, 36, 72, 0], ["Family", "عائلي", 56, 34, 0, 36], ["Laundry", "غسيل", 44, 34, 56, 36]]]] },
  { slug: "yasmin", c: "narjis-gardens", type: "villa", name: { en: "The Yasmin", ar: "الياسمين" }, beds: 4, baths: 5, built: 330, plot: 300, price: 2780000, ph: ["villaA", "living", "bed"],
    floors: [["Ground", "الأرضي", [["Men's majlis", "مجلس رجال", 32, 32, 0, 0], ["Ladies' majlis", "مجلس نساء", 30, 32, 32, 0], ["Kitchen", "مطبخ", 38, 32, 62, 0], ["Living", "معيشة", 44, 38, 0, 32], ["Dining", "طعام", 30, 38, 44, 32], ["Maid", "خادمة", 26, 38, 74, 32]]], ["First", "الأول", [["Master suite", "جناح رئيسي", 46, 36, 0, 0], ["Bed 2", "نوم ٢", 27, 36, 46, 0], ["Bed 3", "نوم ٣", 27, 36, 73, 0], ["Bed 4", "نوم ٤", 34, 34, 0, 36], ["Family", "عائلي", 66, 34, 34, 36]]], ["Roof", "السطح", [["Roof terrace", "سطح مفتوح", 60, 70, 0, 0], ["Laundry", "غسيل", 40, 35, 60, 0], ["Driver", "سائق", 40, 35, 60, 35]]]] },
  { slug: "sidra", c: "narjis-gardens", type: "villa", name: { en: "The Sidra", ar: "السدرة" }, beds: 5, baths: 7, built: 420, plot: 375, price: 3450000, ph: ["hero", "living2", "int3"],
    floors: [["Ground", "الأرضي", [["Men's majlis", "مجلس رجال", 36, 34, 0, 0], ["Ladies' majlis", "مجلس نساء", 32, 34, 36, 0], ["Kitchen", "مطبخ", 32, 34, 68, 0], ["Living", "معيشة", 40, 36, 0, 34], ["Dining", "طعام", 30, 36, 40, 34], ["Guest suite", "جناح ضيوف", 30, 36, 70, 34]]], ["First", "الأول", [["Master suite", "جناح رئيسي", 50, 38, 0, 0], ["Bed 2", "نوم ٢", 25, 38, 50, 0], ["Bed 3", "نوم ٣", 25, 38, 75, 0], ["Bed 4", "نوم ٤", 33, 32, 0, 38], ["Family", "عائلي", 67, 32, 33, 38]]], ["Roof", "السطح", [["Roof terrace", "سطح مفتوح", 60, 70, 0, 0], ["Maid", "خادمة", 40, 35, 60, 0], ["Driver", "سائق", 40, 35, 60, 35]]]] },
  { slug: "rihan", c: "qurtuba-courtyards", type: "townhouse", name: { en: "The Rihan", ar: "الريحان" }, beds: 3, baths: 4, built: 210, plot: 180, price: 1380000, ph: ["town1", "living2", "kitchen"],
    floors: [["Ground", "الأرضي", [["Majlis", "مجلس", 36, 32, 0, 0], ["Courtyard", "فناء", 30, 32, 36, 0], ["Kitchen", "مطبخ", 34, 32, 66, 0], ["Living", "معيشة", 66, 38, 0, 32], ["Maid", "خادمة", 34, 38, 66, 32]]], ["First", "الأول", [["Master", "النوم الرئيسية", 46, 36, 0, 0], ["Bed 2", "نوم ٢", 54, 36, 46, 0], ["Bed 3", "نوم ٣", 46, 34, 0, 36], ["Family", "عائلي", 54, 34, 46, 36]]]] },
  { slug: "faiha", c: "qurtuba-courtyards", type: "townhouse", name: { en: "The Faiha", ar: "الفيحاء" }, beds: 4, baths: 5, built: 260, plot: 210, price: 1640000, ph: ["town3", "int4", "bed"],
    floors: [["Ground", "الأرضي", [["Majlis", "مجلس", 34, 32, 0, 0], ["Courtyard", "فناء", 32, 32, 34, 0], ["Kitchen", "مطبخ", 34, 32, 66, 0], ["Living", "معيشة", 44, 38, 0, 32], ["Dining", "طعام", 30, 38, 44, 32], ["Maid", "خادمة", 26, 38, 74, 32]]], ["First", "الأول", [["Master", "النوم الرئيسية", 40, 36, 0, 0], ["Bed 2", "نوم ٢", 30, 36, 40, 0], ["Bed 3", "نوم ٣", 30, 36, 70, 0], ["Bed 4", "نوم ٤", 40, 34, 0, 36], ["Family", "عائلي", 60, 34, 40, 36]]]] },
  { slug: "marjan", c: "khobar-grove", type: "townhouse", name: { en: "The Marjan", ar: "المرجان" }, beds: 3, baths: 4, built: 230, plot: 190, price: 1690000, ph: ["terrace", "apt3", "kitchen"],
    floors: [["Ground", "الأرضي", [["Majlis", "مجلس", 36, 34, 0, 0], ["Living", "معيشة", 38, 34, 36, 0], ["Kitchen", "مطبخ", 26, 34, 74, 0], ["Garden", "حديقة", 74, 36, 0, 34], ["Maid", "خادمة", 26, 36, 74, 34]]], ["First", "الأول", [["Master", "النوم الرئيسية", 46, 38, 0, 0], ["Bed 2", "نوم ٢", 27, 38, 46, 0], ["Bed 3", "نوم ٣", 27, 38, 73, 0], ["Family", "عائلي", 100, 32, 0, 38]]]] },
  { slug: "lulu", c: "khobar-grove", type: "villa", name: { en: "The Lulu", ar: "اللؤلؤة" }, beds: 5, baths: 6, built: 380, plot: 340, price: 2590000, ph: ["villaB", "int3", "bed"],
    floors: [["Ground", "الأرضي", [["Men's majlis", "مجلس رجال", 34, 34, 0, 0], ["Ladies' majlis", "مجلس نساء", 32, 34, 34, 0], ["Kitchen", "مطبخ", 34, 34, 66, 0], ["Living", "معيشة", 46, 36, 0, 34], ["Dining", "طعام", 28, 36, 46, 34], ["Maid", "خادمة", 26, 36, 74, 34]]], ["First", "الأول", [["Master suite", "جناح رئيسي", 46, 36, 0, 0], ["Bed 2", "نوم ٢", 27, 36, 46, 0], ["Bed 3", "نوم ٣", 27, 36, 73, 0], ["Bed 4", "نوم ٤", 30, 34, 0, 36], ["Bed 5", "نوم ٥", 30, 34, 30, 36], ["Family", "عائلي", 40, 34, 60, 36]]]] },
  { slug: "bahr", c: "obhur-shores", type: "villa", name: { en: "The Bahr", ar: "البحر" }, beds: 5, baths: 6, built: 450, plot: 500, price: null, ph: ["pool", "apt1", "apt2"],
    floors: [["Ground", "الأرضي", [["Majlis", "مجلس", 34, 34, 0, 0], ["Living", "معيشة", 40, 34, 34, 0], ["Kitchen", "مطبخ", 26, 34, 74, 0], ["Pool deck", "سطح المسبح", 74, 36, 0, 34], ["Maid", "خادمة", 26, 36, 74, 34]]], ["First", "الأول", [["Master suite", "جناح رئيسي", 50, 38, 0, 0], ["Bed 2", "نوم ٢", 25, 38, 50, 0], ["Bed 3", "نوم ٣", 25, 38, 75, 0], ["Bed 4", "نوم ٤", 50, 32, 0, 38], ["Bed 5", "نوم ٥", 50, 32, 50, 38]]]] },
  { slug: "shatt", c: "obhur-shores", type: "villa", name: { en: "The Shatt", ar: "الشط" }, beds: 4, baths: 5, built: 360, plot: 420, price: null, ph: ["terrace", "apt3", "living"],
    floors: [["Ground", "الأرضي", [["Majlis", "مجلس", 36, 34, 0, 0], ["Living", "معيشة", 38, 34, 36, 0], ["Kitchen", "مطبخ", 26, 34, 74, 0], ["Pool deck", "سطح المسبح", 100, 36, 0, 34]]], ["First", "الأول", [["Master suite", "جناح رئيسي", 50, 38, 0, 0], ["Bed 2", "نوم ٢", 50, 38, 50, 0], ["Bed 3", "نوم ٣", 50, 32, 0, 38], ["Bed 4", "نوم ٤", 50, 32, 50, 38]]]] }
];
export const FEATURES = {
  townhouse: [{ en: "Guest majlis with its own entrance", ar: "مجلس ضيوف بمدخل مستقل" }, { en: "Private shaded courtyard", ar: "فناء خاص مظلل" }, { en: "Maid's room with bathroom", ar: "غرفة خادمة مع دورة مياه" }, { en: "Two covered parking spaces", ar: "موقفان مظللان" }, { en: "Solar water heating", ar: "تسخين المياه بالطاقة الشمسية" }, { en: "Smart-home ready wiring", ar: "تمديدات جاهزة للمنزل الذكي" }],
  villa: [{ en: "Separate men's and ladies' majlis", ar: "مجلس رجال ومجلس نساء منفصلان" }, { en: "Driver's room with external access", ar: "غرفة سائق بمدخل خارجي" }, { en: "Maid's room with bathroom", ar: "غرفة خادمة مع دورة مياه" }, { en: "Lift shaft ready", ar: "جاهزية لتركيب مصعد" }, { en: "EV charging point", ar: "نقطة شحن سيارة كهربائية" }, { en: "Roof terrace with shade structure", ar: "سطح مفتوح مع مظلة" }]
};
export const FINISHES = [
  { k: "najd", en: "Najd Classic", ar: "نجد الكلاسيكي", d: { en: "Warm stone, walnut joinery, brass details", ar: "حجر دافئ، خشب الجوز، تفاصيل نحاسية" }, add: 0, sw: ["#D8C7A9", "#6B4A2F", "#B08D57"] },
  { k: "hejaz", en: "Hejaz Coastal", ar: "الحجاز الساحلي", d: { en: "White oak, sea-blue tiles, rattan", ar: "بلوط أبيض، بلاط أزرق بحري، خيزران" }, add: 65000, sw: ["#EDE6D8", "#5E8CA0", "#C8B48C"] },
  { k: "modern", en: "Riyadh Modern", ar: "الرياض المعاصر", d: { en: "Grey marble, matte black, linear lighting", ar: "رخام رمادي، أسود مطفي، إضاءة خطية" }, add: 120000, sw: ["#CFCBC4", "#2E2E2E", "#8D8A84"] }
];
export const READY = [
  { id: "Q-07", d: "rihan", plot: 7, price: 1380000, when: { en: "Ready now", ar: "جاهزة الآن" } },
  { id: "Q-12", d: "faiha", plot: 12, price: 1660000, when: { en: "Ready now", ar: "جاهزة الآن" } },
  { id: "Q-19", d: "rihan", plot: 19, price: 1395000, when: { en: "Ready now", ar: "جاهزة الآن" } },
  { id: "Q-24", d: "faiha", plot: 24, price: 1640000, when: { en: "Ready now", ar: "جاهزة الآن" } },
  { id: "K-03", d: "marjan", plot: 3, price: 1720000, when: { en: "Ready June 2027", ar: "جاهزة يونيو ٢٠٢٧" } },
  { id: "K-11", d: "lulu", plot: 11, price: 2640000, when: { en: "Ready June 2027", ar: "جاهزة يونيو ٢٠٢٧" } }
];
export const EVENTS = [
  { date: "2026-11-28", c: "narjis-gardens", title: { en: "Show villa open day", ar: "يوم مفتوح لفيلا العرض" }, d: { en: "Walk through The Yasmin show villa, meet the design studio and see the park take shape.", ar: "تجوّل في فيلا الياسمين النموذجية، وتعرّف على استوديو التصميم، وشاهد المنتزه وهو يتشكل." } },
  { date: "2026-12-12", c: "khobar-grove", title: { en: "Finishes selection weekend", ar: "عطلة اختيار التشطيبات" }, d: { en: "Buyers choose kitchens, flooring and lighting with our interior team.", ar: "يختار المشترون المطابخ والأرضيات والإضاءة مع فريق التصميم الداخلي." } },
  { date: "2027-01-23", c: "obhur-shores", title: { en: "Obhur Shores launch preview", ar: "معاينة إطلاق شواطئ أبحر" }, d: { en: "Registered buyers see prices and choose plots before public release.", ar: "يطلع المسجلون على الأسعار ويختارون القطع قبل الطرح العام." } }
];
