const RANDOM_PHOTOS_COUNT = 10;
const ACTIVE_CLASS_NAME = 'img-filters__button--active';


const Filters = {
  default: {
    id: 'filter-default',
  },
  random: {
    id: 'filter-random',
    toSorted: (photos) => photos.toSorted(() => 0.5 - Math.random()),
  },
  discussed: {
    id: 'filter-discussed',
    toSorted: (photos) => photos.toSorted((a, b) => b.comments.length - a.comments.length),
  },
};


const filterButtonsContainer = document.querySelector('.img-filters.container');
const filterButtons = filterButtonsContainer.querySelectorAll('.img-filters__button');


const changeActiveClassName = (buttons, evt) => {
  buttons.forEach((button) => {
    if (button.className.includes(ACTIVE_CLASS_NAME)) {
      button.classList.toggle(ACTIVE_CLASS_NAME);
      evt.target.classList.toggle(ACTIVE_CLASS_NAME);
    }
  });
};


const sortPhotos = (photos, cb) => {
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      changeActiveClassName(filterButtons, evt);

      switch (evt.target.id) {
        case Filters.random.id:
          cb(Filters.random.toSorted(photos).slice(0, RANDOM_PHOTOS_COUNT));
          break;

        case Filters.discussed.id:
          cb(Filters.discussed.toSorted(photos));
          break;

        default:
          cb(photos);
      }
    });
  });
};


export { sortPhotos };
