import { UpdateLogoDto } from './dto/updatelogo.dto';
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
} from '@nestjs/common';
import { BrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly BrandService: BrandService) {}
  //создание брэнда
  @Post()
  @Auth('admin')
  async createBrand(@Body() dto: BrandDto) {
    return this.BrandService.createBrand(dto);
  }
  //получение брэндов(сортировка,если нужно)
  @Get()
  @Auth('admin')
  async getBrands(@Query('searchBrand') searchBrand?: string) {
    return this.BrandService.getBrands(searchBrand);
  }
  // редактирование брэнда
  @Put(':id')
  @Auth('admin')
  async updateBrand(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: UpdateLogoDto,
  ) {
    return this.BrandService.updateBarnd(id, dto);
  }
  //удаление брэнда
  @Delete(':id')
  @Auth('admin')
  async removeBrand(@Param('id', IdValidationPipe) id: string) {
    return this.BrandService.removeBrand(id);
  }
}
