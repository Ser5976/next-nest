import styles from './Filter.module.css';
import cn from 'classnames';
import { FC, useState } from 'react';
import { FilterProps } from './Flter.props';
import SliderPrice from '../../../ui/Slider-Price/SliderPrice';
import Brand from './Brand/Brand';
import { useRouter } from 'next/router';
import { handlerFilter, selectPath } from './utility'; //безумные костыли,смотри utility

const Filter: FC<FilterProps> = ({ typeName }): JSX.Element => {
  const router = useRouter();
  const [price, setPrice] = useState([0, 10000]); //состояние для выбранного диапазона цен
  const [checkBox, setCheckBox] = useState<string[]>([]); // состояние для выбранных брэндов
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({}); //для управление галочкой(checked)

  //console.log('price:', price);
  console.log('checked:', checked);

  // что бы заблокировать кнопку
  const disabledButton =
    price[0] === 0 && price[1] === 10000 && checkBox.length === 0;

  // console.log('disabled:', disabledButton);
  // отправка параметров в адресную строку для запроса
  const filterProducts = () => {
    // console.log(handlerFilter(price, checked));

    const objParameters = handlerFilter(price, checkBox);
    let filterUrl = selectPath(objParameters);

    // console.log('filterUrl:', filterUrl);

    router.push(`/products/${typeName?._id}?${filterUrl}`);
  };
  // очистка формы фильтра, загрузка товаров по типу
  const clearForm = () => {
    setPrice([0, 10000]);
    setCheckBox([]);
    setChecked({});
    router.push(`/products/${typeName?._id}`);
  };
  return (
    <div className={styles.filter}>
      <SliderPrice price={price} setPrice={setPrice} />
      <Brand
        typeName={typeName}
        checkBox={checkBox}
        setCheckBox={setCheckBox}
        checked={checked}
        setChecked={setChecked}
      />
      <button
        className={cn(styles.button, {
          [styles.disabled]: disabledButton,
          [styles.buttonActive]: !disabledButton,
        })}
        onClick={filterProducts}
        disabled={disabledButton}
      >
        Показать товары
      </button>
      {!disabledButton && (
        <div className={styles.link} onClick={clearForm}>
          Очистить форму
        </div>
      )}
    </div>
  );
};

export default Filter;
