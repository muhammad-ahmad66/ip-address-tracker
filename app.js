const formEl = document.querySelector('.form');
const btnEl = document.querySelector('button');
const ipAddressEl = document.querySelector('.input-field');
const ipEl = document.querySelector('.ip-value');
const locationEl = document.querySelector('.location-value');
const timezoneEl = document.querySelector('.timezone-value');
const ispEl = document.querySelector('.isp-value');

let map;

const renderMap = function (lat, lng) {
  if (map) {
    map.remove();
  }
  map = L.map('map', {
    center: [lat, lng],
    zoom: 13,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  // Create a custom icon with a specific color
  const customIcon = L.icon({
    iconUrl: 'location-marker.png',
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  // Add a marker with the custom icon
  const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

  // const marker = L.marker([lat, lng]).addTo(map);
};

// console.log(ipAddress);
const render = function (data) {
  const {
    ip,
    isp,
    location: { city, country, lat, lng, timezone },
  } = data;
  ipEl.textContent = ip;
  locationEl.textContent = `${city}, ${country}`;
  timezoneEl.textContent = timezone;

  renderMap(lat, lng);
};

// DISPLAY USER IP INFO
(async function getPublicIPAddress() {
  const response = await fetch(
    'https://geo.ipify.org/api/v2/country,city?apiKey=at_cH6EPI0sHqTKbjCPkSCkndTDqx2gC&ip'
  );
  const data = await response.json();
  render(data);
})();

formEl.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    const ipAddress = ipAddressEl.value;

    if (!ipAddress) return;

    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_cH6EPI0sHqTKbjCPkSCkndTDqx2gC&ipAddress=${ipAddress}`
    );

    const data = await res.json();
    console.log(data);
    render(data);
  } catch (err) {
    console.log(err);
  }
});
