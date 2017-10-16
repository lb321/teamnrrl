import {Component} from '@angular/core';
import {ThemeproviderService} from '../theme/themeprovider.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {rollen} from '../authentication/rollen.enum';

@Component({
  selector: 'MenuComponent',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  constructor(public themeprovider: ThemeproviderService, public authService: AuthenticationService) {

  }

  private showStudentMenu(): boolean {
    return this.authService.getLoggedInUser() != null && this.authService.getLoggedInUser().rol.toLocaleString() == rollen[1];
  }

  private showBeheerderMenu(): boolean {
    return this.authService.getLoggedInUser() != null && this.authService.getLoggedInUser().rol.toLocaleString() == rollen[0];
  }
}
