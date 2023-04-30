import styles from './CategoryProductItem.module.css';
import { FC } from 'react';
import { CategoryProductItemProps } from './CategoryProductItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { ICategoryProduct } from '../../../../../store/category-product/interface.categoryProduct';

const CategoryProductItem: FC<CategoryProductItemProps> = ({
  category, // данные категории товара
}): JSX.Element => {
  // //хук useQueryClient, из react-query
  const queryClient = useQueryClient();

  // удаление категории
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteCategory } = useMutation(AdminService.deleteCategory, {
    onSuccess: (data) => {
      // работа с кэшем, что бы не делать новый запрос(костылёк)
      //получаем данные из кэша,удаляем удалённый тип и перезаписываем кэш(фишка изreact-query  )
      queryClient.setQueriesData<ICategoryProduct[] | undefined>(
        'category product',
        (oldQueryData) => {
          const newCach = oldQueryData?.filter(
            (category) => category._id !== data.data._id
          );
          return newCach;
        }
      );
      toast.success('Категория удалена');
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
      <div className={styles.container}>
        <div className={styles.name}>{category.name}</div>

        <TiDeleteOutline
          className={styles.icon2}
          onClick={() => {
            deleteCategory(category._id);
          }}
        />
      </div>
    </>
  );
};

export default CategoryProductItem;
