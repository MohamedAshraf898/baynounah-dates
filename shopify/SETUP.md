# Baynounah Dates — Shopify setup

## 1. Store language and currency
- **Settings → Languages**: set **Arabic** as the default language and add **English**.
- **Settings → Store details / Markets**: currency **AED**.

## 2. Install the theme (from GitHub)
1. **Online Store → Themes → Add theme → Connect from GitHub**.
2. Repository: `MohamedAshraf898/baynounah-dates`, branch **`shopify-theme`**.
3. When it appears, click **Customize** to check it, then **Publish**.

Every push to the `shopify-theme` branch updates the theme automatically.

## 3. Import the products
1. **Products → Import** and upload [`products.csv`](products.csv).
2. Images load from this repo. Each product gets 4 photos, plus a small box (500 g, 50 AED) and a large box (950 g, 80 AED).
3. **Um Al Dahan (أم الدهن)** is imported as a **draft** because the price deck has no price for it. Check its price and description, then set it to Active.
4. Inventory is not tracked: products are always purchasable. Turn on tracking per variant if needed.

## 4. Menus (Online Store → Navigation)
- **Main menu** (`main-menu`): كل التمور → `/collections/all`, هدايا الشركات → the corporate page, تواصل معنا → the contact page.
- **Footer** (`footer`): policies (shipping, refund, privacy, terms).

## 5. Pages (Online Store → Pages)
- **تواصل معنا** with template `page.contact`.
- **هدايا الشركات** with template `page.corporate` (contact form + corporate gifts block).

## 6. Theme settings (Customize → Theme settings)
- **Contact & social**: WhatsApp number (turns on the floating button and the corporate gifts button), Instagram, TikTok, Snapchat.
- **Cart → Free shipping threshold**: set it only if you have a matching free-shipping rate in Settings → Shipping.
- **Cart → Upsell products**: pick 2–4 varieties to suggest in the cart.
- **Product page**: same-day cut-off hour, shipping/returns text, and the "pay in 4" line (only if Tabby or Tamara is installed).

## 7. English (Translate & Adapt)
1. Install **Translate & Adapt** (by Shopify).
2. Translate products, the "Size" option values and theme content from [`english-translations.csv`](english-translations.csv). Every English line comes from your Products_English deck and the website copy doc.
3. Interface text (buttons, cart, etc.) is already translated in the theme's `locales/en.json`.

The fastest route is to export from Translate & Adapt after importing the products, then send that export back so the English column can be filled in automatically.

## 8. Reviews
The "Customer reviews" section stays hidden until you add **real** reviews (or install a reviews app such as Judge.me).
