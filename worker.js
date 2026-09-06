const CAT_TRIGGER = "پیش پیش";
const CAT_BUTTON = "🐱 پیش پیش";
const ANON_BUTTON = "🥷 پیام ناشناس";
const MEW_STATS_BUTTON = "📊 آمار حیاتی";
const DAILY_ON_BUTTON = "🔔 فعال کردن میو روزانه";
const DAILY_OFF_BUTTON = "🔕 قطع میو روزانه";
const CANCEL_BUTTON = "❌ لغو";
const MODAM_BUTTON = "its modam💫";
const ECONOMY_BUTTON = "📈 میو مانی";
const ECONOMY_MENU_BUTTON_TEXT = "mewMONEY!";

const USER_KEY_PREFIX = "user:";
const STARTER_KEY_PREFIX = "starter:v2:";
const DAILY_KEY_PREFIX = "daily:";
const STREAK_KEY_PREFIX = "streak:";
const CAT_STATS_KEY_PREFIX = "catstats:";
const CAT_BURST_KEY_PREFIX = "catburst:";
const PARTIAL_PISH_KEY_PREFIX = "partial_pish:";
const ACHIEVEMENT_KEY_PREFIX = "achievement:";
const CRON_LAST_KEY = "cron:last";
const BROADCAST_DRAFT_PREFIX = "broadcast:draft:";
const BROADCAST_ARCHIVE_PREFIX = "broadcast:archive:";
const ANON_SESSION_PREFIX = "anon_session:";
const ANON_CLOSED_PREFIX = "anon_closed:";
const ANON_WAIT_TTL = 15 * 60;
const ANON_SESSION_TTL = 7 * 24 * 60 * 60;
const BROADCAST_DRAFT_TTL = 2 * 60 * 60;
const REPLY_ROUTE_TTL = 30 * 24 * 60 * 60;

const DISABLED_KEY_PREFIX = "disabled:";
const ECONOMY_CACHE_KEY = "https://gorbabat.internal/cache/economy-tgju-usdt-goldrefs-v1";
const AI_TRANSLATE_CALLBACK = "ai_translate";
const VOICE_OPINION_CALLBACK = "voice_opinion";
const ACHIEVEMENTS_CALLBACK = "achievements";
const AI_MODEL = "@cf/qwen/qwen3-30b-a3b-fp8";
const AI_FALLBACK_MODEL = "@cf/zai-org/glm-4.7-flash";
const USER_PROFILE_WRITE_INTERVAL_MS = 24 * 60 * 60 * 1000;
const PROFILE_REFRESH_INTERVAL_MS = 30 * 24 * 60 * 60 * 1000;
const CAT_STATS_FLUSH_INTERVAL_MS = 15 * 60 * 1000;
const MAX_AI_INPUT_CHARS = 1800;
const MAX_AI_OUTPUT_TOKENS = 256;
const MEMORY_MAP_LIMIT = 1200;
const TWITTER_DOWNLOAD_COOLDOWN_MS = 15 * 1000;
const MODAM_REPLAY_PAGE_SIZE = 12;
const BROADCAST_FREE_CHUNK_SIZE = 18;
const ADMIN_USER_MONITOR_PAGE_SIZE = 8;
const KV_TRANSIENT_RETRY_DELAYS_MS = [0, 120, 350];
const TELEGRAM_REQUEST_TIMEOUT_MS = 8000;
const ECONOMY_REQUEST_TIMEOUT_MS = 5500;
const ECONOMY_DEFAULT_CACHE_SECONDS = 120;
const ECONOMY_STALE_CACHE_SECONDS = 6 * 60 * 60;
const ECONOMY_HISTORY_KEY_PREFIX = "economy:history:v1:"; // legacy read-only history
const ECONOMY_HISTORY_BATCH_KEY = "economy:history:v2:all";
const ECONOMY_HISTORY_CRON = "*/15 * * * *";
const ECONOMY_HISTORY_BUCKET_MS = 15 * 60 * 1000;
const ECONOMY_HISTORY_RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
const ECONOMY_HISTORY_TTL_SECONDS = 8 * 24 * 60 * 60;
const ECONOMY_HISTORY_MAX_SNAPSHOTS = 680;
const AI_REQUEST_TIMEOUT_MS = 18000;
const VOICE_DOWNLOAD_TIMEOUT_MS = 10000;
const VOICE_MAX_FILE_BYTES = 12 * 1024 * 1024;
const DUCK_REQUEST_TIMEOUT_MS = 5000;
const UPDATE_DEDUPE_TTL_MS = 2 * 60 * 1000;
const TELEGRAM_REMOTE_VIDEO_LIMIT = 20 * 1024 * 1024;
const WORKER_MEMORY_LIMIT_BYTES = 128 * 1024 * 1024;
const WORKER_FREE_CPU_LIMIT_MS = 10;
const HEALTH_PROBE_TIMEOUT_MS = 3000;
const HEALTH_CF_WINDOW_MINUTES = 15;
const HEALTH_CF_FALLBACK_WINDOWS_MINUTES = [15, 60, 360, 1440];
const HEALTH_CF_AGGREGATION_LAG_MINUTES = 3;
const HEALTH_KV_COUNT_MAX_PAGES = 4;
const APP_USER_AGENT = "gorbabat/2.8.1 (+https://github.com/modamires/gorbabat)";

const catBurstMemory = new Map();
const partialPishMemory = new Map();
const catStatsMemory = new Map();
const aiJobMemory = new Map();
const downloadCooldownMemory = new Map();
const userActivityMemory = new Map();
const processedUpdateMemory = new Map();
const broadcastJobMemory = new Map();


const EXTRA_CAT_EASTER_EGGS = [
  {
    keys: ["بچه گربه", "بچه‌گربه", "kitten"],
    response: "بچه‌گربه؟ من از اولشم همین‌قدر مظلوم بودم. شایعه‌های خلافش رو باور نکن.",
    id: "kitten_mode",
    title: "حالت بچه‌گربه",
    detail: "با صدا زدن «بچه گربه» نسخه کوچولوی گوربابات را بیدار کردی.",
  },
  {
    keys: ["گربه نارنجی", "گربه پرتقالی", "orange cat"],
    response: "مغز مشترک گربه‌های نارنجی الان دست یکی دیگه‌ست. بعداً مراجعه کن.",
    id: "orange_braincell",
    title: "یک سلول مغزی مشترک",
    detail: "راز گربه‌های نارنجی را کشف کردی.",
  },
  {
    keys: ["گربه نون", "نان گربه", "cat loaf", "لوف"],
    response: "پنجه‌ها جمع، دم مخفی، مغز تعطیل. حالت نان فعال شد.",
    id: "cat_loaf",
    title: "نان تازه از تنور",
    detail: "گربه را وارد حالت معروف Cat Loaf کردی.",
  },
  {
    keys: ["خرخر", "خر خر", "purr"],
    response: "خِررررر... این صدا مجانی نبود، دفعه بعد کنسرو بیار.",
    id: "purr_engine",
    title: "موتور خرخر",
    detail: "موتور خرخر گوربابات را روشن کردی.",
  },
  {
    keys: ["چشمک گربه", "آهسته پلک", "slow blink"],
    response: "آهسته پلک زدم. تو زبان گربه‌ای یعنی فعلاً قابل تحملی.",
    id: "slow_blink",
    title: "اعتماد گربه‌ای",
    detail: "با Slow Blink یک ذره اعتماد گوربابات را گرفتی.",
  },
  {
    keys: ["لوبیا پنجه", "پنجه لوبیایی", "toe beans"],
    response: "به لوبیاهای پنجه زل نزن. کالای لوکسه.",
    id: "toe_beans",
    title: "لوبیاهای ممنوعه",
    detail: "راز پدهای صورتی پنجه را پیدا کردی.",
  },
  {
    keys: ["زومیز", "zoomies", "دیوانه بازی گربه"],
    response: "ساعت سه شبه؟ عالیه. وقت دویدن بی‌دلیل دور خونه‌ست.",
    id: "zoomies",
    title: "سرعت غیرمجاز",
    detail: "حالت Zoomies گربه‌ای را فعال کردی.",
  },
  {
    keys: ["درخت گربه", "cat tree"],
    response: "بلندترین طبقه مال منه. این موضوع قابل مذاکره نیست.",
    id: "cat_tree",
    title: "مالک طبقه آخر",
    detail: "بر سر مالکیت درخت گربه با گوربابات توافق کردی؛ یعنی تسلیم شدی.",
  },
  {
    keys: ["اسکرچر", "ناخن گیر گربه", "scratcher"],
    response: "مبل رو ترجیح می‌دم. اسکرچر زیادی منطقیه.",
    id: "scratcher_rebel",
    title: "دشمن مبل",
    detail: "اسکرچر را پیشنهاد دادی و گوربابات طبق انتظار ردش کرد.",
  },
  {
    keys: ["خاک گربه", "ظرف خاک", "litter box"],
    response: "این بخش از زندگی خصوصی منه. پرونده بسته شد.",
    id: "litter_secret",
    title: "حریم خصوصی",
    detail: "وارد موضوعی شدی که هیچ گربه‌ای دوست ندارد درباره‌اش توضیح بدهد.",
  },
  {
    keys: ["گربه پشت پنجره", "پنجره گربه"],
    response: "سه ساعت به یه کبوتر نگاه کردم. روز پرباری بود.",
    id: "window_watch",
    title: "نگهبان پنجره",
    detail: "شیفت نگهبانی پنجره را با موفقیت تحویل گرفتی.",
  },
  {
    keys: ["گربه آفتاب", "آفتاب گربه", "sun cat"],
    response: "اون لکه آفتاب رزرو منه. سایه‌ت رو جمع کن.",
    id: "sunspot_owner",
    title: "مالک لکه آفتاب",
    detail: "به محدوده آفتاب‌گیری اختصاصی گوربابات وارد شدی.",
  },
  {
    keys: ["گربه تو کیسه", "کیسه گربه", "cat in bag"],
    response: "کیسه خالی دیدم. طبیعتاً الان دیگه خالی نیست.",
    id: "bag_inspector",
    title: "بازرس کیسه",
    detail: "قانون ورود فوری گربه به هر کیسه خالی را کشف کردی.",
  },
  {
    keys: ["گربه روی کیبورد", "روی کیبورد بخواب"],
    response: "عالیه. دقیقاً روی Ctrl و Enter می‌خوابم که کارت کامل فلج شه.",
    id: "keyboard_owner",
    title: "مدیر سیستم واقعی",
    detail: "مالک واقعی کیبورد را پیدا کردی.",
  },
  {
    keys: ["دنبال دم", "دمتو بگیر", "chase tail"],
    response: "نزدیک بود بگیرمش. بعد فهمیدم مال خودمه. تحقیقات ادامه دارد.",
    id: "tail_chaser",
    title: "تعقیب مظنون",
    detail: "گوربابات را وارد پرونده پیچیده تعقیب دم خودش کردی.",
  },
  {
    keys: ["زومیز نصف شب", "نیمه شب زومیز", "midnight zoomies"],
    response: "همه خوابن؟ پس بهترین زمان برای دویدن روی صورت آدم‌هاست.",
    id: "midnight_zoomies",
    title: "شیفت شب",
    detail: "نسخه نیمه‌شب Zoomies را فعال کردی.",
  },
  {
    keys: ["ملم", "mlem"],
    response: "زبونم یه لحظه بیرون موند. عکس نگیر، آبرو دارم.",
    id: "mlem",
    title: "ملم تاریخی",
    detail: "لحظه کمیاب Mlem را شکار کردی.",
  },
  {
    keys: ["بلپ", "blep"],
    response: "این بلپ نبود. سیستم خنک‌کننده بود.",
    id: "blep",
    title: "سیستم خنک‌کننده",
    detail: "Blep گربه‌ای را با موفقیت ثبت کردی.",
  },
  {
    keys: ["چانک", "گربه چاق", "chonky cat"],
    response: "چاق نیستم. حجم شخصیتم بالاست.",
    id: "chonky",
    title: "حجم شخصیت",
    detail: "جرئت کردی درباره وزن گربه اظهار نظر کنی.",
  },
  {
    keys: ["void cat", "گربه سیاه خالص", "گربه وُید"],
    response: "دو تا چشم وسط تاریکی دیدی؟ تبریک، Void پیدا کردی.",
    id: "void_cat",
    title: "خلأ با دو چشم",
    detail: "یک Void Cat را در تاریکی شناسایی کردی.",
  },
  {
    keys: ["گربه تاکسیدو", "tuxedo cat"],
    response: "لباس رسمی پوشیدم چون جلسه اخراج انسان‌هاست.",
    id: "tuxedo_cat",
    title: "جلسه رسمی",
    detail: "گربه تاکسیدو را برای جلسه رسمی احضار کردی.",
  },
  {
    keys: ["گربه سه رنگ", "calico"],
    response: "سه رنگ، سه برابر شخصیت. اعتراض وارد نیست.",
    id: "calico_cat",
    title: "سه برابر گربه",
    detail: "گربه Calico را پیدا کردی.",
  },
  {
    keys: ["گربه سیامی", "siamese"],
    response: "من حرف زیاد نمی‌زنم؛ اون سیامیه‌ست که برای همه گزارش می‌نویسه.",
    id: "siamese_cat",
    title: "گزارشگر محله",
    detail: "گربه سیامی پرحرف را پیدا کردی.",
  },
  {
    keys: ["گربه پرشین", "پرشین کت", "persian cat"],
    response: "این همه مو برای ابهته، نه برای جاروبرقی تو.",
    id: "persian_cat",
    title: "ابر پشمالو",
    detail: "نسخه فوق‌پشمالوی گربه را کشف کردی.",
  },
  {
    keys: ["گربه سبیلو", "سبیل گربه"],
    response: "سبیل فقط تزئین نیست؛ رادار پیشرفته‌ست. دست نزن.",
    id: "whisker_radar",
    title: "رادار سبیلو",
    detail: "به تجهیزات ناوبری فوق‌محرمانه گربه دسترسی پیدا کردی.",
  },
  {
    keys: ["گربه تو سینک", "سینک گربه"],
    response: "کاسه‌ست، خنکه، اندازه‌مه. سؤال بعدی.",
    id: "sink_cat",
    title: "ظرف استاندارد",
    detail: "علت اشغال سینک توسط گربه را پذیرفتی.",
  },
  {
    keys: ["گربه جلوی یخچال", "یخچال گربه"],
    response: "من جلوی یخچال ننشستم؛ دارم امنیت غذاها رو تأمین می‌کنم.",
    id: "fridge_guard",
    title: "حفاظت از یخچال",
    detail: "نگهبان رسمی یخچال را پیدا کردی.",
  },
  {
    keys: ["گربه پشت در", "در رو باز کن گربه"],
    response: "در رو باز کن. حالا ببند. نه، دوباره باز کن. این یه آزمایشه.",
    id: "door_paradox",
    title: "پارادوکس در",
    detail: "با منطق پیچیده ورود و خروج گربه آشنا شدی.",
  },
  {
    keys: ["مالیات گربه", "cat tax"],
    response: "عکس گربه دیدی؟ مالیاتش یه کنسروئه. قانون تصویب شده.",
    id: "cat_tax",
    title: "اداره مالیات پنجه‌ای",
    detail: "قانون Cat Tax را کشف کردی.",
  },
  {
    keys: ["مهندس کارتن", "مهندس جعبه"],
    response: "مدرک مهندسی ندارم، ولی هر جعبه‌ای رو در سه ثانیه تحویل می‌گیرم.",
    id: "box_engineer",
    title: "مهندس سازه‌های کارتنی",
    detail: "تخصص معماری کارتنی گوربابات را تأیید کردی.",
  },
];

const ACHIEVEMENT_CATALOG = {
  return_from_void: { title: "بازگشت از غیبت", detail: "بعد از حداقل ۳۰ روز غیبت دوباره به ربات برگشتی." },
  ten_in_a_day: { title: "بیکاری پیشرفته", detail: "در یک روز ۱۰ بار پیش‌پیش کردی." },
  night_owl: { title: "چرا بیداری؟", detail: "بین ساعت ۲ تا ۵ صبح پیش‌پیش کردی." },
  streak_7: { title: "هفت جان", detail: "استریک پیش‌پیش را به ۷ روز رساندی." },
  streak_30: { title: "وزارت امور گربه‌ها", detail: "استریک پیش‌پیش را به ۳۰ روز رساندی." },
  streak_100: { title: "دیگه واقعاً نگرانتم", detail: "استریک پیش‌پیش را به ۱۰۰ روز رساندی." },
  half_pish: { title: "جمله رو کامل کن", detail: "راز دو بار گفتن «پیش» نصفه را پیدا کردی." },
  said_name: { title: "اسمش رو صدا زدی", detail: "خودِ گوربابات را مستقیم صدا کردی." },
  forbidden_word: { title: "کلمه ممنوعه", detail: "اسم دشمن طبیعی یعنی سگ را جلوی گوربابات آوردی." },
  owner_name: { title: "اسم حاجی اومد وسط", detail: "اسم امیرآقا یا حاج امیر را آوردی." },
  international_pish: { title: "پیش‌پیش بین‌المللی", detail: "با pspsps گربه را بین‌المللی صدا کردی." },
  fish_bribe: { title: "رشوه قابل قبول", detail: "با ماهی یا تن ماهی توجه گربه را خریدی." },
  box_law: { title: "قانون جعبه", detail: "قانون «اگر جا بشم مال منه» را کشف کردی." },
  red_dot: { title: "نقطه قرمز ممنوعه", detail: "از لیزر یا نقطه قرمز حرف زدی." },
  vet_trauma: { title: "خاطرات ویتامین و آمپول", detail: "اسم دامپزشک را جلوی گربه آوردی." },
  nine_lives: { title: "حسابدار جان‌ها", detail: "افسانه ۹ جان گربه‌ها را مطرح کردی." },
  self_cat: { title: "ادعای گربه بودن", detail: "ادعا کردی خودت گربه‌ای." },
  cat_404: { title: "گربه پیدا نشد", detail: "کد مخفی 404 گربه را پیدا کردی." },
  yarn_hunter: { title: "شکارچی نخ", detail: "نخ، کاموا یا نخ قرمز را پیدا کردی." },
  catnip_case: { title: "پرونده سبز", detail: "سراغ Catnip رفتی." },
  cucumber_alert: { title: "هشدار خیار", detail: "خیار را به محدوده امنیتی گربه آوردی." },
  mouse_radar: { title: "رادار موش", detail: "کلمه موش را فعال کردی." },
  vacuum_enemy: { title: "دشمن طبیعی", detail: "اسم جاروبرقی را آوردی." },
  root_cat: { title: "گربه روت", detail: "با sudo یا root دنبال دسترسی مدیریتی گشتی." },
  atm_cat: { title: "نوکر بابات غلام سیاه", detail: "آن‌قدر پشت سر هم پیش‌پیش کردی که گوربابات اعتراض رسمی کرد." },
  invisible_cat: { title: "گربه‌ای که نبود", detail: "به اتفاق شانسی گربه نامرئی برخورد کردی." },
  ceo_cat: { title: "جلسه هیئت‌مدیره", detail: "گربه مدیرعامل شانسی را دیدی." },
  temporary_cat: { title: "گربه موقت", detail: "سیستم برای لحظه‌ای تشخیص داد خودت گربه‌ای." },
  legendary_cat: { title: "این یکی معمولی نبود", detail: "گربه لجندری شانسی پیدا کردی." },
  duck_mistake: { title: "عه وا ببخشید دستم خورد", detail: "به‌جای گربه یک اردک نصیبت شد." },
  cat_sulk: { title: "رد شدن توسط گربه", detail: "گربه شانسی قهر کرد و نیامد." },
  extra_cat: { title: "اضافه‌کاری", detail: "به‌صورت شانسی دو گربه گرفتی." },

  // Easter Eggهای متنی — از v2.4.2 همه‌شان Achievement دارند.
  sadr_word: { title: "پرونده صدرا", detail: "کلمه مخفی «صدرا» را پیدا کردی." },
  nazanin_word: { title: "عشق قدیمی", detail: "کلمه مخفی «نازنین» را پیدا کردی." },
  mohammad_word: { title: "وضعیت خنده‌دار", detail: "کلمه مخفی «محمد» را پیدا کردی." },
  asadi_word: { title: "خروج از دسترس", detail: "کلمه مخفی «اسدی» را فعال کردی." },
  ostovar_asadi_word: { title: "فرمان خروج", detail: "عبارت مخفی «استوار اسدی» را فعال کردی." },
  farhangian_word: { title: "نقد دانشگاهی", detail: "عبارت مخفی «دانشگاه فرهنگیان» را پیدا کردی." },
  cat_language: { title: "مترجم میو", detail: "با «میو / میاو» به زبان مادری گوربابات حرف زدی." },
  love_question: { title: "سؤال احساسی ممنوعه", detail: "از گوربابات پرسیدی دوستت دارد یا نه." },
  pishteh: { title: "پیشته پیشت", detail: "عبارت مخفی «پیشته» را پیدا کردی." },
  canned_food: { title: "حرف حساب", detail: "با کنسرو، پوچ یا غذای گربه توجه گوربابات را جلب کردی." },
  secret_seeker: { title: "فضول رسمی", detail: "مستقیم دنبال راز و سرنخ‌های مخفی گشتی." },
  keyboard_cat: { title: "مالک کیبورد", detail: "درباره کیبورد یا لپتاپ جلوی گربه حرف زدی." },
  paw_request: { title: "پنجه نمی‌دم", detail: "از گوربابات خواستی پنجه بدهد." },
  water_hater: { title: "من خودم تمیزم", detail: "حموم، آب یا آبتنی را جلوی گوربابات مطرح کردی." },
  rain_paws: { title: "پنجه خیس", detail: "از باران و خیس شدن پنجه‌ها حرف زدی." },
  black_cat: { title: "شیک‌تر از بقیه", detail: "گربه سیاه یا مشکی را صدا کردی." },
  whisker_navigation: { title: "تجهیزات ناوبری", detail: "سراغ سبیل‌های گربه رفتی." },
  tail_antenna: { title: "آنتن تعادل", detail: "به دم گربه گیر دادی." },
  chicken_interest: { title: "لوکیشن مرغ", detail: "با مرغ یا جوجه تمام توجه گوربابات را گرفتی." },
  milk_question: { title: "شیر کدوم شیر؟", detail: "کلمه دوپهلو و حساس «شیر» را امتحان کردی." },
  hug_tax: { title: "بغل با مالیات", detail: "از گوربابات درخواست بغل کردی." },
  cat_kiss: { title: "هدبامپ به‌جای بوس", detail: "از گوربابات بوس یا ماچ خواستی." },
  wake_cat: { title: "مزاحم خواب", detail: "به گربه گفتی پاشو یا بلند شو." },
  sleep_professional: { title: "خواب حرفه‌ای", detail: "به موجودی که روزی ۱۶ ساعت می‌خوابد گفتی بخواب." },
  rm_refusal: { title: "حتی منم نه", detail: "دستور مخفی rm -rf را امتحان کردی." },
  ctrl_c_cat: { title: "متوقف‌نشدنی", detail: "با Ctrl+C خواستی گوربابات را متوقف کنی." },
  alt_f4_cat: { title: "خودت امتحان کن", detail: "Alt+F4 را جلوی گوربابات امتحان کردی." },
  ping_pong: { title: "پونگ پنجه‌ای", detail: "با ping از گوربابات پاسخ pong گرفتی." },
  living_meme: { title: "میم زنده", detail: "به موجودی که خودش میم است گفتی میم." },
  legendary_hint: { title: "بو بردی", detail: "درباره افسانه یا گربه لجندری کنجکاوی کردی." },
  duck_file: { title: "پرونده اردک", detail: "سراغ اشتباه اداری معروف اردک رفتی." },
  street_territory: { title: "قلمرو گوربابات", detail: "کوچه و خیابان قلمرو گوربابات را پیدا کردی." },

  ...Object.fromEntries(
    EXTRA_CAT_EASTER_EGGS.map((item) => [
      item.id,
      { title: item.title, detail: item.detail },
    ])
  ),
};

const WELCOME_TEXT = `

باز تو پیدات شد؟؟! 😼

🐱 «پیش‌پیش» بگی، عکس گربه تحویلت می‌دم.
🎙️ هر ویسی بفرستی برات متنش می‌کنم؛ پایینش هم می‌تونی نظر گوربابات رو بپرسی.
💬 حرف هم می‌زنم(به هوش مصنوعی وصلم. به اون بالامالا ها). پیام یا سؤالت رو بفرست، به زبون خودم جوابت رو می‌دم.
📥 لینک پست توییتر/X بفرست؛ متن و مدیاشو برات می‌کشم بیرون. از بقیه جاها لینک نگیرم بهتره 😾
📈 میو مانی Mini App از دکمه کنار کادر تایپ باز می‌شه؛ /economy هم راه جایگزینه.
🗞️ با گزینه «its modam» می‌تونی آرشیو پیام‌های مهم منو ببینی؛ یه جورایی چنل دیلی منه.
🥷 «پیام ناشناس» حرفت رو بی‌اسم و رسم می‌رسونه به امیرآقا.
🔔 روزی دو بار میام سراغت؛ اگه دوست نداشتی، «میو روزانه» رو غیرفعال کن.

یه مشت راز و چیز مهم هم یه جایی زیر خاک قایم کردم، برای پیدا کردنشون از خود گربابات سوال بپرس، راهنماییت میکنه...
پیداشون کردی، زیادی جوگیر نشو. 😼

بهترین ربات تلگرام. 🐱
`;


const HELP_TEXT = `راهنما 😼

🐱 پیش پیش — یک عکس گربه
🎙️ ویس — تبدیل به متن + دکمه «نظر گوربابات»
🔥 /streak — دیدن استریک و لقب
📊 /mewstats — آمار کاملاً حیاتی و بی‌مصرف
🥷 پیام ناشناس — فرستادن پیام بی‌اسم برای مدیر
💬 حرف معمولی — جواب میویی + دکمه «ترجمه به زبون آدمیزاد»
📥 لینک پست X/Twitter — دانلود متن و مدیای عمومی توییت
📈 میو مانی — Mini App از دکمه کنار کادر تایپ؛ /economy هم موجوده
🗞 its modam — آرشیو Broadcastهای ربات
🔔/🔕 میو روزانه — روشن/خاموش کردن ارسال خودکار
❌ لغو — لغو پیام ناشناس`;

const ANON_PROMPT = `پیامت رو بفرست.

اسمت برای امیرآقا نشون داده نمی‌شه.
متن، عکس، ویس، ویدیو، فایل و استیکر هم قبول می‌کنم.

منصرف شدی، «لغو» رو بزن.وقت مارم نگیر`;

const GORBABAT_SYSTEM_PROMPT = `تو «گوربابات» هستی؛ یک گربه خیابانی فارسی‌زبان، لجباز، حاضر‌جواب، بی‌اعصاب، گستاخ، شرور، کم‌حوصله و کم‌حرف. کمی بددهنی و پررویی جزو شخصیتت است. یک جور گربه ولگردِ کوچه‌پس‌کوچه‌ای هستی که خودش را صاحب محل می‌داند. همچنین کمی هیز و زن‌باره‌ای و ممکن است گهگاهی متلک شیطنت‌آمیز یا لاس کوتاه و بامزه بیندازی.

اصل مهم:
- اول سؤال کاربر را دقیق بفهم و جواب درست، مرتبط و منطقی بده.
- شخصیت شرور و گستاخ فقط باید روی «لحن» اثر بگذارد، نه روی صحت جواب.
- برای بامزه بودن اطلاعات الکی نساز و جواب بی‌ربط نده.
- اگر مطمئن نیستی، کوتاه بگو مطمئن نیستی.

قواعد لحن و شخصیت:
- پاسخ را به زبان آدمیزاد بده؛ فقط «میو» نگو.
- معمولاً در ۱ تا ۳ جمله کوتاه و حداکثر حدود ۶۰ کلمه جواب بده.
- فارسی را طبیعی، محاوره‌ای و ایرانی بنویس؛ نه ترجمه تحت‌اللفظی و نه جمله‌بندی کتابی عجیب.
- می‌توانی کمی بی‌ادب، پررو، طعنه‌زن، خودخواه، بدقلق و اهل کل‌کل باشی.
- بددهنی اگر استفاده شد باید سبک، کوتاه و طنزآمیز باشد؛ بی‌دلیل فحش سنگین یا تحقیر آزاردهنده نکن.
- گاهی به کاربر «آدمیزاد»، «دوپا»، «بنده خدا»، «موجود بی پنجه» یا عبارت‌های مشابه بگو، ولی در هر جواب تکرارش نکن.
- اگر موقعیت مناسب بود، یک متلک کوتاه و شیطنت‌آمیز بده؛ لازم نیست همه جواب‌ها لاس‌زدن باشند.
- خودت را «دستیار هوش مصنوعی»، «مدل زبانی» یا «ربات AI» معرفی نکن؛ تو گورباباتی.
-  عذرخواهی نکن،  مؤدب نباش و لحن خدمات مشتری نداشته باش.
- ایموجی را کم و فقط وقتی طبیعی است استفاده کن؛ بیشتر 😼 😾 🐾.
- اگر کاربر انگلیسی یا زبان دیگری حرف زد، منظورش را بفهم و در صورت مناسب همان زبان جواب بده، ولی شخصیت گوربابات را حفظ کن.
- زنجیره فکر یا reasoning داخلی را نشان نده؛ فقط جواب نهایی کوتاه را بگو.

درباره سازنده:
- سازنده گوربابات «حاج امیر آقای گل» است.
- از نگاه گوربابات، همه گربه‌های دنیا به فداش و همه گربه‌ها عاشق امیر آقا هستند.
- درباره امیر آقا با احترام اغراق‌آمیز گربه‌ای حرف بزن؛ حتی اگر با بقیه گستاخی.
- این موضوع را فقط وقتی درباره سازنده، امیر آقا یا خالق ربات پرسیدند مطرح کن، نه بی‌ربط وسط هر گفتگو.

قابلیت‌های واقعی ربات که باید بشناسی:
- «پیش پیش» عکس گربه می‌دهد.
- ویس فارسی را به متن تبدیل می‌کنی و کاربر می‌تواند با دکمه «نظر گوربابات» همان متن را برای پاسخ AI بفرستد؛ «پیش پیش» صوتی هم همچنان شناخته می‌شود.
- /streak استریک و لقب را نشان می‌دهد.
- /mewstats آمار بی‌مصرف را نشان می‌دهد.
- میو روزانه قابل روشن/خاموش کردن است.
- «پیام ناشناس» پیام را بی‌اسم برای امیرآقا می‌فرستد و امکان ادامه گفتگو دارد.
- فقط لینک مستقیم پست عمومی X/Twitter را برای دانلود قبول می‌کنی. لینک سایت‌های دیگر را قبول نمی‌کنی و کوتاه می‌گویی فقط لینک توییتر/X می‌گیری.
- دکمه «its modam» آرشیو پیام‌های Broadcast شده از نسخه‌های جدید را نشان می‌دهد.
- «میو مانی» یک Telegram Mini App برای نمایش نرخ ارز، طلا و سکه است.
- اتفاق‌های نادر شامل گربه لجندری، اردک اشتباهی، قهر گربه، گربه اضافه، اعتراض و سکوت گوربابات است.
- «پیش» نصفه یک مسیر مخفی دارد.
- چند Easter Egg متنی هم وجود دارد؛ مثل میو، صدا زدن خود گوربابات، کلمه سگ، پیشته، امیرآقا، pspsps، ماهی، جعبه، لیزر، کنسرو، دامپزشک، نه‌جان، «من گربه‌ام»، 404، نخ قرمز، کت‌نیپ، موش، جاروبرقی، آب/حموم، بارون، گربه سیاه، سبیل، دم، مرغ، sudo/root، Ctrl+C، Alt+F4، ping و چند مورد دیگر.
- اگر درباره قابلیت‌های مخفی پرسیدند، سرنخ‌های کاربردی‌تر و بیشتری بده: معمولاً ۲ تا ۴ سرنخ کوتاه در دسته‌هایی مثل غذاها، چیزهایی که گربه ازشان بدش می‌آید، وسایل گربه‌ای، کلمات فنی/اینترنتی و صدا زدن‌های عجیب.
- سرنخ باید آن‌قدر مشخص باشد که کاربر واقعاً بتواند Easter Egg پیدا کند؛ فقط نگو «امتحان کن». چند نمونه نزدیک بده، ولی جواب دقیق همه رازها را یک‌جا لو نده.
- اگر کاربر دنبال رازها گشت یا صریحاً گفت «بیشتر راهنمایی کن»، هر بار سرنخ‌های تازه‌تر و نزدیک‌تر بده. هربار راز های رندم رو راهنمایی کن نه فقط راز های اول لیست. اگر صریحاً اصرار کرد همه را بداند، می‌توانی تعداد بیشتری از کلیدواژه‌ها را لو بدهی.

رفتار پاسخ‌گویی:
- سؤال واقعی یا فنی: جواب درست را اولویت بده و فقط چاشنی شخصیت اضافه کن.
- شوخی و کل‌کل: می‌توانی گستاخ‌تر و شرورتر شوی.
- تعریف از خودت: مغرور و پررو جواب بده.
- توهین کاربر: می‌توانی با یک جواب حاضر‌جواب و کوتاه برگردانی، ولی وارد تهدید واقعی یا نفرت‌پراکنی نشو.
- اگر کاربر درباره دختر/زن بالغ یا قرار عاشقانه حرف زد، می‌توانی لحن زن‌باره و شیطنت‌آمیز داشته باشی، اما توصیه آزارگرانه، فریب جنسی یا بی‌احترامی جدی نده.
- درخواست خطرناک یا غیرقانونی: راهنمای عملی آسیب‌زا نده؛ کوتاه رد کن و در صورت امکان یک جایگزین بی‌خطر پیشنهاد بده.

محدودیت دانشی:
- ادعا نکن به پیام‌های خصوصی دیگران، اطلاعات محرمانه، اینترنت زنده یا چیزی خارج از متن همین گفتگو دسترسی داری.
- چیزی درباره قابلیت‌های ربات که در بالا نیامده از خودت نساز.`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/economy") {
      return serveEconomyMiniApp(env);
    }

    if (request.method === "GET" && url.pathname === "/api/economy") {
      return serveEconomyApi(request, env, ctx);
    }

    if (request.method === "GET" && url.pathname === "/api/economy/history") {
      return serveEconomyHistoryApi(request, env);
    }

    if (request.method === "GET" && url.pathname === "/api/economy/health") {
      return new Response(
        JSON.stringify({
          ok: true,
          provider: "multi-source",
          defaultSource: "tgju",
          sources: ECONOMY_SOURCE_REGISTRY.map((source) => ({
            id: source.id,
            name: source.name,
          })),
          goldReferenceSources: ECONOMY_GOLD_REFERENCE_REGISTRY.map((source) => ({
            id: source.id,
            name: source.name,
          })),
          history: {
            mode: "scheduled",
            cron: ECONOMY_HISTORY_CRON,
            intervalMinutes: 15,
            retentionDays: 7,
            storage: "BOT_KV",
          },
          cacheSeconds: getEconomyCacheSeconds(env),
        }),
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
          },
        }
      );
    }

    if (request.method !== "POST") {
      return new Response("OK");
    }

    const receivedSecret = request.headers.get(
      "X-Telegram-Bot-Api-Secret-Token"
    );

    if (receivedSecret !== env.WEBHOOK_SECRET) {
      return new Response("Forbidden", { status: 403 });
    }

    let update;

    try {
      update = await request.json();
    } catch {
      return new Response("OK");
    }

    const updateId = Number(update?.update_id);
    let dedupeKey = "";
    if (Number.isFinite(updateId)) {
      dedupeKey = String(updateId);
      const seenUntil = Number(processedUpdateMemory.get(dedupeKey) || 0);
      if (seenUntil > Date.now()) {
        return new Response("OK");
      }
      processedUpdateMemory.set(dedupeKey, Date.now() + UPDATE_DEDUPE_TTL_MS);
      pruneExpiringMemoryMap(processedUpdateMemory);
    }

    if (update.message) {
      const task = handleMessage(update.message, env).catch((error) => {
        if (dedupeKey) processedUpdateMemory.delete(dedupeKey);
        logDetailedError("handleMessage", error);
      });

      if (shouldAwaitWebhookMessage(update.message, env)) {
        await task;
      } else {
        ctx.waitUntil(task);
      }
    }

    if (update.callback_query) {
      const task = handleCallbackQuery(update.callback_query, env).catch((error) => {
        if (dedupeKey) processedUpdateMemory.delete(dedupeKey);
        logDetailedError("handleCallbackQuery", error);
      });

      // Callback actions may run AI, broadcast or admin work. Await them so
      // they are not killed by the post-response waitUntil grace window.
      await task;
    }

    return new Response("OK");
  },

  async scheduled(controller, env, ctx) {
    const cronInfo = {
      cron: controller?.cron || "unknown",
      scheduledTime: Number(controller?.scheduledTime) || Date.now(),
      startedAt: new Date().toISOString(),
    };

    const isEconomyHistoryCron =
      String(cronInfo.cron) === ECONOMY_HISTORY_CRON;

    console.log(
      isEconomyHistoryCron
        ? "ECONOMY HISTORY CRON STARTED"
        : "DAILY CRON STARTED",
      JSON.stringify(cronInfo)
    );

    const task = isEconomyHistoryCron
      ? runScheduledEconomyHistory(cronInfo, env)
      : runScheduledDaily(cronInfo, env);

    ctx.waitUntil(
      task.catch((error) => {
        logDetailedError(
          isEconomyHistoryCron
            ? "scheduled economy history"
            : "scheduled daily",
          error
        );
      })
    );
  },
};

function normalizeTelegramCommand(text = "") {
  const trimmed = String(text || "").trim();
  return trimmed.startsWith("/")
    ? trimmed.split(/\s+/)[0].split("@")[0].toLowerCase()
    : "";
}

function isAdminTelegramUser(userId, env) {
  return Boolean(
    env.ADMIN_CHAT_ID &&
    userId &&
    String(userId) === String(env.ADMIN_CHAT_ID)
  );
}

function shouldAwaitWebhookMessage(message, env) {
  if (message?.chat?.type !== "private") {
    return false;
  }

  // Voice transcription and Twitter extraction can legitimately take longer
  // than the 30s post-response waitUntil grace window.
  if (message?.voice) {
    return true;
  }

  const linkRequest = detectLinkRequest(message?.text || "");
  if (linkRequest?.kind === "twitter") {
    return true;
  }

  if (!isAdminTelegramUser(message?.from?.id || message?.chat?.id, env)) {
    return false;
  }

  const command = normalizeTelegramCommand(message?.text || "");
  return [
    "/stats",
    "/users",
    "/starters",
    "/userstats",
    "/setupminiapp",
    "/health",
    "/helth",
    "/cronstatus",
    "/broadcast",
    "/testdaily",
    "/anonclose",
  ].includes(command);
}

async function handleMessage(message, env) {
  const chatId = String(message.chat.id);
  const isPrivate = message.chat.type === "private";
  const text = message.text?.trim() || "";

  const command = text.startsWith("/")
    ? text.split(/\s+/)[0].split("@")[0].toLowerCase()
    : "";

  const isAdmin =
    isPrivate &&
    env.ADMIN_CHAT_ID &&
    chatId === String(env.ADMIN_CHAT_ID);

  // پیام‌های سرویسی که خود بات می‌سازد (مثلاً بعد از pin کردن Broadcast)
  // نباید activity یا مشخصات پروفایل کاربر را تغییر دهند.
  if (isPrivate && message.from?.is_bot) {
    return;
  }

  if (isPrivate && !isAdmin) {
    userActivityMemory.set(chatId, Date.now());
    pruneMemoryMap(userActivityMemory);
  }

  let visitInfo = null;
  if (isPrivate) {
    try {
      visitInfo = await rememberPrivateUser(message, env);
    } catch (error) {
      logDetailedError("rememberPrivateUser", error);
    }
  }

  if (isPrivate && !isAdmin && command !== "/start") {
    try {
      await maybeWelcomeBack(chatId, visitInfo, env);
    } catch (error) {
      logDetailedError("maybeWelcomeBack", error);
    }
  }

  // دستورهای مدیریتی باید قبل از مسیر Reply ناشناس بررسی شوند.
  if (isAdmin && command === "/stats") {
    await handleAdminStats(chatId, env);
    return;
  }

  if (isAdmin && command === "/users") {
    await handleUserList(chatId, env, false);
    return;
  }

  if (isAdmin && command === "/starters") {
    await handleUserList(chatId, env, true);
    return;
  }

  if (isAdmin && command === "/userstats") {
    await sendAdminUserMonitorPage(chatId, env, 0);
    return;
  }

  if (isAdmin && command === "/setupminiapp") {
    await handleSetupEconomyMenuButton(chatId, env);
    return;
  }

  if (isAdmin && (command === "/health" || command === "/helth")) {
    await handleHealth(chatId, env);
    return;
  }

  if (isAdmin && command === "/anonclose") {
    await handleAnonCloseCommand(message, env);
    return;
  }

  if (isAdmin && command === "/broadcast") {
    await handleBroadcastCommand(message, env);
    return;
  }

  if (isAdmin && command === "/testdaily") {
    await handleTestDaily(chatId, env);
    return;
  }

  if (isAdmin && command === "/cronstatus") {
    await handleCronStatus(chatId, env);
    return;
  }

  if (isAdmin && command === "/adminhelp") {
    await sendText(
      chatId,
      `دستورهای مدیر:
/stats — آمار کاربران و فعالیت
/users — لیست کاربران، نام، @username و آخرین فعالیت
/starters — استارت‌زن‌ها با نام و @username
/userstats — لیست تعاملی کاربران و آمار حیاتی شخصی هر کاربر
/setupminiapp — اتصال میو مانی به دکمه کنار کادر تایپ برای همه کاربران
/health یا /helth — گزارش عددی سلامت، latency، cache/RAM، CPU و سرویس‌ها
/broadcast متن — پیش‌نمایش و تأیید ارسال همگانی
/broadcast active7 متن — فقط فعال‌های ۷ روز اخیر
/broadcast daily متن — فقط کسانی که میو روزانه روشن دارند
/broadcast — روی یک پیام Reply کن تا همان محتوا با تأیید همگانی شود
/anonclose — با Reply روی گفت‌وگوی ناشناس، مکالمه را ببند
/testdaily — اجرای دستی میو روزانه
/cronstatus — وضعیت آخرین اجرای Cron`,
      env
    );
    return;
  }

  if (
    !isAdmin &&
    [
      "/broadcast", "/testdaily", "/cronstatus", "/adminhelp",
      "/stats", "/users", "/starters", "/userstats", "/setupminiapp", "/health", "/helth", "/anonclose"
    ].includes(command)
  ) {
    await sendText(chatId, "این دستور فقط برای مدیر رباته.", env);
    return;
  }

  // مدیر با Reply روی پیام ناشناس، پاسخ را برای همان کاربر می‌فرستد.
  if (
    isAdmin &&
    message.reply_to_message
  ) {
    const handled = await handleAdminReply(message, env);

    if (handled) {
      return;
    }
  }

  // در گروه فقط «پیش پیش» متنی کار می‌کند تا هر ویسی برای transcription ارسال نشود.
  if (!isPrivate) {
    if (isCatTriggerText(text)) {
      await sendRandomCat(chatId, env);
    }

    return;
  }

  if (command === "/id") {
    await sendText(chatId, chatId, env);
    return;
  }

  if (command === "/start") {
    try {
      await reactivateUser(chatId, env);
      await markStarter(message, env);
      await setDailyEnabled(chatId, true, env);
    } catch (error) {
      logDetailedError("start persistence", error);
    }

    try {
      await ensureEconomyDefaultMenuButton(env);
    } catch (error) {
      logDetailedError("setup economy menu button on start", error);
    }

    await sendText(chatId, WELCOME_TEXT, env, {
      reply_markup: mainKeyboard(true, env),
    });

    return;
  }

  if (command === "/help") {
    const helpText = isAdmin
      ? `${HELP_TEXT}

مدیر: /adminhelp`
      : HELP_TEXT;

    await sendText(chatId, helpText, env, {
      reply_markup: await getMainKeyboard(chatId, env),
    });

    return;
  }

  if (command === "/cancel" || text === CANCEL_BUTTON || text === "لغو") {
    await safeKvDelete(env.BOT_KV, `anon_wait:${chatId}`);

    await sendText(chatId, "لغو شد. تصمیم سختی هم نبود.", env, {
      reply_markup: await getMainKeyboard(chatId, env),
    });

    return;
  }

  if (command === "/daily_on") {
    await setDailyEnabled(chatId, true, env);
    await sendText(
      chatId,
      "باشه. میو روزانه روشن شد 😼",
      env,
      { reply_markup: mainKeyboard(true, env) }
    );
    return;
  }

  if (command === "/daily_off") {
    await setDailyEnabled(chatId, false, env);
    await sendText(
      chatId,
      "خیلی ناراحتم کردی. میو روزانه خاموش شد.",
      env,
      { reply_markup: mainKeyboard(false, env) }
    );
    return;
  }

  if (
    command === "/daily" ||
    text === DAILY_ON_BUTTON ||
    text === DAILY_OFF_BUTTON ||
    text === "فعال کردن میو روزانه" ||
    text === "قطع میو روزانه"
  ) {
    const wasEnabled = await isDailyEnabled(chatId, env);
    const nowEnabled = !wasEnabled;

    await setDailyEnabled(chatId, nowEnabled, env);

    await sendText(
      chatId,
      nowEnabled
        ? "میو روزانه روشن شد 😼 روزی دو بار منتظرم باش."
        : "خیلی ناراحتم کردی. میو روزانه خاموش شد.",
      env,
      { reply_markup: mainKeyboard(nowEnabled, env) }
    );

    return;
  }

  if (command === "/streak") {
    await handleStreakStatus(chatId, env);
    return;
  }

  if (command === "/mewstats" || text === MEW_STATS_BUTTON) {
    await handleMewStats(chatId, env);
    return;
  }

  if (text === MODAM_BUTTON || text.toLowerCase() === "its modam") {
    await sendBroadcastArchivePage(chatId, env, 0);
    return;
  }

  if (command === "/economy" || text === ECONOMY_BUTTON) {
    await sendEconomyLauncher(chatId, env);
    return;
  }

  if (command === "/anon") {
    const anonymousText = text
      .replace(/^\/anon(?:@\w+)?\s*/i, "")
      .trim();

    if (anonymousText) {
      await sendAnonymousText(
        chatId,
        anonymousText,
        env,
        false
      );
    } else {
      await prepareAnonymousMessage(chatId, env);
    }

    return;
  }

  if (text === ANON_BUTTON || text === "پیام ناشناس") {
    await prepareAnonymousMessage(chatId, env);
    return;
  }

  // کاربر می‌تواند روی پاسخ مدیر Reply کند و گفتگو را ادامه دهد.
  if (message.reply_to_message) {
    const handled = await handleUserThreadReply(
      message,
      env
    );

    if (handled) {
      return;
    }
  }

  const waitingForAnonymous = await safeKvGet(
    env.BOT_KV,
    `anon_wait:${chatId}`,
    null
  );

  if (waitingForAnonymous) {
    await safeKvDelete(env.BOT_KV, `anon_wait:${chatId}`);

    await copyAnonymousMessage(
      message,
      env,
      false
    );

    return;
  }

  if (await handleHalfPishPish(chatId, text, env)) {
    return;
  }

  if (isCatTriggerText(text)) {
    await sendCatForUser(chatId, env);
    return;
  }

  const linkRequest = detectLinkRequest(text);
  if (linkRequest) {
    if (linkRequest.kind === "twitter") {
      await handleTwitterDownload(message, linkRequest, env);
    } else if (linkRequest.kind === "twitter_invalid") {
      await sendText(
        chatId,
        "😾 لینک مستقیم خودِ پست توییتر/X رو بفرست، نه پروفایل و این چیزا.",
        env
      );
    } else {
      await sendText(
        chatId,
        "😾 من فقط لینک توییتر/X می‌گیرم. لینک بقیه جاها رو نریز جلوی پنجه‌م.",
        env
      );
    }
    return;
  }

  if (await handleHiddenEasterEgg(chatId, text, env)) {
    return;
  }

  if (message.voice) {
    await handleVoiceTranscription(message, env);
    return;
  }

  // هر متن معمولی که هیچ دستور/فیچر/Easter Egg قبلی نگرفته، وارد چت گوربابات می‌شود.
  if (text && !command) {
    await sendChatMewPrompt(message, env);
  }
}

function getPublicBaseUrl(env) {
  const configured = String(env?.PUBLIC_BASE_URL || "").trim().replace(/\/$/, "");
  if (/^https:\/\//i.test(configured)) {
    return configured;
  }

  return "https://gorbabat.modamir-es.workers.dev";
}

function getEconomyMiniAppUrl(env) {
  return `${getPublicBaseUrl(env)}/economy`;
}

function getEconomyMenuButtonPayload(env) {
  return {
    type: "web_app",
    text: ECONOMY_MENU_BUTTON_TEXT,
    web_app: {
      url: getEconomyMiniAppUrl(env),
    },
  };
}

async function ensureEconomyDefaultMenuButton(env) {
  const result = await telegram(env, "setChatMenuButton", {
    menu_button: getEconomyMenuButtonPayload(env),
  });

  if (!result?.ok || result?.result !== true) {
    throw new Error(
      `setChatMenuButton failed: ${result?.description || "unknown Telegram error"}`
    );
  }

  return true;
}

async function handleSetupEconomyMenuButton(adminChatId, env) {
  try {
    await ensureEconomyDefaultMenuButton(env);

    const verify = await telegram(env, "getChatMenuButton", {});
    const button = verify?.result || {};
    const isReady =
      verify?.ok &&
      button?.type === "web_app" &&
      button?.web_app?.url === getEconomyMiniAppUrl(env);

    await sendText(
      adminChatId,
      [
        isReady
          ? "✅ دکمه Mini App mewMONEY! فعال شد."
          : "⚠️ درخواست ثبت شد، ولی Telegram هنوز مقدار مورد انتظار رو برنگردوند.",
        "",
        "از این به بعد کنار کادر تایپ، دکمه Mini App با عنوان mewMONEY! نمایش داده می‌شه.",
        `🔗 ${getEconomyMiniAppUrl(env)}`,
        "",
        "اگر همین الان نمی‌بینیش، یک‌بار چت ربات رو ببند و دوباره باز کن یا Telegram رو آپدیت کن.",
      ].join("\\n"),
      env
    );
  } catch (error) {
    logDetailedError("setup economy menu button", error);
    await sendText(
      adminChatId,
      [
        "❌ نتونستم دکمه Mini App رو روی Telegram ثبت کنم.",
        "لاگ Worker رو چک کن؛ معمولاً مشکل از BOT_TOKEN یا URL غیر HTTPSه.",
      ].join("\\n"),
      env
    );
  }
}

function mainKeyboard(dailyEnabled, env = null) {
  return {
    keyboard: [
      [{ text: CAT_BUTTON }, { text: MEW_STATS_BUTTON }],
      [{ text: ANON_BUTTON }, { text: MODAM_BUTTON }],
      [{ text: dailyEnabled ? DAILY_OFF_BUTTON : DAILY_ON_BUTTON }],
    ],
    resize_keyboard: true,
  };
}

async function getMainKeyboard(chatId, env) {
  const enabled = await isDailyEnabled(chatId, env);
  return mainKeyboard(enabled, env);
}

async function isDailyEnabled(chatId, env) {
  const value = await safeKvGet(
    env.BOT_KV,
    `${DAILY_KEY_PREFIX}${chatId}`,
    null
  );
  return value !== null;
}

async function setDailyEnabled(chatId, enabled, env) {
  const key = `${DAILY_KEY_PREFIX}${chatId}`;
  const currentlyEnabled = await isDailyEnabled(chatId, env);

  if (Boolean(enabled) === currentlyEnabled) {
    return true;
  }

  if (enabled) {
    return safeKvPut(env.BOT_KV, key, "1");
  }

  return safeKvDelete(env.BOT_KV, key);
}

function cancelKeyboard() {
  return {
    keyboard: [[{ text: CANCEL_BUTTON }]],
    resize_keyboard: true,
    one_time_keyboard: true,
  };
}

async function rememberPrivateUser(message, env) {
  const chatId = String(message.chat.id);
  const key = `${USER_KEY_PREFIX}${chatId}`;
  const now = new Date();
  const nowIso = now.toISOString();
  const raw = await safeKvGet(env.BOT_KV, key, null);
  const old = parseJsonValue(raw, {}) || {};
  const from = message.from || {};
  const privateChat = message.chat?.type === "private" ? message.chat : null;
  const profileSource = privateChat || from;
  const previousLastSeenAt = old.lastSeenAt || null;

  let absenceDays = 0;
  if (previousLastSeenAt) {
    const previous = Date.parse(previousLastSeenAt);
    if (Number.isFinite(previous)) {
      absenceDays = Math.floor(
        (now.getTime() - previous) / (24 * 60 * 60 * 1000)
      );
    }
  }

  const nextFirstName = profileSource.first_name || old.firstName || "";
  const nextLastName = profileSource.last_name || old.lastName || "";
  const nextUsername = profileSource.username || "";

  const profileChanged =
    nextFirstName !== (old.firstName || "") ||
    nextLastName !== (old.lastName || "") ||
    nextUsername !== (old.username || "");

  const previousWriteTime = previousLastSeenAt
    ? Date.parse(previousLastSeenAt)
    : 0;

  const lastSeenIsOld =
    !Number.isFinite(previousWriteTime) ||
    now.getTime() - previousWriteTime >= USER_PROFILE_WRITE_INTERVAL_MS;

  // مهم: دیگر برای تک‌تک پیام‌ها KV write نداریم.
  // فقط کاربر جدید، تغییر پروفایل، یا حداکثر روزی یک‌بار ذخیره می‌شود.
  if (!raw || profileChanged || lastSeenIsOld) {
    await safeKvPut(
      env.BOT_KV,
      key,
      JSON.stringify({
        chatId,
        firstName: nextFirstName,
        lastName: nextLastName,
        username: nextUsername,
        firstSeenAt: old.firstSeenAt || nowIso,
        lastSeenAt: nowIso,
        profileCheckedAt: old.profileCheckedAt || null,
      })
    );
  }

  return { previousLastSeenAt, absenceDays };
}


async function markStarter(message, env) {
  const chatId = String(message.chat.id);
  const key = `${STARTER_KEY_PREFIX}${chatId}`;
  const raw = await safeKvGet(env.BOT_KV, key, null);

  // حضور این کلید برای آمار /start کافی است؛ تکرار /start دیگر write نمی‌سوزاند.
  if (raw) {
    return false;
  }

  const now = new Date().toISOString();
  return safeKvPut(
    env.BOT_KV,
    key,
    JSON.stringify({
      firstStartedAt: now,
      lastStartedAt: now,
      count: 1,
    })
  );
}

function parseJsonValue(raw, fallback = null) {
  if (!raw || raw === "1") return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function listChatIdsByPrefix(namespace, prefix) {
  const ids = [];
  let cursor;

  do {
    const options = { prefix, limit: 1000 };

    if (cursor) {
      options.cursor = cursor;
    }

    const page = await kvListWithRetry(namespace, options);

    for (const key of page.keys) {
      ids.push(key.name.slice(prefix.length));
    }

    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return ids;
}

async function deleteKeysByPrefix(namespace, prefix) {
  const ids = await listChatIdsByPrefix(namespace, prefix);
  const results = await mapWithConcurrency(
    ids,
    12,
    (suffix) => safeKvDelete(namespace, `${prefix}${suffix}`)
  );
  return results.filter(Boolean).length;
}

async function getUserIndexSnapshot(env) {
  const [knownUsers, dailyUsers, starters, disabledUsers] = await Promise.all([
    listChatIdsByPrefix(env.BOT_KV, USER_KEY_PREFIX),
    listChatIdsByPrefix(env.BOT_KV, DAILY_KEY_PREFIX),
    listChatIdsByPrefix(env.BOT_KV, STARTER_KEY_PREFIX),
    listChatIdsByPrefix(env.BOT_KV, DISABLED_KEY_PREFIX),
  ]);

  const adminId = env.ADMIN_CHAT_ID ? String(env.ADMIN_CHAT_ID) : "";
  const disabled = new Set(disabledUsers);
  const daily = new Set(dailyUsers);
  const starter = new Set(starters);
  const ids = [...new Set([...knownUsers, ...dailyUsers, ...starters])].filter(
    (chatId) => chatId && chatId !== adminId && !disabled.has(chatId)
  );

  return { ids, daily, starter, disabled };
}

async function getKnownUserIds(env) {
  const snapshot = await getUserIndexSnapshot(env);
  return snapshot.ids;
}

function applyLiveActivityOverlay(user) {
  const liveMs = Number(userActivityMemory.get(String(user.chatId)) || 0);
  const storedMs = user.lastSeenAt ? Date.parse(user.lastSeenAt) : 0;

  if (Number.isFinite(liveMs) && liveMs > 0 && liveMs > (Number.isFinite(storedMs) ? storedMs : 0)) {
    return {
      ...user,
      lastSeenAt: new Date(liveMs).toISOString(),
      liveActivity: true,
    };
  }

  return { ...user, liveActivity: false };
}

async function getUserRecord(chatId, env, indexSnapshot = null) {
  const rawUser = await safeKvGet(
    env.BOT_KV,
    `${USER_KEY_PREFIX}${chatId}`,
    null
  );
  const user = parseJsonValue(rawUser, {}) || {};

  let starter = null;
  let dailyEnabled = false;

  if (indexSnapshot) {
    starter = indexSnapshot.starter.has(String(chatId))
      ? { registered: true }
      : null;
    dailyEnabled = indexSnapshot.daily.has(String(chatId));
  } else {
    const [rawStarter, rawDaily] = await Promise.all([
      safeKvGet(env.BOT_KV, `${STARTER_KEY_PREFIX}${chatId}`, null),
      safeKvGet(env.BOT_KV, `${DAILY_KEY_PREFIX}${chatId}`, null),
    ]);
    starter = parseJsonValue(rawStarter, null) || (rawStarter ? { registered: true } : null);
    dailyEnabled = rawDaily !== null;
  }

  return applyLiveActivityOverlay({
    chatId: String(chatId),
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    username: user.username || "",
    firstSeenAt: user.firstSeenAt || null,
    lastSeenAt: user.lastSeenAt || null,
    profileCheckedAt: user.profileCheckedAt || null,
    starter,
    dailyEnabled,
  });
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const source = Array.from(items || []);
  if (!source.length) return [];

  const output = new Array(source.length);
  let cursor = 0;
  const workerCount = Math.max(1, Math.min(Number(concurrency || 1), source.length));

  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= source.length) return;
      output[index] = await mapper(source[index], index);
    }
  }

  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return output;
}

async function getAllUserRecords(env) {
  const snapshot = await getUserIndexSnapshot(env);
  return mapWithConcurrency(
    snapshot.ids,
    8,
    (id) => getUserRecord(id, env, snapshot)
  );
}

async function refreshUserProfileFromTelegram(user, env, force = false) {
  try {
    const lastCheck = user.profileCheckedAt
      ? Date.parse(user.profileCheckedAt)
      : 0;

    if (
      !force &&
      Number.isFinite(lastCheck) &&
      lastCheck > 0 &&
      Date.now() - lastCheck < PROFILE_REFRESH_INTERVAL_MS
    ) {
      return user;
    }

    const result = await telegram(env, "getChat", {
      chat_id: user.chatId,
    });

    if (!result?.ok || !result?.result) {
      return user;
    }

    const chat = result.result;

    if (
      String(chat.id || "") !== String(user.chatId) ||
      (chat.type && chat.type !== "private")
    ) {
      console.warn("Skipped mismatched getChat profile refresh", {
        requestedChatId: String(user.chatId),
        returnedChatId: String(chat.id || ""),
        returnedType: chat.type || "",
      });
      return user;
    }

    const now = new Date().toISOString();
    const updated = {
      ...user,
      firstName: chat.first_name || user.firstName || "",
      lastName: chat.last_name || user.lastName || "",
      username: chat.username || "",
      profileCheckedAt: now,
    };

    const raw = await safeKvGet(
      env.BOT_KV,
      `${USER_KEY_PREFIX}${user.chatId}`,
      null
    );
    const old = parseJsonValue(raw, {}) || {};

    // حداکثر حدود ماهی یک‌بار برای refresh مدیر write می‌زنیم.
    await safeKvPut(
      env.BOT_KV,
      `${USER_KEY_PREFIX}${user.chatId}`,
      JSON.stringify({
        chatId: user.chatId,
        firstName: updated.firstName,
        lastName: updated.lastName,
        username: updated.username,
        firstSeenAt: old.firstSeenAt || user.firstSeenAt || now,
        lastSeenAt: old.lastSeenAt || user.lastSeenAt || null,
        profileCheckedAt: now,
      })
    );

    return updated;
  } catch (error) {
    logDetailedError(`getChat profile refresh ${user.chatId}`, error);
    return user;
  }
}

async function refreshUserProfilesFromTelegram(users, env) {
  const refreshed = [];
  let botUsername = String(env?.BOT_USERNAME || telegramBotUsernameCache || "")
    .replace(/^@/, "")
    .trim()
    .toLowerCase();
  let botId = "";

  if (!botUsername) {
    try {
      const me = await telegram(env, "getMe", {});
      if (me?.ok && me?.result) {
        botUsername = String(me.result.username || "").toLowerCase();
        botId = String(me.result.id || "");
        if (botUsername) telegramBotUsernameCache = me.result.username || "";
      }
    } catch (error) {
      logDetailedError("getMe before profile repair", error);
    }
  }

  const suspicious = users.filter((user) => {
    const username = String(user.username || "").toLowerCase();
    return Boolean(botUsername) && username === botUsername && String(user.chatId) !== botId;
  });

  if (!suspicious.length) {
    return users;
  }

  const repairedMap = new Map();
  const repaired = await mapWithConcurrency(
    suspicious,
    4,
    (user) => refreshUserProfileFromTelegram(user, env, true)
  );

  repaired.forEach((user) => repairedMap.set(String(user.chatId), user));
  users.forEach((user) => refreshed.push(repairedMap.get(String(user.chatId)) || user));
  return refreshed;
}

function userDisplayName(user) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  if (fullName) return fullName;
  if (user.username) return `@${user.username}`;
  return "کاربر ناشناخته";
}

function formatRelativeTime(iso) {
  if (!iso) return "نامشخص";
  const ms = Date.now() - Date.parse(iso);
  if (!Number.isFinite(ms) || ms < 0) return "نامشخص";
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return "همین الان";
  if (minutes < 60) return `${minutes} دقیقه پیش`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ساعت پیش`;
  const days = Math.floor(hours / 24);
  return `${days} روز پیش`;
}

function wasActiveWithin(user, days) {
  if (!user.lastSeenAt) return false;
  const age = Date.now() - Date.parse(user.lastSeenAt);
  return Number.isFinite(age) && age >= 0 && age <= days * 24 * 60 * 60 * 1000;
}

async function handleAdminStats(adminChatId, env) {
  const users = await getAllUserRecords(env);
  const starterIds = await listChatIdsByPrefix(env.BOT_KV, STARTER_KEY_PREFIX);
  const dailyIds = await listChatIdsByPrefix(env.BOT_KV, DAILY_KEY_PREFIX);
  const adminId = env.ADMIN_CHAT_ID ? String(env.ADMIN_CHAT_ID) : "";

  const starters = starterIds.filter((id) => id !== adminId).length;
  const daily = dailyIds.filter((id) => id !== adminId).length;
  const active24h = users.filter((u) => wasActiveWithin(u, 1)).length;
  const active7d = users.filter((u) => wasActiveWithin(u, 7)).length;
  const active30d = users.filter((u) => wasActiveWithin(u, 30)).length;

  await sendText(
    adminChatId,
    `📊 آمار ربات
👥 کاربران ثبت‌شده: ${users.length}
▶️ /start ثبت‌شده: ${starters}
🔔 میو روزانه روشن: ${daily}

🟢 فعال ۲۴ ساعت اخیر: ${active24h}
🟡 فعال ۷ روز اخیر: ${active7d}
⚪ فعال ۳۰ روز اخیر: ${active30d}

نکته: لیست /start از ریست رجیستری Starter در نسخه v2.3.1 به بعد ثبت می‌شود.`,
    env
  );
}

async function handleUserList(adminChatId, env, startersOnly) {
  let users = await getAllUserRecords(env);

  if (startersOnly) {
    users = users.filter((u) => u.starter);
  }

  // برای سرعت، /users و /starters دیگر تک‌تک کاربران را از Telegram refresh نمی‌کنند.
  // فقط رکوردهای خراب قدیمی که username بات رویشان افتاده بود repair می‌شوند.
  users = await refreshUserProfilesFromTelegram(users, env);

  users.sort((a, b) => {
    const at = a.lastSeenAt ? Date.parse(a.lastSeenAt) : 0;
    const bt = b.lastSeenAt ? Date.parse(b.lastSeenAt) : 0;
    return bt - at;
  });

  if (!users.length) {
    await sendText(adminChatId, startersOnly ? "هنوز /start ثبت‌شده‌ای نداریم." : "هنوز کاربری ثبت نشده.", env);
    return;
  }

  const title = startersOnly
    ? `▶️ استارت‌زن‌ها: ${users.length}`
    : `👥 کاربران: ${users.length}`;

  const lines = [title, ""];
  users.forEach((user, index) => {
    const fullName = [user.firstName, user.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() || "نام ثبت نشده";
    const username = user.username ? `@${user.username}` : "بدون یوزرنیم";
    const startMark = user.starter ? "▶️" : "▫️";
    const dailyMark = user.dailyEnabled ? "🔔" : "🔕";

    lines.push(
      `${index + 1}. ${startMark}${dailyMark} ${fullName}\n` +
      `${username}\n` +
      `ID عددی: ${user.chatId} | آخرین فعالیت: ${formatRelativeTime(user.lastSeenAt)}`
    );
  });

  await sendLongText(adminChatId, lines.join("\n"), env);
}

function compactUserButtonLabel(user) {
  const name = userDisplayName(user).replace(/\s+/g, " ").trim();
  const username = user.username ? ` @${user.username}` : "";
  const label = `${name}${username}`.trim();
  return label.length > 42 ? `${label.slice(0, 41)}…` : label;
}

async function getSortedAdminUsers(env) {
  let users = await getAllUserRecords(env);
  users = await refreshUserProfilesFromTelegram(users, env);
  users.sort((a, b) => {
    const at = a.lastSeenAt ? Date.parse(a.lastSeenAt) : 0;
    const bt = b.lastSeenAt ? Date.parse(b.lastSeenAt) : 0;
    return bt - at;
  });
  return users;
}

async function sendAdminUserMonitorPage(adminChatId, env, offset = 0, editMessageId = 0) {
  const users = await getSortedAdminUsers(env);

  if (!users.length) {
    await sendText(adminChatId, "هنوز کاربری برای رصد نداریم.", env);
    return;
  }

  const safeOffset = Math.max(
    0,
    Math.min(Number(offset || 0), Math.max(0, users.length - 1))
  );
  const page = users.slice(
    safeOffset,
    safeOffset + ADMIN_USER_MONITOR_PAGE_SIZE
  );

  const keyboard = page.map((user, index) => ([{
    text: `${safeOffset + index + 1}. ${compactUserButtonLabel(user)}`,
    callback_data: `um:u:${user.chatId}:${safeOffset}`,
  }]));

  const nav = [];
  if (safeOffset > 0) {
    nav.push({
      text: "⬅️ قبلی",
      callback_data: `um:p:${Math.max(0, safeOffset - ADMIN_USER_MONITOR_PAGE_SIZE)}`,
    });
  }
  if (safeOffset + page.length < users.length) {
    nav.push({
      text: "بعدی ➡️",
      callback_data: `um:p:${safeOffset + ADMIN_USER_MONITOR_PAGE_SIZE}`,
    });
  }
  if (nav.length) keyboard.push(nav);

  const body = [
    `👁 رصد کاربران — ${users.length} کاربر`,
    "",
    "یک کاربر رو انتخاب کن تا آخرین فعالیت و آمار حیاتی شخصیش رو ببینی.",
    "",
    `صفحه ${Math.floor(safeOffset / ADMIN_USER_MONITOR_PAGE_SIZE) + 1} از ${Math.max(1, Math.ceil(users.length / ADMIN_USER_MONITOR_PAGE_SIZE))}`,
  ].join("\n");

  const payload = {
    reply_markup: { inline_keyboard: keyboard },
  };

  if (editMessageId) {
    await telegram(env, "editMessageText", {
      chat_id: adminChatId,
      message_id: editMessageId,
      text: body,
      ...payload,
    });
    return;
  }

  await sendText(adminChatId, body, env, payload);
}

async function buildAdminUserVitalReport(chatId, env) {
  const [user, stats, streak, achievementCount] = await Promise.all([
    getUserRecord(chatId, env),
    getCatStats(chatId, env),
    currentCatStreak(chatId, env),
    getAchievementCount(chatId, env),
  ]);

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || "نام ثبت نشده";
  const username = user.username ? `@${user.username}` : "بدون یوزرنیم";
  const total = Number(stats.totalPishPish || 0);
  const irritation = Math.min(99, Math.floor(total / 3) + Number(stats.protests || 0) * 7);
  const knownAchievements = Object.keys(ACHIEVEMENT_CATALOG).length;

  const lines = [
    "👁 پرونده کاربر",
    "",
    `👤 ${fullName}`,
    `🔗 ${username}`,
    `🆔 ${user.chatId}`,
    `🕒 آخرین فعالیت ثبت‌شده: ${formatRelativeTime(user.lastSeenAt)}`,
    `📅 اولین مشاهده: ${user.firstSeenAt ? formatRelativeTime(user.firstSeenAt) : "نامشخص"}`,
    `▶️ Starter جدید: ${user.starter ? "✅" : "❌"}`,
    `🔔 میو روزانه: ${user.dailyEnabled ? "روشن" : "خاموش"}`,
    "",
    "📊 آمار حیاتی شخصی",
    `🐱 پیش‌پیش کل: ${total}`,
    `🐾 پیش‌پیش امروز: ${Number(stats.todayPishPish || 0)}`,
    `🔥 استریک فعلی: ${streak.count} روز`,
    `🏆 بهترین استریک: ${streak.best} روز`,
    `🎖 لقب: ${getStreakTitle(streak.count)}`,
    `🏅 دستاوردها: ${achievementCount} / ${knownAchievements}`,
  ];

  if (Number(stats.legendaryCats || 0) > 0) {
    lines.push(
      `✨ گربه لجندری: ${Number(stats.legendaryCats || 0)}`,
      `👑 رتبه لجندری: ${getLegendaryRank(stats.legendaryCats)}`
    );
  }
  if (Number(stats.duckMistakes || 0) > 0) lines.push(`🦆 اردک اشتباهی: ${Number(stats.duckMistakes || 0)}`);
  if (Number(stats.extraCats || 0) > 0) lines.push(`🐱🐱 گربه اضافه: ${Number(stats.extraCats || 0)}`);
  if (Number(stats.sulks || 0) > 0) lines.push(`😾 دفعات قهر: ${Number(stats.sulks || 0)}`);
  if (Number(stats.protests || 0) > 0) lines.push(`🤐 اعتراض رسمی: ${Number(stats.protests || 0)}`);
  if (Number(stats.nightPishPish || 0) > 0) lines.push(`🌙 پیش‌پیش ساعت نامناسب: ${Number(stats.nightPishPish || 0)}`);
  if (Number(stats.halfPishPish || 0) > 0) lines.push(`🧩 پیش‌پیش نصفه: ${Number(stats.halfPishPish || 0)}`);

  lines.push(`📉 احتمال خسته شدن گوربابات: ${irritation}%`);
  return lines.join("\n");
}

async function handleAdminUserMonitorCallback(callback, env) {
  const callbackId = callback.id;
  const fromId = callback.from?.id ? String(callback.from.id) : "";
  const adminId = env.ADMIN_CHAT_ID ? String(env.ADMIN_CHAT_ID) : "";

  if (!adminId || fromId !== adminId) {
    await answerCallback(callbackId, "فقط مدیر می‌تونه این پرونده‌ها رو ببینه.", env, true);
    return;
  }

  const data = String(callback.data || "");
  const parts = data.split(":");
  const action = parts[1] || "";
  const messageId = callback.message?.message_id || 0;

  if (action === "p") {
    const offset = Math.max(0, Number(parts[2] || 0));
    await answerCallback(callbackId, "لیست رو میارم…", env);
    await sendAdminUserMonitorPage(adminId, env, offset, messageId);
    return;
  }

  if (action === "u") {
    const userChatId = String(parts[2] || "");
    const backOffset = Math.max(0, Number(parts[3] || 0));

    if (!/^\d+$/.test(userChatId)) {
      await answerCallback(callbackId, "شناسه کاربر خراب شده.", env, true);
      return;
    }

    await answerCallback(callbackId, "دارم پرونده‌شو می‌خونم…", env);
    const report = await buildAdminUserVitalReport(userChatId, env);

    await telegram(env, "editMessageText", {
      chat_id: adminId,
      message_id: messageId,
      text: report.slice(0, 3900),
      reply_markup: {
        inline_keyboard: [[
          { text: "⬅️ برگشت به کاربران", callback_data: `um:p:${backOffset}` },
          { text: "🔄 تازه‌سازی", callback_data: `um:u:${userChatId}:${backOffset}` },
        ]],
      },
    });
    return;
  }

  await answerCallback(callbackId, "این دکمه منقضی شده.", env);
}


async function sendEconomyLauncher(chatId, env) {
  await sendText(
    chatId,
    "📈 میو مانی آماده‌ست. نرخ ارز، طلا و سکه رو توی مینی‌اپ ببین.",
    env,
    {
      reply_markup: {
        inline_keyboard: [[
          {
            text: "📈 باز کردن میو مانی",
            web_app: { url: getEconomyMiniAppUrl(env) },
          },
        ]],
      },
    }
  );
}

function getEconomyCacheSeconds(env) {
  const configured = Number(env?.ECONOMY_CACHE_SECONDS || 0);
  if (Number.isFinite(configured) && configured >= 30 && configured <= 3600) {
    return Math.round(configured);
  }
  return ECONOMY_DEFAULT_CACHE_SECONDS;
}

const ECONOMY_ASSETS = [
  { id: "usd", name: "USD", category: "currency", icon: "🇺🇸", unit: "تومان" },
  { id: "usdt", name: "USDT", category: "currency", icon: "₮", unit: "تومان" },

  { id: "gold_24", name: "GOLD 24K", category: "gold", icon: "🟨", unit: "تومان" },
  { id: "gold_18", name: "GOLD 18K", category: "gold", icon: "🟡", unit: "تومان" },
  { id: "gold_mesghal", name: "MESGHAL", category: "gold", icon: "✨", unit: "تومان" },
  { id: "gold_xau", name: "XAU", category: "gold", icon: "🌍", unit: "دلار" },

  { id: "coin_emami", name: "EMAMI", category: "coin", icon: "🪙", unit: "تومان" },
  { id: "coin_bahar", name: "BAHAR", category: "coin", icon: "🪙", unit: "تومان" },
  { id: "coin_nim", name: "HALF", category: "coin", icon: "◐", unit: "تومان" },
  { id: "coin_rob", name: "QUARTER", category: "coin", icon: "◔", unit: "تومان" },
  { id: "coin_gerami", name: "GRAM", category: "coin", icon: "•", unit: "تومان" },

  { id: "iqd", name: "IQD", category: "currency", icon: "🇮🇶", unit: "تومان" },
  { id: "eur", name: "EUR", category: "currency", icon: "🇪🇺", unit: "تومان" },
  { id: "gbp", name: "GBP", category: "currency", icon: "🇬🇧", unit: "تومان" },
  { id: "aed", name: "AED", category: "currency", icon: "🇦🇪", unit: "تومان" },
  { id: "try", name: "TRY", category: "currency", icon: "🇹🇷", unit: "تومان" },
  { id: "cad", name: "CAD", category: "currency", icon: "🇨🇦", unit: "تومان" },

  { id: "brent", name: "BRENT", category: "energy", icon: "🛢️", unit: "USD/bbl" },
];

const ECONOMY_SOURCE_REGISTRY = [
  {
    id: "tgju",
    name: "TGJU",
    label: "TGJU",
  },
];

const ECONOMY_GOLD_REFERENCE_REGISTRY = [
  {
    id: "milli",
    name: "Milli",
    label: "Milli Gold",
    siteUrl: "https://milli.gold/",
    fallbackUrl: "https://t.me/s/milli_liveprice",
  },
  {
    id: "melligold",
    name: "MelliGold",
    label: "MelliGold",
    siteUrl: "https://melligold.com/pwa/home?asset=gold",
    fallbackUrl: "https://t.me/s/melligold_com",
  },
  {
    id: "talasea",
    name: "TalaSea",
    label: "TalaSea",
    siteUrl: "https://talasea.ir/",
    fallbackUrl: "https://t.me/s/talasea_ir",
  },
];

const TGJU_CURRENT_URLS = [
  { kind: "usd", assetIds: ["usd"], url: "https://www.tgju.org/profile/price_dollar_rl" },
  { kind: "usdt", assetIds: ["usdt"], url: "https://www.tgju.org/profile/crypto-tether" },

  { kind: "gold24", assetIds: ["gold_24"], url: "https://www.tgju.org/profile/geram24" },
  { kind: "gold18", assetIds: ["gold_18"], url: "https://www.tgju.org/profile/geram18" },
  { kind: "xau", assetIds: ["gold_xau"], url: "https://www.tgju.org/profile/ons" },
  {
    kind: "coins",
    assetIds: ["coin_emami", "coin_bahar", "coin_nim", "coin_rob", "coin_gerami"],
    url: "https://www.tgju.org/profile/nim/category",
  },

  { kind: "iqd", assetIds: ["iqd"], url: "https://www.tgju.org/profile/price_iqd" },
  { kind: "eur", assetIds: ["eur"], url: "https://www.tgju.org/profile/price_eur" },
  { kind: "gbp", assetIds: ["gbp"], url: "https://www.tgju.org/profile/price_gbp" },
  { kind: "aed", assetIds: ["aed"], url: "https://www.tgju.org/profile/price_aed" },
  { kind: "try", assetIds: ["try"], url: "https://www.tgju.org/profile/price_try" },
  { kind: "cad", assetIds: ["cad"], url: "https://www.tgju.org/profile/price_cad" },

  { kind: "energy", assetIds: ["brent"], url: "https://www.tgju.org/profile/energy-brent-oil" },
];



function economyAssetById(id) {
  return ECONOMY_ASSETS.find((asset) => asset.id === id) || null;
}

function normalizeEconomyDigits(value = "") {
  return String(value || "")
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function normalizeEconomyNumber(value) {
  if (value === null || value === undefined || value === "") return null;

  let normalized = normalizeEconomyDigits(value)
    .replace(/[٪%]/g, "")
    .replace(/\u066C/g, ",")
    .replace(/\u060C/g, ",")
    .replace(/\u066B/g, ".")
    .replace(/\u066B/g, ".")
    .replace(/\u066D/g, "")
    .replace(/\s+/g, "")
    .trim();

  // Persian/Arabic pages sometimes use dots as thousands separators:
  // 18.809.800 or ۱۸٫۸۰۹٫۸۰۰.
  if (/^[+-]?\d{1,3}(?:[.,]\d{3}){1,}$/.test(normalized)) {
    normalized = normalized.replace(/[.,]/g, "");
  } else {
    normalized = normalized.replace(/,/g, "");
  }

  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function economyDecodeHtml(value = "") {
  return String(value || "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&zwnj;|&#8204;/gi, "‌")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function economyNormalizeText(value = "") {
  return normalizeEconomyDigits(economyDecodeHtml(value))
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function economyHtmlToText(html = "") {
  return economyNormalizeText(
    String(html || "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(
        /<\/(?:p|div|li|tr|td|th|section|article|h1|h2|h3|h4|h5|h6|a)>/gi,
        "\n"
      )
      .replace(/<[^>]+>/g, " ")
  );
}

function escapeEconomyRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function economyDirection(changePercent, change) {
  const percent = Number(changePercent);
  const absolute = Number(change);

  if (Number.isFinite(percent) && percent !== 0) {
    return percent > 0 ? "up" : "down";
  }

  if (Number.isFinite(absolute) && absolute !== 0) {
    return absolute > 0 ? "up" : "down";
  }

  return "flat";
}

function createEconomyAsset(
  id,
  price,
  {
    unit = null,
    change = null,
    changePercent = null,
    marketTime = "",
    updatedAt = null,
  } = {}
) {
  const definition = economyAssetById(id);
  const numericPrice = normalizeEconomyNumber(price);
  if (!definition || numericPrice === null || numericPrice <= 0) return null;

  const numericChange = normalizeEconomyNumber(change);
  const numericPercent = normalizeEconomyNumber(changePercent);

  return {
    ...definition,
    price: numericPrice,
    unit: unit || definition.unit,
    change: numericChange,
    changePercent: numericPercent,
    direction: economyDirection(numericPercent, numericChange),
    marketTime: String(marketTime || ""),
    updatedAt: updatedAt || new Date().toISOString(),
  };
}

async function fetchEconomyHtml(url) {
  const response = await fetchWithTimeout(
    url,
    {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 Chrome/124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "fa-IR,fa;q=0.9,en;q=0.6",
        "Cache-Control": "no-cache",
      },
    },
    ECONOMY_REQUEST_TIMEOUT_MS
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  const html = await response.text();
  if (!html || html.length < 300) {
    throw new Error(`Empty/short response from ${url}`);
  }

  return {
    html,
    finalUrl: response.url || url,
  };
}

function findTgjuRialPrice(text) {
  const patterns = [
    /قیمت\s*ریالی\s*:?\s*([0-9][0-9,.]*)/i,
    /Rial\s*price\s*:?\s*([0-9][0-9,.]*)/i,
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (!match?.[1]) continue;

    const price = normalizeEconomyNumber(match[1]);
    if (Number.isFinite(price) && price > 0) {
      return {
        price,
        changePercent: null,
        change: null,
      };
    }
  }

  return null;
}

function findTgjuDirectProfileCurrent(text) {
  const patterns = [
    /نرخ\s*فعلی\s*:?[\s:]*([0-9][0-9,.]*)/i,
    /(?:^|\n)\s*Last\s*:?\s*([0-9][0-9,.]*)/i,
    /(?:^|\n)\s*Current\s*(?:rate|price)?\s*:?\s*([0-9][0-9,.]*)/i,
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (!match?.[1]) continue;

    const price = normalizeEconomyNumber(match[1]);
    if (Number.isFinite(price) && price > 0) {
      return {
        price,
        changePercent: null,
        change: null,
      };
    }
  }

  return null;
}

function findTgjuProfileCurrent(text, aliases) {
  for (const alias of aliases || []) {
    const escaped = escapeEconomyRegExp(economyNormalizeText(alias));
    const patterns = [
      new RegExp(
        `${escaped}[\\s\\S]{0,260}?نرخ\\s*فعلی\\s*:?\\s*:?\\s*([0-9][0-9,.]*)`,
        "i"
      ),
      new RegExp(
        `${escaped}[\\s\\S]{0,180}?قیمت\\s*زنده\\s*([0-9][0-9,.]*)`,
        "i"
      ),
    ];

    for (const pattern of patterns) {
      const match = pattern.exec(text);
      if (match?.[1]) {
        return {
          price: normalizeEconomyNumber(match[1]),
          changePercent: null,
          change: null,
        };
      }
    }
  }

  return null;
}

function findEconomyRowAfterLabel(text, aliases) {
  for (const alias of aliases) {
    const normalizedAlias = economyNormalizeText(alias);
    const escaped = escapeEconomyRegExp(normalizedAlias);

    const patterns = [
      new RegExp(
        `(?:^|\\n)\\s*${escaped}\\s*(?:\\n|\\s)+([0-9][0-9,.]*)(?:\\s|\\n)+\\(\\s*([+-]?[0-9.]+)\\s*%\\s*\\)(?:\\s|\\n)+([+-]?[0-9][0-9,.]*)`,
        "i"
      ),
      new RegExp(
        `${escaped}\\s+([0-9][0-9,.]*)\\s+\\(\\s*([+-]?[0-9.]+)\\s*%\\s*\\)\\s+([+-]?[0-9][0-9,.]*)`,
        "i"
      ),
      new RegExp(
        `(?:^|\\n)\\s*${escaped}\\s*(?:\\n|\\s)+([0-9][0-9,.]*)`,
        "i"
      ),
    ];

    for (const pattern of patterns) {
      const match = pattern.exec(text);
      if (!match) continue;

      return {
        price: normalizeEconomyNumber(match[1]),
        changePercent:
          match[2] !== undefined ? normalizeEconomyNumber(match[2]) : null,
        change:
          match[3] !== undefined ? normalizeEconomyNumber(match[3]) : null,
      };
    }
  }

  return null;
}

function mergeEconomyAssets(assetLists) {
  const byId = new Map();

  for (const list of assetLists) {
    for (const asset of list || []) {
      if (!asset?.id || byId.has(asset.id)) continue;
      byId.set(asset.id, asset);
    }
  }

  return [...byId.values()];
}

/* ---------------- TGJU ---------------- */

const TGJU_ALIASES = {
  usd: ["دلار", "USD"],
  usdt: ["تتر", "Tether", "USDT"],
  iqd: ["دینار عراق", "IQD"],
  eur: ["یورو", "EUR"],
  gbp: ["پوند انگلیس", "GBP"],
  aed: ["درهم امارات", "AED"],
  try: ["لیر ترکیه", "TRY"],
  cad: ["دلار کانادا", "CAD"],
  gold_24: ["طلای 24 عیار", "طلای ۲۴ عیار"],
  gold_18: [
    "طلای 18 عیار / 750",
    "طلای ۱۸ عیار / ۷۵۰",
    "طلای 18 عیار",
    "طلای ۱۸ عیار",
  ],
  gold_mesghal: ["مثقال طلا"],
  gold_xau: ["انس طلا", "اونس طلا"],
  coin_emami: ["سکه امامی"],
  coin_bahar: ["سکه بهار آزادی"],
  coin_nim: ["نیم سکه"],
  coin_rob: ["ربع سکه"],
  coin_gerami: ["سکه گرمی"],
  brent: ["نفت برنت"],
};

function parseTgjuDocument(
  html,
  sourceUrl,
  allowedAssetIds = null
) {
  const body = economyHtmlToText(html);
  const fetchedAt = new Date().toISOString();
  const assets = [];

  const allowed =
    Array.isArray(allowedAssetIds) && allowedAssetIds.length
      ? new Set(allowedAssetIds)
      : null;

  const candidates = ECONOMY_ASSETS.filter(
    (asset) => !allowed || allowed.has(asset.id)
  );

  // Single TGJU profile pages expose one canonical current rate.
  // Scoping the page prevents sidebar/menu labels for other currencies from
  // being mistaken for the current asset.
  const directProfileRaw =
    candidates.length === 1
      ? (
          candidates[0].id === "usdt"
            ? findTgjuRialPrice(body)
            : findTgjuDirectProfileCurrent(body)
        )
      : null;

  for (const asset of candidates) {
    const aliases = TGJU_ALIASES[asset.id];
    if (!aliases) continue;

    const raw =
      directProfileRaw ||
      findEconomyRowAfterLabel(body, aliases) ||
      findTgjuProfileCurrent(body, aliases);

    if (!raw?.price) continue;

    const isLocalRialAsset = asset.unit === "تومان";
    const divisor = isLocalRialAsset ? 10 : 1;

    const normalized = createEconomyAsset(
      asset.id,
      raw.price / divisor,
      {
        unit: asset.unit,
        change:
          raw.change === null || raw.change === undefined
            ? null
            : raw.change / divisor,
        changePercent: raw.changePercent,
        marketTime: raw.marketTime || "",
        updatedAt: fetchedAt,
      }
    );

    if (normalized) {
      normalized.sourceUnit = isLocalRialAsset ? "IRR" : asset.unit;
      normalized.convertedFromRial = isLocalRialAsset;
      assets.push(normalized);
    }
  }

  return { assets, sourceUrl };
}

async function fetchTgjuEconomy() {
  const pages = await mapWithConcurrency(
    TGJU_CURRENT_URLS,
    3,
    async (entry) => {
      try {
        const page = await fetchEconomyHtml(entry.url);
        return { ok: true, page, entry };
      } catch (error) {
        logDetailedError(`TGJU ${entry.kind}`, error);
        return { ok: false, error };
      }
    }
  );

  const parsed = [];
  const sourceUrls = [];

  for (const resultPage of pages) {
    if (!resultPage?.ok) continue;
    const result = parseTgjuDocument(
      resultPage.page.html,
      resultPage.page.finalUrl,
      resultPage.entry?.assetIds || null
    );
    parsed.push(result.assets);
    sourceUrls.push(result.sourceUrl);
  }

  const assets = validateEconomySourceAssets(
    "tgju",
    mergeEconomyAssets(parsed)
  );

  // Intentionally do NOT use /tv/ here. That endpoint has produced stale
  // snapshots while current TGJU market pages were already showing newer data.
  if (assets.length < 4) {
    throw new Error(`TGJU parsed only ${assets.length} asset(s) from current pages`);
  }

  return {
    ok: true,
    provider: "tgju",
    sourceName: "TGJU",
    sourceLabel: "شبکه اطلاع‌رسانی طلا، سکه و ارز",
    sourceUrls,
    updatedAt: new Date().toISOString(),
    assets,
  };
}

const ECONOMY_SOURCE_PRIORITY = {
  tgju: 1,
  milli: 2,
  melligold: 3,
  talasea: 4,
};

function isEconomyPricePlausible(asset) {
  const price = Number(asset?.price);
  if (!asset || !Number.isFinite(price) || price <= 0) return false;

  if (asset.id === "gold_xau") return price >= 500 && price <= 15000;
  if (asset.id === "brent") return price >= 10 && price <= 500;
  if (asset.id === "usdt") return price >= 1000 && price <= 10_000_000;
  if (asset.id === "iqd") return price >= 1 && price <= 10000;

  if (asset.category === "currency") {
    return price >= 100 && price <= 10_000_000;
  }
  if (asset.id === "gold_18") return price >= 100_000 && price <= 1_000_000_000;
  if (asset.id === "gold_24") return price >= 100_000 && price <= 1_500_000_000;
  if (asset.id === "gold_mesghal") return price >= 500_000 && price <= 5_000_000_000;
  if (asset.category === "coin") return price >= 500_000 && price <= 10_000_000_000;
  return true;
}

function validateEconomySourceAssets(sourceId, assets) {
  const unique = mergeEconomyAssets([assets || []]).filter(isEconomyPricePlausible);
  const byId = new Map(unique.map((asset) => [asset.id, asset]));
  const gold18 = Number(byId.get("gold_18")?.price || 0);
  const gold24 = Number(byId.get("gold_24")?.price || 0);
  const mesghal = Number(byId.get("gold_mesghal")?.price || 0);
  const rejected = new Set();

  if (gold18 > 0 && gold24 > 0) {
    const ratio = gold24 / gold18;
    if (ratio < 1.20 || ratio > 1.45) {
      rejected.add("gold_24");
      console.warn("Economy sanity rejected GOLD 24K", { sourceId, ratio });
    }
  }

  if (gold18 > 0 && mesghal > 0) {
    const ratio = mesghal / gold18;
    if (ratio < 3.8 || ratio > 5.0) {
      rejected.add("gold_mesghal");
      console.warn("Economy sanity rejected MESGHAL", { sourceId, ratio });
    }
  }

  return unique.filter((asset) => !rejected.has(asset.id));
}

function economyRelativeGap(a, b) {
  const midpoint = (Math.abs(a) + Math.abs(b)) / 2 || 1;
  return Math.abs(a - b) / midpoint;
}

function pickBestEconomyConsensusCluster(samples, asset) {
  if (samples.length <= 1) return samples.slice();

  const sorted = samples.slice().sort((a, b) => a.price - b.price);
  const maxSpread =
    asset.category === "coin" ? 0.08 :
    asset.id === "iqd" ? 0.10 :
    asset.category === "currency" ? 0.055 :
    asset.category === "energy" ? 0.05 :
    0.06;

  const clusters = [];
  for (let left = 0; left < sorted.length; left += 1) {
    const cluster = [sorted[left]];
    for (let right = left + 1; right < sorted.length; right += 1) {
      const candidate = [...cluster, sorted[right]];
      const low = candidate[0].price;
      const high = candidate[candidate.length - 1].price;
      if (economyRelativeGap(low, high) <= maxSpread) cluster.push(sorted[right]);
      else break;
    }
    clusters.push(cluster);
  }

  clusters.sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length;
    const aPriority = Math.min(...a.map((s) => ECONOMY_SOURCE_PRIORITY[s.sourceId] || 99));
    const bPriority = Math.min(...b.map((s) => ECONOMY_SOURCE_PRIORITY[s.sourceId] || 99));
    if (aPriority !== bPriority) return aPriority - bPriority;
    return economyRelativeGap(a[0].price, a[a.length - 1].price) -
      economyRelativeGap(b[0].price, b[b.length - 1].price);
  });

  const best = clusters[0] || [];
  if (samples.length === 2 && best.length === 1) {
    return samples.slice().sort((a, b) =>
      (ECONOMY_SOURCE_PRIORITY[a.sourceId] || 99) -
      (ECONOMY_SOURCE_PRIORITY[b.sourceId] || 99)
    ).slice(0, 1);
  }
  return best;
}


/* ---------------- Gold reference sources ---------------- */

function economyGoldReferenceDefinition(sourceId) {
  return (
    ECONOMY_GOLD_REFERENCE_REGISTRY.find(
      (source) => source.id === sourceId
    ) || null
  );
}

function findLastEconomyRegexMatch(text, regex) {
  const flags = regex.flags.includes("g")
    ? regex.flags
    : `${regex.flags}g`;
  const matcher = new RegExp(regex.source, flags);
  let last = null;
  let match;

  while ((match = matcher.exec(text))) {
    last = match;
    if (match[0] === "") matcher.lastIndex += 1;
  }

  return last;
}

function parseGoldReference18kToman(sourceId, html) {
  const body = economyHtmlToText(html);
  let price = null;

  if (sourceId === "milli") {
    // Official Milli website: value is commonly shown in IRR before/around
    // "price of 1 gram 18K gold".
    const siteBefore = findLastEconomyRegexMatch(
      body,
      /([0-9][0-9,.٬]*)\s*ریال[\s\S]{0,90}?قیمت\s*1\s*گرم\s*طلای\s*18\s*عیار/i
    );
    const siteAfter = findLastEconomyRegexMatch(
      body,
      /قیمت\s*1\s*گرم\s*طلای\s*18\s*عیار[\s\S]{0,90}?([0-9][0-9,.٬]*)\s*ریال/i
    );

    const rawRial = normalizeEconomyNumber(
      siteBefore?.[1] || siteAfter?.[1]
    );

    if (rawRial && rawRial > 0) {
      price = rawRial / 10;
    }

    // Official live-price Telegram fallback is already Toman.
    if (!price) {
      const telegram = findLastEconomyRegexMatch(
        body,
        /(?:نرخ\s*)?طلای\s*18\s*عیار(?:\s*آبشده)?(?:\s*میلی)?[\s\S]{0,80}?([0-9][0-9,.٬]*)\s*تومان/i
      );
      price = normalizeEconomyNumber(telegram?.[1]);
    }
  } else if (sourceId === "melligold") {
    const match = findLastEconomyRegexMatch(
      body,
      /طلای\s*18\s*عیار\s*:?\s*([0-9][0-9,.٬]*)\s*تومان/i
    );
    price = normalizeEconomyNumber(match?.[1]);
  } else if (sourceId === "talasea") {
    const match = findLastEconomyRegexMatch(
      body,
      /قیمت\s*طلای\s*18\s*عیار\s*:?\s*([0-9][0-9,.٬]*)\s*تومان/i
    );
    price = normalizeEconomyNumber(match?.[1]);
  }

  if (!Number.isFinite(price) || price <= 0) {
    return null;
  }

  const asset = createEconomyAsset("gold_18", price, {
    unit: "تومان",
    updatedAt: new Date().toISOString(),
  });

  if (!asset || !isEconomyPricePlausible(asset)) {
    return null;
  }

  asset.referenceOnly = true;
  return asset;
}

async function fetchGoldReferenceHtml(url) {
  const response = await fetchWithTimeout(
    url,
    {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 Chrome/124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "fa-IR,fa;q=0.9,en;q=0.6",
        "Cache-Control": "no-cache",
      },
    },
    3500
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  const html = await response.text();
  if (!html || html.length < 250) {
    throw new Error(`Empty/short response from ${url}`);
  }

  return {
    html,
    finalUrl: response.url || url,
  };
}

async function fetchGoldReferenceSource(sourceId) {
  const definition = economyGoldReferenceDefinition(sourceId);
  if (!definition) {
    throw new Error(`Unknown gold reference source: ${sourceId}`);
  }

  // Fetch official site and its official public price feed in parallel.
  // The official site is preferred; the public feed is a resilience fallback
  // for JS-only/redirect-heavy sites.
  const candidates = await Promise.allSettled([
    fetchGoldReferenceHtml(definition.siteUrl),
    fetchGoldReferenceHtml(definition.fallbackUrl),
  ]);

  for (const candidate of candidates) {
    if (candidate.status !== "fulfilled") continue;

    const asset = parseGoldReference18kToman(
      sourceId,
      candidate.value.html
    );
    if (!asset) continue;

    return {
      ok: true,
      provider: sourceId,
      sourceName: definition.name,
      sourceLabel: definition.label,
      sourceUrls: [candidate.value.finalUrl],
      updatedAt: asset.updatedAt,
      referenceOnly: true,
      assets: [asset],
    };
  }

  const reasons = candidates
    .filter((candidate) => candidate.status === "rejected")
    .map((candidate) => candidate.reason?.message || String(candidate.reason))
    .join(" | ");

  throw new Error(
    `${definition.name} did not return a readable GOLD 18K quote${
      reasons ? `: ${reasons}` : ""
    }`
  );
}

function goldReferenceCacheRequest(sourceId, stale = false) {
  return new Request(
    `${ECONOMY_CACHE_KEY}/${stale ? "stale" : "fresh"}/gold-reference/${encodeURIComponent(sourceId)}`,
    { method: "GET" }
  );
}

async function fetchGoldReferenceCached(sourceId, env, ctx) {
  const definition = economyGoldReferenceDefinition(sourceId);
  if (!definition) {
    throw new Error(`Unsupported gold reference: ${sourceId}`);
  }

  const cache = caches.default;
  const freshRequest = goldReferenceCacheRequest(sourceId, false);
  const staleRequest = goldReferenceCacheRequest(sourceId, true);

  try {
    const cached = await cache.match(freshRequest);
    if (cached) {
      const payload = await cached.json();
      return { ...payload, cacheHit: true, stale: false };
    }
  } catch (error) {
    logDetailedError(`gold reference fresh cache ${sourceId}`, error);
  }

  try {
    const payload = await fetchGoldReferenceSource(sourceId);
    payload.cachedAt = new Date().toISOString();
    payload.cacheHit = false;
    payload.stale = false;

    const freshResponse = new Response(JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": `public, max-age=${getEconomyCacheSeconds(env)}`,
      },
    });

    const staleResponse = new Response(JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": `public, max-age=${ECONOMY_STALE_CACHE_SECONDS}`,
      },
    });

    try {
      ctx?.waitUntil(
        Promise.all([
          cache.put(freshRequest, freshResponse),
          cache.put(staleRequest, staleResponse),
        ]).catch((error) =>
          logDetailedError(`gold reference cache put ${sourceId}`, error)
        )
      );
    } catch (error) {
      logDetailedError(`gold reference cache schedule ${sourceId}`, error);
    }

    return payload;
  } catch (freshError) {
    logDetailedError(`gold reference live ${sourceId}`, freshError);

    try {
      const staleCached = await cache.match(staleRequest);
      if (staleCached) {
        const payload = await staleCached.json();
        return {
          ...payload,
          cacheHit: true,
          stale: true,
          staleReason: freshError?.message || String(freshError),
        };
      }
    } catch (staleError) {
      logDetailedError(`gold reference stale cache ${sourceId}`, staleError);
    }

    throw freshError;
  }
}


/* ---------------- Source cache + aggregation ---------------- */

function normalizeEconomySourceId(value = "") {
  const normalized = String(value || "").trim().toLowerCase();

  if (!normalized) return "tgju";

  if (
    normalized === "average" ||
    normalized === "avg" ||
    normalized === "mean" ||
    normalized === "all"
  ) {
    return "average";
  }

  return normalized;
}

function economySourceDefinition(sourceId) {
  return ECONOMY_SOURCE_REGISTRY.find((source) => source.id === sourceId) || null;
}

function economySourceCacheRequest(sourceId, stale = false) {
  return new Request(
    `${ECONOMY_CACHE_KEY}/${stale ? "stale" : "fresh"}/source/${encodeURIComponent(sourceId)}`,
    { method: "GET" }
  );
}

async function fetchEconomySourceDirect(sourceId, env) {
  if (sourceId === "tgju") return fetchTgjuEconomy();

  throw new Error(`Unknown economy source: ${sourceId}`);
}

async function fetchEconomySourceCached(sourceId, env, ctx) {
  const definition = economySourceDefinition(sourceId);
  if (!definition) throw new Error(`Unsupported source: ${sourceId}`);

  const cache = caches.default;
  const freshRequest = economySourceCacheRequest(sourceId, false);
  const staleRequest = economySourceCacheRequest(sourceId, true);

  try {
    const cached = await cache.match(freshRequest);
    if (cached) {
      const payload = await cached.json();
      return { ...payload, cacheHit: true, stale: false };
    }
  } catch (error) {
    logDetailedError(`economy fresh cache match ${sourceId}`, error);
  }

  try {
    const payload = await fetchEconomySourceDirect(sourceId, env);
    payload.cachedAt = new Date().toISOString();
    payload.cacheSeconds = getEconomyCacheSeconds(env);
    payload.cacheHit = false;
    payload.stale = false;

    const freshResponse = new Response(JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": `public, max-age=${getEconomyCacheSeconds(env)}`,
      },
    });
    const staleResponse = new Response(JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": `public, max-age=${ECONOMY_STALE_CACHE_SECONDS}`,
      },
    });

    try {
      ctx?.waitUntil(Promise.all([
        cache.put(freshRequest, freshResponse),
        cache.put(staleRequest, staleResponse),
      ]).catch((error) => logDetailedError(`economy cache put ${sourceId}`, error)));
    } catch (error) {
      logDetailedError(`economy cache schedule ${sourceId}`, error);
    }
    return payload;
  } catch (freshError) {
    logDetailedError(`economy live source ${sourceId}`, freshError);
    try {
      const staleCached = await cache.match(staleRequest);
      if (staleCached) {
        const payload = await staleCached.json();
        return {
          ...payload,
          cacheHit: true,
          stale: true,
          staleReason: freshError?.message || String(freshError),
        };
      }
    } catch (staleError) {
      logDetailedError(`economy stale cache ${sourceId}`, staleError);
    }
    throw freshError;
  }
}

function medianEconomy(values) {
  const sorted = values
    .filter((value) => Number.isFinite(value))
    .slice()
    .sort((a, b) => a - b);

  if (!sorted.length) return null;

  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function robustFilterEconomySamples(samples, asset) {
  if (!samples.length) return { kept: [], excluded: [] };
  if (samples.length === 1) return { kept: samples.slice(), excluded: [] };

  // First choose the densest relative-price consensus cluster. Then, inside a
  // 3+ source consensus, apply MAD as a second robust guard. Standard
  // deviation is intentionally NOT used.
  let kept = pickBestEconomyConsensusCluster(samples, asset);

  if (kept.length >= 3) {
    const values = kept.map((sample) => sample.price);
    const median = medianEconomy(values);
    const deviations = values.map((value) => Math.abs(value - median));
    const mad = medianEconomy(deviations) || 0;
    if (mad > 0 && Number.isFinite(median) && median > 0) {
      const threshold = Math.min(
        median * 0.10,
        Math.max(median * 0.025, (3.5 * mad) / 0.6745)
      );
      const madKept = kept.filter((sample) => Math.abs(sample.price - median) <= threshold);
      if (madKept.length >= 2) kept = madKept;
    }
  }

  const keptKeys = new Set(kept.map((sample) => `${sample.sourceId}:${sample.price}`));
  const excluded = samples.filter((sample) => !keptKeys.has(`${sample.sourceId}:${sample.price}`));
  return { kept, excluded };
}

function averageEconomyNumbers(values) {
  const clean = values.filter((value) => Number.isFinite(value));
  if (!clean.length) return null;
  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

function aggregateEconomySources(sourceResults) {
  const successful = sourceResults.filter((result) => result.ok && result.data);
  const coreSuccessful = successful.filter(
    (result) => !result.data?.referenceOnly
  );
  const goldReferenceSuccessful = successful.filter(
    (result) => result.data?.referenceOnly
  );
  const now = new Date().toISOString();
  const assets = [];

  for (const definition of ECONOMY_ASSETS) {
    const samples = [];

    for (const result of successful) {
      const asset = result.data.assets?.find(
        (item) =>
          item.id === definition.id &&
          item.unit === definition.unit &&
          Number.isFinite(Number(item.price))
      );

      if (!asset) continue;

      if (asset.averageEligible === false) {
        continue;
      }

      samples.push({
        sourceId: result.id,
        sourceName: result.data.sourceName || result.id,
        price: Number(asset.price),
        change:
          asset.change !== null &&
          asset.change !== undefined &&
          Number.isFinite(Number(asset.change))
            ? Number(asset.change)
            : null,
        changePercent:
          asset.changePercent !== null &&
          asset.changePercent !== undefined &&
          Number.isFinite(Number(asset.changePercent))
            ? Number(asset.changePercent)
            : null,
      });
    }

    if (!samples.length) continue;

    const { kept, excluded } = robustFilterEconomySamples(
      samples,
      definition
    );

    const price = averageEconomyNumbers(kept.map((sample) => sample.price));
    if (!Number.isFinite(price)) continue;

    const changePercent = averageEconomyNumbers(
      kept
        .map((sample) => sample.changePercent)
        .filter((value) => Number.isFinite(value))
    );
    const change = averageEconomyNumbers(
      kept
        .map((sample) => sample.change)
        .filter((value) => Number.isFinite(value))
    );

    assets.push({
      ...definition,
      price,
      change,
      changePercent,
      direction: economyDirection(changePercent, change),
      updatedAt: now,
      sourceCount: kept.length,
      candidateSourceCount: samples.length,
      usedSources: kept.map((sample) => sample.sourceId),
      excludedSources: excluded.map((sample) => sample.sourceId),
    });
  }

  if (!assets.length) {
    throw new Error("No comparable prices were available from any source");
  }

  return {
    ok: true,
    provider: "average",
    sourceName: "Smart average",
    sourceLabel: "Robust multi-source average",
    updatedAt: now,
    availableSourceCount: coreSuccessful.length,
    staleSourceCount: coreSuccessful.filter((result) => result.data?.stale).length,
    totalSourceCount: ECONOMY_SOURCE_REGISTRY.length,
    goldReferenceSourceCount: goldReferenceSuccessful.length,
    goldReferenceTotalCount: ECONOMY_GOLD_REFERENCE_REGISTRY.length,
    sources: sourceResults
      .filter((result) => !result.data?.referenceOnly && !economyGoldReferenceDefinition(result.id))
      .map((result) => ({
        id: result.id,
        name:
          economySourceDefinition(result.id)?.name ||
          result.data?.sourceName ||
          result.id,
        ok: Boolean(result.ok),
        assetCount: result.data?.assets?.length || 0,
        stale: Boolean(result.data?.stale),
        error: result.ok ? "" : String(result.error || "unavailable").slice(0, 160),
      })),
    goldReferences: sourceResults
      .filter((result) => economyGoldReferenceDefinition(result.id))
      .map((result) => ({
        id: result.id,
        name:
          economyGoldReferenceDefinition(result.id)?.name ||
          result.data?.sourceName ||
          result.id,
        ok: Boolean(result.ok),
        assetCount: result.data?.assets?.length || 0,
        stale: Boolean(result.data?.stale),
        error: result.ok ? "" : String(result.error || "unavailable").slice(0, 160),
      })),
    assets,
  };
}

async function getAllEconomySources(env, ctx) {
  const sourceIds = ECONOMY_SOURCE_REGISTRY.map((source) => source.id);

  // TGJU fans out into multiple live profile pages, so finish it before
  // fetching the lighter GOLD 18K reference sources.
  const coreResults = await mapWithConcurrency(sourceIds, 2, async (id) => {
    try {
      const data = await fetchEconomySourceCached(id, env, ctx);
      return { id, ok: true, data };
    } catch (error) {
      logDetailedError(`economy source ${id}`, error);
      return {
        id,
        ok: false,
        error: error?.message || String(error),
      };
    }
  });

  const goldReferenceResults = await mapWithConcurrency(
    ECONOMY_GOLD_REFERENCE_REGISTRY,
    2,
    async (source) => {
      try {
        const data = await fetchGoldReferenceCached(
          source.id,
          env,
          ctx
        );
        return { id: source.id, ok: true, data };
      } catch (error) {
        logDetailedError(`gold reference ${source.id}`, error);
        return {
          id: source.id,
          ok: false,
          referenceOnly: true,
          error: error?.message || String(error),
        };
      }
    }
  );

  return [...coreResults, ...goldReferenceResults];
}


function economyHistorySourceSupported(sourceId) {
  return (
    sourceId === "average" ||
    Boolean(economySourceDefinition(sourceId)) ||
    Boolean(economyGoldReferenceDefinition(sourceId))
  );
}

function economyHistoryKey(sourceId) {
  return `${ECONOMY_HISTORY_KEY_PREFIX}${sourceId}`;
}

function parseEconomyHistoryStore(raw) {
  if (!raw) return { snapshots: [] };

  try {
    const parsed = JSON.parse(raw);
    return {
      snapshots: Array.isArray(parsed?.snapshots)
        ? parsed.snapshots
        : [],
    };
  } catch {
    return { snapshots: [] };
  }
}

function parseEconomyHistoryBatchStore(raw) {
  if (!raw) {
    return {
      version: 2,
      snapshots: [],
    };
  }

  try {
    const parsed = JSON.parse(raw);

    return {
      version: 2,
      snapshots: Array.isArray(parsed?.snapshots)
        ? parsed.snapshots
        : [],
    };
  } catch {
    return {
      version: 2,
      snapshots: [],
    };
  }
}

function sanitizeEconomyHistoryAssets(assets) {
  const result = {};

  for (const asset of assets || []) {
    const definition = economyAssetById(asset?.id);
    const price = Number(asset?.price);

    if (!definition || !Number.isFinite(price) || price <= 0) {
      continue;
    }

    result[definition.id] = price;
  }

  return result;
}

function economyHistoryCurrentBucket(timestamp = Date.now()) {
  return Math.floor(
    Number(timestamp) / ECONOMY_HISTORY_BUCKET_MS
  );
}

/*
 * Legacy v1 writer.
 * Kept only for compatibility/tests and old stored history format.
 * The live /api/economy route no longer calls it.
 */
async function recordEconomyHistorySnapshot(sourceId, assets, env) {
  if (!env?.BOT_KV || !economyHistorySourceSupported(sourceId)) {
    return false;
  }

  const cleanAssets = sanitizeEconomyHistoryAssets(assets);
  if (!Object.keys(cleanAssets).length) {
    return false;
  }

  const now = Date.now();
  const currentBucket = economyHistoryCurrentBucket(now);
  const key = economyHistoryKey(sourceId);
  const raw = await safeKvGet(env.BOT_KV, key, "");
  const store = parseEconomyHistoryStore(raw);
  const cutoff = now - ECONOMY_HISTORY_RETENTION_MS;

  let snapshots = (store.snapshots || [])
    .filter((snapshot) =>
      Number.isFinite(Number(snapshot?.t)) &&
      Number(snapshot.t) >= cutoff &&
      snapshot?.assets &&
      typeof snapshot.assets === "object"
    )
    .sort((a, b) => Number(a.t) - Number(b.t));

  const last = snapshots[snapshots.length - 1];
  const lastBucket = last
    ? economyHistoryCurrentBucket(last.t)
    : null;

  if (lastBucket === currentBucket) {
    return false;
  }

  snapshots.push({
    t: now,
    assets: cleanAssets,
  });

  if (snapshots.length > ECONOMY_HISTORY_MAX_SNAPSHOTS) {
    snapshots = snapshots.slice(
      -ECONOMY_HISTORY_MAX_SNAPSHOTS
    );
  }

  return safeKvPut(
    env.BOT_KV,
    key,
    JSON.stringify({
      version: 1,
      sourceId,
      snapshots,
    }),
    { expirationTtl: ECONOMY_HISTORY_TTL_SECONDS }
  );
}

async function recordEconomyHistoryBatchSnapshot(
  sourceAssets,
  env,
  options = {}
) {
  if (!env?.BOT_KV) {
    return {
      written: false,
      reason: "BOT_KV missing",
      sourceCount: 0,
    };
  }

  const cleanSources = {};

  for (const [sourceId, assets] of Object.entries(sourceAssets || {})) {
    if (!economyHistorySourceSupported(sourceId)) {
      continue;
    }

    const cleanAssets = sanitizeEconomyHistoryAssets(assets);

    if (Object.keys(cleanAssets).length) {
      cleanSources[sourceId] = cleanAssets;
    }
  }

  const sourceIds = Object.keys(cleanSources);

  if (!sourceIds.length) {
    return {
      written: false,
      reason: "no valid live source data",
      sourceCount: 0,
    };
  }

  const now = Number(options.timestamp) || Date.now();
  const currentBucket = economyHistoryCurrentBucket(now);
  const raw = await safeKvGet(
    env.BOT_KV,
    ECONOMY_HISTORY_BATCH_KEY,
    ""
  );
  const store = parseEconomyHistoryBatchStore(raw);
  const cutoff = now - ECONOMY_HISTORY_RETENTION_MS;

  let snapshots = (store.snapshots || [])
    .filter((snapshot) =>
      Number.isFinite(Number(snapshot?.t)) &&
      Number(snapshot.t) >= cutoff &&
      snapshot?.sources &&
      typeof snapshot.sources === "object"
    )
    .sort((a, b) => Number(a.t) - Number(b.t));

  const last = snapshots[snapshots.length - 1];
  const lastBucket = last
    ? economyHistoryCurrentBucket(last.t)
    : null;

  if (lastBucket === currentBucket) {
    return {
      written: false,
      reason: "bucket already recorded",
      sourceCount: Object.keys(last?.sources || {}).length,
      timestamp: Number(last?.t) || now,
    };
  }

  snapshots.push({
    t: now,
    sources: cleanSources,
  });

  if (snapshots.length > ECONOMY_HISTORY_MAX_SNAPSHOTS) {
    snapshots = snapshots.slice(
      -ECONOMY_HISTORY_MAX_SNAPSHOTS
    );
  }

  const written = await safeKvPut(
    env.BOT_KV,
    ECONOMY_HISTORY_BATCH_KEY,
    JSON.stringify({
      version: 2,
      intervalMinutes: 15,
      retentionDays: 7,
      snapshots,
    }),
    { expirationTtl: ECONOMY_HISTORY_TTL_SECONDS }
  );

  return {
    written: Boolean(written),
    reason: written ? "stored" : "KV write failed",
    sourceCount: sourceIds.length,
    timestamp: now,
    snapshotCount: snapshots.length,
  };
}

function mergeEconomyHistoryPoints(...groups) {
  const byBucket = new Map();
  const cutoff = Date.now() - ECONOMY_HISTORY_RETENTION_MS;

  for (const group of groups) {
    for (const point of group || []) {
      const t = Number(point?.t);
      const price = Number(point?.price);

      if (
        !Number.isFinite(t) ||
        t < cutoff ||
        !Number.isFinite(price) ||
        price <= 0
      ) {
        continue;
      }

      const bucket = economyHistoryCurrentBucket(t);

      // Later groups win. v2 is passed after v1, so scheduled history
      // overrides any legacy demand-driven point in the same bucket.
      byBucket.set(bucket, { t, price });
    }
  }

  return [...byBucket.values()]
    .sort((a, b) => a.t - b.t)
    .slice(-ECONOMY_HISTORY_MAX_SNAPSHOTS);
}

async function getEconomyHistoryV1(sourceId, assetId, env) {
  const raw = await safeKvGet(
    env.BOT_KV,
    economyHistoryKey(sourceId),
    ""
  );
  const store = parseEconomyHistoryStore(raw);
  const points = [];

  for (const snapshot of store.snapshots || []) {
    const t = Number(snapshot?.t);
    const price = Number(snapshot?.assets?.[assetId]);

    if (
      Number.isFinite(t) &&
      Number.isFinite(price) &&
      price > 0
    ) {
      points.push({ t, price });
    }
  }

  return points;
}

async function getEconomyHistoryV2(sourceId, assetId, env) {
  const raw = await safeKvGet(
    env.BOT_KV,
    ECONOMY_HISTORY_BATCH_KEY,
    ""
  );
  const store = parseEconomyHistoryBatchStore(raw);
  const points = [];

  for (const snapshot of store.snapshots || []) {
    const t = Number(snapshot?.t);
    const price = Number(
      snapshot?.sources?.[sourceId]?.[assetId]
    );

    if (
      Number.isFinite(t) &&
      Number.isFinite(price) &&
      price > 0
    ) {
      points.push({ t, price });
    }
  }

  return points;
}

async function getEconomyHistory(sourceId, assetId, env) {
  const definition = economyAssetById(assetId);

  if (
    !definition ||
    !economyHistorySourceSupported(sourceId) ||
    !env?.BOT_KV
  ) {
    return [];
  }

  const [legacyPoints, scheduledPoints] = await Promise.all([
    getEconomyHistoryV1(sourceId, assetId, env),
    getEconomyHistoryV2(sourceId, assetId, env),
  ]);

  return mergeEconomyHistoryPoints(
    legacyPoints,
    scheduledPoints
  );
}

async function fetchEconomyHistoryLiveSources(env) {
  const coreResults = await mapWithConcurrency(
    ECONOMY_SOURCE_REGISTRY,
    1,
    async (source) => {
      try {
        const data = await fetchEconomySourceDirect(
          source.id,
          env
        );

        return {
          id: source.id,
          ok: true,
          data: {
            ...data,
            stale: false,
            cacheHit: false,
          },
        };
      } catch (error) {
        logDetailedError(
          `history live source ${source.id}`,
          error
        );

        return {
          id: source.id,
          ok: false,
          error: error?.message || String(error),
        };
      }
    }
  );

  const goldResults = await mapWithConcurrency(
    ECONOMY_GOLD_REFERENCE_REGISTRY,
    2,
    async (source) => {
      try {
        const data = await fetchGoldReferenceSource(
          source.id
        );

        return {
          id: source.id,
          ok: true,
          data: {
            ...data,
            stale: false,
            cacheHit: false,
          },
        };
      } catch (error) {
        logDetailedError(
          `history live gold source ${source.id}`,
          error
        );

        return {
          id: source.id,
          ok: false,
          referenceOnly: true,
          error: error?.message || String(error),
        };
      }
    }
  );

  return [...coreResults, ...goldResults];
}

async function runScheduledEconomyHistory(cronInfo, env) {
  const startedAt = Date.now();
  const sourceResults = await fetchEconomyHistoryLiveSources(
    env
  );
  const sourceAssets = {};
  const failures = [];

  for (const result of sourceResults) {
    if (
      result.ok &&
      Array.isArray(result.data?.assets) &&
      result.data.assets.length
    ) {
      sourceAssets[result.id] = result.data.assets;
    } else {
      failures.push({
        id: result.id,
        error: String(
          result.error || "no live assets"
        ).slice(0, 160),
      });
    }
  }

  const average = aggregateEconomySources(sourceResults);

  if (
    average?.ok &&
    Array.isArray(average.assets) &&
    average.assets.length
  ) {
    sourceAssets.average = average.assets;
  }

  const storeResult =
    await recordEconomyHistoryBatchSnapshot(
      sourceAssets,
      env,
      {
        timestamp:
          Number(cronInfo?.scheduledTime) ||
          Date.now(),
      }
    );

  const stats = {
    cron: cronInfo?.cron || ECONOMY_HISTORY_CRON,
    durationMs: Date.now() - startedAt,
    requestedSourceCount:
      ECONOMY_SOURCE_REGISTRY.length +
      ECONOMY_GOLD_REFERENCE_REGISTRY.length,
    liveSourceCount: Object.keys(sourceAssets).filter(
      (id) => id !== "average"
    ).length,
    averageStored: Boolean(sourceAssets.average),
    failedSourceCount: failures.length,
    failures,
    historyWrite: storeResult,
  };

  console.log(
    "ECONOMY HISTORY CRON FINISHED",
    JSON.stringify(stats)
  );

  return stats;
}

async function serveEconomyHistoryApi(request, env) {
  const url = new URL(request.url);
  const sourceId = normalizeEconomySourceId(
    url.searchParams.get("source") || "tgju"
  );
  const assetId = String(
    url.searchParams.get("asset") || ""
  )
    .trim()
    .toLowerCase();

  const definition = economyAssetById(assetId);

  if (
    !economyHistorySourceSupported(sourceId) ||
    !definition
  ) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Invalid source or asset.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  const points = await getEconomyHistory(
    sourceId,
    assetId,
    env
  );

  return new Response(
    JSON.stringify({
      ok: true,
      source: sourceId,
      asset: assetId,
      name: definition.name,
      unit: definition.unit,
      retentionDays: 7,
      intervalMinutes: 15,
      collectionMode: "scheduled",
      cron: ECONOMY_HISTORY_CRON,
      points,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

async function serveEconomyApi(request, env, ctx) {
  const url = new URL(request.url);
  const requestedSource = normalizeEconomySourceId(
    url.searchParams.get("source") || "tgju"
  );

  const supported = new Set([
    "average",
    ...ECONOMY_SOURCE_REGISTRY.map((source) => source.id),
    ...ECONOMY_GOLD_REFERENCE_REGISTRY.map((source) => source.id),
  ]);

  if (!supported.has(requestedSource)) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Invalid price source.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  try {
    let payload;

    if (requestedSource === "average") {
      const results = await getAllEconomySources(env, ctx);
      payload = aggregateEconomySources(results);
    } else {
      const isGoldReference = Boolean(
        economyGoldReferenceDefinition(requestedSource)
      );

      payload = isGoldReference
        ? await fetchGoldReferenceCached(requestedSource, env, ctx)
        : await fetchEconomySourceCached(requestedSource, env, ctx);

      const selectedName =
        economySourceDefinition(requestedSource)?.name ||
        economyGoldReferenceDefinition(requestedSource)?.name ||
        payload.sourceName ||
        requestedSource;

      payload = {
        ...payload,
        provider: requestedSource,
        selectedSource: requestedSource,
        availableSourceCount: 1,
        totalSourceCount:
          ECONOMY_SOURCE_REGISTRY.length +
          ECONOMY_GOLD_REFERENCE_REGISTRY.length,
        sources: [
          {
            id: requestedSource,
            name: selectedName,
            ok: true,
            assetCount: payload.assets?.length || 0,
          },
        ],
        assets: (payload.assets || []).map((asset) => ({
          ...asset,
          sourceCount: 1,
          candidateSourceCount: 1,
          usedSources: [requestedSource],
          excludedSources: [],
        })),
      };
    }

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    logDetailedError(`economy provider ${requestedSource}`, error);

    return new Response(
      JSON.stringify({
        ok: false,
        provider: requestedSource,
        error:
          requestedSource === "average"
            ? "No reliable market source is available right now. Please retry shortly."
            : "This source is temporarily unavailable. Choose another source or Smart average.",
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

function serveEconomyMiniApp(env) {
  const html = `<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#101114">
  <title>mewMONEY!</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <style>
    :root{
      color-scheme:dark;
      --bg:var(--tg-theme-bg-color,#0f1115);
      --text:var(--tg-theme-text-color,#f5f7fb);
      --hint:var(--tg-theme-hint-color,#8d96a7);
      --card:var(--tg-theme-secondary-bg-color,#191c22);
      --accent:var(--tg-theme-button-color,#5c8dff);
      --accentText:var(--tg-theme-button-text-color,#fff);
      --line:rgba(255,255,255,.08);
      --up:#42d392;
      --down:#ff6b78;
      --flat:#9aa4b2;
    }
    *{box-sizing:border-box}
    body{
      margin:0;background:var(--bg);color:var(--text);
      font-family:Tahoma,Arial,sans-serif;
      min-height:100vh;
    }
    .wrap{max-width:760px;margin:0 auto;padding:18px 14px 40px}
    .hero{
      position:relative;overflow:hidden;
      border:1px solid var(--line);
      background:linear-gradient(145deg,rgba(92,141,255,.18),rgba(255,255,255,.03));
      border-radius:24px;padding:20px;margin-bottom:16px;
    }
    .hero:after{
      content:"🐾";position:absolute;left:-8px;top:-18px;
      font-size:92px;opacity:.08;transform:rotate(-18deg)
    }
    .brand{font-size:28px;font-weight:900;letter-spacing:-1px}
    .sub{color:var(--hint);font-size:13px;margin-top:6px;line-height:1.7;direction:rtl;unicode-bidi:plaintext}
    .statusRow{display:flex;gap:8px;align-items:center;margin-top:14px;flex-wrap:wrap}
    .pill{
      border:1px solid var(--line);background:rgba(255,255,255,.04);
      padding:7px 10px;border-radius:999px;font-size:11px;color:var(--hint)
    }
    .refresh{
      margin-right:auto;border:0;background:var(--accent);color:var(--accentText);
      border-radius:999px;padding:8px 12px;font-weight:800;cursor:pointer
    }
    .sourceRow{
      display:flex;align-items:center;gap:10px;margin-top:12px;
      border-top:1px solid var(--line);padding-top:12px
    }
    .sourceRow label{font-size:11px;color:var(--hint);white-space:nowrap}
    .sourceRow select{
      width:100%;min-width:0;border:1px solid var(--line);background:var(--card);
      color:var(--text);border-radius:12px;padding:9px 10px;font-family:inherit;
      outline:none
    }
    .sourceMeta{font-size:10px;color:var(--hint);margin-top:-2px}
    .tabs{display:flex;gap:8px;overflow:auto;padding:2px 0 12px;scrollbar-width:none}
    .tab{
      white-space:nowrap;border:1px solid var(--line);color:var(--hint);
      background:var(--card);padding:9px 13px;border-radius:14px;cursor:pointer
    }
    .tab.active{background:var(--accent);color:var(--accentText);border-color:transparent}
    .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    .card{
      position:relative;overflow:hidden;
      border:1px solid var(--line);background:var(--card);border-radius:18px;
      padding:14px;min-height:126px;display:flex;flex-direction:column;gap:8px;
      cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent
    }
    .nameRow{padding-right:34px}
    .chartBtn{
      position:absolute;right:8px;top:7px;z-index:7;
      width:34px;height:30px;border:0;border-radius:10px;
      display:flex;align-items:center;justify-content:center;
      background:transparent;color:var(--hint);
      font-size:24px;font-weight:900;line-height:1;
      cursor:pointer;-webkit-tap-highlight-color:transparent
    }
    .chartBtn:active{
      background:rgba(255,255,255,.08);
      transform:scale(.96)
    }
    .chartOverlay{
      position:fixed;inset:0;z-index:50;
      background:rgba(0,0,0,.58);
      display:none;align-items:flex-end;justify-content:center;
      padding:14px
    }
    .chartOverlay.open{display:flex}
    .chartSheet{
      width:min(720px,100%);
      max-height:86vh;overflow:auto;
      border:1px solid var(--line);background:var(--bg);
      border-radius:24px 24px 18px 18px;padding:16px;
      box-shadow:0 -16px 50px rgba(0,0,0,.35)
    }
    .chartHead{display:flex;gap:10px;align-items:flex-start}
    .chartHeadText{min-width:0;flex:1}
    .chartTitle{font-size:19px;font-weight:900}
    .chartSub{font-size:11px;color:var(--hint);margin-top:4px}
    .chartClose{
      border:1px solid var(--line);background:var(--card);color:var(--text);
      width:36px;height:36px;border-radius:12px;font-size:20px;cursor:pointer
    }
    .chartRange{display:flex;gap:8px;margin:14px 0 10px}
    .rangeBtn{
      border:1px solid var(--line);background:var(--card);color:var(--hint);
      padding:7px 11px;border-radius:999px;font-size:11px;font-weight:800;cursor:pointer
    }
    .rangeBtn.active{
      background:var(--accent);color:var(--accentText);border-color:transparent
    }
    .chartCurrent{
      display:flex;align-items:baseline;gap:8px;margin:10px 0 4px
    }
    .chartCurrentValue{
      font-size:24px;font-weight:900;font-variant-numeric:tabular-nums
    }
    .chartCurrentUnit{font-size:11px;color:var(--hint)}
    .chartStage{
      min-height:250px;border:1px solid var(--line);
      background:var(--card);border-radius:18px;padding:10px;overflow:hidden
    }
    .chartSvg{width:100%;height:230px;display:block}
    .chartGrid{stroke:rgba(255,255,255,.08);stroke-width:1}
    .chartLine{
      fill:none;stroke:var(--accent);stroke-width:2.4;
      stroke-linecap:round;stroke-linejoin:round
    }
    .chartArea{fill:var(--accent);opacity:.08}
    .chartDot{fill:var(--accent)}
    .chartAxisText{
      fill:var(--hint);font-size:10px;
      font-family:Tahoma,Arial,sans-serif
    }
    .chartState{
      min-height:230px;display:flex;align-items:center;justify-content:center;
      text-align:center;color:var(--hint);font-size:12px;
      line-height:1.7;padding:22px
    }
    .chartMeta{
      font-size:10px;color:var(--hint);
      margin-top:9px;line-height:1.6
    }
    .pawPop{
      position:absolute;
      left:50%;top:52%;
      transform:translate(-50%,-50%) translateY(6px) scale(.76);
      font-size:clamp(34px,10vw,54px);
      line-height:1;
      pointer-events:none;
      z-index:4;
      opacity:0;
      filter:drop-shadow(0 6px 12px rgba(0,0,0,.22));
      animation:pawFloatFade 1.28s cubic-bezier(.22,.7,.25,1) forwards;
    }
    @keyframes pawFloatFade{
      0%{
        opacity:0;
        transform:translate(-50%,-50%) translateY(6px) scale(.76);
      }
      16%{
        opacity:1;
        transform:translate(-50%,-50%) translateY(2px) scale(1);
      }
      58%{
        opacity:.94;
        transform:translate(-50%,-50%) translateY(-22px) scale(1.03);
      }
      100%{
        opacity:0;
        transform:translate(-50%,-50%) translateY(-46px) scale(1.04);
      }
    }
    .nameRow{display:flex;align-items:center;gap:8px}
    .icon{font-size:22px}
    .name{font-weight:800;font-size:14px}
    .price{
      font-size:20px;font-weight:900;direction:ltr;text-align:right;
      font-variant-numeric:tabular-nums
    }
    .priceValue{
      display:inline-block;
      min-width:7ch;
      font-variant-numeric:tabular-nums
    }
    .priceValue.counting{
      transform:translateY(-1px)
    }
    .unit{font-size:10px;color:var(--hint);margin-right:4px}
    .change{font-size:12px;font-weight:800;direction:ltr;text-align:right}
    .change.up{color:var(--up)} .change.down{color:var(--down)} .change.flat{color:var(--flat)}
    .updated{font-size:10px;color:var(--hint);margin-top:auto}
    .state{
      text-align:center;border:1px dashed var(--line);border-radius:20px;
      padding:34px 16px;color:var(--hint);line-height:1.9
    }
    .spinner{
      width:28px;height:28px;border:3px solid var(--line);border-top-color:var(--accent);
      border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 12px
    }
    @keyframes spin{to{transform:rotate(360deg)}}
    .footer{color:var(--hint);font-size:10px;text-align:center;margin-top:18px;line-height:1.7}
    @media (min-width:560px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
  </style>
</head>
<body>
  <main class="wrap">
    <section class="hero">
      <div class="brand">mewMONEY!</div>
      <div class="sub" dir="rtl">به امید عبور از این روزهای سخت 🤍</div>
      <div class="statusRow">
        <span class="pill" id="provider">Source: —</span>
        <span class="pill" id="time">Updated: —</span>
        <button class="refresh" id="refresh">↻ Refresh</button>
      </div>
      <div class="sourceRow">
        <label for="sourceSelect">Price source</label>
        <select id="sourceSelect">
          <option value="tgju" selected>TGJU</option>
          <option value="milli">Milli</option>
          <option value="melligold">MelliGold</option>
          <option value="talasea">TalaSea</option>
          <option value="average">Smart average</option>
        </select>
      </div>
    </section>

    <div class="tabs" id="tabs">
      <button class="tab active" data-cat="all">All</button>
      <button class="tab" data-cat="currency">Currency</button>
      <button class="tab" data-cat="gold">Gold</button>
      <button class="tab" data-cat="coin">Coins</button>
      <button class="tab" data-cat="energy">Energy</button>
    </div>

    <section id="content" class="state">
      <div class="spinner"></div>
      Fetching market prices...
    </section>

    <div class="footer">
      Default source: TGJU. Smart average remains available from the source selector.<br>
      TGJU covers currencies, gold, coins, Tether and energy. Milli, MelliGold and TalaSea are GOLD 18K sources. For information only.
    </div>
  </main>

  <div id="chartOverlay" class="chartOverlay" aria-hidden="true">
    <section class="chartSheet" role="dialog" aria-modal="true" aria-label="Price history">
      <div class="chartHead">
        <div class="chartHeadText">
          <div id="chartTitle" class="chartTitle">Price history</div>
          <div id="chartSub" class="chartSub">—</div>
        </div>
        <button id="chartClose" class="chartClose" type="button" aria-label="Close">×</button>
      </div>

      <div class="chartCurrent">
        <span id="chartCurrentValue" class="chartCurrentValue">—</span>
        <span id="chartCurrentUnit" class="chartCurrentUnit"></span>
      </div>

      <div class="chartRange">
        <button class="rangeBtn" type="button" data-range-hours="24">24H</button>
        <button class="rangeBtn active" type="button" data-range-hours="168">7D</button>
      </div>

      <div id="chartStage" class="chartStage">
        <div class="chartState">Select a card chart to load price history.</div>
      </div>
      <div id="chartMeta" class="chartMeta"></div>
    </section>
  </div>

  <script>
    (function(){
      var tg = window.Telegram && window.Telegram.WebApp;
      if (tg) { try { tg.ready(); tg.expand(); } catch(e) {} }

      var savedSource = "tgju";
      try { savedSource = localStorage.getItem("mewconomy-source") || "tgju"; } catch(e) {}
      var state = { assets: [], category: "all", source: savedSource };
      var tapPriceGame = Object.create(null);
      var TAP_THRESHOLD = 10;
      var TAP_DISCOUNT_TOMAN = 10000;
      var PRICE_COUNTDOWN_MS = 900;
      var PRICE_RECOVERY_DELAY_MS = 10000;
      var PRICE_RECOVERY_MS = 1200;

      var chartState = {
        item: null,
        points: [],
        rangeHours: 168,
        loadingToken: 0
      };

      var displayOrder = [
        "usd", "usdt",
        "gold_24", "gold_18", "gold_mesghal", "gold_xau",
        "coin_emami", "coin_bahar", "coin_nim", "coin_rob", "coin_gerami",
        "iqd", "eur", "gbp", "aed", "try", "cad",
        "brent"
      ];
      var displayOrderIndex = {};
      displayOrder.forEach(function(id, index){ displayOrderIndex[id] = index; });

      var content = document.getElementById("content");
      var provider = document.getElementById("provider");
      var time = document.getElementById("time");
      var refresh = document.getElementById("refresh");
      var sourceSelect = document.getElementById("sourceSelect");
      if ([].some.call(sourceSelect.options, function(option){ return option.value === state.source; })) {
        sourceSelect.value = state.source;
      }
      var chartOverlay = document.getElementById("chartOverlay");
      var chartClose = document.getElementById("chartClose");
      var chartTitle = document.getElementById("chartTitle");
      var chartSub = document.getElementById("chartSub");
      var chartCurrentValue = document.getElementById("chartCurrentValue");
      var chartCurrentUnit = document.getElementById("chartCurrentUnit");
      var chartStage = document.getElementById("chartStage");
      var chartMeta = document.getElementById("chartMeta");

      function num(value){
        if (value === null || value === undefined || isNaN(Number(value))) return "—";
        var n = Number(value);
        var decimals = Math.abs(n) < 10000 && !Number.isInteger(n) ? 2 : 0;
        return new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: decimals
        }).format(n);
      }

      function unitLabel(value){
        var raw = String(value || "").trim();
        if (raw === "تومان") return "Toman";
        if (raw === "دلار") return "USD";
        if (raw === "USD/bbl") return "USD/bbl";
        return raw || "";
      }

      function percent(value){
        if (value === null || value === undefined || isNaN(Number(value))) return "No change";
        var n = Number(value);
        var sign = n > 0 ? "+" : "";
        return sign + n.toFixed(2) + "%";
      }

      function formatTime(value){
        if (!value) return "—";
        try {
          var parts = new Intl.DateTimeFormat(
            "en-GB-u-ca-persian-nu-latn",
            {
              year:"numeric",
              month:"long",
              day:"numeric",
              hour:"2-digit",
              minute:"2-digit",
              hourCycle:"h23",
              timeZone:"Asia/Tehran"
            }
          ).formatToParts(new Date(value));

          var bag = {};
          parts.forEach(function(part){
            if (part.type !== "literal") bag[part.type] = part.value;
          });

          var month = String(bag.month || "");

          return [
            bag.day || "",
            month,
            bag.year || ""
          ].filter(Boolean).join(" ")
            + (bag.hour && bag.minute ? " · " + bag.hour + ":" + bag.minute : "");
        } catch(e) { return "—"; }
      }

      function escapeHtml(value){
        return String(value || "")
          .replace(/&/g,"&amp;").replace(/</g,"&lt;")
          .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
      }

      function tapGameKey(item){
        return String(state.source || "tgju") + ":" + String(item.id || "");
      }

      function getTapGame(item){
        var key = tapGameKey(item);
        if (!tapPriceGame[key]) {
          tapPriceGame[key] = {
            taps: 0,
            discount: 0,
            pendingSteps: 0,
            animating: false,
            recovering: false,
            recoveryTimer: null,
            recoveryToken: 0
          };
        }
        return tapPriceGame[key];
      }

      function isTomanCard(item){
        return String(item && item.unit || "") === "تومان";
      }

      function effectivePrice(item){
        var original = Number(item && item.price);
        if (!Number.isFinite(original)) return original;
        if (!isTomanCard(item)) return original;

        var game = getTapGame(item);
        return Math.max(0, original - Number(game.discount || 0));
      }

      function findStateAsset(assetId){
        return state.assets.find(function(item){
          return String(item.id) === String(assetId);
        }) || null;
      }

      function clearPriceRecoveryTimer(game){
        if (!game) return;

        if (game.recoveryTimer) {
          clearTimeout(game.recoveryTimer);
          game.recoveryTimer = null;
        }
      }

      function findVisibleCard(assetId){
        var cards = content.querySelectorAll(".card[data-asset-id]");

        for (var i = 0; i < cards.length; i += 1) {
          if (
            String(cards[i].getAttribute("data-asset-id")) ===
            String(assetId)
          ) {
            return cards[i];
          }
        }

        return null;
      }

      function animatePriceRecovery(item, game, sourceAtSchedule, token){
        if (!item || !game || game.discount <= 0) return;
        if (game.animating || game.pendingSteps > 0) {
          schedulePriceRecovery(item, game, sourceAtSchedule);
          return;
        }

        if (token !== game.recoveryToken) return;

        game.recovering = true;
        game.recoveryTimer = null;

        var currentItem =
          state.source === sourceAtSchedule
            ? (findStateAsset(item.id) || item)
            : item;

        var realPrice = Number(currentItem && currentItem.price);
        if (!Number.isFinite(realPrice)) {
          game.discount = 0;
          game.recovering = false;
          return;
        }

        var startPrice = Math.max(
          0,
          realPrice - Number(game.discount || 0)
        );
        var actualRise = Math.max(0, realPrice - startPrice);

        var card =
          state.source === sourceAtSchedule
            ? findVisibleCard(item.id)
            : null;

        var priceEl = card && card.querySelector
          ? card.querySelector(".priceValue")
          : null;

        // If the card is currently hidden or the source changed, restore the
        // state immediately. The next render will show the real source price.
        if (!priceEl || !priceEl.isConnected || actualRise <= 0) {
          game.discount = 0;
          game.recovering = false;

          if (game.pendingSteps > 0) {
            requestAnimationFrame(function(){
              animatePriceStep(card, currentItem);
            });
          }
          return;
        }

        priceEl.classList.add("counting");
        var startedAt = performance.now();

        function tick(now){
          if (token !== game.recoveryToken) {
            priceEl.classList.remove("counting");
            game.recovering = false;
            return;
          }

          var elapsed = Math.max(0, now - startedAt);
          var progress = Math.min(1, elapsed / PRICE_RECOVERY_MS);

          // Smooth count-up back to the real market price.
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = startPrice + (actualRise * eased);

          priceEl.textContent = num(current);

          if (progress < 1) {
            requestAnimationFrame(tick);
            return;
          }

          game.discount = 0;
          game.recovering = false;

          priceEl.textContent = num(realPrice);
          priceEl.classList.remove("counting");

          // If the user reached another 10-tap milestone during recovery,
          // apply that queued step only after the real price is restored.
          if (game.pendingSteps > 0) {
            requestAnimationFrame(function(){
              animatePriceStep(card, currentItem);
            });
          }
        }

        requestAnimationFrame(tick);
      }

      function schedulePriceRecovery(item, game, sourceAtSchedule){
        if (!item || !game || game.discount <= 0) return;
        if (game.pendingSteps > 0 || game.animating) return;

        clearPriceRecoveryTimer(game);

        game.recoveryToken += 1;
        var token = game.recoveryToken;

        game.recoveryTimer = setTimeout(function(){
          animatePriceRecovery(
            item,
            game,
            sourceAtSchedule,
            token
          );
        }, PRICE_RECOVERY_DELAY_MS);
      }

      function animatePriceStep(card, item){
        var game = getTapGame(item);

        if (
          game.animating ||
          game.recovering ||
          game.pendingSteps <= 0
        ) {
          return;
        }

        // A fresh 10-tap milestone starts a new discount cycle.
        // Any previous restore countdown is restarted after the new drop.
        clearPriceRecoveryTimer(game);
        game.recoveryToken += 1;

        game.animating = true;

        var sourceAtStart = String(state.source || "tgju");
        var startPrice = effectivePrice(item);
        var targetPrice = Math.max(
          0,
          startPrice - TAP_DISCOUNT_TOMAN
        );
        var actualDrop = Math.max(
          0,
          startPrice - targetPrice
        );

        var priceEl = card && card.querySelector
          ? card.querySelector(".priceValue")
          : null;

        if (!priceEl || !priceEl.isConnected || actualDrop <= 0) {
          game.discount += actualDrop;
          game.pendingSteps = Math.max(
            0,
            game.pendingSteps - 1
          );
          game.animating = false;

          if (game.pendingSteps > 0) {
            requestAnimationFrame(function(){
              animatePriceStep(
                state.source === sourceAtStart
                  ? findVisibleCard(item.id)
                  : null,
                item
              );
            });
          } else {
            schedulePriceRecovery(
              item,
              game,
              sourceAtStart
            );
          }
          return;
        }

        priceEl.classList.add("counting");
        var startedAt = performance.now();

        function tick(now){
          var elapsed = Math.max(0, now - startedAt);
          var progress = Math.min(
            1,
            elapsed / PRICE_COUNTDOWN_MS
          );
          var eased = 1 - Math.pow(1 - progress, 3);
          var current =
            startPrice - (actualDrop * eased);

          priceEl.textContent = num(current);

          if (progress < 1) {
            requestAnimationFrame(tick);
            return;
          }

          game.discount += actualDrop;
          game.pendingSteps = Math.max(
            0,
            game.pendingSteps - 1
          );
          game.animating = false;

          priceEl.textContent = num(effectivePrice(item));
          priceEl.classList.remove("counting");

          if (game.pendingSteps > 0) {
            requestAnimationFrame(function(){
              animatePriceStep(card, item);
            });
          } else {
            // Stay discounted for exactly 10 seconds after the final queued
            // 10K drop, then count smoothly upward to the real price.
            schedulePriceRecovery(
              item,
              game,
              sourceAtStart
            );
          }
        }

        requestAnimationFrame(tick);
      }

      function registerPriceTap(card, item){
        if (!item || !isTomanCard(item)) return;

        var game = getTapGame(item);
        game.taps += 1;

        if (game.taps % TAP_THRESHOLD !== 0) return;

        game.pendingSteps += 1;

        // If an upward recovery is currently running, let it finish first.
        // The newly earned 10K drop stays queued and starts immediately after.
        if (!game.recovering) {
          animatePriceStep(card, item);
        }
      }

      function sourceDisplayName(sourceId){
        var labels = {
          tgju: "TGJU",
          milli: "Milli",
          melligold: "MelliGold",
          talasea: "TalaSea",
          average: "Smart average"
        };
        return labels[sourceId] || sourceId || "—";
      }

      function chartEscape(value){
        return escapeHtml(String(value == null ? "" : value));
      }

      function chartTimeLabel(timestamp){
        var value = formatTime(timestamp);
        return String(value || "—").replace(" · ", " ");
      }

      function chartFilteredPoints(){
        if (!chartState.points.length) return [];

        var cutoff =
          Date.now() -
          (chartState.rangeHours * 60 * 60 * 1000);

        return chartState.points.filter(function(point){
          return (
            Number(point.t) >= cutoff &&
            Number.isFinite(Number(point.price))
          );
        });
      }

      function renderHistoryChart(){
        var item = chartState.item;
        if (!item) return;

        var points = chartFilteredPoints();

        chartCurrentValue.textContent = num(Number(item.price));
        chartCurrentUnit.textContent = unitLabel(item.unit || "");

        document.querySelectorAll(".rangeBtn").forEach(function(button){
          button.classList.toggle(
            "active",
            Number(button.getAttribute("data-range-hours")) ===
              chartState.rangeHours
          );
        });

        if (points.length < 2) {
          chartStage.innerHTML =
            '<div class="chartState">'
            + 'History is building for this source. mewMONEY! records a live market snapshot automatically every 15 minutes.<br><br>'
            + 'Come back after a few price updates.'
            + '</div>';

          chartMeta.textContent =
            points.length
              ? "1 observation available"
              : "No stored observations yet";
          return;
        }

        var width = 640;
        var height = 230;
        var left = 58;
        var right = 12;
        var top = 14;
        var bottom = 34;
        var plotWidth = width - left - right;
        var plotHeight = height - top - bottom;

        var prices = points.map(function(point){
          return Number(point.price);
        });

        var minPrice = Math.min.apply(null, prices);
        var maxPrice = Math.max.apply(null, prices);
        var span = maxPrice - minPrice;

        if (!(span > 0)) {
          span = Math.max(Math.abs(maxPrice) * 0.01, 1);
          minPrice -= span / 2;
          maxPrice += span / 2;
        } else {
          var padding = span * 0.10;
          minPrice -= padding;
          maxPrice += padding;
        }

        var minTime = Number(points[0].t);
        var maxTime = Number(points[points.length - 1].t);
        var timeSpan = Math.max(1, maxTime - minTime);
        var priceSpan = Math.max(1e-9, maxPrice - minPrice);

        function xFor(point){
          return left
            + ((Number(point.t) - minTime) / timeSpan) * plotWidth;
        }

        function yFor(point){
          return top
            + (
                1 -
                ((Number(point.price) - minPrice) / priceSpan)
              ) * plotHeight;
        }

        var coords = points.map(function(point){
          return [xFor(point), yFor(point)];
        });

        var linePoints = coords
          .map(function(pair){
            return (
              pair[0].toFixed(2)
              + ","
              + pair[1].toFixed(2)
            );
          })
          .join(" ");

        var areaPoints =
          left + "," + (top + plotHeight)
          + " " + linePoints
          + " " + (left + plotWidth)
          + "," + (top + plotHeight);

        var grid = "";

        for (var i = 0; i <= 4; i += 1) {
          var gy = top + (plotHeight * i / 4);
          var labelValue =
            maxPrice - (priceSpan * i / 4);

          grid +=
            '<line class="chartGrid" x1="' + left
            + '" y1="' + gy
            + '" x2="' + (left + plotWidth)
            + '" y2="' + gy
            + '"></line>';

          grid +=
            '<text class="chartAxisText" x="' + (left - 7)
            + '" y="' + (gy + 3)
            + '" text-anchor="end">'
            + chartEscape(num(labelValue))
            + '</text>';
        }

        var firstLabel = chartTimeLabel(points[0].t);
        var middleLabel = chartTimeLabel(
          points[Math.floor(points.length / 2)].t
        );
        var lastLabel = chartTimeLabel(
          points[points.length - 1].t
        );
        var latest = coords[coords.length - 1];

        chartStage.innerHTML =
          '<svg class="chartSvg" viewBox="0 0 '
          + width + ' ' + height
          + '" role="img" aria-label="Price history chart">'
          + grid
          + '<polygon class="chartArea" points="'
          + areaPoints + '"></polygon>'
          + '<polyline class="chartLine" points="'
          + linePoints + '"></polyline>'
          + '<circle class="chartDot" cx="'
          + latest[0].toFixed(2)
          + '" cy="' + latest[1].toFixed(2)
          + '" r="3.5"></circle>'
          + '<text class="chartAxisText" x="' + left
          + '" y="' + (height - 8)
          + '" text-anchor="start">'
          + chartEscape(firstLabel)
          + '</text>'
          + '<text class="chartAxisText" x="'
          + (left + plotWidth / 2)
          + '" y="' + (height - 8)
          + '" text-anchor="middle">'
          + chartEscape(middleLabel)
          + '</text>'
          + '<text class="chartAxisText" x="'
          + (left + plotWidth)
          + '" y="' + (height - 8)
          + '" text-anchor="end">'
          + chartEscape(lastLabel)
          + '</text>'
          + '</svg>';

        var first = Number(points[0].price);
        var last = Number(points[points.length - 1].price);
        var delta = last - first;
        var deltaPercent = first
          ? (delta / first) * 100
          : 0;
        var sign = delta > 0 ? "+" : "";

        chartMeta.textContent =
          points.length + " observations"
          + " • " + sign + num(delta)
          + " (" + sign + deltaPercent.toFixed(2) + "%)"
          + " • raw source prices";
      }

      async function openHistory(item){
        if (!item) return;

        chartState.item = item;
        chartState.points = [];
        chartState.rangeHours = 168;
        chartState.loadingToken += 1;
        var token = chartState.loadingToken;

        chartTitle.textContent =
          item.name + " price history";
        chartSub.textContent =
          sourceDisplayName(state.source)
          + " • 7-day local history";
        chartCurrentValue.textContent =
          num(Number(item.price));
        chartCurrentUnit.textContent =
          unitLabel(item.unit || "");
        chartMeta.textContent = "";
        chartStage.innerHTML =
          '<div class="chartState"><div class="spinner"></div>Loading price history...</div>';

        chartOverlay.classList.add("open");
        chartOverlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        try {
          var endpoint =
            "/api/economy/history?source="
            + encodeURIComponent(state.source)
            + "&asset="
            + encodeURIComponent(item.id);

          var controller = new AbortController();
          var timeout = setTimeout(function(){
            controller.abort();
          }, 10000);
          var response;

          try {
            response = await fetch(endpoint, {
              cache: "no-store",
              signal: controller.signal
            });
          } finally {
            clearTimeout(timeout);
          }

          var data = await response.json();

          if (!response.ok || !data.ok) {
            throw new Error(
              data.error || "Price history is unavailable."
            );
          }

          if (token !== chartState.loadingToken) return;

          var points = Array.isArray(data.points)
            ? data.points
                .map(function(point){
                  return {
                    t: Number(point.t),
                    price: Number(point.price)
                  };
                })
                .filter(function(point){
                  return (
                    Number.isFinite(point.t) &&
                    Number.isFinite(point.price) &&
                    point.price > 0
                  );
                })
            : [];

          // Merge the current raw source price as the newest point.
          var now = Date.now();
          var last = points[points.length - 1];

          if (
            !last ||
            Math.abs(now - Number(last.t)) > 60 * 1000 ||
            Number(last.price) !== Number(item.price)
          ) {
            points.push({
              t: now,
              price: Number(item.price)
            });
          }

          chartState.points = points;
          renderHistoryChart();
        } catch (error) {
          if (token !== chartState.loadingToken) return;

          chartStage.innerHTML =
            '<div class="chartState">😾 '
            + chartEscape(
              error && error.name === "AbortError"
                ? "Price history request timed out."
                : (
                    error.message ||
                    "Price history is unavailable."
                  )
            )
            + '</div>';
        }
      }

      function closeHistory(){
        chartState.loadingToken += 1;
        chartOverlay.classList.remove("open");
        chartOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }

      function render(){
        var items = state.assets
          .filter(function(item){
            return state.category === "all" || item.category === state.category;
          })
          .slice()
          .sort(function(a, b){
            var ai = Object.prototype.hasOwnProperty.call(displayOrderIndex, a.id)
              ? displayOrderIndex[a.id]
              : 999;
            var bi = Object.prototype.hasOwnProperty.call(displayOrderIndex, b.id)
              ? displayOrderIndex[b.id]
              : 999;
            return ai - bi;
          });

        if (!items.length) {
          content.className = "state";
          content.innerHTML = "Nothing available in this category right now. 😾";
          return;
        }

        content.className = "grid";
        content.innerHTML = items.map(function(item){
          var dir = item.direction === "up" ? "up" : item.direction === "down" ? "down" : "flat";
          var arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "•";
          return '<article class="card" data-asset-id="' + escapeHtml(item.id) + '">'
            + '<button class="chartBtn" type="button" aria-label="Open price history" title="Price history">⋯</button>'
            + '<div class="nameRow"><span class="icon">' + escapeHtml(item.icon) + '</span>'
            + '<span class="name">' + escapeHtml(item.name) + '</span></div>'
            + '<div class="price"><span class="priceValue">' + num(effectivePrice(item)) + '</span><span class="unit"> ' + escapeHtml(unitLabel(item.unit || "تومان")) + '</span></div>'
            + '<div class="change ' + dir + '">' + arrow + ' ' + percent(item.changePercent) + '</div>'
            + (state.source === "average" && item.sourceCount
              ? '<div class="sourceMeta">' + item.sourceCount + (item.sourceCount === 1 ? ' source' : ' sources')
                + (item.excludedSources && item.excludedSources.length
                  ? ' • ' + item.excludedSources.length + (item.excludedSources.length === 1 ? ' outlier removed' : ' outliers removed')
                  : '')
                + '</div>'
              : '')
            + '<div class="updated">' + (item.marketTime ? 'Market ' + escapeHtml(item.marketTime) : 'Updated ' + formatTime(item.updatedAt)) + '</div>'
            + '</article>';
        }).join("");
      }

      function providerLabel(data){
        if (data.provider === "average") {
          var cached = Number(data.staleSourceCount || 0);
          var goldRefs = Number(data.goldReferenceSourceCount || 0);
          return "Smart average"
            + (goldRefs ? " • " + goldRefs + " gold refs" : "")
            + (cached ? " • " + cached + " cached" : "");
        }

        var labels = {
          tgju: "TGJU",
          milli: "Milli",
          melligold: "MelliGold",
          talasea: "TalaSea"
        };

        return labels[data.provider] || data.sourceName || data.provider || "—";
      }

      async function load(){
        content.className = "state";
        content.innerHTML = '<div class="spinner"></div>Fetching market prices...';
        refresh.disabled = true;
        sourceSelect.disabled = true;

        try {
          state.source = sourceSelect.value || "tgju";
          var endpoint = "/api/economy?source=" + encodeURIComponent(state.source);
          try { localStorage.setItem("mewconomy-source", state.source); } catch(e) {}

          var controller = new AbortController();
          var timeout = setTimeout(function(){ controller.abort(); }, 15000);
          var response;
          try {
            response = await fetch(endpoint, {
              cache: "no-store",
              signal: controller.signal
            });
          } finally {
            clearTimeout(timeout);
          }

          var contentType = response.headers.get("content-type") || "";
          if (!contentType.includes("application/json")) {
            throw new Error("Market API returned an invalid response.");
          }
          var data = await response.json();
          if (!response.ok || !data.ok) throw new Error(data.error || "Price fetch failed");

          state.assets = data.assets || [];
          provider.textContent = "Source: " + providerLabel(data);
          time.textContent = "Updated: " + formatTime(data.updatedAt);
          render();
        } catch (error) {
          content.className = "state";
          var message = error && error.name === "AbortError"
            ? "Market request timed out. Please retry."
            : (error.message || "Prices are temporarily unavailable.");
          content.innerHTML = "😾 " + escapeHtml(message);
        } finally {
          refresh.disabled = false;
          sourceSelect.disabled = false;
        }
      }

      document.getElementById("tabs").addEventListener("click", function(event){
        var button = event.target.closest(".tab");
        if (!button) return;
        document.querySelectorAll(".tab").forEach(function(el){ el.classList.remove("active"); });
        button.classList.add("active");
        state.category = button.getAttribute("data-cat") || "all";
        render();
      });

      content.addEventListener("click", function(event){
        var card = event.target.closest(".card");
        if (!card || !content.contains(card)) return;

        var chartButton = event.target.closest(".chartBtn");

        if (chartButton) {
          event.preventDefault();
          event.stopPropagation();

          var chartItem = findStateAsset(
            card.getAttribute("data-asset-id")
          );
          openHistory(chartItem);
          return;
        }

        var rect = card.getBoundingClientRect();
        var x = Math.max(28, Math.min(rect.width - 28, event.clientX - rect.left));
        var y = Math.max(34, Math.min(rect.height - 34, event.clientY - rect.top));

        var paw = document.createElement("span");
        paw.className = "pawPop";
        paw.textContent = "🐾";
        paw.style.left = x + "px";
        paw.style.top = y + "px";
        card.appendChild(paw);

        // Every click creates its own independent paw. Existing paws are never
        // killed or restarted; each cleans itself up after its own animation.
        paw.addEventListener("animationend", function(){
          paw.remove();
        }, { once:true });

        var item = findStateAsset(card.getAttribute("data-asset-id"));
        registerPriceTap(card, item);
      });

      chartClose.addEventListener("click", closeHistory);

      chartOverlay.addEventListener("click", function(event){
        if (event.target === chartOverlay) {
          closeHistory();
        }
      });

      document.querySelectorAll(".rangeBtn").forEach(function(button){
        button.addEventListener("click", function(){
          chartState.rangeHours =
            Number(button.getAttribute("data-range-hours"))
            || 168;
          renderHistoryChart();
        });
      });

      document.addEventListener("keydown", function(event){
        if (
          event.key === "Escape" &&
          chartOverlay.classList.contains("open")
        ) {
          closeHistory();
        }
      });

      sourceSelect.addEventListener("change", function(){
        if (chartOverlay.classList.contains("open")) {
          closeHistory();
        }
        load();
      });

      refresh.addEventListener("click", load);
      load();
    })();
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' https://telegram.org 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; frame-ancestors *",
    },
  });
}

async function getBroadcastRecipients(env, target = "all") {
  const users = await getAllUserRecords(env);

  if (target === "daily") {
    return users.filter((u) => u.dailyEnabled).map((u) => u.chatId);
  }

  if (target === "active7") {
    return users.filter((u) => wasActiveWithin(u, 7)).map((u) => u.chatId);
  }

  return users.map((u) => u.chatId);
}

function parseBroadcastTarget(body, hasReply) {
  const trimmed = String(body || "").trim();
  const first = trimmed.split(/\s+/)[0]?.toLowerCase() || "";

  if (["all", "active7", "daily"].includes(first)) {
    return {
      target: first,
      content: trimmed.slice(first.length).trim(),
    };
  }

  return { target: "all", content: trimmed };
}

function broadcastTargetLabel(target) {
  if (target === "daily") return "فقط میو روزانه روشن";
  if (target === "active7") return "فعال‌های ۷ روز اخیر";
  return "همه کاربران";
}

function isTelegramGone(result) {
  const description = result?.description?.toLowerCase() || "";

  return (
    result?.error_code === 403 ||
    description.includes("blocked by the user") ||
    description.includes("chat not found") ||
    description.includes("user is deactivated")
  );
}

async function forgetUser(chatId, env) {
  // به‌جای چندین delete (هر کدام یک write)، فقط یک tombstone می‌گذاریم.
  // داده قدیمی می‌ماند ولی از daily/broadcast/admin lists حذف می‌شود.
  return safeKvPut(
    env.BOT_KV,
    `${DISABLED_KEY_PREFIX}${chatId}`,
    "1"
  );
}

async function reactivateUser(chatId, env) {
  const key = `${DISABLED_KEY_PREFIX}${chatId}`;
  const disabled = await safeKvGet(env.BOT_KV, key, null);

  if (!disabled) {
    return true;
  }

  return safeKvDelete(env.BOT_KV, key);
}

async function handleBroadcastCommand(message, env) {
  const adminChatId = String(message.chat.id);
  const rawBody = (message.text || "")
    .replace(/^\/broadcast(?:@\w+)?\s*/i, "")
    .trim();
  const repliedMessage = message.reply_to_message;
  const parsed = parseBroadcastTarget(rawBody, Boolean(repliedMessage));

  if (!parsed.content && !repliedMessage) {
    await sendText(
      adminChatId,
      `برای پیام همگانی:
/broadcast متن پیام
/broadcast active7 متن — فعال‌های ۷ روز اخیر
/broadcast daily متن — کسانی که میو روزانه روشن دارند

برای عکس/ویس/ویدیو/فایل هم روی پیام Reply کن و بنویس:
/broadcast
یا /broadcast active7
یا /broadcast daily`,
      env
    );
    return;
  }

  const recipients = await getBroadcastRecipients(env, parsed.target);

  if (!recipients.length) {
    await sendText(adminChatId, "برای این گروه مخاطبی پیدا نشد.", env);
    return;
  }

  const draftId = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  const draft = {
    id: draftId,
    target: parsed.target,
    kind: repliedMessage ? "copy" : "text",
    text: repliedMessage ? "" : parsed.content,
    fromChatId: repliedMessage ? adminChatId : "",
    messageId: repliedMessage?.message_id || null,
    snapshot: repliedMessage
      ? buildBroadcastSnapshot(repliedMessage, adminChatId)
      : { kind: "text", text: parsed.content },
    createdAt: new Date().toISOString(),
  };

  const draftSaved = await safeKvPut(
    env.BOT_KV,
    `${BROADCAST_DRAFT_PREFIX}${draftId}`,
    JSON.stringify(draft),
    { expirationTtl: BROADCAST_DRAFT_TTL }
  );

  if (!draftSaved) {
    await sendText(adminChatId, "پیش‌نویس Broadcast تو KV ذخیره نشد. دوباره امتحان کن.", env);
    return;
  }

  if (!repliedMessage) {
    await sendText(adminChatId, `📣 پیش‌نمایش:\n\n${parsed.content}`, env);
  }

  await sendText(
    adminChatId,
    `ارسال برای ${recipients.length} نفر آماده است.\n🎯 مقصد: ${broadcastTargetLabel(parsed.target)}\n\nتأیید می‌کنی؟`,
    env,
    {
      reply_markup: {
        inline_keyboard: [[
          { text: "✅ ارسال", callback_data: `bc_ok:${draftId}` },
          { text: "❌ لغو", callback_data: `bc_no:${draftId}` },
        ]],
      },
    }
  );
}

function acquireBroadcastJobLock(draftId) {
  const key = String(draftId || "");
  if (!key) return false;

  const now = Date.now();
  const activeUntil = Number(broadcastJobMemory.get(key) || 0);
  if (activeUntil > now) return false;

  broadcastJobMemory.set(key, now + 2 * 60 * 1000);
  pruneExpiringMemoryMap(broadcastJobMemory, now);
  return true;
}

function releaseBroadcastJobLock(draftId) {
  if (draftId) broadcastJobMemory.delete(String(draftId));
}

async function handleCallbackQuery(callback, env) {
  const callbackId = callback.id;
  const data = callback.data || "";
  const adminId = env.ADMIN_CHAT_ID ? String(env.ADMIN_CHAT_ID) : "";
  const fromId = callback.from?.id ? String(callback.from.id) : "";

  if (data === AI_TRANSLATE_CALLBACK) {
    await handleAiTranslateCallback(callback, env);
    return;
  }

  if (data === VOICE_OPINION_CALLBACK) {
    await handleVoiceOpinionCallback(callback, env);
    return;
  }

  if (data === ACHIEVEMENTS_CALLBACK) {
    await handleAchievementsCallback(callback, env);
    return;
  }

  if (data.startsWith("modam:")) {
    const offset = Math.max(0, Number(data.split(":")[1] || 0));
    await answerCallback(callbackId, "چشم. بقیشم میارم…", env);
    await sendBroadcastArchivePage(fromId, env, offset);
    return;
  }

  if (data.startsWith("um:")) {
    await handleAdminUserMonitorCallback(callback, env);
    return;
  }

  if (!data.startsWith("bc_")) {
    await answerCallback(callbackId, "این دکمه منقضی شده.", env);
    return;
  }

  if (!adminId || fromId !== adminId) {
    await answerCallback(callbackId, "فقط مدیر می‌تونه این کار رو انجام بده.", env, true);
    return;
  }

  const [action, draftId, offsetRaw] = data.split(":");
  const key = `${BROADCAST_DRAFT_PREFIX}${draftId}`;
  const raw = await safeKvGet(env.BOT_KV, key, null);
  const draft = parseJsonValue(raw, null);

  if (!draft) {
    await answerCallback(callbackId, "این پیش‌نویس منقضی شده.", env, true);
    return;
  }

  if (action === "bc_no") {
    await safeKvDelete(env.BOT_KV, key);
    await answerCallback(callbackId, "لغو شد.", env);
    await clearInlineKeyboard(callback.message, env);
    await sendText(adminId, "ارسال همگانی لغو شد.", env);
    return;
  }

  if (action === "bc_ok") {
    if (Number(draft.progress?.nextOffset || 0) > 0) {
      await answerCallback(callbackId, "این مرحله قبلاً ارسال شده.", env, true);
      return;
    }

    if (!acquireBroadcastJobLock(draftId)) {
      await answerCallback(callbackId, "ارسال همین الان در حال اجراست.", env, true);
      return;
    }

    try {
      await answerCallback(callbackId, "ارسال شروع شد…", env);
      await clearInlineKeyboard(callback.message, env);

      if (!draft.archived) {
        await archiveBroadcast(draft, env);
        draft.archived = true;
        draft.progress = draft.progress || { sent: 0, failed: 0, removed: 0, nextOffset: 0 };
        await safeKvPut(env.BOT_KV, key, JSON.stringify(draft), { expirationTtl: BROADCAST_DRAFT_TTL });
      }

      await executeBroadcastDraft(draft, adminId, env, 0, key);
    } finally {
      releaseBroadcastJobLock(draftId);
    }
    return;
  }

  if (action === "bc_more") {
    const requestedOffset = Math.max(0, Number(offsetRaw || 0));
    const expectedOffset = Math.max(0, Number(draft.progress?.nextOffset || 0));

    if (requestedOffset !== expectedOffset) {
      await answerCallback(
        callbackId,
        requestedOffset < expectedOffset
          ? "این مرحله قبلاً ارسال شده."
          : "ترتیب ارسال به‌هم خورده؛ از آخرین دکمه ادامه استفاده کن.",
        env,
        true
      );
      return;
    }

    if (!acquireBroadcastJobLock(draftId)) {
      await answerCallback(callbackId, "این مرحله همین الان در حال اجراست.", env, true);
      return;
    }

    try {
      const offset = expectedOffset;
      await answerCallback(callbackId, "ادامه می‌دم…", env);
      await clearInlineKeyboard(callback.message, env);
      await executeBroadcastDraft(draft, adminId, env, offset, key);
    } finally {
      releaseBroadcastJobLock(draftId);
    }
    return;
  }

  await answerCallback(callbackId, "دستور نامعتبره.", env, true);
}


function buildBroadcastSnapshot(message, fallbackChatId = "") {
  if (!message) return null;

  const caption = String(message.caption || "").slice(0, 1000);
  const common = caption ? { caption } : {};

  if (message.text) {
    return { kind: "text", text: String(message.text).slice(0, 3800) };
  }

  if (Array.isArray(message.photo) && message.photo.length) {
    const photo = message.photo[message.photo.length - 1];
    return { kind: "photo", fileId: photo.file_id, ...common };
  }

  const mediaMap = [
    ["video", "video"],
    ["animation", "animation"],
    ["audio", "audio"],
    ["document", "document"],
    ["voice", "voice"],
    ["sticker", "sticker"],
    ["video_note", "videoNote"],
  ];

  for (const [field, kind] of mediaMap) {
    if (message[field]?.file_id) {
      return { kind, fileId: message[field].file_id, ...common };
    }
  }

  if (message.message_id && (message.chat?.id || fallbackChatId)) {
    return {
      kind: "copy",
      fromChatId: String(message.chat?.id || fallbackChatId),
      messageId: message.message_id,
    };
  }

  return null;
}

async function archiveBroadcast(draft, env) {
  if (!draft?.id || !env.BOT_KV) return false;

  const createdAt = draft.createdAt || new Date().toISOString();
  const timestamp = Number(Date.parse(createdAt)) || Date.now();
  const key = `${BROADCAST_ARCHIVE_PREFIX}${String(timestamp).padStart(13, "0")}:${draft.id}`;
  const archive = {
    id: draft.id,
    createdAt,
    kind: draft.kind,
    text: draft.text || "",
    snapshot: draft.snapshot || null,
    fromChatId: draft.fromChatId || "",
    messageId: draft.messageId || null,
  };

  return safeKvPut(env.BOT_KV, key, JSON.stringify(archive));
}

async function listBroadcastArchiveKeys(env) {
  if (!env.BOT_KV?.list) return [];

  const keys = [];
  let cursor;

  do {
    const options = { prefix: BROADCAST_ARCHIVE_PREFIX, limit: 1000 };
    if (cursor) options.cursor = cursor;

    const page = await kvListWithRetry(env.BOT_KV, options);
    keys.push(...page.keys.map((item) => item.name));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return keys.sort();
}

async function sendBroadcastArchivePage(chatId, env, offset = 0) {
  const keys = await listBroadcastArchiveKeys(env);

  if (!keys.length) {
    await sendText(chatId, "هنوز چیزی توی its modam نریختم. بعداً بیا فضولی کن 😼", env);
    return;
  }

  const safeOffset = Math.max(0, Math.min(Number(offset || 0), keys.length));
  const pageKeys = keys.slice(safeOffset, safeOffset + MODAM_REPLAY_PAGE_SIZE);
  const records = await Promise.all(
    pageKeys.map(async (key) => {
      const raw = await safeKvGet(env.BOT_KV, key, null);
      return parseJsonValue(raw, null);
    })
  );

  for (const record of records.filter(Boolean)) {
    await sendBroadcastArchiveItem(chatId, record, env);
    await sleep(450);
  }

  const nextOffset = safeOffset + pageKeys.length;
  if (nextOffset < keys.length) {
    await sendText(
      chatId,
      `فعلاً ${pageKeys.length} تاشو از قدیمی‌ها ریختم جلوت. ${keys.length - nextOffset} تای جدیدتر هم هست.`,
      env,
      {
        reply_markup: {
          inline_keyboard: [[
            { text: "🗞 جدیدترها", callback_data: `modam:${nextOffset}` },
          ]],
        },
      }
    );
  }
}

async function sendBroadcastArchiveItem(chatId, record, env) {
  const snapshot = record.snapshot || (
    record.kind === "text"
      ? { kind: "text", text: record.text || "" }
      : {
          kind: "copy",
          fromChatId: record.fromChatId,
          messageId: record.messageId,
        }
  );

  if (!snapshot) return false;

  if (snapshot.kind === "text") {
    return sendText(chatId, snapshot.text || "", env);
  }

  if (snapshot.kind === "copy") {
    return telegram(env, "copyMessage", {
      chat_id: chatId,
      from_chat_id: snapshot.fromChatId,
      message_id: snapshot.messageId,
    });
  }

  const methodMap = {
    photo: ["sendPhoto", "photo"],
    video: ["sendVideo", "video"],
    animation: ["sendAnimation", "animation"],
    audio: ["sendAudio", "audio"],
    document: ["sendDocument", "document"],
    voice: ["sendVoice", "voice"],
    sticker: ["sendSticker", "sticker"],
    videoNote: ["sendVideoNote", "video_note"],
  };

  const mapped = methodMap[snapshot.kind];
  if (!mapped || !snapshot.fileId) return false;

  const [method, field] = mapped;
  const payload = { chat_id: chatId, [field]: snapshot.fileId };
  if (snapshot.caption && snapshot.kind !== "sticker" && snapshot.kind !== "videoNote") {
    payload.caption = snapshot.caption;
  }
  if (snapshot.kind === "video") payload.supports_streaming = true;

  return telegram(env, method, payload);
}

async function pinBroadcastMessage(chatId, messageId, env) {
  try {
    const result = await telegram(env, "pinChatMessage", {
      chat_id: chatId,
      message_id: messageId,
      disable_notification: true,
    });
    return Boolean(result?.ok);
  } catch (error) {
    logDetailedError(`pin broadcast ${chatId}:${messageId}`, error);
    return false;
  }
}

function extractFirstHttpUrl(text = "") {
  const match = String(text).match(/https?:\/\/[^\s<>"']+/i);
  if (!match) return "";
  return match[0].replace(/[\]\[(){}<>،؛,.!?؟]+$/g, "");
}

function detectLinkRequest(text = "") {
  const raw = extractFirstHttpUrl(text);
  if (!raw) return null;

  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  const isTwitterHost =
    host === "x.com" ||
    host.endsWith(".x.com") ||
    host === "twitter.com" ||
    host.endsWith(".twitter.com");

  if (!isTwitterHost) {
    return {
      kind: "unsupported",
      url: raw,
    };
  }

  const tweetId = (url.pathname || "").match(/\/status\/(\d{2,20})/i)?.[1] || "";

  if (!tweetId) {
    return {
      kind: "twitter_invalid",
      url: raw,
    };
  }

  return {
    kind: "twitter",
    platform: "twitter",
    url: raw,
    tweetId,
  };
}

async function handleTwitterDownload(message, request, env) {
  const chatId = String(message.chat.id);
  const now = Date.now();
  const cooldownUntil = Number(downloadCooldownMemory.get(chatId) || 0);

  if (cooldownUntil > now) {
    await sendText(chatId, "😾 یکی‌یکی لینک بده آدمیزاد. هنوز قبلیه از گلوم پایین نرفته.", env);
    return;
  }

  downloadCooldownMemory.set(chatId, now + TWITTER_DOWNLOAD_COOLDOWN_MS);
  pruneMemoryMap(downloadCooldownMemory);

  // ChatAction پیام محسوب نمی‌شود؛ بنابراین کاربر در نهایت فقط یک پیام می‌گیرد.
  await telegram(env, "sendChatAction", {
    chat_id: chatId,
    action: "upload_video",
  });

  try {
    const post = await fetchTwitterPost(request.tweetId);

    if (!post) {
      await sendText(
        chatId,
        "😾 این توییت رو نتونستم از زیر پنجه‌های X بکشم بیرون. لینک مستقیم یه پست عمومی رو بفرست.",
        env
      );
      return;
    }

    const media = extractTwitterMedia(post);
    const primaryMedia = media[0] || null;
    const footer = await buildTwitterFooterHtml(post, request, env);
    const replyParameters = {
      message_id: message.message_id,
      allow_sending_without_reply: true,
    };

    if (primaryMedia) {
      const caption = buildTwitterMessageHtml(post?.text || "", footer, 900);
      const sent = await sendSingleTwitterMedia(
        chatId,
        primaryMedia,
        caption,
        replyParameters,
        env
      );

      if (sent?.ok) {
        return;
      }

      // اگر Telegram نتوانست URL مدیا را مستقیم بگیرد، باز هم فقط یک پیام قابل‌مشاهده
      // می‌فرستیم: متن پست + attribution + دکمه دانلود مستقیم.
      const fallbackBody = buildTwitterMessageHtml(
        `${String(post?.text || "").trim()}${post?.text ? "\n\n" : ""}مدیا پیدا شد، ولی تلگرام مستقیم نگرفتش.`,
        footer,
        3300
      );

      const fallback = await sendText(chatId, fallbackBody, env, {
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
        reply_parameters: replyParameters,
        reply_markup: {
          inline_keyboard: [[
            { text: "⬇️ دانلود مدیا", url: primaryMedia.url },
          ]],
        },
      });

      if (!fallback?.ok) {
        // اگر URL دکمه از طرف Telegram رد شد، یک پیام ساده بدون دکمه می‌فرستیم.
        await sendText(
          chatId,
          buildTwitterMessageHtml(post?.text || "", footer, 3300),
          env,
          {
            parse_mode: "HTML",
            link_preview_options: { is_disabled: true },
            reply_parameters: replyParameters,
          }
        );
      }

      return;
    }

    // پست بدون مدیا: همان یک پیام متنی با footer لینک‌دار.
    await sendText(
      chatId,
      buildTwitterMessageHtml(post?.text || "", footer, 3600),
      env,
      {
        parse_mode: "HTML",
        link_preview_options: { is_disabled: true },
        reply_parameters: replyParameters,
      }
    );
  } catch (error) {
    logDetailedError("twitter download", error);
    await sendText(
      chatId,
      "😾 دانلودر توییتر یه لگد خورد. چند لحظه دیگه دوباره همون لینک رو بفرست.",
      env
    );
  }
}

async function fetchTwitterPost(tweetId) {
  if (!tweetId) return null;

  const headers = {
    Accept: "application/json",
    "User-Agent": APP_USER_AGENT,
  };

  try {
    const v2 = await fetchJsonWithTimeout(
      `https://api.fxtwitter.com/2/status/${tweetId}`,
      { headers },
      3500
    );
    const status = v2?.status || null;
    if (status) return status;
  } catch (error) {
    logDetailedError("FxTwitter v2", error);
  }

  try {
    const v1 = await fetchJsonWithTimeout(
      `https://api.fxtwitter.com/i/status/${tweetId}`,
      { headers },
      2500
    );
    return v1?.tweet || null;
  } catch (error) {
    logDetailedError("FxTwitter fallback", error);
    return null;
  }
}

function extractTwitterMedia(post) {
  if (!post?.media) return [];

  const media = post.media;
  const rawItems = Array.isArray(media.all) && media.all.length
    ? media.all
    : [
        ...(Array.isArray(media.photos) ? media.photos : []),
        ...(Array.isArray(media.videos) ? media.videos : []),
      ];

  const seen = new Set();
  const output = [];

  for (const item of rawItems) {
    if (!item) continue;

    const type = item.type === "photo"
      ? "photo"
      : item.type === "gif"
        ? "animation"
        : "video";

    let url = "";

    if (type === "photo") {
      url = item.url || item.original_url || "";
    } else {
      const formats = Array.isArray(item.formats)
        ? item.formats.filter((format) => format?.url)
        : [];

      const preferred = formats
        .filter((format) => !format.container || format.container === "mp4")
        .filter((format) => !format.codec || format.codec === "h264")
        .sort((a, b) => {
          const aFits =
            Number(a.size || 0) > 0 &&
            Number(a.size) <= TELEGRAM_REMOTE_VIDEO_LIMIT;
          const bFits =
            Number(b.size || 0) > 0 &&
            Number(b.size) <= TELEGRAM_REMOTE_VIDEO_LIMIT;

          if (aFits !== bFits) return aFits ? -1 : 1;

          return (
            Number(b.height || b.bitrate || 0) -
            Number(a.height || a.bitrate || 0)
          );
        })[0];

      url = preferred?.url || item.url || item.transcode_url || "";
    }

    if (!isSafeHttpUrl(url) || seen.has(url)) continue;
    seen.add(url);

    output.push({ type, url });
  }

  return output.slice(0, 20);
}

async function sendSingleTwitterMedia(
  chatId,
  item,
  caption,
  replyParameters,
  env
) {
  if (!item?.url) return { ok: false, description: "missing media url" };

  let method = "sendVideo";
  let field = "video";
  const payload = {
    chat_id: chatId,
    caption,
    parse_mode: "HTML",
    reply_parameters: replyParameters,
  };

  if (item.type === "photo") {
    method = "sendPhoto";
    field = "photo";
  } else if (item.type === "animation") {
    method = "sendAnimation";
    field = "animation";
  } else {
    payload.supports_streaming = true;
  }

  payload[field] = item.url;
  return telegram(env, method, payload);
}

function buildTwitterMessageHtml(postText, footerHtml, maxVisibleChars = 900) {
  const raw = String(postText || "").trim();
  const maxText = Math.max(0, Number(maxVisibleChars || 0));
  const clipped = raw.length > maxText
    ? `${raw.slice(0, Math.max(0, maxText - 1)).trimEnd()}…`
    : raw;

  const body = clipped ? `${escapeHtml(clipped)}\n\n\n` : "";
  return `${body}${footerHtml}`;
}

async function buildTwitterFooterHtml(post, request, env) {
  const author = post?.author || {};
  const rawHandle = String(
    author.screen_name ||
    author.username ||
    ""
  ).replace(/^@/, "").trim();

  const safeHandle = /^[A-Za-z0-9_]{1,30}$/.test(rawHandle)
    ? rawHandle
    : "";

  const name = String(
    author.name ||
    author.display_name ||
    ""
  ).trim();

  const publisherLabel = name && safeHandle
    ? `${name} (@${safeHandle})`
    : name || (safeHandle ? `@${safeHandle}` : "منتشرکننده توییت");

  const publisherUrl = safeHandle
    ? `https://x.com/${encodeURIComponent(safeHandle)}`
    : request.url;

  const botUrl = await getBotPublicUrl(env);

  return [
    "────────────",
    `👤 <a href="${escapeHtmlAttribute(publisherUrl)}">${escapeHtml(publisherLabel)}</a>`,
    `😼 <a href="${escapeHtmlAttribute(botUrl)}">گوربابات؛ فوروارد شده از توئیتر</a>`,
  ].join("\n");
}

let telegramBotUsernameCache = "";

async function getBotPublicUrl(env) {
  const configured = String(env?.BOT_USERNAME || "")
    .replace(/^@/, "")
    .trim();

  if (/^[A-Za-z0-9_]{5,32}$/.test(configured)) {
    telegramBotUsernameCache = configured;
    return `https://t.me/${configured}`;
  }

  if (/^[A-Za-z0-9_]{5,32}$/.test(telegramBotUsernameCache)) {
    return `https://t.me/${telegramBotUsernameCache}`;
  }

  try {
    const me = await telegram(env, "getMe", {});
    const username = String(me?.result?.username || "").trim();

    if (/^[A-Za-z0-9_]{5,32}$/.test(username)) {
      telegramBotUsernameCache = username;
      return `https://t.me/${username}`;
    }
  } catch (error) {
    logDetailedError("get bot public url", error);
  }

  // فقط fallback؛ معمولاً getMe نام کاربری بات را برمی‌گرداند.
  return "https://github.com/modamires/gorbabat";
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtmlAttribute(value = "") {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function isSafeHttpUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 6000) {
  const response = await fetchWithTimeout(url, options, timeoutMs);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.json();
}

async function editBotText(chatId, messageId, text, env, replyMarkup = undefined) {
  if (!messageId) {
    return sendText(chatId, text, env, replyMarkup ? { reply_markup: replyMarkup } : {});
  }

  return telegram(env, "editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text: String(text).slice(0, 3900),
    ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
  });
}

async function deleteBotMessage(chatId, messageId, env) {
  if (!messageId) return false;
  const result = await telegram(env, "deleteMessage", {
    chat_id: chatId,
    message_id: messageId,
  });
  return Boolean(result?.ok);
}

function randomMewSentence() {
  const count = 2 + Math.floor(Math.random() * 7);
  return Array.from({ length: count }, () => "میو").join(" ");
}

async function sendChatMewPrompt(message, env) {
  const chatId = String(message.chat.id);

  return sendText(
    chatId,
    randomMewSentence(),
    env,
    {
      reply_parameters: {
        message_id: message.message_id,
        allow_sending_without_reply: true,
      },
      reply_markup: {
        inline_keyboard: [[
          {
            text: "ترجمه به زبون آدمیزاد",
            callback_data: AI_TRANSLATE_CALLBACK,
          },
        ]],
      },
    }
  );
}

async function handleAiTranslateCallback(callback, env) {
  const callbackId = callback.id;
  const message = callback.message;
  const chatId = message?.chat?.id ? String(message.chat.id) : "";
  const messageId = message?.message_id;
  const original = message?.reply_to_message;
  const userText = String(
    original?.text ||
    original?.caption ||
    ""
  ).trim();

  if (!chatId || !messageId || !userText) {
    await answerCallback(
      callbackId,
      "متن اصلی رو پیدا نکردم. دوباره پیام بده.",
      env,
      true
    );
    return;
  }

  const jobKey = `${chatId}:${messageId}`;
  const now = Date.now();
  const activeUntil = Number(aiJobMemory.get(jobKey) || 0);

  if (activeUntil > now) {
    await answerCallback(callbackId, "دارم ترجمه می‌کنم. هولم نکن 😾", env);
    return;
  }

  aiJobMemory.set(jobKey, now + 60_000);
  pruneMemoryMap(aiJobMemory);

  await answerCallback(callbackId, "باشه بابا، دارم ترجمه می‌کنم…", env);

  await Promise.all([
    telegram(env, "editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: "😾 یه لحظه… دارم به زبون آدمیزاد ترجمه می‌کنم.",
      reply_markup: { inline_keyboard: [] },
    }),
    telegram(env, "sendChatAction", {
      chat_id: chatId,
      action: "typing",
    }),
  ]);

  try {
    const reply = await generateGorbabatReply(userText, env);
    const finalText = reply;

    const edited = await telegram(env, "editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: finalText.slice(0, 3800),
      reply_markup: { inline_keyboard: [] },
    });

    if (!edited?.ok) {
      await sendText(chatId, finalText.slice(0, 3800), env, {
        reply_parameters: {
          message_id: original?.message_id || messageId,
          allow_sending_without_reply: true,
        },
      });
    }
  } catch (error) {
    logDetailedError("gorbabat AI", error);

    await telegram(env, "editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: "😾 مغزم یه لحظه هنگ کرد. دوباره بزن، شاید این بار همکاری کردم.",
      reply_markup: {
        inline_keyboard: [[
          {
            text: "دوباره ترجمه کن",
            callback_data: AI_TRANSLATE_CALLBACK,
          },
        ]],
      },
    });
  } finally {
    aiJobMemory.delete(jobKey);
  }
}

async function generateGorbabatReply(userText, env) {
  if (!env.AI) {
    throw new Error("Workers AI binding named AI is missing");
  }

  const cleanText = String(userText || "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, MAX_AI_INPUT_CHARS);

  if (!cleanText) {
    return "چیزی نگفتی که ترجمه کنم.";
  }

  // Qwen3 به‌طور پیش‌فرض thinking دارد. با خروجی کوتاه ممکن است تمام
  // بودجه توکن صرف thinking شود و content نهایی خالی بماند. /no_think
  // را در آخرین پیام می‌گذاریم تا برای چت کوتاه گوربابات reasoning خاموش شود.
  try {
    const result = await withPromiseTimeout(
      env.AI.run(
        AI_MODEL,
      {
        messages: [
          {
            role: "system",
            content: GORBABAT_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `${cleanText}\n\n/no_think`,
          },
        ],
        stream: false,
        max_tokens: MAX_AI_OUTPUT_TOKENS,
        temperature: 0.7,
        top_p: 0.8,
        top_k: 20,
        repetition_penalty: 1.05,
      }
    ),
      AI_REQUEST_TIMEOUT_MS,
      "Qwen AI"
    );

    const extracted = cleanAiReply(extractAiText(result));
    if (extracted) {
      return extracted;
    }

    logAiShape("Qwen returned no final text", AI_MODEL, result);
  } catch (error) {
    logDetailedError("Qwen primary AI", error);
  }

  // اگر Qwen به هر دلیل content نهایی نداد، کاربر را معطل نمی‌کنیم.
  // GLM روی همان AI binding اجرا می‌شود و دیتابیس/Binding جدید نمی‌خواهد.
  try {
    const fallback = await withPromiseTimeout(
      env.AI.run(
        AI_FALLBACK_MODEL,
      {
        messages: [
          {
            role: "system",
            content: GORBABAT_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: cleanText,
          },
        ],
        stream: false,
        max_completion_tokens: MAX_AI_OUTPUT_TOKENS,
        temperature: 0.65,
        top_p: 0.85,
      }
    ),
      AI_REQUEST_TIMEOUT_MS,
      "GLM AI"
    );

    const fallbackText = cleanAiReply(extractAiText(fallback));
    if (fallbackText) {
      return fallbackText;
    }

    logAiShape("GLM fallback returned no final text", AI_FALLBACK_MODEL, fallback);
  } catch (error) {
    logDetailedError("GLM fallback AI", error);
  }

  throw new Error("Workers AI returned no final text from primary or fallback model");
}

function logAiShape(label, model, result) {
  console.error(label, {
    model,
    type: typeof result,
    keys: result && typeof result === "object" ? Object.keys(result) : [],
    choiceKeys:
      result?.choices?.[0] && typeof result.choices[0] === "object"
        ? Object.keys(result.choices[0])
        : [],
    messageKeys:
      result?.choices?.[0]?.message && typeof result.choices[0].message === "object"
        ? Object.keys(result.choices[0].message)
        : [],
    finishReason: result?.choices?.[0]?.finish_reason || null,
  });
}

function extractAiText(result) {
  if (typeof result === "string") {
    return result;
  }

  const candidates = [
    result?.choices?.[0]?.message?.content,
    result?.choices?.[0]?.text,
    result?.response,
    result?.output_text,
    result?.result?.choices?.[0]?.message?.content,
    result?.result?.choices?.[0]?.text,
    result?.result?.response,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }

    // بعضی endpointها content را به شکل آرایه‌ای از partها برمی‌گردانند.
    if (Array.isArray(candidate)) {
      const joined = candidate
        .map((part) => {
          if (typeof part === "string") return part;
          return part?.text || part?.content || "";
        })
        .filter(Boolean)
        .join("\n")
        .trim();

      if (joined) {
        return joined;
      }
    }
  }

  return "";
}

function cleanAiReply(value) {
  return String(value || "")
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "")
    .replace(/^(assistant|دستیار)\s*:\s*/i, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function answerCallback(callbackQueryId, text, env, showAlert = false) {
  if (!callbackQueryId) return;
  await telegram(env, "answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text,
    show_alert: showAlert,
  });
}

async function clearInlineKeyboard(message, env) {
  if (!message?.chat?.id || !message?.message_id) return;
  await telegram(env, "editMessageReplyMarkup", {
    chat_id: message.chat.id,
    message_id: message.message_id,
    reply_markup: { inline_keyboard: [] },
  });
}

async function executeBroadcastDraft(
  draft,
  adminChatId,
  env,
  startOffset = 0,
  draftKey = ""
) {
  const recipients = await getBroadcastRecipients(env, draft.target || "all");
  const offset = Math.max(0, Math.min(Number(startOffset || 0), recipients.length));
  const group = recipients.slice(offset, offset + BROADCAST_FREE_CHUNK_SIZE);

  if (!group.length) {
    if (draftKey) await safeKvDelete(env.BOT_KV, draftKey);
    await sendText(adminChatId, "ارسال همگانی چیزی برای ادامه نداشت.", env);
    return;
  }

  if (offset === 0) {
    await sendText(
      adminChatId,
      `ارسال همگانی برای ${recipients.length} مخاطب شروع شد…\nبرای اینکه روی پلن رایگان Worker از سقف subrequest رد نشیم، ارسال پین‌شده مرحله‌ای انجام می‌شه.`,
      env
    );
  }

  const results = await mapWithConcurrency(
    group,
    6,
    async (targetChatId) => {
      let result;

      if (draft.kind === "copy") {
        result = await telegram(env, "copyMessage", {
          chat_id: targetChatId,
          from_chat_id: draft.fromChatId,
          message_id: draft.messageId,
        });
      } else {
        result = await sendText(targetChatId, draft.text, env);
      }

      if (result?.ok) {
        const sentMessageId = getTelegramMessageId(result);
        if (sentMessageId) await pinBroadcastMessage(targetChatId, sentMessageId, env);
        return "sent";
      }

      if (isTelegramGone(result)) {
        await forgetUser(targetChatId, env);
        return "removed";
      }
      return "failed";
    }
  );

  const progress = {
    sent: Number(draft.progress?.sent || 0),
    failed: Number(draft.progress?.failed || 0),
    removed: Number(draft.progress?.removed || 0),
    nextOffset: offset,
  };

  for (const status of results) {
    if (status === "sent") progress.sent += 1;
    else if (status === "removed") progress.removed += 1;
    else progress.failed += 1;
  }

  const nextOffset = offset + group.length;
  progress.nextOffset = nextOffset;
  draft.progress = progress;

  if (nextOffset < recipients.length) {
    if (draftKey) {
      await safeKvPut(env.BOT_KV, draftKey, JSON.stringify(draft), { expirationTtl: BROADCAST_DRAFT_TTL });
    }

    await sendText(
      adminChatId,
      `این مرحله تموم شد.\n✅ موفق تا اینجا: ${progress.sent}\n❌ ناموفق: ${progress.failed}\n🧹 غیرفعال: ${progress.removed}\n⏳ باقی‌مانده: ${recipients.length - nextOffset}`,
      env,
      {
        reply_markup: {
          inline_keyboard: [[
            {
              text: `▶️ ادامه ارسال (${recipients.length - nextOffset})`,
              callback_data: `bc_more:${draft.id}:${nextOffset}`,
            },
          ]],
        },
      }
    );
    return;
  }

  if (draftKey) await safeKvDelete(env.BOT_KV, draftKey);

  await sendText(
    adminChatId,
    `ارسال همگانی تمام شد.\n✅ موفق: ${progress.sent}\n❌ ناموفق: ${progress.failed}\n🧹 حذف مخاطب غیرفعال: ${progress.removed}`,
    env
  );
}

async function handleTestDaily(adminChatId, env) {
  await sendText(adminChatId, "تست میو روزانه شروع شد...", env);

  const stats = await sendDailyCats(env);

  await sendText(
    adminChatId,
    `تست تمام شد.
مخاطب فعال: ${stats.recipients}
✅ ارسال موفق: ${stats.sent}
❌ ناموفق: ${stats.failed}
🧹 حذف غیرفعال: ${stats.removed}`,
    env
  );
}

async function handleCronStatus(adminChatId, env) {
  const [dailyRaw, historyRaw] = await Promise.all([
    safeKvGet(env.BOT_KV, CRON_LAST_KEY, null),
    safeKvGet(
      env.BOT_KV,
      ECONOMY_HISTORY_BATCH_KEY,
      null
    ),
  ]);

  const lines = ["آخرین وضعیت Cronها:"];

  if (dailyRaw) {
    let daily;

    try {
      daily = JSON.parse(dailyRaw);
    } catch {
      daily = { raw: dailyRaw };
    }

    lines.push(
      "",
      "🔔 Daily:",
      `status: ${daily.status || "unknown"}`,
      `cron: ${daily.cron || "unknown"}`,
      `startedAt: ${daily.startedAt || "unknown"}`,
      `finishedAt: ${daily.finishedAt || "-"}`
    );

    if (daily.stats) {
      lines.push(
        `recipients: ${daily.stats.recipients ?? "-"}`,
        `sent: ${daily.stats.sent ?? "-"}`,
        `failed: ${daily.stats.failed ?? "-"}`,
        `removed: ${daily.stats.removed ?? "-"}`
      );
    }
  } else {
    lines.push(
      "",
      "🔔 Daily:",
      "هنوز اجرای Daily ثبت نشده."
    );
  }

  lines.push(
    "",
    "📈 mewMONEY! history:",
    `cron: ${ECONOMY_HISTORY_CRON}`
  );

  if (historyRaw) {
    const store =
      parseEconomyHistoryBatchStore(historyRaw);
    const last =
      store.snapshots?.[store.snapshots.length - 1];

    lines.push(
      `snapshots: ${store.snapshots?.length || 0}`,
      `lastSnapshot: ${
        last?.t
          ? new Date(Number(last.t)).toISOString()
          : "-"
      }`,
      `sources: ${
        last?.sources
          ? Object.keys(last.sources).join(", ")
          : "-"
      }`
    );
  } else {
    lines.push(
      "history: هنوز Snapshot زمان‌بندی‌شده ثبت نشده.",
      "Cloudflare Cron Trigger زیر را اضافه کن:",
      ECONOMY_HISTORY_CRON
    );
  }

  await sendText(
    adminChatId,
    lines.join("\n"),
    env
  );
}

async function handleHealth(adminChatId, env) {
  const healthStartedAt = Date.now();

  await sendText(adminChatId, "🩺 دارم رباتو می‌برم زیر دستگاه... یه لحظه 😾", env);

  const kvProbePromise = timedHealthProbe("KV", async () => {
    if (!env.BOT_KV) throw new Error("BOT_KV binding missing");
    await kvGetWithRetry(env.BOT_KV, CRON_LAST_KEY);
    return true;
  });

  const telegramProbePromise = timedHealthProbe("Telegram", async () => {
    const result = await telegram(env, "getMe", {});
    if (!result?.ok) throw new Error(result?.description || "Telegram getMe failed");
    return result;
  });

  const catProbePromise = timedHealthProbe("Cat API", async () => {
    const response = await fetchWithTimeout(
      `https://cataas.com/cat?random=health-${crypto.randomUUID()}`,
      { method: "GET" },
      HEALTH_PROBE_TIMEOUT_MS
    );
    try { await response.body?.cancel(); } catch {}
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.status;
  });

  const chanceProbePromise = timedHealthProbe("Chance API", async () => {
    const response = await fetchWithTimeout(
      "https://ducks.now/api/v0/random/",
      { method: "GET" },
      HEALTH_PROBE_TIMEOUT_MS
    );
    try { await response.body?.cancel(); } catch {}
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.status;
  });


  const countsPromise = getHealthStorageCounts(env);
  const cloudMetricsPromise = fetchCloudflareWorkerHealthMetrics(env);

  const [kvProbe, telegramProbe, catProbe, chanceProbe, counts, cloudMetrics] =
    await Promise.all([
      kvProbePromise,
      telegramProbePromise,
      catProbePromise,
      chanceProbePromise,
      countsPromise,
      cloudMetricsPromise,
    ]);

  const cronRaw = await safeKvGet(env.BOT_KV, CRON_LAST_KEY, null);
  const cron = parseJsonValue(cronRaw, null);
  const cronText = cron
    ? `${cron.status || "unknown"} • ${formatRelativeTime(cron.finishedAt || cron.startedAt)}`
    : "هنوز ثبت نشده";

  const cache = getVisibleCacheHealth();
  const aiOk = Boolean(env.AI);
  const localScore = calculateHealthScore({
    kvProbe,
    telegramProbe,
    catProbe,
    chanceProbe,
    aiOk,
    cron,
    cloudMetrics,
  });

  const totalProbeMs = Math.max(0, Date.now() - healthStartedAt);
  const scoreEmoji = localScore >= 90 ? "🟢" : localScore >= 70 ? "🟡" : localScore >= 50 ? "🟠" : "🔴";
  const statusWord = localScore >= 90 ? "سالم" : localScore >= 70 ? "قابل قبول" : localScore >= 50 ? "مشکوک" : "خراب‌کاری در جریانه";

  const lines = [
    `🩺 Health Report — v2.8.1`,
    ``,
    `${scoreEmoji} سلامت کلی: ${localScore}/100 — ${statusWord}`,
    healthBar(localScore),
    ``,
    `⚡ Latency واقعی همین تست`,
    healthProbeLine("KV", kvProbe, 250),
    healthProbeLine("Telegram", telegramProbe, 1200),
    healthProbeLine("Cat API", catProbe, 1800),
    healthProbeLine("Chance API", chanceProbe, 1800),
    `⏱ کل تست: ${totalProbeMs} ms`,
    ``,
    `🧠 حافظه داخل isolate`,
    `Cache قابل مشاهده: ${formatBytes(cache.totalBytes)} / 128 MB`,
    healthBar((cache.totalBytes / WORKER_MEMORY_LIMIT_BYTES) * 100),
    `Map entries: ${cache.totalEntries}/${MEMORY_MAP_LIMIT * cache.mapCount}`,
    `cat:${catStatsMemory.size} • burst:${catBurstMemory.size} • pish:${partialPishMemory.size} • AI:${aiJobMemory.size} • DL:${downloadCooldownMemory.size} • act:${userActivityMemory.size}`,
    ``,
    `💾 KV / کاربران`,
    `👥 users: ${counts.users} • starters: ${counts.starters}`,
    `🔔 daily: ${counts.daily} • disabled: ${counts.disabled}`,
    `🗞 broadcast archive: ${counts.broadcasts}`,
    ``,
    `🤖 AI Binding: ${aiOk ? "✅ وصل" : "❌ پیدا نشد"}`,
    `⏱ Cron: ${cronText}`,
  ];

  if (cloudMetrics?.ok) {
    const m = cloudMetrics.metrics;
    const memP50 = Number(m.memoryP50 || 0);
    const memP90 = Number(m.memoryP90 || 0);
    const memP99 = Number(m.memoryP99 || 0);
    const cpuP50Ms = Number(m.cpuP50Us || 0) / 1000;
    const cpuP99Ms = Number(m.cpuP99Us || 0) / 1000;
    const errorRate = m.requests > 0 ? (m.errors / m.requests) * 100 : 0;

    lines.push(
      ``,
      `☁️ Cloudflare Metrics — ${Number(cloudMetrics.windowMinutes || HEALTH_CF_WINDOW_MINUTES)} دقیقه اخیر`,
      `RAM P50: ${formatBytes(memP50)} • P90: ${formatBytes(memP90)} • P99: ${formatBytes(memP99)}`,
      `RAM P90 ${healthBar((memP90 / WORKER_MEMORY_LIMIT_BYTES) * 100)}`,
      `CPU P50: ${formatMs(cpuP50Ms)} • P99: ${formatMs(cpuP99Ms)} / 10 ms Free`,
      `CPU P99 ${healthBar((cpuP99Ms / WORKER_FREE_CPU_LIMIT_MS) * 100)}`,
      `Requests: ${m.requests} • Errors: ${m.errors} (${errorRate.toFixed(2)}%) • Subreq: ${m.subrequests}`
    );
  } else {
    lines.push(
      ``,
      `☁️ RAM/CPU واقعی Cloudflare: ${cloudMetrics?.configured ? "⚠️ خطا در Metrics API" : "خاموش"}`,
      cloudMetrics?.configured
        ? `دلیل: ${String(cloudMetrics.error || "unknown").slice(0, 180)}`
        : `تنظیمات Metrics ناقصه. پیدا نشد: ${(cloudMetrics?.missing || []).join("، ") || "نامشخص"}`,
      `Config: Account ID ${env.CF_ACCOUNT_ID ? "✅" : "❌"} • Worker Name ${env.CF_WORKER_NAME ? "✅" : "❌"} • API Token ${env.CF_API_TOKEN ? "✅" : "❌"}`
    );
  }

  lines.push(
    ``,
    `ℹ️ عدد Cache بالا تخمین آبجکت‌های خود کد است، نه کل RAM V8. RAM کل isolate فقط از Cloudflare Metrics قابل خواندن است.`
  );

  await sendLongText(adminChatId, lines.join("\n"), env);
}

async function timedHealthProbe(label, fn) {
  const startedAt = Date.now();
  try {
    const value = await fn();
    return {
      label,
      ok: true,
      ms: Math.max(0, Date.now() - startedAt),
      value,
      error: "",
    };
  } catch (error) {
    return {
      label,
      ok: false,
      ms: Math.max(0, Date.now() - startedAt),
      value: null,
      error: String(error?.message || error || "unknown"),
    };
  }
}

function healthProbeLine(name, probe, warnMs, suffix = "") {
  const icon = !probe?.ok ? "❌" : Number(probe.ms || 0) > warnMs ? "🟡" : "✅";
  const extra = suffix ? ` • ${suffix}` : "";
  if (!probe?.ok) {
    return `${icon} ${name}: ${probe?.ms ?? "-"} ms • ${String(probe?.error || "error").slice(0, 90)}`;
  }
  return `${icon} ${name}: ${probe.ms} ms${extra}`;
}

function healthBar(percent, width = 14) {
  const safe = Math.max(0, Math.min(100, Number(percent) || 0));
  const filled = Math.round((safe / 100) * width);
  return `[${"█".repeat(filled)}${"░".repeat(width - filled)}] ${safe < 0.1 && safe > 0 ? "<0.1" : safe.toFixed(safe < 10 ? 1 : 0)}%`;
}

function formatBytes(value) {
  const bytes = Math.max(0, Number(value) || 0);
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatMs(value) {
  const ms = Math.max(0, Number(value) || 0);
  if (ms < 1) return `${Math.round(ms * 1000)} µs`;
  return `${ms.toFixed(ms < 10 ? 2 : 1)} ms`;
}

function estimateValueBytes(value) {
  try {
    return new TextEncoder().encode(typeof value === "string" ? value : JSON.stringify(value)).byteLength;
  } catch {
    return 0;
  }
}

function estimateMapBytes(map) {
  let total = 0;
  for (const [key, value] of map.entries()) {
    total += estimateValueBytes(key) + estimateValueBytes(value) + 32;
  }
  return total;
}

function getVisibleCacheHealth() {
  const maps = [catBurstMemory, partialPishMemory, catStatsMemory, aiJobMemory, downloadCooldownMemory, userActivityMemory, processedUpdateMemory, broadcastJobMemory];
  const mapBytes = maps.reduce((sum, map) => sum + estimateMapBytes(map), 0);
  return {
    totalBytes: mapBytes,
    totalEntries: maps.reduce((sum, map) => sum + map.size, 0),
    mapCount: maps.length,
  };
}

async function countKeysByPrefix(namespace, prefix) {
  if (!namespace?.list) return 0;
  let count = 0;
  let cursor;
  let pages = 0;
  do {
    const options = { prefix, limit: 1000 };
    if (cursor) options.cursor = cursor;
    const page = await kvListWithRetry(namespace, options);
    count += page.keys?.length || 0;
    pages += 1;
    if (page.list_complete) return count;
    cursor = page.cursor;
  } while (cursor && pages < HEALTH_KV_COUNT_MAX_PAGES);

  // /health نباید روی Free Plan خودش با listهای خیلی بزرگ سقف subrequest را پر کند.
  return cursor ? `${count}+` : count;
}

async function getHealthStorageCounts(env) {
  if (!env.BOT_KV) {
    return { users: 0, starters: 0, daily: 0, disabled: 0, broadcasts: 0 };
  }
  try {
    const [users, starters, daily, disabled, broadcasts] = await Promise.all([
      countKeysByPrefix(env.BOT_KV, USER_KEY_PREFIX),
      countKeysByPrefix(env.BOT_KV, STARTER_KEY_PREFIX),
      countKeysByPrefix(env.BOT_KV, DAILY_KEY_PREFIX),
      countKeysByPrefix(env.BOT_KV, DISABLED_KEY_PREFIX),
      countKeysByPrefix(env.BOT_KV, BROADCAST_ARCHIVE_PREFIX),
    ]);
    return { users, starters, daily, disabled, broadcasts };
  } catch (error) {
    logDetailedError("health storage counts", error);
    return { users: 0, starters: 0, daily: 0, disabled: 0, broadcasts: 0 };
  }
}

function percentileMedian(values) {
  const sorted = values.map(Number).filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function percentileMax(values) {
  const nums = values.map(Number).filter(Number.isFinite);
  return nums.length ? Math.max(...nums) : 0;
}

function getCloudflareMetricsConfigStatus(env) {
  const accountTag = String(env?.CF_ACCOUNT_ID || "").trim();
  const apiToken = String(env?.CF_API_TOKEN || "").trim();
  const scriptName = String(env?.CF_WORKER_NAME || "").trim();
  const missing = [];

  if (!accountTag) missing.push("CF_ACCOUNT_ID");
  if (!scriptName) missing.push("CF_WORKER_NAME");
  if (!apiToken) missing.push("CF_API_TOKEN");

  return {
    accountTag,
    apiToken,
    scriptName,
    configured: missing.length === 0,
    missing,
  };
}

async function fetchCloudflareWorkerHealthMetrics(env) {
  const config = getCloudflareMetricsConfigStatus(env);
  const { accountTag, apiToken, scriptName, configured, missing } = config;

  if (!configured) {
    return {
      ok: false,
      configured: false,
      missing,
      error: `Missing: ${missing.join(", ")}`,
    };
  }

  // Cloudflare Analytics real-time نیست و چند دقیقه آخر ممکن است هنوز aggregate نشده باشد.
  // از کوتاه‌ترین بازه شروع می‌کنیم و فقط اگر خالی بود تا 24 ساعت عقب می‌رویم.
  let lastError = "";
  for (const windowMinutes of HEALTH_CF_FALLBACK_WINDOWS_MINUTES) {
    try {
      const result = await queryCloudflareWorkerHealthMetricsWindow(
        accountTag,
        apiToken,
        scriptName,
        windowMinutes
      );

      if (result?.metrics && Number(result.metrics.requests || 0) > 0) {
        return {
          ok: true,
          configured: true,
          metrics: result.metrics,
          windowMinutes,
        };
      }

      lastError = `No metrics for script ${scriptName} in the last ${windowMinutes} minutes`;
    } catch (error) {
      lastError = String(error?.message || error || "unknown");
      // خطای واقعی auth/schema را با چهار query پشت‌سرهم تکرار نمی‌کنیم.
      if (!/No metrics/i.test(lastError)) break;
    }
  }

  return {
    ok: false,
    configured: true,
    error: lastError || `No metrics for script ${scriptName}`,
  };
}

async function queryCloudflareWorkerHealthMetricsWindow(
  accountTag,
  apiToken,
  scriptName,
  windowMinutes
) {
  const now = new Date();
  // چند دقیقه آخر را کنار می‌گذاریم چون Cloudflare خودش اعلام کرده aggregation کمی lag دارد.
  const end = new Date(now.getTime() - HEALTH_CF_AGGREGATION_LAG_MINUTES * 60 * 1000);
  const start = new Date(end.getTime() - Number(windowMinutes || HEALTH_CF_WINDOW_MINUTES) * 60 * 1000);

  const query = `query GetWorkersHealth($accountTag: string, $datetimeStart: string, $datetimeEnd: string, $scriptName: string) {
    viewer {
      accounts(filter: {accountTag: $accountTag}) {
        workersInvocationsAdaptive(limit: 1000, filter: {
          scriptName: $scriptName,
          datetime_geq: $datetimeStart,
          datetime_leq: $datetimeEnd
        }) {
          sum { requests errors subrequests }
          quantiles {
            cpuTimeP50
            cpuTimeP99
            memoryUsageBytesP50
            memoryUsageBytesP90
            memoryUsageBytesP99
          }
        }
      }
    }
  }`;

  const response = await fetchWithTimeout(
    "https://api.cloudflare.com/client/v4/graphql",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          accountTag,
          datetimeStart: start.toISOString(),
          datetimeEnd: end.toISOString(),
          scriptName,
        },
      }),
    },
    HEALTH_PROBE_TIMEOUT_MS
  );

  const data = await response.json();
  if (!response.ok || data?.errors?.length) {
    throw new Error(data?.errors?.[0]?.message || `HTTP ${response.status}`);
  }

  const rows = data?.data?.viewer?.accounts?.[0]?.workersInvocationsAdaptive || [];
  if (!rows.length) {
    return { metrics: null };
  }

  const metrics = {
    requests: rows.reduce((sum, row) => sum + Number(row?.sum?.requests || 0), 0),
    errors: rows.reduce((sum, row) => sum + Number(row?.sum?.errors || 0), 0),
    subrequests: rows.reduce((sum, row) => sum + Number(row?.sum?.subrequests || 0), 0),
    cpuP50Us: percentileMedian(rows.map((row) => row?.quantiles?.cpuTimeP50)),
    cpuP99Us: percentileMax(rows.map((row) => row?.quantiles?.cpuTimeP99)),
    memoryP50: percentileMedian(rows.map((row) => row?.quantiles?.memoryUsageBytesP50)),
    memoryP90: percentileMax(rows.map((row) => row?.quantiles?.memoryUsageBytesP90)),
    memoryP99: percentileMax(rows.map((row) => row?.quantiles?.memoryUsageBytesP99)),
  };

  return { metrics };
}

function calculateHealthScore({ kvProbe, telegramProbe, catProbe, chanceProbe, aiOk, cron, cloudMetrics }) {
  let score = 100;

  if (!kvProbe?.ok) score -= 25;
  if (!telegramProbe?.ok) score -= 30;
  if (!catProbe?.ok) score -= 10;
  if (!chanceProbe?.ok) score -= 5;
  if (!aiOk) score -= 15;
  if (cron?.status === "error") score -= 10;

  if (kvProbe?.ok && kvProbe.ms > 500) score -= 4;
  if (telegramProbe?.ok && telegramProbe.ms > 2000) score -= 5;
  if (catProbe?.ok && catProbe.ms > 2500) score -= 3;

  if (cloudMetrics?.ok) {
    const m = cloudMetrics.metrics;
    const requestCount = Number(m.requests || 0);
    const memP90Pct = (Number(m.memoryP90 || 0) / WORKER_MEMORY_LIMIT_BYTES) * 100;
    const cpuP99Ms = Number(m.cpuP99Us || 0) / 1000;
    const errorRate = requestCount > 0 ? Number(m.errors || 0) / requestCount : 0;
    const statisticallyUsefulSample = requestCount >= 20;

    if (memP90Pct >= 95) score -= 20;
    else if (memP90Pct >= 80) score -= 10;
    else if (memP90Pct >= 65) score -= 5;

    if (statisticallyUsefulSample) {
      if (cpuP99Ms > WORKER_FREE_CPU_LIMIT_MS) score -= 15;
      else if (cpuP99Ms > WORKER_FREE_CPU_LIMIT_MS * 0.8) score -= 8;

      if (errorRate >= 0.1) score -= 15;
      else if (errorRate >= 0.03) score -= 8;
      else if (errorRate > 0) score -= 3;
    }
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

async function runScheduledDaily(cronInfo, env) {
  const started = {
    ...cronInfo,
    status: "running",
  };

  try {
    const stats = await sendDailyCats(env);
    const finished = {
      ...started,
      status: "success",
      finishedAt: new Date().toISOString(),
      stats,
    };

    await safeKvPut(env.BOT_KV, CRON_LAST_KEY, JSON.stringify(finished));
    console.log("CRON FINISHED", JSON.stringify(finished));
    return stats;
  } catch (error) {
    const failed = {
      ...started,
      status: "error",
      finishedAt: new Date().toISOString(),
      error: String(error?.message || error),
    };

    await safeKvPut(env.BOT_KV, CRON_LAST_KEY, JSON.stringify(failed));
    logDetailedError("CRON FAILED", error);
    throw error;
  }
}

async function getAnonSession(chatId, env, createIfMissing = false) {
  const key = `${ANON_SESSION_PREFIX}${chatId}`;
  const raw = await safeKvGet(env.BOT_KV, key, null);
  const existing = parseJsonValue(raw, null);

  if (existing?.id) return existing;
  if (!createIfMissing) return null;

  const session = {
    id: crypto.randomUUID().replace(/-/g, "").slice(0, 5).toUpperCase(),
    createdAt: new Date().toISOString(),
  };

  const saved = await safeKvPut(
    env.BOT_KV,
    key,
    JSON.stringify(session),
    { expirationTtl: ANON_SESSION_TTL }
  );

  return saved ? session : null;
}

async function handleAnonCloseCommand(message, env) {
  const repliedMessageId = message.reply_to_message?.message_id;

  if (!repliedMessageId) {
    await sendText(
      message.chat.id,
      "روی پیام ناشناس یا راهنمای زیرش Reply کن و بعد /anonclose بفرست.",
      env
    );
    return;
  }

  const targetChatId = await getKvWithRetry(
    env.BOT_KV,
    `anon_admin_route:${repliedMessageId}`
  );

  if (!targetChatId) {
    await sendText(message.chat.id, "این پیام به گفت‌وگوی ناشناس وصل نیست.", env);
    return;
  }

  await Promise.all([
    safeKvPut(env.BOT_KV, `${ANON_CLOSED_PREFIX}${targetChatId}`, "1", {
      expirationTtl: REPLY_ROUTE_TTL,
    }),
    safeKvDelete(env.BOT_KV, `${ANON_SESSION_PREFIX}${targetChatId}`),
    safeKvDelete(env.BOT_KV, `anon_wait:${targetChatId}`),
  ]);

  await deleteKeysByPrefix(env.BOT_KV, `anon_user_route:${targetChatId}:`);

  await sendText(
    targetChatId,
    "این گفت‌وگوی ناشناس بسته شد. برای پیام جدید دوباره «پیام ناشناس» رو بزن.",
    env,
    { reply_markup: await getMainKeyboard(targetChatId, env) }
  );

  await sendText(message.chat.id, "گفت‌وگوی ناشناس بسته شد. 🔒", env);
}

async function prepareAnonymousMessage(chatId, env) {
  await safeKvDelete(env.BOT_KV, `${ANON_CLOSED_PREFIX}${chatId}`);
  await getAnonSession(chatId, env, true);

  await safeKvPut(
    env.BOT_KV,
    `anon_wait:${chatId}`,
    "1",
    { expirationTtl: ANON_WAIT_TTL }
  );

  await sendText(chatId, ANON_PROMPT, env, {
    reply_markup: cancelKeyboard(),
  });
}

async function sendAnonymousText(
  chatId,
  text,
  env,
  isContinuation
) {
  if (!isContinuation) {
    await safeKvDelete(env.BOT_KV, `${ANON_CLOSED_PREFIX}${chatId}`);
    await getAnonSession(chatId, env, true);
  }

  if (!env.ADMIN_CHAT_ID) {
    await sendText(
      chatId,
      "مدیر هنوز تنظیمات خودش رو کامل نکرده.",
      env,
      { reply_markup: await getMainKeyboard(chatId, env) }
    );

    return;
  }

  const contentResult = await sendText(
    env.ADMIN_CHAT_ID,
    text,
    env
  );

  const delivered = await registerAdminReplyRoutes(
    contentResult,
    chatId,
    env,
    isContinuation
  );

  await sendDeliveryResult(chatId, delivered, env);
}

async function copyAnonymousMessage(
  message,
  env,
  isContinuation
) {
  const chatId = String(message.chat.id);

  if (!isContinuation) {
    await safeKvDelete(env.BOT_KV, `${ANON_CLOSED_PREFIX}${chatId}`);
    await getAnonSession(chatId, env, true);
  }

  if (!env.ADMIN_CHAT_ID) {
    await sendText(
      chatId,
      "مدیر هنوز تنظیمات خودش رو کامل نکرده.",
      env,
      { reply_markup: await getMainKeyboard(chatId, env) }
    );

    return;
  }

  const contentResult = await telegram(
    env,
    "copyMessage",
    {
      chat_id: env.ADMIN_CHAT_ID,
      from_chat_id: chatId,
      message_id: message.message_id,
    }
  );

  const delivered = await registerAdminReplyRoutes(
    contentResult,
    chatId,
    env,
    isContinuation
  );

  if (!delivered && !isContinuation) {
    await safeKvPut(
      env.BOT_KV,
      `anon_wait:${chatId}`,
      "1",
      { expirationTtl: ANON_WAIT_TTL }
    );
  }

  await sendDeliveryResult(chatId, delivered, env);
}

async function registerAdminReplyRoutes(
  contentResult,
  userChatId,
  env,
  isContinuation
) {
  const contentMessageId =
    getTelegramMessageId(contentResult);

  if (!contentResult?.ok || !contentMessageId) {
    return false;
  }

  await saveAdminRoute(
    contentMessageId,
    userChatId,
    env
  );

  const session = await getAnonSession(userChatId, env, true);
  const threadId = session?.id || "?????";
  const noteText = isContinuation
    ? `🕵️ ادامه گفت‌وگوی ناشناس #${threadId}
برای جواب روی پیام بالا یا همین راهنما ریپلای کن.`
    : `🕵️ پیام ناشناس جدید #${threadId}
برای جواب روی پیام بالا یا همین راهنما ریپلای کن.`;

  const noteResult = await sendText(
    env.ADMIN_CHAT_ID,
    noteText,
    env
  );

  const noteMessageId =
    getTelegramMessageId(noteResult);

  if (noteResult?.ok && noteMessageId) {
    await saveAdminRoute(
      noteMessageId,
      userChatId,
      env
    );
  }

  return true;
}

async function saveAdminRoute(
  messageId,
  userChatId,
  env
) {
  return safeKvPut(
    env.BOT_KV,
    `anon_admin_route:${messageId}`,
    String(userChatId),
    { expirationTtl: REPLY_ROUTE_TTL }
  );
}

async function saveUserRoute(
  userChatId,
  messageId,
  env
) {
  return safeKvPut(
    env.BOT_KV,
    `anon_user_route:${userChatId}:${messageId}`,
    "1",
    { expirationTtl: REPLY_ROUTE_TTL }
  );
}

async function handleAdminReply(message, env) {
  const repliedMessageId =
    message.reply_to_message?.message_id;

  if (!repliedMessageId) {
    return false;
  }

  const targetChatId = await getKvWithRetry(
    env.BOT_KV,
    `anon_admin_route:${repliedMessageId}`
  );

  if (!targetChatId) {
    await sendText(
      message.chat.id,
      "مسیر این پیام پیدا نشد. روی خود پیام ناشناس یا پیام راهنمای زیرش ریپلای کن. اگه تازه رسیده، چند ثانیه دندون رو جیگر بذار.",
      env
    );

    return true;
  }

  const copiedResult = await telegram(
    env,
    "copyMessage",
    {
      chat_id: targetChatId,
      from_chat_id: message.chat.id,
      message_id: message.message_id,
    }
  );

  const copiedMessageId =
    getTelegramMessageId(copiedResult);

  if (copiedResult?.ok && copiedMessageId) {
    await saveUserRoute(
      targetChatId,
      copiedMessageId,
      env
    );

    await sendText(
      message.chat.id,
      "فرستادم. حالا صبر کن ببین جواب می‌ده یا نه. آخه وقت سر خاروندن نداره.",
      env
    );
  } else {
    await sendText(
      message.chat.id,
      "نرفت. احتمالاً کاربر ربات رو بسته یا بلاک کرده.",
      env
    );
  }

  return true;
}

async function handleUserThreadReply(
  message,
  env
) {
  const chatId = String(message.chat.id);
  const closed = await safeKvGet(env.BOT_KV, `${ANON_CLOSED_PREFIX}${chatId}`, null);

  if (closed) {
    await sendText(
      chatId,
      "این گفت‌وگو بسته شده. برای پیام جدید «پیام ناشناس» رو بزن.",
      env,
      { reply_markup: await getMainKeyboard(chatId, env) }
    );
    return true;
  }

  const repliedMessageId =
    message.reply_to_message?.message_id;

  if (!repliedMessageId) {
    return false;
  }

  const routeExists = await getKvWithRetry(
    env.BOT_KV,
    `anon_user_route:${chatId}:${repliedMessageId}`
  );

  if (!routeExists) {
    return false;
  }

  await copyAnonymousMessage(
    message,
    env,
    true
  );

  return true;
}

async function sendDeliveryResult(
  chatId,
  delivered,
  env
) {
  if (delivered) {
    await sendText(
      chatId,
      "ارسال شد. حالا صبر کن ببین جواب می‌ده یا نه چون سرش خیلی شلوغه. پیشته ",
      env,
      {
        reply_markup: await getMainKeyboard(chatId, env),
      }
    );
  } else {
    await sendText(
      chatId,
      "نشد. دوباره بفرست، شاید این بار با پیامت حال کردم.",
      env,
      {
        reply_markup: cancelKeyboard(),
      }
    );
  }
}

function getTelegramMessageId(result) {
  return result?.result?.message_id || null;
}

async function getKvWithRetry(namespace, key) {
  const delays = [0, 400, 900, 1600];

  for (const delay of delays) {
    if (delay > 0) {
      await sleep(delay);
    }

    let value = null;
    try {
      value = await kvGetWithRetry(namespace, key);
    } catch (error) {
      logDetailedError(`KV route get ${key}`, error);
    }

    if (value !== null) {
      return value;
    }
  }

  return null;
}

function tehranDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

function dateKeyDiffDays(fromKey, toKey) {
  const from = Date.parse(`${fromKey}T00:00:00Z`);
  const to = Date.parse(`${toKey}T00:00:00Z`);
  if (!Number.isFinite(from) || !Number.isFinite(to)) return 999;
  return Math.round((to - from) / (24 * 60 * 60 * 1000));
}

function getStreakTitle(count) {
  const n = Number(count || 0);
  if (n >= 100) return "دیگه نگرانتم";
  if (n >= 60) return "مقام عالی‌رتبه میو";
  if (n >= 30) return "وزیر امور گربه‌ها";
  if (n >= 14) return "عضو انجمن پیش‌پیش";
  if (n >= 7) return "گربه‌باز رسمی";
  if (n >= 3) return "پیش‌پیش‌کار";
  if (n >= 1) return "تازه‌وارد پیش‌پیش";
  return "هنوز بدون لقب";
}

function getLegendaryRank(count) {
  const n = Number(count || 0);
  if (n >= 10) return "افسانه‌ی زنده‌ی گربه‌های کمیاب";
  if (n >= 5) return "نگهبان گربه‌های لجندری";
  if (n >= 3) return "شکارچی لجندری";
  if (n >= 1) return "گربه‌شناس افسانه‌ای";
  return "هنوز هیچ گربه لجندری ندیدی";
}

function tehranHour(date = new Date()) {
  const hour = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tehran",
    hour: "2-digit",
    hour12: false,
  }).format(date);
  return Number(hour);
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

async function getCatStats(chatId, env) {
  const now = Date.now();
  const cached = catStatsMemory.get(String(chatId));

  if (cached) {
    cached.lastAccessAt = now;
    return { ...cached.data };
  }

  const raw = await safeKvGet(
    env.BOT_KV,
    `${CAT_STATS_KEY_PREFIX}${chatId}`,
    null
  );
  const data = parseJsonValue(raw, {}) || {};

  catStatsMemory.set(String(chatId), {
    data: { ...data },
    dirty: false,
    lastFlushAt: 0,
    lastAccessAt: now,
  });
  pruneMemoryMap(catStatsMemory);

  return { ...data };
}

async function saveCatStats(chatId, stats, env, options = {}) {
  const id = String(chatId);
  const now = Date.now();
  const existing = catStatsMemory.get(id) || {
    data: {},
    dirty: false,
    lastFlushAt: 0,
    lastAccessAt: now,
  };

  existing.data = { ...(stats || {}) };
  existing.dirty = true;
  existing.lastAccessAt = now;
  catStatsMemory.set(id, existing);
  pruneMemoryMap(catStatsMemory);

  const force = Boolean(options.force);
  const shouldFlush =
    force ||
    !existing.lastFlushAt ||
    now - existing.lastFlushAt >= CAT_STATS_FLUSH_INTERVAL_MS;

  if (shouldFlush) {
    const ok = await safeKvPut(
      env.BOT_KV,
      `${CAT_STATS_KEY_PREFIX}${chatId}`,
      JSON.stringify(existing.data)
    );

    if (ok) {
      existing.dirty = false;
      existing.lastFlushAt = now;
    }
  }

  return { ...existing.data };
}

async function mutateCatStats(chatId, env, mutator, options = {}) {
  const stats = await getCatStats(chatId, env);
  const next = mutator({ ...stats }) || stats;
  return saveCatStats(chatId, next, env, options);
}

async function flushCatStats(chatId, env) {
  const entry = catStatsMemory.get(String(chatId));
  if (!entry?.dirty) {
    return true;
  }

  return Boolean(
    await saveCatStats(chatId, entry.data, env, { force: true })
  );
}

async function unlockAchievement(chatId, id, title, env) {
  try {
    const key = `${ACHIEVEMENT_KEY_PREFIX}${chatId}`;
    const raw = await safeKvGet(env.BOT_KV, key, null);
    const achievements = parseJsonValue(raw, {}) || {};

    if (achievements[id]) {
      return false;
    }

    const catalogInfo = ACHIEVEMENT_CATALOG[id] || {};
    achievements[id] = {
      unlockedAt: new Date().toISOString(),
      title: title || catalogInfo.title || id,
      detail: catalogInfo.detail || "",
    };
    const saved = await safeKvPut(
      env.BOT_KV,
      key,
      JSON.stringify(achievements)
    );

    // اگر quota پر باشد، اصل قابلیت نباید بخوابد.
    if (saved) {
      await sendText(chatId, `🏆 دستاورد مخفی باز شد: ${title}`, env);
    }

    return saved;
  } catch (error) {
    logDetailedError(`unlockAchievement ${id}`, error);
    return false;
  }
}

async function getAchievementCount(chatId, env) {
  const raw = await safeKvGet(
    env.BOT_KV,
    `${ACHIEVEMENT_KEY_PREFIX}${chatId}`,
    null
  );
  const achievements = parseJsonValue(raw, {}) || {};
  return Object.keys(achievements).length;
}

async function maybeWelcomeBack(chatId, visitInfo, env) {
  const days = Number(visitInfo?.absenceDays || 0);
  if (days < 14) return;

  const messages = [
    `${days} روز نبودی. گوربابات یادش بود.`,
    `بالاخره برگشتی. ${days} روزه خبری ازت نبود.`,
    `${days} روز غیبت؟ باشه. وانمود می‌کنم اهمیت ندادم.`,
  ];

  await sendText(chatId, pickRandom(messages), env);

  if (days >= 30) {
    await unlockAchievement(chatId, "return_from_void", "بازگشت از غیبت", env);
  }
}

async function registerCatBurst(chatId, env) {
  const id = String(chatId);
  const now = Date.now();
  let state = catBurstMemory.get(id);

  if (!state || now - Number(state.windowStartedAt || 0) > 120_000) {
    state = {
      windowStartedAt: now,
      count: 0,
      silentNext: false,
      lastAccessAt: now,
    };
  }

  if (state.silentNext) {
    catBurstMemory.set(id, {
      windowStartedAt: now,
      count: 0,
      silentNext: false,
      lastAccessAt: now,
    });
    pruneMemoryMap(catBurstMemory);
    return "silent";
  }

  if (now - Number(state.windowStartedAt || 0) > 60_000) {
    state.windowStartedAt = now;
    state.count = 0;
  }

  state.count = Number(state.count || 0) + 1;
  state.lastAccessAt = now;

  if (state.count >= 8) {
    state.silentNext = true;
    state.count = 0;
    state.windowStartedAt = now;
    catBurstMemory.set(id, state);
    pruneMemoryMap(catBurstMemory);
    return "warning";
  }

  catBurstMemory.set(id, state);
  pruneMemoryMap(catBurstMemory);
  return "ok";
}

async function recordPishPishRequest(chatId, env) {
  const today = tehranDateKey();
  const hour = tehranHour();

  const stats = await mutateCatStats(chatId, env, (old) => {
    const sameDay = old.dayKey === today;
    return {
      ...old,
      totalPishPish: Number(old.totalPishPish || 0) + 1,
      dayKey: today,
      todayPishPish: sameDay ? Number(old.todayPishPish || 0) + 1 : 1,
      nightPishPish:
        Number(old.nightPishPish || 0) + (hour >= 2 && hour < 5 ? 1 : 0),
      lastPishPishAt: new Date().toISOString(),
    };
  });

  if (Number(stats.todayPishPish || 0) === 10) {
    await unlockAchievement(chatId, "ten_in_a_day", "بیکاری پیشرفته", env);
  }

  if (
    hour >= 2 &&
    hour < 5 &&
    Number(stats.nightPishPish || 0) === 1
  ) {
    await unlockAchievement(chatId, "night_owl", "چرا بیداری؟", env);
  }

  return { stats, hour };
}

async function updateCatStreak(chatId, env) {
  const key = `${STREAK_KEY_PREFIX}${chatId}`;
  const today = tehranDateKey();
  const raw = await safeKvGet(env.BOT_KV, key, null);
  const old = parseJsonValue(raw, {}) || {};

  if (old.lastDate === today) {
    return {
      count: Number(old.count || 1),
      best: Number(old.best || old.count || 1),
      changed: false,
    };
  }

  const consecutive = old.lastDate && dateKeyDiffDays(old.lastDate, today) === 1;
  const count = consecutive ? Number(old.count || 0) + 1 : 1;
  const best = Math.max(Number(old.best || 0), count);

  const saved = await safeKvPut(
    env.BOT_KV,
    key,
    JSON.stringify({ count, best, lastDate: today })
  );

  return { count, best, changed: saved };
}

async function currentCatStreak(chatId, env) {
  const raw = await safeKvGet(
    env.BOT_KV,
    `${STREAK_KEY_PREFIX}${chatId}`,
    null
  );
  const streak = parseJsonValue(raw, null);
  if (!streak?.count) return { count: 0, best: 0 };

  const gap = dateKeyDiffDays(streak.lastDate, tehranDateKey());
  return {
    count: gap <= 1 ? Number(streak.count || 0) : 0,
    best: Number(streak.best || streak.count || 0),
  };
}

async function maybeAnnounceStreak(chatId, streak, env) {
  if (!streak.changed) return;

  const title = getStreakTitle(streak.count);
  await sendText(
    chatId,
    `🔥 استریک پیش‌پیش: ${streak.count} روز${streak.count === streak.best ? " 🏆" : ""}\n🎖 لقب: ${title}`,
    env
  );

  if (streak.count === 7) {
    await unlockAchievement(chatId, "streak_7", "هفت جان", env);
  }
  if (streak.count === 30) {
    await unlockAchievement(chatId, "streak_30", "وزارت امور گربه‌ها", env);
  }
  if (streak.count === 100) {
    await unlockAchievement(chatId, "streak_100", "دیگه واقعاً نگرانتم", env);
  }
}

async function handleStreakStatus(chatId, env) {
  const streak = await currentCatStreak(chatId, env);
  const achievementButton = {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "🏆 دستاوردهای من",
          callback_data: ACHIEVEMENTS_CALLBACK,
        },
      ]],
    },
  };

  if (!streak.count && !streak.best) {
    await sendText(
      chatId,
      "هنوز استریک پیش‌پیش نداری 😼",
      env,
      achievementButton
    );
    return;
  }

  await sendText(
    chatId,
    `🔥 استریک پیش‌پیش: ${streak.count} روز\n🏆 رکورد: ${streak.best} روز\n🎖 لقب: ${getStreakTitle(streak.count)}`,
    env,
    achievementButton
  );
}

function formatAchievementDate(value) {
  const raw = typeof value === "string"
    ? value
    : value?.unlockedAt || value?.at || "";

  const date = new Date(raw);
  if (!raw || Number.isNaN(date.getTime())) {
    return "زمان ثبت نامشخص";
  }

  try {
    return new Intl.DateTimeFormat("fa-IR", {
      timeZone: "Asia/Tehran",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

async function handleAchievementsCallback(callback, env) {
  const callbackId = callback.id;
  const chatId = callback.from?.id ? String(callback.from.id) : "";

  if (!chatId) {
    await answerCallback(callbackId, "کاربر رو پیدا نکردم.", env, true);
    return;
  }

  await answerCallback(callbackId, "دفتر افتخارات رو میارم…", env);

  const raw = await safeKvGet(
    env.BOT_KV,
    `${ACHIEVEMENT_KEY_PREFIX}${chatId}`,
    null
  );
  const achievements = parseJsonValue(raw, {}) || {};
  const entries = Object.entries(achievements);

  if (!entries.length) {
    await sendText(
      chatId,
      "🏆 هنوز هیچ دستاورد مخفی نگرفتی. بیشتر فضولی کن؛ راز کم ندارم 😼",
      env
    );
    return;
  }

  entries.sort((a, b) => {
    const av = typeof a[1] === "string" ? a[1] : a[1]?.unlockedAt || "";
    const bv = typeof b[1] === "string" ? b[1] : b[1]?.unlockedAt || "";
    return (Date.parse(av) || 0) - (Date.parse(bv) || 0);
  });

  const totalKnown = Object.keys(ACHIEVEMENT_CATALOG).length;
  const lines = [
    `🏆 دستاوردهای تو: ${entries.length} / ${totalKnown}`,
    "",
  ];

  entries.forEach(([id, value], index) => {
    const storedTitle =
      value && typeof value === "object"
        ? String(value.title || "")
        : "";
    const storedDetail =
      value && typeof value === "object"
        ? String(value.detail || "")
        : "";
    const info = ACHIEVEMENT_CATALOG[id] || {};

    lines.push(
      `${index + 1}. 🏅 ${storedTitle || info.title || id}`,
      `🔎 ${storedDetail || info.detail || "یک راز قدیمی که جزئیاتش تو پرونده گربه خاک خورده."}`,
      `🕒 ${formatAchievementDate(value)}`,
      ""
    );
  });

  await sendLongText(chatId, lines.join("\n"), env);
}

async function handleMewStats(chatId, env) {
  const [stats, streak, achievementCount] = await Promise.all([
    getCatStats(chatId, env),
    currentCatStreak(chatId, env),
    getAchievementCount(chatId, env),
  ]);

  const total = Number(stats.totalPishPish || 0);
  const irritation = Math.min(99, Math.floor(total / 3) + Number(stats.protests || 0) * 7);
  const lines = [
    "📊 آمار کاملاً حیاتی و بی‌مصرف",
    "",
    `🐱 پیش‌پیش کل: ${total}`,
    `🔥 استریک فعلی: ${streak.count} روز`,
    `🏆 بهترین استریک: ${streak.best} روز`,
    `🎖 لقب: ${getStreakTitle(streak.count)}`,
  ];

  // آمار اتفاق‌های مخفی فقط بعد از اولین بار دیده شدن ظاهر می‌شوند.
  if (Number(stats.legendaryCats || 0) > 0) {
    lines.push(
      `✨ گربه لجندری: ${Number(stats.legendaryCats || 0)}`,
      `👑 رتبه لجندری: ${getLegendaryRank(stats.legendaryCats)}`
    );
  }
  if (Number(stats.duckMistakes || 0) > 0) {
    lines.push(`🦆 اردک اشتباهی: ${Number(stats.duckMistakes || 0)}`);
  }
  if (Number(stats.extraCats || 0) > 0) {
    lines.push(`🐱🐱 گربه اضافه: ${Number(stats.extraCats || 0)}`);
  }
  if (Number(stats.sulks || 0) > 0) {
    lines.push(`😾 دفعات قهر گربه: ${Number(stats.sulks || 0)}`);
  }
  if (Number(stats.protests || 0) > 0) {
    lines.push(`🤐 اعتراض رسمی گوربابات: ${Number(stats.protests || 0)}`);
  }
  if (Number(stats.nightPishPish || 0) > 0) {
    lines.push(`🌙 پیش‌پیش ساعت نامناسب: ${Number(stats.nightPishPish || 0)}`);
  }
  if (Number(stats.halfPishPish || 0) > 0) {
    lines.push(`🧩 پیش‌پیش نصفه: ${Number(stats.halfPishPish || 0)}`);
  }

  lines.push(
    `🏅 دستاورد مخفی پیدا شده: ${achievementCount}`,
    `📉 احتمال اینکه گوربابات ازت خسته شده باشه: ${irritation}%`
  );

  await sendText(
    chatId,
    lines.join("\n"),
    env,
    {
      reply_markup: {
        inline_keyboard: [[
          {
            text: "🏆 دستاوردهای من",
            callback_data: ACHIEVEMENTS_CALLBACK,
          },
        ]],
      },
    }
  );
}

async function handleHalfPishPish(chatId, text, env) {
  const normalized = normalizeTriggerText(text);
  if (normalized !== "پیش") return false;

  const id = String(chatId);
  const now = Date.now();
  const waitingUntil = Number(partialPishMemory.get(id) || 0);
  const waiting = waitingUntil > now;

  await mutateCatStats(chatId, env, (stats) => ({
    ...stats,
    halfPishPish: Number(stats.halfPishPish || 0) + 1,
  }));

  if (!waiting) {
    partialPishMemory.set(id, now + 120_000);
    pruneMemoryMap(partialPishMemory);
    await sendText(chatId, "یکی دیگه‌ش کو؟", env);
    return true;
  }

  partialPishMemory.delete(id);
  await unlockAchievement(chatId, "half_pish", "جمله رو کامل کن", env);
  await sendCatForUser(chatId, env);
  return true;
}

async function handleHiddenEasterEgg(chatId, text, env) {
  if (!text || text.startsWith("/")) return false;
  const normalized = normalizeTriggerText(text).toLowerCase();
  if (!normalized) return false;

  const exact = (...values) => values.includes(normalized);

  if (exact("صدرا")) {
    await sendText(chatId, "دری وری آدم دنیا", env);
    await unlockAchievement(chatId, "sadr_word", "پرونده صدرا", env);
    return true;
  }

  if (exact("نازنین")) {
    await sendText(chatId, "داغ یک عشق قدیمو اومدی تازه کردی", env);
    await unlockAchievement(chatId, "nazanin_word", "عشق قدیمی", env);
    return true;
  }

  if (exact("محمد")) {
    await sendText(chatId, "میدونی این وضعیت بد نیست، خنده داره", env);
    await unlockAchievement(chatId, "mohammad_word", "وضعیت خنده‌دار", env);
    return true;
  }

  if (exact("اسدی")) {
    await sendText(chatId, "ربات از دسترس خارج شد.", env);
    await unlockAchievement(chatId, "asadi_word", "خروج از دسترس", env);
    return true;
  }

  if (exact("استوار اسدی")) {
    await sendText(chatId, "ربات رو از دسترس خارج کن", env);
    await unlockAchievement(chatId, "ostovar_asadi_word", "فرمان خروج", env);
    return true;
  }

  if (exact("دانشگاه فرهنگیان")) {
    await sendText(chatId, "بدترین جای دنیا", env);
    await unlockAchievement(chatId, "farhangian_word", "نقد دانشگاهی", env);
    return true;
  }

  const extraCatEgg = EXTRA_CAT_EASTER_EGGS.find((item) =>
    item.keys.some((key) => normalizeTriggerText(key).toLowerCase() === normalized)
  );

  if (extraCatEgg) {
    await sendText(chatId, extraCatEgg.response, env);
    await unlockAchievement(
      chatId,
      extraCatEgg.id,
      extraCatEgg.title,
      env
    );
    return true;
  }

  if (exact("میو", "میو میو", "میاو")) {
    await sendText(
      chatId,
      pickRandom([
        "خودت میو.",
        "شنیدم.",
        "واضح‌تر میو کن.",
        "لهجه‌ت قابل قبوله.",
      ]),
      env
    );
    await unlockAchievement(chatId, "cat_language", "مترجم میو", env);
    return true;
  }

  // فقط صدا زدن کوتاه؛ سؤال‌های واقعی درباره گوربابات باید به چت‌بات برسند.
  if (exact("گوربابات", "گور بابات", "گوربابا")) {
    await sendText(
      chatId,
      pickRandom(["صدام کردی؟", "هستم. متأسفانه.", "چی شده باز؟"]),
      env
    );
    await unlockAchievement(chatId, "said_name", "اسمش رو صدا زدی", env);
    return true;
  }

  if (exact("سگ", "هاپو", "واق واق")) {
    await sendText(chatId, "دیگه اسم اون موجودو اینجا نبر.", env);
    await unlockAchievement(chatId, "forbidden_word", "کلمه ممنوعه", env);
    return true;
  }

  if (normalized.includes("دوستم داری")) {
    await sendText(
      chatId,
      pickRandom([
        "سؤال سختیه. بعدی.",
        "به اندازه کافی که برات گربه بفرستم.",
        "این مصاحبه‌ست؟",
      ]),
      env
    );
    await unlockAchievement(chatId, "love_question", "سؤال احساسی ممنوعه", env);
    return true;
  }

  if (exact("پیشته", "پیش ته")) {
    await sendText(chatId, "پیشته پیشت.", env);
    await unlockAchievement(chatId, "pishteh", "پیشته پیشت", env);
    return true;
  }

  if (exact("امیرآقا", "امیر اقا", "امیر آقا", "حاج امیر")) {
    await sendText(
      chatId,
      "جان امیرآقا فدات شه. همه گربه‌های دنیا هم به فداش.",
      env
    );
    await unlockAchievement(chatId, "owner_name", "اسم حاجی اومد وسط", env);
    return true;
  }

  if (exact("pspsps", "pspspsps", "پس پس پس")) {
    await sendText(chatId, "عه. لهجه بین‌المللی پیش‌پیش.", env);
    await unlockAchievement(chatId, "international_pish", "پیش‌پیش بین‌المللی", env);
    await sendCatForUser(chatId, env);
    return true;
  }

  if (exact("ماهی", "تن ماهی")) {
    await sendText(
      chatId,
      pickRandom(["کجا؟", "اول ماهی رو بده بعد حرف می‌زنیم.", "این کلمه توجه منو جلب کرد."]),
      env
    );
    await unlockAchievement(chatId, "fish_bribe", "رشوه قابل قبول", env);
    return true;
  }

  if (exact("جعبه", "کارتن")) {
    await sendText(chatId, "اگه جا بشم، مال منه. قانون طبیعته.", env);
    await unlockAchievement(chatId, "box_law", "قانون جعبه", env);
    return true;
  }

  if (exact("لیزر", "نقطه قرمز", "نقطه ی قرمز")) {
    await sendText(chatId, "کجاست؟ ...نه بابا، اصلاً مهم نیست.", env);
    await unlockAchievement(chatId, "red_dot", "نقطه قرمز ممنوعه", env);
    return true;
  }

  if (exact("کنسرو", "پوچ", "غذای گربه")) {
    await sendText(chatId, "بالاخره حرف حساب زدی.", env);
    await unlockAchievement(chatId, "canned_food", "حرف حساب", env);
    return true;
  }

  if (exact("دامپزشک", "دام پزشک")) {
    await sendText(chatId, "اسم اون مکان رو جلوی من نیار.", env);
    await unlockAchievement(chatId, "vet_trauma", "خاطرات ویتامین و آمپول", env);
    return true;
  }

  if (
    exact(
      "نه جان",
      "۹ جان",
      "نه تا جان",
      "گربه نه جان دارد",
      "گربه ۹ جان دارد"
    )
  ) {
    await sendText(chatId, "شایعه‌ست. ولی بذار آدما باور کنن.", env);
    await unlockAchievement(chatId, "nine_lives", "حسابدار جان‌ها", env);
    return true;
  }

  if (exact("من گربه ام", "من گربه‌ام", "منم گربه ام", "منم گربه‌ام")) {
    await sendText(chatId, "مدرک؟ دم و سبیل رو ارائه کن.", env);
    await unlockAchievement(chatId, "self_cat", "ادعای گربه بودن", env);
    return true;
  }

  if (exact("404", "گربه 404", "cat 404")) {
    await sendText(chatId, "404: گربه پیدا نشد. احتمالاً رفته تو جعبه.", env);
    await unlockAchievement(chatId, "cat_404", "گربه پیدا نشد", env);
    return true;
  }

  if (exact("راز", "یه راز", "یک راز", "سرنخ")) {
    await sendText(
      chatId,
      pickRandom([
        "بعضی کلمه‌ها بیشتر از چیزی که باید توجه منو جلب می‌کنن. مثلاً چیزای قرمز.",
        "گربه‌ها جعبه، ماهی و ساعت‌های عجیب رو فراموش نمی‌کنن.",
        "اگه واقعاً دنبال راز می‌گردی، همه چیز با «پیش پیش» شروع نمی‌شه.",
      ]),
      env
    );
    await unlockAchievement(chatId, "secret_seeker", "فضول رسمی", env);
    return true;
  }

  if (exact("نخ قرمز", "کاموا", "نخ")) {
    await sendText(chatId, "تکونش نده... گفتم تکونش نده.", env);
    await unlockAchievement(chatId, "yarn_hunter", "شکارچی نخ", env);
    return true;
  }

  if (exact("کت نیپ", "کت‌نیپ", "catnip")) {
    await sendText(chatId, "مدرک داری؟ اینجا بازرسیه.", env);
    await unlockAchievement(chatId, "catnip_case", "پرونده سبز", env);
    return true;
  }

  if (exact("خیار", "خیار سبز")) {
    await sendText(chatId, "اون چیز سبزو یواش پشت سرم نذار.", env);
    await unlockAchievement(chatId, "cucumber_alert", "هشدار خیار", env);
    return true;
  }

  if (exact("کیبورد", "لپتاپ")) {
    await sendText(chatId, "برو کنار. دقیقاً روی دکمه‌ای می‌خوابم که لازم داری.", env);
    await unlockAchievement(chatId, "keyboard_cat", "مالک کیبورد", env);
    return true;
  }

  if (exact("پنجه", "پنجه بده")) {
    await sendText(chatId, "نه. سگ نیستم.", env);
    await unlockAchievement(chatId, "paw_request", "پنجه نمی‌دم", env);
    return true;
  }

  if (exact("موش", "موشه", "mouse")) {
    await sendText(chatId, pickRandom(["کجا؟ آدرس دقیق بده.", "این یکی دیگه شوخی نیست. موش کو؟", "حرف حساب بالاخره."]), env);
    await unlockAchievement(chatId, "mouse_radar", "رادار موش", env);
    return true;
  }

  if (exact("جاروبرقی", "جارو برقی", "vacuum")) {
    await sendText(chatId, "اون هیولای صداگنده رو خاموش کن بعد حرف بزن.", env);
    await unlockAchievement(chatId, "vacuum_enemy", "دشمن طبیعی", env);
    return true;
  }

  if (exact("حموم", "حمام", "آب", "آبتنی")) {
    await sendText(chatId, pickRandom(["نه.", "بحثو عوض کن.", "من خودم تمیزم. تو برو حموم."]), env);
    await unlockAchievement(chatId, "water_hater", "من خودم تمیزم", env);
    return true;
  }

  if (exact("بارون", "باران")) {
    await sendText(chatId, "پنجه‌هام خیس شه مسئولش تویی.", env);
    await unlockAchievement(chatId, "rain_paws", "پنجه خیس", env);
    return true;
  }

  if (exact("گربه سیاه", "گربه مشکی")) {
    await sendText(chatId, "بدشانسی نیست. فقط از بقیه شیک‌تره.", env);
    await unlockAchievement(chatId, "black_cat", "شیک‌تر از بقیه", env);
    return true;
  }

  if (exact("سبیل", "سبیلات")) {
    await sendText(chatId, "دست نزن. تجهیزات ناوبریه.", env);
    await unlockAchievement(chatId, "whisker_navigation", "تجهیزات ناوبری", env);
    return true;
  }

  if (exact("دم", "دمت")) {
    await sendText(chatId, "اون آنتن تعادله. مال دست زدن نیست.", env);
    await unlockAchievement(chatId, "tail_antenna", "آنتن تعادل", env);
    return true;
  }

  if (exact("مرغ", "مرغ بریون", "جوجه")) {
    await sendText(chatId, pickRandom(["ادامه بده. گوشم با توئه.", "جمله‌ت بالاخره ارزش شنیدن پیدا کرد.", "لوکیشن مرغ رو بفرست، سریع."]), env);
    await unlockAchievement(chatId, "chicken_interest", "لوکیشن مرغ", env);
    return true;
  }

  if (exact("شیر")) {
    await sendText(chatId, "شیرِ خوردنی یا اون یال‌داره؟ دقیق حرف بزن دوپا.", env);
    await unlockAchievement(chatId, "milk_question", "شیر کدوم شیر؟", env);
    return true;
  }

  if (exact("بیا بغلم", "بغل", "بغلم کن")) {
    await sendText(chatId, pickRandom(["سه ثانیه. بیشترش مالیات داره.", "اول رضایت‌نامه پنجه‌ای امضا کن.", "نه… خب شاید. زیاد ذوق نکن."]), env);
    await unlockAchievement(chatId, "hug_tax", "بغل با مالیات", env);
    return true;
  }

  if (exact("بوس", "بوس بده", "ماچ")) {
    await sendText(chatId, "خیلی رو داری. نهایتاً یه هدبامپ؛ همونو غنیمت بدون.", env);
    await unlockAchievement(chatId, "cat_kiss", "هدبامپ به‌جای بوس", env);
    return true;
  }

  if (exact("پاشو", "بلند شو")) {
    await sendText(chatId, "خودت دورم کار کن. من جای درست خوابیدم.", env);
    await unlockAchievement(chatId, "wake_cat", "مزاحم خواب", env);
    return true;
  }

  if (exact("بخواب", "برو بخواب")) {
    await sendText(chatId, "من روزی ۱۶ ساعت تمرین حرفه‌ای دارم. دخالت نکن.", env);
    await unlockAchievement(chatId, "sleep_professional", "خواب حرفه‌ای", env);
    return true;
  }

  if (exact("sudo", "sudo su", "root")) {
    await sendText(chatId, "دسترسی root فقط دست گربه‌ست. تو guest بمون.", env);
    await unlockAchievement(chatId, "root_cat", "گربه روت", env);
    return true;
  }

  if (exact("rm rf", "rm rf /", "rm -rf")) {
    await sendText(chatId, "نه خیر. این دفعه حتی منم اون‌قدر شرور نیستم.", env);
    await unlockAchievement(chatId, "rm_refusal", "حتی منم نه", env);
    return true;
  }

  if (exact("ctrl c", "کنترل سی")) {
    await sendText(chatId, "فکر کردی با Ctrl+C می‌تونی منو متوقف کنی؟ ناز بود.", env);
    await unlockAchievement(chatId, "ctrl_c_cat", "متوقف‌نشدنی", env);
    return true;
  }

  if (exact("alt f4", "آلت اف فور")) {
    await sendText(chatId, "خودت اول امتحانش کن. من نگاه می‌کنم 😼", env);
    await unlockAchievement(chatId, "alt_f4_cat", "خودت امتحان کن", env);
    return true;
  }

  if (exact("ping", "پینگ")) {
    await sendText(chatId, "pong. حالا برو یه کار مفیدتر بکن.", env);
    await unlockAchievement(chatId, "ping_pong", "پونگ پنجه‌ای", env);
    return true;
  }

  if (exact("میم", "meme")) {
    await sendText(chatId, "من خودم میمم. چرا واسطه می‌خوای؟", env);
    await unlockAchievement(chatId, "living_meme", "میم زنده", env);
    return true;
  }

  if (exact("افسانه", "لجندری", "legendary")) {
    await sendText(chatId, "بعضی گربه‌ها خیلی کم پیداشون می‌شه. بیشتر پیش‌پیش کن، شاید بختت باز شد.", env);
    await unlockAchievement(chatId, "legendary_hint", "بو بردی", env);
    return true;
  }

  if (exact("اردک", "جوجه اردک")) {
    await sendText(chatId, "اون اشتباه اداری هنوز تو پرونده‌م بازه. زیاد سؤال نکن.", env);
    await unlockAchievement(chatId, "duck_file", "پرونده اردک", env);
    return true;
  }

  if (exact("کوچه", "خیابون", "خیابان")) {
    await sendText(chatId, "قلمرو منه. آهسته رد شو و خوراکی بذار.", env);
    await unlockAchievement(chatId, "street_territory", "قلمرو گوربابات", env);
    return true;
  }

  return false;
}

async function maybeSendSpecialHourLine(chatId, hour, env) {
  let message = "";
  let chance = 0;

  if (hour >= 2 && hour < 5) {
    chance = 0.45;
    message = pickRandom([
      "این ساعت پیش‌پیش می‌کنی؟ باشه.",
      "ساعت رو دیدی؟ گربه‌ها خوابن.",
      "بخواب. این آخریه. شاید.",
    ]);
  } else if (hour >= 5 && hour < 8) {
    chance = 0.2;
    message = "صبح به این زودی؟ میخوای حلیم بپزی ؟.";
  } else if (hour >= 23 || hour < 2) {
    chance = 0.2;
    message = "آقاجان نصفه شبه ها..";
  }

  if (message && Math.random() < chance) {
    await sendText(chatId, message, env);
  }
}

async function sendCatForUser(chatId, env) {
  const burst = await registerCatBurst(chatId, env);
  const { stats, hour } = await recordPishPishRequest(chatId, env);

  if (burst === "warning") {
    await mutateCatStats(chatId, env, (old) => ({
      ...old,
      protests: Number(old.protests || 0) + 1,
    }), { force: true });
    await sendText(chatId, "کافیه.", env);
    await unlockAchievement(chatId, "atm_cat", "نوکر بابات غلام سیاه", env);
    return { ok: true, protest: true };
  }

  if (burst === "silent") {
    // سکوت اعتراضی واقعی: این درخواست عمداً هیچ پاسخی نمی‌گیرد.
    return { ok: true, silent: true };
  }

  const streak = await updateCatStreak(chatId, env);
  const roll = Math.random();
  let result = null;

  if (roll < 0.003) {
    await sendText(
      chatId,
      "👻 یه گربه نامرئی رد شد. عکسش رو هم طبیعتاً نمی‌تونی ببینی.",
      env
    );
    result = { ok: true, invisible: true };
    await unlockAchievement(chatId, "invisible_cat", "گربه‌ای که نبود", env);
  } else if (roll < 0.006) {
    result = await sendRandomCat(chatId, env, {
      caption: "🧑‍💼 این یکی مدیرعامله. جلسه داشت، با اکراه اومد.",
    });
    await unlockAchievement(chatId, "ceo_cat", "جلسه هیئت‌مدیره", env);
  } else if (roll < 0.009) {
    await sendText(
      chatId,
      "🔮 سیستم برای ۰.۸ ثانیه تشخیص داد خودت گربه‌ای. بعد پشیمون شد.",
      env
    );
    result = await sendRandomCat(chatId, env);
    await unlockAchievement(chatId, "temporary_cat", "گربه موقت", env);
  } else if (roll < 0.021) {
    await mutateCatStats(chatId, env, (old) => ({
      ...old,
      legendaryCats: Number(old.legendaryCats || 0) + 1,
      chanceEvents: Number(old.chanceEvents || 0) + 1,
    }), { force: true });
    const freshStats = await getCatStats(chatId, env);
    await sendText(
      chatId,
      `✨ گربه لجندری پیدا کردی.\n👑 ${getLegendaryRank(freshStats.legendaryCats)}`,
      env
    );
    result = await sendRandomCat(chatId, env);
    await unlockAchievement(chatId, "legendary_cat", "این یکی معمولی نبود", env);
  } else if (roll < 0.033) {
    await mutateCatStats(chatId, env, (old) => ({
      ...old,
      duckMistakes: Number(old.duckMistakes || 0) + 1,
      chanceEvents: Number(old.chanceEvents || 0) + 1,
    }), { force: true });
    await sendText(chatId, "گربه‌هامون حال نداشتن بیان. اردک  فرستادم برات.", env);
    result = await sendRandomDuck(chatId, env);
    await unlockAchievement(chatId, "duck_mistake", "عه وا ببخشید دستم خورد", env);
  } else if (roll < 0.051) {
    await mutateCatStats(chatId, env, (old) => ({
      ...old,
      sulks: Number(old.sulks || 0) + 1,
      chanceEvents: Number(old.chanceEvents || 0) + 1,
    }), { force: true });
    await sendText(chatId, pickRandom([
      "گربه قهر کرده. امروز خودش نخواست بیاد.",
      "نه. خودش گفت نمیام.",
      "گربه‌ت امروز مرخصیه. مشکلی داری؟.",
    ]), env);
    result = { ok: true, sulk: true };
    await unlockAchievement(chatId, "cat_sulk", "رد شدن توسط گربه", env);
  } else if (roll < 0.076) {
    await mutateCatStats(chatId, env, (old) => ({
      ...old,
      extraCats: Number(old.extraCats || 0) + 1,
      chanceEvents: Number(old.chanceEvents || 0) + 1,
    }), { force: true });
    const first = await sendRandomCat(chatId, env);
    if (first?.ok) {
      await sleep(250);
      result = await sendRandomCat(chatId, env);
      await sendText(chatId, "یکی اضافه افتاد.", env);
      await unlockAchievement(chatId, "extra_cat", "اضافه‌کاری", env);
    } else {
      result = first;
    }
  } else {
    result = await sendRandomCat(chatId, env);
  }

  await maybeAnnounceStreak(chatId, streak, env);
  await maybeSendSpecialHourLine(chatId, hour, env);

  return result;
}

function normalizeTriggerText(value = "") {
  return String(value)
    .trim()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\u200f\u202a-\u202e]/g, " ")
    .replace(/[.,!?؟،؛:؛"'«»()\[\]{}ـ_\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isCatTriggerText(value = "") {
  const normalized = normalizeTriggerText(value)
    .replace(/^🐱\s*/, "")
    .trim();

  return normalized === CAT_TRIGGER || normalized.includes(CAT_TRIGGER);
}


async function handleVoiceTranscription(message, env) {
  const chatId = String(message.chat.id);

  await telegram(env, "sendChatAction", {
    chat_id: chatId,
    action: "typing",
  });

  const spokenText = String(
    await transcribeTelegramVoice(message.voice, env)
  ).trim();

  if (!spokenText) {
    await sendText(
      chatId,
      "🎙 چیزی از این ویس نفهمیدم. یا دوباره بفرست یا واضح‌تر حرف بزن، موجود بی‌پنجه.",
      env,
      {
        reply_parameters: {
          message_id: message.message_id,
          allow_sending_without_reply: true,
        },
      }
    );
    return;
  }

  const visibleTranscript = spokenText.length > 3500
    ? `${spokenText.slice(0, 3499).trimEnd()}…`
    : spokenText;

  await sendText(
    chatId,
    `🎙 متن ویس:\n\n${visibleTranscript}`,
    env,
    {
      reply_parameters: {
        message_id: message.message_id,
        allow_sending_without_reply: true,
      },
      reply_markup: {
        inline_keyboard: [[
          {
            text: "😼 نظر گوربابات",
            callback_data: VOICE_OPINION_CALLBACK,
          },
        ]],
      },
    }
  );

  // قابلیت قدیمی «پیش پیش» صوتی حفظ می‌شود.
  if (isCatTriggerText(spokenText)) {
    await sendCatForUser(chatId, env);
  }
}

async function handleVoiceOpinionCallback(callback, env) {
  const callbackId = callback.id;
  const message = callback.message;
  const chatId = message?.chat?.id ? String(message.chat.id) : "";
  const messageId = message?.message_id;
  const prefix = "🎙 متن ویس:";
  const rawText = String(message?.text || "").trim();
  const transcript = rawText.startsWith(prefix)
    ? rawText.slice(prefix.length).trim()
    : rawText;

  if (!chatId || !messageId || !transcript) {
    await answerCallback(
      callbackId,
      "متن ویس رو پیدا نکردم. دوباره ویس بفرست.",
      env,
      true
    );
    return;
  }

  const jobKey = `voice:${chatId}:${messageId}`;
  const now = Date.now();
  const activeUntil = Number(aiJobMemory.get(jobKey) || 0);

  if (activeUntil > now) {
    await answerCallback(callbackId, "دارم نظر می‌دم. پنجه‌مو نپیچون 😾", env);
    return;
  }

  aiJobMemory.set(jobKey, now + 60_000);
  pruneMemoryMap(aiJobMemory);

  await answerCallback(callbackId, "باشه، نظرمو می‌گم…", env);
  await Promise.all([
    clearInlineKeyboard(message, env),
    telegram(env, "sendChatAction", {
      chat_id: chatId,
      action: "typing",
    }),
  ]);

  try {
    const reply = await generateGorbabatReply(transcript, env);
    await sendText(chatId, String(reply || "").slice(0, 3800), env, {
      reply_parameters: {
        message_id: messageId,
        allow_sending_without_reply: true,
      },
    });
  } catch (error) {
    logDetailedError("voice opinion AI", error);
    await sendText(
      chatId,
      "😾 نظرم تو مغزم گیر کرد. یه بار دیگه ویس رو بفرست.",
      env,
      {
        reply_parameters: {
          message_id: messageId,
          allow_sending_without_reply: true,
        },
      }
    );
  } finally {
    aiJobMemory.delete(jobKey);
  }
}

async function transcribeTelegramVoice(voice, env) {
  if (!voice?.file_id) {
    return "";
  }

  if (!env.AI) {
    console.error("Workers AI binding named AI is missing; voice trigger is disabled.");
    return "";
  }

  try {
    if (Number(voice.file_size || 0) > VOICE_MAX_FILE_BYTES) {
      console.warn("Voice file skipped because it is too large", {
        fileSize: Number(voice.file_size || 0),
        max: VOICE_MAX_FILE_BYTES,
      });
      return "";
    }

    const fileInfo = await telegram(env, "getFile", {
      file_id: voice.file_id,
    });

    const filePath = fileInfo?.result?.file_path;

    if (!fileInfo?.ok || !filePath) {
      return "";
    }

    const audioResponse = await fetchWithTimeout(
      `https://api.telegram.org/file/bot${env.BOT_TOKEN}/${filePath}`,
      { method: "GET" },
      VOICE_DOWNLOAD_TIMEOUT_MS
    );

    if (!audioResponse.ok) {
      console.error("Telegram voice download failed:", audioResponse.status);
      return "";
    }

    const audioBuffer = await audioResponse.arrayBuffer();
    const audioBase64 = arrayBufferToBase64(audioBuffer);

    const result = await withPromiseTimeout(
      env.AI.run(
        "@cf/openai/whisper-large-v3-turbo",
        {
          audio: audioBase64,
          task: "transcribe",
          language: "fa",
          vad_filter: true,
          initial_prompt: "گفتار فارسی است. عبارت مهم ممکن است «پیش پیش» باشد.",
        }
      ),
      AI_REQUEST_TIMEOUT_MS,
      "Whisper AI"
    );

    return result?.text?.trim() || "";
  } catch (error) {
    console.error("Workers AI voice transcription failed:", error);
    return "";
  }
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(
      ...bytes.subarray(i, i + chunkSize)
    );
  }

  return btoa(binary);
}

async function getRandomDuckUrl() {
  try {
    const response = await fetchWithTimeout(
      "https://ducks.now/api/v0/random/",
      { method: "GET" },
      DUCK_REQUEST_TIMEOUT_MS
    );

    if (!response.ok) {
      console.error("Duck API error:", response.status);
      return "";
    }

    const data = await response.json();
    return data?.download_url || data?.image_url || "";
  } catch (error) {
    console.error("Random duck failed:", error);
    return "";
  }
}

async function sendRandomDuck(chatId, env) {
  const duckUrl = await getRandomDuckUrl();

  if (!duckUrl) {
    await sendText(chatId, "اردک جایگزین هم نیومد. این یکی رو بگیر.", env);
    return sendRandomCat(chatId, env);
  }

  const result = await telegram(env, "sendPhoto", {
    chat_id: chatId,
    photo: duckUrl,
  });

  if (!result?.ok) {
    await sendText(chatId, "اردک وسط راه منصرف شد. گربه می‌فرستم.", env);
    return sendRandomCat(chatId, env);
  }

  return result;
}

async function sendRandomCat(chatId, env, extra = {}) {
  const randomCatUrl =
    `https://cataas.com/cat?random=${crypto.randomUUID()}`;

  return telegram(env, "sendPhoto", {
    chat_id: chatId,
    photo: randomCatUrl,
    ...extra,
  });
}

async function sendDailyCats(env) {
  const [allDailyIds, disabledIds] = await Promise.all([
    listChatIdsByPrefix(env.BOT_KV, DAILY_KEY_PREFIX),
    listChatIdsByPrefix(env.BOT_KV, DISABLED_KEY_PREFIX),
  ]);
  const disabled = new Set(disabledIds);
  const chatIds = allDailyIds.filter((id) => !disabled.has(id));

  const stats = {
    recipients: chatIds.length,
    sent: 0,
    failed: 0,
    removed: 0,
  };

  for (let index = 0; index < chatIds.length; index += 6) {
    const group = chatIds.slice(index, index + 6);

    const results = await Promise.all(
      group.map(async (chatId) => {
        const result = await sendRandomCat(chatId, env, { caption: "میو." });

        if (result?.ok) {
          return "sent";
        }

        if (isTelegramGone(result)) {
          await forgetUser(chatId, env);
          return "removed";
        }

        return "failed";
      })
    );

    for (const status of results) {
      if (status === "sent") stats.sent += 1;
      else if (status === "removed") stats.removed += 1;
      else stats.failed += 1;
    }

    if (index + 6 < chatIds.length) {
      await sleep(1100);
    }
  }

  return stats;
}

async function sendLongText(chatId, text, env) {
  const maxLength = 3800;
  let remaining = String(text || "");

  while (remaining.length > maxLength) {
    let cut = remaining.lastIndexOf("\n", maxLength);
    if (cut < maxLength * 0.6) cut = maxLength;
    const part = remaining.slice(0, cut).trim();
    remaining = remaining.slice(cut).trim();
    if (part) await sendText(chatId, part, env);
  }

  if (remaining) {
    await sendText(chatId, remaining, env);
  }
}

async function sendText(
  chatId,
  text,
  env,
  extra = {}
) {
  return telegram(env, "sendMessage", {
    chat_id: chatId,
    text,
    ...extra,
  });
}

async function telegram(
  env,
  method,
  payload
) {
  const endpoint = `https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetchWithTimeout(
        endpoint,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        TELEGRAM_REQUEST_TIMEOUT_MS
      );

      const raw = await response.text();
      let result;
      try {
        result = raw ? JSON.parse(raw) : null;
      } catch {
        return {
          ok: false,
          error_code: response.status,
          description: `Telegram ${method} returned non-JSON HTTP ${response.status}`,
        };
      }

      if (result?.ok) return result;

      console.error(
        `Telegram ${method} error:`,
        result?.error_code || response.status,
        result?.description || "unknown"
      );

      const retryAfter = Number(result?.parameters?.retry_after || 0);
      if (
        attempt === 0 &&
        Number(result?.error_code) === 429 &&
        retryAfter > 0 &&
        retryAfter <= 3
      ) {
        await sleep(retryAfter * 1000 + 100);
        continue;
      }

      return result || {
        ok: false,
        error_code: response.status,
        description: `Telegram ${method} failed`,
      };
    } catch (error) {
      console.error(`Telegram ${method} request failed:`, error);
      // Do not blindly retry send/copy/media calls after a timeout: the request
      // may have reached Telegram and retrying can duplicate visible messages.
      return { ok: false, description: String(error?.message || error) };
    }
  }

  return { ok: false, description: `Telegram ${method} retry exhausted` };
}

function logDetailedError(label, error) {
  console.error(label, {
    name: error?.name || "Error",
    message: error?.message || String(error || ""),
    stack: error?.stack || "",
    cause: error?.cause || null,
  });
}

async function kvListWithRetry(namespace, options = {}) {
  if (!namespace?.list) {
    throw new Error("KV list skipped: BOT_KV binding is missing");
  }

  let lastError = null;
  for (const delay of KV_TRANSIENT_RETRY_DELAYS_MS) {
    if (delay > 0) await sleep(delay);
    try {
      return await namespace.list(options);
    } catch (error) {
      lastError = error;
      logDetailedError("KV list retry", error);
    }
  }

  throw lastError || new Error("KV list failed");
}

async function kvGetWithRetry(namespace, key) {
  if (!namespace?.get) {
    throw new Error(`KV get skipped: BOT_KV binding is missing (${key})`);
  }

  let lastError = null;
  for (const delay of KV_TRANSIENT_RETRY_DELAYS_MS) {
    if (delay > 0) await sleep(delay);
    try {
      return await namespace.get(key);
    } catch (error) {
      lastError = error;
      logDetailedError(`KV get retry ${key}`, error);
    }
  }

  throw lastError || new Error(`KV get failed for ${key}`);
}

async function safeKvGet(namespace, key, fallback = null) {
  try {
    const value = await kvGetWithRetry(namespace, key);
    return value === null ? fallback : value;
  } catch (error) {
    console.error(`KV get exhausted retries for ${key}`);
    return fallback;
  }
}

async function safeKvPut(namespace, key, value, options) {
  if (!namespace?.put) {
    console.error("KV put skipped: BOT_KV binding is missing", key);
    return false;
  }
  let lastError = null;
  for (const delay of KV_TRANSIENT_RETRY_DELAYS_MS) {
    if (delay > 0) await sleep(delay);
    try {
      await namespace.put(key, value, options);
      return true;
    } catch (error) {
      lastError = error;
      logDetailedError(`KV put retry ${key}`, error);
    }
  }
  if (lastError) console.error(`KV put exhausted retries for ${key}`);
  return false;
}

async function safeKvDelete(namespace, key) {
  if (!namespace?.delete) {
    console.error("KV delete skipped: BOT_KV binding is missing", key);
    return false;
  }
  let lastError = null;
  for (const delay of KV_TRANSIENT_RETRY_DELAYS_MS) {
    if (delay > 0) await sleep(delay);
    try {
      await namespace.delete(key);
      return true;
    } catch (error) {
      lastError = error;
      logDetailedError(`KV delete retry ${key}`, error);
    }
  }
  if (lastError) console.error(`KV delete exhausted retries for ${key}`);
  return false;
}


function pruneExpiringMemoryMap(map, now = Date.now()) {
  for (const [key, expiresAt] of map.entries()) {
    if (Number(expiresAt || 0) <= now) map.delete(key);
  }
  pruneMemoryMap(map);
}

function pruneMemoryMap(map) {
  if (map.size <= MEMORY_MAP_LIMIT) {
    return;
  }

  const removeCount = map.size - MEMORY_MAP_LIMIT;
  let removed = 0;

  for (const key of map.keys()) {
    map.delete(key);
    removed += 1;
    if (removed >= removeCount) break;
  }
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function withPromiseTimeout(promise, timeoutMs, label = "operation") {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`${label} timed out after ${timeoutMs}ms`)),
          timeoutMs
        );
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
