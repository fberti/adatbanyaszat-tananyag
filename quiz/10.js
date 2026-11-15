/* 10. lecke – Üzleti intelligencia és adatbányászat alapfogalmai, gépi tanulás – kvízek */

QUIZZES["l10-lepes2"] = {
  title: "Mini-kvíz – A BI funkciói és az analitika szintjei",
  questions: [
    {
      type: "match",
      q: "Párosítsd a BI-funkciót az alapkérdésével!",
      pairs: [
        ["Riportkészítés", "Mi történt?"],
        ["Elemzés", "Miért történt?"],
        ["Monitorozás", "Mi történik most?"],
        ["Predikció, adatbányászat", "Mi fog történni?"]
      ],
      hint: "Gondolj az idősíkra: múlt, ok, jelen, jövő.",
      explain: "A riport a múltat összesíti, az elemzés az okot keresi, a monitorozás a jelent követi (tipikusan dashboardon), a predikció a korábbi mintázatokból a jövőt becsli."
    },
    {
      type: "single",
      q: "„A kapszulás kávé eladása 40%-kal esett. A lefúrásból kiderült, hogy az egész visszaesés egyetlen, október 20. óta hiányzó terméken jelentkezett.” Melyik analitikai szint ez?",
      options: ["Diagnosztikai (elemzés)", "Leíró (riport)", "Prediktív", "Előíró"],
      answer: 0,
      hint: "A −40% önmagában leíró. Mit tesz hozzá a második mondat?",
      explain: "A változás <em>okát</em> tárja fel (készlethiány), ez diagnosztikai analitika, a BI „elemzés” funkciója. A leíró csak a −40%-ot mondaná meg; prediktív a jövőt becsülné; előíró cselekvést javasolna."
    },
    {
      type: "single",
      q: "Mi a lényegi különbség a dashboard és a riport között?",
      options: [
        "A dashboard néhány KPI (közel) valós idejű, interaktív követésére való; a riport egy lezárt időszakot dokumentál, periodikusan",
        "A dashboardon grafikonok vannak, a riportban csak táblázatok",
        "A riport mindig pontosabb, mert több adatot tartalmaz",
        "A dashboard csak előrejelzést mutat, múltbeli adatot soha"
      ],
      answer: 0,
      hint: "Nem a kinézet dönt, hanem a cél: melyik idősíkra és milyen használatra készül?",
      explain: "Riportban is lehet grafikon, dashboardon is lehet múltbeli adat. A különbség a cél: a dashboard a monitorozást szolgálja (mi történik most?), a riport egy lezárt időszak részletes, rögzített szerkezetű összefoglalása (mi történt?)."
    },
    {
      type: "single",
      q: "„Ez a vevő 70% valószínűséggel nem vásárol decemberben.” Milyen analitika ez?",
      options: ["Prediktív", "Leíró", "Diagnosztikai", "Monitorozás"],
      answer: 0,
      hint: "Megtörtént dologról vagy jövőbeli, bizonytalan kimenetről szól?",
      explain: "Jövőbeli, ismeretlen kimenetet becsül egy modell alapján, bizonytalansággal: prediktív analitika. Leíró lenne pl. „a vevők 80%-a maradt meg októberből” – ez kiszámolható, megtörtént tény."
    }
  ]
};

QUIZZES["l10-lepes3"] = {
  title: "Mini-kvíz – KPI-k",
  questions: [
    {
      type: "single",
      q: "Novemberben 2 500 látogató, 60 rendelés, 450 000 Ft bevétel. Mennyi az átlagos rendelési érték (AOV)?",
      options: ["7 500 Ft", "180 Ft", "9 000 Ft", "2,4%"],
      answer: 0,
      hint: "AOV: egy <em>rendelésre</em> jutó bevétel. Mi a nevező?",
      explain: "$\\text{AOV}=450\\,000/60=7\\,500$ Ft. A 180 Ft a látogatónkénti bevétel ($450\\,000/2\\,500$), a 9 000 Ft az októberi 50 rendeléssel osztva jönne ki, a 2,4% a konverziós arány ($60/2\\,500$)."
    },
    {
      type: "single",
      q: "Bevétel 450 000 Ft, beszerzési költség 279 000 Ft. Mennyi a bruttó árrés?",
      options: ["38%", "62%", "61,3%", "171 000 Ft"],
      answer: 0,
      hint: R`$\text{GPM}=\dfrac{\text{bevétel}-\text{költség}}{\text{bevétel}}$ – a <em>bevételhez</em> viszonyítunk.`,
      explain: R`$(450\,000-279\,000)/450\,000=171\,000/450\,000=0{,}38$. A 62% a költség aránya a bevételhez, a 61,3% a haszon a <em>költséghez</em> viszonyítva ($171/279$, ez a felár, nem az árrés), a 171 000 Ft a bruttó haszon összege, nem arány.`
    },
    {
      type: "single",
      q: "Év elején 80 vevő, év végén 90, közben 18 új vevő jött. Mennyi az ügyfélmegtartási arány (CRR)?",
      options: ["90%", "112,5%", "80%", "22,5%"],
      answer: 0,
      hint: "Előbb vond le az új vevőket a végső létszámból: hány <em>régi</em> vevő maradt?",
      explain: R`$\text{CRR}=(90-18)/80=72/80=0{,}9=90\%$. A 112,5% ($90/80$) az új vevőket is beszámolja; a 80% ($72/90$) rossz nevezőt használ; a 22,5% ($18/80$) az új vevők aránya.`
    },
    {
      type: "multi",
      q: "Melyik mutató <strong>önmagában</strong> jó KPI?",
      options: [
        "Ügyfélmegtartási arány",
        "Hibás termékek aránya",
        "Átlagos rendelési érték",
        "A kiküldött e-mailek száma",
        "A megtartott értekezletek száma"
      ],
      answer: [0, 1, 2],
      hint: "A négy tulajdonság: mérhető, célhoz kötött, értelmezhető, cselekvést támogat. Mindegyik mérhető – melyik kötődik célhoz?",
      explain: "A megtartás, a hibaarány és az AOV egy-egy stratégiai célt mér (hűség, minőség, kosárérték), és a romlásuk beavatkozásra ösztönöz. Az e-mailek és értekezletek száma mérhető, de tevékenységet mér, nem célelérést – sok e-mail lehet haszontalan is."
    }
  ]
};

QUIZZES["l10-lepes4"] = {
  title: "Mini-kvíz – BI-rétegek, ETL, adatforrások",
  questions: [
    {
      type: "match",
      q: "Melyik ETL-lépés?",
      pairs: [
        ["A rendelések lekérdezése a webshop adatbázisából", "Extract (kinyerés)"],
        ["„Kiss Anna” és „Anna Kiss” egy vevővé vonása, dátumformátum egységesítése", "Transform (átalakítás)"],
        ["Az előkészített tábla beírása az adattárházba", "Load (betöltés)"]
      ],
      hint: "Kinyerés a forrásból, átalakítás közben, betöltés a célba.",
      explain: "Az egységesítés, tisztítás a Transform lépés dolga – ez biztosítja, hogy az adattárházba konzisztens adat kerüljön."
    },
    {
      type: "single",
      q: "Mi a különbség az ETL és az ELT között?",
      options: [
        "ELT-nél a nyers adatot előbb betöltjük a célrendszerbe, és ott alakítjuk át; ETL-nél az átalakítás a betöltés előtt történik",
        "Az ELT az ETL régebbi neve, ugyanazt jelenti",
        "ELT-nél nincs átalakítás, az adat örökre nyers marad",
        "ETL-t csak adattóhoz, ELT-t csak Excelhez használnak"
      ],
      answer: 0,
      hint: "Nézd a betűk sorrendjét: mikor jön a T (Transform)?",
      explain: "ETL: Extract → Transform → Load, a célba (klasszikus adattárház, schema-on-write) már tiszta adat kerül. ELT: Extract → Load → Transform, a nyers adat a célba (adattó, felhős adattárház, schema-on-read) kerül, és ott alakítjuk át, amikor kell. Az átalakítás ELT-nél is megtörténik, csak később."
    },
    {
      type: "match",
      q: "Párosítsd az adatforrás-szintet a jellemzőjével!",
      pairs: [
        ["Állomány", "lokális, egyfelhasználós, kis adat (pl. Excel)"],
        ["Adatbázis", "központosított, többfelhasználós, tranzakcióorientált"],
        ["Adattárház", "strukturált, historikus adat riportolásra, ETL-lel töltve"],
        ["Adattó", "nyers, strukturálatlan adat is, schema-on-read"]
      ],
      hint: "Haladj a legkisebbtől: egy fájl → napi működés → elemzés → nyers big data.",
      explain: "Állomány: Excel, CSV. Adatbázis: napi tranzakciók (CRUD). Adattárház: több forrás egységesített, historikus adata elemzéshez (Redshift, Snowflake, BigQuery). Adattó: nyers szöveg, kép, szenzoradat is (Azure Data Lake, AWS Lake Formation)."
    },
    {
      type: "single",
      q: "Melyik BI-réteg feladata az eredmények dashboardokon és riportokban történő bemutatása?",
      options: ["Megjelenítési réteg", "Adatintegrációs réteg", "Adattárolási réteg", "Adatforrás réteg"],
      answer: 0,
      hint: "A lánc utolsó eleme.",
      explain: "A megjelenítési réteg (Power BI, Tableau, Qlik, Looker) adja a felhasználói felületet. Az integráció az ETL, a tárolás az adattárház / adattó, a forrás a belső és külső rendszerek."
    }
  ]
};

QUIZZES["l10-lepes6"] = {
  title: "Mini-kvíz – Feladat, modell, tanítás, tesztelés",
  questions: [
    {
      type: "single",
      q: "1 200 sor, 75/25 arányú felosztás. A teszten 255 sort talált el a modell. Mennyi a teszt-pontosság?",
      options: ["85%", "21,25%", "28,3%", "75%"],
      answer: 0,
      hint: "Előbb: hány sor van a tesztben? A pontosság nevezője a tesztsorok száma.",
      explain: R`Teszt: $0{,}25\cdot1\,200=300$ sor, pontosság $255/300=0{,}85$. A 21,25% ($255/1\,200$) az összes sorral oszt, a 28,3% ($255/900$) a tanítóállomány méretével, a 75% a felosztási arány.`
    },
    {
      type: "single",
      q: "Melyik állományon mérjük a modell általánosító képességét?",
      options: ["A tesztelő állományon", "A tanító állományon", "A tanító és a tesztelő állomány együttesén", "Bármelyiken, ugyanazt kapjuk"],
      answer: 0,
      hint: "Az üzletet az érdekli, mit tud a modell olyan adaton, amit még nem látott.",
      explain: "A tesztelő állományt a modell tanítás közben nem látja, ezért becsli az új adaton várható teljesítményt. A tanítón mért eredmény túl optimista (pl. 98% vs. 85%); ha a kettő nagyon eltér, az túltanulásra utal."
    },
    {
      type: "match",
      q: "Kvalitatív (hiperparaméter) vagy kvantitatív (paraméter)?",
      pairs: [
        ["A döntési fa maximális mélysége", "kvalitatív rész – hiperparaméter"],
        ["A rejtett rétegek neuronjainak száma", "kvalitatív rész – hiperparaméter"],
        ["A döntési fa gyökerében kiszámolt vágási érték", "kvantitatív rész – paraméter"],
        ["A neurális háló egy élének súlya", "kvantitatív rész – paraméter"]
      ],
      hint: "Amit tanítás előtt mi választunk, az a kvalitatív rész; amit a tanítás számol ki, az a kvantitatív.",
      explain: "A szerkezet és a hiperparaméterek (mélység, rétegek, neuronok) a kvalitatív rész. A tanítás határozza meg a paramétereket: a vágásokat és a súlyokat."
    }
  ]
};

QUIZZES["l10-lepes8"] = {
  title: "Mini-kvíz – Adatbányászati feladattípusok",
  questions: [
    {
      type: "match",
      q: "Párosítsd a kérdést az adatbányászati feladattal!",
      pairs: [
        ["Visszatér-e ez a vevő jövő hónapban (igen / nem)?", "osztályozás"],
        ["Mennyit költ a vevő jövő hónapban (Ft)?", "regresszió"],
        ["Milyen vevőcsoportjaink vannak (címke nélkül)?", "klaszterezés"],
        ["Mely termékeket veszik gyakran egy kosárban?", "vásárlói kosár elemzése"],
        ["Mekkora lesz a kereslet a következő 4 hétben a múltbeli heti adatok alapján?", "idősor-elemzés"]
      ],
      hint: "Van-e célváltozó? Ha van: kategória vagy szám? Ha nincs: csoport vagy együttes előfordulás? Számít-e az idő?",
      explain: "Kategória jóslása: osztályozás; szám jóslása: regresszió; időbélyeges sorozat jövője: idősor-elemzés (mind felügyelt). Címke nélküli csoportok: klaszterezés; együtt vásárolt termékek: kosárelemzés (nem felügyelt)."
    },
    {
      type: "multi",
      q: "Melyek <strong>nem felügyelt</strong> adatbányászati feladatok az előadás szerint?",
      options: ["Klaszterezés", "Összegzés", "Szekvenciális mintázatok bányászata", "Vásárlói kosár elemzése", "Osztályozás", "Regresszió"],
      answer: [0, 1, 2, 3],
      hint: "Melyiknél nincs kitüntetett célváltozó, amit múltbeli példákból tanulunk?",
      explain: "Az előadás négy nem felügyelt feladatot sorol: klaszterezés, összegzés, szekvenciális minták, kosárelemzés. Az osztályozás, a regresszió (és az idősor-elemzés) felügyelt, mert van ismert célváltozó."
    },
    {
      type: "single",
      q: "Mikor <strong>felügyelt</strong> a rendellenesség-keresés (pl. csalásfelderítés)?",
      options: [
        "Ha vannak címkézett múltbeli példák (igazolt csalás / szabályos), és ebből tanul a modell",
        "Ha nagyon sok tranzakció van",
        "Ha az elemző kézzel nézi át az eseteket",
        "Soha, a rendellenesség-keresés mindig nem felügyelt"
      ],
      answer: 0,
      hint: "Mitől lesz bármely feladat felügyelt?",
      explain: "Címkézett példákkal a rendellenesség-keresés kiegyensúlyozatlan bináris osztályozás (felügyelt). Címke nélkül az algoritmusnak kell megtalálnia, mi tér el a többségtől (nem felügyelt). Az adatmennyiség és az emberi átnézés nem dönti el a kategóriát."
    }
  ]
};

QUIZZES["l10-lepes9"] = {
  title: "Mini-kvíz – Kihívások",
  questions: [
    {
      type: "single",
      q: "Öt rendelés átlaga 7 800 Ft (6 000, 9 000, 4 500, 12 000, 7 500). Valaki a 7 500-at 75 000-nek gépeli. Mennyi lesz az átlag?",
      options: ["21 300 Ft", "7 800 Ft", "9 000 Ft", "19 000 Ft"],
      answer: 0,
      hint: "Az összeg 67 500 Ft-tal nő, a darabszám marad 5.",
      explain: R`$(6\,000+9\,000+4\,500+12\,000+75\,000)/5=106\,500/5=21\,300$ Ft – közel háromszoros. A 9 000 Ft az új <em>medián</em> (az alig változik), a 19 000 Ft akkor jönne ki, ha a hibás sort hozzáadnád a többihez (6 rendelés), nem lecserélnéd vele a 7 500-at. Ez a GIGO: egy hibás adat torzítja az eredményt.`
    },
    {
      type: "single",
      q: "Hány változópárt kell megvizsgálni 100 változónál, ha minden párra egy szórásdiagramot rajzolunk?",
      options: ["4 950", "100", "9 900", "10 000"],
      answer: 0,
      hint: R`Rendezetlen párok: $\binom{p}{2}=\tfrac{p(p-1)}{2}$.`,
      explain: R`$\tfrac{100\cdot99}{2}=4\,950$. A 9 900 a rendezett párok száma (A–B és B–A külön), a 10 000 a $100^2$ (önmagával párosítva is). Ez a dimenzióprobléma: tízszer több változó, százszor több pár.`
    },
    {
      type: "match",
      q: "Melyik kihívás?",
      pairs: [
        ["Egy elgépelt összeg megháromszorozza az átlagot", "adatminőség (GIGO)"],
        ["A modell 10 000 vevőn 2 perc, 2 millión két nap alatt sem fut le", "skálázhatóság"],
        ["A hétfői visszaesést csak a boltvezető tudja megmagyarázni", "szakterületi ismeretek"],
        ["A modell vásárlásokból várandósságra következtet, és kupont küld", "adatvédelem, etika (GDPR)"],
        ["Szöveges értékelések, termékfotók és táblázatos rendelések együtt", "heterogén adatok"]
      ],
      hint: "Mindegyik az előadás kihíváslistájának egy-egy eleme.",
      explain: "Adatminőség: rossz bemenet, rossz kimenet. Skálázhatóság: növekvő adat mellett is futnia kell. Szakterület: az értelmezéshez iparági tudás kell. Adatvédelem: a Target-eset. Heterogén adat: eltérő típusú, szerkezetű források."
    }
  ]
};

QUIZZES["l10-lepes10"] = {
  title: "Mini-kvíz – Gépi tanulás, neurális háló",
  questions: [
    {
      type: "single",
      q: R`Egy neuron: $x=(2;\ 1)$, $w=(0{,}5;\ -1)$, $b=0{,}5$, ReLU aktiváció. Mi a kimenete?`,
      options: ["0,5", "0", "2,5", "−0,5"],
      answer: 0,
      hint: R`Súlyozott összeg + eltolás, aztán $\max(0,z)$.`,
      explain: R`$z=0{,}5\cdot2+(-1)\cdot1+0{,}5=0{,}5$, ReLU: $0{,}5$. A 0 akkor jönne ki, ha $z$ negatív lenne; a 2,5 a súly előjelét elhagyja ($1+1+0{,}5$); a −0,5 az eltolást kivonja hozzáadás helyett.`
    },
    {
      type: "single",
      q: "Hány súlya van egy 3–4–1 szerkezetű (3 bemenet, 4 rejtett neuron, 1 kimenet) teljesen összekötött hálónak? (Eltolások nélkül.)",
      options: ["16", "8", "12", "21"],
      answer: 0,
      hint: "Minden neuron az előző réteg összes neuronjától kap élt. Rétegpáronként szorozz!",
      explain: R`$3\cdot4+4\cdot1=16$ súly. A 8 a neuronok összeadása ($3+4+1$), a 12 csak az első rétegpár, a 21 már az 5 eltolást is tartalmazza.`
    },
    {
      type: "single",
      q: "Miért nevezzük a neurális hálót gépi tanulási módszernek?",
      options: [
        "Mert a súlyait nem kézzel adjuk meg, hanem a tanítóadatból, a hiba visszaterjesztésével tanulja meg",
        "Mert úgy gondolkodik, mint az emberi agy",
        "Mert mindig pontosabb minden más módszernél",
        "Mert nincs szüksége adatra a működéshez"
      ],
      answer: 0,
      hint: "Mi a gépi tanulás lényege: honnan jön a szabály?",
      explain: "A gépi tanulás lényege, hogy a modell az adatból tanul: a háló a hibából visszaterjesztéssel, iteratívan állítja be a súlyokat. Az „agyhoz hasonlóság” csak laza analógia, és a háló nem mindig a legjobb: kis táblázatos adaton egy döntési fa gyakran ugyanolyan jó."
    },
    {
      type: "match",
      q: "Párosítsd a BI-alkalmazást a feladattípussal!",
      pairs: [
        ["Csalásfelderítés a tranzakciókban", "rendellenesség-keresés"],
        ["Hiteligénylő besorolása kockázatos / nem kockázatos", "osztályozás"],
        ["Ügyfelek csoportosítása előre megadott csoportok nélkül", "klaszterezés"],
        ["Kereslet előrejelzése a szezon és az akciók alapján", "idősor-előrejelzés"]
      ],
      hint: "Ugyanaz a módszer (neurális háló) többféle feladatra is jó – a feladatot a kérdés dönti el.",
      explain: "A csalásfelderítés a szokásostól eltérő tranzakciót keresi; a hitelképesség kategória; a szegmentáció címke nélküli csoportosítás; a kereslet időben rendezett adat jövőbeli értéke."
    }
  ]
};

QUIZZES["l10-vegso"] = {
  title: "Ellenőrző kvíz – BI és adatbányászat alapjai (K1–K6 és a lecke egésze)",
  questions: [
    {
      type: "single",
      q: "K1) Melyik állítás fogalmazza meg a legpontosabban a BI-rendszerek feladatát?",
      options: [
        "A nyers adatok gyűjtése, feldolgozása és értelmezése, hogy átfogó képet adjanak a múltbeli és jelenlegi teljesítményről, és előrejelzést készítsenek a jövőre",
        "Elsősorban a humánerőforrás-menedzsment, a teljesítményértékelés és a bérszámfejtés támogatása",
        "Központi szerverek és hálózati infrastruktúra biztosítása a folyamatos rendelkezésre álláshoz",
        "A pénzügyi tranzakciók rögzítése és a havi zárások automatizálása a jogszabályi megfelelőségért"
      ],
      answer: 0,
      hint: "A BI definíciója: nyers adatból döntéstámogató információ. Melyik válasz szól az egész vállalat döntéseiről?",
      explain: "A BI a nyers adatból múlt, jelen és jövő képét adja a döntéshozóknak. A HR-elemzés a BI egyik <em>alkalmazási területe</em>, nem a fő feladata; az infrastruktúra és a könyvelés a BI <em>adatforrásai</em> vagy háttere, nem maga a BI."
    },
    {
      type: "single",
      q: "K2) Melyik BI-komponens biztosítja az adatok konzisztenciáját és egységes formátumát az adattárházba való betöltés előtt?",
      options: [
        "Az ETL-folyamat: kinyeri, egységesíti, tisztítja és átalakítja az adatokat, mielőtt betöltené",
        "A jelentéskészítő eszközök az egységes megjelenítéssel",
        "Maga az adattárház, amely fejlett technológiájával önmagában garantálja a konzisztenciát",
        "Az adatvizualizáció, mint az egységesítés utolsó lépése"
      ],
      answer: 0,
      hint: "A kérdés kulcsszava: „a betöltés <em>előtt</em>”. Melyik lépés van a forrás és az adattárház között?",
      explain: "Az ETL Transform lépése egységesít és tisztít, mielőtt a Load betöltené az adatot. Az adattárház nem javít magától, a riport és a vizualizáció pedig a lánc végén van – rossz adatot csak szépen mutatnak."
    },
    {
      type: "single",
      q: "K3) Mi a legfőbb különbség egy operatív adatbázis és egy BI-ban használt adattárház között?",
      options: [
        "Az operatív adatbázis a napi tranzakciók gyors rögzítésére és módosítására (CRUD) való, az adattárház nagy mennyiségű historikus adat lekérdezésére és elemzésére",
        "Az operatív adatbázis lassabb és kevésbé megbízható, mert régebbi technológiára épül",
        "Az operatív adatbázis tárolja a historikus adatot elemzéshez, az adattárház a valós idejű tranzakciókat",
        "Az operatív adatbázist a felhasználók riportolásra, az adattárházat a fejlesztők folyamatoptimalizálásra használják"
      ],
      answer: 0,
      hint: "Gondolj a webshopra: hol íródik be egy új rendelés, és hol fut a 3 éves összesítő riport?",
      explain: "Más célra optimalizáltak: tranzakció vs. elemzés. A „régebbi, lassabb” nem igaz; a harmadik válasz pont fordítva mondja; a negyedik összekeveri a felhasználókat."
    },
    {
      type: "single",
      q: "K4) Mi az adatbányászat legfőbb feladata, amely megkülönbözteti az egyszerű adatelemzéstől?",
      options: [
        "Fejlett algoritmusokkal rejtett mintákat, összefüggéseket, trendeket fedez fel nagy adathalmazokban, amelyek szabad szemmel nem láthatók",
        "Szoftveres rendszerek fejlesztése és felhasználói felületek tervezése",
        "Az operatív tranzakciók gyors és hatékony rögzítése a napi működés során",
        "A vállalat összes historikus adatának rendszerezése és tárolása egy központi adattárházban"
      ],
      answer: 0,
      hint: "A definíció négy eleméből melyik az <em>eredmény</em>?",
      explain: "Az adatbányászat eredménye <em>új információ</em>: rejtett mintázat. A tranzakciórögzítés az operatív adatbázis, a tárolás az adattárház feladata, a szoftverfejlesztésnek pedig nincs köze hozzá."
    },
    {
      type: "single",
      q: "K5) Melyik módszer csoportosítja az adatokat előzetes címkézés vagy kategóriák nélkül, kizárólag a hasonlóságuk alapján?",
      options: [
        "Klaszterezés",
        "Asszociációs szabályok bányászata",
        "Regresszióelemzés",
        "Osztályozás"
      ],
      answer: 0,
      hint: "Kulcsszavak: „címke nélkül” és „hasonlóság alapján csoportosít”.",
      explain: "A klaszterezés felügyelet nélkül, hasonlóság alapján képez csoportokat (pl. marketing-szegmentáció). Az asszociációs szabály együtt előforduló termékeket keres, a regresszió számot jósol, az osztályozás <em>előre definiált</em> kategóriába sorol, ehhez címkézett adat kell."
    },
    {
      type: "single",
      q: "K6) Mi a különbség a felügyelt és a felügyeletlen tanulási módszerek között?",
      options: [
        "A felügyelt tanuláshoz előzetesen címkézett adatok kellenek a betanításhoz, a felügyeletlen a címkézetlen adatokban keresi a belső struktúrát",
        "A felügyelt módszerek csak belső vállalati adatot használnak, a felügyeletlenek külsőt",
        "A felügyelt módszereket csak szakértők használhatják, a felügyeletleneket bárki",
        "A felügyelt módszerek mindig gyorsabbak és pontosabbak"
      ],
      answer: 0,
      hint: "Mi „felügyeli” a tanulást? Mi van meg a tanítóadatban a felügyelt esetben?",
      explain: "A „felügyelet” a címke: a tanítópéldák helyes kimenete ismert, ehhez igazítjuk a modellt. Az adat eredete, a felhasználó szakértelme és a sebesség nem különbözteti meg a kettőt."
    },
    {
      type: "single",
      q: "Egy webshopnál a bevétel 12,5%-kal nőtt, a látogatók száma 25%-kal, a konverzió 2,5%-ról 2,4%-ra esett, az átlagos rendelési érték 8 000 Ft-ról 7 500 Ft-ra. Mi a helyes következtetés?",
      options: [
        "A bevétel a több látogató miatt nőtt, a látogatók viszont kisebb arányban és kisebb kosárral vásároltak",
        "Minden mutató javult, a kampány tökéletesen működött",
        "A konverzió 0,1%-kal esett, ez elhanyagolható, csak a bevételt kell figyelni",
        "A bevétel azért nőtt, mert nagyobb kosarakat vettek"
      ],
      answer: 0,
      hint: "Egyetlen KPI-ből ne vonj le következtetést. Melyik mutató nőtt, melyik csökkent?",
      explain: R`Több KPI együtt adja a képet: látogató ↑, konverzió ↓, AOV ↓, a bevétel mégis ↑, mert a látogatónövekedés ellensúlyozta. A konverzió esése 0,1 <em>százalékpont</em>, ami relatíve 4% ($0{,}1/2{,}5$) – nem a „0,1%”.`
    },
    {
      type: "single",
      q: "Mi az adatbányászat és az információkeresés különbsége?",
      options: [
        "Az információkeresés egy már létező adatot keres elő, az adatbányászat új, eddig nem létező tudást állít elő",
        "Az információkeresés nagy adaton, az adatbányászat kis adaton működik",
        "Az adatbányászat csak SQL-lel, az információkeresés csak gépi tanulással végezhető",
        "Nincs különbség, a két szó szinonima"
      ],
      answer: 0,
      hint: "Csilla telefonszáma vs. a vevők rejtett csoportjai.",
      explain: "A telefonszám már bent van az adatbázisban – ez információkeresés (ehhez is kellhet okos algoritmus). A vevőcsoportokat senki sem írta be, az algoritmus állítja elő – ez adatbányászat. Mindkettő működhet nagy adaton."
    },
    {
      type: "single",
      q: "Egy modell a tanítóállományon 98%-os, a tesztelőn 85%-os pontosságú. Melyik számot közöljük a megrendelővel a várható üzleti teljesítményként?",
      options: [
        "85%, mert a tesztállomány becsli az új adaton várható teljesítményt",
        "98%, mert az a nagyobb állományon mért eredmény",
        "A kettő átlagát, 91,5%-ot",
        "Egyiket sem, csak a tanítás idejét"
      ],
      answer: 0,
      hint: "Melyik adatot nem látta a modell tanítás közben?",
      explain: R`Az általánosító képességet a tesztelő állomány méri. A 98% túl optimista, mert a modell ezeket a sorokat már látta; a nagy rés túltanulásra utalhat. Átlagolni értelmetlen: a tanítón mért szám nem becsli az új adatot.`
    },
    {
      type: "match",
      q: "Rendeld az adatbányászati folyamat lépéséhez a tevékenységet!",
      pairs: [
        ["A siker KPI-jának rögzítése a megrendelővel", "1. Megértés"],
        ["A hiányzó értékek és az eloszlások megnézése", "2. Adatfeltárás"],
        ["Rendelésekből vevőnkénti sor, hiánypótlás", "3. Adatelőkészítés"],
        ["Döntési fa tanítása 80/20 felosztással", "4. Modellezés"],
        ["A teszt-pontosság bemutatása a vezetésnek", "5. Kiértékelés"],
        ["A modell beépítése a rendszerbe és havi ellenőrzése", "6. Alkalmazás"]
      ],
      hint: "Megértés → adatfeltárás → adatelőkészítés → modellezés → kiértékelés → alkalmazás.",
      explain: "Ez az előadás 6 lépése (≈ CRISP-DM). Az adatfeltárás az adat megismerése, az előkészítés az átalakítása; a monitorozás az alkalmazás része, és az új tapasztalatok visszavezetnek a megértéshez (ciklikus folyamat)."
    },
    {
      type: "multi",
      q: "Melyek szerepelnek az előadás szerint az adatbányászat kihívásai között?",
      options: [
        "Adatminőség, megbízhatóság",
        "Szakterületi ismeretek",
        "Skálázhatóság",
        "Dimenzióprobléma (nagyon sok változó)",
        "Adatvédelem (GDPR), diszkriminációmentesség",
        "Hogy túl kevés adatbányászati szoftver létezik"
      ],
      answer: [0, 1, 2, 3, 4],
      hint: "Egy válasz kakukktojás: az eszközök száma nem probléma.",
      explain: "Az előadás listája: adatminőség, szakterületi tudás, skálázhatóság, dimenzió, GDPR és diszkrimináció, heterogén adat, összetett algoritmusok. Eszközből sok van (Altair AI Studio, KNIME, Orange, scikit-learn…) – inkább az integrálásuk a kérdés."
    },
    {
      type: "single",
      q: "Mit jelent a „garbage in, garbage out” elv?",
      options: [
        "Rossz minőségű bemenő adatból a legjobb módszer is rossz eredményt ad",
        "A felesleges adatokat a modellezés után törölni kell",
        "A modell kimenetét mindig szűrni kell, mert sok benne a hiba",
        "A régi adatokat nem szabad betölteni az adattárházba"
      ],
      answer: 0,
      hint: "Az elgépelt 75 000 Ft-os rendelés.",
      explain: "Az eredmény minősége nem lehet jobb a bemenő adaténál. Ezért van a tisztítás (ETL, előfeldolgozás) a modellezés <em>előtt</em>, és ezért mondja a tananyag: egyszerű modell jó adaton gyakran többet ér, mint bonyolult modell rossz adaton."
    }
  ]
};
