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

  // удаление типа
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutate: deleteCategory } = useMutation(AdminService.deleteCategory, {
    onSuccess: () => {
      // при успешном изменении делает повторный запрос
      queryClient.invalidateQueries('category product');
      toast.success('Категория удалена');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>{category.name}</div>

        <TiDeleteOutline
          className={styles.icon2}
          onClick={() => {
            if (window.confirm(`Вы действительно хотите удалить категорию`)) {
              deleteCategory(category._id);
            }
          }}
        />
      </div>
    </>
  );
};

export default CategoryProductItem;
