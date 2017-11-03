import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {IngelogdComponent} from './ingelogd/ingelogd.component';
import {HomeComponent} from './home/home.component';
import {ProductenComponent} from './product/producten/producten.component';
import {LeningIndienenComponent} from './lening/leningindienen/leningIndienen.component';
import {ProductToevoegenComponent} from './product/productToevoegen/productToevoegen.component';
import {LeningenComponent} from './lening/leningen/leningen.component';
import {LeningDetailsComponent} from './lening/leningdetails/leningDetails.component';
import {AuthguardService} from './authentication/authgaurds/authguard.service';
import {OphaalmomentAangevenComponent} from './lening/ophaalmoment/ophaalmomentaangeven/ophaalmomentAangeven.component';
import {LeningRetournerenAdministrerenComponent} from "./lening/leningretourneren/leningretournerenadministreren.component";

export const appRoutes: Routes = [
  { path: 'loguit', component: LoginComponent},
  { path: 'ingelogd', component: IngelogdComponent},
  { path: 'home', component: HomeComponent},
  { path: 'producten', component: ProductenComponent, canActivate: [AuthguardService]},
  { path: 'leningen/indienen', component: LeningIndienenComponent, canActivate: [AuthguardService]},
  { path: 'producten/toevoegen', component: ProductToevoegenComponent, canActivate: [AuthguardService]},
  { path: 'leningen', component: LeningenComponent, canActivate: [AuthguardService]},
  { path: 'leningen/details', component: LeningDetailsComponent, canActivate: [AuthguardService]},
  { path: 'leningen/details/ophaalmomentaangeven', component: OphaalmomentAangevenComponent, canActivate: [AuthguardService]},
  { path: 'leningen/details/retournerenadministreren', component: LeningRetournerenAdministrerenComponent, canActivate: [AuthguardService]}
];

export const appRoutingProviders: any[] = [

];

export const Routing = RouterModule.forRoot(appRoutes);
