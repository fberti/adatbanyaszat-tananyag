/* Vizsgagyakorló kérdésbank – 4. lecke: hierarchikus (agglomeratív) klaszterezés, dendrogram */
BANK.push(
  {
    id: "b04-001",
    topic: "04",
    level: 1,
    ref: "04-hierarchikus-klaszterezes.html#lepes1",
    type: "single",
    q: "40 pontot klaszterezünk agglomeratív hierarchikus módszerrel. Összesen hány összevonás történik, és hány klaszter van a 25. összevonás után?",
    options: [
      "39 összevonás; 15 klaszter",
      "40 összevonás; 15 klaszter",
      "39 összevonás; 25 klaszter",
      "40 összevonás; 16 klaszter"
    ],
    answer: 0,
    hint: R`Minden összevonás eggyel csökkenti a klaszterek számát; $n$ egyelemű klaszterből indulunk, és egy marad.`,
    explain: R`$n$ pontnál $n-1=39$ összevonás kell, $m$ összevonás után $n-m=40-25=15$ klaszter van. A 40 összevonás eggyel többet számol (az utolsó után már nincs mit összevonni), a 25 klaszter az összevonások számát keveri a klaszterek számával.`
  },
  {
    id: "b04-002",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes1",
    type: "single",
    q: R`Négy pont: $P=(0;0)$, $Q=(2;2)$, $R=(3;0)$, $S=(5;5)$. Euklideszi távolsággal melyik pár vonódik össze először, és milyen magasságon?`,
    options: [
      R`$P$ és $R$, 3-as magasságon`,
      R`$Q$ és $R$, 3-as magasságon`,
      R`$Q$ és $R$, kb. 2,24-es magasságon`,
      R`$P$ és $Q$, kb. 2,83-as magasságon`
    ],
    answer: 2,
    hint: "Írd fel mind a 6 páronkénti távolságot (gyökkel!), és keresd a legkisebbet.",
    explain: R`$d(P,Q)=\sqrt8\approx2{,}83$, $d(P,R)=3$, $d(P,S)=\sqrt{50}\approx7{,}07$, $d(Q,R)=\sqrt{1+4}\approx2{,}24$, $d(Q,S)=\sqrt{18}\approx4{,}24$, $d(R,S)=\sqrt{29}\approx5{,}39$. A legkisebb $d(Q,R)$. A „3-as magasság” opciók a Manhattan-távolságból jönnek (ott $P$–$R$ és $Q$–$R$ is 3), a $P$–$Q$ pedig az, ami a rajzon „átlósan közelinek” tűnik.`
  },
  {
    id: "b04-003",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes1",
    type: "single",
    q: "A gyakorlat retail_hac_linkage.csv fájljának (120 vásárló) utolsó előtti sora: <code>234; 235; 7,652; 80</code>. Mit jelent ez a sor?",
    options: [
      "Azt, hogy a két összevont klaszter középpontja 7,652 egységre van egymástól (euklideszi távolság).",
      "A 118. összevonást: a 115. és a 116. összevonásban létrejött klaszter (234 és 235) egy 80 fős klaszterré olvad, 7,652-es magasságon.",
      "A 234-es és a 235-ös indexű vásárló összevonását 7,652-es távolságon.",
      "Azt, hogy a 234-es klaszterhez 80 új vásárló csatlakozik."
    ],
    answer: 1,
    hint: R`A $0\dots119$ indexek vásárlók; az $i$-edik (0-tól számolt) összevonás eredménye az $n+i$ azonosítót kapja. A Ward-magasság nem egyszerű távolság.`,
    explain: R`Csak 120 vásárló van (0–119), így a 234 és a 235 csomópont: $234-120=114$ és $235-120=115$ indexű összevonásban jöttek létre, azaz a 115. és a 116. összevonásban. A sor maga a 0-tól számolt 117., vagyis a 118. összevonás; a negyedik oszlop az új klaszter létszáma (80), nem a csatlakozók száma. Ward-módszernél a 7,652 a négyzetes eltérésnövekedésből számolt magasság, nem a középpontok távolsága.`
  },
  {
    id: "b04-004",
    topic: "04",
    level: 1,
    ref: "04-hierarchikus-klaszterezes.html#lepes1",
    type: "multi",
    q: "Mely állítások igazak az agglomeratív hierarchikus klaszterezés (HAC) menetére?",
    options: [
      R`Minden összevonásról feljegyzi, kit kivel, milyen magasságon vont össze, és mekkora lett az új klaszter (a $H$ lista, Pythonban a Z mátrix).`,
      "Minden lépésben pontosan egy új pont csatlakozik egy meglévő klaszterhez.",
      "Minden lépés után újraszámolja a klaszterközéppontokat, és a pontokat a legközelebbihez sorolja át.",
      R`Kezdetben $n$ pontból $n$ egyelemű klaszter van.`,
      "Egy későbbi lépésben két többelemű klaszter is összeolvadhat."
    ],
    answer: [0, 3, 4],
    hint: "Klasztereket von össze vagy pontokat? Mozognak-e a pontok a HAC-ban?",
    explain: "A HAC klasztereket von össze: egy pont csatlakozhat klaszterhez, de két többelemű klaszter is összeolvadhat (a gyakorlaton pl. 234 + 235). Az összevonások naplója a Z mátrix: bal és jobb csomópont, magasság, létszám. A pontok nem mozognak, nincs középpont-frissítés és átsorolás – az a K-means."
  },
  {
    id: "b04-005",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes2",
    type: "single",
    q: R`Két klaszter a síkon: $A=\{(0;0),\,(0;2)\}$, $B=\{(3;0),\,(3;4)\}$. Mennyi az <em>average</em> kapcsolási távolságuk (euklideszi távolsággal)?`,
    options: ["5", "kb. 3,80", "kb. 3,16", "3"],
    answer: 1,
    hint: R`Mind a $|A|\cdot|B|=4$ pontpár távolsága kell, és ezek átlaga.`,
    explain: R`Pártávolságok: $3$, $5$, $\sqrt{13}\approx3{,}61$, $\sqrt{13}\approx3{,}61$; átlaguk $\approx3{,}80$. A 3,16 a két klaszterközéppont, $(0;1)$ és $(3;2)$ távolsága ($\sqrt{10}$) – ez a centroid kapcsolás, nem az average. A 3 a single (min), az 5 a complete (max).`
  },
  {
    id: "b04-006",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes2",
    type: "single",
    q: "Pontok egy egyenesen: 0, 2, 3, 7, 12. Milyen összevonási magasságokat ad a <em>complete</em> kapcsolás (sorrendben)?",
    options: ["1; 2,5; 5; 7,83", "1; 2; 5; 12", "1; 3; 5; 12", "1; 2; 4; 5"],
    answer: 2,
    hint: "Minden lépésben a klaszterpárok legtávolabbi pontpárját vedd, és a legkisebb ilyen értékű pár nyer.",
    explain: R`$\{2,3\}$ @1. Jelöltek: $0$–$\{2,3\}$: $\max(2;3)=3$; $7$–$\{2,3\}$: 5; $7$–$12$: 5 → $\{0,2,3\}$ @3. Jelöltek: $7$–$12$: 5; $7$–$\{0,2,3\}$: 7 → $\{7,12\}$ @5. Végül $\max=|0-12|=12$. Az „1; 2; 4; 5” a single, az „1; 2,5; 5; 7,83” az average eredménye; az „1; 2; 5; 12” a második lépésben minimummal számol – keveri a két módszert.`
  },
  {
    id: "b04-007",
    topic: "04",
    level: 3,
    ref: "04-hierarchikus-klaszterezes.html#lepes2",
    type: "single",
    q: "Pontok egy egyenesen: 2, 4, 12, 16, 25. Mi a kéttagú felosztás single, illetve complete kapcsolással?",
    options: [
      "mindkettő: {2, 4} és {12, 16, 25}",
      "single: {2, 4} és {12, 16, 25}; complete: {2, 4, 12, 16} és {25}",
      "mindkettő: {2, 4, 12, 16} és {25}",
      "single: {2, 4, 12, 16} és {25}; complete: {2, 4} és {12, 16, 25}"
    ],
    answer: 3,
    hint: R`Az első két összevonás ($\{2,4\}$ és $\{12,16\}$) mindkét módszernél ugyanaz. A harmadiknál hasonlítsd össze: $\{2,4\}$–$\{12,16\}$ vagy $\{12,16\}$–$\{25\}$?`,
    explain: R`Mindkét módszer: $\{2,4\}$ @2, $\{12,16\}$ @4. Single: $\{2,4\}$–$\{12,16\}$: $\min=8$, $\{12,16\}$–$25$: $\min=9$ → a 8 nyer, $\{2,4,12,16\}$ @8, a 25 magában marad (láncolódás: a legtávolabbi pont válik le). Complete: $\{2,4\}$–$\{12,16\}$: $\max=14$, $\{12,16\}$–$25$: $\max=13$ → a 13 nyer, $\{12,16,25\}$ @13, így $\{2,4\}$ és $\{12,16,25\}$. A „mindkettő” opciók azt feltételezik, hogy a kapcsolás nem számít; a felcserélt opció a min/max szerepét keveri.`
  },
  {
    id: "b04-008",
    topic: "04",
    level: 1,
    ref: "04-hierarchikus-klaszterezes.html#lepes2",
    type: "match",
    q: "Párosítsd a kapcsolási módokat a jellemző viselkedésükkel!",
    pairs: [
      ["single", "láncolódásra hajlamos: egyetlen közeli „hídpont” két csoportot összeránthat"],
      ["complete", "tömör, hasonló átmérőjű klaszterek; érzékeny a kiugró pontokra"],
      ["average (UPGMA)", "a két szélsőség közötti kompromisszum"],
      ["ward", "kiegyensúlyozott méretű, gömbszerű klaszterek; az SSE legkisebb növekedése"]
    ],
    hint: "Melyik módszernél dönt egyetlen pontpár, melyiknél a legtávolabbi pont, és melyik épít a K-means célfüggvényére?",
    explain: "Single: elég egy közeli pontpár, ezért láncot épít. Complete: a legtávolabbi pontpár dönt, így tömör klasztereket ad, de egy kiugró pont sokat számít. Average: minden pontpár átlaga. Ward: az SSE-növekedés méretszorzója miatt a nagy klaszterek összevonása drága, ezért kiegyensúlyozott, gömbszerű csoportokat kedvel."
  },
  {
    id: "b04-009",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes3",
    type: "single",
    q: R`Mennyi a Ward-féle növekedés, $\Delta(\{2,4,6\},\{11\})$?`,
    options: ["36,75", "49", "44,75", "24,5"],
    answer: 0,
    hint: R`$\Delta=\frac{|A|\cdot|B|}{|A|+|B|}\lVert\bar a-\bar b\rVert^2$, vagy $\mathrm{SSE}(A\cup B)-\mathrm{SSE}(A)-\mathrm{SSE}(B)$.`,
    explain: R`Középpontok 4 és 11: $\frac{3\cdot1}{4}\cdot7^2=36{,}75$. Ellenőrzés: $\{2,4,6,11\}$ átlaga 5,75, $\mathrm{SSE}=44{,}75$; $\mathrm{SSE}(\{2,4,6\})=8$; $44{,}75-8-0=36{,}75$. A 49 a méretszorzó nélküli $d^2$, a 44,75 elfelejti levonni $\mathrm{SSE}(A)$-t, a 24,5 az egyelemű esetre érvényes $d^2/2$-t alkalmazza.`
  },
  {
    id: "b04-010",
    topic: "04",
    level: 3,
    ref: "04-hierarchikus-klaszterezes.html#lepes3",
    type: "single",
    q: "Két összevonási lehetőség: (a) két ötelemű klaszter, középpontjaik 2 egységre vannak; (b) két egyelemű klaszter, 4 egységre egymástól. Melyiket választja a Ward-módszer?",
    options: [
      R`(a)-t, mert $\Delta_a=2^2=4\lt\Delta_b=4^2=16$`,
      "(a)-t, mert a Ward a nagyobb klaszterek összevonását részesíti előnyben",
      R`(b)-t, mert $\Delta_b=\frac{1\cdot1}{2}\cdot16=8\lt\Delta_a=\frac{5\cdot5}{10}\cdot4=10$`,
      "(a)-t, mert a középpontjaik közelebb vannak (2 &lt; 4)"
    ],
    answer: 2,
    hint: R`Ne felejtsd el a $\frac{|A||B|}{|A|+|B|}$ méretszorzót.`,
    explain: R`A Ward a $\Delta$-t minimalizálja, és abban a méret is számít: (a) $2{,}5\cdot4=10$, (b) $0{,}5\cdot16=8$ → (b). A középpont-távolság szerinti döntés (centroid-szemlélet) és a csak $d^2$-tel számolt $\Delta$ is (a)-t adná. A Ward éppen ellenkezőleg: azonos távolságnál a kis klaszterek összevonása olcsóbb.`
  },
  {
    id: "b04-011",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes3",
    type: "single",
    q: R`A scipy Ward-magassága $h=\sqrt{2\Delta}$. Mekkora magasságon jelenik meg a dendrogramon a $\{1,3\}$ és a $\{8\}$ klaszter összevonása?`,
    options: ["48", "kb. 6,93", "24", "6"],
    answer: 1,
    hint: R`Előbb a $\Delta$: középpontok 2 és 8, méretek 2 és 1.`,
    explain: R`$\Delta=\frac{2\cdot1}{3}\cdot6^2=24$, $h=\sqrt{48}\approx6{,}93$. A 24 maga a $\Delta$ (nem a magasság), a 6 a középpontok távolsága, a 48 a $2\Delta$ gyökvonás nélkül. Csak egyelemű klasztereknél esik egybe $h$ a pontok távolságával.`
  },
  {
    id: "b04-012",
    topic: "04",
    level: 1,
    ref: "04-hierarchikus-klaszterezes.html#lepes3",
    type: "multi",
    q: "Mely állítások igazak a Ward-módszerre?",
    options: [
      "Euklideszi távolsággal használjuk, mert a négyzetes eltérésösszegre épül.",
      "Azonos középpont-távolságnál két nagy klaszter összevonása „drágább”, mint két kicsié.",
      "A dendrogram magassága nem két vásárló vagy két középpont egyszerű távolsága, de a sorrend és az ugrások ugyanúgy olvashatók.",
      "Mivel a célfüggvénye a K-means-éval rokon, mindig pontosan ugyanazt a felosztást adja, mint a K-means.",
      "Csak a Python-implementációkban létezik, klasszikus statisztikai programokban nem."
    ],
    answer: [0, 1, 2],
    hint: "Gondolj a Δ képlet méretszorzójára, és arra, hogy a Ward mohó algoritmus.",
    explain: "A Ward a K-means célfüggvényéhez hasonló SSE-t használ, de mohón von össze, és nem bont vissza, így az eredménye eltérhet (a gyakorlat adatán történetesen egyezett). Ward 1963-ban publikálta, a legtöbb statisztikai programban elérhető – az órai „csak Pythonban” megjegyzés pontatlan."
  },
  {
    id: "b04-013",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes4",
    type: "single",
    q: "Nyolc pont dendrogramjának összevonási magasságai: 0,2; 0,4; 0,5; 0,7; 3,1; 3,6; 4,9. Hány klasztert javasol a legnagyobb rés szabálya, és hol vágsz?",
    options: [
      "4 klaszter, vágás kb. 1,9-nél",
      "2 klaszter, vágás kb. 4,25-nél",
      "3 klaszter, vágás kb. 3,35-nél",
      "5 klaszter, vágás kb. 0,6-nál"
    ],
    answer: 0,
    hint: "Számold ki az egymást követő magasságok különbségét; a vágás a legnagyobb rés közepén van, és a klaszterszám = n − (alatta lévő összevonások száma).",
    explain: R`Rések: 0,2; 0,1; 0,2; 2,4; 0,5; 1,3. A legnagyobb a 0,7 → 3,1 közötti, vágás $\frac{0{,}7+3{,}1}{2}=1{,}9$-nél. Alatta 4 összevonás van → $8-4=4$ klaszter. A 2 klaszter a második legnagyobb rést (1,3) választja, vagy azt hiszi, hogy a legfelső összevonás alatt kell vágni; a 3 és 5 klaszteres opció kis réseket jelöl.`
  },
  {
    id: "b04-014",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#alkalmazas",
    type: "single",
    q: R`A gyakorlat 02_hac_k.py szkriptje (n = 120):<pre><code>lower = float(Z[n-k-1, 2])
upper = float(Z[n-k, 2])</code></pre>Melyik Z-elem a <code>lower</code> k = 3 esetén, és mennyi az értéke?`,
    options: [
      "Z[116, 3] = 40",
      "Z[3, 2] – a harmadik összevonás magassága",
      "Z[116, 2] = 4,165",
      "Z[117, 2] = 7,652"
    ],
    answer: 2,
    hint: "A 2-es oszlop a magasság, a 3-as a létszám. k klaszterhez n − k összevonás kell, és a Z 0-tól indexelt.",
    explain: R`$n-k-1=116$, tehát <code>Z[116, 2]</code>: a 117. (azaz $n-k$-adik) összevonás magassága, 4,165 – ez a k_comparison tábla k = 3 sorának lower_height értéke. A Z[117, 2] = 7,652 az upper (a következő összevonás); a 3-as oszlop a létszám, nem magasság; a Z[3, 2] alulról számol, holott $k$ klaszterhez felülről kell visszalépni.`
  },
  {
    id: "b04-015",
    topic: "04",
    level: 1,
    ref: "04-hierarchikus-klaszterezes.html#alkalmazas",
    type: "match",
    q: "Párosítsd a gyakorlatban használt függvényeket azzal, amit visszaadnak/csinálnak!",
    pairs: [
      ["linkage(X, method=\"ward\", metric=\"euclidean\")", "a teljes hierarchia: az (n − 1) × 4-es Z mátrix"],
      ["dendrogram(Z, ...)", "az összevonások fáját rajzolja ki"],
      ["cut_tree(Z, n_clusters=[k])", "címkék adott klaszterszámra"],
      ["fcluster(Z, t=h, criterion=\"distance\")", "címkék a h magasságú vágásból"],
      ["silhouette_samples(X, labels)", "vásárlónkénti silhouette-értékek"]
    ],
    hint: "Az egyik a fát építi, egy rajzol, kettő címkét ad (más-más bemenettel), egy pedig pontonként értékel.",
    explain: "A linkage egyetlen hívással elvégzi mind a 119 összevonást. A cut_tree k-t, az fcluster(…, criterion=\"distance\") magasságot kap – pozitív résnél ugyanazt adják. A silhouette_samples pontonként számol (a silhouette_score ezek átlaga), a gyakorlat a standardizált térben."
  },
  {
    id: "b04-016",
    topic: "04",
    level: 3,
    ref: "04-hierarchikus-klaszterezes.html#lepes4",
    type: "multi",
    q: "Mely állítások helyesek a dendrogram olvasásáról?",
    options: [
      "Két egymás mellé rajzolt levél mindig hasonlóbb egymáshoz, mint két távolabb rajzolt.",
      "Single kapcsolásnál a dendrogram mindig a legtisztábban mutatja a természetes klaszterszámot.",
      "Két levél hasonlóságát az mutatja, milyen magasan kapcsolódnak össze.",
      "A vágási vonalat a rés belsejébe érdemes húzni, nem pontosan egy összevonás magasságára.",
      "A legnagyobb rés csak javaslat; a választott k-t silhouette-tel és szakmai értelmezéssel ellenőrizzük."
    ],
    answer: [2, 3, 4],
    hint: "Gondolj a lecke buktatóira: levelek sorrendje, vágás helye, vizsgált k-tartomány, láncolódás.",
    explain: "Egy összevonás magasságán húzott vonal vízszintes szakaszon futna, és nem egyértelmű a metszett ágak száma. A levelek vízszintes sorrendje nem távolság, csak a találkozás magassága számít. A single láncolódása gyakran elmossa a szerkezetet: a kézi példában a magasságok 1, 2, 3, 4 – nincs kiugró rés. A gyakorlaton szemre 3, számolva 2 klaszter adódott – ilyenkor a silhouette és az értelmezés dönt."
  },
  {
    id: "b04-017",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes4",
    type: "single",
    q: "Két klaszter egy egyenesen: {2, 3, 5} és {9, 14}. Mennyi a 9-es pont silhouette-értéke?",
    options: ["kb. −0,12", "kb. 0,88", "kb. 0,67", "kb. 0,12"],
    answer: 3,
    hint: R`$a$: távolság a saját klaszter <em>többi</em> pontjától (itt csak a 14); $b$: átlagos távolság a másik klaszter pontjaitól.`,
    explain: R`$a=|9-14|=5$, $b=\frac{7+6+4}{3}\approx5{,}67$, $s=\frac{5{,}67-5}{5{,}67}\approx0{,}12$ – pozitív, de közel a határhoz. A $-0{,}12$ felcserélt $a$ és $b$, a 0,88 az $a/b$ hányados (a jegyzetbeli tévképlet), a 0,67 a nem osztott $b-a$.`
  },
  {
    id: "b04-018",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes4",
    type: "single",
    q: "Egy 100 pontos felosztás három klaszterének mérete 50, 30 és 20, átlagos silhouette-jük 0,62, 0,80 és 0,45. Mennyi a teljes felosztás silhouette-mutatója?",
    options: ["0,45", "0,64", "kb. 0,62", "0,80"],
    answer: 1,
    hint: "A silhouette-mutató a pontonkénti értékek átlaga – a klaszterátlagokat a létszámmal kell súlyozni.",
    explain: R`$0{,}5\cdot0{,}62+0{,}3\cdot0{,}80+0{,}2\cdot0{,}45=0{,}31+0{,}24+0{,}09=0{,}64$. A 0,62 a három klaszterátlag súlyozatlan átlaga (0,623) – ez csak egyforma klaszterméretnél lenne helyes. A 0,80 és a 0,45 egy-egy klaszter értéke. (A gyakorlaton ugyanígy: $\frac{80}{120}\cdot0{,}701+\frac{40}{120}\cdot0{,}744\approx0{,}7155$.)`
  },
  {
    id: "b04-019",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#lepes5",
    type: "single",
    q: "50 000 vásárlót akarunk HAC-cal klaszterezni. Kb. mennyi memória kell a (fél) távolságmátrixhoz, ha egy szám 8 bájt?",
    options: ["kb. 1,25 GB", "kb. 400 kB", "kb. 10 GB", "kb. 20 GB"],
    answer: 2,
    hint: R`Elemszám: $\frac{n(n-1)}{2}$, aztán szorozd a bájtszámmal.`,
    explain: R`$\frac{50\,000\cdot49\,999}{2}\approx1{,}25\cdot10^9$ elem, $\cdot8$ bájt $\approx10$ GB. A 20 GB a teljes $n^2$-es mátrix (a szimmetria kihasználása nélkül), az 1,25 GB az elemszámot bájtnak veszi (kb. $1{,}25\cdot10^9$ elem, a 8 bájtos szorzó nélkül), a 400 kB csak $n\cdot8$ bájt. Ezért nagy adatra a K-means a praktikus.`
  },
  {
    id: "b04-020",
    topic: "04",
    level: 3,
    ref: "04-hierarchikus-klaszterezes.html#lepes5",
    type: "single",
    q: "Egy üzletlánc 10 millió tranzakciós sorából 300 üzletét szeretné csoportosítani forgalmi jellemzők alapján, és a csoportok egymásba ágyazódása is érdekli. Melyik a jó megközelítés?",
    options: [
      "Csak K-means jöhet szóba, mert 10 millió sorra a HAC távolságmátrixa nem fér el a memóriában.",
      "HAC közvetlenül a 10 millió tranzakciós soron, standardizálás nélkül, mert a HAC nem skálaérzékeny.",
      "HAC-ot nem lehet használni, mert nem tudjuk előre a klaszterszámot.",
      "Üzletenként aggregálni (egy sor = egy üzlet), standardizálni, majd HAC + dendrogram – 300 objektumra a távolságmátrix kicsi."
    ],
    answer: 3,
    hint: "Mik a klaszterezendő objektumok – a tranzakciók vagy az üzletek? (Lásd a 3. lecke aggregálási lépését.)",
    explain: R`A klaszterezés objektumai az üzletek, ezért előbb aggregálunk; így $n=300$, a távolságmátrix $\frac{300\cdot299}{2}=44\,850$ elemű – semmiség. A „csak K-means” opció a nyers sorszámmal érvel, pedig nem a tranzakciókat csoportosítjuk. A HAC is távolságra épül, ezért standardizálni kell; és a klaszterszámot éppen nem kell előre tudni, a dendrogramról utólag választjuk.`
  },
  {
    id: "b04-021",
    topic: "04",
    level: 1,
    ref: "04-hierarchikus-klaszterezes.html#lepes5",
    type: "multi",
    q: "Mely állítások igazak a HAC és a K-means összevetésében?",
    options: [
      "HAC-nál a fő döntés a kapcsolási mód és a távolságmérték megválasztása.",
      "Single kapcsolású HAC-kal elnyújtott, láncszerű klaszterek is kijöhetnek, a K-means gömbszerűeket keres.",
      "A random_state rögzítése a K-means futását reprodukálhatóvá teszi, de a módszer maga kezdőpontfüggő marad.",
      "A HAC-hoz semmilyen paramétert nem kell megadni.",
      "A HAC-nál nem kell standardizálni, mert nem középpontokkal dolgozik."
    ],
    answer: [0, 1, 2],
    hint: "Melyik buktató szól a „paraméter nélküli” és a „standardizálás nélküli” HAC-ról?",
    explain: "A HAC-nál kapcsolási módot és távolságot kell választani, és k-t is (csak utólag). Távolságokra épül, ezért ugyanúgy skálaérzékeny, mint a K-means. A rögzített seed csak elrejti a kezdőpontfüggést: más seed más eredményt adhat."
  },
  {
    id: "b04-022",
    topic: "04",
    level: 1,
    ref: "04-hierarchikus-klaszterezes.html#lepes5",
    type: "single",
    q: R`Mit ad vissza ez a sor a gyakorlat 120 vásárlóján (X: 120 × 2-es standardizált adat)?<pre><code>AgglomerativeClustering(n_clusters=2, linkage="ward").fit_predict(X)</code></pre>`,
    options: [
      "A két klaszter középpontjait (2 × 2-es tömb).",
      "Egy illesztett modellt, amelynek predict() metódusával új vásárlók sorolhatók be.",
      "Egy 120 elemű címkevektort (0 és 1 értékekkel), vásárlónként egy klaszterszámot.",
      "A 119 × 4-es linkage-mátrixot (Z)."
    ],
    answer: 2,
    hint: "A fit_predict név második fele mit sugall? És van-e a HAC-nak besoroló szabálya új pontra?",
    explain: "A fit_predict a meglévő pontok címkéit adja (0-tól számozva). A Z mátrixot a scipy linkage adja; középpontokat az AgglomerativeClustering nem számol; predict metódusa nincs – új pontnál újrafuttatás vagy kerülőút kell (pl. a legközelebbi klaszterközéppont), és ezt a beadandóban indokolni kell."
  },
  {
    id: "b04-023",
    topic: "04",
    level: 3,
    ref: "04-hierarchikus-klaszterezes.html#alkalmazas",
    type: "single",
    q: "A gyakorlaton a Ward-HAC k = 2-es silhouette-je 0,7155, pontosan annyi, mint a K-means k = 2-es értéke a 3. gyakorlaton. Mi ennek a magyarázata?",
    options: [
      "Véletlen egybeesés: a K-means véletlen kezdőpontjai most éppen így alakultak.",
      "A két módszer ugyanazt a 80 + 40 fős felosztást adta, és a silhouette csak a felosztástól (és a távolságtól) függ, nem attól, melyik algoritmus állította elő.",
      "A Ward és a K-means célfüggvénye azonos, ezért mindig ugyanazt a silhouette-et adják.",
      "A silhouette csak a klaszterszámtól függ, k = 2-re mindig 0,7155."
    ],
    answer: 1,
    hint: R`Mi kell a silhouette kiszámításához: $a(i)$ és $b(i)$ – ezek mitől függnek?`,
    explain: "A silhouette a pontok távolságaiból és a címkékből számol; azonos felosztásra azonos érték jön ki. A gyakorlaton mind a négy kapcsolás és a K-means is ugyanazt a felosztást adta k = 2-re és k = 3-ra, mert a csoportok nagyon jól elkülönülnek. A Ward és a K-means általában eltérhet (mohó összevonás vs. átsorolás), és a silhouette k-val sem állandó."
  },
  {
    id: "b04-024",
    topic: "04",
    level: 2,
    ref: "04-hierarchikus-klaszterezes.html#alkalmazas",
    type: "single",
    q: "A gyakorlat HAC-profilja (k = 2): 1. klaszter 80 fő, átl. 6,43 vásárlás, 31 402 Ft; 2. klaszter 40 fő, átl. 15,9 vásárlás, 184 480 Ft. Hányszor annyit költ átlagosan egy 2. klaszterbeli vásárló, mint egy 1. klaszterbeli?",
    options: ["kb. 2,5-szer", "kb. 2,9-szer", "kb. 11,7-szer", "kb. 5,9-szer"],
    answer: 3,
    hint: "Az átlagos összköltéseket kell elosztani – ne a vásárlásszámot, és ne a csoport összköltését.",
    explain: R`$184\,480/31\,402\approx5{,}87$, vagyis közel hatszor annyit. A 2,5 a vásárlásszámok aránya ($15{,}9/6{,}43$), a 2,9 a klaszterek összköltésének aránya ($40\cdot184\,480 / (80\cdot31\,402)$), a 11,7 a létszámmal fordítva súlyozott arány ($2\cdot5{,}87$). A lecke szerint: kb. 2,5-szer annyi vásárlás, közel 6-szor annyi költés – törzsvásárlók.`
  },
  {
    id: "b04-025",
    topic: "04",
    level: 3,
    ref: "04-hierarchikus-klaszterezes.html#alkalmazas",
    type: "multi",
    q: "Mely állítások igazak a 4. gyakorlat eredményeire?",
    options: [
      "A legnagyobb magasságrés k = 2-nél van (12,03), és a vágás ennek közepén, kb. 13,67-nél történik.",
      "k = 2-nél egyetlen vásárló silhouette-je sem negatív; a legkisebb egyéni érték kb. 0,44.",
      "A silhouette-et a standardizált térben, a klaszterprofilt eredeti mértékegységben (db, Ft) számoltuk.",
      "Single kapcsolással a legfelső összevonás magassága is 19,68.",
      "A k = 3 rése (3,49) nagyobb, mint a k = 2-é, ezért a kód k = 3-at javasolt."
    ],
    answer: [0, 1, 2],
    hint: "Nézd a k_comparison táblát (lower/upper height, height_gap) és az összevetés-táblázat alatti megjegyzést a magasságokról.",
    explain: R`Vágás: $\frac{7{,}652+19{,}682}{2}\approx13{,}67$. A silhouette ott készül, ahol klasztereztünk (standardizált tér), a profil üzleti értelmezésre készül. A felosztások egyeztek, de a magasságok nem: single-lel a legfelső összevonás csak 0,95, Ward-dal 19,68. A k = 3 rése 3,49 &lt; 12,03 – a kód k = 2-t javasolt; a 3-at az oktató szemre olvasta le.`
  }
);
