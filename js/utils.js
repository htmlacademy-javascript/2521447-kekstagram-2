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

export {
  isEsc,
  isEnter,
  showAlert,
};
