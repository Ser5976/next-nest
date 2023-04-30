import styles from './ProductItem.module.css';
import { FC } from 'react';
import { ProductItemProps } from './ProductItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { VscEdit } from 'react-icons/vsc';

const ProductItem: FC<ProductItemProps> = ({
  product, // данные выбранного товара
  refetch, // из react-query - повторный запрос
  setShow, // закрытие модального окна
  setSelectedProduct, //сохраняем выбранную новость в стэйт для, редактирования в Product-Form
}): JSX.Element => {
  // удаление товара
  // подключаем хук useMutation() из react-query,он посылает post,put,delete запросы
  const { mutate: deleteProduct } = useMutation(AdminService.deleteProduct, {
    onSuccess: () => {
      // при успешном изменении делаем повторный запрос
      // из-за долбанного window.confirm херова работает queryClient.invalidateQueries(не всегда срабатывает)
      // поэтому- refetch
      refetch();
      toast.success('Товар удалена');
    },
    onError: (error: any) => {
      //здесь показываем ошибку только когда это не 'Unauthorized',
      //при 'Unauthorized' отработает AuthProvider
      if(error.response.data.message !== 'Unauthorized'){
        toast.error('товар не удалён что-то пошло не так');
      }
    },
  });

  // удаление изображения (url из папки uploads)
  const { mutate: removeUrl } = useMutation(AdminService.removeUrl, {
    onSuccess: () => {
      toast.success('Изображение удалено из папки uploads ');
    },
    onError: (error: any) => {
      if(error.response.data.message !== 'Unauthorized'){
        toast.error('изображение не удалено что-то пошло не так');
      }
    },
  });
  // запуск удаление изабражения из базы и папки uploads
  const startDeleteImage = (productId: string, url: string[]) => {
    // удаление изображения(url из базы)
    deleteProduct(productId);
    // удаление изображения (url из папки uploads)
    removeUrl(url);
  };
  //открывает модальное окно с формой и посылает данные по выбранному товару в стейт
  const editHandler = () => {
    setShow(true);
    setSelectedProduct(product);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>{product.name}</div>

        <VscEdit className={styles.icon1} onClick={editHandler} />

        <TiDeleteOutline
          className={styles.icon2}
          onClick={() => {
            if (window.confirm(`Вы действительно хотите удалить товар`)) {
              startDeleteImage(product._id, product.files);
            }
          }}
        />
      </div>
    </>
  );
};

export default ProductItem;
