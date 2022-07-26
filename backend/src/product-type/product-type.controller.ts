import { ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeService } from './product-type.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';

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
  @Auth()
  async getProductType() {
    return this.ProductTypeService.getProductType();
  }
  // удаление типа товара
  @Delete(':id')
  @Auth('admin')
  async removeProductType(@Param('id') id: string) {
    return this.ProductTypeService.removeProductType(id);
  }
}
