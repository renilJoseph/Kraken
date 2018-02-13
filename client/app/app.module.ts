import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, HideService } from './_services/index';
import { HomeComponent } from './home/index';
import { SensorSelectComponent } from './sensor-select/index';
import { RobotSelectComponent } from './robot-select/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { TeleopComponent } from './teleop/index';
import { AuthComponent } from './auth/index';
import { MenubarComponent } from './menubar/index';
import { JackalComponent } from './jackal/index';
import { JackalTelemetryComponent } from './jackal/index'
import { WelcomeComponent } from './welcome/index';
import { SettingsComponent } from './settings/index';
import { ChangeNameComponent } from './settings/change-name/index';
import { ChangeUsernameComponent } from './settings/change-username/index';
import { ChangePasswordComponent } from './settings/change-password/index';
import { ChangeEmailComponent } from './settings/change-email/index';
import { ForgotPasswordComponent } from './forgot-password/index';
import { HuskyComponent } from './husky/index';
import { HuskyTelemetryComponent } from './husky/index'
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        ModalModule.forRoot(),
        BootstrapModalModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        RobotSelectComponent,
        SensorSelectComponent,
        TeleopComponent,
        AuthComponent,
        MenubarComponent,
        JackalComponent,
        JackalTelemetryComponent,
        WelcomeComponent,
        SettingsComponent,
        ChangeNameComponent,
        ChangeUsernameComponent,
        ChangePasswordComponent,
        ChangeEmailComponent,
        ForgotPasswordComponent,
        HuskyComponent,
        HuskyTelemetryComponent
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        HideService,
        AuthenticationService,
	      MenubarComponent,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
