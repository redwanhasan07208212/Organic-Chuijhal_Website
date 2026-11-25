# Bonoj Chui Jhal – single-product landing page

A bilingual (Bangla / English) landing page for one organic product: **Wild Chui Jhal (বুনো চুই ঝাল)**, a heritage forest spice of Bangladesh.
Plain HTML, CSS and JavaScript. No build step, no dependencies.

## What's on the page

Hero with product art · origin & story · product gallery grid · benefits · how to spot the real thing vs. adulterated stems ·
packages and prices · customer reviews · FAQ · **order form with bKash, Nagad and Cash on delivery (direct WhatsApp redirect)** · footer.
Navbar with mobile menu, Dark / Light theme toggle, Bangla/English switch, scroll animations, and a floating WhatsApp button.

## Folder structure

bonoj-chui-jhal/
├── index.html page structure
├── css/
│ ├── base.css colours, dark/light theme variables, fonts, layout helpers
│ ├── components.css buttons, navbar, cards, FAQ, form fields
│ └── sections.css each section + animations
├── js/
│ ├── config.js ★ prices, delivery, payment numbers, WhatsApp, reviews
│ ├── i18n.js ★ all text in Bangla and English
│ ├── lang.js language switch engine
│ ├── order.js packages, order form, summary, WhatsApp redirect, reviews
│ └── main.js navbar, mobile menu, dark mode, reveal animations
├── images/ SVG illustrations (replace with your own photos if you like)
└── README.md

## Before you publish (important)

1. **WhatsApp & payment numbers**: `js/config.js` is currently set to `01853940963` (`8801853940963`). Double-check `whatsappNumber`, `displayPhone`, and `walletNumbers` (`bKash` and `Nagad`) before going live.
2. **Prices and delivery charges** in `js/config.js` (`packages` and `delivery`) are examples. Update them to match your actual rates.
3. **Reviews** in `js/config.js` are sample placeholders. Replace them with real customer feedback when available.
4. **Check every claim** in `js/i18n.js` (chemical-free, wild-harvested, delivery times). Keep only what is true for your product.
5. **Product photos**: replace the SVG files in `images/` with your own `.jpg` or `.png` photos (e.g., `images/hero.jpg`) and update the `src` attributes in `index.html`.

## Changing text

Edit `js/i18n.js`. Each key has a `bn` (Bangla) and an `en` (English) line. Keep both in sync.

## How orders work

Customers choose a pack, enter their delivery details, pick **Cash on Delivery**, **bKash**, or **Nagad**, and submit. A pre-filled WhatsApp message with the full order opens directly to `01853940963` for them to send. For bKash and Nagad, customers enter their sender number and `TrxID` after sending money so you can verify it.

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` inside `bonoj-chui-jhal/` and visit `http://localhost:8000`.

## Deploy

Push to GitHub, then **Settings → Pages → Deploy from branch → `main` / `/ (root)`**.
