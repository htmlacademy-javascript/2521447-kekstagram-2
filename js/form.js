import { resetEffect } from './create-filters.js';
import { isEsc } from './utils.js';
import { resetImageZoom } from './change-img-zoom.js';
import { sendData } from './api.js';
import { validateForm, resetForm } from './validate-form.js';


const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};


const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const effectPreviews = imgUploadForm.querySelectorAll('.effects__preview');
const submitButton = imgUploadOverlay.querySelector('.img-upload__submit');


const openUploadForm = () => {
  document.body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};


const closeUploadForm = (isSaveData = true) => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);

  if (!isSaveData) {
    resetForm();
    resetImageZoom();
    resetEffect();
  }
};

imgUploadForm.querySelector('.img-upload__cancel')
  .addEventListener('click', () => {
    closeUploadForm(false);
  });

function onDocumentKeydown(evt) {
  if (
    isEsc(evt.keyCode) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();

    closeUploadForm(false);
  }
}

imgUploadInput.addEventListener('change', () => {
  const file = imgUploadInput.files[0];
  const image = imgUploadOverlay.querySelector('img');

  image.src = URL.createObjectURL(file);

  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });

  openUploadForm();
});


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

  if (evt.target === button || isEsc(evt.keyCode) || evt.target === popup) {
    popup.remove();

    document.addEventListener('keydown', onDocumentKeydown);
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

  document.body.append(popup);

  button.addEventListener('click', closerPopup);
  document.addEventListener('click', closerPopup);
  document.addEventListener('keydown', closerPopup);
};

const setImgUploadFormSubmit = (onSubmit) => {
  const successType = 'success';
  const errorType = 'error';

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(() => onSubmit(() => {
          closeUploadForm(false);
          showSubmitPopup(successType);
        }))
        .catch(() => onSubmit(() => {
          document.removeEventListener('keydown', onDocumentKeydown);
          showSubmitPopup(errorType);
        }))
        .finally(unblockSubmitButton);
    }
  });
};

export { setImgUploadFormSubmit };
