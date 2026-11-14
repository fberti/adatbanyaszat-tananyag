/* 5. lecke – Döntési fa és az osztályozás mérőszámai – kvízek */

QUIZZES["l05-lepes1"] = {
  title: "Mini-kvíz – X, y, adatszivárgás",
  questions: [
    {
      type: "single",
      q: "Miért hagytuk ki az <code>exam_score</code>-t a bemeneti változók közül?",
      options: [
        "Mert a <code>passed</code> ebből készült (≥ 50 → yes), így adatszivárgás lenne",
        "Mert numerikus, a döntési fa pedig csak kategorikus bemenettel működik",
        "Mert nem standardizáltuk, és a fa érzékeny a skálára",
        "Mert túl sok hiányzó érték van benne"
      ],
      answer: 0,
      hint: "Nézd meg az adathalmaz előállítási szabályát a PDF-ben.",
      explain: "A <code>passed</code> közvetlenül az <code>exam_score</code>-ból készült. Bent hagyva a fa egyetlen vágással (exam_score ≤ 50,4) 100%-ot ér el, de semmit nem tanul – ez adatszivárgás. A fa numerikus változókat is kezel (küszöbbel), és standardizálás sem kell neki."
    },
    {
      type: "multi",
      q: "Melyek voltak a gyakorlaton a bemeneti változók (kódolás előtt)?",
      options: ["study_hours", "attendance", "previous_gpa", "assignments_completed", "programme", "student_id", "exam_score"],
      answer: [0, 1, 2, 3, 4],
      hint: "Öt bemenet volt. Melyik kettő esett ki és miért?",
      explain: "A négy numerikus változó és a <code>programme</code> (one-hot kódolva). A <code>student_id</code> azonosító, nincs magyarázó ereje; az <code>exam_score</code> adatszivárgás."
    },
    {
      type: "match",
      q: "Párosítsd a feladatot a típusával!",
      pairs: [
        ["Vásárlók csoportosítása címke nélkül", "Nem felügyelt tanulás (klaszterezés)"],
        ["Átmegy-e a hallgató (yes/no)?", "Felügyelt tanulás – osztályozás"],
        ["A vizsgapontszám (0–100) becslése", "Felügyelt tanulás – regresszió"]
      ],
      hint: "Van-e ismert helyes válasz? Ha van: kategória vagy szám?",
      explain: "Ismert címke nélkül nem felügyelt; ismert kategóriás címkével osztályozás; ismert szám célváltozóval regresszió (ez utóbbi Kiegészítés)."
    },
    {
      type: "single",
      q: "A <code>programme</code> változónak 3 különböző értéke van. Hány oszlop lesz belőle one-hot kódolás után?",
      options: ["3", "1", "2", "8"],
      answer: 0,
      hint: "Kategóriánként egy 0/1 oszlop.",
      explain: "Ahány kategória, annyi 0/1 oszlop: 3. (Az „1” a sorszámos kódolás lenne, ami kitalált sorrendet visz be.)"
    }
  ]
};

QUIZZES["l05-lepes3"] = {
  title: "Mini-kvíz – Gini és entrópia",
  questions: [
    {
      type: "single",
      q: "Egy csomópontban 2 no és 8 yes van. Mennyi a Gini-index?",
      options: ["0,32", "0,68", "0,72", "0,20"],
      answer: 0,
      hint: R`$\text{Gini}=1-\sum p_i^2$, az arányokkal számolj.`,
      explain: R`$1-(0{,}2^2+0{,}8^2)=1-0{,}68=0{,}32$. A 0,68 a $\sum p_i^2$ (elmaradt a kivonás), a 0,72 az entrópia, a 0,20 csak a kisebbség aránya.`
    },
    {
      type: "single",
      q: "Mit jelent, ha egy csomópont Gini-indexe 0?",
      options: [
        "Minden példa ugyanabba az osztályba tartozik (tiszta csomópont)",
        "A két osztály 50–50%-ban van jelen",
        "A csomópont üres",
        "A vágás nem csökkentette a kevertséget"
      ],
      answer: 0,
      hint: "Ha az egyik arány 1, a többi 0, mennyi lesz a négyzetösszeg?",
      explain: R`Ha $p=1$ az egyik osztályra, $1-1^2=0$: tiszta csomópont. Az 50–50% a maximum (két osztálynál 0,5).`
    },
    {
      type: "single",
      q: "Mekkora a Gini-index maximuma három osztály esetén?",
      options: ["0,667", "0,5", "1", "1,585"],
      answer: 0,
      hint: "A maximum egyenletes eloszlásnál van: minden arány 1/3.",
      explain: R`$1-3\cdot(1/3)^2=2/3\approx 0{,}667$. A 0,5 csak két osztálynál a maximum; az 1 és 1,585 az entrópia maximuma két, illetve három osztálynál.`
    },
    {
      type: "single",
      q: "8 példa (3 no, 5 yes) kettévágva: bal [3 no, 1 yes], jobb [0 no, 4 yes]. Mennyi a súlyozott Gini?",
      options: ["0,1875", "0,375", "0,281", "0,469"],
      answer: 0,
      hint: R`$\tfrac{|D_b|}{|D|}\,\text{Gini}(D_b)+\tfrac{|D_j|}{|D|}\,\text{Gini}(D_j)$`,
      explain: R`Bal Gini 0,375, jobb 0. Súlyozott: $\tfrac48\cdot0{,}375+\tfrac48\cdot 0=0{,}1875$. A 0,375 súlyozás nélkül csak a bal gyerek, a 0,281 a nyereség ($0{,}469-0{,}1875$), a 0,469 a szülő Ginije.`
    }
  ]
};

QUIZZES["l05-lepes6"] = {
  title: "Mini-kvíz – Konfúziós mátrix és mérőszámok",
  questions: [
    {
      type: "single",
      q: "TP = 17, FP = 4, FN = 4, TN = 4. Mennyi a precision?",
      options: ["0,810", "0,724", "0,500", "0,586"],
      answer: 0,
      hint: "A pozitívnak jósoltak közül hány valóban pozitív?",
      explain: R`$17/(17+4)=0{,}810$. A 0,724 az accuracy ($21/29$), a 0,5 a „no” osztály precisionje ($4/8$), a 0,586 = $17/29$ (rossz nevező).`
    },
    {
      type: "single",
      q: "sklearn konfúziós mátrix (sor = valódi, oszlop = jósolt, sorrend: no, yes): [[50, 10], [20, 20]]. Mennyi a recall, ha a pozitív a yes?",
      options: ["0,500", "0,667", "0,700", "0,833"],
      answer: 0,
      hint: "A yes a jobb alsó sarok; a recall a „valódi yes” soron belül nézi a találatokat.",
      explain: R`Valódi yes sor: 20 jósolt no (FN) és 20 jósolt yes (TP). Recall $=20/40=0{,}5$. A 0,667 a precision ($20/30$), a 0,7 az accuracy, a 0,833 a „no” recallja ($50/60$).`
    },
    {
      type: "single",
      q: "Mit mér a recall (érzékenység)?",
      options: [
        "A valóban pozitív esetek mekkora részét találta meg a modell",
        "A pozitívnak jósolt esetek mekkora része valóban pozitív",
        "Az összes előrejelzés mekkora része helyes",
        "A negatív esetek mekkora részét jósolta tévesen pozitívnak"
      ],
      answer: 0,
      hint: "Recall: a mátrix „valódi pozitív” sora.",
      explain: "Recall = TP / (TP + FN): a valódi pozitívokból mennyit talált meg. A második opció a precision, a harmadik az accuracy, a negyedik a hamis pozitív arány."
    },
    {
      type: "single",
      q: "Precision = 1,0, recall = 0,1. Mennyi az F1?",
      options: ["≈ 0,18", "0,55", "0,10", "0,05"],
      answer: 0,
      hint: "Az F1 harmonikus, nem számtani átlag.",
      explain: R`$F_1=\tfrac{2\cdot 1\cdot 0{,}1}{1+0{,}1}\approx 0{,}18$. A 0,55 a számtani átlag – az F1 épp azt bünteti, ha az egyik érték kicsi.`
    }
  ]
};

QUIZZES["l05-lepes8"] = {
  title: "Mini-kvíz – Alul- és túltanulás",
  questions: [
    {
      type: "single",
      q: "Tanító-accuracy 0,99, teszt-accuracy 0,70. Mi a diagnózis?",
      options: ["Túltanulás", "Alultanulás", "Adatszivárgás", "Jól általánosító modell"],
      answer: 0,
      hint: "Mekkora a rés a tanító- és a teszteredmény között?",
      explain: "A tanítón szinte tökéletes, a teszten sokkal rosszabb: a modell bemagolta a tanítóadatot – túltanulás. Adatszivárgásnál a teszt is gyanúsan jó lenne."
    },
    {
      type: "single",
      q: "Tanító-accuracy 0,62, teszt 0,60, a többségi osztály aránya 0,60. Mi a diagnózis?",
      options: ["Alultanulás", "Túltanulás", "Tökéletes modell", "Rossz rétegzés"],
      answer: 0,
      hint: "Hol van a teszteredmény az alapmodellhez képest?",
      explain: "Mindkét eredmény gyenge, a teszt épp az alapmodell szintje: a modell túl egyszerű – alultanulás."
    },
    {
      type: "multi",
      q: "Melyik csökkenti egy döntési fa túltanulását?",
      options: [
        "A <code>max_depth</code> csökkentése",
        "A <code>min_samples_leaf</code> növelése",
        "A <code>max_depth</code> növelése",
        "Ha a modellt a tanítóhalmazon értékeljük"
      ],
      answer: [0, 1],
      hint: "Melyik beállítás akadályozza meg, hogy a fa egyes példákat bemagoljon?",
      explain: "Sekélyebb fa és nagyobb minimális levélméret egyszerűbb, általánosabb szabályokat ad. A mélyebb fa rontana a helyzeten; a tanítóhalmazon értékelés pedig csak elrejti a problémát."
    }
  ]
};

QUIZZES["l05-vegso"] = {
  title: "Ellenőrző kvíz – Döntési fa és mérőszámok",
  questions: [
    {
      type: "single",
      q: "A hallgatói adaton a célváltozó a <code>passed</code>. Melyik oszlop bemenetként való használata adatszivárgás?",
      options: ["exam_score", "previous_gpa", "attendance", "programme"],
      answer: 0,
      hint: "Melyik oszlopból állították elő a <code>passed</code>-et?",
      explain: "passed = yes, ha exam_score ≥ 50. Az exam_score a célváltozó „forrása”, és a jóslás idején még nem ismert. A többi a vizsga előtt ismert jellemző."
    },
    {
      type: "single",
      q: "Mit biztosít a <code>train_test_split(..., stratify=y)</code>?",
      options: [
        "A tanító- és a teszthalmazban az osztályarányok közel azonosak az eredetivel",
        "A tanítóhalmazban 50–50% lesz a két osztály",
        "A felosztás minden futtatáskor ugyanaz lesz",
        "A teszthalmaz pontosan 25% lesz"
      ],
      answer: 0,
      hint: "Rétegzés: az eredeti arány megőrzése.",
      explain: "A rétegzés az eredeti (pl. 71–29%) arányt őrzi meg mindkét halmazban, nem egyenlíti ki az osztályokat. A reprodukálhatóságot a <code>random_state</code>, a méretet a <code>test_size</code> adja."
    },
    {
      type: "single",
      q: "A gyakorlat fájának gyökerében value = [25, 60]. Mennyi a Gini-index?",
      options: ["≈ 0,415", "≈ 0,585", "≈ 0,874", "≈ 0,294"],
      answer: 0,
      hint: R`Arányok: $25/85$ és $60/85$.`,
      explain: R`$1-\left((25/85)^2+(60/85)^2\right)=1-0{,}585=0{,}415$ (az ábrán 0,42). A 0,585 a négyzetösszeg, a 0,874 az entrópia, a 0,294 a „no” aránya.`
    },
    {
      type: "single",
      q: "Négy jelölt vágás súlyozott Ginije: A: 0,357; B: 0,208; C: 0,188; D: 0,438. Melyiket választja a fa?",
      options: ["C", "D", "B", "A"],
      answer: 0,
      hint: "A fa a kevertség csökkentésére törekszik.",
      explain: "A legkisebb súlyozott kevertségű (legnagyobb nyereségű) vágás nyer: C (0,188). A D lenne a legrosszabb."
    },
    {
      type: "single",
      q: "Egy csomópontban a tanulási órák értékei: 2, 4, 7. Mely küszöböket vizsgálja a fa?",
      options: ["3 és 5,5", "2, 4 és 7", "4,33", "3, 5,5 és 7"],
      answer: 0,
      hint: "Rendezett szomszédos értékek felezőpontjai.",
      explain: "(2+4)/2 = 3 és (4+7)/2 = 5,5: n különböző értékhez n − 1 jelölt. A 4,33 az átlag, az nem küszöbjelölt."
    },
    {
      type: "single",
      q: "Két osztály, 50–50%-os arány. Mennyi az entrópia?",
      options: ["1", "0,5", "0", "0,693"],
      answer: 0,
      hint: R`$H=-\sum p_i\log_2 p_i$, és $\log_2 0{,}5=-1$.`,
      explain: R`$-(0{,}5\cdot(-1)+0{,}5\cdot(-1))=1$: ez a maximum két osztálynál. A 0,5 a Gini maximuma, a 0,693 a természetes alapú logaritmussal kapott érték.`
    },
    {
      type: "single",
      q: "A gyakorlat fája szerint mit jósol egy hallgatóra: previous_gpa = 3,0; assignments_completed = 7?",
      options: [
        "yes – a [10, 19] levél alapján",
        "yes – a [0, 9] levél alapján",
        "no – a [4, 3] levél alapján",
        "no – a [3, 2] levél alapján"
      ],
      answer: 0,
      hint: "3,0 > 2,895 → jobbra; 3,0 ≤ 3,835 → ?; 7 ≤ 8,5 → ?",
      explain: "3,0 > 2,895 → jobb ág; 3,0 ≤ 3,835 → bal; 7 ≤ 8,5 → bal: levél [10, 19], többség yes. A [0, 9] levélbe 8,5 feladat fölött jutna; a „no” levelek a 2,895 alatti ágon vannak."
    },
    {
      type: "multi",
      q: "Mely feltételek állítják le egy ág növesztését a döntési fa algoritmusban?",
      options: [
        "A csomópont tiszta (minden példa egy osztályba tartozik)",
        "Elértük a <code>max_depth</code>-et",
        "Egy vágás után valamelyik levélben <code>min_samples_leaf</code>-nél kevesebb példa maradna (más megengedett vágás pedig nincs)",
        "A teszthalmazon elértük a 100%-os pontosságot",
        "A fa már minden bemeneti változót felhasznált egyszer"
      ],
      answer: [0, 1, 2],
      hint: "A teszthalmaz a tanításban nem vesz részt; egy változó többször is szerepelhet.",
      explain: "A tisztaság, a maximális mélység és a minimális levélméret leállítja az ágat. A tesztadatot a fa tanítás közben nem látja; egy változót pedig többször is használhat (a gyakorlat fájában a previous_gpa háromszor szerepel)."
    },
    {
      type: "single",
      q: "Tanítóhalmaz: 60 yes, 25 no. Teszthalmaz: 21 yes, 8 no. Mennyi a többségi alapmodell teszt-accuracy-je?",
      options: ["≈ 0,724", "≈ 0,706", "0,500", "1,000"],
      answer: 0,
      hint: "Mindenkire a tanítóhalmaz többségi osztályát mondja. Hányat talál el a teszten?",
      explain: R`Mindenkire yes → a 21 yes-t eltalálja: $21/29\approx 0{,}724$ – pontosan annyi, mint a döntési fáé. A 0,706 a tanítóhalmaz aránya ($60/85$), nem a teszté.`
    },
    {
      type: "single",
      q: "A többségi alapmodell (mindenkire yes) recallja, ha a pozitív osztály a yes?",
      options: ["1,000", "0,724", "0,000", "0,500"],
      answer: 0,
      hint: "Hány valódi yes-t „talál meg”, ha mindenkit yes-nek mond?",
      explain: R`Minden valódi yes-t yes-nek jósol: recall $=21/21=1$. A precision 0,724 (a 8 bukó is yes-t kapott). Ha a „no” lenne a pozitív, a recall 0 lenne.`
    },
    {
      type: "single",
      q: "A fa: TP = 17, FN = 4, TN = 4, FP = 4 (pozitív = yes). Mennyi a balanced accuracy?",
      options: ["≈ 0,655", "≈ 0,724", "≈ 0,810", "0,500"],
      answer: 0,
      hint: "Az osztályonkénti recallok átlaga: yes-re TP/(TP+FN), no-ra TN/(TN+FP).",
      explain: R`$\tfrac12\left(\tfrac{17}{21}+\tfrac48\right)=\tfrac12(0{,}810+0{,}5)\approx 0{,}655$. A 0,724 az accuracy, a 0,810 csak a yes recallja, a 0,5 az alapmodell balanced accuracy-je.`
    },
    {
      type: "match",
      q: "Párosítsd a mérőszámot a képletével!",
      pairs: [
        ["accuracy", "(TP + TN) / összes"],
        ["precision", "TP / (TP + FP)"],
        ["recall", "TP / (TP + FN)"],
        ["F1", "2 · P · R / (P + R)"]
      ],
      hint: "Precision: a jósolt pozitívok oszlopa; recall: a valódi pozitívok sora.",
      explain: "Accuracy: az összes helyes arány. Precision: a pozitívnak jósoltak közül a valódi pozitívok. Recall: a valódi pozitívok közül a megtaláltak. F1: a kettő harmonikus átlaga."
    },
    {
      type: "single",
      q: "Famélység-kísérlet (tanító / teszt accuracy): mélység 1: 0,765 / 0,724; mélység 2: 0,800 / 0,759; korlátlan: 1,000 / 0,655. Melyik állítás helyes?",
      options: [
        "A korlátlan fa túltanul: a tanítón tökéletes, a teszten a legrosszabb",
        "A korlátlan fa a legjobb, mert 100%-os a tanító-accuracy-je",
        "A mélység 2 alultanul, mert nem 100%-os a tanítón",
        "A mélységnek nincs hatása a teszteredményre"
      ],
      answer: 0,
      hint: "A teszteredmény számít, és a tanító–teszt rés.",
      explain: "A korlátlan fa bemagolja a tanítóadatot (1,0), a teszten viszont 0,655 – túltanulás. A mélység 2 adja a legjobb teszteredményt kis réssel; a 100%-os tanító-accuracy nem cél."
    }
  ]
};
