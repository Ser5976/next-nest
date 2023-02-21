import styles from './ProductTypeItem.module.css';
import { FC } from 'react';
import { ProductTypeItemProps } from './ProductTypeItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { IType } from '../../../../../store/type-product/interface.typeProduct';

const ProductTypeItem: FC<ProductTypeItemProps> = ({ type }): JSX.Element => {
  //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();

  // удаление типа
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteType } = useMutation(AdminService.deleteType, {
    onSuccess: (data) => {
      // работа с кэшем, что бы не делать новый запрос(кастылёк)
      //получаем данные из кэша,удаляем удалённый тип и перезаписываем кэш(фишка из react-query  )
      queryClient.setQueriesData<IType[] | undefined>(
        'product type',
        (oldQueryData) => {
          const newCach = oldQueryData?.filter(
            (type) => type._id !== data.data._id
          );
          return newCach;
        }
      );
      toast.success('Тип продукта удалён');
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message);
    },
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>{type.name}</div>

        <TiDeleteOutline
          className={styles.icon2}
          onClick={() => {
            deleteType(type._id);
          }}
        />
      </div>
    </>
  );
};

export default ProductTypeItem;
