import { Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:'contact', component: ContactusComponent},
    {path:'home', component: HomeComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
