const loadImage = () => {
  return new Promise((resolve, reject) => {
    try {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = 'https://webglfundamentals.org/webgl/resources/leaves.jpg'; // MUST BE SAME DOMAIN!!!
      image.onload = function () {
        resolve(image);
      };
    } catch (e) {
      reject(e);
    }
  });
};
export default loadImage;
