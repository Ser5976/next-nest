import styles from './OrderItem.module.css';
import { FC, useState } from 'react';
import { OrderItemProps } from './OrderItem.props';
import { MdOutlineVisibility } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { dateFormatting } from '../../../../../utils/date-formatting';
import { BsCircle, BsCheck2Circle } from 'react-icons/bs';
import OrderModal from '../Order-Modal/OrderModal';

const OrderItem: FC<OrderItemProps> = ({
  order, //данные о заказе
  refech, //делает повторный запрос в useQuery
}): JSX.Element => {
  //открытие модального окна для оформление заказа
  const [show, setShow] = useState(false);

  // удаление заказа
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteOrder } = useMutation(AdminService.deleteOrder, {
    onSuccess: () => {
      // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
      // поэтому- refech
      refech();
      toast.success('Заказ удалён');
    },
    onError: (error: any) => {
      //здесь показываем ошибку только когда это не 'Unauthorized',
      //при 'Unauthorized' отработает AuthProvider
      if(error.response.data.message !== 'Unauthorized'){
        toast.error('Что-то пошло не так');
      }
    },
  });

  return (
    <>
      <div className={styles.containerData}>
        <div className={styles.data}>{order.email}</div>
        <div className={styles.data}>{dateFormatting(order.createdAt)}</div>
        <div className={styles.data}>
          {order.execution ? (
            <BsCheck2Circle className={styles.icon1} />
          ) : (
            <BsCircle className={styles.icon} />
          )}
        </div>
        <MdOutlineVisibility
          className={styles.icon2}
          onClick={() => setShow(true)}
        />

        <TiDeleteOutline
          className={styles.icon3}
          onClick={() => {
            if (window.confirm(`Вы действительно хотите удалить отзыв`)) {
              deleteOrder(order._id);
            }
          }}
        />
      </div>
      <OrderModal order={order} show={show} setShow={setShow} />
    </>
  );
};

export default OrderItem;
