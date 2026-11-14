/* Vizsgagyakorló kérdésbank – 5. lecke: Döntési fa és az osztályozás mérőszámai */

BANK.push(
  {
    id: "b05-001",
    topic: "05",
    level: 1,
    ref: "05-dontesi-fa.html#lepes1",
    type: "single",
    q: "Mi különbözteti meg a felügyelt tanulást (pl. osztályozás) a nem felügyelttől (pl. klaszterezés)?",
    options: [
      "Klaszterezésnél is van célváltozó, csak azt a modell nem használja",
      "Felügyelt tanulásnál a tanítópéldák helyes kimenete (címkéje, y) ismert, így a jóslat összevethető a valósággal",
      "Felügyelt tanulásnál egy ember minden egyes jóslatot kézzel jóváhagy",
      "Felügyelt tanulásnál csak numerikus bemenet lehet, nem felügyeltnél kategorikus is"
    ],
    answer: 1,
    hint: "Mi volt ott a gyakorlat adatában (passed), ami a vásárlói adatban nem volt?",
    explain: "Felügyelt tanulásnál minden tanítópéldához ismert a célváltozó (itt a <code>passed</code>), a modell ebből tanul, és az értékelésnél a jóslatot a valódi címkével vetjük össze. Klaszterezésnél nincs ilyen helyes válasz (ott csak a sziluettmutató volt). A „felügyelet” nem emberi jóváhagyás, hanem a címke jelenléte; a bemenet típusa pedig egyik esetben sem dönt."
  },
  {
    id: "b05-002",
    topic: "05",
    level: 3,
    ref: "05-dontesi-fa.html#lepes1",
    type: "multi",
    q: "Egy előfizetéses szolgáltató azt akarja jósolni, hogy egy ügyfél a következő hónapban lemond-e (<code>lemond</code> = yes/no). Melyik oszlopot <b>nem</b> szabad bemenetként használni?",
    options: [
      "<code>ugyfel_azonosito</code>",
      "<code>havi_dij</code>",
      "<code>belepesek_utolso_30_nap</code>",
      "<code>lemondas_oka</code> (csak a lemondott ügyfeleknél van kitöltve)",
      "<code>visszateritett_osszeg</code> (a lemondáskor kifizetett összeg)",
      "<code>elofizetes_hossza_honap</code>"
    ],
    answer: [0, 3, 4],
    hint: "Két kérdés oszloponként: van-e magyarázó ereje, és ismert-e már a jóslás pillanatában (vagy a célváltozóból következik)?",
    explain: "Az azonosító nem hordoz információt az ügyfél viselkedéséről (mint a <code>student_id</code>). A <code>lemondas_oka</code> és a <code>visszateritett_osszeg</code> csak lemondás után keletkezik: kitöltöttségük maga a célváltozó – ez adatszivárgás, gyanúsan jó, élesben használhatatlan modellt adna (mint az <code>exam_score</code>). A díj, a belépések és az előfizetés hossza a jóslás előtt ismert jellemzők."
  },
  {
    id: "b05-003",
    topic: "05",
    level: 1,
    ref: "05-dontesi-fa.html#lepes2",
    type: "single",
    q: "Melyik állítás igaz a <code>programme</code> oszlop one-hot kódolásával kapott tábla egy sorára?",
    options: [
      "Több 1-es is lehet benne, mint a kosármátrixban",
      "Az értéke 1, 2 vagy 3 attól függően, melyik szak",
      "Pontosan egy oszlopban áll 1-es (a hallgató szakjánál), a többiben 0",
      "Az összes oszlop 0, ha a hallgató a leggyakoribb szakra jár"
    ],
    answer: 2,
    hint: "Egy hallgató egyszerre hány szakra jár az adatban?",
    explain: "One-hot kódolásnál minden kategória kap egy 0/1 oszlopot, és egy eredeti értékből pontosan egy 1-es lesz. A kosármátrixban azért lehetett több 1-es, mert egy kosárban több termék is van – ezt a különbséget az oktató is kiemelte. Az 1, 2, 3 sorszámos kódolás kitalált sorrendet vinne be."
  },
  {
    id: "b05-004",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#lepes2",
    type: "single",
    q: "Egy 160 soros adatban 48 „no” és 112 „yes” címke van. <code>train_test_split(X, y, test_size=0.25, stratify=y)</code>. Mekkora a teszthalmaz, és hány „no” kerül bele?",
    options: [
      "40 sor, ebből 20 no",
      "120 sor, ebből 36 no",
      "40 sor, ebből 10 no",
      "40 sor, ebből 12 no"
    ],
    answer: 3,
    hint: "A teszt a sorok negyede; a rétegzés az eredeti no-arányt (48/160) viszi át a tesztre.",
    explain: R`Teszt: $0{,}25\cdot160=40$ sor; a no aránya $48/160=30\%$, tehát $40\cdot0{,}3=12$ no (és 28 yes). A „20 no” azt hiszi, hogy a rétegzés 50–50%-ra egyenlít ki; a „120 sor, 36 no” a tanítóhalmaz; a „10 no” a 25%-ot a no-k arányának nézi.`
  },
  {
    id: "b05-005",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#alkalmazas",
    type: "single",
    q: "Egy <code>X</code> táblában 3 numerikus oszlop van, valamint a <code>programme</code> (5 különböző szak) és a <code>gender</code> (2 érték) szöveges oszlop. Hány oszlopa lesz ennek az eredménynek?<pre><code>pd.get_dummies(X, columns=[\"programme\", \"gender\"], dtype=int)</code></pre>",
    options: ["5", "10", "12", "8"],
    answer: 1,
    hint: "A kódolt szöveges oszlop helyére kategóriánként egy 0/1 oszlop kerül; a numerikusak maradnak.",
    explain: R`$3+5+2=10$: a két szöveges oszlop eltűnik, helyettük 5 + 2 dummy jön. Az 5 azt feltételezi, hogy a szöveges oszlopok egy-egy számmá alakulnak; a 12 bent hagyja az eredeti két oszlopot is; a 8 kategóriánként eggyel kevesebb dummyval számol (az a <code>drop_first=True</code> lenne, amit a gyakorlaton nem használtunk – ott a 3 szakból 3 oszlop lett).`
  },
  {
    id: "b05-006",
    topic: "05",
    level: 1,
    ref: "05-dontesi-fa.html#lepes2",
    type: "multi",
    q: "Melyik állítás igaz a gyakorlat előkészítési lépéseire?",
    options: [
      "A <code>random_state=42</code> azt biztosítja, hogy a véletlen felosztás minden futtatáskor ugyanaz legyen",
      "A <code>stratify=y</code> mellett a tanító- és a teszthalmazban is közel az eredeti a yes/no arány",
      "A döntési fa előtt a numerikus változókat standardizálni kell, mert a fa érzékeny a skálára",
      "A <code>random_state</code> megkeresi a legjobb teszteredményt adó felosztást",
      "A felosztás a tanítás előtt történik, és a fa csak a tanítóhalmazon illeszkedik"
    ],
    answer: [0, 1, 4],
    hint: "Mit csinál a fa egy változóval: távolságot számol, vagy küszöböt keres?",
    explain: "A <code>random_state</code> csak a reprodukálhatóságot adja (nem optimalizál semmit), a rétegzés az osztályarányt őrzi meg, a tanulás pedig csak a tanítóhalmazon történik. Standardizálás a fához nem kell: a fa egy-egy változón küszöböt keres, ezen a skála nem változtat (szemben a K-means távolságaival)."
  },
  {
    id: "b05-007",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#lepes3",
    type: "single",
    q: "Egy csomópontban 3 no és 6 yes hallgató van. Mennyi a Gini-index?",
    options: ["≈ 0,556", "≈ 0,333", "≈ 0,444", "≈ 0,918"],
    answer: 2,
    hint: R`Arányokkal számolj: $p_{\text{no}}=3/9$, $p_{\text{yes}}=6/9$.`,
    explain: R`$\text{Gini}=1-\left(\left(\tfrac39\right)^2+\left(\tfrac69\right)^2\right)=1-\tfrac{1+4}{9}=\tfrac49\approx0{,}444$. A 0,556 a $\sum p_i^2$ (elmaradt a kivonás $1$-ből), a 0,333 csak a kisebbség aránya, a 0,918 az entrópia.`
  },
  {
    id: "b05-008",
    topic: "05",
    level: 3,
    ref: "05-dontesi-fa.html#lepes3",
    type: "single",
    q: "Melyik csomópont a legkevertebb a Gini-index szerint?",
    options: [
      "[5, 5] (két osztály, 50–50%)",
      "[1, 9] (két osztály)",
      "[3, 3, 3] (három osztály)",
      "[2, 2, 1] (három osztály)"
    ],
    answer: 2,
    hint: R`A 0,5 csak két osztálynál a maximum. Számold ki mindegyikre $1-\sum p_i^2$-t.`,
    explain: R`Gini: [5, 5] → 0,5; [1, 9] → 0,18; [3, 3, 3] → $1-3\cdot\tfrac19=\tfrac23\approx0{,}667$; [2, 2, 1] → $1-(0{,}16+0{,}16+0{,}04)=0{,}64$. A tipikus hiba az [5, 5] választása, mert „a 0,5 a maximum” – de ez csak két osztályra igaz; három osztálynál a felső korlát $2/3$, és egy nem is egyenletes háromosztályos csomópont is meghaladhatja a 0,5-öt.`
  },
  {
    id: "b05-009",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#lepes4",
    type: "single",
    q: "Egy csomópontban a tanulási órák értékei: 1, 1, 3, 6, 6, 10. Mely küszöböket vizsgálja a fa ezen a változón?",
    options: [
      "1; 2; 4,5; 6; 8",
      "2; 4,5; 8",
      "4,5",
      "1; 3; 6; 10"
    ],
    answer: 1,
    hint: "Az azonos értékek között nincs mit elvágni. Előbb a különböző értékeket rendezd sorba!",
    explain: R`Különböző értékek: 1, 3, 6, 10 → a szomszédos párok felezőpontjai $2$; $4{,}5$; $8$ (4 különböző értékhez $4-1=3$ jelölt). Az „1; 2; 4,5; 6; 8” a hat számot ismétlésekkel együtt párosítja – az 1 és a 6 küszöb ugyanazt a felosztást adná, mint a 2 és a 4,5/8. A 4,5 az összes érték átlaga, a „1; 3; 6; 10” maguk az értékek.`
  },
  {
    id: "b05-010",
    topic: "05",
    level: 3,
    ref: "05-dontesi-fa.html#lepes4",
    type: "single",
    q: "Szülő: [20 no, 20 yes]. Két jelölt vágás:<br>A: bal [2, 0], jobb [18, 20]<br>B: bal [15, 5], jobb [5, 15]<br>Melyiket választja a fa (Gini), és miért?",
    options: [
      "A-t, mert az egyik gyereke tiszta, és a két gyerek Ginijének átlaga (≈ 0,249) a kisebb",
      "B-t, mert a súlyozott Ginije (0,375) kisebb, mint az A-é (≈ 0,474)",
      "A-t, mert a súlyozott Ginije (≈ 0,474) a nagyobb",
      "Egyiket sem, mert egyik sem csökkenti a szülő Ginijét"
    ],
    answer: 1,
    hint: R`Súlyozz a gyerekek elemszámával: $\tfrac{|D_b|}{|D|}I(D_b)+\tfrac{|D_j|}{|D|}I(D_j)$. Az A bal gyereke mindössze 2 elemű.`,
    explain: R`A: $\tfrac{2}{40}\cdot0+\tfrac{38}{40}\cdot\text{Gini}([18,20])=0{,}95\cdot0{,}499\approx0{,}474$. B: mindkét gyerek Ginije $1-(0{,}75^2+0{,}25^2)=0{,}375$, súlyozva is 0,375. A kisebb súlyozott kevertség nyer: B. A súlyozás nélküli átlag (0,249) az A-t hozná ki, mert egy 2 elemű tiszta levelet ugyanannyira számol, mint a 38 elemű, szinte teljesen kevert másikat. A nagyobb súlyozott Gini rosszabb, nem jobb; és mindkét vágás csökkent (0,5 alá).`
  },
  {
    id: "b05-011",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#lepes4",
    type: "single",
    q: "Szülő: [5 no, 5 yes] (10 hallgató). Egy vágás után: bal [5 no, 1 yes], jobb [0 no, 4 yes]. Mennyi az információnyereség (entrópiával)?",
    options: ["≈ 0,390", "≈ 0,675", "≈ 0,610", "≈ 0,350"],
    answer: 2,
    hint: R`Szülő: $H=1$. Bal: $H(5/6;\,1/6)\approx0{,}650$, jobb: tiszta. Súlyozz $6/10$ és $4/10$-del, és vond ki a szülőből.`,
    explain: R`Súlyozott entrópia: $\tfrac{6}{10}\cdot0{,}650+\tfrac{4}{10}\cdot0=0{,}390$; nyereség $1-0{,}390=0{,}610$. A 0,390 maga a súlyozott entrópia (elmaradt a kivonás), a 0,675 a súlyozatlan átlaggal ($1-(0{,}650+0)/2$) kapott érték, a 0,350 = $1-0{,}650$ (csak a bal gyerek, súly nélkül).`
  },
  {
    id: "b05-012",
    topic: "05",
    level: 1,
    ref: "05-dontesi-fa.html#lepes4",
    type: "match",
    q: "Párosítsd a fogalmat a meghatározásával!",
    pairs: [
      ["Gini-index", R`$1-\sum p_i^2$`],
      ["Entrópia", R`$-\sum p_i\log_2 p_i$`],
      ["Nyereség", R`$I(D)-I_{\text{vágás}}$`],
      ["Súlyozott kevertség", R`$\sum_k \tfrac{|D_k|}{|D|}\,I(D_k)$`],
      ["Küszöbjelölt", "két szomszédos (rendezett) érték felezőpontja"]
    ],
    hint: "Melyik méri egy csomópontot, melyik egy vágást, és melyik a kettő különbsége?",
    explain: "A Gini és az entrópia egyetlen csomópont kevertsége. A súlyozott kevertség egy vágás gyerekeinek elemszámmal súlyozott átlaga; a nyereség a szülő kevertségéből ennek levonásával adódik (entrópiával: információnyereség). Numerikus változón a felezőpontok a szóba jöhető küszöbök."
  },
  {
    id: "b05-013",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#lepes5",
    type: "single",
    q: "A gyakorlat fája szerint mit jósol egy hallgatóra, akinek <code>previous_gpa</code> = 2,5, Mechanical Engineering szakos, és <code>attendance</code> = 65?",
    options: [
      "no – a [4, 3] levél alapján",
      "no – a [6, 0] levél alapján",
      "yes – a [10, 19] levél alapján",
      "yes – az [1, 4] levél alapján"
    ],
    answer: 3,
    hint: "2,5 ≤ 2,895? A gépész szakos hallgató <code>programme_Computer Science</code> dummyja 0 vagy 1? 65 ≤ 69,7?",
    explain: "2,5 ≤ 2,895 → bal ág; nem CS-es (dummy 0 ≤ 0,5) → bal; 65 ≤ 69,7 → bal: a bal szélső levél [1, 4], többség yes. A [4, 3] levélbe 69,7 fölötti jelenléttel jutna; a [6, 0] a CS-es ág levele; a [10, 19] a 2,895 fölötti ágon van."
  },
  {
    id: "b05-014",
    topic: "05",
    level: 1,
    ref: "05-dontesi-fa.html#lepes5",
    type: "multi",
    q: "Melyik állítás igaz a döntési fa tanító algoritmusára (és az sklearn fájára)?",
    options: [
      "Garantálja a globálisan legjobb (legkisebb hibájú) fát",
      "Mohó: minden csomópontban csak az adott lépés legjobb vágását választja, nem tervez előre",
      "Egy változó egy gyökér–levél úton legfeljebb egyszer szerepelhet",
      "Rekurzív: a két gyerekcsomópontra ugyanaz az eljárás hívódik meg újra",
      "A fa bal ága az, ahol a feltétel (≤) hamis",
      "Egy levél címkéje a benne lévő tanítópéldák többségi osztálya"
    ],
    answer: [1, 3, 5],
    hint: "Nézd meg a gyakorlat fáját: hányszor szerepel a <code>previous_gpa</code> a jobb oldali ágon?",
    explain: "A fa mohón és rekurzívan épül, a levél címkéje a többségi osztály. A mohóság gyors, de épp ezért nem garantál globálisan legjobb fát. Egy változó többször is szerepelhet (a gyakorlat jobb ágán previous_gpa ≤ 2,895, majd ≤ 3,835). A bal ág mindig az „igaz” (≤) ág."
  },
  {
    id: "b05-015",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#lepes6",
    type: "single",
    q: "sklearn konfúziós mátrix (sor = valódi, oszlop = jósolt, sorrend: no, yes): [[30, 10], [5, 55]]. Pozitív osztály: yes. Mennyi a precision?",
    options: ["≈ 0,917", "0,850", "≈ 0,857", "≈ 0,846"],
    answer: 3,
    hint: "Keresd meg a jósolt yes oszlopot: abból mennyi a valódi yes?",
    explain: R`TP = 55 (jobb alsó), FP = 10 (jobb felső: valódi no, jósolt yes), FN = 5. Precision $=\tfrac{55}{55+10}\approx0{,}846$. A 0,917 a recall ($55/60$, sor és oszlop felcserélése), a 0,850 az accuracy ($85/100$), a 0,857 a „no” osztály precisionje ($30/35$ – a bal felső cellát nézte TP-nek).`
  },
  {
    id: "b05-016",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#lepes6",
    type: "single",
    q: "Egy modell precisionje 0,6, recallja 0,9. Mennyi az F1?",
    options: ["0,75", "0,54", "0,72", "0,60"],
    answer: 2,
    hint: "Harmonikus átlag: kétszer a szorzat osztva az összeggel.",
    explain: R`$F_1=\tfrac{2\cdot0{,}6\cdot0{,}9}{0{,}6+0{,}9}=\tfrac{1{,}08}{1{,}5}=0{,}72$. A 0,75 a számtani átlag, a 0,54 a kettő szorzata (elmaradt a $2/(P+R)$), a 0,60 a kisebbik érték. Az F1 a két érték között van, de a kisebbikhez közelebb.`
  },
  {
    id: "b05-017",
    topic: "05",
    level: 1,
    ref: "05-dontesi-fa.html#lepes6",
    type: "match",
    q: "Párosítsd a helyzetet azzal a mérőszámmal, amelyre a legjobban figyelni kell!",
    pairs: [
      ["Spamszűrő: egy fontos levél se kerüljön a spambe (a téves riasztás drága)", "precision"],
      ["Betegségszűrés: egy beteg se maradjon ki (az elszalasztott pozitív drága)", "recall"],
      ["„Az összes jóslat hányad része helyes?”", "accuracy"],
      ["Kiegyensúlyozatlan osztályok, mindkét osztály felismerése egyformán számít", "balanced accuracy"]
    ],
    hint: "Precision: a pozitívnak jósoltak oszlopa (FP a hiba). Recall: a valódi pozitívok sora (FN a hiba).",
    explain: "Ha az FP drága, a precision; ha az FN drága, a recall a fontos. Az accuracy az összes helyes arány. A balanced accuracy az osztályonkénti recallok átlaga, így a kis osztály is egyforma súllyal számít – kiegyensúlyozatlan adatnál becsületesebb az accuracy-nél."
  },
  {
    id: "b05-018",
    topic: "05",
    level: 3,
    ref: "05-dontesi-fa.html#lepes6",
    type: "multi",
    q: "<code>confusion_matrix(y_test, y_pred)</code>, az osztályok: no, yes. Melyik állítás igaz?",
    options: [
      "A recall a „jósolt pozitív” oszlopból számolódik",
      "A sorok a valódi, az oszlopok a jósolt osztályok",
      "Pozitív = yes esetén a TP a jobb alsó cella",
      "Ha a pozitív osztályt megcseréljük, a precision sem változik",
      "Ha a pozitív osztályt no-ra cseréljük, az accuracy nem változik",
      "A TP mindig a bal felső cella, ahogy a tankönyvekben"
    ],
    answer: [1, 2, 4],
    hint: "Az sklearn ábécérendben rakja sorba az osztályokat. Melyik mérőszám nem függ attól, melyik osztályt hívjuk pozitívnak?",
    explain: "Sor = valódi, oszlop = jósolt; ábécérendben a no az első, így a yes–yes cella (TP) jobb alul van – a feliratok alapján olvass, ne a pozíció alapján. Az accuracy a főátló összege osztva az összessel, ez független a pozitív osztály választásától; a precision, recall, F1 viszont megváltozik (a gyakorlat fájánál yes-re 0,810, no-ra 0,5). A recall a valódi pozitívok sorából jön, nem oszlopból."
  },
  {
    id: "b05-019",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#lepes7",
    type: "single",
    q: "A tanítóhalmazban 70 yes és 30 no van. A teszthalmazban 26 yes és 14 no. Mennyi a többségi alapmodell teszt-accuracy-je?",
    options: ["0,700", "0,650", "0,350", "0,500"],
    answer: 1,
    hint: "Mit jósol mindenkire, és ez a teszten hány esetben talál?",
    explain: R`A tanítóhalmaz többsége yes, ezért a teszten is mindenkire yes-t mond: $26/40=0{,}65$. A 0,70 a tanítóhalmaz aránya (nem a teszten mért pontosság), a 0,35 a no-k aránya a teszten (mintha mindenkire no-t mondana), a 0,5 a balanced accuracy-je – az nem accuracy.`
  },
  {
    id: "b05-020",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#lepes7",
    type: "single",
    q: "Egy modell a teszten: TP = 40, FN = 10, TN = 6, FP = 4. Mennyi a balanced accuracy?",
    options: ["≈ 0,767", "0,700", "0,800", "≈ 0,909"],
    answer: 1,
    hint: R`A pozitív osztály recallja $\tfrac{TP}{TP+FN}$, a negatívé $\tfrac{TN}{TN+FP}$ – ezek átlaga.`,
    explain: R`$\tfrac12\left(\tfrac{40}{50}+\tfrac{6}{10}\right)=\tfrac12(0{,}8+0{,}6)=0{,}70$. A 0,767 az accuracy ($46/60$) – a nagy pozitív osztály felhúzza; a 0,8 csak a pozitív recall, a 0,909 a precision ($40/44$).`
  },
  {
    id: "b05-021",
    topic: "05",
    level: 3,
    ref: "05-dontesi-fa.html#lepes7",
    type: "multi",
    q: "A gyakorlat eredményei: döntési fa – accuracy 0,724, balanced 0,655, F1 (yes) 0,810; többségi alapmodell – accuracy 0,724, balanced 0,500, F1 (yes) 0,840. Melyik következtetés helyes?",
    options: [
      "A fa semmit sem tanult, hiszen az accuracy-je pontosan az alapmodellé",
      "Accuracy alapján a fa semmit sem javított az alapmodellhez képest",
      "Az alapmodell precisionje (yes) 1,0, hiszen minden átmenőt megtalált",
      "A 8 bukott teszthallgatóból a fa 4-et felismer, az alapmodell egyet sem",
      "Yes-re nézve az alapmodell F1-e nagyobb, mert recallja 1, és a precisionje is 0,724"
    ],
    answer: [1, 3, 4],
    hint: "Az alapmodell mindenkire yes-t mond. Mit jelent ez a no osztály recalljára, és mit a yes precisionjére?",
    explain: R`Az accuracy azonos, de a fa a bukók felét megtalálja (recall$_{\text{no}}=4/8$), az alapmodell egyet sem – ezt mutatja a balanced accuracy (0,655 vs 0,5). Az alapmodell recallja yes-re 1 (mindenkit yes-nek mond), precisionje $21/29=0{,}724$ (a 8 bukó is a jósolt yes-ek között van), így F1 = 0,84. A „minden átmenőt megtalált” a recall, nem a precision. A fa tehát tud valamit, amit az accuracy elrejt.`
  },
  {
    id: "b05-022",
    topic: "05",
    level: 2,
    ref: "05-dontesi-fa.html#alkalmazas",
    type: "single",
    q: "A kiértékelő szkript a precisiont így számolja: <code>precision_score(y_test, pred, pos_label=\"no\", zero_division=0)</code>. Melyik modellnél lenne itt a precision nevezője 0, azaz mire kell a <code>zero_division=0</code>?",
    options: [
      "A döntési fánál, mert az csak 4 bukót talált meg",
      "A többségi alapmodellnél, mert egyetlen hallgatót sem jósol no-nak (TP + FP = 0)",
      "A többségi alapmodellnél, mert a recall nevezője (TP + FN) 0",
      "Egyiknél sem, a paraméter csak a kimenet formázását állítja"
    ],
    answer: 1,
    hint: R`Precision $=\tfrac{TP}{TP+FP}$: a nevező a pozitívnak (itt: no-nak) jósolt esetek száma.`,
    explain: "Az alapmodell mindenkire yes-t mond, így no-ra nincs egyetlen pozitív jóslata sem: TP + FP = 0, a precision 0/0 lenne. A <code>zero_division=0</code> ilyenkor 0-t ad (és nem dob figyelmeztetést). A recall nevezője a valódi no-k száma (8), az sosem 0; a fa 8 hallgatót jósol no-nak, nála nincs gond."
  },
  {
    id: "b05-023",
    topic: "05",
    level: 1,
    ref: "05-dontesi-fa.html#alkalmazas",
    type: "single",
    q: "Mit ad vissza a gyakorlat kódjában ez a sor?<pre><code>baseline = DummyClassifier(strategy=\"most_frequent\")\nbaseline.fit(np.zeros((len(y_train), 1)), y_train)\nbaseline.predict(np.zeros((len(y_test), 1)))</code></pre>",
    options: [
      "29 darab „yes”-t, mert a tanítóhalmaz leggyakoribb osztálya a yes",
      "A teszthalmaz valódi címkéit, mert a teszten illesztettük",
      "29 darab „no”-t, mert a nullás bemenet a no osztályt jelenti",
      "Egy egyszintű döntési fa jóslatait a csupa nulla oszlopon"
    ],
    answer: 0,
    hint: "A „most_frequent” stratégia egyáltalán nem nézi a bemenetet. Akkor miért lehet bemenetnek egy csupa 0 tömb?",
    explain: "A DummyClassifier csak a tanítócímkékből tanul (60 yes, 25 no → yes), és mindenkire ezt mondja; a csupa 0 bemenet csak azért kell, mert a <code>fit</code>/<code>predict</code> formailag X-et vár. Nem fa (az órán elhangzott, hogy „egy döntési fát tanítunk be” – a kód nem ezt csinálja), és nem a tesztből tanul."
  },
  {
    id: "b05-024",
    topic: "05",
    level: 1,
    ref: "05-dontesi-fa.html#lepes8",
    type: "single",
    q: "A lecke Kiegészítése szerint hogyan kellene helyesen megválasztani a <code>max_depth</code> értékét?",
    options: [
      "Kipróbálni több mélységet, és a legjobb teszt-accuracy-t adót választani, majd azt jelenteni",
      "Mindig korlátlan mélységet használni, mert az a tanítón 100%-os",
      "Keresztvalidációval a tanítóhalmazon (pl. <code>GridSearchCV</code>), a teszthalmazt csak a legvégén, egyszer használva",
      "Mindig <code>max_depth=3</code>, mert az adja a legtöbb (8) levelet"
    ],
    answer: 2,
    hint: "Mi történik a teszthalmaz „sosem látott” szerepével, ha rajta válogatunk?",
    explain: "A hiperparamétert a tanítóhalmazon belül, felváltva validálva (keresztvalidáció) kell választani; a teszthalmaz csak a végső, egyszeri mérésre való. Ha a teszten választunk és ugyanazt jelentjük, az optimista becslés. A korlátlan fa túltanul (tanító 1,000, teszt 0,655); a 3 sem „szent szám”, a mi futtatásunkban a 2-es mélység adta a legjobb tesztet."
  },
  {
    id: "b05-025",
    topic: "05",
    level: 3,
    ref: "05-dontesi-fa.html#lepes8",
    type: "single",
    q: "Mélység 3 mellett két fa, ugyanazon a felosztáson: <code>min_samples_leaf</code> nélkül tanító 0,859 / teszt 0,724; <code>min_samples_leaf=5</code>-tel (a gyakorlat fája) tanító 0,800 / teszt 0,724. Mi a helyes értelmezés?",
    options: [
      "A korlát nélküli fa a jobb, mert a tanítón 0,859-et ér el",
      "A <code>min_samples_leaf=5</code> alultanulást okozott, mert a tanító-accuracy csökkent",
      "A két fa egyforma, a <code>min_samples_leaf</code>-nek nem volt hatása",
      "Azonos teszteredmény mellett a korlátos fánál kisebb a tanító–teszt rés (0,076 vs 0,135): kevésbé magolt be, ezért ezt érdemes választani"
    ],
    answer: 3,
    hint: "A tanító-accuracy növelése nem cél. Mit mutat a tanító és a teszt közötti rés?",
    explain: R`A teszt mindkettőnél 0,724, de a rés $0{,}859-0{,}724=0{,}135$ vs $0{,}800-0{,}724=0{,}076$. A levélméret-korlát megakadályozza az 1–2 hallgatós leveleket, így a fa kevésbé illeszkedik a tanítóadat zajára – ugyanazt a teszteredményt egyszerűbb, általánosabb szabályokkal éri el. Alultanulásról akkor beszélnénk, ha a teszt is romlana; hatása pedig volt, hiszen más vágásokat választott.`
  }
);
