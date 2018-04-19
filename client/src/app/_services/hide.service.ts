import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class HideService {

	showTelemetry : boolean = true;

	showIt() {
		this.showTelemetry = true;
	}
	hideIt() {
		this.showTelemetry = false;
	}
	
	getIt(){
		return this.showTelemetry;
	}

}
