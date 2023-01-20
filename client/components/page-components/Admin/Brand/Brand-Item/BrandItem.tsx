import styles from './BrandItem.module.css';
import { FC } from 'react';
import { BrandItemProps } from './BrandItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';

const BrandItem: FC<BrandItemProps> = ({ brand }): JSX.Element => {
  // //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();

  // удаление типа
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutateAsync: deleteBrand } = useMutation(AdminService.deleteBrand, {
    onSuccess: (data) => {
      /* const cach = queryClient.getQueryData<ITypes>('product type');
       // работа с кэшем, что бы не делать новый запрос(кастылёк)
      //получаем данные из кэша,удаляем удалённый типи и перезаписываем кэш
      queryClient.setQueriesData('product type', (oldQueryData: any) => {
        const newCount = oldQueryData.count - 1;
        const newType = oldQueryData?.productsTypes.filter(
          (f: any) => f._id !== data.data._id
        );
        const newCach = {
          ...oldQueryData,
          count: newCount,
          productsTypes: newType,
        };
        //console.log('Новый Кэш:', newCach);
        return newCach; 
      });*/
      queryClient.invalidateQueries('brand');
      toast.success('Тип продукта удалён');
      //console.log('Кэш:', cach);
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
            if (window.confirm(`Вы действительно хотите удалить категорию`)) {
              deleteBrand(brand._id);
            }
          }}
        />
      </div>
    </>
  );
};

export default BrandItem;
