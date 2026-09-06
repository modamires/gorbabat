# Changelog

این فایل تغییرات مهم گوربابات را از **ریپوی قبلی v2.1.2** تا Snapshot فعلی **v2.8.0** ثبت می‌کند.

> نکته: بعضی نسخه‌های میانی Release Note مستقل نداشتند. برای آن نسخه‌ها، این Changelog بر اساس Source Snapshotهای همان Release و Diffهای موجود جمع‌بندی شده است.

---

## [v2.8.0]

### mewMONEY! 10-Tap Recovery
- بعد از هر 10 Tap روی کارت Toman، قیمت نمایشی 10,000 Toman کاهش پیدا می‌کند.
- قیمت کاهش‌یافته 10 ثانیه باقی می‌ماند.
- سپس طی حدود 1.2 ثانیه با Counter افزایشی به قیمت واقعی Source برمی‌گردد.
- Milestoneهای 20/30/... Tap Queue می‌شوند.
- Timer با Milestone جدید Restart می‌شود.
- قیمت Backend/API هیچ‌وقت تغییر نمی‌کند.

---

## [v2.7.9]

### Price History
- دکمه‌ی `⋯` به تمام Price Cardها اضافه شد.
- نمودار همان Asset و همان Source در Bottom Sheet باز می‌شود.
- بازه‌های 24H و 7D.
- History API جدید: `/api/economy/history`.
- ذخیره History در `BOT_KV`.
- یک Snapshot فشرده برای هر Source در هر 15 دقیقه.
- Retention هفت‌روزه و سقف حدود 680 Snapshot.
- History برای TGJU، Milli، MelliGold، TalaSea و Smart average.
- Chart click از Paw و 10-Tap Counter جدا شد.
- نمودار همیشه Raw Source Price را نمایش می‌دهد.

---

## [v2.7.8]

### Branding
- برند صفحه Mini App دقیقاً به `mewMONEY!` تغییر کرد.

### Price Tap Easter Egg
- هر 10 Tap روی کارت Toman = 10,000 Toman کاهش نمایشی.
- Counter نزولی حدود 900ms.
- Milestoneهای سریع Queue می‌شوند.
- قیمت نمایشی زیر صفر نمی‌رود.
- Backend Price دست‌نخورده می‌ماند.
- Multi-paw مستقل حفظ شد.

---

## [v2.7.7]

- متن Telegram composer-side Mini App button به `mewMONEY!` تغییر کرد.
- `/setupminiapp` برای ثبت متن جدید استفاده می‌شود.

---

## [v2.7.6]

### Bot-facing Branding
- تمام متن‌های فارسی ربات از «میوقتصاد» به «میو مانی» تغییر کردند.
- Welcome، Help، Persona Context، `/setupminiapp` و `/economy` آپدیت شدند.

---

## [v2.7.5]

### Sources
- Tasnim به‌طور کامل از Source Registry، Selector، Fetch/Parser و Health حذف شد.
- Sourceهای فعلی: TGJU، Milli، MelliGold، TalaSea، Smart average.

### USDT
- Tether اضافه شد.
- TGJU `crypto-tether` استفاده می‌شود.
- `Rial price` خوانده و IRR → Toman می‌شود؛ Global 1 USD اشتباهاً Price ایران تلقی نمی‌شود.

### Card Order
ترتیب ثابت:
1. USD
2. USDT
3. Gold
4. Coins
5. Remaining FX
6. Brent

---

## [v2.7.4]

### TGJU Currency Fix
- صفحه Aggregate قدیمی Currency کنار گذاشته شد.
- USD/EUR/GBP/AED/TRY/CAD/IQD از Profileهای اختصاصی TGJU خوانده شدند.
- Parse هر صفحه به Asset مربوط به همان Profile محدود شد تا Sidebar باعث Cross-contamination نشود.
- تبدیل IRR → Toman صریح و تست شد.
- Cache Namespace تغییر کرد تا Data قدیمی باقی نماند.

### Tasnim Currency Fix
- Parser جمله‌بندی‌های جدید Tasnim برای USD/EUR/AED مقاوم‌تر شد.
- فروش/خرید و Daily Change از هم تفکیک شدند.
- Daily market article به‌عنوان مسیر دوم Parse Currency اضافه شد.
- این مسیر بعداً در v2.7.5 با حذف Tasnim کنار گذاشته شد.

---

## [v2.7.3]

- برند Mini App به `MeONEY؟! 🐾` و سپس در نسخه‌های بعدی به فرم نهایی تغییر یافت.
- اصلاح `Shahrivar` در تاریخ شمسی/Finglish.
- Milli، MelliGold و TalaSea به Source Selector اضافه شدند.
- Smart average همچنان قابل انتخاب ماند.

---

## [v2.7.2]

### Jalali/Finglish
- Calendar صفحه به Persian/Jalali برگردانده شد.
- Latin digits و نام ماه لاتین/Finglish.
- تنها Subtitle فارسی RTL است.

### Gold References
- Milli
- MelliGold
- TalaSea
برای GOLD 18K اضافه شدند.
- Site رسمی اولویت دارد و Public feed رسمی می‌تواند Fallback باشد.
- Referenceهای Gold تحت Outlier Filtering قرار می‌گیرند.

### Paw
- حرکت پنجه تا حدود 46px به بالا افزایش یافت.
- هر Tap یک Paw جدید مستقل می‌سازد.
- Paw قبلی Kill/Restart نمی‌شود.

---

## [v2.7.1]

### Economy Source Policy
- Sourceهای اصلی به TGJU + Tasnim محدود شدند.
- Default از Average به TGJU تغییر کرد.
- Smart average باقی ماند.
- ESTJT، Mesghal و AlanChand حذف شدند.

### Tasnim Expansion
- Market/Gold/Coin، Currency و Energy به‌صورت Channelهای مستقل.
- جلوگیری از Blend کردن Official Exchange Center FX با TGJU Free-market FX.
- UI کاملاً انگلیسی بجز Subtitle فارسی.

> Tasnim در v2.7.5 کاملاً حذف شد.

---

## [v2.7.0] — Reliability & Debug Audit

### Economy
- TGJU به صفحات Current و Deterministic منتقل شد.
- XAU mapping تکمیل شد.
- Concurrency TGJU محدود شد.
- Sanity Check برای x10/x100 Unit Error.
- Robust consensus cluster جای MAD-only Aggregate قبلی را گرفت.
- Two-source conflict بدون Average کورکورانه حل می‌شود.
- Null Change Regression رفع شد.
- Fresh + 6h stale cache fallback.
- Mini App timeout، JSON content-type validation و CSP/Permissions-Policy.

### Worker Reliability
- In-isolate Telegram update dedupe با Retry-safe marker removal.
- Voice/Twitter/Heavy admin و Callbackها Await می‌شوند.
- AI/Whisper timeout.
- Voice file size guard و download timeout.
- KV PUT/DELETE retry.
- Direct runtime KV mutation حذف شد.
- Telegram non-JSON response handling و 429 short retry.
- Broadcast concurrency cap و lock داخل isolate.
- Daily delivery concurrency کاهش یافت.
- Health scoring برای Sample خیلی کوچک کمتر گمراه‌کننده شد.

---

## [v2.6.2]

- IQD اضافه شد.
- Brent اضافه شد.
- Energy tab اضافه شد.
- IQD normalization برای TGJU/AlanChand جلوی x100 Unit Error را گرفت.
- Brent با USD/bbl نمایش داده شد.

---

## [v2.6.1]

### mEwCONOMY UI
- UI Mini App انگلیسی شد.
- تنها Subtitle فارسی حفظ شد.
- Card titleها کوتاه و Market-style شدند.
- English digits و English unit labels.
- Paw animation روی Card click اضافه شد.

---

## [v2.6.0]

### Multi-source Economy
Sourceها:
- TGJU
- Tasnim
- ESTJT
- Mesghal
- AlanChand

Default در آن نسخه Smart average بود.

- TGJU `/tv/` به خاطر Stale snapshot حذف شد.
- Median/MAD/Relative-band برای حذف Outlier.
- Source selector و `/api/economy?source=...`.
- Source count و excluded outlier در UI.

> Source set در نسخه‌های بعد چند بار ساده‌سازی شد و در v2.7.5 به TGJU + Gold Referenceها رسید.

---

## [v2.5.4]

### TGJU Migration
- BRSAPI/Navasan حذف شدند.
- TGJU منبع اصلی شد.
- Domestic IRR → Toman.
- Mini App Menu Button با U+2063 ظاهراً Blank شد.
- TGJU Gold/Currency/Coin parsing اضافه شد.

---

## [v2.5.3]

### Telegram Mini App Menu Button
- `setChatMenuButton` برای دکمه کنار Composer.
- `/setupminiapp` برای Register و Verify.
- `/start` به‌صورت best-effort Menu Button را Self-heal می‌کرد.
- Reply Keyboard بدون Economy Button ماند.

---

## [v2.5.2]

- دکمه دائمی Economy از Reply Keyboard حذف شد.
- `/economy` و Mini App/API باقی ماندند.

---

## [v2.5.1]

### MioEconomy-only
- MioMail به‌طور کامل حذف شد.
- Economy به Zero-config free-source design منتقل شد.
- BRSAPI و Navasan fallback در آن مرحله استفاده می‌شدند.
- Cache 120s.

---

## [v2.5.0]

### MioEconomy
- اولین Telegram Mini App اقتصادی.
- Currency/Gold/Coin cards، Change، Updated time، Refresh.
- Backend proxy و Cache.

### MioMail
- Mailbox اختصاصی @modam.com
- Email Worker delivery به Telegram
- `/syncmailboxes`

> MioMail یک Release بعد در v2.5.1 کاملاً حذف شد.

---

## [v2.4.3]

### Admin Performance
- Heavy admin read/monitor commandها داخل همان Worker invocation Await شدند.
- `/users` و `/starters` دیگر برای تک‌تک کاربران Telegram `getChat` نمی‌زنند.
- User list از حدود چند KV GET برای هر User به Profile GET + Set membership کاهش یافت.
- KV GET/LIST transient retry.
- Telegram API timeout.
- Fresh in-isolate activity overlay.

### `/userstats`
- User monitor تعاملی.
- Pagination هشت‌تایی.
- Vital report شامل Profile، Activity، Starter/Daily، Cat stats، Streak، Achievement و event flags.

---

## [v2.4.2]

### Special Phrase Achievements
مسیرهای مخفی و Achievement برای عبارت‌هایی مثل:
- صدرا
- نازنین
- محمد
- اسدی
- استوار اسدی
- دانشگاه فرهنگیان
- پیشته

پاسخ‌های اختصاصی Phrase branchها نیز اضافه/تکمیل شدند.

---

## [v2.4.1]

- دکمه‌ی Achievement به UIهای مرتبط اضافه شد، از جمله مسیرهای استریک/آمار.

---

## [v2.4.0]

### Voice Upgrade
- تمام Voiceها Transcript می‌شوند.
- پیام `🎙 متن ویس:` ارسال می‌شود.
- دکمه‌ی `😼 نظر گوربابات` برای ارسال Transcript به AI.
- Voice شامل Trigger گربه همچنان Cat response می‌گیرد.

### Achievement UI
- Callback و Catalog مرکزی Achievement.
- نمایش Title، Detail و Unlock time.
- سازگاری با Storage قدیمی و Object format جدید.

---

## [v2.3.2]

### User Profile Repair
- Service messageهایی که خود Bot می‌سازد دیگر Profile کاربر را با Profile Bot خراب نمی‌کنند.
- Private profile source از `message.chat` استفاده می‌کند.
- رکوردهای آلوده به Username بات Force-repair می‌شوند.
- `getChat` refresh فقط در موارد لازم انجام می‌شود.

### its modam
- Navigation wording و ترتیب Oldest → Newest اصلاح شد.

---

## [v2.3.1]

### Starter Reset
- Prefix از `starter:` به `starter:v2:` تغییر کرد.
- Starterهای قدیمی عمداً از نسل جدید آمار جدا شدند.

---

## [v2.3.0]

### Twitter-only Downloader
- مسیر Social/Cobalt عمومی ساده شد.
- فقط Direct public Twitter/X status links پذیرفته شدند.
- FxTwitter مسیر اصلی/متمرکز شد.
- Instagram/YouTube/general Cobalt از UX عمومی حذف شدند.
- فقط اولین Media برای یک پیام تمیز ارسال می‌شود.
- Footer اختصاصی:
  `گوربابات؛ فوروارد شده از توئیتر`
- Cooldown 15s.

---

## [v2.2.4]

### Health Probe Resilience
- Service-status parsing برای ساختارهای مختلف Tracker مقاوم‌تر شد.
- وضعیت Twitter/X با aliasهای مختلف قابل تشخیص شد.
- Service failure فقط وقتی اعلام می‌شود که Tracker صریحاً برای همان سرویس داده معتبر داشته باشد.

---

## [v2.2.3]

### Health Metrics
- Window fallback برای Cloudflare Analytics اضافه شد.
- Aggregation lag چند دقیقه‌ای Cloudflare لحاظ شد.
- `its modam💫` branding/UI به‌روزرسانی شد.
- Welcome text بازنویسی شد.

---

## [v2.2.2]

### Cloudflare Metrics Configuration
- Config status برای `CF_ACCOUNT_ID`, `CF_WORKER_NAME`, `CF_API_TOKEN`.
- Health می‌تواند تفاوت «credential تنظیم نشده» با «metrics query failed» را گزارش کند.

---

## [v2.2.1]

### Health Dashboard
- Health score و Probeهای زمان‌دار.
- KV key counts.
- Memory estimate.
- CPU/request/error metrics در صورت وجود Cloudflare Analytics credentials.
- Formatting برای Bytes/Latency/Health bar.

---

## [v2.2.0]

### Social Download
- Downloader برای Social media با Cobalt/Fallbackها توسعه یافت.
- Remote media type probing و timeout.
- Telegram remote-video size handling.
- Cooldown دانلود.

### Broadcast Archive
- Archive کردن Broadcastها.
- List/Page کردن Archive.
- Replay یک Broadcast archive item.
- Pin/delete/edit helperها.

### its modam
- آرشیو داخلی پیام‌ها/اعلان‌های مهم با Pagination توسعه پیدا کرد.

> Downloader عمومی Cobalt در v2.3.0 عمداً به Twitter/X-only ساده شد.

---

# Baseline: [v2.1.2]

ریپوی قبلی روی v2.1.2 بود. تغییرات Baseline شامل:
- Qwen3 30B + GLM fallback
- AI translation UX
- شخصیت گوربابات
- Easter Eggهای اولیه گسترده
- Voice trigger
- KV write optimization
- Welcome/Help updates

نسخه‌ی کامل Changelog قدیمی در:
`docs/legacy/CHANGELOG-v2.1.2.md`
