# 🗺️ VisionMapLoL – Visualisateur de Champ de Vision pour League of Legends

Ce projet est un simulateur interactif du **champ de vision** des wards dans League of Legends. Il permet de visualiser comment la vision est bloquée par les murs et modifiée par les buissons (bushes) en fonction de la position de la ward.

Le tout est entièrement en **HTML5 + JavaScript**, fonctionnel sur **GitHub Pages** ou tout autre serveur web statique.

## 🎯 Objectif

Permettre aux joueurs et aux analystes LoL de :
- Visualiser en temps réel le champ de vision d’une ward.
- Comprendre l’impact des buissons sur la propagation de la vision.
- Apprendre à mieux positionner les wards.

---

## 🧠 Fonctionnalités

- ✅ Ajout/suppression de wards par simple clic.
- ✅ Affichage du champ de vision (couleur différente dans et hors bush).
- ✅ Collision avec les murs (vision bloquée).
- ✅ Bushs identifiés par la couleur verte (dans une image de collision).
- ✅ Fonctionne sans serveur : uniquement en front-end (compatible GitHub Pages).

---

## 📦 Structure du projet

```
visionMapLoL/
│
├── img/
│   ├── map.png         # Image de la carte
│   └── mur.png         # Image de collision : murs (noir) et buissons (vert)
│
├── index.html          # Fichier HTML principal
├── script.js           # Code JavaScript (logique et dessin)
└── style.css           # Feuilles de style (optionnel)
```

---

## 🚀 Lancer le projet

### En local :

1. Clone le repo :
```bash
git clone https://github.com/votre-utilisateur/visionMapLoL.git
cd visionMapLoL
```

2. Démarre un serveur local :
```bash
# Python 3
python -m http.server
```

3. Ouvre dans ton navigateur :
```
http://localhost:8000
```

### En ligne :

Tu peux héberger le projet gratuitement via **GitHub Pages** :
1. Va dans les *Settings* du repo.
2. Active GitHub Pages dans l'onglet *Pages*.
3. Choisis la branche et le dossier (`/root`).
4. Lien accessible après quelques secondes.

---

## 🧱 Images de collision

- Les **murs** doivent être en **noir** `(0, 0, 0)`.
- Les **buissons** doivent être en **vert pur** `(0, 255, 0)`.

Tu peux éditer le fichier `mur.png` avec un éditeur d’image comme GIMP ou Photoshop.

---

## 💡 Idées futures

- Vision des balises de contrôle (control ward).
- Interaction avec la fog of war.
- Simulation multi-wards.
- Export image ou GIF du rendu.
- Ajout de map ocean et montagne

---

### ✅ Étapes à suivre

#### 1. 🧩 Ajouter un bouton HTML

Dans ton fichier `index.html`, ajoute par exemple deux boutons au-dessus du canvas :

```html
<div style="margin-bottom: 10px;">
  <button onclick="loadMap('map')">Map par défaut</button>
  <button onclick="loadMap('map2')">Map alternative</button>
</div>
<canvas id="gameCanvas"></canvas>
```

---

#### 2. 🔄 Créer la fonction `loadMap(nom)`

Dans ton `script.js`, remplace les parties de chargement des images par une fonction `loadMap(name)` qui change à la fois la **carte** et le **fichier de collision** :

```js
function loadMap(name) {
  imageMap.src = `img/${name}.png`;        // ex: img/map.png ou img/map2.png
  imageCollision.src = `img/${name}_mur.png`;  // ex: img/map_mur.png ou img/map2_mur.png

  imageMap.onload = function () {
    canvas.width = imageMap.width;
    canvas.height = imageMap.height;
    collisionCanvas.width = imageMap.width;
    collisionCanvas.height = imageMap.height;
    drawScene();
  };

  imageCollision.onload = function () {
    collisionCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);
    collisionCtx.drawImage(imageCollision, 0, 0);
  };

  wards = []; // Réinitialiser les wards si tu veux une map propre à chaque changement
}
```

---

#### 3. 🖼️ Préparer tes fichiers

Assure-toi d’avoir dans le dossier `img/` :
- `map.png` et `map_mur.png` (ta map par défaut)
- `map2.png` et `map2_mur.png` (la nouvelle map et son image de collision)

---

#### 4. 📦 Facultatif : ajouter une transition douce

Tu peux ajouter un petit effet visuel ou une confirmation si tu veux rendre ça plus propre, mais le cœur du système est déjà là.



## 🧑‍💻 Développé avec ❤️ par Moi et ChatGPT

---

## ⚖️ Licence

Ce projet est open-source sous licence MIT. Tu peux le modifier, le partager, ou le cloner librement.
