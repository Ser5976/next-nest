import styles from './CategoryProductItem.module.css';
import { FC } from 'react';
import { CategoryProductItemProps } from './CategoryProductItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';

const CategoryProductItem: FC<CategoryProductItemProps> = ({
  category,
}): JSX.Element => {
  // //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();

  // удаление категории
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutateAsync: deleteCategory } = useMutation(
    AdminService.deleteCategory,
    {
      onSuccess: (data) => {
        toast.success(data?.data.message);
        queryClient.invalidateQueries('category product');
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const removeCategory = async () => {
    await deleteCategory(category._id);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>{category.name}</div>

        <TiDeleteOutline
          className={styles.icon2}
          onClick={() => {
            if (window.confirm(`Вы действительно хотите удалить категорию`)) {
              removeCategory();
            }
          }}
        />
      </div>
    </>
  );
};

export default CategoryProductItem;
