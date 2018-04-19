import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../../_services/index';
import { User } from '../../../_models/index';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: 'change-username.component.html',
})

export class ChangeUsernameComponent {
  model: User;
  currentUser: User;
  loading = false;
  

  constructor(private userService: UserService, private alertService: AlertService, private router: Router){
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	this.model = this.currentUser;
  }

  
  changeUsername() {
      this.loading = true;
      this.userService.update(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Username change successful.', true);
		  localStorage.setItem('currentUser', JSON.stringify(this.model));
		  this.router.navigate(['/settings']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
}
