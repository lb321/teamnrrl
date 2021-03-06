import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Injectable()
export class AuthguardService implements CanActivate {
  constructor(protected auth: AuthenticationService) {

  }

  canActivate() {
    return this.auth.isLoggedIn();
  }
}
