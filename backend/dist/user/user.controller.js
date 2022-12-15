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
exports.UserController = void 0;
const update_password_dto_1 = require("./dto/update.password.dto");
const id_validation_pipe_1 = require("./../pipes/id.validation.pipe");
const update_email_dto_1 = require("./dto/update.email.dto");
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const user_decorator_1 = require("./decorators/user.decorator");
const user_service_1 = require("./user.service");
const search_dto_1 = require("./dto/search.dto");
let UserController = class UserController {
    constructor(UserServies) {
        this.UserServies = UserServies;
    }
    async getProfile(_id) {
        return this.UserServies.byId(_id);
    }
    async updateProfileUser(_id, updateEmailDto) {
        return this.UserServies.updateEmail(_id, updateEmailDto);
    }
    async updatePassoword(_id, updatePasswordDto) {
        return this.UserServies.updatePassoword(_id, updatePasswordDto);
    }
    async getAllusers() {
        return this.UserServies.getAllUsers();
    }
    async findUser(dto) {
        return this.UserServies.findUser(dto);
    }
    async deleteUser(id) {
        return this.UserServies.deleteUsers(id);
    }
};
__decorate([
    (0, common_1.Get)('profileUser'),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)('email'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_email_dto_1.UpdateEmailDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfileUser", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)('password'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassoword", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorators_1.Auth)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllusers", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dto_1.SearchDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map