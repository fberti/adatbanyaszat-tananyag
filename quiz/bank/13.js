/* Vizsgagyakorló kérdésbank – 13. lecke: Többdimenziós (MD) adatmodell és MDX
   Minden szám a lecke mini kockájára (Értékesítés: Termék × Bolt × Idő) vagy a Moodle-anyag
   Analysis Server-es mintájára (BOLTOK, TERMEKEK, FORGALOM) vonatkozik, Pythonnal ellenőrizve. */

BANK.push(
  // ---------- 1. lépés: relációs modell, MOLAP / ROLAP / HOLAP ----------
  {
    id: "b13-001",
    topic: "13",
    level: 1,
    ref: "13-md-modell-mdx.html#lepes1",
    type: "single",
    q: "Az előadás szerint mi az SQL-alapú elemzés összetettségének fő oka, amelyet az MD modell megszüntet?",
    options: [
      "A táblák nagy száma és a köztük lévő kapcsolatok (sok JOIN).",
      "Az, hogy az SQL nem tud összeget számolni.",
      "Az, hogy a relációs adatbázis nem tud dátumot tárolni.",
      "Az, hogy az SQL-ben nincs WHERE feltétel."
    ],
    answer: 0,
    hint: "Mi tűnik el az MDX-lekérdezésből a SQL-hez képest?",
    explain: "A normalizálás miatt az adatok sok táblában vannak, ezért sok JOIN és al-SELECT kell. A kocka egyetlen objektumba integrálja őket: „nincs szükség egyesítésre, könnyű az aggregáció”. Az SQL tud összesíteni és szűrni, csak ez sok tábla esetén nehézkes."
  },
  {
    id: "b13-002",
    topic: "13",
    level: 1,
    ref: "13-md-modell-mdx.html#lepes1",
    type: "match",
    q: "Párosítsd a tárolási módot a leírásával!",
    pairs: [
      ["MOLAP", "saját többdimenziós tároló, előre számolt összesítések"],
      ["ROLAP", "ténytábla és dimenziótáblák relációs adatbázisban"],
      ["HOLAP", "részletek relációsan, összesítések kockában"]
    ],
    hint: "M = multidimenzionális, R = relációs, H = hibrid.",
    explain: "A logikai modell (kocka) mindháromban ugyanaz, csak a fizikai tárolás különbözik. A MOLAP a leggyorsabb lekérdezésre, a ROLAP a legkevésbé tárhelyigényes, a HOLAP a kettő közötti kompromisszum."
  },
  {
    id: "b13-003",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes1",
    type: "single",
    q: "A Moodle-anyag sémájában (<code>FORGALOM(bolt FK, termek FK, datum)</code>, <code>TERMEK(…, gyarto FK)</code>, <code>GYARTO(gykod PK, cegnev, …)</code>) hány JOIN kell a „gyártónkénti havi forgalom” SQL-lekérdezéséhez?",
    options: ["2", "1", "3", "0"],
    answer: 0,
    hint: "A gyártó a FORGALOM-ból csak egy köztes táblán át érhető el. A hónapot a dátumból képezzük.",
    explain: "FORGALOM → TERMEK → GYARTO: 2 JOIN. A hónaphoz nem kell tábla, a dátummezőből képezzük (DATE_FORMAT). A kockában a Gyártó a Termék dimenzió egy szintje, a Hónap az Időé – JOIN nélkül."
  },

  // ---------- 2. lépés: a kocka elemei ----------
  {
    id: "b13-004",
    topic: "13",
    level: 1,
    ref: "13-md-modell-mdx.html#lepes2",
    type: "single",
    q: "A telefonhívások kockájában (hívások száma, hívások időtartama, dátum, eszköztípus, szolgáltató) melyik dimenzió?",
    options: ["az eszköz típusa", "a hívások darabszáma", "a hívások időtartama", "a hívások átlagos hossza"],
    answer: 0,
    hint: "A dimenzió szerint bontunk; a mértéket összesítjük.",
    explain: "Az eszköztípus (a dátummal és a szolgáltatóval együtt) a cella helyét jelöli ki: dimenzió. A darabszám és az időtartam mérték, az átlagos hossz ezekből számolt (számított) mérték."
  },
  {
    id: "b13-005",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes2",
    type: "multi",
    q: "Mely állítások igazak a mini kockára (4 termék, 3 bolt, 2 hónap; a Dobó boltban nincs sajt)?",
    options: [
      "24 cellapozíciója van.",
      "A ténytáblában 22 sor van.",
      "A Kifli a Termék dimenzió egy tagja.",
      "Az egységár mérték, mert minden termékhez tartozik egy szám."
    ],
    answer: [0, 1, 2],
    hint: "Szorozd össze a tagok számát, és vond le az üres cellákat. Összeadható-e az egységár?",
    explain: "4 · 3 · 2 = 24 pozíció; a Sajt–Dobó cella két hónapban üres, így 22 kitöltött cella = 22 ténytáblasor. Az egységár a termék attribútuma: nem cellánként változik, és összege értelmetlen."
  },
  {
    id: "b13-006",
    topic: "13",
    level: 1,
    ref: "13-md-modell-mdx.html#lepes2",
    type: "match",
    q: "Párosítsd a relációs fogalmat a kockamodellbeli megfelelőjével (Moodle-anyag)!",
    pairs: [
      ["relációs tábla", "adatkocka"],
      ["kulcsmező, meghatározó mezők", "dimenzió"],
      ["meghatározott nem-kulcs mezők", "változó (mérték)"],
      ["egy rekord a meghatározó mezők nélkül", "ténycella"]
    ],
    hint: "Ami a rekordot azonosítja, abból lesz a cella „címe”; ami függ tőle, az a tartalma.",
    explain: "A tábla ↔ kocka; a meghatározó mezők a dimenziók (cellacím), a tőlük függő mezők a mértékek; egy rekord adattartalma a ténycella."
  },

  // ---------- 3–4. lépés: hierarchia, sémakonverzió ----------
  {
    id: "b13-007",
    topic: "13",
    level: 1,
    ref: "13-md-modell-mdx.html#lepes3",
    type: "single",
    q: "Mi az alapszint (bázisszint) a hópehelymodellben?",
    options: [
      "A dimenzióhierarchia legrészletesebb szintje, amely közvetlenül a ténycellához kapcsolódik.",
      "A leginkább összesített szint (pl. Összes, Év).",
      "A MEASURES dimenzió.",
      "A ténytábla elsődleges kulcsa."
    ],
    answer: 0,
    hint: "A ténytábla idegen kulcsa melyik szintre mutat: boltra vagy városra?",
    explain: "Az alapszint a legrészletesebb (Termék, Bolt, Nap), ehhez kötődik a ténycella; a többi szint ennek aggregátuma. Az előadás a hópehelyábra miatt „gyökérnek” hívja – az MDX-fában viszont az All a gyökér, a legrészletesebb tagok a levelek."
  },
  {
    id: "b13-008",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes3",
    type: "single",
    q: "Miért nem érdemes a termékkategóriát a Termék melletti külön dimenzióként felvenni?",
    options: [
      "Mert a dimenzióknak függetlennek kellene lenniük, a termék pedig egyértelműen meghatározza a kategóriát; ezért a kategória a Termék dimenzió szintje.",
      "Mert egy kockában legfeljebb három dimenzió lehet.",
      "Mert a kategória mérték.",
      "Mert a kategória szerint nem lehet összesíteni."
    ],
    answer: 0,
    hint: "Lenne-e értelme a „Kenyér, Tejtermék” cellának?",
    explain: "Külön dimenzióként értelmetlen kombinációk (Kenyér–Tejtermék) keletkeznének. Mivel minden termék pontosan egy kategóriába tartozik (1:N), a kategória a Termék dimenzió aggregáltabb szintje lesz."
  },
  {
    id: "b13-009",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes4",
    type: "single",
    q: "Könyvtári séma: <code>KONYV(kod PK, cim, szerzo FK, kiado FK)</code>, <code>SZERZO(kod PK, nev, orszag)</code>, <code>KIADO(kod PK, nev, varos)</code>, <code>TAG(kod PK, nev, telepules)</code>, <code>KOLCSONZES(tag FK, konyv FK, datum, napok)</code>. Melyik a ténytábla?",
    options: ["KOLCSONZES", "KONYV", "SZERZO", "TAG"],
    answer: 0,
    hint: "Amelyikből csak kifelé indulnak idegen kulcsok, és bele egy sem mutat.",
    explain: "A KOLCSONZES a TAG és a KONYV felé hivatkozik, rá senki: ténytábla (mérték: napok, kölcsönzések száma). A KONYV-be a KOLCSONZES mutat, tehát dimenzió alapszint (KONYV → SZERZO → ország, KONYV → KIADO → város)."
  },
  {
    id: "b13-010",
    topic: "13",
    level: 3,
    ref: "13-md-modell-mdx.html#lepes4",
    type: "single",
    q: "Melyik a legjobb mérték egy bolti kockában?",
    options: [
      "eladott darabszám",
      "a termék egységára",
      "a havi záró készlet, időben összeadva",
      "a vásárlói panasz szövege"
    ],
    answer: 0,
    hint: "A mérték legyen aggregálható, összeadható (additív) minden dimenzió mentén.",
    explain: "A darabszám minden dimenzió mentén összeadható. Az egységár attribútum (összege értelmetlen). A készlet csak félig additív: boltok között összeadható, hónapok között nem. A szöveg nem összesíthető (helyette a panaszok száma lehet mérték)."
  },

  // ---------- 5–6. lépés: MD algebra ----------
  {
    id: "b13-011",
    topic: "13",
    level: 1,
    ref: "13-md-modell-mdx.html#lepes5",
    type: "single",
    q: "„A 2025. januári italforgalom a budapesti üzletekben.” Melyik művelet ez?",
    options: ["kockázás (dice)", "szeletelés (slice)", "felgöngyölítés (roll-up)", "hajtogatás (fold)"],
    answer: 0,
    hint: "Hány dimenzión van feltétel?",
    explain: "Három dimenzión szűrünk (Dátum.Hónap, Termék.Kategória, Bolt.Település): ez kockázás. A szeletelés egyetlen dimenzión szűr. Szintváltás és dimenzióelhagyás itt nincs."
  },
  {
    id: "b13-012",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes5",
    type: "single",
    q: "Kockázás a mini kockán: Város = Miskolc és Kategória = Tejtermék. Hány cella marad, és mennyi a darabszámuk összege?",
    options: ["8 cella, 140", "4 cella, 140", "8 cella, 165", "12 cella, 375"],
    answer: 0,
    hint: "2 termék × 2 bolt × 2 hónap. Az Idő mentén nem szűrünk.",
    explain: "Tej és Sajt × Avas és Belváros × 2 hónap = 8 cella; összeg: Tej 25+20+35+25 = 105, Sajt 5+10+15+5 = 35, együtt 140. A 4 cella egy hónapot feltételez, a 165 az összes tejtermék (Egerrel), a 375 az összes miskolci eladás."
  },
  {
    id: "b13-013",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes6",
    type: "single",
    q: "A februári szeletet Termék → Kategória szerint felgöngyölítve mennyi a Pékáru–Avas cella? (Február, Avas: Kenyér 20, Kifli 60, Tej 35, Sajt 15.)",
    options: ["80", "60", "130", "50"],
    answer: 0,
    hint: "A Pékáru gyerekei a Kenyér és a Kifli.",
    explain: "Pékáru = Kenyér + Kifli = 20 + 60 = 80. A 60 csak a Kifli, a 130 az Avas összes februári eladása, az 50 a Tejtermék (35 + 15)."
  },
  {
    id: "b13-014",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes6",
    type: "single",
    q: "Melyik állítás helyes a felgöngyölítésről és a lefúrásról?",
    options: [
      "Roll-up: aggregáltabb szintre lép (kevesebb tag); drill-down: részletesebb szintre (több tag); a dimenziók száma egyikben sem változik.",
      "Drill-down: aggregáltabb szintre lép, ahogy az előadás összefoglaló diája írja.",
      "Roll-up: elhagy egy dimenziót, drill-down: hozzáad egy újat.",
      "Mindkettő csak csillagmodellen értelmezett, hópehelymodellen nem."
    ],
    answer: 0,
    hint: "Lefúrni = lejjebb ásni a részletekbe. Melyik művelet változtatja a dimenziókészletet?",
    explain: "A roll-up és a drill-down a szintet váltja, a dimenziók száma marad; mindkettőhöz hierarchia (hópehelymodell) kell. Az előadás összefoglaló diáján a drill-down iránya elírás – a részletes dián már helyesen „kevésbé aggregált szint” áll. A dimenzió elhagyása a hajtogatás (fold)."
  },
  {
    id: "b13-015",
    topic: "13",
    level: 3,
    ref: "13-md-modell-mdx.html#lepes6",
    type: "multi",
    q: "MOZIK kocka (MOZI → VÁROS → ORSZÁG; FILM → KATEGÓRIA; NAP → HÓNAP → ÉV). „Mennyi volt a városonkénti nézőszám 2024-ben?” Mely műveletek kellenek?",
    options: [
      "felgöngyölítés: MOZI → VÁROS",
      "szeletelés: ÉV = 2024 és a mérték NÉZŐSZÁM",
      "hajtogatás: csak a MOZI dimenzió marad",
      "lefúrás: ÉV → HÓNAP"
    ],
    answer: [0, 1, 2],
    hint: "„…-onként” → szint; „…-ben” → szeletelés; ami nem szerepel → elhagyjuk.",
    explain: "Városonként: a MOZI dimenzió VÁROS szintre göngyölítve. 2024 és nézőszám: szeletelés (a mértéket is szeleteléssel választjuk). A FILM és a DÁTUM bontása nem kell: hajtogatás, csak a MOZI marad. Havi bontás nem kell, így lefúrás sem."
  },

  // ---------- 7–8. lépés: MDX adatmodell, SELECT ----------
  {
    id: "b13-016",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes7",
    type: "single",
    q: "Mennyi a <code>([Bolt].[Város].[Miskolc], [Measures].[Bevétel])</code> tuple értéke a mini kockában? (Avas bevétele 102 800 Ft, Belvárosé 67 000 Ft, Dobóé 42 600 Ft.)",
    options: ["169 800 Ft", "102 800 Ft", "212 400 Ft", "375"],
    answer: 0,
    hint: "A Miskolc tag a gyerekei összege; a Termék és az Idő az All tagon áll.",
    explain: "102 800 + 67 000 = 169 800 Ft. A 102 800 csak az Avas, a 212 400 mindhárom bolt, a 375 a miskolci darabszám (az a Darab mértékkel jönne ki)."
  },
  {
    id: "b13-017",
    topic: "13",
    level: 1,
    ref: "13-md-modell-mdx.html#lepes7",
    type: "single",
    q: "Melyik SET-kifejezés érvényes?",
    options: [
      "<code>{(BOLT.VÁROS.Eger), (BOLT.VÁROS.Miskolc)}</code>",
      "<code>{(BOLT.VÁROS.Eger, TERMÉK.KATEGÓRIA.ital), (BOLT.VÁROS.Miskolc)}</code>",
      "<code>(BOLT.VÁROS.Eger, BOLT.VÁROS.Miskolc)</code>",
      "<code>{(BOLT.VÁROS.Eger), TERMÉK.KATEGÓRIA.ital}</code>"
    ],
    answer: 0,
    hint: "A set elemei azonos szerkezetű tuple-ök; egy tuple-ben egy dimenzió csak egyszer szerepelhet.",
    explain: "Az első két azonos szerkezetű (egy várost tartalmazó) tuple. A második és a negyedik eltérő szerkezetű elemeket kever. A harmadik nem set, hanem tuple, és egy dimenzióból két tagot tartalmaz – hibás."
  },
  {
    id: "b13-018",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes8",
    type: "single",
    q: "Mit ad vissza: <code>SELECT {[Bolt].[Város].Members} ON COLUMNS, {[Termék].[Kategória].[Pékáru].Children} ON ROWS FROM [Értékesítés]</code>?",
    options: [
      "Kenyér: Eger 45, Miskolc 75; Kifli: Eger 70, Miskolc 160",
      "Pékáru: Eger 115, Miskolc 235",
      "Kenyér 120, Kifli 230",
      "Kenyér: Eger 20, Miskolc 40; Kifli: Eger 40, Miskolc 80"
    ],
    answer: 0,
    hint: "A Children a Pékáru gyerekeit adja; az Idő nincs megadva, tehát mindkét hónap összege számít.",
    explain: "Sorok: Kenyér, Kifli; oszlopok: Eger, Miskolc; két hónap együtt. Kenyér Eger 20+25 = 45, Miskolc 30+10+20+15 = 75; Kifli Eger 40+30 = 70, Miskolc 50+30+60+20 = 160. Az utolsó opció csak a januári adat."
  },
  {
    id: "b13-019",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes8",
    type: "multi",
    q: "Mely állítások igazak az MDX <code>WHERE</code> részére?",
    options: [
      "A forráskockán elsőként végrehajtott szeletelést adja meg.",
      "Gyakran itt választjuk ki a mértéket.",
      "Ugyanaz a dimenzió nem szerepelhet benne és egy tengelyen is.",
      "Az SQL WHERE-hez hasonlóan eldobja a tengely azon tagjait, amelyek nem felelnek meg."
    ],
    answer: [0, 1, 2],
    hint: "A szeletelő a kontextust rögzíti; diszjunkt a tengelyektől.",
    explain: "A WHERE szeletel (pl. mértéket vagy hónapot választ), és diszjunkt a tengely-kifejezésektől. A tengelyen lévő tagokat nem dobja el: ugyanazok a tagok látszanak, csak a szeletnek megfelelő értékekkel. Tagok kiszűrésére a FILTER való."
  },

  // ---------- 9. lépés: függvények ----------
  {
    id: "b13-020",
    topic: "13",
    level: 3,
    ref: "13-md-modell-mdx.html#lepes9",
    type: "single",
    q: "Mit ad vissza: <code>SELECT FILTER({[Termék].[Termék].Members}, [Measures].[Bevétel] &gt; 50000) ON COLUMNS FROM [Értékesítés]</code>? (Bevétel: Kenyér 72 000, Kifli 18 400, Tej 52 000, Sajt 70 000; Darab: 120, 230, 130, 35.)",
    options: [
      "Kenyér 120 | Tej 130 | Sajt 35",
      "Kenyér 72 000 | Tej 52 000 | Sajt 70 000",
      "Kifli 230",
      "Kenyér 120 | Kifli 230 | Tej 130 | Sajt 35"
    ],
    answer: 0,
    hint: "A FILTER bevétel alapján választ tagot. Melyik mérték kerül a cellákba, ha nincs WHERE?",
    explain: "A Kifli kiesik (18 400 < 50 000). A cellákban az alapértelmezett mérték, a Darab látszik: 120, 130, 35. A bevételek csak WHERE ([Measures].[Bevétel]) mellett jelennének meg. A szűrő mértéke és a megjelenített mérték különbözhet."
  },
  {
    id: "b13-021",
    topic: "13",
    level: 3,
    ref: "13-md-modell-mdx.html#lepes9",
    type: "single",
    q: "A termékek darabszáma: Kifli 230, Tej 130, Kenyér 120, Sajt 35 (Pékáru: Kenyér, Kifli = 350; Tejtermék: Tej, Sajt = 165). Mi az <code>ORDER(…[Termék].Members, [Measures].[Darab], DESC)</code> sorrendje?",
    options: [
      "Kifli, Kenyér, Tej, Sajt",
      "Kifli, Tej, Kenyér, Sajt",
      "Sajt, Kenyér, Tej, Kifli",
      "Tej, Sajt, Kifli, Kenyér"
    ],
    answer: 0,
    hint: "A DESC megtartja a hierarchiát: előbb a kategóriák rendeződnek, azon belül a termékek.",
    explain: "DESC: Pékáru (350) a Tejtermék (165) előtt; a Pékárun belül Kifli 230 > Kenyér 120, a Tejterméken belül Tej 130 > Sajt 35. A „Kifli, Tej, Kenyér, Sajt” a BDESC (hierarchiát megtörő) sorrend; a harmadik a BASC."
  },
  {
    id: "b13-022",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes9",
    type: "single",
    q: "Hány oszlopot ad: <code>SELECT CROSSJOIN({[Termék].[Kategória].Members}, {[Bolt].[Bolt].Members}) ON COLUMNS FROM [Értékesítés]</code>, és lesz-e üres oszlop?",
    options: [
      "6 oszlop, egyik sem üres",
      "6 oszlop, a Tejtermék–Dobó üres",
      "5 oszlop",
      "4 oszlop, mert a Dobó boltban nincs sajt"
    ],
    answer: 0,
    hint: "2 kategória × 3 bolt. A Dobó boltban a Tejtermék kategóriából van-e eladás?",
    explain: "2 · 3 = 6 pár. A Tejtermék–Dobó sem üres: a Dobó boltban tejet adnak el (15 + 10 = 25), csak sajtot nem. Üres csak a Sajt–Dobó cella lenne termék szinten."
  },
  {
    id: "b13-023",
    topic: "13",
    level: 2,
    ref: "13-md-modell-mdx.html#lepes9",
    type: "match",
    q: "Párosítsd a feladatot az MDX-eszközzel!",
    pairs: [
      ["városonként és havonta, egy tengelyen", "<code>CROSSJOIN</code>"],
      ["csak a 100-nál több darabot eladó boltok", "<code>FILTER</code>"],
      ["toplista bevétel szerint", "<code>ORDER … BDESC</code>"],
      ["az üres sorok elhagyása", "<code>NON EMPTY</code>"],
      ["átlagár = bevétel / darab", "<code>WITH MEMBER</code>"]
    ],
    hint: "Szorzat, érték alapú szűrés, rendezés, üresek elhagyása, számított tag.",
    explain: "CROSSJOIN: két halmaz minden párja. FILTER: tagok cellaérték alapján. ORDER BDESC: tiszta csökkenő sorrend. NON EMPTY: teljesen üres sorok, oszlopok elhagyása. WITH MEMBER: számított mérték a lekérdezés idejére."
  },

  // ---------- 10. lépés és Alkalmazás ----------
  {
    id: "b13-024",
    topic: "13",
    level: 1,
    ref: "13-md-modell-mdx.html#lepes10",
    type: "single",
    q: "Melyik a helyes sorrend az MS Analysis Server-es kockafejlesztésben (Visual Studio-projekt)?",
    options: [
      "Data Source → Data Source View → Cube → deploy → MDX-teszt SSMS-ben",
      "Cube → Data Source → deploy → Data Source View → MDX-teszt",
      "Data Source View → Data Source → MDX-teszt → Cube → deploy",
      "deploy → Data Source → Cube → Data Source View → MDX-teszt"
    ],
    answer: 0,
    hint: "Előbb kapcsolat, aztán a táblák kiválasztása, majd a kocka, végül a feltöltés és a teszt.",
    explain: "A Data Source a kapcsolat az SQL Serverhez, a Data Source View a táblák kijelölése, ebből épül a Cube (ténytábla, mértékek, dimenziók). A deploy viszi át az Analysis Serverre, utána az SSMS MDX-ablakában tesztelhető."
  },
  {
    id: "b13-025",
    topic: "13",
    level: 3,
    ref: "13-md-modell-mdx.html#lepes10",
    type: "single",
    q: "A Moodle-minta adataival (BOLT1 Eger: 94 db; BOLT2 Miskolc: 72 db; BOLT3 Miskolc: 35 db) mit ad: <code>SELECT FILTER({BOLTOK.VAROS.Members}, Measures.DB &gt; 100) ON AXIS(0) FROM [FORGALOM_MD]</code>?",
    options: ["MISKOLC 107", "EGER 94 | MISKOLC 107", "Üres eredmény: egyik bolt sem adott el 100-nál többet", "BOLT2 72 | BOLT3 35"],
    answer: 0,
    hint: "A FILTER a Város szint tagjain fut: előbb a városok összegét számold.",
    explain: "Eger = 94, Miskolc = 72 + 35 = 107; csak a 107 > 100. Boltszinten valóban egyik sem éri el a 100-at, de itt városokat szűrünk. A BOLT2/BOLT3 a Miskolc tag gyerekei (Children) lennének."
  },
  {
    id: "b13-026",
    topic: "13",
    level: 3,
    ref: "13-md-modell-mdx.html#alkalmazas",
    type: "single",
    q: "Az előadás példája: <code>SELECT FILTER({[Store].[Store City].Members}, (Measures.Profit, Time.[1997].Q1) &gt; 7000) ON COLUMNS, {[Time].[1997].Children} ON ROWS FROM [Sales] WHERE {Measures.Profit}</code>. Mit ad vissza?",
    options: [
      "Azokat a városokat, ahol 1997 első negyedévében 7000 feletti volt a profit, mind a négy 1997-es negyedév profitjával.",
      "Csak 1997 első negyedévét, minden városra.",
      "Azokat a városokat, ahol minden negyedévben 7000 feletti volt a profit.",
      "Azokat a negyedéveket, amelyekben a profit 7000 felett volt."
    ],
    answer: 0,
    hint: "Válaszd szét: mit szűr a FILTER (melyik tengely tagjait, melyik tuple alapján), és mi van a sorokon?",
    explain: "A FILTER a városokat szűri, a feltétel a (Profit, 1997 Q1) tuple értéke. A sorokon 1997 gyerekei, a négy negyedév állnak, a cellákban a profit. A szűrés tehát csak Q1 alapján dönt, a megjelenítés mind a négy negyedévre szól."
  }
);
