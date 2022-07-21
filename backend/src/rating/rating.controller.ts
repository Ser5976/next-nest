import { RatingDto } from './dto/rating.dto';
import { User } from './../user/decorators/user.decorator';
import { RatingService } from './rating.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('rating')
export class RatingController {
  constructor(private readonly RatingService: RatingService) {}
  @UsePipes(new ValidationPipe())
  @Post()
  @Auth()
  async setRating(@User('_id') _id: string, @Body() dto: RatingDto) {
    return this.RatingService.setRating(_id, dto);
  }
}
