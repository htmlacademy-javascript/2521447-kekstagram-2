const RADIX = 10;
const NOTATION_TRANSFORM_SCALE = 0.01;


const imageZoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};


const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
const imageUpload = imgUploadOverlay.querySelector('img');
const scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');


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


scaleControlSmaller.addEventListener('click', () => changeImageZoom(-1));
scaleControlBigger.addEventListener('click', () => changeImageZoom());


const resetImageZoom = () => {
  imageUpload.style.removeProperty('transform');
  scaleControlValue.value = `${imageZoom.MAX}%`;
};


export { resetImageZoom };
