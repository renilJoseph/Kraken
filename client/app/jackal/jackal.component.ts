import { Component, OnInit, Input } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { RosService } from '../_services/index';
import { HideService } from '../_services/index';

declare var ROSLIB: any;
declare var ROS3D: any;
declare var MJPEGCANVAS: any;

@Component({
    moduleId: module.id,
    templateUrl: 'jackal.component.html',
    providers: [RosService]
})

export class JackalComponent implements OnInit {
    ros: any;
    currentUser: User;
    users: User[] = [];
    show: boolean;
    constructor(private userService: UserService, private rosService:RosService, public hideservice: HideService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.show = hideservice.getIt();
    }

  showTlm() {
       this.hideservice.showIt();
       this.show = true;
  }

  hideTlm() {
      this.hideservice.hideIt();
      this.show = false;
  }
    
    ngOnInit() {
      this.loadAllUsers();
      this.ros = this.rosService.getROS();
      // Create the main viewer.
      var viewer = new MJPEGCANVAS.Viewer({
        divID : 'viewer',
        host : 'localhost',
        width : 900,
        height : 497,
        quality : 90,
        topic : '/kinect2/qhd/image_color',
        refreshRate : 30
      });
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    resizeWindow(xOffset: number, yOffset: number, width: number, height: number)
    {
      console.log(" " + xOffset + " " + yOffset + " " + width + " " + height);
      var roi = new ROSLIB.Topic({
        ros : this.ros,
        name : '/screen_grab/roi',
        messageType : 'sensor_msgs/RegionOfInterest'
      });
      var region = new ROSLIB.Message({
        x_offset : this.ToUint32(xOffset),
        y_offset : this.ToUint32(yOffset),
        height : this.ToUint32(height),
        width : this.ToUint32(width),
        do_rectify : false
      });

      roi.publish(region);
    }

    modulo(a: any, b: any) {
        return a - Math.floor(a/b)*b;
    }
    ToUint32(x: any) {
        return this.modulo(this.ToInteger(x), Math.pow(2, 32));
    }
    ToInteger(x: any) {
        x = Number(x);
        return x < 0 ? Math.ceil(x) : Math.floor(x);
    }


}
