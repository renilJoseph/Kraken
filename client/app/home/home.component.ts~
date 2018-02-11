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
    }
    ngOnInit() {
    }

}
