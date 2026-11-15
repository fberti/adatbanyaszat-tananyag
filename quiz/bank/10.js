/* Vizsgagyakorló kérdésbank – 10. lecke: Üzleti intelligencia és adatbányászat alapfogalmai, gépi tanulás */

BANK.push(
  {
    id: "b10-001",
    topic: "10",
    level: 1,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes1",
    type: "single",
    q: "Melyik a legpontosabb meghatározása az üzleti intelligenciának (BI)?",
    options: [
      "Olyan technikák és eszközök összessége, amelyek a nyers adatokat értelmes, hasznos, döntéstámogató információvá alakítják",
      "Egyetlen szoftver (pl. Power BI), amellyel grafikonokat lehet készíteni",
      "A vállalat szervereinek és hálózatának üzemeltetése",
      "A könyvelési tranzakciók rögzítése és a havi zárás automatizálása"
    ],
    answer: 0,
    hint: "A definíció kulcsa: miből mit állít elő, és kinek?",
    explain: "A BI nyers adatból döntéstámogató információt állít elő a döntéshozóknak. Nem egyetlen szoftver (több modul integrációja), és nem az infrastruktúra vagy a könyvelés – ezek legfeljebb adatforrásai."
  },
  {
    id: "b10-002",
    topic: "10",
    level: 1,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes1",
    type: "multi",
    q: "Melyek szerepelnek az előadásban a BI előnyei között?",
    options: [
      "Adatvezérelt döntéshozatal",
      "Javított hatékonyság (automatizált elemzés, jelentéskészítés)",
      "Jobb ügyfélmegértés",
      "Versenyelőny",
      "Költségcsökkentés",
      "Az adatminőség automatikus garantálása emberi munka nélkül"
    ],
    answer: [0, 1, 2, 3, 4],
    hint: "Öt előny van. Melyik ígér túl sokat?",
    explain: "Az előadás öt előnye: adatvezérelt döntés, hatékonyság, ügyfélmegértés, versenyelőny, költségcsökkentés. Az adatminőséget a BI nem garantálja „magától” – az ETL-ben és az előfeldolgozásban kell érte dolgozni (GIGO)."
  },
  {
    id: "b10-003",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes2",
    type: "match",
    q: "Melyik BI-funkció felel a kérdésre?",
    pairs: [
      ["„Mennyi volt a harmadik negyedéves bevétel régiónként?”", "riportkészítés"],
      ["„Miért esett vissza az északi régió forgalma?”", "elemzés"],
      ["„Hány rendelés vár most csomagolásra?”", "monitorozás"],
      ["„Mennyi lesz a decemberi kereslet?”", "predikció"]
    ],
    hint: "Múlt – ok – jelen – jövő.",
    explain: "Riport: mi történt; elemzés: miért; monitorozás: mi történik most; predikció (adatbányászat): mi fog történni."
  },
  {
    id: "b10-004",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes2",
    type: "single",
    q: "„Melyik vevőnek küldjünk kupont, hogy a kampánykeretből a legtöbb visszatérő vásárlást érjük el?” Melyik analitikai szintről van szó?",
    options: ["Előíró (prescriptive)", "Leíró (descriptive)", "Diagnosztikai (diagnostic)", "Prediktív (predictive) – és csak az"],
    answer: 0,
    hint: "A kérdés nem azt kérdezi, mi lesz, hanem azt, mit <em>tegyünk</em>.",
    explain: "Cselekvést javasol, ez előíró analitika. Előfeltétele egy prediktív modell (ki milyen valószínűséggel tér vissza), de a döntési szabály / optimalizálás teszi előíróvá. A leíró a múltat, a diagnosztikai az okot nézi."
  },
  {
    id: "b10-005",
    topic: "10",
    level: 3,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes2",
    type: "single",
    q: "Egy kolléga szerint: „A dashboardon grafikonok vannak, a riportban táblázatok – ez a különbség.” Mi a helyes válasz?",
    options: [
      "Nem a kinézet a különbség: a dashboard a jelen (közel) valós idejű követésére (monitorozás) való, a riport egy lezárt időszakot dokumentál periodikusan",
      "Igaza van, a forma dönti el",
      "A riport mindig pontosabb, mert több adat van benne",
      "A dashboard csak előrejelzést mutathat, múltbeli adatot nem"
    ],
    answer: 0,
    hint: "Lehet-e grafikon egy riportban? Lehet-e múltbeli adat egy dashboardon?",
    explain: "Mindkettőben lehet grafikon és táblázat is. A különbség a cél és az idősík: a dashboard néhány KPI-t mutat egy pillantásra, folyamatosan frissülve, interaktívan; a riport részletes, rögzített szerkezetű összefoglaló egy elmúlt időszakról."
  },
  {
    id: "b10-006",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes3",
    type: "single",
    q: "Egy hónapban 5 600 látogató, 140 rendelés, 1 260 000 Ft bevétel. Mennyi az átlagos rendelési érték (AOV)?",
    options: ["9 000 Ft", "225 Ft", "2,5%", "40"],
    answer: 0,
    hint: "AOV = bevétel / <em>rendelések</em> száma.",
    explain: R`$1\,260\,000/140=9\,000$ Ft. A 225 Ft a látogatónkénti bevétel ($1\,260\,000/5\,600$), a 2,5% a konverziós arány ($140/5\,600$), a 40 a látogató / rendelés hányados.`
  },
  {
    id: "b10-007",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes3",
    type: "single",
    q: "Bevétel 800 000 Ft, a beszerzési költség 520 000 Ft. Mennyi a bruttó árrés (GPM)?",
    options: ["35%", "65%", "53,8%", "280 000 Ft"],
    answer: 0,
    hint: "A haszon arányát a <em>bevételhez</em> viszonyítjuk.",
    explain: R`$(800\,000-520\,000)/800\,000=280\,000/800\,000=0{,}35$. A 65% a költség aránya, az 53,8% a haszon a költséghez képest ($280/520$, ez a felár), a 280 000 Ft a bruttó haszon összege, nem arány.`
  },
  {
    id: "b10-008",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes3",
    type: "single",
    q: "Év elején 120 vevő, év végén 130, közben 22 új vevő jött. Mennyi az ügyfélmegtartási arány (CRR)?",
    options: ["90%", "108,3%", "83,1%", "18,3%"],
    answer: 0,
    hint: "A végső létszámból vond le az újakat, és oszd az év eleji létszámmal.",
    explain: R`$(130-22)/120=108/120=0{,}9$. A 108,3% ($130/120$) az új vevőket is beszámolja, a 83,1% ($108/130$) rossz nevezőt használ, a 18,3% ($22/120$) az új vevők aránya.`
  },
  {
    id: "b10-009",
    topic: "10",
    level: 3,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes3",
    type: "single",
    q: "A lemorzsolódási arány 8%-ról 6%-ra csökkent. Melyik megfogalmazás helyes?",
    options: [
      "2 százalékpontos, relatíve 25%-os csökkenés",
      "2%-os csökkenés, és ez ugyanaz, mint 2 százalékpont",
      "25 százalékpontos csökkenés",
      "Relatíve 2%-os, abszolút 25%-os csökkenés"
    ],
    answer: 0,
    hint: "Az arányok különbsége százalékpont; a relatív változás a különbség osztva a kiinduló értékkel.",
    explain: R`$8\%-6\%=2$ százalékpont; relatíve $2/8=0{,}25=25\%$. Arányok összehasonlításánál mindig mondd meg, melyikről beszélsz – a „2%” itt félreérthető.`
  },
  {
    id: "b10-010",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes3",
    type: "single",
    q: "Az eladott áruk beszerzési költsége egy év alatt 1 200 000 Ft. A készlet értéke az év elején 280 000 Ft, a végén 320 000 Ft. Mennyi a készletforgási sebesség?",
    options: ["4", "3,75", "4,29", "0,25"],
    answer: 0,
    hint: "Az <em>átlagos</em> készletértékkel ossz: (nyitó + záró) / 2.",
    explain: R`Átlagos készlet $(280\,000+320\,000)/2=300\,000$; forgás $1\,200\,000/300\,000=4$. A 3,75 a záró, a 4,29 a nyitó készlettel osztana, a 0,25 a fordított hányados.`
  },
  {
    id: "b10-011",
    topic: "10",
    level: 1,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes3",
    type: "multi",
    q: "Melyek a jó KPI tulajdonságai a tananyag szerint?",
    options: ["Mérhető", "Stratégiai célhoz kapcsolódik", "Értelmezhető", "Cselekvést támogat", "Minél több van belőle, annál jobb", "Csak pénzben fejezhető ki"],
    answer: [0, 1, 2, 3],
    hint: "Négy tulajdonság van.",
    explain: "Mérhető, célhoz kötött, értelmezhető, cselekvést támogató. A sok mutató nem cél (a KPI a <em>kulcs</em>fontosságú mutató), és sok jó KPI nem pénzben mér (pl. megtartási arány, hibaarány)."
  },
  {
    id: "b10-012",
    topic: "10",
    level: 1,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes4",
    type: "single",
    q: "Mi a helyes sorrend egy BI-rendszer rétegeiben?",
    options: [
      "Adatforrások → ETL → adattárház / adattó → adatmodellezés → üzleti analitika → megjelenítés",
      "Adatforrások → megjelenítés → ETL → adattárház → analitika",
      "Adattárház → adatforrások → ETL → megjelenítés → analitika",
      "ETL → megjelenítés → adatforrások → adattárház → analitika"
    ],
    answer: 0,
    hint: "Kövesd az adat útját a keletkezésétől a döntéshozó képernyőjéig.",
    explain: "Az adat a forrásrendszerekből az ETL-en át az adattárházba / adattóba kerül, ott logikai modellbe szervezzük, elemezzük (statisztika, adatbányászat), végül dashboardon, riportban jelenítjük meg."
  },
  {
    id: "b10-013",
    topic: "10",
    level: 3,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes4",
    type: "match",
    q: "Hová tennéd az adatot?",
    pairs: [
      ["Ellenőrzött havi pénzügyi adatok a szabványos riporthoz", "adattárház"],
      ["Vásárlói értékelések szövege és termékfotók későbbi elemzéshez", "adattó"],
      ["A webshop folyamatosan íródó rendelései és kosármódosításai", "operatív adatbázis"],
      ["Egy elemző saját, egyszeri kimutatása 200 sorral", "állomány (pl. Excel)"]
    ],
    hint: "Strukturált + elemzés; nyers + rugalmas; napi tranzakció; lokális, kicsi.",
    explain: "Adattárház: strukturált, historikus, riportolásra (schema-on-write). Adattó: nyers, strukturálatlan is (schema-on-read). Operatív adatbázis: CRUD-tranzakciók. Állomány: egyfelhasználós, kis adat."
  },
  {
    id: "b10-014",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes4",
    type: "single",
    q: "Egy cég minden nyers naplóadatot (kattintás, szenzor) azonnal betölt egy felhős tárolóba, és csak az elemzés előtt alakítja át a szükséges részt. Melyik megközelítés ez?",
    options: ["ELT", "ETL", "OLTP", "Schema-on-write"],
    answer: 0,
    hint: "Mikor történik az átalakítás: a betöltés előtt vagy után?",
    explain: "Betöltés előbb, átalakítás utána, a célrendszerben: ELT (schema-on-read). Az ETL a betöltés előtt alakít (klasszikus adattárház, schema-on-write). Az OLTP a tranzakciós adatbázis-működés neve."
  },
  {
    id: "b10-015",
    topic: "10",
    level: 1,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes5",
    type: "match",
    q: "Az adatbányászat definíciójának négy eleme – mi a szerepük?",
    pairs: [
      ["Nagyméretű adatállomány", "a DM tárgya"],
      ["Magas szintű módszerek", "a DM eszköze"],
      ["Új információ", "a DM eredménye"],
      ["Automatikus folyamat", "a DM végrehajtási módja"]
    ],
    hint: "Min dolgozik, mivel, mit ad, hogyan fut?",
    explain: "Tárgy: a nagy adat; eszköz: matematikai, statisztikai, gépi tanulási algoritmusok; eredmény: új, cselekvésre ösztönző tudás; végrehajtás: (félig) automatikus, a változó környezethez igazodó modell."
  },
  {
    id: "b10-016",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes5",
    type: "multi",
    q: "Melyik feladat <strong>adatbányászat</strong> (és nem információkeresés)?",
    options: [
      "Az ügyfélszolgálati e-mailek automatikus sorolása témák szerint",
      "Ügyfelek csoportosítása viselkedésük alapján",
      "Egy konkrét számla megkeresése a rendszerben",
      "Egy ügyfél telefonszámának kikeresése",
      "Lakásvásárlási jogszabályok összegyűjtése egy jogi adattárból"
    ],
    answer: [0, 1],
    hint: "Létező adatot keresünk elő, vagy új tudást állítunk elő?",
    explain: "Az e-mailek osztályozása és az ügyfelek klaszterezése új információt állít elő. A számla, a telefonszám és a jogszabályok már léteznek az adatbázisban – ez információkeresés, még ha okos algoritmus is kell hozzá."
  },
  {
    id: "b10-017",
    topic: "10",
    level: 3,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes5",
    type: "single",
    q: "Egy K-means futás eredménye standardizált klaszterközéppontok táblája. Mi kell ahhoz, hogy a marketingvezető használni tudja?",
    options: [
      "Utófeldolgozás: az eredmény értelmezése, visszaszámolása, elnevezése és érthető formába öntése",
      "Előfeldolgozás: az adat újratisztítása",
      "Semmi, a középpontok önmagukban érthetők",
      "Egy újabb ETL-futás az adattárházba"
    ],
    answer: 0,
    hint: "Melyik lépés feladata, hogy a szakembernek érthető eredményből szélesebb körnek közvetíthető tudás legyen?",
    explain: "Az utófeldolgozás a bányászat eredményét a felhasználóknak is érthető tudássá alakítja (pl. „hűséges nagyvásárlók”). Az előfeldolgozás a bányászat <em>előtt</em> készíti elő az adatot; az ETL az adattárház feltöltése."
  },
  {
    id: "b10-018",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes6",
    type: "single",
    q: "Két modell: A – tanító 99%, teszt 71%; B – tanító 86%, teszt 84%. Melyiket választod?",
    options: [
      "B-t, mert új adaton jobb, és a két szám közel van (jól általánosít)",
      "A-t, mert a tanítón majdnem tökéletes",
      "A-t, mert a két szám átlaga nagyobb",
      "Mindegy, a tanító és a teszt eredménye nem mond semmit"
    ],
    answer: 0,
    hint: "Melyik szám becsli az üzleti alkalmazásban várható teljesítményt?",
    explain: "A teszt-pontosság becsli az általánosító képességet: B 84%, A 71%. Az A 28 százalékpontos rése a túltanulás jele (bemagolta a tanítóadatot). Átlagolni értelmetlen, a tanítón mért szám nem becsli az új adatot."
  },
  {
    id: "b10-019",
    topic: "10",
    level: 1,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes7",
    type: "single",
    q: "Mi az adatbányászat 6 lépcsős folyamatának helyes sorrendje?",
    options: [
      "Megértés → adatfeltárás → adatelőkészítés → modellezés → kiértékelés → alkalmazás",
      "Adatelőkészítés → megértés → modellezés → adatfeltárás → alkalmazás → kiértékelés",
      "Modellezés → adatfeltárás → megértés → adatelőkészítés → kiértékelés → alkalmazás",
      "Adatfeltárás → modellezés → adatelőkészítés → megértés → alkalmazás → kiértékelés"
    ],
    answer: 0,
    hint: "Az első lépés nem az adatról, hanem az üzleti problémáról szól.",
    explain: "Előbb megértjük a problémát, aztán megismerjük és előkészítjük az adatot, modellezünk, kiértékelünk, alkalmazunk – és ciklikusan vissza a megértéshez. Ez megfelel a CRISP-DM hat fázisának."
  },
  {
    id: "b10-020",
    topic: "10",
    level: 3,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes7",
    type: "single",
    q: "Egy 85%-os teszt-pontosságú lemorzsolódás-modell üzletileg haszontalannak bizonyul, mert havi lemorzsolódást jósol, a megrendelő pedig a szezon utáni visszatérést akarta tudni. Melyik lépésben volt a hiba?",
    options: ["Megértés (1.)", "Modellezés (4.)", "Kiértékelés (5.)", "Adatelőkészítés (3.)"],
    answer: 0,
    hint: "A modell technikailag jó. Hol dől el, hogy pontosan mit kell jósolni?",
    explain: "Az üzleti probléma megértésekor rögzítjük a célt és a siker mérését. Ha ez rossz, a legpontosabb modell is rossz kérdésre felel. A modellezés és a kiértékelés itt rendben volt."
  },
  {
    id: "b10-021",
    topic: "10",
    level: 1,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes8",
    type: "multi",
    q: "Melyek <strong>felügyelt</strong> adatbányászati feladatok az előadás besorolása szerint?",
    options: ["Osztályozás", "Regresszió", "Idősorok elemzése", "Klaszterezés", "Vásárlói kosár elemzése", "Összegzés"],
    answer: [0, 1, 2],
    hint: "Melyiknél van kitüntetett célváltozó, amelynek múltbeli értékeiből tanulunk?",
    explain: "Felügyelt: osztályozás (diszkrét címke), regresszió (folytonos érték), idősor-elemzés (jövőbeli érték). Nem felügyelt: klaszterezés, összegzés, szekvenciális minták, kosárelemzés. (A Moodle-tananyag szerint az idősor és a rendellenesség-keresés a kontextustól függően mindkettő lehet.)"
  },
  {
    id: "b10-022",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes8",
    type: "single",
    q: "„Aki szemes kávét vett, a következő hónapban gyakran darálót is vesz.” Melyik feladat talál ilyen mintázatot?",
    options: ["Szekvenciális mintázatok bányászata", "Vásárlói kosár elemzése", "Klaszterezés", "Regresszió"],
    answer: 0,
    hint: "Egy kosárban vannak, vagy egymás <em>után</em> következnek?",
    explain: "A sorrend (előbb kávé, egy hónap múlva daráló) a lényeg – ez szekvenciális mintázat. A kosárelemzés egy vásárlás együttes tételeit nézi, a klaszterezés csoportokat keres, a regresszió számot jósol."
  },
  {
    id: "b10-023",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes9",
    type: "single",
    q: "Hány rendezetlen változópár van 30 változó esetén?",
    options: ["435", "870", "900", "60"],
    answer: 0,
    hint: R`$\binom{p}{2}=\tfrac{p(p-1)}{2}$`,
    explain: R`$\tfrac{30\cdot29}{2}=435$. A 870 a rendezett párok (A–B és B–A külön), a 900 a $30^2$, a 60 a $2\cdot30$. A párok száma négyzetesen nő a változók számával – ez a dimenzióprobléma egyik arca.`
  },
  {
    id: "b10-024",
    topic: "10",
    level: 3,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes9",
    type: "single",
    q: "Egy hitelmodellből kihagyták a nemet és az életkort, mégis rendszeresen elutasít bizonyos lakóhelyű igénylőket, és a döntés nem magyarázható. Mi a helyes értékelés?",
    options: [
      "A lakóhely helyettesítheti a védett tulajdonságot; bevezetés előtt vizsgálni kell a diszkriminációt és a magyarázhatóságot",
      "Rendben van, mert a védett változókat kihagyták",
      "Rendben van, ha a teszt-pontosság magas",
      "Ez skálázhatósági probléma, több szerver kell"
    ],
    answer: 0,
    hint: "Lehet-e egy „ártatlan” változó erősen összefüggésben egy védett tulajdonsággal?",
    explain: "A védett változó kihagyása nem elég, ha egy másik változó (lakóhely) helyettesíti. A GDPR és az etikus AI elvárása a diszkriminációmentesség és a magyarázhatóság; a pontosság ezt nem pótolja."
  },
  {
    id: "b10-025",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes10",
    type: "single",
    q: R`Egy neuron: $x=(1;\ 3)$, $w=(2;\ -0{,}5)$, $b=-1$, ReLU aktiváció. Mi a kimenete?`,
    options: ["0", "−0,5", "2,5", "0,5"],
    answer: 0,
    hint: R`Súlyozott összeg + eltolás, majd $\max(0,z)$.`,
    explain: R`$z=2\cdot1+(-0{,}5)\cdot3+(-1)=-0{,}5$; ReLU: $\max(0;\ -0{,}5)=0$. A −0,5 az aktiváció elhagyása, a 2,5 a negatív súly előjelének elhagyása ($2+1{,}5-1$), a 0,5 az eltolás elhagyása ($2-1{,}5$).`
  },
  {
    id: "b10-026",
    topic: "10",
    level: 2,
    ref: "10-bi-adatbanyaszat-alapok.html#lepes10",
    type: "single",
    q: "Hány súlya van egy teljesen összekötött 4–3–1 hálónak (eltolások nélkül)?",
    options: ["15", "8", "12", "19"],
    answer: 0,
    hint: "Rétegpáronként szorozd össze a neuronszámokat.",
    explain: R`$4\cdot3+3\cdot1=15$. A 8 a neuronok száma, a 12 csak az első rétegpár, a 19 már a 4 eltolást is tartalmazza ($3+1$).`
  },
  {
    id: "b10-027",
    topic: "10",
    level: 3,
    ref: "10-bi-adatbanyaszat-alapok.html#tovabbi",
    type: "multi",
    q: "Melyek a neurális háló alapú módszerek valódi nehézségei (Q11)?",
    options: [
      "Sok (címkézett) adatot igényelnek",
      "Nehezen magyarázhatók („fekete doboz”)",
      "Hajlamosak a túltanulásra",
      "Sok hiperparamétert kell hangolni",
      "Csak lineáris összefüggést tudnak megtanulni",
      "Nem lehet őket osztályozásra használni"
    ],
    answer: [0, 1, 2, 3],
    hint: "Két állítás pont a háló erősségének az ellentéte.",
    explain: "A háló adat- és számításigényes, fekete doboz, túltanulhat, és sok a hangolandó hiperparaméter (rétegek, neuronok, tanulási ráta), ráadásul érzékeny a skálára. A nemlineáris aktiváció miatt viszont nemlineáris összefüggést is tanul, és osztályozásra is tipikusan használják."
  }
);
