export const brandIdHandler = (brandId: string | string[] | undefined) => {
  let arrayBrandId: string[] = [];
  if (typeof brandId === 'object') {
    arrayBrandId = [...brandId];
  }
  const brandIdQuery = arrayBrandId.map((id) => {
    return new URLSearchParams({ brandId: id });
  });
  return `&${brandIdQuery.toString().replaceAll(',', '&')}`;
};
/*
 //при помощи window.location.search получаем параметры запроса из адресной сторки(всё ,что после вопроса)
    // при помощи конструктора new URLSearchParams обрабатываем их
    // при помощи Object.fromEntries трансформируем их в объект
    const objectQuery = {
      ...Object.fromEntries(new URLSearchParams(window.location.search)),
    };
    //если brandId это массив значений то удаляем brandId изo bjectQuery  т.к URLSearchParams
    //не формирует значение в массив, а добвляет только последнее значение
    if (typeof query.brandId === 'object') {
      delete objectQuery.brandId;
    }
    //добавляем brandId  вручную  берём массив из query.brandId , из роутера.
    //но чтобы превратить query.brandId в строку параметров пришлось наворатить кучу говна
    // костыль brandIdHandler, который возращает строку параметров из brandId, если он массив.

    // меняем номер страницы
    objectQuery.page = event?.selected + 1;

    //при помощи конструктора new URLSearchParams трансформируем наш объект обратно параметры запроса
    //  console.log('brandIdHandler :', brandIdHandler(query.brandId));
    const params = new URLSearchParams(objectQuery);

/* ?${params.toString()}${brandIdHandler(
        query.brandId
      )}` */

/*
      
       //формируем объек запроса
  //при помощи window.location.search получаем параметры запроса из адресной сторки(всё ,что после вопроса)
  // при помощи конструктора new URLSearchParams обрабатываем их
  // при помощи Object.fromEntries трансформируем их в объект
  // и добавляем в наш объект
  const objectQuery: any = {
     typeId,
    page,
    limit,
    // ...Object.fromEntries(new URLSearchParams(window.location.search)),
    
  };
  //добавляем brandId  вручную т.к. если у него  будет несколько значений
  //URLSearchParams не формирует значение в массив, а query, из роутера, формирует
  /* if (typeof query.brandId === 'object') {
    objectQuery.brandId = query.brandId;
  } */
