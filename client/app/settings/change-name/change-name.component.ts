import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../_services/index';
import { User } from '../../_models/index';

@Component({
  moduleId: module.id,
  templateUrl: 'change-name.component.html',
})

export class ChangeNameComponent{
  model: User;
  currentUser: User;
  loading = false;
  

  constructor(private userService: UserService, private alertService: AlertService){
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	this.model = this.currentUser;
  }

 
/*  get current user object and place into currentModel, copy it into model, then overwrite the object field from HTML5 form input (similar to register.component.html). 
  changelName() {
      this.loading = true;
      this.userService.update(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Name change successful.', true);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
*/


}
