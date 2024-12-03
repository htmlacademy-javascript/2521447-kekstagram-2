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

const successResponse = (el, cb) => {
  const template = document.querySelector('#success').content.querySelector('.success');
  const success = template.cloneNode(true);
  success.querySelector(`.${el}`)
    .addEventListener('click', () => success.remove());
  document.body.append(success);
  cb();
};

export {
  isEsc,
  isEnter,
  showAlert,
  successResponse,
};
