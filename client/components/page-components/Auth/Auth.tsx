import cn from 'classnames';
import { AuthProps } from './Auth.props';
import styles from './Auth.module.css';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuth } from './interfaceAuth';
import { Input } from '../../ui/Input/Input';
import { Button } from '../../ui/Button/Button';
import { useAuthRedirect } from './useAuthRedirect';
import { useActions } from '../../../store/useActions'; // кастомный хук для получения экшенов(диспач уже в нём и типизация)
import { useRouter } from 'next/router';

export const Auth = ({ className, ...props }: AuthProps): JSX.Element => {
  useAuthRedirect(); // вернёмся на ту страницу с которой нас редиректнули
  // выбор авторизации(логин или регистрация)
  const [type, setType] = useState<'login' | 'registration'>('login');

  const { login, registration } = useActions();

  const router = useRouter();
  //console.log(router);
  // выбор регистрация или логин
  const handleType = () => {
    if (type === 'login') {
      setType('registration');
    } else {
      setType('login');
    }
  };

  //react-hook-form для работы с формой
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuth>({
    mode: 'onChange',
  });

  //получаем данные из формы
  const onSubmit: SubmitHandler<IAuth> = (data) => {
    try {
      if (type === 'login') {
        console.log('Login:', data);
        login(data);
      } else {
        console.log('Registr:', data);
        registration(data);
      }
      reset(); // очистка формы
      setType('login'); //переход на логин
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cn(className, styles.wrapper)} {...props}>
      <div className={styles.modal}>
        <h3 className="text-lg text-gray-600 font-medium text-center">
          {type === 'login' ? 'Вход' : 'Регистрация'}
        </h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="email"
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
          {type === 'registration' ? (
            <Input
              type="password"
              placeholder="password"
              {...register('password', {
                required: 'Обязательное поле для заполнения',
                minLength: {
                  value: 5,
                  message: 'Пароль должен содержать не менее 5 символов',
                },
              })}
              error={errors.password}
            />
          ) : (
            <Input
              type="password"
              placeholder="password"
              {...register('password', {
                required: 'Обязательное поле для заполнения',
              })}
              error={errors.password}
            />
          )}

          <Button type="submit" className="self-center">
            {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>
        <button className={styles.button} onClick={handleType}>
          {type === 'login' ? 'Регистрация' : 'Назад'}
        </button>
      </div>
    </div>
  );
};
