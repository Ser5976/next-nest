import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface Iout {
  ref: any;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}
//кастомный хук (используем для закрытия dropdown по клику снаружи)
export const useClickOutside = (initialIsVisible: boolean): Iout => {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = (event: any) => {
    // if (event.path[0] !== ref.current) такой вариант работает, но есть варианты когда косячит
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShow(true);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return { ref, isShow, setIsShow };
};
