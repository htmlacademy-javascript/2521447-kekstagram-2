import { isEsc, toggleModalElement } from './utils.js';
import { validateForm, resetValidateForm } from './validate-form.js';
import { resetImageZoom } from './change-image-zoom.js';
import { resetEffect } from './create-filters.js';
import { sendData } from './data.js';


const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};


const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const effectPreviews = imgUploadForm.querySelectorAll('.effects__preview');
const submitButton = imgUploadOverlay.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;


const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};


const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


const openUploadForm = () => {
  toggleModalElement(imgUploadOverlay);

  document.addEventListener('keydown', onDocumentKeydown);
};


const closeUploadForm = () => {
  toggleModalElement(imgUploadOverlay);

  document.removeEventListener('keydown', onDocumentKeydown);

  unblockSubmitButton();
  resetValidateForm();
  resetImageZoom();
  resetEffect();
};


imgUploadForm.querySelector('.img-upload__cancel')
  .addEventListener('click', () => {
    closeUploadForm();
  });


function onDocumentKeydown(evt) {
  if (
    isEsc(evt.keyCode) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();

    closeUploadForm();
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


const closeNotification = (evt) => {
  evt.stopPropagation();

  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');

  if (evt.target === existElement || evt.target === closeButton || isEsc(evt.keyCode)) {
    existElement.remove();
    document.body.removeEventListener('click', closeNotification);
    document.body.removeEventListener('keydown', closeNotification);
  }
};


const appendNotification = (template, cb = null) => {
  cb?.();

  const notificationNode = template.cloneNode(true);

  document.body.append(notificationNode);
  document.body.addEventListener('click', closeNotification);
  document.body.addEventListener('keydown', closeNotification);
};


const sendFormData = async (formElement) => {
  const isValid = validateForm();

  if (isValid) {
    blockSubmitButton();
    try {
      await sendData(new FormData(formElement));
      appendNotification(successTemplate, () => closeUploadForm());
    } catch (err) {
      appendNotification(errorTemplate);
    } finally {
      unblockSubmitButton();
    }
  }
};


const onSubmitButtonClick = (evt) => {
  evt.preventDefault();

  sendFormData(evt.target);
};


imgUploadForm.addEventListener('submit', onSubmitButtonClick);


export { sendFormData };
