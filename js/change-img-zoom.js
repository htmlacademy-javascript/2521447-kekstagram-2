const RADIX = 10;
const NOTATION_TRANSFORM_SCALE = 0.01;


const imageZoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};


const scaleControlValue = document.querySelector('.scale__control--value');
const imageUpload = document.querySelector('.img-upload__preview')
  .querySelector('img');


const changeImageZoom = (factor = 1) => {
  let size = parseInt(scaleControlValue.value, RADIX) + (imageZoom.STEP * factor);

  if (size < imageZoom.MIN) {
    size = imageZoom.MIN;
  }

  if (size > imageZoom.MAX) {
    size = imageZoom.MAX;
  }

  scaleControlValue.value = `${size}%`;
  imageUpload.style.transform = `scale(${size * NOTATION_TRANSFORM_SCALE})`;
};


const resetImageZoom = () => {
  imageUpload.style.removeProperty('transform');
  scaleControlValue.value = `${imageZoom.MAX}%`;
};


export { changeImageZoom, resetImageZoom };
