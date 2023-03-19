import styles from './FormEmail.module.css';
import { FC } from 'react';
import { FormEmailProps } from './FormEmail.props';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { UserService } from '../../../../user.service';
import { toast } from 'react-toastify';
import { Input } from '../../../../../../ui/Input/Input';
import { errorCatch } from '../../../../../../../store/auth/auth.helper';

const FormEmail: FC<FormEmailProps> = ({
  setShow, //закрытие модального окна
}): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    mode: 'onChange',
  });
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном пост запросе
  const queryClient = useQueryClient();
  // редактирование личных данных
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: editEmail } = useMutation(UserService.editEmail, {
    onSuccess: () => {
      // при успешном редактировании, делаем повторный запрос на юзера ,чтобы обновить данные
      queryClient.invalidateQueries('user-profile');
      setShow(false);
      toast.success('Email изменён');
    },
    onError: (error: any) => {
      error.response.status === 401 || error.response.status === 400 //условие, чтобы мы показали наше сосбщение написанное в бэке
        ? toast.error(errorCatch(error)) //errorCatch-функция ,которая обрабатывает сообщение ошибки(ошибка может быть в массиве или строке)
        : toast.error('Что-то пошло не так,попробуйте ещё раз!'); // а это для сообщений, которые мы не обработали
    },
  });

  // получение данных из формы и отправка на сервак
  const onSubmit = (data: { email: string; password: string }): void => {
    // console.log(data);
    editEmail(data);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div className={styles.label}>Новая почта</div>
        <Input
          type="email"
          className={styles.input}
          autoFocus
          scale="small"
          {...register('email', {
            required: 'Обязательное поле для заполнения',
            pattern: {
              value:
                //регулярное выражения - валидация email
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Неправильный формат электронной почты',
            },
          })}
          error={errors.email}
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

export default FormEmail;
