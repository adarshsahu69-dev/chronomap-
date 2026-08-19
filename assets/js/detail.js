function renderDetail() {
  var container = document.getElementById('detail-container');
  if (!container) return;

  var params = new URLSearchParams(window.location.search);
  var type = params.get('type');
  var id = params.get('id');

  if (!type || !id || !CHRONOMAP_DATA[type]) {
    container.innerHTML = '<p>' + t('no_data') + '</p>';
    return;
  }

  var items = CHRONOMAP_DATA[type];
  var item = items.find(function(i) { return i.id === id; });

  if (!item) {
    container.innerHTML = '<p>' + t('no_data') + '</p>';
    return;
  }

  var name = LANG === 'hi' ? (item.name_hi || item.name_en) : item.name_en;
  var singularType = type.replace(/s$/, '');
  var html = '<a href="/' + type + '.html" class="back-link">' + t('detail_back') + ' ' + t('nav_' + singularType) + '</a>';
  html += '<div class="detail-header"><h1>' + name + '</h1></div>';

  var startLabel = item.start < 0 ? Math.abs(item.start) + ' BCE' : item.start;
  var endLabel = item.end < 0 ? Math.abs(item.end) + ' BCE' : item.end;
  html += '<div class="detail-meta">' + t('detail_dates') + ': ' + startLabel + ' – ' + endLabel + '</div>';

  var summaryKey = LANG === 'hi' ? 'summary_hi' : 'summary_en';
  if (item[summaryKey]) {
    html += '<div class="detail-section"><h4>' + t('detail_summary') + '</h4><p>' + item[summaryKey] + '</p></div>';
  }

  if (item.region_ids && item.region_ids.length) {
    html += '<div class="detail-section"><h4>' + t('detail_regions') + '</h4><p>' + item.region_ids.join(', ') + '</p></div>';
  }

  if (item.bio_en || item.bio_hi) {
    var bio = LANG === 'hi' ? item.bio_hi : item.bio_en;
    html += '<div class="detail-section"><h4>' + t('detail_bio') + '</h4><p>' + bio + '</p></div>';
  }

  if (item.ruler_ids && item.ruler_ids.length) {
    html += '<div class="detail-section"><h4>' + t('detail_rulers') + '</h4><ul>';
    item.ruler_ids.forEach(function(rid) {
      var ruler = CHRONOMAP_DATA.rulers.find(function(r) { return r.id === rid; });
      if (ruler) {
        var rname = LANG === 'hi' ? ruler.name_hi : ruler.name_en;
        html += '<li><a href="/detail.html?type=rulers&id=' + ruler.id + '">' + rname + '</a></li>';
      }
    });
    html += '</ul></div>';
  }

  if (item.war_ids && item.war_ids.length) {
    html += '<div class="detail-section"><h4>' + t('detail_wars') + '</h4><ul>';
    item.war_ids.forEach(function(wid) {
      var war = CHRONOMAP_DATA.wars.find(function(w) { return w.id === wid; });
      if (war) {
        var wname = LANG === 'hi' ? war.name_hi : war.name_en;
        html += '<li><a href="/detail.html?type=wars&id=' + war.id + '">' + wname + '</a></li>';
      }
    });
    html += '</ul></div>';
  }

  if (item.belligerent_ids && item.belligerent_ids.length) {
    html += '<div class="detail-section"><h4>' + t('detail_belligerents_label') + '</h4><ul>';
    item.belligerent_ids.forEach(function(did) {
      var d = CHRONOMAP_DATA.dynasties.find(function(dyn) { return dyn.id === did; });
      if (d) {
        var dname = LANG === 'hi' ? d.name_hi : d.name_en;
        html += '<li><a href="/detail.html?type=dynasties&id=' + d.id + '">' + dname + '</a></li>';
      }
    });
    html += '</ul></div>';
  }

  container.innerHTML = html;
}

(function init() {
  if (document.getElementById('detail-container')) {
    renderDetail();
  }
})();
