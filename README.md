# Bonoj Chui Jhal — Single-Product Landing Page

A responsive, bilingual (**Bangla / English**) single-product landing page for **Bonoj Chui Jhal (বুনো চুই ঝাল)**, built with plain **HTML5, CSS3, and JavaScript** with zero build tools or external framework dependencies.

---

## Overview

This landing page is designed to present organic **Wild Chui Jhal** along with recipe inspiration, ingredient highlights, package options, customer feedback, FAQs, and a direct **WhatsApp** ordering experience (`01853940963`).

### Included Sections & UI Capabilities

- **Header & Navigation**: Brand icon and title, responsive mobile menu, **Light / Dark** theme toggle, **Bangla (`bn`) / English (`en`)** language switch, and quick order navigation.
- **Hero & Story**: Product introduction, sourcing and preparation story, and organic spice highlights.
- **Filterable Recipe & Organic Gallery**: Category filter tabs (`সব দেখুন` / `চুই ঝালের রেসিপি` / `অর্গানিক উপাদান`) with dish cards that scroll to the order form and pre-select a recommended package and preview image.
- **Benefits & Purity Comparison**: Key culinary/herbal benefits and a side-by-side comparison between pure mature Chui stems and adulterated or low-grade stems.
- **Starter & Family Packages**: Dynamic package cards (`250g`, `500g`, `1kg`, `2kg`) with automatic delivery calculation and free delivery support on family packs.
- **Reviews, FAQ & Order Form**: Customer review cards, collapsible FAQ items, floating WhatsApp button, and a split-layout order form supporting **Cash on Delivery (COD)**, **bKash**, and **Nagad** (with sender number and `TrxID` inputs).

---

## Folder Structure

```text
bonoj-chui-jhal/
├── index.html              # Main HTML structure and sections
├── css/
│   ├── base.css            # Color tokens, light/dark themes, typography, base layout
│   ├── components.css      # Buttons, navbar, cards, FAQ accordions, form controls
│   └── sections.css        # Section layouts, gallery grid & filters, order view, animations
├── js/
│   ├── config.js           # Contact/wallet numbers, pricing, delivery, gallery & reviews
│   ├── i18n.js             # Bangla and English UI translations
│   ├── lang.js             # Language switching logic
│   ├── order.js            # Gallery rendering/filtering, order summary & WhatsApp link builder
│   └── main.js             # Navigation, mobile menu, theme toggle & scroll reveal animations
├── images/                 # Dish, ingredient, and showcase image assets
└── README.md               # Project documentation
```

## Before Going Live

1. Confirm Contact & Payment Numbers: Review whatsappNumber, displayPhone, and walletNumbers (bKash and Nagad) in js/config.js (currently set to 01853940963 / 8801853940963).
2. Verify Pricing & Delivery Fees: Update package prices, weights, and inside/outside Dhaka delivery charges in js/config.js to match your current rates.
3. Replace Sample Reviews: Update placeholder reviews in js/config.js with genuine customer feedback when ready.
4. Review Product Claims & Copy: Check all claims and text in js/i18n.js (such as chemical-free sourcing, preparation, and delivery windows) so everything matches your actual product.
5. Check Image Filenames: Ensure all images placed inside images/ match the paths used in index.html and js/config.js (chuijhal-1.webp, chuijhal-2.webp, chuijhal-3.webp, chuijhal-4.webp, beef-meat.jpg, caucian-meat.jpg, meat-tomato.jpg, order-dish.webp, organic-1.jpg, organic-2.jpg).

## Customization

1. Editing Text: Update js/i18n.js and keep both bn and en values aligned for each key.
2. Updating Packages, Gallery & Reviews: Edit the SITE_CONFIG object in js/config.js

## How Orders Work

1. A visitor selects a starter or family pack (or clicks a recipe/organic card in the gallery to load its recommended pack and preview image).
2. The visitor fills in their name, phone number, delivery area, and full address.
3. The visitor selects Cash on Delivery, bKash, or Nagad (providing sender number and TrxID for bKash or Nagad).
4. On submit, the page displays an order confirmation summary with a WhatsApp link and opens a formatted order message to 01853940963.

## Deploying to GitHub Pages

1. Push your files to your GitHub repository.

2. Open Settings → Pages.

3. Under Build and deployment, select Deploy from a branch, choose main and / (root), and save.
