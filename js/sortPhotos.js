const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

const showImgFilters = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const sortPhotosDiscussed = (cb) => {
  filterDiscussed.addEventListener('click', () => {
    cb();
  });
};

export { sortPhotosDiscussed, showImgFilters };
