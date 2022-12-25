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
      queryClient.invalidateQueries('users-for-admin');
      toast.success('Пользователь удалён');
    },
    onError: (error: any) => {
      toast.error('Пользователь не удалён,что-то пошло не так');
    },
  });
  const removeUser = () => {
    deleteOrder(order._id);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.label}>
          <div>Имя</div>
          <span>{name}</span>
        </div>
        <div className={styles.label}>
          <div>Дата заказа</div>
          <span>{dateFormatting(order.createdAt)}</span>
        </div>
        <div className={styles.label}>
          <div>Выполнение</div>
          <span>
            {order.execution ? (
              <BsCheck2Circle className={styles.icon1} />
            ) : (
              <BsCircle className={styles.icon} />
            )}
          </span>
        </div>

        <MdOutlineVisibility
          className={styles.icon2}
          onClick={() => setShow(true)}
        />

        <TiDeleteOutline
          className={styles.icon3}
          onClick={() => {
            if (window.confirm(`Вы действительно хотите удалить отзыв`)) {
              removeUser();
            }
          }}
        />
      </div>
      <OrderModal order={order} show={show} setShow={setShow} />
    </>
  );
};

export default OrderItem;
