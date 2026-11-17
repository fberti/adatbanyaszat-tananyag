/* Vizsgagyakorló kérdésbank – 16. lecke: lineáris regresszió, korreláció számítása */
BANK.push(
  {
    id: "b16-001",
    topic: "16",
    level: 1,
    ref: "16-linearis-regresszio.html#lepes1",
    type: "single",
    q: "Mi különbözteti meg a regressziót az osztályozástól?",
    options: [
      "A regresszió célváltozója folytonos szám, az osztályozásé kategória.",
      "A regresszió nem felügyelt, az osztályozás felügyelt tanulás.",
      "A regresszió csak egy bemeneti változóval működik.",
      "Az osztályozás célváltozója mindig kétértékű, a regresszióé háromértékű."
    ],
    answer: 0,
    hint: "Mit jósol a modell: árat vagy címkét?",
    explain: "Mindkettő felügyelt tanulás; a különbség a célváltozó típusa. A regresszió több bemenettel is működik (többváltozós regresszió), az osztályozás lehet többosztályos is."
  },
  {
    id: "b16-002",
    topic: "16",
    level: 1,
    ref: "16-linearis-regresszio.html#lepes1",
    type: "match",
    q: "Párosítsd a fogalmat a jelentésével!",
    pairs: [
      ["interpoláció", "becslés a megfigyelt adatpontok tartományán belül"],
      ["extrapoláció", "becslés a megfigyelt tartományon kívül"],
      ["célváltozó", "a becsülendő mennyiség (y)"],
      ["magyarázó változó", "a bemenet, amiből becslünk (x)"]
    ],
    hint: "Az „inter” = között, az „extra” = kívül.",
    explain: "Az extrapoláció bizonytalanabb, mert feltételezi, hogy a trend a megfigyelt tartományon túl is folytatódik."
  },
  {
    id: "b16-003",
    topic: "16",
    level: 2,
    ref: "16-linearis-regresszio.html#lepes1",
    type: "single",
    q: "Egy bolt havi forgalmára 2021–2025 adataiból illesztett trendegyenessel becsülsz 2027 júniusára. Melyik állítás helyes?",
    options: [
      "Ez extrapoláció; a becslés csak akkor megbízható, ha a trend változatlanul folytatódik.",
      "Ez interpoláció, mert a hónapok ugyanazok (január–december).",
      "Ez osztályozás, mert a hónap kategorikus változó.",
      "A becslés pontos, mert a lineáris regresszió minimális hibájú."
    ],
    answer: 0,
    hint: "Benne van-e 2027 a tanítóadat időszakában?",
    explain: "Az idő a bemenet, és 2027 a megfigyelt időszakon kívül esik: extrapoláció. Az OLS a tanítóadaton minimális hibájú, ami a tartományon kívüli pontosságról semmit nem mond."
  },
  {
    id: "b16-004",
    topic: "16",
    level: 2,
    ref: "16-linearis-regresszio.html#lepes2",
    type: "single",
    q: R`$x=1,2,3$; $y=1,3,2$. A táblázatos módszerrel: $\sum x=6$, $\sum y=6$, $\sum x^2=14$, $\sum y^2=14$, $\sum xy=13$. Mennyi $r$?`,
    options: ["0,5", "0,25", "0,93", "0,75"],
    answer: 0,
    hint: R`Számláló: $n\sum xy-\sum x\sum y$; nevező: két gyök szorzata.`,
    explain: R`$(39-36)/(\sqrt{42-36}\cdot\sqrt{42-36})=3/6=0{,}5$. A 0,25 az $r^2$. A 0,93 a $13/14$ – a nyers összegek hányadosa, átlagok levonása nélkül. A 0,75 a $3/4$ (rossz nevező).`
  },
  {
    id: "b16-005",
    topic: "16",
    level: 1,
    ref: "16-linearis-regresszio.html#lepes2",
    type: "multi",
    q: "Mely transzformációk <strong>nem</strong> változtatnak a Pearson-korreláción?",
    options: [
      "Minden x-hez 100-at adunk.",
      "Minden y-t megszorzunk 3-mal.",
      "Az árat forint helyett ezer forintban mérjük.",
      "Minden y-t megszorzunk −1-gyel.",
      "Minden x-et négyzetre emelünk."
    ],
    answer: [0, 1, 2],
    hint: "Eltolás és pozitív szorzó: marad. Mi történik negatív szorzónál és nemlineáris transzformációnál?",
    explain: "A negatív szorzó az előjelet megfordítja. A négyzetre emelés nemlineáris, a lineáris kapcsolat erőssége megváltozik (a rangkorreláció pozitív x-ekre megmaradna)."
  },
  {
    id: "b16-006",
    topic: "16",
    level: 2,
    ref: "16-linearis-regresszio.html#lepes2",
    type: "single",
    q: R`$x=1,2,3,4,5$, $y=1,4,9,16,25$. Melyik igaz?`,
    options: [
      R`Pearson $r\approx0{,}98$, Spearman $\rho=1$.`,
      R`Pearson $r=1$, Spearman $\rho=1$.`,
      R`Pearson $r\approx0{,}98$, Spearman $\rho\approx0{,}98$.`,
      R`Pearson $r=0$, mert a kapcsolat nem lineáris.`
    ],
    answer: 0,
    hint: "Mik a rangok mindkét változóban? Egyenesen vannak-e a pontok?",
    explain: R`A rangok azonosak (1–5), ezért $\rho=1$ (és $\tau=1$). A pontok görbén vannak, így a Pearson 1-nél kisebb ($0{,}981$). Nemlineáris, de monoton kapcsolatnál a Pearson nem 0 – az U alakúnál lenne az.`
  },
  {
    id: "b16-007",
    topic: "16",
    level: 2,
    ref: "16-linearis-regresszio.html#lepes2",
    type: "single",
    q: R`$x=1,2,3,4$; $y=1,3,2,4$. Mennyi a Kendall-féle $\tau$?`,
    options: [R`$\approx0{,}667$`, R`$0{,}8$`, R`$1$`, R`$\approx0{,}833$`],
    answer: 0,
    hint: R`Számold össze a 6 pontpárból az egyezőket ($C$) és az ellentéteseket ($D$): $\tau=(C-D)/6$.`,
    explain: R`Csak a (2., 3.) pár ellentétes, 5 egyező: $\tau=(5-1)/6\approx0{,}667$. A 0,8 a Spearman-féle $\rho$ (és itt a Pearson is), az 1 tökéletes egyezést jelentene, a 0,833 csak az egyező párok aránya ($5/6$) – a $D$ levonása kimaradt.`
  },
  {
    id: "b16-008",
    topic: "16",
    level: 1,
    ref: "16-linearis-regresszio.html#lepes3",
    type: "single",
    q: R`$\widehat{\text{ár (millió Ft)}}=7{,}8+0{,}56\cdot\text{alapterület (m}^2)$. Mit jelent a 0,56?`,
    options: [
      "Négyzetméterenként átlagosan 0,56 millió Ft-tal magasabb becsült ár.",
      "A 0 m²-es lakás ára 0,56 millió Ft.",
      "Az ár és az alapterület korrelációja 0,56.",
      "A modell a lakások 56%-ának árát becsli helyesen."
    ],
    answer: 0,
    hint: "Melyik súly a meredekség, és melyik a tengelymetszet?",
    explain: "A 0,56 a meredekség (w₁): x egységnyi növekedésére ŷ ennyit nő. A 0 m²-es érték a w₀ = 7,8 lenne (értelmetlen extrapoláció). A meredekség nem korreláció: mértékegységfüggő."
  },
  {
    id: "b16-009",
    topic: "16",
    level: 1,
    ref: "16-linearis-regresszio.html#lepes3",
    type: "single",
    q: R`Melyik modell <strong>nem</strong> lineáris regressziós modell a szokásos (paraméterekben lineáris) értelemben?`,
    options: [R`$\hat y=w_0\cdot e^{w_1x}$`, R`$\hat y=w_0+w_1x+w_2x^2$`, R`$\hat y=w_0+w_1\log x$`, R`$\hat y=w_0+w_1x_1+w_2x_2$`],
    answer: 0,
    hint: "Nem az számít, hogy x-ben lineáris-e, hanem hogy a súlyokban az-e.",
    explain: R`Az $e^{w_1x}$-ben a súly a kitevőben van: a súlyokban nemlineáris. A többi a súlyok lineáris kombinációja ($x^2$, $\log x$ csak számolt bemeneti oszlop).`
  },
  {
    id: "b16-010",
    topic: "16",
    level: 1,
    ref: "16-linearis-regresszio.html#lepes4",
    type: "multi",
    q: "Miért a négyzetes hibaösszeget (SSE) minimalizáljuk?",
    options: [
      "A pozitív és negatív hibák nem oltják ki egymást.",
      "A nagy eltéréseket erősebben bünteti.",
      "Deriválható, így zárt képlet adódik a súlyokra.",
      "Érzéketlen a kiugró értékekre.",
      "A mértékegysége megegyezik a célváltozóéval."
    ],
    answer: [0, 1, 2],
    hint: "Kettő épp az ellenkezője az igazságnak.",
    explain: "A négyzet miatt az SSE kifejezetten érzékeny a kiugrókra, és a mértékegysége a célváltozó egységének négyzete (ezért számolunk RMSE-t)."
  },
  {
    id: "b16-011",
    topic: "16",
    level: 2,
    ref: "16-linearis-regresszio.html#lepes4",
    type: "single",
    q: R`Pontok: $(1;1)$, $(2;3)$, $(3;2)$. Mennyi az SSE a $\hat y=1+0{,}5x$ egyenesre?`,
    options: ["1,5", "0", "2", "1,22"],
    answer: 0,
    hint: R`$\hat y=1{,}5;\ 2;\ 2{,}5$. Reziduumok, négyzetre, összeg.`,
    explain: R`$e=-0{,}5;\ 1;\ -0{,}5$, $\mathrm{SSE}=0{,}25+1+0{,}25=1{,}5$. A 0 a reziduumok (előjeles) összege – épp ezért kell négyzet. A 2 az átlag-egyenes ($\hat y=2$) SSE-je, az 1,22 a $\sqrt{1{,}5}$.`
  },
  {
    id: "b16-012",
    topic: "16",
    level: 2,
    ref: "16-linearis-regresszio.html#lepes5",
    type: "single",
    q: R`$x=0,1,2,3$; $y=1,3,5,7$. Mi a legkisebb négyzetes egyenes?`,
    options: [R`$\hat y=1+2x$`, R`$\hat y=4+2x$`, R`$\hat y=2+x$`, R`$\hat y=1+0{,}5x$`],
    answer: 0,
    hint: R`$\bar x=1{,}5$, $\bar y=4$. $w_1=\sum(x-\bar x)(y-\bar y)/\sum(x-\bar x)^2$.`,
    explain: R`$w_1=10/5=2$, $w_0=4-2\cdot1{,}5=1$. A pontok pontosan ezen az egyenesen vannak ($R^2=1$). A $4+2x$ elfelejti a $w_1\bar x$ kivonását; a $0{,}5$ meredekség a fordított irányú ($x$ becslése $y$-ból) egyenesé.`
  },
  {
    id: "b16-013",
    topic: "16",
    level: 2,
    ref: "16-linearis-regresszio.html#kiugro-pelda",
    type: "single",
    q: R`A $(1;2),(2;4),(3;5),(4;4),(5;5)$ pontokra $w_1=0{,}6$. Az utolsó pontot elírják: $(5;15)$. Mi lesz a meredekség?`,
    options: ["2,6", "0,6", "1,6", "−0,6"],
    answer: 0,
    hint: R`$\bar y$ 6 lesz. Számold újra $\sum(x-\bar x)(y-\bar y)$-t; $\sum(x-\bar x)^2=10$ nem változik.`,
    explain: R`$\sum(x-\bar x)(y-\bar y)=8+2+0-2+18=26$, $w_1=2{,}6$. Egyetlen kiugró a meredekséget több mint négyszeresére húzta: az OLS a négyzetes hiba miatt nagyon érzékeny a kiugróra.`
  },
  {
    id: "b16-014",
    topic: "16",
    level: 1,
    ref: "16-linearis-regresszio.html#lepes5",
    type: "multi",
    q: "Mely állítások igazak a legkisebb négyzetek (OLS) módszerére egy magyarázó változónál?",
    options: [
      R`$w_1=\operatorname{cov}(x,y)/s_x^2$.`,
      R`$w_0=\bar y-w_1\bar x$.`,
      R`Az egyenes átmegy az $(\bar x;\bar y)$ ponton.`,
      R`$w_1=\operatorname{cov}(x,y)/s_y^2$.`,
      "A súlyokat csak iteratív (próbálgatásos) módszerrel lehet megtalálni."
    ],
    answer: [0, 1, 2],
    hint: R`A parciális deriváltakat nullává téve zárt képletet kapunk. Melyik változó varianciája van a nevezőben?`,
    explain: R`A nevezőben a bemenet ($x$) varianciája áll. Az OLS analitikus (zárt) megoldást ad; iteratív módszer (pl. gradiens-módszer) csak nagy adatnál vagy más költségfüggvénynél kell.`
  },
  {
    id: "b16-015",
    topic: "16",
    level: 2,
    ref: "16-linearis-regresszio.html#lepes6",
    type: "single",
    q: R`Egyváltozós lineáris regresszióban $\mathrm{SSE}=2{,}4$, $\mathrm{SST}=6$. Mennyi az $R^2$ és a korreláció abszolút értéke?`,
    options: [R`$R^2=0{,}6$, $|r|\approx0{,}775$`, R`$R^2=0{,}4$, $|r|\approx0{,}632$`, R`$R^2=0{,}6$, $|r|=0{,}36$`, R`$R^2=2{,}5$, $|r|\approx1{,}58$`],
    answer: 0,
    hint: R`$R^2=1-\mathrm{SSE}/\mathrm{SST}$, és egy változónál $R^2=r^2$.`,
    explain: R`$1-2{,}4/6=0{,}6$; $|r|=\sqrt{0{,}6}\approx0{,}775$. A 0,4 a megmagyarázatlan hányad; a 0,36 az $R^2$ négyzete (gyök helyett); a 2,5 az SST/SSE.`
  },
  {
    id: "b16-016",
    topic: "16",
    level: 3,
    ref: "16-linearis-regresszio.html#lepes6",
    type: "single",
    q: R`Az $y=x^2$ ($x=1..5$) adatokra illesztett egyenes $R^2$-e $0{,}963$, a reziduumok: $2,-1,-2,-1,2$. Mi a helyes következtetés?`,
    options: [
      "A reziduumok szabályos U mintázata nemlineáris kapcsolatra utal; a magas R² ellenére az egyenes rendszeresen téved.",
      "Az R² közel 1, tehát a lineáris modell tökéletes.",
      "A reziduumok összege 0, tehát a modell torzítatlan, nincs teendő.",
      "A modell túltanult, mert az R² túl magas."
    ],
    answer: 0,
    hint: "Véletlenszerű-e a reziduumok előjele?",
    explain: "Jó modellnél a reziduumok mintázat nélkül szóródnak. A + − − − + minta azt jelzi, hogy a széleken alá-, középen fölébecsül. A reziduumösszeg az OLS-nél mindig 0, ez nem bizonyít semmit. Megoldás: az x² bemenetként (paraméterekben továbbra is lineáris modell)."
  },
  {
    id: "b16-017",
    topic: "16",
    level: 3,
    ref: "16-linearis-regresszio.html#alkalmazas",
    type: "single",
    q: "A hallgatói adaton csak a tanulási idővel a teszt-R² −0,084. Mit jelent ez?",
    options: [
      "A teszthallgatókra a modell rosszabbul becsül, mint ha mindenkinek a teszthalmaz átlagpontszámát mondanánk.",
      "Számítási hiba történt, az R² nem lehet negatív.",
      "A tanulási idő negatívan hat a vizsgapontra.",
      "A modell 8,4%-ban téved."
    ],
    answer: 0,
    hint: R`$R^2=1-\mathrm{SSE}/\mathrm{SST}$. Mikor lesz ez negatív?`,
    explain: "Teszten az SSE nagyobb lehet, mint az SST (az átlag körüli eltérés): ekkor negatív. A meredekség pozitív (1,68–2,08), tehát nem negatív hatásról van szó. A négy numerikus változóval a teszt-R² 0,446."
  },
  {
    id: "b16-018",
    topic: "16",
    level: 1,
    ref: "16-linearis-regresszio.html#lepes7",
    type: "single",
    q: R`<code>m = LinearRegression().fit([[1],[2],[3],[4]], [2, 3.5, 5, 6.5])</code>. Mi a <code>m.intercept_</code> és a <code>m.coef_</code>?`,
    options: ["0.5 és [1.5]", "1.5 és [0.5]", "2 és [1.5]", "0 és [1.667]"],
    answer: 0,
    hint: "Az intercept a tengelymetszet (x = 0), a coef_ a meredekség.",
    explain: R`$\hat y=0{,}5+1{,}5x$. Az „1.5 és [0.5]” felcseréli a kettőt; a „2 és [1.5]” az első pont $y$-ját veszi tengelymetszetnek; a „0 és [1.667]” origón átmenő egyenes lenne ($\sum xy/\sum x^2=50/30$).`
  },
  {
    id: "b16-019",
    topic: "16",
    level: 2,
    ref: "16-linearis-regresszio.html#lepes7",
    type: "multi",
    q: "Mely jelek utalnak multikollinearitásra, és mi a kezelése?",
    options: [
      "Két bemeneti változó egymással erősen korrelál (pl. |r| > 0,9).",
      "Egy kis adatváltozásra a súlyok nagyot (akár előjelet) változnak.",
      "Megoldás: a redundáns változók egyikének elhagyása (pl. mRMR szerint).",
      "A célváltozó erősen korrelál egy bemenettel.",
      "Megoldás: még több, az eddigiekkel korreláló változó felvétele."
    ],
    answer: [0, 1, 2],
    hint: "Multikollinearitás a bemenetek egymás közötti kapcsolata, nem a célváltozóval való kapcsolat.",
    explain: "A célváltozóval való erős korreláció kívánatos (relevancia). A redundáns változók felvétele rontja a helyzetet; az mRMR maximális relevanciát és minimális redundanciát keres."
  },
  {
    id: "b16-020",
    topic: "16",
    level: 3,
    ref: "16-linearis-regresszio.html#lepes7",
    type: "single",
    q: "A <code>study_hours</code> mellé felveszed a <code>study_minutes = 60 * study_hours</code> oszlopot is. Mi történik a modellel?",
    options: [
      "Az R² nem változik (0,131), de a két súly önkényesen osztozik a hatáson, így értelmezhetetlenné válnak.",
      "Az R² megduplázódik, mert kétszer annyi információ van.",
      "A modell pontosabb lesz, mert a perc finomabb mértékegység.",
      "A súlyok nem változnak: mindkettő 1,677 lesz."
    ],
    answer: 0,
    hint: "Hordoz-e új információt egy oszlop, ami egy másik konstansszorosa?",
    explain: "Tökéletes multikollinearitás: nincs új információ, az R² ugyanaz. A súlyok csak úgy kötöttek, hogy w_óra + 60·w_perc ≈ 1,677 legyen; a valódi futásban kb. 0,00047 és 0,028 jött ki."
  }
);
