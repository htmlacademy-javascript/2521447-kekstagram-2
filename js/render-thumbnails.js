import { photos } from './photos.js';

const createTemplateThumbnail = ({
  url,
  description,
  likes,
  comments,
  id,
}) => {
  const thumbnailTemplateElement = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const thumbnailTemplate = thumbnailTemplateElement.cloneNode(true);
  const thumbnailImg = thumbnailTemplate.querySelector('.picture__img');

  thumbnailTemplate.setAttribute('data-thumbnail-id', id);
  thumbnailImg.src = url;
  thumbnailImg.alt = description;
  thumbnailTemplate.querySelector('.picture__likes').textContent = likes;
  thumbnailTemplate.querySelector('.picture__comments').textContent = comments.length;

  return thumbnailTemplate;
};

const renderThumbnails = (listPhotos) => {
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  listPhotos.forEach((photo) => fragment.append(createTemplateThumbnail(photo)));

  pictures.append(fragment);
};

renderThumbnails(photos);

