import {Component} from "@angular/core";
import {AuthenticationService} from "../authentication/authentication.service";
import {ThemeproviderService} from "../theme/themeprovider.service";

@Component({
  selector: 'LoginComponent',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public loginnaam = '';
  public wachtwoord = '';
  public foutmelding = '';

  constructor(public authenticationservice: AuthenticationService, public themeproviderService: ThemeproviderService) {

  }

  private login() {
   /* this.authenticationservice.loginToApp(this.loginnaam, this.wachtwoord).catch( (err) => {
      s
    });*/
   this.authenticationservice.loginToApp(this.loginnaam, this.wachtwoord, (error) => {
     switch (error) {
       case 'auth/invalid-email' : this.foutmelding = 'Deze gebruiker heeft geen geldig email adress.'; break;
       case 'auth/wrong-password' : this.foutmelding = 'Fout wachtwoord'; break;
       case 'auth/user-not-found' : this.foutmelding = 'Verkeerde inloggegevens'; break;
       default: this.foutmelding = error; break;
     }
   });
    //if(!this.authenticationservice.isLoggedIn()) { this.foutmelding = 'Ongeldige logingegevens'; console.log('ongeldig')}
  }
}
