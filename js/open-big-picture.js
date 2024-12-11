import { renderComments, clearComments } from './render-comments.js';
import { isEsc } from './utils.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-total-count');
const socialCaption = bigPicture.querySelector('.social__caption');


const editBigPicture = (photo) => {
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
};


const openBigPicture = (photo) => {
  document.addEventListener('keydown', onDocumentKeydown);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  clearComments();
  editBigPicture(photo);
  renderComments(photo.comments);
};


const closeBigPicture = () => {
  document.removeEventListener('keydown', onDocumentKeydown);

  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};


function onDocumentKeydown(evt) {
  if (isEsc(evt.keyCode)) {
    evt.preventDefault();

    closeBigPicture();
  }
}


bigPictureCloseButton.addEventListener('click', closeBigPicture);


export { openBigPicture };
