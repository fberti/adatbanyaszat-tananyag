/* 11. lecke – Adatelemzési alapok Pythonban – kvízek */

QUIZZES["l11-lepes1"] = {
  title: "Mini-kvíz – Listák",
  questions: [
    {
      type: "single",
      q: "Mit ír ki?<pre><code class=\"language-python\">v = [5, 3, 8]\nv.append(1)\nprint(v.pop(), len(v))</code></pre>",
      options: ["<code>1 3</code>", "<code>5 3</code>", "<code>1 4</code>", "<code>8 3</code>"],
      answer: 0,
      hint: "Hová teszi az elemet az append, és honnan veszi el a pop()?",
      explain: "Az <code>append</code> a végére teszi az 1-et: <code>[5, 3, 8, 1]</code>. A <code>pop()</code> a <em>végéről</em> veszi el (verem), tehát 1-et ad vissza, és 3 elem marad. Az <code>5 3</code> az „első elemet veszi ki” tévhit (az előadás diáján is így szerepel, tévesen); az <code>1 4</code> elfelejti, hogy a pop el is távolítja az elemet."
    },
    {
      type: "single",
      q: "Mit ír ki?<pre><code class=\"language-python\">x = [3, 1, 2]\ny = x.sort()\nprint(y)</code></pre>",
      options: ["<code>None</code>", "<code>[1, 2, 3]</code>", "<code>[3, 1, 2]</code>", "Hibát (<code>TypeError</code>)"],
      answer: 0,
      hint: "A sort() helyben rendez. Mit ad vissza egy helyben dolgozó metódus?",
      explain: "A <code>sort()</code> az <code>x</code>-et rendezi helyben, és <code>None</code>-t ad vissza – ezt kapja meg az <code>y</code>. Ha rendezett új lista kell: <code>y = sorted(x)</code>. Az <code>x</code> értéke ezután <code>[1, 2, 3]</code>."
    },
    {
      type: "single",
      q: "Mi az értéke: <code>[a * 2 for a in [1, 2, 3, 4] if a &gt; 2]</code>?",
      options: ["<code>[6, 8]</code>", "<code>[2, 4, 6, 8]</code>", "<code>[3, 4]</code>", "<code>[4, 6, 8]</code>"],
      answer: 0,
      hint: "Előbb a feltétel szűr (if), csak a megmaradt elemekre számolódik ki az a * 2.",
      explain: "Csak a 3 és a 4 nagyobb 2-nél; ezek kétszerese 6 és 8. A <code>[2, 4, 6, 8]</code> a szűrést hagyja ki, a <code>[3, 4]</code> a szorzást, a <code>[4, 6, 8]</code> a megduplázott értékre alkalmazza a feltételt."
    }
  ]
};

QUIZZES["l11-lepes2"] = {
  title: "Mini-kvíz – Halmazok és kosarak",
  questions: [
    {
      type: "single",
      q: "Mit ír ki?<pre><code class=\"language-python\">k = {\"bread\", \"butter\"}\nk.add(\"bread\")\nk.add(\"milk\")\nprint(len(k))</code></pre>",
      options: ["3", "4", "2", "Hibát, mert a bread már benne van"],
      answer: 0,
      hint: "Hányszor szerepelhet egy elem egy halmazban?",
      explain: "A halmazban nincs ismétlődés: a második <code>bread</code> hozzáadása nem változtat semmit, a <code>milk</code> új. Marad 3 elem. Hibát a már meglévő elem hozzáadása nem okoz."
    },
    {
      type: "multi",
      q: "Legyen <code>k1 = {\"bread\", \"butter\", \"coffee\"}</code> és <code>k2 = {\"bread\", \"butter\"}</code>. Melyik kifejezés értéke <code>True</code>?",
      options: [
        "<code>k2 &lt;= k1</code>",
        "<code>\"coffee\" in k1</code>",
        "<code>(k1 &amp; k2) == k2</code>",
        "<code>k1 &lt;= k2</code>",
        "<code>len(k1 | k2) == 5</code>"
      ],
      answer: [0, 1, 2],
      hint: "A <= részhalmazt jelent, a & metszetet, a | uniót. Az unióban egy közös elem csak egyszer számít.",
      explain: "A <code>k2</code> minden eleme benne van <code>k1</code>-ben, tehát részhalmaz (igaz), fordítva nem (hamis). A metszet éppen <code>k2</code> (igaz). Az unió 3 elemű, nem 5 – aki 5-öt vár, a közös elemeket kétszer számolja (listaként fűzte össze)."
    },
    {
      type: "single",
      q: "Öt kosár: <code>{bread, butter}</code>, <code>{bread}</code>, <code>{bread, butter, milk}</code>, <code>{milk}</code>, <code>{butter, tea}</code>. Mennyi a <code>{bread, butter}</code> elemhalmaz támogatottsága?",
      options: ["0,4", "0,6", "0,8", "2"],
      answer: 0,
      hint: "Hány kosárnak részhalmaza a {bread, butter}? Utána oszd el a kosarak számával.",
      explain: R`Csak az 1. és a 3. kosárban van meg <em>mindkét</em> termék: $2/5 = 0{,}4$. A 0,6 csak a kenyeres kosarakat számolja (3), a 0,8 azokat, amelyekben bármelyik termék megvan (4 – ez unió-szemlélet). A 2 a darabszám, nem az arány.`
    }
  ]
};

QUIZZES["l11-lepes7"] = {
  title: "Mini-kvíz – Szövegfájlok és kódolás",
  questions: [
    {
      type: "single",
      q: "Az <code>abc.txt</code> tartalma <code>'a\\nb\\nc\\n'</code>. Mennyi <code>len(f.readlines())</code>, illetve (újra megnyitva) <code>len(f.read())</code>?",
      options: ["3 és 6", "3 és 3", "4 és 6", "3 és 5"],
      answer: 0,
      hint: "A readlines sorokat ad, a read egyetlen szöveget. Hány karakter a sorvége?",
      explain: "3 sor van; a teljes szöveg 3 betű + 3 sorvége (<code>\\n</code> egy karakter) = 6. A „3 és 3” elfelejti a sorvégeket, a „3 és 5” az utolsó sorvégét, a „4 és 6” egy nem létező üres sort is számol (ilyet a <code>split(\"\\n\")</code> adna)."
    },
    {
      type: "single",
      q: "A „Kő kövön ütődnék” helyett ezt látod: <code>KÅ‘ kÃ¶vÃ¶n Ã¼tÅ‘dnÃ©k</code>. Mi történt?",
      options: [
        "Egy UTF-8 kódolású fájlt egybájtos kódolással (pl. cp1252) olvastál be.",
        "Egy cp1252 kódolású fájlt UTF-8-cal olvastál be.",
        "A fájl ASCII kódolású, ezért elvesztek az ékezetek.",
        "A fájl megsérült; csak újbóli mentéssel javítható."
      ],
      answer: 0,
      hint: "Minden ékezetes betű helyén két furcsa karakter áll. UTF-8-ban hány bájt egy ékezetes betű?",
      explain: "UTF-8-ban az ékezetes betűk 2 bájtosak; egybájtos kódlappal olvasva mindkét bájt külön karakternek látszik – ezért lesz két jel egy betű helyén. A fordított eset (cp1252-t UTF-8-cal olvasni) jellemzően <code>UnicodeDecodeError</code>-t ad. ASCII-ban ékezetes betű egyáltalán nem írható ki. A fájl ép: <code>encoding=\"utf-8\"</code>-cal helyesen olvasható."
    },
    {
      type: "single",
      q: "Mi történik: <code>f = open(\"x.txt\", \"w\", encoding=\"utf-8\"); f.writeline(\"első sor\")</code>?",
      options: [
        "<code>AttributeError</code>: a fájlobjektumnak nincs <code>writeline</code> metódusa.",
        "Kiírja az „első sor” szöveget, és sorvégét tesz utána.",
        "Kiírja az „első sor” szöveget sorvége nélkül.",
        "<code>UnicodeEncodeError</code> az ékezetes „e” miatt."
      ],
      answer: 0,
      hint: "Az előadás diáján szerepel egy ilyen metódus – de létezik-e valóban?",
      explain: "<code>writeline</code> nincs (a dia elírása). Teljes sor kiírása: <code>f.write(\"első sor\\n\")</code>, több soré: <code>f.writelines([...])</code> – ez sem tesz magától sorvégét. UTF-8-ban az ékezet nem okoz hibát."
    }
  ]
};

QUIZZES["l11-lepes9"] = {
  title: "Mini-kvíz – SQL API",
  questions: [
    {
      type: "match",
      q: "Párosítsd a hívást a szerepével!",
      pairs: [
        ["<code>con = sqlite3.connect(\"ujdb.db\")</code>", "kapcsolat megnyitása az adatbázissal"],
        ["<code>cmd = con.cursor()</code>", "parancsobjektum (kurzor) létrehozása"],
        ["<code>cmd.executemany(sql, sorok)</code>", "ugyanaz a DML-parancs sok paraméter-sorral"],
        ["<code>con.commit()</code>", "a módosítások véglegesítése"],
        ["<code>cmd.fetchone()</code>", "a lekérdezés következő eredménysora (a végén None)"]
      ],
      hint: "Gondold végig a sorrendet: kapcsolat → kurzor → végrehajtás → véglegesítés / eredmény olvasása.",
      explain: "A kapcsolat az erőforrás, a kurzor hajtja végre a parancsokat és olvassa az eredményt. Az <code>executemany</code> egy SQL-t sokszor futtat (pl. tuple-listából), a <code>commit</code> nélkül a módosítás elvész, a <code>fetchone</code> soronként lép, a végén <code>None</code>-t ad."
    },
    {
      type: "single",
      q: "Miért írjuk így: <code>cmd.execute(\"select * from persons where name = ?\", (nev,))</code>, és nem string-összefűzéssel?",
      options: [
        "Mert így a beírt érték mindig csak adat, sosem SQL-kód – ez véd az SQL-injekció ellen.",
        "Mert az sqlite3 egyáltalán nem fogad el összefűzött SQL-szöveget.",
        "Mert a helyőrző automatikusan commitot is végez.",
        "Mert így a lekérdezés eredménye DataFrame lesz."
      ],
      answer: 0,
      hint: "Mi történt a leckében, amikor a „név” ez volt: x' OR '1'='1 ?",
      explain: "Összefűzéssel a <code>x' OR '1'='1</code> bemenet a feltételt mindig igazzá tette, és mind a 10 sort visszaadta. Paraméterrel 0 találat lett, mert a szöveg csak értékként került a lekérdezésbe. Az összefűzött SQL-t az sqlite3 elfogadja – épp ez a veszély. Commitot és DataFrame-et a helyőrző nem ad."
    },
    {
      type: "single",
      q: "Az előadás sqlite-os sora: <code>cmd.executemany(\"insert into persons(name, age, score) values (:1, :2, :3)\", table)</code>, ahol a <code>table</code> tuple-ök listája. Mi a helyzet vele?",
      options: [
        "Python 3.12-ben figyelmeztetéssel lefut, 3.14-ben ProgrammingError; tuple-höz <code>?</code> helyőrző kell.",
        "Minden Python-verzióban hibátlanul működik, ez az sqlite3 szabványos jelölése.",
        "Soha nem fut le, mert az sqlite3 nem ismeri az executemany-t.",
        "Lefut, de csak az első sort szúrja be."
      ],
      answer: 0,
      hint: "A :név alakú helyőrző névvel jelölt paramétert jelent. Mit kell ilyenkor átadni – szótárt vagy tuple-t?",
      explain: "A <code>:1</code> Oracle-ben pozíciós helyőrző, sqlite3-ban viszont névvel jelöltnek számít, amihez szótár kellene. Tuple-lel Python 3.12 <code>DeprecationWarning</code>-ot ad, 3.14 <code>sqlite3.ProgrammingError</code>-t. Javítás: <code>values (?, ?, ?)</code>."
    }
  ]
};

QUIZZES["l11-lepes11"] = {
  title: "Mini-kvíz – loc, iloc, at, iat",
  questions: [
    {
      type: "single",
      q: "Mit ír ki?<pre><code class=\"language-python\">s = pd.DataFrame({'x': [10, 20, 30, 40]}, index=[3, 2, 1, 0])\nprint(s.loc[1, 'x'], s.iloc[1, 0])</code></pre>",
      options: ["<code>30 20</code>", "<code>20 20</code>", "<code>30 30</code>", "<code>20 30</code>"],
      answer: 0,
      hint: "A loc a címkét (index értékét) keresi, az iloc a pozíciót (0-tól).",
      explain: "Az 1-es <em>címkéjű</em> sor a harmadik sor (értéke 30); az 1-es <em>pozíciójú</em> sor a második (címkéje 2, értéke 20). Számcímkéknél a kettő könnyen összekeveredik – különösen rendezés vagy szűrés után."
    },
    {
      type: "single",
      q: "Mi a típusa a <code>df[['Nev']]</code> kifejezésnek?",
      options: ["DataFrame (egy oszloppal)", "Series", "lista", "szótár"],
      answer: 0,
      hint: "Mi van a külső szögletes zárójelen belül: egy szöveg vagy egy lista?",
      explain: "A belső <code>['Nev']</code> egy oszlopnév-lista, ezért az eredmény DataFrame – akkor is, ha egyetlen oszlopa van. A <code>df['Nev']</code> (egy zárójel) adna Series-t."
    },
    {
      type: "single",
      q: "A <code>df</code> sorcímkéi <code>'A'</code>, <code>'B'</code>, <code>'C'</code>. Hány sort ad a <code>df.loc['A':'B']</code>, és hányat a <code>df.iloc[0:1]</code>?",
      options: ["2 és 1", "1 és 1", "2 és 2", "1 és 2"],
      answer: 0,
      hint: "Melyik szeletelés tartalmazza a záró határt?",
      explain: "A címkés szelet (<code>loc</code>) a záró címkét is tartalmazza: A és B, 2 sor. A pozíciós szelet (<code>iloc</code>) a Python-listákhoz hasonlóan nem: csak a 0. sor."
    }
  ]
};

QUIZZES["l11-lepes13"] = {
  title: "Mini-kvíz – Szűrés és csoportképzés",
  questions: [
    {
      type: "single",
      q: "Melyik kifejezés adja helyesen az északi régió legalább 2 darabos tételeit?",
      options: [
        "<code>t[(t['regio'] == 'North') &amp; (t['db'] &gt;= 2)]</code>",
        "<code>t[t['regio'] == 'North' and t['db'] &gt;= 2]</code>",
        "<code>t[t['regio'] == 'North' &amp; t['db'] &gt;= 2]</code>",
        "<code>t[(t['regio'] == 'North') + (t['db'] &gt;= 2)]</code>"
      ],
      answer: 0,
      hint: "Series-en az and/or nem működik; az & pedig erősebben köt, mint a ==.",
      explain: "Az <code>and</code> egyetlen igaz/hamis értéket várna, ezért <code>ValueError: The truth value of a Series is ambiguous</code>. Zárójel nélkül az <code>&amp;</code> előbb a <code>'North' &amp; t['db']</code>-t számolná → <code>TypeError</code>. A <code>+</code> logikai Series-eken „vagy”-ként viselkedne, nem „és”-ként."
    },
    {
      type: "single",
      q: "<code>df = pd.DataFrame({'r': ['A', 'B', 'A', 'B', 'A'], 'v': [1, 2, 3, 4, 5]})</code>. Mit ad <code>df.groupby('r')['v'].sum()</code>?",
      options: ["A: 9, B: 6", "A: 3, B: 2", "A: 3, B: 3", "A: 15, B: 15"],
      answer: 0,
      hint: "Válogasd szét a v értékeket az r szerint, és csoportonként add össze őket.",
      explain: "Az A-csoport értékei 1, 3, 5 (összeg 9), a B-é 2, 4 (összeg 6). Az „A: 3, B: 2” a <code>count</code>, az „A: 3, B: 3” a <code>mean</code> eredménye lenne, a 15 a teljes összeg csoportosítás nélkül."
    },
    {
      type: "single",
      q: "A West régióban 3 tétel van 2 különböző kosárból. Melyik összesítő adja a <strong>vásárlások</strong> (kosarak) számát?",
      options: [
        "<code>groupby('regio')['kosar'].nunique()</code> → 2",
        "<code>groupby('regio')['kosar'].count()</code> → 3",
        "<code>groupby('regio')['ertek'].sum()</code>",
        "<code>groupby('regio')['kosar'].size()</code> → 3"
      ],
      answer: 0,
      hint: "Egy kosárnak több tétele (sora) is lehet. Sorokat vagy különböző azonosítókat akarsz számolni?",
      explain: "A <code>count</code> a sorokat (tételeket) számolja: 3. A <code>nunique</code> a különböző kosárazonosítókat: 2 – ez kell. Ezért szerepel Gyak3-ban a <code>purchase_count=(\"transaction_id\", \"nunique\")</code>. Az összeg bevételt ad, nem darabszámot."
    }
  ]
};

QUIZZES["l11-vegso"] = {
  title: "Ellenőrző kvíz – Adatelemzési alapok Pythonban",
  questions: [
    {
      type: "single",
      q: "Mit ír ki?<pre><code class=\"language-python\">s = [\"T1\", \"T2\", \"T3\"]\nprint(s.pop(0), s)</code></pre>",
      options: ["<code>T1 ['T2', 'T3']</code>", "<code>T3 ['T1', 'T2']</code>", "<code>T1 ['T1', 'T2', 'T3']</code>", "<code>0 ['T2', 'T3']</code>"],
      answer: 0,
      hint: "A pop argumentuma a pozíció. Mit ad vissza a pop, és mi marad a listában?",
      explain: "A <code>pop(0)</code> a 0. pozíciójú elemet adja vissza és távolítja el. Argumentum nélkül az utolsót (T3) venné ki. A pop nem a pozíciót adja vissza, hanem az elemet, és ténylegesen módosítja a listát."
    },
    {
      type: "single",
      q: "Mit ír ki a <code>print(type({}).__name__)</code>?",
      options: ["<code>dict</code>", "<code>set</code>", "<code>list</code>", "<code>tuple</code>"],
      answer: 0,
      hint: "Az üres kapcsos zárójel két szerkezetnek is a jele lehetne. Melyik volt előbb a Pythonban?",
      explain: "Az üres <code>{}</code> szótár. Üres halmazt csak <code>set()</code>-tel lehet létrehozni. Elemekkel már egyértelmű: <code>{1, 2}</code> halmaz, <code>{1: 'a'}</code> szótár."
    },
    {
      type: "single",
      q: "Mit ír ki?<pre><code class=\"language-python\">d = {}\nfor ch in \"abca\":\n    d[ch] = d.get(ch, 0) + 1\nprint(d)</code></pre>",
      options: ["<code>{'a': 2, 'b': 1, 'c': 1}</code>", "<code>{'a': 1, 'b': 1, 'c': 1}</code>", "<code>KeyError: 'a'</code>", "<code>{'a': 2, 'b': 1, 'c': 1, 'a': 2}</code>"],
      answer: 0,
      hint: "Mit ad a get, ha a kulcs még nincs a szótárban? És szerepelhet-e egy kulcs kétszer?",
      explain: "Az első előfordulásnál a <code>get(ch, 0)</code> 0-t ad, így nincs <code>KeyError</code> (az a <code>d[ch] + 1</code> alaknál jönne). Az <code>'a'</code> kétszer fordul elő, ezért 2. Egy kulcs csak egyszer lehet a szótárban."
    },
    {
      type: "single",
      q: "Mi az eredménye: <code>sorted([(3, 4), (7, 1), (4, 9)], key=lambda x: -x[1])</code>?",
      options: ["<code>[(4, 9), (3, 4), (7, 1)]</code>", "<code>[(7, 1), (3, 4), (4, 9)]</code>", "<code>[(3, 4), (4, 9), (7, 1)]</code>", "<code>[(7, 1), (4, 9), (3, 4)]</code>"],
      answer: 0,
      hint: "A kulcs a pár második elemének ellentettje. Növekvő -x[1] = csökkenő x[1].",
      explain: "A második elemek: 4, 1, 9. A <code>-x[1]</code> szerint növekvő sorrend a második elem szerint csökkenő: 9, 4, 1. A második opció a második elem szerint növekvő, a harmadik az első elem szerint növekvő, a negyedik az első elem szerint csökkenő sorrend."
    },
    {
      type: "single",
      q: "Mit ír ki?<pre><code class=\"language-python\">def gen():\n    yield 1\n    yield 2\n\ng = gen()\nprint(list(g), list(g))</code></pre>",
      options: ["<code>[1, 2] []</code>", "<code>[1, 2] [1, 2]</code>", "<code>[1] [2]</code>", "<code>StopIteration</code>"],
      answer: 0,
      hint: "Hányszor járható be ugyanaz a generátorobjektum?",
      explain: "A generátor egyszer járható be: az első <code>list(g)</code> kimeríti, a második már üres listát ad. A <code>list</code> (és a <code>for</code>) csendben kezeli a <code>StopIteration</code>-t, ezért nincs hiba. Újra bejáráshoz új generátor kell: <code>list(gen())</code>."
    },
    {
      type: "single",
      q: "Mit ír ki a <code>B().foo()</code> hívás?<pre><code class=\"language-python\">class A:\n    def foo(self):\n        print(\"apple\")\n\nclass B(A):\n    def foo(self):\n        super().foo()\n        print(\"tree\")</code></pre>",
      options: ["<code>apple</code>, majd <code>tree</code>", "csak <code>tree</code>", "<code>tree</code>, majd <code>apple</code>", "csak <code>apple</code>"],
      answer: 0,
      hint: "A B felülírja a foo-t, de a törzsében először mit hív meg?",
      explain: "A <code>B.foo</code> először az ős (<code>A</code>) <code>foo</code>-ját hívja a <code>super()</code>-rel – ez kiírja az <code>apple</code>-t –, majd a saját sorát, a <code>tree</code>-t. A <code>super()</code> nélkül csak <code>tree</code> lenne."
    },
    {
      type: "single",
      q: "<code>plt.hist([1, 2, 2, 3, 3, 3, 4, 4, 4, 4], bins=3)</code> – mennyi az egyes osztályok gyakorisága?",
      options: ["<code>[1, 2, 7]</code>", "<code>[1, 2, 3]</code>", "<code>[3, 3, 4]</code>", "<code>[1, 5, 4]</code>"],
      answer: 0,
      hint: "Határok: 1, 2, 3, 4. Az osztályok balról zártak, jobbról nyitottak – kivéve az utolsót.",
      explain: R`Az osztályok $[1;2)$, $[2;3)$, $[3;4]$. Az utolsó zárt, ezért a 3-asok és a 4-esek is ide esnek: $3 + 4 = 7$. Az $[1, 2, 3]$ a 4-eseket kihagyja, az $[1, 5, 4]$ a 3-asokat a középső osztályba teszi (mintha az jobbról zárt lenne).`
    },
    {
      type: "multi",
      q: "Melyik kódolással írható fájlba hiba nélkül az „ő” betű?",
      options: ["<code>utf-8</code>", "<code>cp852</code>", "<code>cp1250</code>", "<code>ascii</code>", "<code>cp1252</code>"],
      answer: [0, 1, 2],
      hint: "Az ascii csak 128 karaktert ismer. A „nyugat-európai” cp1252 német és francia betűkre készült – az ő magyar sajátosság.",
      explain: "Az UTF-8 minden Unicode-karaktert tud; a cp852 (DOS) és a cp1250 (Windows) közép-európai kódlap, bennük van az ő és az ű. Az ascii-ban semmilyen ékezetes betű nincs, a cp1252-ben az ö van, de az ő nincs – mindkettő <code>UnicodeEncodeError</code>-t ad."
    },
    {
      type: "single",
      q: "Egy pontosvesszős CSV-t <code>pd.read_csv(\"adat.csv\")</code>-vel olvasol be, és a <code>shape</code> <code>(6945, 1)</code>. Mi a teendő?",
      options: [
        "Add meg az elválasztót: <code>sep=\";\"</code>.",
        "Add meg a kódolást: <code>encoding=\"utf-8-sig\"</code>.",
        "Add meg, hogy nincs fejléc: <code>header=None</code>.",
        "Semmi, a CSV-k mindig egy oszlopként töltődnek be, utána kell szétvágni."
      ],
      answer: 0,
      hint: "Egyetlen oszlop jött létre, amelynek neve az egész fejlécsor. Mi alapján vágja a pandas oszlopokra a sorokat?",
      explain: "A <code>read_csv</code> alapból vesszőnél vág; pontosvesszős fájlban nincs vessző, így minden sor egyetlen mező lesz. A kódolás az ékezeteket és az első oszlopnevet érinti, a sorok száma pedig (6945) azt mutatja, hogy a fejlécet jól felismerte."
    },
    {
      type: "single",
      q: "Lefuttatod: <code>cmd.execute(\"insert into persons values ('Temp', 30, 10)\")</code>, majd <code>con.close()</code>. Újra csatlakozva hány <code>Temp</code> nevű sort találsz?",
      options: ["0", "1", "Annyit, ahányszor futtattad", "Hibát kapsz bezáráskor"],
      answer: 0,
      hint: "Mi teszi véglegessé a módosítást egy tranzakcióban?",
      explain: "<code>commit</code> nélkül a tranzakció a bezáráskor visszagörgetődik – ezt a leckében le is futtattuk: 0 sor. A <code>close</code> nem dob hibát, és nem is commitol helyetted."
    },
    {
      type: "single",
      q: "Mit ad <code>pd.DataFrame([{'a': 1, 'b': 2}, {'a': 3}])</code>?",
      options: [
        "2×2-es táblát; a második sor <code>b</code> értéke <code>NaN</code>, a <code>b</code> oszlop lebegőpontos lesz.",
        "Hibát, mert a két szótár kulcsai eltérnek.",
        "2×2-es táblát; a hiányzó érték 0 lesz.",
        "2×1-es táblát, csak a közös <code>a</code> oszloppal."
      ],
      answer: 0,
      hint: "Szótárak listájánál a kulcsok uniója vagy metszete adja az oszlopokat?",
      explain: "A kulcsok uniója lesz az oszloplista; ami egy sorból hiányzik, az hiányzó érték (<code>NaN</code>). Mivel a <code>NaN</code> lebegőpontos, a <code>b</code> oszlop <code>float64</code> lesz (2.0 és NaN). A pandas sosem pótol magától 0-val – az hamis adat lenne."
    },
    {
      type: "single",
      q: "<code>d = pd.DataFrame({'a': [1]})</code>, majd <code>d.rename(columns={'a': 'b'})</code>. Mi lesz <code>d.columns.tolist()</code>?",
      options: ["<code>['a']</code>", "<code>['b']</code>", "<code>['a', 'b']</code>", "<code>None</code>"],
      answer: 0,
      hint: "A rename alapból módosítja az eredetit, vagy új objektumot ad vissza?",
      explain: "A <code>rename</code> új DataFrame-et ad vissza; ha nem mented el (<code>d = d.rename(…)</code>) és nincs <code>inplace=True</code>, a <code>d</code> változatlan. <code>None</code> akkor lenne, ha <code>d = d.rename(…, inplace=True)</code>-t írnál."
    },
    {
      type: "single",
      q: "A tételtábla <code>kosar</code> és <code>ertek</code> oszloppal adott. Melyik kifejezés adja az <strong>átlagos kosárértéket</strong>?",
      options: [
        "<code>t.groupby('kosar')['ertek'].sum().mean()</code>",
        "<code>t['ertek'].mean()</code>",
        "<code>t.groupby('kosar')['ertek'].mean().sum()</code>",
        "<code>t['ertek'].sum() / len(t)</code>"
      ],
      answer: 0,
      hint: "Előbb kell egy kosáronkénti összeg, és annak az átlaga. Mi az átlag alapegysége: a tétel vagy a kosár?",
      explain: R`Előbb kosaranként összegzünk (kosárérték), majd ezek átlagát vesszük – a leckében $12\,450 / 4 = 3112{,}5$. A <code>t['ertek'].mean()</code> és a <code>sum() / len(t)</code> a <em>tételek</em> átlaga ($12\,450 / 8 = 1556{,}25$). A harmadik opció a kosáronkénti tételátlagokat adja össze – értelmetlen mennyiség.`
    },
    {
      type: "single",
      q: "Mit csinál: <code>pd.read_excel('hallgatok.xlsx', sheet_name=1, usecols=['Nev', 'Atlag'], nrows=50)</code>?",
      options: [
        "A második munkalapról a Nev és Atlag oszlop első 50 adatsorát olvassa be.",
        "Az első munkalapról a Nev és Atlag oszlop első 50 sorát olvassa be.",
        "A második munkalapról minden oszlopot beolvas, de csak 50 sort.",
        "Az 1. sort használja fejlécként, és 50 munkalapot olvas be."
      ],
      answer: 0,
      hint: "A sheet_name számként 0-tól számol. Mire vonatkozik a usecols, és mire az nrows?",
      explain: "A <code>sheet_name=1</code> a 0-tól számolt index szerint a <em>második</em> munkalap. A <code>usecols</code> az oszlopokat szűkíti, az <code>nrows</code> a beolvasott adatsorok számát (a fejléc ebbe nem számít). A fejléc sorát a <code>header</code> adja meg (alapból 0)."
    }
  ]
};
