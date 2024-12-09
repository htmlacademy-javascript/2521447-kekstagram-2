import { isEsc } from './utils.js';

const COUNT_SHOW_STEP = 5;
let startCommentsCount = 5;
let loadMoreComments = null;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-total-count');
const socialCaption = bigPicture.querySelector('.social__caption');


const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const closeBigPicture = () => {
  startCommentsCount = COUNT_SHOW_STEP;
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  commentsLoaderButton.removeEventListener('click', loadMoreComments);
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

  if (comments.length <= startCommentsCount) {
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

const loaderComments = ({ comments }) => {
  socialComments.textContent = '';
  startCommentsCount += COUNT_SHOW_STEP;
  renderComments(comments);
};

const createBigPicture = ({ url, description, likes, comments }) => {
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
  bigPictureImg.src = url;
  bigPictureImg.alt = description;

  renderComments(comments);
};

const renderBigPicture = (photo) => {
  startCommentsCount = COUNT_SHOW_STEP;
  commentsLoaderButton.classList.remove('hidden');
  socialComments.textContent = '';

  loadMoreComments = loaderComments.bind(null, photo);
  commentsLoaderButton.addEventListener('click', loadMoreComments);

  openBigPicture();
  createBigPicture(photo);
};

export { renderBigPicture };
