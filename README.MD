<div align="center">

![Status](https://img.shields.io/badge/status-coming%20soon%20to%20production-orange?style=for-the-badge)

# ⚡ Awru Pulse

**Your inbox, delivered to where you already are.**

Awru Pulse watches your Gmail and sends instant Telegram notifications the moment a new email lands — no more refreshing your inbox, no more missed messages.

</div>

---

## What is Awru Pulse?

Awru Pulse is a lightweight notification agent that bridges Gmail and Telegram. Connect your inbox once, and every new email is pushed to you in real time — sender, subject, and preview, right where you're already checking messages.

Built for people who live in Telegram and don't want to keep a browser tab open just to catch important emails.

## Features

- 🔗 **Secure Gmail connection** — OAuth2 only, your password never touches our servers
- ⚡ **Real-time delivery** — Gmail API + Google Pub/Sub push, not polling, so notifications arrive instantly
- 📬 **Clean notifications** — sender, subject, and preview at a glance
- 🗄️ **Reliable history** — every notified email is logged, so nothing gets missed twice
- 🧠 **Smarter soon** — AI-based categorization, priority flags, and summaries on the roadmap

## How It Works

```
Gmail Inbox
    │  new email
    ▼
Google Pub/Sub
    │  push notification
    ▼
Awru Pulse
    │  fetch, dedupe, log
    ▼
Telegram Bot
    │
    ▼
📱 Instant notification
```
 ## Status

🚧 Early access — single-user release in progress, multi-user support planned.

### Roadmap

- [x] Core scaffold + database schema
- [x] Telegram bot setup
- [ ] Gmail OAuth connection
- [ ] Real-time Pub/Sub + webhook pipeline
- [ ] End-to-end notification delivery
- [ ] AI-based categorization, priority, and summaries
- [ ] Web dashboard (Next.js)
- [ ] Multi-user support

## License

MIT