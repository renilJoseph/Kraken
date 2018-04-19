import { Component, OnInit, DoCheck, EventEmitter, Input, HostListener, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { User } from '../../_models/index';
import { UserService } from '../../_services/index';
import { RosService } from '../../_services/index';
import { HideService } from '../../_services/index';
import { appConfig } from '../../app.config';

declare var ROSLIB: any;
declare var ROS3D: any;
declare var MJPEGCANVAS: any;
declare var ROS2D: any;
declare var NAV2D: any;

@Component({
    moduleId: module.id,
    templateUrl: 'jackal.component.html',
})

export class JackalComponent implements OnInit {
    ros: any;
	mapViewer: any;
    currentUser: User;
    users: User[] = [];
    show: boolean;
	topic = '/image';
    private image1 = 'http://' + appConfig.robotUrl + ':8080/stream?topic=' + this.topic + '&width=900&height=550';
    private large = false;
    public innerWidth: any;
    public innerHeight: any;
    private calcWidth: any;
    private calcHeight: any;
    private currentWidth: any;
    private currentHeight: any;
    private nav: any;
    private viewMap = false;
    private prevHideServiceValue = false;
    resizeTimeout: any;
    @ViewChild('TLM') TLM:ElementRef
    ngDoCheck() {
      /*
      if(this.hideservice.getIt()) {
    		this.resizeViewer(.635);
        	}
    	else if(!this.hideservice.getIt()) {
    		this.resizeViewer(.95);
    	}
      */

    	if(this.hideservice.getIt() && !this.prevHideServiceValue) {
    		this.resizeViewer(.635);
        	}
    	else if(!this.hideservice.getIt() && this.prevHideServiceValue) {
    		this.resizeViewer(.95);
    	}
      this.prevHideServiceValue = this.hideservice.getIt();

    }

    constructor(private userService: UserService, private rosService:RosService, public hideservice: HideService, public modal: Modal) {
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

	resizeViewer(widthMultiplier: any)
	{
		//calculate a width based on the available vertical space
		this.calcWidth = ((this.innerHeight - 90)*16/9);
		//calculate a height based on the available horizontal space (account for the presence of telemetry)
		this.calcHeight = (widthMultiplier*this.innerWidth*9/16);
		//if the calculated width is wider than what is available, use the calculated height
		if(this.calcWidth > (widthMultiplier*this.innerWidth))
		{
            this.currentWidth = (widthMultiplier*this.innerWidth);
            this.currentHeight = this.calcHeight;
		}
		else
		{
            this.currentWidth = this.calcWidth;
            this.currentHeight = (this.innerHeight - 90);
		}
		//now we have the best size estimate, so resize the appropriate viewer
		if(!this.viewMap)
			this.image1 = 'http://' + appConfig.robotUrl + ':8080/stream?topic=' + this.topic + '&width=' + this.currentWidth.toFixed() + '&height=' + this.currentHeight.toFixed();
		else
			{
        this.mapViewer.scene.canvas.remove();
        this.mapViewer = new ROS2D.Viewer({
            divID : 'viewer',
            width : this.currentWidth,
            height : this.currentHeight
        });

        // Setup the nav client.
        var nav = NAV2D.OccupancyGridClientNav({
            ros : this.ros,
            topic : '/map',
            serverName: '/move_base',
            rootObject : this.mapViewer.scene,
            viewer : this.mapViewer
        });
        /*
				this.mapViewer.height = this.currentHeight;
				this.mapViewer.width = this.currentWidth;
        debugger;
        this.mapViewer.scene.canvas.height = this.currentHeight;
        this.mapViewer.scene.canvas.width = this.currentWidth;
        this.mapViewer.scene.canvas.style.width = this.currentWidth;
        this.mapViewer.scene.canvas.style.height = this.currentHeight;
        this.mapViewer.scaleToDimensions(this.currentWidth, this.currentHeight);
        var nav = NAV2D.OccupancyGridClientNav({
           	ros : this.ros,
           	topic : '/map',
            serverName: '/move_base',
           	rootObject : this.mapViewer.scene,
           	viewer : this.mapViewer
        });
        */
			}
	}

    ngOnInit() {
      	this.loadAllUsers();
      	this.ros = this.rosService.getROS();
      	this.innerWidth = window.innerWidth;
      	this.innerHeight = window.innerHeight;
      	this.image1 = 'http://' + appConfig.robotUrl + ':8080/stream?topic=' + this.topic + '&width=' + (.635*this.innerWidth).toFixed() + '&height=' + ((.635*this.innerWidth)*9/16).toFixed();
		// Create the main viewer.
       	this.mapViewer = new ROS2D.Viewer({
           	divID : 'viewer',
           	width : 600,
           	height : 480
        });

        // Setup the nav client.
        var nav = NAV2D.OccupancyGridClientNav({
           	ros : this.ros,
           	topic : '/map',
            serverName: '/move_base',
           	rootObject : this.mapViewer.scene,
           	viewer : this.mapViewer
        });
		      this.mapViewer.scene.canvas.hidden = true;
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    resizeWindow(input: string)
    {

	  var inputs = input.split(',').map(el => {
  		let n = Number(el);
  		return isNaN(n) ? el : n;
	  });
      var roi = new ROSLIB.Topic({
        ros : this.ros,
        name : '/screen_grab/roi',
        messageType : 'sensor_msgs/RegionOfInterest'
      });
      var region = new ROSLIB.Message({
        x_offset : this.ToUint32(inputs[0]),
        y_offset : this.ToUint32(inputs[1]),
        height : this.ToUint32(inputs[3]),
        width : this.ToUint32(inputs[2]),
        do_rectify : false
      });

      roi.publish(region);
    }

	resizeBox()
	{
	    const dialogRef = this.modal.prompt()
    	.size('lg')
    	.isBlocking(true)
    	.showClose(true)
    	.keyboard(27)
    	.title('Enter the dimensions')
		.body('Format is xOffset, yOffset, Width, Height')
    	.open();

	   dialogRef
		   .then( dialogRef => {
		       dialogRef.result.then( result => this.resizeWindow(result))
		   });
	}

	//change the topic that is displayed, so kinect image
	changeTopic(topicName: any)
	{
		this.topic = topicName;
		if(this.hideservice.getIt())
		{
			this.resizeViewer(.635);
    	}
		else
		{
			this.resizeViewer(.95);
		}
	}

	//modal box for the topic change
	topicBox() {
	    const dialogRef = this.modal.prompt()
    	.size('lg')
    	.isBlocking(true)
    	.showClose(true)
    	.keyboard(27)
    	.title('Enter the new topic name')
		.body('Remember the /')
    	.open();

	   dialogRef
		   .then( dialogRef => {
		       dialogRef.result.then( result => this.changeTopic(result))
		   });
	  }

	//toggle the viewer between the map style view, and the image topic stream
	toggleViewerType()
	{
		if(!this.viewMap)
		{
			this.image1 = "";
		    var img = document.getElementById('image1');
    		//img.style.visibility = 'hidden';
			this.viewMap = true;
			//this.mapViewer.scene.canvas.hidden = false;
		}
		else
		{
			this.viewMap = false;
			this.mapViewer.scene.canvas.hidden = true;
		    var img = document.getElementById('image1');
    		//img.style.visibility = 'visible';
        this.mapViewer.scene.canvas.remove();

		}
		if(this.hideservice.getIt() == true)
			this.resizeViewer(.635);
		else
			this.resizeViewer(.95);
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
