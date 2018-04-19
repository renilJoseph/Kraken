"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var index_2 = require("./auth/login/index");
var index_3 = require("./auth/index");
var index_4 = require("./home/jackal/index");
var index_5 = require("./home/husky/index");
var index_6 = require("./home/welcome/index");
var index_7 = require("./home/settings/index");
var index_8 = require("./home/settings/change-name/index");
var index_9 = require("./home/settings/change-username/index");
var index_10 = require("./home/settings/change-password/index");
var index_11 = require("./home/settings/change-email/index");
var index_12 = require("./home/settings/add-users/index");
var index_13 = require("./home/settings/delete-users/index");
var index_14 = require("./auth/forgot-password/index");
var index_15 = require("./_guards/index");
var appRoutes = [
    { path: '', component: index_1.HomeComponent, canActivate: [index_15.AuthGuard],
        children: [
            { path: '', component: index_6.WelcomeComponent },
            { path: 'jackal', component: index_4.JackalComponent },
            { path: 'husky', component: index_5.HuskyComponent },
            { path: 'settings', component: index_7.SettingsComponent },
            { path: 'settings/change-password', component: index_10.ChangePasswordComponent },
            { path: 'settings/change-name', component: index_8.ChangeNameComponent },
            { path: 'settings/change-username', component: index_9.ChangeUsernameComponent },
            { path: 'settings/change-email', component: index_11.ChangeEmailComponent },
            { path: 'settings/add-users', component: index_12.AddUsersComponent },
            { path: 'settings/delete-users', component: index_13.DeleteUsersComponent }
        ]
    },
    { path: 'auth', component: index_3.AuthComponent,
        children: [
            { path: 'login', component: index_2.LoginComponent },
            //{ path: 'register', component: RegisterComponent },
            { path: 'forgot', component: index_14.ForgotPasswordComponent }
        ]
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map