import { QueryParametrsDto } from './dto/queryParametrs.dto';
import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductServies: ProductService) {}
  //создание товара
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: ProductDto) {
    return this.ProductServies.create(dto);
  }
  //получение товаров(фильтрация,сортировка,пагинация)
  @UsePipes(new ValidationPipe())
  @Get('filter')
  async getFilteredProducts(@Query() dto: QueryParametrsDto) {
    return this.ProductServies.getFilteredProducts(dto);
  }

  //получение товара
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    return await this.ProductServies.byIdProduct(id);
  }
  // поиск товара по тексту(слова)
  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.ProductServies.textSearch(text);
  }
  //обновление товара
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateProduct(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: ProductDto,
  ) {
    return this.ProductServies.updateProduct(id, dto);
  }
  //удаление товара
  @Delete(':id')
  async DeleteProduct(@Param('id', IdValidationPipe) id: string) {
    return this.ProductServies.deleteProduct(id);
  }
}
