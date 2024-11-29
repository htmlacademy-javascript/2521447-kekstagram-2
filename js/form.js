import '../vendor/pristine/pristine.min.js';
import { isEsc } from './utils.js';
import { changeImageZoom, resetImageZoom } from './change-img-zoom.js';

const MAX_HASHTAGS = 5;
const MAX_SIMBOLS = 20;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const effectsPreview = document.querySelectorAll('.effects__preview');
const textHashtag = imgUploadOverlay.querySelector('.text__hashtags');
const textDescription = imgUploadOverlay.querySelector('.text__description');
const scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');


let errorHashtagMessageTemplate = '';

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const openUploadForm = () => {
  document.body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

scaleControlSmaller.addEventListener('click', () => changeImageZoom(-1));
scaleControlBigger.addEventListener('click', () => changeImageZoom());

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  textHashtag.value = '';
  textDescription.value = '';
  pristine.reset();
  resetImageZoom();
  document.removeEventListener('keydown', onDocumentKeydown);
};

imgUploadForm.querySelector('.img-upload__cancel')
  .addEventListener('click', () => {
    closeUploadForm();
  });

function onDocumentKeydown(evt) {
  if (isEsc(evt.keyCode)) {
    if (document.activeElement !== textHashtag && document.activeElement !== textDescription) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
}

imgUploadInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', (e) => {
    const img = document.querySelector('.img-upload__preview');
    img.querySelector('img').src = e.target.result;
    effectsPreview.forEach((imgEffect) => {
      imgEffect.style.backgroundImage = `url(${e.target.result})`;
    });
  });

  reader.readAsDataURL(file);
  openUploadForm();
});

const validateHashtag = (value) => {
  errorHashtagMessageTemplate = '';
  const re = /^#[a-zа-яё0-9]{1,19}$/i;

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из одной # (решетки)',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хэштег разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с # (решетки)',
    },
    {
      check: inputArray.some((item, i, arr) => arr.includes(item, i + 1)),
      error: 'Хэштег не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SIMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_SIMBOLS} включая # (решктку)`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэштегов`,
    },
    {
      check: inputArray.some((item) => !re.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;

    if (isInvalid) {
      errorHashtagMessageTemplate += rule.error;
    }
    return !isInvalid;
  });
};

const validateTextDescription = (value) => value.length <= 140;

pristine.addValidator(textDescription, validateTextDescription, 'Максимум 140 символов');
pristine.addValidator(textHashtag, validateHashtag, () => errorHashtagMessageTemplate);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
