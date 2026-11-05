/* Baynounah Dates — shared UI (header, footer, cart drawer, product data)
   In Shopify these map to: sections/header.liquid, sections/footer.liquid,
   snippets/cart-drawer.liquid, snippets/product-card.liquid. */

const CUR = 'د.إ';
const FREE_SHIP = 200;

const PRODUCTS = [
  { id:'ajwa', name:'عجوة فاخرة', en:'Premium Ajwa', sub:'طرية · غنية بالمعادن', img:'assets/tray.jpg', pos:'60% 50%', price:89, was:110, rating:4.9, reviews:412, tag:'الأكثر مبيعاً', cat:'premium',
    sizes:[{w:'500 غ',p:89,was:110},{w:'1 كغ',p:159,was:205,best:true},{w:'2 كغ',p:299,was:410}] },
  { id:'medjool', name:'مجدول ملكي', en:'Royal Medjool', sub:'حبة كبيرة · قوام كراميلي', img:'assets/hero.jpg', pos:'35% 50%', price:95, rating:4.9, reviews:356, tag:'جديد', tagc:'gold', cat:'premium',
    sizes:[{w:'500 غ',p:95},{w:'1 كغ',p:175,best:true},{w:'2 كغ',p:330}] },
  { id:'sukkari', name:'سكري مفتّل', en:'Sukkari Mufattal', sub:'يذوب في الفم', img:'assets/bowl.jpg', pos:'50% 70%', price:59, was:69, rating:4.8, reviews:288, cat:'premium',
    sizes:[{w:'500 غ',p:59,was:69},{w:'1 كغ',p:105,was:129,best:true},{w:'3 كغ',p:279,was:360}] },
  { id:'shishi', name:'تمر شيشي', en:'Shishi Dates', sub:'من نخيل الإمارات', img:'assets/hero.jpg', pos:'75% 30%', price:49, rating:4.7, reviews:164, cat:'local',
    sizes:[{w:'500 غ',p:49},{w:'1 كغ',p:89,best:true},{w:'3 كغ',p:239}] },
  { id:'nabtat', name:'نبتة المزروعي', en:'Nabtat Al Mazrouei', sub:'صنف إماراتي نادر', img:'assets/tray.jpg', pos:'40% 80%', price:69, rating:4.8, reviews:97, tag:'محدود', tagc:'gold', cat:'local',
    sizes:[{w:'500 غ',p:69},{w:'1 كغ',p:125,best:true}] },
  { id:'khudri', name:'خضري', en:'Khudri', sub:'مثالي للطبخ والقهوة', img:'assets/bowl.jpg', pos:'50% 40%', price:39, rating:4.6, reviews:121, cat:'local',
    sizes:[{w:'1 كغ',p:39},{w:'3 كغ',p:99,best:true},{w:'5 كغ',p:149}] },
  { id:'stuffed', name:'تمر محشي باللوز والهيل', en:'Almond & Cardamom', sub:'حلويات شرقية من التمر', img:'assets/tray.jpg', pos:'80% 40%', price:79, was:95, rating:4.9, reviews:203, cat:'sweets',
    sizes:[{w:'250 غ',p:79,was:95},{w:'500 غ',p:139,was:170,best:true}] },
  { id:'giftbox', name:'صندوق بينونة الفاخر', en:'Baynounah Gift Box', sub:'4 أصناف · تغليف هدايا', img:'assets/giftbox.jpg', pos:'50% 60%', price:249, was:299, rating:5.0, reviews:178, tag:'هدية مثالية', cat:'gifts',
    sizes:[{w:'صغير',p:249,was:299},{w:'وسط',p:349,was:420,best:true},{w:'كبير',p:499,was:610}] },
];
const byId = id => PRODUCTS.find(p => p.id === id);

/* ---------- icons ---------- */
const I = {
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke-linecap="round"/></svg>',
  bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2" stroke-linecap="round"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>',
  plus:'<svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  check:'<svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m5 12 5 5 9-10"/></svg>',
  truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
  leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z"/><path d="M5 19 13 11"/></svg>',
  gift:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13"/><path d="M12 7c-2-3-5-3-5-1s3 1 5 1c2 0 5 1 5-1s-3-2-5 1Z"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4" stroke-linecap="round"/></svg>',
  cash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.1.1.6-.1 1.3Z"/></svg>',
  ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  tt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.2 1.6 3.6 3.5 3.8v3a7 7 0 0 1-3.5-1.1v6.1A5.8 5.8 0 1 1 10.7 9v3.1a2.8 2.8 0 1 0 2.8 2.8V3h3Z"/></svg>',
  snap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3c3 0 5 2.2 5 5v3l2 .6c.4.2.3.8-.1 1l-2 .7c.4 1.6 1.8 2.8 3.4 3.2-.4.8-1.7 1-2.7 1.1l-.4 1.2c-1.2-.2-2.3 0-3.2.7-1.2.9-2.8.9-4 0-.9-.7-2-.9-3.2-.7l-.4-1.2c-1-.1-2.3-.3-2.7-1.1 1.6-.4 3-1.6 3.4-3.2l-2-.7c-.4-.2-.5-.8-.1-1L7 11V8c0-2.8 2-5 5-5Z"/></svg>',
};

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => `<span class="lat">${n.toLocaleString('en-US')}</span> <span class="cur">${CUR}</span>`;
const pct = (now, was) => Math.round((1 - now / was) * 100);

/* ---------- product card ---------- */
function cardHTML(p) {
  const tag = p.was ? `<span class="tag sale">وفّر ${pct(p.price, p.was)}%</span>` : p.tag ? `<span class="tag ${p.tagc || ''}">${p.tag}</span>` : '';
  return `<article class="card">
    <a class="media" href="product.html#${p.id}" aria-label="${p.name}">
      ${tag}<img src="${p.img}" alt="${p.name}" loading="lazy" style="object-position:${p.pos}">
    </a>
    <button class="wish" aria-label="أضف للمفضلة" onclick="this.classList.toggle('on')">${I.heart}</button>
    <div class="body">
      <div class="rate"><span class="stars">★★★★★</span><span class="lat">${p.rating} (${p.reviews})</span></div>
      <a href="product.html#${p.id}"><h3>${p.name}</h3></a>
      <div class="sub">${p.sub}</div>
      <div class="price"><span class="now">${money(p.price)}</span>${p.was ? `<span class="was lat">${p.was}</span>` : ''}</div>
      <button class="quick" data-add="${p.id}">${I.plus} أضف للسلة</button>
    </div>
  </article>`;
}

/* ---------- shell: header / menu / cart / footer ---------- */
function shell() {
  const announce = `<div class="announce" role="region" aria-label="عروض">
    <div class="announce-track" id="annTrack">
      <span>🚚 شحن مجاني للطلبات فوق <b class="lat">${FREE_SHIP}</b> ${CUR}</span>
      <span>✨ خصم <b>10%</b> على أول طلب · كود <b class="lat">BAYNOUNAH10</b></span>
      <span>⚡ توصيل في نفس اليوم داخل أبوظبي ودبي</span>
      <span>💵 الدفع عند الاستلام متاح</span>
    </div></div>`;
  const header = `<header class="header"><div class="container header-in">
      <div class="h-actions">
        <button class="icon-btn menu-btn" data-open="menu" aria-label="القائمة">${I.menu}</button>
        <button class="icon-btn search-m" aria-label="بحث">${I.search}</button>
        <nav class="nav-desk">
          <a href="index.html#shop">المتجر</a><a href="index.html#gifts">الهدايا</a>
          <a href="index.html#corporate">طلبات الشركات</a><a href="index.html#story">قصتنا</a>
        </nav>
      </div>
      <a class="logo" href="index.html" aria-label="تمور بينونة"><img src="assets/wordmark-gold.png" alt="تمور بينونة Baynounah Dates" width="69" height="40"></a>
      <div class="h-actions end">
        <button class="icon-btn" aria-label="حسابي">${I.user}</button>
        <button class="icon-btn" data-open="cart" aria-label="السلة">${I.bag}<span class="badge-count" id="cartCount">0</span></button>
      </div>
    </div></header>`;
  const menu = `<aside class="drawer menu" id="menu" aria-label="القائمة">
      <div class="drawer-head"><img src="assets/wordmark-gold.png" alt="" style="height:36px"><button class="icon-btn" data-close aria-label="إغلاق">${I.close}</button></div>
      <div class="menu-links">
        <a href="index.html#shop">كل التمور <span>‹</span></a>
        <a href="product.html#ajwa">عجوة <span>‹</span></a>
        <a href="product.html#medjool">مجدول <span>‹</span></a>
        <a href="product.html#sukkari">سكري <span>‹</span></a>
        <a href="index.html#gifts">صناديق الهدايا <span>‹</span></a>
        <a href="product.html#stuffed">حلويات التمر <span>‹</span></a>
        <a href="index.html#corporate">طلبات الشركات <span>‹</span></a>
        <a href="index.html#faq">الأسئلة الشائعة <span>‹</span></a>
        <a href="#" class="lat">English <span>‹</span></a>
      </div>
      <div class="menu-promo"><b>خصم 10% على أول طلب</b><br><small>استخدم الكود <b class="lat">BAYNOUNAH10</b> عند الدفع</small></div>
    </aside>`;
  const cart = `<aside class="drawer cart" id="cart" aria-label="سلة التسوق">
      <div class="drawer-head"><h3>سلتك <small id="cartN" class="lat" style="color:var(--muted);font-size:14px"></small></h3><button class="icon-btn" data-close aria-label="إغلاق">${I.close}</button></div>
      <div class="ship-bar" id="shipBar"></div>
      <div class="cart-items" id="cartItems"></div>
      <div class="upsell" id="upsell"></div>
      <div class="cart-foot" id="cartFoot"></div>
    </aside>`;
  const footer = `<footer class="footer"><div class="pattern"></div><div class="container" style="position:relative">
      <a class="logo" href="index.html"><img src="assets/logo-white.png" alt="تمور بينونة"></a>
      <p>بينونة علامة إماراتية متخصصة في التمور الفاخرة والحلويات الشرقية المصنوعة من التمر، تجمع بين الأصالة العربية والمذاق الراقي.</p>
      <div class="f-cols">
        <div><h4>تواصل معنا</h4><a href="#">واتساب: <span class="lat">+971 50 000 0000</span></a><a href="#" class="lat">hello@baynounahdates.ae</a><a href="#">أبوظبي، الإمارات</a></div>
        <div><h4>تسوّق</h4><a href="#">عجوة</a><a href="#">مجدول</a><a href="#">سكري</a><a href="#">هدايا</a></div>
        <div><h4>المساعدة</h4><a href="#">الشحن والتوصيل</a><a href="#">الاستبدال والاسترجاع</a><a href="#">تتبع طلبك</a><a href="#">سياسة الخصوصية</a></div>
      </div>
      <div class="pay"><span>Apple Pay</span><span>VISA</span><span>Mastercard</span><span>tabby</span><span>tamara</span><span>COD</span></div>
      <div class="social"><a href="#" aria-label="Instagram">${I.ig}</a><a href="#" aria-label="TikTok">${I.tt}</a><a href="#" aria-label="Snapchat">${I.snap}</a><a href="#" aria-label="WhatsApp">${I.wa}</a></div>
      <div class="copy" style="margin-top:18px">© <span class="lat">2026</span> تمور بينونة · جميع الحقوق محفوظة</div>
    </div></footer>
    <a class="wa" href="https://wa.me/971500000000" aria-label="تواصل عبر واتساب">${I.wa}</a>
    <div class="overlay" id="overlay"></div>
    <div class="toast" id="toast" role="status">${I.check}<span id="toastTxt"></span><button style="margin-inline-start:auto;font-weight:700;text-decoration:underline" data-open="cart">عرض السلة</button></div>`;

  $('#top').innerHTML = announce + header;
  $('#bottom').innerHTML = menu + cart + footer;

  // rotating announcement
  let a = 0; const tr = $('#annTrack'); const n = tr.children.length;
  setInterval(() => { a = (a + 1) % n; tr.style.transform = `translateY(-${a * 34}px)`; }, 3500);
}

/* ---------- drawers ---------- */
function openDrawer(id) { $$('.drawer').forEach(d => d.classList.remove('open')); $('#' + id).classList.add('open'); $('#overlay').classList.add('on'); document.body.classList.add('lock'); }
function closeDrawers() { $$('.drawer').forEach(d => d.classList.remove('open')); $('#overlay').classList.remove('on'); document.body.classList.remove('lock'); }

/* ---------- cart (localStorage; in Shopify use /cart/add.js + /cart.js) ---------- */
let cart = []; try { cart = JSON.parse(localStorage.getItem('bd_cart') || '[]'); } catch (e) {}
const save = () => { try { localStorage.setItem('bd_cart', JSON.stringify(cart)); } catch (e) {} };

function addToCart(id, sizeIdx = 0, qty = 1, open = true) {
  const p = byId(id); const s = p.sizes[sizeIdx];
  const key = id + ':' + sizeIdx;
  const ex = cart.find(i => i.key === key);
  ex ? ex.qty += qty : cart.push({ key, id, sizeIdx, qty });
  save(); renderCart();
  const c = $('#cartCount'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
  if (open) openDrawer('cart');
  else toast(`تمت إضافة ${p.name} (${s.w})`);
}
function toast(t) { $('#toastTxt').textContent = t; const el = $('#toast'); el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 2600); }

function renderCart() {
  const count = cart.reduce((a, i) => a + i.qty, 0);
  const sub = cart.reduce((a, i) => a + byId(i.id).sizes[i.sizeIdx].p * i.qty, 0);
  $('#cartCount').textContent = count;
  $('#cartN').textContent = count ? `(${count})` : '';
  const left = Math.max(0, FREE_SHIP - sub);
  $('#shipBar').innerHTML = (left > 0
    ? `أضف ${money(left)} للحصول على <b>شحن مجاني</b> 🚚`
    : `🎉 مبروك! حصلت على <b>شحن مجاني</b>`) + `<div class="track"><div class="fill" style="width:${Math.min(100, sub / FREE_SHIP * 100)}%"></div></div>`;

  if (!cart.length) {
    $('#cartItems').innerHTML = `<div class="cart-empty"><img src="assets/palm-gold.png" alt=""><p>سلتك فارغة حالياً</p><br><a class="btn btn-primary" href="index.html#shop" data-close>ابدأ التسوق</a></div>`;
    $('#cartFoot').innerHTML = ''; $('#upsell').innerHTML = ''; return;
  }
  $('#cartItems').innerHTML = cart.map(i => {
    const p = byId(i.id), s = p.sizes[i.sizeIdx];
    return `<div class="ci"><img src="${p.img}" style="object-position:${p.pos}" alt="">
      <div><h4>${p.name}</h4><small>${s.w}</small><br>
        <div class="qty"><button data-q="${i.key}" data-d="1" aria-label="زيادة">+</button><span>${i.qty}</span><button data-q="${i.key}" data-d="-1" aria-label="إنقاص">−</button></div>
        <button class="rm" data-rm="${i.key}">إزالة</button></div>
      <div class="p">${money(s.p * i.qty)}</div></div>`;
  }).join('');
  // upsell: first product not in cart (prefers gift box / stuffed)
  const up = ['stuffed', 'giftbox', 'sukkari', 'khudri'].map(byId).find(p => !cart.some(i => i.id === p.id));
  $('#upsell').innerHTML = up ? `<h5>يُكمل طلبك بشكل رائع</h5><div class="up-item"><img src="${up.img}" style="object-position:${up.pos}" alt=""><div><b>${up.name}</b>${money(up.price)}</div><button class="btn btn-sm btn-gold" data-up="${up.id}">${I.plus} أضف</button></div>` : '';
  $('#cartFoot').innerHTML = `<div class="row"><span>المجموع الفرعي</span><span>${money(sub)}</span></div>
    <div class="row"><span>الشحن</span><span>${left > 0 ? 'يُحسب عند الدفع' : '<b style="color:var(--ok)">مجاني</b>'}</span></div>
    <div class="row total"><span>الإجمالي</span><span>${money(sub)}</span></div>
    <p class="note">أو 4 دفعات بقيمة ${money(Math.ceil(sub / 4))} بدون فوائد مع tabby</p>
    <button class="btn btn-primary btn-block" onclick="toast('معاينة فقط: هنا ينتقل العميل إلى صفحة الدفع في Shopify')">إتمام الطلب بأمان</button>
    <div class="express"><button class="ap" onclick="toast('معاينة فقط: Apple Pay')">Apple Pay</button><button class="tb" onclick="toast('معاينة فقط: tabby')">tabby</button></div>
    <div class="secure">${I.shield.replace('<svg', '<svg width="14"')} دفع آمن 100% · الدفع عند الاستلام متاح</div>`;
}

/* ---------- global events ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-open],[data-close],[data-add],[data-q],[data-rm],[data-up],#overlay');
  if (!t) return;
  if (t.dataset.open) { e.preventDefault(); openDrawer(t.dataset.open); $('#toast')?.classList.remove('on'); }
  else if ('close' in t.dataset || t.id === 'overlay') closeDrawers();
  else if (t.dataset.add) {
    addToCart(t.dataset.add, 0, 1, false);
    t.classList.add('added'); t.innerHTML = I.check + ' تمت الإضافة';
    setTimeout(() => { t.classList.remove('added'); t.innerHTML = I.plus + ' أضف للسلة'; }, 1800);
  }
  else if (t.dataset.up) addToCart(t.dataset.up, 0, 1, true);
  else if (t.dataset.q) { const it = cart.find(i => i.key === t.dataset.q); it.qty += +t.dataset.d; if (it.qty < 1) cart = cart.filter(i => i !== it); save(); renderCart(); }
  else if (t.dataset.rm) { cart = cart.filter(i => i.key !== t.dataset.rm); save(); renderCart(); }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawers(); });

shell(); renderCart();
