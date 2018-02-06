import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../_models/index';
import { HideService } from '../_services/index';
@Component({
  moduleId: module.id,
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})

export class MenubarComponent implements OnInit{
  currentUser: User;
  show: boolean; 
  constructor(public hideservice: HideService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.show = hideservice.getIt();
    //this.hideservice.toggle$.subscribe((toggle:boolean) => this.show = toggle)
  }

  showTlm() {
   this.hideservice.showIt();
   this.show = true;
  }

  hideTlm() {
   this.hideservice.hideIt();
   this.show = false;
  }

 
  ngOnInit(){
	
	//this.hideservice.getIt().subscribe((showTelemetry:any) => this.show = showTelemetry);
  }
}
