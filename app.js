// ========================================================
// GeoTour — app.js
// Навигатор с гарантированным поиском мест по длине маршрута
// ========================================================

// --- БИБЛИОТЕКА СТИЛЬНЫХ ВЕКТОРНЫХ SVG-ИКОНОК (БЕЗ СМАЙЛИКОВ) ---
const SVG_ICONS = {
  pin: '<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>',
  target: '<svg class="svg-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  walk: '<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/></svg>',
  car: '<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>',
  bike: '<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm7.8-10l-1.4-2.4c-.4-.7-1.1-1.1-1.9-1.1H6v2h3.5l1.8 3.1-2.9 5.3c-.4.7-.1 1.6.6 2 .2.1.5.2.7.2.5 0 1-.3 1.3-.7L13.5 14l2.5 2.5V20h2v-4.5l-3-3 1.1-2.5c1 1.2 2.5 2 4.4 2v-2c-1.7 0-3-.9-3.7-2.1l-.8-1.4zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/></svg>',
  coffee: '<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM2 19h18v2H2z"/></svg>',
  bakery: '<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M18.5 6C15.5 3 8.5 3 5.5 6c-3 3-3 8.5 0 11.5 2 2 5 2.5 8 1.5 1-.3 2-.9 2.8-1.7 1.2-1.2 1.8-2.7 2.2-4.3.4-1.8.3-3.6 0-5.5.8.5 1.5 1.2 2 2 .5.8.8 1.7 1 2.6.2.9.2 1.9 0 2.8-.2.9-.6 1.8-1.2 2.5l1.4 1.4c.9-1 1.4-2.2 1.7-3.4.3-1.3.3-2.6 0-3.9-.3-1.3-.8-2.5-1.6-3.6-.9-1.2-2.1-2.2-3.3-2.9zM7 7.5c2-2 7-2 9 0 1.5 1.5 1.7 4 .5 5.5s-4 1.7-5.5.5L7 9.5c-.8-.6-1-1.3 0-2z"/></svg>',
  fastfood: '<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v1c0 .55-.45.99-1.01.99H2.01c-.56 0-1.01-.44-1.01-.99zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z"/></svg>',
  monument: '<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M4 22h16v-2H4v2zM19 8V6h-2V4c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v2H5v2h2v10h10V8h2zm-4-4v2h-6V4h6zm-6 6h6v8h-6v-8z"/></svg>',
  museum: '<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 1L2 6v2h20V6L12 1zm-8 8v9h3v-9H4zm5 0v9h3v-9H9zm5 0v9h3v-9h-3zm5 0v9h3v-9h-3zM2 20v2h20v-2H2z"/></svg>',
  finish: '<svg class="svg-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/></svg>'
};

// --- ИНИЦИАЛИЗАЦИЯ LEAFLET КАРТЫ ---
const map = L.map("map", { zoomControl: false }).setView([55.030204, 82.920430], 13);
L.control.zoom({ position: "bottomleft" }).addTo(map);

// Подложки карты: OpenStreetMap по умолчанию + Спутник + Топо
const baseLayers = {
  osm: L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 20
  }),
  satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri",
    maxZoom: 19
  }),
  streets: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri",
    maxZoom: 19
  }),
  topo: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap &copy; OpenTopoMap',
    maxZoom: 17
  })
};

baseLayers.osm.addTo(map);

// Слои для меток
const routeLayerGroup = L.layerGroup().addTo(map);
const alongRoutePoiGroup = L.layerGroup().addTo(map);
let searchMarker = null;

// --- DOM ЭЛЕМЕНТЫ ---
const statusEl = document.getElementById("status");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");
const locateMeBtn = document.getElementById("locateMeBtn");

const toggleLayersBtn = document.getElementById("toggleLayersBtn");
const layerAside = document.getElementById("layerAside");

const routeFromInput = document.getElementById("routeFromInput");
const fromSuggestions = document.getElementById("fromSuggestions");
const routeToInput = document.getElementById("routeToInput");
const toSuggestions = document.getElementById("toSuggestions");

const pickFromMapBtn = document.getElementById("pickFromMapBtn");
const pickToMapBtn = document.getElementById("pickToMapBtn");
const myLocToStartBtn = document.getElementById("myLocToStartBtn");
const swapRouteBtn = document.getElementById("swapRouteBtn");
const buildRouteBtn = document.getElementById("buildRouteBtn");
const clearRouteBtn = document.getElementById("clearRouteBtn");
const routeModeStatus = document.getElementById("routeModeStatus");

const routeSummaryBox = document.getElementById("routeSummaryBox");
const routeDistVal = document.getElementById("routeDistVal");
const routeTimeVal = document.getElementById("routeTimeVal");
const alongCountVal = document.getElementById("alongCountVal");

// Блок мест по пути
const alongRouteSection = document.getElementById("alongRouteSection");
const alongRouteList = document.getElementById("alongRouteList");
const alongBadge = document.getElementById("alongBadge");
const routeStepsEl = document.getElementById("routeSteps");

// --- СОСТОЯНИЕ МАРШРУТА И POI ПО ПУТИ ---
let travelMode = "foot"; // foot | car | bike
let routePointA = null;  // { lat, lon, name }
let routePointB = null;  // { lat, lon, name }
let mapPickTarget = null; // "from" | "to" | null
let currentRouteCoords = []; // [[lat, lon], ...]
let placesAlongRoute = [];   // [{ name, lat, lon, category, iconSvg, distFromRoute, distAlongRouteKm, desc }]
let activePoiFilter = "all";

// Зеркала Overpass API
const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter"
];

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
function setStatus(text) {
  statusEl.textContent = text;
}

function escapeHTML(str = "") {
  return String(str).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[c]);
}

function formatDistance(km) {
  if (km < 1) return `${Math.max(10, Math.round(km * 1000))} м`;
  return `${km.toFixed(1)} км`;
}

function calcDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Точный расчёт расстояния от точки до отрезка улицы [A, B]
function distToSegmentMetersWithT(pLat, pLon, aLat, aLon, bLat, bLon) {
  const latRad = ((aLat + bLat) / 2) * Math.PI / 180;
  const kx = 111320 * Math.cos(latRad);
  const ky = 110574;

  const px = pLon * kx;
  const py = pLat * ky;
  const ax = aLon * kx;
  const ay = aLat * ky;
  const bx = bLon * kx;
  const by = bLat * ky;

  const abx = bx - ax;
  const aby = by - ay;
  const abLenSq = abx * abx + aby * aby;

  if (abLenSq === 0) {
    return { dist: Math.hypot(px - ax, py - ay), t: 0 };
  }

  let t = ((px - ax) * abx + (py - ay) * aby) / abLenSq;
  t = Math.max(0, Math.min(1, t));

  const projX = ax + t * abx;
  const projY = ay + t * aby;
  return { dist: Math.hypot(px - projX, py - projY), t };
}

// Кратчайшее расстояние до линии маршрута + пройденная дистанция от старта вдоль маршрута
function getDistanceMetricsAlongPolyline(pLat, pLon, polyline) {
  if (!polyline || polyline.length === 0) return { distToRoute: Infinity, distAlongRoute: 0 };
  if (polyline.length === 1) {
    return { distToRoute: calcDistanceMeters(pLat, pLon, polyline[0][0], polyline[0][1]), distAlongRoute: 0 };
  }

  let minD = Infinity;
  let cumDist = 0;
  let bestAlong = 0;

  for (let i = 0; i < polyline.length - 1; i++) {
    const aLat = polyline[i][0];
    const aLon = polyline[i][1];
    const bLat = polyline[i + 1][0];
    const bLon = polyline[i + 1][1];
    const segLen = calcDistanceMeters(aLat, aLon, bLat, bLon);

    const { dist, t } = distToSegmentMetersWithT(pLat, pLon, aLat, aLon, bLat, bLon);
    if (dist < minD) {
      minD = dist;
      bestAlong = cumDist + segLen * t;
    }
    cumDist += segLen;
  }

  return { distToRoute: minD, distAlongRoute: bestAlong };
}

function createPinIcon(content, extraClass = "") {
  return L.divIcon({
    className: "",
    html: `<div class="custom-pin ${extraClass}"><span>${content}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28]
  });
}

// --- ПЕРЕКЛЮЧЕНИЕ СЛОЁВ ---
toggleLayersBtn.addEventListener("click", () => {
  layerAside.classList.toggle("collapsed");
});

document.querySelectorAll('input[name="baseLayer"]').forEach(radio => {
  radio.addEventListener("change", e => {
    Object.values(baseLayers).forEach(l => map.removeLayer(l));
    const chosen = baseLayers[e.target.value] || baseLayers.osm;
    chosen.addTo(map);
    setStatus(`Подложка: ${e.target.value === "osm" ? "OpenStreetMap" : e.target.value === "satellite" ? "Спутник" : "Топографическая"}`);
  });
});

// --- ПОИСК И АВТОДОПОЛНЕНИЕ АДРЕСОВ (NOMINATIM AUTOCOMPLETE) ---
async function fetchAddressSuggestions(query) {
  if (!query || query.trim().length < 2) return [];
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&addressdetails=1&q=${encodeURIComponent(query.trim())}`;
  try {
    const res = await fetch(url, { headers: { "Accept-Language": "ru,en" } });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    const res = await fetch(url, { headers: { "Accept-Language": "ru,en" } });
    if (res.ok) {
      const data = await res.json();
      if (data && data.display_name) {
        const parts = data.display_name.split(",").map(p => p.trim());
        const primary = parts[0] || "";
        const secondary = parts.slice(1, 3).join(", ");
        return secondary ? `${primary} (${secondary})` : primary;
      }
    }
  } catch (e) {}
  return `Точка (${lat.toFixed(4)}, ${lon.toFixed(4)})`;
}

function attachAutocomplete(inputEl, dropdownEl, onSelectCallback) {
  let debounceTimer = null;

  inputEl.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const val = inputEl.value.trim();
    if (val.length < 2) {
      dropdownEl.innerHTML = "";
      dropdownEl.style.display = "none";
      return;
    }

    debounceTimer = setTimeout(async () => {
      setStatus("Подбираем адреса...");
      const items = await fetchAddressSuggestions(val);
      if (!items || items.length === 0) {
        dropdownEl.innerHTML = `<div class="suggestion-item no-click">Ничего не найдено. Уточните улицу или город.</div>`;
        dropdownEl.style.display = "block";
        return;
      }

      dropdownEl.innerHTML = items.map((item, idx) => {
        const parts = item.display_name.split(",").map(s => s.trim());
        const mainTitle = parts[0] || item.display_name;
        const subTitle = parts.slice(1).join(", ");
        return `
          <div class="suggestion-item" data-idx="${idx}">
            <div class="suggestion-main">${SVG_ICONS.pin}<span>${escapeHTML(mainTitle)}</span></div>
            ${subTitle ? `<div class="suggestion-sub">${escapeHTML(subTitle)}</div>` : ""}
          </div>
        `;
      }).join("");
      dropdownEl.style.display = "block";

      dropdownEl.querySelectorAll(".suggestion-item:not(.no-click)").forEach(el => {
        el.addEventListener("click", () => {
          const item = items[Number(el.dataset.idx)];
          dropdownEl.style.display = "none";
          onSelectCallback({
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            name: item.display_name.split(",")[0] || item.display_name,
            fullName: item.display_name
          });
        });
      });
    }, 260);
  });

  inputEl.addEventListener("focus", () => {
    if (dropdownEl.children.length > 0) dropdownEl.style.display = "block";
  });
}

document.addEventListener("click", e => {
  if (!e.target.closest(".search-box-wrapper") && !e.target.closest(".input-with-suggestions")) {
    document.querySelectorAll(".suggestions-dropdown").forEach(d => d.style.display = "none");
  }
});

attachAutocomplete(searchInput, searchSuggestions, point => {
  searchInput.value = point.name;
  map.setView([point.lat, point.lon], 16);

  if (searchMarker) map.removeLayer(searchMarker);
  searchMarker = L.marker([point.lat, point.lon], { icon: createPinIcon(SVG_ICONS.pin) })
    .addTo(map)
    .bindPopup(`
      <div class="popup-card">
        <strong>${escapeHTML(point.name)}</strong>
        <p>${escapeHTML(point.fullName)}</p>
        <div class="popup-actions">
          <button class="popup-btn" onclick="setRouteDestination({ lat: ${point.lat}, lon: ${point.lon}, name: '${escapeHTML(point.name)}' })">Маршрут сюда (Б)</button>
          <button class="popup-btn secondary" onclick="setRouteStart({ lat: ${point.lat}, lon: ${point.lon}, name: '${escapeHTML(point.name)}' })">Отсюда (А)</button>
        </div>
      </div>
    `)
    .openPopup();

  if (!routePointB) {
    setRouteDestination(point);
  } else {
    setStatus(`Выбрано место: ${point.name}`);
  }
});

attachAutocomplete(routeFromInput, fromSuggestions, point => {
  routeFromInput.value = point.name;
  routePointA = point;
  setStatus(`Старт (А): ${point.name}`);
  if (routePointB) calculateAndDrawRoute();
});

attachAutocomplete(routeToInput, toSuggestions, point => {
  routeToInput.value = point.name;
  routePointB = point;
  setStatus(`Финиш (Б): ${point.name}`);
  if (routePointA) calculateAndDrawRoute();
});

searchForm.addEventListener("submit", async e => {
  e.preventDefault();
  const q = searchInput.value.trim();
  if (!q) return;
  const items = await fetchAddressSuggestions(q);
  if (items && items.length > 0) {
    const item = items[0];
    searchInput.value = item.display_name.split(",")[0];
    searchSuggestions.style.display = "none";
    map.setView([item.lat, item.lon], 16);
    setRouteDestination({
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      name: item.display_name.split(",")[0]
    });
  } else {
    setStatus("Место не найдено. Попробуйте уточнить запрос.");
  }
});

// --- ГЕОЛОКАЦИЯ («ГДЕ Я») ---
function applyUserLocationAsStart() {
  if (!navigator.geolocation) {
    setStatus("Геолокация не поддерживается вашим браузером");
    return;
  }
  setStatus("Определяем ваше местоположение...");
  navigator.geolocation.getCurrentPosition(
    async pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      map.setView([lat, lon], 15);

      const humanName = await reverseGeocode(lat, lon);
      routePointA = { lat, lon, name: humanName };
      routeFromInput.value = humanName;
      setStatus(`Точка А установлена: ${humanName}`);

      if (routePointB) calculateAndDrawRoute();
    },
    () => {
      const c = map.getCenter();
      routePointA = { lat: c.lat, lon: c.lng, name: `Центр карты (${c.lat.toFixed(4)}, ${c.lng.toFixed(4)})` };
      routeFromInput.value = routePointA.name;
      setStatus("Геолокация отключена. Взят центр экрана в качестве точки А");
    },
    { timeout: 8000 }
  );
}

locateMeBtn.addEventListener("click", applyUserLocationAsStart);
myLocToStartBtn.addEventListener("click", applyUserLocationAsStart);

// --- ПЕРЕКЛЮЧЕНИЕ ТРАНСПОРТА ---
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    travelMode = btn.dataset.mode;

    const labelMap = { foot: "Пеший", car: "На авто", bike: "Вело" };
    routeModeStatus.innerHTML = `${SVG_ICONS[travelMode]}<span>${labelMap[travelMode] || "Маршрут"}</span>`;

    if (routePointA && routePointB) calculateAndDrawRoute();
  });
});

// --- ВЫБОР ТОЧЕК НА КАРТЕ ЧЕРЕЗ КНОПКУ МИШЕНИ ИЛИ КЛИК ---
window.setRouteStart = function(pt) {
  routePointA = pt;
  routeFromInput.value = pt.name;
  map.closePopup();
  if (routePointB) {
    calculateAndDrawRoute();
  } else {
    setStatus(`Старт (А): ${pt.name}. Теперь укажите финиш (Б).`);
  }
};

window.setRouteDestination = function(pt) {
  routePointB = pt;
  routeToInput.value = pt.name;
  map.closePopup();
  if (!routePointA) {
    const c = map.getCenter();
    routePointA = { lat: c.lat, lon: c.lng, name: "Текущий центр карты" };
    routeFromInput.value = routePointA.name;
  }
  calculateAndDrawRoute();
};

pickFromMapBtn.addEventListener("click", () => {
  mapPickTarget = mapPickTarget === "from" ? null : "from";
  pickFromMapBtn.classList.toggle("picking", mapPickTarget === "from");
  pickToMapBtn.classList.remove("picking");
  setStatus(mapPickTarget ? "Кликните на карту, чтобы задать точку старта (А)" : "Выбор точки отменён");
});

pickToMapBtn.addEventListener("click", () => {
  mapPickTarget = mapPickTarget === "to" ? null : "to";
  pickToMapBtn.classList.toggle("picking", mapPickTarget === "to");
  pickFromMapBtn.classList.remove("picking");
  setStatus(mapPickTarget ? "Кликните на карту, чтобы задать точку финиша (Б)" : "Выбор точки отменён");
});

map.on("click", async e => {
  const lat = e.latlng.lat;
  const lon = e.latlng.lng;

  if (mapPickTarget === "from") {
    mapPickTarget = null;
    pickFromMapBtn.classList.remove("picking");
    setStatus("Узнаем адрес выбранной точки старта...");
    const addr = await reverseGeocode(lat, lon);
    setRouteStart({ lat, lon, name: addr });
    return;
  }

  if (mapPickTarget === "to") {
    mapPickTarget = null;
    pickToMapBtn.classList.remove("picking");
    setStatus("Узнаем адрес выбранной точки финиша...");
    const addr = await reverseGeocode(lat, lon);
    setRouteDestination({ lat, lon, name: addr });
    return;
  }

  const addr = await reverseGeocode(lat, lon);
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`
      <div class="popup-card">
        <strong>${escapeHTML(addr)}</strong>
        <p>${lat.toFixed(5)}, ${lon.toFixed(5)}</p>
        <div class="popup-actions">
          <button class="popup-btn" onclick="setRouteDestination({ lat: ${lat}, lon: ${lon}, name: '${escapeHTML(addr)}' })">Маршрут сюда (Б)</button>
          <button class="popup-btn secondary" onclick="setRouteStart({ lat: ${lat}, lon: ${lon}, name: '${escapeHTML(addr)}' })">Отсюда (А)</button>
        </div>
      </div>
    `)
    .openOn(map);
});

// Смена А и Б
swapRouteBtn.addEventListener("click", () => {
  const tempPt = routePointA;
  routePointA = routePointB;
  routePointB = tempPt;

  const tempVal = routeFromInput.value;
  routeFromInput.value = routeToInput.value;
  routeToInput.value = tempVal;

  if (routePointA && routePointB) {
    calculateAndDrawRoute();
  } else {
    setStatus("Точки А и Б поменялись местами");
  }
});

// Сброс маршрута
clearRouteBtn.addEventListener("click", () => {
  routePointA = null;
  routePointB = null;
  currentRouteCoords = [];
  placesAlongRoute = [];
  routeFromInput.value = "";
  routeToInput.value = "";
  fromSuggestions.style.display = "none";
  toSuggestions.style.display = "none";
  routeLayerGroup.clearLayers();
  alongRoutePoiGroup.clearLayers();
  routeSummaryBox.style.display = "none";
  alongRouteSection.style.display = "none";
  routeStepsEl.innerHTML = `
    <div class="route-welcome-box">
      <p><strong>Маршрут очищен.</strong></p>
      <p>Выберите точки А и Б на карте или через строку поиска.</p>
    </div>
  `;
  setStatus("Маршрут очищен • Готово к новым точкам");
});

// ========================================================
// ПОИСК МЕСТ ПО ДЛИНЕ МАРШРУТА (КАФЕ, ПАМЯТНИКИ, МУЗЕИ)
// ========================================================

// 1. Поиск памятников, музеев и достопримечательностей через Википедию
async function fetchWikiPlacesAlong(routePolyline) {
  const results = [];
  const samplePoints = [];
  let cumDistance = 0;
  samplePoints.push(routePolyline[0]);

  for (let i = 0; i < routePolyline.length - 1; i++) {
    const d = calcDistanceMeters(
      routePolyline[i][0], routePolyline[i][1],
      routePolyline[i + 1][0], routePolyline[i + 1][1]
    );
    cumDistance += d;
    if (cumDistance >= 650) {
      samplePoints.push(routePolyline[i + 1]);
      cumDistance = 0;
    }
  }
  if (samplePoints.length < 2) samplePoints.push(routePolyline[routePolyline.length - 1]);

  const fetchPromises = samplePoints.map(async pt => {
    try {
      const url = `https://ru.wikipedia.org/w/api.php?action=query&generator=geosearch&ggscoord=${pt[0]}|${pt[1]}&ggsradius=800&ggslimit=15&prop=coordinates|pageimages|extracts&piprop=thumbnail&pithumbsize=200&exintro=1&explaintext=1&exchars=150&format=json&origin=*`;
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      if (data.query && data.query.pages) {
        Object.values(data.query.pages).forEach(page => {
          const coords = page.coordinates && page.coordinates[0];
          const lat = coords ? coords.lat : null;
          const lon = coords ? coords.lon : null;

          if (lat && lon) {
            const isMuseum = /музей|галерея|выставка/i.test(page.title);
            results.push({
              name: page.title,
              lat,
              lon,
              category: isMuseum ? "museums" : "sights",
              categoryLabel: isMuseum ? "Музей" : "Достопримечательность / Памятник",
              iconSvg: isMuseum ? SVG_ICONS.museum : SVG_ICONS.monument,
              desc: page.extract || "Исторический объект."
            });
          }
        });
      }
    } catch (e) {}
  });

  await Promise.all(fetchPromises);
  return results;
}

// 2. Поиск кафе, пекарен и заведений через быстрый Overpass API
async function fetchOverpassPlacesAlong(bounds) {
  const bbox = `${bounds.getSouth().toFixed(5)},${bounds.getWest().toFixed(5)},${bounds.getNorth().toFixed(5)},${bounds.getEast().toFixed(5)}`;
  const query = `[out:json][timeout:8];(node["amenity"~"^(cafe|restaurant|fast_food|bar|bakery|coffee_shop)$"](${bbox});node["tourism"~"^(museum|gallery|attraction|viewpoint)$"](${bbox});node["historic"~"^(monument|memorial)$"](${bbox}););out 100;`;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);

    try {
      const getUrl = `${endpoint}?data=${encodeURIComponent(query)}`;
      let res = await fetch(getUrl, { signal: controller.signal });
      clearTimeout(timer);

      if (!res.ok) {
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: "data=" + encodeURIComponent(query)
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.elements) && data.elements.length > 0) {
          return data.elements.map(el => {
            const lat = el.lat;
            const lon = el.lon;
            if (!lat || !lon) return null;

            const tags = el.tags || {};
            const name = tags.name || tags["name:ru"] || tags.brand;
            if (!name) return null;

            let category = "food";
            let categoryLabel = "Кафе / Ресторан";
            let iconSvg = SVG_ICONS.coffee;

            if (tags.tourism === "museum" || tags.tourism === "gallery") {
              category = "museums";
              categoryLabel = "Музей";
              iconSvg = SVG_ICONS.museum;
            } else if (tags.historic === "monument" || tags.historic === "memorial" || tags.tourism === "attraction") {
              category = "sights";
              categoryLabel = "Памятник / Достопримечательность";
              iconSvg = SVG_ICONS.monument;
            } else if (tags.amenity === "bakery") {
              categoryLabel = "Пекарня / Выпечка";
              iconSvg = SVG_ICONS.bakery;
            } else if (tags.amenity === "cafe" || tags.amenity === "coffee_shop") {
              categoryLabel = "Кофейня";
              iconSvg = SVG_ICONS.coffee;
            } else if (tags.amenity === "fast_food") {
              categoryLabel = "Быстрое питание";
              iconSvg = SVG_ICONS.fastfood;
            }

            return {
              name,
              lat,
              lon,
              category,
              categoryLabel,
              iconSvg,
              desc: tags.cuisine ? `Кухня: ${tags.cuisine}` : (tags.opening_hours ? `Режим: ${tags.opening_hours}` : "Заведение по пути следования.")
            };
          }).filter(Boolean);
        }
      }
    } catch (e) {
      clearTimeout(timer);
    }
  }

  // 3. Fallback через Nominatim
  try {
    const nomUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=30&viewbox=${bounds.getWest().toFixed(5)},${bounds.getNorth().toFixed(5)},${bounds.getEast().toFixed(5)},${bounds.getSouth().toFixed(5)}&bounded=1&q=кафе`;
    const nomRes = await fetch(nomUrl, { headers: { "Accept-Language": "ru,en" } });
    if (nomRes.ok) {
      const nomData = await nomRes.json();
      if (Array.isArray(nomData)) {
        return nomData.map(item => ({
          name: item.display_name.split(",")[0],
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          category: "food",
          categoryLabel: "Кафе / Еда",
          iconSvg: SVG_ICONS.coffee,
          desc: item.display_name
        }));
      }
    }
  } catch (err) {}

  return [];
}

// 4. Главный координатор поиска мест вдоль линии маршрута
async function findPOIsAlongRoute(routePolylineCoords) {
  alongRoutePoiGroup.clearLayers();
  placesAlongRoute = [];
  setStatus("Ищем заведения и памятники по пути...");

  const lats = routePolylineCoords.map(c => c[0]);
  const lons = routePolylineCoords.map(c => c[1]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);

  const bounds = L.latLngBounds(
    [minLat - 0.0035, minLon - 0.0035],
    [maxLat + 0.0035, maxLon + 0.0035]
  );

  const [wikiSights, foodPlaces] = await Promise.all([
    fetchWikiPlacesAlong(routePolylineCoords),
    fetchOverpassPlacesAlong(bounds)
  ]);

  const rawCandidates = [...wikiSights, ...foodPlaces];
  const maxDistanceThresholdMeters = travelMode === "foot" ? 250 : 350;

  const verified = [];
  const seenNames = new Set();

  rawCandidates.forEach(cand => {
    const key = cand.name.toLowerCase().trim();
    if (seenNames.has(key)) return;

    const { distToRoute, distAlongRoute } = getDistanceMetricsAlongPolyline(cand.lat, cand.lon, routePolylineCoords);

    if (distToRoute <= maxDistanceThresholdMeters) {
      seenNames.add(key);
      verified.push({
        ...cand,
        distFromRoute: Math.round(distToRoute),
        distAlongRouteMeters: distAlongRoute,
        distAlongRouteKm: distAlongRoute / 1000
      });
    }
  });

  verified.sort((a, b) => a.distAlongRouteMeters - b.distAlongRouteMeters);
  placesAlongRoute = verified;

  renderAlongRouteUI();
}

// 5. Отрисовка UI и маркеров найденных мест
function renderAlongRouteUI() {
  alongRoutePoiGroup.clearLayers();

  let filtered = placesAlongRoute;
  if (activePoiFilter !== "all") {
    filtered = placesAlongRoute.filter(p => p.category === activePoiFilter);
  }

  alongCountVal.textContent = String(placesAlongRoute.length);
  alongBadge.textContent = String(filtered.length);

  if (placesAlongRoute.length === 0) {
    alongRouteSection.style.display = "block";
    alongRouteList.innerHTML = `<p style="font-size: 11.5px; color: #8b99a3; margin: 4px 0;">По этому пути заведений в пределах 250 метров не найдено.</p>`;
    setStatus("Маршрут построен • Мест по пути не найдено");
    return;
  }

  alongRouteSection.style.display = "block";

  const markerRefs = [];
  filtered.forEach(poi => {
    const marker = L.marker([poi.lat, poi.lon], {
      icon: createPinIcon(poi.iconSvg, "poi-pin")
    });

    const popupHtml = `
      <div class="popup-card">
        <span class="popup-badge">${escapeHTML(poi.categoryLabel)}</span>
        <strong>${escapeHTML(poi.name)}</strong>
        <p>${escapeHTML(poi.desc)}</p>
        <div class="popup-sub-dist">${SVG_ICONS.pin} <span>~${poi.distFromRoute} м от вашей линии маршрута</span></div>
      </div>
    `;

    marker.bindPopup(popupHtml);
    marker.addTo(alongRoutePoiGroup);
    markerRefs.push(marker);
  });

  // Карточки в боковой панели
  alongRouteList.innerHTML = filtered.map((poi, idx) => `
    <div class="poi-card" data-poi-idx="${idx}">
      <div class="poi-card-left">
        <span class="poi-icon">${poi.iconSvg}</span>
        <div class="poi-texts">
          <div class="poi-title">${escapeHTML(poi.name)}</div>
          <div class="poi-sub">${escapeHTML(poi.categoryLabel)} • в ${formatDistance(poi.distAlongRouteKm)} от старта</div>
        </div>
      </div>
      <span class="poi-distance-badge" title="Расстояние в сторону от дороги">~${poi.distFromRoute} м</span>
    </div>
  `).join("");

  alongRouteList.querySelectorAll(".poi-card").forEach(card => {
    card.addEventListener("click", () => {
      const idx = Number(card.dataset.poiIdx);
      const poi = filtered[idx];
      if (poi && markerRefs[idx]) {
        map.setView([poi.lat, poi.lon], Math.max(map.getZoom(), 16));
        markerRefs[idx].openPopup();
      }
    });
  });

  setStatus(`Маршрут построен • Мест по пути: ${placesAlongRoute.length}`);
}

// Фильтры категорий
document.querySelectorAll(".along-filter-chips .chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".along-filter-chips .chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    activePoiFilter = chip.dataset.poiFilter;
    renderAlongRouteUI();
  });
});

// ========================================================
// ОСНОВНОЕ ПОСТРОЕНИЕ МАРШРУТА
// ========================================================
async function calculateAndDrawRoute() {
  setStatus("Строим оптимальный маршрут по улицам...");

  if (!routePointA && routeFromInput.value.trim()) {
    const hits = await fetchAddressSuggestions(routeFromInput.value.trim());
    if (hits.length > 0) {
      routePointA = { lat: parseFloat(hits[0].lat), lon: parseFloat(hits[0].lon), name: hits[0].display_name.split(",")[0] };
    }
  }

  if (!routePointB && routeToInput.value.trim()) {
    const hits = await fetchAddressSuggestions(routeToInput.value.trim());
    if (hits.length > 0) {
      routePointB = { lat: parseFloat(hits[0].lat), lon: parseFloat(hits[0].lon), name: hits[0].display_name.split(",")[0] };
    }
  }

  if (!routePointA || !routePointB) {
    setStatus("Укажите обе точки: откуда (А) и куда (Б)");
    return;
  }

  routeLayerGroup.clearLayers();
  alongRoutePoiGroup.clearLayers();
  placesAlongRoute = [];
  alongRouteSection.style.display = "none";

  // Маркер старта (зелёный А)
  L.marker([routePointA.lat, routePointA.lon], { icon: createPinIcon("А", "route-pin-a") })
    .bindPopup(`<strong>Старт (А):</strong><br>${escapeHTML(routePointA.name)}`).addTo(routeLayerGroup);

  // Маркер финиша (синий Б)
  L.marker([routePointB.lat, routePointB.lon], { icon: createPinIcon("Б", "route-pin-b") })
    .bindPopup(`<strong>Финиш (Б):</strong><br>${escapeHTML(routePointB.name)}`).addTo(routeLayerGroup);

  const profileKey = travelMode === "car" ? "driving" : travelMode === "bike" ? "bike" : "foot";
  const coordsStr = `${routePointA.lon.toFixed(6)},${routePointA.lat.toFixed(6)};${routePointB.lon.toFixed(6)},${routePointB.lat.toFixed(6)}`;

  const osrmUrls = [
    `https://routing.openstreetmap.de/routed-${travelMode}/route/v1/${profileKey}/${coordsStr}?overview=full&geometries=geojson&steps=true`,
    `https://router.project-osrm.org/route/v1/${profileKey}/${coordsStr}?overview=full&geometries=geojson&steps=true`
  ];

  let routeLatLngs = null;
  let totalDistKm = 0;
  let maneuvers = [];

  for (const url of osrmUrls) {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const json = await resp.json();
        if (json.routes && json.routes.length > 0) {
          const r = json.routes[0];
          totalDistKm = r.distance / 1000;
          routeLatLngs = r.geometry.coordinates.map(c => [c[1], c[0]]);

          if (r.legs && r.legs[0] && r.legs[0].steps) {
            r.legs[0].steps.forEach(st => {
              if (st.distance < 10) return;
              const street = st.name ? `по улице «${st.name}»` : "прямо по дороге";
              maneuvers.push({
                text: `Двигайтесь ${street}`,
                distKm: st.distance / 1000,
                latlng: st.maneuver?.location ? [st.maneuver.location[1], st.maneuver.location[0]] : null
              });
            });
            maneuvers.push({
              text: `Прибытие в пункт назначения: ${routePointB.name}`,
              distKm: 0,
              latlng: [routePointB.lat, routePointB.lon]
            });
          }
          break;
        }
      }
    } catch (err) {}
  }

  const speed = travelMode === "foot" ? 4.8 : travelMode === "bike" ? 15 : 35;
  const minutes = Math.max(1, Math.round((totalDistKm / speed) * 60));

  if (!routeLatLngs || routeLatLngs.length === 0) {
    setStatus("Не удалось соединить точки дорогами. Проверьте правильность адресов.");
    return;
  }

  currentRouteCoords = routeLatLngs;

  const routePolyline = L.polyline(routeLatLngs, {
    color: travelMode === "foot" ? "#08b985" : travelMode === "bike" ? "#f59e0b" : "#2563eb",
    weight: 6,
    opacity: 0.9,
    dashArray: travelMode === "foot" ? "8, 8" : null
  }).addTo(routeLayerGroup);

  map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });

  // Сводка маршрута
  routeSummaryBox.style.display = "flex";
  routeDistVal.textContent = formatDistance(totalDistKm);
  routeTimeVal.textContent = minutes >= 60
    ? `${Math.floor(minutes / 60)} ч ${minutes % 60} мин`
    : `${minutes} мин`;

  // Список шагов
  routeStepsEl.innerHTML = maneuvers.map((m, idx) => `
    <div class="step-item" data-step-idx="${idx}">
      <span class="step-num">${idx + 1}</span>
      <span>${escapeHTML(m.text)}</span>
      <span class="step-dist">${m.distKm > 0 ? formatDistance(m.distKm) : SVG_ICONS.finish}</span>
    </div>
  `).join("");

  routeStepsEl.querySelectorAll(".step-item").forEach(el => {
    el.addEventListener("click", () => {
      const step = maneuvers[Number(el.dataset.stepIdx)];
      if (step && step.latlng) {
        map.setView(step.latlng, 17);
      }
    });
  });

  // Автоматический поиск мест по ходу движения
  findPOIsAlongRoute(routeLatLngs);
}

buildRouteBtn.addEventListener("click", calculateAndDrawRoute);