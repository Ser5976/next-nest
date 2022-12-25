import { toast } from 'react-toastify';
import { AdminService } from './admin.service';
import { UseMutateFunction, useMutation } from 'react-query';
import { ChangeEvent } from 'react';

//кастомный хук,который последовательно отправляет файл изображения в базу в сущность flie,
//где  из файла создаётся и возвращается  имя файла с расширением в виде строки,
//а также записывается имя файла с расширением в виде строки в специальную папку uploads(как url)
//дальше полученное имя файла с расширением в виде строки записываем в другую сущьность в базе slider или др
// ну а потом при получениии данных о имени файла изображения из папки uploads находится нужный url

type TypeUpload = (onChange: (...event: any) => void) => {
  uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  removeUrlFolder: UseMutateFunction<void, any, string, unknown>;
};

export const useUploadFile: TypeUpload = (onChange) => {
  // посылаем файл на сервак и получаем имя файла с расширением в виде массива строк
  // и отдаём это в  onChange(из react hook form),а тот отдаст на запись в базу данных
  const { mutate: upload } = useMutation(AdminService.uploadImage, {
    onSuccess: (data) => {
      onChange(data);
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
