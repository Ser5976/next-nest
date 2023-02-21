import { toast } from 'react-toastify';
import { AdminService } from './admin.service';
import { UseMutateFunction, useMutation } from 'react-query';
import { ChangeEvent, useEffect, useState } from 'react';

// Этот хук можно использовать в input type='file',которой в свою очередь используется в react hook form
// он работает с серваком с одной стороны и react hook form с другой
//кастомный хук(используем react-query  ),который последовательно отправляет файл изображения на сервер
//(при помощи useMutation(upload)),
//где  из файла создаётся и возвращается  имя файла с расширением в виде строки,
//а также записывается имя файла с расширением в виде строки в специальную папку uploads(как url)
//дальше полученное имя файла с расширением в виде строки передаётся в react hook form, при помощие его onChange
// если в react hook form имеется файл(что происхдит редактировании, передаем в currentFile),
//то мы их объеденяем с выбранным файлом и передаем в onChange
//  так же в этом хуке при помощи useMutation(removeUrlFolder) удаляем файл из папки uploads(это делает сервак )

// прикольно затипизировали функцию
type TypeUpload = (
  onChange: (...event: any) => void, // метод из react hook form
  currentFile: string[] | [] | undefined // если есть файл в react hook form, то будет здесь
) => {
  uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  removeUrlFolder: UseMutateFunction<void, any, string | string[], unknown>;
};

export const useUploadFile: TypeUpload = (onChange, currentFile) => {
  //состояние хранит информацию о уже имеющемся файле(если он есть,то он придёт из InputFile), и накапливает выбранные файлы
  const [selectedFiles, setSelectedFiles] = useState<string[] | [] | undefined>(
    currentFile
  );
  // для актуальности
  useEffect(() => {
    setSelectedFiles(currentFile);
  }, [currentFile]);

  console.log('файл из стейта:', selectedFiles);
  // посылаем файл на сервак и получаем имя файла с расширением в виде массива строк
  // и отдаём это в  onChange(из react hook form),а тот отдаст на запись в базу данных
  const { mutate: upload } = useMutation(AdminService.uploadImage, {
    onSuccess: (data) => {
      // условие для объединения файлов
      if (selectedFiles) {
        onChange([...selectedFiles, ...data]);
      } else {
        onChange(data);
      }
    },
    onError: (error: any) => {
      toast.error('Файл не загрузился,что-то пошло не так');
    },
  });
  // создаём функцию,которая будет брать файл из инпута(input type='file') и передавать useMutation
  // для отправки файла на сервак, делаем её асинхронной
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      // создаём специальный объект formData(), с его помощью цикла for(т.к. из инпута приходит FileList)
      //отправляем массив файлов в useMutation
      const formData = new FormData();
      for (let i = 0; i < files?.length; i++) {
        formData.append('files', files[i]);
      }
      await upload(formData);
    }
  };
  //useMutation удаление изображения (url из папки uploads)
  const { mutate: removeUrlFolder } = useMutation(AdminService.removeUrl, {
    onSuccess: () => {
      // toast.success('изображение удалено из папки uploads ');
    },
    onError: (error: any) => {
      toast.error('Изображение  не удалёно,что-то пошло не так');
    },
  });
  return { uploadImage, removeUrlFolder };
};
