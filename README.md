# Maths Malin — CM2 & 6ème (PWA)

Application de révision pour le CM2 et la 6ème : **maths** (méthode de Singapour incluse), **histoire**, **géographie**, **sciences et technologie**, **éducation civique** et **dictée**. Fonctionne hors-ligne une fois installée.

### Correction et explication de chaque erreur

Une réponse fausse — ou un chrono écoulé — **arrête le quiz** sur une carte de correction : la réponse donnée barrée, la bonne réponse, et un « Pourquoi ? » qui explique. C'est l'enfant qui appuie sur « J'ai compris, continuer » : il lit à son rythme, sans que le quiz défile. Une bonne réponse, elle, enchaîne toute seule comme avant.

À la fin du quiz, une section **À revoir** reprend chaque erreur : l'énoncé, la réponse donnée, la bonne réponse et l'explication. C'est là que se fait le vrai travail, une fois la pression du chrono retombée.

Les explications viennent de trois sources, de la plus précise à la plus générale :

1. Une explication **écrite pour cette question** — les 262 questions d'histoire, de géographie, de sciences et d'éducation civique en ont une, et les problèmes de la méthode de Singapour affichent le calcul détaillé avec leurs propres nombres.
2. La **décomposition de l'astuce** pour le calcul mental (« On ajoute un zéro : 36 → 360 »).
3. Sinon, la **règle de la compétence**, qui est la méthode à appliquer.

### La séance du jour

En haut de l'accueil, une **séance du jour** de trois étapes, à faire en une dizaine de minutes :

1. **Maths** — un quiz, en privilégiant une notion de la méthode de Singapour une fois sur deux.
2. **La leçon du jour** — un chapitre d'histoire, de géographie, de sciences ou d'éducation civique, à relire.
3. **Le quiz de cette leçon.**

Les deux niveaux sont mêlés dans la même séance : si les maths tombent en CM2, la leçon tombe en 6ème, et inversement.

La séance est **tirée au sort à partir de la date**, donc identique toute la journée même si l'on ferme l'application, et différente le lendemain. Une fois les trois étapes faites, le compteur de **jours consécutifs** 🔥 augmente. Il repart à 1 si un jour est sauté, et ne compte jamais deux fois le même jour.

> Il n'y a pas de notification qui sonne toute seule : une application web sans serveur ne peut pas le faire de façon fiable, et pas du tout sur iPhone. La séance et la série jouent le rôle du rappel quand l'enfant ouvre l'application. Pour un rappel qui sonne vraiment, le plus sûr reste une alarme quotidienne dans l'horloge du téléphone.

### Fonctionnement sans connexion

L'application ne dépend d'**aucune ressource extérieure** : pas de bibliothèque distante, pas de police en ligne, pas d'image téléchargée. Tout tient dans `index.html`, et le service worker met en cache les cinq fichiers du site.

Vérifié réseau coupé : chargement de l'app, séance du jour, quiz de maths, sciences, EMC et histoire, dictée et sa correction, jetons et série, changement de niveau — tout fonctionne, sans une seule requête en échec.

Seule réserve : la **lecture à voix haute** des dictées passe par la synthèse vocale du téléphone. Sur certains appareils Android, la voix par défaut est téléchargée à la demande. Si la dictée doit fonctionner sans réseau, il faut installer une voix française hors-ligne dans les réglages du téléphone (Paramètres, Synthèse vocale). Le reste de l'application n'est pas concerné.

### Téléphone, tablette et rotation

L'affichage s'adapte à trois formats :

- **Téléphone en portrait** : une colonne, comme avant.
- **Tablette** (à partir de 700 px de large) : les rubriques passent en deux colonnes, les textes et les figures grossissent, les deux exemples d'une leçon se mettent côte à côte.
- **Tablette en paysage** (à partir de 900 px) : trois colonnes de rubriques, et surtout deux colonnes utiles — la question à gauche et les réponses à droite pour un quiz, l'écoute à gauche et la saisie à droite pour une dictée. Tout tient à l'écran sans défiler.

Un téléphone tenu à l'horizontale bénéficie d'un réglage à part : les marges verticales se resserrent pour que la question et ses réponses restent visibles ensemble malgré le peu de hauteur.

Le manifeste déclare `"orientation": "any"`. C'est indispensable : avec `portrait`, l'application installée ignore purement et simplement la rotation de la tablette. L'adaptation se fait entièrement en CSS, donc tourner l'appareil en plein quiz ne perd ni la question en cours, ni le chrono, ni le texte déjà saisi dans une dictée.

### Histoire et géographie

Chaque chapitre commence par une leçon à lire, avec ses repères à retenir, puis un quiz de 8 questions tirées d'une banque écrite à la main (10 à 12 questions par chapitre). Quatre chapitres d'histoire et quatre de géographie en CM2, trois et quatre en 6ème.

### Dictée

Une rubrique à part, en CM2 et en 6ème. Le texte est lu à voix haute par l'appareil, phrase par phrase ou en entier, à vitesse lente ou normale. L'enfant écrit, puis l'application corrige mot à mot et affiche la copie annotée : mots justes, mots mal écrits avec la bonne orthographe, oublis et mots en trop.

La correction compte les **accents et les majuscules**, mais tolère la **ponctuation**. Le seuil des jetons s'applique aussi : une dictée réussie à 80 % rapporte un jeton chaton.

**Dicter soi-même.** Un bouton « Afficher le texte (parent) » dévoile le texte sur l'écran, découpé en phrases numérotées, avec la phrase en cours mise en avant. Le parent peut ainsi faire la dictée de sa propre voix, dans le même découpage que les boutons d'écoute. Le texte se remasque d'un bouton, et repart toujours caché quand on ouvre une dictée.

⚠️ La lecture à voix haute utilise la synthèse vocale du navigateur. Elle demande qu'une **voix française soit installée sur l'appareil** — c'est le cas de la plupart des téléphones Android et des iPhone. Si aucune voix française n'est trouvée, l'application le signale clairement et le texte reste caché : un adulte peut alors faire la dictée à la place.

### Chrono et récompenses

Le chrono de chaque quiz se met en pause d'un bouton. Pendant la pause la question est masquée et les réponses désactivées, pour que la pause reste une vraie pause et pas un temps de réflexion illimité.

Un quiz réussi à 80 % ou plus rapporte un **jeton chaton**. Au bout de 10 jetons, ils sont échangés contre un **hamster** et le compteur repart à zéro. Jetons et hamsters sont communs aux trois niveaux et conservés sur l'appareil. Les seuils se règlent en haut du `<script>` d'`index.html`, avec `SEUIL_JETON` et `JETONS_PAR_HAMSTER`.

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
Les leçons et exercices sont définis dans les données en haut du `<script>` d'`index.html` : `TRICKS` pour les astuces, `DOMAINS` pour les matières, `DICTEES` pour les textes de dictée. Tu peux en ajouter d'autres en suivant le même format.

Après chaque modification des fichiers, pense à incrémenter `CACHE_NAME` dans `sw.js` (`calcul-cm2-v8` → `v9`, etc.) pour que les appareils déjà installés récupèrent bien la nouvelle version.
