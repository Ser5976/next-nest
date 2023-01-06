import { InputFileProps } from './InputFile.props';
import styles from './InputFile.module.css';
import { useUploadFile } from '../useUploadFile';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

export const InputFile: FC<InputFileProps> = ({
  error,
  onChange, //метод из react hook form(для useUploadFile,который записывает в react hook form url файла )
  image, // value из react hook form(url файла)
}): JSX.Element => {
  const [value, setValue] = useState<string[] | undefined | []>(undefined);
  const inputRef = useRef<any>(); //помогает открыть инпут,т.к. мы его сделали невидимым
  useEffect(() => {
    setValue(image);
  }, [image]);
  const { uploadImage, removeUrlFolder } = useUploadFile(onChange);
  // console.log('URL:', value);

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={styles.wrapperInput}
          onClick={() => inputRef.current.click()}
        >
          <div className={styles.button}> Выберите файл</div>
          <input
            type="file"
            onChange={uploadImage}
            ref={inputRef}
            accept="image/*"
          />
          {error && <div className={styles.error}>{error.message}</div>}
        </div>

        {value ? (
          <div className={styles.wrapperIgm}>
            <div className={styles.img}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DOMAIN}/${value[0]}`}
                alt=""
                objectFit="contain"
                unoptimized
                priority
                width={100}
                height={75}
              />
              <TiDeleteOutline
                className={styles.icon}
                onClick={() => {
                  setValue(undefined);
                  removeUrlFolder(value[0]);
                }}
              />
            </div>
          </div>
        ) : (
          <div className={styles.text}> Файл не добавлен</div>
        )}
      </div>
      
    </>
  );
};

InputFile.displayName = 'Input'; // это чтобы build не ругался
