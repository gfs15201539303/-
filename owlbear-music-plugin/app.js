/**
 * 枭雄音乐 — 网易云音乐播放插件
 */

(function() {
  'use strict';

  // ====== 状态 ======
  var playlist = [];
  var currentIndex = -1;
  var audio = null;
  var isPlaying = false;

  // ====== 解析网易云链接 ======
  function parseNetEaseUrl(input) {
    input = input.trim();

    // 纯数字 ID
    if (/^\d+$/.test(input)) {
      return { type: 'song', id: input };
    }

    // song?id=123456
    var songMatch = input.match(/song(?:\/|%2F)(\d+)/) || input.match(/[?&]id=(\d+)/);
    if (songMatch) {
      // 判断是否为歌单:playlist?id=xxx
      if (/playlist|pl|list/.test(input)) {
        return { type: 'playlist', id: songMatch[1] };
      }
      // 可能是歌曲
      // 检查 URL 中是否有 playist 标识
      if (input.includes('playlist') || input.includes('pl=')) {
        return { type: 'playlist', id: songMatch[1] };
      }
      return { type: 'song', id: songMatch[1] };
    }

    // 网易云短链接 music.163.com/s/123456
    var shortMatch = input.match(/163\.com\/s\/(\d+)/);
    if (shortMatch) {
      return { type: 'song', id: shortMatch[1] };
    }

    return null;
  }

  // ====== 播放器控制 ======
  function loadNetEaseSong(songId) {
    var iframe = document.getElementById('neteaseIframe');
    var emptyPlayer = document.querySelector('.empty-player');
    var neteasePlayer = document.getElementById('neteasePlayer');
    var audioPlayer = document.getElementById('audioPlayer');

    // 隐藏 HTML5 播放器
    audioPlayer.style.display = 'none';
    if (audio) { audio.pause(); audio = null; }

    // 显示网易云播放器
    iframe.src = 'https://music.163.com/outchain/player?type=2&id=' + songId + '&auto=1&height=66';
    iframe.style.display = 'block';
    emptyPlayer.style.display = 'none';

    // 添加到歌单
    addToPlaylist({ type: 'netease', id: songId, title: '网易云音乐 #' + songId });

    showToast('正在加载歌曲...');
  }

  function loadNetEasePlaylist(playlistId) {
    var iframe = document.getElementById('neteaseIframe');
    var emptyPlayer = document.querySelector('.empty-player');
    var audioPlayer = document.getElementById('audioPlayer');

    audioPlayer.style.display = 'none';
    if (audio) { audio.pause(); audio = null; }

    iframe.src = 'https://music.163.com/outchain/player?type=0&id=' + playlistId + '&auto=1&height=430';
    iframe.style.display = 'block';
    emptyPlayer.style.display = 'none';

    addToPlaylist({ type: 'netease_playlist', id: playlistId, title: '网易云歌单 #' + playlistId });

    showToast('正在加载歌单...');
  }

  function playAudioUrl(url, title) {
    var iframe = document.getElementById('neteaseIframe');
    var emptyPlayer = document.querySelector('.empty-player');
    var neteasePlayer = document.getElementById('neteasePlayer');
    var audioPlayer = document.getElementById('audioPlayer');

    // 隐藏网易云播放器
    iframe.style.display = 'none';
    iframe.src = '';
    emptyPlayer.style.display = 'none';

    // 创建 audio 元素
    if (!audio) {
      audio = new Audio();
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', function() {
        document.getElementById('totalTime').textContent = formatTime(audio.duration);
        document.getElementById('progressBar').max = Math.floor(audio.duration);
      });
      audio.addEventListener('ended', function() {
        if (document.getElementById('loopPlay').checked) {
          audio.currentTime = 0;
          audio.play();
        }
      });
    }

    audio.src = url;
    audio.volume = parseInt(document.getElementById('volumeSlider').value) / 100;
    audio.play();

    isPlaying = true;
    document.getElementById('playBtn').textContent = '⏸';

    audioPlayer.style.display = 'block';
    document.getElementById('currentTrack').textContent = title || '未知歌曲';

    addToPlaylist({ type: 'url', url: url, title: title || url });
  }

  // ====== 歌单管理 ======
  function addToPlaylist(item) {
    // 去重
    var key = item.id || item.url;
    for (var i = 0; i < playlist.length; i++) {
      if ((playlist[i].id && playlist[i].id === key) || (playlist[i].url && playlist[i].url === key)) {
        return; // 已存在
      }
    }
    playlist.push(item);
    currentIndex = playlist.length - 1;
    savePlaylist();
    renderPlaylist();
  }

  function removeFromPlaylist(index) {
    playlist.splice(index, 1);
    savePlaylist();
    renderPlaylist();
  }

  function savePlaylist() {
    try {
      localStorage.setItem('xiaoxiong_music_playlist', JSON.stringify(playlist));
    } catch(e) {}
  }

  function loadPlaylist() {
    try {
      var data = localStorage.getItem('xiaoxiong_music_playlist');
      if (data) playlist = JSON.parse(data);
    } catch(e) {}
  }

  function renderPlaylist() {
    var area = document.getElementById('playlistArea');
    var count = document.getElementById('playlistCount');
    count.textContent = playlist.length + ' 首';

    if (playlist.length === 0) {
      area.innerHTML = '<div class="empty-state">歌单为空，在播放页面添加歌曲</div>';
      return;
    }

    area.innerHTML = playlist.map(function(item, index) {
      var title = item.title || '未知';
      var icon = item.type === 'net ease_playlist' ? '📋' : '🎵';
      return '<div class="playlist-item" data-index="' + index + '">' +
        '<span class="pl-icon">' + icon + '</span>' +
        '<span class="pl-title">' + escapeHtml(title) + '</span>' +
        '<button class="pl-play" data-index="' + index + '" title="播放">▶</button>' +
        '<button class="pl-del" data-index="' + index + '" title="删除">✕</button>' +
      '</div>';
    }).join('');

    // 事件绑定
    area.querySelectorAll('.pl-play').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var idx = parseInt(this.dataset.index);
        playPlaylistItem(idx);
      });
    });
    area.querySelectorAll('.pl-del').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var idx = parseInt(this.dataset.index);
        removeFromPlaylist(idx);
      });
    });
  }

  function playPlaylistItem(index) {
    var item = playlist[index];
    if (!item) return;
    currentIndex = index;

    if (item.type === 'netease') {
      loadNetEaseSong(item.id);
    } else if (item.type === 'netease_playlist') {
      loadNetEasePlaylist(item.id);
    } else if (item.url) {
      playAudioUrl(item.url, item.title);
    }
  }

  // ====== HTML5 播放器控制 ======
  function togglePlay() {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      document.getElementById('playBtn').textContent = '▶';
    } else {
      audio.play();
      document.getElementById('playBtn').textContent = '⏸';
    }
    isPlaying = !isPlaying;
  }

  function updateProgress() {
    if (!audio) return;
    var progress = document.getElementById('progressBar');
    var current = document.getElementById('currentTime');
    if (!audio.duration) return;
    progress.value = Math.floor(audio.currentTime);
    current.textContent = formatTime(audio.currentTime);
  }

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ====== Toast ======
  function showToast(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(function() { toast.classList.remove('show'); }, 2500);
  }

  // ====== UI 初始化 ======
  function initUI() {
    // 加载按钮
    document.getElementById('loadBtn').addEventListener('click', function() {
      var input = document.getElementById('songInput').value.trim();
      if (!input) return;

      var parsed = parseNetEaseUrl(input);
      if (!parsed) {
        // 尝试作为直接音频 URL
        if (/\.(mp3|wav|ogg|flac|aac|m4a)(\?|$)/i.test(input)) {
          playAudioUrl(input, input.split('/').pop());
          return;
        }
        showToast('无法识别的链接，请输入网易云歌曲链接或ID');
        return;
      }

      if (parsed.type === 'playlist') {
        loadNetEasePlaylist(parsed.id);
      } else {
        loadNetEaseSong(parsed.id);
      }
    });

    // 回车键加载
    document.getElementById('songInput').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') document.getElementById('loadBtn').click();
    });

    // 播放控制
    document.getElementById('playBtn').addEventListener('click', togglePlay);
    document.getElementById('stopBtn').addEventListener('click', function() {
      if (audio) { audio.pause(); audio.currentTime = 0; }
      isPlaying = false;
      document.getElementById('playBtn').textContent = '▶';
    });

    // 进度条
    document.getElementById('progressBar').addEventListener('input', function() {
      if (audio) {
        audio.currentTime = parseInt(this.value);
      }
    });

    // 音量控制
    document.getElementById('volumeSlider').addEventListener('input', function() {
      var vol = parseInt(this.value) / 100;
      if (audio) audio.volume = vol;
    });

    // 标签页切换
    document.querySelectorAll('.tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
        document.querySelectorAll('.panel').forEach(function(p) { p.classList.remove('active'); });
        tab.classList.add('active');
        document.getElementById('panel' + capitalize(tab.dataset.tab)).classList.add('active');
        if (tab.dataset.tab === 'playlist') renderPlaylist();
      });
    });

    // 默认音量设置
    document.getElementById('defaultVolume').addEventListener('input', function() {
      var vol = parseInt(this.value);
      document.getElementById('volumeLabel').textContent = vol + '%';
      document.getElementById('volumeSlider').value = vol;
      if (audio) audio.volume = vol / 100;
    });

    // 恢复设置
    try {
      var savedVolume = localStorage.getItem('xiaoxiong_music_volume');
      if (savedVolume) {
        document.getElementById('volumeSlider').value = savedVolume;
        document.getElementById('defaultVolume').value = savedVolume;
        document.getElementById('volumeLabel').textContent = savedVolume + '%';
      }
      var savedAutoplay = localStorage.getItem('xiaoxiong_music_autoplay');
      if (savedAutoplay !== null) {
        document.getElementById('autoplay').checked = savedAutoplay === 'true';
      }
      var savedLoop = localStorage.getItem('xiaoxiong_music_loop');
      if (savedLoop !== null) {
        document.getElementById('loopPlay').checked = savedLoop === 'true';
      }
    } catch(e) {}

    // 保存设置
    document.getElementById('volumeSlider').addEventListener('change', function() {
      localStorage.setItem('xiaoxiong_music_volume', this.value);
    });
    document.getElementById('autoplay').addEventListener('change', function() {
      localStorage.setItem('xiaoxiong_music_autoplay', this.checked);
    });
    document.getElementById('loopPlay').addEventListener('change', function() {
      localStorage.setItem('xiaoxiong_music_loop', this.checked);
    });
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ====== OBR 启动 ======
  function initOBR() {
    if (typeof OBR !== 'undefined') {
      OBR.onReady(function() {
        console.log('[枭雄音乐] 插件已就绪');
        if (OBR.popover) {
          OBR.popover.setHeight(500);
          OBR.popover.setWidth(400);
        }
      });
    }
  }

  // ====== 启动 ======
  document.addEventListener('DOMContentLoaded', function() {
    loadPlaylist();
    initUI();
    initOBR();
  });

})();
