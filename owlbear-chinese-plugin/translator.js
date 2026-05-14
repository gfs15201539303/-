/**
 * 枭雄汉化 - 界面翻译引擎
 *
 * 通过 MutationObserver 实时监控页面 DOM 变化，
 * 将已知英文术语替换为中文翻译，实现界面汉化。
 *
 * 依赖: dictionary.js (定义 DICTIONARY 和 TRANSLATION_MAP)
 */

(function(global) {
  'use strict';

  var isEnabled = true;
  var observer = null;
  var translateCount = 0;
  var processedNodes = new WeakSet();

  // 按长度降序排列，优先匹配长词组
  var terms = Object.keys(TRANSLATION_MAP).sort(function(a, b) {
    return b.length - a.length || a.localeCompare(b);
  });

  // 预编译正则模式
  var patterns = terms.map(function(term) {
    return {
      regex: new RegExp('\\b' + escapeRegExp(term) + '\\b', 'gi'),
      translation: TRANSLATION_MAP[term]
    };
  });

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 判断文本是否已包含中文字符（超过30%字符为中文则跳过，减少重复处理）
  function isMostlyCJK(text) {
    if (!text) return true;
    var cjkCount = 0;
    for (var i = 0; i < text.length; i++) {
      var code = text.charCodeAt(i);
      if ((code >= 0x4E00 && code <= 0x9FFF) ||
          (code >= 0x3400 && code <= 0x4DBF) ||
          (code >= 0xF900 && code <= 0xFAFF)) {
        cjkCount++;
      }
    }
    return cjkCount > text.length * 0.3;
  }

  // 判断文本是否包含需要翻译的英文（至少含一个英文字母）
  function hasEnglish(text) {
    if (!text) return false;
    return /[a-zA-Z]/.test(text);
  }

  // 翻译单段文本
  function translateText(text) {
    if (!text || !hasEnglish(text) || isMostlyCJK(text)) return text;

    var result = text;
    for (var i = 0; i < patterns.length; i++) {
      result = result.replace(patterns[i].regex, patterns[i].translation);
    }
    if (result !== text) {
      translateCount++;
    }
    return result;
  }

  // 递归处理 DOM 子树中的文本节点
  function processSubtree(root) {
    if (!isEnabled || !root) return;

    // 跳过插件自身的 iframe
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
          // 跳过非内容标签
          if (['SCRIPT', 'STYLE', 'IFRAME', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION',
              'CANVAS', 'SVG', 'PATH', 'CODE', 'PRE'].indexOf(tag) !== -1) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    for (var i = 0; i < nodes.length; i++) {
      var textNode = nodes[i];
      if (processedNodes.has(textNode)) continue;
      var original = textNode.textContent;
      if (!original || !hasEnglish(original)) {
        processedNodes.add(textNode);
        continue;
      }
      var translated = translateText(original);
      if (translated !== original) {
        textNode.textContent = translated;
      }
      processedNodes.add(textNode);
    }
  }

  // 处理新增节点（MutationObserver 回调用）
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
          if (translated !== text) {
            node.textContent = translated;
          }
        }
        processedNodes.add(node);
      }
    }
  }

  // 启动监听
  function startObserving(targetDoc) {
    targetDoc = targetDoc || document;
    var target = targetDoc.body || targetDoc.documentElement;
    if (!target) return false;

    // 停止旧监听
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    // 初始扫描
    processSubtree(target);

    // 建立 MutationObserver
    observer = new MutationObserver(function(mutations) {
      if (!isEnabled) return;
      var hasChanges = false;
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'childList' && m.addedNodes.length > 0) {
          processAddedNodes(m.addedNodes);
          hasChanges = true;
        } else if (m.type === 'characterData') {
          var tn = m.target;
          if (tn && !processedNodes.has(tn)) {
            var txt = tn.textContent;
            if (txt && hasEnglish(txt) && !isMostlyCJK(txt)) {
              var translated = translateText(txt);
              if (translated !== txt) {
                tn.textContent = translated;
              }
            }
            processedNodes.add(tn);
            hasChanges = true;
          }
        }
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return true;
  }

  // 停止监听
  function stopObserving() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  // 重置已处理节点缓存（用于重新汉化）
  function resetCache() {
    processedNodes = new WeakSet();
    translateCount = 0;
  }

  // 导出 API
  global.ChineseTranslator = {
    /** 在指定文档上启动汉化 */
    start: function(targetDoc) {
      return startObserving(targetDoc);
    },

    /** 停止汉化 */
    stop: function() {
      stopObserving();
    },

    /** 启用/禁用 */
    setEnabled: function(enabled) {
      isEnabled = enabled;
      if (enabled && !observer) {
        startObserving();
      } else if (!enabled) {
        stopObserving();
      }
    },

    /** 获取当前状态 */
    isEnabled: function() {
      return isEnabled;
    },

    /** 直接翻译一段文本 */
    translate: function(text) {
      return translateText(text);
    },

    /** 获取翻译统计 */
    getStats: function() {
      return {
        entries: DICTIONARY.length,
        translated: translateCount
      };
    },

    /** 重置缓存 */
    reset: function() {
      resetCache();
    },

    /** 在指定子树中立即执行一次汉化扫描 */
    scan: function(root) {
      processSubtree(root || document.body);
    }
  };

})(window);
