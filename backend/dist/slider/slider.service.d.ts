import { PictureDeleteDto } from './dto/pictureDelete.dto';
import { SliderDto } from './dto/slider.dto';
import { SliderModel } from './slider.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class SliderService {
    private readonly SliderModel;
    constructor(SliderModel: ModelType<SliderModel>);
    createSlider(img: SliderDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & SliderModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
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
