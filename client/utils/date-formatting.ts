import moment from 'moment'; //библиотека по форматированию даты
import 'moment/locale/ru';

//форматирование даты
export const dateFormatting = (date: string) => {
  const newDate = moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY');
  return newDate;
};
