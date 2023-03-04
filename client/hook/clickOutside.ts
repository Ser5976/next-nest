import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface Iout {
  refElement: any;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}
//кастомный хук (используем для закрытия dropdown по клику снаружи)
// ref мы помечаем на элемент
// в useEffect вызывыем вызывыем событие клика по всему документу
// во время клика по всему документу будет срабатывать функция handleClickOutside
// в этой функции устанавливаем условие
//если клик произошёл в любой точке документа, только не там где висит наш ref,условие срабатывает
// дальше используем возможности useEffect, при зармонтирование компонента удаляем событие
export const useClickOutside = (initialIsVisible: boolean): Iout => {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const refElement = useRef<HTMLElement>(null);

  // console.log('ref:', !!refElement.current);
  const handleClickOutside = (event: any) => {
    // console.log('ref2:', event.target.id);
    // console.log('ref3:', refElement.current?.contains(event.target));

    if (refElement.current && !refElement.current.contains(event.target)) {
      setIsShow(true);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return { refElement, isShow, setIsShow };
};
