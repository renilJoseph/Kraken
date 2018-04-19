import { Component, ViewChild } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    @ViewChild('show') show: Boolean;
}