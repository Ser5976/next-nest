import styles from './BrandItem.module.css';
import { FC } from 'react';
import { BrandItemProps } from './BrandItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { IBrand } from '../../../../../store/category-product/interface.categoryProduct';

const BrandItem: FC<BrandItemProps> = ({ brand }): JSX.Element => {
  // //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();

  // удаление типа
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteBrand } = useMutation(AdminService.deleteBrand, {
    onSuccess: (data) => {
      // работа с кэшем, что бы не делать новый запрос(кастылёк)
      //получаем данные из кэша,удаляем удалённый тип и перезаписываем кэш(фишка изreact-query  )
      queryClient.setQueriesData<IBrand[] | undefined>(
        'brand',
        (oldQueryData) => {
          const newCach = oldQueryData?.filter(
            (category) => category._id !== data.data._id
          );
          return newCach;
        }
      );
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message);
    },
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>{brand.name}</div>

        <TiDeleteOutline
          className={styles.icon2}
          onClick={() => {
            deleteBrand(brand._id);
          }}
        />
      </div>
    </>
  );
};

export default BrandItem;
