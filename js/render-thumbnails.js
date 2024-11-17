import { photos } from './photos.js';
import { renderBigPicture } from './render-big-picture.js';

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

  listPhotos.map((photo) => fragment.append(createTemplateThumbnail(photo)));

  pictures.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      const id = evt.target.closest('.picture');
      const photo = photos.filter((photoElement) => photoElement.id === Number(id.dataset.thumbnailId));

      renderBigPicture(photo);
    }
  });

  return pictures.append(fragment);
};

renderThumbnails(photos);

