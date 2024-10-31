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

const SIMILAR_PHOTO_COUNT = 25;

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const createIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();
const generateUrlId = createIdGenerator();

const createComments = () => {
  const comments = [];
  const countMax = getRandomNumber(0, 30);

  for (let i = 0; i <= countMax; i++) {
    comments.push(
      {
        id: generateCommentId(),
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
        name: NAMES[getRandomNumber(0, NAMES.length - 1)]
      }
    );
  }

  return comments;
};

const createDescriptionPhoto = function () {
  return {
    id: generatePhotoId(),
    url: `photos/${generateUrlId()}.jpg`,
    description: 'Это очень новое фото, его недавно загрузили ))',
    likes: getRandomNumber(15, 200),
    comments: createComments(),
  };
};

const descriptionPhotos = Array.from({ length: SIMILAR_PHOTO_COUNT }, createDescriptionPhoto);
