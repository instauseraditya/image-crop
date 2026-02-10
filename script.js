let cropper;
const upload = document.getElementById("upload");
const image = document.getElementById("image");
const canvas = document.getElementById("canvas");
const cropBtn = document.getElementById("cropBtn");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
    image.style.display = "block";

    if (cropper) cropper.destroy();

    cropper = new Cropper(image, {
      aspectRatio: NaN,
      viewMode: 1,
      dragMode: 'move',
      background: false,
      responsive: true,
      autoCropArea: 0.9
    });
  };
  reader.readAsDataURL(file);
});

cropBtn.addEventListener("click", () => {
  if (!cropper) return;

  const croppedCanvas = cropper.getCroppedCanvas({
    imageSmoothingQuality: "high"
  });

  canvas.width = croppedCanvas.width;
  canvas.height = croppedCanvas.height;
  canvas.getContext("2d").drawImage(croppedCanvas, 0, 0);
  canvas.style.display = "block";

  downloadBtn.href = canvas.toDataURL("image/png");
});

resetBtn.addEventListener("click", () => {
  if (cropper) cropper.reset();
});
