import { createIdGenerator, getRandomNumber } from './utils';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

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

const createDescriptionPhotos = () => Array.from({ length: SIMILAR_PHOTO_COUNT }, createDescriptionPhoto);

export { createDescriptionPhotos };

