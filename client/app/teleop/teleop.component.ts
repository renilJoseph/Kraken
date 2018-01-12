import { Component, OnInit } from '@angular/core';
import { RosService } from '../_services/index';
import { HostListener } from '@angular/core';

declare var ROSLIB: any;

@Component({
  moduleId: module.id,
  selector: 'teleop',
  templateUrl: './teleop.component.html',
  providers: [RosService],
  host: {'(document:keydown)': 'teleop($event)'}

})
export class TeleopComponent implements OnInit {
  ros: any;
  cmdVel: any;
  x: Number;
  y: Number;
  z: Number;
  constructor(private rosService:RosService) { }

  ngOnInit() {
    this.ros = this.rosService.getROS();
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.cmdVel = new ROSLIB.Topic({
        ros : this.ros,
        name : '/cmd_vel',
        messageType : 'geometry_msgs/Twist'
    });
  }

  teleop(event: KeyboardEvent)
  {
    let pub = true;
    //Set x, y, z according to keypress
    switch(event.keyCode){
      case 68:
        // turn left
        this.z = 1;
        break;
      case 87:
        // up
        this.x = 0.5;
        this.z = 0;
        break;
      case 65:
        // turn right
        this.z = -1;
        break;
      case 83:
        // down
        this.x = -0.5;
        this.z = 0;
        break;
      case 69:
        // strafe right
        this.y = -0.5;
        this.x = 0;
        break;
      case 81:
        // strafe left
        this.y = 0.5;
        this.x = 0;
        break;
      default:
        pub = false;
    }
    console.log(event.keyCode);
    if(pub)
    {
      let twist = new ROSLIB.Message({
        angular : {
          x : 0,
          y : 0,
          z : this.z
        },
        linear : {
          x : this.x,
          y : this.y,
          z : this.z
        }
      });
      this.cmdVel.publish(twist);
    }
  }

}
