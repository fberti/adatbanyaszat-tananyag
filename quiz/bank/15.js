/* Vizsgagyakorló kérdésbank – 15. lecke: statisztikai alapok, eloszlások, CHT, t-próba, konfidencia-intervallum, F- és K–S próba */
BANK.push(
  {
    id: "b15-001",
    topic: "15",
    level: 1,
    ref: "15-statisztikai-alapok.html#lepes1",
    type: "single",
    q: "Mi a különbség a μ és az x̄ jelölés között?",
    options: [
      "μ a populáció (ismeretlen) átlaga, x̄ a mintából számolt átlag, amely μ becslése és mintáról mintára ingadozik.",
      "μ a medián, x̄ az átlag.",
      "μ a mintaátlag, x̄ a populáció átlaga.",
      "Ugyanazt jelentik, csak más szakterületen használják."
    ],
    answer: 0,
    hint: "A görög betűk a populáció paramétereit jelölik.",
    explain: "A populáció paraméterei (μ, σ) ismeretlen, rögzített számok, a mintastatisztikák (x̄, s) ezek becslései. A statisztikai következtetés arról szól, mennyire jó ez a becslés."
  },
  {
    id: "b15-002",
    topic: "15",
    level: 1,
    ref: "15-statisztikai-alapok.html#lepes1",
    type: "single",
    q: R`Mennyi a 3, 5, 7 minta korrigált szórása?`,
    options: ["2", R`$\approx1{,}63$`, "4", R`$\approx2{,}67$`],
    answer: 0,
    hint: R`$s^2=\frac{1}{n-1}\sum(x_i-\bar x)^2$, utána gyököt kell vonni.`,
    explain: R`$\bar x=5$, eltérésnégyzetek $4,0,4$, $s^2=8/2=4$, $s=2$. Az 1,63 az $n$-nel osztott szórás ($\sqrt{8/3}$), a 4 a variancia (elmaradt a gyökvonás), a 2,67 az $n$-nel osztott variancia.`
  },
  {
    id: "b15-003",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes2",
    type: "single",
    q: R`A dia mintája: 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 8, 8, 9, 9, 9, 12, 13, 13, 15, 15, 17. Hány elem esik a $[0,6)$, $[6,12)$, $[12,18)$ tárolókba?`,
    options: ["10 · 6 · 6", "7 · 9 · 6", "11 · 5 · 6", "10 · 7 · 5"],
    answer: 0,
    hint: "A tárolók balról zártak, jobbról nyitottak: a 6 a második, a 12 a harmadik tárolóba kerül.",
    explain: "[0,6): 1–5-ig 10 elem; [6,12): 6, 8, 8, 9, 9, 9 → 6; [12,18): 12, 13, 13, 15, 15, 17 → 6. A 11 · 5 · 6 a 6-ost az első tárolóba teszi (jobbról zárt határ), a 10 · 7 · 5 a 12-est a másodikba."
  },
  {
    id: "b15-004",
    topic: "15",
    level: 1,
    ref: "15-statisztikai-alapok.html#lepes2",
    type: "multi",
    q: "Mely nehézségeket említi az előadás a hisztogram tárolóinak megválasztásánál?",
    options: [
      "Egyenlő hosszúságú felosztásnál ferde adaton üres vagy túltelt tárolók keletkeznek.",
      "Egyenlő terhelésű felosztásnál az oszlopok egyformák, az alakot a szélességek hordozzák.",
      "Durva granularitás: kevés tárolónál eltűnnek a részletek.",
      "Mintafüggőség: más mintából más tárolóhatárok és más kép jöhet ki.",
      "A hisztogram csak normális eloszlású adatra készíthető."
    ],
    answer: [0, 1, 2, 3],
    hint: "Egyetlen állítás téves: van-e megkötés az eloszlás típusára?",
    explain: "Az előadás négy pontja: egyenlő hosszúság, egyenlő terhelés, durva granularitás, mintafüggőség. Hisztogram bármilyen numerikus adatra készíthető; épp arra jó, hogy megmutassa, normális-e az eloszlás."
  },
  {
    id: "b15-005",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes3",
    type: "single",
    q: R`Egy 22 elemű mintában 19 elem $\le 13$. Mekkora a 13-nál nagyobb értékek aránya, az eloszlásfüggvénnyel kifejezve?`,
    options: [R`$1-F(13)=3/22$`, R`$F(13)=19/22$`, R`$1-F(13)=19/22$`, R`$F(13)-F(0)=19/22$`],
    answer: 0,
    hint: R`$F(x)=P(X\le x)$; a „nagyobb” ennek az ellentettje.`,
    explain: R`$P(X&gt;13)=1-P(X\le13)=1-19/22=3/22$. A 19/22 maga $F(13)$, a $13$-nál nem nagyobb elemek aránya.`
  },
  {
    id: "b15-006",
    topic: "15",
    level: 1,
    ref: "15-statisztikai-alapok.html#lepes3",
    type: "match",
    q: "Párosítsd a fogalmat a jelentésével!",
    pairs: [
      ["eloszlásfüggvény (CDF)", "F(x) = P(X ≤ x), monoton növekvő, 0-tól 1-ig"],
      ["diszkrét sűrűség", "f(x) = P(X = x)"],
      ["folytonos sűrűség", "f(x) = dF/dx, az eloszlásfüggvény meredeksége"],
      ["empirikus eloszlásfüggvény", "a minta alapján számolt lépcsős F, az elemek aránya x-ig"]
    ],
    hint: "A „kumulatív” szó halmozást jelent; a sűrűség a pontbeli (vagy pillanatnyi) valószínűséget írja le.",
    explain: "A CDF a „legfeljebb x” valószínűsége. Diszkrét esetben a sűrűség az egyes értékek valószínűsége, folytonos esetben a CDF deriváltja. Az empirikus változat a mintából készül, ezt használja a K–S próba."
  },
  {
    id: "b15-007",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes4",
    type: "single",
    q: R`Egy termék 10%-a hibás. 10 darabból mennyi a valószínűsége, hogy pontosan 1 hibás?`,
    options: [R`$\approx0{,}387$`, R`$\approx0{,}0387$`, R`$\approx0{,}349$`, R`$0{,}1$`],
    answer: 0,
    hint: R`$\binom{10}{1}\cdot0{,}1^1\cdot0{,}9^9$.`,
    explain: R`$10\cdot0{,}1\cdot0{,}387\approx0{,}387$. A 0,0387 elfelejti a $\binom{10}{1}=10$ szorzót, a 0,349 a $P(X=0)=0{,}9^{10}$, a 0,1 egyetlen darab hibás valószínűsége.`
  },
  {
    id: "b15-008",
    topic: "15",
    level: 1,
    ref: "15-statisztikai-alapok.html#lepes4",
    type: "single",
    q: R`Binomiális eloszlás, $n=20$, $p=0{,}1$. Mennyi a várható érték és a variancia?`,
    options: [R`$E=2$, $D^2=1{,}8$`, R`$E=2$, $D^2=2$`, R`$E=0{,}1$, $D^2=0{,}09$`, R`$E=2$, $D^2\approx1{,}34$`],
    answer: 0,
    hint: R`$E=np$, $D^2=npq$.`,
    explain: R`$E=20\cdot0{,}1=2$, $D^2=20\cdot0{,}1\cdot0{,}9=1{,}8$. A 2-es variancia elhagyja a $q$-t, a 0,1 és 0,09 egyetlen kísérletre vonatkozik, az 1,34 a szórás ($\sqrt{1{,}8}$), nem a variancia.`
  },
  {
    id: "b15-009",
    topic: "15",
    level: 1,
    ref: "15-statisztikai-alapok.html#lepes5",
    type: "single",
    q: R`Egy $N(100,15)$ eloszlásban az értékek kb. hány százaléka esik 85 és 115 közé?`,
    options: ["68,3%", "95,4%", "99,7%", "50%"],
    answer: 0,
    hint: R`85 és 115 hány szórásnyira van az átlagtól?`,
    explain: R`$\mu\pm1\sigma$: 68,3%. A 95,4% a $\pm2\sigma$, a 99,7% a $\pm3\sigma$ sáv. Az 50% az átlag alatti (vagy feletti) rész.`
  },
  {
    id: "b15-010",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes5",
    type: "single",
    q: R`Két teszt: Anna 75 pontot ért el egy $N(60,10)$ teszten, Béla 85-öt egy $N(70,12)$ teszten. Ki teljesített relatíve jobban?`,
    options: [
      R`Anna ($z=1{,}5$ a $1{,}25$-tel szemben)`,
      "Béla, mert több pontot ért el",
      R`Egyformán, mert mindketten 15 ponttal vannak az átlag felett`,
      R`Béla ($z=1{,}5$ a $1{,}25$-tel szemben)`
    ],
    answer: 0,
    hint: R`Standardizálj: $z=(x-\mu)/\sigma$.`,
    explain: R`$z_A=15/10=1{,}5$, $z_B=15/12=1{,}25$. Az eltérés ugyanannyi pont, de Anna tesztjén kisebb a szórás, így az ő eredménye ritkább, relatíve jobb.`
  },
  {
    id: "b15-011",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes6",
    type: "single",
    q: "Hányszorosára kell növelni a mintaelemszámot, hogy a mintaátlag standard hibája felére csökkenjen?",
    options: ["4-szeresére", "2-szeresére", R`$\sqrt2$-szeresére`, "8-szorosára"],
    answer: 0,
    hint: R`Standard hiba $=\sigma/\sqrt n$.`,
    explain: R`$\sigma/\sqrt{4n}=\frac12\sigma/\sqrt n$. A 2-szeres minta csak $\sqrt2\approx1{,}41$-szeres csökkenést hoz. Ez a CHT „gyökös” törvénye.`
  },
  {
    id: "b15-012",
    topic: "15",
    level: 3,
    ref: "15-statisztikai-alapok.html#lepes6",
    type: "single",
    q: "Az előadás programja 1–10 közötti egyenletes véletlen számok átlagát veszi (N darabét), M-szer, és hisztogramot rajzol. Mi történik, ha N-et 100-ról 1000-re növeljük?",
    options: [
      "A hisztogram 5,5 körül marad, de keskenyebb lesz (kb. √10-szer), mert a mintaátlag szórása σ/√N.",
      "A hisztogram egyenletes (lapos) lesz, mint az alapeloszlás.",
      "A hisztogram középpontja 1000/2 = 500 felé tolódik.",
      "Csak simább lesz, a szélessége nem változik."
    ],
    answer: 0,
    hint: "Az N a minta mérete, az M a minták száma. Melyik szerepel a standard hibában?",
    explain: "σ ≈ 2,87, így N = 100-nál σ/√N ≈ 0,29, N = 1000-nél ≈ 0,09. A középpont a várható érték, 5,5 marad. A simaság az M-től függ, nem az N-től."
  },
  {
    id: "b15-013",
    topic: "15",
    level: 1,
    ref: "15-statisztikai-alapok.html#lepes7",
    type: "match",
    q: "Csalásfelderítés, H₀ = „a tranzakció rendben van”. Párosítsd a helyzetet a döntés típusával!",
    pairs: [
      ["Rendes tranzakciót csalásnak jelölünk", "I. fajú hiba"],
      ["Csalást nem veszünk észre", "II. fajú hiba"],
      ["Csalást csalásnak jelölünk", "helyes elvetés"],
      ["Rendes tranzakciót rendben lévőnek tartunk", "helyes megtartás"]
    ],
    hint: "Az I. fajú hiba: igaz H₀-t vetünk el. A II. fajú: hamis H₀-t tartunk meg.",
    explain: "Igaz H₀ elvetése (téves riasztás, fals pozitív) az I. fajú hiba, valószínűsége α. Hamis H₀ megtartása (fals negatív) a II. fajú hiba."
  },
  {
    id: "b15-014",
    topic: "15",
    level: 3,
    ref: "15-statisztikai-alapok.html#lepes7",
    type: "multi",
    q: "Mely állítások helyesek a p-értékről?",
    options: [
      "Annak valószínűsége, hogy H₀ mellett legalább ekkora eltérést kapunk.",
      "Ha p < α, elvetjük H₀-t.",
      "Nagy mintán egy üzletileg jelentéktelen eltérés is adhat kis p-értéket.",
      "A p-érték annak valószínűsége, hogy H₀ igaz.",
      "Ha p = 0,40, akkor bebizonyítottuk H₀-t."
    ],
    answer: [0, 1, 2],
    hint: "A p-érték feltételes valószínűség: mit tételezünk fel a kiszámításakor?",
    explain: "A p-értéket H₀ igaz voltát feltételezve számoljuk, ezért nem lehet H₀ valószínűsége. A nagy p-érték csak annyit mond, hogy az adat összefér H₀-val; nem bizonyítja. A szignifikancia nem azonos az üzleti fontossággal."
  },
  {
    id: "b15-015",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes8",
    type: "single",
    q: R`$n=25$, $\bar x=104$, $s=10$, $H_0:\mu=100$, kétoldali 5%-os próba ($t_{\text{krit}}(24)=2{,}064$). Mi a döntés?`,
    options: [
      R`$t=2$, nem vetjük el $H_0$-t`,
      R`$t=2$, elvetjük $H_0$-t`,
      R`$t=0{,}4$, nem vetjük el $H_0$-t`,
      R`$t=10$, elvetjük $H_0$-t`
    ],
    answer: 0,
    hint: R`$t=(\bar x-\mu_0)/(s/\sqrt n)$, utána $|t|$-t a kritikus értékhez hasonlítjuk.`,
    explain: R`$t=4/(10/5)=2&lt;2{,}064$, nem vetjük el ($p\approx0{,}057$). Az „elvetjük” a normális eloszlás 1,96-os határát használja. A 0,4 a szórással oszt, a 10 pedig $\sqrt n$ helyett $n$-nel ($4/(10/25)$).`
  },
  {
    id: "b15-016",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes8",
    type: "single",
    q: "Egy kétoldali t-próba p-értéke 0,08, és az eltérés a vizsgált irányba mutat. Mennyi az egyoldali p-érték, és mi a döntés 5%-on?",
    options: [
      "0,04; egyoldali próbánál elvetjük H₀-t",
      "0,16; nem vetjük el H₀-t",
      "0,08; nem vetjük el H₀-t",
      "0,04; nem vetjük el H₀-t, mert a kétoldali p nagyobb 0,05-nél"
    ],
    answer: 0,
    hint: "A kétoldali próba mindkét szélt számolja, az egyoldali csak az egyiket.",
    explain: "Szimmetrikus t-eloszlásnál az egyoldali p a kétoldali fele: 0,04 < 0,05. Ezért fontos, hogy az egy- vagy kétoldali próbát az adat megnézése előtt döntsük el, a kérdésfeltevés alapján."
  },
  {
    id: "b15-017",
    topic: "15",
    level: 3,
    ref: "15-statisztikai-alapok.html#lepes8",
    type: "multi",
    q: "Mely feltételezésekre épül az egymintás t-próba?",
    options: [
      "A megfigyelések függetlenek.",
      "Kis mintán az adat közelítőleg normális eloszlású (nagy mintán a CHT miatt ez kevésbé fontos).",
      "A populáció szórása (σ) ismert.",
      "A minta legalább 1000 elemű.",
      "Az adat kategorikus."
    ],
    answer: [0, 1],
    hint: "Ha σ ismert lenne, nem kellene Student-eloszlás.",
    explain: "A t-próba épp akkor kell, amikor σ ismeretlen, és a mintából becsüljük (s). Kis mintára is működik, ha az adat közel normális. Kategorikus adat átlagának nincs értelme."
  },
  {
    id: "b15-018",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes9",
    type: "single",
    q: R`$n=36$, $\bar x=20$, $s=6$. Melyik a 95%-os konfidencia-intervallum az átlagra? ($t_{\text{krit}}(35)\approx2{,}030$)`,
    options: [
      R`$17{,}97\ldots22{,}03$`,
      R`$18{,}04\ldots21{,}96$`,
      R`$7{,}82\ldots32{,}18$`,
      R`$19{,}66\ldots20{,}34$`
    ],
    answer: 0,
    hint: R`Standard hiba $6/\sqrt{36}=1$.`,
    explain: R`$20\pm2{,}030\cdot1$. A 18,04…21,96 a normális 1,96-ot használja (nagy mintán közel van, de nem pontos). A 7,82…32,18 elmulasztja a $\sqrt n$-nel osztást. A 19,66…20,34 $\sqrt n$ helyett $n$-nel oszt.`
  },
  {
    id: "b15-019",
    topic: "15",
    level: 3,
    ref: "15-statisztikai-alapok.html#lepes9",
    type: "single",
    q: R`A dia adatainak 98%-os konfidencia-intervalluma $54{,}79&lt;\mu&lt;87{,}21$. Kétoldali, $\alpha=0{,}02$ szintű t-próbával mely nullhipotéziseket vetnénk el?`,
    options: [
      R`$H_0:\mu=50$-et igen, $H_0:\mu=60$-at és $H_0:\mu=85$-öt nem`,
      R`Mindhármat, mert egyik sem egyenlő 71-gyel`,
      R`Egyiket sem, mert a konfidencia-intervallum és a t-próba nem függ össze`,
      R`$H_0:\mu=85$-öt igen, a másik kettőt nem`
    ],
    answer: 0,
    hint: "A konfidencia-intervallum épp azoknak a μ₀ értékeknek a halmaza, amelyeket a t-próba ugyanazon a szinten nem vet el.",
    explain: R`Az 50 kívül esik ($t\approx3{,}65&gt;2{,}821$), a 60 és a 85 belül ($|t|\approx1{,}91$ és $2{,}44$). Attól, hogy $\mu_0\ne\bar x$, még nem vetjük el: a kérdés az, belefér-e az eltérés a véletlen ingadozásba.`
  },
  {
    id: "b15-020",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes10",
    type: "single",
    q: "Három csoport, csoportonként 10 megfigyelés. Hány szabadságfoka van az ANOVA F-statisztikájának (számláló; nevező)?",
    options: ["2; 27", "3; 30", "2; 29", "3; 27"],
    answer: 0,
    hint: R`Számláló: $k-1$, nevező: $N-k$.`,
    explain: R`$k=3$, $N=30$: $3-1=2$ és $30-3=27$. A 3; 30 a csoport- és elemszám, a 2; 29 a nevezőnél $N-1$-et számol.`
  },
  {
    id: "b15-021",
    topic: "15",
    level: 3,
    ref: "15-statisztikai-alapok.html#lepes10",
    type: "single",
    q: "Három csoport átlagait páronként, három külön t-próbával hasonlítod össze, mindegyiket 5%-on. Kb. mekkora az esélye legalább egy téves riasztásnak, ha valójában minden átlag egyenlő?",
    options: ["kb. 14%", "5%", "15% pontosan", "kb. 0,01%"],
    answer: 0,
    hint: R`Annak esélye, hogy egyik sem riaszt: $0{,}95^3$.`,
    explain: R`$1-0{,}95^3\approx0{,}143$. Az 5% egyetlen próbára igaz. A 15% az $3\cdot5\%$ (felső becslés, nem pontos), a 0,01% a $0{,}05^3$ (mindhárom egyszerre téves). Ezért kell ANOVA.`
  },
  {
    id: "b15-022",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes11",
    type: "single",
    q: "Két mintának ugyanaz az átlaga, de az egyik szimmetrikus, a másik kétcsúcsú. Melyik próba veszi észre a különbséget?",
    options: [
      "A Kolmogorov–Szmirnov próba, mert a teljes eloszlást hasonlítja össze.",
      "A kétmintás t-próba, mert az átlagokat hasonlítja össze.",
      "Egyik sem, mert az átlagok egyenlők.",
      "Az egymintás t-próba."
    ],
    answer: 0,
    hint: "Melyik próba néz egy paramétert, és melyik az egész eloszlásfüggvényt?",
    explain: "A t-próba csak az átlagra érzékeny, ezért itt nem lát különbséget. A K–S a két empirikus CDF legnagyobb távolságát méri (D = max|F₁ − F₂|), ez az alakbeli eltérésre is reagál."
  },
  {
    id: "b15-023",
    topic: "15",
    level: 3,
    ref: "15-statisztikai-alapok.html#alkalmazas",
    type: "single",
    q: R`A sikeres és a sikertelen hallgatók beadott feladatainak száma: Welch-féle t-próba $p\approx0{,}029$, K–S próba $p\approx0{,}23$. Hogyan értelmezed?`,
    options: [
      "Az átlagok szignifikánsan eltérnek, de a K–S nem jelez: az eloszlások alakja hasonló, csak kissé eltolódott, és sok az azonos érték; ilyenkor a t-próba érzékenyebb.",
      "A két próba ellentmond egymásnak, ezért az egyik hibás.",
      "A K–S nagyobb p-értéke bizonyítja, hogy a két csoport egyforma.",
      "A t-próba eredménye érvénytelen, mert a K–S nem szignifikáns."
    ],
    answer: 0,
    hint: "A két próba más kérdést tesz fel: az egyik egy paramétert, a másik a teljes eloszlást nézi.",
    explain: "A t-próba az átlag kis eltolódására célzottan érzékeny, a K–S általánosabb, ezért ugyanakkora eltolódásra gyengébb. A nem szignifikáns K–S nem bizonyítja az egyezést."
  },
  {
    id: "b15-024",
    topic: "15",
    level: 2,
    ref: "15-statisztikai-alapok.html#lepes12",
    type: "single",
    q: R`$r(\text{X1},\text{X2})\approx0{,}285$ ($n=20$). Mennyi $r(1-\text{X1},\ \text{X2})$ és $r(\text{X1}+10,\ \text{X2})$?`,
    options: [
      R`$-0{,}285$ és $0{,}285$`,
      R`$0{,}715$ és $10{,}285$`,
      R`$0{,}285$ és $0{,}285$`,
      R`$-0{,}285$ és $-0{,}285$`
    ],
    answer: 0,
    hint: R`A Pearson-korreláció hogyan reagál egy $aX+b$ alakú átalakításra? Számít $a$ előjele?`,
    explain: R`$1-\text{X1}$: szorzó $-1$, előjelváltás. $\text{X1}+10$: csak eltolás, a korreláció nem változik. A korreláció $[-1,1]$-ben van, így a 10,285 lehetetlen.`
  }
);
