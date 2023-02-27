import { useEffect, useState } from 'react';

//кастомный хук для задержки времени передачи данных из инпута поиска пользователя в запрос useQuery
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // данные из инпута поиска передаем в value , подключаем setTimeout() для задержки времени и возращаем данные назад

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // это для удаления setTimeout() при завершении жизненного цикла компонента
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
