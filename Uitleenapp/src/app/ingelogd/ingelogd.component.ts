import {Component} from "@angular/core";
import {AuthenticationService} from "../authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'IngelogdComponent',
  templateUrl: './ingelogd.component.html'
})

export class IngelogdComponent {
  constructor(public authenticationservice: AuthenticationService) {
  }
}
