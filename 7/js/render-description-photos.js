const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderDescriptionPhotos = ({
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

export { renderDescriptionPhotos };

