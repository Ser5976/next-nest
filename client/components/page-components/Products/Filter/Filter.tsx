import styles from './Filter.module.css';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { FilterProps } from './Flter.props';
import SliderPrice from '../../../ui/Slider-Price/SliderPrice';
import Brand from './Brand/Brand';
import { useRouter } from 'next/router';
import { createQueryParameters } from './utility'; // безумные костыли,смотри utility
import Characteristics from './Characteristics/Characteristics';

const Filter: FC<FilterProps> = ({
  typeName, //данные по типу
}): JSX.Element => {
  const { query, push } = useRouter();

  // стейты фильтра
  const [price, setPrice] = useState([0, 10000]); //состояние для выбранного диапазона цен
  const [checkBoxB, setCheckBoxB] = useState<string[]>([]); // состояние для выбранных брэндов
  const [checkBoxP, setCheckBoxP] = useState<any[]>([]); // состояние для выбранных брэндов

  //console.log('price:', price);
  console.log('checkBoxP:', checkBoxP);

  // берём данные из адресной строки(URL) при помощи useRouter и записываем в стейты фильтра
  // это даёт возможность отражать актуальное значение фильтров(при перезагруки или переходам по истории)
  //без useEffect никак
  // как всегда не обошлось без костылей
  // т.к. данные по характеристикам в  query приходят динамически(не знаем ключ в объекте )
  // и так же пришлось переделывать структуру данных всё тех же характеристик
  // приходит: пример [{цвет:['чёрный,светло-серый']},{...}]
  // переделываем [{цвет:чёрный},{цвет:свело-серый},{...}]
  useEffect(() => {
    // т.к. мы не знаем какие  данные по характеристикам придут,
    //будем удалять те данные, из объекта query, которые знаем

    //  клонируем query
    /*  const copyQuery: any = {};
    for (const key in query) {
      copyQuery[key] = query[key];
    } */
    const copyQuery = { ...query };

    // работаем с данными, которые мы знаем и последовательно удаляем их из copyQuery
    if (copyQuery.brandId) {
      setCheckBoxB(
        typeof copyQuery.brandId === 'object'
          ? copyQuery.brandId
          : [copyQuery.brandId]
      );
      delete copyQuery.brandId;
    } else {
      setCheckBoxB([]);
    }

    if (copyQuery.minPrice && copyQuery.maxPrice) {
      setPrice([Number(copyQuery.minPrice), Number(copyQuery.maxPrice)]);
      delete copyQuery.minPrice;
      delete copyQuery.maxPrice;
    } else setPrice([0, 10000]);

    delete copyQuery.typeId;
    delete copyQuery.page;
    console.log('copyQuery:', copyQuery);
    // и вот он, костыль!!!
    // делаем проверку в copyQuery, если там что то есть, значит это наши характеристики
    // дальше большая муть по переделки структуры данных
    if (Object.keys(copyQuery).length !== 0) {
      // создаём массив данных ,которые находятся в объекте copyQuery
      const arrProperty: any[] = [];
      for (const key in copyQuery) {
        arrProperty.push({ [key]: copyQuery[key] });
      }
      // переделываем данные
      const newArrProperty: any = [];
      arrProperty.forEach((item) => {
        // добываем название ключей
        const key = Object.keys(item);
        // console.log('Titleeee:', key);
        // console.log('Item:', item);
        // делаем проверку т.к.  может быть и строка
        if (typeof item[key[0]] === 'object') {
          // создаём нужную структуру данных
          item[key[0]].forEach((property: string) => {
            newArrProperty.push({ title: key[0], property });
          });
        } else {
          newArrProperty.push({ title: key[0], property: item[key[0]] });
        }
      });

      setCheckBoxP(newArrProperty);
    } else {
      setCheckBoxP([]);
    }
  }, [query]);

  //флаг, что бы заблокировать кнопку фильтра
  const disabledButton =
    price[0] === 0 &&
    price[1] === 10000 &&
    checkBoxB.length === 0 &&
    checkBoxP.length === 0;

  // console.log('disabled:', disabledButton);

  // отправка параметров в адресную строку для запроса,работа фильтра
  const filterProducts = () => {
    //находим базовый url
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
    // создаём объект, в котором будем формировать search строку, при помощи конструктора(new URL())
    const productsUrl = new URL('products', baseUrl);

    // создаём непосредственно поисковую часть адреса(описание смотри  createQueryParameters)
    const queryParameters = createQueryParameters(
      price,
      checkBoxB,
      checkBoxP,
      productsUrl
    );

    // console.log('queryParameters:', queryParameters.search);

    push(`/products/${typeName?._id}${queryParameters.search}`);
  };

  // очистка формы фильтра, загрузка товаров по типу
  const clearForm = () => {
    setPrice([0, 10000]);
    setCheckBoxB([]);
    setCheckBoxP([]);

    push(`/products/${typeName?._id}`);
  };

  return (
    <div className={styles.filter}>
      <SliderPrice price={price} setPrice={setPrice} />
      <Brand
        typeName={typeName}
        checkBox={checkBoxB}
        setCheckBox={setCheckBoxB}
      />
      <Characteristics
        typeName={typeName}
        checkBox={checkBoxP}
        setCheckBox={setCheckBoxP}
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
