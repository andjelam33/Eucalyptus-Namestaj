(function () {
  if (window.__euGlow) return; window.__euGlow = true;
  var THEMES = {
    light: { line: '#B07A3E', num: '#9A6230', glow: 'rgba(201,150,90,.55)' },
    dark: { line: '#D9B47A', num: '#E3C08A', glow: 'rgba(217,180,122,.6)' }
  };
  var STEP = 380;
  function light(group) {
    var t = THEMES[group.getAttribute('data-glow')] || THEMES.light;
    Array.prototype.forEach.call(group.children, function (el, i) {
      setTimeout(function () {
        el.style.transition = 'border-color .7s ease, box-shadow .9s ease';
        el.style.borderTopColor = t.line;
        el.style.boxShadow = '0 -10px 16px -12px ' + t.glow;
        var n = el.firstElementChild;
        if (n && /^\s*0\d\s*$/.test(n.textContent)) {
          n.style.transition = 'color .7s ease, text-shadow .9s ease';
          n.style.color = t.num;
          n.style.textShadow = '0 0 22px ' + t.glow;
        }
      }, i * STEP);
    });
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { io.unobserve(e.target); light(e.target); }
    });
  }, { threshold: 0.35 });
  function scan() {
    document.querySelectorAll('[data-glow]:not([data-glow-on])').forEach(function (g) {
      g.setAttribute('data-glow-on', ''); io.observe(g);
    });
  }
  scan();
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
})();
