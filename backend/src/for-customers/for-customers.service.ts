import { ForCustomersDto } from './dto/for-customers.dto';
import { ForCustomersModel } from './for-customers.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class ForCustomersService {
  constructor(
    @InjectModel(ForCustomersModel)
    private readonly ForCustomersModel: ModelType<ForCustomersModel>,
  ) {}
  //создание данных
  async createData(dto: ForCustomersDto) {
    const data = await this.ForCustomersModel.create(dto);
    if (!data)
      throw new NotFoundException('Что то пошло не так,данные не созданы');
    return data;
  }
  // получение  всех данных
  async getAllData() {
    const data = await this.ForCustomersModel.find();
    if (!data)
      throw new NotFoundException('Что то пошло не так,данные не получены');
    return data;
  }
  // получение данных
  async getData(slug: string) {
    const data = await this.ForCustomersModel.findOne({ slug: slug });
    if (!data)
      throw new NotFoundException('Что то пошло не так,данные не получены');
    return data;
  }
  // редактирование данных
  async updateData(id: string, dto: ForCustomersDto) {
    const newData = await this.ForCustomersModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!newData)
      throw new NotFoundException(
        'Что то пошло не так,данные не отредактированы',
      );
    return newData;
  }
  // удаление данных
  async deleteData(id: string) {
    const deleteData = await this.ForCustomersModel.findByIdAndDelete(id);
    if (!deleteData)
      throw new NotFoundException('Что то пошло не так,данные не удалены');
    return { message: 'Данные удалены' };
  }
}
