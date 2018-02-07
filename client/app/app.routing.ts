import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthComponent } from './auth/index';
import { JackalComponent } from './jackal/index';
import { HuskyComponent } from './husky/index';
import { WelcomeComponent } from './welcome/index';
import { SettingsComponent } from './settings/index';
import { ChangeNameComponent } from './settings/change-name/index';
import { ChangeUsernameComponent } from './settings/change-username/index';
import { ChangePasswordComponent } from './settings/change-password/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard],
      children: [
        {path: '', component: WelcomeComponent},
        {path: 'jackal', component: JackalComponent},
        {path: 'husky', component: HuskyComponent},
      	{path: 'settings', component: SettingsComponent},
      	{path: 'settings/change-password', component: ChangePasswordComponent},
      	{path: 'settings/change-name', component: ChangeNameComponent},
      	{path: 'settings/change-username', component: ChangeUsernameComponent}
      ]
    },
    { path: 'auth', component: AuthComponent,
      children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent }
      ]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
