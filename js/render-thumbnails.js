import { openBigPicture } from './open-big-picture.js';


const template = document.querySelector('#picture').content.querySelector('.picture');
const containter = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();


const getThumbnail = (photo) => {
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

    openBigPicture(photo);
  });

  return thumbnail;
};


const renderThumbnails = (photos) => {
  containter.querySelectorAll('a.picture')
    .forEach((thumbnail) => thumbnail.remove());

  photos
    .forEach((photo) => fragment
      .append(
        getThumbnail(photo)
      )
    );

  containter.append(fragment);
};


export { renderThumbnails };
