# 🐱🦆 Gorba Bot

https://t.me/gorbabat_bot

یک ربات تلگرام فارسی و بامزه که روی **Cloudflare Workers** اجرا می‌شود و برای درخواست‌های «پیش پیش» و «کوئک کوئک» عکس گربه و اردک می‌فرستد. ربات از پیام صوتی، میو روزانه، پیام ناشناس، استریک، آمار کاربران و ابزارهای مدیریتی هم پشتیبانی می‌کند.

> این پروژه برای اجرا روی Cloudflare Workers نوشته شده است.

## ✨ قابلیت‌ها

- 🐱 `پیش پیش` → عکس تصادفی گربه
- 🦆 `کوئک کوئک` → عکس تصادفی اردک
- 🎙️ تشخیص «پیش پیش» و «کوئک کوئک» از Voice با Cloudflare Workers AI
- 🔔/🔕 میو روزانه با دکمه‌ی سوئیچی
- ⏰ ارسال خودکار گربه با Cron Trigger
- 💬 پیام ناشناس دوطرفه بین کاربر و مدیر
- 🔒 امکان بستن گفت‌وگوی ناشناس توسط مدیر
- 🔥 استریک روزانه‌ی «پیش پیش»
- 👥 ثبت کاربران، نام، username و آخرین فعالیت
- 📊 آمار کاربران و کاربران فعال
- 📣 Broadcast با Preview و تأیید قبل از ارسال
- 🎯 Broadcast هدفمند برای کاربران فعال یا کاربران دارای میو روزانه
- ❤️ Health Check برای KV، Telegram، Workers AI و سرویس‌های عکس
- 🧹 حذف خودکار کاربران بلاک‌شده/غیرفعال از لیست‌ها

## 🗂️ ساختار پروژه

```text
.
├── worker.js                 # کد اصلی Cloudflare Worker
├── README.md                 # همین راهنما
├── .gitignore                # جلوگیری از انتشار فایل‌های حساس
├── .dev.vars.example         # نمونه متغیرهای محلی، بدون مقدار واقعی
├── wrangler.toml.example     # نمونه تنظیمات Wrangler
└── SECURITY.md               # نکات امنیتی مهم
```

## ✅ چگونه گوربا بات بسازیم؟

برای اجرای کامل ربات به این موارد نیاز داری:

- یک Telegram Bot و `BOT_TOKEN`
- یک Cloudflare Worker
- یک Cloudflare KV Namespace با Binding به نام `BOT_KV`
- یک Workers AI Binding با نام دقیق `AI` برای تشخیص Voice
- `ADMIN_CHAT_ID` مدیر ربات
- یک `WEBHOOK_SECRET`

## 🔐 متغیرها و Secrets


```text
BOT_TOKEN
WEBHOOK_SECRET
ADMIN_CHAT_ID
```

در Cloudflare Dashboard آن‌ها را در بخش **Settings → Variables and Secrets** تنظیم کن.

Bindingهای لازم:

```text
BOT_KV   → KV Namespace
AI       → Workers AI
```

## 🚀 راه‌اندازی روی Cloudflare Dashboard

### 1. کد

محتوای `worker.js` را داخل Worker قرار بده و Deploy کن.

### 2. KV

یک KV Namespace وصل کن و نام Binding را دقیقاً این بگذار:

```text
BOT_KV
```

### 3. Workers AI

یک Workers AI Binding اضافه کن و نام آن را دقیقاً این بگذار:

```text
AI
```

### 4. Secrets

این سه مقدار را اضافه کن:

```text
BOT_TOKEN=<telegram bot token>
WEBHOOK_SECRET=<random secret>
ADMIN_CHAT_ID=<numeric telegram chat id>
```

### 5. Webhook تلگرام

با مقادیر خودت Webhook را ثبت کن:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -d "url=https://<YOUR_WORKER>.workers.dev" \
  -d "secret_token=<YOUR_WEBHOOK_SECRET>"
```

### 6. Cron Trigger

برای دو ارسال روزانه می‌توانی این دو Cron را تنظیم کنی:

```text
30 6 * * *
30 16 * * *
```

Cloudflare Cron از UTC استفاده می‌کند. این دو زمان معادل حدود ۱۰:۰۰ و ۲۰:۰۰ به وقت تهران با UTC+3:30 هستند.

عکس‌هایی که از Cron یا `/testdaily` ارسال می‌شوند کپشن زیر را دارند:

```text
میو.
```

عکس‌های عادی «پیش پیش» بدون کپشن ارسال می‌شوند.

## 👤 دستورات کاربر

```text
/start
/help
/streak
/id
/cancel
/daily
```

همچنین کاربر می‌تواند از دکمه‌های زیر استفاده کند:

```text
🐱 پیش پیش
🦆 کوئک کوئک
🥷 پیام ناشناس
🔔 فعال کردن میو روزانه
🔕 قطع میو روزانه
```

## 🛡️ دستورات مدیر

دسترسی به این دستورات با `ADMIN_CHAT_ID` کنترل می‌شود:

```text
/adminhelp
/stats
/users
/starters
/health
/testdaily
/cronstatus
/anonclose
```

### Broadcast

ارسال به همه:

```text
/broadcast متن پیام
```

فقط کاربران فعال ۷ روز اخیر:

```text
/broadcast active7 متن پیام
```

فقط کاربران دارای میو روزانه:

```text
/broadcast daily متن پیام
```

برای Broadcast عکس، Voice، ویدیو یا فایل، روی پیام موردنظر Reply کن و بفرست:

```text
/broadcast
```

قبل از ارسال، ربات Preview و دکمه‌ی تأیید/لغو نشان می‌دهد.

## 👥 کاربران و آمار

`/users` اطلاعات کاربران شناخته‌شده را نمایش می‌دهد و تا جای ممکن با Telegram `getChat` اطلاعات فعلی کاربر را تازه می‌کند:

- نام
- `@username` در صورت وجود
- Telegram numeric ID
- آخرین فعالیت
- وضعیت میو روزانه

توجه: بعضی کاربران Telegram اصلاً username ندارند. در این حالت ID عددی شناسه‌ی قابل اتکاتر کاربر است.

`/starters` کسانی را نشان می‌دهد که از زمان فعال بودن ثبت Starter، `/start` زده‌اند.

## 🥷 پیام ناشناس

کاربر با دکمه‌ی «پیام ناشناس» می‌تواند متن، عکس، Voice، ویدیو، فایل یا استیکر بفرستد.

برای هر مکالمه یک شناسه‌ی ناشناس ساخته می‌شود تا چند گفت‌وگو با هم قاطی نشوند. مدیر می‌تواند با Reply پاسخ دهد و کاربر هم با Reply ادامه دهد.

برای بستن گفت‌وگو، مدیر روی پیام همان مکالمه Reply می‌کند و می‌فرستد:

```text
/anonclose
```

## 🔥 استریک

هر روزی که کاربر حداقل یک بار «پیش پیش» موفق داشته باشد، استریک او به‌روزرسانی می‌شود. تریگر متنی و Voice هر دو حساب می‌شوند.

```text
/streak
```

## ❤️ Health Check

مدیر می‌تواند وضعیت بخش‌های اصلی را بررسی کند:

```text
/health
```

این بررسی شامل KV، Telegram API، Workers AI، سرویس عکس گربه، سرویس عکس اردک، تعداد کاربران و آخرین وضعیت Cron است.

## 🌐 سرویس‌های استفاده‌شده

- Telegram Bot API
- Cloudflare Workers
- Cloudflare KV
- Cloudflare Workers AI (`@cf/openai/whisper-large-v3-turbo`)
- Cataas برای تصاویر گربه
- Ducks.now برای تصاویر اردک

## 🔒 امنیت

- هیچ Token یا Secret واقعی را Commit نکن.
- فایل `.dev.vars` در `.gitignore` قرار گرفته است.
- اگر Token تلگرام یا Secret تصادفاً روی GitHub منتشر شد، فقط پاک کردن Commit کافی نیست؛ مقدار را فوراً Rotate/تعویض کن.
- مخفی بودن نام دستورات مدیر یک مکانیزم امنیتی نیست؛ امنیت دستورات مدیر باید با `ADMIN_CHAT_ID` اعمال شود که در این پروژه همین کار انجام شده است.

جزئیات بیشتر در [`SECURITY.md`](SECURITY.md) آمده است.

## 🧪 تست بعد از Deploy

از اکانت مدیر:

```text
/health
/stats
/users
/testdaily
/cronstatus
```

برای تست کاربر:

```text
پیش پیش
کوئک کوئک
/streak
```

بعد Voice بفرست و داخلش «پیش پیش» یا «کوئک کوئک» بگو.

https://t.me/gorbabat_bot
https://t.me/gorbabat_bot
https://t.me/gorbabat_bot
