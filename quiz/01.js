/* 1. lecke – Adattisztítás és feltáró adatelemzés – kvízek */

QUIZZES["l01-lepes2"] = {
  title: "Mini-kvíz – Skálák és típusok",
  questions: [
    {
      type: "match",
      q: "Párosítsd a változót a mérési skálájával!",
      pairs: [
        ["region (North, South, East, West)", "nominális"],
        ["elégedettség 1–5 pontos skálán", "ordinális"],
        ["date (vásárlás dátuma)", "intervallum"],
        ["quantity (vásárolt mennyiség)", "arány"]
      ],
      hint: "Kérdezd meg minden változónál: van-e sorrend? Értelmes-e a különbség? Van-e valódi nulla, értelmes-e a hányados?",
      explain: "A régiónak nincs sorrendje (nominális). Az elégedettségnek van sorrendje, de a lépések nem biztosan egyenlők (ordinális). A dátumnál a különbség értelmes, de a nullpont önkényes (intervallum). A mennyiségnél van valódi nulla, a 2 db kétszer annyi, mint az 1 (arány)."
    },
    {
      type: "single",
      q: "Egy oszlopban vásárlószámok vannak (1023, 1187, …), a pandas <code>int64</code>-ként olvassa be. Mi a helyes állítás?",
      options: [
        "Nominális azonosító; az átlaga értelmetlen, a tárolási típus félrevezet.",
        "Arányskálájú, mert egész szám, tehát átlagolható.",
        "Ordinális, mert a számok sorba rendezhetők.",
        "Intervallumskálájú, mert két vásárlószám különbsége kiszámolható."
      ],
      answer: 0,
      hint: "A skála a jelentésről szól, nem arról, hogyan tárolja a gép.",
      explain: "Az azonosító csak azonosít: két szám vagy egyezik, vagy nem. Hogy számjegyekből áll és <code>int64</code>, az csak a tárolás. A tipikus hiba, hogy a tárolási típusból következtetünk a skálára."
    },
    {
      type: "single",
      q: "Melyik középérték értelmes <em>nominális</em> változóra?",
      options: ["Csak a módusz", "A módusz és a medián", "Mindhárom: átlag, medián, módusz", "Csak a medián"],
      answer: 0,
      hint: "A mediánhoz sorba kell tudni rendezni az értékeket.",
      explain: "Nominális skálán nincs sorrend, így a medián sem értelmezett – csak a leggyakoribb érték, a módusz. Az ordinális skálán jön be a medián, intervallumskálán az átlag."
    }
  ]
};

QUIZZES["l01-lepes5"] = {
  title: "Mini-kvíz – A tisztítás lépései",
  questions: [
    {
      type: "single",
      q: "Mit ad vissza <code>pd.to_numeric(pd.Series([\"1\", \"2\", \"unknown\", \"3\"]), errors=\"coerce\")</code>?",
      options: [
        "[1.0, 2.0, NaN, 3.0]",
        "Hibát (ValueError), mert az „unknown” nem szám",
        "[1, 2, \"unknown\", 3] – a nem szám érték változatlan marad",
        "[1.0, 2.0, 0.0, 3.0]"
      ],
      answer: 0,
      hint: "A „coerce” azt jelenti: kényszerítsd, és ami nem megy, azzal mi legyen?",
      explain: "A <code>coerce</code> a nem alakítható értékből hiányzó értéket (NaN) csinál. Hibát az alapértelmezett <code>errors=\"raise\"</code> adna. Nullára sosem cserél – az hamis adat lenne."
    },
    {
      type: "single",
      q: "Melyik a gyakorlaton tanult helyes tisztítási sorrend?",
      options: [
        "duplikátumok → szövegegységesítés → típuskonverzió → hiányok → kiugrók",
        "hiányok → duplikátumok → típuskonverzió → szövegegységesítés → kiugrók",
        "típuskonverzió → kiugrók → hiányok → duplikátumok → szövegegységesítés",
        "szövegegységesítés → hiányok → kiugrók → típuskonverzió → duplikátumok"
      ],
      answer: 0,
      hint: "A hiányokat csak akkor látod mind, ha a hibás szövegekből már hiány lett. A kvartilisekhez pedig tiszta számoszlop kell.",
      explain: "Előbb kidobjuk a másolatokat (ne számítson semmi kétszer), egységesítjük a neveket (a csoportos pótlás erre épül), konvertálunk <code>coerce</code>-szal (a hibás értékből hiány lesz), kezeljük az összes hiányt, végül a tiszta numerikus oszlopon keresünk kiugrót."
    },
    {
      type: "single",
      q: "A nyers adatban 6 sor pontosan kétszer szerepel. Mennyi a <code>df.duplicated().sum()</code>, és hány sort töröl a <code>drop_duplicates()</code>?",
      options: ["6 és 6", "12 és 6", "6 és 5", "12 és 12"],
      answer: 0,
      hint: "A <code>duplicated()</code> az első előfordulást nem jelöli meg.",
      explain: "Mind a 6 ismétlődő sornak csak a második előfordulása „duplikált”: 6. A törlés ezt a 6-ot dobja ki (6957 → 6951), az eredetiek megmaradnak. A 12 a <code>keep=False</code> eredménye lenne (párokkal együtt)."
    },
    {
      type: "multi",
      q: "Egy hiányzó egységárat a gyakorlat kódja ugyanannak a terméknek más sorából pótol. Mely állítások igazak?",
      options: [
        "Ez azért megengedett, mert az egységár ebben az adathalmazban termékenként állandó.",
        "A kód csak ott pótol, ahol a termékcsoportban pontosan egy ismert ár van.",
        "Ugyanígy pótolta a hiányzó mennyiségeket is.",
        "Ehhez a terméknevek egységesítése előfeltétel."
      ],
      answer: [0, 1, 3],
      hint: "Gondold végig, mi alapján csoportosít a kód, és mi történt a mennyiségekkel.",
      explain: "Az ár termékenként állandó, és a kód ellenőrzi is (<code>nunique() == 1</code>). Egységesítés nélkül a „Bread” és „bread” két csoport lenne. A hiányzó mennyiségeknél nincs ilyen szabály, ezért azokat a sorokat törölte."
    }
  ]
};

QUIZZES["l01-lepes7"] = {
  title: "Mini-kvíz – IQR és boxplot",
  questions: [
    {
      type: "single",
      q: R`Adat: $10, 12, 13, 15, 16, 18, 40$. A pandas szerint $Q_1 = 12{,}5$, $Q_3 = 17$. Hol van a felső határ?`,
      options: ["23,75", "21,5", "30,5", "6,75"],
      answer: 0,
      hint: R`$IQR = Q_3 - Q_1$, a felső határ $Q_3 + 1{,}5\cdot IQR$.`,
      explain: R`$IQR = 4{,}5$, $1{,}5\cdot 4{,}5 = 6{,}75$, felső határ $17 + 6{,}75 = 23{,}75$. A 21,5 az $1\cdot IQR$, a 30,5 a $3\cdot IQR$ („extrém kiugró”) határ, a 6,75 csak a $1{,}5\cdot IQR$ tag.`
    },
    {
      type: "single",
      q: R`A tisztított adaton a quantity: $Q_1 = 1$, $Q_3 = 2$, értékei 1, 2, 3. Hány kiugró értéket talál az IQR-módszer?`,
      options: ["0", "761 (az összes 3-as)", "2835 (az összes 2-es és 3-as)", "6"],
      answer: 0,
      hint: R`Számold ki a két határt, és nézd meg, hova esik a 3.`,
      explain: R`$IQR = 1$, határok $-0{,}5$ és $3{,}5$. A 3 a határon belül van, így nincs kiugró. Ezért nem kellett módusszal korrigálni.`
    },
    {
      type: "single",
      q: "Az <code>unit_price</code>-ra az IQR-módszer 843 tételt jelöl kiugrónak – az összes kávét (2200 Ft) és csirkét (2400 Ft). Mi a helyes teendő?",
      options: [
        "Megtartani: valódi árak, a kiugró csak jelölt, nem automatikusan hiba.",
        "Törölni őket, mert torzítják az átlagot.",
        "A nem kiugró árak móduszával helyettesíteni őket.",
        "A felső határra (1850 Ft) vágni őket."
      ],
      answer: 0,
      hint: "Mielőtt bármit javítasz, kérdezd meg: hibás-e az érték, vagy csak ritka/nagy?",
      explain: "A kávé és a csirke tényleg drága. Törlésük, cseréjük vagy vágásuk meghamisítaná az árbevételt (épp a két legnagyobb bevételű terméket). A kiugrót mindig egyenként meg kell vizsgálni."
    }
  ]
};

QUIZZES["l01-lepes10"] = {
  title: "Mini-kvíz – Alak, robusztus mutatók, ábrák",
  questions: [
    {
      type: "single",
      q: "A tisztított adaton az <code>unit_price</code> ferdesége 1,45. Melyik állítás igaz?",
      options: [
        "Erősen jobbra ferde: néhány drága termék (kávé, csirke) hosszú jobb farkat ad, az átlag a medián fölött van.",
        "Erősen balra ferde: a legtöbb tétel drága, és néhány olcsó húzza le az átlagot.",
        "Közel szimmetrikus, mert a ferdeség 2 alatt van.",
        "Csúcsos eloszlás: a ferdeség a csúcs magasságát méri."
      ],
      answer: 0,
      hint: "A ferdeség előjele a hosszabb farok oldalát mutatja. Mekkora |ferdeség| számít erősnek?",
      explain: R`Pozitív ferdeség = jobbra ferde; $|g_1| > 1$ erősnek számít. Itt az átlag (936,74) valóban a medián (750) fölött van. A csúcs „magasságát” (pontosabban a farok vastagságát) a csúcsosság méri, nem a ferdeség.`
    },
    {
      type: "single",
      q: R`Adat: $2, 3, 3, 5, 7, 40$. Mennyi a medián abszolút eltérés (MAD)?`,
      options: ["1,5", "10", "14,81", "1"],
      answer: 0,
      hint: "Előbb a medián, aztán az attól vett abszolút eltérések, és azoknak megint a mediánja.",
      explain: R`Medián $4$; $|x-4|$: $2,1,1,1,3,36$, rendezve $1,1,1,2,3,36$, a két középső átlaga $(1+2)/2 = 1{,}5$. A 10 az átlagos abszolút eltérés (AAD, az átlagtól mérve), a 14,81 a szórás. Az 1 akkor jön ki, ha a rendezett lista 3. elemét veszed, a 3. és 4. átlaga helyett.`
    },
    {
      type: "match",
      q: "Párosítsd a mutatót az összegző statisztikák csoportjával!",
      pairs: [
        ["csonkolt átlag", "helyzetmutató"],
        ["medián abszolút eltérés (MAD)", "szóródási mutató"],
        ["csúcsosság", "alakmutató"],
        ["kvantilis, gyakoriság", "eloszlásmutató"]
      ],
      hint: "Helyzet: hol a közép? Szóródás: mennyire ingadozik? Alak: milyen formájú?",
      explain: "A csonkolt átlag a „közepet” adja meg robusztusan; a MAD az ingadozást; a csúcsosság (és a ferdeség) az eloszlás alakját; a kvantilisek és a gyakoriságok magát az eloszlást írják le."
    },
    {
      type: "match",
      q: "Melyik ábra illik a feltáró elemzés kérdéséhez?",
      pairs: [
        ["a kosárértékek eloszlásának alakja", "hisztogram"],
        ["a napi árbevétel alakulása három hónapon át", "vonaldiagram"],
        ["az átlagos tételérték és a vásárolt mennyiség kapcsolata vásárlónként", "szórásdiagram"],
        ["a tételértékek kvartilisei és kiugrói régiónként", "csoportonkénti dobozábra"]
      ],
      hint: "Egy folytonos változó alakja, időbeli trend, két numerikus kapcsolata, csoportok összevetése – mindegyiknek megvan a maga ábrája.",
      explain: "Alakhoz hisztogram, időhöz vonaldiagram, két numerikus változóhoz szórásdiagram, kvartilisekhez és csoportok összevetéséhez dobozábra. Tortadiagram egyikhez sem jó: az csak kevés kategória rész–egész arányára való."
    }
  ]
};

QUIZZES["l01-lepes11"] = {
  title: "Mini-kvíz – Előfeldolgozási eszközök",
  questions: [
    {
      type: "single",
      q: "A termékárak 250 Ft és 2400 Ft között vannak. Mennyi a kávé (2200 Ft) min–max normalizált ára?",
      options: ["0,907", "0,917", "0,813", "2,25"],
      answer: 0,
      hint: R`$x' = (x - \min)/(\max - \min)$. Mit kell kivonni, és mivel kell osztani?`,
      explain: R`$(2200-250)/(2400-250) = 1950/2150 \approx 0{,}907$. A 0,917 a $2200/2400$ (a minimum kivonása kimaradt), a 0,813 az $1950/2400$ (a terjedelem helyett a maximummal osztva), a 2,25 a kávé tételszintű z-pontszáma, ami standardizálás, nem normalizálás.`
    },
    {
      type: "match",
      q: "Párosítsd a műveletet a nevével!",
      pairs: [
        ["a régióból négy 0/1 oszlop", "binarizálás (dummy-kódolás)"],
        ["a kosárértékek három egyforma létszámú sávba", "diszkretizálás (egyenlő gyakoriságú)"],
        ["az árak a [0, 1] intervallumba", "normalizálás (min–max)"],
        ["6945 tételből 1151 kosár értéke", "aggregálás"]
      ],
      hint: "Új oszlopok, kategóriák, átskálázás, vagy a sorok összevonása?",
      explain: R`A <code>get_dummies</code> binarizál, a <code>qcut</code> egyenlő gyakoriságú sávokba sorol, a min–max $[0,1]$-be skáláz, a <code>groupby(...).sum()</code> aggregál. Az utolsónál a megfigyelési egység is megváltozik (tétel → kosár).`
    },
    {
      type: "single",
      q: "Mikor jobb a rétegzett mintavétel az egyszerű véletlen mintánál?",
      options: [
        "Ha egy fontos csoport (pl. a 2%-nyi lemorzsolódó ügyfél) arányának pontosan meg kell maradnia a mintában.",
        "Mindig, mert a rétegzett minta nagyobb.",
        "Ha ugyanazt a rekordot többször is ki akarjuk választani.",
        "Ha nincs semmilyen csoportosító változó az adatban."
      ],
      answer: 0,
      hint: "A rétegzett minta minden csoportból arányosan választ. Mikor számít ez igazán?",
      explain: "Rétegzéskor csoportonként, arányosan veszünk mintát, így a ritka csoport sem csúszhat el véletlenül. A minta mérete ettől nem lesz nagyobb. A többszöri kiválasztás a visszatevéses mintavétel. Csoportosító változó nélkül nincs mi szerint rétegezni."
    },
    {
      type: "single",
      q: "A K-means bemenetébe a régiót East = 1, North = 2, South = 3, West = 4 kóddal teszed. Mi a gond?",
      options: [
        "Hamis sorrendet és távolságot visz be (East–West távolsága 3, East–North 1); nominális változóhoz dummy-kódolás kell.",
        "Semmi, a K-means bármilyen számot elfogad.",
        "Csak az, hogy a kódokat előbb standardizálni kellene, és akkor rendben van.",
        "Az, hogy a kódoknak 0-tól kellene indulniuk."
      ],
      answer: 0,
      hint: "Van-e a régióknak sorrendje? Mit számol a K-means a számokkal?",
      explain: "A K-means távolságot számol, így a sorszámkód egy nem létező sorrendet tanul meg. A standardizálás vagy a 0-tól induló kód ezen nem segít, mert a sorrend megmarad. A <code>pd.get_dummies</code> után bármely két különböző régió egyforma távolságra van."
    },
    {
      type: "single",
      q: R`A $1, 2, 5, 10, 20, 50$ értékeket <code>KBinsDiscretizer(n_bins=3, strategy="uniform", encode="ordinal")</code> sávolja. Milyen kódokat kapnak (ebben a sorrendben)?`,
      options: ["0, 0, 0, 0, 1, 2", "0, 0, 1, 1, 2, 2", "0, 1, 1, 1, 2, 2", "1, 1, 1, 1, 2, 3"],
      answer: 0,
      hint: R`Egyenlő szélesség: $(\max-\min)/3$. Hol vannak a határok?`,
      explain: R`Szélesség $49/3\approx16{,}33$, határok $17{,}33$ és $33{,}67$: négy érték az első sávba, a 20 a másodikba, az 50 a harmadikba. A „0, 0, 1, 1, 2, 2” a <code>quantile</code> stratégia eredménye (sávonként két érték). Az „1, 1, 1, 1, 2, 3” elfelejti, hogy az <code>ordinal</code> kódolás 0-tól számoz.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak a diszkretizálásra?",
      options: [
        "A döntési fa küszöbei felügyelt diszkretizálást adnak, mert a célváltozó alapján választódnak.",
        "A <code>quantile</code> stratégia robusztusabb a kiugró értékekre, mint az <code>uniform</code>.",
        "Modellépítésnél a sávhatárokat csak a tanítóadatból szabad kiszámolni (pl. Pipeline-nal).",
        "A <code>kmeans</code> stratégia felügyelt, mert egy tanuló algoritmus jelöli ki a határokat.",
        "A diszkretizálás nem jár információvesztéssel."
      ],
      answer: [0, 1, 2],
      hint: "Felügyelt az, ami a célváltozót is nézi. És mi tűnik el a sávon belül?",
      explain: "A K-means csak a változó saját értékeit nézi, ezért nem felügyelt. A sávon belüli különbségek elvesznek – ez a diszkretizálás ára. A tesztadatból számolt határ adatszivárgás."
    }
  ]
};

QUIZZES["l01-vegso"] = {
  title: "Ellenőrző kvíz – 1. lecke",
  questions: [
    {
      type: "single",
      q: "Melyik feladat <em>felügyelet nélküli</em> tanulás?",
      options: [
        "Vásárlók csoportosítása vásárlási szokásaik alapján, előre ismert csoportok nélkül",
        "Hitelkérelmezők besorolása kockázatosra / nem kockázatosra korábbi, ismert kimenetelű hitelek alapján",
        "Hallgatók vizsgaeredményének (átment / nem ment át) előrejelzése múltbeli adatokból",
        "E-mailek spam / nem spam osztályozása felcímkézett levelek alapján"
      ],
      answer: 0,
      hint: "Van-e a tanítóadatban ismert „helyes válasz” (célváltozó)?",
      explain: "A klaszterezésnél nincs célváltozó, az algoritmus maga találja meg a csoportokat. A többi mind osztályozás, ahol a múltbeli példákban ismert a címke: felügyelt tanulás."
    },
    {
      type: "single",
      q: "Miért tisztítjuk az adatot a modellezés <em>előtt</em>?",
      options: [
        "Mert a gépi tanuló eljárások nem tudnak mit kezdeni a hiányos adattal, a kiugrók pedig torzítják a számításokat.",
        "Mert a tisztítás után a modell mindig pontosabb lesz, ezért utólag nem kell ellenőrizni.",
        "Mert a tisztítás csökkenti a sorok számát, és így gyorsabban fut a modell.",
        "Mert a modellezés után már nem lehet visszalépni az adatokhoz."
      ],
      answer: 0,
      hint: "Gondolj arra, mit csinál egy klaszterező algoritmus egy NaN értékkel.",
      explain: "A hiányok és a kiugrók közvetlenül rontják a modellt. Ettől még a folyamat iteratív: ha az eredmény furcsa, visszalépünk a tisztításhoz, és dokumentáljuk a változatokat."
    },
    {
      type: "match",
      q: "Párosítsd a változót a mérési skálájával!",
      pairs: [
        ["product (terméknév)", "nominális"],
        ["iskolai végzettség (alap-, közép-, felsőfok)", "ordinális"],
        ["hőmérséklet °C-ban", "intervallum"],
        ["unit_price (egységár, HUF)", "arány"]
      ],
      hint: "Sorrend? Értelmes különbség? Valódi nulla?",
      explain: "Terméknév: csak azonosság. Végzettség: sorrend, de nincs értelmes távolság. °C: a különbség értelmes, de a 0 °C önkényes. Egységár: valódi nulla, értelmes hányados."
    },
    {
      type: "single",
      q: "A nyers adaton az <code>info()</code> szerint a <code>unit_price</code> 6951 nem hiányzó értéket tartalmaz (6957 sorból), típusa <code>float64</code>, pedig minden kitöltött ár egész. Mi a legvalószínűbb ok?",
      options: [
        "A 6 hiányzó érték (NaN) miatt, mert a NaN lebegőpontos, és egy int64 oszlop nem tárolhatja.",
        "Mert az egységárak között tizedes törtek vannak.",
        "Mert a pandas minden számot float64-ként olvas be.",
        "Mert a fájl rossz elválasztóval lett beolvasva."
      ],
      answer: 0,
      hint: "6957 − 6951 = ?",
      explain: "Hat hiány van, és a NaN lebegőpontos érték. A pandas az egész számokat alapból int64-ként olvasná be (ezért nem igaz a harmadik opció). A hiányok pótlása után a gyakorlat kódja vissza is alakítja int64-re."
    },
    {
      type: "single",
      q: "A nyers adatban a <code>product</code> oszlopnak 26 különböző értéke van, az elvárt 18 helyett. Mi hozza helyre a gyakorlat adatán?",
      options: [
        "<code>str.strip().str.lower()</code> – szóközlevágás és kisbetűsítés",
        "<code>drop_duplicates()</code> – a duplikált sorok törlése",
        "<code>pd.to_numeric(..., errors=\"coerce\")</code>",
        "<code>dropna()</code> – a hiányos sorok törlése"
      ],
      answer: 0,
      hint: "A hiba nem a sorok számában, hanem a nevek írásmódjában van.",
      explain: "A 8 felesleges név 4 szóközzel körülvett és 4 kisbetűs írásmód volt. Strip + lower után pontosan 18 marad. A duplikátumtörlés a sorokat érinti, nem a neveket."
    },
    {
      type: "single",
      q: "Miért kell a típuskonverziónak a hiányzó értékek kezelése <em>előtt</em> lennie?",
      options: [
        "Mert a konverzió (errors=\"coerce\") a hibás értékekből új hiányokat csinál, és csak utána látod az összes hiányt.",
        "Mert a konverzió törli a hiányos sorokat.",
        "Mert a fillna() csak float64 oszlopon működik.",
        "Mert a konverzió után már nem lehet duplikátumot keresni."
      ],
      answer: 0,
      hint: "A gyakorlaton a quantity oszlopban a konverzió előtt 0 hiány volt. Utána?",
      explain: "Az „unknown” mennyiségek csak a konverzió után lettek NaN-ok (6 db). Ha előbb kezeled a hiányokat, ezek kimaradnak, és az <code>astype(\"int64\")</code> később hibát ad."
    },
    {
      type: "single",
      q: "A hiányzó mennyiségű (eredetileg „unknown”) sorokat a gyakorlat kódja törölte. Mi ennek a következménye, amit dokumentálni kell?",
      options: [
        "Az elemzett árbevétel kisebb lesz a valódinál (alulbecslés).",
        "Az árbevétel nagyobb lesz, mert a törölt sorok átlag alatti értékűek.",
        "Semmi, mert a törlés nem befolyásolja az eredményt.",
        "A termékek száma 18 alá csökken."
      ],
      answer: 0,
      hint: "Mi történik egy összeggel, ha tagokat hagysz ki belőle?",
      explain: "A 6 törölt tétel forgalma kiesik az összegből. Ez kicsi torzítás, de le kell írni. Pótolni (pl. módusszal) is lehetett volna, de az „kitalált” forgalom – mindkét döntésnek ára van."
    },
    {
      type: "single",
      q: R`Adat: $2, 3, 3, 5, 7, 40$. Mennyi az átlag és a medián?`,
      options: ["átlag 10, medián 4", "átlag 4, medián 10", "átlag 10, medián 3", "átlag 5, medián 4"],
      answer: 0,
      hint: "Páros számú adatnál a medián a két középső érték átlaga.",
      explain: R`Átlag $60/6 = 10$. Medián $(3+5)/2 = 4$. A 3 a módusz, az „átlag 5” pedig a 40 helyett 10-zel számolt adatsoré. Látszik, hogy egyetlen kiugró az átlagot megduplázza, a mediánt nem mozdítja.`
    },
    {
      type: "single",
      q: R`A tisztított adaton a quantity átlaga $1{,}52$, mediánja és módusza $1$. Mit jelent ez az eloszlásra?`,
      options: [
        "Jobbra ferde: a legtöbb tétel 1 db, a ritkább 2–3 db-os tételek felhúzzák az átlagot.",
        "Balra ferde: a kis értékek húzzák le az átlagot.",
        "Szimmetrikus, mert a medián és a módusz egyenlő.",
        "Normális eloszlású, mert az átlag a medián közelében van."
      ],
      answer: 0,
      hint: "Melyik irányba húzza a ritka nagy érték az átlagot?",
      explain: "Átlag > medián → jobbra ferde (jobbra elnyúló). Gyakoriságok: 1 → 4110, 2 → 2074, 3 → 761 tétel."
    },
    {
      type: "single",
      q: R`Adat: $1, 2, 3, 4, 5, 6, 7, 8, 30$ (pandas-kvartilisek). Mennyi az IQR, és kiugró-e a 30?`,
      options: [
        "IQR = 4, felső határ 13 → a 30 kiugró",
        "IQR = 29, felső határ 50,5 → a 30 nem kiugró",
        "IQR = 4, felső határ 11 → a 30 kiugró",
        "IQR = 5, felső határ 14,5 → a 30 kiugró"
      ],
      answer: 0,
      hint: R`$n = 9$, a pozíció $h = (n-1)p + 1$: $Q_1$ a 3., $Q_3$ a 7. érték.`,
      explain: R`$Q_1 = 3$, $Q_3 = 7$, $IQR = 4$, felső határ $7 + 1{,}5\cdot 4 = 13$. A 29 a terjedelem (max − min), nem az IQR. A 11 az $Q_3 + IQR$, a 14,5 pedig rossz kvartilisekből jön.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak a kiugró értékekre?",
      options: [
        "Az IQR-módszer határai nem tolódnak el magától a kiugró értéktől.",
        "Egy kiugró értéket először egyenként meg kell vizsgálni, mielőtt törlöd vagy korrigálod.",
        "Az IQR-módszer csak normális eloszlású adatra alkalmazható.",
        "Minden kiugró érték adathiba, ezért törölni kell."
      ],
      answer: [0, 1],
      hint: "Gondolj a kávé és a csirke árára.",
      explain: "A kvartilisek robusztusak, így a határok stabilak. A módszer nem feltételez normális eloszlást (csak normálisnál ad kb. 0,7% kiugrót). A kiugró jelölt, nem biztos hiba: a 2200 Ft-os kávé valódi ár."
    },
    {
      type: "single",
      q: "Melyik kód adja meg termékenként az árbevételt, csökkenő sorrendben?",
      options: [
        "<code>data.groupby(\"product\")[\"line_total\"].sum().sort_values(ascending=False)</code>",
        "<code>data.groupby(\"product\")[\"line_total\"].mean().sort_values(ascending=False)</code>",
        "<code>data.groupby(\"transaction_id\")[\"line_total\"].sum().sort_values(ascending=False)</code>",
        "<code>data.groupby(\"product\")[\"quantity\"].sum().sort_values(ascending=False)</code>"
      ],
      answer: 0,
      hint: "Három dolgot nézz: mi szerint csoportosít, melyik oszlopot, és milyen összesítéssel.",
      explain: "Termék szerint kell csoportosítani, a tételértéket (quantity × unit_price), és összegezni. A mean az átlagos tételérték, a transaction_id szerinti a kosárérték, a quantity összege az eladott mennyiség (abban a kenyér vezet, árbevételben a kávé)."
    },
    {
      type: "single",
      q: R`$x = 1, 2, 3, 4, 5$ és $y = 2, 4, 5, 4, 5$. A kovariancia $1{,}5$. Mennyi a Pearson-korreláció?`,
      options: ["0,77", "1,5", "1,2", "0,6"],
      answer: 0,
      hint: R`$r = \dfrac{\operatorname{cov}(x,y)}{s_x s_y}$, ahol $s_x^2 = 2{,}5$ és $s_y^2 = 1{,}5$.`,
      explain: R`$r = 1{,}5 / \sqrt{2{,}5 \cdot 1{,}5} = 1{,}5/\sqrt{3{,}75} \approx 0{,}77$. Az 1,5 maga a kovariancia (nem lehet korreláció, mert $|r| \le 1$), az 1,2 az $n$-nel osztott kovariancia, a 0,6 pedig $r^2$.`
    },
    {
      type: "single",
      q: R`A gyakorlat adatán $r(\text{quantity}, \text{unit\_price}) = 0{,}006$. Mi a helyes értelmezés?`,
      options: [
        "Gyakorlatilag nincs lineáris kapcsolat: a drága termékekből tételenként nem vesznek kevesebbet.",
        "Erős pozitív kapcsolat: a drágább termékekből többet vesznek.",
        "A két változó biztosan független, semmilyen kapcsolat nincs köztük.",
        "A kovariancia is biztosan közel 0, tehát elhanyagolható."
      ],
      answer: 0,
      hint: "A korreláció csak egyfajta kapcsolatot mér. Melyiket?",
      explain: R`$r \approx 0$: nincs <em>lineáris</em> kapcsolat. Függetlenséget nem bizonyít (nemlineáris kapcsolat lehetne). A kovariancia mértékegységfüggő: itt kb. 2,47, mert az ár szórása nagy (kb. 562 Ft) – a kovariancia nagyságából nem következik erősség.`
    }
  ]
};
