function renderPanel() {
  var container = document.getElementById('panel-content');
  if (!container) return;

  var dynasties = getActiveDynastiesForYear(currentYear);
  var rulers = getActiveRulers(currentYear);
  var wars = getActiveWars(currentYear);

  if (dynasties.length === 0 && rulers.length === 0 && wars.length === 0) {
    container.innerHTML = '<p>' + t('panel_hint') + '</p>';
    return;
  }

  var html = '';

  if (dynasties.length > 0) {
    html += '<h4>' + t('detail_dynasty') + 's</h4><ul>';
    dynasties.forEach(function(d) {
      var name = LANG === 'hi' ? d.name_hi : d.name_en;
      html += '<li><span class="color-dot" style="background:' + d.color + '"></span>' + name + '</li>';
    });
    html += '</ul>';
  }

  if (rulers.length > 0) {
    html += '<h4>' + t('detail_ruler') + 's</h4><ul>';
    rulers.forEach(function(r) {
      var name = LANG === 'hi' ? r.name_hi : r.name_en;
      html += '<li><a href="/detail.html?type=rulers&id=' + r.id + '">' + name + '</a></li>';
    });
    html += '</ul>';
  }

  if (wars.length > 0) {
    html += '<h4>' + t('detail_war') + 's</h4><ul>';
    wars.forEach(function(w) {
      var name = LANG === 'hi' ? w.name_hi : w.name_en;
      html += '<li><a href="/detail.html?type=wars&id=' + w.id + '">' + name + '</a></li>';
    });
    html += '</ul>';
  }

  container.innerHTML = html;
}

(function init() {
  if (document.getElementById('side-panel')) {
    renderPanel();
  }
})();
