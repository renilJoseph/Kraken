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
var index_1 = require("../../_services/index");
var TeleopComponent = /** @class */ (function () {
    function TeleopComponent(rosService) {
        this.rosService = rosService;
    }
    TeleopComponent.prototype.ngOnInit = function () {
        this.ros = this.rosService.getROS();
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.speed = 1; //Speed is 1 m/s
        this.cmdVel = new ROSLIB.Topic({
            ros: this.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        });
    };
    TeleopComponent.prototype.changeSpeed = function (input) {
        this.speed = input;
        var off = document.getElementById('switch-off');
        var slow = document.getElementById('switch-slow');
        var fast = document.getElementById('switch-fast');
        off.style.backgroundColor = 'rgb(221, 221, 221)';
        off.style.color = 'black';
        slow.style.backgroundColor = 'rgb(221, 221, 221)';
        slow.style.color = 'black';
        fast.style.backgroundColor = 'rgb(221, 221, 221)';
        fast.style.color = 'black';
        if (input == 0) {
            off.style.backgroundColor = '#2196F3';
            off.style.color = 'white';
        }
        else if (input == 1) {
            slow.style.backgroundColor = '#2196F3';
            slow.style.color = 'white';
        }
        else if (input == 2) {
            fast.style.backgroundColor = '#2196F3';
            fast.style.color = 'white';
        }
    };
    TeleopComponent.prototype.buttonTeleop = function (a, b, c) {
        this.x = a * this.speed;
        this.y = b;
        this.z = c;
        this.publishTeleop();
    };
    TeleopComponent.prototype.publishTeleop = function () {
        var twist = new ROSLIB.Message({
            angular: {
                x: 0,
                y: 0,
                z: this.z
            },
            linear: {
                x: this.x,
                y: this.y,
                z: this.z
            }
        });
        this.cmdVel.publish(twist);
    };
    TeleopComponent.prototype.teleop = function (event) {
        var pub = true;
        //Set x, y, z according to keypress
        switch (event.keyCode) {
            case 37:
                // turn left
                this.z = 1;
                break;
            case 38:
                // up
                this.x = 0.5 * this.speed;
                this.z = 0;
                break;
            case 39:
                // turn right
                this.z = -1;
                break;
            case 40:
                // down
                this.x = -0.5 * this.speed;
                this.z = 0;
                break;
            default:
                pub = false;
        }
        console.log(event.keyCode);
        if (pub) {
            this.publishTeleop();
        }
    };
    TeleopComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'teleop',
            templateUrl: './teleop.component.html',
            providers: [index_1.RosService],
            host: { '(document:keydown)': 'teleop($event)' },
            styleUrls: ['./teleop.component.css']
        }),
        __metadata("design:paramtypes", [index_1.RosService])
    ], TeleopComponent);
    return TeleopComponent;
}());
exports.TeleopComponent = TeleopComponent;
//# sourceMappingURL=teleop.component.js.map