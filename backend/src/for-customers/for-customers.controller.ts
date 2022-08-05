import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { ForCustomersDto } from './dto/for-customers.dto';
import { ForCustomersService } from './for-customers.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('for-customers')
export class ForCustomersController {
  constructor(private readonly ForCustomersService: ForCustomersService) {}
  //создание статьи
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('admin')
  async createNews(@Body() dto: ForCustomersDto) {
    return this.ForCustomersService.createData(dto);
  }
  // получение всех данных
  @Get()
  async getAllData() {
    return this.ForCustomersService.getAllData();
  }
  // получение  данных
  @Get(':id')
  async getNews(@Param('id', IdValidationPipe) id: string) {
    return this.ForCustomersService.getData(id);
  }
  // редактирование данных
  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Auth('admin')
  async updateNews(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: ForCustomersDto,
  ) {
    return this.ForCustomersService.updateData(id, dto);
  }
  // удаление  данных
  @Delete(':id')
  @Auth('admin')
  async deleteNews(@Param('id', IdValidationPipe) id: string) {
    return this.ForCustomersService.deleteData(id);
  }
}
