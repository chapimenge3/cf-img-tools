
const fileInput = document.querySelector("#file-js-example input[type=file]");
fileInput.onchange = () => {
  if (fileInput.files.length > 0) {
    const fileName = document.querySelector("#file-js-example .file-name");
    fileName.textContent = fileInput.files[0].name;
  }
};


async function convert() {
  const input = document.getElementById('img');
  console.log("file change", input.files[0])
  const img = input.files[0];
  const buff = await img.arrayBuffer();
  const data = new Uint8Array(buff);
  console.log("data", data)
  console.log("Before calling wasm function")
  const png = convertJPEGToPNG(data)
  console.log("After calling wasm function", png)
  const blog = new Blob([png], {
    type: 'image/png'
  })
  const url = URL.createObjectURL(blog)
  const imgEl = document.createElement('img')
  imgEl.src = url
  document.body.appendChild(imgEl)
}