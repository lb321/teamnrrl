import {CanActivate} from "@angular/router";
import {AuthguardService} from "./authguard.service";

export class StudentAuthguardService extends AuthguardService implements CanActivate {
}
