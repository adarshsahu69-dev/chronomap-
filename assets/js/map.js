var currentYear = 1200;
var geoJsonLayer = null;
var map = null;

function formatYear(year) {
  if (year < 0) return Math.abs(year) + ' BCE';
  if (year === 0) return '1 BCE';
  return year + ' CE';
}

function getActiveDynastyForRegion(regionName, year) {
  var candidates = CHRONOMAP_DATA.dynasties.filter(function(d) {
    return d.start <= year && d.end >= year && d.region_ids.indexOf(regionName) !== -1;
  });
  candidates.sort(function(a, b) { return b.start - a.start; });
  return candidates[0] || null;
}

function getActiveDynastiesForYear(year) {
  var seen = {};
  return CHRONOMAP_DATA.dynasties.filter(function(d) {
    if (d.start <= year && d.end >= year) {
      if (!seen[d.id]) {
        seen[d.id] = true;
        return true;
      }
    }
    return false;
  });
}

function getActiveRulers(year) {
  return CHRONOMAP_DATA.rulers.filter(function(r) {
    return r.start <= year && r.end >= year;
  });
}

function getActiveWars(year) {
  return CHRONOMAP_DATA.wars.filter(function(w) {
    return w.start <= year && w.end >= year;
  });
}

function initMap() {
  map = L.map('map').setView([20.5937, 78.9629], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  geoJsonLayer = L.geoJson(null, {
    style: function(feature) {
      var regionName = feature.properties.NAME_1;
      var dynasty = getActiveDynastyForRegion(regionName, currentYear);
      return {
        fillColor: dynasty ? dynasty.color : '#e0e0e0',
        weight: 1,
        opacity: 1,
        color: '#666',
        fillOpacity: 0.55
      };
    },
    onEachFeature: function(feature, layer) {
      layer.on({
        mouseover: function(e) {
          var regionName = feature.properties.NAME_1;
          var dynasty = getActiveDynastyForRegion(regionName, currentYear);
          var tooltip = regionName;
          if (dynasty) {
            var name = LANG === 'hi' ? dynasty.name_hi : dynasty.name_en;
            tooltip += ' (' + name + ')';
          }
          layer.bindTooltip(tooltip, {sticky: true, direction: 'top'}).openTooltip();
          layer.setStyle({ weight: 2, color: '#000' });
        },
        mouseout: function(e) {
          layer.unbindTooltip();
          geoJsonLayer.resetStyle(layer);
        },
        click: function(e) {
          var regionName = feature.properties.NAME_1;
          var dynasty = getActiveDynastyForRegion(regionName, currentYear);
          var info = '<strong>' + regionName + '</strong><br>';
          if (dynasty) {
            info += 'Ruled by: ' + (LANG === 'hi' ? dynasty.name_hi : dynasty.name_en);
          } else {
            info += t('no_data');
          }
          L.popup()
            .setLatLng(e.latlng)
            .setContent(info)
            .openOn(map);
        }
      });
    }
  }).addTo(map);

  fetch('/assets/geo/india.geojson')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      geoJsonLayer.addData(data);
      map.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] });
    })
    .catch(function(err) {
      console.error('Failed to load GeoJSON:', err);
    });
}

function refreshMap() {
  if (!geoJsonLayer) return;
  geoJsonLayer.setStyle(function(feature) {
    var regionName = feature.properties.NAME_1;
    var dynasty = getActiveDynastyForRegion(regionName, currentYear);
    return {
      fillColor: dynasty ? dynasty.color : '#e0e0e0',
      weight: 1,
      opacity: 1,
      color: '#666',
      fillOpacity: 0.55
    };
  });
}

(function init() {
  if (document.getElementById('map')) {
    initMap();
  }
})();
