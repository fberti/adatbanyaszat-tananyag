/* Vizsgagyakorló kérdésbank – 1. lecke: Adattisztítás és feltáró adatelemzés */

BANK.push(
  {
    id: "b01-001",
    topic: "01",
    level: 1,
    ref: "01-adattisztitas.html#lepes1",
    type: "single",
    q: "Melyik meghatározás illik az <em>adatbányászatra</em> (data mining)?",
    options: [
      "Adattárház, riportok és irányítópultok összessége, amely főleg azt mutatja meg, mi történt.",
      "Nagy adathalmazokban rejtett, nem triviális, hasznos mintázatok automatikus vagy félautomatikus feltárása; a KDD-folyamat elemzési lépése.",
      "Olyan algoritmusok összessége, amelyek kizárólag felcímkézett példákból tanulnak.",
      "Az adatok hibáinak (duplikátumok, hiányok, kiugrók) felismerése és javítása."
    ],
    answer: 1,
    hint: "A kulcsszó: előre nem ismert mintázat. Melyik opció írja le inkább a BI-t, a felügyelt tanulást, illetve az adattisztítást?",
    explain: R`Az adatbányászat előre nem ismert, nem triviális mintázatokat (szabályokat, csoportokat) keres, és a KDD-folyamat elemzési lépése. Az első opció az üzleti intelligencia (BI) leírása: az főleg azt mutatja, mi történt. A harmadik csak a felügyelt tanulást írja le, pedig az adatbányászatba felügyelet nélküli módszerek is tartoznak. A negyedik az adat-előkészítés, ami a folyamatnak csak egy lépése.`
  },
  {
    id: "b01-002",
    topic: "01",
    level: 1,
    ref: "01-adattisztitas.html#lepes1",
    type: "match",
    q: "Párosítsd a feladatot azzal, hogy melyik területhez vagy tanulási típushoz tartozik!",
    pairs: [
      ["Lemorzsolódás előrejelzése döntési fával, ismert kimenetelű régi vásárlókból", "felügyelt tanulás – osztályozás"],
      ["Vásárlók szegmentálása K-means-szel, előre adott csoportok nélkül", "felügyelet nélküli tanulás – klaszterezés"],
      ["„Aki tésztát vesz, paradicsomszószt is vesz” típusú szabályok keresése", "felügyelet nélküli tanulás – asszociációs szabályok"],
      ["Havi árbevétel-riport régiónként egy irányítópulton", "üzleti intelligencia (mi történt?)"]
    ],
    hint: "Van-e a tanítóadatban ismert célváltozó? És új mintázatot keres a feladat, vagy csak összesít?",
    explain: R`Ha a múltbeli példákban ismert a címke (elment / maradt), a tanulás felügyelt (osztályozás). A klaszterezésnél és az asszociációs szabályoknál nincs célváltozó, tehát mindkettő felügyelet nélküli. A riport egy előre feltett kérdésre ad összesítést, nem rejtett mintázatot tár fel, ezért ez BI. Tipikus hiba, hogy a kosárelemzést felügyeltnek gondolják, mert a szabálynak „van jobb oldala”. A jobb oldal azonban nincs előre kijelölve célváltozóként.`
  },
  {
    id: "b01-003",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes1",
    type: "single",
    q: "Egy vásárlói klaszterezés kész. Hogyan értékeled a modellt?",
    options: [
      "Tévesztési mátrixszal, a jóslatokat a valódi címkékkel összevetve.",
      "A pontossággal (accuracy) egy elkülönített tesztadaton.",
      "Belső mutatókkal (pl. sziluett, inertia) és a csoportok szakmai értelmezésével.",
      "Sehogy: felügyelet nélküli modellt nem lehet értékelni."
    ],
    answer: 2,
    hint: "Van-e „helyes válasz”, amihez a klasztereket összevethetnéd?",
    explain: R`Felügyelet nélküli tanulásnál nincs valódi címke, ezért nincs mihez mérni a jóslatot. A minőséget belső mutatók (sziluett, inertia) és a csoportok szakmai értelmezése adja. A tévesztési mátrix és a pontosság felügyelt (osztályozási) eszköz. Az, hogy „sehogy”, túlzás: értékelni lehet és kell is, csak más eszközzel.`
  },
  {
    id: "b01-004",
    topic: "01",
    level: 1,
    ref: "01-adattisztitas.html#lepes1",
    type: "single",
    q: "Melyik a CRISP-DM folyamatmodell hat fázisának helyes sorrendje?",
    options: [
      "adatmegértés → üzleti megértés → modellezés → adat-előkészítés → bevezetés → kiértékelés",
      "üzleti megértés → adat-előkészítés → adatmegértés → modellezés → bevezetés → kiértékelés",
      "üzleti megértés → adatmegértés → modellezés → adat-előkészítés → kiértékelés → bevezetés",
      "üzleti megértés → adatmegértés → adat-előkészítés → modellezés → kiértékelés → bevezetés"
    ],
    answer: 3,
    hint: "Előbb a kérdés, aztán az adat megismerése; a tisztítás a modell előtt van, a bevezetés a legvégén.",
    explain: R`A helyes sor: üzleti megértés → adatmegértés → adat-előkészítés → modellezés → kiértékelés → bevezetés (deployment). Az adatot csak azután készíted elő, hogy megismerted, a modellt pedig az előkészített adaton építed. Bevezetni csak kiértékelt modellt szabad. A folyamat iteratív: rossz eredmény után visszaléphetsz egy korábbi fázishoz.`
  },
  {
    id: "b01-005",
    topic: "01",
    level: 1,
    ref: "01-adattisztitas.html#lepes2",
    type: "multi",
    q: "Mely állítások igazak a mérési skálákra?",
    options: [
      "Két dátum különbsége (a napok száma) már arányskálájú.",
      "Ordinális skálán a medián megengedett középérték.",
      "Nominális skálán a medián is megengedett, ha az értékek betűrendbe tehetők.",
      "Intervallumskálán értelmes az átlag, de a hányados nem.",
      "Ha a pandas egy oszlopot <code>int64</code>-ként olvas be, az arányskálájú."
    ],
    answer: [0, 1, 3],
    hint: "Minden skálánál kérdezd meg: van-e sorrend, értelmes-e a különbség, van-e valódi nulla? A tárolási típus ebben segít-e?",
    explain: R`A dátum intervallumskálájú, a két dátum közötti napok száma viszont arányskálájú: van valódi nulla, és a 20 nap kétszer annyi, mint a 10. Ordinális skálán a sorrend értelmes, így a medián is. Intervallumskálán a különbség értelmes, ezért az átlag is, a hányados viszont nem (a nullpont önkényes). A betűrend nem tartalmi sorrend, így a nominális változónak (pl. régió) nincs mediánja. A tárolási típusból nem következik a skála: egy int64-ként tárolt vásárlószám vagy irányítószám nominális.`
  },
  {
    id: "b01-006",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes3",
    type: "single",
    q: "A pontosvesszővel tagolt nyers fájlt valaki így olvassa be: <code>pd.read_csv(\"retail_transactions_raw.csv\", encoding=\"utf-8-sig\")</code> (a <code>sep</code> paraméter nélkül). Mit ad a <code>df.shape</code>?",
    options: ["(6957, 7)", "(6957, 1)", "(7, 6957)", "Hibát, mert a fájl nem olvasható be."],
    answer: 1,
    hint: "Mi az alapértelmezett elválasztó, és van-e ilyen karakter a sorokban?",
    explain: R`Az alapértelmezett elválasztó a vessző. A sorokban nincs vessző, ezért minden sor egyetlen cellába kerül: 6957 sor, 1 oszlop. A beolvasás tehát nem áll le hibával, csak rossz eredményt ad, ezért kell mindig megnézni a <code>head()</code>-et és a <code>shape</code>-et. A (6957, 7) a helyes <code>sep=";"</code> mellett jönne ki. A (7, 6957) a sorok és oszlopok felcserélése.`
  },
  {
    id: "b01-007",
    topic: "01",
    level: 1,
    ref: "01-adattisztitas.html#lepes3",
    type: "match",
    q: "Párosítsd a pandas-hívást azzal, amit visszaad!",
    pairs: [
      ["<code>df.shape</code>", "(sorok száma, oszlopok száma)"],
      ["<code>df.info()</code>", "oszloponként a nem hiányzó értékek száma és a tárolási típus"],
      ["<code>df[\"product\"].nunique()</code>", "a különböző értékek száma"],
      ["<code>df.columns.tolist()</code>", "az oszlopnevek pontos írásmóddal"],
      ["<code>df.head()</code>", "az első 5 sor"]
    ],
    hint: "Gondold végig, melyik hívással ellenőrzöd a méretet, a hiányokat, a kategóriák számát és a beolvasás sikerét.",
    explain: R`A <code>shape</code> egy pár: <code>shape[0]</code> a sorok, <code>shape[1]</code> az oszlopok száma. Az <code>info()</code> a hiányokat és a típushibákat mutatja meg (pl. unit_price 6951 nem hiányzó, float64). A <code>nunique()</code> jelezte a 26 terméknevet a 18 helyett. A <code>columns.tolist()</code> a rejtett szóközök vagy nagybetűk miatt fontos. A <code>head()</code> azt mutatja meg, sikerült-e a beolvasás.`
  },
  {
    id: "b01-008",
    topic: "01",
    level: 3,
    ref: "01-adattisztitas.html#lepes3",
    type: "single",
    q: "A nyers adaton (6957 sor) a unit_price 6, a region 4 hiányzó értéket tartalmaz, a quantity oszlopban 6 cellában „unknown” szöveg áll. Mit ad vissza a <code>df.isna().sum().sum()</code> a beolvasás után?",
    options: ["16", "10", "6", "12"],
    answer: 1,
    hint: "Az isna() csak a valódi hiányt (NaN) látja. Hiány-e az „unknown” szöveg a konverzió előtt?",
    explain: R`Az <code>isna().sum()</code> oszloponként számol, a második <code>.sum()</code> ezeket összeadja: $6 + 4 = 10$. Az „unknown” ilyenkor még szöveg, nem NaN, csak a <code>to_numeric(..., errors="coerce")</code> után lesz belőle hiány. A 16 az „unknown” értékeket is beszámolja. A 6 csak egy oszlop hiánya. A 12 a duplikátumokkal (6) számol, azok viszont nem hiányok.`
  },
  {
    id: "b01-009",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes4",
    type: "single",
    q: "Egy 7 soros táblában az egyik sor háromszor szerepel azonosan, egy másik kétszer, a maradék 2 sor egyedi. Mennyi a <code>df.duplicated().sum()</code>, és hány sort mutat a <code>df[df.duplicated(keep=False)]</code>?",
    options: ["5 és 3", "3 és 3", "3 és 5", "2 és 5"],
    answer: 2,
    hint: "Az alapértelmezett duplicated() az első előfordulást nem jelöli meg. A keep=False mindet megjelöli.",
    explain: R`A háromszoros sornak 2, a kétszeresnek 1 felesleges másolata van, így a <code>duplicated().sum()</code> értéke $2 + 1 = 3$ (a <code>drop_duplicates()</code> is ennyit töröl, és 4 sor marad). A <code>keep=False</code> az összes érintett sort megmutatja, az első előfordulásokat is: $3 + 2 = 5$. Az „5 és 3” felcseréli a kettőt. A „2 és 5” csak a háromszoros sor másolatait számolja.`
  },
  {
    id: "b01-010",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes4",
    type: "single",
    q: "Hány különböző érték marad a <code>[\" Milk\", \"milk \", \"MILK\", \"Mi lk\", \"tomato  sauce\", \"Tomato sauce\"]</code> sorozatban <code>.str.strip().str.lower()</code> után? (A „tomato  sauce”-ban két szóköz van.)",
    options: ["2", "3", "4", "6"],
    answer: 2,
    hint: "A strip csak a szöveg elején és végén lévő szóközöket vágja le. Mi történik a szó belsejében lévőkkel?",
    explain: R`Marad: „milk”, „mi lk”, „tomato  sauce” (két szóközzel) és „tomato sauce”, tehát 4 érték. A strip a belső szóközökhöz nem nyúl. A „mi lk” elírásához kézi leképezés (<code>replace({...})</code>), a dupla szóközhöz <code>.str.replace(r"\s+", " ", regex=True)</code> kell. A 2 akkor jönne ki, ha a strip + lower ezeket is javítaná. A 3 csak az egyik belső szóközös hibát veszi észre.`
  },
  {
    id: "b01-011",
    topic: "01",
    level: 3,
    ref: "01-adattisztitas.html#lepes4",
    type: "multi",
    q: "Mely állítások igazak a duplikátumszűrésre és a szövegegységesítésre?",
    options: [
      "A <code>df.drop_duplicates(subset=[\"product\"])</code> termékenként egyetlen sort hagy meg, ez adatvesztés.",
      "Az egységesítés után új teljes duplikátumok keletkezhetnek, ezért érdemes a <code>duplicated()</code>-et újra lefuttatni.",
      "Az üres szöveget (<code>\"\"</code>) az <code>isna()</code> hiányzó értéknek látja, ezért nem kell <code>pd.NA</code>-ra cserélni.",
      "A <code>drop_duplicates()</code> alapból minden ismétlődő sorból az első előfordulást tartja meg.",
      "A duplikátumokat a hiánypótlás után érdemes törölni, hogy a pótolt sorok is egyezhessenek."
    ],
    answer: [0, 1, 3],
    hint: "Gondold végig, mit lát az isna(), és miért a duplikátumtörlés a tisztítás első lépése.",
    explain: R`A <code>subset=["product"]</code> csak a terméknév alapján keres ismétlést, így a gyakorlat adatán 18 sor maradna. Egységesítés után a „Coffee” és „coffee” sorok összeérhetnek, ezért kell újra ellenőrizni (a gyakorlat adatán ez 0 lett). A <code>drop_duplicates()</code> alapértelmezése <code>keep="first"</code>. Az üres szöveget az <code>isna()</code> nem látja, ezért kell a <code>replace("", pd.NA)</code>. A duplikátumtörlés azért az első lépés, mert a másolat a pótlásnál és a kiugróvizsgálatnál is kétszeres súllyal szerepelne.`
  },
  {
    id: "b01-012",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes5",
    type: "single",
    q: "Mit ad vissza a <code>pd.to_numeric(pd.Series([\"3\", \"2,5\", \" 4\", \"n/a\"]), errors=\"coerce\")</code>?",
    options: [
      "[3.0, 2.5, 4.0, NaN]",
      "[3.0, NaN, 4.0, NaN]",
      "[3.0, NaN, NaN, NaN]",
      "ValueError, mert a „n/a” nem szám"
    ],
    answer: 1,
    hint: "A pandas tizedespontot vár. A szám körüli szóköz, illetve a tizedesvessző közül melyik zavarja?",
    explain: R`A „2,5” tizedesvesszővel nem értelmezhető számként, a „n/a” sem, ezért a <code>coerce</code> mindkettőből NaN-t csinál. A „ 4” körüli szóköz nem zavarja a konverziót, ebből 4.0 lesz. Az eredmény a NaN miatt float. A 2.5 csak <code>decimal=","</code>-vel beolvasva vagy előzetes cserével jönne ki. A ValueError az alapértelmezett <code>errors="raise"</code> eredménye lenne.`
  },
  {
    id: "b01-013",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes5",
    type: "match",
    q: "Párosítsd a helyzetet a hiánykezelési módszerrel!",
    pairs: [
      ["Numerikus, erősen jobbra ferde változó (pl. jövedelem) hiányai", "pótlás mediánnal"],
      ["Kategorikus változó, nincs rá üzleti szabály", "pótlás módusszal"],
      ["Az egységár termékenként állandó, egy-egy ár hiányzik", "pótlás csoporton belül (groupby + map + fillna)"],
      ["A mennyiség ismeretlen, semmi nem mondja meg a helyes értéket, és kevés ilyen sor van", "a sor törlése (dropna) és dokumentálás"]
    ],
    hint: "Melyik középérték robusztus? Mi értelmes kategorikus változóra? Mikor nem kell „kitalálni” semmit?",
    explain: R`Ferde eloszlásnál az átlagot a kiugrók húzzák, ezért a medián a jobb. Kategorikus változóra az átlag értelmetlen, a módusz viszont használható. Ha egy szabály megmondja a helyes értéket, az a legjobb pótlás: a gyakorlaton így pótolta a kód a 6 egységárat termék szerint és a 4 régiót vásárló szerint. A mennyiségre nem volt szabály, ezért a 6 sort törölte. Ennek ára, hogy az árbevétel kicsit alulbecsült lesz.`
  },
  {
    id: "b01-014",
    topic: "01",
    level: 3,
    ref: "01-adattisztitas.html#lepes5",
    type: "single",
    q: "Valaki a quantity oszlopot így alakítja át: <code>clean_df[\"quantity\"] = pd.to_numeric(clean_df[\"quantity\"], errors=\"coerce\").astype(\"int64\")</code>, még a hiánykezelés előtt. Mi történik a gyakorlat adatán?",
    options: [
      "Lefut, és a 6 „unknown” helyén 0 áll.",
      "Lefut, és a 6 „unknown” sort automatikusan törli.",
      "Hibával leáll, mert a konverzió után 6 NaN van az oszlopban, a NaN pedig nem alakítható int64-re.",
      "Lefut, de az oszlop float64 marad."
    ],
    answer: 2,
    hint: "Mi lesz az „unknown” értékekből a coerce után, és tárolhat-e ilyet egy hagyományos int64 oszlop?",
    explain: R`A <code>coerce</code> után 6 NaN van az oszlopban, az <code>astype("int64")</code> pedig hibát dob (IntCastingNaNError), mert a NaN nem egész szám. Ezért alakít a gyakorlat kódja csak a pótlás és a <code>dropna()</code> után egészre. Az <code>astype</code> nem pótol 0-val, és sorokat sem töröl; az a <code>dropna()</code> dolga. Ha az oszlop hibátlanul alakítható lenne, valóban int64 lenne belőle, nem maradna float64.`
  },
  {
    id: "b01-015",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#alkalmazas",
    type: "single",
    q: R`A gyakorlat tisztító kódjában:<pre><code>price_counts = clean_df.groupby("product")["unit_price"].nunique()
consistent = price_counts[price_counts == 1].index</code></pre>Mit tartalmaz a <code>consistent</code>?`,
    options: [
      "Azokat a termékneveket, amelyeknél a csoportban pontosan egy különböző ismert egységár szerepel.",
      "Azokat a termékneveket, amelyekből csak egyetlen sor van az adatban.",
      "Azokat a termékneveket, amelyeknél pontosan egy egységár hiányzik.",
      "A termékenkénti egyetlen egységárat (termék → ár)."
    ],
    answer: 0,
    hint: "A nunique() a különböző, nem hiányzó értékek számát adja, az .index pedig a csoportkulcsokat.",
    explain: R`A <code>nunique()</code> termékenként megszámolja a különböző ismert (nem NaN) árakat, a szűrés azokat tartja meg, ahol ez 1, az <code>.index</code> pedig a termékneveket adja vissza. Így a kód csak ott pótol, ahol az ár ellentmondásmentes. A „csak egy sor” a <code>size()</code> vagy <code>count()</code> eredménye lenne. A „termék → ár” leképezés a következő sorban készülő <code>price_lookup</code>.`
  },
  {
    id: "b01-016",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes6",
    type: "single",
    q: R`Adat: $1,\ 2,\ 2,\ 4,\ 6$. Mennyi a pandas <code>std()</code> által adott (korrigált) szórás?`,
    options: ["2", "1,79", "4", "3,2"],
    answer: 0,
    hint: R`Átlag, eltérések négyzetösszege, majd osztás $n-1$-gyel és gyökvonás.`,
    explain: R`$\bar x = 15/5 = 3$. Eltérések: $-2, -1, -1, 1, 3$; négyzetösszeg $4+1+1+1+9 = 16$. $s^2 = 16/4 = 4$, $s = 2$. Az 1,79 az $n$-nel osztott szórás ($\sqrt{3{,}2}$, a <code>np.std</code> alapértelmezése). A 4 a variancia (gyökvonás nélkül), a 3,2 az $n$-nel osztott variancia.`
  },
  {
    id: "b01-017",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes6",
    type: "single",
    q: "Mit ad vissza a <code>pd.Series([5, 3, 3, 5, 8]).mode()</code>?",
    options: [
      "3",
      "5",
      "4,8",
      "Egy kételemű Series-t: [3, 5]"
    ],
    answer: 3,
    hint: "Hányszor fordul elő a 3 és az 5? Mit csinál a pandas, ha több leggyakoribb érték van?",
    explain: R`A 3 és az 5 is kétszer szerepel, így két módusz van, és a pandas mindkettőt visszaadja egy Series-ben. Ezért kell a <code>mode()[0]</code> (vagy <code>.iloc[0]</code>), ha egyetlen értékkel akarsz pótolni: az itt 3 lenne. Csak a „3” vagy csak az „5” válasz elfelejti, hogy a módusz nem mindig egyértelmű. A 4,8 az átlag ($24/5$).`
  },
  {
    id: "b01-018",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes7",
    type: "single",
    q: R`Adat ($n = 8$, sorba rendezve): $2,\ 4,\ 5,\ 7,\ 8,\ 9,\ 12,\ 25$. A pandas alapértelmezett <code>quantile()</code>-jával számolva hol van a Tukey-féle felső határ?`,
    options: ["14,75", "19,5", "17,25", "24,75"],
    answer: 2,
    hint: R`Pozíció: $h = (n-1)p + 1$. Ha nem egész, interpolálj a két szomszéd között.`,
    explain: R`$Q_1$: $h = 7\cdot 0{,}25 + 1 = 2{,}75$ → $4 + 0{,}75\cdot(5-4) = 4{,}75$. $Q_3$: $h = 7\cdot0{,}75+1 = 6{,}25$ → $9 + 0{,}25\cdot(12-9) = 9{,}75$. $IQR = 5$, felső határ $9{,}75 + 7{,}5 = 17{,}25$, tehát a 25 kiugró. A 19,5 a tankönyvi „felek mediánja” módszerből jön ($Q_1 = 4{,}5$, $Q_3 = 10{,}5$), ami kis mintán eltér a pandastól. A 14,75 az $1\cdot IQR$, a 24,75 a $3\cdot IQR$ határ.`
  },
  {
    id: "b01-019",
    topic: "01",
    level: 1,
    ref: "01-adattisztitas.html#lepes7",
    type: "multi",
    q: "Mely állítások igazak a boxplotra (dobozábrára)?",
    options: [
      R`A doboz $Q_1$-től $Q_3$-ig tart, a benne lévő vonal a medián.`,
      "A bajuszok a Tukey-határokon belüli legkisebb és legnagyobb értékig érnek.",
      "A határokon kívüli értékeket külön pontként jelöli; ezek jelöltek, nem automatikusan hibák.",
      "A doboz szélessége a szórás kétszerese.",
      "A bajuszok mindig a minimumig és a maximumig érnek."
    ],
    answer: [0, 1, 2],
    hint: "A boxplot a kvartilisekre épül, nem az átlagra és a szórásra.",
    explain: R`A doboz szélessége az IQR (a középső 50%), nem a szórással arányos. A bajusz csak a határon belüli szélső értékig tart, ezért ha van kiugró, nem ér el a minimumig vagy a maximumig: az $1,\dots,8,\ 30$ adatsoron a felső bajusz 8-nál végződik, a 30 külön pont. A külön pontokat egyenként meg kell vizsgálni, mert lehetnek valódi értékek is (lásd a kávé és a csirke árát).`
  },
  {
    id: "b01-020",
    topic: "01",
    level: 3,
    ref: "01-adattisztitas.html#lepes7",
    type: "single",
    q: R`Adat: $2,\ 3,\ 4,\ 5,\ 6,\ 7,\ 11$ (pandas-kvartilisek). Hány kiugró értéket talál az IQR-módszer?`,
    options: ["0", "1 (a 11)", "2 (a 2 és a 11)", "Nem dönthető el mintaátlag nélkül."],
    answer: 0,
    hint: R`Számold ki a határokat, aztán nézd meg, hogy a 11 a határ fölött van-e, vagy pontosan rajta.`,
    explain: R`$Q_1$: $h = 2{,}5$ → $3{,}5$; $Q_3$: $h = 5{,}5$ → $6{,}5$; $IQR = 3$. Határok: $3{,}5 - 4{,}5 = -1$ és $6{,}5 + 4{,}5 = 11$. A 11 pontosan a felső határon van, és kiugró csak a határ fölötti érték, ezért nincs kiugró. A „1 (a 11)” a „nagyobb vagy egyenlő” hibás olvasata. Az átlag nem kell: a módszer csak kvartilisekkel dolgozik.`
  },
  {
    id: "b01-021",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes8",
    type: "single",
    q: "Három kosár tételei: T1 = 2 db tea (1400 Ft) + 1 db tej (420 Ft); T2 = 1 db csirke (2400 Ft); T3 = 3 db kenyér (550 Ft) + 1 db vaj (850 Ft) + 2 db tojás (950 Ft). Mennyi az átlagos <em>kosárérték</em>?",
    options: ["1670 Ft", "3340 Ft", "1002 Ft", "10 020 Ft"],
    answer: 1,
    hint: "Előbb soronként line_total = quantity × unit_price, aztán kosaranként összeg, végül átlag a kosarakra.",
    explain: R`Tételértékek: 2800, 420, 2400, 1650, 850, 1900; összesen 10 020 Ft. Kosaranként: T1 = 3220, T2 = 2400, T3 = 4400, átlaguk $10\,020/3 = 3340$ Ft. Az 1670 Ft az átlagos <em>tételérték</em> ($10\,020/6$): más a megfigyelési egység. Az 1002 Ft az egy darabra jutó érték ($10\,020/10$ db), a 10 020 Ft pedig az összes árbevétel.`
  },
  {
    id: "b01-022",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes8",
    type: "single",
    q: "Mit ad vissza a tisztított adaton a <code>data.groupby(\"product\")[\"quantity\"].sum().idxmax()</code>?",
    options: ["\"coffee\"", "\"bread\"", "\"chicken\"", "940"],
    answer: 1,
    hint: "A kód az eladott mennyiséget összesíti, nem az árbevételt. Az idxmax a legnagyobb érték címkéjét adja.",
    explain: R`Mennyiségben a kenyér vezet (940 egység), ezért a <code>idxmax()</code> a "bread" címkét adja. Az árbevételben a kávé az első (1 793 000 Ft), de mennyiségben csak negyedik (815). A csirke árbevételben a második. A 940 a <code>max()</code> eredménye lenne, mert az az értéket adja, nem a címkét.`
  },
  {
    id: "b01-023",
    topic: "01",
    level: 2,
    ref: "01-adattisztitas.html#lepes9",
    type: "single",
    q: R`$x = 2,\ 4,\ 6,\ 8$; $y = 1,\ 3,\ 2,\ 6$. Mennyi a Pearson-féle korrelációs együttható (két tizedesre)?`,
    options: ["0,70", "0,84", "4,67", "0,61"],
    answer: 1,
    hint: R`$r = \dfrac{\operatorname{cov}(x,y)}{s_x s_y}$; a kovarianciánál és a szórásoknál ugyanazzal ($n-1$) oszd.`,
    explain: R`$\bar x = 5$, $\bar y = 3$. Szorzatok: $(-3)(-2) + (-1)(0) + (1)(-1) + (3)(3) = 14$, $\operatorname{cov} = 14/3 \approx 4{,}67$. $s_x^2 = 20/3$, $s_y^2 = 14/3$, $r = \frac{14/3}{\sqrt{(20/3)(14/3)}} = \frac{14}{\sqrt{280}} \approx 0{,}84$. A 4,67 maga a kovariancia (mértékegységfüggő, $|r| \le 1$ miatt nem lehet korreláció). A 0,70 az $r^2$. A 0,61 akkor jön ki, ha a kovarianciát $n$-nel, a szórásokat $n-1$-gyel osztod.`
  },
  {
    id: "b01-024",
    topic: "01",
    level: 1,
    ref: "01-adattisztitas.html#lepes9",
    type: "multi",
    q: "Mely állítások igazak a kétváltozós elemzés eszközeire?",
    options: [
      "A korrelációs együttható mértékegység-független, és mindig −1 és 1 között van.",
      R`$r \approx 0$ csak azt jelenti, hogy nincs <em>lineáris</em> kapcsolat; nemlineáris lehet.`,
      "Két kategorikus változó kapcsolatát kereszttáblával (<code>pd.crosstab</code>) vizsgáljuk.",
      "A kovariancia nagysága megmutatja a kapcsolat erősségét.",
      R`A gyakorlaton kapott $r(\text{unit\_price}, \text{line\_total}) = 0{,}75$ új, érdekes összefüggés.`
    ],
    answer: [0, 1, 2],
    hint: "Gondolj a valódi adaton számolt kovarianciára (2,47) és korrelációra (0,006), illetve arra, hogyan készül a line_total.",
    explain: R`A korreláció a szórásokkal normált kovariancia, ezért mértékegység-független és $[-1, 1]$-be esik. Az U alakú összefüggésnél $r$ lehet 0. Kategorikus × kategorikus párra kereszttábla (és khi-négyzet próba) való. A kovariancia nagysága a mértékegységtől függ: a valódi adaton $\operatorname{cov} \approx 2{,}47$, miközben $r = 0{,}006$. A $0{,}75$-ös korreláció konstrukcióból adódik, mert a line_total maga a quantity × unit_price szorzat.`
  },
  {
    id: "b01-025",
    topic: "01",
    level: 3,
    ref: "01-adattisztitas.html#lepes9",
    type: "single",
    q: "A tisztított adaton régiónként: West 2013 tétel, átlagos tételérték 1460 Ft; South 1301 tétel, 1359 Ft. Délen a legkisebb az árbevétel (1 767 760 Ft vs. 2 939 680 Ft). Mi a legjobb magyarázat?",
    options: [
      "Délen jóval olcsóbb termékeket vesznek, ezért kisebb a bevétel.",
      "Főleg a kevesebb tétel miatt: az átlagos tételérték régiónként hasonló (kb. 1360–1460 Ft).",
      "Délen több hiányzó értéket töröltünk, ezért alulbecsült a bevétel.",
      "A régió és a tételérték korrelációja negatív, ezért kisebb a déli bevétel."
    ],
    answer: 1,
    hint: "Az árbevétel = tételszám × átlagos tételérték. Melyik tényező tér el igazán?",
    explain: R`$2013 / 1301 \approx 1{,}55$-szörös a tételszám-különbség, az átlagos tételérték viszont csak kb. 7%-kal tér el. A különbség tehát főleg a forgalom méretéből jön, nem a vásárolt termékek árából. A gyakorlaton összesen 6 sort töröltünk ismeretlen mennyiség miatt, ez nem magyarázza a különbséget. Nominális régióra korrelációt számolni értelmetlen; kategorikus × numerikus párnál csoportos összehasonlítás kell.`
  },
  {
    id: "b01-026",
    topic: "01",
    level: 3,
    ref: "01-adattisztitas.html#alkalmazas",
    type: "single",
    q: "A gyakorlat nyers adatában 6 teljes duplikátum, 6 „unknown” mennyiség, 6 hiányzó egységár és 4 hiányzó régió van. A teljes tisztítás után 6957 sorból hány marad, és miért?",
    options: [
      "6935: minden hibás sort törlünk (6 + 6 + 6 + 4 = 22).",
      "6941: a duplikátumokat, a mennyiség- és az árhiányos sorokat töröljük (6 + 6 + 4 = 16).",
      "6951: csak a duplikátumokat töröljük, a többit pótoljuk.",
      "6945: a 6 duplikátumot és a 6 ismeretlen mennyiségű sort töröljük; az árat termék, a régiót vásárló szerint pótoljuk."
    ],
    answer: 3,
    hint: "Melyik hiányra volt üzleti szabály (termékenként állandó ár, vásárlónként állandó régió), és melyikre nem?",
    explain: R`$6957 - 6 = 6951$ a duplikátumtörlés után. A 6 egységárat termék szerint, a 4 régiót vásárló szerint pótoltuk, a 6 ismeretlen mennyiségre viszont nem volt szabály, ezért a <code>dropna()</code> ezeket törölte: 6945 sor, összesen 12 törölt sor. A kiugróvizsgálat (határok $-0{,}5$ és $3{,}5$) nem talált semmit. A többi opció vagy a pótolható hiányokat is törli, vagy elfelejti a mennyiség miatti törlést.`
  }
);
