import { Component, OnInit } from '@angular/core';
import { RosService } from '../_services/index';

declare var ROSLIB: any;

@Component({
  moduleId: module.id,
  selector: 'telemetry',
  templateUrl: 'telemetry.component.html',
  providers: [RosService]
})

export class TelemetryComponent implements OnInit {
  ros: any;
  constructor(private rosService: RosService){

  }
  ngOnInit(){
    this.ros = this.rosService.getROS();
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
}
