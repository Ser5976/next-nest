import styles from './ProductModal.module.css';
import { FC } from 'react';
import { ProductModalProps } from './ProductModal.props';
import { TiDeleteOutline } from 'react-icons/ti';
import ProductForm from './Product-Form/ProductForm';

const ProductModal: FC<ProductModalProps> = ({
  show, //маркер открытие модального окна
  setShow, // закрытие модального окна
  categoryProduct, //массив категорий для select
  productType, //массив типов для select
  brands, //массив брэндов для select
  refetch, // из react-query - повторный запрос
  selectedProduct, // данные выбранного товара для формы
  setSelectedProduct, // очистка стейта от выбранного товара
}): JSX.Element | null => {
  //закрывает модальное окно по клику вне формы
  const handlerOnClose = (e: any) => {
    if (e.target.id === 'container') setShow(false);
  };
  // скрывает модальное окно если show false
  if (!show) return null;
  // закрывает модальное окно по крестику и очищает стей от выбранного товара
  const handlerClick = () => {
    setShow(false), setSelectedProduct(null);
  };
  return (
    <div className={styles.container} id="container" onClick={handlerOnClose}>
      <div className={styles.form}>
        <h1 className=" text-lg">Добавить товар</h1>
        <TiDeleteOutline className={styles.icon} onClick={handlerClick} />
        <ProductForm
          categoryProduct={categoryProduct}
          setSelectedProduct={setSelectedProduct}
          brands={brands}
          productType={productType}
          refetch={refetch}
          setShow={setShow}
          selectedProduct={selectedProduct}
        />
      </div>
    </div>
  );
};

export default ProductModal;
