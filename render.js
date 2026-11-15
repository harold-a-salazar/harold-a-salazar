/* Generated from the page template. Builds the page markup from the profile data. */
function renderProfile(p) {
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
var __o='';__o+="\n  <noscript><p style=\"padding:16px;text-align:center;font-family:Arial,sans-serif\">Please turn on JavaScript to view all features of this page.</p></noscript>\n  <a class=\"skip\" href=\"#main\">Skip to content</a>\n\n  "; if (p.nav.length) { 
__o+="\n  <nav class=\"secnav\" id=\"secnav\" aria-label=\"Page sections\">\n    <div class=\"secnav-in\">\n      "; p.nav.forEach(function (n) { 
__o+="<a href=\"#";__o+=esc(n.id);__o+="\" data-t=\"";__o+=esc(n.id);__o+="\">";__o+=esc(n.label);__o+="</a>"; }); 
__o+="\n      <button type=\"button\" class=\"navpdf\" id=\"pdfBtn\" data-photo=\"";__o+=esc(p.pdfPhotoUrl);__o+="\" data-photo2=\"";__o+=esc(p.photo);__o+="\" aria-label=\"Download PDF\" title=\"Download PDF\"><svg viewBox=\"0 0 24 24\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3v12m0 0l-4-4m4 4l4-4M5 21h14\"/></svg></button>\n    </div>\n  </nav>\n  "; } 
__o+="\n\n  <div class=\"brandbar\">\n    "; if (p.logo) { 
__o+="\n      <img src=\"";__o+=esc(p.logo);__o+="\" alt=\"";__o+=esc(p.company);__o+="\" data-fb=\"logo\" data-co=\"";__o+=esc(p.company);__o+="\" fetchpriority=\"high\" decoding=\"async\" onerror=\"imgFail(this)\">\n    "; } else if (p.company) { 
__o+="\n      <span class=\"wm\">";__o+=esc(p.company);__o+="</span>\n    "; } 
__o+="\n  </div>\n\n  <header class=\"hero\" id=\"top\">\n    "; if (p.photo) { 
__o+="\n      <img class=\"avatar zoomable\" id=\"avatar\" src=\"";__o+=esc(p.photo);__o+="\" data-full=\"";__o+=esc(p.photoLarge);__o+="\"\n           alt=\"Photo of ";__o+=esc(p.name);__o+="\" title=\"Tap to enlarge\" tabindex=\"0\" role=\"button\" aria-label=\"Enlarge profile photo\"\n           data-fb=\"avatar\" data-ini=\"";__o+=esc(p.initials);__o+="\" fetchpriority=\"high\" decoding=\"async\" onerror=\"imgFail(this)\">\n    "; } else { 
__o+="\n      <div class=\"avatar initials\">";__o+=esc(p.initials);__o+="</div>\n    "; } 
__o+="\n    <h1>";__o+=esc(p.name);__o+="</h1>\n    <span class=\"role\">";__o+=esc(p.title);__o+="</span>\n    "; if (p.tagline) { 
__o+="<p class=\"tagline\">";__o+=esc(p.tagline);__o+="</p>"; } 
__o+="\n    "; if (p.location) { 
__o+="<p class=\"loc\">";__o+=esc(p.location);__o+="</p>"; } 
__o+="\n    <div class=\"hero-actions\">\n      <button type=\"button\" class=\"hbtn primary\" id=\"saveContact\"\n        data-first=\"";__o+=esc(p.vFirst);__o+="\" data-last=\"";__o+=esc(p.vLast);__o+="\" data-name=\"";__o+=esc(p.vName);__o+="\" data-org=\"";__o+=esc(p.company);__o+="\"\n        data-title=\"";__o+=esc(p.title);__o+="\" data-tel=\"";__o+=esc(p.phoneLink);__o+="\" data-email=\"";__o+=esc(p.email);__o+="\"\n        data-li=\"";__o+=esc(p.linkedin);__o+="\" data-loc=\"";__o+=esc(p.location);__o+="\" data-url=\"";__o+=esc(p.pageUrl);__o+="\">Save Contact</button>\n      <button type=\"button\" class=\"hbtn ghost\" id=\"shareBtn\" data-url=\"";__o+=esc(p.pageUrl);__o+="\" data-name=\"";__o+=esc(p.name);__o+="\" data-title=\"";__o+=esc(p.title);__o+="\">Share / QR</button>\n    </div>\n  </header>\n\n  <main id=\"main\" tabindex=\"-1\">\n  <div class=\"wrap\">\n\n    "; if (p.show.stats && p.stats.length) { 
__o+="\n    <section class=\"stats fade\" aria-label=\"Key figures\">\n      "; p.stats.forEach(function (s) { 
__o+="\n        <div class=\"stat\"><b class=\"cnt\">";__o+=esc(s.value);__o+="</b><span>";__o+=esc(s.label);__o+="</span></div>\n      "; }); 
__o+="\n    </section>\n    "; } 
__o+="\n\n    <section class=\"card fade\" id=\"contact\" aria-labelledby=\"h-contact\">\n      <h2 id=\"h-contact\">Get in Touch</h2>\n      <div class=\"actions\">\n        "; if (p.phone) { 
__o+="<div class=\"act\"><a class=\"btn\" href=\"tel:";__o+=esc(p.phoneLink);__o+="\">Call</a><div class=\"detail\">(";__o+=esc(p.phone);__o+=")<button type=\"button\" class=\"copy\" data-copy=\"";__o+=esc(p.phone);__o+="\" data-what=\"Phone number\" aria-label=\"Copy phone number\" title=\"Copy\"><svg class=\"i-copy\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"9\" y=\"9\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg><svg class=\"i-ok\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 13l4 4L19 7\"/></svg></button></div></div>"; } 
__o+="\n        "; if (p.whatsapp) { 
__o+="<div class=\"act\"><a class=\"btn dark\" href=\"https://wa.me/";__o+=esc(p.whatsapp);__o+="?text=Hello%20";__o+=esc(encodeURIComponent(p.vFirst));__o+="%2C%20I%20found%20your%20profile%20page.\" target=\"_blank\" rel=\"noopener noreferrer\">WhatsApp</a><div class=\"detail\">(";__o+=esc(p.whatsappLabel);__o+=")<button type=\"button\" class=\"copy\" data-copy=\"";__o+=esc(p.whatsappLabel);__o+="\" data-what=\"WhatsApp number\" aria-label=\"Copy WhatsApp number\" title=\"Copy\"><svg class=\"i-copy\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"9\" y=\"9\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg><svg class=\"i-ok\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 13l4 4L19 7\"/></svg></button></div></div>"; } 
__o+="\n        "; if (p.email) { 
__o+="<div class=\"act\"><a class=\"btn dark\" id=\"mailBtn\" href=\"mailto:";__o+=esc(p.email);__o+="?subject=Inquiry%20from%20your%20profile%20page\" target=\"_top\">Email</a><div class=\"detail\">"; var ep = p.email.split('@'); if (ep.length === 2) { 
__o+="(";__o+=esc(ep[0]);__o+="@<wbr><span class=\"nw\">";__o+=esc(ep[1]);__o+=")<button type=\"button\" class=\"copy\" data-copy=\"";__o+=esc(p.email);__o+="\" data-what=\"Email address\" aria-label=\"Copy email address\" title=\"Copy\"><svg class=\"i-copy\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"9\" y=\"9\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg><svg class=\"i-ok\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 13l4 4L19 7\"/></svg></button></span>"; } else { 
__o+="(";__o+=esc(p.email);__o+=")<button type=\"button\" class=\"copy\" data-copy=\"";__o+=esc(p.email);__o+="\" data-what=\"Email address\" aria-label=\"Copy email address\" title=\"Copy\"><svg class=\"i-copy\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"9\" y=\"9\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg><svg class=\"i-ok\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 13l4 4L19 7\"/></svg></button>"; } 
__o+="</div></div>"; } 
__o+="\n        "; if (p.linkedin) { 
__o+="<div class=\"act\"><a class=\"btn ghost\" href=\"";__o+=esc(p.linkedin);__o+="\" target=\"_blank\" rel=\"noopener noreferrer\">LinkedIn</a><div class=\"detail\"><span class=\"nw\">LinkedIn profile<button type=\"button\" class=\"copy\" data-copy=\"";__o+=esc(p.linkedin);__o+="\" data-what=\"LinkedIn link\" aria-label=\"Copy LinkedIn link\" title=\"Copy\"><svg class=\"i-copy\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"9\" y=\"9\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg><svg class=\"i-ok\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 13l4 4L19 7\"/></svg></button></span></div></div>"; } 
__o+="\n      </div>\n      <div class=\"print-contact\">\n        "; if (p.phone) { 
__o+="Phone: ";__o+=esc(p.phone);__o+="<br>"; } 
__o+="\n        "; if (p.email) { 
__o+="Email: ";__o+=esc(p.email);__o+="<br>"; } 
__o+="\n        "; if (p.linkedin) { 
__o+="LinkedIn: ";__o+=esc(p.linkedin);__o+="<br>"; } 
__o+="\n        "; if (p.pageUrl) { 
__o+="Profile: ";__o+=esc(p.pageUrl);__o+=""; } 
__o+="\n      </div>\n    </section>\n\n    "; if (p.show.summary && p.summary) { 
__o+="\n    <section class=\"card fade\" id=\"about\" aria-labelledby=\"h-about\">\n      <h2 id=\"h-about\">Professional Summary</h2>\n      <p>";__o+=esc(p.summary);__o+="</p>\n    </section>\n    "; } 
__o+="\n\n    "; if (p.show.achievements && p.highlightGroups.length) { 
__o+="\n    <section class=\"card fade\" id=\"achievements\" aria-labelledby=\"h-ach\">\n      <h2 id=\"h-ach\">Key Achievements</h2>\n      "; p.highlightGroups.forEach(function (g) { 
__o+="\n        <div class=\"hgroup\">\n          "; if (g.label) { 
__o+="<div class=\"hlabel\">";__o+=esc(g.label);__o+="</div>"; } 
__o+="\n          <ul class=\"plain\">\n            "; g.items.forEach(function (h) { 
__o+="<li>";__o+=esc(h);__o+="</li>"; }); 
__o+="\n          </ul>\n        </div>\n      "; }); 
__o+="\n    </section>\n    "; } 
__o+="\n\n    "; if (p.show.samples && p.works.length) { 
__o+="\n    <section class=\"card fade\" id=\"samples\" aria-labelledby=\"h-samples\">\n      <h2 id=\"h-samples\">Sample Work</h2>\n      <div class=\"carousel\" role=\"region\" aria-roledescription=\"carousel\" aria-label=\"Sample work\">\n        <div class=\"track\" id=\"track\" tabindex=\"0\">\n          "; p.works.forEach(function (w) { 
__o+="\n            <figure class=\"slide\">\n              <figcaption><b>";__o+=esc(w.title);__o+="</b>"; if (w.desc) { 
__o+="<span>";__o+=esc(w.desc);__o+="</span>"; } 
__o+="</figcaption>\n              <p class=\"sample-note\">";__o+=esc(p.sampleNote);__o+="</p>\n              <div class=\"shot\"><img class=\"zoomable work-img\" src=\"";__o+=esc(w.thumb);__o+="\" data-full=\"";__o+=esc(w.full);__o+="\" alt=\"";__o+=esc(w.title);__o+="\" loading=\"lazy\" decoding=\"async\" data-fb=\"work\" onerror=\"imgFail(this)\"></div>\n            </figure>\n          "; }); 
__o+="\n        </div>\n      </div>\n      "; if (p.works.length > 1) { 
__o+="\n      <div class=\"ctrl\">\n        <button type=\"button\" class=\"nav prev\" id=\"prev\" aria-label=\"Previous image\">&#8249;</button>\n        <div class=\"dots\" id=\"dots\"></div>\n        <button type=\"button\" class=\"nav pp\" id=\"pp\" aria-label=\"Pause auto-play\" title=\"Pause auto-play\"></button>\n        <button type=\"button\" class=\"nav next\" id=\"next\" aria-label=\"Next image\">&#8250;</button>\n      </div>\n      "; } 
__o+="\n    </section>\n    "; } 
__o+="\n\n    "; if (p.show.videos && p.videos.length) { 
__o+="\n    <section class=\"card fade\" id=\"demos\" aria-labelledby=\"h-demos\">\n      <h2 id=\"h-demos\">Automation Demos</h2>\n      <div class=\"carousel vcar\" role=\"region\" aria-roledescription=\"carousel\" aria-label=\"Automation demo videos\">\n        <div class=\"track\" id=\"vtrack\" tabindex=\"0\">\n          "; p.videos.forEach(function (v) { 
__o+="\n            <div class=\"slide\">\n              <div class=\"vmeta\">\n                <b>";__o+=esc(v.title);__o+="</b>\n                "; if (v.desc) { 
__o+="<span>";__o+=esc(v.desc);__o+="</span>"; } 
__o+="\n              </div>\n              <p class=\"sample-note\">";__o+=esc(p.sampleNote);__o+="</p>\n              <div class=\"player\" data-embed=\"";__o+=esc(v.embed);__o+="\"data-direct=\"";__o+=esc((v.embed.indexOf('drive.google.com') > -1) ? '1' : '');__o+="\" role=\"button\" tabindex=\"0\" aria-label=\"Play video: ";__o+=esc(v.title);__o+="\">\n                "; if (v.thumb) { 
__o+="<img src=\"";__o+=esc(v.thumb);__o+="\" alt=\"\" loading=\"lazy\" decoding=\"async\" onerror=\"this.style.display='none'\">"; } 
__o+="\n                <span class=\"play\"></span>\n              </div>\n            </div>\n          "; }); 
__o+="\n        </div>\n      </div>\n      "; if (p.videos.length > 1) { 
__o+="\n      <div class=\"ctrl\">\n        <button type=\"button\" class=\"nav prev\" id=\"vprev\" aria-label=\"Previous video\">&#8249;</button>\n        <div class=\"dots\" id=\"vdots\"></div>\n        <button type=\"button\" class=\"nav next\" id=\"vnext\" aria-label=\"Next video\">&#8250;</button>\n      </div>\n      "; } 
__o+="\n      <p class=\"hint note\">You can change the <b>video quality</b> in the settings icon (<span class=\"gear\" aria-hidden=\"true\">&#9881;</span>) of each video.</p>\n    </section>\n    "; } 
__o+="\n\n    "; if ((p.show.skills && p.skillGroups.length) || (p.show.tools && p.toolGroups.length)) { 
__o+="\n    <div id=\"skills\">\n    "; if (p.show.skills && p.skillGroups.length) { 
__o+="\n    <section class=\"card fade\" aria-labelledby=\"h-skills\">\n      <h2 id=\"h-skills\">Core Competencies</h2>\n      "; p.skillGroups.forEach(function (g) { 
__o+="\n        <div class=\"sgroup\">\n          "; if (g.label) { 
__o+="<div class=\"tlabel\">";__o+=esc(g.label);__o+="</div>"; } 
__o+="\n          <div class=\"chips\">\n            "; g.items.forEach(function (s) { 
__o+="<span class=\"chip\">";__o+=esc(s);__o+="</span>"; }); 
__o+="\n          </div>\n        </div>\n      "; }); 
__o+="\n    </section>\n    "; } 
__o+="\n\n    "; if (p.show.tools && p.toolGroups.length) { 
__o+="\n    <section class=\"card fade\" aria-labelledby=\"h-tools\">\n      <h2 id=\"h-tools\">Tools &amp; Systems</h2>\n      "; p.toolGroups.forEach(function (g) { 
__o+="\n        <div class=\"tgroup\">\n          "; if (g.label) { 
__o+="<div class=\"tlabel\">";__o+=esc(g.label);__o+="</div>"; } 
__o+="\n          <div class=\"chips\">\n            "; g.items.forEach(function (s) { 
__o+="<span class=\"chip dark\">";__o+=esc(s);__o+="</span>"; }); 
__o+="\n          </div>\n        </div>\n      "; }); 
__o+="\n    </section>\n    "; } 
__o+="\n    </div>\n    "; } 
__o+="\n\n    "; if (p.show.experience && p.jobs.length) { 
__o+="\n    <section class=\"card fade\" id=\"experience\" aria-labelledby=\"h-exp\">\n      <h2 id=\"h-exp\">Experience</h2>\n      <div class=\"tl\" id=\"tl\">\n        "; p.jobs.forEach(function (j, i) { 
__o+="\n          <div class=\"job";__o+=esc((i >= p.expVisible) ? ' more' : '');__o+="\">\n            <h3>";__o+=esc(j.role);__o+="</h3>\n            <div class=\"org\">";__o+=esc(j.org);__o+="</div>\n            <div class=\"per\">";__o+=esc(j.period);__o+="</div>\n            "; if (j.desc) { 
__o+="<div class=\"desc\">";__o+=esc(j.desc);__o+="</div>"; } 
__o+="\n            "; if (j.bullets.length) { 
__o+="\n              <ul>"; j.bullets.forEach(function (b) { 
__o+="<li>";__o+=esc(b);__o+="</li>"; }); 
__o+="</ul>\n            "; } 
__o+="\n          </div>\n        "; }); 
__o+="\n      </div>\n      "; if (p.jobs.length > p.expVisible) { 
__o+="\n        <button type=\"button\" class=\"toggle\" id=\"moreJobs\" aria-expanded=\"false\" aria-controls=\"tl\" data-n=\"";__o+=esc(p.jobs.length - p.expVisible);__o+="\">Show earlier roles (";__o+=esc(p.jobs.length - p.expVisible);__o+=")</button>\n      "; } 
__o+="\n    </section>\n    "; } 
__o+="\n\n    "; if (p.show.training && (p.certs.items.length || p.edu)) { 
__o+="\n    <section class=\"card fade\" id=\"training\" aria-labelledby=\"h-train\">\n      <h2 id=\"h-train\">Education &amp; Development</h2>\n      "; if (p.edu) { 
__o+="\n        <div class=\"edu\"><b>";__o+=esc(p.edu.title);__o+="</b>"; if (p.edu.sub) { 
__o+="<span>";__o+=esc(p.edu.sub);__o+="</span>"; } 
__o+="</div>\n      "; } 
__o+="\n      "; if (p.certs.items.length) { 
__o+="\n        <div class=\"subhead\">";__o+=esc(p.certs.head || 'Certifications');__o+="</div>\n        <ul class=\"plain certs\">\n        "; p.certs.items.forEach(function (c) { 
__o+="\n          <li class=\"cert\">";__o+=esc(c.title);__o+=""; if (c.date) { 
__o+=" <span>| ";__o+=esc(c.date);__o+="</span>"; } 
__o+="</li>\n        "; }); 
__o+="\n        </ul>\n      "; } 
__o+="\n    </section>\n    "; } 
__o+="\n\n    <footer>";__o+=esc(p.name);__o+=""; if (p.version) { 
__o+=" &middot; Version ";__o+=esc(p.version);__o+=""; } 
__o+="</footer>\n  </div>\n  </main>\n\n  <div class=\"lightbox\" id=\"lightbox\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Enlarged image\" aria-hidden=\"true\">\n    <span class=\"x\" aria-hidden=\"true\">&times;</span>\n    <button type=\"button\" class=\"lbnav prev\" id=\"lbPrev\" aria-label=\"Previous image\">&#8249;</button>\n    <button type=\"button\" class=\"lbnav next\" id=\"lbNext\" aria-label=\"Next image\">&#8250;</button>\n    <img id=\"lightboxImg\" alt=\"\">\n    <div class=\"lbcap\" id=\"lbCap\"></div>\n  </div>\n\n  <div class=\"modal\" id=\"shareModal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"shareTitle\" aria-hidden=\"true\">\n    <div class=\"sheet\">\n      <button type=\"button\" class=\"close\" id=\"shareClose\" aria-label=\"Close\">&times;</button>\n      <h3 id=\"shareTitle\">Share my profile</h3>\n      <p class=\"sub\" id=\"shareSub\">Scan the QR code or copy the link.</p>\n      <canvas id=\"qrCanvas\" width=\"220\" height=\"220\" role=\"img\" aria-label=\"QR code that opens this profile page\"></canvas>\n      <input type=\"text\" id=\"shareLink\" readonly aria-label=\"Profile link\">\n      <div class=\"srow\">\n        <button type=\"button\" class=\"btn\" id=\"copyLink\">Copy link</button>\n        <button type=\"button\" class=\"btn ghost\" id=\"dlQr\">Save QR image</button>\n      </div>\n      <div class=\"srow\" style=\"margin-top:8px\" id=\"nativeRow\"><button type=\"button\" class=\"btn ghost\" id=\"nativeShare\" style=\"grid-column:1/-1\">Share&hellip;</button></div>\n    </div>\n  </div>\n\n  <div class=\"toast\" id=\"toast\" role=\"status\" aria-live=\"polite\"></div>\n\n  ";return __o;
}
