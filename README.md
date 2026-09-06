# 😼 گوربابات — v2.8.0

گوربابات یک ربات تلگرام فارسی با شخصیت گربه‌ای است که روی **Cloudflare Workers** اجرا می‌شود و از **Telegram Bot API، Workers AI و Cloudflare KV** استفاده می‌کند.

این Repository Snapshot نسخه‌ی کامل **v2.8.0** است و تمام تغییرات مهمی را که بعد از ریپوی قبلی **v2.1.2** تا این نسخه انجام شده، در `CHANGELOG.md` و `MIGRATION-v2.1.2-to-v2.8.0.md` ثبت می‌کند.

## وضعیت فعلی

- Latest version: **v2.8.0**
- Runtime: **Cloudflare Workers**
- Storage: **Cloudflare KV**
- AI: **Workers AI**
- Mini App: **mewMONEY!**
- Main AI model: `@cf/qwen/qwen3-30b-a3b-fp8`
- Fallback AI model: `@cf/zai-org/glm-4.7-flash`
- Voice model: `@cf/openai/whisper-large-v3-turbo`

---

## قابلیت‌های اصلی

### 🐱 پیش پیش
با متن «پیش پیش» عکس گربه ارسال می‌شود. سیستم استریک، آمار، اتفاق‌های شانسی، Achievement و Easter Eggهای متعدد روی همین مسیر وجود دارد.

### 💬 چت با گوربابات
پیام عادی خصوصی ابتدا با پاسخ گربه‌ای مواجه می‌شود و با دکمه‌ی ترجمه، پاسخ Workers AI تولید می‌شود. Qwen مدل اصلی و GLM fallback است.

### 🎙 Voice
تمام Voiceهای خصوصی قابل Transcribe شدن هستند. متن ویس نمایش داده می‌شود و دکمه‌ی «نظر گوربابات» می‌تواند Transcript را برای پاسخ AI بفرستد.

### 🏆 Achievement
Achievementها برای Easter Eggهای متنی، رفتارها، اتفاق‌های تصادفی، استریک و مسیرهای مخفی ثبت می‌شوند. UI دستاوردها تاریخ Unlock را نمایش می‌دهد.

### 🥷 پیام ناشناس
پیام ناشناس با پشتیبانی از متن و انواع Media، Reply دوطرفه و امکان بستن Session توسط ادمین.

### 🗞 its modam💫
آرشیو پیام‌های Broadcast/مهم با مرور Oldest → Newest و Pagination.

### 🐦 Twitter / X Downloader
فقط لینک مستقیم و عمومی Status از Twitter/X پذیرفته می‌شود. اولین Media در یک پیام تمیز ارسال می‌شود و Footer اختصاصی گوربابات حفظ شده است.

### 🔔 میو روزانه
ارسال خودکار گربه با Cloudflare Cron Trigger و قابلیت روشن/خاموش کردن توسط کاربر.

---

# 💸 mewMONEY!

Mini App اقتصادی گوربابات در مسیر:

```text
/economy
```

API:

```text
/api/economy
```

History API:

```text
/api/economy/history
```

Health:

```text
/api/economy/health
```

دکمه‌ی Mini App کنار کادر تایپ تلگرام:

```text
mewMONEY!
```

## Sourceها

Source selector فعلی:

- `TGJU`
- `Milli`
- `MelliGold`
- `TalaSea`
- `Smart average`

Default:

```text
TGJU
```

`Milli`، `MelliGold` و `TalaSea` در حال حاضر Sourceهای طلای 18K هستند. Smart average برای GOLD 18K از این Referenceها استفاده می‌کند و Outlier Filtering را اعمال می‌کند. برای Assetهایی که فقط TGJU Quote معتبر دارد، Smart average طبیعتاً ممکن است عملاً همان Quote تک‌منبعی را نمایش دهد.

## Assetها و ترتیب نمایش

ترتیب All:

```text
USD
USDT

GOLD 24K
GOLD 18K
MESGHAL
XAU
EMAMI
BAHAR
HALF
QUARTER
GRAM

IQD
EUR
GBP
AED
TRY
CAD
BRENT
```

### TGJU Currency
برای Currencyها از Profile اختصاصی TGJU استفاده می‌شود، نه صفحه‌ی Aggregate قدیمی. قیمت‌های داخلی TGJU که با IRR منتشر می‌شوند قبل از نمایش به **Toman** تبدیل می‌شوند.

### USDT
برای Tether از `crypto-tether` TGJU استفاده می‌شود و **Rial price** خوانده می‌شود، نه نرخ جهانی تقریباً 1 USD.

## UI

- UI انگلیسی است.
- تنها جمله‌ی فارسی صفحه:
  `به امید عبور از این روزهای سخت 🤍`
- فقط همان جمله RTL است.
- تاریخ شمسی/Jalali با اعداد لاتین و نام ماه Finglish نمایش داده می‌شود؛ مثل:
  `14 Shahrivar 1405`
- Tap روی کارت، پنجه‌ی مستقل `🐾` ایجاد می‌کند و چند Tap می‌تواند چند پنجه هم‌زمان بسازد.

## 10-Tap Easter Egg

برای کارت‌های Toman:

- هر 10 Tap → قیمت نمایشی 10,000 Toman کم می‌شود.
- کاهش با Counter نزولی انیمیت می‌شود.
- قیمت واقعی API تغییر نمی‌کند.
- بعد از آخرین کاهش، قیمت 10 ثانیه پایین می‌ماند.
- سپس طی حدود 1.2 ثانیه با Counter افزایشی به قیمت واقعی Source برمی‌گردد.
- Milestoneهای سریع Queue می‌شوند.

## Price History

بالای **تمام کارت‌ها** دکمه‌ی `⋯` وجود دارد.

با زدن آن:

- نمودار تغییرات همان Asset + همان Source باز می‌شود.
- بازه‌های `24H` و `7D` موجودند.
- داده‌ی History در `BOT_KV` ذخیره می‌شود.
- حداکثر یک Snapshot برای هر Source در هر 15 دقیقه ثبت می‌شود.
- Retention فعلی 7 روز است.
- نمودار از **قیمت خام Source** استفاده می‌کند، نه قیمت کاهش‌یافته‌ی Easter Egg.

History از لحظه‌ی Deploy/استفاده‌ی این نسخه شروع به ساخته‌شدن می‌کند؛ بنابراین Repository به‌تنهایی شامل دیتای تاریخی گذشته نیست.

---

# 👑 دستورات

## عمومی

```text
/start
/help
/id
/daily_on
/daily_off
/daily
/streak
/mewstats
/anon
/cancel
/economy
```

## ادمین

```text
/stats
/users
/starters
/userstats
/setupminiapp
/health
/helth
/broadcast
/anonclose
/testdaily
/cronstatus
/adminhelp
```

---

# 🏗 معماری

```text
Telegram
   │
   ▼
Cloudflare Worker
   ├── Telegram Bot API
   ├── Workers AI
   │    ├── Qwen3 30B
   │    ├── GLM-4.7-Flash
   │    └── Whisper Large V3 Turbo
   ├── Cloudflare KV
   │    ├── User/Profile state
   │    ├── Daily / Streak / Achievements
   │    ├── Anonymous routing
   │    ├── Broadcast drafts/archive
   │    └── mewMONEY! price history
   ├── TGJU
   ├── Milli / MelliGold / TalaSea
   ├── FxTwitter
   ├── Cataas
   └── Ducks API
```

---

# 📁 ساختار Repository

```text
.
├── worker.js
├── README.md
├── CHANGELOG.md
├── MIGRATION-v2.1.2-to-v2.8.0.md
├── DEPLOY.md
├── CONFIG.md
├── ARCHITECTURE.md
├── wrangler.toml.example
├── TEST-REPORT.txt
├── .gitignore
└── docs/
    ├── legacy/
    └── releases/
```

جزئیات کامل Deploy و Bindingها در `DEPLOY.md` و `CONFIG.md` است.
