import { Component, OnInit, EventEmitter, Input } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { RosService } from '../_services/index';
import { MenubarComponent } from '../menubar/index';

declare var ROSLIB: any;
declare var ROS3D: any;
declare var MJPEGCANVAS: any;

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    providers: [RosService]
})

export class HomeComponent implements OnInit {
    ros: any;
    currentUser: User;
    users: User[] = [];
    speed1: any = 0;
    messageOutput: string = 'Odometry Telemetry';
    show : boolean = true;
    constructor(private userService: UserService, private rosService:RosService, private menubar: MenubarComponent) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	this.show = true;
    }
    // event listener/handler for telemetry panel (listens to child component menubar button)
    onTlm(value: boolean) {
	if (value)
		this.show = true;
		// size to normal
		//this.viewer.width = 900;
	if (!value)
		this.show = false;
		// "fullscreen"
		//this.viewer.width = '1200';
		
    }
    changeWidthBig() {
	alert('Function Called');
	document.getElementById('canvas').style.width= "1400px";
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
      		topic : '/image',
		refreshRate : 30
    	});
        var cmdVel = new ROSLIB.Topic({
            ros : this.ros,
            name : '/cmd_vel',
            messageType : 'geometry_msgs/Twist'
        });

        // Subscribing to a Topic
  		// ----------------------
  		var listener = new ROSLIB.Topic({
    		ros : this.ros,
    		name : '/husky_velocity_controller/odom',
    		messageType : 'nav_msgs/Odometry'
  		});

  		listener.subscribe((message: any) => {
            
        this.messageOutput = 'Odometry Telemetry\n'
                                + 'Orientation: \t('
                                + message.pose.pose.orientation.w.toFixed(3)
                                + ', ' + message.pose.pose.orientation.x.toFixed(3)
                                + ', ' + message.pose.pose.orientation.y.toFixed(3)
                                + ', ' + message.pose.pose.orientation.z.toFixed(3)
                                + ')\nPosition: \t(' + message.pose.pose.position.x.toFixed(3)
                                + ', ' + message.pose.pose.position.y.toFixed(3)
                                + ', ' + message.pose.pose.position.z.toFixed(3)
                                + ')\nVelocity: \t(' + message.twist.twist.linear.x.toFixed(3)
                                + ', ' + message.twist.twist.linear.y.toFixed(3)
                                + ', ' + message.twist.twist.linear.z.toFixed(3) + ')';

        });

    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    launchHusky(){
        let launcher = new ROSLIB.Service({
        ros: this.ros,
        name: '/launch_husky',
        serviceType: 'std_srvs/Empty'
        })

        let request = new ROSLIB.ServiceRequest({});

        launcher.callService(request, function(result: any){
        console.log("Successfully launched husky simulator");
        })
    }

    shutdownHusky(){
        let launcher = new ROSLIB.Service({
        ros: this.ros,
        name: '/shutdown_husky',
        serviceType: 'std_srvs/Empty'
        })

        let request = new ROSLIB.ServiceRequest({});

        launcher.callService(request, function(result: any){
        console.log("Successfully shutdown husky simulator");
        })
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
