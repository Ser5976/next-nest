import { UserModel } from 'src/user/user.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ViewedController } from './viewed.controller';
import { ViewedService } from './viewed.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
  ],
  controllers: [ViewedController],
  providers: [ViewedService],
})
export class ViewedModule {}
