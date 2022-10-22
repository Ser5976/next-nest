import { IType } from './../../../../store/type-product/interface.typeProduct';

//безумный костыль для перевода данных из price и checkBox в поисковую строку

export const handlerFilter = (dataPrice: number[], dataCheckBox: string[]) => {
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
};
 */
