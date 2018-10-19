"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var index_1 = require("./_helpers/index");
var index_2 = require("./_directives/index");
var index_3 = require("./_guards/index");
var index_4 = require("./_services/index");
var index_5 = require("./home/index");
var index_6 = require("./auth/login/index");
var index_7 = require("./home/teleop/index");
var index_8 = require("./auth/index");
var index_9 = require("./home/menubar/index");
var index_10 = require("./home/jackal/index");
var index_11 = require("./home/jackal/index");
var index_12 = require("./home/welcome/index");
var index_13 = require("./home/settings/index");
var index_14 = require("./home/settings/change-name/index");
var index_15 = require("./home/settings/change-username/index");
var index_16 = require("./home/settings/change-password/index");
var index_17 = require("./home/settings/change-email/index");
var index_18 = require("./auth/forgot-password/index");
var index_19 = require("./home/husky/index");
var index_20 = require("./home/husky/index");
var index_21 = require("./home/settings/add-users/index");
var index_22 = require("./home/settings/delete-users/index");
var index_22 = require("./home/Game/gametrain/index");
var index_23 = require("./home/Game/gametest/index");
var ngx_modialog_1 = require("ngx-modialog");
var bootstrap_1 = require("ngx-modialog/plugins/bootstrap");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing,
                ngx_modialog_1.ModalModule.forRoot(),
                bootstrap_1.BootstrapModalModule
            ],
            declarations: [
                app_component_1.AppComponent,
                index_2.AlertComponent,
                index_5.HomeComponent,
                index_6.LoginComponent,
                //RegisterComponent,
                index_7.TeleopComponent,
                index_8.AuthComponent,
                index_9.MenubarComponent,
                index_10.JackalComponent,
                index_11.JackalTelemetryComponent,
                index_12.WelcomeComponent,
                index_13.SettingsComponent,
                index_14.ChangeNameComponent,
                index_15.ChangeUsernameComponent,
                index_16.ChangePasswordComponent,
                index_17.ChangeEmailComponent,
                index_18.ForgotPasswordComponent,
                index_19.HuskyComponent,
                index_20.HuskyTelemetryComponent,
                index_22.DeleteUsersComponent,
                index_21.AddUsersComponent,
                index_22.GametrainComponent,
                index_23.GametestComponent
            ],
            providers: [
                index_1.customHttpProvider,
                index_3.AuthGuard,
                index_4.AlertService,
                index_4.HideService,
                index_4.AuthenticationService,
                index_9.MenubarComponent,
                index_4.UserService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map