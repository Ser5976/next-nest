import { IUsers } from './../../../store/admin/interface.admin';
import { API } from '../../../constants/url';
import customAxios from '../../../custom-axios/axiox-interceptors';

//сервис для запроса на сервак

export const AdminService = {
  // используем кастомный axios(в него уже введён токен),
  //получение всех пользователей
  async getUsersAdmin() {
    console.log(' получение пользователей для админа');
    const { data: usersForAdmin } = await customAxios.get<{
      users: IUsers[];
      quantity: number;
    }>(API.admin.users);
    return usersForAdmin;
  },
  //удаление пользователя
  async deleteUser(userId: string) {
    console.log(' удаление пользователя ');
    await customAxios.delete(`${API.admin.users}/${userId}`);
  },
  // поиск  пользователя
  async getFoundUser(email: string) {
    console.log('поиск пользователя');
    const { data: usersForAdmin } = await customAxios.get<IUsers[]>(
      API.admin.search,
      {
        params: { email },
      }
    );
    return usersForAdmin;
  },
};
