import { InputFileProps } from './InputFile.props';
import cn from 'classnames';
import styles from './InputFile.module.css';
import { useUploadFile } from '../useUploadFile';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

// Кастомный input type='file' предназначенные для react hook form
export const InputFile: FC<InputFileProps> = ({
  error, // ошибка из react hook form
  multiple = false, //чтобы загружать несколько файлов
  isEditing = false, //если у нас есть текущий фал(а это бывает при редактировании файла),
  //то передаём его,чтобы соединить с выбранным (для useUploadFile)
  setValue, //метод из react hook form(для изменения value)
  onChange, //метод из react hook form(для useUploadFile,который записывает в react hook form url файла )
  name, // название поля из react hook form для setValue
  image, // value из react hook form(url файла)
}): JSX.Element => {
  // собственный стейт,куда мы кладём данные из value react hook form, чтобы ими манипулировать
  const [dataFromValue, setDataFromValue] = useState<string[] | undefined | []>(
    undefined
  );
  console.log('image, inputFile:', image);
  console.log('dataFromValue, inputFile:', dataFromValue);
  //помогает открыть инпут,т.к. мы его сделали невидимым
  const inputRef = useRef<any>();

  // чтобы перерендерить при изменении value
  useEffect(() => {
    console.log('эффект inputFile работает ');
    setDataFromValue(image);
  }, [image]);

  //кастомный хук(см.'../useUploadFile')
  const { uploadImage, removeUrlFolder } = useUploadFile(
    onChange,
    dataFromValue
  );

  //для удаления выбранных картинок,setValue для изменения value в react hook form
  const handleClick = (file: string) => {
    if (dataFromValue?.length === 1) {
      setValue(name, undefined);
      setDataFromValue(undefined);
    } else {
      const newValue = dataFromValue?.filter((item) => item !== file);
      setValue(name, newValue);
    }

    removeUrlFolder(file);
  };
  // костыль для блокировки инпута,чтобы нельзя было выбрать более 2-х файлов
  // нужно там где не нужно выбрать больше одного фалы
  // почему тогда 2? просто уже установил yup, написал костыли для ошибок, короче чисто для примера
  const disabled =
    !multiple && (dataFromValue ? dataFromValue.length === 2 : false);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.wrapperInput}
        onClick={() => inputRef.current.click()}
      >
        <div
          className={cn({
            [styles.button]: !disabled,
            [styles.disabledButton]: disabled,
          })}
        >
          {' '}
          Выберите файл
        </div>
        <input
          disabled={disabled}
          multiple={multiple}
          type="file"
          onChange={uploadImage}
          ref={inputRef}
          accept="image/*"
        />
        {error && <div className={styles.error}>{error.message}</div>}
      </div>

      {dataFromValue && dataFromValue.length !== 0 ? (
        <div className={styles.wrapperIgm}>
          {dataFromValue.map((file) => {
            return (
              <div key={file} className={styles.img}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}/${file}`}
                  alt=""
                  objectFit="contain"
                  unoptimized
                  priority
                  width={100}
                  height={75}
                />
                {/* делаем проверку, если это редактирование и остался последний фал, запрещаем его удалять,
                т.к автоматически включиться дефолтное состояние,в котором находятся все неизменённые файлы */}
                {isEditing && dataFromValue.length === 1 ? null : (
                  <TiDeleteOutline
                    className={styles.icon}
                    onClick={() => {
                      handleClick(file);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.text}> Файл не добавлен</div>
      )}
    </div>
  );
};

InputFile.displayName = 'Input'; // это чтобы build не ругался
