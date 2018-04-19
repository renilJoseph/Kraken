import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../../_services/index';
import { User } from '../../_models/index';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'forgot-password.component.html',
})

export class ForgotPasswordComponent {
  //model: User;
  //currentUser: User;
  loading = false;
  

  constructor(private userService: UserService, private alertService: AlertService, private router: Router){
	//this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	//this.model = this.currentUser;
  }

/*  
  sendEmail() {
      this.loading = true;
      //get all users from service, returns array of Json Objects. Search and get email from correct username. Use email for emailjs service 
  }
*/
}
