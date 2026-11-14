QUIZZES["l08-vizsga"] = {
  title: "Vizsgakvíz – vegyes kérdések a teljes félévből (14 kérdés)",
  questions: [
    {
      type: "match",
      q: "Párosítsd a kérdést a megfelelő módszerrel!",
      pairs: [
        ["Mely termékeket veszik gyakran együtt?", "Apriori + asszociációs szabályok"],
        ["Csoportosítsuk a vásárlókat, k ismeretlen, látni akarjuk az összevonások sorrendjét", "Hierarchikus klaszterezés (HAC)"],
        ["Csoportosítsuk a vásárlókat 3 szegmensbe", "K-means"],
        ["Jósoljuk meg, ki bukik meg, érthető szabályokkal", "Döntési fa"],
        ["Számoljunk ügyfelenként halmozott vásárlási összeget SQL-ben", "SUM(...) OVER (PARTITION BY ... ORDER BY ...)"]
      ],
      hint: "Van-e célváltozó? Ha igen, osztályozás. Ha nincs, klaszterezés vagy kosárelemzés. Az SQL-es kérdésnél a sorok megmaradnak.",
      explain: "Kosár → asszociációs szabályok; ismeretlen k és hierarchia → HAC; adott k → K-means; ismert célváltozó és értelmezhető szabály → döntési fa; halmozott összeg a sorok megtartásával → ablakfüggvény."
    },
    {
      type: "single",
      q: R`10 kosárból 6-ban van kenyér, 5-ben tej, 4-ben mindkettő. Mennyi a $\{\text{kenyér}\}\to\{\text{tej}\}$ szabály liftje?`,
      options: ["≈ 1,33", "≈ 0,67", "0,40", "0,80"],
      answer: 0,
      hint: R`$\mathrm{lift}=\mathrm{supp}(A\cup B)/(\mathrm{supp}(A)\cdot\mathrm{supp}(B))$.`,
      explain: R`$0{,}4/(0{,}6\cdot0{,}5)\approx1{,}33$. A 0,67 a megbízhatóság ($0{,}4/0{,}6$), a 0,40 a támogatottság, a 0,80 a fordított irányú megbízhatóság ($\mathrm{conf}(T\to K)=0{,}4/0{,}5$).`
    },
    {
      type: "single",
      q: "Egy szabály megbízhatósága 0,9, a liftje 0,95. Mit jelent ez?",
      options: [
        "A következmény amúgy is nagyon gyakori; az előzmény nem növeli, sőt kissé csökkenti a valószínűségét.",
        "Erős szabály, mert a megbízhatóság 90%.",
        "A két termék egymás helyettesítője, ezért a szabály 95%-ban igaz.",
        "A szabály hibás, mert a lift nem lehet kisebb a megbízhatóságnál."
      ],
      answer: 0,
      hint: "A lift a függetlenséghez hasonlít. Mit jelent, ha 1 alatt van?",
      explain: R`$\mathrm{lift}=\mathrm{conf}/\mathrm{supp}(B)$, így $\mathrm{supp}(B)\approx0{,}95$. B-t szinte mindenki megveszi, A-tól függetlenül. A lift &lt; 1 azt jelenti, hogy A mellett kicsit ritkábban fordul elő B, mint általában. A magas megbízhatóság önmagában félrevezető.`
    },
    {
      type: "single",
      q: "Miért kell standardizálni a változókat K-means előtt?",
      options: [
        "Mert a távolságot a nagy nagyságrendű változó (pl. költés forintban) uralná a kis nagyságrendűvel (pl. vásárlásszám) szemben.",
        "Mert a K-means csak normális eloszlású adatokon működik, és a standardizálás normálissá teszi az adatokat.",
        "Mert standardizálás nélkül a K-means nem konvergál.",
        "Mert így a klaszterek mindig egyforma méretűek lesznek."
      ],
      answer: 0,
      hint: "A K-means euklideszi távolságot számol. Mi történik, ha az egyik oszlop ezres, a másik egyes nagyságrendű?",
      explain: "A standardizálás közös skálára hozza a változókat, így mindegyik hasonló súllyal számít a távolságban. Nem teszi normálissá az eloszlást – ezt a gyakorlati anyag külön kiemeli."
    },
    {
      type: "single",
      q: "Egy pontra a = 2 (átlagos távolság a saját klaszterben) és b = 5 (a legközelebbi másik klaszterben). Mennyi a silhouette-érték?",
      options: ["0,6", "0,4", "−0,6", "1,5"],
      answer: 0,
      hint: R`$s=(b-a)/\max(a,b)$.`,
      explain: R`$(5-2)/5=0{,}6$. A 0,4 az $a/b$ hányados, a −0,6 a felcserélt $(a-b)/\max$, az 1,5 a $(b-a)/a$, rossz nevezővel.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak a K-means és a HAC összevetésére?",
      options: [
        "A K-means-nek előre meg kell adni a klaszterek számát.",
        "A K-means eredménye függhet a kezdő középpontoktól.",
        "A HAC a korábbi összevonásokat nem bontja vissza.",
        "A HAC-nál a dendrogram legnagyobb ugrása segít a klaszterszám megválasztásában.",
        "A HAC mindig ugyanazt az eredményt adja, mint a K-means, ha k megegyezik."
      ],
      answer: [0, 1, 2, 3],
      hint: "Négy állítás igaz. Gondolj arra, mit tapasztaltunk a 4. gyakorlaton a két módszer eltéréseiről.",
      explain: "Az első négy állítás igaz. Az utolsó hamis: a két módszer más elven működik, és azonos k mellett is eltérő klaszterezést adhat. A gyakorlat egyik feladata épp ennek az eltérésnek a megfogalmazása volt."
    },
    {
      type: "single",
      q: "Egy döntési fa csomópontjában 6 „igen” és 2 „nem” példa van. Mennyi a Gini-index?",
      options: ["0,375", "0,625", "0,811", "0,25"],
      answer: 0,
      hint: R`$G=1-\sum p_i^2$, ahol $p_{\text{igen}}=6/8$.`,
      explain: R`$1-(0{,}75^2+0{,}25^2)=0{,}375$. A 0,625 a $\sum p_i^2$ (kimaradt az „1 −”), a 0,811 az entrópia, a 0,25 a kisebbségi osztály aránya.`
    },
    {
      type: "single",
      q: "TP = 40, FP = 10, FN = 20, TN = 30. Mennyi az érzékenység (recall)?",
      options: ["≈ 0,667", "0,80", "0,70", "0,60"],
      answer: 0,
      hint: "Az érzékenység a VALÓDI pozitívakból indul ki. Hány valódi pozitív eset van?",
      explain: R`$TP/(TP+FN)=40/60\approx0{,}667$. A 0,80 a precizitás ($40/50$), a 0,70 a pontosság, a 0,60 a valódi negatívak közül helyesen felismertek aránya ($30/50$).`
    },
    {
      type: "single",
      q: "A tesztadatok 72%-a „sikeres”. A döntési fa pontossága 0,724. Mi a helyes következtetés?",
      options: [
        "A pontosság önmagában nem mutatja meg, hogy a fa jobb-e annál, mint mindig „sikeres”-t mondani; nézni kell az alapmodellt, a balanced accuracy-t és az osztályonkénti mutatókat.",
        "A modell kiváló, mert a pontosság 70% fölött van.",
        "A modell használhatatlan, mert a pontosság 75% alatt van.",
        "Túltanulás történt, mert a pontosság közel van az osztályarányhoz."
      ],
      answer: 0,
      hint: "Mekkora pontosságot érne el egy modell, amely mindig a többségi osztályt mondja?",
      explain: "A többségi alapmodell is kb. 0,724-es pontosságú – a gyakorlaton pontosan ez jött ki. Kiegyensúlyozatlan osztályoknál a pontosság félrevezető; a balanced accuracy és a kisebbségi osztály felismerése a döntő."
    },
    {
      type: "single",
      q: "A passed változó az exam_score ≥ 50 szabályból készült. Miért nem lehet az exam_score a modell bemenete?",
      options: [
        "Adatszivárgás: a célváltozó közvetlenül kiszámolható belőle, így a modell tökéletesnek látszana, de új hallgatóra (vizsga előtt) használhatatlan lenne.",
        "Mert numerikus változó, a döntési fa pedig csak kategorikus bemenetet kezel.",
        "Mert túl sok különböző értéke van, és ez túltanuláshoz vezet.",
        "Mert az exam_score-t előbb one-hot kódolni kellene."
      ],
      answer: 0,
      hint: "Mikor akarjuk használni a modellt? Ismert-e akkor már a vizsgaeredmény?",
      explain: "A modellt akkor használnánk, amikor a vizsgaeredmény még nem ismert. Ha az exam_score bemenet, a fa egyetlen vágással (≤ 50) tökéletes lenne – ez csalás, nem tanulás. A döntési fa egyébként kezel numerikus bemenetet."
    },
    {
      type: "single",
      q: "Egy mély döntési fa tanítópontossága 1,00, tesztpontossága 0,65. Egy sekélyebb fáé 0,80 és 0,76. Mi a diagnózis?",
      options: [
        "A mély fa túltanult; a sekélyebb fa jobban általánosít.",
        "A mély fa alultanult, mert a tesztpontossága alacsony.",
        "A sekély fa túltanult, mert a két pontossága közel van egymáshoz.",
        "Mindkettő jó, mert a tanítópontosság mindkettőnél legalább 0,8."
      ],
      answer: 0,
      hint: "Nézd a tanító- és a teszteredmény közötti rést.",
      explain: "Nagy rés (kiváló tanító-, gyenge teszteredmény) = túltanulás. Alultanulásnál mindkét eredmény gyenge. Az új adatokon nyújtott teljesítmény számít."
    },
    {
      type: "single",
      q: R`Egy perceptron: $w=(0{,}5;\,-1)$, $b=0{,}2$, $x=(2;\,1)$, és a kimenet 1, ha a súlyozott összeg ≥ 0. Mi a kimenet?`,
      options: ["1, mert a súlyozott összeg 0,2", "0, mert a súlyozott összeg −0,2", "1, mert a súlyozott összeg 2,2", "1, mert a súlyozott összeg 0"],
      answer: 0,
      hint: R`$\sum w_i x_i + b$ – vigyázz az előjelre és az eltolásra.`,
      explain: R`$0{,}5\cdot2-1\cdot1+0{,}2=0{,}2\ge 0$, tehát a kimenet 1. A −0,2 a $b$ levonásából jön, a 0 a $b$ elhagyásából, a 2,2 a negatív súly előjelének elhagyásából.`
    },
    {
      type: "multi",
      q: "Mely beavatkozások segítenek egy MLP túltanulása ellen?",
      options: [
        "L2-regularizáció (nagyobb alpha)",
        "Korai leállítás validációs halmaz alapján (early_stopping=True)",
        "Kisebb háló (kevesebb neuron vagy réteg)",
        "A max_iter jelentős növelése, hogy a tanítási veszteség nullára csökkenjen",
        "A standardizálás elhagyása"
      ],
      answer: [0, 1, 2],
      hint: "Három helyes válasz van. Melyik korlátozza a modell bonyolultságát, vagy állítja meg időben a tanítást?",
      explain: "A regularizáció a nagy súlyokat bünteti, a korai leállítás a validációs romlásnál megáll, a kisebb háló kevésbé tud „magolni”. A tanítási veszteség hajszolása épp a túltanulás felé visz. A standardizálás elhagyása pedig rontja a tanulást, és a túltanulás ellen sem véd."
    },
    {
      type: "single",
      q: "Az árbevételek csökkenő sorrendben: 100, 90, 90, 80. Milyen sorszámokat ad a RANK()?",
      options: ["1, 2, 2, 4", "1, 2, 2, 3", "1, 2, 3, 4", "1, 1, 2, 3"],
      answer: 0,
      hint: "A RANK holtverseny után kihagy sorszámot.",
      explain: "RANK: 1, 2, 2, 4. Az 1, 2, 2, 3 a DENSE_RANK, az 1, 2, 3, 4 a ROW_NUMBER eredménye. Az 1, 1, 2, 3 rossz holtversenykezelés."
    }
  ]
};
