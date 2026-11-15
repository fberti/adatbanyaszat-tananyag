/* Adatbányászat tananyag – vizsgagyakorló alkalmazás
 *
 * Kérdésforrások:
 *   BANK      – a vizsgagyakorló saját kérdései (quiz/bank/*.js): {id, topic, level, ref, type, q, options, answer | pairs, hint, explain}
 *   QUIZZES   – a leckék kvízei (quiz/NN.js); opcionálisan bevonhatók
 * Állapot (böngészőnként): localStorage "adatb-bank-stats" (kérdésenkénti statisztika), "adatb-bank-history", "adatb-bank-settings".
 */
window.BANK = window.BANK || [];
window.QUIZZES = window.QUIZZES || {};
window.R = String.raw;

(function () {
  const TOPICS = {
    "10": { name: "BI és adatbányászat alapfogalmai", file: "10-bi-adatbanyaszat-alapok.html" },
    "01": { name: "Adattisztítás és feltáró elemzés", file: "01-adattisztitas.html" },
    "02": { name: "Kosárelemzés (Apriori)", file: "02-kosarelemzes.html" },
    "11": { name: "Python adatkezelés", file: "11-python-adatkezeles.html" },
    "12": { name: "Adattárolás, adattárház, ETL", file: "12-adattarolas-adattarhaz.html" },
    "13": { name: "MD modell és MDX", file: "13-md-modell-mdx.html" },
    "07": { name: "SQL ablakfüggvények", file: "07-sql-ablakfuggvenyek.html" },
    "03": { name: "K-means", file: "03-kmeans.html" },
    "04": { name: "Hierarchikus klaszterezés", file: "04-hierarchikus-klaszterezes.html" },
    "14": { name: "Sűrűség alapú klaszterezés, validálás, kiugrók", file: "14-suruseg-validalas-kiugrok.html" },
    "05": { name: "Döntési fa, mérőszámok", file: "05-dontesi-fa.html" },
    "06": { name: "Neurális háló (MLP)", file: "06-neuralis-halo.html" },
    "mix": { name: "Vegyes: módszerválasztás", file: "08-osszefoglalas.html" }
  };
  // A számszerű kulcsokat ("10"…) a JS objektum előre sorolná, ezért a sorrendet (ütemterv) külön tartjuk.
  const ORDER = ["10", "01", "02", "11", "12", "13", "07", "03", "04", "14", "05", "06", "mix"];
  const LEVELS = { 1: "fogalom", 2: "alkalmazás", 3: "értelmezés", 0: "lecke-kvíz" };
  const K_STATS = "adatb-bank-stats", K_HIST = "adatb-bank-history", K_SET = "adatb-bank-settings";

  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const $ = (sel, root = document) => root.querySelector(sel);
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function shuffled(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const math = (n) => { if (window.renderMath) window.renderMath(n); };
  const pct = (a, b) => (b ? Math.round((100 * a) / b) : 0);

  /* ---------- kérdéskészlet összeállítása ---------- */
  function lessonQuestions() {
    const out = [];
    for (const [qid, quiz] of Object.entries(window.QUIZZES)) {
      const m = /^l(\d\d)-(.+)$/.exec(qid);
      if (!m) continue;
      const topic = m[1] === "08" ? "mix" : m[1];
      if (!TOPICS[topic]) continue;
      const anchor = /^lepes\d+$/.test(m[2]) ? m[2] : m[1] === "08" ? "parok" : "osszefoglalas";
      quiz.questions.forEach((q, i) => out.push(Object.assign({}, q, {
        id: `q:${qid}:${i}`, topic, level: m[1] === "08" ? 2 : 0, ref: `${TOPICS[topic].file}#${anchor}`, fromLesson: m[1] !== "08"
      })));
    }
    return out;
  }
  function allQuestions(includeLesson) {
    const bank = window.BANK.filter((q) => TOPICS[q.topic]);
    // a korábbi vegyes vizsgakvíz (l08) mindig a bank része
    const lesson = lessonQuestions().filter((q) => includeLesson || q.id.startsWith("q:l08-"));
    return bank.concat(lesson);
  }

  /* ---------- egy kérdés megjelenítése (értékelés később is kérhető) ---------- */
  function renderQuestion(q, uid) {
    const root = el("div", "pr-q");
    root.appendChild(el("div", "q-text", q.q));
    const body = el("div", "q-body");
    root.appendChild(body);
    let api;
    if (q.type === "single" || q.type === "multi") {
      const correct = new Set(q.type === "single" ? [q.answer] : q.answer);
      const order = q.shuffle === false ? q.options.map((_, i) => i) : shuffled(q.options.map((_, i) => i));
      const items = order.map((oi, k) => {
        const lab = el("label", "opt");
        const inp = document.createElement("input");
        inp.type = q.type === "single" ? "radio" : "checkbox";
        inp.name = uid;
        lab.appendChild(inp);
        lab.appendChild(el("span", "pr-key", String(k + 1)));
        lab.appendChild(el("span", "", q.options[oi]));
        body.appendChild(lab);
        return { inp, lab, oi };
      });
      api = {
        answered: () => items.some((x) => x.inp.checked),
        pick: (k) => { const it = items[k]; if (!it || it.inp.disabled) return; it.inp.checked = q.type === "single" ? true : !it.inp.checked; },
        grade: () => {
          const chosen = items.filter((x) => x.inp.checked).map((x) => x.oi);
          return chosen.length === correct.size && chosen.every((c) => correct.has(c));
        },
        reveal: () => items.forEach(({ inp, lab, oi }) => {
          inp.disabled = true;
          if (inp.checked && correct.has(oi)) lab.classList.add("correct");
          else if (inp.checked) lab.classList.add("wrong");
          else if (correct.has(oi)) lab.classList.add("missed");
        }),
        summary: () => items.filter((x) => x.inp.checked).map((x) => q.options[x.oi]).join("; ") || "–",
        correctText: () => [...correct].map((i) => q.options[i]).join("; ")
      };
    } else {
      const rights = shuffled([...new Set(q.pairs.map((p) => p[1]))]);
      const rows = shuffled(q.pairs).map(([left, right]) => {
        const row = el("div", "match-row");
        row.appendChild(el("div", "", left));
        const sel = document.createElement("select");
        sel.appendChild(new Option("– válassz –", ""));
        rights.forEach((r) => sel.appendChild(new Option(el("span", "", r).textContent, r)));
        row.appendChild(sel);
        body.appendChild(row);
        return { row, sel, left, right };
      });
      api = {
        answered: () => rows.every((r) => r.sel.value),
        pick: () => {},
        grade: () => rows.every((r) => r.sel.value === r.right),
        reveal: () => rows.forEach(({ row, sel, right }) => {
          sel.disabled = true;
          row.classList.add(sel.value === right ? "correct" : "wrong");
          if (sel.value !== right) row.appendChild(el("div", "pr-fix", "→ " + right));
        }),
        summary: () => rows.map((r) => `${el("span", "", r.left).textContent} → ${r.sel.value ? el("span", "", r.sel.value).textContent : "–"}`).join("; "),
        correctText: () => q.pairs.map((p) => `${p[0]} → ${p[1]}`).join("; ")
      };
    }
    api.el = root;
    return api;
  }

  /* ---------- statisztika ---------- */
  function record(q, ok) {
    const s = store.get(K_STATS, {});
    const e = s[q.id] || { seen: 0, correct: 0 };
    e.seen++; if (ok) e.correct++;
    e.last = ok ? 1 : 0; e.t = Date.now();
    s[q.id] = e;
    store.set(K_STATS, s);
  }
  function weakness(q, stats) {
    const e = stats[q.id];
    if (!e) return 1.0;                 // még nem látott: közepesen előre
    if (e.last === 0) return 2.0;       // legutóbb elrontott: leginkább előre
    return 0.5 * (1 - e.correct / e.seen);
  }

  /* ---------- alkalmazás ---------- */
  const app = $("#app");
  const defaults = { topics: ORDER.slice(), levels: ["1", "2", "3"], count: "20", mode: "practice", lesson: false, weak: false, timer: false };
  let settings = Object.assign({}, defaults, store.get(K_SET, {}));
  // korábban mentett beállításnál az azóta bekerült témakörök alapból legyenek bejelölve
  if (!settings.knownTopics) settings.knownTopics = ["01", "02", "03", "04", "05", "06", "07", "mix"];
  ORDER.forEach((t) => { if (!settings.knownTopics.includes(t)) { settings.knownTopics.push(t); if (!settings.topics.includes(t)) settings.topics.push(t); } });
  let session = null;
  let timerId = null;

  function poolFor(s) {
    return allQuestions(s.lesson).filter((q) => s.topics.includes(q.topic) && (q.level === 0 || s.levels.includes(String(q.level))));
  }

  function setupView() {
    clearInterval(timerId);
    session = null;
    const stats = store.get(K_STATS, {});
    const all = allQuestions(true);
    app.innerHTML = "";
    const wrap = el("div", "pr-setup");

    // téma-választó mastery-vel
    const topicBox = el("fieldset", "pr-field");
    topicBox.appendChild(el("legend", "", "Témakörök"));
    const tools = el("div", "pr-inline");
    const bAll = el("button", "btn", "Mind"); const bNone = el("button", "btn", "Egyik sem");
    tools.append(bAll, bNone);
    topicBox.appendChild(tools);
    const tlist = el("div", "pr-topics");
    ORDER.map((t) => [t, TOPICS[t]]).forEach(([t, info]) => {
      const qs = all.filter((q) => q.topic === t);
      const bankN = qs.filter((q) => !q.fromLesson).length;
      const seen = qs.filter((q) => stats[q.id]);
      const good = seen.filter((q) => stats[q.id].last === 1).length;
      const lab = el("label", "pr-topic");
      lab.innerHTML = `<input type="checkbox" value="${t}" ${settings.topics.includes(t) ? "checked" : ""}>
        <span class="pr-topic-name">${t === "mix" ? "✦" : t + "."} ${info.name}</span>
        <span class="pr-topic-meta">${bankN} saját + ${qs.length - bankN} lecke-kérdés · ${seen.length ? `legutóbb jó: ${good}/${seen.length}` : "még nem gyakoroltad"}</span>
        <span class="pr-bar"><span style="width:${pct(good, qs.length)}%"></span></span>`;
      tlist.appendChild(lab);
    });
    topicBox.appendChild(tlist);
    bAll.onclick = () => { tlist.querySelectorAll("input").forEach((i) => (i.checked = true)); sync(); };
    bNone.onclick = () => { tlist.querySelectorAll("input").forEach((i) => (i.checked = false)); sync(); };
    wrap.appendChild(topicBox);

    const opts = el("div", "pr-opts");
    opts.innerHTML = `
      <fieldset class="pr-field"><legend>Nehézség</legend>
        <label><input type="checkbox" name="lv" value="1" ${settings.levels.includes("1") ? "checked" : ""}> fogalom</label>
        <label><input type="checkbox" name="lv" value="2" ${settings.levels.includes("2") ? "checked" : ""}> alkalmazás, számolás</label>
        <label><input type="checkbox" name="lv" value="3" ${settings.levels.includes("3") ? "checked" : ""}> értelmezés, csapdák</label>
      </fieldset>
      <fieldset class="pr-field"><legend>Kérdések száma</legend>
        ${["10", "20", "30", "50", "all"].map((c) => `<label><input type="radio" name="cnt" value="${c}" ${settings.count === c ? "checked" : ""}> ${c === "all" ? "mind" : c}</label>`).join("")}
      </fieldset>
      <fieldset class="pr-field"><legend>Mód</legend>
        <label><input type="radio" name="mode" value="practice" ${settings.mode === "practice" ? "checked" : ""}> <strong>Gyakorló</strong> – azonnali visszajelzés, tipp, magyarázat</label>
        <label><input type="radio" name="mode" value="exam" ${settings.mode === "exam" ? "checked" : ""}> <strong>Vizsga</strong> – visszajelzés csak a beadás után</label>
        <label class="pr-sub"><input type="checkbox" name="timer" ${settings.timer ? "checked" : ""}> időkorlát vizsga módban (1,5 perc / kérdés)</label>
      </fieldset>
      <fieldset class="pr-field"><legend>Kérdésválogatás</legend>
        <label><input type="checkbox" name="lesson" ${settings.lesson ? "checked" : ""}> a leckék kvízkérdései is (ezeket a leckékben már láthattad)</label>
        <label><input type="checkbox" name="weak" ${settings.weak ? "checked" : ""}> <strong>gyenge pontok előre</strong>: a legutóbb elrontott és a még nem látott kérdések kerülnek előre</label>
      </fieldset>`;
    wrap.appendChild(opts);

    const startRow = el("div", "pr-start");
    const info = el("span", "pr-poolinfo");
    const bStart = el("button", "btn primary pr-big", "Indítás ▶");
    startRow.append(bStart, info);
    wrap.appendChild(startRow);

    // előzmények
    const hist = store.get(K_HIST, []);
    const histBox = el("details", "pr-hist");
    histBox.appendChild(el("summary", "", `Előzmények és statisztika (${hist.length} gyakorlás)`));
    if (hist.length) {
      const t = el("div", "table-wrap");
      t.innerHTML = `<table><tr><th>Időpont</th><th>Mód</th><th class="num">Eredmény</th></tr>${hist.slice().reverse().map((h) =>
        `<tr><td>${new Date(h.t).toLocaleString("hu-HU")}</td><td>${h.mode === "exam" ? "vizsga" : "gyakorló"}</td><td class="num">${h.ok} / ${h.n} (${pct(h.ok, h.n)}%)</td></tr>`).join("")}</table>`;
      histBox.appendChild(t);
    } else histBox.appendChild(el("p", "", "Még nincs befejezett gyakorlásod."));
    const bReset = el("button", "btn", "Statisztika és előzmények törlése");
    bReset.onclick = () => {
      if (!confirm("Biztosan törlöd a kérdésstatisztikát és az előzményeket?")) return;
      store.set(K_STATS, {}); store.set(K_HIST, []); setupView();
    };
    histBox.appendChild(bReset);
    wrap.appendChild(histBox);
    app.appendChild(wrap);

    function read() {
      return {
        topics: [...tlist.querySelectorAll("input:checked")].map((i) => i.value),
        levels: [...opts.querySelectorAll("input[name=lv]:checked")].map((i) => i.value),
        count: opts.querySelector("input[name=cnt]:checked").value,
        mode: opts.querySelector("input[name=mode]:checked").value,
        timer: opts.querySelector("input[name=timer]").checked,
        lesson: opts.querySelector("input[name=lesson]").checked,
        weak: opts.querySelector("input[name=weak]").checked
      };
    }
    function sync() {
      const s = read();
      const n = poolFor(s).length;
      const take = s.count === "all" ? n : Math.min(n, +s.count);
      info.textContent = n ? `${n} kérdés felel meg a szűrésnek → ${take} kérdés lesz a sorban` : "Nincs a szűrésnek megfelelő kérdés.";
      bStart.disabled = !n;
    }
    wrap.addEventListener("change", sync);
    sync();
    bStart.onclick = () => {
      settings = Object.assign(read(), { knownTopics: ORDER.slice() });
      store.set(K_SET, settings);
      let pool = poolFor(settings);
      if (settings.weak) {
        const st = store.get(K_STATS, {});
        pool = shuffled(pool).sort((a, b) => weakness(b, st) - weakness(a, st));
      } else pool = shuffled(pool);
      const take = settings.count === "all" ? pool.length : Math.min(pool.length, +settings.count);
      startSession(pool.slice(0, take), settings.mode, settings.mode === "exam" && settings.timer);
    };
    math(wrap);
  }

  function startSession(questions, mode, timed) {
    session = {
      mode, i: 0, timed,
      items: questions.map((q, k) => ({ q, view: null, done: false, ok: null, flag: false, hintUsed: false, uid: "pq" + k })),
      deadline: timed ? Date.now() + questions.length * 90 * 1000 : null
    };
    clearInterval(timerId);
    if (timed) timerId = setInterval(tick, 1000);
    questionView();
  }

  function tick() {
    if (!session || !session.deadline) return;
    const left = Math.max(0, session.deadline - Date.now());
    const t = $("#pr-timer");
    if (t) {
      const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
      t.textContent = `⏱ ${m}:${String(s).padStart(2, "0")}`;
      t.classList.toggle("low", left < 60000);
    }
    if (left === 0) { clearInterval(timerId); finish(); }
  }

  function questionView() {
    const S = session, it = S.items[S.i], q = it.q;
    if (!it.view) it.view = renderQuestion(q, it.uid);
    app.innerHTML = "";
    const card = el("div", "pr-card");

    const head = el("div", "pr-head");
    const doneN = S.items.filter((x) => (S.mode === "exam" ? x.view && x.view.answered() : x.done)).length;
    head.innerHTML = `<span class="pr-count">${S.i + 1} / ${S.items.length}</span>
      <span class="pr-chip">${q.topic === "mix" ? "Vegyes" : q.topic + ". " + TOPICS[q.topic].name}</span>
      <span class="pr-chip lv${q.level}">${LEVELS[q.level]}</span>
      <span class="spacer"></span>${S.timed ? '<span id="pr-timer" class="pr-timer"></span>' : ""}`;
    const bFlag = el("button", "btn pr-flag" + (it.flag ? " on" : ""), it.flag ? "★ megjelölve" : "☆ megjelölés");
    bFlag.title = "Megjelölés későbbi átnézésre";
    bFlag.onclick = () => { it.flag = !it.flag; bFlag.className = "btn pr-flag" + (it.flag ? " on" : ""); bFlag.textContent = it.flag ? "★ megjelölve" : "☆ megjelölés";
      const dot = app.querySelectorAll(".pr-dot")[S.i]; if (dot) dot.classList.toggle("flag", it.flag); };
    head.appendChild(bFlag);
    card.appendChild(head);
    const prog = el("div", "pr-progress"); prog.innerHTML = `<span style="width:${pct(doneN, S.items.length)}%"></span>`;
    card.appendChild(prog);

    const qtag = q.type === "multi" ? "több helyes válasz" : q.type === "match" ? "párosítás" : "egy helyes válasz";
    card.appendChild(el("div", "pr-qtag", qtag));
    card.appendChild(it.view.el);
    const feedback = el("div", "pr-feedback");
    card.appendChild(feedback);

    const actions = el("div", "pr-actions");
    const bPrev = el("button", "btn", "← Előző");
    bPrev.disabled = S.i === 0;
    bPrev.onclick = () => { S.i--; questionView(); };
    actions.appendChild(bPrev);

    if (S.mode === "practice") {
      const bHint = el("button", "btn", "💡 Tipp");
      bHint.disabled = it.done || !q.hint;
      bHint.onclick = () => {
        if (it.hintShown) return;
        it.hintShown = true; it.hintUsed = true;
        const h = el("div", "hint", "💡 " + q.hint); feedback.prepend(h); math(h);
      };
      const bCheck = el("button", "btn primary", "Ellenőrzés");
      const bNext = el("button", "btn primary", S.i === S.items.length - 1 ? "Eredmény →" : "Tovább →");
      bCheck.onclick = () => {
        if (!it.view.answered()) { flash(feedback, "Előbb válaszolj."); return; }
        it.ok = it.view.grade(); it.done = true;
        record(q, it.ok);
        showFeedback(feedback, it);
        bCheck.replaceWith(bNext); bHint.disabled = true; bNext.focus();
      };
      bNext.onclick = () => { if (S.i < S.items.length - 1) { S.i++; questionView(); } else finish(); };
      actions.append(bHint, it.done ? bNext : bCheck);
      if (it.done) showFeedback(feedback, it);
    } else {
      const bNext = el("button", "btn primary", "Tovább →");
      bNext.disabled = S.i === S.items.length - 1;
      bNext.onclick = () => { S.i++; questionView(); };
      const bSubmit = el("button", "btn pr-submit", "Beadás");
      bSubmit.onclick = () => {
        const missing = S.items.filter((x) => !(x.view && x.view.answered())).length;
        if (missing && !confirm(`${missing} kérdés megválaszolatlan. Beadod így is?`)) return;
        finish();
      };
      actions.append(bNext, bSubmit);
    }
    const bQuit = el("button", "btn pr-quit", "Kilépés");
    bQuit.onclick = () => { if (confirm("Kilépsz? Az eddigi válaszok a statisztikában maradnak, de ez a gyakorlás nem kerül az előzményekbe.")) setupView(); };
    actions.appendChild(bQuit);
    card.appendChild(actions);

    // kérdéstérkép
    const pal = el("div", "pr-palette");
    S.items.forEach((x, k) => {
      const b = el("button", "pr-dot", String(k + 1));
      if (k === S.i) b.classList.add("cur");
      if (S.mode === "practice" && x.done) b.classList.add(x.ok ? "ok" : "bad");
      if (S.mode === "exam" && x.view && x.view.answered()) b.classList.add("ans");
      if (x.flag) b.classList.add("flag");
      b.onclick = () => { S.i = k; questionView(); };
      pal.appendChild(b);
    });
    card.appendChild(pal);
    app.appendChild(card);
    math(card);
    if (S.timed) tick();
    card.addEventListener("change", () => {
      if (S.mode === "exam") {
        const d = pal.children[S.i]; if (it.view.answered()) d.classList.add("ans");
        const n = S.items.filter((x) => x.view && x.view.answered()).length;
        prog.firstChild.style.width = pct(n, S.items.length) + "%";
      }
    });
    window.scrollTo({ top: app.offsetTop - 60, behavior: "smooth" });
  }

  function flash(box, msg) {
    let w = box.querySelector(".pr-warn");
    if (!w) { w = el("div", "verdict bad pr-warn"); box.appendChild(w); }
    w.textContent = msg;
  }
  function showFeedback(box, it) {
    box.querySelectorAll(".pr-warn").forEach((x) => x.remove());
    if (box.querySelector(".explain")) return;
    if (!it.revealed) { it.view.reveal(); it.revealed = true; }
    box.appendChild(el("div", "verdict " + (it.ok ? "ok" : "bad"), it.ok ? "✔ Helyes!" : "✘ Nem egészen."));
    const ex = el("div", "explain", (it.q.explain || "") + (it.q.ref ? ` <a class="pr-ref" href="${it.q.ref}" target="_blank">📖 Utánanézek a leckében</a>` : ""));
    box.appendChild(ex);
    math(box);
  }

  function finish() {
    clearInterval(timerId);
    const S = session;
    if (S.mode === "exam") S.items.forEach((it) => {
      if (!it.view) it.view = renderQuestion(it.q, it.uid);
      it.done = true;
      it.ok = it.view.answered() ? it.view.grade() : false;
      record(it.q, it.ok);
    });
    const answeredItems = S.items.filter((x) => x.done);
    const ok = answeredItems.filter((x) => x.ok).length;
    const n = S.mode === "exam" ? S.items.length : answeredItems.length;
    const hist = store.get(K_HIST, []);
    hist.push({ t: Date.now(), mode: S.mode, n, ok });
    store.set(K_HIST, hist.slice(-30));
    resultView(ok, n);
  }

  function resultView(ok, n) {
    const S = session;
    app.innerHTML = "";
    const card = el("div", "pr-card");
    const p = pct(ok, n);
    const verdict = p >= 85 ? "Kiváló – ez vizsgára kész." : p >= 70 ? "Jó – a hibásakat nézd át még egyszer." : p >= 50 ? "Közepes – érdemes a gyenge témaköröket újraolvasni." : "Még gyakorolni kell – kezdd a leckék gyakorló blokkjaival.";
    card.innerHTML = `<div class="pr-score"><div class="pr-ring" style="--p:${p}"><span>${p}%</span></div>
      <div><h2 style="margin:0;border:0;padding:0">${ok} / ${n} helyes</h2><p style="margin:.3em 0 0">${verdict}</p></div></div>`;

    // témakörönként
    const byTopic = {};
    S.items.filter((x) => x.done).forEach((x) => {
      const b = byTopic[x.q.topic] || (byTopic[x.q.topic] = { n: 0, ok: 0 });
      b.n++; if (x.ok) b.ok++;
    });
    const tt = el("div", "table-wrap");
    tt.innerHTML = `<table class="pr-topic-table"><tr><th>Témakör</th><th class="num">Helyes</th><th></th></tr>${ORDER.filter((t) => byTopic[t]).map((t) =>
      `<tr><td><a href="${TOPICS[t].file}">${t === "mix" ? "Vegyes" : t + ". " + TOPICS[t].name}</a></td><td class="num">${byTopic[t].ok} / ${byTopic[t].n}</td>
       <td style="width:40%"><span class="pr-bar ${pct(byTopic[t].ok, byTopic[t].n) < 60 ? "weak" : ""}"><span style="width:${pct(byTopic[t].ok, byTopic[t].n)}%"></span></span></td></tr>`).join("")}</table>`;
    card.appendChild(el("h3", "", "Témakörönként"));
    card.appendChild(tt);

    const wrong = S.items.filter((x) => x.done && !x.ok);
    const flagged = S.items.filter((x) => x.flag);
    const acts = el("div", "pr-actions");
    const bWrong = el("button", "btn primary", `Csak a hibásak újra (${wrong.length})`);
    bWrong.disabled = !wrong.length;
    bWrong.onclick = () => startSession(shuffled(wrong.map((x) => x.q)), S.mode, false);
    const bFlag = el("button", "btn", `Megjelöltek újra (${flagged.length})`);
    bFlag.disabled = !flagged.length;
    bFlag.onclick = () => startSession(flagged.map((x) => x.q), S.mode, false);
    const bNew = el("button", "btn", "Új gyakorlás");
    bNew.onclick = setupView;
    acts.append(bWrong, bFlag, bNew);
    card.appendChild(acts);

    // átnézés
    card.appendChild(el("h3", "", "Átnézés"));
    const filt = el("div", "pr-inline");
    filt.innerHTML = `<label><input type="radio" name="rv" value="wrong" checked> csak a hibásak</label> <label><input type="radio" name="rv" value="all"> mind</label>`;
    card.appendChild(filt);
    const list = el("div", "pr-review");
    card.appendChild(list);
    function fill(onlyWrong) {
      list.innerHTML = "";
      S.items.forEach((x, k) => {
        if (onlyWrong && x.ok) return;
        const d = el("details", "pr-rev " + (x.ok ? "ok" : "bad"));
        const plain = el("span", "", x.q.q).textContent;
        d.appendChild(el("summary", "", `<span class="pr-mark">${x.ok ? "✔" : "✘"}</span> ${k + 1}. ${plain.length > 140 ? plain.slice(0, 140) + "…" : plain}`));
        const inner = el("div", "pr-rev-body");
        inner.appendChild(el("div", "q-text", x.q.q));
        const answered = x.view && x.view.answered();
        inner.appendChild(el("p", "", `<strong>A te válaszod:</strong> ${answered ? x.view.summary() : "<em>nem válaszoltál</em>"}`));
        if (!x.ok) inner.appendChild(el("p", "", `<strong>Helyes válasz:</strong> ${x.view ? x.view.correctText() : ""}`));
        inner.appendChild(el("div", "explain", (x.q.explain || "") + (x.q.ref ? ` <a class="pr-ref" href="${x.q.ref}" target="_blank">📖 Utánanézek a leckében</a>` : "")));
        d.appendChild(inner);
        d.addEventListener("toggle", () => { if (d.open && !d.dataset.m) { d.dataset.m = 1; math(d); } });
        list.appendChild(d);
      });
      if (!list.children.length) list.appendChild(el("p", "", "Nincs hibás válasz. 🎉"));
      math(list.querySelectorAll("summary").length ? list : list);
    }
    filt.addEventListener("change", () => fill(filt.querySelector("input:checked").value === "wrong"));
    fill(true);
    app.appendChild(card);
    math(card);
    window.scrollTo({ top: app.offsetTop - 60, behavior: "smooth" });
  }

  // billentyűk: 1–9 opció, Enter = ellenőrzés / tovább
  document.addEventListener("keydown", (e) => {
    if (!session || !app.querySelector(".pr-card .pr-q")) return;
    if (["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName) && e.key === "Enter") document.activeElement.blur();
    const it = session.items[session.i];
    if (/^[1-9]$/.test(e.key) && it.view && !it.done) {
      it.view.pick(+e.key - 1);
      app.querySelector(".pr-card").dispatchEvent(new Event("change"));
    } else if (e.key === "Enter") {
      const btn = [...app.querySelectorAll(".pr-actions .btn.primary")].find((b) => !b.disabled);
      if (btn) { e.preventDefault(); btn.click(); }
    }
  });

  window.addEventListener("beforeunload", (e) => {
    if (session && session.items.some((x) => x.view && x.view.answered()) && app.querySelector(".pr-q")) { e.preventDefault(); e.returnValue = ""; }
  });

  window.initPractice = setupView;
})();
