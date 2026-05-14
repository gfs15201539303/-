/**
 * 枭雄汉化 — 内容脚本
 * 在 Owlbear Rodeo 页面上直接运行，自动汉化界面英文术语
 * 依赖: dictionary.js (定义 DICTIONARY 和 TRANSLATION_MAP)
 */

(function() {
  'use strict';

  var isEnabled = true;
  var observer = null;
  var translateCount = 0;
  var processedNodes = new WeakSet();
  var periodicTimer = null;
  var DEBUG = false;

  // 按长度降序排列，长词优先匹配
  var terms = Object.keys(TRANSLATION_MAP).sort(function(a, b) {
    return b.length - a.length || a.localeCompare(b);
  });

  var patterns = terms.map(function(term) {
    return {
      regex: new RegExp('\\b' + escapeRegExp(term) + '\\b', 'gi'),
      translation: TRANSLATION_MAP[term]
    };
  });

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 判断文本是否已含中文（≥25% 中文字符视为已汉化，跳过）
  function isMostlyCJK(text) {
    if (!text) return true;
    var count = 0;
    for (var i = 0; i < text.length; i++) {
      var code = text.charCodeAt(i);
      if ((code >= 0x4E00 && code <= 0x9FFF) ||
          (code >= 0x3400 && code <= 0x4DBF) ||
          (code >= 0xF900 && code <= 0xFAFF)) {
        count++;
      }
    }
    return count > text.length * 0.25;
  }

  function hasEnglish(text) {
    return text && /[a-zA-Z]/.test(text);
  }

  // 翻译单段文本
  function translateText(text) {
    if (!text || !hasEnglish(text) || isMostlyCJK(text)) return text;
    var result = text;
    for (var i = 0; i < patterns.length; i++) {
      var newResult = result.replace(patterns[i].regex, patterns[i].translation);
      if (newResult !== result) {
        translateCount++;
        result = newResult;
      }
    }
    return result;
  }

  // 遍历子树中的文本节点并翻译
  function processSubtree(root) {
    if (!isEnabled || !root) return;
    if (root.nodeType === Node.ELEMENT_NODE && root.tagName === 'IFRAME') return;

    var walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          var parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          var tag = parent.tagName;
          if (['SCRIPT', 'STYLE', 'IFRAME', 'TEXTAREA', 'INPUT',
               'SELECT', 'OPTION', 'CANVAS', 'SVG', 'PATH', 'CODE', 'PRE'].indexOf(tag) !== -1) {
            return NodeFilter.FILTER_REJECT;
          }
          if (tag === 'TITLE') return NodeFilter.FILTER_REJECT;
          // 跳过 OBR 扩展加载器自身
          var cls = parent.className || '';
          if (typeof cls === 'string' && cls.indexOf('obr-extension') !== -1) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    var translated = 0;
    for (var i = 0; i < nodes.length; i++) {
      var tn = nodes[i];
      var text = tn.textContent;
      if (!text || !hasEnglish(text)) continue;
      if (isMostlyCJK(text)) continue;
      var t = translateText(text);
      if (t !== text) {
        tn.textContent = t;
        translated++;
      }
    }
    if (translated > 0 && DEBUG) console.log('[枭雄汉化] 翻译了 ' + translated + ' 个节点');
  }

  // 处理新增节点（MutationObserver 回调）
  function processAddedNodes(nodes) {
    if (!isEnabled) return;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'IFRAME') continue;
        processSubtree(node);
      }
    }
  }

  // 启动监听
  function startObserving() {
    var target = document.body || document.documentElement;
    if (!target) {
      // OBR 可能还没渲染 body，重试
      setTimeout(startObserving, 500);
      return;
    }

    if (observer) {
      observer.disconnect();
      observer = null;
    }

    // 初始扫描
    processSubtree(target);

    // 监听后续变化 — 不跳过已处理节点，因为 React 会更新内容
    observer = new MutationObserver(function(mutations) {
      if (!isEnabled) return;
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'childList' && m.addedNodes.length > 0) {
          processAddedNodes(m.addedNodes);
        } else if (m.type === 'characterData') {
          var tn = m.target;
          var txt = tn && tn.textContent;
          if (txt && hasEnglish(txt) && !isMostlyCJK(txt)) {
            var translated = translateText(txt);
            if (translated !== txt) tn.textContent = translated;
          }
        }
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
      characterData: true
    });

    // 周期性重新扫描，捕获 React 重新渲染后遗漏的内容
    if (periodicTimer) clearInterval(periodicTimer);
    periodicTimer = setInterval(function() {
      if (isEnabled) processSubtree(document.body);
    }, 5000); // 每 5 秒扫描一次

    if (DEBUG) console.log('[枭雄汉化] MutationObserver 已启动');
  }

  // ====== 从 storage 读取设置 ======
  function loadSettings() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get({ enabled: true }, function(items) {
        isEnabled = items.enabled;
        if (isEnabled) {
          if (!observer) startObserving();
          else processSubtree(document.body);
        }
      });
    }
  }

  // 监听 storage 变化
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.onChanged.addListener(function(changes) {
      if (changes.enabled) {
        isEnabled = changes.enabled.newValue;
        if (isEnabled) {
          if (!observer) startObserving();
          else processSubtree(document.body);
        }
      }
    });
  }

  // ====== 多阶段启动确保覆盖 ======
  function boot() {
    loadSettings();
    startObserving();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // 页面完全加载后再次扫描
  window.addEventListener('load', function() {
    setTimeout(function() { if (isEnabled) processSubtree(document.body); }, 500);
    setTimeout(function() { if (isEnabled) processSubtree(document.body); }, 2000);
    setTimeout(function() { if (isEnabled) processSubtree(document.body); }, 5000);
  });

  console.log('[枭雄汉化] 已加载，' + DICTIONARY.length + ' 条术语就绪');

})();
