import { getData } from './api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { setImgUploadFormSubmit } from './form.js';
import { showAlert } from './utils.js';
import { sortPhotosDiscussed, showImgFilters } from './sortPhotos.js';

const app = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    showImgFilters();
    sortPhotosDiscussed(() => renderThumbnails(photos));
  } catch (err) {
    showAlert(err.message);
    console.log(err)
  }
};

app();

setImgUploadFormSubmit((cb) => cb());
