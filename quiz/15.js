/* 15. lecke – Statisztikai alapok: eloszlások, CHT, t-próba, konfidencia-intervallum, F- és K–S próba – kvízek */
window.QUIZZES = window.QUIZZES || {};
var R = window.R || String.raw;

QUIZZES["l15-lepes3"] = {
  title: "Mini-kvíz – Minta, hisztogram, eloszlásfüggvény",
  questions: [
    {
      type: "match",
      q: "Párosítsd a fogalmat a webáruházas példa megfelelő elemével! (40 000 októberi rendelésből 500-at választanak ki, és megnézik a kiszállítási időt.)",
      pairs: [
        ["populáció", "a 40 000 októberi rendelés"],
        ["minta", "az 500 kiválasztott rendelés"],
        ["mintavételi egység", "egy rendelés kiszállítási ideje"],
        ["valószínűségi változó", "egy véletlenül választott rendelés kiszállítási ideje napokban, mint számérték"]
      ],
      hint: "A populáció az egész, amiről állítani akarunk valamit; a minta az a része, amit ténylegesen megnézünk.",
      explain: "A populáció az összes érdekes elem, a minta ennek egy részhalmaza. A mintavételi egység egy elemre vonatkozó kimenetel, a valószínűségi változó pedig ezt a véletlen kimenetelt írja le számként."
    },
    {
      type: "single",
      q: R`Nyolc kosár darabszáma: 2, 4, 4, 4, 5, 5, 7, 9. Mennyi a korrigált (mintabeli) szórás?`,
      options: [R`$\approx2{,}14$`, R`$2$`, R`$\approx4{,}57$`, R`$4$`],
      answer: 0,
      hint: R`Az eltérésnégyzetek összege 32. Mivel osztunk mintánál, és ne felejtsd el a gyökvonást!`,
      explain: R`$s^2=32/(8-1)\approx4{,}571$, $s\approx2{,}138$. A 2 az $n$-nel osztott (populációs) szórás, a 4,57 és a 4 a gyökvonás nélküli varianciák.`
    },
    {
      type: "single",
      q: R`A 22 elemű mintát (min = 1, max = 17) <strong>egyenlő hosszúságú</strong> tárolókra osztod, $k=4$ tárolóval. Mekkora egy tároló szélessége?`,
      options: ["4", "5,5", "4,25", "16"],
      answer: 0,
      hint: R`Szélesség $=(\max-\min)/k$.`,
      explain: R`$(17-1)/4=4$. Az 5,5 az egyenlő <em>terhelés</em> ideális elemszáma ($22/4$), a 4,25 a $17/4$ (a minimum kivonása elmaradt), a 16 a teljes terjedelem.`
    },
    {
      type: "single",
      q: R`A dia mintájában 16 elem $\le 9$ és 10 elem $\le 5$ (összesen 22 elem). Mekkora az $5&lt;X\le9$ értékek aránya?`,
      options: [R`$6/22\approx0{,}27$`, R`$16/22\approx0{,}73$`, R`$26/22$`, R`$10/22\approx0{,}45$`],
      answer: 0,
      hint: R`$P(a&lt;X\le b)=F(b)-F(a)$.`,
      explain: R`$F(9)-F(5)=16/22-10/22=6/22$. A 16/22 csak $F(9)$, a 10/22 csak $F(5)$; összeadni nem szabad (1-nél nagyobb „valószínűséget” adna).`
    },
    {
      type: "multi",
      q: "Mely állítások igazak az eloszlásfüggvényre, F(x) = P(X ≤ x)?",
      options: [
        "Monoton növekvő.",
        "F(−∞) = 0 és F(+∞) = 1.",
        "Ahol F(x) = 0,5, ott van a medián.",
        "Folytonos változónál F(x) az x érték valószínűsége.",
        "Az értéke lehet 1-nél nagyobb is, ha sok elem van."
      ],
      answer: [0, 1, 2],
      hint: "F(x) egy valószínűség (0 és 1 között), és „legfeljebb x”-et jelent, nem „pontosan x”-et.",
      explain: "Folytonos változónál egy konkrét érték valószínűsége 0; ott a sűrűségfüggvény f(x) = dF/dx a meredekség. F valószínűség, így sosem nagyobb 1-nél."
    }
  ]
};

QUIZZES["l15-lepes5"] = {
  title: "Mini-kvíz – Binomiális és normális eloszlás",
  questions: [
    {
      type: "single",
      q: R`A látogatók 20%-a vásárol. 10 független látogatóból mennyi a valószínűsége, hogy <strong>pontosan 2</strong> vásárol?`,
      options: [R`$\approx0{,}302$`, R`$\approx0{,}0067$`, R`$\approx0{,}067$`, R`$\approx0{,}107$`],
      answer: 0,
      hint: R`$P(X=k)=\binom nk p^k q^{n-k}$ – ne felejtsd el, hányféle sorrendben lehet a 2 vásárló.`,
      explain: R`$\binom{10}{2}0{,}2^2 0{,}8^8=45\cdot0{,}04\cdot0{,}168\approx0{,}302$. A 0,0067 egyetlen sorrend valószínűsége (elmaradt a $\binom{10}{2}$), a 0,067 a $\binom{10}{2}$ helyett 10-zel szoroz, a 0,107 a $P(X=0)$.`
    },
    {
      type: "single",
      q: R`Ugyanitt ($n=10$, $p=0{,}2$) mennyi a valószínűsége, hogy <strong>legalább egy</strong> látogató vásárol?`,
      options: [R`$\approx0{,}893$`, R`$\approx0{,}107$`, R`$2$`, R`$0{,}2$`],
      answer: 0,
      hint: "Az ellentett esemény: senki sem vásárol.",
      explain: R`$1-0{,}8^{10}\approx1-0{,}107=0{,}893$. A 0,107 maga az ellentett esemény, a 2 a várható érték ($np$), a 0,2 egyetlen látogató valószínűsége.`
    },
    {
      type: "single",
      q: R`Egy pontszám $N(100,15)$ eloszlású. Mennyi a 130 pont z-értéke, és az értékek kb. hány százaléka nagyobb ennél?`,
      options: [R`$z=2$; kb. 2,3%`, R`$z=2$; kb. 4,6%`, R`$z=30$; kb. 0%`, R`$z=1{,}3$; kb. 10%`],
      answer: 0,
      hint: R`$z=(x-\mu)/\sigma$. A $\mu\pm2\sigma$ sávon kívüli rész két szélre oszlik.`,
      explain: R`$z=30/15=2$. A sávon kívül 4,6% van, ennek a fele (a felső szél) 2,3%. A 4,6% mindkét szélt számolja, a $z=30$ elfelejti a szórással osztást, az 1,3 a $130/100$.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak a normális eloszlásra és a standardizálásra?",
      options: [
        R`Az értékek kb. 99,7%-a a $\mu\pm3\sigma$ tartományba esik.`,
        R`Ha $X\in N(\mu,\sigma)$, akkor $Z=(X-\mu)/\sigma\in N(0,1)$.`,
        "Sok független komponens összesített hatását írja le.",
        "Standardizálás után bármely adat normális eloszlású lesz.",
        "A tételértékek (line_total) ferdesége 2,25, ezért jól közelíthetők normális eloszlással."
      ],
      answer: [0, 1, 2],
      hint: "A standardizálás eltol és átskáláz. Megváltoztatja-e az eloszlás alakját?",
      explain: "A standardizálás az átlagot 0-ra, a szórást 1-re állítja, de az alakot (ferdeséget) nem változtatja. A 2,25-ös ferdeség erősen jobbra ferde eloszlást jelent, ez nem normális."
    },
    {
      type: "single",
      q: "Melyik binomiális eloszlású valószínűségi változó?",
      options: [
        "20 kosárból hányban van kenyér (a kosarak függetlenek, a kenyér valószínűsége mindegyikben ugyanaz)",
        "Hány látogató jön az első vásárlásig",
        "A következő kosár értéke forintban",
        "Egy vásárló életkora"
      ],
      answer: 0,
      hint: "Binomiális: rögzített számú független kísérlet, mindegyik siker vagy kudarc, és a sikerek számát számoljuk.",
      explain: "Az első vásárlásig tartó látogatószámnál nincs rögzített n (az geometriai eloszlás). A kosárérték és az életkor nem sikerek száma, hanem folytonos mennyiség."
    }
  ]
};

QUIZZES["l15-lepes8"] = {
  title: "Mini-kvíz – CHT, hipotézisvizsgálat, t-próba",
  questions: [
    {
      type: "single",
      q: R`Egy eloszlás szórása $\sigma=30$. Mekkora a 225 elemű minták átlagának szórása (a standard hiba)?`,
      options: ["2", R`$\approx0{,}133$`, "4", "30"],
      answer: 0,
      hint: R`CHT: a mintaátlag szórása $\sigma/\sqrt n$.`,
      explain: R`$30/\sqrt{225}=30/15=2$. A 0,133 $\sqrt n$ helyett $n$-nel oszt, a 4 a variancia ($900/225$), a 30 az egyes értékek szórása, nem az átlagé.`
    },
    {
      type: "single",
      q: "Mit állít a centrális határeloszlás-tétel?",
      options: [
        "Bármely (véges szórású) eloszlásból vett n elemű minták átlagai n növelésével normális eloszláshoz tartanak, átlaguk μ, szórásuk σ/√n.",
        "Elég nagy mintában maguk az adatok normális eloszlásúak lesznek.",
        "A mintaátlagok szórása n növelésével σ-hoz tart.",
        "Csak normális eloszlású populációra igaz, hogy a mintaátlag átlaga μ."
      ],
      answer: 0,
      hint: "Az egyes értékekről vagy az átlagokról szól a tétel?",
      explain: "A tétel az átlagokról szól: az egyes adatok eloszlása (pl. egy ferde tételérték) nem változik. A mintaátlagok szórása σ/√n, ez 0-hoz tart, nem σ-hoz. Az átlagok átlaga bármely eloszlásnál μ."
    },
    {
      type: "single",
      q: R`Egy próba p-értéke $0{,}03$. Mi a helyes döntés?`,
      options: [
        R`$\alpha=0{,}05$ mellett elvetjük $H_0$-t, $\alpha=0{,}01$ mellett nem.`,
        R`$\alpha=0{,}05$ mellett nem vetjük el $H_0$-t, $\alpha=0{,}01$ mellett igen.`,
        R`$H_0$ igaz valószínűsége 3%, ezért mindkét szinten elvetjük.`,
        R`Bebizonyítottuk $H_0$-t, mert a p-érték kicsi.`
      ],
      answer: 0,
      hint: R`Szabály: ha $p&lt;\alpha$, elvetjük $H_0$-t.`,
      explain: R`$0{,}03&lt;0{,}05$, elvetjük; $0{,}03&gt;0{,}01$, nem vetjük el. A p-érték nem $H_0$ valószínűsége, hanem annak az esélye, hogy $H_0$ mellett legalább ekkora eltérést kapunk.`
    },
    {
      type: "single",
      q: R`$n=16$, $\bar x=52$, $s=4$, $H_0:\mu=50$. Mennyi a t-statisztika, és mi a döntés 5%-on (kétoldali, $t_{\text{krit}}(15)=2{,}131$)?`,
      options: [
        R`$t=2$; nem vetjük el $H_0$-t`,
        R`$t=2$; elvetjük $H_0$-t`,
        R`$t=0{,}5$; nem vetjük el $H_0$-t`,
        R`$t=8$; elvetjük $H_0$-t`
      ],
      answer: 0,
      hint: R`A nevezőben a standard hiba, $s/\sqrt n$ áll.`,
      explain: R`$t=(52-50)/(4/\sqrt{16})=2/1=2&lt;2{,}131$, nem vetjük el ($p\approx0{,}064$). A 0,5 a szórással oszt (elmaradt a $\sqrt n$), a 8 $\sqrt n$ helyett $n$-nel oszt ($4/16$). Az „elvetjük” a 2-t az 1,96-os normális határhoz méri.`
    },
    {
      type: "multi",
      q: "Miért Student-eloszlást használ a t-próba a normális helyett?",
      options: [
        "Mert σ helyett a mintából becsült s-sel osztunk, és ez kis mintán maga is ingadozik.",
        "Mert a Student-eloszlás vastagabb szélű, így kis mintán nagyobb a kritikus érték.",
        "Mert a szabadságfok (n − 1) növelésével a Student-eloszlás a normálishoz tart.",
        "Mert a Student-eloszlás csak pozitív értékeket vehet fel.",
        "Mert a t-próba nem feltételezi a megfigyelések függetlenségét."
      ],
      answer: [0, 1, 2],
      hint: "Mi a különbség a z- és a t-statisztika nevezője között?",
      explain: "A t-eloszlás szimmetrikus a 0 körül (negatív értékei is vannak), és a próba független megfigyeléseket feltételez. A becsült szórás többletbizonytalansága miatt vastagabb a széle: df = 4-nél 2,776 a kritikus érték az 1,96 helyett."
    }
  ]
};

QUIZZES["l15-lepes11"] = {
  title: "Mini-kvíz – Konfidencia-intervallum, F-próba, K–S próba",
  questions: [
    {
      type: "single",
      q: R`A dia adataira $\bar x=71$, $s=18{,}17$, $n=10$. Melyik a 98%-os konfidencia-intervallum? ($t_{\text{krit}}$: 98% kétoldali, $df=9$: 2,821; normális: 2,326; 98% egyoldali, $df=9$: 2,398)`,
      options: [
        R`$54{,}79\ldots87{,}21$`,
        R`$57{,}63\ldots84{,}37$`,
        R`$57{,}22\ldots84{,}78$`,
        R`$19{,}74\ldots122{,}26$`
      ],
      answer: 0,
      hint: R`$\bar x\pm t_{\text{krit}}\cdot s/\sqrt n$, kétoldali $\alpha=0{,}02$-vel és $n-1$ szabadságfokkal.`,
      explain: R`$s/\sqrt{10}\approx5{,}746$, $2{,}821\cdot5{,}746\approx16{,}21$. A 57,63…84,37 a normális kritikus értéket használja, az 57,22…84,78 az egyoldali oszlopot, a 19,74…122,26 pedig elfelejti a $\sqrt n$-nel osztást.`
    },
    {
      type: "single",
      q: "Mit jelent a 95%-os konfidencia-intervallum az átlagra?",
      options: [
        "Ha sok mintából így szerkesztenénk intervallumot, azok kb. 95%-a tartalmazná a populáció valódi átlagát.",
        "A mintaelemek 95%-a ebbe az intervallumba esik.",
        "A mintaátlag 95% valószínűséggel ebben az intervallumban van.",
        "A populáció elemeinek 95%-a ebbe az intervallumba esik."
      ],
      answer: 0,
      hint: "Mire vonatkozik az intervallum: az egyes adatokra vagy egy paraméterre? És melyik ismeretlen?",
      explain: "Az intervallum a populáció átlagát (μ) célozza. A mintaátlag biztosan benne van (az a közepe), az egyes adatok pedig jóval szélesebben szórnak: a dia 10 méréséből csak 5 esik a 95%-os intervallumba."
    },
    {
      type: "single",
      q: R`Két gép mérései: G1 = 4, 6, 5, 7, 8 ($s^2=2{,}5$) és G2 = 2, 9, 5, 11, 3 ($s^2=15$). Mennyi az F-statisztika, és mit jelentene $F\approx1$?`,
      options: [
        R`$F=6$; $F\approx1$ esetén a két variancia hasonló`,
        R`$F=6$; $F\approx1$ esetén a két átlag egyenlő`,
        R`$F=12{,}5$; $F\approx1$ esetén a két variancia hasonló`,
        R`$F=0$; mert a két átlag (6 és 6) egyenlő`
      ],
      answer: 0,
      hint: "Az F-statisztika két variancia aránya, nem különbsége.",
      explain: R`$F=15/2{,}5=6$. A 12,5 különbség, nem arány. Az F-próba itt a szóródást hasonlítja össze; az átlagok egyenlősége erről semmit nem mond. (ANOVA-nál az F az átlagokról dönt, de ott is varianciák arányán keresztül.)`
    },
    {
      type: "single",
      q: "Négy üzlet napi forgalmát akarod összehasonlítani: különbözik-e az átlaguk? Melyik eszköz a megfelelő, és miért?",
      options: [
        "Egyszempontos ANOVA (f_oneway), mert egyetlen próbával, 5%-os szinten dönt mind a négy csoportról.",
        "Hat páronkénti t-próba 5%-on, mert így pontosabb.",
        "Kolmogorov–Szmirnov próba, mert az átlagokat hasonlítja össze.",
        "Egymintás t-próba a négy csoport összevont adatán."
      ],
      answer: 0,
      hint: "Ha sok próbát futtatsz 5%-on, mi lesz a téves riasztások esélyével?",
      explain: "Hat páronkénti próbánál legalább egy téves riasztás esélye kb. 1 − 0,95⁶ ≈ 26%. A K–S a teljes eloszlást hasonlítja össze (nem az átlagot), és csak két mintát. Az egymintás t-próba egy átlagot vet össze egy adott értékkel."
    },
    {
      type: "single",
      q: R`S1 = 1, 2, 3, 4, 5 és S2 = 3, 4, 5, 6, 7. Mennyi a K–S próba $D$ statisztikája?`,
      options: ["0,4", "2", "0,2", "1"],
      answer: 0,
      hint: R`Írd fel mindkét minta empirikus eloszlásfüggvényét (lépcsők 0,2-esével), és keresd a legnagyobb függőleges távolságot.`,
      explain: R`Például $x=3$-nál $F_1=0{,}6$, $F_2=0{,}2$, a különbség $0{,}4$; ennél nagyobb nincs. A 2 az átlagok különbsége, nem CDF-távolság. A 0,2 egy lépcső magassága, az 1 a CDF maximuma.`
    }
  ]
};

QUIZZES["l15-vegso"] = {
  title: "Ellenőrző kvíz – Statisztikai alapok",
  questions: [
    {
      type: "match",
      q: "Párosítsd a kérdést a megfelelő eszközzel!",
      pairs: [
        ["Lehet-e a populáció átlaga 250 g?", "egymintás t-próba"],
        ["Különbözik-e három szak hallgatóinak átlagos tanulási ideje?", "ANOVA (f_oneway)"],
        ["Ugyanabból az eloszlásból jön-e a két minta?", "Kolmogorov–Szmirnov próba"],
        ["Egyforma-e két gép töltésének szóródása?", "F-próba (varianciaarány)"],
        ["Milyen tartományban van a valódi átlag 98%-os biztonsággal?", "konfidencia-intervallum"]
      ],
      hint: "Átlag egy értékhez, több átlag egymáshoz, szóródás, teljes eloszlás, tartomány – mindegyikhez más eszköz tartozik.",
      explain: "Egy átlag kontra egy adott érték: egymintás t-próba. Kettőnél több csoport átlaga: ANOVA. Varianciák: F-próba. Teljes eloszlás: K–S. Tartomány a paraméterre: konfidencia-intervallum."
    },
    {
      type: "single",
      q: R`Egy töltőgép 6 mérése: $\bar x\approx247{,}17$ g, $s\approx1{,}47$ g. $H_0:\mu=250$, kétoldali 5%-os próba, $t_{\text{krit}}(5)=2{,}571$. Mi a döntés?`,
      options: [
        R`$t\approx-4{,}71$, elvetjük: a gép valószínűleg kevesebbet tölt`,
        R`$t\approx-1{,}92$, nem vetjük el`,
        R`$t\approx-4{,}71$, nem vetjük el, mert negatív`,
        R`$t\approx-11{,}5$, elvetjük`
      ],
      answer: 0,
      hint: R`Standard hiba: $1{,}47/\sqrt6\approx0{,}60$. Kétoldali próbánál $|t|$-t hasonlítjuk a kritikus értékhez.`,
      explain: R`$t=-2{,}83/0{,}601\approx-4{,}71$, $|t|&gt;2{,}571$, elvetjük ($p\approx0{,}005$). A $-1{,}92$ a szórással oszt (elmaradt a $\sqrt n$), a $-11{,}5$ $\sqrt n$ helyett $n$-nel oszt ($1{,}47/6$). Az előjel csak az irányt mutatja.`
    },
    {
      type: "single",
      q: "Mi a t-próba szerepe?",
      options: [
        "Átlagokra vonatkozó hipotézis ellenőrzése: egy csoport átlagát egy hipotetikus μ₀ értékhez (egymintás) vagy két csoport átlagát egymáshoz (kétmintás) hasonlítja.",
        "Két minta teljes eloszlásának összehasonlítása az empirikus eloszlásfüggvények alapján.",
        "Két változó lineáris kapcsolatának erősségét méri −1 és 1 között.",
        "Két variancia arányát vizsgálja."
      ],
      answer: 0,
      hint: "Melyik paraméterről szól a t-statisztika számlálója?",
      explain: "A t-statisztika számlálója átlagkülönbség (x̄ − μ₀). A teljes eloszlást a K–S próba, a varianciák arányát az F-próba, a lineáris kapcsolatot a Pearson-korreláció vizsgálja."
    },
    {
      type: "single",
      q: R`Egy előrejelző modell és egy alapmodell accuracy-je ugyanaz (0,724) a 29 elemű teszthalmazon. Egy másik futtatásban a modell 0,759-et ér el (1 hallgatóval több helyes). Melyik következtetés helyes?`,
      options: [
        "Egy hallgató 3,4 százalékpont; ekkora teszthalmazon ez az eltérés könnyen lehet a véletlen műve.",
        "A modell 3,4 százalékponttal jobb, tehát biztosan jobb az alapmodellnél.",
        "Az accuracy nem függ a teszthalmaz méretétől, ezért az eltérés valódi.",
        "Mivel a különbség pozitív, a nullhipotézist igazoltuk."
      ],
      answer: 0,
      hint: "Gondolj a standard hibára: hány elemből számoltuk az arányt?",
      explain: "29 elemnél egyetlen eset 1/29 ≈ 3,4 százalékpont. A mintavételi ingadozás ekkora mintán ennél nagyobb, ezért egy ilyen eltérés nem bizonyít semmit. Ugyanaz a kérdés, mint a t-próbánál: elég nagy-e az eltérés a standard hibához képest?"
    },
    {
      type: "single",
      q: R`A dia X1 és X2 sorozatának korrelációja $r\approx0{,}285$. Mennyi $r(\text{X1}, \text{X3})$, ha $\text{X3}=\text{round}(3\cdot x, 2)$?`,
      options: ["1", "0,285", "0,855", "3"],
      answer: 0,
      hint: "X1 két tizedesjegyű, így a kerekítés nem változtat semmit. Hogyan reagál a Pearson-korreláció egy változó pozitív számmal való szorzására?",
      explain: R`$\text{X3}=3\cdot\text{X1}$ pontosan, egy változó és saját pozitív többszörösének korrelációja 1. A 0,285 az X1–X2 korreláció, a 0,855 ennek háromszorosa. A korreláció sosem lehet 1-nél nagyobb.`
    },
    {
      type: "multi",
      q: "Kétmintás t-próbával összehasonlítottuk a sikeres (81 fő, 11,96 óra) és a sikertelen (33 fő, 9,69 óra) hallgatók tanulási idejét: t ≈ 2,59, p ≈ 0,012. Mely állítások igazak?",
      options: [
        "5%-os szinten elvetjük a nullhipotézist, hogy a két csoport átlaga egyenlő.",
        "Ha a két csoport átlaga egyenlő lenne, ekkora vagy nagyobb különbség kb. 1,2% eséllyel jönne ki.",
        "1%-os szinten nem vetjük el a nullhipotézist.",
        "Bebizonyítottuk, hogy a több tanulás okozza a sikert.",
        "A nullhipotézis 1,2% valószínűséggel igaz."
      ],
      answer: [0, 1, 2],
      hint: R`Hasonlítsd a p-értéket mindkét $\alpha$-hoz, és gondold végig, mit jelent pontosan a p-érték.`,
      explain: "p = 0,012 < 0,05, de > 0,01. A p-érték a H₀ melletti esélye ekkora eltérésnek, nem H₀ valószínűsége. A próba ok-okozatot nem bizonyít: a jobb előképzettségűek többet is tanulhatnak, és sikeresebbek is lehetnek."
    },
    {
      type: "single",
      q: "Mi történik, ha a szignifikanciaszintet 0,05-ről 0,01-re csökkentjük (a konfidenciaszintet 95%-ról 99%-ra növeljük)?",
      options: [
        "Ritkábban vetünk el igaz nullhipotézist (kevesebb I. fajú hiba), de gyakrabban nem vesszük észre a valódi eltérést (több II. fajú hiba); a konfidencia-intervallum szélesebb lesz.",
        "Mindkét fajta hiba ritkább lesz.",
        "A konfidencia-intervallum keskenyebb lesz.",
        "Gyakrabban vetjük el a nullhipotézist."
      ],
      answer: 0,
      hint: "Szigorúbb mérce: nehezebb vagy könnyebb elvetni H₀-t?",
      explain: "A kisebb α nagyobb kritikus értéket jelent: H₀-t nehezebb elvetni. Ez csökkenti az I. fajú, de növeli a II. fajú hibát. Az intervallum szélesebb lesz (98%: 2,821 helyett 99%: 3,250 a df = 9 sorban). Adott mintán mindkét hibát egyszerre csak nagyobb mintával lehet csökkenteni."
    },
    {
      type: "single",
      q: "Mire való a hisztogram egyenlő terhelésű (egyenlő gyakoriságú) felosztása, és mi a hátránya ábrázolásnál?",
      options: [
        "Minden tárolóba nagyjából ugyanannyi elem kerül, így nincs üres tároló; az oszlopok egyforma magasak, ezért az eloszlás alakja csak a szélességekből olvasható ki.",
        "Minden tároló egyforma széles; ferde adatnál üres tárolók maradhatnak.",
        "A tárolóhatárok nem függnek a mintától.",
        "Mindig pontosan n/k elem jut minden tárolóba, akkor is, ha vannak ismétlődő értékek."
      ],
      answer: 0,
      hint: "Egyenlő terhelés = a határok a kvantilisek.",
      explain: "Az egyforma szélesség az egyenlő hosszúságú felosztás. A kvantilis alapú határok is a mintától függnek (mintafüggőség). Ismétlődő értékeknél nem lehet pontosan n/k elemet tenni minden tárolóba: a dia mintáján 7 · 4 · 5 · 6 lett 5,5 helyett."
    }
  ]
};
