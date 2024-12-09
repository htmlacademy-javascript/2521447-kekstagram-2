const DEFAULT_OPTIONS_SLIDER = {
  range: {
    'min': 0,
    'max': 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
};

const uploadForm = document.querySelector('.img-upload__form');
const effectsList = uploadForm.querySelector('.effects__list');
const imgPreview = uploadForm.querySelector('.img-upload__preview');
const effectLevel = uploadForm.querySelector('.effect-level');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const image = imgPreview.querySelector('img');

const SliderEffects = {
  none: {
    options: {
      ...DEFAULT_OPTIONS_SLIDER,
    },
    effect: () => {
      effectLevel.classList.add('hidden');
      return 'none';
    },
  },
  chrome: {
    options: {
      ...DEFAULT_OPTIONS_SLIDER,
    },
    effect: (value) => {
      effectLevel.classList.remove('hidden');
      effectLevelValue.value = parseFloat(value, 10);
      return `grayscale(${value})`;
    },
  },
  sepia: {
    options: {
      ...DEFAULT_OPTIONS_SLIDER,
    },
    effect: (value) => {
      effectLevel.classList.remove('hidden');
      effectLevelValue.value = parseFloat(value, 10);
      return `sepia(${value})`;
    }
  },
  marvin: {
    options: {
      range: {
        'min': 1,
        'max': 100
      },
      start: 100,
      step: 1,
    },
    effect: (value) => {
      effectLevel.classList.remove('hidden');
      effectLevelValue.value = parseInt(value, 10);
      return `invert(${value}%)`;
    }
  },
  phobos: {
    options: {
      range: {
        'min': 0,
        'max': 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: (value) => {
      effectLevel.classList.remove('hidden');
      effectLevelValue.value = parseFloat(value, 10);
      return `blur(${value}px)`;
    }
  },
  heat: {
    options: {
      range: {
        'min': 1,
        'max': 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: (value) => {
      effectLevel.classList.remove('hidden');
      effectLevelValue.value = parseFloat(value, 10);
      return `brightness(${value})`;
    }
  },
};

SliderEffects.none.effect();

noUiSlider.create(sliderElement, DEFAULT_OPTIONS_SLIDER);

const updateOptions = (effect) => {
  sliderElement.noUiSlider.updateOptions(SliderEffects[effect].options);
};

const changeEffectLevel = (effect) => {
  sliderElement.noUiSlider.on('slide', (value) => {
    image.style.filter = SliderEffects[effect].effect(value);
  });
};

effectsList.addEventListener('click', (evt) => {
  evt.preventDefault();

  const target = evt.target.closest('.effects__item').querySelector('input');
  const effect = target.id.replace('effect-', '');

  target.checked = true;

  updateOptions(effect);
  image.style.filter = SliderEffects[effect].effect(SliderEffects[effect].options.range.max);
  changeEffectLevel(effect);
});

const resetEffect = () => {
  image.style.removeProperty('filter');
  effectLevelValue.value = '';
  sliderElement.noUiSlider.updateOptions(DEFAULT_OPTIONS_SLIDER);
  effectsList.querySelector('#effect-none').checked = true;
  SliderEffects.none.effect();
};

export { resetEffect };
