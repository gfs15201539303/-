/**
 * 枭雄汉化 - 弹窗界面逻辑
 * 术语词典 + 汉化设置界面
 */

var currentCategory = 'all';
var searchQuery = '';

function getFilteredEntries() {
  return DICTIONARY.filter(function(entry) {
    if (currentCategory !== 'all' && entry.category !== currentCategory) return false;
    if (searchQuery) {
      var q = searchQuery.toLowerCase();
      return (
        entry.term.toLowerCase().indexOf(q) !== -1 ||
        entry.translation.indexOf(searchQuery) !== -1
      );
    }
    return true;
  });
}

function highlightMatch(text, query) {
  if (!query) return text;
  var idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) +
    '<mark>' + text.slice(idx, idx + query.length) + '</mark>' +
    text.slice(idx + query.length);
}

function renderEntries() {
  var container = document.getElementById('dictList');
  var filtered = getFilteredEntries();
  var statsEl = document.getElementById('entryCount');
  statsEl.textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML =
      '<div class="empty-state">' +
        '<svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">' +
          '<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>' +
        '</svg>' +
        '<p>没有匹配的词条</p>' +
      '</div>';
    return;
  }

  var showOriginal = document.getElementById('showOriginal').checked;

  container.innerHTML = filtered.map(function(entry) {
    var termHtml = highlightMatch(entry.term, searchQuery);
    var transHtml = highlightMatch(entry.translation, searchQuery);
    return '<div class="dict-entry" data-term="' + entry.term.toLowerCase() + '">' +
      '<div class="term">' + termHtml + '</div>' +
      '<div class="translation">' + transHtml + '</div>' +
      '<span class="category ' + entry.category + '">' + getCategoryLabel(entry.category) + '</span>' +
    '</div>';
  }).join('');
}

function getCategoryLabel(cat) {
  var labels = {
    combat: '战斗', skill: '技能', item: '物品',
    spell: '法术', rule: '规则', class: '职业',
    race: '种族', ui: '界面'
  };
  return labels[cat] || cat;
}

function showToast(message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(function() { toast.classList.remove('show'); }, 2500);
}

function updateTranslationStats() {
  try {
    var stats = JSON.parse(localStorage.getItem('xiaoxiong_translator_stats'));
    if (stats) {
      document.getElementById('translatedCount').textContent = stats.translated || 0;
    }
  } catch(e) {}
}

function initUI() {
  // 搜索
  var searchInput = document.getElementById('searchInput');
  var clearBtn = document.getElementById('clearBtn');

  searchInput.addEventListener('input', function() {
    searchQuery = searchInput.value.trim();
    clearBtn.classList.toggle('visible', searchQuery.length > 0);
    renderEntries();
  });

  clearBtn.addEventListener('click', function() {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.classList.remove('visible');
    renderEntries();
    searchInput.focus();
  });

  // 分类标签
  document.querySelectorAll('.tag').forEach(function(tag) {
    tag.addEventListener('click', function() {
      document.querySelectorAll('.tag').forEach(function(t) { t.classList.remove('active'); });
      tag.classList.add('active');
      currentCategory = tag.dataset.cat;
      renderEntries();
    });
  });

  // 标签页切换
  document.querySelectorAll('.tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
      document.querySelectorAll('.panel').forEach(function(p) { p.classList.remove('active'); });
      tab.classList.add('active');
      document.getElementById('panel' + capitalize(tab.dataset.tab)).classList.add('active');

      if (tab.dataset.tab === 'settings') {
        updateTranslationStats();
      }
    });
  });

  // 设置 - 界面汉化开关
  var interfaceToggle = document.getElementById('interfaceTranslate');
  interfaceToggle.addEventListener('change', function() {
    try {
      window.parent.postMessage(JSON.stringify({
        source: 'xiaoxiong-localizer',
        action: 'setEnabled',
        value: interfaceToggle.checked
      }), '*');
    } catch(e) {}
    localStorage.setItem('xiaoxiong_interface_enabled', interfaceToggle.checked);
  });

  // 设置 - 显示原文对照
  document.getElementById('showOriginal').addEventListener('change', renderEntries);

  // 统计信息
  document.getElementById('totalEntries').textContent = DICTIONARY.length;
  updateTranslationStats();

  // 从 localStorage 恢复界面汉化开关状态
  try {
    var saved = localStorage.getItem('xiaoxiong_interface_enabled');
    if (saved !== null) {
      interfaceToggle.checked = saved === 'true';
    }
  } catch(e) {}
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function initOBR() {
  if (typeof OBR === 'undefined') {
    console.log('[枭雄汉化] OBR SDK 未加载，以独立模式运行');
    return;
  }

  OBR.onReady(function() {
    console.log('[枭雄汉化] 插件已就绪');

    if (OBR.popover) {
      OBR.popover.setHeight(650);
      OBR.popover.setWidth(420);
    }

    showToast('枭雄汉化插件已加载');
    updateTranslationStats();
  });
}

// 启动
document.addEventListener('DOMContentLoaded', function() {
  initUI();
  initOBR();
  renderEntries();
});
