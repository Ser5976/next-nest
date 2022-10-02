import styles from './ProductTypes.module.css';
import { FC } from 'react';
import { ProductTypeProps } from './ProductTypes.props';
import { useRouter } from 'next/router';

const ProductTypes: FC<ProductTypeProps> = ({
  product, //объект с массивом продуктов, количеством продуктов,количеством страниц
  productType, // массив типов товара
  type, //id типа товара, выбранного из адресной строки
}): JSX.Element => {
  const router = useRouter();
  // console.log(router);

  // console.log(router.query.filter);
  //маленький кастылек для вывода названия типа товаров
  const typeName = productType?.find((el) => el._id === type);
  return (
    <div>
      <h1>Типы</h1>
      <h1>{typeName?.name}</h1>
      <div>
        {product.allProduct?.map((p) => {
          return <div key={p._id}>{p.name}</div>;
        })}
      </div>
    </div>
  );
};

export default ProductTypes;
