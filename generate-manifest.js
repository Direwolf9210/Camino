// Projde slozku photos/<slug>/ pro kazdou etapu a vygeneruje photos-manifest.json
// se seznamem cest ke vsem fotkam. Spousti se automaticky pri kazdem Vercel buildu
// (viz "build" skript v package.json) - staci nahrat fotky do spravne slozky a pushnout.
const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'photos');
const manifest = {};
const IMG_EXT = /\.(jpe?g|png|webp)$/i;

if (fs.existsSync(photosDir)) {
  for (const slug of fs.readdirSync(photosDir)) {
    const stageDir = path.join(photosDir, slug);
    if (!fs.statSync(stageDir).isDirectory()) continue;

    const files = fs.readdirSync(stageDir)
      .filter((f) => IMG_EXT.test(f))
      // razeni podle jmena souboru (numericky, takze 2.jpg pred 10.jpg) -
      // pojmenuj fotky napr. 01.jpg, 02.jpg podle poradi na trase
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    manifest[slug] = files.map((f) => `photos/${slug}/${f}`);
  }
}

fs.writeFileSync(path.join(__dirname, 'photos-manifest.json'), JSON.stringify(manifest));
console.log('photos-manifest.json vygenerovan:', JSON.stringify(manifest, null, 2));
