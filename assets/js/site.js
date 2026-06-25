/* alabarca.com — shared behaviour: lightbox */
(function () {
  // ---------- Lightbox ----------
  function initLightbox() {
    var works = Array.prototype.slice.call(document.querySelectorAll('[data-work]'));
    if (!works.length) return;

    var lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML =
      '<button class="lb-close" aria-label="Close">×</button>' +
      '<button class="lb-nav lb-prev" aria-label="Previous">' +
        '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 3L5 9l6 6"/></svg></button>' +
      '<button class="lb-nav lb-next" aria-label="Next">' +
        '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 3l6 6-6 6"/></svg></button>' +
      '<div class="lb-inner"><img alt=""><div class="lb-cap"></div></div>';
    document.body.appendChild(lb);

    var imgEl = lb.querySelector('img');
    var capEl = lb.querySelector('.lb-cap');
    var idx = 0;

    function render() {
      var w = works[idx];
      var src = w.getAttribute('data-full') || (w.querySelector('img') && w.querySelector('img').src);
      var title = w.getAttribute('data-title') || '';
      var meta = w.getAttribute('data-meta') || '';
      var enquire = w.getAttribute('data-enquire') || '';
      imgEl.style.opacity = 0;
      var pre = new Image();
      pre.onload = function () { imgEl.src = src; imgEl.style.opacity = 1; };
      pre.src = src;
      capEl.innerHTML = '<span class="t">' + title + '</span>' +
        (meta ? '<span class="m">' + meta + '</span>' : '') +
        (enquire ? '<a class="enq" href="' + enquire + '">Enquire about this work →</a>' : '');
    }
    function open(i) { idx = i; render(); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    function step(d) { idx = (idx + d + works.length) % works.length; render(); }

    works.forEach(function (w, i) {
      w.addEventListener('click', function () { open(i); });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-inner')) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }

  function init() { initLightbox(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
