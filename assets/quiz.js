/* Adatbányászat tananyag – kvízmotor
 *
 * Használat a leckében:
 *   <div class="quiz" data-quiz="l3-kmeans"></div>
 *   <script defer src="quiz/03.js"></script>   (a kérdések)
 *
 * A kvízfájl formátuma:
 *   QUIZZES["l3-kmeans"] = {
 *     title: "Kvíz – K-means",
 *     questions: [
 *       { type: "single", q: "…", options: ["helyes", "rossz", …], answer: 0, hint: "…", explain: R`…` },
 *       { type: "multi",  q: "…", options: [...], answer: [0, 2], hint: "…", explain: "…" },
 *       { type: "match",  q: "…", pairs: [["bal", "jobb"], …], hint: "…", explain: "…" }
 *     ]
 *   };
 * Az opciók alapból keverednek (shuffle: false kikapcsolja).
 * A $…$ képleteket a KaTeX rendereli.
 */
window.QUIZZES = window.QUIZZES || {};
window.R = String.raw;

(function () {
  const STORE = "adatb-quiz:";
  const save = (id, data) => { try { localStorage.setItem(STORE + id, JSON.stringify(data)); } catch (e) {} };
  const load = (id) => { try { return JSON.parse(localStorage.getItem(STORE + id)); } catch (e) { return null; } };
  window.quizProgress = load;

  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  const math = (node) => { if (window.renderMath) window.renderMath(node); };

  function buildQuestion(q, idx, quizId, onResult) {
    const box = el("div", "q");
    const tag = q.type === "multi" ? "több helyes válasz" : q.type === "match" ? "párosítás" : "egy helyes válasz";
    box.appendChild(el("div", "q-text", `<span class="q-num">${idx + 1}.</span>${q.q}<span class="q-tag">(${tag})</span>`));
    const body = el("div", "q-body");
    box.appendChild(body);
    const name = `${quizId}-${idx}`;
    let check;

    if (q.type === "single" || q.type === "multi") {
      const correct = new Set(q.type === "single" ? [q.answer] : q.answer);
      const order = q.shuffle === false ? q.options.map((_, i) => i) : shuffled(q.options.map((_, i) => i));
      const inputs = [];
      order.forEach((oi) => {
        const lab = el("label", "opt");
        const inp = document.createElement("input");
        inp.type = q.type === "single" ? "radio" : "checkbox";
        inp.name = name;
        inp.value = oi;
        lab.appendChild(inp);
        lab.appendChild(el("span", "", q.options[oi]));
        body.appendChild(lab);
        inputs.push({ inp, lab, oi });
      });
      check = () => {
        const chosen = inputs.filter((x) => x.inp.checked).map((x) => x.oi);
        if (!chosen.length) return null;
        inputs.forEach(({ inp, lab, oi }) => {
          lab.classList.remove("correct", "wrong", "missed");
          if (inp.checked && correct.has(oi)) lab.classList.add("correct");
          else if (inp.checked) lab.classList.add("wrong");
          else if (correct.has(oi)) lab.classList.add("missed");
        });
        return chosen.length === correct.size && chosen.every((c) => correct.has(c));
      };
    } else if (q.type === "match") {
      const rights = shuffled([...new Set(q.pairs.map((p) => p[1]))]);
      const rows = [];
      const order = q.shuffle === false ? q.pairs : shuffled(q.pairs);
      order.forEach(([left, right]) => {
        const row = el("div", "match-row");
        row.appendChild(el("div", "", left));
        const sel = document.createElement("select");
        sel.appendChild(new Option("– válassz –", ""));
        rights.forEach((r) => {
          const tmp = el("span", "", r);
          sel.appendChild(new Option(tmp.textContent, r));
        });
        row.appendChild(sel);
        body.appendChild(row);
        rows.push({ row, sel, right });
      });
      check = () => {
        if (rows.some((r) => !r.sel.value)) return null;
        let ok = true;
        rows.forEach(({ row, sel, right }) => {
          row.classList.remove("correct", "wrong");
          const good = sel.value === right;
          row.classList.add(good ? "correct" : "wrong");
          if (!good) ok = false;
        });
        return ok;
      };
    }

    const actions = el("div", "actions");
    const bCheck = el("button", "btn primary", "Ellenőrzés");
    const bHint = el("button", "btn", "💡 Tipp");
    actions.append(bCheck, bHint);
    box.appendChild(actions);
    const verdict = el("div", "verdict");
    box.appendChild(verdict);

    let hintShown = false;
    bHint.addEventListener("click", () => {
      if (hintShown || !q.hint) return;
      hintShown = true;
      const h = el("div", "hint", "💡 " + q.hint);
      box.insertBefore(h, verdict);
      math(h);
    });
    let explainEl = null;
    bCheck.addEventListener("click", () => {
      const res = check();
      if (res === null) {
        verdict.className = "verdict bad";
        verdict.textContent = "Előbb válaszolj.";
        return;
      }
      verdict.className = "verdict " + (res ? "ok" : "bad");
      verdict.textContent = res ? "✔ Helyes!" : "✘ Nem egészen – nézd meg a magyarázatot.";
      if (!explainEl && q.explain) {
        explainEl = el("div", "explain", q.explain);
        box.appendChild(explainEl);
        math(explainEl);
      }
      onResult(idx, res);
    });
    return box;
  }

  window.initQuizzes = function () {
    document.querySelectorAll("div.quiz[data-quiz]").forEach((host) => {
      const id = host.dataset.quiz;
      const data = window.QUIZZES[id];
      if (!data) {
        host.innerHTML = `<p style="color:var(--bad)">Hiányzó kvíz: ${id}</p>`;
        return;
      }
      const details = el("details", "box quiz-box");
      details.appendChild(el("summary", "", "🎯 " + (data.title || "Kvíz")));
      const results = {};
      const score = el("div", "quiz-score");
      const prev = load(id);
      if (prev) score.textContent = `Legutóbbi eredményed: ${prev.score} / ${prev.total}`;
      data.questions.forEach((q, i) => {
        details.appendChild(buildQuestion(q, i, id, (idx, ok) => {
          if (!(idx in results)) results[idx] = ok; // az első próbálkozás számít
          const done = Object.keys(results).length;
          const good = Object.values(results).filter(Boolean).length;
          score.textContent = `Első próbálkozásra helyes: ${good} / ${done} (összesen ${data.questions.length} kérdés)`;
          if (done === data.questions.length) save(id, { score: good, total: done });
        }));
      });
      details.appendChild(score);
      host.replaceWith(details);
    });
  };
})();
