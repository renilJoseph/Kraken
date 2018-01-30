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
    currentUser: User;
    users: User[] = [];
    constructor(private userService: UserService, private rosService:RosService) {
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
    }

}
