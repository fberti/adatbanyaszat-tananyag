/* 16. lecke – Lineáris regresszió – kvízek */
window.QUIZZES = window.QUIZZES || {};
var R = window.R || String.raw;

QUIZZES["l16-lepes1"] = {
  title: "Mini-kvíz – Regresszió, interpoláció, extrapoláció",
  questions: [
    {
      type: "multi",
      q: "Mely feladatok regressziós feladatok?",
      options: [
        "A jövő havi árbevétel becslése forintban.",
        "Egy vásárló hány nap múlva tér vissza.",
        "Átmegy-e a hallgató a vizsgán (yes / no).",
        "Melyik termékkategóriába tartozik egy új termék.",
        "Egy lakás piaci ára az alapterület alapján."
      ],
      answer: [0, 1, 4],
      hint: "Szám a cél, vagy kategória?",
      explain: "Regresszió: folytonos szám a cél (árbevétel, napok száma, ár). A yes/no és a termékkategória osztályozás – még ha számokkal kódolnánk is a kategóriákat."
    },
    {
      type: "single",
      q: "A modellt 40–100 m²-es lakásokon tanítottuk. Melyik becslés extrapoláció?",
      options: ["Egy 250 m²-es lakás ára.", "Egy 75 m²-es lakás ára.", "Egy 41 m²-es lakás ára.", "Egy 99 m²-es lakás ára."],
      answer: 0,
      hint: "Benne van-e a bemenet a megfigyelt tartományban?",
      explain: "Csak a 250 m² esik a 40–100 m²-es tartományon kívül. A tartomány széléhez közeli (41, 99 m²) becslések is interpolációk."
    },
    {
      type: "single",
      q: "Miért bizonytalanabb az extrapoláció, mint az interpoláció?",
      options: [
        "Mert feltételezi, hogy a megfigyelt trend a tartományon kívül is változatlanul folytatódik, amire nincs adatunk.",
        "Mert az extrapolációhoz más képlet kell, mint az illesztéshez.",
        "Mert az extrapoláció mindig negatív értéket ad.",
        "Nem bizonytalanabb, a modell mindkét esetben ugyanolyan pontos."
      ],
      answer: 0,
      hint: "Mit „látott” a modell a tanítás során?",
      explain: "Ugyanazzal a $\\hat y = w_0 + w_1x$ képlettel számolunk, de a tartományon kívül nincs adat, ami igazolná, hogy a kapcsolat ott is lineáris. A hallgatói adaton a 40 órára jósolt 112 pont is ezt mutatja."
    }
  ]
};

QUIZZES["l16-lepes2"] = {
  title: "Mini-kvíz – Korreláció táblázatban",
  questions: [
    {
      type: "single",
      q: R`$n=4$, $\sum x=20$, $\sum y=24$, $\sum x^2=120$, $\sum y^2=164$, $\sum xy=136$. Mennyi a Pearson-korreláció?`,
      options: ["0,8", "0,64", "1,25", "0,4"],
      answer: 0,
      hint: R`$r=\dfrac{n\sum xy-\sum x\sum y}{\sqrt{n\sum x^2-(\sum x)^2}\sqrt{n\sum y^2-(\sum y)^2}}$`,
      explain: R`Számláló $544-480=64$; nevező $\sqrt{80}\cdot\sqrt{80}=80$; $r=0{,}8$. A 0,64 az $r^2$ (= $R^2$), az 1,25 a fordított hányados ($80/64$ – egy korreláció sosem lehet 1-nél nagyobb), a 0,4 a $64/160$ (a két gyök összegével osztva szorzat helyett).`
    },
    {
      type: "single",
      q: R`$X_3 = 3\cdot X_1$ (minden elemet háromszorozunk). Mennyi $r(X_1, X_3)$?`,
      options: ["1", "3", "1/3", "Az adatoktól függ, ki kell számolni."],
      answer: 0,
      hint: "Rajta vannak-e a pontok egy egyenesen? Függ-e a korreláció a mértékegységtől?",
      explain: "A pontok a $y=3x$ egyenesen vannak, pozitív meredekséggel, így $r=1$. A korreláció mértékegység-független, és értéke mindig $[-1;1]$-be esik, ezért 3 vagy 1/3 nem lehet."
    },
    {
      type: "match",
      q: "Párosítsd a korrelációs mutatót azzal, amit mér!",
      pairs: [
        ["Pearson", "lineáris kapcsolat erőssége és iránya"],
        ["Spearman", "a rangok Pearson-korrelációja (monoton kapcsolat)"],
        ["Kendall", "egyező és ellentétes pontpárok aránya"],
        ["kovariancia", "az együttmozgás iránya, mértékegységfüggő nagysággal"]
      ],
      hint: "Melyik használ rangokat, melyik pontpárokat, és melyik nincs normálva?",
      explain: R`A Spearman és a Kendall is rangalapú, monoton kapcsolatot mér ($y=x^2$ esetén mindkettő 1, a Pearson csak $0{,}981$). A kovariancia a korreláció normálatlan változata.`
    }
  ]
};

QUIZZES["l16-lepes5"] = {
  title: "Mini-kvíz – Legkisebb négyzetek",
  questions: [
    {
      type: "single",
      q: R`$\bar x=10$, $\bar y=50$, $\operatorname{cov}(x,y)=12$, $s_x^2=4$, $s_y^2=100$. Mi a legkisebb négyzetes egyenes?`,
      options: [R`$\hat y=20+3x$`, R`$\hat y=48{,}8+0{,}12x$`, R`$\hat y=50+3x$`, R`$\hat y=-10+6x$`],
      answer: 0,
      hint: R`$w_1=\operatorname{cov}(x,y)/s_x^2$ – melyik variancia van a nevezőben? Utána $w_0=\bar y-w_1\bar x$.`,
      explain: R`$w_1=12/4=3$, $w_0=50-30=20$. A $0{,}12$ az $y$ varianciájával osztott kovariancia (rossz nevező), az $50+3x$ elfelejti kivonni $w_1\bar x$-et, a $-10+6x$ a szórással ($s_x=2$) osztja a kovarianciát a variancia helyett ($12/2=6$, $50-60=-10$).`
    },
    {
      type: "multi",
      q: "Mely állítások igazak a legkisebb négyzetes (OLS) egyenesre?",
      options: [
        R`Átmegy az $(\bar x;\bar y)$ ponton.`,
        "A reziduumok összege 0.",
        R`A súlyokat a $\partial J/\partial w=0$ egyenletekből kapjuk.`,
        "Az abszolút hibák összegét minimalizálja.",
        "Egyetlen kiugró pont nem befolyásolja érdemben."
      ],
      answer: [0, 1, 2],
      hint: "Az OLS a négyzetes hibát minimalizálja – mi következik a négyzetből a nagy hibákra?",
      explain: "Az OLS az SSE-t (négyzetes hibaösszeget) minimalizálja, nem az abszolút hibát. A négyzet miatt a kiugró nagyon erősen húzza az egyenest: a kis esetben egy elírt pont a meredekséget 0,6-ról 2,6-ra változtatta."
    },
    {
      type: "single",
      q: "Miért négyzetes hibát használunk a regresszió költségfüggvényében?",
      options: [
        "A pozitív és negatív hibák nem oltják ki egymást, a nagy eltérést jobban bünteti, és deriválható, így zárt képlet adódik.",
        "Mert így a hibák összege mindig 0 lesz.",
        "Mert a négyzetes hiba mértékegysége megegyezik a célváltozóéval.",
        "Mert a négyzetes hiba érzéketlen a kiugró értékekre."
      ],
      answer: 0,
      hint: "Gondolj a 4. lépés kis esetére: mennyi volt a sima hibaösszeg mindhárom egyenesnél?",
      explain: "A sima hibaösszeg mindhárom jelölt egyenesnél 0 volt – épp ezért kell a négyzet. A négyzetes hiba mértékegysége a célváltozó egységének négyzete (ezért vonunk gyököt az RMSE-nél), és kifejezetten érzékeny a kiugrókra."
    }
  ]
};

QUIZZES["l16-lepes6"] = {
  title: "Mini-kvíz – R²",
  questions: [
    {
      type: "single",
      q: R`$\mathrm{SSE}=7{,}2$, $\mathrm{SST}=20$. Mennyi $R^2$?`,
      options: ["0,64", "0,36", "0,8", "2,78"],
      answer: 0,
      hint: R`$R^2=1-\mathrm{SSE}/\mathrm{SST}$.`,
      explain: R`$1-7{,}2/20=1-0{,}36=0{,}64$. A 0,36 a megmagyarázatlan hányad (elmaradt az $1-$), a 0,8 a korreláció ($\sqrt{0{,}64}$), a 2,78 az $\mathrm{SST}/\mathrm{SSE}$.`
    },
    {
      type: "single",
      q: R`Egyváltozós regresszióban $r=-0{,}5$. Mit tudunk $R^2$-ről és $w_1$-ről?`,
      options: [R`$R^2=0{,}25$, $w_1<0$`, R`$R^2=-0{,}25$, $w_1<0$`, R`$R^2=0{,}25$, $w_1>0$`, R`$R^2=-0{,}5$, $w_1=-0{,}5$`],
      answer: 0,
      hint: R`Egy változónál $R^2=r^2$. A $w_1$ és az $r$ számlálója ugyanaz a kovariancia.`,
      explain: R`$R^2=(-0{,}5)^2=0{,}25$ (a tanítóadaton nem lehet negatív). A $w_1$ előjele az $r$-ével egyezik, de a nagysága nem: $w_1=r\cdot s_y/s_x$, ami a mértékegységektől függ.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak az $R^2$-re?",
      options: [
        "A teszthalmazon negatív is lehet.",
        "Új bemeneti változó hozzáadásával a tanító-R² nem csökken.",
        "Magas R² mellett is lehet a kapcsolat nemlineáris – a reziduumok mintázata árulkodik.",
        "Ha az R² kicsi, a változónak biztosan nincs kapcsolata a célváltozóval.",
        "Az R² a hiba átlagos nagysága a célváltozó mértékegységében."
      ],
      answer: [0, 1, 2],
      hint: "Gondolj az y = x² példára és a hallgatói adat tanulási idejére.",
      explain: "Kis R² mellett is lehet valódi kapcsolat (a tanulási idő 13%-ot magyaráz, de számít). A hiba mértékegységes nagysága az RMSE, nem az R²; az R² arány 0 és 1 között (tanítóadaton)."
    }
  ]
};

QUIZZES["l16-lepes7"] = {
  title: "Mini-kvíz – scikit-learn, több változó",
  questions: [
    {
      type: "match",
      q: "Párosítsd a <code>LinearRegression</code> elemét a jelentésével!",
      pairs: [
        ["<code>fit(X, y)</code>", "a súlyok kiszámítása legkisebb négyzetekkel"],
        ["<code>predict(X)</code>", "becslés új bemenetekre"],
        ["<code>score(X, y)</code>", "R² (determinációs együttható)"],
        ["<code>coef_</code>", "a meredekségek, változónként egy"]
      ],
      hint: "Melyik tanul, melyik jósol, melyik értékel, és melyik egy tárolt eredmény?",
      explain: "A tengelymetszet (w₀) külön attribútum: <code>intercept_</code>. A <code>score</code> regressziónál R²-et ad, osztályozónál accuracy-t."
    },
    {
      type: "single",
      q: "Miért hibás: <code>LinearRegression().fit(df[\"study_hours\"], df[\"exam_score\"])</code>?",
      options: [
        "Az X-nek kétdimenziósnak kell lennie: <code>df[[\"study_hours\"]]</code> kell.",
        "Az y-nak is kétdimenziósnak kell lennie.",
        "A <code>fit</code> előtt mindig standardizálni kell.",
        "Semmi baj vele, működik."
      ],
      answer: 0,
      hint: "Hány szögletes zárójel ad DataFrame-et, és hány Series-t?",
      explain: "Az sklearn X-et (minta × változó) mátrixként várja; egy Series-t nem fogad el bemenetként. A célváltozó maradhat 1D. A lineáris regresszióhoz nem kötelező a standardizálás (csak a súlyok összehasonlításához hasznos)."
    },
    {
      type: "single",
      q: "Két bemeneti változó (alapterület, szobaszám) korrelációja 0,93. Mi a teendő az mRMR elve szerint?",
      options: [
        "Az egyiket elhagyjuk: azt tartjuk meg, amelyik a célváltozóval erősebben korrelál.",
        "Mindkettőt megtartjuk, mert mindkettő erősen korrelál a célváltozóval.",
        "Mindkettőt elhagyjuk.",
        "Felvesszük a szorzatukat harmadik változónak, hogy több információ legyen."
      ],
      answer: 0,
      hint: "Maximum Relevance, Minimum Redundancy.",
      explain: "A két változó redundáns (multikollinearitás): együtt instabil, értelmezhetetlen súlyokat adnak. Maximális relevancia: a célváltozóval erősebben összefüggőt tartjuk meg; minimális redundancia: a másikat elhagyjuk."
    }
  ]
};

QUIZZES["l16-vegso"] = {
  title: "Ellenőrző kvíz – Lineáris regresszió",
  questions: [
    {
      type: "single",
      q: R`Pontok: $(1;2)$, $(2;4)$, $(3;5)$, $(4;4)$, $(5;5)$. Oszlopösszegek: $\sum x=15$, $\sum y=20$, $\sum x^2=55$, $\sum xy=66$. Mi a legkisebb négyzetes egyenes?`,
      options: [R`$\hat y=2{,}2+0{,}6x$`, R`$\hat y=1+x$`, R`$\hat y=4+0{,}6x$`, R`$\hat y=0{,}4+1{,}2x$`],
      answer: 0,
      hint: R`$w_1=\dfrac{n\sum xy-\sum x\sum y}{n\sum x^2-(\sum x)^2}$, $w_0=\bar y-w_1\bar x$.`,
      explain: R`$w_1=30/50=0{,}6$, $w_0=4-1{,}8=2{,}2$. Az $1+x$ jól néz ki, de az SSE-je 4 (a $2{,}2+0{,}6x$-é 2,4). A $4+0{,}6x$ elfelejti a $w_1\bar x$ kivonását. A $0{,}4+1{,}2x$ a $\sum xy/\sum x^2=66/55$ hányadost veszi meredekségnek – az átlagok levonása (az $n\sum xy-\sum x\sum y$ forma) kimaradt.`
    },
    {
      type: "single",
      q: R`Az előadás példája: $X=1,2,3,4$, $y=2;\ 3{,}5;\ 5;\ 6{,}5$. Mit ír ki <code>model.predict([[5]])</code>?`,
      options: ["[8.]", "[6.5]", "[7.5]", "[8.5]"],
      answer: 0,
      hint: R`Az $x$ egységenként 1,5-tel nő $y$; hol metszi az egyenes az $x=0$-t?`,
      explain: R`$\hat y=0{,}5+1{,}5x$, $\hat y(5)=8$. A 6,5 az utolsó ismert érték, a 7,5 a $1{,}5\cdot5$ ($w_0$ nélkül), a 8,5 egy lépéssel túllő. Megjegyzés: $X=5$ extrapoláció.`
    },
    {
      type: "single",
      q: R`A hallgatói adaton $\widehat{\text{pont}}=44{,}97+1{,}677\cdot\text{óra}$, a mintában 1–25,3 óra szerepel. A modell 40 órára 112 pontot jósol (a skála 0–100). Mi a helyes értelmezés?`,
      options: [
        "Extrapoláció: a lineáris trend a megfigyelt tartományon túl nem érvényes, ez a becslés nem használható.",
        "A modell hibás, mert az illesztés rossz – újra kell számolni a súlyokat.",
        "A 40 órát tanuló hallgató biztosan 100 pontot ér el.",
        "Az R² túl nagy, ezért túllő a modell."
      ],
      answer: 0,
      hint: "Hol van a 40 óra a tanítóadathoz képest?",
      explain: "A súlyok a tanítóadatra a legjobbak; a hiba abban van, hogy a modellt a tartományán kívül használjuk. Az R² itt kicsi (0,131), nem nagy."
    },
    {
      type: "single",
      q: R`Egy egyváltozós modellnél $r=0{,}362$. Mennyi $R^2$, és mit jelent?`,
      options: [
        R`$0{,}131$: a célváltozó ingadozásának kb. 13%-át magyarázza a modell.`,
        R`$0{,}362$: a becslések 36%-a pontos.`,
        R`$0{,}602$: a modell az esetek 60%-ában jól jósol.`,
        R`$0{,}724$: ugyanannyi, mint az osztályozás accuracy-je.`
      ],
      answer: 0,
      hint: R`Egy változónál $R^2=r^2$.`,
      explain: R`$0{,}362^2\approx0{,}131$. Az R² a magyarázott varianciahányad, nem a „pontos jóslatok aránya” (regresszióban a jóslat szinte sosem pontosan egyezik). A 0,602 a $\sqrt{0{,}362}$ – fordított irányú hiba.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak?",
      options: [
        R`A reziduum $e_i=y_i-\hat y_i$.`,
        "Az OLS-egyenes zárt képlettel, iteráció nélkül számolható.",
        R`$\hat y=w_0+w_1x+w_2x^2$ is lineáris regresszió (a súlyokban lineáris).`,
        "Korreláció = 0 esetén biztosan nincs kapcsolat a két változó között.",
        "Erősen korreláló bemenetek mellett a súlyok jól értelmezhetők."
      ],
      answer: [0, 1, 2],
      hint: "Két állítás a korreláció és a multikollinearitás tipikus félreértése.",
      explain: "Az r = 0 csak azt jelenti, hogy nincs lineáris kapcsolat (az U alakú összefüggés r = 0-t ad). Multikollinearitásnál a súlyok instabilak, értelmezhetetlenek."
    },
    {
      type: "single",
      q: "Egy változóval a teszt-R² −0,08, négy változóval 0,45 (a tanító-R² 0,48). Mit mondhatunk?",
      options: [
        "Egy változóval a modell a teszten rosszabb, mint az átlag jóslása; a négyváltozós modell általánosít, nincs érdemi túltanulás.",
        "A negatív R² számolási hiba, ilyen nem létezhet.",
        "A négyváltozós modell túltanult, mert a tanító-R² nagyobb a tesztnél.",
        "Az egyváltozós modell a jobb, mert egyszerűbb."
      ],
      answer: 0,
      hint: "Mikor negatív az R²? Mekkora a tanító–teszt különbség a négyváltozós modellnél?",
      explain: "Teszten SSE > SST esetén negatív az R² – ez valós jelenség. A 0,48 és 0,45 közötti kis eltérés normális, nem túltanulás (az nagy eltérésnél, pl. 0,95 vs. 0,20 gyanús)."
    }
  ]
};
