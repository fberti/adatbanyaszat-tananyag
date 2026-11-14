/* 7. lecke – SQL ablakfüggvények – kvízek */

QUIZZES["l07-lepes2"] = {
  title: "Mini-kvíz – OVER() és PARTITION BY",
  questions: [
    {
      type: "single",
      q: "Hány sort ad vissza: <code>SELECT ugyfel, SUM(osszeg) OVER (PARTITION BY ugyfel) FROM rendelesek</code>? (8 rendelés, 3 ügyfél)",
      options: ["8", "3", "1", "4"],
      answer: 0,
      hint: "Az ablakfüggvény összevonja a sorokat, vagy megtartja őket?",
      explain: "Az ablakfüggvény nem vonja össze a sorokat: 8 sor marad, mindegyik mellett az ügyfele összege. A 3 a <code>GROUP BY ugyfel</code> eredménye lenne."
    },
    {
      type: "single",
      q: "Béla 20-as rendelése (Béla összesen 110, a tábla összesen 300). Mit ad rá a <code>ROUND(100.0 * osszeg / SUM(osszeg) OVER (PARTITION BY ugyfel), 1)</code>?",
      options: ["18,2", "6,7", "36,7", "54,5"],
      answer: 0,
      hint: "A nevező a saját partíció (Béla) összege.",
      explain: R`$20/110 \approx 18{,}2\%$. A 6,7 a teljes táblához viszonyított arány ($20/300$, ez az <code>OVER ()</code> lenne), a 36,7 Béla részesedése ($110/300$), az 54,5 Béla 60-as rendelésének aránya.`
    },
    {
      type: "single",
      q: "A <code>zh</code> táblában Dóra 70 pontos, az A csoportban. Mennyi rá a <code>pont - AVG(pont) OVER (PARTITION BY csoport)</code>? (A csoport: 92, 85, 85, 70.)",
      options: ["−13", "−6,375", "+13", "0,25"],
      answer: 0,
      hint: "Előbb a saját csoport átlaga, utána a különbség pont − átlag.",
      explain: R`Az A csoport átlaga $(92+85+85+70)/4 = 83$, így $70-83 = -13$. A $-6{,}375$ az egész táblás átlagtól ($76{,}375$) vett eltérés (<code>OVER ()</code>), a $+13$ fordított előjel, a $0{,}25$ Feri eltérése a B csoportban.`
    },
    {
      type: "multi",
      q: "Melyik igaz a <code>PARTITION BY</code>-ra?",
      options: [
        "A sorokat nem vonja össze, csak az ablak határait jelöli ki.",
        "Egy SELECT-ben különböző ablakfüggvényeknek különböző partíciója lehet.",
        "Rendezi a lekérdezés kimenetét a partíciókulcs szerint.",
        "Kiszűri az egyelemű csoportokat."
      ],
      answer: [0, 1],
      hint: "Gondolj Csilla egyetlen rendelésére és arra, mi garantálja a kiírási sorrendet.",
      explain: "A <code>PARTITION BY</code> csak a számolás tartományát határozza meg. A kiírási sorrendet a lekérdezés végi <code>ORDER BY</code> adja, és egyelemű partíció (Csilla) is megmarad."
    }
  ]
};

QUIZZES["l07-lepes4"] = {
  title: "Mini-kvíz – Ablakkeret",
  questions: [
    {
      type: "single",
      q: "Mi az alapértelmezett keret, ha az <code>OVER</code>-ben van <code>ORDER BY</code>, de keret nincs megadva?",
      options: [
        "<code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>",
        "<code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>",
        "<code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code>",
        "<code>ROWS BETWEEN 1 PRECEDING AND CURRENT ROW</code>"
      ],
      answer: 0,
      hint: "A dia „gyakorlati buktatója”: melyik keretmód kezeli együtt a holtversenyeket?",
      explain: "<code>RANGE</code>, a partíció elejétől az aktuális sorig, az azonos rendezési értékű sorokkal együtt. A teljes partíció akkor a keret, ha nincs <code>ORDER BY</code>."
    },
    {
      type: "single",
      q: "Anna rendelései: 01-03: 40; 01-05: 25 (id 2); 01-05: 35 (id 3); 01-09: 40. Mennyi a <code>SUM(osszeg) OVER (ORDER BY datum)</code> értéke a 2-es rendelésnél?",
      options: ["100", "65", "140", "25"],
      answer: 0,
      hint: "Az alapértelmezett keret RANGE. Mely sorok rendezési értéke ≤ 01-05?",
      explain: "A RANGE keret a 01-05-ös dátumú sorokat mind beveszi: $40+25+35 = 100$. A 65 a <code>ROWS</code> keret (vagy <code>ORDER BY datum, id</code>) eredménye lenne."
    },
    {
      type: "single",
      q: "<code>havi</code>: 120, 150, 135, … Mennyi januárban az <code>AVG(bevetel) OVER (ORDER BY honap ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)</code>?",
      options: ["135", "90", "NULL", "120"],
      answer: 0,
      hint: "Januárnak nincs előző hónapja. Rövidebb lesz a keret, vagy NULL-t ad?",
      explain: R`A partíció szélén a keret egyszerűen rövidebb: január és február átlaga, $(120+150)/2 = 135$. A 90 akkor jönne ki, ha a hiányzó sort 0-nak számolnánk ($270/3$) – ez hiba.`
    },
    {
      type: "match",
      q: "Párosítsd a keretet a jelentésével!",
      pairs: [
        ["<code>ROWS 2 PRECEDING</code>", "az aktuális és a 2 előző sor"],
        ["<code>RANGE 2 PRECEDING</code> napszám szerint", "az utolsó 3 nap összes sora"],
        ["<code>ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING</code>", "az aktuális sortól a partíció végéig"],
        ["nincs <code>ORDER BY</code> az <code>OVER</code>-ben", "a teljes partíció"]
      ],
      hint: "ROWS: fizikai sorok; RANGE: a rendezési érték távolsága.",
      explain: "A <code>ROWS</code> sorokat számol, a <code>RANGE</code> értékkülönbséget (itt napokat). Kimaradó napnál a kettő eltér (01-08: 85 vs. 50 a példában)."
    }
  ]
};

QUIZZES["l07-lepes5"] = {
  title: "Mini-kvíz – Rangsorolók",
  questions: [
    {
      type: "single",
      q: "Pontszámok csökkenő sorrendben: 90, 80, 80, 70. Mennyi a 70-es <code>RANK()</code> értéke?",
      options: ["4", "3", "2", "5"],
      answer: 0,
      hint: "RANK = 1 + a nálad szigorúan jobb sorok száma.",
      explain: "Három sor jobb nála, így $1+3 = 4$ (a két 2. hely után nincs 3.). A 3 a <code>DENSE_RANK</code> lenne."
    },
    {
      type: "single",
      q: "A <code>zh</code> táblában (92, 85, 85, 78, 70, 70, 70, 61) mennyi a 70 pontosok <code>DENSE_RANK() OVER (ORDER BY pont DESC)</code> értéke?",
      options: ["4", "5", "3", "7"],
      answer: 0,
      hint: "Hány különböző pontszám jobb a 70-nél?",
      explain: "Jobb különböző értékek: 92, 85, 78 – ez 3, tehát a rang 4. Az 5 a <code>RANK</code> (négy sor jobb: 1 + 4 = 5), a 7 a legnagyobb <code>ROW_NUMBER</code> köztük."
    },
    {
      type: "single",
      q: "Hogyan osztja el az <code>NTILE(4)</code> a 10 sort a négy vödör között?",
      options: ["3, 3, 2, 2", "2, 2, 3, 3", "3, 2, 2, 3", "2, 2, 2, 4"],
      answer: 0,
      hint: "10 = 4·2 + 2. Melyik vödrök kapják a maradékot?",
      explain: "A maradék sorok az első vödrökbe kerülnek: 3, 3, 2, 2. Az NTILE a holtversenyt nem nézi, azonos értékek is külön vödörbe kerülhetnek."
    },
    {
      type: "single",
      q: "Csoportonként <em>pontosan</em> 3 sort akarsz (a holtverseny sem adhat többet). Melyik függvény kell?",
      options: ["<code>ROW_NUMBER()</code>", "<code>RANK()</code>", "<code>DENSE_RANK()</code>", "<code>NTILE(3)</code>"],
      answer: 0,
      hint: "Melyik ad holtversenynél is különböző számot?",
      explain: "Csak a <code>ROW_NUMBER</code> egyedi minden sorra, így <code>rn &lt;= 3</code> pontosan 3 sort ad. <code>RANK</code>/<code>DENSE_RANK</code> holtversenynél többet adhat, az <code>NTILE(3)</code> pedig harmadokra bont."
    }
  ]
};

QUIZZES["l07-vegso"] = {
  title: "Ellenőrző kvíz – SQL ablakfüggvények",
  questions: [
    {
      type: "single",
      q: "Mi a lényegi különbség a <code>SUM(osszeg) … GROUP BY ugyfel</code> és a <code>SUM(osszeg) OVER (PARTITION BY ugyfel)</code> között?",
      options: [
        "Az ablakfüggvény megtartja az eredeti sorokat, a GROUP BY csoportonként egy sorba vonja őket.",
        "Az ablakfüggvény más összeget számol, mint a GROUP BY.",
        "A GROUP BY gyorsabb, de ugyanannyi sort ad vissza.",
        "Az ablakfüggvény csak rendezett adaton működik."
      ],
      answer: 0,
      hint: "Számold meg a kimenő sorokat mindkét esetben.",
      explain: "Az összeg ugyanaz (Anna 140, Béla 110, Csilla 50), de a GROUP BY 3 sort, az ablakos változat 8 sort ad. Rendezés nélkül is működik."
    },
    {
      type: "single",
      q: "Hány sort ad: <code>SELECT ugyfel, COUNT(*) OVER (PARTITION BY ugyfel) FROM rendelesek WHERE osszeg &gt;= 30</code>?",
      options: ["6", "8", "3", "4"],
      answer: 0,
      hint: "Előbb a WHERE fut, utána az ablakfüggvény – és az nem von össze sorokat.",
      explain: "A 30-as vagy nagyobb rendelések: 40, 35, 40, 60, 30, 50 – ez 6 sor, és ennyi is marad. A 8 a szűrés nélküli tábla, a 3 a GROUP BY lenne."
    },
    {
      type: "single",
      q: "Anna 35-ös rendelése (Anna összesen 140, a tábla 300). Mennyi rá a <code>ROUND(100.0 * osszeg / SUM(osszeg) OVER (PARTITION BY ugyfel), 1)</code>?",
      options: ["25,0", "11,7", "46,7", "35,0"],
      answer: 0,
      hint: "A nevező Anna saját összege.",
      explain: R`$35/140 = 25\%$. A 11,7 a teljes táblához mért arány ($35/300$), a 46,7 Anna részesedése ($140/300$).`
    },
    {
      type: "single",
      q: "Hány a <code>COUNT(*) OVER (ORDER BY datum)</code> értéke a 2-es rendelésnél (01-05)? A dátumok: 01-02, 01-03, 01-04, 01-05, 01-05, 01-06, 01-08, 01-09.",
      options: ["5", "4", "3", "8"],
      answer: 0,
      hint: "Az alapértelmezett keret RANGE: az azonos dátumú sorok is beleszámítanak.",
      explain: "A 01-05-ig tartó sorok, a másik 01-05-össel együtt: 5. A 4 a ROWS keret (sorrendtől függően) eredménye lehetne – ez a holtverseny-buktató."
    },
    {
      type: "single",
      q: "Mit ad Béla első rendelésénél (60, utána 20 és 30) a <code>LAST_VALUE(osszeg) OVER (PARTITION BY ugyfel ORDER BY datum, id)</code>?",
      options: ["60", "30", "110", "NULL"],
      answer: 0,
      hint: "Hol ér véget az alapértelmezett keret?",
      explain: "Az alapértelmezett keret az aktuális sornál ér véget, így a keret utolsó eleme maga az aktuális sor: 60. A 30-at (Béla utolsó rendelését) csak <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> kerettel kapnád."
    },
    {
      type: "single",
      q: "<code>NTH_VALUE(osszeg, 2) OVER (PARTITION BY ugyfel ORDER BY datum, id)</code> – mit ad Anna <em>első</em> rendelésénél (40, utána 25)?",
      options: ["NULL", "25", "40", "0"],
      answer: 0,
      hint: "Hány sor van a keretben az első sornál?",
      explain: "Az első sornál a keret csak 1 sor, nincs 2. eleme: NULL. A 25 a második sortól jelenik meg."
    },
    {
      type: "single",
      q: "<code>havi</code>: április 180, május 165. Mennyi májusban a <code>100.0 * (bevetel - LAG(bevetel) OVER (ORDER BY honap)) / LAG(bevetel) OVER (ORDER BY honap)</code>, egy tizedesre?",
      options: ["−8,3", "−9,1", "+8,3", "−15,0"],
      answer: 0,
      hint: "A nevező az előző (áprilisi) érték.",
      explain: R`$(165-180)/180 \approx -8{,}3\%$. A $-9{,}1$ az aktuális hónappal osztva jönne ki ($-15/165$), a $-15$ az abszolút változás.`
    },
    {
      type: "single",
      q: "A <code>zh</code> B csoportjában (78, 70, 70, 61) mi Hanna (61) helyezése <code>RANK() OVER (PARTITION BY csoport ORDER BY pont DESC)</code> szerint?",
      options: ["4", "3", "2", "8"],
      answer: 0,
      hint: "Partíción belül számol, holtverseny után hézagot hagy.",
      explain: "A B csoportban 3 hallgató jobb nála, így 4. A 3 a <code>DENSE_RANK</code>, a 8 az egész táblás rang lenne."
    },
    {
      type: "multi",
      q: "Melyik záradékban állhat ablakfüggvény?",
      options: ["<code>SELECT</code>", "a végső <code>ORDER BY</code>", "<code>WHERE</code>", "<code>HAVING</code>", "<code>GROUP BY</code>"],
      answer: [0, 1],
      hint: "Idézd fel a logikai kiértékelési sorrendet: hol értékelődnek ki az ablakfüggvények?",
      explain: "Az ablakfüggvények a SELECT fázisban számolódnak, a WHERE, GROUP BY, HAVING után. Ezért csak SELECT-ben és a végső ORDER BY-ban használhatók."
    },
    {
      type: "single",
      q: "Csoportonként a legjobb hallgatót akarod. Melyik a helyes megoldás?",
      options: [
        "CTE-ben kiszámolod a <code>RANK() OVER (PARTITION BY csoport ORDER BY pont DESC)</code>-ot, és kívül <code>WHERE rnk = 1</code>.",
        "<code>WHERE RANK() OVER (PARTITION BY csoport ORDER BY pont DESC) = 1</code>",
        "<code>HAVING RANK() OVER (PARTITION BY csoport ORDER BY pont DESC) = 1</code>",
        "<code>SELECT …, RANK() OVER (…) AS rnk … WHERE rnk = 1</code> ugyanabban a lekérdezésben"
      ],
      answer: 0,
      hint: "A WHERE és a HAVING az ablakfüggvények előtt fut, a SELECT-beli álnév pedig még nem létezik a WHERE idején.",
      explain: "Ablakfüggvény eredményére csak egy külső lekérdezésben (CTE vagy allekérdezés) lehet szűrni. A <code>QUALIFY</code> csak néhány rendszer (Snowflake, BigQuery, DuckDB) nem szabványos kiterjesztése."
    },
    {
      type: "match",
      q: "Párosítsd a feladatot a függvénnyel!",
      pairs: [
        ["változás az előző hónaphoz", "<code>LAG</code>"],
        ["helyezés hézag nélkül (1, 2, 2, 3)", "<code>DENSE_RANK</code>"],
        ["vásárlók kvartilisekbe sorolása", "<code>NTILE(4)</code>"],
        ["pontosan egy sor ügyfelenként (legutóbbi rendelés)", "<code>ROW_NUMBER</code>"],
        ["halmozott összeg", "<code>SUM … OVER (ORDER BY …)</code>"]
      ],
      hint: "Eltolás, rangsor holtversennyel / anélkül, vödrök, kumulálás.",
      explain: "LAG: előző sor értéke. DENSE_RANK: azonos rang, nincs hézag. NTILE(4): négy egyenlő csoport. ROW_NUMBER: egyedi sorszám, így <code>rn = 1</code> pontosan egy sort hagy. SUM + ORDER BY: halmozott összeg."
    },
    {
      type: "single",
      q: "Mit számol a dia mintakódjában szereplő <code>AVG(osszeg) OVER (ORDER BY rendeles_datum ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)</code>?",
      options: [
        "Az aktuális és a 6 előző sor (legfeljebb 7 sor) átlagát.",
        "Mindig pontosan az elmúlt 7 naptári nap átlagát.",
        "Az aktuális sor előtti 6 sor átlagát, az aktuális sor nélkül.",
        "A 6 előző nap átlagát, hiányzó napnál NULL-t."
      ],
      answer: 0,
      hint: "ROWS: sorokat számol, nem napokat. Mi van a tábla elején?",
      explain: "A ROWS keret fizikai sorokat vesz: az aktuális + 6 előző sor. Ez csak akkor 7 nap, ha minden napra pontosan egy sor jut; a tábla elején kevesebb sorból számol. Valódi időtartamhoz RANGE (PostgreSQL-ben INTERVAL) kell."
    },
    {
      type: "single",
      q: "Mit ad a <code>SELECT ugyfel, SUM(osszeg), SUM(SUM(osszeg)) OVER () FROM rendelesek GROUP BY ugyfel</code> harmadik oszlopa?",
      options: ["Minden sorban 300-at", "Minden ügyfélnél a saját összegét", "Hibát, mert összesítő nem ágyazható", "Halmozott összeget: 140, 250, 300"],
      answer: 0,
      hint: "Az ablakfüggvény a GROUP BY után fut – a csoportsorokon számol.",
      explain: "A belső SUM a csoportösszeg (140, 110, 50), a külső <code>SUM … OVER ()</code> ezeket adja össze a 3 csoportsoron: 300. Halmozott összeg csak <code>ORDER BY</code>-jal lenne."
    }
  ]
};
