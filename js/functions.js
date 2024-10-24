const checkLengthOfString = (string, length) => {
    return string.length <= length;
}

const isPalindrom = (string) => {
    let formatString = string.toLowerCase().replaceAll(' ', '');

    let newString = '';
    
    for (let char = formatString.length - 1; char >= 0; char--) {
        newString += formatString.at(char);
    }

    return newString === formatString;
}

const takeInteger = (string) => {
    let newString = '';

    for (let char = 0; char <= string.length; char++) {
        if (string.at(char) !== 'string' && string.at(+char) >= 0) {
            newString += string.at(char);            
        }
    }

    result = Number(newString.replaceAll(' ', ''));

    if (typeof(string) === 'number') {
        result = string;
    }
    
    return result === 0 ? NaN : result;
}
