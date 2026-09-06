# Architecture

## Single Worker

The project intentionally remains a mostly single-file Cloudflare Worker:

```text
worker.js
```

The Worker handles:

- Telegram webhook
- Telegram callbacks
- scheduled Cron
- Workers AI
- KV-backed state
- mewMONEY! HTML
- economy API
- economy history API
- economy health API

## Web routes

```text
GET  /economy
GET  /api/economy
GET  /api/economy/history
GET  /api/economy/health
POST /
```

`POST /` is the Telegram webhook path.

## Reliability model

### Telegram
- 8s Telegram request timeout.
- short 429 retry_after respected once.
- no blind retry of ambiguous visible sends.
- in-isolate update_id dedupe.
- failed handler removes dedupe marker so Telegram retry is not suppressed.

### KV
- GET/LIST transient retries.
- PUT/DELETE transient retries.
- safe wrappers avoid many hard crashes.
- large prefix operations are concurrency-limited.

### AI
- Qwen primary.
- GLM fallback.
- explicit wait timeouts.
- Whisper voice guard and download timeout.

### Broadcast
- target concurrency cap.
- callback offset validation.
- in-isolate lock against same-job duplicate sends.

## mewMONEY! data flow

```text
Mini App
   │
   ▼
GET /api/economy?source=...
   │
   ├── TGJU live profile pages
   ├── Milli
   ├── MelliGold
   └── TalaSea
   │
   ▼
Normalization
   │
   ├── IRR -> Toman
   ├── sanity checks
   ├── source-scoped validation
   └── robust consensus/outlier filtering
   │
   ▼
Response + cache
   │
   └── history snapshot -> BOT_KV
```

## Price history

History is intentionally built inside the app because not all providers offer compatible historical APIs.

Key design:
- one KV value per source history
- compact `{t, assets}` snapshots
- at most one new snapshot/source/15min
- 7-day retention
- chart query extracts one asset from source snapshots

This avoids one KV write per card.
