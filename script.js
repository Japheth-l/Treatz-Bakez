(function () {
  "use strict";

  var WHATSAPP_NUMBER = "233593705347";

  var MENU = [
    { name: "Gourmet Donut Box", cat: "donuts", tag: "Donuts", img: "donut-box", desc: "Loaded brioche donuts — Oreo cream, caramel crunch and glazed favourites, boxed to share." },
    { name: "Crumble Filled Donut", cat: "donuts", tag: "Donuts", img: "crumble-donut", desc: "Soft, golden and finished with a buttery crumble and a fruity cream centre." },
    { name: "Mini Donuts", cat: "donuts", tag: "Donuts", img: "mini-donuts", desc: "Bite-sized ring donuts, perfect for parties, kids and snack platters." },
    { name: "Almond Croissant", cat: "pastries", tag: "Croissants", img: "almond-croissant", desc: "Flaky, buttery layers with toasted flaked almonds and a pistachio finish." },
    { name: "Red Velvet Cream Croissant", cat: "pastries", tag: "Croissants", img: "red-croissant", desc: "Two-tone laminated croissant with a rich, creamy filling." },
    { name: "Filled Croissants", cat: "pastries", tag: "Croissants", img: "cream-croissants", desc: "Golden croissants split and piled with sweet cream and berry drizzle." },
    { name: "Chocolate Babka", cat: "pastries", tag: "Pastries", img: "babka", desc: "Twisted, glazed and swirled with chocolate in every layer." },
    { name: "Pistachio Croissant Loaf", cat: "pastries", tag: "Pastries", img: "pistachio-loaf", desc: "Pull-apart laminated loaf topped with crushed pistachios." },
    { name: "Chocolate Chip Banana Bread", cat: "loaves", tag: "Banana bread", img: "banana-bread", desc: "Our signature moist banana loaf, studded with chocolate chips." },
    { name: "Loaf Cakes & Croissants", cat: "loaves", tag: "Loaf cakes", img: "croissant-loaf", desc: "Classic banana and loaf cakes, sliced and paired with fresh croissants." },
    { name: "Chicken & Cheese Pizza", cat: "savory", tag: "Savory eats", img: "chicken-pizza", desc: "Cheesy, saucy and topped with seasoned chicken and olives." },
    { name: "Croissant Sandwiches", cat: "savory", tag: "Savory eats", img: "croissant-sandwich", desc: "Buttery croissants stuffed with savory fillings and crisp peppers." },
    { name: "Breakfast Box", cat: "boxes", tag: "Boxes", img: "breakfast-box", desc: "Club sandwiches, croissants, pastries, juice and fruit — breakfast sorted." },
    { name: "Brunch Spread", cat: "boxes", tag: "Platters", img: "brunch-spread", desc: "Cinnamon rolls, pastries, fried chicken, fruit and juice for the whole table." },
    { name: "Pastry Platter", cat: "boxes", tag: "Platters", img: "pastry-platter", desc: "A generous mix of puff pastries, croissants and savory bites for meetings and events." },
    { name: "Dessert Dip Box", cat: "boxes", tag: "Boxes", img: "dessert-box", desc: "Cookies, churros, pinwheels and marshmallows with milk chocolate, caramel and cookie-cream dips." },
    { name: "Party Snack Box", cat: "boxes", tag: "Boxes", img: "party-box", desc: "Strawberries, pretzels, waffles, brownies and dips — a celebration in a box." },
    { name: "High Tea Stand", cat: "boxes", tag: "Occasions", img: "high-tea", desc: "Tiered scones, tarts, cupcakes, sandwiches and croissants for showers and tea parties." }
  ];

  var basket = []; // [{ name, qty }]

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Menu ---------- */
  var grid = $("#menu-grid");
  grid.innerHTML = MENU.map(function (m) {
    return (
      '<article class="item reveal" data-cat="' + m.cat + '">' +
        '<div class="item-img"><img src="assets/img/' + m.img + '.jpg" alt="' + escapeHtml(m.name) + '" loading="lazy"></div>' +
        '<div class="item-body">' +
          '<span class="item-tag">' + m.tag + "</span>" +
          "<h3>" + escapeHtml(m.name) + "</h3>" +
          "<p>" + escapeHtml(m.desc) + "</p>" +
          '<button type="button" class="add-btn" data-item="' + escapeHtml(m.name) + '" aria-pressed="false">+ Add</button>' +
        "</div>" +
      "</article>"
    );
  }).join("");

  $$(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      $$(".chip").forEach(function (c) {
        var on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-selected", on ? "true" : "false");
      });
      $$(".item", grid).forEach(function (it) {
        it.hidden = f !== "all" && it.getAttribute("data-cat") !== f;
      });
    });
  });

  /* ---------- Basket ---------- */
  function find(name) {
    for (var i = 0; i < basket.length; i++) if (basket[i].name === name) return i;
    return -1;
  }

  function add(name) {
    if (find(name) === -1) basket.push({ name: name, qty: 1 });
    render();
  }

  function remove(name) {
    var i = find(name);
    if (i > -1) basket.splice(i, 1);
    render();
  }

  function render() {
    var list = $("#basket");
    list.innerHTML = basket.map(function (b) {
      var n = escapeHtml(b.name);
      return (
        '<li data-name="' + n + '"><span>' + n + "</span>" +
          '<div class="qty">' +
            '<button type="button" data-act="dec" aria-label="Fewer ' + n + '">−</button>' +
            "<output>" + b.qty + "</output>" +
            '<button type="button" data-act="inc" aria-label="More ' + n + '">+</button>' +
          "</div>" +
          '<button type="button" class="remove" data-act="rm" aria-label="Remove ' + n + '">✕</button>' +
        "</li>"
      );
    }).join("");
    $("#basket-empty").hidden = basket.length > 0;

    $$(".add-btn").forEach(function (btn) {
      var inBasket = find(btn.getAttribute("data-item")) > -1;
      btn.setAttribute("aria-pressed", inBasket ? "true" : "false");
      btn.textContent = inBasket ? "✓ Added" : "+ Add";
    });

    var count = basket.reduce(function (s, b) { return s + b.qty; }, 0);
    $("#fab-count").textContent = count;
    $(".wa-fab").classList.toggle("is-visible", count > 0);
  }

  document.addEventListener("click", function (e) {
    var addBtn = e.target.closest(".add-btn");
    if (addBtn) {
      var name = addBtn.getAttribute("data-item");
      if (find(name) > -1) remove(name); else add(name);
      return;
    }
    var preset = e.target.closest("[data-add]");
    if (preset) add(preset.getAttribute("data-add"));

    var act = e.target.closest("#basket [data-act]");
    if (act) {
      var li = act.closest("li");
      var i = find(li.getAttribute("data-name"));
      if (i === -1) return;
      var a = act.getAttribute("data-act");
      if (a === "inc") basket[i].qty++;
      else if (a === "dec") basket[i].qty = Math.max(1, basket[i].qty - 1);
      else basket.splice(i, 1);
      render();
    }
  });

  /* ---------- Order form ---------- */
  var form = $("#order-form");
  var F = form.elements;
  var dateInput = $("#order-date");

  function iso(d) {
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  // Earliest date: tomorrow (24 hrs notice), skipping Sundays.
  var earliest = new Date();
  earliest.setDate(earliest.getDate() + 1);
  if (earliest.getDay() === 0) earliest.setDate(earliest.getDate() + 1);
  dateInput.min = iso(earliest);
  dateInput.value = iso(earliest);

  $$('input[name="method"]').forEach(function (r) {
    r.addEventListener("change", function () {
      $("#address-field").hidden = F.method.value !== "Delivery";
    });
  });

  function niceDate(value) {
    var p = value.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = $("#form-error");
    var name = F.name.value.trim();
    var notes = F.notes.value.trim();
    var date = dateInput.value;

    if (!basket.length && !notes) { err.textContent = "Add something from the menu or describe your order in the notes."; return; }
    if (!name) { err.textContent = "Please tell us your name."; F.name.focus(); return; }
    if (!date || date < dateInput.min) { err.textContent = "We need at least 24 hours' notice — please pick a later date."; dateInput.focus(); return; }
    var p = date.split("-");
    if (new Date(+p[0], +p[1] - 1, +p[2]).getDay() === 0) { err.textContent = "We're closed on Sundays — please choose Monday to Saturday."; dateInput.focus(); return; }
    if (F.method.value === "Delivery" && !F.address.value.trim()) { err.textContent = "Where should we deliver to?"; F.address.focus(); return; }
    err.textContent = "";

    var lines = ["Hi Treatz & Bakez! I'd like to place an order 🧁", ""];
    lines.push("*Name:* " + name);
    if (basket.length) {
      lines.push("*Order:*");
      basket.forEach(function (b) { lines.push("• " + b.qty + " × " + b.name); });
    }
    lines.push("*Date:* " + niceDate(date) + (F.time.value ? " at " + F.time.value : ""));
    lines.push("*" + (F.method.value === "Delivery" ? "Delivery to" : "Collection") + ":* " +
      (F.method.value === "Delivery" ? F.address.value.trim() : "Pickup in Haatso"));
    if (notes) lines.push("*Notes:* " + notes);
    lines.push("", "Please confirm the price and availability. Thank you!");

    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  });

  /* ---------- Nav ---------- */
  var toggle = $(".nav-toggle");
  var nav = $("#nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("#nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Reveal ---------- */
  $$(".section-head, .feature-copy, .order-form, .visit-card, .gallery img").forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Reels ---------- */
  var reels = $$(".reel video");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setSound(video, on) {
    video.muted = !on;
    var btn = video.parentNode.querySelector(".reel-sound");
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label", on ? "Turn sound off" : "Turn sound on");
    btn.textContent = on ? "🔊" : "🔇";
  }

  function play(video) {
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }

  // Autoplay (muted) only while a reel is on screen.
  if ("IntersectionObserver" in window && !reduceMotion) {
    var reelIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) play(en.target);
        else { en.target.pause(); setSound(en.target, false); }
      });
    }, { threshold: 0.5 });
    reels.forEach(function (v) { reelIo.observe(v); });
  }

  reels.forEach(function (v) {
    v.parentNode.querySelector(".reel-sound").addEventListener("click", function () {
      var on = v.muted;
      reels.forEach(function (other) { if (other !== v) setSound(other, false); });
      setSound(v, on);
      if (on) play(v);
    });
    v.addEventListener("click", function () { if (v.paused) play(v); else v.pause(); });
  });

  $("#year").textContent = new Date().getFullYear();
  render();
})();
