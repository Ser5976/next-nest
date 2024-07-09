import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { errorCatch, removeTokensStorage } from '../store/auth/auth.helper';
import { AuthService } from '../store/auth/auth.service';

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

customAxios.interceptors.response.use(
  (config) => config,
  async (error) => {
    console.log(
      'Error from interceptor(перехватил ошибку интерцептор):',
      error
    );
    const originalRequest = error.config; //это наш запрос

    //делаем прверку на ошибку,на имеющейся запрос, и на то что это не повторный запрос, для этого сами вносим свойство _isRetry
    if (
      (error.response.status === 401 || errorCatch(error) === 'Unauthorized') &&
      error.config &&
      !error.config._isRetry
    ) {
      // если проверку прошёл присваеваем true _isRetry и посылаем запрос на бэкэнд для создания новых токенов
      originalRequest._isRetry = true;
      console.log('Ошибка проверку прошла,интерцептор');
      // если refresh token валидный проискодит обновление токенов и записывает токены в куки и поторно axios
      // делает запрос, если нет делаем logout
      try {
        await AuthService.getNewTokens();
        console.log('refresh токен валидный,послылаем новые запрос');
        return customAxios.request(originalRequest);
      } catch (error) {
        console.log(
          'ошиииибка,рефреш токен невалидный, выходими из авторизации'
        );
        // window.location.reload()//если refresh невалидный делаем перезагрузку страницы,ну а дальше работает AuthProvider
      }
    }
    throw error;
  }
);

export default customAxios;
