const effectItems = document.querySelectorAll('[name=effect]');
const sliderElement = document.querySelector('.effect-level__slider');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const imgUploadPreview = document.querySelector('.img-upload__preview')
  .querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');

const effectOptions = {
  chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  marvin: { range: { min: 0, max: 100 }, start: 100, step: 1 },
  phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
  heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1 },
};

const filtersValueList = {
  chrome: ['grayscale', ''],
  sepia: ['sepia', ''],
  marvin: ['invert', '%'],
  phobos: ['blur', 'px'],
  heat: ['brightness', ''],
};

const createFilters = () => {
  imgUploadEffectLevel.style.display = 'none';
  effectLevelValue.value = '';

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  effectItems.forEach((effect) => {
    effect.addEventListener('change', (e) => {

      if (e.target.value === 'none') {
        imgUploadEffectLevel.style.display = 'none';
      } else {
        imgUploadEffectLevel.style.display = '';
        sliderElement.noUiSlider.updateOptions({ ...effectOptions[e.target.value] });
      }

      sliderElement.noUiSlider.on('update', (sliderValue) => {
        if (e.target.value === 'none') {
          imgUploadEffectLevel.style.display = 'none';
          imgUploadPreview.style.filter = '';
        } else {
          imgUploadEffectLevel.style.display = '';
          imgUploadPreview.style.filter = `${filtersValueList[e.target.value][0]}(${sliderValue}${filtersValueList[e.target.value][1]})`;
          effectLevelValue.value = sliderValue;
        }
      });
    });
  });
};

export { createFilters };
