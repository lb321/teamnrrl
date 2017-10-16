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
    this.authenticationservice.loginToApp(this.loginnaam, this.wachtwoord);
    if(!this.authenticationservice.isLoggedIn()) { this.foutmelding = 'Ongeldige logingegevens'; console.log('ongeldig')}
  }
}
