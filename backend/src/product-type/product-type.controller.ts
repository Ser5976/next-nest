import { ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeService } from './product-type.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { SearchDto } from './dto/search.dto';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly ProductTypeService: ProductTypeService) {}
  //создание типа продукта
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('admin')
  async createProductType(@Body() dto: ProductTypeDto) {
    return this.ProductTypeService.createProductType(dto);
  }

  // получение(и поиск) типов товаров
  @Get()
  async getProductType(@Query() dto?: SearchDto) {
    return this.ProductTypeService.getProductType(dto);
  }
  //получение выбранного типа
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    return await this.ProductTypeService.byIdType(id);
  }

  // удаление типа товара
  @Delete(':id')
  @Auth('admin')
  async removeProductType(@Param('id') id: string) {
    return this.ProductTypeService.removeProductType(id);
  }
}
