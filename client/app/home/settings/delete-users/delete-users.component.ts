import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../_models/index';
import { AlertService, UserService } from '../../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'delete-users.component.html'
})

export class DeleteUsersComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private router: Router, private userService: UserService) {
	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
	this.loadAllUsers();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
