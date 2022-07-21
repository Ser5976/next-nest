import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdatePepsonalDataDto } from './dto/update-personaldata.dto';
import { UserModel } from 'src/user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class PersonalDataService {
    private readonly UserModel;
    constructor(UserModel: ModelType<UserModel>);
    updatePersonalData(id: string, dto: UpdatePepsonalDataDto): Promise<{
        message: string;
    }>;
    updatePhoneNumber(id: string, dto: UpdatePhoneDto): Promise<{
        message: string;
    }>;
    updateAddress(id: string, dto: UpdateAddressDto): Promise<{
        message: string;
    }>;
}
