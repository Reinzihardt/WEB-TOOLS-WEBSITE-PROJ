/* =========================================================
   Keziah Group — script.js (client site)
   Reads CMS data + writes reservations via localStorage.
   Keys: PROJECT_CMS_UNITS, PROJECT_CMS_HERO, PROJECT_RESERVATIONS
   ========================================================= */

(function () {
  "use strict";

  var KEYS = {
    units: "PROJECT_CMS_UNITS",
    hero: "PROJECT_CMS_HERO",
    reservations: "PROJECT_RESERVATIONS",
  };

  /* ---------- Default data (mirrors admin.js seed) ---------- */

  var DEFAULT_UNITS = [
    {
      id: "F-01",
      name: "Field Garden Studio",
      property: "SMDC Field Residences",
      location: "Sucat, Para\u00f1aque City",
      type: "Studio",
      price: 2200,
      capacity: 4,
      area: 28,
      wifi: "150 Mbps",
      signature: "Neon wall",
      description: "Warm wood-slat details, emerald accents, and a tropical courtyard create a polished urban retreat minutes from NAIA.",
      image: "./images/ResidencesFull.jpg",
      status: "available",
    },
    {
      id: "F-02",
      name: "Field Wood-Slat Loft",
      property: "SMDC Field Residences",
      location: "Sucat, Para\u00f1aque City",
      type: "Loft",
      price: 2500,
      capacity: 4,
      area: 30,
      wifi: "150 Mbps",
      signature: "Wood-slat wall",
      description: "A calm, textural living space with a vertical wood-slat feature wall, ambient neon glow, and a media nook for slow nights in.",
      image: "./images/ResidenceLivingArea.jpg",
      status: "available",
    },
    {
      id: "F-03",
      name: "Field Pool-View Queen",
      property: "SMDC Field Residences",
      location: "Sucat, Para\u00f1aque City",
      type: "Suite",
      price: 2400,
      capacity: 3,
      area: 24,
      wifi: "150 Mbps",
      signature: "Pool view",
      description: "Wake up to courtyard pool views from a gingham-dressed queen bed, with a study desk and kitchenette for longer stays.",
      image: "./images/Field Residences Keziah Group/768962698_1026963896824913_1640508763953979682_n.jpg",
      status: "available",
    },
    {
      id: "S-01",
      name: "Shore 3 Canopy King",
      property: "SMDC Shore 3 Residences",
      location: "Mall of Asia Complex, Pasay",
      type: "King Room",
      price: 2600,
      capacity: 4,
      area: 32,
      wifi: "200 Mbps",
      signature: "Balcony view",
      description: "A light-filled high-rise sanctuary with contemporary interiors, a private balcony, and a spectacular multi-pool water park.",
      image: "./images/Shore3BedCanopy.jpg",
      status: "available",
    },
    {
      id: "S-02",
      name: "Shore 3 Courtyard Pool Loft",
      property: "SMDC Shore 3 Residences",
      location: "Mall of Asia Complex, Pasay",
      type: "Loft",
      price: 2900,
      capacity: 4,
      area: 34,
      wifi: "200 Mbps",
      signature: "Multi-pool deck",
      description: "Perched above the lagoon-style pool courtyards, this loft layers woven textures, tropical thatch, and resort-style leisure.",
      image: "./images/Shore3pool.jpg",
      status: "available",
    },
    {
      id: "S-03",
      name: "Shore 3 Balcony Suite",
      property: "SMDC Shore 3 Residences",
      location: "Mall of Asia Complex, Pasay",
      type: "Suite",
      price: 2800,
      capacity: 2,
      area: 30,
      wifi: "200 Mbps",
      signature: "City balcony",
      description: "A snug suite for two with a private balcony overlooking the Pasay skyline, five minutes from the Mall of Asia arena grounds.",
      image: "./images/Shore3Balcony.jpg",
      status: "available",
    },
  ];

  var DEFAULT_HERO = {
    kicker: "Metro Manila \u00b7 Curated Urban Stays",
    titleTop: "Resort living,",
    titleAccent: "beautifully redefined.",
    body: "Thoughtfully designed residences for weekends that feel a world away, right in the heart of the city.",
    image: "./images/HeroBgpic.jpg",
    imageAlt: "Luxury master bedroom at Keziah Group residences with panoramic outdoor pool view",
  };

  var GALLERY = {
    "Field Residences": [
      { src: "./images/SMDClivingarea.jpg", kicker: "Media Wall \u00b7 Fireplace Screen", title: "The Neon Lounge" },
      { src: "./images/Bathroom.jpg", kicker: "Hot Shower \u00b7 Fresh Towels", title: "Rain & Chrome" },
      { src: "./images/Field Residences Keziah Group/772177464_27746928598310769_3538866520957420293_n.jpg", kicker: "Living Room \u00b7 Mirrored Wall", title: "Soft Places to Land" },
      { src: "./images/Field Residences Keziah Group/771572526_1922496205095044_3380486222252288733_n.jpg", kicker: "Kitchenette \u00b7 Microwave & Fridge", title: "Morning Coffee Corner" },
      { src: "./images/Field Residences Keziah Group/768554940_2280423522769728_146719134858119705_n.jpg", kicker: "Bedroom \u00b7 Study Desk", title: "Sleeps Like a Resort" },
      { src: "./images/Field Residences Keziah Group/768307839_1091947016740290_1710103021768705760_n.jpg", kicker: "Pantry \u00b7 Cups & Glasses", title: "Stocked & Ready" },
    ],
    "Shore 3 Tower 2": [
      { src: "./images/Shore 3 Tower 2/766051810_28314050084858963_1056437649114870640_n.jpg", kicker: "Signature Neon \u00b7 Queen Bed", title: "Staycation Glow" },
      { src: "./images/Shore 3 Tower 2/768823553_1070301085512799_5926388324576497862_n.jpg", kicker: "Tropical Studio \u00b7 Thatch Accents", title: "The Beach Room" },
      { src: "./images/Shore 3 Tower 2/771693777_1076463458398359_4136069903078281382_n.jpg", kicker: "Reading Nook \u00b7 Candlelight", title: "Slow Evenings" },
      { src: "./images/Shore 3 Tower 2/768679304_1383037170632478_9091691338989067767_n.jpg", kicker: "Mustard Headboard \u00b7 Dried Florals", title: "Golden Hour Suite" },
      { src: "./images/Shore 3 Tower 2/768576757_2910725872605695_6952919627241142653_n.jpg", kicker: "Kitchen \u00b7 Cooktop & Hood", title: "Cook-in Convenience" },
      { src: "./images/Shore 3 Tower 2/771843542_1076937381686898_8510821433117670741_n.jpg", kicker: "Bathroom \u00b7 Washer Ready", title: "Fresh & Functional" },
    ],
  };

  var FALLBACK_IMAGE = "./images/HeroBgpic.jpg";

  /* ---------- Storage helpers ---------- */

  function readStore(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (err) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      /* storage unavailable (private mode); fail quietly */
    }
  }

  function getUnits() {
    var units = readStore(KEYS.units, null);
    if (!Array.isArray(units) || units.length === 0) return DEFAULT_UNITS.slice();
    return units;
  }

  function getHero() {
    var hero = readStore(KEYS.hero, null);
    if (!hero || typeof hero !== "object") return DEFAULT_HERO;
    return {
      kicker: hero.kicker || DEFAULT_HERO.kicker,
      titleTop: hero.titleTop || DEFAULT_HERO.titleTop,
      titleAccent: hero.titleAccent || DEFAULT_HERO.titleAccent,
      body: hero.body || DEFAULT_HERO.body,
      image: hero.image || DEFAULT_HERO.image,
      imageAlt: hero.imageAlt || DEFAULT_HERO.imageAlt,
    };
  }

  function getReservations() {
    var list = readStore(KEYS.reservations, null);
    if (!Array.isArray(list)) return [];
    return list;
  }

  function saveReservations(list) {
    writeStore(KEYS.reservations, list);
  }

  /* ---------- Formatting ---------- */

  function peso(n) {
    return "\u20b1" + Number(n).toLocaleString("en-PH", { maximumFractionDigits: 0 });
  }

  function parseISO(value) {
    if (!value) return null;
    var parts = value.split("-");
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10) - 1;
    var d = parseInt(parts[2], 10);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    return new Date(y, m, d);
  }

  function fmtDate(iso) {
    var dt = parseISO(iso);
    if (!dt) return "\u2014";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var suffix = dt.getDate() === 1 || dt.getDate() === 21 || dt.getDate() === 31 ? "st" : dt.getDate() === 2 || dt.getDate() === 22 ? "nd" : dt.getDate() === 3 || dt.getDate() === 23 ? "rd" : "th";
    return months[dt.getMonth()] + " " + dt.getDate() + suffix + ", " + dt.getFullYear();
  }

  function nightsBetween(checkin, checkout) {
    var a = parseISO(checkin);
    var b = parseISO(checkout);
    if (!a || !b) return 0;
    var diff = Math.round((b.getTime() - a.getTime()) / 86400000);
    return diff > 0 ? diff : 0;
  }

  function nextBookingId(existing) {
    var max = 1000;
    existing.forEach(function (r) {
      var match = /^KG-(\d+)$/.exec(String(r.id || ""));
      if (match) max = Math.max(max, parseInt(match[1], 10));
    });
    return "KG-" + (max + 1);
  }

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  /* ---------- Hero (CMS-driven) ---------- */

  function applyHero() {
    var hero = getHero();
    var img = document.getElementById("hero-image");
    if (img) {
      img.onerror = function () {
        img.onerror = null;
        img.src = FALLBACK_IMAGE;
      };
      img.src = hero.image;
      img.alt = hero.imageAlt;
    }
    var kicker = document.getElementById("hero-kicker");
    if (kicker) kicker.textContent = hero.kicker;
    var top = document.getElementById("hero-title-top");
    if (top) top.textContent = hero.titleTop;
    var accent = document.getElementById("hero-title-accent");
    if (accent) accent.textContent = hero.titleAccent;
    var body = document.getElementById("hero-body");
    if (body) body.textContent = hero.body;
  }

  /* ---------- Collection (CMS-driven units) ---------- */

  function unitCard(unit) {
    var article = document.createElement("article");
    article.className = "residence";

    var media = document.createElement("div");
    media.className = "residence-media";
    var img = document.createElement("img");
    img.src = unit.image;
    img.alt = unit.name + " at " + unit.property;
    img.onerror = function () {
      img.onerror = null;
      img.src = FALLBACK_IMAGE;
    };
    var link = document.createElement("a");
    link.href = "#reservation";
    link.className = "round-arrow small";
    link.setAttribute("aria-label", "Reserve " + unit.name);
    link.textContent = "\u2192";
    media.appendChild(img);
    media.appendChild(link);

    var body = document.createElement("div");
    body.className = "residence-body";

    var meta = document.createElement("div");
    meta.className = "residence-meta";
    var loc = document.createElement("span");
    loc.className = "small-caps";
    loc.textContent = unit.location;
    var rate = document.createElement("span");
    rate.className = "rate";
    rate.textContent = peso(unit.price) + " ";
    var per = document.createElement("span");
    per.className = "per";
    per.textContent = "/ night";
    rate.appendChild(per);
    meta.appendChild(loc);
    meta.appendChild(rate);

    var title = document.createElement("h3");
    title.className = "residence-title";
    title.textContent = unit.name;

    var desc = document.createElement("p");
    desc.textContent = unit.description;

    var specs = document.createElement("ul");
    specs.className = "specs";
    [
      ["Area", unit.area + " m\u00b2"],
      ["Guests", "2\u2013" + unit.capacity],
      ["Wi-Fi", unit.wifi],
      ["Signature", unit.signature],
    ].forEach(function (pair) {
      var li = document.createElement("li");
      var label = document.createElement("span");
      label.className = "spec-label";
      label.textContent = pair[0];
      var value = document.createElement("span");
      value.className = "spec-value";
      value.textContent = pair[1];
      li.appendChild(label);
      li.appendChild(value);
      specs.appendChild(li);
    });

    body.appendChild(meta);
    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(specs);

    article.appendChild(media);
    article.appendChild(body);
    return article;
  }

  function renderCollection() {
    var grid = document.getElementById("collection-grid");
    if (!grid) return;
    var units = getUnits().filter(function (u) {
      return u.status === "available";
    });
    if (units.length === 0) return; // keep static fallback cards
    grid.textContent = "";
    units.forEach(function (unit) {
      grid.appendChild(unitCard(unit));
    });
  }

  /* ---------- Gallery ---------- */

  var galleryState = { tab: "Field Residences", index: 0 };

  function setSlide(index) {
    var slides = GALLERY[galleryState.tab];
    galleryState.index = ((index % slides.length) + slides.length) % slides.length;

    var slide = slides[galleryState.index];
    var img = document.getElementById("deck-img");
    if (img) {
      img.onerror = function () {
        img.onerror = null;
        img.src = FALLBACK_IMAGE;
      };
      img.src = slide.src;
      img.alt = slide.title + " \u2014 " + slide.kicker;
    }
    var kicker = document.getElementById("deck-kicker");
    if (kicker) kicker.textContent = slide.kicker;
    var title = document.getElementById("deck-title");
    if (title) title.textContent = slide.title;
    var counter = document.getElementById("deck-counter");
    if (counter) counter.textContent = pad2(galleryState.index + 1) + " / " + pad2(slides.length);

    var thumbs = document.getElementById("gallery-thumbs");
    if (thumbs) {
      var items = thumbs.children;
      for (var i = 0; i < items.length; i++) {
        items[i].classList.toggle("active", i === galleryState.index);
      }
    }
  }

  function renderThumbs() {
    var thumbs = document.getElementById("gallery-thumbs");
    if (!thumbs) return;
    thumbs.textContent = "";
    GALLERY[galleryState.tab].forEach(function (slide, i) {
      var li = document.createElement("li");
      var img = document.createElement("img");
      img.src = slide.src;
      img.alt = slide.title;
      img.onerror = function () {
        img.onerror = null;
        img.src = FALLBACK_IMAGE;
      };
      li.appendChild(img);
      li.addEventListener("click", function () {
        setSlide(i);
      });
      thumbs.appendChild(li);
    });
  }

  function initGallery() {
    var tabs = document.querySelectorAll("#gallery-tabs .tab");
    Array.prototype.forEach.call(tabs, function (btn) {
      btn.addEventListener("click", function () {
        Array.prototype.forEach.call(tabs, function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        galleryState.tab = btn.getAttribute("data-tab") || "Field Residences";
        renderThumbs();
        setSlide(0);
      });
    });

    var prev = document.getElementById("deck-prev");
    if (prev) prev.addEventListener("click", function () { setSlide(galleryState.index - 1); });
    var next = document.getElementById("deck-next");
    if (next) next.addEventListener("click", function () { setSlide(galleryState.index + 1); });

    renderThumbs();
    setSlide(0);
  }

  /* ---------- Reservation form ---------- */

  function populateUnitSelect() {
    var select = document.getElementById("select-property");
    if (!select) return;
    var units = getUnits().filter(function (u) {
      return u.status === "available";
    });
    select.textContent = "";
    if (units.length === 0) {
      var opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No units available \u2014 check back soon";
      select.appendChild(opt);
      select.disabled = true;
      return;
    }
    units.forEach(function (unit, i) {
      var option = document.createElement("option");
      option.value = unit.id;
      option.textContent = unit.name + " \u00b7 " + peso(unit.price) + "/night";
      if (i === 0) option.selected = true;
      select.appendChild(option);
    });
  }

  function selectedUnit() {
    var select = document.getElementById("select-property");
    var id = select ? select.value : "";
    return getUnits().find(function (u) {
      return u.id === id;
    }) || null;
  }

  function updateStaySummary() {
    var summary = document.getElementById("stay-summary");
    if (!summary) return;
    var unit = selectedUnit();
    var checkin = document.getElementById("check-in");
    var checkout = document.getElementById("check-out");
    var nights = nightsBetween(checkin ? checkin.value : "", checkout ? checkout.value : "");
    if (!unit || nights === 0) {
      summary.hidden = true;
      summary.textContent = "";
      return;
    }
    var total = nights * unit.price;
    summary.hidden = false;
    summary.textContent = nights + (nights === 1 ? " night" : " nights") + " \u00b7 " + peso(total) + " estimated total (taxes included)";
  }

  function showConfirmation(booking) {
    var form = document.getElementById("reservation-form");
    var panel = document.getElementById("reservation-confirmation");
    if (!form || !panel) return;
    form.hidden = true;
    panel.hidden = false;

    var ref = document.getElementById("confirm-ref");
    if (ref) ref.textContent = booking.id;

    var details = document.getElementById("confirm-details");
    if (details) {
      details.textContent = "";
      [
        ["Unit", booking.unitName],
        ["Check-in", fmtDate(booking.checkin)],
        ["Check-out", fmtDate(booking.checkout)],
        ["Guests", String(booking.guests)],
        ["Nights", String(booking.nights)],
        ["Estimated total", peso(booking.total)],
      ].forEach(function (pair) {
        var dt = document.createElement("dt");
        dt.textContent = pair[0];
        var dd = document.createElement("dd");
        dd.textContent = pair[1];
        details.appendChild(dt);
        details.appendChild(dd);
      });
    }

    panel.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function resetToForm() {
    var form = document.getElementById("reservation-form");
    var panel = document.getElementById("reservation-confirmation");
    if (!form || !panel) return;
    form.reset();
    populateUnitSelect();
    updateStaySummary();
    panel.hidden = true;
    form.hidden = false;
  }

  function initReservationForm() {
    populateUnitSelect();
    updateStaySummary();

    var form = document.getElementById("reservation-form");
    if (!form) return;

    var refresh = function () {
      updateStaySummary();
    };
    ["select-property", "check-in", "check-out", "guests"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener("change", refresh);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var unit = selectedUnit();
      var name = document.getElementById("guest-name");
      var mobile = document.getElementById("guest-mobile");
      var checkin = document.getElementById("check-in");
      var checkout = document.getElementById("check-out");
      var guests = document.getElementById("guests");

      var valid = true;
      [
        [name, function (el) { return el.value.trim().length > 1; }],
        [mobile, function (el) { return el.value.trim().length > 5; }],
        [checkin, function (el) { return parseISO(el.value) !== null; }],
        [checkout, function (el) { return nightsBetween(checkin.value, el.value) > 0; }],
        [guests, function (el) { return parseInt(el.value, 10) >= 1; }],
      ].forEach(function (pair) {
        var el = pair[0];
        var ok = unit && el && pair[1](el);
        el.classList.toggle("field-error", !ok);
        if (!ok) valid = false;
      });

      if (!valid || !unit) return;

      var nights = nightsBetween(checkin.value, checkout.value);
      var reservations = getReservations();
      var booking = {
        id: nextBookingId(reservations),
        unitId: unit.id,
        unitName: unit.name,
        property: unit.property,
        guest: name.value.trim(),
        contact: mobile.value.trim(),
        checkin: checkin.value,
        checkout: checkout.value,
        guests: parseInt(guests.value, 10),
        nights: nights,
        total: nights * unit.price,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      reservations.push(booking);
      saveReservations(reservations);
      showConfirmation(booking);
    });

    var resetBtn = document.getElementById("confirm-reset");
    if (resetBtn) resetBtn.addEventListener("click", resetToForm);
  }

  /* ---------- Newsletter ---------- */

  function initNewsletter() {
    var form = document.querySelector(".newsletter-form");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = form.querySelector("input[type=email]");
      var button = form.querySelector("button");
      if (!input || !input.value) return;
      form.classList.add("subscribed");
      if (button) button.textContent = "Subscribed";
      input.value = "";
      input.placeholder = "SEE YOU IN YOUR INBOX";
      input.disabled = true;
      if (button) button.disabled = true;
    });
  }

  /* ---------- Boot ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    applyHero();
    renderCollection();
    initGallery();
    initReservationForm();
    initNewsletter();
  });
})();
