import { CategoryProductDto } from './dto/category-product.dto';
import { CategoryProductService } from './category-product.service';
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
  // получение и поиск категории товаров
  @Get()
  async getCategoryProduct(@Query() dto: SearchDto) {
    return this.CategoryProductService.getCategoryProduct(dto);
  }

  // удаление категории товара
  @Delete(':id')
  @Auth('admin')
  async removeCategoryProduct(@Param('id') id: string) {
    return this.CategoryProductService.removeCategoryProduct(id);
  }
}
