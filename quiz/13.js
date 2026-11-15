/* 13. lecke – MD modell és MDX – kvízek
   Minden szám a lecke mini kockájára (Értékesítés: Termék × Bolt × Idő) vonatkozik, pandas pivot_table-lel ellenőrizve. */

QUIZZES["l13-lepes2"] = {
  title: "Mini-kvíz – A kocka elemei",
  questions: [
    {
      type: "match",
      q: "Párosítsd a mini kocka elemét a fogalommal!",
      pairs: [
        ["Darab, Bevétel", "mérték"],
        ["Termék, Bolt, Idő", "dimenzió"],
        ["Avas", "tag"],
        ["a Kifli egységára (80 Ft)", "attribútum"],
        ["60 (Kifli–Avas–Február darabszáma)", "tény"]
      ],
      hint: "Mi szerint bontunk, mit összesítünk, és mi a tag tulajdonsága?",
      explain: "A dimenziók a cellák „koordinátái”, a tagok egy-egy koordinátaérték. A mérték a változó, a tény a mérték értéke egy cellában. Az egységár a termék tulajdonsága, ezért attribútum, nem mérték."
    },
    {
      type: "single",
      q: "Hány cellapozíció van egy kockában, amelyben 5 termék, 4 bolt és 12 hónap szerepel (a mértékeket nem számolva)?",
      options: ["240", "21", "60", "480"],
      answer: 0,
      hint: "Minden dimenzió minden tagja minden más dimenzió minden tagjával kombinálódik.",
      explain: R`$5 \cdot 4 \cdot 12 = 240$. A 21 az összeg ($5+4+12$), a 60 a 12 hónapot hagyja ki, a 480 két mértékkel számolt tényérték-szám.`
    },
    {
      type: "single",
      q: "Mi kerül a csillagséma ténytáblájába?",
      options: [
        "A dimenziók kulcsai (idegen kulcsok) és a mértékek értékei.",
        "A dimenziótagok nevei és attribútumai.",
        "Csak a mértékek, kulcsok nélkül.",
        "A kocka összes lehetséges cellája, az üresek is."
      ],
      answer: 0,
      hint: "Egy ténytáblasor egy kitöltött cella: hol van, és mi van benne?",
      explain: "Egy sor = egy kitöltött cella: idegen kulcsok a dimenziótáblákba (hol?) és a mértékek (mennyi?). A nevek, attribútumok a dimenziótáblákban vannak. Üres cellához nem tartozik sor (a mini kocka 24 pozíciójából 22 sor)."
    },
    {
      type: "single",
      q: "Miért mondja az előadás, hogy a relációs tábla „egydimenziós”?",
      options: [
        "Mert egy rekordot egyetlen kulcs azonosít.",
        "Mert csak egy oszlopa lehet.",
        "Mert csak egy táblából kérdezhetünk le egyszerre.",
        "Mert nem tud összesíteni."
      ],
      answer: 0,
      hint: "Mi jelöli ki egy adat helyét a táblában, és mi a kockában?",
      explain: "A táblában egy kulcsérték jelöl ki egy rekordot; a kockában a cellát több dimenzió tagjainak együttese. Az SQL tud összesíteni és több táblát kapcsolni, csak ez sok JOIN-nal jár."
    }
  ]
};

QUIZZES["l13-lepes4"] = {
  title: "Mini-kvíz – Hierarchia és sémakonverzió",
  questions: [
    {
      type: "single",
      q: "Melyik a helyes idődimenzió-hierarchia a legrészletesebb szinttől a leginkább összesített felé?",
      options: ["NAP → HÓNAP → ÉV", "ÉV → HÓNAP → NAP", "NAP → HÉT → HÓNAP", "HÓNAP → NAP → ÉV"],
      answer: 0,
      hint: "Az alapszint a legrészletesebb, és minden szint pontosan egy felette lévő taghoz tartozzon.",
      explain: "NAP → HÓNAP → ÉV: 1:N kapcsolat minden lépésben. Az ÉV → HÓNAP → NAP fordított irányú. A HÉT nem illik a NAP és a HÓNAP közé, mert egy hét átnyúlhat két hónapra."
    },
    {
      type: "single",
      q: "Hogyan ismered fel a relációs sémában a ténytáblát?",
      options: [
        "Belőle idegen kulcsok indulnak, de bele egyetlen más tábla idegen kulcsa sem mutat.",
        "Ebbe a táblába mutat a legtöbb idegen kulcs.",
        "Ez a legkevesebb sort tartalmazó tábla.",
        "Ebben nincs idegen kulcs."
      ],
      answer: 0,
      hint: "Gondolj a FORGALOM táblára: ki hivatkozik rá, és kire hivatkozik ő?",
      explain: "A tények a „történések”: a FORGALOM a termékre és a boltra hivatkozik, rá viszont senki. Amelyik táblába sok kulcs mutat, az dimenzió (alapszint). A ténytábla általában a legnagyobb."
    },
    {
      type: "multi",
      q: "Mely mezőkből lehet egy dimenzió aggregáltabb szintje a bolti sémában?",
      options: [
        "a <code>TERMEK.kategoria</code> mező",
        "a <code>FORGALOM.datum</code>-ból képzett hónap és év",
        "a <code>TELEPULES.regio</code> mező",
        "a <code>TERMEK.egysegar</code> mező"
      ],
      answer: [0, 1, 2],
      hint: "Rejtett szint az az ismétlődő leíró mező, amely szerint értelmes csoportosítani (1:N).",
      explain: "A kategória, a régió és a dátumból képzett hónap/év sok rekordnál ugyanaz: implicit aggregációs szint. Az egységár a termék attribútuma; szerinte csoportosítani nem szokás, és mértéknek sem jó, mert nem additív."
    },
    {
      type: "single",
      q: "A mini kocka Bolt dimenziójában mennyi a Miskolc tag darabszáma?",
      options: ["375", "240", "140", "515"],
      answer: 0,
      hint: "A Város szint tagja a gyerekei (boltjai) összege.",
      explain: "Miskolc = Avas + Belváros = 240 + 135 = 375. A 240 csak az Avas, a 140 Eger (Dobó), az 515 az összes."
    }
  ]
};

QUIZZES["l13-lepes6"] = {
  title: "Mini-kvíz – MD algebra",
  questions: [
    {
      type: "match",
      q: "Melyik művelet ez?",
      pairs: [
        ["csak a januári adatok", "szeletelés"],
        ["csak a miskolci boltok tejtermékei", "kockázás"],
        ["boltonként helyett városonként", "felgöngyölítés"],
        ["éves adatok helyett havi adatok", "lefúrás"],
        ["termék szerinti bontás nélkül", "hajtogatás"]
      ],
      hint: "Egy vagy több dimenzió szűrése? Szintváltás felfelé vagy lefelé? Vagy egy egész dimenzió eltűnik?",
      explain: "Szeletelés: feltétel egy dimenzión; kockázás: több dimenzión. Felgöngyölítés: aggregáltabb szint (bolt → város). Lefúrás: részletesebb szint (év → hónap). Hajtogatás: egy dimenzió elhagyása aggregálással."
    },
    {
      type: "single",
      q: "Göngyölítsd fel a januári szeletet Bolt → Város szerint. Mennyi a Kifli–Miskolc cella?",
      options: ["80", "50", "120", "160"],
      answer: 0,
      hint: "Miskolc két boltja: Avas és Belváros. Csak a januári számok kellenek.",
      explain: "Januárban Kifli: Avas 50 + Belváros 30 = 80. Az 50 csak az Avas; a 120 a januári kifli összesen (Egerrel); a 160 a két hónap miskolci kiflije."
    },
    {
      type: "single",
      q: "Az előadás összefoglaló diáján: „drill down: átállás egy aggregáltabb szintre”. Mi a helyzet ezzel?",
      options: [
        "Hibás: a lefúrás részletesebb szintre visz; az aggregáltabb szintre lépés a felgöngyölítés.",
        "Helyes: a lefúrás mindig az Összes szint felé visz.",
        "Helyes, mert a hópehelyábrán a levelek a legaggregáltabbak.",
        "Mindkét irány drill-down, csak a jelölés más."
      ],
      answer: 0,
      hint: "Mit látsz több tagot: évenkénti vagy havi bontásban? Az előadás két diával később maga is leírja a lefúrást.",
      explain: "Roll-up → aggregáltabb (kevesebb tag), drill-down → részletesebb (több tag). Az előadás részletes diája is így írja: a lefúrás „egy kevésbé aggregált szintre lép”. Az összefoglaló dia elírás."
    },
    {
      type: "single",
      q: "Hajtogasd a mini kockát úgy, hogy csak az Idő dimenzió maradjon! Mi az eredmény (Darab)?",
      options: ["Január 255, Február 260", "Január 75, Február 65", "515", "Január 180, Február 170"],
      answer: 0,
      hint: "A Termék és a Bolt mentén minden összeadódik, a hónapok külön maradnak.",
      explain: "Január 255, Február 260. A 75/65 csak a Dobó bolt (az szeletelés lenne), az 515 az összes dimenzió elhagyása, a 180/170 csak a pékáru."
    },
    {
      type: "multi",
      q: "Mely állítások igazak?",
      options: [
        "Felgöngyölítés után a dimenziók száma nem változik.",
        "Hajtogatás után a dimenziók száma csökken.",
        "A szeletelés összegzi a kiválasztott cellákat.",
        "A lefúrás és a felgöngyölítés csak hierarchiával (hópehelymodellen) értelmezett."
      ],
      answer: [0, 1, 3],
      hint: "Melyik művelet változtatja a szintet, melyik a dimenziókészletet, és melyik csak kiválaszt?",
      explain: "A roll-up és a drill-down a szintet változtatja (dimenziószám marad), ehhez hierarchia kell. A fold a dimenziókészletet csökkenti. A szeletelés csak kiválaszt, nem összegez – a januári szelet 12 cella, nem egy 255-ös szám."
    }
  ]
};

QUIZZES["l13-lepes8"] = {
  title: "Mini-kvíz – Tuple, set, SELECT",
  questions: [
    {
      type: "single",
      q: "Mennyi a <code>([Termék].[Termék].[Kifli], [Measures].[Darab])</code> tuple értéke?",
      options: ["230", "60", "120", "Hiba: nincs megadva bolt és hónap"],
      answer: 0,
      hint: "A ki nem írt dimenziók az alapértelmezett (All) tagjukon állnak.",
      explain: "Bolt és Idő: All, tehát a Kifli összes eladása: 40+50+30+30+60+20 = 230. A 60 egyetlen cella (Avas–Február), a 120 csak január. A hiányos tuple nem hiba."
    },
    {
      type: "single",
      q: "Melyik érvényes MDX-kifejezés két város kiválasztására egy tengelyen?",
      options: [
        "<code>{[Bolt].[Város].[Eger], [Bolt].[Város].[Miskolc]}</code>",
        "<code>([Bolt].[Város].[Eger], [Bolt].[Város].[Miskolc])</code>",
        "<code>{([Bolt].[Város].[Eger], [Termék].[Kategória].[Pékáru]), ([Bolt].[Város].[Miskolc])}</code>",
        "<code>[Bolt].[Város].[Eger] AND [Bolt].[Város].[Miskolc]</code>"
      ],
      answer: 0,
      hint: "Kerek zárójel: különböző dimenziók tagjai; kapcsos: azonos szerkezetű tuple-ök listája.",
      explain: "Két tag ugyanabból a dimenzióból: set kell, <code>{ }</code>. A kerek zárójeles tuple-ben egy dimenzió csak egyszer szerepelhet. A harmadik set elemei eltérő szerkezetűek. AND nincs ilyen szerepben."
    },
    {
      type: "single",
      q: "Mit ad vissza: <code>SELECT {[Termék].[Kategória].Members} ON COLUMNS FROM [Értékesítés] WHERE ([Measures].[Bevétel])</code>?",
      options: [
        "Pékáru 90 400 | Tejtermék 122 000",
        "Pékáru 350 | Tejtermék 165",
        "212 400 egyetlen cellában",
        "Hibát, mert a mérték nem lehet a WHERE-ben"
      ],
      answer: 0,
      hint: "A WHERE választja ki a mértéket; a Bolt és az Idő az All tagon áll.",
      explain: "Két oszlop, bevétellel: Pékáru 72 000 + 18 400 = 90 400, Tejtermék 52 000 + 70 000 = 122 000. A 350/165 a darabszám (WHERE nélkül), a 212 400 a tengely nélküli lekérdezés."
    },
    {
      type: "single",
      q: "Miért hibás: <code>SELECT {[Bolt].[Város].Members} ON COLUMNS FROM [Értékesítés] WHERE ([Bolt].[Város].[Eger])</code>?",
      options: [
        "A Bolt dimenzió a tengelyen és a szeletelőben is szerepel, pedig a kettő diszjunkt.",
        "A WHERE-ben csak mérték állhat.",
        "A .Members után kötelező a WHERE-ben mértéket megadni.",
        "Nem hibás, egyetlen Eger oszlopot ad."
      ],
      answer: 0,
      hint: "Az előadás: a slicer specification „diszjunkt az axis specification-től”.",
      explain: "Ugyanaz a dimenzió (hierarchia) nem lehet tengelyen és szeletelőben is. Ha csak Eger kell: <code>{[Bolt].[Város].[Eger]} ON COLUMNS</code>. A WHERE-ben bármely más dimenzió tagja állhat, nem csak mérték."
    }
  ]
};

QUIZZES["l13-lepes9"] = {
  title: "Mini-kvíz – MDX-függvények",
  questions: [
    {
      type: "single",
      q: "Mit ad vissza: <code>SELECT FILTER({[Bolt].[Bolt].Members}, [Measures].[Darab] &gt; 135) ON COLUMNS FROM [Értékesítés]</code>?",
      options: ["Dobó 140 | Avas 240", "Avas 240", "Dobó 140 | Avas 240 | Belváros 135", "Belváros 135"],
      answer: 0,
      hint: "Boltonkénti darabszám: Dobó 140, Avas 240, Belváros 135. Szigorú egyenlőtlenség!",
      explain: "140 > 135 és 240 > 135 igaz, 135 > 135 hamis, így a Belváros kiesik. Ha <code>&gt;=</code> lenne, mindhárom maradna."
    },
    {
      type: "single",
      q: "Hány oszlopot ad: <code>CROSSJOIN({[Bolt].[Bolt].Members}, {[Idő].[Hónap].Members}) ON COLUMNS</code> (NON EMPTY nélkül)?",
      options: ["6", "5", "3", "2"],
      answer: 0,
      hint: "Descartes-szorzat: minden bolt minden hónappal.",
      explain: "3 bolt × 2 hónap = 6 (bolt, hónap) pár. Az 5 az összeadás (3+2). Minden pár megjelenik, az üresek is."
    },
    {
      type: "single",
      q: "Mi a sorrend: <code>ORDER({[Bolt].[Bolt].Members}, [Measures].[Darab], DESC)</code>, ha a Bolt szint szülője a Város (Miskolc 375, Eger 140)?",
      options: [
        "Avas, Belváros, Dobó",
        "Avas, Dobó, Belváros",
        "Belváros, Dobó, Avas",
        "Dobó, Avas, Belváros"
      ],
      answer: 0,
      hint: "A DESC megtartja a hierarchiát: előbb a szülők sorrendje, azon belül a gyerekeké.",
      explain: "DESC: Miskolc (375) előbb, Eger (140) utána; Miskolcon belül Avas 240 > Belváros 135. Így Avas, Belváros, Dobó. Az Avas, Dobó, Belváros a BDESC (hierarchiát megtörő) eredménye."
    },
    {
      type: "single",
      q: "<code>WITH MEMBER [Measures].[Átlagár] AS [Measures].[Bevétel] / [Measures].[Darab]</code>. Mennyi a Pékáru sorában? (Pékáru: 350 db, 90 400 Ft; Kenyér 600 Ft, Kifli 80 Ft.)",
      options: ["kb. 258,29 Ft", "340 Ft", "680 Ft", "kb. 739,39 Ft"],
      answer: 0,
      hint: "A számított mérték a már összesített cellaértékekből számol.",
      explain: R`$90\,400 / 350 \approx 258{,}29$. A 340 a két ár egyszerű átlaga – a sok olcsó kifli miatt a súlyozott átlag ennél kisebb. A 680 az árak összege, a 739,39 a Tejtermék sorának átlagára ($122\,000/165$).`
    },
    {
      type: "match",
      q: "Párosítsd az SQL-elemet az MDX-megfelelőjével!",
      pairs: [
        ["<code>HAVING SUM(darab) &gt; 100</code>", "<code>FILTER</code>"],
        ["<code>ORDER BY … DESC</code>", "<code>ORDER(…, BDESC)</code>"],
        ["<code>GROUP BY varos</code>", "<code>[Bolt].[Város].Members</code> a tengelyen"],
        ["<code>WHERE kategoria = 'Pékáru'</code>", "<code>WHERE ([Termék].[Kategória].[Pékáru])</code>"],
        ["számított oszlop <code>AS atlagar</code>", "<code>WITH MEMBER</code>"]
      ],
      hint: "Érték alapú szűrés, rendezés, csoportosítási szint, szeletelés, számított mennyiség.",
      explain: "HAVING ↔ FILTER (összesített értékre szűr), ORDER BY ↔ ORDER, GROUP BY ↔ a tengelyen megjelenő szint, WHERE ↔ szeletelő, számított oszlop ↔ WITH MEMBER."
    }
  ]
};

QUIZZES["l13-vegso"] = {
  title: "Ellenőrző kvíz – MD modell és MDX",
  questions: [
    {
      type: "single",
      q: "Miért vezették be a MEASURES dimenziót az MDX-ben?",
      options: [
        "Mert egy cella csak egyetlen értéket tárolhat, így több változót egy külön dimenzió tagjaiként kell kezelni.",
        "Mert a mértékeket nem lehet összegezni.",
        "Mert a WHERE részben csak dimenziótag állhat, mérték nem.",
        "Mert a mértékek a dimenziótáblákban vannak."
      ],
      answer: 0,
      hint: "Az előadás: „a cellák csak egyetlen értéket tartalmazhatnak”.",
      explain: "A változókat (Darab, Bevétel) egy virtuális dimenzió tagjaivá teszik; egy cellát így egy olyan tuple azonosít, amelyben a mérték is benne van. A mértékek a ténytáblában vannak, és a WHERE-ben is állhatnak."
    },
    {
      type: "single",
      q: "Mit ad vissza: <code>SELECT FROM [Értékesítés]</code>?",
      options: [
        "Egyetlen cellát: 515 (az alapértelmezett mérték, a Darab végösszege).",
        "A teljes ténytáblát (22 sor).",
        "Szintaktikai hibát, mert nincs tengely.",
        "Egyetlen cellát: 212 400."
      ],
      answer: 0,
      hint: "Tengely nélkül nulladimenziós az eredmény; melyik mérték az alapértelmezett?",
      explain: "Tengely nélkül egy cella jön vissza; minden dimenzió All-on, a mérték az alapértelmezett (első) Darab: 515. A 212 400 a Bevétel végösszege lenne (<code>WHERE ([Measures].[Bevétel])</code>)."
    },
    {
      type: "single",
      q: "Mit ad vissza: <code>SELECT {[Bolt].[Város].[Miskolc].Children} ON COLUMNS FROM [Értékesítés] WHERE ([Idő].[Hónap].[Február])</code>?",
      options: ["Avas 130 | Belváros 65", "Avas 240 | Belváros 135", "Miskolc 195", "Avas 110 | Belváros 70"],
      answer: 0,
      hint: "A Children a két miskolci boltot adja; a szeletelő Február.",
      explain: "Februárban Avas 20+60+35+15 = 130, Belváros 15+20+25+5 = 65. A 240/135 a két hónap együtt, a 195 a Miskolc tag maga, a 110/70 a januári értékek."
    },
    {
      type: "single",
      q: "Mit ad vissza: <code>SELECT {[Idő].[Hónap].Members} ON COLUMNS, {[Bolt].[Város].Members} ON ROWS FROM [Értékesítés] WHERE ([Termék].[Kategória].[Tejtermék])</code>?",
      options: [
        "Eger: 15 | 10; Miskolc: 60 | 80",
        "Eger: 60 | 55; Miskolc: 120 | 115",
        "Eger: 25; Miskolc: 140",
        "Eger: 15 | 10; Miskolc: 30 | 50"
      ],
      answer: 0,
      hint: "Sorok: városok, oszlopok: hónapok, csak tejtermék (Tej + Sajt).",
      explain: "Eger (Dobó): január Tej 15, február Tej 10 (sajt nincs). Miskolc: január 25+20+5+10 = 60, február 35+25+15+5 = 80. A 60/55, 120/115 a pékáru; a 25/140 hónap nélkül; a 30/50 csak az Avas bolt."
    },
    {
      type: "single",
      q: "Az előadás példája: <code>SELECT {[Time].[Year].[1997].CHILDREN} ON COLUMNS, FILTER({[Store].[Store City].MEMBERS}, (Measures.[Unit Sales], [Time].[1997]) &gt; 1000) ON ROWS FROM [Sales] WHERE ([Measures].[Store Sales])</code>. Mi kerül a cellákba?",
      options: [
        "Az 1997-ben 1000 darabnál többet eladó városok negyedéves bolti árbevétele (Store Sales).",
        "Az összes város negyedéves eladott darabszáma (Unit Sales).",
        "Az 1000 feletti Unit Sales értékek évesen.",
        "Az 1997-es év hónapjainak Store Sales értékei minden városra."
      ],
      answer: 0,
      hint: "Válaszd szét: mi szerint szűr a FILTER, és melyik mértéket választja ki a WHERE?",
      explain: "Oszlopok: 1997 gyerekei, a negyedévek. Sorok: azok a városok, amelyek 1997-es Unit Sales-e 1000 felett van. A cellák mértékét a WHERE adja: Store Sales. A szűrés és a megjelenítés mértéke különbözik."
    },
    {
      type: "single",
      q: "Mit ad vissza: <code>SELECT {[Termék].[Termék].Members} ON COLUMNS FROM [Értékesítés] WHERE ([Bolt].[Bolt].[Dobó])</code> és mi változik <code>NON EMPTY</code>-vel?",
      options: [
        "4 oszlop (Kenyér 45, Kifli 70, Tej 25, Sajt üres); NON EMPTY-vel a Sajt oszlop eltűnik.",
        "3 oszlop mindkét esetben, mert a Sajt nem létezik a Dobó boltban.",
        "4 oszlop, és a NON EMPTY nem változtat semmit.",
        "Hibát, mert a Bolt nincs a tengelyen."
      ],
      answer: 0,
      hint: "A tag létezik a dimenzióban, csak a cellája üres. Melyik kulcsszó hagyja el az üres oszlopot?",
      explain: "A Termék dimenzió 4 tagja mind megjelenik; a Dobó–Sajt cella üres. NON EMPTY-vel a teljesen üres Sajt oszlop kimarad. A szeletelőben bármely, tengelyen nem szereplő dimenzió állhat."
    },
    {
      type: "multi",
      q: "Mely állítások igazak a MOLAP, ROLAP, HOLAP tárolásra?",
      options: [
        "A ROLAP ténytáblában és dimenziótáblákban, relációs adatbázisban tárol.",
        "A MOLAP saját többdimenziós szerkezetben tárol, előre számolt összesítésekkel.",
        "A HOLAP a részleteket relációsan, az összesítéseket kockában tárolja.",
        "A logikai modell (dimenziók, mértékek) a három esetben más és más."
      ],
      answer: [0, 1, 2],
      hint: "A három változat a fizikai tárolásban különbözik.",
      explain: "Mindháromban ugyanaz a kocka a logikai modell (ugyanazok a dimenziók, mértékek, MDX-lekérdezések); csak a fizikai tárolás más."
    },
    {
      type: "single",
      q: "A FORGALOM, PANASZOK, TERMEK, GYARTO, BOLT, KERESKEDO, TELEPULES sémában melyik nem dimenzió vagy dimenziószint?",
      options: ["PANASZOK", "GYARTO", "TELEPULES", "KERESKEDO"],
      answer: 0,
      hint: "Melyik táblába nem mutat egyetlen idegen kulcs sem?",
      explain: "A PANASZOK (a FORGALOM-mal együtt) ténytábla: belőle a BOLT és a TERMEK felé indulnak kulcsok, bele semmi. A GYARTO a Termék, a TELEPULES és a KERESKEDO a Bolt dimenzió felsőbb szintje."
    },
    {
      type: "single",
      q: "„Mennyi volt a 2023-as összbevétel Egerben?” (MOZIK kocka). Melyik MDX adja ezt egyetlen számként?",
      options: [
        "<code>SELECT FROM [MOZIK] WHERE ([MOZI].[VÁROS].[Eger], [DÁTUM].[ÉV].[2023], [Measures].[BEVÉTEL])</code>",
        "<code>SELECT {[MOZI].[VÁROS].Members} ON COLUMNS FROM [MOZIK] WHERE ([Measures].[BEVÉTEL])</code>",
        "<code>SELECT {[MOZI].[VÁROS].[Eger]} ON COLUMNS FROM [MOZIK] WHERE ([MOZI].[VÁROS].[Eger], [DÁTUM].[ÉV].[2023])</code>",
        "<code>SELECT [Measures].[BEVÉTEL] FROM [MOZIK] JOIN [DÁTUM] WHERE ÉV = 2023</code>"
      ],
      answer: 0,
      hint: "Egy szám = nincs tengely; minden szűrés és a mérték a szeletelőbe kerül.",
      explain: "Tengely nélkül egyetlen cella, a szeletelő (Eger, 2023, BEVÉTEL) tuple kijelöli az aggregátumot. A második minden várost ad, évszűrés nélkül. A harmadikban a MOZI dimenzió tengelyen és szeletelőben is szerepel (hiba). JOIN nincs az MDX-ben."
    },
    {
      type: "single",
      q: "Az MS Analysis Server-es mintában mit tartalmaz a Data Source View?",
      options: [
        "A forrás-adatbázisból a kockához felhasznált táblák kijelölését.",
        "A kapcsolatot (szerver, adatbázis, meghajtó) a relációs adatbázishoz.",
        "A kész, lekérdezhető kockát az Analysis Serveren.",
        "Az MDX-lekérdezések mentett listáját."
      ],
      answer: 0,
      hint: "Előbb kapcsolódsz (Data Source), aztán kiválasztod, mi kell belőle.",
      explain: "A Data Source a kapcsolat, a Data Source View a táblák kiválasztása; ebből épül a Cube. Lekérdezhető kocka csak a deploy után lesz az Analysis Serveren."
    }
  ]
};
