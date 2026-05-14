// 弹出窗口设置逻辑
(function() {
  var toggle = document.getElementById('toggleEnabled');

  // 加载当前状态
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.get({ enabled: true }, function(items) {
      toggle.checked = items.enabled;
    });
  }

  // 切换开关
  toggle.addEventListener('change', function() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({ enabled: toggle.checked });
    }
  });

  // 显示词条数
  if (typeof DICTIONARY !== 'undefined') {
    document.getElementById('entryCount').textContent = DICTIONARY.length;
  }
})();
