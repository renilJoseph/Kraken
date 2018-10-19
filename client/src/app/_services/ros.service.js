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
var app_config_1 = require("../app.config");
var RosService = /** @class */ (function () {
    function RosService() {
    }
    //ws://10.143.10.186:9090
    RosService.prototype.getROS = function () {
        if (!this.ros) {
            this.ros = new ROSLIB.Ros({
                url: 'ws://' + app_config_1.appConfig.robotUrl + ':9090'
            });
            this.ros.on('connection', function () {
                console.log('Connected to websocket server.');
            });
            this.ros.on('error', function (error) {
                console.log('Error connecting to websocket server: ', error);
            });
            this.ros.on('close', function () {
                console.log('Connection to websocket server closed.');
            });
        }
        return this.ros;
    };
    RosService.prototype.setSocketAddress = function (input) {
        app_config_1.appConfig.robotUrl = input;
    };
    RosService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], RosService);
    return RosService;
}());
exports.RosService = RosService;
//# sourceMappingURL=ros.service.js.map