const
  DEFAULT_EFFECT_LEVEL = 100,
  RADIX = 10,
  EFFECTS_STEP = 0.01,
  MAX_BLUR_VALUE = 3,
  MAX_BRIGHTNESS = 3;

const Slider = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
};

const uploadForm = document.querySelector('.img-upload__form');
const effectsList = uploadForm.querySelector('.effects__list');
const imgPreview = uploadForm.querySelector('.img-upload__preview');
const sliderUpload = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const image = imgPreview.querySelector('img');

effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
let currentEffect = '';

const effects = {
  none: () => {
    sliderUpload.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `grayscale(${parseInt(effectLevelValue.value, RADIX) * EFFECTS_STEP})`;
  },
  sepia: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `sepia(${parseInt(effectLevelValue.value, RADIX) * EFFECTS_STEP})`;
  },
  marvin: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `invert(${Math.floor(effectLevelValue.value, RADIX)}%)`;
  },
  phobos: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `blur(${(parseInt(effectLevelValue.value, RADIX) * MAX_BLUR_VALUE) * EFFECTS_STEP}px)`;
  },
  heat: () => {
    sliderUpload.classList.remove('visually-hidden');
    return `brightness(${(parseInt(effectLevelValue.value, RADIX) * MAX_BRIGHTNESS) * EFFECTS_STEP})`;
  },
};

effects.none();

const onEffectsListClick = (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    sliderElement.noUiSlider.set(Slider.MAX);
    effectLevelValue.value = Slider.MAX;

    currentEffect = target.classList[1].replace('effects__preview--', '');
    image.style.filter = effects[currentEffect]();
  }
};

effectsList.addEventListener('click', onEffectsListClick);

noUiSlider.create(sliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower',
});

sliderElement.noUiSlider.on('slide', (value) => {
  effectLevelValue.value = [...value];
  image.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
});

const resetEffect = () => {
  image.style.removeProperty('filter');
  effectLevelValue.value = '';
  sliderElement.noUiSlider.updateOptions({
    start: Slider.MAX,
  });
  effectsList.querySelector('#effect-none').checked = true;
  effects.none();
};

export { resetEffect };
