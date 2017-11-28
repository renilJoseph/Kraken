import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

declare var ROSLIB: any;
declare var ROS3D: any;

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    ros: any;
    currentUser: User;
    users: User[] = [];
    show: boolean = true;
    speed1: any = 0;
    messageOutput: string = 'Odometry Telemetry';
    intervalVar: any;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    ngOnInit() {
        this.loadAllUsers();
        this.ros = new ROSLIB.Ros({
            url : 'ws://localhost:9090'
          });
        
        this.ros.on('connection', function() {
        console.log('Connected to websocket server.');
        });
    
        this.ros.on('error', function(error: any) {
        console.log('Error connecting to websocket server: ', error);
        });
    
        this.ros.on('close', function() {
        console.log('Connection to websocket server closed.');
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
            if(this.show == true)
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
            else
                this.messageOutput = '';
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

    pubCmdVel(speed: number)
    {
        this.stopCmdVel();
        var cmdVel = new ROSLIB.Topic({
            ros : this.ros,
            name : '/cmd_vel',
            messageType : 'geometry_msgs/Twist'
        });
        var twist = new ROSLIB.Message({
            linear : {
            x : speed,
            y : 0.0,
            z : 0.0
            },
            angular : {
            x : 0,
            y : 0,
            z : 0
            }
        });

        this.intervalVar = setInterval(() => {
			cmdVel.publish(twist);
  		}, 100);
    }

    stopCmdVel()
    {
        clearInterval(this.intervalVar);
    }


}