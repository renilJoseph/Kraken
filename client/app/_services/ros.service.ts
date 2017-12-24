import {Injectable} from '@angular/core';
declare var ROSLIB: any;

@Injectable()
export class RosService{
  private ros: any;

  constructor(){}
  public getROS(): any{
    if(!this.ros)
    {
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
    }
    return this.ros;
  }
}
