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
  // получение типов товаров
  @Get()
  async getProductType() {
    return this.ProductTypeService.getProductType();
  }
  //поиск категории по name
  @Auth('admin')
  @Get('search')
  async findType(@Query() dto: SearchDto) {
    return this.ProductTypeService.findType(dto);
  }
  // удаление типа товара
  @Delete(':id')
  @Auth('admin')
  async removeProductType(@Param('id') id: string) {
    return this.ProductTypeService.removeProductType(id);
  }
}
