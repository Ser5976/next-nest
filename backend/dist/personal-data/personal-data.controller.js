"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalDataController = void 0;
const update_address_dto_1 = require("./dto/update-address.dto");
const update_phone_dto_1 = require("./dto/update-phone.dto");
const update_personaldata_dto_1 = require("./dto/update-personaldata.dto");
const user_decorator_1 = require("./../user/decorators/user.decorator");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const personal_data_service_1 = require("./personal-data.service");
const common_1 = require("@nestjs/common");
let PersonalDataController = class PersonalDataController {
    constructor(PersonalDataService) {
        this.PersonalDataService = PersonalDataService;
    }
    async updatePersonalData(_id, dto) {
        return this.PersonalDataService.updatePersonalData(_id, dto);
    }
    async updatePhoneNumber(_id, dto) {
        return this.PersonalDataService.updatePhoneNumber(_id, dto);
    }
    async updateAddress(_id, dto) {
        return this.PersonalDataService.updateAddress(_id, dto);
    }
};
__decorate([
    (0, common_1.Put)(),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_personaldata_dto_1.UpdatePepsonalDataDto]),
    __metadata("design:returntype", Promise)
], PersonalDataController.prototype, "updatePersonalData", null);
__decorate([
    (0, common_1.Put)('phone'),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_phone_dto_1.UpdatePhoneDto]),
    __metadata("design:returntype", Promise)
], PersonalDataController.prototype, "updatePhoneNumber", null);
__decorate([
    (0, common_1.Put)('address'),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_address_dto_1.UpdateAddressDto]),
    __metadata("design:returntype", Promise)
], PersonalDataController.prototype, "updateAddress", null);
PersonalDataController = __decorate([
    (0, common_1.Controller)('personal-data'),
    __metadata("design:paramtypes", [personal_data_service_1.PersonalDataService])
], PersonalDataController);
exports.PersonalDataController = PersonalDataController;
//# sourceMappingURL=personal-data.controller.js.map