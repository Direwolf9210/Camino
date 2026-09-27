# Návod — Caminho Português da Costa

## Jak přidat fotky (automaticky, bez zásahu do kódu)

1. Najdi si zkratku (slug) dané etapy — je to název podsložky v `photos/`:

   | Etapa | Slug                              |
   |-------|------------------------------------|
   | 1     | `01-porto`                         |
   | 2     | `02-vila-do-conde`                 |
   | 3     | `03-esposende`                     |
   | 4     | `04-viana-do-castelo`              |
   | 5     | `05-caminha`                       |
   | 6     | `06-sao-pedro-da-torre`             |
   | 7     | `07-o-porriño`                     |
   | 8     | `08-redondela`                     |
   | 9     | `09-pontevedra`                    |
   | 10    | `10-caldas-de-reis`                |
   | 11    | `11-padrón`                        |

   (Přesný slug uvidíš i přímo v `index.html` u dané etapy — generuje se z čísla a města "from".)

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
