# Maths Malin — CM2, 6ème & Singapour (PWA)

Application de révision de maths pour le CM2 et la 6ème : calcul mental, nombres, fractions, décimaux, mesures et géométrie. Fonctionne hors-ligne une fois installée.

Trois niveaux au choix : **CM2**, **6ème** et **Singapour**. Ce dernier suit le programme de Primary 6 (11-12 ans) et ajoute les notions propres à la méthode : modèles en barres, rapports, vitesse, cercle, algèbre, volume et diagrammes circulaires. Les niveaux CM2 et 6ème ne sont pas modifiés par cet ajout.

Les fichiers de l'app sont à la racine du dépôt. C'est ce que tous les hébergeurs attendent par défaut : aucun réglage de « dossier source » n'est nécessaire.

## Pourquoi une PWA a besoin d'être hébergée
Android installe une PWA depuis une adresse web en HTTPS (le service worker qui permet le mode hors-ligne l'exige). Ouvrir `index.html` directement depuis le stockage du téléphone ne déclenche pas l'installation. La bonne nouvelle : héberger ces fichiers est gratuit et prend 2 minutes.

## Déploiement sur Vercel
1. Sur https://vercel.com, choisis « Add New » > « Project » et importe ce dépôt
2. Laisse tous les réglages par défaut : aucune commande de build, aucun framework à choisir
3. Clique sur « Deploy ». Ton URL sera en `https://....vercel.app`

Chaque envoi sur la branche `main` redéploie automatiquement le site.

> Si tu obtiens une erreur `404: NOT_FOUND`, c'est que Vercel ne trouve pas d'`index.html` là où il regarde. Vérifie dans Settings > Build and Deployment que le champ « Root Directory » est vide : les fichiers étant à la racine du dépôt, il ne doit pointer vers aucun sous-dossier.

## Déploiement sur Netlify Drop — sans compte
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose les fichiers du dépôt (`index.html`, `manifest.json`, `sw.js` et le dossier `icons/`) directement sur la page
3. Netlify te donne une URL en `https://....netlify.app`

## Déploiement sur GitHub Pages
1. Dans Settings > Pages, active GitHub Pages sur la branche `main`, dossier `/ (root)`
2. Ton URL sera `https://tonpseudo.github.io/tondepot/`

## Installer l'app sur le téléphone
1. Ouvre l'URL du site sur le téléphone Android avec Chrome
2. Un bandeau « Installer » apparaît en bas — appuie dessus, ou utilise le menu ⋮ > « Installer l'application »

## Fichiers inclus
- `index.html` — l'application (interface, logique, toutes les leçons et exercices)
- `manifest.json` — nom, icônes et couleurs de l'app installée
- `sw.js` — service worker pour le fonctionnement hors-ligne
- `icons/icon-192.png`, `icons/icon-512.png` — icônes de l'application (hamster)

## Personnalisation
Les leçons et exercices sont définis dans les données en haut du `<script>` d'`index.html`. Tu peux en ajouter d'autres en suivant le même format.

Après chaque modification des fichiers, pense à incrémenter `CACHE_NAME` dans `sw.js` (`calcul-cm2-v4` → `v5`, etc.) pour que les appareils déjà installés récupèrent bien la nouvelle version.
