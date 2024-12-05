import { renderBigPicture } from './render-big-picture.js';

const MAX_PHOTOS_COUNT = 19;

const template = document.querySelector('#picture').content.querySelector('.picture');
const containter = document.querySelector('.pictures');


const comparePhotos = (a, b) => b.comments.length - a.comments.length;

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  thumbnail.href = photo.url;
  thumbnail.dataset.id = photo.id;

  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();

    renderBigPicture(photo);
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  containter.append(
    ...photos
      .slice()
      .sort(comparePhotos)
      .slice(0, MAX_PHOTOS_COUNT)
      .map(createThumbnail)
  );
};

export { renderThumbnails };
