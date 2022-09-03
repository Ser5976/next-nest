import axios from 'axios';
import Cookies from 'js-cookie';

const customAxios = axios.create({});
// можно было сразу записать Cookies.get('accessToken') в axios.create({}) в headers, ну ладно воспользуемся interceptors
customAxios.interceptors.request.use((config) => {
  //console.log('interceptors-request');
  const accesseToken = Cookies.get('accessToken');
  if (config.headers && accesseToken) {
    config.headers.Authorization = `Bearer ${accesseToken}`;
  }
  return config;
});

//настраеваем interceptors у axios для того, чтобы во время запроса перехватить ошибку(если accesseToken не валидный)
// потом послать запрос с refreshToken и если он валидный, то  перезаписать токены,потом повторно сделать запрос(крутяк,клиент не заметит)
// а если refreshToken просроченный,то удалить из куки просроченные токены.

//для проверки refreshToken я обошёлся authProviders и просроченный токен выявим ещё до запроса
// и поэтому, к сожалению ,я не воспользуюсь interceptors

/* customAxios.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    console.log(' где же ты');
    if (
      (error.response.status === 401 || errorCatch(error) === 'Unauthorized') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      console.log('я здесь');
      try {
        console.log(' сейчас здесь');
        await AuthService.getNewTokens();
        console.log('теперь здесь');
        return customAxios.request(originalRequest);
      } catch (error) {
        console.log('ошиииибка');
        removeTokensStorage();
      }
    }
    throw error;
  }
);
 */
export default customAxios;
