import { createThumbnails } from './create-thumbnails.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createTemplatePhoto = ({
  url,
  description,
  likes,
  comments,
}) => {
  const photoTemplate = pictureTemplate.cloneNode(true);
  const photoImg = photoTemplate.querySelector('.picture__img');

  photoImg.src = url;
  photoImg.alt = description;
  photoTemplate.querySelector('.picture__likes')
    .textContent = likes;
  photoTemplate.querySelector('.picture__comments')
    .textContent = comments.length;

  return photoTemplate;
};

const renderThumbnails = (photos) => {
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.map((photo) => {
    fragment.append(createTemplatePhoto(photo));
  });

  return pictures.append(fragment);
};

renderThumbnails(createThumbnails());

