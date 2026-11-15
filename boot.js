/* Loads the profile data from the Google Sheet (through Apps Script), draws the page, then starts the page features. */
(function () {
  var cfg = window.PROFILE_CONFIG || {};
  var API = cfg.apiUrl || '';
  var KEY = 'profile-cache-v1:' + API;
  var boot = document.getElementById('boot'), bootMsg = document.getElementById('bootMsg'), app = document.getElementById('app');
  var t0 = Date.now(), started = false;
  /* in-app browsers (Messenger, Facebook, Instagram, Android WebView) draw Google's video player differently */
  try { if (/FBAN|FBAV|FB_IAB|Messenger|Instagram|Line\/|; wv\)/i.test(navigator.userAgent)) document.documentElement.classList.add('inapp'); } catch (e) {}

  function getCache() { try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; } }
  function setCache(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function fail(msg) {
    if (started) return;
    boot.innerHTML = '<div style="font-size:15px;color:#252525;max-width:320px">' + msg + '</div><button type="button" id="bootRetry">Try again</button>';
    document.getElementById('bootRetry').onclick = function () { location.reload(); };
  }

  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src; s.async = false; s.onload = cb;
    s.onerror = function () { fail('The page could not finish loading. Please check your connection.'); };
    document.body.appendChild(s);
  }

  function start(p) {
    if (started) return;
    started = true;
    if (!p.pageUrl) p.pageUrl = location.origin + location.pathname.replace(/index\.html$/, '');
    window.PAGE_URL = p.pageUrl;
    try {
      document.title = (p.name || 'Profile') + (p.title ? ' | ' + p.title : '');
      var fav = document.getElementById('favicon');
      if (fav && p.initials) fav.href = "data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#870b0b'/><text x='32' y='42' font-size='28' font-family='Arial' font-weight='700' text-anchor='middle' fill='#c5b783'>" + String(p.initials).replace(/[<>&]/g, '') + "</text></svg>");
    } catch (e) {}
    app.innerHTML = renderProfile(p);
    loadScript('qr.js', function () {
      loadScript('app.js', function () {
        boot.classList.add('gone');
        setTimeout(function () { if (boot.parentNode) boot.parentNode.removeChild(boot); }, 400);
        try {
          if (location.hash.length > 1) {
            var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
            if (el) el.scrollIntoView();
          }
        } catch (e) {}
      });
    });
  }

  function fetchProfile(tries) {
    var ctl = ('AbortController' in window) ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 25000);
    return fetch(API + (API.indexOf('?') > -1 ? '&' : '?') + 'action=profile', { cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { clearTimeout(timer); return r.text(); })
      .then(function (t) { return { text: t, data: JSON.parse(t) }; })
      .catch(function (err) {
        clearTimeout(timer);
        if (tries > 1) return fetchProfile(tries - 1);
        throw err;
      });
  }

  if (!API || /PASTE_YOUR/.test(API)) { fail('This page is not connected yet. Open config.js and paste your Apps Script link.'); return; }

  var cached = getCache(), cachedP = null;
  if (cached) { try { cachedP = JSON.parse(cached); } catch (e) { cachedP = null; } }
  if (cachedP && cachedP.name) start(cachedP);   // instant show from the last visit

  fetchProfile(2).then(function (res) {
    var d = res.data;
    if (d && d.ok && d.profile) {
      var fresh = JSON.stringify(d.profile);
      if (!started) { setCache(fresh); start(d.profile); return; }
      if (fresh !== cached) {                      // the sheet changed since the last visit
        setCache(fresh);
        if (Date.now() - t0 < 8000 && (window.pageYOffset || 0) < 60) location.reload();
      }
    } else if (!started) {
      fail(d && d.error === 'empty' ? 'Profile is being updated. Please check back in a few minutes.' : 'The profile is temporarily unavailable. Please try again in a moment.');
    }
  }).catch(function () {
    if (!started) fail('The profile could not be loaded. Please check your connection and try again.');
  });
})();
