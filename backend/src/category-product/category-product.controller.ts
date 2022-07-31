import { CategoryProductDto } from './dto/category-product.dto';
import { CategoryProductService } from './category-product.service';
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

@Controller('category-product')
export class CategoryProductController {
  constructor(
    private readonly CategoryProductService: CategoryProductService,
  ) {}
  //создание типа продукта
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth('admin')
  async createProductType(@Body() dto: CategoryProductDto) {
    return this.CategoryProductService.createCategoryProduct(dto);
  }
  // получение категории товаров
  @Get()
  @Auth()
  async getCategoryProduct() {
    return this.CategoryProductService.getCategoryProduct();
  }
  // удаление категории товара
  @Delete(':id')
  @Auth('admin')
  async removeCategoryProduct(@Param('id') id: string) {
    return this.CategoryProductService.removeCategoryProduct(id);
  }
}
