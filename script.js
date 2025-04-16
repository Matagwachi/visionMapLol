// Variables globales
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const collisionCanvas = document.createElement("canvas");
const collisionCtx = collisionCanvas.getContext("2d");
const imageMap = new Image();
const imageCollision = new Image();
let wards = [];

// Images
imageMap.src = "img/map.png";
imageCollision.src = "img/mur.png";

// Précharger la map et définir la taille du canvas
imageMap.onload = () => {
  canvas.width = imageMap.width;
  canvas.height = imageMap.height;
  collisionCanvas.width = imageMap.width;
  collisionCanvas.height = imageMap.height;
  drawScene();
};

// Dessiner la map de collisions dès qu'elle est prête
imageCollision.onload = () => {
  collisionCtx.drawImage(imageCollision, 0, 0);
};

// Gestion des clics sur la map
canvas.addEventListener("click", ({ offsetX, offsetY }) => {
  // Si on clique sur une ward existante, on la supprime
  const index = wards.findIndex(w => Math.abs(w.x - offsetX) < 5 && Math.abs(w.y - offsetY) < 5);
  if (index !== -1) {
    wards.splice(index, 1);
  } else {
    wards.push({ x: offsetX, y: offsetY });
  }
  drawScene();
});

// Vérifie si une coordonnée est dans un bush (vert pur)
function isBush(r, g, b) {
  return r < 50 && g > 225 && b < 50;
}

function isWall(r, g, b) {
  return r < 50 && g < 50 && b < 50;
}

function isWardInBush(x, y) {
  const { data } = collisionCtx.getImageData(x, y, 1, 1);
  return isBush(data[0], data[1], data[2]);
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imageMap, 0, 0);
  wards.forEach(ward => drawWard(ward.x, ward.y));
}

function drawWard(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "green";
  ctx.fill();
  drawVisionCircleWithCollision(x, y, isWardInBush(x, y));
}

function drawVisionCircleWithCollision(x, y, isInBush) {
  const radius = 85;
  const directions = 360;
  const { width, height } = collisionCanvas;
  const imageData = collisionCtx.getImageData(0, 0, width, height).data;

  for (let angle = 0; angle < directions; angle++) {
    const dx = Math.cos(angle * Math.PI / 180);
    const dy = Math.sin(angle * Math.PI / 180);

    let rayLength = 0;
    let inBushRay = false;

    for (let i = 0; i < radius; i++) {
      const px = Math.floor(x + dx * i);
      const py = Math.floor(y + dy * i);
      if (px < 0 || py < 0 || px >= width || py >= height) break;

      const idx = (py * width + px) * 4;
      const r = imageData[idx], g = imageData[idx + 1], b = imageData[idx + 2];

      rayLength++;

      if (isWall(r, g, b)) break;

      const pixelIsBush = isBush(r, g, b);

      if (pixelIsBush && !inBushRay && rayLength < 5) {
        inBushRay = true;
      } else if (pixelIsBush && !inBushRay && !isInBush) {
        break;
      }

      ctx.fillStyle = pixelIsBush ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 255, 0, 0.25)';
      ctx.fillRect(px, py, 1, 1);
    }
  }
}