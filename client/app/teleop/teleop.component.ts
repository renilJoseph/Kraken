import { Component, OnInit } from '@angular/core';
import { RosService } from '../_services/index';
import { HostListener } from '@angular/core';

declare var ROSLIB: any;

@Component({
  moduleId: module.id,
  selector: 'teleop',
  templateUrl: './teleop.component.html',
  providers: [RosService],
  host: {'(document:keydown)': 'teleop($event)'},
  styleUrls: ['./teleop.component.css']

})
export class TeleopComponent implements OnInit {
  ros: any;
  cmdVel: any;
  speed: number;
  x: number;
  y: number;
  z: number;
  constructor(private rosService:RosService) { }

  ngOnInit() {
    this.ros = this.rosService.getROS();
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.speed = 1;  //Speed is 1 m/s
    this.cmdVel = new ROSLIB.Topic({
        ros : this.ros,
        name : '/cmd_vel',
        messageType : 'geometry_msgs/Twist'
    });
  }

  changeSpeed(input: number)
  {
    this.speed = input;
    let off = document.getElementById('switch-off');
    let slow = document.getElementById('switch-slow');
    let fast = document.getElementById('switch-fast');
    off.style.backgroundColor = 'rgb(221, 221, 221)';
    off.style.color = 'black';
    slow.style.backgroundColor = 'rgb(221, 221, 221)';
    slow.style.color = 'black';
    fast.style.backgroundColor = 'rgb(221, 221, 221)';
    fast.style.color = 'black';
    if(input == 0)
    {
      off.style.backgroundColor = '#2196F3';
      off.style.color = 'white';
    }
    else if(input == 1)
    {
      slow.style.backgroundColor = '#2196F3';
      slow.style.color = 'white';
    }
    else if(input == 2)
    {
      fast.style.backgroundColor = '#2196F3';
      fast.style.color = 'white';
    }
  }

  buttonTeleop(a: number, b: number, c: number)
  {
    this.x = a * this.speed;
    this.y = b;
    this.z = c;
    this.publishTeleop();
  }

  publishTeleop()
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

  teleop(event: KeyboardEvent)
  {
    let pub = true;
    //Set x, y, z according to keypress
    switch(event.keyCode){
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
    if(pub)
    {
      this.publishTeleop();
    }
  }

}
