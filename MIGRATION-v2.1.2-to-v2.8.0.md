# Migration — v2.1.2 → v2.8.0

این سند خلاصه‌ی معماری و رفتاری تغییرات بزرگ از ریپوی قبلی تا Snapshot فعلی است.

## 1. Bot Core

در v2.1.2 هسته شامل Cat trigger، AI chat، Voice trigger، Daily، Streak، Anonymous، Achievement و Broadcast بود.

در v2.8.0 هسته:
- Profile corruption repair دارد.
- Starter generation reset شده (`starter:v2:`).
- Admin user monitor تعاملی دارد.
- KV read/write/delete retry دارد.
- Telegram requests timeout و 429 handling دارند.
- Update dedupe داخل isolate دارد.
- Heavy callback/admin/voice work در مسیرهای حساس Await می‌شود.
- Voice file guard و AI timeouts دارد.
- Broadcast concurrency/lock و Daily concurrency cap دارد.

## 2. Voice

قدیم:
- Voice عمدتاً برای تشخیص «پیش پیش».

فعلی:
- تمام Voiceها Transcript می‌شوند.
- Transcript برای کاربر ارسال می‌شود.
- `😼 نظر گوربابات` Transcript را وارد AI می‌کند.
- Trigger گربه داخل Voice همچنان کار می‌کند.

## 3. Achievement

قدیم:
- Achievementهای اولیه.

فعلی:
- Catalog مرکزی و Callback UI.
- Title/Detail/Unlock timestamp.
- Easter Eggهای متنی و رفتاری بیشتر.
- Special phrases و event-based unlockها.
- نمایش Achievement از Streak/Stats.

## 4. Social Download

v2.2:
- Cobalt-based multi-social downloader.

v2.3+:
- عمداً فقط Twitter/X direct public status.
- FxTwitter.
- First-media-only delivery.
- Cooldown و Footer اختصاصی.

## 5. Admin / Health

- `/userstats` interactive monitor.
- `/health` با KV، Memory و Cloudflare Metrics.
- Cloudflare Analytics lag/window fallback.
- Heavy admin routes کمتر به post-response `waitUntil` وابسته‌اند.

## 6. Broadcast / Archive

- Broadcast archive.
- its modam💫 replay.
- Pagination Oldest → Newest.
- Recipient concurrency limit.
- In-isolate duplicate-send lock.
- Continuation callback validation.

## 7. Economy → mewMONEY!

مسیر Economy از چند مرحله عبور کرد:

1. API-based Mini App
2. TGJU migration
3. Multi-source average
4. IQD + Brent
5. English UI + Paw
6. Source simplification
7. Gold reference sources
8. TGJU dedicated live profiles
9. USDT
10. Branding نهایی `mewMONEY!`
11. 10-tap visual price easter egg
12. Universal 7-day price history chart
13. Auto-recovery to real price after 10 seconds

### Current Source policy
- TGJU: broad-market source.
- Milli/MelliGold/TalaSea: GOLD 18K.
- Smart average: consensus where comparable quotes exist.

### Current units
- Domestic TGJU: IRR → Toman.
- IQD: Toman per 1 IQD.
- USDT: TGJU rial price → Toman.
- XAU: USD.
- Brent: USD/bbl.

## 8. Mini App UX

Current:
- `mewMONEY!`
- Composer menu button label `mewMONEY!`
- English UI except one Persian RTL subtitle.
- Jalali date + Latin digits + Finglish month.
- Card sorting.
- Multi-paw tap animation.
- 10-tap discount animation and 10-second recovery.
- `⋯` chart on every card.
- 24H/7D History.

## 9. Removed Features

Features introduced and later intentionally removed:
- General Cobalt/Instagram/YouTube downloader → replaced by Twitter-only flow.
- MioMail → completely removed.
- Economy Reply Keyboard button → removed; composer Mini App button used instead.
- BRSAPI/Navasan → replaced by TGJU.
- ESTJT/Mesghal/AlanChand → removed from current source set.
- Tasnim → removed from current source set.
- Blank/invisible Mini App menu label → replaced by visible `mewMONEY!`.

## 10. Deploy-sensitive changes

After upgrading from old repo:
- Use `starter:v2:` behavior; old starter prefix is intentionally not reused.
- Run `/setupminiapp` after deploy to register `mewMONEY!` button.
- mewMONEY! History starts accumulating after deploy; old history is not backfilled.
- Keep `BOT_KV` binding and `AI` binding configured.
- For Health Cloudflare metrics, optional CF analytics credentials can be set.
