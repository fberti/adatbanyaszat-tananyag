/* Vizsgagyakorló kérdésbank – 3. lecke: K-means, standardizálás, könyök, sziluett */
BANK.push(
  {
    id: "b03-001",
    topic: "03",
    level: 1,
    ref: "03-kmeans.html#lepes1",
    type: "multi",
    q: "Mely feladatok <strong>felügyelt</strong> tanulási feladatok?",
    options: [
      "Egy bolt a vásárlókat vásárlásszám és összköltés alapján szegmentálja K-means-szel.",
      "Egy biztosító a korábbi kárbejelentésekből – amelyekről utólag kiderült, hogy csalások voltak-e – tanít modellt az új bejelentések kiszűrésére.",
      "Egy ingatlaniroda a tavaly eladott lakások jellemzőiből és eladási árából becsüli meg egy új hirdetés várható árát.",
      "Egy streamingszolgáltató a nézési szokások alapján csoportokat keres a felhasználói között, előre megadott csoportok nélkül.",
      "Egy kórház a betegek laborértékei alapján hasonló betegcsoportokat keres, diagnózis nélkül."
    ],
    answer: [1, 2],
    hint: "Keresd azt az oszlopot, amelynek értéke a tanító adatban ismert, és amit előre kell jelezni.",
    explain: "Az első két feladatban van célváltozó (csalás igen/nem, eladási ár), ezt kell az új esetekre megjósolni → felügyelt tanulás. A másik háromban nincs „helyes válasz”, csak hasonlóság alapján keresünk csoportokat → felügyelet nélküli tanulás (klaszterezés). Tipikus hiba: azt hinni, hogy a „csoportosítás” szó vagy a sok adat dönt – a címke megléte dönt."
  },
  {
    id: "b03-002",
    topic: "03",
    level: 1,
    ref: "03-kmeans.html#lepes1",
    type: "single",
    q: "A K-means futása után egy vásárló a <code>cluster = 3</code> címkét kapja. Mit tudunk ebből biztosan?",
    options: [
      "Hogy a harmadik legnagyobb klaszterbe tartozik.",
      "Hogy a K-means a harmadik iterációban sorolta be.",
      "Csak azt, hogy a 3-as sorszámú klaszterbe került; hogy ez milyen csoport, azt a klaszter jellemzői alapján nekünk kell megfogalmaznunk.",
      "Hogy a legértékesebb vásárlók közé tartozik, mert a 3 a legnagyobb sorszám."
    ],
    answer: 2,
    hint: "Ad-e az algoritmus nevet vagy rangsort a klasztereknek?",
    explain: "A klasztercímke önkényes sorszám: nem rangsor, nem méret, nem iterációszám. A gyakorlaton például a 3-as klaszter éppen az alkalmi vásárlóké (átlag 3,48 vásárlás) – a nevet („alkalmi”, „törzsvásárló”) a klaszterprofil alapján mi adjuk. Ráadásul más futásban ugyanez a csoport más sorszámot is kaphat."
  },
  {
    id: "b03-003",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes2",
    type: "single",
    q: "C5 vásárló sorai a tranzakciós táblában (tranzakció, termék, darab, egységár): (T20, kenyér, 2, 500), (T20, sajt, 1, 1800), (T21, kenyér, 1, 500), (T22, tej, 3, 400), (T22, vaj, 1, 900), (T22, kenyér, 1, 500). Mennyi az <code>average_basket_value</code>?",
    options: ["1475 Ft", "kb. 1966,67 Ft", "kb. 983,33 Ft", "kb. 655,56 Ft"],
    answer: 1,
    hint: R`$\text{average\_basket\_value}=\text{total\_spent}/\text{purchase\_count}$ – és a vásárlások száma a különböző tranzakciók száma.`,
    explain: R`$\text{total\_spent}=1000+1800+500+1200+900+500=5900$ Ft, a különböző tranzakciók T20, T21, T22 → 3. Így $5900/3\approx 1966{,}67$ Ft. A 983,33 a sorok számával (6) oszt, a 655,56 a darabszámmal (9), az 1475 a különböző termékek számával (4) – egyik sem a vásárlások száma.`
  },
  {
    id: "b03-004",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes2",
    type: "single",
    q: R`Mit ad vissza vásárlónként ez a sor?<pre><code>df.groupby("customer_id").agg(n=("transaction_id", "count"))</code></pre>`,
    options: [
      "A vásárló különböző tranzakcióinak (vásárlásainak) számát.",
      "A vásárló által vett darabok összegét.",
      "A vásárló különböző termékeinek számát.",
      "A vásárló tételsorainak (termék-sorainak) számát, nem a vásárlásai számát."
    ],
    answer: 3,
    hint: "Mi a különbség a count és a nunique között, ha egy kosár több sorból áll?",
    explain: "A count a nem hiányzó értékeket, vagyis a sorokat számolja. Egy kosár soronként egy terméket tartalmaz, ezért ez a tételsorok száma. A vásárlásszámhoz a gyakorlat kódja (\"transaction_id\", \"nunique\")-t használ; a darabszám (\"quantity\", \"sum\"), a különböző termékek (\"product\", \"nunique\")."
  },
  {
    id: "b03-005",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes3",
    type: "single",
    q: R`Mennyi az euklideszi távolság a $(1;\,4)$ és a $(7;\,-4)$ pont között?`,
    options: ["kb. 3,74", "10", "14", "100"],
    answer: 1,
    hint: R`Különbségek koordinátánként, négyzetre emelés, összeadás – és a gyök a legvégén.`,
    explain: R`$\sqrt{(1-7)^2+(4-(-4))^2}=\sqrt{36+64}=\sqrt{100}=10$. A 14 a Manhattan-távolság ($6+8$), a 100 a négyzetes távolság (gyökvonás nélkül), a 3,74 a $\sqrt{14}$ (a különbségeket nem emelte négyzetre).`
  },
  {
    id: "b03-006",
    topic: "03",
    level: 3,
    ref: "03-kmeans.html#lepes3",
    type: "single",
    q: R`A $P=(0;\,0)$ pontot a K-means hozzárendelési lépése melyik középponthoz sorolja: $M_1=(3;\,3)$, $M_2=(0;\,5)$ vagy $M_3=(4;\,-4)$?`,
    options: [
      R`$M_3$-hoz, mert $d^2=0$, hiszen a különbségek kioltják egymást`,
      "Döntetlen, mert mindhárom középpont azonos távolságra van",
      R`$M_1$-hez, mert $d^2=18$ a legkisebb`,
      R`$M_2$-höz, mert a koordináta-különbségek összege (5) a legkisebb`
    ],
    answer: 2,
    hint: "A K-means a négyzetes euklideszi távolságot használja, nem az abszolút különbségek összegét.",
    explain: R`Négyzetes távolságok: $M_1$: $9+9=18$, $M_2$: $0+25=25$, $M_3$: $16+16=32$ → $M_1$ (távolság $\approx4{,}24$). Az $M_2$ a Manhattan-távolsággal nyerne ($5\lt 6\lt 8$) – ugyanaz a pont más mértékkel más klaszterbe kerülne. Az $M_3$-as opció az előjelek kioltását feltételezi, de a négyzetre emelés miatt előjel nem számít.`
  },
  {
    id: "b03-007",
    topic: "03",
    level: 1,
    ref: "03-kmeans.html#lepes4",
    type: "multi",
    q: R`Mely állítások igazak a gyakorlat kódjára?<pre><code>scaler = StandardScaler()
X_scaled = pd.DataFrame(scaler.fit_transform(X), columns=FEATURES)</code></pre>`,
    options: [
      "A fit_transform egy hívásban kiszámolja az oszlopok átlagát és szórását, és el is végzi a standardizálást.",
      "A scaler.scale_ a populációs szórás (osztó n, ddof=0).",
      "A scaler.mean_ és scaler.scale_ elmentésével a standardizált középpontok később eredeti mértékegységbe alakíthatók.",
      "A scaler.scale_ megegyezik a pandas X.std() alapértelmezett eredményével.",
      "Az X_scaled minden értéke a [0; 1] intervallumba esik."
    ],
    answer: [0, 1, 2],
    hint: "Melyik szórást használja a StandardScaler, és melyiket a pandas alapból? És melyik skálázás szorít [0;1] közé?",
    explain: R`A fit (átlag, szórás megtanulása) és a transform ($z=(x-\mu)/\sigma$) egy lépésben fut; a szórás populációs (5,3127 a vásárlásszámra). A pandas <code>.std()</code> alapból mintaszórást ad (osztó $n-1$: 5,3350), ezért nem egyezik. A $[0;1]$ közé szorítás a min–max skálázás tulajdonsága; a z-értékek nem korlátosak.`
  },
  {
    id: "b03-008",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes4",
    type: "single",
    q: "Egy változó értékei: 3, 5, 7, 9, 11. Mennyi a 11 z-értéke StandardScaler-rel standardizálva?",
    options: ["kb. 1,41", "kb. 1,26", "4", "0,5"],
    answer: 0,
    hint: R`$\mu$ az átlag; a StandardScaler szórása az $n$-nel osztott variancia gyöke.`,
    explain: R`$\mu=7$, eltérésnégyzetek: $16+4+0+4+16=40$, $\sigma=\sqrt{40/5}=\sqrt8\approx2{,}83$. $z=(11-7)/2{,}83\approx1{,}41$. Az 1,26 mintaszórással ($\sqrt{40/4}$) jön ki – ez a pandas <code>.std()</code> alapértelmezése, nem a StandardScaleré. A 4 a nem osztott eltérés, a 0,5 a varianciával (8) osztott érték.`
  },
  {
    id: "b03-009",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes4",
    type: "single",
    q: R`A gyakorlaton az 1-es klaszter középpontjának összköltés-koordinátája $z=-0{,}4321$ (összköltés: $\mu=82\,427{,}83$ Ft, $\sigma=75\,913{,}26$ Ft). Hány forintnak felel meg?`,
    options: ["kb. 82 427 Ft", "kb. −32 802 Ft", "kb. 49 626 Ft", "kb. 115 230 Ft"],
    answer: 2,
    hint: R`Visszaalakítás: $x=\mu+z\cdot\sigma$, figyelj az előjelre.`,
    explain: R`$x=82\,427{,}83+(-0{,}4321)\cdot75\,913{,}26\approx49\,626$ Ft – ez pontosan az 1-es klaszter (átlagos vásárlók) profiljának átlagköltése. A 115 230 előjelhibás ($\mu-z\sigma$), a 82 427 a szórással való szorzást hagyja ki ($\mu+z$), a $-32\,802$ az átlag hozzáadását ($z\sigma$).`
  },
  {
    id: "b03-010",
    topic: "03",
    level: 3,
    ref: "03-kmeans.html#lepes4",
    type: "single",
    q: "Egy kolléga a total_spent oszlopot standardizálás előtt ezer forintra váltja (minden értéket eloszt 1000-rel), majd ugyanúgy StandardScaler + KMeans következik. Mi változik a klaszterezés eredményén?",
    options: [
      "A z-értékek ezerszeresükre nőnek.",
      "Semmi: a z-pontszám nem függ a mértékegységtől, mert az átlag és a szórás is ezredrészére csökken.",
      "A vásárlásszám nagyobb súlyt kap, mert a költés számai kisebbek lettek.",
      "A költés súlya ezredrészére csökken, ezért más klaszterek jönnek ki."
    ],
    answer: 1,
    hint: R`Írd fel $z=(x-\mu)/\sigma$-t, ha minden $x$ helyett $x/1000$ áll.`,
    explain: R`$\dfrac{x/1000-\mu/1000}{\sigma/1000}=\dfrac{x-\mu}{\sigma}$ – a z-érték változatlan, így a távolságok és a klaszterek is. Éppen ezért standardizálunk: nyers adaton a mértékegység-váltás megváltoztatná a legközelebbi szomszédot (a 3. lépés A–B–C példája), standardizált adaton nem. A „súlyváltozás” opciók a nyers adatra lennének igazak.`
  },
  {
    id: "b03-011",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes5",
    type: "single",
    q: R`K-means egy dimenzióban: pontok 1, 2, 6, 8, 9, 15; $k=2$; kezdő középpontok $\mu_1=1$, $\mu_2=2$. Hol lesznek a középpontok, amikor az algoritmus leáll?`,
    options: ["1 és 8", "5,2 és 15", "1,5 és 8,5", "1,5 és 9,5"],
    answer: 3,
    hint: "Minden iterációban: besorolás a közelebbi középponthoz, majd klaszterátlag. Addig ismételd, amíg a besorolás nem változik.",
    explain: R`1. {1} | {2, 6, 8, 9, 15} → 1 és 8. 2. a 2: $|2-1|=1\lt 6$ → {1, 2} | {6, 8, 9, 15} → 1,5 és 9,5. 3. nincs változás → leáll. Az „1 és 8” az első frissítés után megáll, pedig a besorolás még változik. Az „5,2 és 15” a {1, 2, 6, 8, 9} | {15} felosztás középpontjai – ehhez az algoritmus innen nem jut el. Az „1,5 és 8,5” a klaszterek mediánja ({6, 8, 9, 15} mediánja 8,5) – K-means-ben az átlag számít.`
  },
  {
    id: "b03-012",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes5",
    type: "single",
    q: R`Pontok: $A(0;1)$, $B(2;2)$, $C(4;5)$, $D(6;4)$, $E(3;0)$. Középpontok: $M_1=(1;1)$, $M_2=(5;5)$. Hová kerülnek a középpontok <em>egy</em> hozzárendelés + frissítés után?`,
    options: [
      R`$M_1\approx(1{,}67;\,1)$, $M_2=(5;\,4{,}5)$`,
      R`$M_1=(1;\,1)$, $M_2=(5;\,5)$`,
      R`$M_1=(1{,}5;\,1)$, $M_2\approx(5;\,4{,}67)$`,
      R`$M_1=(2;\,1)$, $M_2=(5;\,4{,}5)$`
    ],
    answer: 0,
    hint: "Előbb négyzetes távolságok mindkét középponttól, aztán a klaszter pontjainak koordinátánkénti átlaga.",
    explain: R`Négyzetes távolságok ($M_1$ | $M_2$): A 1 | 41, B 2 | 18, C 25 | 1, D 34 | 2, E 5 | 29 → {A, B, E} és {C, D}. Új középpontok: $\big(\tfrac{0+2+3}{3};\tfrac{1+2+0}{3}\big)\approx(1{,}67;1)$ és $\big(\tfrac{4+6}{2};\tfrac{5+4}{2}\big)=(5;4{,}5)$. A $(1;1)$, $(5;5)$ kihagyja a frissítést; a $(1{,}5;1)$, $(5;4{,}67)$ a régi középpontot is beátlagolja; a $(2;1)$ a mediánnal számol – K-means-ben mindig a pontok átlaga az új középpont.`
  },
  {
    id: "b03-013",
    topic: "03",
    level: 1,
    ref: "03-kmeans.html#lepes5",
    type: "match",
    q: "Párosítsd a scikit-learn KMeans elemeit a jelentésükkel!",
    pairs: [
      ["init=\"k-means++\" (alapértelmezés)", "a további kezdő középpontokat a már kiválasztottaktól távoli pontok közül nagyobb eséllyel húzza"],
      ["init=\"random\"", "a klasszikus, véletlen kezdőpont-választás"],
      ["max_iter=300", "egy futás iterációinak felső korlátja"],
      ["tol=1e-4", "leállási tolerancia: ennél kisebb középpont-elmozdulásnál megáll"],
      ["predict()", "új pontot a legközelebbi középpont klaszterébe sorol"]
    ],
    hint: "Kettő a kezdőpontokról szól, kettő a leállásról, egy az új adatokról.",
    explain: "A k-means++ ritkábban vezet rossz lokális optimumhoz, mint a tisztán véletlen kezdés. A max_iter és a tol a PDF álkódjának két leállási feltétele (iterációszám, elmozdulás ≤ ε). A predict a K-means nagy előnye: a tanító adat középpontjaihoz sorolja az új (ugyanúgy standardizált) pontot."
  },
  {
    id: "b03-014",
    topic: "03",
    level: 3,
    ref: "03-kmeans.html#lepes5",
    type: "multi",
    q: "Mely állítások igazak a K-means algoritmusra?",
    options: [
      "A pontokat egyenlő méretű klaszterekbe osztja (a gyakorlaton ezért lett 40–40–40).",
      "Leálláskor lokális optimumban van; a globálisan legkisebb inertia nem garantált.",
      "Sem a hozzárendelés, sem a középpont-frissítés nem növeli az inertiát.",
      "Érzékeny a kiugró értékekre, mert a középpont átlag.",
      "Hosszúkás, egymásba csavarodó csoportokat is jól szétválaszt."
    ],
    answer: [1, 2, 3],
    hint: "Gondold végig, mit minimalizál a két lépés, és mi a középpont definíciója. Mire nincs feltétele az algoritmusnak?",
    explain: "A hozzárendelés a legközelebbi középpontot választja, az átlag a négyzetes eltérésösszeget minimalizálja, így az inertia nem nő – ezért áll meg, de csak lokális optimumban. Az átlagot egy kiugró érték elhúzza. A K-means gömbszerű, hasonló kiterjedésű csoportokat talál jól, elnyújtottakat nem. A klaszterméretre nincs feltétele: a 40–40–40 a szintetikus adat tulajdonsága (k = 2-nél 80 + 40, k = 4-nél 40 + 19 + 40 + 21)."
  },
  {
    id: "b03-015",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes6",
    type: "single",
    q: R`Klaszterek: $C_1=\{(1;1),\,(3;1)\}$ és $C_2=\{(6;2),\,(6;6),\,(9;4)\}$. Mennyi az inertia?`,
    options: ["4", "16", "kb. 8,47", "3,2"],
    answer: 1,
    hint: "Középpont = koordinátánkénti átlag; utána a négyzetes távolságok összege, mindkét klaszterre.",
    explain: R`Középpontok $(2;1)$ és $(7;4)$. $C_1$: $1+1=2$; $C_2$: $(1+4)+(1+4)+(4+0)=14$. $W=16$. A 8,47 a gyökös (sima) távolságok összege, a 3,2 az átlagos négyzetes távolság ($16/5$), a 4 a $\sqrt{16}$ – az inertia a négyzetes távolságok <em>összege</em>.`
  },
  {
    id: "b03-016",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes6",
    type: "single",
    q: "200 vásárlót 3 változó alapján klaszterezünk, StandardScaler-rel standardizált adaton. Mennyi az inertia k = 1 esetén?",
    options: ["597", "200", "3", "600"],
    answer: 3,
    hint: "k = 1-nél a középpont az összes pont átlaga (a standardizált térben az origó). Mennyi egy standardizált változó négyzetes eltéréseinek összege?",
    explain: R`Minden standardizált változóra $\sum_i z_i^2=n\cdot\sigma^2=n$ (populációs szórás = 1), így $W=n\cdot p=200\cdot3=600$ – a gyakorlaton $120\cdot2=240$. Az 597 a $(n-1)\cdot p$, ez mintaszórással lenne igaz, de a StandardScaler $n$-nel oszt. A 200 és a 3 csak az egyik tényező.`
  },
  {
    id: "b03-017",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes7",
    type: "single",
    q: R`Pontok: 1, 2, 9, 10, 17, 18; $k=3$; kezdő középpontok 1, 2 és 13. Mennyi az inertia, amikor a K-means leáll?`,
    options: ["16,25", "65", "1,5", "16"],
    answer: 1,
    hint: "Sorold be a pontokat, frissíts – és nézd meg, változik-e még valami.",
    explain: R`Besorolás: {1} | {2} | {9, 10, 17, 18} (a 9: $|9-2|=7\gt|9-13|=4$). Új középpontok 1, 2, 13,5 – a besorolás nem változik, leáll. $W=0+0+(4{,}5^2+3{,}5^2+3{,}5^2+4{,}5^2)=65$. Ez rossz lokális optimum: az 1,5 a {1, 2} | {9, 10} | {17, 18} felosztásé, amit jó kezdéssel kapnánk. A 16 az abszolút eltérések összege, a 16,25 az átlagos négyzetes eltérés.`
  },
  {
    id: "b03-018",
    topic: "03",
    level: 3,
    ref: "03-kmeans.html#lepes7",
    type: "single",
    q: R`A gyakorlat adatán valaki <code>KMeans(n_clusters=3, init="random", n_init=1)</code>-et futtat, és 37,59-es inertiát kap, egy 80 fős klaszterrel. Mi a helyes teendő?`,
    options: [
      "k-t 2-re csökkenteni, mert a 80 fős klaszter azt mutatja, hogy csak két csoport van.",
      "Tíz futást végezni, és a kapott klasztercímkéket vásárlónként átlagolni.",
      "Több indítás (pl. n_init=10): a legkisebb inertiájú futás marad meg, ami itt a 17,02-es, 40–40–40 fős megoldás.",
      "Elfogadni, mert az algoritmus konvergált, tehát ez az optimum."
    ],
    answer: 2,
    hint: "A konvergencia csak lokális optimumot garantál. Mi csökkenti a beragadás esélyét?",
    explain: "A gyakorlaton 10 véletlenmagból 3 ilyen rossz lokális optimumba ragadt (37,59), 7 a 17,02-es megoldást adta; n_init=10-zel a legjobb futás marad. A konvergencia nem jelent globális optimumot. A k csökkentése a rossz futás tünetét kezelné, nem az okát. Címkéket átlagolni nem lehet, mert a sorszámok futásonként felcserélődhetnek."
  },
  {
    id: "b03-019",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes8",
    type: "single",
    q: "Inertiák k = 1…6-ra: 200, 90, 40, 33, 28, 24. Hol a könyök?",
    options: ["k = 2", "k = 4", "k = 6", "k = 3"],
    answer: 3,
    hint: "Számold ki az egymás utáni csökkenéseket, és keresd, hol lassul le jelentősen.",
    explain: "Csökkenések: 110, 50, 7, 5, 4. A 3. klaszter még 50-et hoz, a 4. már csak 7-et → a görbe k = 3-nál törik meg. A k = 2 a legnagyobb egyedi csökkenés helye, de utána is még nagy a javulás; a k = 6 a legkisebb inertia, ami mindig a legnagyobb k-nál van."
  },
  {
    id: "b03-020",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#lepes8",
    type: "multi",
    q: "Mely állítások igazak a gyakorlat könyökgörbéjére (k = 1…8, standardizált adat)?",
    options: [
      R`A $k=1$-es inertia 240, ami $n\cdot p=120\cdot 2$.`,
      R`A $k=1\to2$ lépésben az inertia kb. 81%-kal csökken.`,
      "A könyök nem egyértelmű: k = 2-nél nagy, k = 3-nál kisebb törés van, mindkettőt meg kell nézni.",
      "A könyök egyértelműen k = 4-nél van.",
      "A k = 8 a legjobb, mert ott a legkisebb az inertia (2,88)."
    ],
    answer: [0, 1, 2],
    hint: "A táblázat: 240,00; 46,30; 17,02; 8,31; 6,14; … Számold ki az első relatív csökkenést.",
    explain: R`$(240-46{,}30)/240\approx 80{,}7\%$. A nagy törés $k=2$-nél, egy kisebb $k=3$-nál van (utána csak 8,7 a csökkenés) – az oktató szerint ez „sosem egyértelmű”. A $k=4$ után a csökkenés már kicsi (2,17), ott nincs törés. A legkisebb inertia mindig a legnagyobb $k$-nál van, ezért nem választási szempont.`
  },
  {
    id: "b03-021",
    topic: "03",
    level: 3,
    ref: "03-kmeans.html#lepes9",
    type: "single",
    q: R`Egy dimenzióban három klaszter: $A=\{0,1,5\}$, $B=\{8,10\}$, $C=\{-6\}$. Mennyi az 5-ös pont sziluettértéke?`,
    options: ["kb. 0,11", "−0,125", "kb. −0,11", "kb. 0,29"],
    answer: 2,
    hint: R`$b(i)$ a <em>legkisebb</em> átlagos távolság egy másik klaszter pontjaitól – klaszterenként külön számold.`,
    explain: R`$a=(5+4)/2=4{,}5$. Átlagos távolság $B$-től: $(3+5)/2=4$, $C$-től: 11 → $b=\min=4$. $s=(4-4{,}5)/\max(4{,}5;4)\approx-0{,}11$: az 5-ös a $B$-hez van közelebb, rossz helyen van. A 0,29 a $B$ és $C$ összes pontjára átlagolt $b$-vel jön ki (6,33), a 0,11 felcserélt $a$ és $b$, a $-0{,}125$ mindig $b$-vel oszt $\max(a,b)$ helyett.`
  },
  {
    id: "b03-022",
    topic: "03",
    level: 1,
    ref: "03-kmeans.html#lepes9",
    type: "match",
    q: "Párosítsd a sziluettel kapcsolatos helyzeteket a jelentésükkel!",
    pairs: [
      [R`$s(i)\approx 1$`, R`a pont jól elkülönülő klaszterben, jó helyen van ($a\ll b$)`],
      [R`$s(i)\approx 0$`, R`a pont két klaszter határán van ($a\approx b$)`],
      [R`$s(i)\lt 0$`, "a pont a szomszéd klaszterhez van közelebb, kedvezőtlen a besorolása"],
      ["k = 1", "a sziluett nem értelmezhető, mert nincs másik klaszter"],
      ["egyelemű klaszter pontja", "a scikit-learn s = 0-t ad rá"]
    ],
    hint: R`$s=(b-a)/\max(a,b)$ – mi történik, ha $a$ sokkal kisebb, egyenlő, illetve nagyobb $b$-nél?`,
    explain: R`$a\ll b$ esetén $s=1-a/b\approx1$; $a=b$-nél 0; $a\gt b$-nél negatív. $k=1$-nél $b$ nem létezik (a gyakorlat kódja ezért ad np.nan-t). Egyelemű klaszternél $a$ nem értelmezhető, a scikit-learn ilyenkor 0-t ad.`
  },
  {
    id: "b03-023",
    topic: "03",
    level: 2,
    ref: "03-kmeans.html#alkalmazas",
    type: "single",
    q: R`A gyakorlat <code>KMeans(n_clusters=3, n_init=10, random_state=42)</code> modelljének illesztése után mit ad vissza a <code>model.cluster_centers_.shape</code>?`,
    options: ["(3,)", "(3, 2)", "(2, 3)", "(120, 2)"],
    answer: 1,
    hint: "Hány középpont van, és hány koordinátája van egy középpontnak?",
    explain: "Soronként egy középpont (3 klaszter), oszloponként egy változó (purchase_count, total_spent) → (3, 2), standardizált értékekkel. A (2, 3) transzponált; a (120, 2) a bemeneti X_scaled alakja; a (3,) egy klaszterenkénti egyetlen érték lenne (a címkevektor viszont (120,))."
  },
  {
    id: "b03-024",
    topic: "03",
    level: 3,
    ref: "03-kmeans.html#alkalmazas",
    type: "multi",
    q: "Mely következtetések helyesek a gyakorlat K-means eredményeiből?",
    options: [
      "A törzsvásárlók kosaranként kevesebbet költenek, csak gyakrabban járnak.",
      "k = 2-nél a törzsvásárlók és az átlagos vásárlók kerülnek egy 80 fős csoportba.",
      "k = 4-nél a nagy költők 40 fős csoportja 19 + 21 főre esik szét, amit nehéz üzletileg megmagyarázni.",
      "Standardizálás nélkül ezen az adaton szinte ugyanaz jönne ki, mert a két változó erősen együtt mozog (r ≈ 0,95) – ez szerencse, nem szabály.",
      "A visszaskálázott középpontok első két koordinátája megegyezik a klaszterprofil átlagos vásárlásszámával és átlagköltésével."
    ],
    answer: [2, 3, 4],
    hint: "Gondolj a klaszterprofil kosárérték-oszlopára (11 562 / 5 299 / 3 758 Ft) és arra, melyik két csoport van közelebb egymáshoz.",
    explain: "A középpont a klaszter átlaga, az átlag pedig „átmegy” a lineáris visszaalakításon, ezért egyezik a profillal. A törzsvásárlók kosárértéke kb. kétszerese az átlagosakénak, háromszorosa az alkalmiakénak – nem kevesebb. k = 2-nél az alkalmi és az átlagos vásárlók vonódnak össze (80 fő), a törzsvásárlók (40 fő) külön maradnak."
  },
  {
    id: "b03-025",
    topic: "03",
    level: 1,
    ref: "03-kmeans.html#alkalmazas",
    type: "match",
    q: "Párosítsd a K-means munkafolyamat lépéseit a gyakorlat eszközeivel!",
    pairs: [
      ["aggregálás (egy sor = egy vásárló)", "groupby(\"customer_id\").agg(...)"],
      ["standardizálás", "StandardScaler().fit_transform(X)"],
      ["klaszterezés rögzített k-val", "KMeans(n_clusters=3, n_init=10, random_state=42).fit_predict(X_scaled)"],
      ["a klaszterszám kiválasztása", "inertia_ és silhouette_score több k-ra"],
      ["jellemzés eredeti mértékegységben", "groupby(\"cluster\") a nem standardizált táblán (klaszterprofil)"]
    ],
    hint: "A hüvelykujjszabály sorrendje: aggregálás → standardizálás → K-means több k-val → könyök + sziluett → jellemzés.",
    explain: "Ez a gyakorlat öt feladata. A jellemzéshez a címkéket visszakapcsoljuk (merge) az eredeti vásárlói táblához, és klaszterenként átlagolunk – így a modellben nem szereplő változók (darab, kosárérték) is leírhatók."
  }
);
