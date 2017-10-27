import {CanActivate} from "@angular/router";
import {AuthguardService} from "./authguard.service";
import {rollen} from "../rollen.enum";

export class StudentAuthguardService extends AuthguardService implements CanActivate {

  canActivate(): boolean {
    return super.canActivate() && this.auth.getLoggedInUser().rol == rollen.Student;
  }

}
