import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdatePepsonalDataDto } from './dto/update-personaldata.dto';
import { PersonalDataService } from './personal-data.service';
export declare class PersonalDataController {
    private readonly PersonalDataService;
    constructor(PersonalDataService: PersonalDataService);
    updatePersonalData(_id: string, dto: UpdatePepsonalDataDto): Promise<{
        message: string;
    }>;
    updatePhoneNumber(_id: string, dto: UpdatePhoneDto): Promise<{
        message: string;
    }>;
    updateAddress(_id: string, dto: UpdateAddressDto): Promise<{
        message: string;
    }>;
}
