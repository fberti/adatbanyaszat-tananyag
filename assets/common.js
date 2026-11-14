/* Adatbányászat tananyag – közös inicializálás: kvízek, KaTeX, kódkiemelés, témaváltó */
(function () {
  try {
    const t = localStorage.getItem("adatb-theme");
    if (t) document.documentElement.dataset.theme = t;
  } catch (e) {}

  window.renderMath = function (node) {
    if (!window.renderMathInElement) return;
    window.renderMathInElement(node, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false }
      ],
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"],
      throwOnError: false
    });
  };

  function init() {
    if (window.initQuizzes) window.initQuizzes();
    if (window.initPractice) window.initPractice();
    window.renderMath(document.body);
    if (window.hljs) document.querySelectorAll("pre code").forEach((b) => window.hljs.highlightElement(b));

    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const root = document.documentElement;
        const dark = root.dataset.theme
          ? root.dataset.theme === "dark"
          : window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.dataset.theme = dark ? "light" : "dark";
        try { localStorage.setItem("adatb-theme", root.dataset.theme); } catch (e) {}
      });
    }

    // főoldali haladás
    document.querySelectorAll("[data-progress]").forEach((elm) => {
      const ids = elm.dataset.progress.split(/\s+/).filter(Boolean);
      let s = 0, t = 0, done = 0;
      ids.forEach((id) => {
        const p = window.quizProgress && window.quizProgress(id);
        if (p) { s += p.score; t += p.total; done++; }
      });
      elm.textContent = done ? `Kvízek: ${done}/${ids.length} kitöltve · ${s}/${t} helyes` : `Kvízek: ${ids.length} db, még egyik sincs kitöltve`;
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
