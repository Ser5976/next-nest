import { PictureDeleteDto } from './dto/pictureDelete.dto';
import { SliderDto } from './dto/slider.dto';
import { SliderService } from './slider.service';
export declare class SliderController {
    private readonly SliderService;
    constructor(SliderService: SliderService);
    createSlider(dto: SliderDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./slider.model").SliderModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getSlider(): Promise<{
        picture: string[];
        id: import("mongoose").Types.ObjectId;
    }>;
    deletePicture(id: string, dto: PictureDeleteDto): Promise<{
        message: string;
    }>;
    addPicture(id: string, dto: SliderDto): Promise<{
        message: string;
    }>;
}
