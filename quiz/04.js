/* 4. lecke – Hierarchikus (agglomeratív) klaszterezés – kvízek */

QUIZZES["l04-lepes1"] = {
  title: "Mini-kvíz – Az agglomeratív elv",
  questions: [
    {
      type: "single",
      q: "8 pontot klaszterezünk agglomeratív módon. Hány klaszter van 3 összevonás után?",
      options: ["5", "3", "7", "11"],
      answer: 0,
      hint: "Minden összevonás pontosan eggyel csökkenti a klaszterek számát.",
      explain: R`Kezdetben 8 klaszter van, $m$ összevonás után $n-m$: $8-3=5$. A 7 az összes összevonás száma ($n-1$), a 3 maga az összevonások száma.`
    },
    {
      type: "single",
      q: "Hány különböző (főátlón kívüli, nem ismétlődő) értéke van a távolságmátrixnak 6 pont esetén?",
      options: ["15", "36", "30", "6"],
      answer: 0,
      hint: "A mátrix szimmetrikus, a főátlóban 0 áll.",
      explain: R`$\binom{6}{2}=\frac{6\cdot5}{2}=15$. A 36 a teljes $6\times6$ mátrix, a 30 a főátlón kívüli elemek száma (minden pár kétszer szerepel).`
    },
    {
      type: "single",
      q: "Mit kell újraszámolni egy összevonás után?",
      options: [
        "Az új (összevont) klaszter távolságát az összes többi klaszterhez",
        "Az összes pont közötti távolságot elölről",
        "A klaszterek középpontját, majd minden pontot újra besorolni",
        "Semmit, a távolságmátrix változatlan marad"
      ],
      answer: 0,
      hint: "Gondolj a pszeudokód 3. részére: „Távolságok frissítése”.",
      explain: "Az összevont két klaszter sorai/oszlopai kiesnek, helyettük az új klaszter távolságait kell kiszámolni a választott kapcsolási mód szerint. A többi klaszterpár távolsága nem változik. A középpont-újraszámolás és átsorolás a K-means lépése."
    }
  ]
};

QUIZZES["l04-lepes2"] = {
  title: "Mini-kvíz – Kapcsolási módok",
  questions: [
    {
      type: "single",
      q: R`Mennyi az <em>average</em> kapcsolási távolság az $A=\{2,4\}$ és $B=\{7,12\}$ klaszterek között (egydimenziós pontok)?`,
      options: ["6,5", "3", "10", "7,5"],
      answer: 0,
      hint: "Írd fel mind a 4 pontpár távolságát, és átlagold őket.",
      explain: R`Pártávolságok: 5, 10, 3, 8; átlaguk $26/4=6{,}5$. A 3 a single (minimum), a 10 a complete (maximum) távolság.`
    },
    {
      type: "single",
      q: "Melyik kapcsolási módra jellemző a láncolódás (chaining), amikor egyetlen közeli pontpár két csoportot összeránt?",
      options: ["Single", "Complete", "Average", "Ward"],
      answer: 0,
      hint: "Melyik módszernél elég egyetlen közeli pontpár ahhoz, hogy két klaszter „közel” legyen?",
      explain: "A single a legközelebbi pontpárral méri a klasztertávolságot, ezért egy „hídpont” elég az összevonáshoz. A complete épp ellenkezőleg: a legtávolabbi pontpár dönt, ezért tömör klasztereket ad."
    },
    {
      type: "single",
      q: "Miért ad mindegyik kapcsolási mód ugyanakkora magasságot az első összevonásnál?",
      options: [
        "Mert ekkor minden klaszter egyelemű, és két egyelemű klaszter között egyetlen pontpár van",
        "Mert az első lépésben mindig a Ward-módszert használja az algoritmus",
        "Mert az első összevonás magassága definíció szerint 0",
        "Nem igaz, már az első lépésben is eltérnek"
      ],
      answer: 0,
      hint: "Hány pontpár van két egyelemű klaszter között?",
      explain: "Egyetlen pontpár minimuma, maximuma és átlaga ugyanaz a szám. (Ward-nál a scipy-magasság egyelemű klasztereknél szintén a két pont távolsága.) A 0 magasság csak akkor fordul elő, ha két pont egybeesik."
    }
  ]
};

QUIZZES["l04-lepes4"] = {
  title: "Mini-kvíz – Dendrogram",
  questions: [
    {
      type: "single",
      q: "Hét pont dendrogramjának összevonási magasságai: 0,4; 0,6; 0,9; 1,0; 3,2; 3,5. Hány klasztert javasol a legnagyobb ugrás szabálya?",
      options: ["3", "2", "4", "5"],
      answer: 0,
      hint: "Keresd meg a legnagyobb különbséget két egymást követő magasság közt, és számold meg, hány összevonás van alatta.",
      explain: R`Ugrások: 0,2; 0,3; 0,1; <b>2,2</b>; 0,3. A vágás 1,0 és 3,2 közé esik; alatta 4 összevonás van, így $7-4=3$ klaszter. A 4 az összevonások száma (nem a klasztereké); a 2 a 3,2 és 3,5 közötti vágás lenne.`
    },
    {
      type: "single",
      q: "Mit mutat a dendrogramon két levél vízszintes távolsága?",
      options: [
        "Semmit: a hasonlóságot az mutatja, milyen magasan kapcsolódnak össze",
        "A két adatpont euklideszi távolságát",
        "A két pont silhouette-értékének különbségét",
        "Azt, hogy hányadik lépésben kerültek be az adathalmazba"
      ],
      answer: 0,
      hint: "Melyik tengely a „távolság” tengely a dendrogramon?",
      explain: "A levelek vízszintes sorrendje csak rajzolási sorrend. Két egymás melletti levél is lehet nagyon különböző, ha csak magasan, egy nagy összevonásban találkoznak."
    },
    {
      type: "single",
      q: R`Egy pontra $a(i)=2$ (saját klaszterén belüli átlagos távolság), $b(i)=5$ (legközelebbi másik klasztertől). Mennyi a silhouette-érték?`,
      options: ["0,6", "0,4", "−0,6", "2,5"],
      answer: 0,
      hint: R`$s=\frac{b-a}{\max(a,b)}$.`,
      explain: R`$s=\frac{5-2}{5}=0{,}6$. A 0,4 az $a/b$ hányados, a −0,6 a felcserélt számláló ($a-b$), a 2,5 a $b/a$. A silhouette mindig $-1$ és $1$ közé esik.`
    }
  ]
};

QUIZZES["l04-lepes5"] = {
  title: "Mini-kvíz – HAC vagy K-means?",
  questions: [
    {
      type: "single",
      q: "Melyik módszernél kell a klaszterszámot a futtatás előtt megadni?",
      options: ["K-means", "HAC", "Mindkettőnél", "Egyiknél sem"],
      answer: 0,
      hint: "Melyik módszer bemenete az n_clusters, és melyiknél vágjuk utólag a fát?",
      explain: "A K-means bemenete a k. A HAC a teljes hierarchiát építi fel, a k-t utólag, a dendrogram vágásával választjuk (a sklearn AgglomerativeClustering-nek ugyan megadható az n_clusters, de ez csak azt mondja meg, hol álljon le / vágjon)."
    },
    {
      type: "multi",
      q: "Melyik állítás igaz a HAC-ra? (Több is lehet.)",
      options: [
        "Ugyanarra az adatra és kapcsolásra mindig ugyanazt a dendrogramot adja",
        "A korábbi összevonásokat nem bontja vissza",
        "Nagy adatra memóriaigényes, mert a páronkénti távolságokat tárolja",
        "Iterációnként átsorolja a pontokat a legközelebbi középponthoz",
        "Távolságra épül, de standardizálni nem kell"
      ],
      answer: [0, 1, 2],
      hint: "Két állítás valójában a K-means-ről szól, illetve egy általános tévhit.",
      explain: "A HAC determinisztikus, mohó (nem bont vissza), és n²-es a memóriaigénye. Az átsorolás a K-means sajátja. A standardizálás a HAC-nál is kell, mert távolságokat számol."
    },
    {
      type: "single",
      q: "A féléves feladatban a választott klaszterező modellt új adatokra kell alkalmazni. Mit tudsz HAC esetén?",
      options: [
        "Nincs beépített predict; újra kell futtatni, vagy kerülőúton (pl. a legközelebbi klaszterközépponthoz) besorolni, és ezt indokolni",
        "Az AgglomerativeClustering.predict() a legközelebbi levélhez sorolja az új pontot",
        "A dendrogramba az új pont automatikusan beépül a régi összevonások megtartásával",
        "HAC-ot egyáltalán nem lehet új adatokkal kapcsolatban használni"
      ],
      answer: 0,
      hint: "Nézd meg, milyen metódusai vannak a sklearn AgglomerativeClustering osztálynak.",
      explain: "Az AgglomerativeClustering-nek csak fit_predict metódusa van, ami az összes pontot újraklaszterezi (a régi címkék is változhatnak). Ezért írja a feladat: „amennyiben az alkalmazott módszer ezt lehetővé teszi”. A K-means predict-je viszont közvetlenül működik."
    }
  ]
};

QUIZZES["l04-vegso"] = {
  title: "Ellenőrző kvíz – Hierarchikus klaszterezés",
  questions: [
    {
      type: "single",
      q: R`Mennyi a <em>complete</em> kapcsolási távolság az $\{1,3\}$ és a $\{6,10\}$ klaszter között (egydimenziós pontok)?`,
      options: ["9", "3", "6", "5"],
      answer: 0,
      hint: "Complete: a két klaszter legtávolabbi pontpárja.",
      explain: R`Pártávolságok: 5, 9, 3, 7. A maximum 9. A 3 a single (minimum), a 6 az average (átlag: $24/4$), az 5 az első pár távolsága.`
    },
    {
      type: "single",
      q: "Hány összevonást végez a HAC 50 adatpont esetén, amíg egyetlen klaszter marad?",
      options: ["49", "50", "25", "1225"],
      answer: 0,
      hint: "Minden összevonás eggyel csökkenti a klaszterek számát: 50-ről 1-re kell eljutni.",
      explain: R`$n-1=49$. Az 1225 a távolságmátrix különböző elemeinek száma ($\binom{50}{2}$).`
    },
    {
      type: "match",
      q: "Párosítsd a kapcsolási módot a klasztertávolság definíciójával!",
      pairs: [
        ["single", "a legközelebbi pontpár távolsága"],
        ["complete", "a legtávolabbi pontpár távolsága"],
        ["average", "az összes pontpár távolságának átlaga"],
        ["ward", "a klaszteren belüli négyzetes eltérésösszeg növekedése"]
      ],
      hint: "A single és a complete egymás ellentétei; a Ward a K-means célfüggvényével rokon.",
      explain: "Mindegyik módszer a legkisebb ilyen értékű párt vonja össze – csak a „távolság” definíciója más."
    },
    {
      type: "single",
      q: R`Mennyi a Ward-féle növekedés, $\Delta(\{1,3\},\{6\})$?`,
      options: ["10,67", "16", "4", "12,67"],
      answer: 0,
      hint: R`$\Delta=\frac{|A||B|}{|A|+|B|}\lVert\bar a-\bar b\rVert^2$, vagy $\mathrm{SSE}(A\cup B)-\mathrm{SSE}(A)-\mathrm{SSE}(B)$.`,
      explain: R`Középpontok 2 és 6: $\frac{2\cdot1}{3}\cdot16\approx10{,}67$. SSE-vel: $\mathrm{SSE}(\{1,3,6\})\approx12{,}67$, ebből $\mathrm{SSE}(\{1,3\})=2$ levonva szintén $10{,}67$. A 16 a szorzó nélküli négyzetes távolság, a 4 a középpontok távolsága, a 12,67 a levonás elmaradása.`
    },
    {
      type: "single",
      q: "Kilenc pont dendrogramjának magasságai: 0,2; 0,3; 0,4; 0,5; 0,6; 2,6; 2,9; 3,4. Hány klasztert ad a legnagyobb ugrás közepén húzott vágás?",
      options: ["4", "5", "3", "2"],
      answer: 0,
      hint: R`Hány összevonás van a vágás alatt? $k=n-(\text{alatta lévő összevonások})$.`,
      explain: R`A legnagyobb ugrás 0,6 → 2,6 (2,0). Alatta 5 összevonás van, így $9-5=4$ klaszter. Az 5 az összevonások száma, nem a klasztereké.`
    },
    {
      type: "single",
      q: R`Egy vásárlóra $a(i)=3$ és $b(i)=2$. Mennyi a silhouette-értéke, és mit jelent?`,
      options: [
        "−0,33: közelebb van a szomszéd klaszterhez, valószínűleg rossz helyen van",
        "0,33: jól illeszkedik a saját klaszterébe",
        "−0,5: közelebb van a szomszéd klaszterhez",
        "0,5: határesetként a két klaszter között van"
      ],
      answer: 0,
      hint: R`$s=\frac{b-a}{\max(a,b)}$; figyelj, mivel osztasz.`,
      explain: R`$s=\frac{2-3}{3}\approx-0{,}33$. A negatív érték azt jelzi, hogy a pont átlagosan közelebb van a legközelebbi másik klaszterhez, mint a sajátjához. A −0,5 a $\min(a,b)$-vel való osztás hibája.`
    },
    {
      type: "multi",
      q: "Melyek igazak a HAC-ra a K-means-szel szemben? (Több is lehet.)",
      options: [
        "Determinisztikus: nincs véletlen kezdőpont",
        "A klaszterszám utólag, újrafuttatás nélkül választható",
        "Egy korábbi rossz összevonást nem tud kijavítani",
        "Nagy adathalmazon is gyorsabb a K-means-nél",
        "Van beépített predict metódusa új pontokra"
      ],
      answer: [0, 1, 2],
      hint: "Gondolj a távolságmátrix méretére és az sklearn AgglomerativeClustering metódusaira.",
      explain: "A HAC determinisztikus, a teljes hierarchiából bármely k kiolvasható, de mohó, ezért nem javít. Nagy adatra lassabb (n²-es memória), és nincs predict – ez a K-means két előnye."
    },
    {
      type: "single",
      q: "A dendrogramon egy pont mindig a nagy klaszterhez csatlakozik egyenként, egyre magasabban („lépcső”), és két klaszternél egyetlen pont válik le. Melyik kapcsolásra jellemző ez?",
      options: ["Single", "Complete", "Ward", "Average"],
      answer: 0,
      hint: "Melyik módszernél elég, hogy a nagy klaszter legközelebbi pontja közel legyen?",
      explain: "Ez a láncolódás, a single kapcsolás tipikus hibája. A kézi példában (1, 3, 4, 7, 11) a single magasságai 1, 2, 3, 4 voltak, és két klaszternél csak az E vált le."
    },
    {
      type: "single",
      q: "A gyakorlat k_comparison táblája szerint melyik k-t javasolja a legnagyobb magasságrés, és hol a vágás?",
      options: [
        "k = 2, vágási magasság ≈ 13,67",
        "k = 2, vágási magasság ≈ 12,03",
        "k = 3, vágási magasság ≈ 5,91",
        "k = 3, vágási magasság ≈ 7,65"
      ],
      answer: 0,
      hint: "A vágás a rés két magasságának (lower és upper height) felezőpontjába kerül, nem a rés nagyságához.",
      explain: R`$k=2$: lower 7,652, upper 19,682, rés 12,03 (a legnagyobb). Vágás: $\frac{7{,}652+19{,}682}{2}\approx13{,}67$. A 12,03 maga a rés, nem magasság; a 5,91 a $k=3$ rés közepe lenne.`
    },
    {
      type: "multi",
      q: "Melyik állítás igaz a gyakorlat eredményeire? (Több is lehet.)",
      options: [
        "A k = 2 és k = 3 silhouette-je szinte azonos (0,7155 és 0,7144)",
        "A 2. klaszter a kisebb (40 fő), de átlagosan sokkal többet költ",
        "A K-means ugyanazt a 80 + 40 fős felosztást adta k = 2-re",
        "Az 1. klaszter a legjobb vásárlók csoportja, mert kisebb a sorszáma",
        "Single kapcsolással egészen más felosztás jött ki"
      ],
      answer: [0, 1, 2],
      hint: "A klaszterek sorszáma nem rangsor; és gondold meg, mennyire különülnek el a csoportok ebben a mesterséges adatban.",
      explain: "A 2. klaszter (40 fő) átlagosan kb. 184 ezer Ft-ot költ, az 1. (80 fő) kb. 31 ezret. Mind a négy kapcsolás és a K-means is ugyanazt a felosztást adta, mert a csoportok messze vannak egymástól. A címke csak sorszám."
    },
    {
      type: "single",
      q: "Miért a standardizált adatokon futtatjuk a HAC-ot?",
      options: [
        "Mert távolságokra épül, és standardizálás nélkül a forintban mért összköltés elnyomná a vásárlásszámot",
        "Mert a scipy linkage függvénye csak 0 és 1 közötti értékeket fogad el",
        "Mert a Ward-módszer csak negatív értékekkel működik",
        "Mert így a dendrogram levelei ábécérendbe kerülnek"
      ],
      answer: 0,
      hint: "Mekkora a total_spent és a purchase_count tipikus nagyságrendje? (3. lecke)",
      explain: "Az összköltés tízezres, a vásárlásszám egyjegyű nagyságrendű; nyers adaton a távolságot szinte csak az összköltés határozná meg. A standardizálás közös skálára hozza a jellemzőket."
    },
    {
      type: "single",
      q: "A gyakorlat Ward-dendrogramján a legfelső összevonás magassága 19,68. Mit jelent ez a szám?",
      options: [
        "A Ward-féle négyzetes eltérésnövekedésből számolt összevonási magasság – nem két vásárló vagy két középpont egyszerű távolsága",
        "A két legtávolabbi vásárló euklideszi távolsága",
        "A két végső klaszter középpontjainak távolsága",
        "Ezer forintban mért átlagos költéskülönbség"
      ],
      answer: 0,
      hint: "A gyakorlat kódjában is van erről egy figyelmeztető megjegyzés.",
      explain: "Ward esetén a magasság a klaszteren belüli négyzetösszeg növekedéséből adódik (scipy: √(2Δ)), és a klaszterméretektől is függ. Csak a sorrendje és az ugrásai értelmezhetők, nem „távolság” jelentésben. Mértékegysége sincs (standardizált adat)."
    },
    {
      type: "single",
      q: "A kézi példában (1, 3, 4, 7, 11) a complete két klaszterének átlagos silhouette-je ≈ 0,527, a single-é ≈ 0,386. Mi a helyes következtetés?",
      options: [
        "Erre az adatra a complete felosztása ({A,B,C}, {D,E}) jobb",
        "A single mindig rosszabb a complete-nél",
        "A silhouette a kapcsolási módot értékeli, nem a felosztást",
        "A két érték különbsége a véletlen kezdőpontokból adódik"
      ],
      answer: 0,
      hint: "A silhouette egy konkrét felosztás minőségét méri, bármelyik algoritmus is állította elő.",
      explain: "A silhouette a felosztást értékeli; itt a complete által adott felosztás jobb. Ez nem jelenti, hogy a single mindig rosszabb (elnyújtott alakú csoportoknál épp a single lehet jó). A HAC-ban nincs véletlen elem."
    }
  ]
};
