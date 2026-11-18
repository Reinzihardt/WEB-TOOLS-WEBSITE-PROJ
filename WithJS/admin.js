/* =========================================================
   Keziah Group — admin.js (shared admin portal logic)
   Pages: admin-dashboard.html, admin-reservations.html,
   admin-cms.html. Syncs with the client site (index.html)
   through localStorage keys:
     PROJECT_CMS_UNITS  ·  PROJECT_CMS_HERO  ·  PROJECT_RESERVATIONS
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     1. Local image manifest — every real file under ./images/
     ========================================================= */

  var LOCAL_IMAGES_MANIFEST = [
    "./images/Bathroom.jpg",
    "./images/Games.jpg",
    "./images/HeroBgpic.jpg",
    "./images/ResidenceLivingArea.jpg",
    "./images/ResidencesFull.jpg",
    "./images/Shore3Balcony.jpg",
    "./images/Shore3BedCanopy.jpg",
    "./images/Shore3pool.jpg",
    "./images/SMDClivingarea.jpg",
    "./images/Field Residences Keziah Group/768307839_1091947016740290_1710103021768705760_n.jpg",
    "./images/Field Residences Keziah Group/768554940_2280423522769728_146719134858119705_n.jpg",
    "./images/Field Residences Keziah Group/768679304_1378665114203435_5256659712430515592_n.jpg",
    "./images/Field Residences Keziah Group/768746904_1696724388103323_55373235715381130_n.jpg",
    "./images/Field Residences Keziah Group/768962698_1026963896824913_1640508763953979682_n.jpg",
    "./images/Field Residences Keziah Group/770387571_1041868808552276_2176791805857020544_n.jpg",
    "./images/Field Residences Keziah Group/770677780_925764496583147_5055794189862778213_n.jpg",
    "./images/Field Residences Keziah Group/771307232_1552308799069955_6605780941434865385_n.jpg",
    "./images/Field Residences Keziah Group/771379113_1078403004879967_8509299371973973024_n.jpg",
    "./images/Field Residences Keziah Group/771572526_1922496205095044_3380486222252288733_n.jpg",
    "./images/Field Residences Keziah Group/772177464_27746928598310769_3538866520957420293_n.jpg",
    "./images/Field Residences Keziah Group/772943646_1591252646129230_4546409695557825449_n.jpg",
    "./images/Field Residences Keziah Group/773120227_1114723207886209_5016742012236565366_n.jpg",
    "./images/Shore 3 Tower 2/764531179_1577152200723843_4224525762653773561_n.jpg",
    "./images/Shore 3 Tower 2/764550634_2268456940385711_9034622465181755152_n.jpg",
    "./images/Shore 3 Tower 2/764817234_1439947934846393_7141973612724028055_n.jpg",
    "./images/Shore 3 Tower 2/764861874_856313777413431_3150251777304387953_n.jpg",
    "./images/Shore 3 Tower 2/765262232_1565639328598598_8146226615440787069_n.jpg",
    "./images/Shore 3 Tower 2/765854310_1562364878867951_5754192265759222059_n.jpg",
    "./images/Shore 3 Tower 2/766007630_1360185842961089_9189251892688464480_n.jpg",
    "./images/Shore 3 Tower 2/766051810_28314050084858963_1056437649114870640_n.jpg",
    "./images/Shore 3 Tower 2/766287162_2555281311609087_6935562282163305662_n.jpg",
    "./images/Shore 3 Tower 2/766383547_1069160098887402_3585705395719581404_n.jpg",
    "./images/Shore 3 Tower 2/766913541_2182149682496487_4691545108049705565_n.jpg",
    "./images/Shore 3 Tower 2/767560130_1437800851492750_6921806562521652572_n.jpg",
    "./images/Shore 3 Tower 2/767945232_1774249997046418_3164012983819070313_n.jpg",
    "./images/Shore 3 Tower 2/768016145_1119192037301458_4672704714821425312_n.jpg",
    "./images/Shore 3 Tower 2/768576757_2910725872605695_6952919627241142653_n.jpg",
    "./images/Shore 3 Tower 2/768679304_1383037170632478_9091691338989067767_n.jpg",
    "./images/Shore 3 Tower 2/768823553_1070301085512799_5926388324576497862_n.jpg",
    "./images/Shore 3 Tower 2/768859571_1085258977501501_1471242599913192631_n.jpg",
    "./images/Shore 3 Tower 2/771693777_1076463458398359_4136069903078281382_n.jpg",
    "./images/Shore 3 Tower 2/771843542_1076937381686898_8510821433117670741_n.jpg"
  ];

  var FALLBACK_IMAGE = "./images/ResidencesFull.jpg";

  var KEYS = {
    units: "PROJECT_CMS_UNITS",
    hero: "PROJECT_CMS_HERO",
    reservations: "PROJECT_RESERVATIONS",
  };

  /* =========================================================
     2. Seed data (mirrors script.js defaults)
     ========================================================= */

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

  var SEED_RESERVATIONS = [
    { id: "KG-1001", unitId: "S-01", unitName: "Shore 3 Canopy King", property: "SMDC Shore 3 Residences", guest: "Maria Santos", contact: "+63 917 845 2210", checkin: "2026-11-20", checkout: "2026-11-23", guests: 2, nights: 3, total: 7800, status: "pending", createdAt: "2026-11-16T09:12:00+08:00" },
    { id: "KG-1002", unitId: "F-01", unitName: "Field Garden Studio", property: "SMDC Field Residences", guest: "Juan Dela Cruz", contact: "+63 918 220 7754", checkin: "2026-11-14", checkout: "2026-11-18", guests: 2, nights: 4, total: 8800, status: "checked-in", createdAt: "2026-11-09T15:40:00+08:00" },
    { id: "KG-1003", unitId: "S-03", unitName: "Shore 3 Balcony Suite", property: "SMDC Shore 3 Residences", guest: "Karla Mendoza", contact: "karla.mendoza@email.com", checkin: "2026-12-01", checkout: "2026-12-04", guests: 2, nights: 3, total: 8400, status: "confirmed", createdAt: "2026-11-12T11:05:00+08:00" },
    { id: "KG-1004", unitId: "F-02", unitName: "Field Wood-Slat Loft", property: "SMDC Field Residences", guest: "Miguel Torres", contact: "+63 906 553 1188", checkin: "2026-10-30", checkout: "2026-11-02", guests: 4, nights: 3, total: 7500, status: "completed", createdAt: "2026-10-22T18:27:00+08:00" },
    { id: "KG-1005", unitId: "S-02", unitName: "Shore 3 Courtyard Pool Loft", property: "SMDC Shore 3 Residences", guest: "Andrea Lim", contact: "+63 929 771 4402", checkin: "2026-11-25", checkout: "2026-11-28", guests: 4, nights: 3, total: 8700, status: "pending", createdAt: "2026-11-17T08:55:00+08:00" },
    { id: "KG-1006", unitId: "F-03", unitName: "Field Pool-View Queen", property: "SMDC Field Residences", guest: "Paolo Reyes", contact: "+63 915 664 9021", checkin: "2026-10-10", checkout: "2026-10-12", guests: 2, nights: 2, total: 4800, status: "cancelled", createdAt: "2026-10-04T13:48:00+08:00" },
  ];

  /* =========================================================
     3. Icons — inline SVG, 17px, 1.5px stroke
     ========================================================= */

  function icon(name) {
    var paths = {
      dashboard: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
      calendar: '<rect x="3" y="5" width="18" height="16"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>',
      cms: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
      exit: '<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>',
      plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
      search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
      pencil: '<path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>',
      trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
      check: '<path d="M20 6L9 17l-5-5"/>',
      x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
      image: '<rect x="3" y="3" width="18" height="18"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
      refresh: '<path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
      upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><line x1="12" y1="3" x2="12" y2="15"/>',
      home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
      layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    };
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + paths[name] + "</svg>";
  }

  function iconNode(name, small) {
    var span = document.createElement("span");
    span.innerHTML = icon(name);
    var svg = span.firstChild;
    if (small) svg.classList.add("small");
    return svg;
  }

  /* =========================================================
     4. Storage layer
     ========================================================= */

  function readRaw(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function readJSON(key, fallback) {
    var raw = readRaw(key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      /* storage unavailable; fail quietly */
    }
  }

  function removeKey(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      /* noop */
    }
  }

  function seedDemoData() {
    writeJSON(KEYS.units, DEFAULT_UNITS);
    writeJSON(KEYS.hero, DEFAULT_HERO);
    writeJSON(KEYS.reservations, SEED_RESERVATIONS);
  }

  function ensureSeeded() {
    if (!Array.isArray(readJSON(KEYS.units, null))) writeJSON(KEYS.units, DEFAULT_UNITS);
    if (typeof readJSON(KEYS.hero, null) !== "object" || readJSON(KEYS.hero, null) === null) writeJSON(KEYS.hero, DEFAULT_HERO);
    if (!Array.isArray(readJSON(KEYS.reservations, null))) writeJSON(KEYS.reservations, SEED_RESERVATIONS.slice());
  }

  function getUnits() {
    var units = readJSON(KEYS.units, DEFAULT_UNITS);
    return Array.isArray(units) ? units : DEFAULT_UNITS.slice();
  }

  function saveUnits(units) {
    writeJSON(KEYS.units, units);
  }

  function getHero() {
    var hero = readJSON(KEYS.hero, DEFAULT_HERO);
    if (!hero || typeof hero !== "object") return JSON.parse(JSON.stringify(DEFAULT_HERO));
    return hero;
  }

  function saveHero(hero) {
    writeJSON(KEYS.hero, hero);
  }

  function getReservations() {
    var list = readJSON(KEYS.reservations, []);
    return Array.isArray(list) ? list : [];
  }

  function saveReservations(list) {
    writeJSON(KEYS.reservations, list);
  }

  function resetDemo() {
    removeKey(KEYS.units);
    removeKey(KEYS.hero);
    removeKey(KEYS.reservations);
    seedDemoData();
  }

  /* =========================================================
     5. Shared helpers
     ========================================================= */

  function $(id) {
    return document.getElementById(id);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function peso(n) {
    return "\u20b1" + Number(n || 0).toLocaleString("en-PH", { maximumFractionDigits: 0 });
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

  function nightsBetween(a, b) {
    var d1 = parseISO(a);
    var d2 = parseISO(b);
    if (!d1 || !d2) return 0;
    var diff = Math.round((d2.getTime() - d1.getTime()) / 86400000);
    return diff > 0 ? diff : 0;
  }

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }

  var STATUS_LABELS = {
    "pending": "Pending",
    "confirmed": "Confirmed",
    "checked-in": "Checked-In",
    "completed": "Completed",
    "cancelled": "Cancelled",
  };

  var UNIT_STATUS_LABELS = {
    "available": "Available",
    "booked": "Booked",
    "draft": "Draft",
  };

  function statusPill(status) {
    var span = el("span", "pill " + status, STATUS_LABELS[status] || status);
    return span;
  }

  function unitStatusPill(status) {
    var span = el("span", "pill " + status, UNIT_STATUS_LABELS[status] || status);
    return span;
  }

  function fileName(path) {
    var parts = String(path).split("/");
    return parts[parts.length - 1];
  }

  function folderOf(path) {
    var parts = String(path).split("/");
    if (parts.length <= 3) return "images/";
    return parts[2];
  }

  function fallbackOnError(img) {
    img.onerror = function () {
      img.onerror = null;
      img.src = FALLBACK_IMAGE;
    };
  }

  function nextUnitId(units, property) {
    var prefix = property === "SMDC Shore 3 Residences" ? "S" : "F";
    var max = 0;
    units.forEach(function (u) {
      var match = new RegExp("^" + prefix + "-(\\d+)$").exec(String(u.id || ""));
      if (match) max = Math.max(max, parseInt(match[1], 10));
    });
    return prefix + "-" + pad2(max + 1);
  }

  /* =========================================================
     6. Modal helper
     ========================================================= */

  function openModal(title, bodyNode, onSave, saveLabel) {
    var overlay = el("div", "modal-overlay");
    var modal = el("div", "modal");
    overlay.appendChild(modal);

    var head = el("div", "modal-head");
    var h2 = el("h2", null, title);
    var closeBtn = el("button", "icon-btn");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close dialog");
    closeBtn.appendChild(iconNode("x"));
    closeBtn.addEventListener("click", function () {
      document.body.removeChild(overlay);
    });
    head.appendChild(h2);
    head.appendChild(closeBtn);
    modal.appendChild(head);

    var body = el("div", "modal-body");
    body.appendChild(bodyNode);
    modal.appendChild(body);

    var foot = el("div", "modal-foot");
    var cancelBtn = el("button", "btn", "Cancel");
    cancelBtn.type = "button";
    cancelBtn.addEventListener("click", function () {
      document.body.removeChild(overlay);
    });
    var saveBtn = el("button", "btn solid", saveLabel || "Save");
    saveBtn.type = "button";
    saveBtn.addEventListener("click", function () {
      if (onSave() !== false) {
        document.body.removeChild(overlay);
      }
    });
    foot.appendChild(cancelBtn);
    foot.appendChild(saveBtn);
    modal.appendChild(foot);

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) document.body.removeChild(overlay);
    });
    document.addEventListener("keydown", function onKey(event) {
      if (event.key === "Escape" && overlay.parentNode) {
        document.body.removeChild(overlay);
        document.removeEventListener("keydown", onKey);
      }
    });

    document.body.appendChild(overlay);
    return overlay;
  }

  /* =========================================================
     7. Image picker (manifest grid + upload + live preview)
     ========================================================= */

  function buildImagePicker(currentValue) {
    var root = el("div", "image-picker");
    var value = currentValue || FALLBACK_IMAGE;

    var previewWrap = el("div", "picker-preview");
    var frame = el("div", "preview-frame");
    var img = document.createElement("img");
    img.alt = "Selected unit image preview";
    fallbackOnError(img);
    frame.appendChild(img);
    previewWrap.appendChild(frame);

    var side = el("div", "picker-side");
    var urlField = el("div", "form-field");
    var urlLabel = el("label", null, "Image Path or Data URL");
    var urlInput = el("input");
    urlInput.type = "text";
    urlInput.placeholder = "./images/\u2026 or uploaded data URL";
    urlInput.value = value;
    urlField.appendChild(urlLabel);
    urlField.appendChild(urlInput);
    side.appendChild(urlField);

    var uploadField = el("div", "form-field");
    var uploadLabel = el("label", null, "Upload New Image");
    var uploadRow = el("div", "upload-row");
    var fileInput = el("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    var uploadIcon = iconNode("upload", true);
    uploadRow.appendChild(uploadIcon);
    uploadRow.appendChild(fileInput);
    uploadField.appendChild(uploadLabel);
    uploadField.appendChild(uploadRow);
    side.appendChild(uploadField);

    previewWrap.appendChild(side);
    root.appendChild(previewWrap);

    var gridLabel = el("span", "picker-label", "Choose from Local \u00b7 \u202f./images/ Library");
    root.appendChild(gridLabel);

    var grid = el("div", "manifest-grid");
    var tiles = [];

    function setValue(v, fromInput) {
      value = v;
      urlInput.value = v.startsWith("data:") ? "(uploaded image data URL)" : v;
      img.src = v;
      tiles.forEach(function (tile) {
        tile.classList.toggle("selected", tile.dataset.path === v && !v.startsWith("data:"));
      });
      if (!fromInput) {
        /* keep url input in sync when set programmatically */
      }
    }

    urlInput.addEventListener("input", function () {
      setValue(urlInput.value.trim() || FALLBACK_IMAGE, true);
    });

    fileInput.addEventListener("change", function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setValue(String(reader.result), false);
      };
      reader.onerror = function () {
        setValue(FALLBACK_IMAGE, false);
      };
    });

    LOCAL_IMAGES_MANIFEST.forEach(function (path) {
      var tile = document.createElement("button");
      tile.type = "button";
      tile.className = "manifest-item";
      tile.dataset.path = path;
      var thumb = el("div", "manifest-thumb");
      var timg = document.createElement("img");
      timg.src = path;
      timg.alt = fileName(path);
      timg.loading = "lazy";
      fallbackOnError(timg);
      thumb.appendChild(timg);
      tile.appendChild(thumb);
      tile.appendChild(el("span", "manifest-name", fileName(path)));
      tile.addEventListener("click", function () {
        setValue(path, false);
      });
      grid.appendChild(tile);
      tiles.push(tile);
    });

    root.appendChild(grid);
    setValue(value, false);

    return {
      root: root,
      get: function () {
        return value;
      },
    };
  }

  /* =========================================================
     8. Page: Dashboard
     ========================================================= */

  function renderDashboard() {
    var reservations = getReservations();
    var units = getUnits();

    var pending = reservations.filter(function (r) {
      return r.status === "pending";
    }).length;
    var available = units.filter(function (u) {
      return u.status === "available";
    }).length;

    var kpis = [
      { icon: "calendar", label: "Total Reservations", value: reservations.length, note: "All bookings logged locally" },
      { icon: "refresh", label: "Pending Approvals", value: pending, note: "Awaiting host confirmation" },
      { icon: "layers", label: "Active Units in CMS", value: available, note: units.length + " units managed total" },
      { icon: "image", label: "Local Images Indexed", value: LOCAL_IMAGES_MANIFEST.length, note: "Files found in ./images/" },
    ];

    var kpiGrid = $("kpi-grid");
    if (kpiGrid) {
      kpiGrid.textContent = "";
      kpis.forEach(function (kpi) {
        var card = el("article", "kpi-card");
        var top = el("div", "kpi-top");
        var label = el("span", "kpi-label", kpi.label);
        top.appendChild(label);
        top.appendChild(iconNode(kpi.icon));
        card.appendChild(top);
        card.appendChild(el("div", "kpi-value num", String(kpi.value)));
        card.appendChild(el("div", "kpi-note", kpi.note));
        kpiGrid.appendChild(card);
      });
    }

    renderLatestBookings(reservations);
    renderAvailability(units);
  }

  function renderLatestBookings(reservations) {
    var tbody = $("latest-bookings-body");
    if (!tbody) return;
    tbody.textContent = "";

    var sorted = reservations.slice().sort(function (a, b) {
      return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
    }).slice(0, 5);

    if (sorted.length === 0) {
      var tr = document.createElement("tr");
      var td = el("td", "empty-row", "No reservations yet \u2014 new requests from the live site will appear here.");
      td.colSpan = 6;
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    sorted.forEach(function (r) {
      var tr = document.createElement("tr");

      var tdId = el("td", "cell-strong num", r.id);
      tr.appendChild(tdId);

      var tdGuest = document.createElement("td");
      var person = el("div", "cell-person");
      person.appendChild(el("span", "cell-strong", r.guest));
      person.appendChild(el("span", "cell-muted", r.contact));
      tdGuest.appendChild(person);
      tr.appendChild(tdGuest);

      tr.appendChild(el("td", null, r.unitName));

      var tdDates = document.createElement("td");
      var dates = el("div", "cell-person");
      dates.appendChild(el("span", "num", fmtDate(r.checkin)));
      dates.appendChild(el("span", "cell-muted num", "\u2192 " + fmtDate(r.checkout) + " \u00b7 " + r.nights + " nights"));
      tdDates.appendChild(dates);
      tr.appendChild(tdDates);

      tr.appendChild(el("td", "cell-num", peso(r.total)));

      var tdStatus = document.createElement("td");
      tdStatus.appendChild(statusPill(r.status));
      tr.appendChild(tdStatus);

      var tdActions = document.createElement("td");
      var actions = el("div", "cell-actions");
      if (r.status === "pending") {
        var approve = el("button", "icon-btn ok");
        approve.type = "button";
        approve.title = "Approve reservation";
        approve.setAttribute("aria-label", "Approve reservation " + r.id);
        approve.appendChild(iconNode("check", true));
        approve.addEventListener("click", function () {
          updateReservationStatus(r.id, "confirmed");
        });
        actions.appendChild(approve);

        var cancel = el("button", "icon-btn warn");
        cancel.type = "button";
        cancel.title = "Cancel reservation";
        cancel.setAttribute("aria-label", "Cancel reservation " + r.id);
        cancel.appendChild(iconNode("x", true));
        cancel.addEventListener("click", function () {
          updateReservationStatus(r.id, "cancelled");
        });
        actions.appendChild(cancel);
      } else {
        var view = el("button", "icon-btn");
        view.type = "button";
        view.title = "Manage in Reservations";
        view.setAttribute("aria-label", "Manage reservation " + r.id);
        view.appendChild(iconNode("pencil", true));
        view.addEventListener("click", function () {
          window.location.href = "admin-reservations.html";
        });
        actions.appendChild(view);
      }
      tdActions.appendChild(actions);
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });
  }

  function renderAvailability(units) {
    var tbody = $("availability-body");
    if (!tbody) return;
    tbody.textContent = "";

    if (units.length === 0) {
      var tr = document.createElement("tr");
      var td = el("td", "empty-row", "No units in the CMS yet \u2014 add one from the Content Studio.");
      td.colSpan = 4;
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    units.forEach(function (u) {
      var tr = document.createElement("tr");

      var tdImg = document.createElement("td");
      var thumb = el("div", "unit-thumb");
      var img = document.createElement("img");
      img.src = u.image;
      img.alt = u.name;
      img.loading = "lazy";
      fallbackOnError(img);
      thumb.appendChild(img);
      tdImg.appendChild(thumb);
      tr.appendChild(tdImg);

      var tdName = document.createElement("td");
      var nameWrap = el("div", "cell-person");
      nameWrap.appendChild(el("span", "cell-strong", u.name));
      nameWrap.appendChild(el("span", "cell-muted", u.property + " \u00b7 " + u.type));
      tdName.appendChild(nameWrap);
      tr.appendChild(tdName);

      tr.appendChild(el("td", "cell-num", peso(u.price) + " / night"));

      var tdStatus = document.createElement("td");
      tdStatus.appendChild(unitStatusPill(u.status));
      tr.appendChild(tdStatus);

      tbody.appendChild(tr);
    });
  }

  /* =========================================================
     9. Page: Reservations
     ========================================================= */

  var resState = { query: "", tab: "all" };

  var RES_TABS = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "confirmed", label: "Confirmed" },
    { key: "staying", label: "Checked-In / Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  function matchesTab(r, tab) {
    if (tab === "all") return true;
    if (tab === "staying") return r.status === "checked-in" || r.status === "completed";
    return r.status === tab;
  }

  function filteredReservations() {
    var q = resState.query.trim().toLowerCase();
    return getReservations().filter(function (r) {
      if (!matchesTab(r, resState.tab)) return false;
      if (!q) return true;
      var haystack = [r.guest, r.contact, r.unitName, r.id].join(" ").toLowerCase();
      return haystack.indexOf(q) !== -1;
    });
  }

  function updateReservationStatus(id, status) {
    var list = getReservations();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].status = status;
        break;
      }
    }
    saveReservations(list);
    refreshAfterDataChange();
  }

  function refreshAfterDataChange() {
    if ($("latest-bookings-body")) {
      renderDashboard();
    }
    if ($("reservations-body")) {
      renderReservationsPage();
    }
    initSidebarCounts();
  }

  function deleteReservation(id) {
    var list = getReservations().filter(function (r) {
      return r.id !== id;
    });
    saveReservations(list);
    refreshAfterDataChange();
  }

  function renderReservationsPage() {
    var reservations = getReservations();

    var tabs = $("status-tabs");
    if (tabs) {
      tabs.textContent = "";
      RES_TABS.forEach(function (tab) {
        var btn = el("button", null, tab.label);
        btn.type = "button";
        var count = reservations.filter(function (r) {
          return matchesTab(r, tab.key);
        }).length;
        var countSpan = el("span", "tab-count num", String(count));
        btn.appendChild(countSpan);
        if (resState.tab === tab.key) btn.classList.add("active");
        btn.addEventListener("click", function () {
          resState.tab = tab.key;
          renderReservationsPage();
        });
        tabs.appendChild(btn);
      });
    }

    var tbody = $("reservations-body");
    if (tbody) {
      tbody.textContent = "";
      var rows = filteredReservations();

      if (rows.length === 0) {
        var tr = document.createElement("tr");
        var td = el("td", "empty-row", "No reservations match this view.");
        td.colSpan = 7;
        tr.appendChild(td);
        tbody.appendChild(tr);
      }

      rows.sort(function (a, b) {
        return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
      });

      rows.forEach(function (r) {
        var tr = document.createElement("tr");

        tr.appendChild(el("td", "cell-strong num", r.id));

        var tdGuest = document.createElement("td");
        var person = el("div", "cell-person");
        person.appendChild(el("span", "cell-strong", r.guest));
        person.appendChild(el("span", "cell-muted", r.contact));
        tdGuest.appendChild(person);
        tr.appendChild(tdGuest);

        var tdUnit = document.createElement("td");
        var unitWrap = el("div", "cell-person");
        unitWrap.appendChild(el("span", null, r.unitName));
        unitWrap.appendChild(el("span", "cell-muted", r.property));
        tdUnit.appendChild(unitWrap);
        tr.appendChild(tdUnit);

        var tdDates = document.createElement("td");
        var dates = el("div", "cell-person");
        dates.appendChild(el("span", "num", fmtDate(r.checkin)));
        dates.appendChild(el("span", "cell-muted num", "\u2192 " + fmtDate(r.checkout) + " \u00b7 " + r.nights + " nights"));
        tdDates.appendChild(dates);
        tr.appendChild(tdDates);

        var tdTotals = document.createElement("td");
        var totals = el("div", "cell-person");
        totals.appendChild(el("span", "num", r.guests + " guests"));
        totals.appendChild(el("span", "cell-strong num", peso(r.total)));
        tdTotals.appendChild(totals);
        tr.appendChild(tdTotals);

        var tdStatus = document.createElement("td");
        tdStatus.appendChild(statusPill(r.status));
        tr.appendChild(tdStatus);

        var tdActions = document.createElement("td");
        var actions = el("div", "cell-actions");

        if (r.status === "pending" || r.status === "confirmed" || r.status === "checked-in") {
          var confirmBtn = el("button", "icon-btn ok");
          confirmBtn.type = "button";
          confirmBtn.title = "Confirm reservation";
          confirmBtn.setAttribute("aria-label", "Confirm reservation " + r.id);
          confirmBtn.appendChild(iconNode("check", true));
          confirmBtn.addEventListener("click", function () {
            updateReservationStatus(r.id, "confirmed");
          });
          actions.appendChild(confirmBtn);
        }

        if (r.status === "pending" || r.status === "confirmed") {
          var cancelBtn = el("button", "icon-btn warn");
          cancelBtn.type = "button";
          cancelBtn.title = "Cancel reservation";
          cancelBtn.setAttribute("aria-label", "Cancel reservation " + r.id);
          cancelBtn.appendChild(iconNode("x", true));
          cancelBtn.addEventListener("click", function () {
            updateReservationStatus(r.id, "cancelled");
          });
          actions.appendChild(cancelBtn);
        }

        if (r.status === "confirmed") {
          var checkinBtn = el("button", "icon-btn");
          checkinBtn.type = "button";
          checkinBtn.title = "Mark as checked-in";
          checkinBtn.setAttribute("aria-label", "Check in reservation " + r.id);
          checkinBtn.appendChild(iconNode("home", true));
          checkinBtn.addEventListener("click", function () {
            updateReservationStatus(r.id, "checked-in");
          });
          actions.appendChild(checkinBtn);
        }

        if (r.status === "checked-in") {
          var completeBtn = el("button", "icon-btn");
          completeBtn.type = "button";
          completeBtn.title = "Mark as completed";
          completeBtn.setAttribute("aria-label", "Complete reservation " + r.id);
          completeBtn.appendChild(iconNode("check", true));
          completeBtn.addEventListener("click", function () {
            updateReservationStatus(r.id, "completed");
          });
          actions.appendChild(completeBtn);
        }

        var editBtn = el("button", "icon-btn");
        editBtn.type = "button";
        editBtn.title = "Edit reservation";
        editBtn.setAttribute("aria-label", "Edit reservation " + r.id);
        editBtn.appendChild(iconNode("pencil", true));
        editBtn.addEventListener("click", function () {
          openReservationModal(r);
        });
        actions.appendChild(editBtn);

        var deleteBtn = el("button", "icon-btn warn");
        deleteBtn.type = "button";
        deleteBtn.title = "Delete reservation";
        deleteBtn.setAttribute("aria-label", "Delete reservation " + r.id);
        deleteBtn.appendChild(iconNode("trash", true));
        deleteBtn.addEventListener("click", function () {
          if (window.confirm("Delete reservation " + r.id + " for " + r.guest + "? This cannot be undone.")) {
            deleteReservation(r.id);
          }
        });
        actions.appendChild(deleteBtn);

        tdActions.appendChild(actions);
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
      });
    }

    var navCount = $("nav-res-count");
    if (navCount) navCount.textContent = String(reservations.length);
  }

  function openReservationModal(existing) {
    var units = getUnits();
    var isEdit = Boolean(existing);

    var body = el("div", "form-grid");

    function field(labelText, input, span2) {
      var wrap = el("div", "form-field" + (span2 ? " span-2" : ""));
      wrap.appendChild(el("label", null, labelText));
      wrap.appendChild(input);
      body.appendChild(wrap);
      return input;
    }

    var guestInput = el("input");
    guestInput.type = "text";
    guestInput.placeholder = "Guest full name";
    field("Guest Name", guestInput, true);

    var contactInput = el("input");
    contactInput.type = "text";
    contactInput.placeholder = "Mobile, WhatsApp, or email";
    field("Contact", contactInput, true);

    var unitSelect = el("select");
    units.forEach(function (u) {
      var opt = el("option", null, u.name + " \u00b7 " + peso(u.price) + "/night");
      opt.value = u.id;
      unitSelect.appendChild(opt);
    });
    field("Unit Booked", unitSelect);

    var statusSelect = el("select");
    Object.keys(STATUS_LABELS).forEach(function (key) {
      var opt = el("option", null, STATUS_LABELS[key]);
      opt.value = key;
      statusSelect.appendChild(opt);
    });
    field("Status", statusSelect);

    var checkinInput = el("input");
    checkinInput.type = "date";
    field("Check-In", checkinInput);

    var checkoutInput = el("input");
    checkoutInput.type = "date";
    field("Check-Out", checkoutInput);

    var guestsInput = el("input");
    guestsInput.type = "number";
    guestsInput.min = "1";
    guestsInput.max = "8";
    guestsInput.value = "2";
    field("Guests", guestsInput);

    var totalNote = el("p", "cell-muted num", "");
    body.appendChild(totalNote);

    function refreshTotal() {
      var unit = units.find(function (u) {
        return u.id === unitSelect.value;
      });
      var nights = nightsBetween(checkinInput.value, checkoutInput.value);
      if (unit && nights > 0) {
        totalNote.textContent = nights + (nights === 1 ? " night" : " nights") + " \u00b7 " + peso(nights * unit.price) + " total";
      } else {
        totalNote.textContent = "Choose valid dates to compute the total.";
      }
    }
    unitSelect.addEventListener("change", refreshTotal);
    checkinInput.addEventListener("change", refreshTotal);
    checkoutInput.addEventListener("change", refreshTotal);

    if (isEdit) {
      guestInput.value = existing.guest;
      contactInput.value = existing.contact;
      unitSelect.value = existing.unitId;
      statusSelect.value = existing.status;
      checkinInput.value = existing.checkin;
      checkoutInput.value = existing.checkout;
      guestsInput.value = existing.guests;
    } else {
      statusSelect.value = "pending";
      if (units.length > 0) unitSelect.value = units[0].id;
    }
    refreshTotal();

    openModal(isEdit ? "Edit Reservation \u00b7 " + existing.id : "New Manual Reservation", body, function () {
      var unit = units.find(function (u) {
        return u.id === unitSelect.value;
      });
      var nights = nightsBetween(checkinInput.value, checkoutInput.value);
      var valid = true;

      [[guestInput, function (el2) { return el2.value.trim().length > 1; }],
       [contactInput, function (el2) { return el2.value.trim().length > 4; }],
       [checkinInput, function (el2) { return parseISO(el2.value) !== null; }],
       [checkoutInput, function (el2) { return nights > 0; }],
       [guestsInput, function (el2) { return parseInt(el2.value, 10) >= 1; }]
      ].forEach(function (pair) {
        pair[0].classList.toggle("field-error", !pair[1](pair[0]));
        if (!pair[1](pair[0])) valid = false;
      });

      if (!valid || !unit) return false;

      var list = getReservations();
      if (isEdit) {
        list.forEach(function (r) {
          if (r.id === existing.id) {
            r.guest = guestInput.value.trim();
            r.contact = contactInput.value.trim();
            r.unitId = unit.id;
            r.unitName = unit.name;
            r.property = unit.property;
            r.checkin = checkinInput.value;
            r.checkout = checkoutInput.value;
            r.guests = parseInt(guestsInput.value, 10);
            r.nights = nights;
            r.total = nights * unit.price;
            r.status = statusSelect.value;
          }
        });
      } else {
        var max = 1000;
        list.forEach(function (r) {
          var match = /^KG-(\d+)$/.exec(String(r.id || ""));
          if (match) max = Math.max(max, parseInt(match[1], 10));
        });
        list.push({
          id: "KG-" + (max + 1),
          unitId: unit.id,
          unitName: unit.name,
          property: unit.property,
          guest: guestInput.value.trim(),
          contact: contactInput.value.trim(),
          checkin: checkinInput.value,
          checkout: checkoutInput.value,
          guests: parseInt(guestsInput.value, 10),
          nights: nights,
          total: nights * unit.price,
          status: statusSelect.value,
          createdAt: new Date().toISOString(),
        });
      }
      saveReservations(list);
      renderReservationsPage();
    });

    guestInput.focus();
  }

  /* =========================================================
     10. Page: CMS
     ========================================================= */

  function initCmsTabs() {
    var tabs = $("cms-tabs");
    if (!tabs) return;
    Array.prototype.forEach.call(tabs.querySelectorAll("button"), function (btn) {
      btn.addEventListener("click", function () {
        Array.prototype.forEach.call(tabs.querySelectorAll("button"), function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        ["cms-units", "cms-hero", "cms-library"].forEach(function (panelId) {
          var panel = $(panelId);
          if (panel) panel.hidden = panelId !== btn.getAttribute("data-panel");
        });
      });
    });
  }

  function renderUnitsTab() {
    var tbody = $("units-body");
    if (!tbody) return;
    tbody.textContent = "";
    var units = getUnits();

    if (units.length === 0) {
      var tr = document.createElement("tr");
      var td = el("td", "empty-row", "No units yet. Add your first unit to publish it on the live site.");
      td.colSpan = 7;
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    units.forEach(function (u) {
      var tr = document.createElement("tr");

      var tdImg = document.createElement("td");
      var thumb = el("div", "unit-thumb");
      var img = document.createElement("img");
      img.src = u.image;
      img.alt = u.name;
      img.loading = "lazy";
      fallbackOnError(img);
      thumb.appendChild(img);
      tdImg.appendChild(thumb);
      tr.appendChild(tdImg);

      var tdName = document.createElement("td");
      var nameWrap = el("div", "cell-person");
      nameWrap.appendChild(el("span", "cell-strong", u.name));
      nameWrap.appendChild(el("span", "cell-muted", u.property + " \u00b7 " + u.location));
      tdName.appendChild(nameWrap);
      tr.appendChild(tdName);

      tr.appendChild(el("td", null, u.type));
      tr.appendChild(el("td", "cell-num", peso(u.price)));
      tr.appendChild(el("td", "cell-num", "2\u2013" + u.capacity));

      var tdStatus = document.createElement("td");
      tdStatus.appendChild(unitStatusPill(u.status));
      tr.appendChild(tdStatus);

      var tdActions = document.createElement("td");
      var actions = el("div", "cell-actions");

      var editBtn = el("button", "icon-btn");
      editBtn.type = "button";
      editBtn.title = "Edit unit";
      editBtn.setAttribute("aria-label", "Edit unit " + u.name);
      editBtn.appendChild(iconNode("pencil", true));
      editBtn.addEventListener("click", function () {
        openUnitModal(u);
      });
      actions.appendChild(editBtn);

      var deleteBtn = el("button", "icon-btn warn");
      deleteBtn.type = "button";
      deleteBtn.title = "Delete unit";
      deleteBtn.setAttribute("aria-label", "Delete unit " + u.name);
      deleteBtn.appendChild(iconNode("trash", true));
      deleteBtn.addEventListener("click", function () {
        if (window.confirm('Remove "' + u.name + '" from the CMS? The live site will stop listing it.')) {
          saveUnits(
            getUnits().filter(function (x) {
              return x.id !== u.id;
            })
          );
          renderUnitsTab();
          initSidebarCounts();
        }
      });
      actions.appendChild(deleteBtn);

      tdActions.appendChild(actions);
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });
  }

  function openUnitModal(existing) {
    var units = getUnits();
    var isEdit = Boolean(existing);
    var body = el("div", "form-grid");

    function field(labelText, input, span2, hint) {
      var wrap = el("div", "form-field" + (span2 ? " span-2" : ""));
      wrap.appendChild(el("label", null, labelText));
      wrap.appendChild(input);
      if (hint) wrap.appendChild(el("span", "field-hint", hint));
      body.appendChild(wrap);
      return input;
    }

    var nameInput = el("input");
    nameInput.type = "text";
    nameInput.placeholder = "e.g. Field Garden Studio";
    field("Unit Name", nameInput);

    var typeInput = el("input");
    typeInput.type = "text";
    typeInput.placeholder = "Studio, Loft, Suite\u2026";
    field("Category / Type", typeInput);

    var propertySelect = el("select");
    ["SMDC Field Residences", "SMDC Shore 3 Residences"].forEach(function (p) {
      var opt = el("option", null, p);
      opt.value = p;
      propertySelect.appendChild(opt);
    });
    field("Property", propertySelect);

    var statusSelect = el("select");
    Object.keys(UNIT_STATUS_LABELS).forEach(function (key) {
      var opt = el("option", null, UNIT_STATUS_LABELS[key]);
      opt.value = key;
      statusSelect.appendChild(opt);
    });
    field("Status", statusSelect);

    var priceInput = el("input");
    priceInput.type = "number";
    priceInput.min = "0";
    priceInput.step = "50";
    priceInput.placeholder = "2200";
    field("Price / Rate per Night (\u20b1)", priceInput);

    var capacityInput = el("input");
    capacityInput.type = "number";
    capacityInput.min = "1";
    capacityInput.max = "12";
    capacityInput.placeholder = "4";
    field("Capacity (Guests)", capacityInput);

    var areaInput = el("input");
    areaInput.type = "number";
    areaInput.min = "10";
    areaInput.max = "200";
    areaInput.placeholder = "28";
    field("Area (m\u00b2)", areaInput);

    var wifiInput = el("input");
    wifiInput.type = "text";
    wifiInput.placeholder = "150 Mbps";
    field("Wi-Fi Speed", wifiInput);

    var signatureInput = el("input");
    signatureInput.type = "text";
    signatureInput.placeholder = "Neon wall, Balcony view\u2026";
    field("Signature Feature", signatureInput);

    var descInput = el("textarea");
    descInput.placeholder = "Short editorial description shown on the live site card\u2026";
    field("Description", descInput, true);

    var pickerWrap = el("div", "form-field span-2");
    pickerWrap.appendChild(el("label", null, "Unit Image"));
    var picker = buildImagePicker(existing ? existing.image : FALLBACK_IMAGE);
    pickerWrap.appendChild(picker.root);
    body.appendChild(pickerWrap);

    if (isEdit) {
      nameInput.value = existing.name;
      typeInput.value = existing.type;
      propertySelect.value = existing.property;
      statusSelect.value = existing.status;
      priceInput.value = existing.price;
      capacityInput.value = existing.capacity;
      areaInput.value = existing.area;
      wifiInput.value = existing.wifi;
      signatureInput.value = existing.signature;
      descInput.value = existing.description;
    } else {
      statusSelect.value = "available";
    }

    openModal(isEdit ? "Edit Unit \u00b7 " + existing.id : "Add Unit", body, function () {
      var price = parseFloat(priceInput.value);
      var capacity = parseInt(capacityInput.value, 10);
      var area = parseFloat(areaInput.value);
      var valid = true;

      [[nameInput, function (i) { return i.value.trim().length > 2; }],
       [typeInput, function (i) { return i.value.trim().length > 1; }],
       [priceInput, function (i) { return !isNaN(price) && price > 0; }],
       [capacityInput, function (i) { return !isNaN(capacity) && capacity > 0; }],
       [areaInput, function (i) { return !isNaN(area) && area > 0; }]
      ].forEach(function (pair) {
        pair[0].classList.toggle("field-error", !pair[1](pair[0]));
        if (!pair[1](pair[0])) valid = false;
      });

      if (!valid) return false;

      var image = picker.get();
      var list = getUnits();
      if (isEdit) {
        list.forEach(function (u) {
          if (u.id === existing.id) {
            u.name = nameInput.value.trim();
            u.type = typeInput.value.trim();
            u.property = propertySelect.value;
            u.location = propertySelect.value === "SMDC Shore 3 Residences" ? "Mall of Asia Complex, Pasay" : "Sucat, Para\u00f1aque City";
            u.status = statusSelect.value;
            u.price = price;
            u.capacity = capacity;
            u.area = area;
            u.wifi = wifiInput.value.trim() || "150 Mbps";
            u.signature = signatureInput.value.trim() || "\u2014";
            u.description = descInput.value.trim();
            u.image = image;
          }
        });
      } else {
        var property = propertySelect.value;
        list.push({
          id: nextUnitId(list, property),
          name: nameInput.value.trim(),
          property: property,
          location: property === "SMDC Shore 3 Residences" ? "Mall of Asia Complex, Pasay" : "Sucat, Para\u00f1aque City",
          type: typeInput.value.trim(),
          price: price,
          capacity: capacity,
          area: area,
          wifi: wifiInput.value.trim() || "150 Mbps",
          signature: signatureInput.value.trim() || "\u2014",
          description: descInput.value.trim() || "A curated Keziah Group stay.",
          image: image,
          status: statusSelect.value,
        });
      }
      saveUnits(list);
      renderUnitsTab();
      initSidebarCounts();
    }, isEdit ? "Save Unit" : "Add Unit");

    nameInput.focus();
  }

  /* ----- Hero & Site Text tab ----- */

  function renderHeroTab() {
    var form = $("hero-form");
    if (!form) return;
    var hero = getHero();

    var kickerInput = $("hero-field-kicker");
    var topInput = $("hero-field-title");
    var accentInput = $("hero-field-accent");
    var bodyInput = $("hero-field-body");
    var pickerHost = $("hero-field-image");

    kickerInput.value = hero.kicker;
    topInput.value = hero.titleTop;
    accentInput.value = hero.titleAccent;
    bodyInput.value = hero.body;

    var picker = buildImagePicker(hero.image);
    pickerHost.textContent = "";
    pickerHost.appendChild(picker.root);

    var previewImg = $("hero-preview-img");
    var previewKicker = $("hero-preview-kicker");
    var previewTitleTop = $("hero-preview-top");
    var previewTitleAccent = $("hero-preview-accent");
    var previewBody = $("hero-preview-body");

    function syncPreview() {
      var path = picker.get();
      if (path.indexOf("data:") !== 0) {
        previewImg.onerror = function () {
          previewImg.onerror = null;
          previewImg.src = FALLBACK_IMAGE;
        };
        previewImg.src = path;
      } else {
        previewImg.onerror = null;
        previewImg.src = path;
      }
      previewKicker.textContent = kickerInput.value || "\u2014";
      previewTitleTop.textContent = topInput.value || "\u2014";
      previewTitleAccent.textContent = accentInput.value || "\u2014";
      previewBody.textContent = bodyInput.value || "\u2014";
    }

    [kickerInput, topInput, accentInput, bodyInput].forEach(function (input) {
      input.addEventListener("input", syncPreview);
    });
    picker.root.addEventListener("click", syncPreview);
    picker.root.addEventListener("change", syncPreview);
    syncPreview();

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      saveHero({
        kicker: kickerInput.value.trim() || DEFAULT_HERO.kicker,
        titleTop: topInput.value.trim() || DEFAULT_HERO.titleTop,
        titleAccent: accentInput.value.trim() || DEFAULT_HERO.titleAccent,
        body: bodyInput.value.trim() || DEFAULT_HERO.body,
        image: picker.get(),
        imageAlt: "Keziah Group hero image",
      });
      var saved = $("hero-saved-note");
      if (saved) {
        saved.hidden = false;
        window.setTimeout(function () {
          saved.hidden = true;
        }, 2600);
      }
    });
  }

  /* ----- Asset library tab ----- */

  function renderLibraryTab() {
    var grid = $("library-grid");
    if (!grid) return;
    grid.textContent = "";

    LOCAL_IMAGES_MANIFEST.forEach(function (path) {
      var card = el("div", "library-card");
      var thumb = el("div", "library-thumb");
      var img = document.createElement("img");
      img.src = path;
      img.alt = fileName(path);
      img.loading = "lazy";
      fallbackOnError(img);
      thumb.appendChild(img);
      card.appendChild(thumb);

      var meta = el("div", "library-meta");
      meta.appendChild(el("span", "library-name", fileName(path)));
      meta.appendChild(el("span", "library-folder", folderOf(path)));
      card.appendChild(meta);

      grid.appendChild(card);
    });

    var count = $("library-count");
    if (count) count.textContent = LOCAL_IMAGES_MANIFEST.length + " files indexed in ./images/";
  }

  /* =========================================================
     11. Shared chrome + boot
     ========================================================= */

  function initTopbar() {
    var resetBtn = $("reset-demo");
    if (!resetBtn) return;
    resetBtn.addEventListener("click", function () {
      if (window.confirm("Reset all demo data? Units, hero text, and reservations will return to their seeded state on both the admin portal and the live site.")) {
        resetDemo();
        window.location.reload();
      }
    });

    var dateEl = $("topbar-date");
    if (dateEl) {
      var now = new Date();
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      dateEl.textContent = months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();
    }
  }

  function initSidebarCounts() {
    var unitCount = $("nav-units-count");
    if (unitCount) unitCount.textContent = String(getUnits().length);
    var resCount = $("nav-res-count");
    if (resCount) resCount.textContent = String(getReservations().length);
  }

  document.addEventListener("DOMContentLoaded", function () {
    ensureSeeded();
    initTopbar();
    initSidebarCounts();

    var page = document.body.getAttribute("data-page") || "";
    if (page === "dashboard") {
      renderDashboard();
    } else if (page === "reservations") {
      var search = $("reservation-search");
      if (search) {
        search.addEventListener("input", function () {
          resState.query = search.value;
          renderReservationsPage();
        });
      }
      var newBtn = $("new-reservation");
      if (newBtn) {
        newBtn.addEventListener("click", function () {
          openReservationModal(null);
        });
      }
      renderReservationsPage();
    } else if (page === "cms") {
      initCmsTabs();
      var addUnit = $("add-unit");
      if (addUnit) {
        addUnit.addEventListener("click", function () {
          openUnitModal(null);
        });
      }
      renderUnitsTab();
      renderHeroTab();
      renderLibraryTab();
    }
  });
})();
