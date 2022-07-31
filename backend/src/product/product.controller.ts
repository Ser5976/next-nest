import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductServies: ProductService) {}
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: ProductDto) {
    return this.ProductServies.create(dto);
  }
}
