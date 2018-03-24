import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

//module we add to use services are HTTP
// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './apidata.service';
import { SecondpageComponent } from './secondpage/secondpage.component';
import { NavcomponentComponent } from './navcomponent/navcomponent.component';
import { SearchcomponentComponent } from './searchcomponent/searchcomponent.component';
import { LandingcomponentComponent } from './landingcomponent/landingcomponent.component';
import { FootercomponentComponent } from './footercomponent/footercomponent.component';

//importing the global module
import {Globals} from './globals';

//routing module
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [ 
  { path: '', component: SearchcomponentComponent  },
  { path: 'secondpage', component:  SecondpageComponent },
  { path: 'login', component:  LoginComponent },
  { path: 'register', component:  RegisterComponent },
  { path: 'profile', component:  ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SecondpageComponent,
    NavcomponentComponent,
    SearchcomponentComponent,
    LandingcomponentComponent,
    FootercomponentComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [DataService,Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
