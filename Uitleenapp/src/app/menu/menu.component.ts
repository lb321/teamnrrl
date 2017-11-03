import {Component} from '@angular/core';
import {ThemeproviderService} from '../theme/themeprovider.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {Rollen} from '../authentication/rollen.enum';

@Component({
  selector: 'MenuComponent',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  constructor(public themeprovider: ThemeproviderService, public authService: AuthenticationService) {

  }

  private showStudentMenu(): boolean {
    //if(this.authService.getLoggedInUser() != null) console.log(this.authService.getLoggedInUser().rol.valueOf() + ", " + Rollen.Student.valueOf());
    return this.authService.getLoggedInUser() != null && this.authService.getLoggedInUser().rol.toLocaleString() == Rollen[1];
  }

  private showBeheerderMenu(): boolean {
    //if(this.authService.getLoggedInUser() != null) console.log(this.authService.getLoggedInUser().rol.valueOf() + ", " + Rollen.Beheerder.valueOf());
    return this.authService.getLoggedInUser() != null && this.authService.getLoggedInUser().rol.toLocaleString() == Rollen[0];
    //    return this.authService.getLoggedInUser() != null && this.authService.getLoggedInUser().rol.toLocaleString() == Rollen[0];
  }
}
