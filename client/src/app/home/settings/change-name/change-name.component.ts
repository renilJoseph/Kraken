import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../../_services/index';
import { User } from '../../../_models/index';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  templateUrl: 'change-name.component.html',
})

export class ChangeNameComponent{
  model: User;
  currentUser: User;
  loading = false;
  

  constructor(private userService: UserService, private alertService: AlertService, private router: Router){
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	this.model = this.currentUser;
  }

 

  changeName() {
      this.loading = true;
      this.userService.update(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Name change successful.', true);
		  localStorage.setItem('currentUser', JSON.stringify(this.model));
		  this.router.navigate(['/settings']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }


}
