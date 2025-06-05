const memeTemplates = [
  "https://i.imgflip.com/1bij.jpg",
  "https://i.imgflip.com/26am.jpg",
  "https://i.imgflip.com/2fm6x.jpg",
  "https://i.imgflip.com/30b1gx.jpg"
];

const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const topInput = document.getElementById("topText");
const bottomInput = document.getElementById("bottomText");

let currentImage = new Image();

function drawMeme(imageSrc) {
  currentImage.crossOrigin = "anonymous";
  currentImage.src = imageSrc;

  currentImage.onload = () => {
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;

    ctx.drawImage(currentImage, 0, 0);

    ctx.font = "bold 40px Impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";

    ctx.fillText(topInput.value, canvas.width / 2, 50);
    ctx.strokeText(topInput.value, canvas.width / 2, 50);
    ctx.fillText(bottomInput.value, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomInput.value, canvas.width / 2, canvas.height - 20);
  };
}

document.getElementById("upload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const imgURL = URL.createObjectURL(file);
    drawMeme(imgURL);
  }
});

document.getElementById("randomMeme").addEventListener("click", () => {
  const randomURL = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
  drawMeme(randomURL);
});

topInput.addEventListener("input", () => drawMeme(currentImage.src));
bottomInput.addEventListener("input", () => drawMeme(currentImage.src));

document.getElementById("downloadBtn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
