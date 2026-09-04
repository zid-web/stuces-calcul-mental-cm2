# Astuces Calcul Mental CM2 — PWA

## Pourquoi une PWA a besoin d'être hébergée
Android installe une PWA depuis une adresse web en HTTPS (le service worker qui permet le mode hors-ligne l'exige). Ouvrir `index.html` directement depuis le stockage du téléphone ne déclenche pas l'installation. La bonne nouvelle : héberger ces fichiers est gratuit et prend 2 minutes.

## Déploiement gratuit (Netlify Drop) — le plus simple
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose le dossier `pwa` (ou son contenu : index.html, manifest.json, sw.js, icons/) directement sur la page
3. Netlify te donne une URL en `https://....netlify.app`
4. Ouvre cette URL sur le téléphone Android avec Chrome
5. Un bandeau "Installer" apparaît en bas — appuie dessus, ou utilise le menu ⋮ > "Installer l'application"

## Alternative : GitHub Pages
1. Crée un dépôt GitHub et mets-y le contenu du dossier `pwa`
2. Dans Settings > Pages, active GitHub Pages sur la branche main
3. Ton URL sera `https://tonpseudo.github.io/tondepot/`

## Fichiers inclus
- `index.html` — l'application (interface, logique, toutes les astuces)
- `manifest.json` — nom, icônes et couleurs de l'app installée
- `sw.js` — service worker pour le fonctionnement hors-ligne
- `icons/icon-192.png`, `icons/icon-512.png` — icônes de l'application

## Personnalisation
Toutes les astuces et exercices sont dans le tableau `TRICKS` en haut du `<script>` d'`index.html`. Tu peux facilement en ajouter d'autres en suivant le même format.
