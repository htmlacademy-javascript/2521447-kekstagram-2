import { isEsc } from './utils.js';
import '../vendor/pristine/pristine.min.js';

// temporarily
import { getRandomNumber } from './utils.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const effectsPreview = document.querySelectorAll('.effects__preview');
const textHashtag = imgUploadOverlay.querySelector('.text__hashtags');
const textDescription = imgUploadOverlay.querySelector('.text__description');

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadInput.value = '';
};

imgUploadForm.querySelector('.img-upload__cancel')
  .addEventListener('click', () => {
    closeUploadForm();
  });

function onDocumentKeydown(evt) {
  if (isEsc(evt.keyCode)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

imgUploadInput.addEventListener('change', (evt) => {
  document.addEventListener('keydown', onDocumentKeydown);
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
  document.body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
});

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateTextDescription = (value) => value.length <= 140;
pristine.addValidator(textDescription, validateTextDescription, 'Максимум 140 символов');

/**
 *  - хэштег начинается с символа # (решётка);
    - строка после решётки должна состоять из букв и чисел и не может содержать пробелы,
        спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.;
    - хеш-тег не может состоять только из одной решётки;
    - максимальная длина одного хэштега 20 символов, включая решётку;
    - хэштеги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
    - хэштеги разделяются пробелами;
    - один и тот же хэштег не может быть использован дважды;
    - нельзя указать больше пяти хэштегов;
 */
const textErrors = [
  'Хэштег должен начинаться с # (решётка)',
  'Максимальная длина одного хэштега 20 символов',
  'один и тот же хэштег не может быть использован дважды',
  'нельзя указать больше пяти хэштегов',
  'хэштеги разделяются пробелами'
];

const validateHashtag = (value) => {
  let isValid = false;
  let str = value;

  return isValid;
};
const getHashtagErrorMessage = () => {
  const i = 0;
  return textErrors[i];
};

pristine.addValidator(textHashtag, validateHashtag, getHashtagErrorMessage);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  console.log(isValid);
});
