var slider = null;
var yearDisplay = null;

function initTimeline() {
  slider = document.getElementById('year-slider');
  yearDisplay = document.getElementById('year-display');
  if (!slider || !yearDisplay) return;

  currentYear = parseInt(slider.value);
  updateYearDisplay();

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
