/* Vizsgagyakorló kérdésbank – 12. lecke: Adattárolási szintek, adattárház, ETL/ELT
   A számpéldák (ETL-példa, HDFS-blokkok, szószámlálás, edge-adatmennyiség) Pythonnal ellenőrizve. */

BANK.push(
  // ---------- 1. lépés: tárolási szintek ----------
  {
    id: "b12-001",
    topic: "12",
    level: 1,
    ref: "12-adattarolas-adattarhaz.html#lepes1",
    type: "single",
    q: "Melyik sorrend felel meg az előadás adattárolási szintjeinek (az egyszerűtől a bonyolultig)?",
    options: [
      "lokális állomány → file-szerver → relációs DB → adattárház → felhő → adattó/lakehouse → elosztott fájlrendszer → elosztott DB → NoSQL/hibrid",
      "relációs DB → lokális állomány → adattárház → file-szerver → NoSQL → felhő → adattó",
      "adattárház → relációs DB → file-szerver → lokális állomány → felhő → NoSQL",
      "NoSQL → elosztott DB → adattó → felhő → adattárház → relációs DB → lokális állomány"
    ],
    answer: 0,
    hint: "Minden szint az előző egy korlátját oldja fel: megosztás, egyidejű írás, elemzés, kapacitás, formátum, gépméret, valós idő.",
    explain: "Az előadás felsorolása: lokális állományok, file-szerverek, relációs adatbázisok, adattárház, felhő, adattavak és lakehouse, elosztott fájlrendszerek, elosztott adatbázisok/adattárházak, NoSQL és hibrid adatbázisok. Az utolsó opció ennek a fordítottja."
  },
  {
    id: "b12-002",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes1",
    type: "single",
    q: "Egy mobiljáték 30 országban fut, a játékosok állását ezredmásodpercek alatt kell írni-olvasni, esténként tízszeres a forgalom. Melyik megoldás és milyen skálázás illik?",
    options: [
      "Elosztott NoSQL-adatbázis vízszintes skálázással",
      "Egyetlen nagy relációs szerver függőleges skálázással",
      "Adattárház éjszakai betöltéssel",
      "HDFS-fájlok MapReduce-feldolgozással"
    ],
    answer: 0,
    hint: "Valós idejű, kulcs szerinti elérés kell, változó terheléssel, több kontinensen.",
    explain: "Az elosztott NoSQL csúcsidőben új csomópontokkal bővíthető (vízszintes skálázás), és alacsony késleltetésű kulcs szerinti elérést ad. Egy nagy gép drága és egyetlen hibapont, az adattárház és a HDFS kötegelt elemzésre való, nem ezredmásodperces írásra."
  },

  // ---------- 2. lépés: OLTP és OLAP ----------
  {
    id: "b12-003",
    topic: "12",
    level: 1,
    ref: "12-adattarolas-adattarhaz.html#lepes2",
    type: "multi",
    q: "Mely jellemzők illenek az OLTP-rendszerekre?",
    options: [
      "sok, rövid, egy-két sort érintő írás",
      "normalizált séma, minden adat egyszer szerepel",
      "jellemzően az aktuális állapotot tárolja",
      "nagy, sok millió sort összesítő lekérdezések",
      "időszakos (pl. éjszakai) betöltéssel frissül"
    ],
    answer: [0, 1, 2],
    hint: "Az OLTP a napi működést szolgálja ki: rendelés, foglalás, számla.",
    explain: "Az OLTP rövid tranzakciókra, normalizált sémára és aktuális állapotra épül. A nagy összesítő lekérdezés és az időszakos betöltés az OLAP / adattárház jellemzője."
  },
  {
    id: "b12-004",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes2",
    type: "single",
    q: "A lecke webshop-példájában (ezer Ft) mennyi volt a 2025. márciusi teljes bevétel? (Tételek: 101: 1×300, 2×5; 102: 2×10, 1×5; 103: 1×290; 104 áprilisi: 4×5.)",
    options: ["625", "645", "615", "310"],
    answer: 0,
    hint: "Csak a márciusi rendelések (101, 102, 103) tételei számítanak, db × egységár.",
    explain: R`$300 + 10 + 20 + 5 + 290 = 625$. A 645 az áprilisi 20-at is tartalmazza, a 615 az, ha a 102-es egeret 1 db-nak vennénk, a 310 pedig csak Anna márciusi rendelése ($300 + 10$).`
  },
  {
    id: "b12-005",
    topic: "12",
    level: 3,
    ref: "12-adattarolas-adattarhaz.html#lepes2",
    type: "single",
    q: "Miért szándékosan redundáns (denormalizált) az elemző tábla, ha a tervezésben a redundanciát általában hibának tartjuk?",
    options: [
      "Mert az elemző rendszerben sokat olvasunk és ritkán írunk, így az előre összekapcsolt tábla megspórolja a JOIN-okat, a frissítési anomália pedig ritka betöltésnél kezelhető.",
      "Mert a denormalizált tábla kevesebb tárhelyet foglal.",
      "Mert az elemző rendszerben nincs szükség kulcsokra.",
      "Mert a normalizált táblákat az SQL nem tudja összesíteni."
    ],
    answer: 0,
    hint: "Melyik művelet gyakori az OLAP-ban, és melyiket teszi drágává a normalizálás?",
    explain: "A normalizálás az írást védi (minden adat egyszer), de sok JOIN-t kíván olvasáskor. Az elemző rendszerben az olvasás dominál, ezért megéri a redundancia. Több helyet foglal, nem kevesebbet; kulcsok továbbra is kellenek; az SQL a normalizált táblákat is tudja összesíteni, csak lassabban."
  },

  // ---------- 3. lépés: adattárház, Inmon, sémák ----------
  {
    id: "b12-006",
    topic: "12",
    level: 1,
    ref: "12-adattarolas-adattarhaz.html#lepes3",
    type: "single",
    q: "Mit jelent, hogy az adattárház „nem illékony” (non-volatile)?",
    options: [
      "A betöltött adatot nem írják felül és nem törlik; a tárház betöltéssel bővül, a felhasználók csak olvassák.",
      "Az adattárház soha, semmilyen módon nem változik.",
      "Az adat áramszünet esetén sem vész el, mert lemezen van.",
      "Az adattárház valós időben követi a forrásrendszer minden módosítását."
    ],
    answer: 0,
    hint: "A tranzakciós rendszer folyamatosan felülíródik. Mi ennek az ellentéte?",
    explain: "Nem illékony: nincs helybeni felülírás és törlés, az új adat új betöltéssel érkezik. Ez nem jelenti, hogy soha nem változik (bővül, és egy hibás betöltés javítható), és nem a fizikai adatmegőrzésről szól. A valós idejű követés pont az OLTP vagy az ODS jellemzője."
  },
  {
    id: "b12-007",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes3",
    type: "single",
    q: "Egy „adattárház” táblái <code>szamlazo_modul</code>, <code>webshop_modul</code>, <code>raktar_modul</code>, és minden éjjel felülírja őket a források aktuális állapota. Melyik állítás pontos?",
    options: [
      "Nem téma-orientált (alkalmazások szerint szerveződik), és nem is nem illékony (felülíródik), így nem felel meg Inmon definíciójának.",
      "Megfelel a definíciónak, mert több forrásból töltődik.",
      "Csak az integrált tulajdonság hiányzik, a többi teljesül.",
      "Megfelel, mert éjszakánként frissül, tehát időben változó."
    ],
    answer: 0,
    hint: "Nézd végig mind a négy tulajdonságot: téma, integráció, idő, felülírás.",
    explain: "Az alkalmazások szerinti táblák nem téma-orientáltak, az éjszakai felülírás miatt a tárház illékony, és a múlt sem marad meg, tehát időben változónak sem mondható. Az „időben változó” nem azt jelenti, hogy gyakran frissül, hanem hogy az idő az adat része."
  },
  {
    id: "b12-008",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes3",
    type: "match",
    q: "Párosítsd a helyzetet a megfelelő megközelítéssel!",
    pairs: [
      ["havi pénzügyi zárás riportja ellenőrzött adatból", "schema-on-write"],
      ["kutatók még nem tudják, mit keresnek a szenzornaplókban", "schema-on-read"],
      ["új JSON-mező jelenik meg, és meg akarjuk őrizni átalakítás nélkül", "schema-on-read"],
      ["a betöltő csak a rögzített oszlopokba illő, tisztított sorokat engedi be", "schema-on-write"]
    ],
    hint: "Íráskor vagy olvasáskor dől el, milyen szerkezetű az adat?",
    explain: "Schema-on-write (adattárház): a séma a betöltés előtt rögzített, csak tisztított, illeszkedő adat kerül be – ellenőrzött riporthoz ideális. Schema-on-read (adattó): az adat nyersen marad, a sémát a felhasználáskor adjuk meg – feltáró munkához és változó formátumhoz jó."
  },

  // ---------- 4. lépés: komponensek, VIR ----------
  {
    id: "b12-009",
    topic: "12",
    level: 1,
    ref: "12-adattarolas-adattarhaz.html#lepes4",
    type: "multi",
    q: "Melyek az adattárház komponensei az előadás szerint?",
    options: [
      "adatforrás és ETL",
      "tároló, metaadat és ütemező modul",
      "adathozzáférési interfész és megjelenítési réteg",
      "tranzakciókezelő és zárolási modul",
      "replikációs NameNode"
    ],
    answer: [0, 1, 2],
    hint: "Kövesd végig az architektúra-ábrát balról jobbra.",
    explain: "Az előadás komponensei: adatforrás, ETL, tároló modul, metaadat modul, ütemező modul, adathozzáférési interfész (logikai, jellemzően MD modell) és megjelenítési réteg. A tranzakció- és zárkezelés az OLTP-motor része, a NameNode a HDFS-é."
  },
  {
    id: "b12-010",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes4",
    type: "single",
    q: "Két riportban eltér a márciusi bevétel (625 és 612 ezer Ft). Melyik DW-modul segít leginkább kideríteni az okot?",
    options: ["metaadat modul", "ütemező modul", "megjelenítési réteg", "átmeneti terület"],
    answer: 0,
    hint: "Hol van leírva, mit jelent a „bevétel”, és mikori betöltésből készült a szám?",
    explain: "A metaadat modul üzleti metaadata (definíció: bruttó/nettó, visszáru) és technikai metaadata (forrás, betöltés ideje, sorszám) mutatja meg, hogy a két riport ugyanazt számolja-e. Az ütemező a futásokat vezérli, a megjelenítési réteg csak mutat, az átmeneti terület pedig a betöltés előtti munkaterület."
  },
  {
    id: "b12-011",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes4",
    type: "single",
    q: "Miben különbözik az ODS az EDW-től?",
    options: [
      "Az ODS integrált, de az aktuális állapotot tárolja és gyakran frissül (felülír); az EDW vállalati szintű, historikus és bővül.",
      "Az ODS részlegszintű, az EDW vállalati szintű, egyébként azonosak.",
      "Az ODS nem integrált, csak az ERP másolata; az EDW integrált.",
      "Az ODS a felhőben, az EDW mindig helyben fut."
    ],
    answer: 0,
    hint: "Melyik válaszol arra, hogy „mi van most”, és melyik arra, hogy „hogyan változott 5 év alatt”?",
    explain: "Az ODS operatív célú: integráltan, de csak az aktuális állapotot tartja, gyakori frissítéssel. Az EDW historikus, vállalati adattár. A részlegszintű adattár az adatpiac, nem az ODS; a tárolás helye (felhő vagy helyben) nem megkülönböztető jegy."
  },
  {
    id: "b12-012",
    topic: "12",
    level: 3,
    ref: "12-adattarolas-adattarhaz.html#lepes4",
    type: "single",
    q: "Egy elemző az átmeneti területen (staging) lévő táblákra épít dashboardot, „mert ott frissebb az adat”. Mi ezzel a fő gond?",
    options: [
      "A staging adat félkész és ellenőrizetlen (pl. duplikátumok, egységesítetlen kódok), és a betöltés közben változik, így a számok hamisak és ingadozók lehetnek.",
      "Semmi, a staging terület pontosan erre való.",
      "A staging területen nincs adat, csak metaadat.",
      "A staging terület csak MDX-szel kérdezhető le."
    ],
    answer: 0,
    hint: "Mi a staging terület szerepe az ETL-ben?",
    explain: "Az átmeneti terület a bejövő adat ideiglenes tárolására és átalakítására szolgál; az adat ott még tisztítás előtti állapotban is lehet. Riportot a betöltött, ellenőrzött tárházra vagy adatpiacra kell építeni."
  },

  // ---------- 5. lépés: ETL ----------
  {
    id: "b12-013",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes5",
    type: "single",
    q: "A lecke ETL-példájában (webshop + bolt) mennyi lenne Budapest bevétele, ha a városneveket (<code>budapest</code>, <code>Budapest</code>, <code>Bp.</code>) NEM egységesítenénk, és a riport a <code>Budapest</code> csoportot mutatná?",
    options: ["4 500 Ft", "23 200 Ft", "12 500 Ft", "6 200 Ft"],
    answer: 0,
    hint: "Melyik sor(ok)ban szerepel pontosan „Budapest” írásmóddal (a duplikátum már kiszűrve)?",
    explain: R`Egységesítés nélkül három csoport lenne: <code>budapest</code> 12 500, <code>Budapest</code> 4 500 (a W3), <code>Bp.</code> 6 200 Ft. A „Budapest” csoport tehát csak 4 500 Ft-ot mutat a helyes $23\,200$ helyett.`
  },
  {
    id: "b12-014",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes5",
    type: "single",
    q: "Egy bolti vásárlásnál hiányzik a vevőazonosító (kártya nélküli vásárló). Mi a helyes ETL-kezelés?",
    options: [
      "A sor megmarad, és egy külön „ismeretlen vevő” kulcsot kap (pl. 0).",
      "A sort töröljük, mert hiányos.",
      "A vevőt a leggyakoribb vevővel pótoljuk.",
      "A sort a következő betöltésig félretesszük, a bevételbe nem számít."
    ],
    answer: 0,
    hint: "A bevétel valódi. Mi történik a városi összeggel, ha a sor kimarad?",
    explain: "A vásárlás valódi bevétel: ha kihagyjuk, a győri összeg 10 000 helyett 8 000 Ft lenne. Az „ismeretlen” kulcs megőrzi a helyes összegeket, és a vevőszintű elemzésben külön látszik a névtelen vásárlás. A leggyakoribb vevővel való pótlás meghamisítaná a vevői statisztikát."
  },
  {
    id: "b12-015",
    topic: "12",
    level: 3,
    ref: "12-adattarolas-adattarhaz.html#lepes5",
    type: "single",
    q: "Egy ETL a betöltés előtt napi, városonkénti összegre aggregál, és csak ezt tölti be. Később ügyfélszegmentálás kell. Mi a probléma?",
    options: [
      "Az ügyfélszintű részletek elvesztek, az összegből nem bonthatók vissza; a tárháznak a legrészletesebb szintet kellett volna tárolnia.",
      "Nincs probléma, a napi összegekből ügyfelenként is visszaszámolható.",
      "Csak a lekérdezés lesz lassabb.",
      "A probléma csak akkor lép fel, ha a városnevek nem egységesek."
    ],
    answer: 0,
    hint: "Visszafejthető-e egy összegből, hogy kik és mennyit vásároltak?",
    explain: "Az aggregálás információvesztéssel jár. Az adattárház ezért a legrészletesebb (tétel- vagy bizonylat-) szintet tárolja, az összesítők ebből, kiegészítő táblaként készülnek (ezt az ütemező előzetes számításként futtatja)."
  },

  // ---------- 6. lépés: betöltés, ELT ----------
  {
    id: "b12-016",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes6",
    type: "single",
    q: "A vízjel 2025-03-03 16:40. A forrásban: 2-es (módosítva 03-03 11:00), 5-ös (03-04 08:00), 7-es (új, 03-04 12:30). A <code>modositva &gt; vízjel</code> feltétel mellett mely sorok jönnek át, és mi az új vízjel?",
    options: [
      "Az 5-ös és a 7-es; új vízjel: 2025-03-04 12:30",
      "A 2-es, az 5-ös és a 7-es; új vízjel: 2025-03-04 12:30",
      "Csak a 7-es; új vízjel: 2025-03-04 12:30",
      "Az 5-ös és a 7-es; új vízjel: 2025-03-04 08:00"
    ],
    answer: 0,
    hint: "Hasonlítsd össze minden sor időbélyegét a vízjellel; az új vízjel a betöltött legnagyobb időbélyeg.",
    explain: "A 2-es 11:00-ja korábbi a 16:40-es vízjelnél (azt már tegnap betöltöttük). Az 5-ös (módosítás) és a 7-es (új) jön át, az új vízjel a legnagyobb betöltött időbélyeg, 2025-03-04 12:30. A „csak a 7-es” a módosításokat felejti el."
  },
  {
    id: "b12-017",
    topic: "12",
    level: 3,
    ref: "12-adattarolas-adattarhaz.html#lepes6",
    type: "single",
    q: "Egy bank szerint az adóazonosító csak titkosítva kerülhet a felhős tárolóba. A csapat ELT-t használ minden adatra. Mi a kockázat, és mi a megoldás?",
    options: [
      "Az ELT nyers staging táblájában titkosítatlanul ott lenne az adóazonosító; legalább erre a mezőre ETL-szerű, betöltés előtti titkosítás kell.",
      "Nincs kockázat, mert az ELT átalakítási lépése később úgyis titkosít.",
      "Az ELT nem tud titkosított adatot betölteni, ezért mindenre ETL kell.",
      "A kockázat csak a lekérdezési sebességet érinti."
    ],
    answer: 0,
    hint: "ELT-ben mikor kerül az adat a célrendszerbe: az átalakítás előtt vagy után?",
    explain: "ELT-ben a nyers adat az átalakítás előtt már a célrendszerben van, így az érzékeny mező egy ideig (és a nyers rétegben tartósan) titkosítatlan. Erre a mezőre a tárolás előtti átalakítás (ETL) kell; a többi adatra maradhat az ELT – ez a hibrid megközelítés."
  },
  {
    id: "b12-018",
    topic: "12",
    level: 1,
    ref: "12-adattarolas-adattarhaz.html#lepes6",
    type: "match",
    q: "Párosítsd az eszközt a megközelítéssel, amelyre jellemzően épül!",
    pairs: [
      ["dbt (data build tool)", "ELT"],
      ["Informatica PowerCenter", "ETL"],
      ["Fivetran", "ELT"],
      ["Talend Open Studio", "ETL"]
    ],
    hint: "Melyik végzi az átalakítást SQL-lel, a felhős tárházon belül?",
    explain: "A dbt SQL-alapú átalakítást végez a tárházban, a Fivetran a kinyerést és betöltést automatizálja – mindkettő ELT-eszköz. Az Informatica PowerCenter és a Talend klasszikus ETL-platform, a betöltés előtti átalakításra."
  },

  // ---------- 7. lépés: adattó, HDFS, MapReduce ----------
  {
    id: "b12-019",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes7",
    type: "single",
    q: "Egy 1 000 MB-os fájlt HDFS-be töltünk (128 MB-os blokk, replikáció 3). Hány blokk keletkezik, és mekkora az utolsó?",
    options: ["8 blokk, az utolsó 104 MB", "8 blokk, az utolsó 128 MB", "7 blokk, az utolsó 104 MB", "24 blokk, az utolsó 104 MB"],
    answer: 0,
    hint: "Felfelé kerekített osztás, aztán a maradék. A replikáció a blokkok számát nem, csak a példányokét növeli.",
    explain: R`$\lceil 1000/128\rceil = 8$ blokk; 7 teljes ($896$ MB), az utolsó $1000-896 = 104$ MB. A 24 a blokkpéldányok száma ($8\cdot 3$), nem a blokkoké. A 7 blokk a lefelé kerekítés hibája, a „128 MB-os utolsó blokk” pedig azt feltételezi, hogy a HDFS feltölti a blokkot – nem teszi.`
  },
  {
    id: "b12-020",
    topic: "12",
    level: 3,
    ref: "12-adattarolas-adattarhaz.html#lepes7",
    type: "single",
    q: "Szószámlálás combinerrel: a csomópontok adata <code>adat tó adat ház</code> | <code>ház adat felhő</code> | <code>tó felhő felhő adat</code>. Hány kulcs–érték pár utazik a hálózaton combiner nélkül, és hány combinerrel?",
    options: ["11, illetve 9", "11, illetve 4", "9, illetve 4", "4, illetve 11"],
    answer: 0,
    hint: "Combiner nélkül minden szó egy pár. Combinerrel minden csomópont a saját különböző szavaiból egy-egy párt küld.",
    explain: "Combiner nélkül 4 + 3 + 4 = 11 pár. Combinerrel csomópontonként a különböző szavak száma: 3 + 3 + 3 = 9 pár. A 4 a végeredmény kulcsainak száma (adat, tó, ház, felhő), ez a reduce kimenete, nem a hálózati forgalom."
  },

  // ---------- 8. lépés: felhő, NoSQL ----------
  {
    id: "b12-021",
    topic: "12",
    level: 1,
    ref: "12-adattarolas-adattarhaz.html#lepes8",
    type: "multi",
    q: "Mely előnyöket sorolja fel az előadás a felhőalapú adattárolásra?",
    options: [
      "méretezhetőség",
      "költséghatékonyság",
      "biztonság és megfelelőség",
      "globális hozzáférés és katasztrófa-helyreállítás",
      "nulla késleltetés minden lekérdezésnél",
      "a szolgáltatófüggés megszűnése"
    ],
    answer: [0, 1, 2, 3],
    hint: "Öt előny van; a késleltetés és a szolgáltatófüggés inkább a kihívások között szerepel.",
    explain: "Az előadás öt előnye: méretezhetőség, költséghatékonyság, biztonság és megfelelőség, globális hozzáférés, katasztrófa-helyreállítás. A késleltetés és a vendor lock-in a felhő kihívásai, nem előnyei."
  },
  {
    id: "b12-022",
    topic: "12",
    level: 3,
    ref: "12-adattarolas-adattarhaz.html#lepes8",
    type: "single",
    q: "Egy kolléga szerint „a Cassandra oszlopalapú, tehát ugyanolyan jó ad hoc összesítő riportokra, mint egy oszlopalapú adattárház”. Mi a hiba a gondolatmenetben?",
    options: [
      "A Cassandra oszlopcsaládos (wide-column) adatbázis: sor kulcs szerint tárol, írásra és kulcs szerinti olvasásra jó; az elemző motorok oszlopalapú tárolása más célú.",
      "Nincs hiba, a kettő ugyanaz.",
      "A Cassandra valójában gráfadatbázis.",
      "A Cassandra csak egy gépen fut, ezért lassú."
    ],
    answer: 0,
    hint: "Ugyanaz a szó, két különböző tárolási elv.",
    explain: "Az oszlopcsaládos NoSQL (Cassandra, Bigtable) soronként sok, rendezett oszlopot tárol, nagy írási terhelésre és kulcs szerinti elérésre tervezték. Az oszlopalapú elemző tárolás (Redshift, Parquet) oszloponként tárol, hogy az összesítések kevés oszlopot olvassanak. A Cassandra elosztott, sok gépen fut."
  },

  // ---------- 9. lépés: edge, biztonság, GDPR ----------
  {
    id: "b12-023",
    topic: "12",
    level: 2,
    ref: "12-adattarolas-adattarhaz.html#lepes9",
    type: "single",
    q: "Egy szenzor másodpercenként 1 000 mérést ad, egyenként 8 bájtot. Ha percenként csak egyetlen 8 bájtos átlagot küld a központba, hányszor kevesebb adat utazik naponta?",
    options: ["60 000-szer", "20 000-szer", "1 000-szer", "86 400-szor"],
    answer: 0,
    hint: "Egy perc alatt hány mérés keletkezik, és ebből hány érték megy tovább?",
    explain: R`Percenként $60\cdot 1000 = 60\,000$ mérésből 1 érték megy tovább: $60\,000$-szer kevesebb (naponta $691\,200\,000$ helyett $11\,520$ bájt). A 20 000 a min–max–átlag (3 érték) küldésének aránya, az 1 000 a másodpercenkénti átlagé, a 86 400 a napi másodpercek száma.`
  },
  {
    id: "b12-024",
    topic: "12",
    level: 3,
    ref: "12-adattarolas-adattarhaz.html#lepes9",
    type: "single",
    q: "Anna kéri a személyes adatai törlését, az adattárház pedig „nem illékony”. Melyik a legjobb megoldás?",
    options: [
      "Ha a ténysorok csak álnevesített kulcsot tartalmaznak, a külön ügyféltáblában törölni vagy anonimizálni kell Anna sorát; a bevételi sorok megmaradnak, de nem köthetők hozzá.",
      "Semmit, mert az adattárház nem illékony, így a törlési jog nem vonatkozik rá.",
      "Az összes olyan ténysort törölni kell, amelyben Anna vásárlása szerepel, így a múltbeli bevétel is csökken.",
      "Elég Anna e-mail-címét SHA-256 hash-re cserélni, az már anonim."
    ],
    answer: 0,
    hint: "A jogszabály felülírja a tervezési elvet. Hogyan lehet a tényadatot megtartani, a személyt mégis eltüntetni?",
    explain: "A GDPR törlési joga az adattárházra is vonatkozik. Ha a személyes adat külön ügyféltáblában van, ott törölhető vagy anonimizálható, a tényadat (összegek) megmarad, de személyhez nem köthető. A ténysorok törlése meghamisítaná a múltbeli bevételt, a hash pedig csak álnevesítés, nem anonimizálás."
  },
  {
    id: "b12-025",
    topic: "12",
    level: 1,
    ref: "12-adattarolas-adattarhaz.html#lepes9",
    type: "match",
    q: "Párosítsd a biztonsági intézkedést azzal, ami ellen elsősorban véd!",
    pairs: [
      ["titkosítás tároláskor és átvitelkor", "ellopott adathordozó, lehallgatás"],
      ["hozzáférés-szabályozás, többfaktoros hitelesítés", "jogosulatlan belépés, túl széles jogosultság"],
      ["audit és monitorozás", "észrevétlen visszaélés, rendellenes letöltés"],
      ["mentés és helyreállítás", "adatvesztés, zsarolóvírus"]
    ],
    hint: "Mi történik, ha az adatot ellopják, ha rossz ember lép be, ha senki nem figyel, és ha az adat megsemmisül?",
    explain: "A titkosítás kulcs nélkül olvashatatlanná teszi az adatot, a hozzáférés-szabályozás csak a jogosultakat engedi be, az audit és monitorozás felderíti a visszaéléseket, a mentés és helyreállítás pedig adatvesztés után visszaállítja az adatot."
  }
);
