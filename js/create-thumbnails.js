import { createIdGenerator, getRandomNumber } from './utils.js';
import { NAMES, MESSAGES } from './data.js';

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_ID_AVATAR = 1;
const MAX_ID_AVATAR = 6;
const SIMILAR_PHOTO_COUNT = 25;

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();
const generateUrlId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumber(MIN_ID_AVATAR, MAX_ID_AVATAR)}.svg`,
  message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
  name: NAMES[getRandomNumber(0, NAMES.length - 1)]
});

const createComments = () => Array.from({ length: getRandomNumber(MIN_COMMENTS, MAX_COMMENTS) }, createComment);

const createDescriptionPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: 'Это очень новое фото, пока не добавили описание ))',
  likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
  comments: createComments()
});

const createThumbnails = () => Array.from({ length: SIMILAR_PHOTO_COUNT }, createDescriptionPhoto);

export { createThumbnails };

