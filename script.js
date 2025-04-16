// Variables globales
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const collisionCanvas = document.createElement("canvas");
const collisionCtx = collisionCanvas.getContext("2d");
const imageMap = new Image();
const imageCollision = new Image();
let wards = [];
let isInBush = false; // Variable pour savoir si la ward est dans un bush

// Charger les images de la carte et des collisions
imageMap.src = "img/map.png";
imageCollision.src = "img/mur.png";

// Redimensionner le canvas pour correspondre à la taille de l'image de la carte
imageMap.onload = function () {
  canvas.width = imageMap.width;
  canvas.height = imageMap.height;
  collisionCanvas.width = imageMap.width;
  collisionCanvas.height = imageMap.height;
  drawScene();
};

// Lorsque l'image de collision est chargée, dessiner la carte de collision
imageCollision.onload = function () {
  collisionCtx.drawImage(imageCollision, 0, 0);
};

// Détection du clic sur la carte
canvas.addEventListener("click", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  // Vérifier si on clique sur une ward existante et la supprimer
  for (let i = 0; i < wards.length; i++) {
    const ward = wards[i];
    if (Math.abs(ward.x - mouseX) < 5 && Math.abs(ward.y - mouseY) < 5) {
      wards.splice(i, 1); // Supprimer la ward
      drawScene(); // Re-dessiner la scène
      return;
    }
  }

  // Sinon, ajouter une nouvelle ward
  wards.push({ x: mouseX, y: mouseY });
  isInBush = isWardInBush(mouseX, mouseY); // Vérifier si la ward est dans un bush
  drawScene(); // Re-dessiner la scène
});

// Fonction pour vérifier si une position est dans un bush
function isWardInBush(x, y) {
  const imageData = collisionCtx.getImageData(x, y, 1, 1).data;
  const r = imageData[0];
  const g = imageData[1];
  const b = imageData[2];

  return r === 0 && g === 255 && b === 0; // Vérifier si la couleur est verte pour un bush
}

// Fonction pour dessiner toutes les wards et leur champ de vision
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imageMap, 0, 0); // Dessiner la carte de base

  // Dessiner les wards et leur champ de vision
  for (const ward of wards) {
    drawWard(ward.x, ward.y);
  }
}

// Fonction pour dessiner une ward et son champ de vision
function drawWard(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "green";
  ctx.fill();

  // Dessiner le champ de vision de la ward
  drawVisionCircleWithCollision(x, y, isWardInBush(x, y)); // Passer si la ward est dans un bush ou pas
}

// Fonction pour dessiner le champ de vision d'une ward
function drawVisionCircleWithCollision(x, y, isInBush) {
    const directions = 360;
    const radius = 85;
  
    const imageData = collisionCtx.getImageData(0, 0, collisionCanvas.width, collisionCanvas.height).data;
  
    for (let angle = 0; angle < directions; angle++) {
      const dx = Math.cos(angle * Math.PI / 180);
      const dy = Math.sin(angle * Math.PI / 180);
  
      let c = 0;
      let inBushRay = false;
  
      for (let i = 0; i < radius; i++) {
        const px = Math.floor(x + dx * i);
        const py = Math.floor(y + dy * i);
  
        if (px < 0 || py < 0 || px >= collisionCanvas.width || py >= collisionCanvas.height) break;
  
        const idx = (py * collisionCanvas.width + px) * 4;
        const r = imageData[idx];
        const g = imageData[idx + 1];
        const b = imageData[idx + 2];
  
        c++;
  
        // Mur
        if (r < 50 && g < 50 && b < 50) {
          break;
        }
  
        // Bush
        let pixelIsBush = (r < 50 && g > 225 && b < 50);
        if (pixelIsBush && !inBushRay && c < 5) {
          inBushRay = true;
        } else if (pixelIsBush && !inBushRay) {
          // Si la ward n'est pas dans un bush et on touche un bush => bloqué
          if (!isInBush) break;
        }
  
        // On dessine le pixel
        if (pixelIsBush) {
          ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 0, 0.25)';
        }
  
        ctx.fillRect(px, py, 1, 1);
      }
    }
  }