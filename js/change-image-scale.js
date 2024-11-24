const MIN_SCALE = 0.25;
const MAX_SCALE = 1;
const STEP_SCALE = 0.25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUpload = imgUploadPreview.querySelector('img');

const changeImageScale = () => {
  imgUpload.style.scale = 1;

  scaleControlSmaller.addEventListener('click', () => {
    if (Number(imgUpload.style.scale) > MIN_SCALE) {
      imgUpload.style.scale = Number(imgUpload.style.scale) - STEP_SCALE;
      scaleControlValue.value = `${imgUpload.style.scale * 100}%`;
    }
  });
  scaleControlBigger.addEventListener('click', () => {
    if (Number(imgUpload.style.scale) < MAX_SCALE) {
      imgUpload.style.scale = Number(imgUpload.style.scale) + STEP_SCALE;
      scaleControlValue.value = `${imgUpload.style.scale * 100}%`;
    }
  });
};

export { changeImageScale };
