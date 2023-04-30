import styles from './FormPassword.module.css';
import { FC } from 'react';
import { FormPasswordProps } from './FormPassword.props';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { UserService } from '../../../../user.service';
import { toast } from 'react-toastify';
import { Input } from '../../../../../../ui/Input/Input';
import { errorCatch } from '../../../../../../../store/auth/auth.helper';

const FormPassword: FC<FormPasswordProps> = ({ setShow }): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ currentPassword: string; password: string }>({
    mode: 'onChange',
  });
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном пост запросе
  const queryClient = useQueryClient();
  // редактирование личных данных
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: editPassword } = useMutation(UserService.editPassword, {
    onSuccess: () => {
      // при успешном редактировании, делаем повторный запрос на юзера ,чтобы обновить данные
      queryClient.invalidateQueries('user-profile');
      setShow(false);
      toast.success('Пароль изменён');
    },
    onError: (error: any) => {
      //здесь показываем ошибку только когда это не 'Unauthorized',
      //при 'Unauthorized' отработает AuthProvider
      if(error.response.data.message !== 'Unauthorized'){
        error.response.status === 401 || error.response.status === 400 //условие, чтобы мы показали наше сосбщение написанное в бэке
        ? toast.error(errorCatch(error)) //errorCatch-функция ,которая обрабатывает сообщение ошибки(ошибка может быть в массиве или строке)
        : toast.error('Что-то пошло не так,попробуйте ещё раз!'); // а это для сообщений, которые мы не обработали
      }
    },
  });

  // получение данных из формы и отправка на сервак
  const onSubmit = (data: {
    currentPassword: string;
    password: string;
  }): void => {
    // console.log(data);
    editPassword(data);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div className={styles.label}>Текущий пароль</div>
        <Input
          type="password"
          className={styles.input}
          autoFocus
          scale="small"
          {...register('currentPassword', {
            required: 'Обязательное поле для заполнения',
          })}
          error={errors.currentPassword}
        />
      </label>

      <label>
        <div className={styles.label}>Пароль</div>
        <Input
          type="password"
          className={styles.input}
          scale="small"
          {...register('password', {
            required: 'Обязательное поле для заполнения',
            minLength: {
              value: 5,
              message: 'Пароль должен содержать не менее 5 символов',
            },
          })}
          error={errors.password}
        />
      </label>

      <input className={styles.button} type="submit" value="Сохранить" />
    </form>
  );
};

export default FormPassword;
