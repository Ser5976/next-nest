import styles from './Filter.module.css';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { FilterProps } from './Flter.props';
import SliderPrice from '../../../ui/Slider-Price/SliderPrice';
import Brand from './Brand/Brand';
import { useRouter } from 'next/router';
import { createQueryParameters } from './utility'; // безумные костыли,смотри utility

const Filter: FC<FilterProps> = ({
  typeName, //данные по типу
}): JSX.Element => {
  const router = useRouter();

  // стейты фильтра
  const [price, setPrice] = useState([0, 10000]); //состояние для выбранного диапазона цен
  const [checkBox, setCheckBox] = useState<string[]>([]); // состояние для выбранных брэндов

  //console.log('price:', price);
  // console.log('checked:', checked);

  // берём данные из адресной строки(URL) при помощи useRouter и записываем в стейты фильтра
  // это даёт возможность отражать актуальное значение фильтров(при перезагруке или переходам по истории)
  //без useEffect никак
  useEffect(() => {
    // console.log('query effect:', router.query);
    if (router.query.brandId) {
      setCheckBox(
        typeof router.query.brandId === 'object'
          ? router.query.brandId
          : [router.query.brandId]
      );
    } else {
      setCheckBox([]);
    }
    if (router.query.minPrice && router.query.maxPrice) {
      setPrice([Number(router.query.minPrice), Number(router.query.maxPrice)]);
    } else setPrice([0, 10000]);
  }, [router.query]);

  //флаг, что бы заблокировать кнопку фильтра
  const disabledButton =
    price[0] === 0 && price[1] === 10000 && checkBox.length === 0;

  // console.log('disabled:', disabledButton);

  // отправка параметров в адресную строку для запроса,работа фильтра
  const filterProducts = () => {
    //находим базовый url
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
    // создаём объект, в котором будем формировать search строку, при помощи конструктора(new URL())
    const productsUrl = new URL('products', baseUrl);

    // создаём непосредственно поисковую часть адреса(описание смотри  createQueryParameters)
    const queryParameters = createQueryParameters(price, checkBox, productsUrl);

    // console.log('queryParameters:', queryParameters.search);

    router.push(`/products/${typeName?._id}${queryParameters.search}`);
  };

  // очистка формы фильтра, загрузка товаров по типу
  const clearForm = () => {
    setPrice([0, 10000]);
    setCheckBox([]);

    router.push(`/products/${typeName?._id}`);
  };

  return (
    <div className={styles.filter}>
      <SliderPrice price={price} setPrice={setPrice} />
      <Brand
        typeName={typeName}
        checkBox={checkBox}
        setCheckBox={setCheckBox}
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
