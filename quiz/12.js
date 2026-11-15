/* 12. lecke – Adattárolási szintek, adattárház, ETL/ELT – kvízek */

QUIZZES["l12-lepes2"] = {
  title: "Mini-kvíz – Tárolási szintek, OLTP és OLAP",
  questions: [
    {
      type: "single",
      q: "Egy koncertjegy-oldalon egyszerre több ezren vásárolnak, egy ülőhely nem kelhet el kétszer. Melyik tárolási szint az alap?",
      options: ["Relációs adatbázis tranzakciókezeléssel", "Megosztott mappa a file-szerveren", "Adattó nyers JSON-fájlokkal", "Adattárház éjszakai betöltéssel"],
      answer: 0,
      hint: "Mi a kulcsigény: sok egyidejű írás vagy nagy összesítő olvasás?",
      explain: "Az egyidejű írás és az integritás (a foglalás vagy teljesen lefut, vagy semmi) relációs adatbázis tranzakcióival oldható meg. A file-szerver nem kezeli az egyidejű írást, az adattó és az adattárház elemzésre való, nem üzemi foglalásra."
    },
    {
      type: "match",
      q: "Párosítsd a műveletet a rendszertípussal!",
      pairs: [
        ["Béla szállítási címének módosítása", "OLTP"],
        ["Bevétel régiónként és negyedévenként 3 évre", "OLAP"],
        ["Egy új rendelés rögzítése", "OLTP"],
        ["A 10 legjövedelmezőbb termékkategória trendje", "OLAP"]
      ],
      hint: "Egy-két sort ír a művelet, vagy milliónyi sort összesít?",
      explain: "Az OLTP rövid, egy-két soros írásokat és kulcs szerinti olvasást szolgál ki a napi működéshez; az OLAP nagy, összesítő, sokszor historikus lekérdezéseket a döntéstámogatáshoz."
    },
    {
      type: "single",
      q: "A tranzakciós adatbázisban Anna városát Budapestről Győrre írják át (<code>UPDATE</code>). Mi történik a márciusi, régiós bevételi riporttal, ha azt a tranzakciós adatbázisból számolják újra?",
      options: [
        "Anna márciusi vásárlásai a Nyugat régióhoz kerülnek, a Közép régió eltűnik a márciusi riportból.",
        "Semmi, mert a márciusi rendelések dátuma nem változott.",
        "Anna márciusi vásárlásai mindkét régióban megjelennek.",
        "A lekérdezés hibára fut, mert a város megváltozott."
      ],
      answer: 0,
      hint: "Honnan tudja a lekérdezés a régiót: a rendelésből vagy az ügyfél jelenlegi adatából?",
      explain: "A normalizált OLTP-sémában a régió az ügyfél <em>jelenlegi</em> városán keresztül jön, így a múlt utólag átíródik (Nyugat Elektronika 610, Élelmiszer 15). Az elemző tábla a vásárláskori várost őrzi, ott március változatlan. Ezért tárolja a múltat az adattárház."
    },
    {
      type: "multi",
      q: "Mely állítások igazak az elemző (OLAP) tárolásra?",
      options: [
        "Szándékosan redundáns (denormalizált) lehet, mert sokat olvasunk és ritkán írunk.",
        "Gyakran oszlopalapú, így egy összesítés csak a szükséges oszlopokat olvassa.",
        "Historikus adatot is tárol, nemcsak az aktuális állapotot.",
        "Akkor jó, ha a felhasználók folyamatosan, soronként módosítják az adatokat."
      ],
      answer: [0, 1, 2],
      hint: "Gondolj az <code>ertekesites</code> táblára és arra, milyen műveletek futnak rajta.",
      explain: "Az elemző tárolás olvasásra optimalizált: denormalizált, gyakran oszlopalapú, historikus. A folyamatos soronkénti módosítás az OLTP terepe; az adattárház időszakos betöltéssel bővül."
    }
  ]
};

QUIZZES["l12-lepes4"] = {
  title: "Mini-kvíz – Adattárház és komponensei",
  questions: [
    {
      type: "match",
      q: "Párosítsd Inmon tulajdonságait a példával!",
      pairs: [
        ["„nő/N/0” kódok egységesen „N”-re alakítva", "integrált"],
        ["minden sorban van érvényességi dátum, 10 évnyi adat", "időben változó"],
        ["az elemzők nem írhatnak a táblákba, csak betöltés bővíti", "nem illékony"],
        ["„Vevő” és „Termék” terület, nem „számlázó modul”", "téma-orientált"]
      ],
      hint: "Melyik szól a forrásokról, melyik az időről, melyik a módosításról, melyik a szerveződésről?",
      explain: "Integrált: egységes kódolás több forrásból. Időben változó: az idő az adat része, hosszú idősor. Nem illékony: nincs helybeni felülírás, a tárház betöltéssel bővül. Téma-orientált: üzleti témák köré szerveződik, nem alkalmazások köré."
    },
    {
      type: "single",
      q: "A webshop eseményeiben új mező jelenik meg (<code>kupon</code>), a betöltőt senki nem módosítja. Mi történik egy schema-on-write adattárházban?",
      options: [
        "A mező elveszik (a betöltő eldobja), vagy a betöltés hibára fut.",
        "A mező automatikusan új oszlopként megjelenik.",
        "A mező nyersen megmarad, és olvasáskor lehet rá sémát illeszteni.",
        "Az egész esemény szövegként egyetlen oszlopba kerül."
      ],
      answer: 0,
      hint: "Schema-on-write: mikor dől el a tábla szerkezete?",
      explain: "Schema-on-write esetén a séma a betöltés előtt rögzített, ami nem fér bele, az elveszik vagy hibát okoz. Az olvasáskori sémaillesztés (schema-on-read) az adattó jellemzője."
    },
    {
      type: "match",
      q: "Párosítsd a feladatot az adattárház-komponenssel!",
      pairs: [
        ["éjjel 2-kor elindítja a betöltést és az előaggregálást", "ütemező modul"],
        ["leírja, hogy a „bevétel” nettó, áfa nélkül, és mikor frissült", "metaadat modul"],
        ["a DW logikai modellje, általában többdimenziós", "adathozzáférési interfész"],
        ["a bejövő adat ideiglenes tárolása és tisztítása betöltés előtt", "átmeneti terület"]
      ],
      hint: "Gondolj az architektúra-ábrára és a VIR-komponensekre.",
      explain: "Az ütemező vezérli a belső műveleteket, a metaadat modul írja le az adatot (üzleti és technikai metaadat), az adathozzáférési interfész a logikai (MD) modell, az átmeneti terület (staging) a betöltés előtti munkaterület."
    },
    {
      type: "single",
      q: "Az ügyfélszolgálat azt akarja látni, milyen nyitott rendelései és reklamációi vannak <em>most</em> egy ügyfélnek, három rendszerből összefésülve. Melyik VIR-komponens szolgálja ki ezt?",
      options: ["ODS", "EDW", "Adatpiac", "EAI"],
      answer: 0,
      hint: "Integrált, de aktuális állapot kell, nem évek idősora.",
      explain: "Az ODS integráltan tárolja a források aktuális állapotát és gyakran frissül. Az EDW historikus, vállalati szintű (napi késéssel), az adatpiac részlegszintű elemző tár, az EAI pedig az alkalmazásokat köti össze, nem tárol elemzésre."
    }
  ]
};

QUIZZES["l12-lepes6"] = {
  title: "Mini-kvíz – ETL, betöltés, ELT",
  questions: [
    {
      type: "single",
      q: "Az 5. lépés két CSV-jében a W3 rendelés kétszer szerepel. Mennyi lenne a teljes bevétel deduplikálás nélkül (minden más átalakítás megtörténik)?",
      options: ["41 200 Ft", "36 700 Ft", "32 200 Ft", "25 011,7 Ft"],
      answer: 0,
      hint: "A helyes összeg 36 700 Ft. Mennyivel több, ha a 4 500 Ft-os W3 kétszer számít?",
      explain: R`$36\,700 + 4\,500 = 41\,200$ Ft. A 36 700 a helyes (deduplikált) összeg, a 32 200 a W3 teljes kihagyása lenne, a 25 011,7 pedig az, ha a bolti ezer Ft-os összegeket nem szoroznánk ezerrel.`
    },
    {
      type: "single",
      q: "Miért oszt ki az ETL saját helyettesítő kulcsot (surrogate key) a forráskulcs helyett?",
      options: [
        "Mert két forrásrendszer ugyanazt a kulcsot más-más ügyfélre használhatja, és a forráskulcs rendszerváltáskor változhat.",
        "Mert a helyettesítő kulcs titkosítja az ügyfél nevét.",
        "Mert a forráskulcs mindig szöveges, a DW csak számot tárolhat.",
        "Mert így a duplikátumok automatikusan eltűnnek."
      ],
      answer: 0,
      hint: "Gondolj a webshop 17-es és a hűségkártya-rendszer 17-es ügyfelére.",
      explain: "A helyettesítő kulcs a forrásoktól független, stabil azonosító: elkerüli a kulcsütközést, és túléli a forrásrendszer cseréjét. Nem titkosít (legfeljebb álnevesítésre használható), és nem deduplikál: a duplikátumot a kulcsosztás <em>előtt</em> kell kiszűrni."
    },
    {
      type: "single",
      q: "A vízjel 2025-03-02 18:20. Az inkrementális betöltés <code>WHERE modositva &gt; '2025-03-02 18:20'</code> feltétellel fut. Mit NEM vesz észre?",
      options: [
        "A forrásból azóta törölt rendelést.",
        "Az azóta módosított rendelést.",
        "Az azóta beszúrt új rendelést.",
        "A vízjel utáni bármelyik változást."
      ],
      answer: 0,
      hint: "Ki lehet-e olvasni egy olyan sort, amely már nincs a forrástáblában?",
      explain: "A törölt sor nincs a forrásban, így az időbélyeges lekérdezés nem találja meg. A módosított és az új sorok friss időbélyeget kapnak, ezért átjönnek. A törléshez CDC, logikai törlés jelzőmező vagy időnkénti teljes összevetés kell."
    },
    {
      type: "multi",
      q: "Mely helyzetek szólnak az ELT mellett?",
      options: [
        "Felhős adattárház nagy, skálázható számítási kapacitással.",
        "A nyers adatot meg kell őrizni későbbi újrafeldolgozáshoz.",
        "Jogszabály írja elő, hogy a személyes adat csak álnevesítve kerülhet a tárolóba.",
        "Helyben futó, korlátos kapacitású tárház, amely csak előre formázott adatot fogad."
      ],
      answer: [0, 1],
      hint: "Hol történik az átalakítás ELT-ben, és mi marad meg a célrendszerben?",
      explain: "Az ELT a célrendszer számítási erejével alakít, és megőrzi a nyers adatot. Ha a tárolás előtt kötelező az átalakítás (álnevesítés), vagy a cél csak tiszta adatot fogad és kevés a kapacitása, az ETL a jó választás."
    }
  ]
};

QUIZZES["l12-lepes8"] = {
  title: "Mini-kvíz – Elosztott tárolás, felhő, NoSQL",
  questions: [
    {
      type: "single",
      q: "Egy 300 MB-os fájlt HDFS-be töltünk (128 MB-os blokk, replikációs tényező 3). Hány blokkpéldány keletkezik, és mennyi nyers tárhelyet foglal?",
      options: ["9 példány, 900 MB", "3 példány, 300 MB", "9 példány, 1 152 MB", "6 példány, 600 MB"],
      answer: 0,
      hint: "Előbb a blokkok száma (felfelé kerekítve), aztán a replikáció. Az utolsó blokk is csak akkora, amekkora.",
      explain: R`$\lceil 300/128\rceil = 3$ blokk (128, 128, 44 MB), $3\cdot 3 = 9$ példány, $3\cdot 300 = 900$ MB. A 1 152 MB akkor jönne ki, ha az utolsó blokk is 128 MB-ot foglalna ($9\cdot 128$), de a HDFS nem tölti fel. A 3 példány / 300 MB a replikáció elfelejtése.`
    },
    {
      type: "single",
      q: "A szószámlálásban a csomópontok adata: <code>adat tó adat ház</code> | <code>ház adat felhő</code> | <code>tó felhő felhő adat</code>. Mit ad a reduce az „adat” kulcsra?",
      options: ["4", "3", "[1, 1, 1, 1]", "2"],
      answer: 0,
      hint: "A shuffle összegyűjti a kulcs összes (adat, 1) párját, a reduce összegez.",
      explain: "Az „adat” az 1. csomóponton kétszer, a 2.-on és a 3.-on egyszer fordul elő: 4. A [1, 1, 1, 1] a shuffle kimenete (a reduce bemenete), a 2 csak az 1. csomópont helyi száma, a 3 a „felhő” végeredménye."
    },
    {
      type: "match",
      q: "Párosítsd az igényt a NoSQL-típussal!",
      pairs: [
        ["munkamenet-azonosítók, cache", "kulcs–érték"],
        ["eltérő szerkezetű termékleírások", "dokumentum"],
        ["IoT-mérések idősora, nagy írási terhelés", "oszlopcsalád"],
        ["csalásfelderítés kapcsolati láncok alapján", "gráf"]
      ],
      hint: "Mi a lényeg: a kulcs, az objektum szerkezete, az idősor vagy a kapcsolat?",
      explain: "Kulcs–érték: kulcs szerinti, nagyon gyors elérés (Redis). Dokumentum: rugalmas szerkezetű objektumok (MongoDB). Oszlopcsalád: soronként sok rendezett oszlop, idősor, nagy írási terhelés (Cassandra). Gráf: a kapcsolat maga az adat (Neo4j)."
    },
    {
      type: "single",
      q: "Mi igaz a HDFS 3-szoros replikációjára?",
      options: [
        "Gépkiesés ellen véd, de egy véletlen törlés mindhárom példányt érinti, tehát nem helyettesíti a mentést.",
        "Teljes értékű biztonsági mentés, külön mentésre nincs szükség.",
        "Háromszor gyorsabbá teszi az írást.",
        "A három példány három különböző fájlverziót őriz."
      ],
      answer: 0,
      hint: "Mi történik a másolatokkal, ha valaki letörli a fájlt?",
      explain: "A replikáció a hardverhibát kezeli: ha egy csomópont kiesik, a többi példányból pótolható. A logikai hibát (törlés, felülírás) viszont azonnal átvezeti minden példányra, ezért a mentés továbbra is kell. Az írás inkább lassabb, mert háromszor kell írni."
    }
  ]
};

QUIZZES["l12-vegso"] = {
  title: "Ellenőrző kvíz – Adattárolás, adattárház, ETL/ELT",
  questions: [
    {
      type: "single",
      q: "Egy 2 000 soros árlistát három kolléga használ, ritkán módosítják. Melyik a legjobb megoldás?",
      options: ["Megosztott fájl (file-szerver vagy felhős fájlmegosztás) mentéssel", "Hadoop-fürt HDFS-sel", "Lakehouse bronz–ezüst–arany rétegekkel", "Elosztott NoSQL-adatbázis"],
      answer: 0,
      hint: "A legegyszerűbb szint, amely még elbírja az igényt.",
      explain: "Kicsi adat, kevés felhasználó, ritka módosítás: a megosztott fájl elég. A Hadoop, a lakehouse és az elosztott NoSQL itt túlméretezés: drágább, bonyolultabb, több hibalehetőséggel."
    },
    {
      type: "multi",
      q: "Melyek Inmon adattárház-definíciójának tulajdonságai?",
      options: ["téma-orientált", "integrált", "időben változó", "nem illékony", "normalizált", "valós idejű"],
      answer: [0, 1, 2, 3],
      hint: "Négy tulajdonság van; a többi inkább az OLTP-re vagy egy streaming rendszerre jellemző.",
      explain: "Téma-orientált, integrált, időben változó, nem illékony. A normalizáltság az OLTP-sémák jellemzője (az elemző tárolás gyakran szándékosan denormalizált), a valós idejűség pedig nem része a definíciónak: az adattárház jellemzően időszakosan töltődik."
    },
    {
      type: "single",
      q: "Mi a különbség a schema-on-write és a schema-on-read között?",
      options: [
        "Schema-on-write: a séma a betöltés előtt rögzített (adattárház); schema-on-read: az adat nyersen tárolódik, a sémát olvasáskor adjuk meg (adattó).",
        "Schema-on-write: a séma olvasáskor jön létre; schema-on-read: betöltés előtt.",
        "A schema-on-write csak NoSQL-ben, a schema-on-read csak relációs adatbázisban létezik.",
        "Csak a fájlformátumban térnek el: CSV, illetve JSON."
      ],
      answer: 0,
      hint: "A név megmondja, mikor kerül szóba a séma: íráskor vagy olvasáskor.",
      explain: "Az adattárház betöltés előtt tisztít és sémába illeszt (schema-on-write), az adattó nyersen tárol, és a sémát a felhasználás pillanatában illeszti (schema-on-read). A második opció pont fordított."
    },
    {
      type: "match",
      q: "Párosítsd a VIR-komponenst a szerepével!",
      pairs: [
        ["ERP", "vállalatirányítási üzemi rendszer"],
        ["EAI", "alkalmazások összekötése adatcseréhez"],
        ["EDW", "vállalati szintű, historikus adattár"],
        ["Adatpiac", "kisebb, részlegszintű adattár"],
        ["ODS", "a források aktuális állapotának integrált tára"]
      ],
      hint: "Melyik üzemi, melyik integrációs, melyik elemző, és melyik aktuális?",
      explain: "ERP: a fő üzemi rendszer (pénzügy, készlet, HR). EAI: alkalmazásintegráció. EDW: vállalati, historikus adattárház. Adatpiac: részleg- vagy témaszintű adattár. ODS: integrált, de aktuális állapot, gyakori frissítéssel."
    },
    {
      type: "single",
      q: "Melyik sorrend írja le helyesen az ETL-t és az ELT-t?",
      options: [
        "ETL: kinyerés → átalakítás → betöltés; ELT: kinyerés → betöltés → átalakítás a célrendszerben",
        "ETL: kinyerés → betöltés → átalakítás; ELT: kinyerés → átalakítás → betöltés",
        "ETL: átalakítás → kinyerés → betöltés; ELT: betöltés → kinyerés → átalakítás",
        "Mindkettő kinyerés → átalakítás → betöltés, csak az eszközök mások"
      ],
      answer: 0,
      hint: "A betűk sorrendje maga a folyamat sorrendje.",
      explain: "ETL-ben az átalakítás a betöltés előtt, külön rendszerben történik; ELT-ben a nyers adat előbb a célrendszerbe kerül, és ott alakítják át (jellemzően SQL-lel, felhős tárházban)."
    },
    {
      type: "single",
      q: "A bolti CSV <code>6,2</code> ezer Ft-ot tartalmaz, a cél Ft-ban tárol. Melyik átalakítási lépés felel érte, és mi a helyes érték?",
      options: ["Formátum- és mértékegység-egységesítés: 6 200 Ft", "Deduplikálás: 6 200 Ft", "Formátum-egységesítés: 62 Ft", "Aggregálás: 6,2 Ft"],
      answer: 0,
      hint: "Itt két dolgot kell kezelni: a tizedesvesszőt és az ezres szorzót.",
      explain: R`A tizedesvesszőt tizedesponttá alakítjuk ($6{,}2 \to 6.2$), majd ezerrel szorzunk: $6\,200$ Ft. A 62 a tizedesjel rossz kezelése (vessző törlése szorzás nélkül), a 6,2 Ft a mértékegység-váltás elfelejtése. Ez nem deduplikálás és nem aggregálás.`
    },
    {
      type: "single",
      q: "Egy 300 millió soros ténytáblában naponta kb. 400 000 sor változik, a törlés ritka, de előfordul. Melyik betöltési stratégia a legjobb?",
      options: [
        "Inkrementális betöltés CDC-vel (vagy időbélyeggel és a törlések külön kezelésével)",
        "Minden éjjel teljes betöltés",
        "Inkrementális betöltés csak időbélyeggel, a törlésekkel nem kell foglalkozni",
        "Nincs szükség betöltésre, az elemzők lekérdezhetik közvetlenül a forrást"
      ],
      answer: 0,
      hint: "Mennyi a változás aránya, és mit nem lát az időbélyeg?",
      explain: R`A változás az állomány töredéke ($300\,000\,000/400\,000 = 750$-szer kevesebb sor), ezért inkrementális betöltés kell. Az időbélyeg a törléseket nem látja, ehhez CDC vagy külön kezelés kell. A forrás közvetlen lekérdezése az OLTP-t terhelné, és a múltat sem őrizné meg.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak az adattóra és a lakehouse-ra?",
      options: [
        "Az adattó strukturált, félig strukturált és nem strukturált adatot is tárol nyersen.",
        "Irányítás (metaadat, katalógus, hozzáférés) nélkül az adattó „adatmocsárrá” válhat.",
        "A lakehouse az adattó rugalmasságát és az adattárház teljesítményét, adatkezelését ötvözi egy rendszerben.",
        "Az adattó schema-on-write megközelítést használ.",
        "A lakehouse csak strukturált adatot tud tárolni."
      ],
      answer: [0, 1, 2],
      hint: "Gondolj az összehasonlító táblára (tárház, tó, lakehouse).",
      explain: "Az adattó bármilyen formátumot nyersen tárol, és schema-on-read (nem schema-on-write). Irányítás nélkül adatmocsárrá válik. A lakehouse hibrid: a tó rugalmassága és a tárház képességei egy rendszerben, strukturált és nem strukturált adatra is."
    },
    {
      type: "single",
      q: "Mi a MapReduce három fázisának helyes sorrendje és szerepe?",
      options: [
        "Map: kulcs–érték párok a helyi adatból → shuffle: csoportosítás kulcs szerint → reduce: kulcsonkénti összesítés",
        "Reduce: összesítés → map: szétosztás → shuffle: rendezés",
        "Shuffle: az adat szétosztása a gépekre → map: összesítés → reduce: kiírás",
        "Map: a fájl blokkokra bontása → shuffle: replikáció → reduce: a blokkok törlése"
      ],
      answer: 0,
      hint: "A szószámlálásban mi keletkezett először: (szó, 1) párok vagy összegek?",
      explain: "A map minden csomóponton a saját adatból (szó, 1) párokat képez, a shuffle az azonos kulcsúakat egy helyre gyűjti, a reduce kulcsonként összegez. A blokkokra bontás és a replikáció a HDFS feladata, nem a MapReduce-é."
    },
    {
      type: "single",
      q: "Egy gyártósori szenzor naponta kb. 691 MB nyers adatot termel. Miért érdemes edge feldolgozást használni?",
      options: [
        "Helyben azonnal lehet reagálni a rendellenességre, és a központba elég összesítőt küldeni, ami töredékére csökkenti a hálózati forgalmat.",
        "Mert az edge eszközön az adat biztonságosabb, mint bármilyen adatközpontban.",
        "Mert így megszűnik az internetkapcsolat igénye minden esetben.",
        "Mert az edge eszközök korlátlan tárhellyel rendelkeznek."
      ],
      answer: 0,
      hint: "Az edge két fő előnye: késleltetés és sávszélesség.",
      explain: "Az edge a keletkezés helyén dolgozza fel az adatot: kisebb a késleltetés (azonnali leállítás), és csak összesítő megy tovább (a percenkénti min–max–átlag naponta kb. 34 KB, húszezerszer kevesebb). Nem szünteti meg minden esetben a hálózatot, és nem automatikusan biztonságosabb vagy korlátlan."
    },
    {
      type: "multi",
      q: "Mely állítások igazak a GDPR-ral kapcsolatban az adattárolásban?",
      options: [
        "Az álnevesített (pl. hash-sel kódolt) adat továbbra is személyes adat.",
        "Az adattakarékosság elve szerint csak a célhoz szükséges személyes adatot szabad tárolni.",
        "A törlési jog a „nem illékony” adattárházra is vonatkozhat; ezért érdemes a személyes adatot külön ügyféltáblában tartani.",
        "Ha az adat titkosítva van, a GDPR nem vonatkozik rá.",
        "Az ELT nyers rétegére a GDPR nem vonatkozik, mert az még nem végleges adat."
      ],
      answer: [0, 1, 2],
      hint: "Mikor szűnik meg egy adat személyes adat lenni: kódolással, titkosítással vagy valódi anonimizálással?",
      explain: "Az álnevesítés és a titkosítás nem anonimizálás: az adat személyes marad, a GDPR érvényes. Az adattakarékosság és a törlési jog az adattárházra is vonatkozik; a külön ügyféltábla teszi lehetővé, hogy a tényadat megmaradjon, de ne legyen személyhez köthető. A nyers ELT-réteg is személyes adatot tárol, rá is vonatkozik a rendelet."
    },
    {
      type: "single",
      q: "Egy cég strukturált és nem strukturált adatot is kezel, gyorsan nő, valós idejű és Power BI-riportokat is akar, érzékeny ügyféladatokkal, költségkontroll mellett. Melyik javaslat a legjobb?",
      options: [
        "Felhős lakehouse (vagy adattó + adattárház), EU-régióban, álnevesítéssel és szerepkör szerinti hozzáféréssel; a valós idejű részhez stream + NoSQL",
        "Egyetlen helyben futó relációs adatbázis, amin a riportok is futnak",
        "Csak adattó, séma és hozzáférés-szabályozás nélkül, mert az a legolcsóbb",
        "Megosztott Excel-fájlok a felhőben"
      ],
      answer: 0,
      hint: "Menj végig az igényeken egyenként: adattípus, növekedés, valós idő, riport, érzékeny adat, költség.",
      explain: "A vegyes adat és a növekedés lakehouse-t (vagy tó + tárház párost) indokol, a felhő a rugalmas, használatalapú költséget adja, a Power BI a rendezett rétegre épül, az érzékeny adathoz EU-régió, álnevesítés és hozzáférés-szabályozás kell. Egy relációs adatbázis nem bírja a vegyes, növekvő adatot, az irányítás nélküli tó adatmocsár és adatvédelmi kockázat, az Excel pedig semmelyik igényt nem elégíti ki."
    }
  ]
};
