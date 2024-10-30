const checkLengthOfString = (string, length) => string.length <= length;

const isPalindrom = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');

  let newString = '';

  for (let char = string.length - 1; char >= 0; char--) {
    newString += string.at(char);
  }

  return string === newString;
};


const takeInteger = (string) => {
  let newString = '';

  for (let char = 0; char <= string.length; char++) {
    if (string.at(char) !== 'string' && string.at(+char) >= 0) {
      newString += string.at(char);
    }
  }

  let result = Number(newString.replaceAll(' ', ''));

  if (typeof (string) === 'number') {
    result = string;
  }

  return result === 0 ? NaN : result;
};
