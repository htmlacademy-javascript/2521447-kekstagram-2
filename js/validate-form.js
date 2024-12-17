import '../vendor/pristine/pristine.min.js';


const MAX_HASHTAGS = 5;
const MAX_SIMBOLS = 20;


const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const textHashtag = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const button = imgUploadForm.querySelector('.img-upload__submit');


let errorHashtagMessageTemplate = '';


const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtag = (value) => {
  errorHashtagMessageTemplate = '';

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
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
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


pristine.addValidator(textHashtag, validateHashtag, () => errorHashtagMessageTemplate);
pristine.addValidator(textDescription, validateTextDescription, 'Максимум 140 символов');


const onTextHashtagInput = () => {
  button.disabled = !pristine.validate();
};


textHashtag.addEventListener('input', onTextHashtagInput);
textDescription.addEventListener('input', onTextHashtagInput);


const validateForm = () => pristine.validate();


const resetValidateForm = () => {
  imgUploadInput.value = '';
  textHashtag.value = '';
  textDescription.value = '';
  pristine.reset();
};


export { validateForm, resetValidateForm };
