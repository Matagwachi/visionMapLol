Super projet ! Tu veux créer un simulateur de vision façon *League of Legends*, avec des **bush**, **murs**, **wards** et une image de la carte comme base. Ce projet est faisable en Python avec quelques outils :

---

### 🧰 **Technos conseillées :**
- `pygame` : pour l'affichage interactif de la map, clics de souris, etc.
- `Pillow` ou `OpenCV` : pour manipuler l’image.
- Fichiers `.json` ou `.yaml` pour sauvegarder la position des murs, bushs et wards.

---

### 🔧 **Fonctionnalités que tu veux :**
1. Charger une image de la map.
2. Pouvoir définir :
   - les zones **bush**
   - les **murs**
3. Ajouter / retirer des **wards** (green ou pink par exemple).
4. Simuler la **vision dans un rayon donné**, qui est stoppée par les murs sauf s’il y a une ward.
5. Tenir compte des bushs : s’il y a un ennemi dans un bush non révélé par une ward, on ne le voit pas.

---

### 💡 Approche (étapes de base)

1. **Charger la map** (fichier `.jpg` ou `.png`)
2. **Créer des "layers"** :
   - Zone de **murs** (tu les définis à la main ou via clic souris)
   - Zone de **bush** (pareil)
3. Quand tu places une ward :
   - Elle éclaire dans un rayon (ex. 900 unités)
   - La vision est bloquée par les murs (raycasting)
   - Si un bush est dans le rayon et qu’il y a une ward dedans → on peut voir dedans

---

### 🧪 Exemple de prototype basique (vision circulaire)

```python
import pygame
import math

WIDTH, HEIGHT = 1280, 720
VISION_RADIUS = 900

pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Simulateur de vision - LoL")

# Charger la map
map_image = pygame.image.load("map_image.jpg")
map_rect = map_image.get_rect()

# Exemple de bushs/murs
bushes = []
walls = []
wards = []

def draw_vision(surface, pos):
    vision_mask = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
    pygame.draw.circle(vision_mask, (255, 255, 0, 80), pos, VISION_RADIUS)
    surface.blit(vision_mask, (0, 0))

def main():
    running = True
    clock = pygame.time.Clock()

    while running:
        screen.blit(map_image, (0, 0))

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

            # Clic gauche pour ajouter une ward
            if event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:
                    wards.append(pygame.mouse.get_pos())

        # Affiche wards + vision
        for ward_pos in wards:
            pygame.draw.circle(screen, (0, 255, 0), ward_pos, 5)
            draw_vision(screen, ward_pos)

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

if __name__ == "__main__":
    main()
```

---

### 🔜 À rajouter ensuite :
- Zone de **murs** : avec du **raycasting** pour bloquer la vision
- Zone de **bush** : zones spéciales visibles uniquement si une ward est proche
- Interface pour **dessiner les murs / bush** à la main (clics souris)
- Système de **sauvegarde** de la map modifiée

---

### Tu veux que je t’aide à :
- Créer l’interface pour ajouter des murs/bush ?
- Gérer la logique de vision bloquée par les murs ?
- Ajouter une "vision réelle" à travers le bush selon qu’il y a une ward ou non ?

Dis-moi par quoi tu veux commencer et je te code ça étape par étape 🔧🔥
