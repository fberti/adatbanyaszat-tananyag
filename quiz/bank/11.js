/* Vizsgagyakorló kérdésbank – 11. lecke: Adatelemzési alapok Pythonban */

BANK.push(
  {
    id: "b11-001",
    topic: "11",
    level: 1,
    ref: "11-python-adatkezeles.html#lepes1",
    type: "single",
    q: "Mi az értéke: <code>[x % 3 for x in [3, 4, 5, 6]]</code>?",
    options: ["<code>[0, 1, 2, 0]</code>", "<code>[1, 1, 1, 2]</code>", "<code>[3, 4, 5, 6]</code>", "<code>[0, 0]</code>"],
    answer: 0,
    hint: "A % a maradékos osztás maradéka. A lista-értelmezés minden elemre kiszámolja a kifejezést.",
    explain: R`A 3-mal osztás maradékai: 3 → 0, 4 → 1, 5 → 2, 6 → 0. Az $[1, 1, 1, 2]$ az egészosztás (<code>//</code>) eredménye lenne. A $[0, 0]$ szűrésként értelmezi a kifejezést (mintha <code>if x % 3 == 0</code> állna), de itt nincs <code>if</code>, tehát minden elem megmarad.`
  },
  {
    id: "b11-002",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes1",
    type: "single",
    q: "Mennyi <code>len(a)</code>?<pre><code class=\"language-python\">a = [1, 2]\na.append([3])\na.extend([4, 5])</code></pre>",
    options: ["5", "6", "4", "3"],
    answer: 0,
    hint: "Az append egyetlen elemet fűz hozzá (akár egy listát), az extend elemenként.",
    explain: "Az <code>append([3])</code> egy beágyazott listát tesz hozzá (1 elem), az <code>extend([4, 5])</code> két külön elemet: <code>[1, 2, [3], 4, 5]</code>, ez 5 elem. A 6 mindkét hívást elemenkéntinek veszi, a 4 mindkettőt egyelemű hozzáadásnak."
  },
  {
    id: "b11-003",
    topic: "11",
    level: 1,
    ref: "11-python-adatkezeles.html#lepes2",
    type: "multi",
    q: "Mely állítások igazak a Python-halmazra (<code>set</code>)?",
    options: [
      "Az elemeinek nincs sorrendje.",
      "Egy elem legfeljebb egyszer szerepelhet benne.",
      "Az elemei pozícióval érhetők el, pl. <code>k[0]</code>.",
      "Lehet az eleme egy másik <code>set</code>.",
      "Üres halmazt a <code>set()</code> hoz létre."
    ],
    answer: [0, 1, 4],
    hint: "Gondolj a kosárra: számít-e a termékek sorrendje és ismétlődése? És mit jelent az, hogy egy objektum módosítható?",
    explain: "A halmaznak nincs sorrendje és nincs benne ismétlődés, ezért pozícióval sem érhető el (<code>TypeError</code>). Halmaz nem lehet halmaz eleme, mert módosítható (nem hashable) – erre való a <code>frozenset</code>. Az üres <code>{}</code> szótár, üres halmazt csak a <code>set()</code> ad."
  },
  {
    id: "b11-004",
    topic: "11",
    level: 1,
    ref: "11-python-adatkezeles.html#lepes2",
    type: "single",
    q: "Mennyi <code>len({\"tea\", \"milk\"} | {\"milk\", \"rice\"})</code> és <code>len({\"tea\", \"milk\"} &amp; {\"milk\", \"rice\"})</code>?",
    options: ["3 és 1", "4 és 1", "3 és 2", "4 és 0"],
    answer: 0,
    hint: "A | unió (legalább az egyikben), a & metszet (mindkettőben). A közös elem az unióban is csak egyszer számít.",
    explain: "Unió: tea, milk, rice – 3 elem (a milk csak egyszer). Metszet: milk – 1 elem. A 4 azt feltételezi, hogy a közös elem kétszer szerepel, ahogy két lista összefűzésekor."
  },
  {
    id: "b11-005",
    topic: "11",
    level: 3,
    ref: "11-python-adatkezeles.html#lepes2",
    type: "single",
    q: "A gyakorlat Apriori-demója a kosarakat és a jelölt elemhalmazokat <code>frozenset</code>-ként tárolja, a támogatottságokat pedig egy <code>{elemhalmaz: support}</code> szótárban. Miért nem jó erre a sima <code>set</code>?",
    options: [
      "Mert a szótár kulcsa csak nem módosítható (hashable) érték lehet, a set pedig módosítható.",
      "Mert a set nem tudja ellenőrizni a részhalmaz-viszonyt.",
      "Mert a set megőrzi a termékek sorrendjét, és így {bread, butter} ≠ {butter, bread} lenne.",
      "Mert a frozenset gyorsabban számolja a metszetet, egyébként egyenértékűek."
    ],
    answer: 0,
    hint: "Próbáld ki fejben: d = {{\"bread\", \"butter\"}: 0.375} – mi történik?",
    explain: "A <code>set</code> mint kulcs <code>TypeError: unhashable type: 'set'</code>-et ad, mert módosítható. A <code>frozenset</code> nem módosítható, ezért lehet kulcs; a sorrend ott sem számít, így <code>frozenset([\"butter\", \"bread\"])</code> ugyanazt a kulcsot találja meg. A részhalmaz-vizsgálatot (<code>&lt;=</code>) a sima set is tudja, és sorrendet egyik sem tárol."
  },
  {
    id: "b11-006",
    topic: "11",
    level: 1,
    ref: "11-python-adatkezeles.html#lepes3",
    type: "single",
    q: "Mit ír ki?<pre><code class=\"language-python\">d = {'a': 1}\nprint(d.get('b', 0), 'a' in d, 1 in d)</code></pre>",
    options: ["<code>0 True False</code>", "<code>None True True</code>", "<code>KeyError: 'b'</code>", "<code>0 True True</code>"],
    answer: 0,
    hint: "Mit ad a get alapértékkel, ha a kulcs hiányzik? És az in a kulcsok vagy az értékek között keres?",
    explain: "A <code>get('b', 0)</code> a hiányzó kulcsra a megadott alapértéket adja (0), hibát nem. Az <code>in</code> a <em>kulcsok</em> között keres: az <code>'a'</code> kulcs, az 1 csak érték, ezért <code>False</code>. Értékre <code>1 in d.values()</code> kérdezne."
  },
  {
    id: "b11-007",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes3",
    type: "single",
    q: "Mit ír ki az utolsó sor?<pre><code class=\"language-python\">m = {}\nfor ch in \"mississippi\":\n    m[ch] = m.get(ch, 0) + 1\nprint(max(m, key=m.get))</code></pre>",
    options: ["<code>i</code>", "<code>s</code>", "<code>4</code>", "<code>m</code>"],
    answer: 0,
    hint: "A max egy szótáron a kulcsokat járja be; a key=m.get szerint hasonlít. Holtversenynél az elsőként talált nyer.",
    explain: "A számlálás eredménye <code>{'m': 1, 'i': 4, 's': 4, 'p': 2}</code>. Az <code>i</code> és az <code>s</code> is 4-szer szerepel; a <code>max</code> az elsőként talált legnagyobbat adja, és a szótár a beszúrás sorrendjét őrzi – az <code>i</code> előbb került be. A 4 az érték lenne, de a <code>max</code> kulcsot ad vissza. Az <code>m</code> a betűrendben utolsó kulcs – ezt adná a <code>max(m)</code> kulcs nélkül."
  },
  {
    id: "b11-008",
    topic: "11",
    level: 1,
    ref: "11-python-adatkezeles.html#lepes4",
    type: "single",
    q: "Mennyi <code>(lambda x, y: x - y)(10, 3)</code>?",
    options: ["7", "-7", "13", "Hibát ad, mert a lambdának csak egy paramétere lehet"],
    answer: 0,
    hint: "A paraméterek sorrendben kapják az argumentumokat: x = 10, y = 3.",
    explain: R`A lambda bármennyi paramétert kaphat; itt $x = 10$, $y = 3$, az érték $10 - 3 = 7$. A $-7$ felcseréli a paramétereket, a 13 összead.`
  },
  {
    id: "b11-009",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes4",
    type: "single",
    q: "Mi az eredménye: <code>sorted([\"bb\", \"a\", \"ccc\", \"dd\"], key=len)</code>?",
    options: [
      "<code>['a', 'bb', 'dd', 'ccc']</code>",
      "<code>['a', 'dd', 'bb', 'ccc']</code>",
      "<code>['ccc', 'bb', 'dd', 'a']</code>",
      "<code>['a', 'bb', 'ccc', 'dd']</code>"
    ],
    answer: 0,
    hint: "A kulcs a hossz. Azonos hosszúságú elemeknél a Python rendezése megtartja az eredeti sorrendet (stabil).",
    explain: "Hosszak: bb 2, a 1, ccc 3, dd 2. Hossz szerint növekvően: a, majd a két 2 hosszú az eredeti sorrendjükben (bb, dd), végül ccc. Az utolsó opció ábécérend (kulcs nélkül), a harmadik csökkenő hossz."
  },
  {
    id: "b11-010",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes5",
    type: "multi",
    q: "Legyen <code>def g(): yield 1; yield 2</code> (két külön sorban), és <code>it = g()</code>. Mely állítások igazak?",
    options: [
      "Az <code>it = g()</code> sor még egyetlen <code>yield</code>-et sem futtat le.",
      "<code>next(it) + next(it)</code> értéke 3.",
      "Ezután egy harmadik <code>next(it)</code> <code>StopIteration</code>-t dob.",
      "Ezután a <code>list(it)</code> értéke <code>[1, 2]</code>.",
      "<code>it[0]</code> értéke 1."
    ],
    answer: [0, 1, 2],
    hint: "A generátor lusta, egyszer járható be, és nem indexelhető.",
    explain: "A <code>g()</code> csak létrehozza a generátorobjektumot; a törzs az első <code>next</code>-re indul. A két <code>next</code> 1-et és 2-t ad (összeg 3), ezután a generátor kimerült: a következő <code>next</code> <code>StopIteration</code>-t dob, a <code>list(it)</code> pedig <code>[]</code>. Generátort nem lehet indexelni."
  },
  {
    id: "b11-011",
    topic: "11",
    level: 1,
    ref: "11-python-adatkezeles.html#lepes5",
    type: "match",
    q: "Párosítsd az osztályokhoz kapcsolódó elemet a jelentésével!",
    pairs: [
      ["<code>def __init__(self, a):</code>", "konstruktor, a példány létrehozásakor fut"],
      ["<code>self</code>", "hivatkozás az aktuális objektumra"],
      ["<code>class B(A):</code>", "öröklés: B az A-ból származik"],
      ["<code>v = B(3)</code>", "objektumpéldány létrehozása"],
      ["<code>super().foo()</code>", "az ősosztály metódusának hívása"]
    ],
    hint: "Melyik hoz létre valamit, melyik hivatkozik valamire, és melyik írja le két osztály viszonyát?",
    explain: "Az <code>__init__</code> a konstruktor, a <code>self</code> az aktuális példány, a zárójelben megadott ősosztály az öröklést jelzi, a <code>B(3)</code> hívás példányt hoz létre (és lefuttatja az <code>__init__</code>-et), a <code>super()</code> az ős metódusát éri el. Ugyanez a minta a <code>KMeans(n_clusters=3)</code> hívásban: osztály → példány."
  },
  {
    id: "b11-012",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes6",
    type: "single",
    q: "A <code>plt.hist([18, 32, 41, 21, 31, 28, 35, 28, 15, 33], bins=4)</code> osztályhatárai 15; 21,5; 28; 34,5; 41. Melyik osztályba kerülnek a 28-as értékek?",
    options: [
      "A harmadikba, [28; 34,5)",
      "A másodikba, [21,5; 28)",
      "Fele-fele arányban a második és a harmadik osztályba",
      "Egyikbe sem, mert határon vannak"
    ],
    answer: 0,
    hint: "Az osztályok balról zártak, jobbról nyitottak (az utolsó kivételével).",
    explain: "A 28 a második osztály jobb (nyitott) és a harmadik bal (zárt) határa, ezért a harmadikba esik. Így lesz a gyakoriság 3, 0, 5, 2 – a második osztály üres. Csak az utolsó osztály zárt mindkét oldalon, ezért ott a 41 is beleszámít."
  },
  {
    id: "b11-013",
    topic: "11",
    level: 1,
    ref: "11-python-adatkezeles.html#lepes7",
    type: "match",
    q: "Párosítsd az <code>open</code> módját a jelentésével!",
    pairs: [
      ["<code>\"r\"</code>", "szöveg olvasása (alapértelmezett)"],
      ["<code>\"w\"</code>", "írás – a meglévő tartalmat törli"],
      ["<code>\"a\"</code>", "hozzáfűzés a fájl végéhez"],
      ["<code>\"rb\"</code>", "bináris olvasás (bájtok)"]
    ],
    hint: "r = read, w = write, a = append, b = binary.",
    explain: "A <code>\"w\"</code> megnyitáskor kiüríti a fájlt – ha a meglévő tartalom mellé akarsz írni, <code>\"a\"</code> kell. A <code>\"b\"</code> módban nincs kódolás: bájtokat kapsz, nem szöveget."
  },
  {
    id: "b11-014",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes7",
    type: "single",
    q: "A <code>ki.txt</code> első sora <code>first line</code>. Mit ír ki az alábbi kód első három sora?<pre><code class=\"language-python\">with open(\"ki.txt\", encoding=\"utf-8\") as fbe:\n    i = 1\n    for line in fbe.readline():\n        print(i, line)\n        i = i + 1</code></pre>",
    options: [
      "<code>1 f</code>, <code>2 i</code>, <code>3 r</code>",
      "<code>1 first line</code>, <code>2 second line</code>, <code>3 third line</code>",
      "<code>1 first line</code>, majd semmi",
      "<code>AttributeError</code>"
    ],
    answer: 0,
    hint: "Mit ad vissza a readline()? És min megy végig egy for ciklus, ha egy szöveget kap?",
    explain: "A <code>readline()</code> egyetlen szöveget ad (az első sort); a <code>for</code> egy szövegen karakterenként megy végig. Ezt mutatja az előadás diája is. Soronkénti bejáráshoz: <code>for line in fbe:</code> vagy <code>fbe.readlines()</code>."
  },
  {
    id: "b11-015",
    topic: "11",
    level: 1,
    ref: "11-python-adatkezeles.html#lepes8",
    type: "match",
    q: "Párosítsd a <code>pd.read_csv</code> paraméterét a feladattal!",
    pairs: [
      ["<code>sep=\";\"</code>", "pontosvesszővel tagolt fájl"],
      ["<code>encoding=\"utf-8-sig\"</code>", "UTF-8 fájl BOM-mal (Excel-barát mentés)"],
      ["<code>header=None</code>", "a fájlnak nincs fejlécsora"],
      ["<code>usecols=[\"product\"]</code>", "csak a megadott oszlop kell"],
      ["<code>decimal=\",\"</code>", "magyar tizedesvessző az adatokban"]
    ],
    hint: "Melyik vonatkozik a mezők elválasztására, melyik a karakterekre, melyik a fejlécre?",
    explain: "A <code>sep</code> a mezőelválasztó, az <code>encoding</code> a karakterkódolás, a <code>header=None</code> szerint az első sor is adat, a <code>usecols</code> oszlopot szűkít, a <code>decimal</code> a tizedesjelet adja meg. A gyakorlat minden szkriptje <code>sep=\";\", encoding=\"utf-8-sig\"</code>-gel olvas."
  },
  {
    id: "b11-016",
    topic: "11",
    level: 3,
    ref: "11-python-adatkezeles.html#lepes8",
    type: "single",
    q: "A Gyak2 <code>retail_baskets.csv</code> egy sora: <code>T0001;['milk', 'tomato sauce']</code>. <code>b = pd.read_csv(…, sep=\";\", encoding=\"utf-8-sig\")</code> után mennyi <code>len(b.loc[0, \"product\"])</code>?",
    options: ["24", "2", "1", "Hiba, mert a CSV nem tartalmazhat listát"],
    answer: 0,
    hint: "Milyen típusú érték lesz a cellában: lista vagy szöveg?",
    explain: "CSV-ben minden szöveg; a mentett lista a visszaolvasás után egy szöveg: <code>\"['milk', 'tomato sauce']\"</code>, ami 24 karakter. Listává <code>ast.literal_eval(…)</code> alakítja vissza (akkor lenne a hossza 2). Ezért használja a <code>02_apriori.py</code> a munkamenetben még élő <code>product_lists</code> változót."
  },
  {
    id: "b11-017",
    topic: "11",
    level: 1,
    ref: "11-python-adatkezeles.html#lepes9",
    type: "single",
    q: "Mi a helyes sorrend egy adatbázis-módosításnál Pythonból?",
    options: [
      "connect → cursor → execute → commit → close",
      "cursor → connect → execute → close → commit",
      "connect → execute → cursor → commit → close",
      "connect → cursor → commit → execute → close"
    ],
    answer: 0,
    hint: "Kurzor csak egy meglévő kapcsolatból készülhet, és csak azt lehet véglegesíteni, ami már lefutott.",
    explain: "Előbb kapcsolat (<code>connect</code>), abból kurzor (<code>con.cursor()</code>), a kurzor végrehajtja a parancsot (<code>execute</code>), a <code>commit</code> véglegesíti, végül <code>close</code>. Bezárás után már nem lehet commitolni (<code>ProgrammingError: Cannot operate on a closed database</code>)."
  },
  {
    id: "b11-018",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes9",
    type: "single",
    q: "Miért ad hibát: <code>cmd.execute(\"select * from persons where name = ?\", (\"Anna\"))</code>?",
    options: [
      "A <code>(\"Anna\")</code> nem tuple, csak egy zárójelezett szöveg; 4 karaktere 4 paraméternek látszik. Helyesen: <code>(\"Anna\",)</code>.",
      "A <code>?</code> helyőrzőt az sqlite3 nem ismeri, <code>:1</code> kell.",
      "Szöveges paraméter csak szótárban adható át.",
      "A select-hez nem lehet paramétert adni, csak az insert-hez."
    ],
    answer: 0,
    hint: "Mi teszi a zárójeles kifejezést egyelemű tuple-lé?",
    explain: "Egyelemű tuple-höz vessző kell: <code>(\"Anna\",)</code>. Vessző nélkül a paraméter maga a szöveg, és a karakterei külön értéknek számítanak: <code>Incorrect number of bindings supplied … there are 4 supplied</code>. A <code>?</code> az sqlite3 szabványos helyőrzője, és a select is paraméterezhető."
  },
  {
    id: "b11-019",
    topic: "11",
    level: 1,
    ref: "11-python-adatkezeles.html#lepes10",
    type: "match",
    q: "Párosítsd a DataFrame részét azzal, amit lekérdez!",
    pairs: [
      ["<code>df.index</code>", "a sorcímkék (pl. RangeIndex(start=0, stop=3))"],
      ["<code>df.columns</code>", "az oszlopnevek"],
      ["<code>df.values</code>", "az adatok kétdimenziós NumPy-tömbként"],
      ["<code>df.shape</code>", "(sorok száma, oszlopok száma)"],
      ["<code>df.dtypes</code>", "oszloponként a tárolási típus"]
    ],
    hint: "A DataFrame három része: index, columns, values. A shape és a dtypes ezekről ad összefoglaló információt.",
    explain: "Az index a sorok, a columns az oszlopok címkéi, a values maga az adat (NumPy-tömb). A shape a méret, a dtypes oszloponként a típus (pl. <code>int64</code>, <code>float64</code>, <code>object</code>)."
  },
  {
    id: "b11-020",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes10",
    type: "single",
    q: "Egy ciklus 100&nbsp;000 eredménysort állít elő. Melyik a hatékony módja, hogy DataFrame legyen belőlük?",
    options: [
      "Listába gyűjteni (<code>sorok.append(…)</code>), és a ciklus után egyszer <code>pd.DataFrame(sorok, columns=…)</code>.",
      "Minden lépésben <code>df.loc[i] = …</code>.",
      "Minden lépésben <code>df = pd.concat([df, uj_sor])</code>.",
      "Mindegy, a pandas belül mindhármat ugyanúgy hajtja végre."
    ],
    answer: 0,
    hint: "Mi történik a memóriában, ha minden lépésben bővíted a táblát?",
    explain: "A soronkénti bővítés (<code>loc</code> vagy <code>concat</code>) minden lépésben újramásolja a táblát, ezért a futási idő a sorok számával rohamosan nő. A leckében 2000 soron is nagyjából 70-szeres volt a különbség. A lista olcsón bővíthető, és a végén egyszer alakul táblázattá."
  },
  {
    id: "b11-021",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes11",
    type: "single",
    q: "<code>d = pd.DataFrame({'p': ['bread', 'coffee', 'milk', 'tea']}, index=[10, 11, 12, 13])</code>. Mit ad <code>d.loc[11:12, 'p'].tolist()</code>, és mit <code>d.iloc[1:2, 0].tolist()</code>?",
    options: [
      "<code>['coffee', 'milk']</code> és <code>['coffee']</code>",
      "<code>['coffee']</code> és <code>['coffee']</code>",
      "<code>['coffee', 'milk']</code> és <code>['coffee', 'milk']</code>",
      "<code>KeyError</code> és <code>['coffee']</code>"
    ],
    answer: 0,
    hint: "A loc címkével szeletel, és a záró címke is benne van; az iloc pozícióval, és a záró pozíció nincs benne.",
    explain: "A <code>loc[11:12]</code> a 11-es és a 12-es címkéjű sort is adja. Az <code>iloc[1:2]</code> csak az 1-es pozíciót (a 2-es már nem tartozik bele). KeyError nincs, mert a 11 és a 12 létező címke."
  },
  {
    id: "b11-022",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes12",
    type: "single",
    q: "A <code>t</code> táblában van egy <code>quantity</code> oszlop. Mi történik: <code>t.drop('quantity')</code>?",
    options: [
      "<code>KeyError</code>, mert alapból sort (axis=0) keres ezzel a címkével.",
      "Új DataFrame-et ad a quantity oszlop nélkül.",
      "Helyben törli a quantity oszlopot.",
      "Az oszlop értékeit NaN-ra állítja."
    ],
    answer: 0,
    hint: "Mi a drop alapértelmezett tengelye?",
    explain: "A <code>drop</code> alapból sorcímkét keres (<code>axis=0</code>), így <code>KeyError: \"['quantity'] not found in axis\"</code>. Oszlophoz <code>drop('quantity', axis=1)</code> vagy <code>drop(columns=['quantity'])</code> kell – ez is új DataFrame-et ad; helyben a <code>del t['quantity']</code> vagy az <code>inplace=True</code> töröl."
  },
  {
    id: "b11-023",
    topic: "11",
    level: 2,
    ref: "11-python-adatkezeles.html#lepes13",
    type: "single",
    q: "<code>t = pd.DataFrame({'a': [1, 2, 3, 4], 'b': ['x', 'y', 'x', 'z']})</code>. Hány sort ad <code>t[(t.a &gt; 2) | (t.b == 'x')]</code>, és hányat ugyanez <code>&amp;</code>-del?",
    options: ["3 és 1", "4 és 1", "2 és 2", "3 és 0"],
    answer: 0,
    hint: "Írd fel soronként mindkét feltételt (True/False), majd kombináld őket vagy-gyal, illetve és-sel.",
    explain: "<code>a &gt; 2</code>: a 3. és 4. sor; <code>b == 'x'</code>: az 1. és 3. sor. Vagy: 1., 3., 4. sor – 3 db. És: csak a 3. sor (a = 3, b = 'x') – 1 db. A 4 a két feltétel találatait összeadja, a közös sort kétszer számolva."
  },
  {
    id: "b11-024",
    topic: "11",
    level: 3,
    ref: "11-python-adatkezeles.html#lepes13",
    type: "single",
    q: "Négy kosár tételei: T1: 4400 + 550, T2: 550 + 800 + 900, T3: 2200, T4: 1400 + 1650 (Ft). Mit ad <code>t.groupby('kosar')['ertek'].sum().mean()</code>, és mit <code>t['ertek'].mean()</code>?",
    options: ["3112,5 és 1556,25", "1556,25 és 3112,5", "3112,5 és 3112,5", "12 450 és 1556,25"],
    answer: 0,
    hint: "Az első előbb kosaranként összegez, és a kosárértékeket átlagolja; a második a nyolc tételt átlagolja.",
    explain: R`Kosárértékek: 4950, 2250, 2200, 3050, összesen $12\,450$; átlaguk $12\,450 / 4 = 3112{,}5$ – ez az átlagos kosárérték. A tételek átlaga $12\,450 / 8 = 1556{,}25$. A 12 450 a végösszeg, nem átlag.`
  },
  {
    id: "b11-025",
    topic: "11",
    level: 3,
    ref: "11-python-adatkezeles.html#alkalmazas",
    type: "single",
    q: "A <code>persons</code> táblán az életkor és a pontszám kovarianciája $-13{,}56$, korrelációja $-0{,}40$. Melyik értelmezés helyes?",
    options: [
      "Gyenge–közepes negatív kapcsolat: az idősebbeknek jellemzően kisebb a pontszámuk; az erősséget a korreláció mutatja, mert a kovariancia mértékegységfüggő.",
      "Erős negatív kapcsolat, mert a kovariancia abszolút értéke 10-nél nagyobb.",
      "Nincs kapcsolat, mert a kovariancia negatív.",
      "Az életkor növekedése okozza a pontszám csökkenését."
    ],
    answer: 0,
    hint: "Melyik mutató független a mértékegységektől? És következik-e az összefüggésből ok-okozat?",
    explain: "A kovariancia előjele az irányt mutatja (negatív), de a nagysága év × pont mértékegységű, így erősségre nem alkalmas. A korreláció $-1$ és $1$ közé esik: $-0{,}40$ gyenge–közepes negatív kapcsolat. A negatív érték is kapcsolat, csak ellentétes irányú. Ok-okozatra pedig – különösen 10 megfigyelésből – nem következtethetünk."
  }
);
