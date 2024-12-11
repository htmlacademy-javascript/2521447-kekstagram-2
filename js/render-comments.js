const COUNT_SHOW_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
const fragment = document.createDocumentFragment();


let startCommentsCount = 5;
let comments;


const getTemplateComment = ({ id, avatar, message, name }) => {
  const templateCommentElement = document.querySelector('#social__comment')
    .content
    .querySelector('.social__comment');
  const templateComment = templateCommentElement.cloneNode(true);

  templateComment.dataset.commentId = id;
  templateComment.querySelector('.social__picture').src = avatar;
  templateComment.querySelector('.social__text').textContent = message;
  templateComment.querySelector('.social__picture').alt = name;

  return templateComment;
};


const renderComments = (data) => {
  comments = data;

  if (comments.length <= COUNT_SHOW_STEP) {
    socialCommentShownCount.textContent = comments.length;

    comments
      .forEach((comment) => fragment.append(
        getTemplateComment(comment)
      ));

    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
    socialCommentShownCount.textContent = startCommentsCount;

    for (let i = 0; i < startCommentsCount; i++) {

      if (i < comments.length) {
        fragment.append(getTemplateComment(comments[i]));
      }

      if (comments.length <= startCommentsCount) {
        socialCommentShownCount.textContent = comments.length;
        commentsLoaderButton.classList.add('hidden');
      }
    }
  }

  socialComments.append(fragment);
};


const loadMoreComments = () => {
  socialComments.textContent = '';
  startCommentsCount += COUNT_SHOW_STEP;

  renderComments(comments);
};


const clearComments = () => {
  socialComments.textContent = '';
  startCommentsCount = COUNT_SHOW_STEP;
  socialCommentShownCount.textContent = startCommentsCount;
};


commentsLoaderButton.addEventListener('click', loadMoreComments);


export { renderComments, clearComments };
