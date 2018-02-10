import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../_services/index';
import { User } from '../../_models/index';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: 'change-password.component.html',
})

export class ChangePasswordComponent {
  model: User;
  currentUser: User;
  loading = false;
  

  constructor(private userService: UserService, private alertService: AlertService, private router: Router){
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	this.model = this.currentUser;
  }
 

  changePassword() {
      this.loading = true;
      this.userService.update(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Password change successful.', true);
		  localStorage.setItem('currentUser', JSON.stringify(this.model));
		  this.router.navigate(['/settings']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
