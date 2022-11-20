import styles from './FormPersonal.module.css';
import { FC } from 'react';
import { FormPersonalProps } from './FormPersonal.props';
import { useForm } from 'react-hook-form';
import { IPersonalData } from '../../../../../../../store/user/interface.user';
import { useMutation, useQueryClient } from 'react-query';
import { UserService } from '../../../../user.service';
import { toast } from 'react-toastify';
import { Input } from '../../../../../../ui/Input/Input';
import { RiErrorWarningLine } from 'react-icons/ri';

const FormPersonal: FC<FormPersonalProps> = ({ setShow }): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IPersonalData>({
    mode: 'onChange',
  });
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном пост запросе
  const queryClient = useQueryClient();
  // редактирование личных данных
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: editPersonalData } = useMutation(
    UserService.editPersonalData,
    {
      onSuccess: () => {
        // при успешном редактировании, делаем повторный запрос на юзера ,чтобы обновить данные
        queryClient.invalidateQueries('user-profile');
      },
      onError: (error: any) => {
        toast.error('Что-то пошло не так');
      },
    }
  );

  // получение данных из формы и отправка на сервак
  const onSubmit = (data: IPersonalData): void => {
    // console.log(data);
    editPersonalData(data);
    setShow(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div className={styles.label}>Имя</div>
        <Input
          type="text"
          className={styles.input}
          autoFocus
          scale="small"
          {...register('name', {
            required: 'Обязательное поле для заполнения',
          })}
          error={errors.name}
        />
      </label>
      <div className="mb-5 relative">
        <div className={styles.label}>Пол</div>
        <div className="flex space-x-5">
          <div className=" flex space-x-2 ">
            <input
              className=" text-gray-400"
              type="radio"
              value="Мужской"
              {...register('gender', {
                required: 'Выберите пол',
              })}
            />
            <p className=" text-gray-600">Мужской</p>
          </div>
          <div className=" flex space-x-2 ">
            <input
              type="radio"
              value="Женский"
              {...register('gender', {
                required: 'Выберите пол',
              })}
            />
            <p className=" text-gray-600"> Женский</p>
          </div>
          {errors.gender && (
            <>
              <RiErrorWarningLine className={styles.errorIcon} />
              <span className={styles.errorMessage}>
                {errors.gender.message}
              </span>
            </>
          )}
        </div>
      </div>
      <label>
        <div className={styles.label}>Дата рождения</div>
        <Input
          type="date"
          className={styles.input}
          scale="small"
          {...register('birthday', {
            required: 'Обязательное поле для заполнения',
          })}
          error={errors.birthday}
        />
      </label>

      <input className={styles.button} type="submit" value="Сохранить" />
    </form>
  );
};

export default FormPersonal;
