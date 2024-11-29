const imgZoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const scaleControlValue = document.querySelector('.scale__control--value');
const imgUpload = document.querySelector('.img-upload__preview')
  .querySelector('img');

const changeImageZoom = (factor = 1) => {
  let size = parseInt(scaleControlValue.value, 10) + (imgZoom.STEP * factor);

  if (size < imgZoom.MIN) {
    size = imgZoom.MIN;
  }

  if (size > imgZoom.MAX) {
    size = imgZoom.MAX;
  }

  scaleControlValue.value = `${size}%`;
  imgUpload.style.transform = `scale(${size / 100})`;
};

const resetImageZoom = () => {
  imgUpload.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
};

export { changeImageZoom, resetImageZoom };
