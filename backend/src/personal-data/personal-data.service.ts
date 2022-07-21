import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdatePepsonalDataDto } from './dto/update-personaldata.dto';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class PersonalDataService {
  constructor(
    @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
  ) {}
  // редактируем персональные данные пользователя
  async updatePersonalData(id: string, dto: UpdatePepsonalDataDto) {
    const personalData = await this.UserModel.findByIdAndUpdate(id, {
      personalData: dto,
    });
    if (personalData) return { message: 'Редактирование прошло успешно' };
    throw new Error('Редактирование не вышло');
  }
  // редактируем телефонный номер
  async updatePhoneNumber(id: string, dto: UpdatePhoneDto) {
    const phone = await this.UserModel.findByIdAndUpdate(id, {
      phone: dto,
    });
    if (phone) return { message: 'Редактирование прошло успешно' };

    throw new Error('Редактирование не вышло');
  }
  // редактируем адрес
  async updateAddress(id: string, dto: UpdateAddressDto) {
    const address = await this.UserModel.findByIdAndUpdate(id, {
      address: dto,
    });
    if (address) return { message: 'Редактирование прошло успешно' };

    throw new Error('Редактирование не вышло');
  }
}
