var slider = null;
var yearDisplay = null;
var eraLabelsEl = null;

function formatYear(year) {
  if (year < 0) return Math.abs(year) + ' BCE';
  if (year === 0) return '1 BCE';
  return year + ' CE';
}

function getEraLabel(year) {
  if (!CHRONOMAP_DATA || !CHRONOMAP_DATA.eras) return '';
  var sorted = CHRONOMAP_DATA.eras.slice().sort(function(a, b) { return a.year - b.year; });
  var current = sorted[0];
  for (var i = 0; i < sorted.length; i++) {
    if (sorted[i].year <= year) {
      current = sorted[i];
    } else {
      break;
    }
  }
  return LANG === 'hi' ? current.label_hi : current.label_en;
}

function renderEraLabels() {
  if (!eraLabelsEl || !CHRONOMAP_DATA || !CHRONOMAP_DATA.eras) return;
  var eras = CHRONOMAP_DATA.eras.slice().sort(function(a, b) { return a.year - b.year; });
  var html = '';
  eras.forEach(function(era) {
    var label = LANG === 'hi' ? era.label_hi : era.label_en;
    var active = currentYear >= era.year ? 'active' : '';
    html += '<span class="' + active + '" data-year="' + era.year + '">' + label + '</span>';
  });
  eraLabelsEl.innerHTML = html;

  var spans = eraLabelsEl.querySelectorAll('span');
  spans.forEach(function(span) {
    span.addEventListener('click', function() {
      var year = parseInt(span.getAttribute('data-year'));
      if (!isNaN(year) && slider) {
        slider.value = year;
        currentYear = year;
        updateYearDisplay();
        if (typeof refreshAll === 'function') refreshAll();
      }
    });
  });
}

function initTimeline() {
  slider = document.getElementById('year-slider');
  yearDisplay = document.getElementById('year-display');
  eraLabelsEl = document.getElementById('era-labels');
  if (!slider || !yearDisplay) return;

  currentYear = parseInt(slider.value);
  updateYearDisplay();
  renderEraLabels();

  slider.addEventListener('input', function(e) {
    currentYear = parseInt(e.target.value);
    updateYearDisplay();
    if (typeof refreshAll === 'function') refreshAll();
  });
}

function updateYearDisplay() {
  if (yearDisplay) {
    yearDisplay.textContent = formatYear(currentYear);
  }
}

(function init() {
  if (document.getElementById('year-slider')) {
    initTimeline();
  }
})();
