# Security Policy

## Secrets

Never publish real values for:

- `BOT_TOKEN`
- `WEBHOOK_SECRET`
- `ADMIN_CHAT_ID`
- Any future API keys or credentials

Keep production values in Cloudflare **Variables and Secrets**. For local Wrangler development, use `.dev.vars`; this repository ignores that file by default.

## If a secret is leaked

If a credential is ever committed to GitHub:

1. Treat it as compromised immediately.
2. Rotate/revoke the credential at its source.
3. Update the new value in Cloudflare.
4. Then remove the leaked value from Git history if needed.

Deleting the visible line from the latest commit is not enough because older Git commits may still contain it.

## Admin commands

Admin commands are protected by `ADMIN_CHAT_ID`. Do not rely on command names being hidden. A public repository can expose every command name without compromising admin access as long as the authorization check remains in place.

## Webhook

Use a strong random `WEBHOOK_SECRET` and keep the Telegram webhook `secret_token` synchronized with the value configured in Cloudflare.
