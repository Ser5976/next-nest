import { IType } from './../../../../store/type-product/interface.typeProduct';
import { ParsedUrlQuery } from 'querystring';
import { Dispatch, SetStateAction } from 'react';

// создаём непосредственно поисковую часть адреса, т.е. мы вносим данные в свойтво search ,
//который находится в объекте productsUrl
//все данные записываются в строку как query параметры(?свойство=значение&)
// а потом мы берём эти данные productsUrl.search и вставляем в адресную строку

export const createQueryParameters = (
  dataPrice: number[],
  dataCheckBox: string[],
  productsUrl: URL
) => {
  if (dataPrice[0] > 0 || dataPrice[1] < 10000) {
    productsUrl.searchParams.append('minPrice', String(dataPrice[0]));
    productsUrl.searchParams.append('maxPrice', String(dataPrice[1]));
  }
  if (dataCheckBox.length > 0) {
    dataCheckBox.map((id) => {
      return productsUrl.searchParams.append('brandId', id);
    });
  }

  return productsUrl;
};

interface IObjArguments {
  query: ParsedUrlQuery;
  typeName: IType | undefined;
  setPrice: Dispatch<SetStateAction<number[]>>;
  setCheckBox: Dispatch<SetStateAction<string[]>>;
  setChecked: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

// костыль для изменения фильтра при перемещении по истории в странице товаров, сорян за муть,как мог
export const changingFilterHistory = (objArguments: IObjArguments) => {
  const { query, setPrice, setCheckBox, typeName, setChecked } = objArguments;
  console.log('Работает история');
  //делаем проверку а потом изменяем цену
  if (query.minPrice && query.maxPrice) {
    setPrice([Number(query.minPrice), Number(query.maxPrice)]);
  } else {
    setPrice([0, 10000]);
  }
  // здесь работаем с брэндами и у нас может быть в значении массив
  // поэтому перезаписываем объект query т.к. типизация не дает мапить массив
  // ну и мутим дальше c CheckBox и Checked
  if (query.brandId) {
    let objQuery: any = {};
    for (const key in query) {
      objQuery[key] = query[key];
    }
    //изменяем CheckBox
    typeof objQuery.brandId === 'object'
      ? setCheckBox([...objQuery.brandId])
      : setCheckBox([objQuery.brandId]);

    // изменения данных  для checked,здесь немножко посложней
    let checked = {};
    if (typeof objQuery.brandId === 'object') {
      // получаем по id брэнда полные данные по этому брэнду( нам нужно только name)

      const selectedBrand = objQuery.brandId?.map((b: any) => {
        return typeName?.brand.find((s) => s._id === b);
      });
      //дальше групируем объект из name и булевого значения-true
      selectedBrand?.forEach((element: any) => {
        checked = { ...checked, [element.name]: true };
      });
      setChecked(checked);
    } else {
      const selectedBrand: any = typeName?.brand.find(
        (b) => b._id === objQuery.brandId
      );
      setChecked({ [selectedBrand?.name]: true });
    }
  } else {
    setCheckBox([]);
    setChecked({});
  }
};

/* export const defaultPrice = (query: any) => {
  let price = [0, 10000];
  if (query.minPrice && query.maxPrice) {
    price = [Number(query.minPrice), Number(query.maxPrice)];
  }
  return price;
};
export const defaultCheckBox = (query: any) => {
  let checkBox: string | string[] = [];
  if (query.brandId) {
    if (typeof query.brandId === 'object') {
      checkBox = [...query.brandId];
    }
    checkBox = [query.brandId];
  }
  return checkBox;
};
// получение дефолтных дынных для checked,здесь немножко посложней
//1. получаем по id брэнда полные данные по этому брэнду( нам нужно только имя)
//2. дальше групируем объект из имени и булевого значения-true
export const defaultChecked = (query: any, typeName: IType | undefined) => {
  let checked = {};
  if (query.brandId) {
    if (typeof query.brandId === 'object') {
      // если массив id
      // получаем массив брэндов(с именами)
      const selectedBrand = query.brandId?.map((b: any) => {
        return typeName?.brand.find((s) => s._id === b);
      });
      // формируем объект
      selectedBrand?.forEach((element: any) => {
        checked = { ...checked, [element.name]: true };
      });
    }
    //если один id
    const selectedBrand: any = typeName?.brand.find(
      (b) => b._id === query.brandId
    );
    checked = { [selectedBrand?.name]: true };
  }
  console.log('defaultChecked:', checked);
  return checked;
};

/* // а это костыль помогает нам  задать динамическое дефолтное значение({ имя брэнда:false}) в состоянии checetd
// которое мы используем для очистки checetd(снятие галочки),мы делаем его управляемым
// если был просто пустой объект то реакт ругался бы
// здесь из массива брэндов делаем объек с имя брэнда:false
export const handlerChecked = (typeName: IType | undefined) => {
  let objName: { [key: string]: boolean } = {};
  typeName?.brand?.map((b) => {
    objName[b.name] = false;
  });
  return objName;
}; */

//безумный костыль для перевода данных из price и checkBox в поисковую строку при помощи new URLSearchParams
// можно было бы сделать как в пагинации через  new URL (так проще и короче),но оставлю так(пример с new URLSearchParams )
// если буте много параметров то нужно делать  через new URL, чтобы не писать кучу условий
/* export const handlerFilter = (dataPrice: number[], dataCheckBox: string[]) => {
  let priceQuery, checkBoxQuery;
  if (dataPrice[0] > 0 || dataPrice[1] < 10000) {
    priceQuery = new URLSearchParams({
      minPrice: String(dataPrice[0]),
      maxPrice: String(dataPrice[1]),
    }).toString();
  }
  if (dataCheckBox.length > 0) {
    const arrayQuery = dataCheckBox.map((id) => {
      return new URLSearchParams({ brandId: id });
    });
    checkBoxQuery = arrayQuery.toString().replaceAll(',', '&');
  }

  return { price: priceQuery, checkBox: checkBoxQuery };
};
// а это костыль формирование итоговой поисковой строки
export const selectPath = (data: {
  price: string | undefined;
  checkBox: string | undefined;
}) => {
  if (data.price && data.checkBox) {
    return `${data.price}&${data.checkBox}`;
  }
  if (data.price) {
    return data.price;
  }
  if (data.checkBox) {
    return data.checkBox;
  }
};
 */
