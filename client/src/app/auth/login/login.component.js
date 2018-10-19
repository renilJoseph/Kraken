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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../../_services/index");
var admin_config_1 = require("../../admin.config");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, router, authenticationService, userService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.amodel = {};
        this.loading = false;
        this.amodel.username = admin_config_1.adminConfig.username;
        this.amodel.emailAddr = admin_config_1.adminConfig.emailAddress;
        this.amodel.firstName = admin_config_1.adminConfig.ownerfname;
        this.amodel.lastName = admin_config_1.adminConfig.ownerlname;
        this.amodel.password = admin_config_1.adminConfig.password;
        this.amodel.isPriviledged = true;
        this.silentRegister();
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    LoginComponent.prototype.silentRegister = function () {
        this.userService.create(this.amodel)
            .subscribe(function (data) { }, function (error) { });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'login.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            index_1.AuthenticationService,
            index_1.UserService,
            index_1.AlertService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map