import styles from './FormOrder.module.css';
import { FC } from 'react';
import { FormOrderProps } from './FormOrder.props';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Input } from '../../../ui/Input/Input';
import { IDataShopper, IOrder, OrderService } from '../order.service';
import cn from 'classnames';
import PhoneInput from 'react-phone-input-2'; //библиотека для форматирования телефонного номера
import { UserHelper } from '../../User/user.helper';
import { useRouter } from 'next/router';

const FormOrder: FC<FormOrderProps> = ({
  setShow,
  order,
  totalPriceProduct,
}): JSX.Element => {
  const { push } = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IDataShopper>({
    mode: 'onChange',
  });

  // редактирование личных данных
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: addOrder } = useMutation(OrderService.addOrder, {
    onSuccess: () => {
      push('/alertOrder');
    },
    onError: (error: any) => {
      toast.error('Что-то пошло не так');
    },
  });

  // получение данных из формы и отправка на сервак
  const onSubmit = (data: IDataShopper) => {
    // форматируем номер телефона,чтобы он записался в базу так как мы вносим
    //(в оригинали просто строка цифр без + ,скобок и пробелов) см. UserHelper
    const formattedPhone = UserHelper.formattedPhone(data.telephone);
    //формируем объект заказа
    const orderData: IOrder = {
      ...data,
      telephone: formattedPhone,
      productCart: order,
      orderAmount: totalPriceProduct,
    };
    // console.log('Заказ:', orderData);
    addOrder(orderData);
    setShow(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper}>
        <div className={styles.part}>
          <label>
            <div className={styles.label}>Имя</div>
            <Input
              type="text"
              autoFocus
              className={styles.input}
              scale="small"
              {...register('name', {
                required: 'Обязательное поле для заполнения',
              })}
              error={errors.name}
            />
          </label>
          <label>
            <div className={styles.label}>Email</div>
            <Input
              type="email"
              className={styles.input}
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
          <div className="relative mb-5">
            <Controller
              control={control}
              name="telephone"
              rules={{ required: 'Обязательное поле для заполнения' }}
              render={({ field: { ref, ...field } }) => (
                <PhoneInput
                  inputClass={cn(styles.phone, {
                    [styles.phoneError]: errors.telephone,
                  })}
                  containerClass={styles.containerPone}
                  {...field}
                  inputProps={{
                    ref,
                    required: true,
                  }}
                  country={'by'}
                  onlyCountries={['by']}
                  countryCodeEditable={false}
                  specialLabel={'Телефон'}
                />
              )}
            />
            {errors.telephone && (
              <>
                <RiErrorWarningLine className={styles.errorIconPhone} />
                <span className={styles.errorMessagePhone}>
                  {errors.telephone.message}
                </span>
              </>
            )}
          </div>
          <div className="mb-5 relative">
            <div className={styles.label}>Доставка</div>
            <div className="flex space-x-5">
              <div className=" flex space-x-2 ">
                <input
                  className=" text-gray-400"
                  type="radio"
                  value="Курьером"
                  {...register('delivery', {
                    required: 'Выберите способ доставки',
                  })}
                />
                <p className=" text-gray-600">Курьером</p>
              </div>
              <div className=" flex space-x-2 ">
                <input
                  type="radio"
                  value="самовывоз"
                  {...register('delivery', {
                    required: 'Выберите способ доставки',
                  })}
                />
                <p className=" text-gray-600">Самовывоз</p>
              </div>
              {errors.delivery && (
                <>
                  <RiErrorWarningLine className={styles.errorIconRadio} />
                  <span className={styles.errorMessageRadio}>
                    {errors.delivery.message}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.part}>
          <label>
            <div className={styles.label}>Населённый пункт</div>
            <Input
              type="text"
              className={styles.input}
              scale="small"
              {...register('address.city', {
                required: 'Обязательное поле для заполнения',
              })}
              error={errors.address?.city}
            />
          </label>

          <label>
            <div className={styles.label}>Улица</div>
            <Input
              type="text"
              className={styles.input}
              scale="small"
              {...register('address.street', {
                required: 'Обязательное поле для заполнения',
              })}
              error={errors.address?.street}
            />
          </label>
          <div className="flex relative gap-4">
            <label>
              <div className={styles.label}>Дом</div>
              <Input
                type="text"
                className={cn(styles.input, {
                  [styles.errorHouse]: errors.address?.house,
                })}
                scale="small"
                {...register('address.house', {
                  required: 'Обязательное поле для заполнения',
                })}
              />
            </label>
            {errors.address?.house && (
              <>
                <RiErrorWarningLine className={styles.errorIconAddress} />
                <span className={styles.errorMessageAddress}>
                  {errors.address.house.message}
                </span>
              </>
            )}
            <label>
              <div className={styles.label}>Квартира</div>
              <Input
                type="text"
                className={styles.input}
                scale="small"
                {...register('address.flat')}
              />
            </label>
          </div>

          <div className="mb-5 relative">
            <div className={styles.label}>Оплата</div>
            <div className="flex space-x-5">
              <div className=" flex space-x-2 ">
                <input
                  className=" text-gray-400"
                  type="radio"
                  value="Наличные"
                  {...register('payment', {
                    required: 'Выберите способ оплаты',
                  })}
                />
                <p className=" text-gray-600">Наличные</p>
              </div>
              <div className=" flex space-x-2 ">
                <input
                  type="radio"
                  value="банковской картой"
                  {...register('payment', {
                    required: 'Выберите способ оплаты',
                  })}
                />
                <p className=" text-gray-600">Банковской картой</p>
              </div>
              {errors.payment && (
                <>
                  <RiErrorWarningLine className={styles.errorIconRadio} />
                  <span className={styles.errorMessageRadio}>
                    {errors.payment.message}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" text-green-600 text-right my-5 text-sm">
        К оплате: {totalPriceProduct} р.
      </div>
      <div className="flex justify-end">
        <input
          className={styles.button}
          type="submit"
          value="Подтвердить заказ"
        />
      </div>
    </form>
  );
};

export default FormOrder;
