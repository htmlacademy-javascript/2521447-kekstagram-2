import { isEsc } from './utils.js';
import { photos } from './photos.js';

const bigPicture = document.querySelector('.big-picture');
const pictureImgButtons = document.querySelectorAll('.picture__img');


const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
};

bigPicture.querySelector('.big-picture__cancel')
  .addEventListener('click', () => {
    closeBigPicture();
  });

function onDocumentKeydown(evt) {
  if (isEsc(evt.keyCode)) {
    evt.preventDefault();
    closeBigPicture();
  }
}
function onDocumentClick(evt) {
  if (evt.target.className === 'big-picture overlay') {
    closeBigPicture();
  }
}

const createTemplateComment = ({ id, avatar, message, name }) => {
  const templateCommentElement = document.querySelector('#social__comment')
    .content
    .querySelector('.social__comment');
  const templateComment = templateCommentElement.cloneNode(true);

  templateComment.setAttribute('data-comment-id', id);
  templateComment.querySelector('.social__picture').src = avatar;
  templateComment.querySelector('.social__text').textContent = message;
  templateComment.querySelector('.social__picture').alt = name;

  return templateComment;
};

const createBigPicture = ({ url, description, likes, comments }) => {
  const fragment = document.createDocumentFragment();
  const bigPictureImg = bigPicture.querySelector('img');

  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPictureImg.src = url;
  bigPictureImg.alt = description;

  comments.map((comment) => fragment.append(createTemplateComment(comment)));

  return fragment;
};

const renderBigPicture = (photo) => {
  bigPicture.querySelector('.social__comments').textContent = '';

  const socialComments = bigPicture.querySelector('.social__comments');

  openBigPicture();
  socialComments.append(createBigPicture(photo));
};

pictureImgButtons.forEach((imgButton) => {
  imgButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const id = Number(evt.target.closest('.picture').dataset.thumbnailId);
    const photo = photos.find((photoElement) => photoElement.id === id);

    renderBigPicture(photo);
  });
});
