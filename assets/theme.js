/* Baynounah Dates theme JS — cart drawer (Ajax Cart API), quick add, PDP, misc. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const T = window.BD.strings;
  const root = window.BD.routes.root.replace(/\/$/, '');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Mirrors Shopify's shop.money_format so JS prices match Liquid's | money
  const money = cents => {
    const fmt = window.BD.moneyFormat || '{{amount}}';
    const f = (n, d, t, dec) => { const [a, b] = (n / 100).toFixed(d).split('.'); return a.replace(/\B(?=(\d{3})+(?!\d))/g, t) + (b ? dec + b : ''); };
    const out = fmt.replace(/\{\{\s*(\w+)\s*\}\}/, (_, k) => ({
      amount: f(cents, 2, ',', '.'), amount_no_decimals: f(cents, 0, ',', '.'),
      amount_with_comma_separator: f(cents, 2, '.', ','), amount_no_decimals_with_comma_separator: f(cents, 0, '.', ','),
      amount_with_apostrophe_separator: f(cents, 2, "'", '.'), amount_with_space_separator: f(cents, 2, ' ', ',')
    }[k] ?? f(cents, 2, ',', '.')));
    return `<span class="lat">${out}</span>`;
  };

  /* ---------- drawers ---------- */
  const overlay = $('#overlay');
  let lastFocus = null;
  function open(id) {
    lastFocus = document.activeElement;
    $$('.drawer').forEach(d => d.classList.remove('open'));
    const d = document.getElementById(id); if (!d) return;
    d.classList.add('open'); overlay.classList.add('on'); document.body.classList.add('lock');
    setTimeout(() => d.querySelector('button,a,input')?.focus(), 50);
  }
  function close() {
    $$('.drawer').forEach(d => d.classList.remove('open'));
    overlay.classList.remove('on'); document.body.classList.remove('lock');
    lastFocus?.focus?.();
  }
  window.BD.open = open;

  /* ---------- toast ---------- */
  function toast(msg) {
    const el = $('#toast'); if (!el) return;
    $('#toastTxt').textContent = msg; el.classList.add('on');
    clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 3000);
  }

  /* ---------- cart ---------- */
  async function getCart() { return (await fetch(root + '/cart.js', { headers: { Accept: 'application/json' } })).json(); }

  async function add(items, { openDrawer = true } = {}) {
    const r = await fetch(root + '/cart/add.js', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ items })
    });
    const data = await r.json();
    if (!r.ok) { toast(data.description || data.message || T.error); throw data; }
    const cart = await getCart(); render(cart);
    if (openDrawer) open('cart-drawer'); else toast(T.added);
    return cart;
  }
  window.BD.add = add;

  async function change(key, quantity) {
    const r = await fetch(root + '/cart/change.js', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: key, quantity })
    });
    const cart = await r.json();
    if (!r.ok) { toast(cart.description || T.error); return; }
    render(cart);
  }

  async function saveNote(note) {
    await fetch(root + '/cart/update.js', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ note })
    });
  }

  function render(cart) {
    $$('.cart-count').forEach(c => {
      c.textContent = cart.item_count || ''; c.dataset.count = cart.item_count;
      c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
    });
    const drawer = $('#cart-drawer'); if (!drawer) return;
    const threshold = window.BD.freeShip * 100;
    const ship = $('.ship', drawer);
    if (ship) {
      if (threshold > 0) {
        const left = Math.max(0, threshold - cart.total_price);
        ship.hidden = false;
        ship.innerHTML = (left > 0 ? T.shipLeft.replace('[amount]', money(left)) : T.shipDone) +
          `<div class="ship__track"><div class="ship__fill" style="width:${Math.min(100, cart.total_price / threshold * 100)}%"></div></div>`;
      } else ship.hidden = true;
    }
    const items = $('.cart-items', drawer), foot = $('.cart-foot', drawer), up = $('.upsell', drawer);
    $('.cart-n', drawer).textContent = cart.item_count ? `(${cart.item_count})` : '';
    if (!cart.item_count) {
      items.innerHTML = `<div class="cart-empty"><img src="${window.BD.palm}" alt="" width="64" height="56"><p>${T.empty}</p><br><a class="btn btn--primary" href="${window.BD.routes.all}">${T.startShopping}</a></div>`;
      foot.hidden = true; if (up) up.hidden = true; return;
    }
    foot.hidden = false;
    items.innerHTML = cart.items.map(i => {
      const img = i.image ? i.image.replace(/(\.[a-z]+)(\?|$)/i, '_160x160$1$2') : window.BD.palm;
      const props = Object.entries(i.properties || {}).filter(([k, v]) => v && k[0] !== '_')
        .map(([k, v]) => `<small>${esc(k)}: ${esc(v)}</small>`).join('');
      return `<div class="ci">
        <a href="${i.url}"><img src="${img}" alt="${esc(i.product_title)}" width="76" height="76" loading="lazy"></a>
        <div><h3><a href="${i.url}">${esc(i.product_title)}</a></h3>
          ${i.variant_title ? `<small>${esc(i.variant_title)}</small>` : ''}${props}
          <div class="qty"><button data-ch="${i.key}" data-q="${i.quantity + 1}" aria-label="${T.inc}">+</button><span class="lat">${i.quantity}</span><button data-ch="${i.key}" data-q="${i.quantity - 1}" aria-label="${T.dec}">−</button></div>
          <button class="ci__rm" data-ch="${i.key}" data-q="0">${T.remove}</button></div>
        <div class="ci__p">${money(i.final_line_price)}</div></div>`;
    }).join('');
    $('.js-subtotal', drawer).innerHTML = money(cart.total_price);
    const disc = $('.js-discounts', drawer);
    if (disc) disc.innerHTML = (cart.cart_level_discount_applications || []).map(d => `<div class="row"><span>${esc(d.title)}</span><span>-${money(d.total_allocated_amount)}</span></div>`).join('');
    const bnpl = $('.js-bnpl', drawer);
    if (bnpl) bnpl.innerHTML = T.bnpl.replace('[amount]', money(Math.ceil(cart.total_price / 4)));
    // upsell: first recommended product not in cart
    if (up && window.BD.upsell?.length) {
      const inCart = new Set(cart.items.map(i => i.product_id));
      const p = window.BD.upsell.find(x => !inCart.has(x.id) && x.available);
      up.hidden = !p;
      if (p) up.innerHTML = `<h3>${T.upsell}</h3><div class="up"><img src="${p.img}" alt="" width="52" height="52" loading="lazy"><div><b>${esc(p.title)}</b>${money(p.price)}</div><button class="btn btn--sm btn--gold" data-add="${p.variant}">${T.add}</button></div>`;
    }
  }

  /* ---------- global clicks ---------- */
  document.addEventListener('click', async e => {
    const t = e.target.closest('[data-open],[data-close],#overlay,[data-ch],[data-add],[data-size],.note-toggle');
    if (!t) return;
    if (t.dataset.open) { e.preventDefault(); open(t.dataset.open); $('#toast')?.classList.remove('on'); }
    else if ('close' in t.dataset || t.id === 'overlay') close();
    else if (t.dataset.ch) { t.disabled = true; await change(t.dataset.ch, +t.dataset.q); }
    else if (t.classList.contains('note-toggle')) { const n = $('.cart-note'); n.hidden = !n.hidden; if (!n.hidden) n.querySelector('textarea').focus(); }
    else if (t.dataset.size) {
      // size buttons on product cards
      const card = t.closest('.card');
      $$('[data-size]', card).forEach(b => b.classList.toggle('on', b === t));
      const q = $('.quick', card); q.dataset.add = t.dataset.size;
      $('.price__now', card).innerHTML = money(+t.dataset.price);
    }
    else if (t.dataset.add) {
      e.preventDefault();
      const label = t.innerHTML; t.disabled = true;
      try {
        await add([{ id: +t.dataset.add, quantity: 1 }], { openDrawer: t.closest('.drawer') !== null || t.dataset.drawer === '1' });
        if (t.classList.contains('quick')) { t.classList.add('added'); t.innerHTML = window.BD.icons.check + ' ' + T.addedShort; setTimeout(() => { t.classList.remove('added'); t.innerHTML = label; }, 1800); }
      } catch (_) {}
      t.disabled = false;
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.addEventListener('change', e => { if (e.target.matches('.cart-note textarea')) saveNote(e.target.value); });

  /* ---------- announcement rotation ---------- */
  const track = $('.announce__track');
  if (track && track.children.length > 1) {
    let i = 0; const n = track.children.length;
    setInterval(() => { i = (i + 1) % n; track.style.transform = `translateY(-${i * 36}px)`; }, 4000);
  }

  /* ---------- newsletter / contact success flag ---------- */

  /* ---------- product page ---------- */
  const pdp = $('[data-pdp]');
  if (pdp) {
    const data = JSON.parse($('script[data-product-json]', pdp).textContent);
    const form = $('form[data-product-form]', pdp);
    const idInput = $('input[name="id"]', form);
    const atc = $('[data-atc]', pdp), sticky = $('.sticky-atc');
    const qtyInput = $('input[name="quantity"]', form);

    const variantFor = opts => data.variants.find(v => v.options.every((o, i) => o === opts[i]));
    function selected() { return $$('[data-opt-group]', pdp).map(g => $('.opt.on', g)?.dataset.value); }

    function update(v) {
      if (!v) return;
      idInput.value = v.id;
      $$('[data-price]', pdp).forEach(el => el.innerHTML = money(v.price));
      const was = $('[data-compare]', pdp), save = $('[data-save]', pdp);
      if (v.compare_at_price > v.price) { was.hidden = false; was.innerHTML = money(v.compare_at_price); save.hidden = false; save.innerHTML = T.save.replace('[amount]', money(v.compare_at_price - v.price)); }
      else { if (was) was.hidden = true; if (save) save.hidden = true; }
      const bn = $('[data-bnpl]', pdp); if (bn) bn.innerHTML = T.bnpl.replace('[amount]', money(Math.ceil(v.price / 4)));
      const q = +qtyInput.value || 1;
      atc.disabled = !v.available;
      $('[data-atc-label]', atc).textContent = v.available ? T.addToCart : T.soldOut;
      $('[data-atc-total]', atc).innerHTML = v.available ? ' · ' + money(v.price * q) : '';
      const st = $('[data-stock]', pdp);
      if (st) { st.classList.toggle('stock--out', !v.available); $('span', st).textContent = v.available ? T.inStock : T.soldOut; }
      $$('[data-opt-label]', pdp).forEach((l, i) => l.textContent = v.options[i]);
      if (sticky) { $('[data-sticky-title]', sticky).textContent = `${data.title} · ${v.title}`; $('[data-sticky-price]', sticky).innerHTML = money(v.price); }
      if (v.featured_media) {
        const img = $(`[data-media-id="${v.featured_media.id}"]`, pdp);
        if (img) img.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      const url = new URL(location.href); url.searchParams.set('variant', v.id); history.replaceState({}, '', url);
    }

    $$('.opt', pdp).forEach(b => b.addEventListener('click', () => {
      $$('.opt', b.closest('[data-opt-group]')).forEach(x => x.classList.toggle('on', x === b));
      update(variantFor(selected()));
    }));
    $$('[data-qty]', pdp).forEach(b => b.addEventListener('click', () => {
      qtyInput.value = Math.max(1, (+qtyInput.value || 1) + +b.dataset.qty);
      update(variantFor(selected()));
    }));

    const gift = $('.gift', pdp);
    if (gift) $('input[type=checkbox]', gift).addEventListener('change', e => {
      gift.classList.toggle('open', e.target.checked);
      const ta = $('textarea', gift); ta.disabled = !e.target.checked; if (e.target.checked) ta.focus();
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form);
      const item = { id: +fd.get('id'), quantity: +fd.get('quantity') || 1, properties: {} };
      for (const [k, v] of fd.entries()) if (k.startsWith('properties[') && v) item.properties[k.slice(11, -1)] = v;
      atc.disabled = true;
      try { await add([item]); } catch (_) {}
      atc.disabled = false;
    });
    sticky && $('button', sticky).addEventListener('click', () => form.requestSubmit());

    // gallery
    const gm = $('.g-main', pdp);
    if (gm) {
      gm.addEventListener('scroll', () => {
        const i = Math.round(Math.abs(gm.scrollLeft) / gm.clientWidth);
        $$('.g-dots i', pdp).forEach((d, j) => d.classList.toggle('on', i === j));
        $$('.g-thumbs button', pdp).forEach((d, j) => d.classList.toggle('on', i === j));
      }, { passive: true });
      $$('.g-thumbs button', pdp).forEach((b, i) => b.addEventListener('click', () => gm.children[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })));
    }

    // sticky bar when ATC scrolled out of view
    if (sticky) {
      document.body.classList.add('has-sticky');
      const sync = () => sticky.classList.toggle('on', atc.getBoundingClientRect().bottom < 0);
      addEventListener('scroll', sync, { passive: true }); sync();
    }

    // same-day cutoff line
    const cut = $('[data-cutoff]', pdp);
    if (cut) {
      const h = +cut.dataset.cutoff;
      const tick = () => {
        const n = new Date(), c = new Date(n); c.setHours(h, 0, 0, 0);
        if (n > c || [5].includes(n.getDay()) && cut.dataset.skipFri === 'true') { cut.innerHTML = T.cutTomorrow; return; }
        const m = Math.floor((c - n) / 60000);
        cut.innerHTML = T.cutToday.replace('[time]', `<b class="lat">${Math.floor(m / 60)}h ${m % 60}m</b>`);
      };
      tick(); setInterval(tick, 60000);
    }
  }

  /* ---------- collection sort ---------- */
  const sort = $('[data-sort]');
  if (sort) sort.addEventListener('change', () => { const u = new URL(location.href); u.searchParams.set('sort_by', sort.value); location.href = u; });

  /* ---------- initial cart sync (badge + drawer) ---------- */
  getCart().then(render).catch(() => {});
})();
