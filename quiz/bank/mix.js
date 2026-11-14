/* Vizsgagyakorló kérdésbank – vegyes, témákon átívelő kérdések (módszer-, mutató- és lépésválasztás) */

BANK.push(
  // ---------- Felügyelt vs. felügyelet nélküli ----------
  {
    id: "bmix-001",
    topic: "mix",
    level: 1,
    ref: "01-adattisztitas.html#lepes1",
    type: "single",
    q: "Melyik feladat <strong>felügyelt</strong> tanulás?",
    options: [
      "Egy webáruház a vásárlóit a költés és a vásárlásszám alapján csoportokba rendezi, előre nem tudja, milyen csoportok lesznek.",
      "Egy szupermarket azt keresi, mely termékeket teszik gyakran egy kosárba.",
      "Egy streamingszolgáltató a múltbeli előfizetők adataiból (lemondta / maradt) modellt épít, ami az új előfizetőkről megbecsüli, lemondják-e.",
      "Egy könyvelő SQL-lel minden havi sor mellé kiírja az év eleje óta halmozott bevételt."
    ],
    answer: 2,
    hint: "Van-e ismert célváltozó (címke) a múltbeli példákban, amit a modellnek meg kell tanulnia?",
    explain: R`A lemondás előrejelzésénél a múltbeli példákban ismert a célváltozó (lemondta / maradt), a modell az $X \to y$ hozzárendelést tanulja: felügyelt tanulás (osztályozás). A szegmentálás (klaszterezés) és a kosárelemzés felügyelet nélküli – nincs címke. A halmozott bevétel SQL-lel nem tanulás, hanem leíró számítás (ablakfüggvény).`
  },
  {
    id: "bmix-002",
    topic: "mix",
    level: 1,
    ref: "08-osszefoglalas.html#dontes",
    type: "multi",
    q: "Mely módszerek tartoznak a <strong>felügyelet nélküli</strong> tanuláshoz (a tárgy beosztása szerint)?",
    options: [
      "K-means",
      "Hierarchikus klaszterezés (HAC)",
      "Apriori + asszociációs szabályok",
      "Döntési fa",
      "MLP neurális háló"
    ],
    answer: [0, 1, 2],
    hint: "Melyik módszerhez nem kell célváltozó (y)?",
    explain: R`A K-means és a HAC címke nélkül, a hasonlóság alapján csoportosít; a kosárelemzés is felügyelet nélküli (tágabb értelemben), mert nincs kijelölt célváltozó, csak együttes előfordulásokat keres. A döntési fa és az MLP ismert címkéjű példákból tanul – felügyelt osztályozás.`
  },
  {
    id: "bmix-003",
    topic: "mix",
    level: 2,
    ref: "01-adattisztitas.html#lepes1",
    type: "single",
    q: "Egy kolléga a K-means-szel kapott három vásárlói klaszterre konfúziós mátrixot és pontosságot (accuracy) akar számolni. Mi a gond?",
    options: [
      "Semmi, a konfúziós mátrix bármilyen modellre kiszámolható.",
      "Nincs valódi címke, amivel a klasztereket össze lehetne vetni; a minőséget belső mutatókkal (silhouette, inertia) és szakmai értelmezéssel kell megítélni.",
      "A konfúziós mátrixhoz előbb standardizálni kell a klasztercímkéket.",
      "Csak két klaszter esetén számolható konfúziós mátrix, háromnál nem."
    ],
    answer: 1,
    hint: "Mihez hasonlítja a konfúziós mátrix a modell kimenetét?",
    explain: R`A konfúziós mátrix a jósolt címkét a <em>valódi</em> címkével veti össze – felügyelet nélküli tanulásnál ilyen nincs. Ezért klaszterezésnél belső mutatók (silhouette, inertia, dendrogram-rés) és a klaszterek eredeti mértékegységben való értelmezése a mérce. Nem a klaszterszám a gond: többosztályos konfúziós mátrix is létezik, ha van valódi címke.`
  },

  // ---------- Melyik módszer melyik kérdésre ----------
  {
    id: "bmix-004",
    topic: "mix",
    level: 2,
    ref: "08-osszefoglalas.html#dontes",
    type: "single",
    q: "Egy vezető ezt kéri: „A havi bevételi táblában minden hónap mellett legyen ott, mennyivel több vagy kevesebb az előző hónapnál, és hogy hányadik legjobb hónap volt.” Mi a megfelelő eszköz?",
    options: [
      "Döntési fa, mert a „jobb / rosszabb hónap” egy osztályozási feladat.",
      "K-means, a hónapokat „jó” és „rossz” klaszterbe sorolva.",
      "SQL ablakfüggvények: <code>bevetel - LAG(bevetel) OVER (ORDER BY honap)</code> és <code>RANK() OVER (ORDER BY bevetel DESC)</code>.",
      "<code>GROUP BY honap</code> egy <code>SUM(bevetel)</code>-lel."
    ],
    answer: 2,
    hint: "Kell-e itt bármit tanulni vagy jósolni? Vagy csak minden sor mellé egy másik sorból vagy a teljes táblából számolt értéket kell írni?",
    explain: R`Ez leíró riport, nem modellezés: az előző sor értéke (LAG) és a rangsor (RANK) kell, a sorok megtartásával – ablakfüggvény. Nincs célváltozó, amit egy fa megtanulhatna, és nincs szegmentálási kérdés. A <code>GROUP BY honap</code> hónaponként egy sort adna, de az előző hónap értékét és a rangot nem.`
  },
  {
    id: "bmix-005",
    topic: "mix",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes5",
    type: "single",
    q: "Egy bank 200 000 ügyfelét kell szegmentálni öt numerikus jellemző alapján, és a később érkező új ügyfeleket is a meglévő szegmensekbe kell sorolni. Melyik módszer illik ide jobban?",
    options: [
      "HAC Ward-kapcsolással, mert determinisztikus.",
      "K-means standardizált változókon, az új ügyfelekre <code>predict</code> ugyanazzal a skálázással.",
      "Döntési fa a szegmensekre mint célváltozóra.",
      "Apriori, az ügyféljellemzőket „termékeknek” tekintve."
    ],
    answer: 1,
    hint: "Két szempont: mekkora a HAC távolságmátrixa ennyi pontnál, és melyik módszernek van besoroló szabálya új pontra?",
    explain: R`A HAC $n^2$-es távolságmátrixa 200 000 pontnál ($\approx 2\cdot 10^{10}$ pár) nem fér a memóriába, és a sklearn <code>AgglomerativeClustering</code>-nek nincs <code>predict</code>-je. A K-means iterációnként csak $n\cdot k$ távolságot számol, és az új ügyfelet a legközelebbi középponthoz sorolja. Döntési fához kellene ismert címke; az Apriori kosarakon (jelenlét/hiány) dolgozik, nem numerikus jellemzőkön.`
  },
  {
    id: "bmix-006",
    topic: "mix",
    level: 3,
    ref: "08-osszefoglalas.html#dontes",
    type: "single",
    q: "Egy webáruház tranzakciós táblája (egy sor = egy tétel) alapján meg akarja jósolni, mely ügyfelek mondják le a hűségprogramot. A múltbeli lemondások ismertek, és az ügyfélszolgálatnak minden figyelmeztetést meg kell tudnia indokolni. Melyik terv a legjobb?",
    options: [
      "K-means a tranzakciós sorokon, a „lemondók” klaszterét kiválasztva; mérőszám: silhouette.",
      "MLP a nyers tranzakciós sorokon; mérőszám: a tanítási veszteség.",
      "Ügyfelenkénti aggregálás, rétegzett tanító/teszt felosztás, döntési fa; mérőszám: konfúziós mátrix, precision, recall, összevetve a többségi alapmodellel.",
      "Apriori a lemondott ügyfelek kosarain; mérőszám: lift."
    ],
    answer: 2,
    hint: "Van címke → osztályozás. A jóslás egysége az ügyfél, nem a tétel. Mi a fontosabb: a nyers teljesítmény vagy az indokolhatóság?",
    explain: R`Ismert célváltozó (lemondta-e) → felügyelt osztályozás. Előbb egy sor = egy ügyfél aggregálás kell (mint a K-means-leckében), majd rétegzett felosztás. Az indokolhatóság miatt a döntési fa illik (kiolvasható szabályok); az értékelés a teszten, az alapmodellhez mérve történik. A tanítási veszteség nem mutatja az új adaton nyújtott teljesítményt; a K-means és az Apriori nem használja a címkét.`
  },
  {
    id: "bmix-007",
    topic: "mix",
    level: 2,
    ref: "01-adattisztitas.html#lepes6",
    type: "single",
    q: "A vezető „a tipikus havi költést” kérdezi a vásárlókról. A költés eloszlása erősen jobbra ferde, néhány nagyon nagy költővel. Mit adsz meg?",
    options: [
      "A mediánt (leíró statisztika), mert a kiugró nagy értékek nem húzzák el.",
      "Az átlagot, mert az minden értéket figyelembe vesz.",
      "A K-means legnagyobb klaszterének középpontját.",
      "A móduszt, mert numerikus változónál mindig az a tipikus érték."
    ],
    answer: 0,
    hint: "Ez nem modellezési kérdés. Melyik középérték robusztus a kiugró értékekre?",
    explain: R`Egy „tipikus érték” kérdésre leíró statisztika felel. Ferde eloszlásnál a medián robusztus, az átlagot a néhány nagy költő felfelé húzza (a 08. lecke példájában az átlag 9,86, a medián 7). Klaszterezés ide fölösleges; a módusz folytonos, sokféle értékű változónál nem informatív.`
  },
  {
    id: "bmix-008",
    topic: "mix",
    level: 2,
    ref: "01-adattisztitas.html#lepes9",
    type: "match",
    q: "Feltáró elemzés: párosítsd a vizsgálandó változó(ka)t a megfelelő eszközzel!",
    pairs: [
      ["két numerikus változó (pl. vásárlásszám és összköltés)", "korreláció + pontdiagram"],
      ["egy kategorikus és egy numerikus (pl. szak és vizsgapont)", "csoportonkénti átlag/medián + csoportonkénti boxplot"],
      ["két kategorikus (pl. régió és fizetési mód)", "kereszttábla (pd.crosstab)"],
      ["egyetlen numerikus változó eloszlása", "hisztogram, boxplot, kvartilisek"]
    ],
    hint: "Egyváltozós vagy kétváltozós? Ha kétváltozós: milyen típusúak a változók?",
    explain: R`Numerikus–numerikus: korreláció és pontdiagram. Kategorikus–numerikus: <code>groupby(kat)[num].agg(["mean","median"])</code> és csoportonkénti boxplot. Kategorikus–kategorikus: kereszttábla (sor- vagy oszlopszázalékkal). Egy változó eloszlása: hisztogram, boxplot. A féléves feladat mindkét fajta elemzést (egy- és kétváltozós) kéri, ábrákkal.`
  },

  // ---------- Melyik mérőszám mit mér ----------
  {
    id: "bmix-009",
    topic: "mix",
    level: 1,
    ref: "08-osszefoglalas.html#kepletek",
    type: "match",
    q: "Párosítsd a mérőszámot azzal, amit mér!",
    pairs: [
      ["lift", "mennyivel gyakoribb két termék együtt, mint függetlenség esetén"],
      ["silhouette", "egy pont mennyivel van közelebb a saját klaszteréhez, mint a legközelebbi másikhoz"],
      ["inertia", "a pontok saját középponttól vett négyzetes távolságainak összege"],
      ["Gini-index", "egy döntésifa-csomópont osztálykevertsége"],
      ["recall (érzékenység)", "a valódi pozitívak közül hányat talált meg a modell"],
      ["log-loss", "a jósolt valószínűségek büntetése, a magabiztos tévedés a legdrágább"]
    ],
    hint: "Melyik leckéből jön: kosárelemzés, klaszterezés, döntési fa vagy neurális háló?",
    explain: R`Lift $=\mathrm{supp}(A\cup B)/(\mathrm{supp}(A)\,\mathrm{supp}(B))$, 1 a függetlenség. Silhouette $=(b-a)/\max(a,b)$. Inertia: klaszteren belüli négyzetösszeg, $k$-val mindig csökken. Gini $=1-\sum p_i^2$, 0 a tiszta csomópont. Recall $=TP/(TP+FN)$. Log-loss: $-[y\ln\hat p+(1-y)\ln(1-\hat p)]$, magabiztos rossz becslésnél nagyon nagy.`
  },
  {
    id: "bmix-010",
    topic: "mix",
    level: 2,
    ref: "05-dontesi-fa.html#lepes6",
    type: "match",
    q: "Párosítsd a helyzetet azzal a mérőszámmal, amelyre leginkább figyelni kell!",
    pairs: [
      ["Minden csalást el kell kapni, egy téves riasztás olcsó (egy telefonhívás).", "recall"],
      ["A pozitívnak jelöltekre drága kampány indul, csak biztos jelöltek kellenek.", "precision"],
      ["Az osztályok erősen kiegyensúlyozatlanok, és mindkettő felismerése egyformán fontos.", "balanced accuracy"],
      ["Egyetlen szám kell, ami a precisiont és a recallt egyszerre bünteti, ha valamelyik alacsony.", "F1"],
      ["A modell valószínűséget ad, és a magabiztos tévedést kell büntetni.", "log-loss"]
    ],
    hint: "Melyik hiba drága: az elszalasztás (FN) vagy a téves riasztás (FP)? Kiegyensúlyozatlan osztályoknál mit takar el az accuracy?",
    explain: R`Drága az elszalasztás → recall $=TP/(TP+FN)$. Drága a téves riasztás → precision $=TP/(TP+FP)$. Kiegyensúlyozatlan osztályoknál az accuracy félrevezet (a 0,724-es fa = 0,724-es alapmodell), az osztályonkénti recallok átlaga (balanced accuracy) igazságosabb. F1: a kettő harmonikus átlaga. Log-loss: a valószínűségi becslés minősége.`
  },
  {
    id: "bmix-011",
    topic: "mix",
    level: 1,
    ref: "03-kmeans.html#lepes8",
    type: "single",
    q: "Melyik mutató az, amely a paraméter (klaszterszám) növelésével <em>mindig</em> csökken, ezért a legkisebb értéke alapján nem szabad választani?",
    options: ["silhouette", "lift", "inertia", "recall"],
    answer: 2,
    hint: "Mennyi lenne ez a mutató, ha minden pont külön klaszter lenne ($k=n$)?",
    explain: R`Az inertia (klaszteren belüli négyzetösszeg) $k$ növelésével mindig csökken, $k=n$-nél 0. Ezért a könyökmódszer azt nézi, hol lassul a csökkenés, nem azt, hol a legkisebb. A silhouette nem monoton – épp ezért alkalmas $k$ választására (a legnagyobbat keressük). A lift és a recall nem klaszterezési mutató.`
  },
  {
    id: "bmix-012",
    topic: "mix",
    level: 3,
    ref: "03-kmeans.html#lepes9",
    type: "single",
    q: "A K-means-gyakorlaton a silhouette $k=2$-nél csak 0,001-gyel nagyobb, mint $k=3$-nál, a könyök nem egyértelmű (nagy törés $k=2$-nél, kisebb $k=3$-nál). Mi a helyes eljárás?",
    options: [
      "Mindig a legnagyobb silhouette-ű $k$-t kell választani, tehát csak a $k=2$ fogadható el.",
      "A legkisebb inertiájú $k$-t kell választani, tehát $k=8$-at.",
      "Mindkét $k$ védhető; a pontdiagram és a klaszterek értelmezhetősége (eredeti mértékegységben) dönt, és a választást indokolni kell.",
      "$k=1$-et, mert ott a silhouette nem értelmezhető, így nincs mit mérlegelni."
    ],
    answer: 2,
    hint: "A mutatók javaslatot adnak, nem ítéletet. Mit mondott a gyakorlat a $k=3$ csoportjairól?",
    explain: R`Ilyen kis különbség döntetlennek számít. A gyakorlaton $k=3$ három értelmes csoportot adott (alkalmi, átlagos, törzsvásárló), $k=2$ összevonta az alkalmi és az átlagos vásárlókat (80 fő) – a HAC-leckében viszont $k=2$ lett a választás (legnagyobb rés 12,03). A legkisebb inertia mindig a legnagyobb $k$, ez nem szempont; $k=1$ nem klaszterezés.`
  },

  // ---------- Standardizálás ----------
  {
    id: "bmix-013",
    topic: "mix",
    level: 3,
    ref: "08-osszefoglalas.html#parok",
    type: "multi",
    q: "Mely állítások igazak a standardizálásról ($z=(x-\\mu)/\\sigma$) a tárgy módszereinél?",
    options: [
      "K-means és HAC előtt azért kell, mert az euklideszi távolságot különben a nagy nagyságrendű változó (pl. forintban mért költés) uralná.",
      "MLP-nél a μ-t és σ-t csak a tanítóhalmazon szabad kiszámolni, és ugyanazzal kell a tesztet és az új adatot átalakítani.",
      "Döntési fánál nem szükséges, mert a fa egy-egy változón küszöböt keres, és ezt a skálázás nem változtatja meg.",
      "A standardizálás normális eloszlásúvá teszi a változókat.",
      "Standardizálás után minden érték a [−1; 1] intervallumba esik."
    ],
    answer: [0, 1, 2],
    hint: "Melyik módszer számol távolságot vagy gradienst, és melyik csak küszöbvágást? Mit változtat meg a standardizálás az eloszlás alakján?",
    explain: R`Távolságalapú módszereknél (K-means, HAC) a közös skála biztosítja, hogy minden változó hasonló súllyal számítson; az MLP gradiens-alapú tanulását is segíti, de szivárgásmentesen (fit a tanítón, transform a többin). A döntési fa egy változón vág, a lineáris átskálázás csak a küszöb számértékét tolja el – a gyakorlat kódja is jelzi: fához nem kell. A standardizálás az eloszlás alakját nem változtatja (nem lesz normális), és a z-értékek nincsenek $[-1;1]$-be zárva (pl. $z=2{,}5$).`
  },
  {
    id: "bmix-014",
    topic: "mix",
    level: 2,
    ref: "06-neuralis-halo.html#lepes7",
    type: "single",
    q: R`A tanítóhalmazon egy változó átlaga $\mu=50$, szórása $\sigma=10$. A teszthalmazon ugyanennek a változónak az átlaga 55, a szórása 5. Egy teszthallgató értéke 65. Mi lesz a standardizált értéke a helyes eljárással?`,
    options: ["2,0", "1,5", "0,15", "15"],
    answer: 1,
    hint: "Melyik halmaz paramétereivel alakítjuk át a tesztet: <code>scaler.transform</code> vagy új <code>fit_transform</code>?",
    explain: R`A tesztet a tanítóhalmaz paramétereivel kell átalakítani (<code>scaler.transform(X_test)</code>): $z=(65-50)/10=1{,}5$. A 2,0 a teszt saját paramétereivel jön ki ($(65-55)/5$) – ez az újraillesztés hibája (adatszivárgás, eltérő skála). A 15 a szórással való osztás elfelejtése, a 0,15 kétszeri osztás.`
  },

  // ---------- Adatszivárgás, felosztás ----------
  {
    id: "bmix-015",
    topic: "mix",
    level: 3,
    ref: "08-osszefoglalas.html#parok",
    type: "multi",
    q: "Melyik eljárás okoz adatszivárgást vagy torzítottan optimista teljesítménybecslést?",
    options: [
      "A StandardScaler-t a teljes adathalmazon illesztjük, és csak utána osztjuk fel tanító- és teszthalmazra.",
      "Egy előfizetés-lemondási modell bemenetei közé felvesszük a „lemondás dátuma” oszlopot.",
      "Több famélységet kipróbálunk, a teszten legjobbat választjuk, és ugyanezt a teszt-accuracy-t jelentjük végső eredményként.",
      "A felosztásnál <code>stratify=y</code>-t használunk.",
      "Az azonosító oszlopot (student_id) kihagyjuk a bemenetek közül."
    ],
    answer: [0, 1, 2],
    hint: "Szivárgás: a modell olyan információt kap, ami a célváltozóból jön, vagy a jóslás idején / a tanítás során nem állna rendelkezésre.",
    explain: R`A teljes adaton illesztett scaler a teszt átlagát és szórását is „látja”. A lemondás dátuma a célváltozó egy másik alakja, és a jóslás idején még nem ismert (mint az exam_score a passed-hez). A teszten hangolt, majd ugyanott mért pontosság optimista: a teszt már részt vett a döntésben – erre a keresztvalidáció a tanítóhalmazon való. A rétegzett felosztás és az azonosító elhagyása helyes lépés.`
  },
  {
    id: "bmix-016",
    topic: "mix",
    level: 2,
    ref: "05-dontesi-fa.html#lepes2",
    type: "single",
    q: "200 ügyfél, közülük 60 lemondó (30%). <code>train_test_split(X, y, test_size=0.25, stratify=y)</code>. Hány sor és hány lemondó lesz a teszthalmazban?",
    options: ["150 sor, 45 lemondó", "50 sor, 15 lemondó", "50 sor, 25 lemondó", "25 sor, 7 lemondó"],
    answer: 1,
    hint: "A test_size a teszt aránya; a stratify az osztályarányt őrzi meg mindkét részben.",
    explain: R`A teszt $0{,}25\cdot200=50$ sor, a rétegzés miatt ugyanúgy 30% lemondóval: 15. A „150 sor, 45 lemondó” a tanítóhalmaz. Az „50 sor, 25 lemondó” 50%-os arányt feltételez, ami rétegzésnél nem fordulhat elő; a „25 sor, 7 lemondó” a test_size-t százalékként (25 sor) olvassa.`
  },
  {
    id: "bmix-017",
    topic: "mix",
    level: 1,
    ref: "06-neuralis-halo.html#alkalmazas",
    type: "single",
    q: "A gyakorlaton az MLP-t és a döntési fát ugyanazon a tanító–teszt felosztáson (85 + 29 hallgató) értékeltük. Miért fontos ez?",
    options: [
      "Mert az MLP csak kis teszthalmazon működik.",
      "Mert csak így tisztességes az összehasonlítás: a különbség a modellből jön, nem abból, hogy más hallgatók kerültek a tesztbe.",
      "Mert a döntési fa tanítóhalmazát az MLP is felhasználja a súlyai kezdőértékéhez.",
      "Mert a scaler-t a döntési fa tanította be."
    ],
    answer: 1,
    hint: "Ha a két modell más-más teszthallgatókon mérne, mit hasonlítanánk össze?",
    explain: R`29 teszthallgatónál egy hallgató $\approx 3{,}4$ százalékpont – ha a két modell más tesztsorokon mérne, a felosztás véletlenje elnyomhatná a valódi különbséget. Azonos felosztással a teljesítménykülönbség a modellek közötti eltérést mutatja. A fa nem használ standardizálást; a scaler-t az MLP szkriptje illeszti a tanítóhalmazon.`
  },
  {
    id: "bmix-018",
    topic: "mix",
    level: 3,
    ref: "06-neuralis-halo.html#alkalmazas",
    type: "single",
    q: "A teszten (29 hallgató) a döntési fa accuracy-je 0,724, az MLP-1-é 0,793, a recall (yes) mindkettőnél 0,810, a balanced accuracy 0,655 vs. 0,780. Melyik következtetés a legmegalapozottabb?",
    options: [
      "Az MLP minden szempontból egyértelműen jobb, ezért a fát el kell vetni.",
      "Az MLP a bukókat jobban felismerte (8-ból 6 vs. 4), de a különbség csak két hallgató; ha a döntést indokolni kell, a fa értelmezhetősége ellensúlyozhatja.",
      "A két modell egyforma, mert a recall megegyezik.",
      "A fa a jobb, mert az accuracy-je közelebb van a többségi osztály arányához."
    ],
    answer: 1,
    hint: "Hány hallgatót jelent a 0,724 → 0,793 különbség? És mi számít, ha egy figyelmeztetést meg kell indokolni?",
    explain: R`A különbség a bukók felismerésében van (precision és balanced accuracy), az átmenők recallja azonos. De $0{,}793-0{,}724 \approx 2/29$, vagyis két hallgató – kis teszten a sorrend megfordulhat. A választás a célon múlik: indokolható döntéshez a fa, nyers teljesítményhez (validációval) az MLP. Az azonos recall nem jelent azonos modellt; az alapmodellhez közeli accuracy pedig nem érdem.`
  },

  // ---------- Folyamat és összekapcsolt fogalmak ----------
  {
    id: "bmix-019",
    topic: "mix",
    level: 1,
    ref: "08-osszefoglalas.html#folyamat",
    type: "single",
    q: "Mi az adatbányászati folyamat helyes sorrendje (ahogy a félév gyakorlatai végigjárták)?",
    options: [
      "adatgyűjtés → modellezés → tisztítás → feltáró elemzés → értékelés",
      "adatgyűjtés → tisztítás → feltáró elemzés → előkészítés (aggregálás, skálázás) → modellezés → értékelés",
      "adatgyűjtés → előkészítés (skálázás) → tisztítás → modellezés → feltáró elemzés → értékelés",
      "feltáró elemzés → adatgyűjtés → modellezés → tisztítás → értékelés"
    ],
    answer: 1,
    hint: "A modellező eljárások nem tudnak mit kezdeni a hiányos, hibás adattal. És mikor lehet skálázni: tisztítás előtt vagy után?",
    explain: R`Előbb a hibákat javítjuk (duplikátumok, írásmód, típus, hiány, kiugrók), utána tárjuk fel az eloszlásokat és kapcsolatokat, majd a modellhez készítjük elő az adatot (egy sor = egy objektum, skálázás), modellezünk és értékelünk. A folyamat iteratív: rossz eredmény után vissza lehet lépni – de az első tisztítás a modellezés előtt van. Hiányos, „szöveges számú” oszlopot skálázni sem lehet.`
  },
  {
    id: "bmix-020",
    topic: "mix",
    level: 2,
    ref: "03-kmeans.html#lepes2",
    type: "single",
    q: "A tisztított vásárlási táblában egy sor egy tétel (transaction_id, customer_id, product, quantity, line_total). Vásárlókat akarsz K-means-szel csoportosítani. Mi a helyes előkészítési sorrend?",
    options: [
      "K-means a tételsorokon, utána vásárlónként a leggyakoribb klasztercímke.",
      "Standardizálás a tételsorokon, majd K-means, majd groupby('customer_id').",
      "groupby('customer_id'): vásárlásszám = különböző transaction_id-k száma (nunique), összköltés = line_total összege; utána standardizálás, majd K-means.",
      "groupby('customer_id'): vásárlásszám = a sorok száma (count); utána K-means standardizálás nélkül."
    ],
    answer: 2,
    hint: "Mi a klaszterezés egysége? És egy vásárlás hány tételsorból állhat?",
    explain: R`Egy sor = egy vásárló kell, ezért előbb aggregálunk. A vásárlásszám a <em>különböző</em> tranzakciók száma (<code>nunique</code>), mert egy vásárlás több tételsorból áll – a <code>count</code> a tételeket számolná. Az eltérő nagyságrend (db vs. Ft) miatt az aggregált táblát standardizáljuk, csak utána jön a K-means. Tételsorokon klaszterezni rossz egységen dolgozik.`
  },
  {
    id: "bmix-021",
    topic: "mix",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes3",
    type: "single",
    q: "A HAC Ward-kapcsolása két klaszter közül azt a párt vonja össze, amelyiknél a legkisebb egy bizonyos mennyiség növekedése. Melyik K-means-fogalommal azonos ez a mennyiség?",
    options: [
      "a silhouette-tel",
      "az inertiával (klaszteren belüli négyzetösszeg, SSE)",
      "a középpontok közötti legkisebb távolsággal (single kapcsolás)",
      "az n_init paraméterrel"
    ],
    answer: 1,
    hint: "A K-means minden lépése egy célfüggvényt csökkent. A Ward ugyanezt figyeli, csak mohón, összevonásonként.",
    explain: R`A Ward az összevonással járó SSE-növekedést minimalizálja: $\Delta=\frac{|A||B|}{|A|+|B|}\lVert\bar a-\bar b\rVert^2$. Az SSE épp a K-means inertiája. A célfüggvény rokon, de a Ward a korábbi összevonásokat nem bontja vissza, ezért az eredmény nem garantáltan azonos a K-means-ével. A silhouette értékelő mutató, a single kapcsolás a legközelebbi pontpárt nézi (nem középpontot), az n_init az indítások száma.`
  },
  {
    id: "bmix-022",
    topic: "mix",
    level: 3,
    ref: "04-hierarchikus-klaszterezes.html#alkalmazas",
    type: "single",
    q: "Ugyanazon a 120 vásárlón (standardizált vásárlásszám és összköltés) a HAC Ward-dal $k=2$-nél (legnagyobb rés 12,03, silhouette 0,7155) 80 + 40 fős szegmenseket adott, és a K-means $k=2$-vel ugyanezt a felosztást. Mit mond ez?",
    options: [
      "Hogy a két módszer mindig ugyanazt adja, ha $k$ azonos.",
      "Hogy a két, eltérő elvű módszer egyezése megerősíti: ez a kétcsoportos szerkezet valóban jelen van az adatban (stabil szegmentálás).",
      "Hogy a HAC hibás, mert determinisztikusnak kellene lennie, a K-means pedig véletlen.",
      "Hogy a 80 + 40 fős felosztás biztosan a legjobb, és $k=3$-at nem érdemes megvizsgálni."
    ],
    answer: 1,
    hint: "Mikor erősebb egy eredmény: ha egyetlen módszer adta, vagy ha két különböző módszer is ugyanoda jut?",
    explain: R`A K-means és a HAC más elven dolgozik, általában nem kell egyezniük; ha mégis egyeznek, az a szerkezet stabilitására utal – a féléves feladat két modelljének összehasonlításában is ilyen érvelés kell. Ez nem általános szabály. A $k=3$ silhouette-je (0,7144) szinte ugyanakkora, tehát érdemes megvizsgálni és értelmezni.`
  },

  // ---------- Féléves feladat ----------
  {
    id: "bmix-023",
    topic: "mix",
    level: 1,
    ref: "08-osszefoglalas.html#feleves",
    type: "single",
    q: "Mit kell beadni a féléves feladathoz a Teams-feladatban?",
    options: [
      "Egy ZIP-fájlt, benne a Colab-notebookkal és az ábrákkal.",
      "Csak a PDF-jelentést; a kódot és az adatot az oktató a linkből letölti.",
      "Három fájlt tömörítés nélkül – a Python-forráskódot, az adathalmazt (CSV) és a PDF-jelentést –, majd a „Turn in” (Beadás) gombot is meg kell nyomni.",
      "A Colab-notebook megosztási linkjét és a társértékelést egy fájlban."
    ],
    answer: 2,
    hint: "Három fájl, tömörítés nélkül – és a feltöltés még nem beadás.",
    explain: R`A kiírás szerint a Python-forráskód, a felhasznált adathalmaz és a PDF-jelentés kell, tömörítés nélkül; feltöltés után a „Turn in” gombbal kell beadni (határidő: 2026. november 20.; a társértékelésé december 4.). A Colab-cellák kódját érdemes menet közben egy .py fájlba menteni.`
  },
  {
    id: "bmix-024",
    topic: "mix",
    level: 2,
    ref: "08-osszefoglalas.html#feleves",
    type: "multi",
    q: "A féléves feladat <strong>osztályozási</strong> ágában mely követelmények szerepelnek a kiírásban?",
    options: [
      "A célváltozó és a bemeneti változók meghatározása, és az adathalmaz felosztása tanító- és teszthalmazra.",
      "Két különböző osztályozó modell, értékelés a teszthalmazon teljesítménymutatókkal, és indoklás, melyik a megfelelőbb.",
      "A kiválasztott modell alkalmazása új, a tanításban nem használt adatokra, és az eredmény értelmezése.",
      "Elég egyetlen modell, ha a teljesítménye jobb a többségi alapmodellnél.",
      "A két modell közül a tanítóhalmazon mért pontosság alapján kell választani."
    ],
    answer: [0, 1, 2],
    hint: "A kiírás két modellt kér. Melyik halmazon kell őket értékelni?",
    explain: R`A kiírás: célváltozó és bemenetek; tanító/teszt felosztás; két különböző modell; értékelés a <em>teszthalmazon</em>; összehasonlítás és indoklás; alkalmazás új adatokra (2 pont). Egy modell nem elég, és a tanítóhalmazon mért pontosság a túltanulást jutalmazná. (Az alapmodellel való összevetés jó gyakorlat, de nem helyettesíti a második modellt.)`
  },
  {
    id: "bmix-025",
    topic: "mix",
    level: 3,
    ref: "08-osszefoglalas.html#feleves",
    type: "single",
    q: "A féléves feladatban klaszterezést választottál: K-means és HAC (sklearn <code>AgglomerativeClustering</code>), és a HAC-ot tartod jobbnak. Hogyan teljesíted az „alkalmazás új adatokon” pontot?",
    options: [
      "Az új pontokat hozzáadod az adathoz, és újrafuttatod a <code>fit_predict</code>-et; a régi címkék változása nem baj, ezt nem kell említeni.",
      "A HAC <code>predict</code> metódusával, ugyanazzal a standardizálással.",
      "Az új pontokat a tanításkor használt skálázással standardizálod, és a K-means <code>predict</code>-jével sorolod be, akkor is, ha a jelentésben a HAC-ot választottad – erről nem kell írni.",
      "A jelentésben megindokolod, hogy a HAC-nak nincs beépített besoroló szabálya (nincs <code>predict</code>), így ez a lépés csak kerülőúton vagy újrafuttatással oldható meg – a kiírás ezt „amennyiben a módszer lehetővé teszi” megkötéssel engedi."
    ],
    answer: 3,
    hint: "Melyik klaszterező módszernek van besoroló szabálya új pontra, és mit mond erről a kiírás?",
    explain: R`Az <code>AgglomerativeClustering</code>-nek nincs <code>predict</code>-je; a <code>fit_predict</code> mindent újraklaszterez, a régi címkék is megváltozhatnak. A kiírás ezt a pontot csak „amennyiben a módszer ezt lehetővé teszi” kéri, ezért HAC-nál az indoklás a helyes út (esetleg kerülőúttal: legközelebbi klaszterközéppont, kimondva). K-means-nél ez egyszerű: ugyanazzal a skálázással <code>predict</code>. Ha szó nélkül a másik modellel sorolsz be, az nem a választott modell alkalmazása.`
  }
);
