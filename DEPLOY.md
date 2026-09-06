# Deploy

## 1. Create Cloudflare resources

Create:
- a Worker
- a KV namespace
- Workers AI binding

Bind them as:

```text
BOT_KV
AI
```

## 2. Configure secrets

With Wrangler:

```bash
wrangler secret put BOT_TOKEN
wrangler secret put WEBHOOK_SECRET
```

Add `ADMIN_CHAT_ID` as a variable or secret.

If you use a custom Worker URL/domain, set:

```text
PUBLIC_BASE_URL=https://your-domain.example
```

## 3. Configure optional Health metrics

For Cloudflare Analytics-backed `/health` metrics:

```text
CF_ACCOUNT_ID
CF_WORKER_NAME
CF_API_TOKEN
```

These are optional.

## 4. Deploy

```bash
wrangler deploy
```

## 5. Register Telegram webhook

Use your real Worker HTTPS URL and the same `WEBHOOK_SECRET` configured in Cloudflare.

Example:

```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  -d "url=https://<YOUR_WORKER_HOST>/" \
  -d "secret_token=<WEBHOOK_SECRET>"
```

The Worker rejects POST webhook requests that do not contain the expected Telegram secret-token header.

## 6. Register Mini App button

From the Telegram admin account:

```text
/setupminiapp
```

This registers the composer-side:

```text
mewMONEY!
```

button and points it to `/economy`.

## 7. Cron

Keep your existing Daily-cat Cron Trigger(s).

Also add this dedicated mewMONEY! history trigger:

```text
*/15 * * * *
```

The Worker routes that exact expression to price-history collection only, so it does **not** send Daily cats every 15 minutes.

The Worker already exports a `scheduled()` handler.

## 8. Verify

Check:

```text
/start
/health
/cronstatus
/economy
```

Also open:

```text
https://<YOUR_WORKER_HOST>/api/economy/health
```

## 9. mewMONEY! History

Price history is not backfilled. It starts accumulating after the new Worker runs and `/api/economy` receives successful price requests.

Current behavior:
- automatic live collection every 15 minutes
- one atomic batch snapshot for all successful sources
- one BOT_KV history write per interval
- retention 7 days
- no stale-cache values are persisted
