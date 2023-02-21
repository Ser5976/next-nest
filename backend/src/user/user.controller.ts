import { UpdatePasswordDto } from './dto/update.password.dto';
import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { UpdateEmailDto } from './dto/update.email.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service';
import { SearchDto } from './dto/search.dto';

@Controller('users')
export class UserController {
  constructor(private readonly UserServies: UserService) {}
  // получение пользователя
  @Get('profileUser')
  @Auth() //кастомный декоратор,навешиваем на эндпойнты на которые могут зайти только авторизованные пользователи,
  //а если передаем админ то только админы
  //@User тоже кастомный декоратор для получения юзера, только когда мы авторизованы
  async getProfile(@User('_id') _id: string) {
    return this.UserServies.byId(_id);
  }
  // редактирование email
  @UsePipes(new ValidationPipe()) //валидация dto
  @Put('email')
  @HttpCode(200)
  @Auth()
  async updateProfileUser(
    @User('_id') _id,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return this.UserServies.updateEmail(_id, updateEmailDto);
  }
  // изменения пароля password
  @UsePipes(new ValidationPipe()) //валидация dto
  @Put('password')
  @HttpCode(200)
  @Auth()
  async updatePassoword(
    @User('_id') _id,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.UserServies.updatePassoword(_id, updatePasswordDto);
  }

  //----------------для админки-------------------------
  // получение или поиск пользователя
  @Get()
  async getAllesUsers(@Query() dto: SearchDto) {
    return this.UserServies.getAllUsers(dto);
  }

  // удаление пользователя
  @Delete(':id')
  @Auth('admin')
  async deleteUser(@Param('id', IdValidationPipe) id: string) {
    return this.UserServies.deleteUsers(id);
  }
}
