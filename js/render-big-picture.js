import { isEsc } from './utils.js';
import { photos } from './photos.js';

let startCommentsCount = 5;

const bigPicture = document.querySelector('.big-picture');
const pictureImgButtons = document.querySelectorAll('.picture__img');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');


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

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');

  if (comments.length <= 5) {
    comments.forEach((comment) => fragment.append(createTemplateComment(comment)));
    socialCommentShownCount.textContent = comments.length;
    commentsLoaderButton.classList.add('hidden');
  } else {
    socialCommentShownCount.textContent = startCommentsCount;

    for (let i = 0; i < startCommentsCount; i++) {

      if (i < comments.length) {
        fragment.append(createTemplateComment(comments[i]));
      }

      if (comments.length <= startCommentsCount) {
        socialCommentShownCount.textContent = comments.length;
        commentsLoaderButton.classList.add('hidden');
      }
    }
  }

  socialComments.append(fragment);
};

commentsLoaderButton.addEventListener('click', (evt) => {
  const id = Number(evt.target.closest('.big-picture').dataset.socialId);
  const photo = photos.find((photoElement) => photoElement.id === id);

  socialComments.textContent = '';
  startCommentsCount += 5;
  renderComments(photo.comments);
});

const createBigPicture = ({ url, description, likes, comments, id }) => {
  const bigPictureImg = bigPicture.querySelector('img');

  bigPicture.closest('.big-picture').dataset.socialId = id;


  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  renderComments(comments);
};

const renderBigPicture = (photo) => {
  startCommentsCount = 5;
  commentsLoaderButton.classList.remove('hidden');
  bigPicture.querySelector('.social__comments').textContent = '';

  openBigPicture();
  createBigPicture(photo);
};

pictureImgButtons.forEach((imgButton) => {
  imgButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const id = Number(evt.target.closest('.picture').dataset.thumbnailId);
    const photo = photos.find((photoElement) => photoElement.id === id);

    renderBigPicture(photo);
  });
});
