/* =========================================================
   NAKHLA RESIDENCES — content file
   Everything a client changes is here. All figures, licence
   numbers and contacts are SAMPLE values for demonstration.
   ========================================================= */

/* PHOTOS — paste an image address for each slot.
   Empty string = a labelled placeholder box is shown.
   Example: hero: "https://images.unsplash.com/photo-XXXX?w=2000&q=80" */
const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1707190205120-228c6656086c?auto=format&fit=crop&w=2200&q=75",          // villa and pool at dusk (wide)
  sidr: "https://images.unsplash.com/photo-1707189856923-46dd41ea2bdc?auto=format&fit=crop&w=1400&q=75",          // The Sidr exterior
  sidr2: "https://images.unsplash.com/photo-1758448755778-90ebf4d0f1e7?auto=format&fit=crop&w=1400&q=75",         // living room
  sidr3: "https://images.unsplash.com/photo-1758448755969-8791367cf5c5?auto=format&fit=crop&w=1400&q=75",         // master bedroom or kitchen
  ghaf: "https://images.unsplash.com/photo-1745761320791-5ae142edee8c?auto=format&fit=crop&w=1400&q=75",          // The Ghaf exterior or living room
  ghaf2: "https://images.unsplash.com/photo-1757924461488-ef9ad0670978?auto=format&fit=crop&w=1400&q=75",
  ghaf3: "https://images.unsplash.com/photo-1671197244266-73129c97c096?auto=format&fit=crop&w=1400&q=75",
  talh: "https://images.unsplash.com/photo-1779487552425-65861889810b?auto=format&fit=crop&w=1400&q=75",          // The Talh terrace
  talh2: "https://images.unsplash.com/photo-1768144092684-c1a5dd6c7aad?auto=format&fit=crop&w=1400&q=75",
  talh3: "https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?auto=format&fit=crop&w=1400&q=75",
  life: "https://images.unsplash.com/photo-1766867054439-bc2f50974f02?auto=format&fit=crop&w=1400&q=75",          // shaded garden seating
  pool: "https://images.unsplash.com/photo-1698653223783-d6cce8281606?auto=format&fit=crop&w=1400&q=75",          // pool with palms
  gym: "https://images.unsplash.com/photo-1758957646695-ec8bce3df462?auto=format&fit=crop&w=1400&q=75",           // fitness centre
  courts: "https://images.unsplash.com/photo-1689942963385-f5bd03f3b270?auto=format&fit=crop&w=1400&q=75",        // padel or tennis court
  kids: "https://images.unsplash.com/photo-1772209177472-fc37fdfd4484?auto=format&fit=crop&w=1400&q=75",          // children's club or playground
  cafe: "https://images.unsplash.com/photo-1751956066306-c5684cbcf385?auto=format&fit=crop&w=1400&q=75",          // cafe or clubhouse
  gate: "https://images.unsplash.com/photo-1707190205530-ca42118cb43f?auto=format&fit=crop&w=1400&q=75"           // entrance gate
};

const SITE = {
  name: { en: "Nakhla Residences", ar: "نخلة ريزيدنس" },
  whatsapp: "966500000000",
  phone: "+966 50 000 0000",
  email: "leasing@nakhla-demo.sa",
  address: { en: "Al Malqa district, North Riyadh", ar: "حي الملقا، شمال الرياض" },
  hours: { en: "Every day, 9am to 9pm", ar: "يومياً من ٩ صباحاً إلى ٩ مساءً" },
  fal: "1200000000", cr: "1010000000",
  mapQuery: "24.812,46.612"
};

const VILLAS = [
  { id: "sidr", name: { en: "The Sidr", ar: "السدر" }, beds: 5, baths: 6, built: 342, plot: 480, parking: 2, count: 12, available: 4,
    sale: 4950000, rent: 320000, adLicense: "7100000001", adExpiry: "2027-06-30",
    tag: { en: "Five bedrooms, a private pool and a garden facing the park.", ar: "خمس غرف نوم، مسبح خاص وحديقة تطل على المنتزه." },
    extra: { en: "Private pool", ar: "مسبح خاص" },
    headline: { en: "Built for a family that hosts", ar: "صُممت لعائلة تحب الضيافة" },
    desc: { en: "A guest majlis with its own entrance sits apart from the family rooms, so visitors never cross the house. The living room opens on two sides to the garden and pool, and all five bedrooms are upstairs with their own bathrooms.",
            ar: "مجلس للضيوف بمدخل مستقل ومفصول عن غرف العائلة، فلا يمر الزائر بداخل المنزل. صالة المعيشة تنفتح من جهتين على الحديقة والمسبح، وغرف النوم الخمس في الدور العلوي ولكل غرفة حمامها." },
    features: [["Private pool", "مسبح خاص"], ["Landscaped garden", "حديقة منسقة"], ["Central air conditioning", "تكييف مركزي"], ["Fitted kitchen with appliances", "مطبخ مجهز بالأجهزة"], ["Smart home controls", "نظام منزل ذكي"], ["Lift-ready shaft", "مكان مجهز للمصعد"], ["Roof terrace", "تراس على السطح"], ["Fibre internet", "ألياف بصرية"]],
    floors: [
      { en: "Ground", ar: "الأرضي", rooms: [["Guest majlis", "مجلس الضيوف", 32], ["Dining room", "غرفة الطعام", 24], ["Family living room", "صالة العائلة", 46], ["Kitchen and pantry", "المطبخ والمخزن", 28], ["Maid's room", "غرفة العاملة", 9], ["Driver's room", "غرفة السائق", 8]] },
      { en: "First", ar: "الأول", rooms: [["Master suite", "الجناح الرئيسي", 42], ["Bedroom 2", "غرفة نوم ٢", 22], ["Bedroom 3", "غرفة نوم ٣", 22], ["Bedroom 4", "غرفة نوم ٤", 20], ["Bedroom 5", "غرفة نوم ٥", 18], ["Family lounge", "جلسة عائلية", 26]] },
      { en: "Roof", ar: "السطح", rooms: [["Roof terrace", "تراس السطح", 60], ["Laundry", "غرفة الغسيل", 10], ["Storage", "مستودع", 8]] }
    ] },
  { id: "ghaf", name: { en: "The Ghaf", ar: "الغاف" }, beds: 4, baths: 5, built: 260, plot: 360, parking: 2, count: 29, available: 7,
    sale: 3650000, rent: 240000, adLicense: "7100000002", adExpiry: "2027-06-30",
    tag: { en: "Four bedrooms and a walled garden, a short walk from the pool.", ar: "أربع غرف نوم وحديقة مسوّرة على بعد خطوات من المسبح." },
    extra: { en: "Garden", ar: "حديقة" },
    headline: { en: "Room to grow, without rooms you never use", ar: "مساحة تكبر مع العائلة دون غرف مهملة" },
    desc: { en: "An open kitchen and living room run the full depth of the ground floor and end at the garden doors. Upstairs, four bedrooms share a family lounge that works as a study or playroom.",
            ar: "مطبخ مفتوح وصالة معيشة تمتد على طول الدور الأرضي وتنتهي بأبواب الحديقة. وفي الأعلى أربع غرف نوم تشترك في جلسة عائلية تصلح مكتباً أو غرفة ألعاب." },
    features: [["Walled garden", "حديقة مسوّرة"], ["Central air conditioning", "تكييف مركزي"], ["Fitted kitchen with appliances", "مطبخ مجهز بالأجهزة"], ["Guest majlis", "مجلس ضيوف"], ["Maid's room", "غرفة عاملة"], ["Fibre internet", "ألياف بصرية"]],
    floors: [
      { en: "Ground", ar: "الأرضي", rooms: [["Guest majlis", "مجلس الضيوف", 26], ["Living and dining", "المعيشة والطعام", 52], ["Kitchen", "المطبخ", 20], ["Maid's room", "غرفة العاملة", 8]] },
      { en: "First", ar: "الأول", rooms: [["Master suite", "الجناح الرئيسي", 36], ["Bedroom 2", "غرفة نوم ٢", 20], ["Bedroom 3", "غرفة نوم ٣", 18], ["Bedroom 4", "غرفة نوم ٤", 18], ["Family lounge", "جلسة عائلية", 20]] }
    ] },
  { id: "talh", name: { en: "The Talh", ar: "الطلح" }, beds: 3, baths: 4, built: 182, plot: 240, parking: 1, count: 48, available: 11,
    sale: 2450000, rent: 165000, adLicense: "7100000003", adExpiry: "2027-06-30",
    tag: { en: "Three bedrooms and a roof terrace, for a first home or a smaller household.", ar: "ثلاث غرف نوم وتراس على السطح، للمنزل الأول أو للأسرة الصغيرة." },
    extra: { en: "Roof terrace", ar: "تراس على السطح" },
    headline: { en: "A smaller footprint with the same address", ar: "مساحة أصغر في العنوان نفسه" },
    desc: { en: "The Talh gives up the garden for a private roof terrace with a shaded seating area. Every facility in the compound is included, the same as for the larger villas.",
            ar: "يستبدل الطلح الحديقة بتراس خاص على السطح مع جلسة مظللة. وجميع مرافق المجمع متاحة لسكانه كما هي لسكان الفلل الأكبر." },
    features: [["Private roof terrace", "تراس خاص على السطح"], ["Central air conditioning", "تكييف مركزي"], ["Fitted kitchen", "مطبخ مجهز"], ["Covered parking", "موقف مظلل"], ["Fibre internet", "ألياف بصرية"]],
    floors: [
      { en: "Ground", ar: "الأرضي", rooms: [["Living and dining", "المعيشة والطعام", 40], ["Kitchen", "المطبخ", 16], ["Guest room", "غرفة الضيوف", 16]] },
      { en: "First", ar: "الأول", rooms: [["Master suite", "الجناح الرئيسي", 30], ["Bedroom 2", "غرفة نوم ٢", 18], ["Bedroom 3", "غرفة نوم ٣", 16]] },
      { en: "Roof", ar: "السطح", rooms: [["Roof terrace", "تراس السطح", 44], ["Laundry", "غرفة الغسيل", 8]] }
    ] }
];

const FACILITIES = [
  { ph: "pool",   t: ["Two pools", "مسبحان"], d: ["A family pool with a shallow end and a 25-metre lap pool, both shaded and supervised.", "مسبح عائلي بجزء قليل العمق ومسبح رياضي بطول ٢٥ متراً، مظللان وتحت إشراف منقذين."] },
  { ph: "gym",    t: ["Fitness centre", "نادٍ رياضي"], d: ["Separate men's and women's gyms, open from early morning to late evening.", "صالتان منفصلتان للرجال والنساء، من الصباح الباكر حتى آخر المساء."] },
  { ph: "courts", t: ["Tennis and padel", "تنس وبادل"], d: ["Two padel courts and a tennis court, floodlit for evening play.", "ملعبا بادل وملعب تنس بإضاءة ليلية."] },
  { ph: "kids",   t: ["Children's club", "نادي الأطفال"], d: ["An indoor play area and a shaded playground beside the park.", "منطقة ألعاب داخلية وملعب مظلل بجوار المنتزه."] },
  { ph: "cafe",   t: ["Clubhouse and café", "النادي والمقهى"], d: ["A place to meet neighbours, with a small shop for daily needs.", "مكان للقاء الجيران، مع متجر صغير للاحتياجات اليومية."] },
  { ph: "gate",   t: ["Security and maintenance", "الأمن والصيانة"], d: ["A guarded gate around the clock and a maintenance team you reach from your phone.", "بوابة بحراسة على مدار الساعة وفريق صيانة تطلبه من جوالك."] }
];

const NEARBY = [
  [["King Abdullah Financial District", "مركز الملك عبدالله المالي"], 15],
  [["International schools", "المدارس العالمية"], 8],
  [["King Khalid International Airport", "مطار الملك خالد الدولي"], 25],
  [["Metro station", "محطة المترو"], 6],
  [["Hospitals and clinics", "المستشفيات والعيادات"], 10]
];
