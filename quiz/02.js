/* 2. lecke – Kosárelemzés: Apriori és asszociációs szabályok – kvízek */

QUIZZES["l02-lepes2"] = {
  title: "Mini-kvíz – Támogatottság",
  questions: [
    {
      type: "single",
      q: "8 kosárból 3-ban van együtt tej és kenyér. Mennyi a {tej, kenyér} relatív támogatottsága?",
      options: ["0,375", "0,333", "0,625", "0,600"],
      answer: 0,
      hint: "Az együttes előfordulások számát az összes kosár számával oszd.",
      explain: R`$\operatorname{support} = 3/8 = 0{,}375$. A 0,625 a komplementer ($5/8$), a 0,333 és 0,600 rossz nevezőből jön.`
    },
    {
      type: "single",
      q: "A gyakorlat adatán $N = 1151$ kosár, min_support = 0,10. Legalább hány kosárban kell szerepelnie egy halmaznak, hogy gyakori legyen?",
      options: ["116 kosár", "115 kosár", "10 kosár", "1151 kosár"],
      answer: 0,
      hint: "Szorozd meg, és gondold meg, merre kell kerekíteni a „legalább” miatt.",
      explain: R`$0{,}10\cdot 1151 = 115{,}1$, a „legalább” miatt felfelé kerekítünk: 116. A 115 kosár csak 9,99%, tehát ritka. (A gyakorlat legritkább gyakori párja valóban 116 kosaras.)`
    },
    {
      type: "multi",
      q: "support({kávé}) = 0,47 és support({kávé, keksz}) = 0,28. Mely értékek lehetnek support({kávé, keksz, tej})?",
      options: ["0,12", "0,28", "0,30", "0,47"],
      answer: [0, 1],
      hint: "Bővítéskor a támogatottság nőhet, csökkenhet vagy egyik sem?",
      explain: R`A támogatottság antimonoton: a bővítés legfeljebb akkora, mint a részhalmazé, tehát $\le 0{,}28$. A 0,28 is lehetséges (ha minden kávé–keksz kosárban tej is van). A 0,30 és 0,47 nagyobb lenne a részhalmazénál.`
    }
  ]
};

QUIZZES["l02-lepes3"] = {
  title: "Mini-kvíz – Apriori",
  questions: [
    {
      type: "single",
      q: "Melyik az Apriori-elv?",
      options: [
        "Ha egy halmaz ritka, akkor minden bővítése is ritka.",
        "Ha két termék külön-külön gyakori, akkor együtt is gyakori.",
        "Ha egy halmaz gyakori, akkor minden bővítése is gyakori.",
        "A gyakori halmazokból képzett szabályok megbízhatósága legalább a minimum támogatottság."
      ],
      answer: 0,
      hint: "Bővítéskor a támogatottság csak csökkenhet. Mit lehet ebből kizárni?",
      explain: R`Gyakori halmaz minden részhalmaza gyakori; ekvivalensen: ritka halmaz minden bővítése ritka. A „külön gyakori → együtt gyakori” a fordított, hamis irány (demó: Sajt és Tej gyakori, együtt egyszer sem).`
    },
    {
      type: "single",
      q: "$L_2$ = {A,B}, {A,C}, {B,C}, {B,D}. Mely 3-elemű jelölt(ek) maradnak a metszés után?",
      options: ["csak {A,B,C}", "{A,B,C} és {B,C,D}", "{A,B,C}, {A,B,D} és {B,C,D}", "egyik sem"],
      answer: 0,
      hint: "Előbb képezd az uniókat, amelyek 3 eleműek; aztán nézd meg minden jelölt összes 2-elemű részhalmazát.",
      explain: R`Összekapcsolás: {A,B,C}, {A,B,D}, {B,C,D}. {A,B,D}-ben {A,D}, {B,C,D}-ben {C,D} nincs $L_2$-ben → kiesnek. {A,B,C} minden párja gyakori → marad (és ezután még meg kell számolni!).`
    },
    {
      type: "multi",
      q: "Mely lépések részei az Apriori algoritmus egy szintjének?",
      options: [
        "Jelöltgenerálás az előző szint gyakori halmazaiból",
        "Metszés: ritka részhalmazt tartalmazó jelöltek elhagyása",
        "A megmaradt jelöltek támogatottságának számlálása és szűrése",
        "A megbízhatóság kiszámítása",
        "A szabályok lift szerinti rendezése"
      ],
      answer: [0, 1, 2],
      hint: "Az Apriori csak gyakori halmazokat keres. Melyik fogalom tartozik már a szabályokhoz?",
      explain: R`Egy szint: összekapcsolás → metszés → számlálás és szűrés. A megbízhatóság és a lift a külön szabálygeneráló algoritmus része.`
    }
  ]
};

QUIZZES["l02-lepes4"] = {
  title: "Mini-kvíz – Megbízhatóság",
  questions: [
    {
      type: "single",
      q: "10 kosár; $A$ 5-ben, $B$ 4-ben, együtt 2-ben. Mennyi confidence($A\\to B$)?",
      options: ["0,40", "0,50", "0,20", "1,00"],
      answer: 0,
      hint: "A bal oldal ($A$) kosarai közül hányban van $B$ is?",
      explain: R`$2/5 = 0{,}40$. A 0,50 a fordított irány ($B\to A$: $2/4$), a 0,20 a szabály támogatottsága ($2/10$), az 1,00 a lift ($0{,}2/(0{,}5\cdot 0{,}4)$).`
    },
    {
      type: "single",
      q: "Mit jelent, hogy confidence(vaj → kenyér) = 0,74?",
      options: [
        "A vajat tartalmazó kosarak 74%-ában kenyér is van.",
        "A kenyeret tartalmazó kosarak 74%-ában vaj is van.",
        "Az összes kosár 74%-ában van vaj és kenyér együtt.",
        "A vaj vásárlása 74%-kal növeli a kenyér vásárlásának esélyét."
      ],
      answer: 0,
      hint: "A megbízhatóság feltételes arány: melyik oldal a feltétel?",
      explain: R`$P(\text{kenyér}\mid\text{vaj})$: a vajas kosarak 74%-a. A második a fordított irány, a harmadik a support, a negyedik inkább a lift értelmezése lenne (és az sem pontosan így).`
    },
    {
      type: "single",
      q: "Hány asszociációs szabály képezhető egy 3 elemű gyakori halmazból?",
      options: ["6", "3", "8", "2"],
      answer: 0,
      hint: "A bal oldal bármely nem üres, valódi részhalmaz lehet.",
      explain: R`$2^3 - 2 = 6$: három 1-elemű és három 2-elemű bal oldal. A 8 az összes részhalmaz (az üres és a teljes is), ami nem lehet bal oldal.`
    }
  ]
};

QUIZZES["l02-lepes5"] = {
  title: "Mini-kvíz – Lift",
  questions: [
    {
      type: "match",
      q: "Párosítsd a lift értékét a jelentésével!",
      pairs: [
        ["lift &gt; 1", "A mellett B gyakoribb, mint általában (pozitív kapcsolat)"],
        ["lift = 1", "a függetlenség szerinti gyakoriság, nincs kapcsolat"],
        ["lift &lt; 1", "A mellett B ritkább, mint általában (negatív kapcsolat)"]
      ],
      hint: "A lift a tényleges és a függetlenség mellett várt együttes gyakoriság hányadosa.",
      explain: R`$\operatorname{lift} = \frac{\operatorname{support}(A\cup B)}{\operatorname{support}(A)\operatorname{support}(B)}$. Ha a számláló nagyobb a függetlenség mellett vártnál, a lift 1 fölött van.`
    },
    {
      type: "single",
      q: "support($A$) = 0,4, support($B$) = 0,5, support($A\\cup B$) = 0,3. Mennyi a lift?",
      options: ["1,50", "0,75", "0,60", "0,20"],
      answer: 0,
      hint: "Oszd az együttes támogatottságot a két támogatottság szorzatával.",
      explain: R`$0{,}3/(0{,}4\cdot 0{,}5) = 1{,}5$. A 0,75 a confidence($A\to B$), a 0,60 a confidence($B\to A$), a 0,20 a függetlenség mellett várt együttes arány.`
    },
    {
      type: "single",
      q: "confidence(kávé → kenyér) = 0,55, és a kenyér a kosarak 55%-ában szerepel. Mit mondhatunk?",
      options: [
        "A lift kb. 1: a kávé nem változtat a kenyérvásárlás esélyén.",
        "Erős szabály, mert a kávét vevők több mint fele kenyeret is vesz.",
        "A lift kb. 0,30, tehát negatív a kapcsolat.",
        "Nem lehet eldönteni a kávé támogatottsága nélkül."
      ],
      answer: 0,
      hint: R`$\operatorname{lift} = \operatorname{confidence}/\operatorname{support}(B)$.`,
      explain: R`$0{,}55/0{,}55 \approx 1$ (pontosan 0,995). A magas megbízhatóság csak a kenyér népszerűségéből jön. A lift kiszámításához a kávé támogatottsága nem kell, ha a confidence ismert.`
    }
  ]
};

QUIZZES["l02-vegso"] = {
  title: "Ellenőrző kvíz – Kosárelemzés",
  questions: [
    {
      type: "single",
      q: "Mi határozza meg a kosarat (tranzakciót) a gyakorlat adatán?",
      options: [
        "a vásárlásazonosító (transaction_id)",
        "a vásárlóazonosító (customer_id)",
        "a vásárlás dátuma (egy nap = egy kosár)",
        "a régió és a dátum együtt"
      ],
      answer: 0,
      hint: "Egy vásárló többször is vásárolhat.",
      explain: R`A kosár egy vásárlás termékeinek halmaza, a <code>transaction_id</code> szerint csoportosítva. Ugyanannak a vásárlónak több kosara is lehet.`
    },
    {
      type: "single",
      q: "Miért hagyjuk figyelmen kívül a quantity (mennyiség) oszlopot?",
      options: [
        "Mert a kosárelemzés csak azt nézi, benne van-e a termék a kosárban.",
        "Mert a mennyiség hiányos az adatban.",
        "Mert a TransactionEncoder csak egész számot tud kezelni.",
        "Mert a mennyiséget a lift már tartalmazza."
      ],
      answer: 0,
      hint: "Mi kerül a kosár–termék mátrix celláiba?",
      explain: R`A kosár halmaz, a mátrixban 1/0 (True/False) áll. 3 kenyér is csak 1.`
    },
    {
      type: "single",
      q: "Kosarak (K = Kenyér, T = Tej, V = Vaj, S = Sajt): {K,T,V}, {K,T,V}, {K,T}, {K,S}, {K,S,Tea}. Mennyi support({T,V})?",
      options: ["0,4", "0,6", "0,667", "0,2"],
      answer: 0,
      hint: "Hány kosárban van Tej ÉS Vaj is?",
      explain: R`Az első két kosárban: $2/5 = 0{,}4$. A 0,6 a {T} támogatottsága, a 0,667 a confidence(T → V).`
    },
    {
      type: "multi",
      q: "Mely állítások igazak az Apriori-elv (és a támogatottság antimonotonitása) alapján?",
      options: [
        "Ha {Sajt, Tej} ritka, akkor {Kenyér, Sajt, Tej} is ritka.",
        "Ha {Kenyér, Tej} gyakori, akkor {Kenyér} és {Tej} is gyakori.",
        "Ha {Sajt} és {Tej} gyakori, akkor {Sajt, Tej} is gyakori.",
        "Egy halmaz támogatottsága sosem nagyobb egyik részhalmazáénál sem."
      ],
      answer: [0, 1, 3],
      hint: "Az elv csak egy irányban működik: ritkából ritka bővítés, gyakoriból gyakori részhalmaz.",
      explain: R`A harmadik a fordított irány, hamis: a demóban Sajt és Tej is gyakori, de együtt egyszer sem fordulnak elő. Ezért kell a jelölteket megszámolni.`
    },
    {
      type: "single",
      q: "Az órai demó 5 kosarán (lásd 3. kérdés) $s_{\\min} = 60\\%$ mellett hány gyakori elemhalmaz van?",
      options: ["3", "9", "2", "4"],
      answer: 0,
      hint: "60% = legalább 3 kosár. Melyik termék van legalább 3 kosárban, és együtt?",
      explain: R`{Kenyér} (5), {Tej} (3), {Kenyér, Tej} (3) – összesen 3. A 9 a 40%-os eredmény.`
    },
    {
      type: "single",
      q: "Mikor áll le az Apriori algoritmus?",
      options: [
        "Ha nem képezhető új jelölt, vagy az adott szinten nincs gyakori halmaz.",
        "Ha a megbízhatóság a küszöb alá esik.",
        "Mindig a 3. szint után.",
        "Ha minden terméket legalább egyszer megvizsgált."
      ],
      answer: 0,
      hint: "A jelölteket mindig az előző szint gyakori halmazaiból képezzük.",
      explain: R`Ha $L_{k-1}$ üres vagy egyetlen halmazból áll (nincs mivel összekapcsolni), nincs új jelölt. A megbízhatóság a szabálygenerálás fogalma. (A gyakorlaton a <code>max_len=2</code> paraméter mesterségesen a 2. szint után állította le.)`
    },
    {
      type: "single",
      q: "conf(butter → bread) = 0,737, de conf(bread → butter) = 0,660. Miért különbözik?",
      options: [
        "Mert a nevezőben a bal oldal támogatottsága áll, és a kenyér gyakoribb, mint a vaj.",
        "Mert a két szabály támogatottsága különböző.",
        "Mert a lift a két irányban más.",
        "Kerekítési hiba: a két értéknek egyeznie kellene."
      ],
      answer: 0,
      hint: R`$\operatorname{conf}(A\to B) = \operatorname{support}(A\cup B)/\operatorname{support}(A)$. Mi közös és mi más a két irányban?`,
      explain: R`A számláló közös (0,365), a nevező 0,495 (butter), ill. 0,553 (bread). A szabály támogatottsága és a lift a két irányban ugyanaz.`
    },
    {
      type: "single",
      q: "lift(butter → bread) = 1,33. Mennyi lift(bread → butter)?",
      options: ["1,33", "0,75", "0,66", "0,74"],
      answer: 0,
      hint: "A lift képletében felcserélhető-e $A$ és $B$?",
      explain: R`A lift szimmetrikus: $\frac{\operatorname{support}(A\cup B)}{\operatorname{support}(A)\operatorname{support}(B)}$. A 0,75 a reciprok, a 0,66 és 0,74 a két megbízhatóság.`
    },
    {
      type: "single",
      q: "A demóban confidence(Sajt → Kenyér) = 100%, a lift 1. Mi ennek a magyarázata?",
      options: [
        "A kenyér minden kosárban benne van, így a sajt semmit nem árul el róla.",
        "A sajt és a kenyér között nagyon erős pozitív kapcsolat van.",
        "Számolási hiba: 100%-os megbízhatóságnál a lift legalább 2.",
        "A sajt ritka, ezért a szabály nem számít."
      ],
      answer: 0,
      hint: R`$\operatorname{lift} = \operatorname{conf}/\operatorname{support}(B)$, és support(Kenyér) = 1.`,
      explain: R`$1/1 = 1$: a függetlenségnek megfelelő gyakoriság. A magas megbízhatóság önmagában nem elég – gyakori jobb oldal esetén félrevezet.`
    },
    {
      type: "single",
      q: "min_support-ot 0,30-ról 0,35-re emeljük. Mi igaz a gyakori halmazok számára?",
      options: [
        "Nem nőhet, de változatlan is maradhat.",
        "Biztosan szigorúan csökken.",
        "Nőhet, mert több jelölt jut át a metszésen.",
        "Nem lehet előre megmondani, nőhet is, csökkenhet is."
      ],
      answer: 0,
      hint: "Ami 35%-nál gyakori, az 30%-nál is gyakori volt?",
      explain: R`Magasabb küszöb mellett a gyakori halmazok köre szűkül vagy ugyanaz marad. A valódi adaton 0,30 és 0,35 mellett is 6 termék + 1 pár gyakori.`
    },
    {
      type: "single",
      q: "A valódi adaton min_support = 0,10, min_confidence = 0,5 mellett 21 szabály jön ki, de csak 7 liftje nagyobb 1-nél. Mi a tanulság?",
      options: [
        "A megbízhatóság önmagában nem elég; a liftet is meg kell nézni.",
        "A min_support túl magas, ezért kell csökkenteni.",
        "A 21 szabály mind érdekes, mert elérik az 50%-ot.",
        "Az Apriori hibásan futott, mert lift &lt; 1 nem fordulhat elő."
      ],
      answer: 0,
      hint: "Mi a közös a 14 gyenge szabályban? (Mindegyik jobb oldala a kenyér.)",
      explain: R`A 14 szabály „X → bread” alakú: a kenyér a kosarak 55%-ában szerepel, így szinte bármi → kenyér megbízhatósága 0,5 körüli, miközben a lift 1 alatt van. A gyakorlat kódja confidence szerint szűr, lift szerint csak rendez – a lift > 1 szűrést külön kell elvégezni.`
    },
    {
      type: "single",
      q: "Valódi adat: $N = 1151$; biscuits 499, coffee 540, együtt 328 kosár. Mennyi a lift?",
      options: ["1,40", "0,66", "0,61", "0,28"],
      answer: 0,
      hint: R`Darabszámokkal: $\operatorname{lift} = \dfrac{\sigma(A\cup B)\cdot N}{\sigma(A)\cdot\sigma(B)}$.`,
      explain: R`$\frac{328\cdot 1151}{499\cdot 540} \approx 1{,}40$. A 0,66 a conf(biscuits → coffee), a 0,61 a conf(coffee → biscuits), a 0,28 a szabály támogatottsága.`
    },
    {
      type: "match",
      q: "Párosítsd a kód angol neveit a magyar fogalommal!",
      pairs: [
        ["antecedents", "feltételrész (a szabály bal oldala)"],
        ["consequents", "következményrész (a szabály jobb oldala)"],
        ["support", "támogatottság"],
        ["confidence", "megbízhatóság"]
      ],
      hint: "A → B: A az, amiből kiindulunk, B az, amire következtetünk.",
      explain: R`<em>antecedent</em> = előzmény/feltétel, <em>consequent</em> = következmény. A support egy halmaz (vagy szabály) előfordulási aránya, a confidence a feltételes arány.`
    },
    {
      type: "single",
      q: "Mit állít be a gyakorlat kódjában a <code>max_len=2</code> paraméter az <code>apriori()</code> hívásban?",
      options: [
        "Legfeljebb 2 elemű halmazokat keres (az 1 eleműeket is megvizsgálja).",
        "Csak pontosan 2 elemű halmazokat vizsgál, az 1 eleműeket kihagyja.",
        "Legfeljebb 2 szabályt ad vissza.",
        "Minden kosárból csak az első 2 terméket veszi figyelembe."
      ],
      answer: 0,
      hint: "Az Apriori első szintje mindig az egyelemű halmazok számlálása.",
      explain: R`A <code>max_len</code> a halmazméret felső korlátja. Az egyelemű halmazokat a kód utólag szűri ki a kiírásból (<code>product_count == 2</code>), de a mentett fájlban benne maradnak, mert a szabályokhoz kellenek.`
    }
  ]
};
