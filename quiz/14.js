/* 14. lecke – Távolságok, sűrűség alapú klaszterezés, validálás, kiugró rekordok – kvízek */
window.QUIZZES = window.QUIZZES || {};
var R = window.R || String.raw;

QUIZZES["l14-lepes2"] = {
  title: "Mini-kvíz – Távolságmértékek",
  questions: [
    {
      type: "single",
      q: R`Mennyi a Manhattan-, az euklideszi és a Csebisev-távolság (ebben a sorrendben) az $(1;1)$ és a $(4;5)$ pont között?`,
      options: ["7; 5; 4", "5; 7; 4", "7; 25; 4", "7; 5; 3"],
      answer: 0,
      hint: "Írd fel a koordinátánkénti eltéréseket (3 és 4), és ezekből számolj: összeg, Pitagorasz, maximum.",
      explain: R`Eltérések: 3 és 4. Manhattan $3+4=7$, euklideszi $\sqrt{9+16}=5$, Csebisev $\max(3;4)=4$. A 25 a négyzetes euklideszi (gyökvonás nélkül), a 3 a kisebbik eltérés (minimum a maximum helyett), az „5; 7; 4” felcseréli az első kettőt.`
    },
    {
      type: "match",
      q: "Párosítsd a Minkowski-paramétert / esetet a távolság nevével!",
      pairs: [
        ["r = 1", "Manhattan- (taxi-, háztömb-) távolság"],
        ["r = 2", "euklideszi (légvonalbeli) távolság"],
        ["r = ∞", "Csebisev- (maximum-) távolság"],
        ["r = 1 bináris vektorokon", "Hamming-távolság (eltérő pozíciók száma)"]
      ],
      hint: R`$d_r=\big(\sum|p_k-q_k|^r\big)^{1/r}$ – mi lesz belőle $r=1$-re, $r=2$-re, és ha $r$ nagyon nagy?`,
      explain: R`$r=1$: abszolút eltérések összege; $r=2$: Pitagorasz; $r\to\infty$: csak a legnagyobb eltérés marad. 0/1 vektoron az abszolút eltérés 0 vagy 1, így az összeg az eltérő pozíciók száma.`
    },
    {
      type: "single",
      q: "Mikor érdemes az euklideszi helyett a Mahalanobis-távolságot használni?",
      options: [
        "Ha a változók erősen korreláltak, és olyan távolság kell, amely az adatok eloszlásához (szórásához, együttmozgásához) igazodik.",
        "Ha a rekordok bináris (0/1) vektorok.",
        "Ha a két pont között rácsos úthálózaton kell utat mérni.",
        "Ha a változók korrelálatlanok és azonos skálájúak – ilyenkor ad nagyon mást."
      ],
      answer: 0,
      hint: R`A képletben $\Sigma^{-1}$ szerepel – mit tartalmaz a kovarianciamátrix?`,
      explain: R`A Mahalanobis a kovarianciamátrix inverzével „kiveszi” a szórást és a korrelációt; korrelált adaton a sorrend meg is fordulhat az euklideszihez képest. Korrelálatlan, azonos skálájú változóknál épp hogy az euklideszivel egyezik. Bináris adatra a Hamming/Jaccard, úthálózatra a Manhattan való.`
    },
    {
      type: "single",
      q: R`$\Sigma=\begin{pmatrix}4&0\\0&1\end{pmatrix}$, $p-q=(2;\,2)$. Mennyi a (gyökös) Mahalanobis-távolság?`,
      options: [R`$\sqrt5\approx 2{,}236$`, R`$\sqrt8\approx 2{,}828$`, R`$\sqrt{20}\approx 4{,}472$`, R`$\sqrt2\approx 1{,}414$`],
      answer: 0,
      hint: R`Diagonális $\Sigma$-nál az inverz a főátló reciprokaiból áll: minden négyzetes eltérést a saját varianciájával osztunk.`,
      explain: R`$\sqrt{2^2/4+2^2/1}=\sqrt{1+4}=\sqrt5$. A $\sqrt8$ az euklideszi távolság ($\Sigma$ figyelmen kívül hagyva), a $\sqrt{20}$ az, ha $\Sigma^{-1}$ helyett $\Sigma$-val szorzol ($4\cdot4+1\cdot4$), a $\sqrt2$ az, ha mindkét tagot 4-gyel osztod.`
    }
  ]
};

QUIZZES["l14-lepes4"] = {
  title: "Mini-kvíz – Hasonlósági mértékek",
  questions: [
    {
      type: "single",
      q: R`$p=(1,1,0,1,0,0)$, $q=(1,0,0,1,1,0)$. Mennyi az egyszerű egyezés (SMC) és a Jaccard-együttható?`,
      options: [
        R`$SMC\approx 0{,}667$; $J=0{,}5$`,
        R`$SMC=0{,}5$; $J\approx 0{,}667$`,
        R`$SMC\approx 0{,}667$; $J\approx 0{,}333$`,
        R`$SMC\approx 0{,}333$; $J=0{,}5$`
      ],
      answer: 0,
      hint: R`Számold meg: $M_{11}$, $M_{10}$, $M_{01}$, $M_{00}$. A Jaccard nevezőjéből a közös nullák kimaradnak.`,
      explain: R`$M_{11}=2$, $M_{10}=1$, $M_{01}=1$, $M_{00}=2$. $SMC=(2+2)/6\approx 0{,}667$, $J=2/(2+1+1)=0{,}5$. A „0,333” az $M_{11}$-et a teljes hosszal osztja, a második opció felcseréli a két mértéket.`
    },
    {
      type: "single",
      q: "Két vásárló kosarát 0/1 vektorral írjuk le egy 3000 termékes boltban. Melyik hasonlósági mérték ad értelmes képet, és miért?",
      options: [
        "A Jaccard-együttható, mert az, hogy egy terméket egyikük sem vett meg, nem hordoz információt a hasonlóságukról.",
        "Az egyszerű egyezés, mert minden pozíció egyformán fontos.",
        "Az euklideszi távolság, mert az mindig a legpontosabb.",
        "Mindegy, a két mérték kosáradaton ugyanazt adja."
      ],
      answer: 0,
      hint: "Gondolj arra, mekkora lesz $M_{00}$ egy 3000 termékes boltban.",
      explain: R`Ritka kosáradaton $M_{00}$ óriási, ezért az SMC szinte minden párra 1 közeli lenne. A Jaccard a közös nullákat kihagyja, és csak azt nézi, a megvett termékek közül mennyi közös. A két mérték csak akkor egyezik, ha $M_{00}=0$.`
    },
    {
      type: "single",
      q: R`Mennyi a $(1;2)$ és a $(2;1)$ vektor koszinusz-hasonlósága?`,
      options: ["0,8", "0,4", "4", "1"],
      answer: 0,
      hint: R`Skaláris szorzat osztva a két hossz szorzatával.`,
      explain: R`$\frac{1\cdot2+2\cdot1}{\sqrt5\cdot\sqrt5}=\frac45=0{,}8$. A 4 csak a skaláris szorzat (normálás nélkül), a 0,4 az, ha a hosszak szorzata helyett a négyzetösszegek összegével (10) osztasz, az 1 azonos irányú vektoroké lenne.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak?",
      options: [
        "A koszinusz-hasonlóság nem változik, ha az egyik vektort pozitív számmal megszorozzuk.",
        "A korreláció nem változik, ha az egyik vektor minden eleméhez ugyanazt a számot adjuk.",
        "A korreláció mindig 0 és 1 közé esik.",
        "A koszinusz-hasonlóság a közös nullákat (mindkét dokumentumból hiányzó szavakat) egyezésként számolja."
      ],
      answer: [0, 1],
      hint: "A koszinusz a szöget méri; a korreláció előbb standardizál (kivonja az átlagot, oszt a szórással).",
      explain: R`Nyújtásra a szög nem változik; eltolásra a standardizált vektor nem változik. A korreláció $[-1;1]$-ben van ($-1$: tökéletes negatív kapcsolat). A közös nullák a skaláris szorzatban 0-t adnak, tehát a koszinuszt nem növelik – ebben a Jaccardhoz hasonlít.`
    }
  ]
};

QUIZZES["l14-lepes6"] = {
  title: "Mini-kvíz – DBSCAN",
  questions: [
    {
      type: "single",
      q: "Melyik két paramétert használja a DBSCAN algoritmus?",
      options: ["Eps (környezetsugár) és MinPts (minimális pontszám)", "K és SSE", "Precision és recall", "A kapcsolási mód és a vágási magasság"],
      answer: 0,
      hint: "A sűrűséghez kell egy sugár és egy darabszám.",
      explain: "Az Eps a pontok körüli környezet sugara, a MinPts a „sűrű” környezethez szükséges pontok minimális száma. A K a K-means, a kapcsolási mód és a vágás a HAC paramétere, a precision/recall osztályozási mutató."
    },
    {
      type: "single",
      q: "Eps = 1,5, MinPts = 3 (a pontot magát is számolva). Egy pont 1,5-ös környezetében önmagán kívül egyetlen pont van, és az magpont. Milyen pont ez?",
      options: ["Határpont", "Magpont", "Zajpont", "Nem dönthető el"],
      answer: 0,
      hint: "Előbb nézd meg, eléri-e a pontszám a MinPts-et; ha nem, van-e magpont a közelben.",
      explain: "Önmagával együtt 2 pont van a környezetében, ez kevesebb, mint 3 → nem magpont. De a környezetében van magpont → határpont. Zajpont csak akkor lenne, ha magpont sem volna a közelében."
    },
    {
      type: "single",
      q: "Mi történik tipikusan, ha a DBSCAN Eps paraméterét túl nagyra választod?",
      options: [
        "Különálló csoportok egy klaszterbe olvadnak, mert a köztük lévő ritka pontok is magpontok lesznek és „hidat” vernek.",
        "Szinte minden pont zajpont lesz.",
        "Pontosan K klaszter jön létre.",
        "Az algoritmus nem áll le."
      ],
      answer: 0,
      hint: "Nagyobb sugár → több szomszéd → több magpont.",
      explain: "Nagy Eps mellett a ritka sávban álló pontoknak is elég szomszédja lesz, magponttá válnak, és összekötik a csoportokat (a kézi példában Eps = 2-nél minden egy klaszter lett). A túl sok zaj a túl kicsi Eps (vagy túl nagy MinPts) jele."
    },
    {
      type: "multi",
      q: "Mely állítások igazak a DBSCAN-ra a K-means-szel szemben?",
      options: [
        "Nem kell előre megadni a klaszterek számát.",
        "A zajpontokat egyik klaszterbe sem sorolja.",
        "Nem gömb alakú (pl. elnyújtott, ívelt) klasztereket is megtalálhat.",
        "Jól kezeli a nagyon eltérő sűrűségű klasztereket egyetlen Eps-szel.",
        "A scikit-learn DBSCAN-nak van predict metódusa új pontok besorolására."
      ],
      answer: [0, 1, 2],
      hint: "Két állítás épp a DBSCAN ismert gyengeségéről, illetve egy hiányzó funkciójáról szól.",
      explain: "A klaszterek száma a sűrű tartományok számából adódik, a zaj címkéje −1, és a lánc mentén tetszőleges alak kirajzolódhat. Eltérő sűrűségnél egyetlen Eps nem jó mindenhová, és a sklearn DBSCAN-nak csak fit_predict-je van."
    },
    {
      type: "single",
      q: "Egydimenziós pontok: 1, 2, 3, 4, 8, 9, 10, 20; Eps = 1,5, MinPts = 3 (önmagával). Melyik pont(ok) zaj?",
      options: ["Csak a 20", "Az 1, 4, 8, 10 és a 20", "Egyik sem", "A 8, 9 és 10"],
      answer: 0,
      hint: "Előbb keresd meg a magpontokat (3 pont 1,5-en belül), aztán nézd meg, kinek van magpont szomszédja.",
      explain: "Magpont: 2, 3, 9. Az 1 és a 4 a 2, ill. a 3 szomszédja, a 8 és a 10 a 9-é → határpontok (nem zaj!). Csak a 20-nak nincs senki a közelében. Az „1, 4, 8, 10, 20” a határpontokat is zajnak nézi."
    }
  ]
};

QUIZZES["l14-lepes7"] = {
  title: "Mini-kvíz – Klaszter-validálás",
  questions: [
    {
      type: "single",
      q: "Miért nehezebb a klaszterezés eredményének validálása, mint egy felügyelt osztályozási modellé?",
      options: [
        "Mert általában nincs olyan tesztállomány, amelyben ismert lenne a valódi klasztertagság.",
        "Mert klaszterezésnél semmilyen mérőszám nem használható.",
        "Mert a klaszterezés mindig csak két klasztert hozhat létre.",
        "Mert a klaszterezés eredménye véletlenszerű, így nem ismételhető."
      ],
      answer: 0,
      hint: "Mihez hasonlítjuk az osztályozó előrejelzéseit?",
      explain: "Az osztályozót a tesztadat ismert címkéihez mérjük; klaszterezésnél ilyen „helyes válasz” nincs. Ezért belső mutatókat (SSE, SSB, sziluett, Davies–Bouldin) használunk. A klaszterszám nem korlátozott, és rögzített beállítással a futás ismételhető."
    },
    {
      type: "match",
      q: "Párosítsd a mutatót azzal, milyen értéke jelez jó klaszterezést!",
      pairs: [
        ["SSE (kohézió)", "kicsi – tömör klaszterek"],
        ["SSB (szeparáció)", "nagy – egymástól távoli klaszterközéppontok"],
        ["sziluett", "1-hez közeli – a pontok jó helyen vannak"],
        ["Davies–Bouldin-index", "0-hoz közeli – kevéssé összetéveszthető klaszterpárok"]
      ],
      hint: "Kettő „minél kisebb, annál jobb”, kettő „minél nagyobb, annál jobb”.",
      explain: "SSE ↓, SSB ↑, sziluett ↑, Davies–Bouldin ↓. A DB-t gyakran tévesen „nagyobb a jobb” módon olvassák: a képletben a szórások összege áll a számlálóban és a középpontok távolsága a nevezőben."
    },
    {
      type: "single",
      q: R`A gyakorlat standardizált adatán $\mathrm{SST}=240$, a K-means $k=3$-mal $\mathrm{SSE}=17{,}02$-t ad. Mennyi az SSB?`,
      options: ["222,98", "257,02", "17,02", "14,10"],
      answer: 0,
      hint: R`$\mathrm{SSE}+\mathrm{SSB}=\mathrm{SST}$.`,
      explain: R`$\mathrm{SSB}=240-17{,}02=222{,}98$. A 257,02 összeadja a kettőt, a 14,10 az $\mathrm{SST}/\mathrm{SSE}$ hányados, a 17,02 maga az SSE.`
    },
    {
      type: "single",
      q: R`Egydimenziós klaszterek: $\{1,3\}$ és $\{9,11\}$. Mennyi a Davies–Bouldin-index (az $s_i$ a középponttól vett átlagos távolság)?`,
      options: ["0,25", "0,125", "4", "0,5"],
      answer: 0,
      hint: R`$s_1$, $s_2$, a középpontok távolsága, majd $(s_1+s_2)/d$.`,
      explain: R`Középpontok 2 és 10, $s_1=s_2=1$, $d=8$: $DB=(1+1)/8=0{,}25$. A 0,125 csak az egyik szórást veszi, a 4 a hányados fordítottja, a 0,5 a 4-gyel (a klaszterek összméretével) osztás.`
    }
  ]
};

QUIZZES["l14-lepes9"] = {
  title: "Mini-kvíz – Kiugró rekordok",
  questions: [
    {
      type: "single",
      q: "Melyik lehet helyes, mégis rendellenes adat?",
      options: [
        "Egy szokatlanul nagy összegű, de valóban a számlatulajdonos által indított banki utalás.",
        "Egy tévesen rögzített 333 éves életkor.",
        "Egy hiányzó érték egy kötelező mezőben.",
        "Egy −5 darabos eladási tétel egy olyan rendszerben, ahol visszáru nincs."
      ],
      answer: 0,
      hint: "A „rendellenes” azt jelenti: kilóg a többi közül – nem azt, hogy hibás.",
      explain: "Az utalás valódi, csak ritka – helyes rendellenes adat (ugyanilyen lehet egy csalás is, a megkülönböztetéshez kontextus kell). A 333 év és a negatív darabszám hibás adat, a hiányzó érték pedig hiányosság, nem kiugrás."
    },
    {
      type: "single",
      q: R`Életkorok: 23, 25, 27, 29, 31, 333. A 333 z-pontszáma csak kb. 2,24, így a „$|z|>3$” szabály nem jelez. Miért?`,
      options: [
        "Mert maga a kiugró érték felfújja az átlagot és a szórást (maszkolás); 6 adatnál a |z| populációs szórással legfeljebb √5 ≈ 2,24 lehet.",
        "Mert a 333 nem kiugró érték.",
        "Mert a z-pontszámot mediánnal kell számolni.",
        "Mert a z-pontszám csak negatív kiugrókat jelez."
      ],
      answer: 0,
      hint: R`Mennyi lenne az átlag és a szórás a 333 nélkül? És mi a $|z|$ felső korlátja $n$ adatnál?`,
      explain: R`Az átlag 78, a szórás 114 lett a 333 miatt. $n$ adatnál $|z|\le\sqrt{n-1}$, ami $n=6$-ra 2,236 – a 3-as küszöböt el sem érheti. Kis mintán Grubbs-próba ($G\approx 2{,}04>1{,}887$) vagy IQR-kerítés (felső határ 38) jelez.`
    },
    {
      type: "single",
      q: R`Pontok: 1, 2, 3, 4, 5, 12. Mennyi a 12 rendellenességi pontszáma, ha a pontszám a 2. legközelebbi másik ponttól vett távolság?`,
      options: ["8", "7", "1", "2"],
      answer: 0,
      hint: "Rendezd a 12 távolságait a többi ponttól növekvő sorrendbe.",
      explain: "A 12 távolságai: 7 (az 5), 8 (a 4), 9, … A 2. legközelebbi 8-ra van. A 7 a legközelebbi (k = 1), az 1 és a 2 a normál pontok tipikus pontszáma."
    },
    {
      type: "multi",
      q: R`Az új vásárló, U (3 vásárlás, 200 000 Ft) z-értékei $-1{,}24$ és $1{,}55$. Mely módszerek jelzik U-t a gyakorlat adatán kiugróként?`,
      options: [
        "A DBSCAN (Eps = 0,3, MinPts = 5): U zajpont.",
        "Az 5-NN pontszám: U-é 2,045, a többieké legfeljebb 0,365.",
        "A Mahalanobis-távolság: 8,45, a többieké legfeljebb 2,45.",
        "A |z| > 3 szabály változónként.",
        "Az IQR-kerítés változónként."
      ],
      answer: [0, 1, 2],
      hint: "U egyik változóban sem szélsőséges – csak a kettő kombinációja szokatlan.",
      explain: "A változónkénti módszerek (z, IQR) nem jeleznek: mindkét érték a szokásos tartományban van. A pontot a két változó együttes terében vizsgáló módszerek (sűrűség, k-NN, Mahalanobis) viszont egyértelműen kiszúrják, mert a vásárlók egy erősen korrelált sávban állnak, U pedig attól messze."
    }
  ]
};

QUIZZES["l14-vegso"] = {
  title: "Ellenőrző kvíz – Távolságok, DBSCAN, validálás, kiugrók",
  questions: [
    {
      type: "single",
      q: R`$A=(0;0)$, $B=(3;3)$, $C=(0;5)$. Melyik mérték szerint van $C$ közelebb $A$-hoz, mint $B$?`,
      options: ["Manhattan", "Euklideszi", "Csebisev", "Mindhárom szerint"],
      answer: 0,
      hint: R`Számold ki mindhármat $B$-re és $C$-re is.`,
      explain: R`$B$: $L^1=6$, $L^2\approx 4{,}24$, $L^\infty=3$. $C$: mindhárom 5. Csak a Manhattan szerint közelebbi a $C$ (5 &lt; 6). A mérték megfordíthatja a szomszédsági sorrendet.`
    },
    {
      type: "single",
      q: "A = {tej, kenyér, sajt, alma}, B = {tej, sajt, bor}. Mennyi a Jaccard-együttható?",
      options: ["0,4", "0,5", "0,667", "0,571"],
      answer: 0,
      hint: R`$J=|A\cap B|/|A\cup B|$.`,
      explain: R`Közös: tej, sajt (2). Unió: tej, kenyér, sajt, alma, bor (5). $J=2/5=0{,}4$. A 0,5 az A méretével oszt (2/4), a 0,667 a B méretével (2/3), a 0,571 a $2\cdot2/(4+3)$ – ez egy másik mérték (Dice-együttható), nem a Jaccard.`
    },
    {
      type: "match",
      q: "Párosítsd a módszert azzal a klasztertípussal, amelyet keres!",
      pairs: [
        ["K-means", "középpont alapú klaszterek"],
        ["single kapcsolású HAC", "összefüggő (gráf alapú) klaszterek"],
        ["DBSCAN", "sűrű tartományok, ritka sávokkal elválasztva"],
        ["fuzzy klaszterezés", "minden pont minden klaszterhez tartozik egy 0–1 közötti súllyal"]
      ],
      hint: "Gondold végig, mi alapján dönti el a módszer, hogy egy pont egy klaszterbe tartozik-e.",
      explain: "K-means: a legközelebbi középpont dönt. Single: elég egy közeli társ a klaszterben (lánc). DBSCAN: magpontok összefüggő sűrű tartománya. Fuzzy: nem éles tagság, a súlyok összege 1."
    },
    {
      type: "single",
      q: "DBSCAN, MinPts = 3 (önmagával). Egy pont Eps-környezetében önmagán kívül 2 pont van. Milyen pont ez?",
      options: ["Magpont", "Határpont", "Zajpont", "Attól függ, a szomszédai magpontok-e"],
      answer: 0,
      hint: "Önmagával együtt hány pont van a környezetében?",
      explain: "1 + 2 = 3 ≥ MinPts → magpont, függetlenül attól, milyenek a szomszédai. A szomszédok státusza csak akkor számít, ha a pont maga nem magpont (határ vagy zaj?)."
    },
    {
      type: "single",
      q: "A gyakorlat 120 vásárlóján (standardizált tér) a DBSCAN MinPts = 5 mellett Eps = 0,3-mal 40 + 40 + 40 vásárlót ad, zaj nélkül. Mit vársz Eps = 0,4-nél?",
      options: [
        "Két klasztert (80 + 40): az alkalmi és az átlagos csoport összeolvad.",
        "Négy klasztert és néhány zajpontot.",
        "Ugyanazt a három klasztert, mert az Eps-től nem függ az eredmény.",
        "Minden vásárló zaj lesz."
      ],
      answer: 0,
      hint: "Nagyobb Eps → a közeli csoportok közötti rés is „áthidalható”.",
      explain: "Nagyobb sugárral a két legközelebbi csoport magpontjai egymás környezetébe kerülnek, így összeolvadnak (80 + 40 – épp a K-means k = 2 felosztása). Kisebb Eps-nél (0,2) szétesés és zaj jelenik meg (40 + 40 + 33 + 5, 2 zajpont)."
    },
    {
      type: "single",
      q: "Mit állít az SSE + SSB = SST összefüggés?",
      options: [
        "Adott adaton a klaszteren belüli és a klaszterek közötti négyzetösszeg összege állandó: amennyivel csökken a kohézió-hiba, annyival nő a szeparáció.",
        "Az SSE mindig nagyobb az SSB-nél.",
        "A klaszterek száma egyenlő az SSE és az SSB összegével.",
        "Az SSE és az SSB közül mindig csak az egyiket lehet kiszámolni."
      ],
      answer: 0,
      hint: "Az SST csak az adattól függ, a felosztástól nem.",
      explain: "Az SST az összes pont átlagtól vett négyzetösszege; bármilyen felosztásnál SSE + SSB = SST. Ezért az SSE minimalizálása (K-means) egyben az SSB maximalizálása. A gyakorlaton k = 3-ra 17,02 + 222,98 = 240."
    },
    {
      type: "single",
      q: R`Legfeljebb mekkora lehet egy érték $|z|$-pontszáma (populációs szórással) 5 adatból álló mintában?`,
      options: ["2", "3", R`$\sqrt5\approx 2{,}24$`, "Nincs felső korlát"],
      answer: 0,
      hint: R`A felső korlát $\sqrt{n-1}$.`,
      explain: R`$\sqrt{5-1}=2$. Ezért kis mintán a $|z|>3$ szabály sosem jelez – maga a kiugró felfújja a szórást. A $\sqrt5$ az $n=6$-hoz tartozó korlát.`
    },
    {
      type: "multi",
      q: "Mely állítások igazak a kiugró rekordok detektálására?",
      options: [
        "Alapvetően nem felügyelt feladat: nincs olyan tesztállomány, amelyen a „valódi” kiugrók ismertek.",
        "A munkahipotézis szerint jóval több a normális, mint a rendellenes megfigyelés.",
        "A dobozábrás és a statisztikai próbák többsége egy jellemzőre működik.",
        "Minden kiugró rekord hibás adat, ezért törölni kell.",
        "A klaszter alapú módszerben a nagy klaszterek elemei a kiugró-jelöltek."
      ],
      answer: [0, 1, 2],
      hint: "Két állítás a „kiugró = hibás” és a „klaszter alapú” módszer félreértése.",
      explain: "A kiugró lehet helyes adat is (nagy, de valódi utalás) – törlés helyett vizsgálni kell. A klaszter alapú módszerben a kis, a többitől távoli klaszterek elemei a jelöltek, nem a nagyoké."
    }
  ]
};
