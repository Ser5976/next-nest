import { UserModel } from 'src/user/user.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { PersonalDataController } from './personal-data.controller';
import { PersonalDataService } from './personal-data.service';

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
  controllers: [PersonalDataController],
  providers: [PersonalDataService],
})
export class PersonalDataModule {}
