import {CanActivate} from "@angular/router";
import {AuthguardService} from "./authguard.service";
import {Rollen} from "../rollen.enum";

export class StudentAuthguardService extends AuthguardService implements CanActivate {

  canActivate(): boolean {
    return super.canActivate() && this.auth.getLoggedInUser().rol == Rollen.Student;
  }

}
