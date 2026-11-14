/* Vizsgagyakorló kérdésbank – 7. lecke: SQL ablakfüggvények
   Minden eredmény a lecke példatábláin (rendelesek, zh, havi) SQLite-tal lefuttatva ellenőrizve. */

BANK.push(
  // ---------- 1. lépés: OVER() ----------
  {
    id: "b07-001",
    topic: "07",
    level: 1,
    ref: "07-sql-ablakfuggvenyek.html#lepes1",
    type: "single",
    q: "Melyik a szintaktikailag helyes ablakfüggvény-hívás?",
    options: [
      "<code>SUM(osszeg OVER (PARTITION BY ugyfel))</code>",
      "<code>SUM(osszeg) PARTITION BY ugyfel</code>",
      "<code>SUM(osszeg) OVER (PARTITION BY ugyfel)</code>",
      "<code>OVER (PARTITION BY ugyfel) SUM(osszeg)</code>"
    ],
    answer: 2,
    hint: "Az OVER a függvényhívás része, de hol: a függvény zárójelén belül vagy utána?",
    explain: R`Az <code>OVER (…)</code> a lezárt függvényhívás <em>után</em> jön: <code>függvény(argumentumok) OVER (…)</code>. Az első alak az órai jegyzetben szerepelt (<code>aggrfv(Over (partition by))</code>), és hibás: az OVER nem kerülhet az argumentumok közé. A <code>PARTITION BY</code> önmagában, OVER nélkül nem létező záradék, és az OVER sem állhat a függvény előtt.`
  },
  {
    id: "b07-002",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes1",
    type: "single",
    q: "Mit ad a <code>ROUND(100.0 * osszeg / MAX(osszeg) OVER (), 1)</code> Béla 30-as rendelésénél (id 7)? (A legnagyobb rendelés 60, Béla összesen 110, a tábla összesen 300.)",
    options: ["10,0", "27,3", "0", "50,0"],
    answer: 3,
    hint: "Mi a nevező: a táblaösszeg, az ügyfélösszeg vagy a legnagyobb érték? És a 100.0 miatt van-e egészosztás?",
    explain: R`Az üres <code>OVER ()</code> ablaka az egész tábla, a <code>MAX</code> ezen 60, így $100\cdot 30/60 = 50{,}0$. A 10,0 a <code>SUM(osszeg) OVER ()</code>-val osztva jönne ki ($30/300$), a 27,3 Béla saját összegével ($30/110$, ez <code>PARTITION BY ugyfel</code> lenne). A 0 az egészosztás eredménye, ha <code>osszeg / MAX(osszeg) OVER () * 100</code>-at írnánk: $30/60 = 0$, majd $0\cdot 100 = 0$.`
  },
  {
    id: "b07-003",
    topic: "07",
    level: 1,
    ref: "07-sql-ablakfuggvenyek.html#lepes1",
    type: "multi",
    q: "Mely állítások igazak az ablakfüggvényekre?",
    options: [
      "A kimenő sorok száma megegyezik a WHERE (és GROUP BY) után megmaradt sorok számával.",
      "Az üres <code>OVER ()</code> ablaka a WHERE után megmaradt összes sor.",
      "Ablakfüggvény beágyazható <code>CASE WHEN … THEN … END</code> kifejezésbe is.",
      "Az <code>OVER ()</code> csak <code>COUNT</code>-tal és <code>SUM</code>-mal használható.",
      "Ablakfüggvény nem szerepelhet olyan lekérdezésben, amelyben GROUP BY is van."
    ],
    answer: [0, 1, 2],
    hint: "Gondolj az „átlag feletti-e” jelzőre és a SUM(SUM(osszeg)) OVER () példára.",
    explain: R`Az ablakfüggvény nem von össze sorokat, és azokon a sorokon számol, amelyek a WHERE/GROUP BY után megmaradtak (pl. <code>WHERE osszeg &lt; 40</code> mellett a <code>COUNT(*) OVER ()</code> 4, nem 8). CASE-be ágyazva is működik (átlag feletti jelző). Hamis, hogy csak COUNT és SUM mehet: AVG, MIN, MAX is ablakfüggvény lesz OVER-rel. GROUP BY mellett is használható – ilyenkor a csoportsorokon számol (<code>SUM(SUM(osszeg)) OVER ()</code> = 300).`
  },

  // ---------- 2. lépés: PARTITION BY ----------
  {
    id: "b07-004",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes2",
    type: "single",
    q: "A <code>zh</code> táblán (A: 92, 85, 85, 70; B: 78, 70, 70, 61) mit ad a <code>COUNT(*) OVER (PARTITION BY csoport, pont)</code> Dóránál (A csoport, 70 pont)?",
    options: ["3", "1", "4", "2"],
    answer: 1,
    hint: "Két oszlop szerinti partíció: egy partícióba csak az kerül, akinek a csoportja ÉS a pontja is egyezik.",
    explain: R`A partíciót a <code>(csoport, pont)</code> pár határozza meg. Az A csoportban egyedül Dóra 70 pontos, így 1. A 3 akkor jönne ki, ha csak <code>pont</code> szerint partícionálnánk (Dóra, Feri, Gabi), a 4 a csoport létszáma (<code>PARTITION BY csoport</code>), a 2 a B csoport 70-eseinek (Feri, Gabi) értéke.`
  },
  {
    id: "b07-005",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes2",
    type: "single",
    q: "Emese (B csoport, 78 pont). Mit ad rá a <code>ROUND(100.0 * pont / SUM(pont) OVER (PARTITION BY csoport), 1)</code>? (Az A csoport összesen 332, a B 279, a teljes tábla 611 pont.)",
    options: ["12,8", "28,0", "23,5", "25,0"],
    answer: 1,
    hint: "A nevező Emese saját partíciójának (B) összege.",
    explain: R`$78/279 \approx 28{,}0\%$. A 12,8 a teljes táblához mért arány ($78/611$, ez <code>OVER ()</code> lenne), a 23,5 a rossz csoport összegével számolt ($78/332$), a 25,0 pedig a „négy hallgató, egynegyed” gondolat – a részarány a pontokból számol, nem a létszámból.`
  },
  {
    id: "b07-006",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes3",
    type: "match",
    q: "Béla 20-as rendelése (id 6, 01-06). Párosítsd a kifejezést az értékével ezen a soron! (Időrend az egész táblán: id 5, 1, 8, 2, 3, 6, 7, 4; Béla: 60, 20, 30.)",
    pairs: [
      ["<code>SUM(osszeg) OVER ()</code>", "300"],
      ["<code>SUM(osszeg) OVER (PARTITION BY ugyfel)</code>", "110"],
      ["<code>SUM(osszeg) OVER (PARTITION BY ugyfel ORDER BY datum, id)</code>", "80"],
      ["<code>SUM(osszeg) OVER (ORDER BY datum, id)</code>", "230"],
      ["<code>SUM(osszeg) OVER (PARTITION BY ugyfel ORDER BY datum, id ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)</code>", "50"]
    ],
    hint: "PARTITION BY: kinek a sorai; ORDER BY: az elejétől idáig; a keret iránya: előre vagy hátra.",
    explain: R`Üres ablak: a teljes tábla, 300. Béla partíciója: $60+20+30 = 110$. Béla halmozott összege a 2. rendelésnél: $60+20 = 80$. Partíció nélkül az egész tábla időrendjében a 6. sorig: $60+40+50+25+35+20 = 230$. A „hátralévő” keret Béla partícióján: $20+30 = 50$.`
  },

  // ---------- 3. lépés: ORDER BY az ablakban ----------
  {
    id: "b07-007",
    topic: "07",
    level: 1,
    ref: "07-sql-ablakfuggvenyek.html#lepes3",
    type: "single",
    q: "Mit határoz meg az <code>OVER (ORDER BY datum)</code>-ban álló <code>ORDER BY</code>?",
    options: [
      "A kimenet kiírási sorrendjét; a lekérdezés végi ORDER BY ezzel elhagyható.",
      "A partíciókon belüli számolás sorrendjét, és ezzel azt, hogy az összesítő függvény az elejétől az aktuális sorig (és holtversenyeseiig) számol.",
      "Csak a partíciók egymás közötti sorrendjét; a függvény értéke nem változik tőle.",
      "Azt, hogy a függvény a datum szerinti csoportonként egy sort adjon vissza."
    ],
    answer: 1,
    hint: "Hasonlítsd össze a SUM(osszeg) OVER (PARTITION BY ugyfel) és a … ORDER BY datum, id változat értékeit Bélánál.",
    explain: R`Az OVER-beli ORDER BY a számolás sorrendjét adja, és mellékhatásként a keretet is megváltoztatja: rendezés nélkül a teljes partíció, rendezéssel „az elejétől idáig” (halmozott összeg: Bélánál 110, 110, 110 helyett 60, 80, 110). A kiírási sorrendet ez <em>nem</em> garantálja – arra a lekérdezés végi ORDER BY való. Sorokat sem von össze.`
  },
  {
    id: "b07-008",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes3",
    type: "single",
    q: "<code>havi</code>: 120, 150, 135, 180, 165, 210 (jan–jún). Mennyi áprilisban az <code>AVG(bevetel) OVER (ORDER BY honap)</code>?",
    options: ["155", "160", "146,25", "180"],
    answer: 2,
    hint: "Rendezett ablak, keret nincs megadva: honnan meddig tart az átlagolt tartomány?",
    explain: R`ORDER BY mellett az AVG halmozott átlag: januártól áprilisig $(120+150+135+180)/4 = 585/4 = 146{,}25$. A 155 a 3 havi mozgóátlag (<code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code>), a 160 a féléves átlag (<code>OVER ()</code>, $960/6$), a 180 az áprilisi érték maga.`
  },

  // ---------- 4. lépés: ablakkeret ----------
  {
    id: "b07-009",
    topic: "07",
    level: 1,
    ref: "07-sql-ablakfuggvenyek.html#lepes4",
    type: "single",
    q: "Mi a lényegi különbség a <code>ROWS</code> és a <code>RANGE</code> keretmód között?",
    options: [
      "A ROWS fizikai sorokat számol, a RANGE a rendezési oszlop értéke alapján határol, és az azonos értékű sorokat együtt kezeli.",
      "A ROWS csak számokon, a RANGE csak dátumokon működik.",
      "A RANGE mindig a teljes partíciót jelenti, a ROWS csak az aktuális sort.",
      "Nincs különbség, csak a RANGE a szabványos, a ROWS SQLite-specifikus."
    ],
    answer: 0,
    hint: "Gondolj Anna két 01-05-ös rendelésére: az egyik keretmód együtt veszi őket, a másik sorról sorra lép.",
    explain: R`ROWS = fizikai sorszámláló („2 sorral előbbtől idáig”), RANGE = logikai értékhatár („legfeljebb 2-vel kisebb rendezési érték”), a holtversenyeseket együtt kezeli. Mindkettő szabványos, és mindkettő bármilyen rendezésen használható (a RANGE számmal megadott határához numerikus rendezési kulcs kell, pl. <code>julianday(datum)</code>).`
  },
  {
    id: "b07-010",
    topic: "07",
    level: 3,
    ref: "07-sql-ablakfuggvenyek.html#lepes4",
    type: "single",
    q: "Anna rendelései: 01-03: 40 (id 1); 01-05: 25 (id 2); 01-05: 35 (id 3); 01-09: 40 (id 4). Mennyi a 2-es rendelésnél az <code>AVG(osszeg) OVER (PARTITION BY ugyfel ORDER BY datum)</code>?",
    options: ["32,5", "33,33", "35", "25"],
    answer: 1,
    hint: "Tie-breaker nincs, keret sincs megadva. Mi az alapértelmezett keret, és mely sorok kerülnek bele a 01-05-ös dátumnál?",
    explain: R`Az alapértelmezett keret <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>, ez a vele azonos dátumú 3-as sort is beveszi: $(40+25+35)/3 \approx 33{,}33$. A 32,5 a ROWS-keret vagy az <code>ORDER BY datum, id</code> eredménye lenne ($(40+25)/2$), a 35 Anna teljes átlaga (rendezés nélküli ablak), a 25 a sor saját értéke.`
  },
  {
    id: "b07-011",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes4",
    type: "single",
    q: "Időrend: 01-02: 60; 01-03: 40; 01-04: 50; 01-05: 25 és 35; 01-06: 20 (id 6); 01-08: 30; 01-09: 40. Mennyi a 6-os sorban a <code>SUM(osszeg) OVER (ORDER BY julianday(datum) RANGE BETWEEN 1 PRECEDING AND CURRENT ROW)</code>?",
    options: ["55", "130", "80", "20"],
    answer: 2,
    hint: "A RANGE 1 PRECEDING napszám szerint: az aktuális nap és az előző nap összes sora.",
    explain: R`01-05 és 01-06 rendelései: $25+35+20 = 80$. Az 55 a <code>ROWS BETWEEN 1 PRECEDING AND CURRENT ROW</code> (datum, id szerint) eredménye – az csak az egy előző <em>sort</em> (35) veszi. A 130 a 2 napos visszatekintés (<code>RANGE 2 PRECEDING</code>: 50 + 25 + 35 + 20), a 20 a sor saját értéke.`
  },
  {
    id: "b07-012",
    topic: "07",
    level: 3,
    ref: "07-sql-ablakfuggvenyek.html#lepes4",
    type: "multi",
    q: "Melyik ablak ad <em>minden sorban</em> ugyanazt, mint a <code>SUM(osszeg) OVER (PARTITION BY ugyfel)</code> a <code>rendelesek</code> táblán?",
    options: [
      "<code>OVER (PARTITION BY ugyfel ORDER BY datum ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)</code>",
      "<code>OVER (PARTITION BY ugyfel ORDER BY datum)</code>",
      "<code>OVER (PARTITION BY ugyfel ORDER BY ugyfel)</code>",
      "<code>OVER (PARTITION BY ugyfel ORDER BY datum, id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)</code>",
      "<code>OVER (PARTITION BY ugyfel ORDER BY datum RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)</code>"
    ],
    answer: [0, 2, 4],
    hint: "Az alapértelmezett RANGE keret az aktuális sor holtversenyeseit is beveszi. Mi a holtverseny, ha a partíción belül mindenkinek ugyanaz a rendezési értéke?",
    explain: R`A kifejezetten a partíció végéig nyújtott keret (ROWS vagy RANGE … UNBOUNDED FOLLOWING) a teljes partíció. A csapda a <code>ORDER BY ugyfel</code>: a partíción belül minden sor rendezési értéke azonos, így az alapértelmezett RANGE keret mindegyiket beveszi – az eredmény Annánál 140, 140, 140, 140. A <code>ORDER BY datum</code> (keret nélkül) és a ROWS … CURRENT ROW halmozott összeget ad (Anna: 40, 100, 100, 140, ill. 40, 65, 100, 140).`
  },

  // ---------- 5. lépés: rangsorolók ----------
  {
    id: "b07-013",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes5",
    type: "single",
    q: "Mit ad Emesénél (B csoport: Emese 78, Feri 70, Gabi 70, Hanna 61) a <code>ROW_NUMBER() OVER (PARTITION BY csoport ORDER BY pont)</code>?",
    options: ["1", "3", "4", "2"],
    answer: 2,
    hint: "Nézd meg a rendezés irányát: van-e DESC?",
    explain: R`DESC nélkül növekvő a rendezés: 61, 70, 70, 78, így a legtöbb pontot elérő Emese a 4. A 1 a csökkenő (<code>pont DESC</code>) rangsor eredménye lenne – ez a tipikus hiba. A 3 és a 2 a két 70-es hallgató sorszáma (köztük a sorrend nem meghatározott).`
  },
  {
    id: "b07-014",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes5",
    type: "single",
    q: "A <code>zh</code> tábla 8 sorára <code>NTILE(5) OVER (ORDER BY pont DESC)</code>. Hány sor kerül az 1., 2., …, 5. vödörbe?",
    options: ["1, 1, 2, 2, 2", "2, 2, 2, 1, 1", "2, 2, 1, 1, 2", "1, 1, 1, 1, 4"],
    answer: 1,
    hint: "8 = 5·1 + 3. Hova kerül a maradék?",
    explain: R`Alapból vödrönként $\lfloor 8/5\rfloor = 1$ sor jut, a 3 maradék sor az <em>első</em> három vödörbe kerül: 2, 2, 2, 1, 1. A fordított sorrend (1, 1, 2, 2, 2) a „maradék a végére” tévedés; az utolsó vödör sem „nyeli el” a maradékot (1, 1, 1, 1, 4).`
  },
  {
    id: "b07-015",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes5",
    type: "single",
    q: "Összegek csökkenő sorrendben: 60, 50, 40, 40, 35, 30, 25, 20. Mennyi a 35-ös rendelés <code>RANK()</code>, illetve <code>DENSE_RANK()</code> értéke (<code>ORDER BY osszeg DESC</code>)?",
    options: ["RANK 4, DENSE_RANK 4", "RANK 5, DENSE_RANK 5", "RANK 4, DENSE_RANK 3", "RANK 5, DENSE_RANK 4"],
    answer: 3,
    hint: "RANK = 1 + a szigorúan nagyobb sorok száma; DENSE_RANK = 1 + a nagyobb különböző értékek száma.",
    explain: R`Nagyobb sorok: 60, 50, 40, 40 – négy, így RANK $= 5$. Nagyobb különböző értékek: 60, 50, 40 – három, így DENSE_RANK $= 4$. A „4, 4” a holtverseny utáni hézag elfelejtése a RANK-nál, az „5, 5” a DENSE_RANK hézagolása, a „4, 3” mindkettőből eggyel kevesebb.`
  },
  {
    id: "b07-016",
    topic: "07",
    level: 3,
    ref: "07-sql-ablakfuggvenyek.html#lepes5",
    type: "multi",
    q: "Mely állítások igazak a rangsoroló függvényekre?",
    options: [
      "Ugyanazon a rendezésen a RANK és a DENSE_RANK ugyanannyi különböző értéket ad.",
      "A DENSE_RANK legnagyobb értéke a partícióban a különböző rendezési értékek száma.",
      "A holtversenyben lévő sorok között a ROW_NUMBER sorrendje egyedi tie-breaker nélkül nem meghatározott.",
      "A RANK legnagyobb értéke mindig a partíció sorainak száma.",
      "A ROWS BETWEEN … keret megadásával a RANK eredménye megváltoztatható."
    ],
    answer: [0, 1, 2],
    hint: "Próbáld ki a 50, 40, 40 sorozaton: mennyi a RANK legnagyobb értéke?",
    explain: R`A RANK és a DENSE_RANK ugyanazokat a csoportokat képzi, csak más számokkal (zh: 1, 2, 4, 5, 8 vs. 1–5), így ugyanannyi különböző érték van, és a DENSE_RANK maximuma a különböző értékek száma. A ROW_NUMBER holtversenyben önkényes, ezért kell második rendezési kulcs. Hamis, hogy a RANK maximuma mindig a sorok száma: 50, 40, 40 esetén 1, 2, 2 – a legnagyobb 2, nem 3 (a zh táblán csak azért 8, mert az utolsó hely nem holtverseny). A rangsorolók a keretet figyelmen kívül hagyják.`
  },

  // ---------- 6. lépés: LAG, LEAD, FIRST/LAST_VALUE ----------
  {
    id: "b07-017",
    topic: "07",
    level: 1,
    ref: "07-sql-ablakfuggvenyek.html#lepes6",
    type: "single",
    q: "Mit ad a <code>LAG(osszeg) OVER (PARTITION BY ugyfel ORDER BY datum, id)</code> egy ügyfél <em>első</em> rendelésénél?",
    options: [
      "0-t",
      "NULL-t",
      "Az előző ügyfél utolsó rendelésének összegét",
      "Az aktuális sor saját összegét"
    ],
    answer: 1,
    hint: "Van-e előző sor a partíción belül, és adtunk-e meg alapértéket (harmadik argumentum)?",
    explain: R`A partíció első sorának nincs előzője; alapérték híján az eredmény NULL. 0-t csak <code>LAG(osszeg, 1, 0)</code> adna – és üzletileg a „0 volt” mást jelent, mint a „nincs adat”. A partíció határán a LAG nem „lát át” a másik ügyfélre.`
  },
  {
    id: "b07-018",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes6",
    type: "single",
    q: "Mit ad a <code>LEAD(osszeg, 2) OVER (PARTITION BY ugyfel ORDER BY datum, id)</code> Anna 2-es rendelésénél, illetve Béla 6-os rendelésénél? (Anna időrendben: 40, 25, 35, 40; Béla: 60, 20, 30.)",
    options: ["35 és 30", "20 és 40", "40 és NULL", "NULL és NULL"],
    answer: 2,
    hint: "Két sorral későbbi sor ugyanabban a partícióban. Van-e Béla 2. rendelése után még két rendelés?",
    explain: R`Anna 2. rendelése után két sorral a 4. jön: 40. Béla 2. rendelése után csak egy rendelés van, így NULL. A „35 és 30” a <code>LEAD(osszeg)</code> (1 sorral előre), a „20 és 40” a PARTITION BY nélküli, egész táblás időrend eredménye – ott a LEAD átnyúlna más ügyfelek rendeléseire.`
  },
  {
    id: "b07-019",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes6",
    type: "single",
    q: "<code>havi</code>: jan 120, feb 150, márc 135, ápr 180, máj 165, jún 210. Mennyi májusban a <code>bevetel - LAG(bevetel, 2) OVER (ORDER BY honap)</code>?",
    options: ["−15", "30", "45", "NULL"],
    answer: 1,
    hint: "A második argumentum az eltolás: hány hónappal korábbi értéket vonunk ki?",
    explain: R`Két hónappal május előtt március van: $165-135 = 30$. A $-15$ az előző hónaphoz (április) mért változás (<code>LAG(bevetel)</code>), a 45 az áprilisi egyhavi változás. NULL csak januárban és februárban lenne, ahol nincs két hónappal korábbi sor.`
  },
  {
    id: "b07-020",
    topic: "07",
    level: 3,
    ref: "07-sql-ablakfuggvenyek.html#lepes6",
    type: "multi",
    q: "Béla rendelései időrendben: 60, 20, 30. Melyik kifejezés adja Béla <em>minden</em> sora mellé a legkisebb rendelését (20)?",
    options: [
      "<code>MIN(osszeg) OVER (PARTITION BY ugyfel)</code>",
      "<code>FIRST_VALUE(osszeg) OVER (PARTITION BY ugyfel ORDER BY osszeg)</code>",
      "<code>LAST_VALUE(osszeg) OVER (PARTITION BY ugyfel ORDER BY osszeg DESC)</code>",
      "<code>LAST_VALUE(osszeg) OVER (PARTITION BY ugyfel ORDER BY osszeg DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)</code>",
      "<code>MIN(osszeg) OVER (PARTITION BY ugyfel ORDER BY datum, id)</code>"
    ],
    answer: [0, 1, 3],
    hint: "A FIRST_VALUE/LAST_VALUE és az összesítők a kereten számolnak. Hol ér véget az alapértelmezett keret?",
    explain: R`A rendezetlen MIN a teljes partíción 20. A növekvő FIRST_VALUE-nak az alapértelmezett keret is elég, mert az mindig tartalmazza a partíció első sorát. A LAST_VALUE csökkenő rendezéssel csak a partíció végéig nyújtott kerettel jó; keret nélkül minden sorban a saját összeget adja (60, 30, 20 – a LAST_VALUE-csapda). Az időrendben rendezett MIN „eddigi minimum”: az első sorban 60.`
  },
  {
    id: "b07-021",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes6",
    type: "match",
    q: "<code>havi</code> (120, 150, 135, 180, 165, 210, jan–jún). Párosítsd a kifejezést a <strong>márciusi</strong> sor értékével! (<code>w</code> = <code>ORDER BY honap</code>)",
    pairs: [
      ["<code>LAG(bevetel) OVER w</code>", "150"],
      ["<code>LEAD(bevetel) OVER w</code>", "180"],
      ["<code>LAG(bevetel, 2) OVER w</code>", "120"],
      ["<code>SUM(bevetel) OVER (ORDER BY honap ROWS BETWEEN CURRENT ROW AND 1 FOLLOWING)</code>", "315"],
      ["<code>RANK() OVER (ORDER BY bevetel DESC)</code>", "5"]
    ],
    hint: "LAG visszafelé, LEAD előre néz; a RANK a bevétel nagysága szerint rangsorol, nem a hónap szerint.",
    explain: R`Március előtt február (150), utána április (180), két hónappal előtte január (120). Az aktuális és a következő hónap: $135+180 = 315$. Bevétel szerint csökkenően: 210, 180, 165, 150, 135, 120 – a 135 az 5. helyen áll.`
  },

  // ---------- 7. lépés: kiértékelési sorrend ----------
  {
    id: "b07-022",
    topic: "07",
    level: 1,
    ref: "07-sql-ablakfuggvenyek.html#lepes7",
    type: "single",
    q: "Mi a lekérdezés logikai kiértékelési sorrendje (a dia szerint)?",
    options: [
      "FROM → WHERE → GROUP BY → HAVING → SELECT (ablakfüggvények) → ORDER BY → LIMIT",
      "SELECT (ablakfüggvények) → FROM → WHERE → GROUP BY → HAVING → ORDER BY",
      "FROM → SELECT (ablakfüggvények) → WHERE → GROUP BY → HAVING → ORDER BY",
      "FROM → WHERE → SELECT (ablakfüggvények) → GROUP BY → HAVING → ORDER BY"
    ],
    answer: 0,
    hint: "Melyik záradékban nem állhat ablakfüggvény? Azok mind előtte futnak.",
    explain: R`Az ablakfüggvények a SELECT fázisban számolódnak, a WHERE, GROUP BY és HAVING után – ezért ott nem használhatók, és ezért lát az ablak csak szűrt, csoportosított sorokat. A végső ORDER BY (és utána a LIMIT) már az ablakfüggvények után fut, ott szabad őket használni.`
  },
  {
    id: "b07-023",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#lepes7",
    type: "single",
    q: "Mit ad a 7-es (30-as) rendelésnél: <code>SELECT id, RANK() OVER (ORDER BY osszeg DESC) FROM rendelesek WHERE ugyfel = 'Béla'</code>? (Az egész táblán a 30 a 6. legnagyobb.)",
    options: ["6", "3", "2", "1"],
    answer: 2,
    hint: "Mikor fut a WHERE, és hány sort lát ezután az ablak?",
    explain: R`A WHERE előbb fut: az ablak csak Béla 3 rendelését látja (60, 30, 20), ebben a 30 a 2. A 6 az egész táblás rang lenne – ahhoz CTE-ben kell rangsorolni, és kívül szűrni Bélára. A 3 a 20-as rendelés rangja, az 1 a 60-asé.`
  },
  {
    id: "b07-024",
    topic: "07",
    level: 3,
    ref: "07-sql-ablakfuggvenyek.html#lepes7",
    type: "multi",
    q: "Melyik lekérdezés fut le hiba nélkül (SQLite-ban és PostgreSQL-ben is)?",
    options: [
      "<code>SELECT hallgato FROM zh ORDER BY RANK() OVER (ORDER BY pont DESC)</code>",
      "<code>SELECT hallgato FROM zh WHERE RANK() OVER (ORDER BY pont DESC) = 1</code>",
      "<code>SELECT ugyfel, RANK() OVER (ORDER BY SUM(osszeg) DESC) FROM rendelesek GROUP BY ugyfel</code>",
      "<code>SELECT hallgato, RANK() OVER (ORDER BY pont DESC) AS rnk FROM zh WHERE rnk = 1</code>",
      "<code>WITH t AS (SELECT hallgato, RANK() OVER (ORDER BY pont DESC) AS rnk FROM zh) SELECT hallgato FROM t WHERE rnk = 1</code>"
    ],
    answer: [0, 2, 4],
    hint: "Ablakfüggvény csak a SELECT-ben és a végső ORDER BY-ban állhat; a SELECT-beli álnév a WHERE idején még nem létezik.",
    explain: R`A végső ORDER BY-ban szabad ablakfüggvény; a GROUP BY után a csoportsorokon is lehet rangsorolni (<code>SUM(osszeg)</code> szerint: Anna 1., Béla 2., Csilla 3.); a CTE-s változat a szabályos szűrés. A WHERE-beli ablakfüggvény hibát ad (SQLite: <em>misuse of window function RANK()</em>), és az álnévre szűrés is (SQLite: <em>misuse of aliased window function rnk</em>), mert a WHERE az ablakfüggvények előtt fut.`
  },

  // ---------- Alkalmazás ----------
  {
    id: "b07-025",
    topic: "07",
    level: 3,
    ref: "07-sql-ablakfuggvenyek.html#alkalmazas",
    type: "single",
    q: "Az előadás mintakódjában <code>ROUND(AVG(osszeg) OVER (ORDER BY datum, id ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS avg_7sor</code> Béla utolsó (7-es) rendelésénél 37,14, holott Béla rendeléseinek átlaga 36,67. Mi a magyarázat?",
    options: [
      "A ROWS keret a partíció elején rövidebb, ezért kerekítési eltérés jön ki.",
      "Nincs PARTITION BY, ezért a keret az egész tábla időrendjében az utolsó 7 rendelést átlagolja, ügyfelektől függetlenül.",
      "A keret 7 naptári napot fog át, és 01-07-én nem volt rendelés.",
      "Az alapértelmezett RANGE keret a holtversenyes napokat duplán számolja."
    ],
    answer: 1,
    hint: "Melyik ablak tartalmaz PARTITION BY ugyfel-et a mintakódban, és melyik nem?",
    explain: R`Az <code>avg_7sor</code> ablakában nincs PARTITION BY, így az egész tábla időrendjében a 7-es sorig tartó utolsó 7 sort átlagolja: $(60+40+50+25+35+20+30)/7 = 260/7 \approx 37{,}14$ – ebben Anna és Csilla rendelései is benne vannak. Ez napi forgalomhoz jó, ügyfélelemzéshez nem. A keret ROWS (sorokat számol, nem napokat), és itt kifejezetten meg van adva, tehát nem RANGE.`
  },
  {
    id: "b07-026",
    topic: "07",
    level: 2,
    ref: "07-sql-ablakfuggvenyek.html#alkalmazas",
    type: "single",
    q: "A motivációs lekérdezésben a „hányadik legnagyobb” oszlop <code>RANK() OVER (PARTITION BY ugyfel ORDER BY osszeg DESC)</code>. Mit adna Anna 25-ös rendelésénél, ha <code>DENSE_RANK()</code>-ra cserélnénk? (Anna: 40, 25, 35, 40.)",
    options: ["4", "3", "2", "1"],
    answer: 1,
    hint: "Hány különböző összeg nagyobb Annánál a 25-nél?",
    explain: R`Anna összegei csökkenően: 40, 40, 35, 25. A nagyobb különböző értékek: 40 és 35, így DENSE_RANK $= 3$. A RANK 4-et ad (három sor nagyobb), ez van az eredeti táblában. A 2 a 35-ös, az 1 a két 40-es rendelés rangja.`
  }
);
