import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'messages', component: MessagesComponent}
];
