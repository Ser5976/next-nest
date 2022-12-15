import styles from './UserItem.module.css';
import { FC, useState } from 'react';
import { UserItemProps } from './UserItem.props';
import { BsHouse, BsPerson, BsTelephoneForward } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import cn from 'classnames';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';

const UserItem: FC<UserItemProps> = ({ users }): JSX.Element => {
  //открытие скрытого блока
  const [show, setShow] = useState('');
  const hiddenBlockHandler = () => {
    if (show === users._id) {
      setShow('');
    } else {
      setShow(users._id);
    }
  };
  const { personalData, email, phone, address } = users;
  // //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();

  // удаление отзыва(только админ)
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteUser } = useMutation(AdminService.deleteUser, {
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
    deleteUser(users._id);
  };
  return (
    <>
      <div className={styles.containerEmail}>
        <AiOutlineMail className={styles.icon1} />
        <div className={styles.label}>
          <div>Почта</div>
          <span>{email}</span>
        </div>
        {show === users._id ? (
          <MdOutlineVisibility
            className={styles.icon2}
            onClick={hiddenBlockHandler}
          />
        ) : (
          <MdOutlineVisibilityOff
            className={styles.icon2}
            onClick={hiddenBlockHandler}
          />
        )}

        <TiDeleteOutline
          className={styles.icon3}
          onClick={() => {
            if (window.confirm(`Вы действительно хотите удалить отзыв`)) {
              removeUser();
            }
          }}
        />
      </div>

      <div
        className={cn({
          [styles.openBlock]: show === users._id,
          [styles.hiddenBlock]: show !== users._id,
        })}
      >
        <div className={styles.container}>
          <BsPerson className={styles.icon1} />
          <div className={styles.label}>
            <div>Имя</div>
            {personalData.name ? (
              <span>{personalData.name}</span>
            ) : (
              <span>-</span>
            )}
          </div>
          <div className={styles.label}>
            <div>Пол</div>
            {personalData?.gender ? (
              <span>{personalData.gender}</span>
            ) : (
              <span>-</span>
            )}
          </div>
          <div className={styles.label}>
            <div>Дата рождения</div>
            {personalData?.birthday ? (
              <span>{personalData.birthday}</span>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
        <div className={styles.container}>
          <BsTelephoneForward className={styles.icon1} />
          <div className={styles.label}>
            <div>Телефон</div>
            {phone?.phone ? (
              <span>{phone.phone}</span>
            ) : (
              <span>+375() --- -- --</span>
            )}
          </div>
        </div>
        <div className={styles.container}>
          <BsHouse className={styles.icon1} />
          <div className={styles.label}>
            <div>Населённый пункт</div>
            {address?.city ? <span>{address.city}</span> : <span>-</span>}
          </div>
          <div className={styles.label}>
            <div>Улица</div>
            {address?.street ? <span>{address.street}</span> : <span>-</span>}
          </div>
          <div className={styles.label}>
            <div>Дом/квартира</div>
            {address?.house ? (
              <>
                <span>{address.house}</span>
                <span>{address.flat && <>/{address.flat}</>}</span>
              </>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserItem;
