/* 3. lecke – Vásárlói szegmentáció K-means módszerrel – kvízek */
window.QUIZZES = window.QUIZZES || {};
var R = window.R || String.raw;

QUIZZES["l03-lepes4"] = {
  title: "Mini-kvíz – Standardizálás",
  questions: [
    {
      type: "single",
      q: R`Egy változó átlaga $\mu=50$, szórása $\sigma=10$. Mennyi az $x=35$ érték z-pontszáma?`,
      options: ["−1,5", "1,5", "−15", "−0,15"],
      answer: 0,
      hint: R`$z=(x-\mu)/\sigma$ – előbb az eltérés, aztán osztás a szórással.`,
      explain: R`$z=(35-50)/10=-1{,}5$: másfél szórással az átlag alatt. A $-15$ az osztás nélküli eltérés, a $+1{,}5$ előjelhibás, a $-0{,}15$ tízzel többször osztott.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak egy standardizált változóra?",
      options: [
        "Az átlaga 0.",
        "A szórása 1.",
        "Az eloszlás alakja (ferdesége) ugyanaz, mint standardizálás előtt.",
        "Normális eloszlású lesz.",
        "Minden értéke −1 és +1 közé esik."
      ],
      answer: [0, 1, 2],
      hint: "A standardizálás csak eltol és átskáláz (lineáris átalakítás).",
      explain: R`Átlag 0, szórás 1, az alak nem változik (a gyakorlat költésének ferdesége előtte-utána 0,74). Normálissá nem tesz, és nem korlátos: a gyakorlat legnagyobb költője $z\approx 2{,}08$.`
    },
    {
      type: "single",
      q: "Miért kell K-means előtt standardizálni a vásárlásszámot és az összköltést?",
      options: [
        "Mert különben az euklideszi távolságot szinte csak a forintban mért, nagyságrendekkel nagyobb költés határozná meg.",
        "Mert a K-means csak normális eloszlású adaton működik.",
        "Mert a K-means csak 0 és 1 közötti értékeket fogad el.",
        "Mert így a klaszterek pontosan egyforma méretűek lesznek."
      ],
      answer: 0,
      hint: "Mit számol a K-means a pontok között?",
      explain: "A K-means távolságokat számol; a nagy nagyságrendű változó uralja a távolságot, és az eredmény a mértékegységtől is függne. A többi állítás hamis: nincs eloszlási vagy [0;1] követelmény, és a klaszterméretekre sincs hatása."
    },
    {
      type: "single",
      q: R`A gyakorlaton a vásárlásszám $\mu=9{,}59$, $\sigma=5{,}31$. A 3-as klaszter középpontja $z=-1{,}15$. Hány vásárlásnak felel meg?`,
      options: ["kb. 3,48", "kb. 15,70", "kb. −2,02", "kb. 8,44"],
      answer: 0,
      hint: R`Visszaalakítás: $x=\mu+z\cdot\sigma$.`,
      explain: R`$x=9{,}59+(-1{,}15)\cdot 5{,}31\approx 3{,}48$. A 15,70 előjelhibás ($\mu-z\sigma$), a 8,44 a szórással való szorzást hagyja ki ($\mu+z$), a $-2{,}02$ újra standardizálja a z-t.`
    }
  ]
};

QUIZZES["l03-lepes7"] = {
  title: "Mini-kvíz – Algoritmus, inertia, kezdőpontok",
  questions: [
    {
      type: "match",
      q: "Párosítsd a K-means lépéseit a tartalmukkal!",
      pairs: [
        ["Kezdés", "k kezdő középpont választása"],
        ["Hozzárendelés", "minden pont a legközelebbi középpont klaszterébe kerül"],
        ["Frissítés", "új középpont = a klaszter pontjainak átlaga"],
        ["Leállás", "a középpontok már nem mozdulnak, vagy elfogyott a max_iter"]
      ],
      hint: "A „means” név a frissítési lépésre utal.",
      explain: "Kezdés → (hozzárendelés → frissítés) ismétlése → leállás, ha nincs változás vagy elértük a maximális iterációszámot."
    },
    {
      type: "single",
      q: "Pontok: 0, 4, 6; k = 2; kezdő középpontok 1 és 5. Hol lesznek a középpontok egy hozzárendelés + frissítés után?",
      options: ["0 és 5", "1 és 5", "2 és 6", "3,33 és 5"],
      answer: 0,
      hint: "Előbb sorold be mindhárom pontot a közelebbi középponthoz, aztán átlagolj klaszterenként.",
      explain: R`0 → az 1-hez ($1&lt;5$), 4 → az 5-höz ($1&lt;3$), 6 → az 5-höz. Új középpontok: $0$ és $(4+6)/2=5$. Az „1 és 5” kihagyja a frissítést, a „2 és 6” a 4-et rossz klaszterbe sorolja, a 3,33 az összes pont átlaga.`
    },
    {
      type: "single",
      q: "Klaszterek: {1, 3} és {8, 10, 12}. Mennyi az inertia?",
      options: ["10", "6", "2", "3,16"],
      answer: 0,
      hint: "Középpontok: a klaszterátlagok. Az inertia a négyzetes eltérések összege.",
      explain: R`Középpontok 2 és 10. $W=(1+1)+(4+0+4)=10$. A 6 a sima (nem négyzetes) távolságok összege, a 2 az átlagos négyzetes eltérés ($10/5$), a 3,16 a $\sqrt{10}$.`
    },
    {
      type: "single",
      q: "Mit csinál a KMeans(n_clusters=3, n_init=10, random_state=42) beállításban az n_init=10?",
      options: [
        "10-szer futtatja az algoritmust különböző kezdőpontokkal, és a legkisebb inertiájú eredményt tartja meg.",
        "10 futás eredményét átlagolja.",
        "Legfeljebb 10 iterációt enged egy futásban.",
        "10 klasztert alakít ki, majd ebből választ ki 3-at."
      ],
      answer: 0,
      hint: "A kezdőpontok véletlenszerűek; hogyan lehet csökkenteni a rossz lokális optimum esélyét?",
      explain: "Több indítás, a legjobb (legkisebb inertiájú) marad. Átlagolni nem lehet (a klasztersorszámok futásonként felcserélődhetnek) – az órán elhangzott „átlag” pontatlan. Az iterációs korlát a max_iter."
    },
    {
      type: "multi",
      q: "Egy K-means eredmény gyenge: a klaszterek mérete nagyon eltér, néhány kiugró rekord elhúzza a középpontokat, és a futások eltérő megoldást adnak. Mely beavatkozások segíthetnek? (Kiegészítés az előadásanyagból.)",
      options: [
        "Több futtatás különböző kezdőpontokkal, a legkisebb SSE-jű megtartása.",
        "A kiugró rekordok eltávolítása és a jellemzők standardizálása előfeldolgozásként.",
        "Utófeldolgozás: a nagy SSE-jű klaszterek felosztása, a túl kicsik összevonása.",
        "A random_state elhagyása, hogy minden futás más legyen.",
        "A k növelése egészen addig, amíg az SSE 0 nem lesz."
      ],
      answer: [0, 1, 2],
      hint: "Melyik probléma ellen véd a több indítás, melyik ellen az előfeldolgozás, és melyik ellen az utófeldolgozás?",
      explain: "A több futtatás a rossz kezdőpontok ellen, az előfeldolgozás (standardizálás, kiugrók eltávolítása) a torzított távolságok és középpontok ellen, az utófeldolgozás az eltérő méretek ellen hat. A random_state elhagyása csak a reprodukálhatóságot rontja, az SSE = 0 pedig k = n-nél jön ki, ami értelmetlen felosztás."
    }
  ]
};

QUIZZES["l03-lepes9"] = {
  title: "Mini-kvíz – Könyökmódszer és sziluett",
  questions: [
    {
      type: "single",
      q: R`Egy pontra $a=2$, $b=8$. Mennyi a sziluettértéke?`,
      options: ["0,75", "0,25", "−0,75", "6"],
      answer: 0,
      hint: R`$s=(b-a)/\max(a,b)$.`,
      explain: R`$s=(8-2)/8=0{,}75$. A 0,25 az $a/b$ hányados (a „belső/szomszéd” tévképlet), a 6 a nem osztott különbség, a $-0{,}75$ felcserélt $a$ és $b$.`
    },
    {
      type: "single",
      q: R`Egy pontra $a=5$, $b=4$. Mennyi $s$?`,
      options: ["−0,2", "0,2", "−0,25", "1,25"],
      answer: 0,
      hint: R`A nevező a nagyobbik, itt $a$.`,
      explain: R`$s=(4-5)/\max(5,4)=-1/5=-0{,}2$. Negatív: a pont a szomszéd klaszterhez van közelebb. A $-0{,}25$ hibásan $b$-vel oszt, az 1,25 az $a/b$.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak a sziluettmutatóra?",
      options: [
        "k = 1 esetén nem értelmezhető.",
        "A magasabb érték jobb klaszterezést jelez.",
        "Értéke −1 és 1 között van.",
        "A klaszterszám növelésével mindig nő.",
        R`$b(i)$ a szomszéd klaszter középpontjától mért távolság.`
      ],
      answer: [0, 1, 2],
      hint: "Gondolj a gyakorlat táblázatára (k = 2…8), és a b(i) pontos definíciójára.",
      explain: R`A gyakorlaton a sziluett $k=2$-től csökken (0,7155 → 0,5345), tehát nem nő mindig. $b(i)$ a szomszéd klaszter <em>pontjaitól</em> vett átlagos távolság, nem a középponttól.`
    },
    {
      type: "single",
      q: "Inertiák k = 1…6-ra: 120, 50, 22, 18, 15, 13. Hol a könyök?",
      options: ["k = 3", "k = 2", "k = 1", "k = 6"],
      answer: 0,
      hint: "Számold ki az egymás utáni csökkenéseket.",
      explain: "Csökkenések: 70, 28, 4, 3, 2. A 3. klaszter még 28-at hoz, a 4. már csak 4-et → k = 3. A k = 6 a legkisebb inertia, de az mindig a legnagyobb k-nál van."
    }
  ]
};

QUIZZES["l03-vegso"] = {
  title: "Ellenőrző kvíz – K-means szegmentáció",
  questions: [
    {
      type: "single",
      q: "Mi jellemzi a felügyelet nélküli tanulást?",
      options: [
        "Nincs célváltozó (címke); a modell csak a jellemzők alapján keres szerkezetet, pl. csoportokat.",
        "Egy ember felügyeli a tanítás minden lépését.",
        "Ismert kimenetű múltbeli adatokból tanul előrejelezni.",
        "Csak kategóriás változókkal működik."
      ],
      answer: 0,
      hint: "Mi hiányzik az adatból a felügyelt esethez képest?",
      explain: "Felügyelet nélküli: nincs „helyes válasz” oszlop. Az ismert kimenetből tanulás a felügyelt tanulás (osztályozás). A K-means ráadásul numerikus változókat igényel."
    },
    {
      type: "multi",
      q: "Melyik feladat klaszterezés (felügyelet nélküli)?",
      options: [
        "Vásárlók csoportosítása vásárlásszám és költés alapján, előre adott csoportok nélkül.",
        "Hírcikkek témacsoportokba rendezése, amikor a témák nem ismertek.",
        "Hitel-visszafizetés előrejelzése régi ügyfelek ismert kimenetéből.",
        "Spam-szűrő tanítása megjelölt levelekből."
      ],
      answer: [0, 1],
      hint: "Van-e ismert címke a tanító adatban?",
      explain: "Az első kettőnél nincs címke → klaszterezés. A hitel- és spam-feladatban van ismert kimenet → felügyelt osztályozás."
    },
    {
      type: "single",
      q: "C9 vásárlónak a tranzakciós táblában 5 sora van, ezek 3 különböző transaction_id-hez tartoznak. Mennyi a purchase_count értéke?",
      options: ["3", "5", "8", "15"],
      answer: 0,
      hint: "A gyakorlat kódja: purchase_count=(\"transaction_id\", \"nunique\").",
      explain: "Vásárlás = különböző tranzakció, ezért nunique → 3. Az 5 a sorok (tételek) száma, ami count-tal jönne ki."
    },
    {
      type: "single",
      q: R`Mennyi az euklideszi távolság $(1;2;3)$ és $(3;5;9)$ között?`,
      options: ["7", "49", "11", "3,32"],
      answer: 0,
      hint: R`$d=\sqrt{\sum_j (x_j-y_j)^2}$.`,
      explain: R`$\sqrt{2^2+3^2+6^2}=\sqrt{49}=7$. A 49 a négyzetes távolság (gyökvonás nélkül), a 11 a Manhattan-távolság ($2+3+6$), a 3,32 a $\sqrt{11}$.`
    },
    {
      type: "single",
      q: "A = (2 vásárlás; 30 000 Ft), B = (10; 31 000 Ft), C = (3; 36 000 Ft). Nyers adaton B, ezer Ft-ban mérve C a legközelebbi A-hoz. Mit tanulunk ebből?",
      options: [
        "Standardizálás nélkül a K-means eredménye a mértékegység választásától függ; standardizálás után nem.",
        "A forintban mért változókat ki kell hagyni a klaszterezésből.",
        "Az euklideszi távolság rossz, Manhattan-távolságot kell használni.",
        "Ezer Ft-ban kell mérni, mert az a helyes mértékegység."
      ],
      answer: 0,
      hint: "Ugyanaz az adat, két mértékegység, két különböző „legközelebbi szomszéd”.",
      explain: "Nyers adaton a nagy számokkal mért változó uralja a távolságot, így az eredmény a mértékegységtől függ. A z-pontszám mértékegység-független, ezért standardizálunk. Nincs „helyes” mértékegység, és a Manhattan-távolságnak ugyanez a gondja."
    },
    {
      type: "single",
      q: R`A gyakorlaton az összköltés $\mu=82\,428$ Ft, $\sigma=75\,913$ Ft. A legnagyobb költő 240 230 Ft-ot költött. Mennyi a z-pontszáma?`,
      options: ["kb. 2,08", "kb. 0,48", "1 (a z legfeljebb 1)", "kb. 3,16"],
      answer: 0,
      hint: R`$z=(x-\mu)/\sigma$; és a z-pontszámnak nincs felső korlátja.`,
      explain: R`$z=(240\,230-82\,428)/75\,913\approx 2{,}08$. A 0,48 a fordított hányados, a 3,16 az $x/\sigma$ (az átlag kivonása nélkül). A z nem korlátos – az órai „−1 és +1 közé kerül” megjegyzés pontatlan.`
    },
    {
      type: "single",
      q: "Mikor áll le a K-means algoritmus?",
      options: [
        "Ha a középpontok (és így a besorolás) már nem változnak, vagy elértük a maximális iterációszámot.",
        "Ha az inertia eléri a 0-t.",
        "Ha minden klaszterben ugyanannyi pont van.",
        "Pontosan k iteráció után."
      ],
      answer: 0,
      hint: "Gondolj a PDF álkódjára: elmozdulás ≤ ε.",
      explain: "Leállás: a legnagyobb középpont-elmozdulás ≤ ε, vagy max_iter. Az inertia ritkán 0 (csak k = n-nél), a klaszterméret nem feltétel, és az iterációszám nem k-tól függ (a gyakorlaton 3 iteráció kellett)."
    },
    {
      type: "single",
      q: "Mit jelent az inertia (model.inertia_)?",
      options: [
        "A pontok saját klaszterközéppontjuktól mért négyzetes euklideszi távolságainak összegét.",
        "A pontok saját középpontjuktól mért átlagos távolságát.",
        "A klaszterközéppontok egymástól mért távolságainak összegét.",
        "A futás során végrehajtott iterációk számát."
      ],
      answer: 0,
      hint: "Angolul within-cluster sum of squares.",
      explain: R`$W=\sum_j\sum_{x\in C_j}\lVert x-\mu_j\rVert^2$ – négyzetes távolságok <em>összege</em>. Nem átlag (az órán így is elhangzott, pontatlanul), nem a középpontok közti távolság, és nem az iterációszám (az az n_iter_).`
    },
    {
      type: "single",
      q: "Miért nem azt a k-t választjuk, amelyiknél az inertia a legkisebb?",
      options: [
        "Mert az inertia k növelésével mindig csökken, és k = n-nél 0 – ez minden pontot külön klaszterbe tenne.",
        "Mert a legkisebb inertia mindig rossz lokális optimumot jelez.",
        "Mert az inertia k növelésével nő.",
        "Mert az inertia csak k = 3-ra számolható."
      ],
      answer: 0,
      hint: "Mi történik az inertiával, ha minden pont saját klaszter?",
      explain: "A legkisebb inertia a legnagyobb k-nál van, ami semmit nem mond az adat szerkezetéről. Ezért a csökkenés ütemét nézzük (könyök), és mellé a sziluettet."
    },
    {
      type: "single",
      q: "Mire való a random_state=42 a KMeans-ben?",
      options: [
        "Rögzíti a véletlenszám-generátor magját, így a kezdőpontok és az eredmény minden futtatáskor ugyanaz (reprodukálhatóság).",
        "42 különböző kezdőpontból indítja az algoritmust.",
        "Legfeljebb 42 iterációt enged.",
        "Csak a 42-es értékkel ad helyes eredményt."
      ],
      answer: 0,
      hint: "Mi kell ahhoz, hogy két futás összehasonlítható legyen?",
      explain: "A véletlenmag rögzítése reprodukálhatóvá teszi az eredményt. Bármilyen nemnegatív egész jó, a 42 csak szokás. Az indítások száma n_init, az iterációs korlát max_iter."
    },
    {
      type: "single",
      q: "Klaszterek: A = {2, 4}, B = {9, 11}. Mennyi a 4-es pont sziluettértéke?",
      options: ["kb. 0,67", "kb. 0,33", "4", "kb. −0,67"],
      answer: 0,
      hint: R`$a$: átlagos távolság a saját klaszter többi pontjától; $b$: átlagos távolság a másik klaszter pontjaitól.`,
      explain: R`$a=|4-2|=2$, $b=(5+7)/2=6$, $s=(6-2)/6\approx 0{,}67$. A 0,33 az $a/b$ (a jegyzetbeli tévképlet), a 4 a nem osztott $b-a$, a $-0{,}67$ felcserélt $a$ és $b$.`
    },
    {
      type: "single",
      q: "A gyakorlat k_comparison táblája: sziluett k = 2: 0,7155; k = 3: 0,7144; k = 4: 0,6834. Melyik következtetés a legjobb?",
      options: [
        "Formálisan k = 2 a legjobb, de k = 3 szinte ugyanolyan jó; a könyökkel és az értelmezhetőséggel együtt kell dönteni.",
        "Egyértelműen k = 4, mert ott a legkisebb az inertia a háromból.",
        "A sziluett k-val nő, ezért a lehető legnagyobb k-t kell választani.",
        "k = 1, mert ott nem lehet negatív a sziluett."
      ],
      answer: 0,
      hint: "Mekkora a különbség k = 2 és k = 3 között? És mit mondott az oktató a döntésről?",
      explain: "A különbség csak 0,001; a könyök is a 2–3 tartományt jelöli. Az oktató szerint azt választjuk, amelyiket meg tudjuk magyarázni – a k = 3 (alkalmi, átlagos, törzsvásárló) jól leírható. k = 1-nél a sziluett nem értelmezhető."
    },
    {
      type: "single",
      q: R`A 2-es klaszter középpontja standardizálva (1,19; 1,34). Mit jelent ez eredeti mértékegységben? (vásárlásszám: $\mu=9{,}59$, $\sigma=5{,}31$; költés: $\mu=82\,428$, $\sigma=75\,913$ Ft)`,
      options: [
        "kb. 15,9 vásárlás és 184 ezer Ft",
        "kb. 1,19 vásárlás és 1,34 Ft",
        "kb. 10,8 vásárlás és 82 429 Ft",
        "kb. 6,3 vásárlás és 102 ezer Ft"
      ],
      answer: 0,
      hint: R`$x=\mu+z\sigma$ – mindkét tagra szükség van.`,
      explain: R`$9{,}59+1{,}19\cdot 5{,}31\approx 15{,}9$ és $82\,428+1{,}34\cdot 75\,913\approx 184$ ezer Ft – törzsvásárlók. Az „1,19 vásárlás” a visszaalakítás elmaradása, a 10,8 / 82 429 a $\mu+z$ (szórás nélkül), a 6,3 / 102 ezer a $z\sigma$ (átlag nélkül).`
    },
    {
      type: "match",
      q: "Párosítsd az angol (kódbeli) kifejezéseket a magyar megfelelőjükkel!",
      pairs: [
        ["inertia_", "klaszteren belüli négyzetösszeg"],
        ["cluster_centers_", "klaszterközéppontok"],
        ["elbow method", "könyökmódszer"],
        ["silhouette_score", "átlagos sziluettérték"],
        ["n_init", "inicializálások (indítások) száma"],
        ["n_iter_", "iterációk száma a legjobb futásban"]
      ],
      hint: "Figyelj az n_init és n_iter_ különbségére.",
      explain: "n_init: hányszor indul újra véletlen kezdőpontokkal; n_iter_: hány hozzárendelés–frissítés kör kellett a kiválasztott futásban (a gyakorlaton 3)."
    }
  ]
};
