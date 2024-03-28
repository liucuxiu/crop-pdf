const fs = require('fs');
const sharp = require('sharp');

// Function to check if a number is even
const isEven = num => num % 2 === 0;

// Function to crop an image by 50%
const cropImage = async (inputPath, outputPath, isEvenFile) => {
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();
  const newWidth = Math.floor(width / 2);

  console.log('Image width:', width);
  console.log('Image height:', height);

  if (isEvenFile) {
    await image.extract({ left: 0, width: newWidth, top: 0, height: height }).toFile(outputPath);
  } else {
    await image.extract({ left: newWidth, width: newWidth, top: 0, height: height}).toFile(outputPath);
  }
};

// Function to crop images in a directory
const cropImages = async (inputDirectory, outputDirectory) => {
  const files = fs.readdirSync(inputDirectory);

  for (const file of files) {
    if (!file.endsWith('.jpg')) {
      continue;
    }
    const inputPath = `${inputDirectory}/${file}`;

    const outputPath = `${outputDirectory}/${file}`;
    const isEvenFile = isEven(parseInt(file.split('.')[1])); // Extracting number from filename

    await cropImage(inputPath, outputPath, isEvenFile);
    console.log(`Image cropped: ${file}`);
  }
};

// Usage example
const inputDirectory = './images';
const outputDirectory = './images_output';

cropImages(inputDirectory, outputDirectory)
  .then(() => console.log('All images cropped successfully!'))
  .catch(err => console.error('Error cropping images:', err));
