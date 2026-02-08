/**
 * 前端密码门（弱保护）：未输入正确密码时显示遮罩，输入正确后本次会话可访问。
 * 密码以 SHA-256 哈希比对，不在页面中明文存储；仍无法防止会看源码/爬虫的人。
 */
(function () {
  var HASH = typeof window.BLOG_PASS_HASH === 'string' ? window.BLOG_PASS_HASH.trim() : '';
  var STORAGE_KEY = 'blog_pass';

  if (!HASH) return;
  if (sessionStorage.getItem(STORAGE_KEY) === HASH) return;

  // 先隐藏页面，避免闪一下正文
  document.documentElement.style.visibility = 'hidden';

  function showPage() {
    document.documentElement.style.visibility = '';
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }

  function sha256Hex(str) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
      .then(function (buf) {
        var arr = new Uint8Array(buf);
        var hex = '';
        for (var i = 0; i < arr.length; i++) {
          var h = arr[i].toString(16);
          if (h.length === 1) h = '0' + h;
          hex += h;
        }
        return hex;
      });
  }

  var overlay = document.createElement('div');
  overlay.id = 'blog-password-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:#1a1a1a;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;';
  overlay.innerHTML = '<div style="text-align:center;color:#eee;">' +
    '<p style="margin-bottom:12px;">请输入访问密码</p>' +
    '<input type="password" id="blog-password-input" placeholder="密码" style="padding:8px 12px;margin-right:8px;border:1px solid #555;background:#222;color:#eee;border-radius:4px;" />' +
    '<button type="button" id="blog-password-btn" style="padding:8px 16px;background:#555;color:#eee;border:none;border-radius:4px;cursor:pointer;">确定</button>' +
    '<p id="blog-password-err" style="margin-top:12px;color:#c66;font-size:14px;display:none;">密码错误</p>' +
    '</div>';

  function onReady() {
    document.body.appendChild(overlay);
    var input = document.getElementById('blog-password-input');
    var btn = document.getElementById('blog-password-btn');
    var err = document.getElementById('blog-password-err');

    function check() {
      var raw = (input.value || '').trim();
      if (!raw) return;
      err.style.display = 'none';
      btn.disabled = true;
      sha256Hex(raw).then(function (hex) {
        if (hex === HASH) {
          sessionStorage.setItem(STORAGE_KEY, HASH);
          showPage();
        } else {
          err.style.display = 'block';
          btn.disabled = false;
        }
      }).catch(function () {
        err.style.display = 'block';
        btn.disabled = false;
      });
    }

    btn.addEventListener('click', check);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') check();
    });
    input.focus();
  }

  if (document.body) {
    onReady();
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }
})();
