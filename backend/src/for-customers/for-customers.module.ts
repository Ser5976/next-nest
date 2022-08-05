import { ForCustomersModel } from './for-customers.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ForCustomersController } from './for-customers.controller';
import { ForCustomersService } from './for-customers.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ForCustomersModel,
        schemaOptions: {
          collection: 'ForCustomers',
        },
      },
    ]),
  ],
  controllers: [ForCustomersController],
  providers: [ForCustomersService],
})
export class ForCustomersModule {}
