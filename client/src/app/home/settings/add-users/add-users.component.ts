import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'add-users.component.html'
})

export class AddUsersComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
	this.model.isPriviledged = false;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('New user added!', true);
		    this.router.navigate(['/settings']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
