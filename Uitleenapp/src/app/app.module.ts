import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AuthenticationService} from './authentication/authentication.service';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {IngelogdComponent} from './ingelogd/ingelogd.component';
import {AuthguardService} from './authentication/authguard.service';
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import {FormsModule} from '@angular/forms';
import { jqxButtonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbuttons';
import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
import { jqxPasswordInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxpasswordinput';
import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxDockPanelComponent  } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdockpanel';
import { jqxPanelComponent  } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxpanel';
import { jqxMenuComponent  } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxmenu';
import {ThemeproviderService} from './theme/themeprovider.service';
import {MenuComponent} from "./menu/menu.component";


export const firebaseConfig = {
  apiKey: 'AIzaSyD7xwN0D0x1AaMqzO8sYrdGrpTPc-wcK8M',
  authDomain: 'teamnrrl.firebaseapp.com',
  databaseURL: 'https://teamnrrl.firebaseio.com',
  projectId: 'teamnrrl',
  storageBucket: 'teamnrrl.appspot.com',
  messagingSenderId: '744285988545'
};

const appRoutes: Routes = [
  { path: 'loguit', component: LoginComponent},
  { path: 'ingelogd', component: IngelogdComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IngelogdComponent,
    jqxButtonComponent,
    jqxInputComponent,
    jqxPasswordInputComponent,
    jqxDropDownListComponent,
    jqxMenuComponent,
    jqxDockPanelComponent,
    jqxPanelComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    AuthenticationService,
    AuthguardService,
    ThemeproviderService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
