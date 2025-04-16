const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const mapImage = new Image();
mapImage.src = 'img/map.png';

let wards = [];

mapImage.onload = () => {
  drawScene();
};

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  wards.push({ x, y });
  drawScene();
});

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);

  for (const ward of wards) {
    drawWard(ward.x, ward.y);
  }
}

function drawWard(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'lime';
  ctx.fill();
}