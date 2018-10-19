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
var index_2 = require("../../_services/index");
var index_3 = require("../../_services/index");
var app_config_1 = require("../../app.config");
var JackalComponent = /** @class */ (function () {
    function JackalComponent(userService, rosService, hideservice, modal) {
        this.userService = userService;
        this.rosService = rosService;
        this.hideservice = hideservice;
        this.modal = modal;
        this.topic = '/kinect2/qhd/image_color';
        this.image1 = 'http://' + app_config_1.appConfig.robotUrl + ':8080/stream?topic=' + this.topic + '&width=900&height=550';
        this.large = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.show = hideservice.getIt();
    }
    JackalComponent.prototype.ngDoCheck = function () {
        if (this.hideservice.getIt()) {
            this.resizeViewer(.635);
        }
        else {
            this.resizeViewer(.95);
        }
    };
    JackalComponent.prototype.onWindowResize = function () {
        var _this = this;
        //debounce resize, wait for resize to finish before doing stuff
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout((function () {
            _this.innerWidth = window.innerWidth;
            _this.innerHeight = window.innerHeight;
            if (_this.hideservice.getIt() == true)
                _this.resizeViewer(.635);
            else
                _this.resizeViewer(.95);
        }).bind(this), 500);
    };
    JackalComponent.prototype.resizeViewer = function (widthMultiplier) {
        //calculate a width based on the available vertical space
        this.calcWidth = ((this.innerHeight - 90) * 16 / 9);
        //calculate a height based on the available horizontal space (account for the presence of telemetry)
        this.calcHeight = (widthMultiplier * this.innerWidth * 9 / 16);
        //if the calculated width is wider than what is available, use the calculated height
        if (this.calcWidth > (widthMultiplier * this.innerWidth)) {
            this.image1 = 'http://' + app_config_1.appConfig.robotUrl + ':8080/stream?topic=' + this.topic + '&width=' + (widthMultiplier * this.innerWidth).toFixed() + '&height=' + this.calcHeight.toFixed();
        }
        else {
            this.image1 = 'http://' + app_config_1.appConfig.robotUrl + ':8080/stream?topic=' + this.topic + '&width=' + this.calcWidth.toFixed() + '&height=' + (this.innerHeight - 90);
        }
    };
    JackalComponent.prototype.ngOnInit = function () {
        this.ros = this.rosService.getROS();
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.image1 = 'http://' + app_config_1.appConfig.robotUrl + ':8080/stream?topic=' + this.topic + '&width=' + (.635 * this.innerWidth).toFixed() + '&height=' + ((.635 * this.innerWidth) * 9 / 16).toFixed();
    };
    JackalComponent.prototype.resizeWindow = function (input) {
        var inputs = input.split(',').map(function (el) {
            var n = Number(el);
            return isNaN(n) ? el : n;
        });
        var roi = new ROSLIB.Topic({
            ros: this.ros,
            name: '/screen_grab/roi',
            messageType: 'sensor_msgs/RegionOfInterest'
        });
        var region = new ROSLIB.Message({
            x_offset: this.ToUint32(inputs[0]),
            y_offset: this.ToUint32(inputs[1]),
            height: this.ToUint32(inputs[3]),
            width: this.ToUint32(inputs[2]),
            do_rectify: false
        });
        roi.publish(region);
    };
    JackalComponent.prototype.resizeBox = function () {
        var _this = this;
        var dialogRef = this.modal.prompt()
            .size('lg')
            .isBlocking(true)
            .showClose(true)
            .keyboard(27)
            .title('Enter the dimensions')
            .body('Format is xOffset, yOffset, Width, Height')
            .open();
        dialogRef
            .then(function (dialogRef) {
            dialogRef.result.then(function (result) { return _this.resizeWindow(result); });
        });
    };
    JackalComponent.prototype.changeTopic = function (topicName) {
        this.topic = topicName;
        if (this.hideservice.getIt()) {
            this.resizeViewer(.635);
        }
        else {
            this.resizeViewer(.95);
        }
    };
    JackalComponent.prototype.topicBox = function () {
        var _this = this;
        var dialogRef = this.modal.prompt()
            .size('lg')
            .isBlocking(true)
            .showClose(true)
            .keyboard(27)
            .title('Enter the new topic name')
            .body('Remember the /')
            .open();
        dialogRef
            .then(function (dialogRef) {
            dialogRef.result.then(function (result) { return _this.changeTopic(result); });
        });
    };
    JackalComponent.prototype.modulo = function (a, b) {
        return a - Math.floor(a / b) * b;
    };
    JackalComponent.prototype.ToUint32 = function (x) {
        return this.modulo(this.ToInteger(x), Math.pow(2, 32));
    };
    JackalComponent.prototype.ToInteger = function (x) {
        x = Number(x);
        return x < 0 ? Math.ceil(x) : Math.floor(x);
    };
    __decorate([
        core_1.ViewChild('TLM'),
        __metadata("design:type", core_1.ElementRef)
    ], JackalComponent.prototype, "TLM", void 0);
    __decorate([
        core_1.HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], JackalComponent.prototype, "onWindowResize", null);
    JackalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'jackal.component.html',
            providers: [index_2.RosService]
        }),
        __metadata("design:paramtypes", [index_1.UserService, index_2.RosService, index_3.HideService, bootstrap_1.Modal])
    ], JackalComponent);
    return JackalComponent;
}());
exports.JackalComponent = JackalComponent;
//# sourceMappingURL=jackal.component.js.map