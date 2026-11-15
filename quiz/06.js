/* 6. lecke – Neurális háló: perceptron, MLP és a tanítás minősége – kvízek */

QUIZZES["l06-lepes2"] = {
  title: "Mini-kvíz – Perceptron és döntési határ",
  questions: [
    {
      type: "single",
      q: R`Egy perceptron súlyai $w=(0{,}5;\ -1)$, eltolása $b=1$, és $\hat y=1$, ha $z\ge 0$. Mit ad az $x=(4;\ 2)$ bemenetre?`,
      options: [
        R`$z=1$ → $\hat y=1$`,
        R`$z=0$ → $\hat y=1$`,
        R`$z=-1$ → $\hat y=0$`,
        R`$z=5$ → $\hat y=1$`
      ],
      answer: 0,
      hint: "Súlyozott összeg, majd add hozzá az eltolást. Figyelj a negatív súly előjelére!",
      explain: R`$z=0{,}5\cdot4+(-1)\cdot2+1=2-2+1=1\ge0$ → 1. A $z=0$ az eltolás elhagyásából, a $z=-1$ a $b$ előjelének elrontásából, a $z=5$ a negatív súly előjelének elhagyásából jön.`
    },
    {
      type: "multi",
      q: "Melyik logikai műveletet tudja egyetlen perceptron hibátlanul megtanulni (0/1 bemenetekkel)?",
      options: ["ÉS (AND)", "VAGY (OR)", "NEM-ÉS (NAND)", "Kizáró vagy (XOR)"],
      answer: [0, 1, 2],
      hint: "Rajzold fel a négy pontot: elválasztható-e a két osztály egyetlen egyenessel?",
      explain: R`AND ($w=(1,1)$, $b=-1{,}5$), OR ($b=-0{,}5$) és NAND ($w=(-1,-1)$, $b=1{,}5$) lineárisan szeparálható. Az XOR nem: a négy egyenlőtlenség ellentmondásra vezet.`
    },
    {
      type: "single",
      q: "Két bemenet esetén milyen alakú a perceptron döntési határa?",
      options: ["Egyenes", "Kör", "Parabola", "Bármilyen görbe, a súlyoktól függően"],
      answer: 0,
      hint: R`A határ a $w_1x_1+w_2x_2+b=0$ egyenlet megoldáshalmaza.`,
      explain: R`Ez egy lineáris egyenlet, tehát egyenes (több bemenetnél hipersík). Görbe határhoz rejtett réteg és nemlineáris aktiváció kell (MLP).`
    },
    {
      type: "single",
      q: "Miért nem segít az XOR-on, ha a perceptront sokkal több lépésig tanítjuk?",
      options: [
        "Mert nincs olyan súly és eltolás, amely az XOR-t megvalósítaná – nincs mit megtalálni",
        "Mert túl kicsi a tanulási ráta",
        "Mert az XOR-hoz standardizálni kellene a bemeneteket",
        "Mert a perceptron csak 3 vagy több bemenettel működik"
      ],
      answer: 0,
      hint: "A probléma a modell szerkezetében vagy a tanítás beállításaiban van?",
      explain: "Az XOR nem lineárisan szeparálható, így egyetlen perceptron semmilyen paraméterrel sem oldja meg. Szerkezeti változás kell: rejtett réteg (MLP)."
    }
  ]
};

QUIZZES["l06-lepes6"] = {
  title: "Mini-kvíz – Veszteség és tanítás",
  questions: [
    {
      type: "match",
      q: "Párosítsd a tanítás lépéseit a feladatukkal!",
      pairs: [
        ["Előreterjesztés", "kiszámolja az előrejelzéseket a bemenetből"],
        ["Veszteségfüggvény", "méri az előrejelzés eltérését a valódi címkétől"],
        ["Hibavisszaterjesztés", "kiszámolja, hogyan hatnak a súlyok a veszteségre (gradiens)"],
        ["Optimalizáló (solver)", "módosítja a súlyokat a veszteség csökkentésére"]
      ],
      hint: "A sorrend: számolás → mérés → felelősség szétosztása → javítás.",
      explain: "Ez a gyakorlati anyag négy lépése; több epochon át ismétlődik. A hibavisszaterjesztés maga nem módosít, csak gradienst számol – a lépést az optimalizáló (pl. Adam) teszi meg."
    },
    {
      type: "single",
      q: R`$n=1000$ tanítópélda, <code>batch_size="auto"</code>. Hány súlyfrissítés történik egy epochban?`,
      options: ["5", "1", "200", "1000"],
      answer: 0,
      hint: R`A scikit-learnben auto = $\min(200, n)$.`,
      explain: R`Batch = 200, tehát $1000/200=5$ frissítés epochonként, és közben mind az 1000 példa sorra kerül. Az 1 a $n&lt;200$ esetre igaz (pl. a gyakorlat 85 sora), a 200 a batch mérete, nem a frissítések száma.`
    },
    {
      type: "single",
      q: R`Szigmoid kimenet, log-loss: $\partial L/\partial w_i=(\hat p-y)x_i$. Ha $\hat p=0{,}8$, $y=1$, $x_i=2$ és $\eta=0{,}5$, hogyan változik $w_i$?`,
      options: [R`$+0{,}2$`, R`$-0{,}2$`, R`$+0{,}4$`, R`$+0{,}1$`],
      answer: 0,
      hint: R`$w \leftarrow w-\eta\cdot\text{gradiens}$. Mi a gradiens előjele?`,
      explain: R`Gradiens: $(0{,}8-1)\cdot2=-0{,}4$. Lépés: $-0{,}5\cdot(-0{,}4)=+0{,}2$. A $-0{,}2$ előjelhiba, a $+0{,}4$ elfelejti $\eta$-t, a $+0{,}1$ elfelejti $x_i$-t.`
    },
    {
      type: "single",
      q: "Mi történik, ha a tanulási ráta túl nagy?",
      options: [
        "A súlyok túllőnek a minimumon, a veszteség ugrál vagy nő – a tanítás széttarthat",
        "A tanítás biztosan gyorsabban és jobban konvergál",
        "A háló automatikusan több rejtett réteget kap",
        "Semmi, az Adam optimalizálónál a ráta nem számít"
      ],
      answer: 0,
      hint: R`Gondolj az $L(w)=(w-3)^2$ példára $\eta=1{,}1$-gyel.`,
      explain: R`$\eta=1{,}1$-nél $w$: $0\to6{,}6\to-1{,}32\to8{,}18$ – egyre távolabb. Túl kicsi rátánál viszont nagyon lassú. Az Adam kevésbé érzékeny, de a ráta nála is számít.`
    }
  ]
};

QUIZZES["l06-lepes9"] = {
  title: "Mini-kvíz – Túltanulás",
  questions: [
    {
      type: "single",
      q: "Tanító pontosság 98,8%, teszt pontosság 79,3%, a tanítási veszteség még csökken. Mi a legvalószínűbb diagnózis?",
      options: ["Túltanulás", "Alultanulás", "Adatszivárgás a teszthalmazból", "Jól általánosító modell, nincs teendő"],
      answer: 0,
      hint: "Mekkora a rés a tanító és a teszt eredmény között?",
      explain: "Közel 20 százalékpontos rés: a modell a tanítóhalmazt (zajostul) megtanulta, az új adatokra ez nem vihető át. Alultanulásnál a tanító-eredmény is gyenge lenne."
    },
    {
      type: "multi",
      q: "Melyik segít a túltanulás ellen?",
      options: [
        "Az alpha (L2-regularizáció) növelése",
        "Kevesebb neuron / réteg",
        "early_stopping=True (validációs korai leállítás)",
        "A max_iter jelentős növelése"
      ],
      answer: [0, 1, 2],
      hint: "Melyik csökkenti a modell „bemagolási” képességét, és melyik növeli?",
      explain: "A regularizáció mérsékli, a kisebb háló korlátozza, a korai leállítás megállítja a túltanulást. Több epoch ellenkezőleg hat: a kipróbált 5000 epochos futásban a tanító-pontosság 100% lett, a teszt 75,9%-ra romlott."
    },
    {
      type: "single",
      q: "Mit figyel a leállásnál az MLPClassifier, ha early_stopping=True?",
      options: [
        "A tanítóhalmazból leválasztott validációs rész (alapból 10%) pontosságát",
        "A teszthalmaz pontosságát",
        "A tanítási veszteséget, ugyanúgy, mint False esetén",
        "A súlyok négyzetösszegét"
      ],
      answer: 0,
      hint: "A teszthalmazhoz a tanítás során sosem nyúlunk.",
      explain: "True esetén a validation_fraction (alapból 0,1) részt félreteszi, és a validációs pontosságot figyeli; False esetén a tanítási veszteséget. A teszthalmazt a modell sosem látja."
    }
  ]
};

QUIZZES["l06-lepes10"] = {
  title: "Mini-kvíz – Tanítási elvek, keresztvalidáció",
  questions: [
    {
      type: "match",
      q: "Párosítsd az adathalmazt a szerepével!",
      pairs: [
        ["Tanítóhalmaz", "A súlyok (paraméterek) meghatározása"],
        ["Validációs halmaz", "Hiperparaméterek kiválasztása, korai leállítás"],
        ["Teszthalmaz", "Egyszeri, végső teljesítménybecslés"]
      ],
      hint: "Melyik halmazon milyen döntés születik – és melyiken semmilyen?",
      explain: "A tanítón a súlyokról, a validáción a beállításokról döntünk; a teszten semmiről, ezért ad független becslést. Ha a teszten választunk beállítást, a teszt is „validációs” lesz, és az eredménye optimista."
    },
    {
      type: "single",
      q: "85 tanítósor, 5-szörös keresztvalidáció, 8 hiperparaméter-kombináció. Hány modellt tanít a GridSearchCV (alapbeállítással)?",
      options: ["41", "40", "8", "425"],
      answer: 0,
      hint: "Kombinációnként k tanítás – és a végén még egy.",
      explain: R`$8\cdot5=40$ tanítás a keresztvalidációban, plusz 1 újratanítás a legjobb kombinációval a teljes tanítóhalmazon (<code>refit=True</code>): 41. A 40-ből kimaradt az újratanítás; a 8 a keresztvalidációt hagyja ki; a 425 = 85 · 5 sorokat számol, nem modelleket.`
    },
    {
      type: "single",
      q: "Miért kell a StandardScaler-t a modellel együtt egy Pipeline-ba tenni keresztvalidációnál?",
      options: [
        "Hogy minden foldban csak az ottani tanítórészen illeszkedjen, és a validációs fold ne szivárogjon bele",
        "Mert a GridSearchCV különben nem tudja standardizálni a célváltozót",
        "Hogy gyorsabban fusson: a Pipeline csak egyszer standardizál",
        "Mert MLP-nél a Pipeline nélkül a standardizálás tiltott"
      ],
      answer: 0,
      hint: "Gondolj a 7. lépésre: miért nem illeszthető a scaler a teszten? Itt minden fold egy kis „teszt”.",
      explain: "Ha a scalert a teljes tanítóhalmazon illesztjük, és utána keresztvalidálunk, minden validációs fold átlaga és szórása benne van a transzformációban – ez adatszivárgás, optimista CV-eredménnyel. A Pipeline foldonként újra illeszt. A célváltozót nem standardizáljuk; a Pipeline ettől nem gyorsabb, hanem helyesebb."
    },
    {
      type: "single",
      q: "A döntési fa mélységét keresztvalidálva (85 sor) egyik mélység sem éri el a többségi alapmodell 0,706-os CV-pontosságát, a teszten viszont a fa 0,724-et ér el. Mi a helyes következtetés?",
      options: [
        "A fa előnye ezen az adaton nem igazolható; a 29 fős teszt egyetlen felosztás, zajos",
        "A keresztvalidáció hibás, mert kevesebb adaton tanít",
        "A fa jobb az alapmodellnél, mert a teszten 0,724 > 0,706",
        "A legmélyebb fát kell választani, mert az tanul a legtöbbet"
      ],
      answer: 0,
      hint: "Melyik becslés használ több adatot a validálásra, és melyik hasonlít ugyanarra a felosztásra?",
      explain: "A keresztvalidáció mind a 85 sort validálásra is felhasználja (5 × 17), így megbízhatóbb, mint egyetlen 29 fős teszt. A teszten az alapmodell is 0,724 (és a 0,706 tanító-arány nem a teszt alapmodellje) – a fa itt sem jobb. A mélyebb fa CV-ben még rosszabb."
    }
  ]
};

QUIZZES["l06-lepes11"] = {
  title: "Mini-kvíz – Neurális hálók a BI-ban",
  questions: [
    {
      type: "match",
      q: "Párosítsd a BI-alkalmazást a feladattípussal!",
      pairs: [
        ["Hiteligénylő kockázati besorolása", "Osztályozás"],
        ["Jövő havi kereslet becslése", "Regresszió / idősor"],
        ["Ügyfelek csoportosítása előre megadott csoportok nélkül", "Nem felügyelt tanulás (klaszterezés)"],
        ["Hibás termék felismerése kameraképről", "Képosztályozás (CNN)"]
      ],
      hint: "Kategória, szám, címke nélküli csoport vagy kép a kimenet/bemenet?",
      explain: "A kockázati besorolás véges kategóriát ad (osztályozás), a kereslet folytonos szám (regresszió), a szegmentációhoz nincs címke (nem felügyelt), a kamerakép pedig a CNN tipikus bemenete."
    },
    {
      type: "multi",
      q: "Melyek az előadás „Q11” kérdésére adható helyes válaszok (a neurális hálós módszerek nehézségei)?",
      options: [
        "Nagy adatigény a sok paraméter miatt",
        "Hajlam a túltanulásra",
        "Sok hiperparaméter, költséges hangolás",
        "Nehéz megindokolni egy döntést („fekete doboz”)",
        "Csak lineáris döntési határt tudnak tanulni",
        "Nem lehet őket valószínűség becslésére használni"
      ],
      answer: [0, 1, 2, 3],
      hint: "Két opció olyasmit állít, amit a lecke elején épp cáfoltunk (3–4. lépés).",
      explain: "Adatigény, túltanulás, hiperparaméterek és értelmezhetőség a valódi nehézségek (plusz számításigény, a véletlen kezdősúlyoktól való függés). A lineáris határ a sima perceptron korlátja – az MLP nemlineáris aktivációval épp ezt oldja meg; a szigmoid kimenet pedig valószínűséget ad."
    },
    {
      type: "single",
      q: "Miért nevezzük a neurális hálót gépi tanulási módszernek?",
      options: [
        "Mert a viselkedését meghatározó súlyokat egy algoritmus a tanítóadatból határozza meg, nem kézzel programozzuk",
        "Mert számítógépen fut",
        "Mert a felépítése az emberi agy neuronjait utánozza",
        "Mert mindig pontosabb, mint a statisztikai modellek"
      ],
      answer: 0,
      hint: "Mi „tanul” a hálóban, és miből?",
      explain: "A gépi tanulás lényege, hogy a döntési modellt az adatokból automatikusan építjük fel: a háló súlyait a hibavisszaterjesztés + optimalizáló állítja be a tanítóhalmaz alapján, hogy új esetekre is általánosítson. A számítógépen futás és az agyi analógia nem ettől lesz tanulás; pontosabb pedig nem mindig."
    },
    {
      type: "single",
      q: "A gyakorlat (8, 4)-es hálója random_state = 0…9 mellett 0,724 és 0,828 közötti teszt-pontosságot ad. Mit tanulsz ebből?",
      options: [
        "Kis adaton egyetlen futás eredménye bizonytalan; több futás / keresztvalidáció átlaga kell, a random_state a reprodukálhatóságot szolgálja",
        "A 2-es és 3-as random_state a legjobb, ezért azt kell használni",
        "A neurális háló hibásan működik, mert determinisztikusnak kellene lennie",
        "A tesztadat hibás, mert a pontosság nem állandó"
      ],
      answer: 0,
      hint: "A kezdősúlyok véletlenek; mi történik, ha a „legjobb” véletlen magot a teszten választjuk ki?",
      explain: "A veszteségfüggvény nem konvex: más kezdősúlyokról más (lokális) megoldásba jut a tanítás. Kis adaton ez 21–24 helyes hallgató különbséget is jelenthet. A teszten kiválasztott random_state ugyanaz a csalás, mint a teszten kiválasztott beállítás. A random_state rögzítése a megismételhetőséget szolgálja, nem a minőséget."
    }
  ]
};

QUIZZES["l06-vegso"] = {
  title: "Ellenőrző kvíz – Neurális háló",
  questions: [
    {
      type: "single",
      q: R`Perceptron: $w=(0{,}3;\ 1)$, $b=-6$, $\hat y=1$, ha $z\ge0$. Mit dönt a $(9;\ 3{,}2)$ hallgatóra?`,
      options: [
        R`$z=-0{,}1$ → 0 (nem megy át)`,
        R`$z=-0{,}1$ → 1 (átmegy)`,
        R`$z=5{,}9$ → 1 (átmegy)`,
        R`$z=0{,}1$ → 1 (átmegy)`
      ],
      answer: 0,
      hint: "Súlyozott összeg + eltolás, majd az előjel dönt.",
      explain: R`$z=2{,}7+3{,}2-6=-0{,}1&lt;0$ → 0. Az 5,9 az eltolás elhagyása; a „−0,1 → 1” a küszöb félreolvasása.`
    },
    {
      type: "single",
      q: "Miért kell rejtett réteg az XOR megtanulásához?",
      options: [
        "Mert az XOR osztályai nem választhatók el egyetlen egyenessel, a perceptron pedig csak lineáris határt tud",
        "Mert az XOR-hoz több tanítópélda kell, mint négy",
        "Mert a perceptronnak nincs eltolása",
        "Mert az XOR bemenetei nincsenek standardizálva"
      ],
      answer: 0,
      hint: "Rajzold fel a négy pontot a síkon.",
      explain: "A két „1”-es pont átlósan áll; egy egyenes nem választja le őket. A rejtett réteg új jellemzőket gyárt (pl. „hány bemenet 1-es”, „mindkettő 1-es-e”), amelyekből már lineárisan dönthető."
    },
    {
      type: "single",
      q: R`Mennyi a logisztikus (szigmoid) függvény értéke $z=2$-nél?`,
      options: ["0,8808", "0,1192", "0,9640", "2"],
      answer: 0,
      hint: R`$\sigma(z)=1/(1+e^{-z})$.`,
      explain: R`$\sigma(2)=1/(1+e^{-2})=0{,}8808$. A 0,1192 a $\sigma(-2)$, a 0,9640 a $\tanh 2$, a 2 a ReLU értéke.`
    },
    {
      type: "match",
      q: "Párosítsd az aktivációs függvényt az értékkészletével!",
      pairs: [
        ["identity", "(−∞; ∞)"],
        ["logistic", "(0; 1)"],
        ["tanh", "(−1; 1)"],
        ["relu", "[0; ∞)"]
      ],
      hint: "Melyik vágja le a negatívakat, melyik nyom össze 0 és 1 közé, melyik szimmetrikus a 0-ra?",
      explain: R`identity: $z$; logistic: $1/(1+e^{-z})$; tanh: 0 körül szimmetrikus S-görbe; ReLU: $\max(0,z)$. Csak a logistic olvasható valószínűségként.`
    },
    {
      type: "single",
      q: R`Hány paramétere (súly + eltolás) van egy MLP-nek 7 bemenettel, <code>hidden_layer_sizes=(8, 4)</code> rétegekkel és 1 kimenettel?`,
      options: ["105", "92", "88", "20"],
      answer: 0,
      hint: R`Rétegenként: bemenetek × neuronok + neuronok (eltolás).`,
      explain: R`$7\cdot8+8=64$, $8\cdot4+4=36$, $4\cdot1+1=5$, összesen 105. A 92 az eltolások nélkül, a 88 a kimeneti réteg nélkül (és eltolás nélkül), a 20 a neuronok száma.`
    },
    {
      type: "single",
      q: R`Egy rejtett ReLU neuron: $h=\mathrm{ReLU}(2x_1-x_2)$, kimenet: $\hat p=\sigma(h-1)$. Mennyi $\hat p$, ha $x=(1;\ 3)$?`,
      options: ["0,2689", "0,1192", "0,5", "0,7311"],
      answer: 0,
      hint: "Előbb a rejtett neuron z-je, aztán a ReLU, csak utána a kimenet.",
      explain: R`$2-3=-1$ → ReLU → $h=0$. $\hat p=\sigma(0-1)=\sigma(-1)=0{,}2689$. A 0,1192 a ReLU kihagyása ($\sigma(-2)$), a 0,5 az eltolás elhagyása ($\sigma(0)$), a 0,7311 előjelhiba.`
    },
    {
      type: "single",
      q: R`Mennyi az átlagos log-loss, ha $y=(1,\ 0)$ és $\hat p=(0{,}8;\ 0{,}3)$?`,
      options: ["0,2899", "0,7136", "0,1259", "0,5798"],
      answer: 0,
      hint: R`$y=1$: $-\ln\hat p$; $y=0$: $-\ln(1-\hat p)$. Utána átlag.`,
      explain: R`$(-\ln0{,}8-\ln0{,}7)/2=(0{,}2231+0{,}3567)/2=0{,}2899$. A 0,7136 a $y=0$ sorra is $\ln\hat p$-t használ, a 0,1259 tízes alapú logaritmus, a 0,5798 az összeg átlagolás nélkül.`
    },
    {
      type: "multi",
      q: "Melyik állítás igaz az epochra és a batch-re (scikit-learn, Adam)?",
      options: [
        "Egy epoch a teljes tanítóhalmaz egyszeri feldolgozása",
        "A batch az egy súlyfrissítéshez használt példák száma",
        R`$n=85$ és <code>batch_size="auto"</code> esetén epochonként egy frissítés történik`,
        "Nagy adatnál egy epochban csak a batch méretnyi véletlen minta kerül feldolgozásra, a többi kimarad",
        "max_iter=1000 azt jelenti, hogy legfeljebb 1000 tanítópéldát használ fel"
      ],
      answer: [0, 1, 2],
      hint: R`auto = $\min(200, n)$. Egy epochban hány példa kerül sorra?`,
      explain: "Egy epochban minden példa sorra kerül, csak batch-ekre bontva; a batch méretétől függ, hány frissítés jut egy epochra. A max_iter (Adam/SGD esetén) az epochok maximális száma, nem a példáké."
    },
    {
      type: "single",
      q: R`A tanítóhalmazból: <code>study_hours</code> átlaga 11,2524, skálája 4,6019. Mivé alakítja a scaler egy teszthallgató 20 óráját?`,
      options: ["1,901", "8,748", "−1,901", "0,526"],
      answer: 0,
      hint: R`$x'=(x-\mu)/\sigma$, a tanítóhalmaz paramétereivel.`,
      explain: R`$(20-11{,}2524)/4{,}6019=1{,}901$. A 8,748 a szórással való osztás elhagyása, a −1,901 a kivonás megfordítása, a 0,526 a tört megfordítása.`
    },
    {
      type: "single",
      q: "Hogyan kell helyesen előkészíteni a tesztadatot a gyakorlat MLP-jéhez?",
      options: [
        "scaler.transform(X_test) a tanítóhalmazon illesztett scalerrel",
        "scaler.fit_transform(X_test), hogy a teszt is 0 átlagú és 1 szórású legyen",
        "A teljes adatot standardizálni a felosztás előtt, így egyszerűbb",
        "A tesztadatot nem kell standardizálni, csak a tanítót"
      ],
      answer: 0,
      hint: "A teszthalmaz a jövőbeli, ismeretlen adatot játssza.",
      explain: "A μ és σ csak a tanítóból jöhet (fit_transform a tanítón), a tesztre ugyanazok kellenek (transform). Az újraillesztés vagy a felosztás előtti standardizálás adatszivárgás; standardizálatlan teszt pedig más skálán lenne, mint amire a háló tanult."
    },
    {
      type: "single",
      q: "A tanítás után model.n_iter_ = 1000, és max_iter=1000. Mit jelent ez?",
      options: [
        "A max_iter állította meg a tanítást; a tol/n_iter_no_change feltétel nem teljesült, a veszteség még csökkent",
        "A tol feltétel teljesült, a modell konvergált",
        "A validációs pontosság romlani kezdett, ezért leállt",
        "A modell biztosan túltanult"
      ],
      answer: 0,
      hint: "Két leállási ok van: elfogy az epoch-keret, vagy elmarad a kellő javulás. Melyik történt?",
      explain: "Az epoch-korlát ért véget (ConvergenceWarning). Ebből nem következik, hogy több epoch jobb modellt adna – a teszt log-loss a gyakorlat hálóinál már jóval előbb (153. ill. 400. epoch) elérte a minimumát."
    },
    {
      type: "single",
      q: "A tanítási veszteség végig csökken, a validációs veszteség a 150. epoch körül minimumot ér el, utána nő. Mi a helyes következtetés?",
      options: [
        "Kb. a 150. epoch után túltanul a háló; a validációs minimum körül érdemes megállni",
        "A háló alultanul, növelni kell a max_iter-t",
        "Minden rendben, a tanítási veszteség számít",
        "A tanulási ráta túl nagy, ezért nő a validációs veszteség"
      ],
      answer: 0,
      hint: "Melyik görbe mutatja az új adaton nyújtott teljesítményt?",
      explain: "A tanító javul, a validáció romlik: ez a túltanulás definíciója. A korai leállítás pont a validációs görbe alapján áll meg, és a legjobb súlyokat tartja meg."
    },
    {
      type: "multi",
      q: "A gyakorlat eredményei alapján melyik igaz? (Döntési fa: acc 0,724, precision/recall (yes) 0,810/0,810; MLP-1 (8, 4): acc 0,793, precision 0,895, recall 0,810; MLP-2 (16, 8): acc 0,793, tanítási veszteség 0,061 vs. MLP-1 0,185.)",
      options: [
        "Az MLP-1 és a fa recallja azonos: mindkettő 17-et talál meg a 21 átment hallgatóból",
        "Az MLP-1 kevesebb bukott hallgatóról mondja tévesen, hogy átmegy, mint a fa",
        "Értelmezhetőség szempontjából a döntési fa nyer",
        "Az MLP-2 a jobb modell, mert kisebb a tanítási vesztesége",
        "A 0,724 → 0,793 különbség 29 teszthallgatónál nagy biztonsággal bizonyítja az MLP fölényét"
      ],
      answer: [0, 1, 2],
      hint: "Precision: a „yes”-nek jósoltak közül hány valóban yes. És mennyit ér egy hallgató 29-ből?",
      explain: "Recall 17/21 mindkettőnél; a precision különbsége (17/19 vs. 17/21) azt jelenti, hogy az MLP-1 2, a fa 4 téves „átmegy” jóslatot ad. A fa szabályai kiolvashatók, az MLP fekete doboz. Az MLP-2 kisebb tanítási vesztesége túltanulás, teszten nem jobb. A különbség csak 2 hallgató (1 hallgató ≈ 3,4 százalékpont), ez kis teszthalmazon nem erős bizonyíték."
    },
    {
      type: "single",
      q: "Mit csinál az alpha paraméter az MLPClassifierben?",
      options: [
        "Az L2-regularizáció erőssége: a veszteséghez a súlyok négyzetösszegével arányos büntetést ad",
        "A kezdeti tanulási ráta",
        "A validációs halmaz aránya korai leállításnál",
        "A javulási küszöb, amely alatt a tanítás leáll"
      ],
      answer: 0,
      hint: "A gyakorlati anyag szerint „a nagy súlyokat bünteti”.",
      explain: R`Veszteség $= L_{\log}+\frac{\alpha}{2n}\sum w^2$. Nagyobb alpha → kisebb súlyok → simább modell, kevesebb túltanulás (túl nagy alpha viszont alultanuláshoz vezet). A tanulási ráta a learning_rate_init, a validációs arány a validation_fraction, a küszöb a tol.`
    }
  ]
};
