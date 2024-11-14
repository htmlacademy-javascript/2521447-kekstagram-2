import { createDescriptionPhotos } from './create-description-photos';
import { renderDescriptionPhotos } from './render-description-photos';

const pictures = document.querySelector('.pictures');
const photos = createDescriptionPhotos();
const fragment = document.createDocumentFragment();

photos.forEach((photo) => {
  fragment.append(renderDescriptionPhotos(photo));
});

pictures.append(fragment);
