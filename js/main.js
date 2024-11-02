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
const START_ID_GENERATOR = 0;
const SIMILAR_PHOTO_COUNT = 25;

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const createIdGenerator = () => {
  let lastId = START_ID_GENERATOR;
  return () => ++lastId;
};

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();
const generateUrlId = createIdGenerator();

const createComment = () => {
  const comment = {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomNumber(MIN_ID_AVATAR, MAX_ID_AVATAR)}.svg`,
    message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
    name: NAMES[getRandomNumber(0, NAMES.length - 1)]
  };
  return comment;
};

const createDescriptionPhoto = () => {
  const descriptionPhoto = {
    id: generatePhotoId(),
    url: `photos/${generateUrlId()}.jpg`,
    description: 'Это очень новое фото, пока не добавили описание ))',
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: Array.from({ length: getRandomNumber(MIN_COMMENTS, MAX_COMMENTS) }, createComment),
  };
  return descriptionPhoto;
};

const descriptionPhotos = Array.from({ length: SIMILAR_PHOTO_COUNT }, createDescriptionPhoto);

// защита от Кекса (линтера)
descriptionPhotos.forEach((el) => {
  JSON.stringify(el);
});
