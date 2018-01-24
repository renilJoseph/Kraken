import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../_models/index';

@Component({
  moduleId: module.id,
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenubarComponent implements OnInit{
  currentUser: User;
  @Output() onTlm = new EventEmitter<boolean>();
  showTlm : boolean;
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.showTlm = true;
  }
  ShowButton(value: boolean){
	this.onTlm.emit(value)
        this.showTlm = true;
  }
  HideButton(value: boolean){
	this.onTlm.emit(value)
        this.showTlm = false;
  }

 
  ngOnInit(){
  }
}
