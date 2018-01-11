import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';

@Component({
  moduleId: module.id,
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenubarComponent implements OnInit{
  currentUser: User;
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit(){
  }
}
