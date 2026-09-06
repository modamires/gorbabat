# Configuration

## Required Cloudflare bindings

### KV

Binding name:

```text
BOT_KV
```

Used for:
- user/profile data
- daily settings
- streak
- achievements
- anonymous session routing
- broadcast drafts/archive
- cron state
- mewMONEY! price history

### Workers AI

Binding:

```text
AI
```

Used for:
- Qwen chatbot
- GLM fallback
- Whisper voice transcription

---

## Required secrets / variables

### Required

```text
BOT_TOKEN
WEBHOOK_SECRET
ADMIN_CHAT_ID
```

`BOT_TOKEN` and `WEBHOOK_SECRET` should be Cloudflare secrets.

### Recommended / optional

```text
PUBLIC_BASE_URL
ECONOMY_CACHE_SECONDS
CF_ACCOUNT_ID
CF_WORKER_NAME
CF_API_TOKEN
```

`PUBLIC_BASE_URL` defaults in code to:

```text
https://gorbabat.modamir-es.workers.dev
```

Set it explicitly if deploying under a different Worker URL/domain.

`ECONOMY_CACHE_SECONDS` defaults to 120 seconds.

The `CF_*` variables are only needed for the richer Cloudflare Analytics part of `/health`. The rest of the bot can run without those metrics credentials.

---

## Current AI models

```text
@cf/qwen/qwen3-30b-a3b-fp8
@cf/zai-org/glm-4.7-flash
@cf/openai/whisper-large-v3-turbo
```

---

## Telegram Menu Button

The button label is:

```text
mewMONEY!
```

After deploy, run:

```text
/setupminiapp
```

from the admin account.
