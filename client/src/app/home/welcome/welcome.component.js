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
var bootstrap_1 = require("ngx-modialog/plugins/bootstrap");
var index_1 = require("../../_services/index");
var router_1 = require("@angular/router");
var WelcomeComponent = /** @class */ (function () {
    function WelcomeComponent(hideservice, rosService, modal, router) {
        this.hideservice = hideservice;
        this.rosService = rosService;
        this.modal = modal;
        this.router = router;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.show = hideservice.getIt();
        this.socket = "";
    }
    WelcomeComponent.prototype.setSocket = function (socketAddress, nextRoute) {
        this.rosService.setSocketAddress(socketAddress);
        this.router.navigate([nextRoute]);
    };
    WelcomeComponent.prototype.getWebSocket = function (nextRoute) {
        var _this = this;
        var dialogRef = this.modal.prompt()
            .size('lg')
            .isBlocking(true)
            .showClose(true)
            .keyboard(27)
            .title('Enter WebSocket Address')
            .body('Please leave out port number')
            .open()
            .then(function (dialogRef) {
            dialogRef.result.then(function (result) { return _this.setSocket(result, nextRoute); });
        });
    };
    WelcomeComponent.prototype.ngOnInit = function () {
    };
    WelcomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'welcome.component.html'
        }),
        __metadata("design:paramtypes", [index_1.HideService,
            index_1.RosService,
            bootstrap_1.Modal,
            router_1.Router])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map