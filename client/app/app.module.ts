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
import { LoginComponent } from './auth/login/index';
import { RegisterComponent } from './auth/register/index';
import { TeleopComponent } from './home/teleop/index';
import { AuthComponent } from './auth/index';
import { MenubarComponent } from './home/menubar/index';
import { JackalComponent } from './home/jackal/index';
import { JackalTelemetryComponent } from './home/jackal/index'
import { WelcomeComponent } from './home/welcome/index';
import { SettingsComponent } from './home/settings/index';
import { ChangeNameComponent } from './home/settings/change-name/index';
import { ChangeUsernameComponent } from './home/settings/change-username/index';
import { ChangePasswordComponent } from './home/settings/change-password/index';
import { ChangeEmailComponent } from './home/settings/change-email/index';
import { ForgotPasswordComponent } from './auth/forgot-password/index';
import { HuskyComponent } from './home/husky/index';
import { HuskyTelemetryComponent } from './home/husky/index'
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
