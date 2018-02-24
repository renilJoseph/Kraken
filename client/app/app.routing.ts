import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { LoginComponent } from './auth/login/index';
import { RegisterComponent } from './auth/register/index';
import { AuthComponent } from './auth/index';
import { JackalComponent } from './home/jackal/index';
import { HuskyComponent } from './home/husky/index';
import { WelcomeComponent } from './home/welcome/index';
import { SettingsComponent } from './home/settings/index';
import { ChangeNameComponent } from './home/settings/change-name/index';
import { ChangeUsernameComponent } from './home/settings/change-username/index';
import { ChangePasswordComponent } from './home/settings/change-password/index';
import { ChangeEmailComponent } from './home/settings/change-email/index';
import { ForgotPasswordComponent } from './auth/forgot-password/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard],
      children: [
        {path: '', component: WelcomeComponent},
        {path: 'jackal', component: JackalComponent},
	{path: 'husky', component: HuskyComponent },
	{path: 'settings', component: SettingsComponent},
	{path: 'settings/change-password', component: ChangePasswordComponent},
	{path: 'settings/change-name', component: ChangeNameComponent},
	{path: 'settings/change-username', component: ChangeUsernameComponent},
	{path: 'settings/change-email', component: ChangeEmailComponent}
      ]
    },
    { path: 'auth', component: AuthComponent,
      children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
	{ path: 'forgot', component: ForgotPasswordComponent }
      ]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
