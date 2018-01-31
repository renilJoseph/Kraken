import { Component, OnInit, DoCheck, EventEmitter, Input, HostListener, ViewChild, ElementRef } from '@angular/core';

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
    /*private image1 = 'http://192.168.1.147:8080/stream?topic=/image&width=900&height=550'
    private large = false;
    public innerWidth: any;
    public innerHeight: any;
    private calcWidth: any;
    private calcHeight: any;
    resizeTimeout: any;*/
    /*@ViewChild('TLM') TLM:ElementRef
    ngDoCheck() {
    	if(this.TLM.nativeElement.classList.contains('open')) {
		this.resizeViewer(.635);
    	}
	else {
		this.resizeViewer(.95);
	}
    }*/

    constructor(private userService: UserService, private rosService:RosService, public hideservice: HideService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.show = hideservice.getIt();
    }

    @HostListener('window:resize')
    onWindowResize() {
        //debounce resize, wait for resize to finish before doing stuff
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout((() => {
			this.innerWidth = window.innerWidth;
			this.innerHeight = window.innerHeight;
			if(this.hideservice.getIt() == true)
				this.resizeViewer(.635);
			else
				this.resizeViewer(.95);
        }).bind(this), 500);
   }

	/*resizeViewer(widthMultiplier: any)
	{
		//calculate a width based on the available vertical space
		this.calcWidth = ((this.innerHeight - 180)*16/9);
		//calculate a height based on the available horizontal space (account for the presence of telemetry)
		this.calcHeight = (widthMultiplier*this.innerWidth*9/16);
		//if the calculated width is wider than what is available, use the calculated height
		if(this.calcWidth > (widthMultiplier*this.innerWidth))
		{
			this.image1 = 'http://192.168.1.147:8080/stream?topic=/image&width=' + (widthMultiplier*this.innerWidth).toFixed() + '&height=' + this.calcHeight.toFixed();
		}
		else
		{
			this.image1 = 'http://192.168.1.147:8080/stream?topic=/image&width=' + this.calcWidth.toFixed() + '&height=' + (this.innerHeight - 180);
		}
	} */

    ngOnInit() {
      this.loadAllUsers();
      this.ros = this.rosService.getROS();
      //this.innerWidth = window.innerWidth;
      //this.innerHeight = window.innerHeight;
      //this.image1 = 'http://192.168.1.147:8080/stream?topic=/image&width=' + (.635*this.innerWidth).toFixed() + '&height=' + ((.635*this.innerWidth)*9/16).toFixed();


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
