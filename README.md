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

## 🧑‍💻 Développé avec ❤️ par Moi et ChatGPT

---

## ⚖️ Licence

Ce projet est open-source sous licence MIT. Tu peux le modifier, le partager, ou le cloner librement.
