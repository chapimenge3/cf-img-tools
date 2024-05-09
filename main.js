
async function convert() {
  const startTime = new Date().getTime();
  const input = document.getElementById('image');
  const to_format = document.getElementById('to_format').selectedOptions[0].value

  if (input.files.length === 0 || !to_format || to_format === 'Convert to') {
    alert('Make sure to select a file and format')
    return
  }

  const img = input.files[0];
  if (img.type === `image/${to_format}`) {
    alert('The image is already in the selected format')
    return
  }
  document.getElementById("loading").style.visibility = "visible";
  const buff = await img.arrayBuffer();
  const data = new Uint8Array(buff);
  const png = convertJPEGToPNG(data, to_format)
  const endTime = new Date().getTime();
  const total = endTime - startTime;
  const blob = new Blob([png], {
    type: 'image/png'
  })
  const url = URL.createObjectURL(blob)
  document.getElementById('final-out').src = url
  document.getElementById("loading").style.visibility = "hidden";
  document.getElementById('download-img').removeAttribute('disabled')

}

function downloadCurrentImage() {
  console.log('Downoading')
  const img = document.getElementById('final-out')
  // check if the img is available or it is not starts with 'blob:'
  if (!img || !img.src || !img.src.startsWith('blob:')) {
    alert('No image available')
    return
  }
  const a = document.createElement('a')
  const url = img.src
  const filename = 'image.png'
  a.href = url
  a.download = filename
  a.click()
}


const fileInput = document.querySelector("#file-js-example input[type=file]");
fileInput.onchange = () => {
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector("#file-js-example .file-name");
    fileName.textContent = fileInput.files[0].name;
  }
};
document.getElementById("convert").addEventListener("click", convert);
document.getElementById("download-img").addEventListener("click", downloadCurrentImage)
