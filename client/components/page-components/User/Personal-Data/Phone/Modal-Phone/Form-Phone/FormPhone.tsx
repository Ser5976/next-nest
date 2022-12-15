import styles from './FormPhone.module.css';
import cn from 'classnames';
import { FC } from 'react';
import { FormPhoneProps } from './FormPhone.props';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { UserService } from '../../../../user.service';
import { toast } from 'react-toastify';
import { errorCatch } from '../../../../../../../store/auth/auth.helper';
import { IPhone } from '../../../../../../../store/user/interface.user';
import PhoneInput from 'react-phone-input-2'; //библиотека для форматирования телефонного номера
import { RiErrorWarningLine } from 'react-icons/ri';
import { UserHelper } from '../../../../user.helper';

const FormPhone: FC<FormPhoneProps> = ({ setShow }): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPhone>({
    mode: 'onChange',
  });
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном пост запросе
  const queryClient = useQueryClient();
  // редактирование личных данных
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: editPhone } = useMutation(UserService.editPhone, {
    onSuccess: () => {
      // при успешном редактировании, делаем повторный запрос на юзера ,чтобы обновить данные
      queryClient.invalidateQueries('user-profile');
      setShow(false);
      toast.success('Телефон изменён');
    },
    onError: (error: any) => {
      error.response.status === 401 || error.response.status === 400 //условие, чтобы мы показали наше сосбщение написанное в бэке
        ? toast.error(errorCatch(error)) //errorCatch-функция ,которая обрабатывает сообщение ошибки(ошибка может быть в массиве или строке)
        : toast.error('Что-то пошло не так,попробуйте ещё раз!'); // а это для сообщений, которые мы не обработали
    },
  });

  // получение данных из формы и отправка на сервак
  const onSubmit = (data: IPhone): void => {
    // форматируем номер телефона,чтобы он записался в базу так как мы вносим
    //(в оригинали просто строка цифр без + ,скобок и пробелов) см. UserHelper
    const formattedPhone = UserHelper.formattedPhone(data.phone);
    data.phone = formattedPhone;
    editPhone(data);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="phone"
        rules={{ required: 'Обязательное поле для заполнения' }}
        render={({ field: { ref, ...field } }) => (
          <PhoneInput
            inputClass={cn(styles.input, {
              [styles.phoneError]: errors.phone,
            })}
            containerClass={styles.container}
            {...field}
            inputProps={{
              ref,
              required: true,
              autoFocus: true,
            }}
            country={'by'}
            onlyCountries={['by']}
            countryCodeEditable={false}
            specialLabel={'Телефон'}
          />
        )}
      />
      {errors.phone && (
        <>
          <RiErrorWarningLine className={styles.errorIcon} />
          <span className={styles.errorMessage}>{errors.phone.message}</span>
        </>
      )}
      <input className={styles.button} type="submit" value="Сохранить" />
    </form>
  );
};

export default FormPhone;
