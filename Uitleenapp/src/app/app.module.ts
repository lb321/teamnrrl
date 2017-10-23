import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AuthenticationService} from './authentication/authentication.service';
import {LoginComponent} from './login/login.component';
import {IngelogdComponent} from './ingelogd/ingelogd.component';
import {AuthguardService} from './authentication/authgaurds/authguard.service';
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import {FormsModule} from '@angular/forms';
import { jqxButtonComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbuttons';
import { jqxInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxinput';
import { jqxPasswordInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxpasswordinput';
import { jqxDropDownListComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxDockPanelComponent  } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdockpanel';
import { jqxPanelComponent  } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxpanel';
import { jqxMenuComponent  } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxmenu';
import { jqxDataTableComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdatatable';
import { jqxValidatorComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxvalidator';
import {ThemeproviderService} from './theme/themeprovider.service';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component';
import {ProductenComponent} from './product/producten/producten.component';
import {ProductService} from './product/product.service';
import {LeningService} from './lening/lening.service';
import {LeningIndienenComponent} from './lening/leningindienen/leningIndienen.component';
import {ProductToevoegenComponent} from './product/productToevoegen/productToevoegen.component';
import {LeningenComponent} from './lening/leningen/leningen.component';
import {LeningDetailsComponent} from './lening/leningdetails/leningDetails.component';
import {appRoutingProviders, Routing} from './app.routes';
import {UserService} from "./authentication/user.service";

export const firebaseConfig = {
  apiKey: 'AIzaSyD7xwN0D0x1AaMqzO8sYrdGrpTPc-wcK8M',
  authDomain: 'teamnrrl.firebaseapp.com',
  databaseURL: 'https://teamnrrl.firebaseio.com',
  projectId: 'teamnrrl',
  storageBucket: 'teamnrrl.appspot.com',
  messagingSenderId: '744285988545'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IngelogdComponent,
    ProductenComponent,
    HomeComponent,
    LeningIndienenComponent,
    LeningenComponent,
    LeningDetailsComponent,
    jqxButtonComponent,
    jqxInputComponent,
    jqxPasswordInputComponent,
    jqxDropDownListComponent,
    jqxMenuComponent,
    jqxDockPanelComponent,
    jqxPanelComponent,
    jqxDataTableComponent,
    jqxValidatorComponent,
    MenuComponent,
    ProductToevoegenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    AuthenticationService,
    UserService,
    AuthguardService,
    ThemeproviderService,
    ProductService,
    LeningService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
