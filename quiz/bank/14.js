/* Vizsgagyakorló kérdésbank – 14. lecke: távolság- és hasonlósági mértékek, DBSCAN, klaszter-validálás, kiugró rekordok */
BANK.push(
  {
    id: "b14-001",
    topic: "14",
    level: 1,
    ref: "14-suruseg-validalas-kiugrok.html#lepes1",
    type: "multi",
    q: "Mely függvények <strong>nem</strong> távolságok (metrikák) a definíció szerint?",
    options: [
      R`Egy dimenzióban a négyzetes eltérés, $d(x,y)=(x-y)^2$.`,
      R`A Minkowski-képlet $r=0{,}5$-tel.`,
      R`A Manhattan-távolság ($r=1$).`,
      R`A Csebisev-távolság ($r=\infty$).`,
      "Az euklideszi távolság."
    ],
    answer: [0, 1],
    hint: "Nézd meg mindegyikre a háromszög-egyenlőtlenséget egy egyszerű ponthármason, pl. 0, 1, 2 vagy (0;0), (1;0), (1;1).",
    explain: R`$(x-y)^2$: $d(0,2)=4>d(0,1)+d(1,2)=2$. Minkowski $r=0{,}5$: $d\big((0;0),(1;1)\big)=4$, a $(1;0)$-n át $1+1=2$. Mindkettő sérti a háromszög-egyenlőtlenséget. A Minkowski-család $r\ge1$ esetén (így $r=1,2,\infty$) metrika. Tipikus hiba: azt hinni, hogy a K-means négyzetes távolsága is „távolság” – a legközelebbi pont kiválasztására jó, de nem metrika.`
  },
  {
    id: "b14-002",
    topic: "14",
    level: 1,
    ref: "14-suruseg-validalas-kiugrok.html#lepes1",
    type: "single",
    q: R`Mennyi a Manhattan-, az euklideszi és a Csebisev-távolság (ebben a sorrendben) az $(1;2;3)$ és a $(4;0;9)$ pont között?`,
    options: ["11; 7; 6", "11; 49; 6", "7; 11; 6", "11; 7; 3"],
    answer: 0,
    hint: "Koordinátánkénti eltérések: 3, 2, 6. Összeg, gyök a négyzetösszegből, maximum.",
    explain: R`$3+2+6=11$; $\sqrt{9+4+36}=\sqrt{49}=7$; $\max=6$. A 49 a gyökvonás elmaradása, a 3 az első koordináta eltérése a maximum helyett, a „7; 11; 6” felcseréli a Manhattant és az euklideszit.`
  },
  {
    id: "b14-003",
    topic: "14",
    level: 2,
    ref: "14-suruseg-validalas-kiugrok.html#lepes2",
    type: "single",
    q: R`Az adatok kovarianciamátrixának inverze $\Sigma^{-1}=\begin{pmatrix}6&-4\\-4&6\end{pmatrix}$ (a két változó pozitívan korrelál). Két pontpár eltérésvektora $u=(1;1)$ és $v=(1;-1)$. Mit mondhatunk a (gyök nélküli) Mahalanobis-távolságukról?`,
    options: [
      R`$u$: 4, $v$: 20 – a korreláció irányába eső eltérés „olcsóbb”, pedig az euklideszi hosszuk azonos.`,
      R`$u$: 20, $v$: 4 – a korreláció irányába eső eltérés drágább.`,
      R`Mindkettő 2, mert az euklideszi hosszuk is azonos ($\sqrt2$).`,
      R`$u$: 12, $v$: 12 – a főátló elemeit kell összeadni.`
    ],
    answer: 0,
    hint: R`Számold ki $x^{\mathsf T}\Sigma^{-1}x=6x_1^2+6x_2^2-8x_1x_2$-t mindkét vektorra.`,
    explain: R`$u$: $6+6-8=4$; $v$: $6+6+8=20$. Az adat a $(1;1)$ irány mentén szóródik sokat, ezért arra egy egységnyi eltérés kevésbé szokatlan. Az euklideszi távolság (mindkettőre $\sqrt2$) ezt nem látja. A „12” a vegyes tag elhagyása, a fordított sorrend a $\Sigma$ és $\Sigma^{-1}$ szerepének összekeverése.`
  },
  {
    id: "b14-004",
    topic: "14",
    level: 1,
    ref: "14-suruseg-validalas-kiugrok.html#lepes2",
    type: "single",
    q: "Ha a változók korrelálatlanok (a kovarianciamátrix diagonális), mivel egyezik meg a Mahalanobis-távolság?",
    options: [
      "A standardizált (szórással osztott) változókon számolt euklideszi távolsággal.",
      "A nyers adatokon számolt Manhattan-távolsággal.",
      "A Csebisev-távolsággal.",
      "A koszinusz-hasonlósággal."
    ],
    answer: 0,
    hint: R`Diagonális $\Sigma$ inverze a varianciák reciprokaiból áll: $\sum_k (p_k-q_k)^2/\sigma_k^2$.`,
    explain: R`$\sqrt{\sum_k (p_k-q_k)^2/\sigma_k^2}=\sqrt{\sum_k \big((p_k-q_k)/\sigma_k\big)^2}$ – ez a z-pontszámokon számolt euklideszi távolság. A Mahalanobis tehát a standardizálás általánosítása, amely a korrelációt is kezeli.`
  },
  {
    id: "b14-005",
    topic: "14",
    level: 2,
    ref: "14-suruseg-validalas-kiugrok.html#lepes3",
    type: "single",
    q: R`Hat termék, két kosár: $p=(1,0,1,0,0,0)$, $q=(1,1,1,0,0,0)$. Mennyi az egyszerű egyezés (SMC) és a Jaccard-együttható?`,
    options: [
      R`$SMC\approx 0{,}833$; $J\approx 0{,}667$`,
      R`$SMC\approx 0{,}667$; $J\approx 0{,}833$`,
      R`$SMC\approx 0{,}833$; $J\approx 0{,}333$`,
      R`$SMC=0{,}5$; $J\approx 0{,}667$`
    ],
    answer: 0,
    hint: R`$M_{11}$, $M_{10}$, $M_{01}$, $M_{00}$ – a Jaccard a közös nullákat kihagyja.`,
    explain: R`$M_{11}=2$, $M_{01}=1$, $M_{10}=0$, $M_{00}=3$. $SMC=5/6\approx 0{,}833$, $J=2/3\approx 0{,}667$. A 0,333 az $M_{11}/6$, a második opció felcseréli a mértékeket, a 0,5 a közös 1-esek és közös 0-k helyett csak a közös 0-k aránya.`
  },
  {
    id: "b14-006",
    topic: "14",
    level: 1,
    ref: "14-suruseg-validalas-kiugrok.html#lepes4",
    type: "match",
    q: "Párosítsd az adattípust a legalkalmasabb szomszédsági mértékkel!",
    pairs: [
      ["vásárlói kosarak 0/1 vektorként, több ezer termék", "Jaccard-együttható"],
      ["dokumentumok szógyakoriság-vektorként, eltérő hosszal", "koszinusz-hasonlóság"],
      ["két erősen korrelált numerikus változó", "Mahalanobis-távolság"],
      ["10 igen/nem kérdés, ahol a „nem” is érdemi válasz", "egyszerű egyezés (SMC)"]
    ],
    hint: "Kérdezd meg: számít-e a közös 0? Számít-e a vektor hossza? Együtt mozognak-e a változók?",
    explain: "Kosárnál a közös hiány nem információ → Jaccard. Szövegnél a hossz nem számít, csak az irány → koszinusz. Korrelált változóknál az adat alakjához igazodó távolság kell → Mahalanobis. Szimmetrikus igen/nem jellemzőknél minden egyezés számít → SMC."
  },
  {
    id: "b14-007",
    topic: "14",
    level: 2,
    ref: "14-suruseg-validalas-kiugrok.html#lepes4",
    type: "single",
    q: R`Mennyi a $d_1=(2;0;2)$ és $d_2=(1;1;0)$ vektor koszinusz-hasonlósága?`,
    options: ["0,5", "2", "0,25", "0,707"],
    answer: 0,
    hint: R`$d_1\cdot d_2$, majd osztás $\lVert d_1\rVert\cdot\lVert d_2\rVert$-vel.`,
    explain: R`$d_1\cdot d_2=2$; $\lVert d_1\rVert=\sqrt8$, $\lVert d_2\rVert=\sqrt2$, szorzatuk 4. $\cos=2/4=0{,}5$. A 2 a normálatlan skaláris szorzat, a 0,25 a hosszak négyzetével ($8$) való osztás, a 0,707 csak $\lVert d_1\rVert$-gyel normál.`
  },
  {
    id: "b14-008",
    topic: "14",
    level: 3,
    ref: "14-suruseg-validalas-kiugrok.html#lepes4",
    type: "single",
    q: R`$p=(1,3,1,3)$, $q=(2,2,6,6)$. Mennyi a korrelációjuk (standardizált vektorok skaláris szorzata osztva $n$-nel, populációs szórással)?`,
    options: ["0", "1", "−1", "0,5"],
    answer: 0,
    hint: R`Mindkét vektor standardizált alakja $\pm1$-ekből áll. Írd fel őket, és szorozd össze elemenként.`,
    explain: R`$\bar p=2$, $s_p=1$ → $p'=(-1,1,-1,1)$. $\bar q=4$, $s_q=2$ → $q'=(-1,-1,1,1)$. $p'\cdot q'=1-1-1+1=0$ → korreláció 0. A $q$ növekvő, de $p$ váltakozik: nincs köztük lineáris kapcsolat. Az 1 vagy −1 az elemenkénti sorrend téves párosításából jöhet.`
  },
  {
    id: "b14-009",
    topic: "14",
    level: 1,
    ref: "14-suruseg-validalas-kiugrok.html#lepes5",
    type: "match",
    q: "Párosítsd a leírást a szegmentáció fajtájával!",
    pairs: [
      ["minden objektum pontosan egy, nem átfedő klaszterbe kerül", "felosztó (kizáró) szegmentáció"],
      ["egy határon lévő objektum több klaszterbe is tartozhat", "nem kizáró szegmentáció"],
      ["minden objektum minden klaszterhez tartozik 0 és 1 közötti, 1-re összegződő súllyal", "fuzzy klaszterezés"],
      ["a klaszterek egymásba ágyazott fát alkotnak", "hierarchikus klaszterezés"],
      ["csak az objektumok egy részét klaszterezzük, a többi zaj", "részleges klaszterezés"]
    ],
    hint: "A K-means felosztó, a HAC hierarchikus, a DBSCAN a zajt kihagyja.",
    explain: "Felosztó: egyértelmű partíció. Nem kizáró: átfedés megengedett. Fuzzy: fokozatos tagság, a súlyok összege 1. Hierarchikus: dendrogram. Részleges: pl. a DBSCAN, amely a zajpontokat nem sorolja klaszterbe."
  },
  {
    id: "b14-010",
    topic: "14",
    level: 1,
    ref: "14-suruseg-validalas-kiugrok.html#lepes5",
    type: "multi",
    q: "Melyik csoportra bontás <strong>szegmentáció</strong> (klaszterezés) a szó adatbányászati értelmében?",
    options: [
      "Betegek csoportosítása laborértékeik hasonlósága alapján, előre adott diagnózis nélkül.",
      "Egy webáruház látogatóinak csoportosítása kattintási szokásaik szerint, ismert csoportok nélkül.",
      "Ügyfelek besorolása „jó / rossz adós” osztályba egy címkézett mintán tanított modellel.",
      "Egy lekérdezés 2000 soros eredményének 50-es oldalakra bontása.",
      "Termékek csoportosítása nevük kezdőbetűje szerint."
    ],
    answer: [0, 1],
    hint: "Szegmentáció: a csoportokat az objektumok hasonlósága jelöli ki, előzetes címkék és mechanikus szabály nélkül.",
    explain: "Az első kettő nem felügyelt, hasonlóság alapú csoportkeresés. A címkézett mintán tanított besorolás felügyelt osztályozás; az oldalakra bontás és a kezdőbetű szerinti csoportosítás egyszerű szabály, nincs benne hasonlóság – a forrás ezeket kifejezetten „nem szegmentációnak” nevezi."
  },
  {
    id: "b14-011",
    topic: "14",
    level: 2,
    ref: "14-suruseg-validalas-kiugrok.html#lepes6",
    type: "single",
    q: R`Pontok: $P=(0;0)$, $Q=(1;0)$, $R=(0;1)$, $S=(2;0)$, $T=(5;5)$. DBSCAN: $\varepsilon=1{,}1$, MinPts = 3 (a pontot magát is számolva). Melyek a határpontok?`,
    options: ["R és S", "P és Q", "Csak T", "R, S és T"],
    answer: 0,
    hint: R`Számold meg pontonként, hány pont van $1{,}1$-en belül (önmagával). Utána nézd meg a nem magpontoknál, van-e magpont a közelükben.`,
    explain: R`$P$: önmaga, $Q$, $R$ → 3, mag. $Q$: önmaga, $P$, $S$ → 3, mag. $R$: önmaga, $P$ → 2 (a $Q$ $\sqrt2\approx1{,}41$-re van), de $P$ magpont → határ. $S$: önmaga, $Q$ → 2, $Q$ mag → határ. $T$: egyedül → zaj, nem határpont. Egy klaszter: {P, Q, R, S}.`
  },
  {
    id: "b14-012",
    topic: "14",
    level: 3,
    ref: "14-suruseg-validalas-kiugrok.html#lepes6",
    type: "single",
    q: "A DBSCAN Eps paraméterének megválasztásához MinPts = 5 mellett minden pontra kiszámolod az 5. legközelebbi ponttól (önmagát is számolva) vett távolságot, és csökkenő sorrendben ábrázolod. Az első 6 érték 1,9; 1,7; 1,6; 0,41; 0,39; 0,38, utána lassan csökken 0,05-ig. Melyik Eps a legésszerűbb?",
    options: [
      "kb. 0,45 – a görbe törése fölött, így a 3 elszigetelt pont zaj lesz, a többi magpont.",
      "kb. 2 – így senki sem lesz zaj.",
      "kb. 0,05 – a legkisebb érték, így a legsűrűbb klaszterek válnak el.",
      "kb. 1,7 – a legnagyobb értékek átlaga."
    ],
    answer: 0,
    hint: "A görbe töréspontja választja el a „zajt” a sűrű pontoktól.",
    explain: "Az első három pont k-távolsága kiugróan nagy (1,6–1,9), utána hirtelen 0,41-re esik: ezek a ritka helyen álló pontok. Ha Eps a törés fölött, de a nagy értékek alatt van (pl. 0,45), a sűrű pontok magpontok, a három magányos pont zaj. Eps ≈ 2 mindent egybeolvaszthat, 0,05-nél szinte minden pont zaj lenne."
  },
  {
    id: "b14-013",
    topic: "14",
    level: 2,
    ref: "14-suruseg-validalas-kiugrok.html#lepes6",
    type: "multi",
    q: "Mely helyzetekben okozhat a DBSCAN nehézséget?",
    options: [
      "A klaszterek sűrűsége nagyon eltérő: egyetlen Eps nem illik mindegyikhez.",
      "Sok dimenziós adat, ahol a távolságok „kiegyenlítődnek”, és a sűrűség elmosódik.",
      "Nem standardizált változók, eltérő mértékegységgel.",
      "A klaszterek elnyújtottak, ívesek.",
      "Az adatban zaj is van."
    ],
    answer: [0, 1, 2],
    hint: "Két opció épp a DBSCAN erőssége a K-means-szel szemben.",
    explain: "Eltérő sűrűség, magas dimenzió és skálázatlan változók rontják a DBSCAN-t (Eps távolságban értendő). A tetszőleges alakú klaszterek és a zaj kezelése viszont épp az erőssége."
  },
  {
    id: "b14-014",
    topic: "14",
    level: 2,
    ref: "14-suruseg-validalas-kiugrok.html#lepes7",
    type: "single",
    q: R`Egydimenziós klaszterek: $\{2,4\}$ és $\{10,12\}$. Mennyi az SSE (kohézió) és az SSB (szeparáció)?`,
    options: ["SSE = 4; SSB = 64", "SSE = 64; SSB = 4", "SSE = 4; SSB = 16", "SSE = 2; SSB = 68"],
    answer: 0,
    hint: R`Középpontok 3 és 11, összátlag 7. $\mathrm{SSB}=\sum_j |C_j|\,(\mu_j-\mu)^2$. Ellenőrzés: $\mathrm{SSE}+\mathrm{SSB}=\mathrm{SST}$.`,
    explain: R`$\mathrm{SSE}=1+1+1+1=4$; $\mathrm{SSB}=2\cdot16+2\cdot16=64$; $\mathrm{SST}=25+9+9+25=68=4+64$ ✓. A 16 a létszámmal való szorzás elmaradása (és csak egy klaszter), a 2 az SSE fele.`
  },
  {
    id: "b14-015",
    topic: "14",
    level: 3,
    ref: "14-suruseg-validalas-kiugrok.html#lepes7",
    type: "single",
    q: R`Egydimenziós klaszterek: $\{0,2,4\}$ és $\{10,12\}$. Mennyi a Davies–Bouldin-index, ha $s_i$ a pontok átlagos távolsága a saját középponttól?`,
    options: ["kb. 0,259", "kb. 0,111", "kb. 3,857", "kb. 0,233"],
    answer: 0,
    hint: R`$s_1$ a $\{0,2,4\}$ pontjainak átlagos eltérése a 2-től, $s_2$ a $\{10,12\}$-é a 11-től; a középpontok távolsága 9.`,
    explain: R`$s_1=(2+0+2)/3\approx 1{,}333$, $s_2=1$, $d=9$. Két klaszternél $DB=(s_1+s_2)/d=2{,}333/9\approx 0{,}259$. A 0,111 csak $s_2/d$, a 3,857 a hányados fordítottja, a 0,233 a $s_1$-et $4/3$ helyett 1,1-nek veszi. Kisebb DB = jobb.`
  },
  {
    id: "b14-016",
    topic: "14",
    level: 1,
    ref: "14-suruseg-validalas-kiugrok.html#lepes7",
    type: "single",
    q: "Két klaszterezést hasonlítasz össze. Az A sziluettje 0,62, Davies–Bouldin-indexe 0,48; a B-é 0,71 és 0,36. Melyik a jobb a két mutató szerint?",
    options: [
      "B mindkét mutató szerint: nagyobb sziluett és kisebb Davies–Bouldin.",
      "A mindkét mutató szerint.",
      "Sziluett szerint B, Davies–Bouldin szerint A.",
      "Nem dönthető el, mert a két mutató nem hasonlítható össze."
    ],
    answer: 0,
    hint: "A sziluettnél a nagyobb, a Davies–Bouldin-indexnél a kisebb érték a jobb.",
    explain: "B sziluettje nagyobb (0,71 > 0,62) és DB-je kisebb (0,36 < 0,48) – mindkettő B mellett szól. A „Davies–Bouldin szerint A” a DB irányának tipikus félreolvasása."
  },
  {
    id: "b14-017",
    topic: "14",
    level: 1,
    ref: "14-suruseg-validalas-kiugrok.html#lepes8",
    type: "multi",
    q: "Mely állítások igazak a rendellenes (kiugró) rekordokra?",
    options: [
      "Egy rendellenes rekord lehet helyes adat is, pl. egy valódi, de szokatlanul nagy utalás.",
      "A rendellenesség-keresés munkahipotézise, hogy jóval több a normális, mint a rendellenes megfigyelés.",
      "A feladat lehet az n legnagyobb rendellenességi pontszámú rekord megkeresése.",
      "Minden kiugró rekord adatrögzítési hiba, ezért törölni kell.",
      "A rendellenesség-keresés felügyelt feladat, mert mindig van tesztállomány."
    ],
    answer: [0, 1, 2],
    hint: "Gondolj a 333 éves életkorra és a lakásvásárlási utalásra: melyik hibás, melyik helyes?",
    explain: "A rendellenesség nem minősít: lehet hibás (333 év) vagy helyes (nagy, valódi utalás – akár csalás is). A munkahipotézis és a három feladattípus (pontszám, küszöb, top-n) a forrásból való. A feladat alapvetően nem felügyelt, nincs validációs tesztállomány."
  },
  {
    id: "b14-018",
    topic: "14",
    level: 2,
    ref: "14-suruseg-validalas-kiugrok.html#lepes8",
    type: "single",
    q: R`Nyolc mérésből álló mintában egy érték gyanúsan nagy. Egy kolléga a „$|z|>3$” szabállyal (populációs szórással) vizsgálja, és nem talál kiugrót. Mit mondasz neki?`,
    options: [
      R`8 adatnál a $|z|$ legfeljebb $\sqrt7\approx 2{,}65$ lehet, így a szabály itt sosem jelez – Grubbs-próbát vagy IQR-kerítést használj.`,
      "Igaza van: ha a |z| nem éri el a 3-at, akkor biztosan nincs kiugró.",
      "Mintaszórással kell számolni, akkor a |z| biztosan 3 fölé megy.",
      "A z-pontszámot a mediánhoz kell mérni, és akkor 3 a küszöb."
    ],
    answer: 0,
    hint: R`Mekkora lehet egyáltalán a $|z|$ $n$ adat esetén? A kiugró érték maga is beleszól az átlagba és a szórásba.`,
    explain: R`Populációs szórással $|z|\le\sqrt{n-1}$, $n=8$-ra 2,65. A kiugró felfújja a szórást (maszkolás). Mintaszórással a korlát még kisebb: $(n-1)/\sqrt n\approx 2{,}47$. A Grubbs-próba kritikus értéke a mintamérethez igazodik, az IQR-t pedig a szélső érték nem torzítja.`
  },
  {
    id: "b14-019",
    topic: "14",
    level: 2,
    ref: "14-suruseg-validalas-kiugrok.html#lepes9",
    type: "single",
    q: R`Pontok a síkon: $(0;0)$, $(0;1)$, $(1;0)$, $(1;1)$, $(4;0)$. Mennyi a $(4;0)$ pont rendellenességi pontszáma, ha a pontszám a 2. legközelebbi másik ponttól vett euklideszi távolság?`,
    options: ["kb. 3,162", "3", "4", "1"],
    answer: 0,
    hint: R`Számold ki a $(4;0)$ távolságát mind a négy másik ponttól, és rendezd őket.`,
    explain: R`Távolságok: $(1;0)$: 3; $(1;1)$: $\sqrt{10}\approx 3{,}162$; $(0;0)$: 4; $(0;1)$: $\sqrt{17}\approx 4{,}123$. A 2. legközelebbi $\sqrt{10}$. A 3 a legközelebbi ($k=1$), az 1 a négyzet pontjainak tipikus értéke.`
  },
  {
    id: "b14-020",
    topic: "14",
    level: 3,
    ref: "14-suruseg-validalas-kiugrok.html#lepes9",
    type: "single",
    q: R`Pontok: 1, 2, 3, 4, 5, 20, 21. A $k$-NN kiugró-pontszámot (a $k$-adik legközelebbi másik pont távolsága) $k=1$-gyel számolva a 20 és a 21 pontszáma 1 – ugyanannyi, mint a többieké. Mi a magyarázat, és mit teszel?`,
    options: [
      R`A két kiugró egymás legközelebbi szomszédja, így elfedik egymást; $k=2$-vel a pontszámuk 15 és 16 lesz.`,
      "A 20 és a 21 nem kiugró, mert kettő van belőlük.",
      R`A $k$-NN módszer egy dimenzióban nem működik; z-pontszámot kell használni.`,
      R`$k$-t csökkenteni kell 0-ra.`
    ],
    answer: 0,
    hint: "Ki a 20 legközelebbi szomszédja? És a második legközelebbi?",
    explain: R`A 20 legközelebbi szomszédja a 21 (és fordítva), ezért $k=1$-nél kicsi a pontszámuk – ez a maszkolás távolság alapú változata. $k=2$-nél a második szomszéd már az 5: pontszámuk 15 és 16, a többieké legfeljebb 2. A $k$-t nagyobbra kell választani, mint a várható kiugró-csoportok mérete.`
  },
  {
    id: "b14-021",
    topic: "14",
    level: 2,
    ref: "14-suruseg-validalas-kiugrok.html#alkalmazas",
    type: "single",
    q: "A gyakorlat 120 vásárlója mellé érkező U (3 vásárlás, 200 000 Ft) z-értékei −1,24 és 1,55, az IQR-kerítéseken belül van, a DBSCAN (Eps = 0,3, MinPts = 5) mégis zajnak címkézi. Miért?",
    options: [
      "Mert a vásárlásszám és a költés erősen korrelál (0,95), U viszont kevés vásárlás mellett sokat költött: a két változó együttes terében nincs a közelében egyetlen vásárló sem.",
      "Mert a DBSCAN minden új pontot zajnak címkéz.",
      "Mert U költése a legnagyobb a mintában.",
      "Mert a DBSCAN a z-pontszám alapján dönt, és 1,55 > 1,5."
    ],
    answer: 0,
    hint: "A z-pontszám és az IQR egyszerre egy változót néz; a DBSCAN mit néz?",
    explain: "U legközelebbi szomszédja is 1,90-re van a standardizált térben (Eps = 0,3), így nincs magpont a környezetében → zaj. A változónkénti módszerek ezt nem látják, mert külön-külön mindkét érték hétköznapi. U költése nem a legnagyobb (a legnagyobb költő 240 230 Ft), és a DBSCAN a meglévő pontokat sem címkézi át."
  },
  {
    id: "b14-022",
    topic: "14",
    level: 3,
    ref: "14-suruseg-validalas-kiugrok.html#lepes7",
    type: "single",
    q: "A páronkénti távolságmátrix és a klaszterezés incidenciamátrixa (1, ha a két pont egy klaszterben van) közötti korreláció három felosztásra: A: −0,83; B: −0,72; C: +0,15. Melyik a legjobb felosztás e mutató szerint?",
    options: [
      "A – a legerősebb negatív korreláció: az egy klaszterbe tartozó párok rendre közel vannak.",
      "C – mert csak ott pozitív a korreláció.",
      "B – a középső érték a legkiegyensúlyozottabb.",
      "Nem dönthető el, mert a korreláció csak hasonlósági mátrixszal értelmes."
    ],
    answer: 0,
    hint: "Távolsággal számolva: ha egy klaszterben (incidencia 1) kicsi a távolság, milyen előjelű lesz a korreláció?",
    explain: "Jó klaszterezésnél az incidencia 1-es párjaihoz kis távolság tartozik → erős negatív korreláció; hasonlósági mátrixszal ugyanez erős pozitív lenne. Az abszolút érték számít: A a legjobb (a gyakorlat K-means k = 2 felosztásán −0,834). A pozitív érték (C) azt jelzi, hogy az egy klaszterbe sorolt párok inkább távol vannak – rossz felosztás."
  }
);
