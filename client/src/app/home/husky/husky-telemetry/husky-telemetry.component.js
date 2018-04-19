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
var index_1 = require("../../../_services/index");
var HuskyTelemetryComponent = /** @class */ (function () {
    function HuskyTelemetryComponent(rosService) {
        this.rosService = rosService;
    }
    HuskyTelemetryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ros = this.rosService.getROS();
        // Subscribing to a Topic
        // ----------------------
        var listener = new ROSLIB.Topic({
            ros: this.ros,
            name: '/husky_velocity_controller/odom',
            messageType: 'nav_msgs/Odometry'
        });
        listener.subscribe(function (message) {
            console.log(message);
            _this.odometryOutput = 'Orientation: \t('
                + 'w: ' + message.pose.pose.orientation.w.toFixed(3)
                + ', x: ' + message.pose.pose.orientation.x.toFixed(3)
                + ', y: ' + message.pose.pose.orientation.y.toFixed(3)
                + ', z: ' + message.pose.pose.orientation.z.toFixed(3)
                + ')\nPosition: \t(x:' + message.pose.pose.position.x.toFixed(3)
                + ', y: ' + message.pose.pose.position.y.toFixed(3)
                + ', z: ' + message.pose.pose.position.z.toFixed(3)
                + ')\nVelocity: \t(x:' + message.twist.twist.linear.x.toFixed(3)
                + ', y: ' + message.twist.twist.linear.y.toFixed(3)
                + ', z: ' + message.twist.twist.linear.z.toFixed(3) + ')';
        });
    };
    HuskyTelemetryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'husky-telemetry',
            templateUrl: 'husky-telemetry.component.html',
            providers: [index_1.RosService]
        }),
        __metadata("design:paramtypes", [index_1.RosService])
    ], HuskyTelemetryComponent);
    return HuskyTelemetryComponent;
}());
exports.HuskyTelemetryComponent = HuskyTelemetryComponent;
//# sourceMappingURL=husky-telemetry.component.js.map