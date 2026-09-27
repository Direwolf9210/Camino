# Návod — Caminho Português da Costa

## Jak přidat fotky (automaticky, bez zásahu do kódu)

1. Najdi si zkratku (slug) dané etapy — je to název podsložky v `photos/`:

   | Etapa / cesta | Slug                              |
   |----------------|------------------------------------|
   | Cesta Brno → Porto | `00-brno-porto`                |
   | Den 00 — Porto | `00-porto`                        |
   | 1     | `01-porto-vila-do-conde`           |
   | 2     | `02-vila-do-conde-esposende`       |
   | 3     | `03-esposende-viana-do-castelo`    |
   | 4     | `04-viana-do-castelo-caminha`      |
   | 5     | `05-caminha-sao-pedro-da-torre`    |
   | 6     | `06-sao-pedro-da-torre-o-porrino`  |
   | 7     | `07-o-porrino-redondela`           |
   | 8     | `08-redondela-pontevedra`          |
   | 9     | `09-pontevedra-caldas-de-reis`     |
   | 10    | `10-caldas-de-reis-padron`         |
   | 11    | `11-padron-santiago`               |
   | Santiago → Madrid | `12-santiago-madrid`         |
   | Madrid → Brno | `13-madrid-brno`                  |

   (Přesný slug má teď každá etapa/cesta napsaný natvrdo v `index.html` v poli `slug:` —
   nekóduje se z ničeho automaticky, takže se musí přesně shodovat s názvem složky v `photos/`.
   Cesty Brno↔Porto a Santiago↔Madrid↔Brno nemají km/převýšení/nocleh, jen fotky.)

2. Nahraj fotky do `photos/<slug>/`, např. `photos/03-esposende/1.jpg`, `2.jpg`, `3.jpg`...
   — pojmenuj je čísly podle pořadí na trase (`01.jpg`, `02.jpg`...), ať jdou na stránce ve správném pořadí.

3. Pushni (nebo nahraj přes GitHub web rozhraní — "Add file → Upload files").

4. Hotovo. Vercel při každém pushi automaticky spustí `generate-manifest.js`, ten projde všechny
   složky v `photos/` a vygeneruje `photos-manifest.json` se seznamem fotek pro každou etapu.
   Stránka si tenhle soubor při načtení stáhne a fotky sama zobrazí — do `index.html` se
   **už nikdy nesahá**.

5. Mají-li fotky GPS údaje v EXIF (typicky mobil s povolenou polohou), objeví se navíc jako
   zlaté kolečko přímo na mapě u dané etapy.

## Jak to technicky funguje

- `generate-manifest.js` — Node skript, běží automaticky při každém nasazení na Vercelu
  (nastaveno jako "Build Command" v nastavení projektu). Projde `photos/<slug>/`, seřadí
  soubory podle jména a zapíše `photos-manifest.json`.
- `index.html` — při načtení stránky si tenhle JSON stáhne (`fetch('photos-manifest.json')`)
  a teprve pak vykreslí etapy, mapu i fotky. Pokud manifest ještě neexistuje (první deploy
  bez fotek), stránka funguje normálně, jen bez fotek.
- Formáty fotek, které skript bere v potaz: `.jpg`, `.jpeg`, `.png`, `.webp`.

## Nastavení na Vercelu (jednorázové)

V projektu **camino** → Settings → Build & Development Settings:
- Build Command: `node generate-manifest.js`
- Output Directory: `.` (kořen repozitáře)

(Toto jsem nastavil already přes API — pokud by build při prvním pushi selhal, zkontroluj
tahle dvě pole ručně.)

## Elevation data

Stoupání/klesání všech etap pochází z GPS záznamu trasy v aplikaci Camino Ninja. Tvar
mini-grafu u každé etapy je stylizovaný podle reálného profilu, ne bod po bodu z GPX.
