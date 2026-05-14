/**
 * 枭雄汉化 — 内容脚本
 * 在 Owlbear Rodeo 页面上直接运行，自动汉化界面英文术语
 * 依赖: dictionary.js (定义 DICTIONARY 和 TRANSLATION_MAP)
 */

(function() {
  'use strict';

  // ====== 配置 ======
  var isEnabled = true;
  var observer = null;
  var processedNodes = new WeakSet();
  var translateCount = 0;

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

  // 判断文本是否已含中文（≥30% 中文字符视为已汉化，跳过）
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
    return count > text.length * 0.3;
  }

  function hasEnglish(text) {
    return text && /[a-zA-Z]/.test(text);
  }

  // 翻译单段文本
  function translateText(text) {
    if (!text || !hasEnglish(text) || isMostlyCJK(text)) return text;
    var result = text;
    for (var i = 0; i < patterns.length; i++) {
      result = result.replace(patterns[i].regex, patterns[i].translation);
    }
    if (result !== text) translateCount++;
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
          if (processedNodes.has(node)) return NodeFilter.FILTER_REJECT;
          var parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          var tag = parent.tagName;
          if (['SCRIPT', 'STYLE', 'IFRAME', 'TEXTAREA', 'INPUT',
               'SELECT', 'OPTION', 'CANVAS', 'SVG', 'PATH', 'CODE', 'PRE'].indexOf(tag) !== -1) {
            return NodeFilter.FILTER_REJECT;
          }
          if (tag === 'TITLE') return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (var i = 0; i < nodes.length; i++) {
      var tn = nodes[i];
      if (processedNodes.has(tn)) continue;
      var text = tn.textContent;
      if (!text || !hasEnglish(text)) {
        processedNodes.add(tn);
        continue;
      }
      var translated = translateText(text);
      if (translated !== text) tn.textContent = translated;
      processedNodes.add(tn);
    }
  }

  // 处理新增节点（MutationObserver 回调）
  function processAddedNodes(nodes) {
    if (!isEnabled) return;
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'IFRAME') continue;
        processSubtree(node);
      } else if (node.nodeType === Node.TEXT_NODE) {
        if (processedNodes.has(node)) continue;
        var text = node.textContent;
        if (text && hasEnglish(text) && !isMostlyCJK(text)) {
          var translated = translateText(text);
          if (translated !== text) node.textContent = translated;
        }
        processedNodes.add(node);
      }
    }
  }

  // 启动监听
  function startObserving() {
    var target = document.body || document.documentElement;
    if (!target) return;

    if (observer) {
      observer.disconnect();
      observer = null;
    }

    // 初始扫描
    processSubtree(target);

    // 监听后续变化
    observer = new MutationObserver(function(mutations) {
      if (!isEnabled) return;
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'childList' && m.addedNodes.length > 0) {
          processAddedNodes(m.addedNodes);
        } else if (m.type === 'characterData') {
          var tn = m.target;
          if (tn && !processedNodes.has(tn)) {
            var txt = tn.textContent;
            if (txt && hasEnglish(txt) && !isMostlyCJK(txt)) {
              var translated = translateText(txt);
              if (translated !== txt) tn.textContent = translated;
            }
            processedNodes.add(tn);
          }
        }
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  // ====== 从 storage 读取设置 ======
  function loadSettings() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get({
        enabled: true
      }, function(items) {
        isEnabled = items.enabled;
        if (isEnabled && !observer) startObserving();
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

  // ====== 启动 ======
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadSettings();
      startObserving();
    });
  } else {
    loadSettings();
    startObserving();
  }

  // 页面完全加载后再次扫描（处理动态渲染的内容）
  window.addEventListener('load', function() {
    setTimeout(function() {
      processSubtree(document.body);
    }, 1000);
  });

  console.log('[枭雄汉化] 内容脚本已加载，' + DICTIONARY.length + ' 条术语就绪');

})();
