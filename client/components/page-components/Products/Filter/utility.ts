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
