import styles from './Filter.module.css';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { FilterProps } from './Flter.props';
import SliderPrice from '../../../ui/Slider-Price/SliderPrice';
import Brand from './Brand/Brand';
import { useRouter } from 'next/router';
import { createQueryParameters, changingFilterHistory } from './utility'; // безумные костыли,смотри utility

const Filter: FC<FilterProps> = ({
  typeName, //данные по типу
}): JSX.Element => {
  const router = useRouter();
  // переменная флаг нужна  для изменения фильтра при перемещении по истории в странице товаров
  const path = router.asPath;

  // к сожалению для дефолтных значений стейта фильтра испол. локал стор.
  // undef. при первом рендеринге routrer.query  и typeName, пришлось наделать кучу костылей

  //берём данные по фильтраци из localStorage.
  const storagePrice = localStorage.getItem('price');
  const storageCheckBox = localStorage.getItem('checkBox');
  const storageChecked = localStorage.getItem('checked');

  // стейты фильтра
  const [price, setPrice] = useState(
    storagePrice ? JSON.parse(storagePrice) : [0, 10000]
  ); //состояние для выбранного диапазона цен
  const [checkBox, setCheckBox] = useState<string[]>(
    storageCheckBox ? JSON.parse(storageCheckBox) : []
  ); // состояние для выбранных брэндов
  const [checked, setChecked] = useState<{ [key: string]: boolean }>(
    storageChecked ? JSON.parse(storageChecked) : {}
  ); // состояние для управление галочкой(checked)

  //записываем данные по фильтрации в localStorage
  localStorage.setItem('price', JSON.stringify(price));
  localStorage.setItem('checkBox', JSON.stringify(checkBox));
  localStorage.setItem('checked', JSON.stringify(checked));

  //console.log('price:', price);
  // console.log('checked:', checked);

  // создание объекта- аргумент для changingFilterHistory
  const objArguments = {
    query: router.query,
    typeName,
    setPrice,
    setCheckBox,
    setChecked,
  };

  //изменение фильтра при перемещении по истории в странице товаров,см. utility
  //_h изменяется если мы  ходим  по истори в браузере(_h=0 если не переходим на другую страницу,_h=1 если переходим)
  const h = window.history.state.options._h;

  useEffect(() => {
    console.log('useEffect+');
    // очищаем фильтер, когда находимся на корню страницы
    if (path === window.location.pathname) {
      console.log('Работает удаление');
      setPrice([0, 10000]);
      setCheckBox([]);
      setChecked({});
      return;
    }
    // изменения при перемещение по стрелочки браузера
    if (h === 0 || h === 1) {
      changingFilterHistory(objArguments);
    }
  }, [path]);

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
