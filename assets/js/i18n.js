var LANG = localStorage.getItem('chronomap-lang') || 'en';

var STRINGS = {
  en: {
    nav_home: "Home",
    nav_dynasties: "Dynasties",
    nav_rulers: "Rulers",
    nav_wars: "Wars",
    panel_title: "Historical View",
    panel_hint: "Move the slider to explore history.",
    detail_loading: "Loading...",
    detail_back: "← Back",
    detail_dynasty: "Dynasty",
    detail_ruler: "Ruler",
    detail_war: "War",
    detail_dates: "Dates",
    detail_regions: "Regions",
    detail_belligerents: "Belligerents",
    detail_bio: "Biography",
    detail_summary: "Summary",
    detail_rulers: "Rulers",
    detail_wars: "Wars",
    detail_belligerents_label: "Belligerents",
    nav_dynasty: "Dynasty",
    nav_ruler: "Ruler",
    nav_war: "War",
    no_data: "No data available."
  },
  hi: {
    nav_home: "होम",
    nav_dynasties: "वंश",
    nav_rulers: "शासक",
    nav_wars: "युद्ध",
    panel_title: "ऐतिहासिक दृश्य",
    panel_hint: "इतिहास की खोज के लिए स्लाइडर को सार्ए।",
    detail_loading: "लोड हो रहा है...",
    detail_back: "← वापस",
    detail_dynasty: "वंश",
    detail_ruler: "शासक",
    detail_war: "युद्ध",
    detail_dates: "तारीखें",
    detail_regions: "क्षेत्र",
    detail_belligerents: "विरोधी",
    detail_bio: "जीवनी",
    detail_summary: "सारांश",
    detail_rulers: "शासक",
    detail_wars: "युद्ध",
    detail_belligerents_label: "विरोधी",
    nav_dynasty: "वंश",
    nav_ruler: "शासक",
    nav_war: "युद्ध",
    no_data: "कोई डेटा उपलब्ध नहीं।"
  }
};

function setLang(lang) {
  LANG = lang;
  localStorage.setItem('chronomap-lang', lang);
  var enBtn = document.getElementById('lang-en');
  var hiBtn = document.getElementById('lang-hi');
  if (enBtn) enBtn.classList.toggle('active', lang === 'en');
  if (hiBtn) hiBtn.classList.toggle('active', lang === 'hi');
  updateStaticUI();
  if (typeof refreshAll === 'function') refreshAll();
}

function updateStaticUI() {
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (STRINGS[LANG] && STRINGS[LANG][key]) {
      el.textContent = STRINGS[LANG][key];
    }
  });
  document.documentElement.lang = LANG;
}

function t(key) {
  return (STRINGS[LANG] && STRINGS[LANG][key]) || key;
}

(function init() {
  var enBtn = document.getElementById('lang-en');
  var hiBtn = document.getElementById('lang-hi');
  if (enBtn) enBtn.classList.toggle('active', LANG === 'en');
  if (hiBtn) hiBtn.classList.toggle('active', LANG === 'hi');
  updateStaticUI();
})();
