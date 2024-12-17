import { getData } from './api.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showAlert, showImgFilterButtons, debounce } from './utils.js';
import { sortPhotos } from './sort-photos.js';
import { createFilters } from './create-filters.js';
import { sendFormData } from './send-form-data.js';


const initApp = async () => {
  try {
    const photos = await getData();

    renderThumbnails(photos);
    showImgFilterButtons();
    sortPhotos(
      photos,
      debounce((sortPhotosList) => renderThumbnails(sortPhotosList))
    );
  } catch (err) {
    showAlert(err.message);
  }
};


initApp();
createFilters();
sendFormData();
