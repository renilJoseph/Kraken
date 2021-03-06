import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../_models/index';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { HideService, RosService } from '../../_services/index';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
  providers:  [RosService]
})

export class MenubarComponent implements OnInit{
  currentUser: User;
  show: boolean;
  socket : any;
  constructor(public hideservice: HideService,
              private rosService:RosService,
              public modal: Modal,
              private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.show = hideservice.getIt();
    this.socket = "";
  }

  showTlm() {
   this.hideservice.showIt();
   this.show = true;
  }

  hideTlm() {
   this.hideservice.hideIt();
   this.show = false;
  }

  setSocket(socketAddress: string, nextRoute: string)
  {
    this.rosService.setSocketAddress(socketAddress);
    this.router.navigate([nextRoute]);
  }

  getWebSocket(nextRoute: string){
    const dialogRef = this.modal.prompt()
    .size('lg')
    .isBlocking(true)
    .showClose(true)
    .keyboard(27)
    .title('Enter WebSocket Address')
    .body('Please leave out port number')
    .open()
    .then( dialogRef => {
      dialogRef.result.then( result => this.setSocket(result, nextRoute))
    });
  }

  ngOnInit(){ }
}
