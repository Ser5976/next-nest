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
import { dateFormattingBirthday } from '../../../../../../../utils/date-formatting';

const FormPersonal: FC<FormPersonalProps> = ({
  setShow, //закрытие модального окна
  personalData, // данные по юзеру
}): JSX.Element => {
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
        //здесь показываем ошибку только когда это не 'Unauthorized',
      //при 'Unauthorized' отработает AuthProvider
      if(error.response.data.message !== 'Unauthorized'){
        toast.error('Что-то пошло не так,попробуйте ещё раз!'); 
      }
      },
    }
  );

  // получение данных из формы и отправка на сервак
  const onSubmit = (data: IPersonalData): void => {
    //  console.log('дата', data);
    // форматирование даты рождения
    const birthdayFormatted = dateFormattingBirthday(data.birthday); //см.utils
    //  console.log('дата отформатированная', birthdayFormatted);
    editPersonalData({ ...data, birthday: birthdayFormatted });
    setShow(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div className={styles.label}>Имя</div>
        <Input
          type="text"
          className={styles.input}
          defaultValue={personalData?.name}
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
              defaultChecked={personalData?.gender === 'Мужской'}
              // checked={personalData?.gender === 'Мужской'}
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
              defaultChecked={personalData?.gender === 'Женский'}
              // checked={personalData?.gender === 'Женский'}
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
          defaultValue={personalData?.birthday}
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
