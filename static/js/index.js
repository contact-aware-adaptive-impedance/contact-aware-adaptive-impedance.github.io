// Scroll-reveal for .reveal sections.
(function () {
  var targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !targets.length) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();

// EMP trial picker: swap soft/stiff/adaptive videos together.
(function () {
  var picker = document.querySelector('.trial-picker');
  var group = document.querySelector('[data-emp-trials]');
  if (!picker || !group) return;

  var buttons = picker.querySelectorAll('.trial-picker__btn');
  var videos = group.querySelectorAll('video[data-emp]');

  picker.addEventListener('click', function (e) {
    var btn = e.target.closest('.trial-picker__btn');
    if (!btn) return;
    var trial = btn.dataset.trial;

    buttons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });

    videos.forEach(function (video) {
      var src = video.dataset['src' + trial];
      if (!src || video.getAttribute('src') === src) return;
      var wasPlaying = !video.paused;
      video.setAttribute('src', src);
      video.load();
      if (wasPlaying) video.play();
    });
  });
})();
