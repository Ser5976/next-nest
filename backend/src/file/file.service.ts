import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path'; //библиотека,которая определяет корень проекта(путь)
import { ensureDir, writeFile, remove } from 'fs-extra'; //билиотека,которая облегчает работу с файловой системой
//ensureDir -создает папку если её нету а если папка есть то ничего не делает,writeFile - записывает фай в папку
import * as uuid from 'uuid'; //для создания уникальго имени

@Injectable()
export class FileService {
  // загрузка файла
  async uploadFile(files: Express.Multer.File[]) {
    const uploadFolder = `${path}/uploads`; //определяем путь к  папке upload в которую будем загружать файлы
    await ensureDir(uploadFolder); // создаём папку если её нету
    const filesUrls: string[] = await Promise.all(
      files.map(async (file) => {
        const fileExtension = file.originalname.split('.').pop(); //чтобы вырезать расширение
        const fileName = uuid.v4() + '.' + fileExtension; //создали уникальное имя файла
        await writeFile(`${uploadFolder}/${fileName}`, file.buffer); //записываем в папку  aploads фай и его буфер
        return fileName; //создаём массив из путей к файлу
      }),
    ); //чтобы map был асинхронным помещаем его в промис
    return filesUrls; //возвращаем массив юрлов
  }
  // удаление файла
  async removeFile(dto: { files: string[] | string }) {
    const uploadFolder = `${path}/uploads`; //определяем путь к  папке из которой будем удалять файлы

    if (typeof dto.files !== 'string') {
      await Promise.all(
        dto.files.map(async (file) => {
          await remove(`${uploadFolder}/${file}`);
        }),
      );
    } else {
      const clear = async () => {
        await remove(`${uploadFolder}/${dto.files}`);
      };
      clear();
    }

    return { message: 'файл удалён' };
  }
}
