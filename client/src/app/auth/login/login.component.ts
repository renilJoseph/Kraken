import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, UserService } from '../../_services/index';
import { adminConfig } from '../../admin.config';
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    amodel: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
	private userService: UserService,
        private alertService: AlertService) {


	this.amodel.username = adminConfig.username;
	this.amodel.emailAddr = adminConfig.emailAddress;
	this.amodel.firstName = adminConfig.ownerfname;
	this.amodel.lastName = adminConfig.ownerlname;
	this.amodel.password = adminConfig.password;
	this.amodel.isPriviledged = true;
	this.silentRegister();
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    silentRegister() {
        this.userService.create(this.amodel)
            .subscribe(
                data => {},
                error => {});
    }
}
