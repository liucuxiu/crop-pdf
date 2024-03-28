const { fromPath } = require("pdf2pic");

const options = {
  density: 100,
  savePath: "./images",
  format: "jpg",
  saveFilename: "file",
  width: 11692,
  height: 8267,

};
const convert = fromPath("./inputPdf/1.pdf", options);
const pageToConvertAsImage = 3;

for (let i = 3; i <= pageToConvertAsImage; i++) {
  convert(i, { responseType: "image" })
    .then((resolve) => {
      console.log(`Page ${i} is now converted as image`);

      return resolve;
    });
}
