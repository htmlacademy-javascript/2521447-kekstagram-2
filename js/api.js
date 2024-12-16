const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';


const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};


const Method = {
  GET: 'GET',
  POST: 'POST',
};


const ErrorMessage = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить данные формы',
};


const load = async (route, errorMessage = null, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { method, body });

    if (!response.ok) {
      throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
    }

    return response.json();

  } catch (err) {
    throw new Error(errorMessage ?? err.message);
  }
};


const getData = () => load(Route.GET_DATA, ErrorMessage.GET_DATA);
const sendData = (body) => load(Route.SEND_DATA, ErrorMessage.SEND_DATA, Method.POST, body);


export { getData, sendData };
