import styles from './OrderItem.module.css';
import { FC, useState } from 'react';
import { OrderItemProps } from './OrderItem.props';
import { MdOutlineVisibility } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { dateFormatting } from '../../../../../utils/date-formatting';
import { BsCircle, BsCheck2Circle } from 'react-icons/bs';
import OrderModal from '../Order-Modal/OrderModal';

const OrderItem: FC<OrderItemProps> = ({ order }): JSX.Element => {
  const { name } = order;
  //открытие модального окна для оформление заказа
  const [show, setShow] = useState(false);

  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();

  // удаление заказа(только админ)
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteOrder } = useMutation(AdminService.deleteOrder, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('orders');
      toast.success('Заказ удалён');
    },
    onError: (error: any) => {
      toast.error('Заказ не удалён,что-то пошло не так');
    },
  });

  return (
    <>
      <div className={styles.containerData}>
        <div className={styles.data}>{order.name}</div>
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
