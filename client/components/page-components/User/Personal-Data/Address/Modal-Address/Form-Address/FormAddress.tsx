import styles from './FormAddress.module.css';
import cn from 'classnames';
import { FC } from 'react';
import { FormAddressProps } from './FormAddress.props';
import { useForm } from 'react-hook-form';
import { IAddress } from '../../../../../../../store/user/interface.user';
import { useMutation, useQueryClient } from 'react-query';
import { UserService } from '../../../../user.service';
import { toast } from 'react-toastify';
import { Input } from '../../../../../../ui/Input/Input';
import { RiErrorWarningLine } from 'react-icons/ri';

const FormAddress: FC<FormAddressProps> = ({
  setShow,
  address,
}): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IAddress>({
    mode: 'onChange',
  });
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном пост запросе
  const queryClient = useQueryClient();
  // редактирование личных данных
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: editAddress } = useMutation(UserService.editAddress, {
    onSuccess: () => {
      // при успешном редактировании, делаем повторный запрос на юзера ,чтобы обновить данные
      queryClient.invalidateQueries('user-profile');
    },
    onError: (error: any) => {
      //здесь показываем ошибку только когда это не 'Unauthorized',
      //при 'Unauthorized' отработает AuthProvider
      if(error.response.data.message !== 'Unauthorized'){
        setShow(false)
        toast.error('Что-то пошло не так');
      }
    },
  });

  // получение данных из формы и отправка на сервак
  const onSubmit = (data: IAddress): void => {
    // console.log(data);
    editAddress(data);
    setShow(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div className={styles.label}>Населённый пункт</div>
        <Input
          type="text"
          className={styles.input}
          defaultValue={address?.city}
          autoFocus
          scale="small"
          {...register('city', {
            required: 'Обязательное поле для заполнения',
          })}
          error={errors.city}
        />
      </label>

      <label>
        <div className={styles.label}>Улица</div>
        <Input
          type="text"
          className={styles.input}
          defaultValue={address?.street}
          scale="small"
          {...register('street', {
            required: 'Обязательное поле для заполнения',
          })}
          error={errors.street}
        />
      </label>
      <div className="flex relative gap-4">
        <label>
          <div className={styles.label}>Дом</div>
          <Input
            type="text"
            className={cn(styles.input, {
              [styles.error]: errors.house,
            })}
            defaultValue={address?.house}
            scale="small"
            {...register('house', {
              required: 'Обязательное поле для заполнения',
            })}
          />
        </label>
        <label>
          <div className={styles.label}>Квартира</div>
          <Input
            type="text"
            className={styles.input}
            defaultValue={address?.flat}
            scale="small"
            {...register('flat')}
          />
        </label>
        {errors.house && (
          <>
            <RiErrorWarningLine className={styles.errorIcon} />
            <span className={styles.errorMessage}>{errors.house.message}</span>
          </>
        )}
      </div>

      <input className={styles.button} type="submit" value="Сохранить" />
    </form>
  );
};

export default FormAddress;
