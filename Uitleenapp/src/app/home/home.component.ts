import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'HomeComponent',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  constructor(public authenticationservice: AuthenticationService) {
  }
}
