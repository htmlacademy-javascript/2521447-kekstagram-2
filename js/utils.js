const ALERT_SHOW_TIME = 5000;


const isEsc = (key) => key === 27;
const isEnter = (key) => key === 13;


const showAlert = (message) => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  const error = template.cloneNode(true);
  const title = error.querySelector('.data-error__title');
  title.textContent = message;
  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, ALERT_SHOW_TIME);
};


const showImgFilterButtons = () =>
  document.querySelector('.img-filters')
    .classList.remove('img-filters--inactive');


const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


const toggleModalElement = (modalElement) => {
  modalElement.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};


export {
  isEsc,
  isEnter,
  showAlert,
  showImgFilterButtons,
  debounce,
  toggleModalElement,
};
