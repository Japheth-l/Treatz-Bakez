# Treatz & Bakez

Website for **Treatz & Bakez** (Kukz & Bakez) — gourmet donuts, desserts, cakes, banana bread, savory eats & beverages, baked fresh in Haatso, Accra.

- Instagram: [@treatz_n_bakez](https://www.instagram.com/treatz_n_bakez/)
- WhatsApp / phone: 059 370 5347
- Hours: Mon–Sat, 8:00am–5:00pm · 24 hours' notice on orders

## The site

A static, single-page site — no build step. Open `index.html` in a browser, or host the folder on GitHub Pages, Netlify or any static host.

| File | What it does |
| --- | --- |
| `index.html` | Page layout: hero, menu, sharing boxes, gallery, ordering, visit info |
| `styles.css` | Brand styling (orange, cream & brown) and responsive layout |
| `script.js` | Menu data, filters, order basket, WhatsApp order message |
| `assets/img` | Product photos and logo |
| `assets/video` | Short clips used in the hero, "Boxes" and "Reels" sections (Instagram end cards trimmed off) |

### Ordering

Customers add items from the menu, pick a date (at least 24 hours ahead, Mon–Sat), choose pickup or delivery, and press **Send order on WhatsApp**. That opens WhatsApp with the order pre-written to `233593705347`. There's no backend and no payment handling.

### Editing the menu

Menu items live in the `MENU` array at the top of `script.js`. Each item has a name, category (`donuts`, `pastries`, `loaves`, `savory`, `boxes`), tag, image name (from `assets/img`) and short description.

### Photos

The current product photos are cropped from Instagram grid screenshots, so they're fairly low resolution. Swap in the original photos (same file names, ideally square and at least 800px wide) for a sharper result.
