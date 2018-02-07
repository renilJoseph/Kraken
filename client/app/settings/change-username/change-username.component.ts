import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../_services/index';
import { User } from '../../_models/index';

@Component({
  moduleId: module.id,
  templateUrl: 'change-username.component.html',
})

export class ChangeUsernameComponent {
  model: User;
  currentUser: User;
  loading = false;
  

  constructor(private userService: UserService, private alertService: AlertService){
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	this.model = this.currentUser;
  }

 
/*  get current user object and place into currentModel, copy it into model, then overwrite the object field from HTML5 form input (similar to register.component.html). 
  changelUsername() {
      this.loading = true;
      this.userService.update(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Username change successful.', true);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
*/
}
