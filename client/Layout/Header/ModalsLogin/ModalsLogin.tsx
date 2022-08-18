import cn from 'classnames';
import styles from './ModalsLogin.module.css';
import Link from 'next/link';
import { ModalsLoginProps } from './ModalsLogin.props';
import { AiOutlineClose } from 'react-icons/ai';
import { Input } from '../../../components/Input/Input';
import { useRef } from 'react';

export const ModalsLogin = ({
  className,
  showModal,
  setShowModal,
  ...props
}: ModalsLoginProps): JSX.Element => {
  const refModal = useRef<HTMLDivElement>(null);
  // костыль закрытие модального окна снаружи
  const closingOutside = (event: any) => {
    event.preventDefault();
    if (refModal.current && !refModal.current.contains(event.target)) {
      setShowModal(false);
    }
  };
  return (
    <>
      {showModal ? (
        <>
          <div
            onClick={closingOutside}
            className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className=" w-auto ">
              {/*content*/}
              <div
                ref={refModal}
                className="border-0 rounded-lg shadow-lg relative flex flex-col  py-10 px-5 w-[500px] bg-white outline-none focus:outline-none"
              >
                {/*header*/}
                <AiOutlineClose
                  className=" absolute top-2 right-3 hover:cursor-pointer 
                font-medium fill-gray-400 hover:fill-gray-600 w-5 h-5"
                  onClick={() => setShowModal(false)}
                />
                <h3 className="text-lg text-gray-600 font-medium text-center">
                  Вход
                </h3>
                <form className="py-5 px-3 flex flex-col space-y-5 justify-center">
                  <Input type="email" placeholder="email" />
                  <Input type="password" placeholder="password" />
                  <button
                    className="bg-blue-500 w-24  self-center text-white active:bg-blue-600 font-bold 
                   text-base px-6 py-3 rounded shadow hover:shadow-lg outline-none 
                  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Войти
                  </button>
                  <button className=" text-base text-blue-500 hover:text-blue-600">
                    Регистрация
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
