import { IdValidationPipe } from './../pipes/id.validation.pipe';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { BrandService } from './brand.service';
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
import { BrandDto } from './dto/brand.dto';
import { SearchDto } from './dto/search.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly BrandService: BrandService) {}
  //создание брэнда
  @UsePipes(new ValidationPipe()) //валидация dto
  @Post()
  @Auth('admin')
  async createBrand(@Body() dto: BrandDto) {
    return this.BrandService.createBrand(dto);
  }
  //получение брэндов(поиск,если нужно)
  @Get()
  @Auth('admin')
  async getBrands(@Query() dto?: SearchDto) {
    return this.BrandService.getBrands(dto);
  }
  
  //удаление брэнда
  @Delete(':id')
  @Auth('admin')
  async removeBrand(@Param('id', IdValidationPipe) id: string) {
    return this.BrandService.removeBrand(id);
  }
}
