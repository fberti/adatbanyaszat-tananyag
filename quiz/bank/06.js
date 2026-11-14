/* Vizsgagyakorló kérdésbank – 6. lecke: Neurális háló – perceptron, MLP, túltanulás */

BANK.push(
  {
    id: "b06-001",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#lepes1",
    type: "single",
    q: R`Perceptron: $w=(0{,}2;\ 1{,}5)$, $b=-5$, és $\hat y=1$, ha $z\ge0$. Mit dönt az $x=(7;\ 2{,}4)$ bemenetre?`,
    options: [
      R`$z=0$ → $\hat y=0$`,
      R`$z=5$ → $\hat y=1$`,
      R`$z=0$ → $\hat y=1$`,
      R`$z=-0{,}2$ → $\hat y=0$`
    ],
    answer: 2,
    hint: R`Számold ki $z=w_1x_1+w_2x_2+b$-t, és nézd meg, melyik osztályba kerül a $z=0$ eset a megadott konvenció szerint.`,
    explain: R`$z=0{,}2\cdot7+1{,}5\cdot2{,}4-5=1{,}4+3{,}6-5=0$. A konvenció $z\ge0$ → 1, tehát $\hat y=1$: a pont épp a döntési határon van. A „$z=0$ → 0” a konvenciót fordítja meg, a $z=5$ elhagyja az eltolást, a $-0{,}2$ számolási hiba ($0{,}2\cdot7$ helyett 1,2).`
  },
  {
    id: "b06-002",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#lepes1",
    type: "single",
    q: R`Perceptron: $w=(0{,}5;\ -0{,}2)$, $b=0{,}1$, $\hat y=1$, ha $z\ge0$. Az $x=(2;\ 3)$ hallgató valódi címkéje $y=0$. Egy tanulási lépés $\eta=0{,}1$-gyel ($w_i\leftarrow w_i+\eta(y-\hat y)x_i$, $b\leftarrow b+\eta(y-\hat y)$). Mik az új paraméterek?`,
    options: [
      R`$w=(0{,}7;\ 0{,}1)$, $b=0{,}2$`,
      R`$w=(0{,}3;\ -0{,}5)$, $b=0$`,
      R`$w=(0{,}4;\ -0{,}3)$, $b=0$`,
      R`$w=(0{,}5;\ -0{,}2)$, $b=0{,}1$ – nem változik`
    ],
    answer: 1,
    hint: R`Előbb döntsd el, mit mond most a perceptron ($z=?$), és mennyi $y-\hat y$. Ne felejtsd el a szorzást $x_i$-vel!`,
    explain: R`$z=1-0{,}6+0{,}1=0{,}5\ge0$ → $\hat y=1$, de $y=0$: $y-\hat y=-1$. $w_1=0{,}5-0{,}1\cdot2=0{,}3$; $w_2=-0{,}2-0{,}1\cdot3=-0{,}5$; $b=0{,}1-0{,}1=0$. (Új $z=0{,}6-1{,}5+0=-0{,}9$ → most már 0.) Az első opció előjelhibás ($+1$-gyel frissít), a harmadik elfelejti $x_i$-vel szorozni, a negyedik azt hiszi, hogy helyes volt a döntés.`
  },
  {
    id: "b06-003",
    topic: "06",
    level: 1,
    ref: "06-neuralis-halo.html#lepes1",
    type: "single",
    q: "Mit ad ki a lépcsőfüggvényes perceptron egy bemenetre?",
    options: [
      "Az 1-es osztály valószínűségét 0 és 1 között",
      "A z súlyozott összeget, amelyet a felhasználó kerekít",
      "Egy 0/1 döntést, a z = Σ wᵢxᵢ + b előjele alapján",
      "A tanítás során elkövetett hibák számát"
    ],
    answer: 2,
    hint: "Mit csinál a lépcsőfüggvény a súlyozott összeggel?",
    explain: "A perceptron csak 0/1 döntést ad (z ≥ 0 → 1). Valószínűséget a szigmoid kimenet ad (MLP kimeneti neuron, 3. lépés); a z maga egy köztes érték, nem kimenet."
  },
  {
    id: "b06-004",
    topic: "06",
    level: 3,
    ref: "06-neuralis-halo.html#lepes2",
    type: "multi",
    q: "Két 0/1 bemenet. Melyik függvényt tudja egyetlen perceptron hibátlanul megvalósítani?",
    options: [
      "Egyezés (XNOR): (0, 0) → 1 és (1, 1) → 1, a többi 0",
      "NEM-VAGY (NOR): csak (0, 0) → 1",
      R`„$x_1$ ÉS NEM $x_2$”: csak (1, 0) → 1`,
      "„Pontosan egy bemenet 1-es”",
      R`Csak $x_1$ (az $x_2$-t figyelmen kívül hagyja)`
    ],
    answer: [1, 2, 4],
    hint: "Rajzold fel a négy sarokpontot: elválasztja-e egyetlen egyenes az 1-eseket a 0-sektól? Ha átlósan állnak, nem.",
    explain: R`NOR: $w=(-1;-1)$, $b=0{,}5$; „$x_1$ ÉS NEM $x_2$”: $w=(1;-1)$, $b=-0{,}5$; csak $x_1$: $w=(1;0)$, $b=-0{,}5$ – mindhárom lineárisan szeparálható. Az XNOR az XOR tagadása: az 1-esei ugyanúgy átlósan állnak, ugyanaz az ellentmondás jön ki. A „pontosan egy bemenet 1-es” maga az XOR, csak szavakkal.`
  },
  {
    id: "b06-005",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#lepes3",
    type: "single",
    q: R`Hány paramétere (súly + eltolás) van egy MLP-nek 7 bemenettel, <code>hidden_layer_sizes=(10, 5)</code> rejtett rétegekkel és 1 kimeneti neuronnal?`,
    options: ["125", "135", "16", "141"],
    answer: 3,
    hint: R`Rétegenként: (bemenetek száma) × (neuronok száma) + (neuronok száma). Ne hagyd ki a kimeneti réteget!`,
    explain: R`$7\cdot10+10=80$; $10\cdot5+5=55$; $5\cdot1+1=6$; összesen 141. A 125 elhagyja az eltolásokat ($70+50+5$), a 135 a kimeneti réteget, a 16 csak a neuronok száma.`
  },
  {
    id: "b06-006",
    topic: "06",
    level: 1,
    ref: "06-neuralis-halo.html#lepes3",
    type: "single",
    q: "Miért kell nemlineáris aktivációs függvény a rejtett rétegekben?",
    options: [
      "Hogy a kimenet 0 és 1 közé essen",
      "Mert lineáris rétegek egymásutánja is csak lineáris függvény, így a háló nem tanulna meg görbe döntési határt",
      "Hogy gyorsabb legyen a tanítás, a pontosságra nincs hatása",
      "Mert a hibavisszaterjesztés lineáris függvényekre nem működik"
    ],
    answer: 1,
    hint: R`Gondolj a $h=2x+1$, $o=3h-2$ példára: mi lesz $o$, ha behelyettesíted $h$-t?`,
    explain: R`$o=3(2x+1)-2=6x+1$ – megint lineáris. Akárhány lineáris réteg összevonható egyetlen lineáris függvénnyé, a határ hipersík marad (az XOR-t így sem tanulja). A 0–1 közötti kimenetet a kimeneti szigmoid adja, nem a rejtett aktiváció.`
  },
  {
    id: "b06-007",
    topic: "06",
    level: 1,
    ref: "06-neuralis-halo.html#lepes3",
    type: "match",
    q: "Párosítsd az MLP részét a szerepével!",
    pairs: [
      ["Bemeneti réteg", "fogadja a 7 magyarázó változót, nem számol"],
      ["Rejtett réteg", "a bemenetekből új jellemzőket számol nemlineáris aktivációval"],
      ["Kimeneti réteg (bináris eset)", "1 szigmoid neuron: P(yes)"],
      ["model.coefs_", "a rétegek közötti súlymátrixok"],
      ["model.intercepts_", "a neuronok eltolásai"]
    ],
    hint: "Melyik réteg kap súlyt és aktivációt, és melyik csak továbbadja az adatot?",
    explain: "A bemeneti réteg csak továbbad; a rejtett rétegek (pl. (8, 4)) gyártják az új jellemzőket; a kimenet bináris osztályozásnál egy logisztikus neuron (out_activation_ == \"logistic\"). A scikit-learnben a súlyok a coefs_, az eltolások az intercepts_ listában vannak, rétegenként."
  },
  {
    id: "b06-008",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#lepes4",
    type: "single",
    q: R`2–2–1 háló, ReLU rejtett réteg, szigmoid kimenet: $h_1=\mathrm{ReLU}(0{,}5x_1-0{,}5x_2+0{,}2)$, $h_2=\mathrm{ReLU}(x_1+0{,}5x_2-1)$, $\hat p=\sigma(2h_1+1{,}5h_2-1)$. Mennyi $\hat p$, ha $x=(1;\ 2)$?`,
    options: ["≈ 0,4750", "≈ 0,6225", "≈ 0,8176", "0,5000"],
    answer: 1,
    hint: "Előbb a két rejtett neuron z-je, aztán a ReLU, csak utána a kimeneti súlyozott összeg és a szigmoid.",
    explain: R`$z_1=0{,}5-1+0{,}2=-0{,}3$ → $h_1=0$; $z_2=1+1-1=1$ → $h_2=1$. $z_o=0+1{,}5-1=0{,}5$, $\hat p=\sigma(0{,}5)\approx0{,}6225$ → „yes”. A 0,4750 a ReLU kihagyása ($-0{,}3$-at viszi tovább), a 0,8176 a kimeneti eltolás elhagyása ($\sigma(1{,}5)$), a 0,5 a $z_o$ szigmoid nélkül.`
  },
  {
    id: "b06-009",
    topic: "06",
    level: 1,
    ref: "06-neuralis-halo.html#lepes4",
    type: "single",
    q: "<code>model.classes_</code> = <code>['no', 'yes']</code>, és <code>model.predict_proba(x)</code> eredménye <code>[[0.23, 0.77]]</code>. Mit ad vissza a <code>model.predict(x)</code>?",
    options: [
      "<code>'no'</code>, mert az első oszlop a „pozitív” osztály valószínűsége",
      "<code>'yes'</code>, mert a második oszlop a classes_[1] = 'yes' valószínűsége, és 0,77 ≥ 0,5",
      "<code>0.77</code>, mert a predict a valószínűséget adja vissza",
      "<code>1</code>, és ez a „no” osztály sorszáma"
    ],
    answer: 1,
    hint: "A predict_proba oszlopai a classes_ sorrendjét követik, a predict pedig címkét ad vissza.",
    explain: "Az oszlopok sorrendje a classes_ sorrendje (ábécérend): az első P(no) = 0,23, a második P(yes) = 0,77. Bináris esetben a kimeneti szigmoid épp P(yes)-t számolja, és a predict 0,5 felett a második osztály címkéjét adja: 'yes'. A predict nem valószínűséget és nem sorszámot, hanem az osztály nevét adja vissza."
  },
  {
    id: "b06-010",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#lepes5",
    type: "single",
    q: R`Mennyi az átlagos log-loss, ha $y=(0,\ 1,\ 1)$ és $\hat p=(0{,}4;\ 0{,}9;\ 0{,}5)$?`,
    options: ["≈ 0,4364", "≈ 0,5716", "≈ 0,1895", "≈ 1,3093"],
    answer: 0,
    hint: R`$y=1$: $-\ln\hat p$; $y=0$: $-\ln(1-\hat p)$. A végén átlagolj.`,
    explain: R`$-\ln0{,}6=0{,}5108$; $-\ln0{,}9=0{,}1054$; $-\ln0{,}5=0{,}6931$; átlag $1{,}3093/3\approx0{,}4364$. A 0,5716 az első sorra is $-\ln\hat p$-t használ ($-\ln 0{,}4$); a 0,1895 tízes alapú logaritmussal jön ki; az 1,3093 az összeg átlagolás nélkül.`
  },
  {
    id: "b06-011",
    topic: "06",
    level: 3,
    ref: "06-neuralis-halo.html#lepes5",
    type: "single",
    q: R`Négy hallgató, $y=(1,\ 1,\ 0,\ 0)$. A modell: $\hat p=(0{,}9;\ 0{,}8;\ 0{,}1;\ 0{,}99)$. B modell: $\hat p=(0{,}6;\ 0{,}4;\ 0{,}4;\ 0{,}4)$. Melyik állítás igaz (0,5-ös küszöb)?`,
    options: [
      "A jobb, mert három esetben is nagyon magabiztos és helyes, tehát kisebb a log-lossa",
      "Mindkettő 75%-os pontosságú; az A log-lossa (≈ 1,26) mégis kétszer akkora, mint a B-é (≈ 0,61), mert egyszer magabiztosan téved",
      "B pontosabb, mert minden valószínűsége 0,5 közelében van",
      "A log-loss és a pontosság mindig ugyanazt a sorrendet adja, ezért a két modell egyforma"
    ],
    answer: 1,
    hint: R`Számold ki mindkettő pontosságát, majd nézd meg az A negyedik hallgatóját: $y=0$, $\hat p=0{,}99$. Mennyi $-\ln(1-0{,}99)$?`,
    explain: R`Pontosság: A-nál a 4. hallgató rossz, B-nél a 2.: mindkettő 3/4. A log-lossban viszont A 4. sora $-\ln0{,}01\approx4{,}61$, ez az átlagot $\approx1{,}26$-ra húzza; B-nél a rossz sor csak $-\ln0{,}4\approx0{,}92$, az átlag $\approx0{,}61$. A log-loss a magabiztos tévedést súlyosan bünteti – ezt a pontosság nem látja.`
  },
  {
    id: "b06-012",
    topic: "06",
    level: 1,
    ref: "06-neuralis-halo.html#lepes5",
    type: "single",
    q: "Mit minimalizál az MLPClassifier tanítás közben (ezt mutatja a <code>model.loss_</code> és a <code>loss_curve_</code>)?",
    options: [
      "A teszthalmazon mért log-losst",
      "A hibás besorolások arányát (1 − accuracy) a tanítóhalmazon",
      R`A log-loss + $\frac{\alpha}{2n}\sum w^2$ összeget a tanítóhalmazon, az eltolásokat nem büntetve`,
      R`A log-loss + $\alpha\sum (w^2+b^2)$ összeget, az eltolásokat is büntetve`
    ],
    answer: 2,
    hint: "Mit lát a háló tanítás közben, és mit büntet az alpha?",
    explain: R`A minimalizált veszteség a tanítóhalmazon mért log-loss plusz az L2-tag $\frac{\alpha}{2n}\sum w^2$; az eltolásokat nem bünteti. A tesztet a modell nem látja; a hibaarány pedig nem „sima” függvénye a súlyoknak, gradienssel nem lehetne csökkenteni – ezért kell a log-loss.`
  },
  {
    id: "b06-013",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#lepes6",
    type: "single",
    q: R`$L(w)=(w-3)^2$, gradiens-lépés: $w\leftarrow w-\eta L'(w)$, ahol $L'(w)=2(w-3)$. $w=0$-ból indulva, $\eta=0{,}25$-tel mennyi $w$ két lépés után?`,
    options: ["1,5", "2,25", "3", "2,625"],
    answer: 1,
    hint: R`Első lépés: $L'(0)=-6$. A második lépésnél az új $w$-ben számold újra a meredekséget!`,
    explain: R`$w_1=0-0{,}25\cdot(-6)=1{,}5$; $L'(1{,}5)=-3$, $w_2=1{,}5+0{,}75=2{,}25$. Itt minden lépés a hátralévő távolság felét teszi meg. Az 1,5 csak egy lépés, a 2,625 három lépés, a 3 azt feltételezi, hogy a második lépés is 1,5 hosszú (nem számolja újra a meredekséget az új $w$-ben).`
  },
  {
    id: "b06-014",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#lepes6",
    type: "single",
    q: R`$n=450$ tanítópélda, <code>batch_size="auto"</code>, Adam. Hány súlyfrissítés történik egy epochban?`,
    options: ["1", "2", "450", "3"],
    answer: 3,
    hint: R`auto = $\min(200, n)$. Mi történik a maradék példákkal, amelyek nem töltenek ki egy teljes batch-et?`,
    explain: R`Batch = $\min(200, 450)=200$: a 450 példa 200 + 200 + 50 méretű csomagokra bomlik, ez 3 frissítés (a maradék 50 is egy frissítést kap – egy epochban minden példa sorra kerül). A 2 elhagyja a maradékot, az 1 a $n\lt 200$ esetre igaz, a 450 a példánkénti frissítés.`
  },
  {
    id: "b06-015",
    topic: "06",
    level: 1,
    ref: "06-neuralis-halo.html#lepes6",
    type: "multi",
    q: "Melyik állítás igaz a háló tanítására?",
    options: [
      "A hibavisszaterjesztés a kimenettől visszafelé, rétegről rétegre számolja ki a gradienst",
      "A hibavisszaterjesztés a bemenettől halad a kimenet felé",
      "A súlyokat az optimalizáló (solver) módosítja a gradiens alapján",
      R`A frissítés $w\leftarrow w+\eta\cdot\partial L/\partial w$, mert a gradiens irányába kell lépni`,
      "Egy epoch a teljes tanítóhalmaz egyszeri feldolgozása",
      "<code>solver=\"lbfgs\"</code> esetén a max_iter is az epochok számát jelenti"
    ],
    answer: [0, 2, 4],
    hint: "Melyik irányba nő a veszteség a gradiens mentén? És az lbfgs dolgozik-e batch-ekkel?",
    explain: R`Előre a bemenettől a kimenetig az előreterjesztés halad; a hibavisszaterjesztés visszafelé, és csak gradienst számol – a lépést az optimalizáló teszi meg. A gradiens a veszteség növekedésének iránya, ezért $w\leftarrow w-\eta\,\partial L/\partial w$. Az lbfgs nem batch-ekben, hanem az egész adaton dolgozik; nála a max_iter optimalizálási iteráció, nem epoch.`
  },
  {
    id: "b06-016",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#lepes7",
    type: "single",
    q: R`A tanítóhalmaz tanulási órái: 3, 5, 7, 9, 11. A StandardScaler ezekre illeszkedik. Mivé alakítja egy teszthallgató 12 óráját?`,
    options: ["≈ 1,581", "5,000", "≈ −1,768", "≈ 1,768"],
    answer: 3,
    hint: R`$\mu=7$; a StandardScaler populációs szórást számol ($n$-nel oszt).`,
    explain: R`$\sigma=\sqrt{(16+4+0+4+16)/5}=\sqrt8\approx2{,}828$; $(12-7)/2{,}828\approx1{,}768$. Az 1,581 az $n-1$-gyel osztott (mintabeli) szórással jön ki ($\sqrt{10}$), az 5 kihagyja az osztást, a $-1{,}768$ a kivonás sorrendjét fordítja meg.`
  },
  {
    id: "b06-017",
    topic: "06",
    level: 3,
    ref: "06-neuralis-halo.html#lepes7",
    type: "multi",
    q: "Melyik lépés hibás (adatszivárgás vagy rossz előkészítés) egy MLP munkafolyamatában?",
    options: [
      "<code>scaler.fit(X)</code> a teljes adaton, és csak utána a tanító/teszt felosztás",
      "<code>X_train_s = scaler.fit_transform(X_train)</code>",
      "<code>X_test_s = scaler.fit_transform(X_test)</code>",
      "<code>joblib.dump(scaler, \"student_mlp-1_scaler.joblib\")</code> a modell mellé",
      "A célváltozó (<code>passed</code>) standardizálása is a bemenetekkel együtt",
      "<code>X_new_s = scaler.transform(X_new)</code> egy új hallgatóra"
    ],
    answer: [0, 2, 4],
    hint: "A μ és a σ honnan jöhet? És mit kell standardizálni: X-et vagy y-t?",
    explain: "A teljes adaton illesztett scaler a teszt információját is beépíti (az órai szóbeli összefoglalóban ez a rossz sorrend hangzott el, a kód a helyeset követi). A tesztre fit_transform újraszámolná μ-t és σ-t – csak transform kell. A célváltozót nem standardizáljuk (ráadásul yes/no címke). A tanítón fit_transform, új adaton transform, és a scaler elmentése helyes – előrejelzéshez kell."
  },
  {
    id: "b06-018",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#lepes8",
    type: "single",
    q: "<code>tol=0.005</code>, <code>n_iter_no_change=2</code>, <code>early_stopping=False</code>. A tanítási veszteség epochonként: 0,400 · 0,380 · 0,378 · 0,377 · 0,370 · 0,368 · 0,366 · 0,365. Melyik epoch után áll le a tanítás?",
    options: [
      "Az 5. után",
      "A 7. után",
      "A 8. után",
      "Nem áll le, hiszen a veszteség minden epochban csökken"
    ],
    answer: 2,
    hint: "Egy epoch akkor javulás nélküli, ha a veszteség nem kisebb az addigi legjobb − tol értéknél. Érdemi javulásnál a számláló nullázódik, és a leállás akkor jön, amikor a számláló meghaladja az n_iter_no_change-et.",
    explain: R`Számláló: 3. ep. ($0{,}378\gt 0{,}375$) 1; 4. ($0{,}377\gt 0{,}373$) 2; 5. ($0{,}370\lt 0{,}372$, érdemi javulás) 0; 6. 1; 7. 2; 8. ($0{,}365\gt 0{,}361$) 3 &gt; 2 → leáll. Az „5.” elfelejti a nullázást; a „7.” már akkor megáll, amikor a számláló eléri a 2-t (nem haladja meg); a „nem áll le” figyelmen kívül hagyja a tol-t – a csökkenés kevés, ha kisebb a küszöbnél.`
  },
  {
    id: "b06-019",
    topic: "06",
    level: 1,
    ref: "06-neuralis-halo.html#lepes8",
    type: "match",
    q: "Párosítsd az MLPClassifier paraméterét a jelentésével!",
    pairs: [
      ["learning_rate_init", "kezdeti tanulási ráta (η)"],
      ["alpha", "az L2-regularizáció erőssége"],
      ["tol", "az érdeminek tekintett javulás küszöbe"],
      ["n_iter_no_change", "ennyi javulás nélküli epochot tűr el (türelem)"],
      ["max_iter", "az epochok maximális száma (Adam, SGD)"],
      ["validation_fraction", "early_stopping=True esetén a félretett validációs rész aránya"]
    ],
    hint: "Melyik szól a lépésméretről, melyik a súlyok büntetéséről, és melyik három a leállásról?",
    explain: "A learning_rate_init a lépésméret, az alpha a nagy súlyok büntetése. A leállást a tol (mekkora javulás számít), az n_iter_no_change (hányszor tűrjük el a hiányát) és a max_iter (felső korlát) együtt szabályozza; a validation_fraction csak korai leállításnál számít."
  },
  {
    id: "b06-020",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#lepes8",
    type: "single",
    q: "150 tanítósor, <code>early_stopping=True</code>, <code>validation_fraction=0.2</code>. Hány sor marad a súlyok tanítására, és hány a validációra?",
    options: [
      "135 tanítás, 15 validáció",
      "150 tanítás, 30 validáció",
      "120 tanítás, 30 validáció",
      "30 tanítás, 120 validáció"
    ],
    answer: 2,
    hint: "A validációs részt a tanítóhalmazból vágja le, nem pluszban kapja.",
    explain: R`$0{,}2\cdot150=30$ sor validációs; a súlyokat a maradék 120 soron tanítja. A „150 + 30” azt hiszi, hogy a validáció külön adat; a „135 + 15” az alapértelmezett 10%-kal számol; az utolsó felcseréli a két részt. A teszthalmazhoz a korai leállítás sem nyúl.`
  },
  {
    id: "b06-021",
    topic: "06",
    level: 3,
    ref: "06-neuralis-halo.html#lepes9",
    type: "single",
    q: "Az MLP-1 (8, 4) teszt-pontossága 79,3% (a konstans „mindenki átmegy” modellé 72,4%), a teszt log-lossa az 1000. epochnál viszont 0,610 – rosszabb, mint a konstans 70,6%-os esélyt adó modellé (0,590). Hogyan lehetséges ez?",
    options: [
      "Számolási hiba: nagyobb pontosság mellett a log-loss nem lehet rosszabb",
      "A konstans modell a jobb osztályozó, mert kisebb a log-lossa",
      "A háló alultanult, ezért több epoch kellene",
      "A háló a legtöbb hallgatót jó oldalra sorolja, de néhánynál nagyon magabiztosan téved, és a log-loss ezt erősen bünteti"
    ],
    answer: 3,
    hint: R`Mekkora egy példa vesztesége, ha a valódi osztályra $\hat p=0{,}01$-et ad? És mit mér a pontosság?`,
    explain: R`A pontosság csak azt nézi, a 0,5 melyik oldalára esik $\hat p$; a log-loss azt is, mennyire magabiztos. Egyetlen $\hat p=0{,}01$-es tévedés $-\ln0{,}01\approx4{,}6$ büntetés – néhány ilyen elég, hogy az átlag a konstans modellé fölé menjen. Ez a túltanult háló tipikus jele: a 153. epoch körül a teszt log-loss még 0,505 volt. Alultanulás nem lehet, a tanítón 94,1%-os.`
  },
  {
    id: "b06-022",
    topic: "06",
    level: 3,
    ref: "06-neuralis-halo.html#lepes9",
    type: "single",
    q: "A Kiegészítésben a (16, 8)-as hálót <code>early_stopping=True</code>-val is lefuttattuk a 85 soros tanítóhalmazon: 22 epoch után leállt, tanító 70,6%, teszt 72,4%, kiegyensúlyozott pontosság 0,500. Mi történt?",
    options: [
      "A kb. 9 soros validációs rész túl zajos, a tanítás nagyon korán leállt, a háló alultanult: mindenkire „yes”-t mond",
      "Túltanulás: a korai leállítás túl későn állította meg a hálót",
      "A korai leállítás a teszthalmazt figyelte, ezért lett pont 72,4%",
      "Ideális eredmény, mert a teszt-pontosság nagyobb a tanítónál"
    ],
    answer: 0,
    hint: "Mennyi a többségi alapmodell teszt-pontossága és kiegyensúlyozott pontossága? És mennyit mozdít egy hallgató egy 9 soros validációs pontosságon?",
    explain: "A 0,500 kiegyensúlyozott pontosság és a 72,4% (= 21/29) pontosan a „mindenki átmegy” alapmodell eredménye: a háló nem tanult meg semmit. 85 sornál a validációs rész kb. 9 sor, egy hallgató ≈ 11 százalékpont – a zajos jel miatt a tanítás 22 epoch után leállt. Túltanulásnál a tanító-eredmény magas lenne; a tesztet a korai leállítás sem látja."
  },
  {
    id: "b06-023",
    topic: "06",
    level: 3,
    ref: "06-neuralis-halo.html#lepes9",
    type: "single",
    q: R`Egy konstans modell minden teszthallgatónak $\hat p=60/85\approx0{,}706$ esélyt ad az átmenésre (a tanítóhalmaz yes-aránya). A teszthalmazban 21 yes és 8 no van. Mennyi a log-lossa?`,
    options: ["≈ 0,693", "≈ 0,348", "≈ 0,590", "≈ 0,256"],
    answer: 2,
    hint: R`21 sor vesztesége $-\ln0{,}706$, 8 soré $-\ln(1-0{,}706)$; ezeket átlagold a 29 sorra.`,
    explain: R`$\frac{21\cdot(-\ln0{,}706)+8\cdot(-\ln0{,}294)}{29}=\frac{21\cdot0{,}348+8\cdot1{,}224}{29}\approx0{,}590$ – ez a 9. lépés grafikonjának vízszintes vonala. A 0,693 a „mindenkinek 0,5” modell ($\ln2$), a 0,348 a no sorokra is $-\ln\hat p$-t számol, a 0,256 ugyanez tízes alapú logaritmussal.`
  },
  {
    id: "b06-024",
    topic: "06",
    level: 2,
    ref: "06-neuralis-halo.html#alkalmazas",
    type: "single",
    q: "Az MLP-2 (16, 8) tévesztési mátrixa a teszten (sor = valódi, oszlop = jósolt, sorrend: no, yes): [[5, 3], [3, 18]]. Hány bukott hallgatóról mondja tévesen, hogy átmegy, és mennyi a „no” osztály recallja?",
    options: [
      "3 hallgatóról; 0,857",
      "5 hallgatóról; 0,625",
      "3 hallgatóról; 0,625",
      "3 hallgatóról; 0,375"
    ],
    answer: 2,
    hint: "A „valódi no” sorban nézd meg, hány esik a „jósolt yes” oszlopba, és hányat talált el.",
    explain: R`A valódi no sor: 5 helyes no, 3 téves yes. Recall$_{\text{no}}=5/8=0{,}625$ (az MLP-1-é $6/8=0{,}75$, a fáé $4/8=0{,}5$). A 0,857 a yes precisionje/recallja ($18/21$), az 5 a helyesen felismert bukók száma, a 0,375 a téves arány ($3/8$).`
  },
  {
    id: "b06-025",
    topic: "06",
    level: 1,
    ref: "06-neuralis-halo.html#alkalmazas",
    type: "multi",
    q: "Melyik állítás igaz a 6. gyakorlat szkriptjeire (01_mlp-1.py, 01_mlp-2.py, 02_mlp-1_evaluation.py)?",
    options: [
      "Az értékelő szkript a teszten újra illeszti a scalert, hogy a teszt is 0 átlagú legyen",
      "A modell mellett a scalert is elmentik (joblib), mert új adatot ugyanazzal a μ-vel és σ-val kell átalakítani",
      "A bemenetek között a <code>passed</code> oszlop is szerepel",
      "Ugyanazt a tanító–teszt felosztást használják (student_train.csv, student_test.csv), mint a döntési fa, így tisztességes az összevetés",
      "A 01_mlp-2.py ugyanezt a munkafolyamatot futtatja, csak <code>HIDDEN_LAYERS = (16, 8)</code> beállítással"
    ],
    answer: [1, 3, 4],
    hint: "Nézd meg a <code>drop(columns=[\"passed\"])</code> sort és a „NEM illesztjük újra” megjegyzést.",
    explain: "Az előrejelzéshez a betanított modell és a tanítón illesztett scaler is kell, ezért mindkettőt elmentik. Az azonos felosztás nélkül a fa és a háló eredménye nem lenne összevethető. Az értékelő szkript csak transform-ot hív („Nem illesztjük újra a standardizálót”), a passed pedig a célváltozó – a drop(columns=[\"passed\"]) veszi ki X-ből."
  }
);
