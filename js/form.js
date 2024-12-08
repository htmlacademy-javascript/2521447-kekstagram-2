import '../vendor/pristine/pristine.min.js';
import { resetEffect } from './create-filters.js';
import { isEsc } from './utils.js';
import { changeImageZoom, resetImageZoom } from './change-img-zoom.js';
import { sendData } from './api.js';

const MAX_HASHTAGS = 5;
const MAX_SIMBOLS = 20;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const effectsPreview = imgUploadForm.querySelectorAll('.effects__preview');
const textHashtag = imgUploadOverlay.querySelector('.text__hashtags');
const textDescription = imgUploadOverlay.querySelector('.text__description');
const scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
const submitButton = imgUploadOverlay.querySelector('.img-upload__submit');


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

const closeUploadForm = (isSaveData = true) => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);

  if (!isSaveData) {
    textHashtag.value = '';
    textDescription.value = '';
    pristine.reset();
    resetImageZoom();
    resetEffect();
  }
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

imgUploadInput.addEventListener('change', () => {
  const file = imgUploadInput.files[0];
  const img = document.querySelector('.img-upload__preview');

  img.querySelector('img').src = URL.createObjectURL(file);
  effectsPreview.forEach((imgEffect) => {
    imgEffect.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

let closerPopup = null;

const closePopup = (popup, button, evt) => {
  evt.preventDefault();
  evt.stopPropagation();

  if (button || isEsc(evt.keyCode) || evt.target === popup) {
    popup.remove();
    button.removeEventListener('click', closerPopup);
    document.removeEventListener('click', closerPopup);
    document.removeEventListener('keydown', closerPopup);
  }
};

const showSubmitPopup = (el) => {
  const template = document.querySelector(`#${el}`).content.querySelector(`.${el}`);
  const popup = template.cloneNode(true);
  const button = popup.querySelector(`.${el}__button`);

  closerPopup = closePopup.bind(this, popup, button);

  button.addEventListener('click', closerPopup);
  document.addEventListener('click', closerPopup);
  document.addEventListener('keydown', closerPopup);
  document.body.append(popup);
};

const setImgUploadFormSubmit = (onSubmit) => {
  const successType = 'success';
  const errorType = 'error';

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(() => onSubmit(() => {
          closeUploadForm(false);
          showSubmitPopup(successType);
        }))
        .catch(() => onSubmit(() => {
          closeUploadForm(true);
          showSubmitPopup(errorType);
        }))
        .finally(unblockSubmitButton);
    }
  });
};

export { setImgUploadFormSubmit };
