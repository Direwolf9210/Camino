# Jak přidat fotky na stránku

1. Fotky z každé etapy nahraj do odpovídající složky v `photos/`, např.:
   `photos/01-porto-vila-do-conde/1.jpg`, `2.jpg`, `3.jpg`...

2. Otevři `index.html` v textovém editoru (VS Code apod.) a najdi sekci
   `STAGE DATA` (pole `stages`). U dané etapy dopiš cesty do pole `photos`, např.:

   ```js
   {
     n: 1, from:"Porto", to:"Vila Do Conde", km:36, asc:90, desc:110,
     albergue:"Le Villageois",
     coords:[[-8.6291,41.1579],[-8.7434,41.3534]],
     photos:[
       "photos/01-porto-vila-do-conde/1.jpg",
       "photos/01-porto-vila-do-conde/2.jpg"
     ]
   },
   ```

3. Ulož a otevři `index.html` v prohlížeči (nebo nahraj celou složku na hosting
   typu Netlify / GitHub Pages) — fotky se automaticky zobrazí v mřížce dané etapy
   místo šrafovaných placeholderů.

## Poznámka k převýšení

Hodnoty stoupání/klesání u jednotlivých etap jsou orientační, dopočítané z
veřejně dostupných profilů etap Camino Portugués (Gronze a další). Pokud máš
z cesty vlastní GPX záznam (hodinky, Strava, aplikace typu Wise Pilgrim), klidně
čísla `asc` a `desc` u dané etapy v `index.html` uprav na přesná.

## Fotky na mapě

Pokud fotka obsahuje GPS souřadnice v EXIF (běžné u fotek přímo z mobilu — pokud
jsi je ale procházel přes nějaký editor nebo je stahoval z cloudu, EXIF se
občas ořízne), stránka ji automaticky přidá na mapu jako malý kulatý náhled
přesně v místě, kde byla pořízená. Stačí ji zapsat do pole `photos` u dané
etapy stejně jako v kroku 2 výše — o zbytek se postará skript sám, nic
navíc se nastavovat nemusí. Fotky bez GPS dat se prostě jen zobrazí v galerii
u etapy a na mapě se nezobrazí.

## Etapy jdou rozkliknout

Na stránce jsou etapy sbalené — vidíš jen trasu, km a převýšení. Kliknutím na
etapu (nebo na její bod na mapě) se rozbalí detail s grafem převýšení,
noclehem a fotkami.

## Poznámka k mapě

Mapa ukazuje trasu jako spojnici mezi jednotlivými zastávkami (ne přesný
zaznamenaný GPX track), protože žádný GPX soubor nebyl k dispozici. Pokud máš
vlastní GPX z cesty, dá se snadno dotáhnout jako přesná trasa místo rovných úseků
mezi body — stačí říct a doplním to.
