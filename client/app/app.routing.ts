import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthComponent } from './auth/index';
import { JackalComponent } from './jackal/index';
import { WelcomeComponent } from './welcome/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard],
      children:[
        {path: '', component: WelcomeComponent},
        {path: 'jackal', component: JackalComponent}
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
