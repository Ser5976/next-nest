import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdatePepsonalDataDto } from './dto/update-personaldata.dto';
import { User } from './../user/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { PersonalDataService } from './personal-data.service';
import { Body, Controller, Put } from '@nestjs/common';

@Controller('personal-data')
export class PersonalDataController {
  constructor(private readonly PersonalDataService: PersonalDataService) {}
  //редактирование данных пользователя
  @Put()
  @Auth()
  async updatePersonalData(
    @User('_id') _id: string,
    @Body() dto: UpdatePepsonalDataDto,
  ) {
    return this.PersonalDataService.updatePersonalData(_id, dto);
  }
  //редактирование телефонного номера
  @Put('phone')
  @Auth()
  async updatePhoneNumber(
    @User('_id') _id: string,
    @Body() dto: UpdatePhoneDto,
  ) {
    return this.PersonalDataService.updatePhoneNumber(_id, dto);
  }
  //редактирование адреса
  @Put('address')
  @Auth()
  async updateAddress(@User('_id') _id: string, @Body() dto: UpdateAddressDto) {
    return this.PersonalDataService.updateAddress(_id, dto);
  }
}
