
    (function () {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      function $(id) { return document.getElementById(id); }

      /* ---- small message at the bottom of the screen ---- */
      var toastEl = $('toast'), toastT;
      function toast(msg) {
        toastEl.textContent = msg; toastEl.className = 'toast show';
        clearTimeout(toastT);
        toastT = setTimeout(function () { toastEl.className = 'toast'; }, 3400);
      }

      /* ---- dialogs (photo viewer + share) with keyboard support ---- */
      var lastFocus = null, openEl = null;
      function openDialog(el, cls, focusEl) {
        lastFocus = document.activeElement; openEl = el;
        el.className = cls + ' open'; el.setAttribute('aria-hidden', 'false');
        if (focusEl) { try { focusEl.focus(); } catch (e) {} }
      }
      function closeDialog() {
        if (!openEl) return;
        var wasLb = openEl.id === 'lightbox';
        openEl.className = wasLb ? 'lightbox' : 'modal';
        if (wasLb) syncTrack();
        openEl.setAttribute('aria-hidden', 'true'); openEl = null;
        if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
      }
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDialog();
        if (e.key === 'Tab' && openEl && openEl.id === 'shareModal') {
          var f = openEl.querySelectorAll('button, input, canvas[tabindex]');
          var vis = []; for (var i = 0; i < f.length; i++) { if (f[i].offsetParent !== null) vis.push(f[i]); }
          if (!vis.length) return;
          var first = vis[0], last = vis[vis.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });

      /* ---- Image viewer: any image with class "zoomable" opens full size ---- */
      var lb = $('lightbox'), big = $('lightboxImg');
      var gal = [].slice.call(document.querySelectorAll('.work-img')), gi = -1;
      function showAt(i) {
        gi = (i + gal.length) % gal.length;
        var el = gal[gi];
        big.src = el.getAttribute('data-full') || el.src;
        big.alt = el.getAttribute('alt') || '';
        $('lbCap').textContent = (el.getAttribute('alt') || '') + '  (' + (gi + 1) + ' / ' + gal.length + ')';
      }
      function openImg(el) {
        gi = gal.indexOf(el);
        big.src = el.getAttribute('data-full') || el.src;
        big.alt = el.getAttribute('alt') || '';
        openDialog(lb, 'lightbox', lb);
        if (gi > -1 && gal.length > 1) { lb.className += ' gallery'; showAt(gi); }
      }
      function syncTrack() {
        var t = $('track');
        if (gi > -1 && t) {
          t.style.scrollBehavior = 'auto';
          t.scrollLeft = gi * t.clientWidth;
          t.style.scrollBehavior = '';
        }
      }
      document.addEventListener('click', function (e) {
        var z = e.target.closest ? e.target.closest('.zoomable') : null;
        if (z) openImg(z);
      });
      document.addEventListener('keydown', function (e) {
        var t = e.target;
        if ((e.key === 'Enter' || e.key === ' ') && t && t.classList && t.classList.contains('zoomable')) {
          e.preventDefault(); openImg(t);
        }
      });
      lb.addEventListener('click', function (e) { if (!(e.target.closest && e.target.closest('.lbnav'))) closeDialog(); });
      $('lbPrev').addEventListener('click', function (e) { e.stopPropagation(); showAt(gi - 1); });
      $('lbNext').addEventListener('click', function (e) { e.stopPropagation(); showAt(gi + 1); });
      document.addEventListener('keydown', function (e) {
        if (openEl !== lb || lb.className.indexOf('gallery') < 0) return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); showAt(gi - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); showAt(gi + 1); }
      });
      var tx = null;
      lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', function (e) {
        if (tx === null || lb.className.indexOf('gallery') < 0) return;
        var dx = e.changedTouches[0].clientX - tx; tx = null;
        if (Math.abs(dx) > 50) showAt(gi + (dx < 0 ? 1 : -1));
      });
      lb.setAttribute('tabindex', '-1');

      /* ---- file download that also works on phones ---- */
      function saveBlob(name, blob) {
        var ua = navigator.userAgent || '';
        var ios = /iP(hone|ad|od)/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        var u = URL.createObjectURL(blob);
        if (ios) {
          var w = window.open(u, '_blank');
          if (!w) toast('Please allow pop-ups to save the file.');
          return;
        }
        var a = document.createElement('a');
        a.href = u; a.download = name; a.style.display = 'none';
        document.body.appendChild(a); a.click();
        setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(u); }, 2500);
      }

      /* ---- Save Contact (vCard) ---- */
      function vEsc(v) { return String(v || '').replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }
      var sc = $('saveContact');
      if (sc) sc.addEventListener('click', function () {
        var d = sc.dataset, L = [];
        L.push('BEGIN:VCARD', 'VERSION:3.0');
        L.push('N:' + vEsc(d.last) + ';' + vEsc(d.first) + ';;;');
        L.push('FN:' + vEsc(d.name));
        if (d.org) L.push('ORG:' + vEsc(d.org));
        if (d.title) L.push('TITLE:' + vEsc(d.title));
        if (d.tel) L.push('TEL;TYPE=CELL,VOICE:' + d.tel);
        if (d.email) L.push('EMAIL;TYPE=INTERNET,WORK:' + d.email);
        if (d.li) L.push('URL:' + d.li);
        if (d.url) L.push('URL:' + d.url);
        if (d.loc) L.push('ADR;TYPE=WORK:;;' + vEsc(d.loc) + ';;;;');
        L.push('END:VCARD');
        var blob = new Blob([L.join('\r\n') + '\r\n'], { type: 'text/vcard;charset=utf-8' });
        saveBlob((d.name || 'contact').replace(/[^\w]+/g, '-') + '.vcf', blob);
        toast('Contact file ready. Open it to add me to your contacts.');
      });

      /* ---- Share / QR ---- */
      var sb = $('shareBtn'), modal = $('shareModal'), canvas = $('qrCanvas'), link = $('shareLink');
      var shareUrl = sb ? (sb.getAttribute('data-url') || '') : '';
      function drawQr(url) {
        try {
          var q = qrcode(0, 'M'); q.addData(url); q.make();
          var n = q.getModuleCount(), quiet = 4;
          var cell = Math.max(2, Math.floor(440 / (n + 2 * quiet))), px = cell * (n + 2 * quiet);
          canvas.width = px; canvas.height = px;
          var c = canvas.getContext('2d');
          c.fillStyle = '#ffffff'; c.fillRect(0, 0, px, px);
          c.fillStyle = '#252525';
          for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) {
            if (q.isDark(r, k)) c.fillRect((k + quiet) * cell, (r + quiet) * cell, cell, cell);
          }
          return true;
        } catch (e) { return false; }
      }
      function legacyCopy(t) {
        try {
          var ta = document.createElement('textarea');
          ta.value = t; ta.setAttribute('readonly', '');
          ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, 99999);
          var ok = document.execCommand('copy');
          document.body.removeChild(ta);
          return ok;
        } catch (e) { return false; }
      }
      function copyText(t) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(t).then(function () { return true; }, function () { return legacyCopy(t); });
        }
        return Promise.resolve(legacyCopy(t));
      }
      if (sb) {
        $('nativeRow').style.display = navigator.share ? '' : 'none';
        sb.addEventListener('click', function () {
          if (shareUrl) {
            link.value = shareUrl;
            var ok = drawQr(shareUrl);
            canvas.style.display = ok ? '' : 'none';
            $('shareSub').textContent = ok ? 'Scan the QR code or copy the link.' : 'Copy the link below.';
          } else {
            canvas.style.display = 'none'; link.value = '';
            $('shareSub').textContent = 'The page link is not available yet.';
          }
          openDialog(modal, 'modal', $('shareClose'));
        });
        $('shareClose').addEventListener('click', closeDialog);
        modal.addEventListener('click', function (e) { if (e.target === modal) closeDialog(); });
        $('copyLink').addEventListener('click', function () {
          if (!shareUrl) return toast('No link to copy.');
          copyText(shareUrl).then(function (ok) { toast(ok ? 'Link copied.' : 'Press and hold the link to copy it.'); });
        });
        $('dlQr').addEventListener('click', function () {
          if (canvas.style.display === 'none') return toast('QR code not available.');
          try { canvas.toBlob(function (b) { if (b) saveBlob('profile-qr.png', b); else toast('Could not save the QR image.'); }, 'image/png'); }
          catch (e) { toast('Could not save the QR image.'); }
        });
        $('nativeShare').addEventListener('click', function () {
          if (!navigator.share || !shareUrl) return;
          navigator.share({ title: sb.getAttribute('data-name') + ' | ' + sb.getAttribute('data-title'), url: shareUrl })
            .catch(function (e) {
              if (e && e.name === 'AbortError') return;
              copyText(shareUrl).then(function (ok) { toast(ok ? 'Sharing is blocked here. Link copied instead.' : 'Press and hold the link to copy it.'); });
            });
        });
      }

      /* ---- Copy buttons next to phone / WhatsApp / email ---- */
      document.addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('.copy') : null;
        if (!b) return;
        copyText(b.getAttribute('data-copy')).then(function (ok) {
          if (ok) {
            b.classList.add('done');
            toast((b.getAttribute('data-what') || 'Text') + ' copied.');
            setTimeout(function () { b.classList.remove('done'); }, 1600);
          } else { toast('Could not copy. Please copy it manually.'); }
        });
      });

      /* ---- Download as PDF: built on the server and saved straight to the device (print dialog only as a fallback) ---- */
      var pdf = $('pdfBtn'), pdfBusy = false;
      function pdfFallback() { try { window.print(); } catch (e) { toast('Use your browser menu: Print, then Save as PDF.'); } }
      /* the browser loads the picture itself and hands it to the PDF builder (works without extra Google permissions) */
      function loadPhotoData(urls, done) {
        var i = 0, finished = false;
        function end(v) { if (!finished) { finished = true; done(v); } }
        setTimeout(function () { end(''); }, 7000);
        function next() {
          if (i >= urls.length) return end('');
          var u = urls[i++]; if (!u) return next();
          var im = new Image(); im.crossOrigin = 'anonymous';
          im.onload = function () {
            try {
              var w = im.naturalWidth, h = im.naturalHeight, s = Math.min(1, 320 / Math.max(w, h));
              var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w * s)); c.height = Math.max(1, Math.round(h * s));
              c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
              end(c.toDataURL('image/jpeg', 0.85));
            } catch (e) { next(); }
          };
          im.onerror = next;
          im.src = u;
        }
        next();
      }
      if (pdf) pdf.addEventListener('click', function () {
        if (pdfBusy) return;
        var API = (window.PROFILE_CONFIG || {}).apiUrl;
        if (!API) return pdfFallback();
        pdfBusy = true; pdf.classList.add('busy'); toast('Preparing your PDF...');
        loadPhotoData([pdf.getAttribute('data-photo'), pdf.getAttribute('data-photo2')], function (photo) {
          var done = function () { pdfBusy = false; pdf.classList.remove('busy'); };
          fetch(API, { method: 'POST', body: JSON.stringify({ action: 'pdf', photo: photo, pageUrl: window.PAGE_URL || location.href.split('#')[0] }) })
            .then(function (res) { return res.json(); })
            .then(function (r) {
              done();
              if (!r || r.error || !r.data) throw new Error(r && r.error || 'no data');
              var bin = atob(r.data), n = bin.length, u8 = new Uint8Array(n);
              for (var k = 0; k < n; k++) u8[k] = bin.charCodeAt(k);
              saveBlob(r.name, new Blob([u8], { type: 'application/pdf' }));
              toast(r.photo && r.photo !== 'ok' ? 'PDF downloaded (picture not included: ' + String(r.photo).slice(0, 80) + ')' : 'PDF downloaded.');
            })
            .catch(function () { done(); pdfFallback(); });
        });
      });

      /* ---- Experience: show latest roles, fold the rest ---- */
      var mj = $('moreJobs'), tl = $('tl');
      if (mj && tl) mj.addEventListener('click', function () {
        var open = tl.classList.toggle('open');
        mj.setAttribute('aria-expanded', open ? 'true' : 'false');
        mj.textContent = open ? 'Show fewer roles' : 'Show earlier roles (' + mj.getAttribute('data-n') + ')';
      });

      /* ---- Animated counters (final numbers always restored for print) ---- */
      var cnts = [].slice.call(document.querySelectorAll('.cnt'));
      var counters = [];
      cnts.forEach(function (el) {
        var t = el.textContent, m = t.match(/^(\D*)(\d[\d,]*)(.*)$/);
        if (m) counters.push({ el: el, final: t, pre: m[1], num: parseInt(m[2].replace(/,/g, ''), 10), suf: m[3], comma: m[2].indexOf(',') > -1 });
      });
      function showFinal() { counters.forEach(function (c) { c.el.textContent = c.final; }); }
      window.addEventListener('beforeprint', showFinal);
      if (!reduce && 'IntersectionObserver' in window && counters.length) {
        var cio = new IntersectionObserver(function (es) {
          es.forEach(function (en) {
            if (!en.isIntersecting) return;
            cio.unobserve(en.target);
            var c = counters.filter(function (x) { return x.el === en.target; })[0];
            if (!c || !c.num) return;
            var t0 = null, dur = 900;
            (function step(ts) {
              if (t0 === null) t0 = ts;
              var k = Math.min(1, (ts - t0) / dur), v = Math.round(c.num * (1 - Math.pow(1 - k, 3)));
              c.el.textContent = c.pre + (c.comma ? v.toLocaleString('en-US') : v) + c.suf;
              if (k < 1) requestAnimationFrame(step); else c.el.textContent = c.final;
            })(performance.now());
          });
        }, { threshold: 0.6 });
        counters.forEach(function (c) { if (c.num) { c.el.textContent = c.pre + '0' + c.suf; cio.observe(c.el); } });
      }

      /* ---- Section menu: always visible, highlights where you are ---- */
      var navEl = $('secnav');
      var navLinks = navEl ? [].slice.call(navEl.querySelectorAll('a[data-t]')) : [];
      if (navEl && 'IntersectionObserver' in window) {
        var sio = new IntersectionObserver(function (es) {
          es.forEach(function (en) {
            if (!en.isIntersecting) return;
            navLinks.forEach(function (a) { a.className = (a.getAttribute('data-t') === en.target.id) ? 'on' : ''; });
          });
        }, { rootMargin: '-25% 0px -65% 0px' });
        navLinks.forEach(function (a) { var t = $(a.getAttribute('data-t')); if (t) sio.observe(t); });
      }
      /* Email: open the mail app; if nothing opens (no mail app set up / blocked inside the frame), use Gmail on a computer or copy the address */
      var mailBtn = $('mailBtn');
      if (mailBtn) {
        mailBtn.addEventListener('click', function (e) {
          e.preventDefault();
          var href = mailBtn.getAttribute('href'), addr = href.replace(/^mailto:/i, '').split('?')[0];
          var left = false;
          function gone() { left = true; }
          window.addEventListener('blur', gone); document.addEventListener('visibilitychange', gone); window.addEventListener('pagehide', gone);
          try { window.open(href, '_top'); } catch (x) { try { window.location.href = href; } catch (y) {} }
          setTimeout(function () {
            window.removeEventListener('blur', gone); document.removeEventListener('visibilitychange', gone); window.removeEventListener('pagehide', gone);
            if (left || document.hidden) return;
            var touch = window.matchMedia && window.matchMedia('(hover: none) and (pointer: coarse)').matches;
            if (!touch) {
              var g = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(addr) + '&su=' + encodeURIComponent('Inquiry from your profile page');
              var w = window.open(g, '_blank');
              if (w) return;
            }
            copyText(addr).then(function (ok) { toast(ok ? 'No mail app opened. Email address copied: ' + addr : 'Email: ' + addr); });
          }, 1200);
        });
      }
      /* in-page links (done in script because the page sits inside a frame) */
      document.addEventListener('click', function (e) {
        var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
        if (!a) return;
        var t = $(a.getAttribute('href').slice(1));
        if (!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        if (t.id === 'main') { try { t.focus({ preventScroll: true }); } catch (x) {} }
      });

      /* ---- Video: load the player only when tapped, so the page stays fast ---- */
      function playVideo(box) {
        var src = box.getAttribute('data-embed');
        if (!src || box.querySelector('iframe')) return;
        var f = document.createElement('iframe');
        f.src = src;
        var direct = !!box.getAttribute('data-direct');
        /* Drive videos: Google's own full-screen button is switched off (it shows the browser banner); use the page's Enlarge button instead */
        f.allow = direct ? 'autoplay; encrypted-media' : 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        if (!direct) f.setAttribute('allowfullscreen', '');
        f.title = 'Video';
        if (direct) {
          /* Google Drive videos: the player is shown right away, so only ONE tap (Drive's own play button) is needed */
          box.classList.add('direct');
          box.removeAttribute('role'); box.removeAttribute('tabindex'); box.removeAttribute('aria-label');
        } else {
          box._orig = box.innerHTML;
          box.innerHTML = '';
        }
        box.appendChild(f);
        if (direct) {
          var eb = document.createElement('button');
          eb.type = 'button'; eb.className = 'enl';
          box.appendChild(eb);
          ['l', 'r', 'b'].forEach(function (k) { var d = document.createElement('div'); d.className = 'edge ' + k; box.appendChild(d); });
          eb._box = box; box._enl = eb;
          paintEnl(box);
          eb.addEventListener('click', function () { if (isBig(box)) shrinkVideo(box); else enlargeVideo(box); });
          fitVideo(box);
        } else {
          var sh = document.createElement('div');
          sh.className = 'shield';
          box.appendChild(sh);
        }
      }

      /* ---- Enlarge a Drive video (full screen, or full window if the browser says no) ---- */
      var ICON_ENL = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
      var ICON_EXIT = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';
      function fsEl() { return document.fullscreenElement || document.webkitFullscreenElement || null; }
      function isBig(box) { return box.classList.contains('big') || fsEl() === box; }
      function paintEnl(box) {
        var b = box._enl; if (!b) return;
        var big = isBig(box);
        b.innerHTML = big ? ICON_EXIT : ICON_ENL;
        var t = big ? 'Exit full screen' : 'Enlarge video';
        b.setAttribute('aria-label', t); b.setAttribute('title', t);
      }
      /* phones: hide Google's black header strip (the player is shifted up inside the frame, see .clip) so the video fills the frame */
      function fitVideo(box) {
        if (box.classList.contains('big') || fsEl() === box) return;
        var phone = window.matchMedia('(max-width: 600px)').matches;
        box.classList.toggle('clip', phone);
        box.style.aspectRatio = ''; box.style.height = '';
      }
      function fitAllVideos() { document.querySelectorAll('.player.direct').forEach(fitVideo); }
      window.addEventListener('resize', fitAllVideos);
      window.addEventListener('orientationchange', function () { setTimeout(fitAllVideos, 250); });
      function windowMode(box) { box.classList.add('big'); paintEnl(box); }
      function enlargeVideo(box) {
        /* always the full-window view: real browser full screen shows a "To exit full screen, press Esc" banner */
        windowMode(box);
      }
      function shrinkVideo(box) {
        if (fsEl() === box) { try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {} }
        box.classList.remove('big');
        try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (e) {}
        paintEnl(box); fitVideo(box);
      }
      function onFsChange() {
        document.querySelectorAll('.player.direct').forEach(function (box) {
          if (fsEl() !== box && !box.classList.contains('big')) {
            try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (e) {}
            fitVideo(box);
          }
          paintEnl(box);
        });
      }
      document.addEventListener('fullscreenchange', onFsChange);
      document.addEventListener('webkitfullscreenchange', onFsChange);
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        var b = document.querySelector('.player.big');
        if (b) shrinkVideo(b);
      });
      document.querySelectorAll('.player').forEach(function (box) {
        box.addEventListener('click', function () { playVideo(box); });
        box.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playVideo(box); }
        });
      });

      /* ---- Carousels: swipe, arrows, dots and keyboard (sample work + videos) ---- */
      function initCarousel(trackId, dotsId, prevId, nextId, onChange, opts) {
        var track = $(trackId);
        if (!track) return;
        var slides = track.children.length;
        var dots = $(dotsId), prev = $(prevId), next = $(nextId);
        var last = -1;

        /* ---- optional auto-play (used by Sample Work): next slide every few seconds, loops back to the first ---- */
        var auto = (opts && opts.auto) || 0, pp = opts && opts.pp ? $(opts.pp) : null;
        var userPaused = !!reduce, hold = false, inView = true, timer = null;
        var ICON_PAUSE = '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
        var ICON_PLAY = '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5z"/></svg>';
        function clearT() { if (timer) { clearTimeout(timer); timer = null; } }
        function schedule() {
          clearT();
          if (!auto || userPaused || slides < 2) return;
          timer = setTimeout(tick, auto);
        }
        function tick() {
          timer = null;
          if (hold || !inView || document.hidden || openEl) { schedule(); return; }
          var c = idx();
          go(c + 1 >= slides ? 0 : c + 1);
          schedule();
        }
        function paintPP() {
          if (!pp) return;
          pp.innerHTML = userPaused ? ICON_PLAY : ICON_PAUSE;
          var t = userPaused ? 'Play auto-play' : 'Pause auto-play';
          pp.setAttribute('aria-label', t); pp.setAttribute('title', t);
        }

        function idx() { return Math.round(track.scrollLeft / track.clientWidth); }
        function go(i) {
          i = Math.max(0, Math.min(slides - 1, i));
          track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
        }
        function mark() {
          var n = dots.children, cur = idx();
          if (prev) prev.disabled = (cur <= 0);
          if (next) next.disabled = (cur >= slides - 1);
          for (var i = 0; i < n.length; i++) {
            n[i].className = (i === cur) ? 'on' : '';
            n[i].setAttribute('aria-current', i === cur ? 'true' : 'false');
          }
          if (cur !== last) { last = cur; if (onChange) onChange(cur); schedule(); }
        }
        if (slides > 1) {
          for (var i = 0; i < slides; i++) {
            (function (n) {
              var b = document.createElement('button');
              b.type = 'button';
              b.setAttribute('aria-label', 'Go to item ' + (n + 1));
              b.addEventListener('click', function () { go(n); });
              dots.appendChild(b);
            })(i);
          }
          track.addEventListener('scroll', mark);
          window.addEventListener('resize', mark);
          track.addEventListener('keydown', function (e) {
            if (e.target !== track) return;
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx() - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); go(idx() + 1); }
          });
          if (prev) prev.addEventListener('click', function () { go(idx() - 1); });
          if (next) next.addEventListener('click', function () { go(idx() + 1); });
          mark();
          if (auto) {
            paintPP();
            if (pp) pp.addEventListener('click', function () {
              userPaused = !userPaused; paintPP();
              if (userPaused) clearT(); else schedule();
            });
            /* temporary pauses: finger on the slide, mouse over it (desktop only), tab hidden, off screen */
            track.addEventListener('touchstart', function () { hold = true; }, { passive: true });
            track.addEventListener('touchend', function () { hold = false; schedule(); }, { passive: true });
            track.addEventListener('touchcancel', function () { hold = false; schedule(); }, { passive: true });
            if (window.matchMedia && window.matchMedia('(hover: hover)').matches) {
              var box = track.parentNode;
              box.addEventListener('mouseenter', function () { hold = true; });
              box.addEventListener('mouseleave', function () { hold = false; schedule(); });
            }
            document.addEventListener('visibilitychange', function () { if (document.hidden) clearT(); else schedule(); });
            if ('IntersectionObserver' in window) {
              new IntersectionObserver(function (es) { inView = es[0].isIntersecting; }, { threshold: 0.35 }).observe(track);
            }
            schedule();
          }
        }
      }
      initCarousel('track', 'dots', 'prev', 'next', null, { auto: 5000, pp: 'pp' });
      /* videos: load the Drive player when the section is near the screen; stop a video when you move to another one */
      var vtrack = $('vtrack'), vNear = false;
      function curV() { return vtrack ? Math.round(vtrack.scrollLeft / vtrack.clientWidth) : 0; }
      function videoBox(i) { var sl = vtrack && vtrack.children[i]; return sl ? sl.querySelector('.player') : null; }
      function ensureVideo(i) { var b = videoBox(i); if (b && b.getAttribute('data-direct')) playVideo(b); }
      /* removing the player stops the video and its sound right away; a Drive video loads again (paused) when you come back */
      function stopBox(box) {
        if (!box || !box.querySelector('iframe')) return;
        if (box.getAttribute('data-direct')) {
          if (box.classList.contains('big')) { box.classList.remove('big'); }
          box.querySelectorAll('iframe, .enl, .edge, .shield').forEach(function (n) { n.remove(); });
        } else if (box._orig) { box.innerHTML = box._orig; }
      }
      function stopAllVideos() {
        if (!vtrack) return;
        for (var i = 0; i < vtrack.children.length; i++) stopBox(vtrack.children[i].querySelector('.player'));
      }
      initCarousel('vtrack', 'vdots', 'vprev', 'vnext', function (cur) {
        var slides = vtrack.children;
        for (var i = 0; i < slides.length; i++) { if (i !== cur) stopBox(slides[i].querySelector('.player')); }
        if (vNear) ensureVideo(cur);
      });
      /* never keep playing in the background: leaving the screen, locking the phone or switching apps/tabs stops the video */
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopAllVideos(); else if (vNear) ensureVideo(curV());
      });
      window.addEventListener('pagehide', stopAllVideos);
      window.addEventListener('blur', function () { if (document.hidden) stopAllVideos(); });
      if (vtrack) {
        if ('IntersectionObserver' in window) {
          new IntersectionObserver(function (es) {
            if (es[0].isIntersecting && !vNear) { vNear = true; ensureVideo(curV()); }
          }, { rootMargin: '300px' }).observe(vtrack);
          /* scrolled away from the videos -> stop; scrolled back -> player ready again */
          new IntersectionObserver(function (es) {
            if (!es[0].isIntersecting) { if (!document.querySelector('.player.big')) stopAllVideos(); }
            else if (vNear) ensureVideo(curV());
          }).observe(vtrack);
        } else { vNear = true; ensureVideo(0); }
      }
    })();
  