function refreshAll() {
  if (typeof refreshMap === 'function') refreshMap();
  if (typeof renderPanel === 'function') renderPanel();
  if (typeof renderDetail === 'function') renderDetail();
  if (typeof renderEraLabels === 'function') renderEraLabels();
  if (typeof updateYearDisplay === 'function') updateYearDisplay();
}

(function init() {
  updateStaticUI();
})();
