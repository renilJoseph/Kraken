import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../_services/index';
import { User } from '../../_models/index';
@Component({
  moduleId: module.id,
  templateUrl: 'settings.component.html',
})

export class SettingsComponent implements OnInit{
  currentUser: User;

  constructor(private userService: UserService){
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	//this.currentUser = userService.getById(this.currentUser._id);
  }

  ngOnInit(){

  }
}
