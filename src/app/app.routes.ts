import { Routes } from '@angular/router';
import { RegisterComponent } from '../allComponents/adminPanel/register/register.component';
import { DashboardComponent } from '../allComponents/adminPanel/dashboard/dashboard.component';
import { LoginComponent } from '../allComponents/adminPanel/login/login.component';

import { UserDashboradComponent } from '../allComponents/adminPanel/user-dashborad/user-dashborad.component';
import { ProjectViewComponent } from '../allComponents/formFolders/project-form/project-view/project-view.component';
import { UserDetailsComponent } from '../allComponents/user-details/user-details.component';


export const routes: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'user', component: UserDetailsComponent },
    { path: 'user-dashboard', component: UserDashboradComponent },
    { path: 'view-project/:id', component: ProjectViewComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', redirectTo: '/login' }, // Logout route that redirects to login
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
   
];
