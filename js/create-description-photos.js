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

const createComment = (id, avatar, message, name) => ({
  id: id,
  avatar: avatar,
  message: message,
  name: name
});

const createComments = (quantityComments, commentId, avatar, message, name) => Array.from((
  { length: quantityComments },
  createComment(commentId, avatar, message, name)
));

// const createDescriptionPhoto = (id, url, description, likes) => ({
//   id: id,
//   url: url,
//   description: description,
//   likes: likes,
//   comments: createComments(
//     getRandomNumber(MIN_COMMENTS, MAX_COMMENTS),
//     generateCommentId,
//     `img/avatar-${getRandomNumber(MIN_ID_AVATAR, MAX_ID_AVATAR)}.svg`,
//     MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
//     NAMES[getRandomNumber(0, NAMES.length - 1)]
//   )
// });

// const createDescriptionPhotos = (id, url, description, likes) => Array.from((
//   { length: getRandomNumber(MIN_COMMENTS, MAX_COMMENTS) },
//   createDescriptionPhoto(id, url, description, likes)
// ));

const obj = {
  test: 0,
  comments: createComments(
    getRandomNumber(MIN_COMMENTS, MAX_COMMENTS),
    generateCommentId,
    `img/avatar-${getRandomNumber(MIN_ID_AVATAR, MAX_ID_AVATAR)}.svg`,
    MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
    NAMES[getRandomNumber(0, NAMES.length - 1)]
  )
};


console.log(obj);

// export {
//   createDescriptionPhotos
// };

