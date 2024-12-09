import { getData } from './api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { setImgUploadFormSubmit } from './form.js';
import { showAlert, showImgFilterButtons, debounce } from './utils.js';
import { sortPhotos } from './sort-photos.js';

const app = async () => {
  try {
    const photos = await getData();

    renderThumbnails(photos);
    showImgFilterButtons();
    sortPhotos(photos, debounce(
      (sortPhotosList) => renderThumbnails(sortPhotosList)
    ));
  } catch (err) {
    showAlert(err.message);
  }
};

app();

setImgUploadFormSubmit((cb) => cb());
