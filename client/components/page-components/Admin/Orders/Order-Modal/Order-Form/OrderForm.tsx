import styles from './OrderForm.module.css';
import cn from 'classnames';
import { FC } from 'react';
import { OrderFormProps } from './OrderForm.props';
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from 'react-icons/io';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../../admin.service';
import { toast } from 'react-toastify';

const OrderForm: FC<OrderFormProps> = ({ order }): JSX.Element => {
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();

  // отметка о выполнении заказа
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: completed } = useMutation(AdminService.executeAnOrder, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('orders');
      toast.success(' Заказ отмечен как выполненный');
    },
    onError: (error: any) => {
      toast.error('Что-то пошло не так');
    },
  });
  const orderCompleted = () => {
    completed({ orderId: order._id, bool: true });
  };
  console.log('Заказы с формы:', order);
  return (
    <>
      <h2 className={styles.h2}>Личные данные</h2>
      <form className={styles.form}>
        <div className={styles.wrapper}>
          <div className={styles.part}>
            <label>
              <div className={styles.label}>Имя</div>
              <div className={styles.div}>{order.name}</div>
            </label>
            <label>
              <div className={styles.label}>Email</div>
              <div className={styles.div}>{order.email}</div>
            </label>
            <div className="relative mb-5">
              <label>
                <div className={styles.label}>Телефон</div>
                <div className={styles.div}>{order.telephone}</div>
              </label>
            </div>
            <div className="mb-5 relative">
              <div className={styles.label}>Доставка</div>
              <div className="flex space-x-5">
                <div className=" flex space-x-2 ">
                  {order.delivery === 'курьером' ? (
                    <IoMdRadioButtonOn className={styles.icon1} />
                  ) : (
                    <IoMdRadioButtonOff className={styles.icon2} />
                  )}

                  <p className=" text-gray-600">Курьером</p>
                </div>
                <div className=" flex space-x-2 ">
                  {order.delivery === 'самовывоз' ? (
                    <IoMdRadioButtonOn className={styles.icon1} />
                  ) : (
                    <IoMdRadioButtonOff className={styles.icon2} />
                  )}

                  <p className=" text-gray-600">Самовывоз</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.part}>
            <label>
              <div className={styles.label}>Населённый пункт</div>
              <div className={styles.div}>{order.address.city}</div>
            </label>

            <label>
              <div className={styles.label}>Улица</div>
              <div className={styles.div}>{order.address.street}</div>
            </label>
            <div className="flex relative gap-4 ">
              <label className=" w-1/2">
                <div className={styles.label}>Дом</div>
                <div className={styles.div}>{order.address.house}</div>
              </label>

              <label className=" w-1/2">
                <div className={styles.label}>Квартира</div>
                <div className={styles.flat}>{order.address.flat}</div>
              </label>
            </div>

            <div className="mb-5 relative">
              <div className={styles.label}>Оплата</div>
              <div className="flex space-x-5">
                <div className=" flex relative  space-x-2  ">
                  {order.payment === 'наличные' ? (
                    <IoMdRadioButtonOn className={styles.icon1} />
                  ) : (
                    <IoMdRadioButtonOff className={styles.icon2} />
                  )}

                  <p className=" text-gray-600">Наличные</p>
                </div>
                <div className=" flex relative space-x-2 ">
                  {order.payment === 'банковской картой' ? (
                    <IoMdRadioButtonOn className={styles.icon1} />
                  ) : (
                    <IoMdRadioButtonOff className={styles.icon2} />
                  )}

                  <p className=" text-gray-600">Банковской картой</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" text-gray-600 font-semibold text-base text-right my-5">
          К оплате: {order.orderAmount} р.
        </div>
        <div className="flex justify-end">
          <button
            className={cn({
              [styles.button]: !order.execution,
              [styles.disable]: order.execution,
            })}
            disabled={order.execution}
            onClick={orderCompleted}
          >
            {order.execution ? 'Заказ выполнен' : 'Выполнить заказ'}
          </button>
        </div>
      </form>
    </>
  );
};

export default OrderForm;
