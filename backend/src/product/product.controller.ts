import { ProductService } from './product.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductServies: ProductService) {}
  @Post()
  async create(@Body() dto: { name: string }) {
    return this.ProductServies.create(dto);
  }
}
