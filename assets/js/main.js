function refreshAll() {
  if (typeof refreshMap === 'function') refreshMap();
  if (typeof renderPanel === 'function') renderPanel();
  if (typeof renderDetail === 'function') renderDetail();
}

(function init() {
  updateStaticUI();
})();
