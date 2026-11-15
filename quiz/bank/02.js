/* Vizsgagyakorló kérdésbank – 2. lecke: Kosárelemzés, Apriori, asszociációs szabályok */

BANK.push(
  {
    id: "b02-001",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes1",
    type: "single",
    q: "Sorok (transaction_id, product, quantity): (T1, tea, 2), (T1, tej, 1), (T2, tea, 1), (T3, tea, 3), (T3, tea, 1), (T3, vaj, 2). Hány kosárban van tea, és mi a T3 sora a kosár–termék mátrixban (oszlopok: tea, tej, vaj)?",
    options: [
      "4 kosár; (1, 0, 1)",
      "3 kosár; (4, 0, 2)",
      "3 kosár; (1, 0, 1)",
      "4 kosár; (2, 0, 1)"
    ],
    answer: 2,
    hint: "A kosár a transaction_id szerinti termékhalmaz. Számít-e a mennyiség, vagy hogy egy termék hány sorban szerepel?",
    explain: R`A tea T1-ben, T2-ben és T3-ban van, tehát 3 kosárban. Az, hogy T3-ban két sorban szerepel, nem számít, mert a halmazban egyszer van (ezt csinálja a <code>drop_duplicates()</code> a [transaction_id, product] oszlopokon). A mátrix cellája csak a jelenlétet mutatja: T3 = (1, 0, 1). A „4” a tea-sorokat számolja, a (4, 0, 2) a mennyiségek összegét, a (2, 0, 1) pedig a sorok számát kosaranként.`
  },
  {
    id: "b02-002",
    topic: "02",
    level: 1,
    ref: "02-kosarelemzes.html#lepes1",
    type: "multi",
    q: "Mely állítások igazak a gyakorlat kosár–termék mátrixára?",
    options: [
      "Egy sor egy vásárlás (transaction_id), egy oszlop egy termék.",
      "Egy oszlop összege megadja, hány kosárban szerepel az adott termék (abszolút támogatottság).",
      "A cellában a vásárolt mennyiség áll.",
      "Egy sor egy vásárlónak (customer_id) felel meg, így minden vásárlónak egy sora van.",
      "A mátrixot a <code>TransactionEncoder</code> készíti a kosarak listájából."
    ],
    answer: [0, 1, 4],
    hint: "Mi határozza meg a kosarat, és mit tárol a cella: jelenlétet vagy darabszámot?",
    explain: R`A mátrix 1151 × 18-as, logikai (True/False) értékekkel, ezért egy oszlop összege épp az adott terméket tartalmazó kosarak száma, pl. bread = 636. A cellában nem a mennyiség áll: 3 kenyér is csak True. A kosár nem a vásárló: a 120 vásárló 1151-szer vásárolt, és minden vásárlás külön sor.`
  },
  {
    id: "b02-003",
    topic: "02",
    level: 1,
    ref: "02-kosarelemzes.html#lepes2",
    type: "single",
    q: "A gyakorlat <code>retail_frequent_pairs.csv</code> fájljában a bread–butter sor: basket_count = 420, support = 0,365. Melyik állítás igaz?",
    options: [
      "A basket_count a relatív, a support az abszolút támogatottság.",
      "A basket_count az abszolút támogatottság (hány kosárban van együtt a kettő), a support a relatív: 420/1151.",
      "A support a két termék külön támogatottságának összege.",
      "A basket_count azt adja meg, hány darab kenyeret és vajat adtak el összesen."
    ],
    answer: 1,
    hint: R`$\sigma(X)$ darabszám, $\operatorname{support}(X) = \sigma(X)/N$.`,
    explain: R`$\sigma(\{\text{bread}, \text{butter}\}) = 420$ kosár, $\operatorname{support} = 420/1151 \approx 0{,}365$. Az első opció felcseréli a kettőt. A támogatottság az elemhalmaz együttes előfordulásának aránya, nem a termékek támogatottságának összege ($0{,}553 + 0{,}495$ több is lenne 1-nél). A mennyiségek a kosárelemzésben nem szerepelnek.`
  },
  {
    id: "b02-004",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes2",
    type: "single",
    q: R`Egy webáruház $N = 730$ kosarán $s_{\min} = 0{,}08$. Legalább hány kosárban kell szerepelnie egy elemhalmaznak, hogy gyakori legyen?`,
    options: ["58", "59", "8", "584"],
    answer: 1,
    hint: "Szorozd össze, aztán gondold meg, merre kell kerekíteni a „legalább” miatt.",
    explain: R`$0{,}08 \cdot 730 = 58{,}4$. A feltétel $\sigma(X)/N \ge 0{,}08$, ezért felfelé kerekítünk: 59. Az 58 kosár csak $58/730 \approx 7{,}95\%$, tehát ritka. A 8 a százalékérték, az 584 pedig a tizedesvessző elcsúszásából jön.`
  },
  {
    id: "b02-005",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes2",
    type: "single",
    q: "Nyolc kosár: {tej, kenyér, vaj}, {tej, kenyér}, {kenyér, vaj, sajt}, {tej, vaj}, {kenyér, vaj}, {tej, kenyér, vaj}, {sajt, tea}, {kenyér, sajt}. Mennyi support({kenyér, vaj})?",
    options: ["0,500", "0,625", "0,750", "0,667"],
    answer: 0,
    hint: "Csak azokat a kosarakat számold, amelyekben a kenyér ÉS a vaj is benne van.",
    explain: R`Kenyér és vaj együtt az 1., 3., 5. és 6. kosárban van: $4/8 = 0{,}5$. A 0,625 a {vaj} (5/8), a 0,750 a {kenyér} (6/8) támogatottsága. A 0,667 a confidence(kenyér → vaj) $= 4/6$, amely a kenyeres kosarakkal oszt, nem az összessel.`
  },
  {
    id: "b02-006",
    topic: "02",
    level: 3,
    ref: "02-kosarelemzes.html#lepes2",
    type: "multi",
    q: R`$s_{\min} = 0{,}3$. Tudjuk: support({A}) = 0,5, support({B}) = 0,2, support({A, C}) = 0,35. Mely állítások <em>biztosan</em> igazak?`,
    options: [
      "{A, B} ritka.",
      "{A, B, C} ritka.",
      "{C} gyakori.",
      "{A, C, D} gyakori.",
      "{B, C} gyakori."
    ],
    answer: [0, 1, 2],
    hint: "Bővítéskor a támogatottság nem nőhet, részhalmazra lépve nem csökkenhet. Melyik állításhoz kellene több adat?",
    explain: R`A {B} ritka (0,2 &lt; 0,3), ezért minden bővítése is az: $\operatorname{support}(\{A,B\}) \le 0{,}2$ és $\operatorname{support}(\{A,B,C\}) \le 0{,}2$. A {C} az {A, C} részhalmaza, ezért $\operatorname{support}(\{C\}) \ge 0{,}35 \ge 0{,}3$, tehát gyakori. Az {A, C, D} támogatottságáról csak annyit tudunk, hogy legfeljebb 0,35, ez lehet a küszöb alatt is: gyakori részhalmazból nem következik gyakori bővítés. A {B, C} a ritka {B} bővítése, ezért biztosan ritka.`
  },
  {
    id: "b02-007",
    topic: "02",
    level: 1,
    ref: "02-kosarelemzes.html#lepes3",
    type: "single",
    q: R`Mi az Apriori algoritmus egy szintjének ($k \ge 2$) helyes lépéssorrendje?`,
    options: [
      R`számlálás → metszés → jelöltgenerálás → $L_k$ kiválasztása`,
      R`metszés → jelöltgenerálás → számlálás → $L_k$ kiválasztása`,
      R`jelöltgenerálás $L_{k-1}$-ből → metszés → számlálás → szűrés ($\operatorname{support} \ge s_{\min}$)`,
      R`jelöltgenerálás az összes termékből → számlálás → szűrés → metszés`
    ],
    answer: 2,
    hint: "A metszés éppen azt spórolja meg, hogy bizonyos jelölteket meg kelljen számolni. Mi kell ahhoz, hogy legyen mit metszeni?",
    explain: R`A jelölteket az előző szint gyakori halmazaiból ($L_{k-1}$) képezzük. A metszés kidobja azokat, amelyeknek van ritka $(k-1)$-elemű részhalmaza, a megmaradtakat megszámoljuk, és a küszöböt elérők alkotják $L_k$-t. Számlálás után metszeni értelmetlen, hiszen a metszés célja a számolás megspórolása. Az összes termékből képzett jelöltek nem használnák ki az Apriori-elvet.`
  },
  {
    id: "b02-008",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes3",
    type: "single",
    q: R`$L_2$ = {A,B}, {A,C}, {A,D}, {B,C}, {C,D}. Mely 3-elemű jelöltek maradnak meg a metszés után?`,
    options: [
      "{A,B,C}, {A,B,D}, {A,C,D} és {B,C,D}",
      "csak {A,B,C}",
      "{A,B,C} és {A,C,D}",
      "{A,C,D} és {B,C,D}"
    ],
    answer: 2,
    hint: "Előbb képezd a 3 elemű uniókat, aztán minden jelöltnél ellenőrizd mindhárom 2-elemű részhalmazt.",
    explain: R`Összekapcsolás után a jelöltek: {A,B,C}, {A,B,D}, {A,C,D}, {B,C,D}. Az {A,B,D} és a {B,C,D} kiesik, mert a {B,D} nincs $L_2$-ben. Az {A,B,C} (AB, AC, BC) és az {A,C,D} (AC, AD, CD) minden párja gyakori, ezek maradnak, de még meg kell számolni őket. Az első opció kihagyja a metszést, a „csak {A,B,C}” nem veszi észre a CD párt.`
  },
  {
    id: "b02-009",
    topic: "02",
    level: 3,
    ref: "02-kosarelemzes.html#lepes3",
    type: "single",
    q: R`Nyolc kosár: {tej, kenyér, vaj}, {tej, kenyér}, {kenyér, vaj, sajt}, {tej, vaj}, {kenyér, vaj}, {tej, kenyér, vaj}, {sajt, tea}, {kenyér, sajt}. $s_{\min} = 0{,}25$ (legalább 2 kosár). Hány gyakori elemhalmazt talál az Apriori összesen?`,
    options: ["8", "9", "11", "10"],
    answer: 1,
    hint: "Szintenként haladj: egyelemű halmazok, párok, aztán a 3-elemű jelöltek metszéssel. A tea hány kosárban van?",
    explain: R`$L_1$: kenyér 6, vaj 5, tej 4, sajt 3; a tea (1) kiesik, ez 4 halmaz. Párok: kenyér–vaj 4, kenyér–tej 3, tej–vaj 3, kenyér–sajt 2 gyakori; tej–sajt 0, vaj–sajt 1 ritka, ez újabb 4 halmaz. 3-elemű jelöltek: a {kenyér, tej, sajt} és a {kenyér, vaj, sajt} metszéssel kiesik, a {kenyér, tej, vaj} 2 kosárban van, tehát gyakori. Összesen $4 + 4 + 1 = 9$. A 8 kihagyja a hármast, a 10 a teát is gyakorinak veszi, a 11 a metszéssel kiesett két jelöltet is beszámolja.`
  },
  {
    id: "b02-010",
    topic: "02",
    level: 1,
    ref: "02-kosarelemzes.html#lepes3",
    type: "single",
    q: "Mit spórol meg az Apriori-metszés?",
    options: [
      "A ritka részhalmazt tartalmazó jelöltek támogatottságának megszámolását (a kosarak végigolvasását rájuk).",
      "A gyakori egyelemű halmazok megszámolását.",
      "A szabályok megbízhatóságának kiszámítását.",
      "A metszésen átjutott jelöltek számlálását, mert azok biztosan gyakoriak."
    ],
    answer: 0,
    hint: "Az Apriori-elv csak kizárni tud, igazolni nem.",
    explain: R`Ha egy jelöltnek van ritka $(k-1)$-elemű részhalmaza, a jelölt biztosan ritka, ezért számolás nélkül elhagyható. Ez a megtakarítás. Az egyelemű halmazokat mindig meg kell számolni (ez az első szint). A megbízhatóság a külön szabálygeneráló lépés része. A metszésen átjutott jelölt még lehet ritka: a K1–K6 gyakorló adaton a {kávé, kenyér, tej} átjutott, mégis csak 1 kosárban volt.`
  },
  {
    id: "b02-011",
    topic: "02",
    level: 1,
    ref: "02-kosarelemzes.html#lepes4",
    type: "single",
    q: R`Mi az $A \to B$ asszociációs szabály támogatottsága?`,
    options: [
      R`$\operatorname{support}(A) + \operatorname{support}(B)$`,
      R`$\operatorname{support}(A)$`,
      R`$\min\{\operatorname{support}(A), \operatorname{support}(B)\}$`,
      R`$\operatorname{support}(A \cup B)$, vagyis az $A$-t és $B$-t együtt tartalmazó kosarak aránya`
    ],
    answer: 3,
    hint: "Melyik kosarakban „teljesül” a szabály?",
    explain: R`A szabály támogatottsága az $A \cup B$ elemhalmazé: azoknak a kosaraknak az aránya, amelyekben mindkét oldal benne van. Ez a megbízhatóság számlálója is. Az összeg nem lehet támogatottság, mert 1 fölé is mehet. Az $\operatorname{support}(A)$ a megbízhatóság nevezője. A minimum csak felső korlát: $\operatorname{support}(A\cup B) \le \min\{\dots\}$ az antimonotonitás miatt.`
  },
  {
    id: "b02-012",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes4",
    type: "single",
    q: "Nyolc kosár: {tej, kenyér, vaj}, {tej, kenyér}, {kenyér, vaj, sajt}, {tej, vaj}, {kenyér, vaj}, {tej, kenyér, vaj}, {sajt, tea}, {kenyér, sajt}. Mennyi confidence(vaj → tej)?",
    options: ["0,75", "0,375", "0,60", "1,20"],
    answer: 2,
    hint: "A vajas kosarak közül hányban van tej is?",
    explain: R`A vaj 5 kosárban van, ebből 3-ban tej is: $3/5 = 0{,}6$. A 0,75 a fordított irány (tej → vaj: $3/4$), mert a nevezőben a tej támogatottsága áll. A 0,375 a szabály támogatottsága ($3/8$), az 1,20 a lift ($0{,}375 / (0{,}625\cdot 0{,}5)$).`
  },
  {
    id: "b02-013",
    topic: "02",
    level: 3,
    ref: "02-kosarelemzes.html#lepes4",
    type: "single",
    q: R`$N = 10$ kosár. Darabszámok: $A$: 8, $B$: 5, $C$: 6, $\{A,B\}$: 5, $\{A,C\}$: 4, $\{B,C\}$: 4, $\{A,B,C\}$: 4. Az $\{A,B,C\}$ halmazból képezhető szabályok közül hány éri el a $c_{\min} = 0{,}7$-et?`,
    options: ["6", "3", "4", "5"],
    answer: 2,
    hint: R`$2^3 - 2 = 6$ szabály van; mindegyiknél a számláló $\sigma(\{A,B,C\}) = 4$, a nevező a bal oldal darabszáma.`,
    explain: R`$A \to BC$: $4/8 = 0{,}5$; $B \to AC$: $4/5 = 0{,}8$; $C \to AB$: $4/6 \approx 0{,}667$; $AB \to C$: $4/5 = 0{,}8$; $AC \to B$: $4/4 = 1$; $BC \to A$: $4/4 = 1$. A 0,7-et négy szabály éri el. A 6 az összes szabály száma szűrés nélkül. Az 5 akkor jön ki, ha a 0,667-et felkerekíted 0,7-re. A 3 csak a kételemű bal oldalú szabályokat számolja.`
  },
  {
    id: "b02-014",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes4",
    type: "single",
    q: R`A gyakorlat valódi adatán ($N = 1151$): coffee 540, butter 570, együtt 256 kosárban. Mennyi confidence(coffee → butter)?`,
    options: ["0,474", "0,449", "0,222", "0,957"],
    answer: 0,
    hint: "A bal oldal (coffee) kosarai közül hányban van butter is? Darabszámokkal is számolhatsz.",
    explain: R`$256/540 \approx 0{,}474$. A 0,449 a fordított irány (butter → coffee: $256/570$), a 0,222 a szabály támogatottsága ($256/1151$). A 0,957 a lift ($256\cdot 1151/(540\cdot 570)$): 1 alatti, vagyis a kávés kosarakban a vaj kicsit ritkább, mint általában. 60%-os küszöbnél egyik irány sem marad meg.`
  },
  {
    id: "b02-015",
    topic: "02",
    level: 1,
    ref: "02-kosarelemzes.html#lepes4",
    type: "single",
    q: "Miért elég a szabálygenerálást a gyakori halmazokból indítani, újabb kosár-végigolvasás nélkül?",
    options: [
      R`Mert ha $A \cup B$ gyakori, akkor $A$ és $B$ is gyakori (Apriori-elv), így minden szükséges támogatottság már ki van számolva.`,
      "Mert a szabályok megbízhatósága mindig legalább a minimum támogatottság.",
      "Mert a szabálygenerálás csak kételemű halmazokkal dolgozik.",
      "Mert a megbízhatóság nem függ a bal oldal támogatottságától."
    ],
    answer: 0,
    hint: "A megbízhatósághoz két támogatottság kell. Hol található meg mindkettő?",
    explain: R`$\operatorname{conf} = \operatorname{support}(I)/\operatorname{support}(A)$, és a lifthez $\operatorname{support}(B)$ is kell. Mivel $A, B \subset I$ és $I$ gyakori, $A$ és $B$ is gyakori, ezért mind szerepel az Apriori kimenetében. Ezért menti a gyakorlat kódja az egyelemű halmazokat is (18 + 82 sor). A megbízhatóság és a támogatottság között nincs ilyen alsó korlát. A szabálygenerálás tetszőleges méretű halmazra működik ($2^k - 2$ szabály). A nevező éppen a bal oldal támogatottsága.`
  },
  {
    id: "b02-016",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes5",
    type: "single",
    q: R`$N = 400$ kosár; $A$ 100-ban, $B$ 160-ban, együtt 60-ban. Mennyi a lift($A \to B$)?`,
    options: ["0,60", "0,375", "0,67", "1,50"],
    answer: 3,
    hint: R`$\operatorname{lift} = \dfrac{\sigma(A\cup B)\cdot N}{\sigma(A)\cdot\sigma(B)}$, vagy $\operatorname{conf}(A\to B)/\operatorname{support}(B)$.`,
    explain: R`$\operatorname{conf}(A \to B) = 60/100 = 0{,}6$, $\operatorname{support}(B) = 160/400 = 0{,}4$, így $\operatorname{lift} = 0{,}6/0{,}4 = 1{,}5$. Függetlenség mellett $100\cdot160/400 = 40$ közös kosár lenne, a tényleges 60. A 0,60 a megbízhatóság, a 0,375 a fordított irány megbízhatósága ($60/160$), a 0,67 a lift reciproka.`
  },
  {
    id: "b02-017",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes5",
    type: "single",
    q: R`Valódi adat ($N = 1151$): biscuits 499, coffee 540 kosárban. Hány közös kosarat várnánk, ha a két termék vásárlása független lenne? (Ténylegesen 328 van.)`,
    options: ["kb. 234", "kb. 328", "kb. 94", "kb. 1039"],
    answer: 0,
    hint: R`Függetlenség mellett $\operatorname{support}(A\cup B) = \operatorname{support}(A)\cdot\operatorname{support}(B)$. Ezt szorozd vissza $N$-nel.`,
    explain: R`Várt: $1151\cdot\frac{499}{1151}\cdot\frac{540}{1151} = \frac{499\cdot540}{1151} \approx 234$. A tényleges 328, a lift $328/234 \approx 1{,}40$. A 328 a tényleges érték, nem a várt. A 94 a tényleges és a várt különbsége (leverage × $N$). Az 1039 a két darabszám összege: összeadás szorzás helyett.`
  },
  {
    id: "b02-018",
    topic: "02",
    level: 3,
    ref: "02-kosarelemzes.html#lepes5",
    type: "multi",
    q: R`Egy szabályra confidence($A \to B$) = 1. Mely állítások igazak?`,
    options: [
      "Minden A-t tartalmazó kosárban B is benne van.",
      R`A lift ekkor $1/\operatorname{support}(B)$.`,
      "A lift ekkor biztosan nagyobb 1-nél.",
      R`lift($A\to B$) = lift($B \to A$).`,
      R`confidence($B \to A$) is biztosan 1.`
    ],
    answer: [0, 1, 3],
    hint: R`$\operatorname{lift} = \operatorname{conf}/\operatorname{support}(B)$. Mi van, ha a $B$ minden kosárban ott van?`,
    explain: R`A $\operatorname{conf} = 1$ azt jelenti, hogy $\operatorname{support}(A\cup B) = \operatorname{support}(A)$, tehát minden A-s kosárban van B, és a lift $1/\operatorname{support}(B)$. Ez csak akkor nagyobb 1-nél, ha a $B$ nincs minden kosárban: a demóban Sajt → Kenyér megbízhatósága 1, a liftje mégis 1, mert support(Kenyér) = 1. A lift mindig szimmetrikus. A fordított irány megbízhatósága más is lehet: a demóban Vaj → Tej 1, Tej → Vaj viszont csak 0,667.`
  },
  {
    id: "b02-019",
    topic: "02",
    level: 1,
    ref: "02-kosarelemzes.html#lepes5",
    type: "match",
    q: R`Párosítsd a mutatót a jelentésével ($A \to B$ szabályra)!`,
    pairs: [
      ["support", "az A-t és B-t együtt tartalmazó kosarak aránya"],
      ["confidence", "P(B | A): az A-s kosarak mekkora részében van B; irányfüggő"],
      ["lift", "a tényleges és a függetlenség mellett várt együttes gyakoriság hányadosa; szimmetrikus"],
      ["leverage", "a tényleges és a várt együttes arány különbsége; 0 = függetlenség"],
      ["conviction", "(1 − support(B)) / (1 − confidence); 1 = függetlenség, irányfüggő"]
    ],
    hint: "A lift és a leverage ugyanazt a két mennyiséget veti össze, csak másképp. Melyik hányados, melyik különbség?",
    explain: R`A lift a $\operatorname{support}(A\cup B)$ és a $\operatorname{support}(A)\operatorname{support}(B)$ hányadosa, a leverage a különbségük. A butter → bread szabályra a lift 1,33, a leverage $0{,}365 - 0{,}274 \approx 0{,}091$. A conviction a megbízhatóságra épül, ezért irányfüggő (butter → bread esetén 1,70). A leverage és a conviction kiegészítő anyag, nem szerepelt a gyakorlaton.`
  },
  {
    id: "b02-020",
    topic: "02",
    level: 3,
    ref: "02-kosarelemzes.html#lepes6",
    type: "single",
    q: R`Valódi adat, $c_{\min} = 0{,}6$, max_len=2. $s_{\min} = 0{,}10$ mellett 82 gyakori pár és 5 szabály van. Mi történik, ha $s_{\min}$-t 0,05-re csökkented?`,
    options: [
      "A gyakori párok száma 153-ra nő, a szabályok száma viszont 5 marad.",
      "A párok és a szabályok száma is nagyjából megduplázódik.",
      "A párok száma nem változik, mert a 18 termék mind gyakori volt.",
      "A szabályok száma csökken, mert a sok új pár „felhígítja” a megbízhatóságot."
    ],
    answer: 0,
    hint: "Az új párok elérik-e a 60%-os megbízhatóságot? Hány pár képezhető egyáltalán 18 termékből?",
    explain: R`0,05-nél mind a $\binom{18}{2} = 153$ pár gyakori. A 60%-ot viszont továbbra is csak a három legerősebb pár (bread–butter, biscuits–coffee, pasta–tomato sauce) 5 iránya éri el. Alacsonyabb küszöb több halmazt ad, de nem feltétlenül több érdekes szabályt. A szabályok száma nem csökkenhet, mert a korábbi szabályok megmaradnak: egy szabály megbízhatósága nem függ attól, mi más gyakori még.`
  },
  {
    id: "b02-021",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes6",
    type: "single",
    q: R`Valódi adat, $s_{\min} = 0{,}10$. $c_{\min}$-t 0,60-ról 0,55-re csökkented. Hány szabály lesz, és ebből hánynak nagyobb a liftje 1-nél?`,
    options: ["5, ebből 5", "8, ebből 8", "8, ebből 6", "21, ebből 7"],
    answer: 2,
    hint: "Az új szabályok között vannak „X → bread” alakúak. Mekkora a kenyér támogatottsága?",
    explain: R`0,55-nél három új szabály jön be: pasta → tomato sauce (0,588, lift 1,37), yoghurt → bread (0,552) és coffee → bread (0,550). Az utóbbi kettő liftje 1 alatti (0,999, ill. 0,995), mert a kenyér a kosarak 55,3%-ában amúgy is ott van. Így 8 szabályból 6 liftje nagyobb 1-nél. Az „5, ebből 5” a 0,60-as állapot, a „21, ebből 7” a 0,50-es.`
  },
  {
    id: "b02-022",
    topic: "02",
    level: 1,
    ref: "02-kosarelemzes.html#lepes6",
    type: "multi",
    q: "Mely állítások igazak a küszöbök hatására?",
    options: [
      R`$s_{\min}$ emelésekor a gyakori halmazok száma nem nő.`,
      R`$c_{\min}$ emelésekor csökken a gyakori halmazok száma.`,
      R`$c_{\min}$ emelésekor ugyanabból a gyakori halmazkészletből kevesebb vagy ugyanannyi szabály marad.`,
      R`$s_{\min}$ emelése mindig szigorúan csökkenti a szabályok számát.`,
      R`Túl alacsony $s_{\min}$ mellett sok, ritka együttes előfordulásra épülő, véletlenszerű szabály jöhet ki.`
    ],
    answer: [0, 2, 4],
    hint: "Melyik küszöb melyik algoritmushoz tartozik? És mit mutat a valódi adaton a 0,05–0,25 közötti tartomány?",
    explain: R`A magasabb támogatottsági küszöböt teljesítő halmaz az alacsonyabbat is teljesíti, ezért a gyakori halmazok száma nem nő. A $c_{\min}$ csak a szabálygenerálásban szerepel, a gyakori halmazokra nincs hatása. „Nem nő” nem ugyanaz, mint „csökken”: a valódi adaton 0,05 és 0,25 között végig 5 szabály van. Az alacsony küszöb lassú, és sok véletlen szabályt ad, ezeket a lifttel és józan ésszel kell szűrni.`
  },
  {
    id: "b02-023",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#alkalmazas",
    type: "match",
    q: "Párosítsd a gyakorlat kódrészletét azzal, amit csinál!",
    pairs: [
      ["<code>df[[\"transaction_id\", \"product\"]].drop_duplicates()</code>", "egy termék kosaranként csak egyszer szerepeljen"],
      ["<code>groupby(\"transaction_id\")[\"product\"].agg(list)</code>", "kosaranként a termékek listája"],
      ["<code>TransactionEncoder().fit(t).transform(t)</code>", "kosár–termék logikai (True/False) mátrix"],
      ["<code>apriori(..., use_colnames=True)</code>", "az eredményben terméknevek állnak, nem oszlopsorszámok"],
      ["<code>rules[rules[\"lift\"] &gt; 1]</code>", "külön lift szerinti szűrés (a kód alapból csak rendez lift szerint)"]
    ],
    hint: "Kövesd a munkafolyamatot: sorokból kosarak, kosarakból mátrix, mátrixból gyakori halmazok, végül szabályok.",
    explain: R`A <code>drop_duplicates()</code> eltünteti a mennyiség miatti többszöröződést, a <code>groupby(...).agg(list)</code> előállítja a kosarakat (T0001 → ['milk', 'tomato sauce']), a <code>TransactionEncoder</code> pedig az 1151 × 18-as logikai mátrixot. <code>use_colnames=True</code> nélkül az itemsets oszlopban 0, 1, 2… oszlopindexek állnának. A gyakorlat szabálygeneráló kódja csak megbízhatóság szerint szűr. A lift &gt; 1 feltételt külön kell alkalmazni, ha alacsonyabb $c_{\min}$ mellett gyenge szabályok is bekerülnek.`
  },
  {
    id: "b02-024",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#alkalmazas",
    type: "single",
    q: "A valódi adaton: butter → apples, support 0,102, confidence 0,205, lift 0,81. Mi a helyes értelmezés?",
    options: [
      "A vajas kosarakban az alma ritkább, mint az összes kosár átlagában: gyenge negatív kapcsolat.",
      "A vajat vevők 81%-a almát is vesz.",
      "Erős pozitív kapcsolat, mert a pár gyakori (support &gt; 0,10).",
      "A vaj vásárlása 19%-kal csökkenti az alma árát."
    ],
    answer: 0,
    hint: "Hasonlítsd a liftet 1-hez. Mit mond a confidence, és mit a support?",
    explain: R`A lift &lt; 1: a vajas kosarakban az alma kb. 20,5%-ban fordul elő, az összes kosárban viszont kb. 25,2%-ban ($0{,}205/0{,}81$). Együtt ritkábban vannak, mint függetlenség mellett várnánk. A 81% összekeveri a liftet a megbízhatósággal, amely csak 20,5%. Abból, hogy egy pár gyakori, nem következik, hogy a kapcsolat pozitív. Az árakhoz a kosárelemzésnek semmi köze.`
  },
  {
    id: "b02-025",
    topic: "02",
    level: 3,
    ref: "02-kosarelemzes.html#alkalmazas",
    type: "single",
    q: "A <code>02_apriori.py</code>-t önállóan futtatod: beolvasod a <code>retail_baskets.csv</code>-t, és a <code>product</code> oszlop értékeit (pl. <code>\"['milk', 'tomato sauce']\"</code>) közvetlenül a <code>TransactionEncoder</code>-nek adod. Mi történik?",
    options: [
      "Minden rendben: a TransactionEncoder magától listává alakítja a szöveget.",
      "Hibával leáll, mert a TransactionEncoder csak DataFrame-et fogad el.",
      "A szöveget karakterek sorozataként kezeli: az oszlopok egyes karakterek lesznek (pl. <code>'['</code>, <code>'a'</code>, <code>','</code>), nem terméknevek.",
      "Minden kosár egyetlen „termékként” kerül be, ezért 1151 oszlop lesz."
    ],
    answer: 2,
    hint: "Egy Python-szöveg is bejárható (iterálható). Mit kap a TransactionEncoder, ha egy kosár helyén szöveg áll?",
    explain: R`A TransactionEncoder minden „kosarat” bejár. Egy szöveg bejárva karaktereket ad, így a mátrix oszlopai '[', "'", ',', 'a', 'b'… lesznek, és nem jön hibaüzenet, ami még alattomosabb. A javítás: <code>df["product"].apply(ast.literal_eval).tolist()</code>, amely a szöveget valódi listává alakítja. A notebookban ez azért nem jött elő, mert ott az előző cellából megvolt a <code>product_lists</code> változó.`
  },
  {
    id: "b02-026",
    topic: "02",
    level: 1,
    ref: "02-kosarelemzes.html#lepes3",
    type: "match",
    q: "Párosítsd a gyakori halmazokat kereső eljárást a lényegével!",
    pairs: [
      ["nyers erő", "minden részhalmaz támogatottságát megszámolja"],
      ["Apriori", "a ritka halmazok bővítéseit számolás nélkül elhagyja (metszés)"],
      ["Eclat", "termékenként tid-listát tárol, a támogatottság a listák metszetének mérete"],
      ["FP-growth", "a kosarakat előtagfába tömöríti, és jelöltgenerálás nélkül olvassa ki a halmazokat"]
    ],
    hint: "Melyik számol mindent, melyik a jelöltek számát csökkenti, és melyik ügyesebb adatszerkezettel spórol?",
    explain: "A nyers erő 18 terméknél is 262 143 halmazt számolna. Az Apriori a jelöltek számát csökkenti, de szintenként újraolvassa a kosarakat. Az Eclat (függőleges formátum) és az FP-growth (FP-fa) az összehasonlítások számát csökkenti. Mindegyik ugyanazokat a gyakori halmazokat adja."
  },
  {
    id: "b02-027",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes3",
    type: "single",
    q: "A demó kosarai: T1 = {Kenyér, Tej, Vaj}, T2 = {Kenyér, Tej, Vaj}, T3 = {Kenyér, Tej}, T4 = {Kenyér, Sajt}, T5 = {Kenyér, Sajt, Tea}. Az Eclat tid-listáival mennyi a {Kenyér, Tej, Vaj} támogatottsága?",
    options: ["2/5 – a metszet {T1, T2}", "3/5 – a metszet {T1, T2, T3}", "5/5 – az unió {T1, …, T5}", "1/5 – a metszet {T1}"],
    answer: 0,
    hint: "Kenyér: {T1…T5}, Tej: {T1, T2, T3}, Vaj: {T1, T2}. Metszet vagy unió kell?",
    explain: R`Az együttes előfordulás a tid-listák <strong>metszete</strong>: $\{T1..T5\} \cap \{T1,T2,T3\} \cap \{T1,T2\} = \{T1,T2\}$, támogatottság $2/5 = 0{,}4$ – ugyanaz, amit az Apriori a 3. szinten kapott. A 3/5 a {Kenyér, Tej} értéke (a Vaj kimaradt), az 5/5 az unió, ami azt adná meg, hány kosárban van <em>legalább egy</em> a három közül.`
  },
  {
    id: "b02-028",
    topic: "02",
    level: 2,
    ref: "02-kosarelemzes.html#lepes7",
    type: "single",
    q: "A niu öt kosarán a kenyér 4, a tej 3 kosárban van, együtt 2-ben. Mennyi a tej → kenyér megbízhatósága és liftje, és mit jelent?",
    options: [
      "conf ≈ 0,667, lift ≈ 0,83: a tejet vevők többsége kenyeret is vesz, de ritkábban, mint az átlagvásárló – negatív kapcsolat.",
      "conf = 0,5, lift ≈ 0,83: negatív kapcsolat.",
      "conf ≈ 0,667, lift ≈ 1,67: erős pozitív kapcsolat.",
      "conf ≈ 0,667, lift = 1: a két termék független."
    ],
    answer: 0,
    hint: R`conf = σ(A∪B)/σ(A), ahol A a bal oldal (tej). A lifthez osztd el a megbízhatóságot support(kenyér)-rel.`,
    explain: R`conf(tej → kenyér) $= 2/3 \approx 0{,}667$; support(kenyér) $= 0{,}8$; lift $= 0{,}667/0{,}8 \approx 0{,}83 < 1$. A 0,5 a fordított irány (kenyér → tej) megbízhatósága, a nevező felcserélése a tipikus hiba. Az 1,67 akkor jön ki, ha a megbízhatóságot a szabály támogatottságával ($0{,}4$) osztod support(kenyér) helyett. A lift = 1 a függetlenséget jelentené. A 2/3 önmagában magasnak tűnik, de a kenyér a kosarak 80%-ában amúgy is ott van.`
  },
  {
    id: "b02-029",
    topic: "02",
    level: 3,
    ref: "02-kosarelemzes.html#lepes7",
    type: "single",
    q: "A gyakorlat adatán a vevő kosarában vaj és kávé van. Illő szabályok: butter → bread (conf 0,737, lift 1,33; support(bread) = 0,553) és coffee → biscuits (conf 0,607, lift 1,40; support(biscuits) = 0,434). Melyik állítás a helyes?",
    options: [
      "Megbízhatóság szerint a kenyér, lift szerint a keksz az első; a választás az üzleti céltól függ (minél többször célba érjen az ajánlat, vagy olyat ajánljunk, amit magától kevésbé venne meg).",
      "Csak a keksz ajánlható, mert a kenyér liftje 1,4 alatt van.",
      "Csak a kenyér ajánlható, mert a megbízhatóság az egyetlen releváns mutató.",
      "Egyik sem ajánlható, mert a két szabály ellentmond egymásnak."
    ],
    answer: 0,
    hint: "Mindkét szabály liftje 1 fölött van. Mit mér a megbízhatóság, és mit a lift?",
    explain: R`Mindkét szabály érdekes (lift > 1). A megbízhatóság azt mondja meg, milyen arányban veszik meg az ajánlott terméket; a lift azt, hogy a kosár mennyivel emeli ezt az alapszinthez képest. A többletvalószínűség is közel azonos: $0{,}737-0{,}553 = 0{,}184$, illetve $0{,}607-0{,}434 = 0{,}173$. Nincs egyetlen „helyes” mutató – a szabály rangsorol, a döntést a cél hozza meg. A két szabály nem mond ellent egymásnak, mert más termékről szólnak.`
  },
  {
    id: "b02-030",
    topic: "02",
    level: 1,
    ref: "02-kosarelemzes.html#lepes7",
    type: "match",
    q: "Párosítsd az alkalmazási területet azzal, mi a „tétel” és mi a „kosár”!",
    pairs: [
      ["bank", "banki termék; egy ügyfél portfóliója"],
      ["szövegbányászat", "szó, kifejezés; egy dokumentum"],
      ["biztosítás", "kárigénytípus; egy ügyfél vagy esemény kárigényei"],
      ["egészségügy", "tünet, diagnózis; egy beteg vagy vizit"]
    ],
    hint: "A módszer csak tételeket és tételek halmazait (tranzakciókat) kíván. Mi kerül együtt egy „kosárba” az egyes területeken?",
    explain: "A kosárelemzés bármilyen tétel–tranzakció adaton működik. A bankban keresztértékesítésre, a szövegbányászatban együtt előforduló szavak keresésére, a biztosításban szokatlan kárigény-kombinációk (csalásgyanú) felderítésére, az egészségügyben tünetek és betegségek együttes előfordulásának vizsgálatára használják."
  },
  {
    id: "b02-031",
    topic: "02",
    level: 3,
    ref: "02-kosarelemzes.html#lepes7",
    type: "multi",
    q: "A biscuits → coffee szabály (support 0,285, conf 0,657, lift 1,40) alapján melyik következtetés helytálló? (Több helyes válasz is lehet.)",
    options: [
      "A kekszes kosarakban a kávé 1,4-szer gyakoribb, mint az összes kosár átlagában.",
      "A szabály a kosarak 28,5%-át érinti, ezért termékelhelyezésre (egymás mellé polcozás, csomag) is alkalmas.",
      "Egy kekszakció biztosan növeli a kávé forgalmát.",
      "A vevők előbb kekszet, aztán kávét tesznek a kosárba."
    ],
    answer: [0, 1],
    hint: "Mit mond a szabály az okságról és a sorrendről?",
    explain: "A lift a kekszes kosarak kávéarányát (65,7%) veti össze az átlagos aránnyal (46,9%): 1,4-szeres. A 28,5%-os támogatottság sok kosarat jelent, így a tömeges intézkedés is indokolt. Az asszociáció viszont nem okság: egy akció hatását kísérlettel kell mérni. A kosár halmaz, a sorrendről semmit nem tudunk – ahhoz időbélyeg és szekvenciális mintakeresés kellene."
  }
);
