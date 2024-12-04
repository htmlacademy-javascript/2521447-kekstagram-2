import { getData } from './api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { setImgUploadFormSubmit } from './form.js';
import { showAlert } from './utils.js';

const MAX_PHOTOS_COUNT = 19;

const app = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos.slice(0, MAX_PHOTOS_COUNT));
  } catch (err) {
    showAlert(err.message);
  }
};

app();

setImgUploadFormSubmit((cb) => cb());
