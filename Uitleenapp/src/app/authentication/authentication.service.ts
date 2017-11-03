import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';
import {UserDto} from './user.dto';
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {ServiceProvider} from "../service.provider";

@Injectable()
export class AuthenticationService {
  private loggedInUser: UserDto = null;

  constructor(private firebaseAuth: AngularFireAuth, public userService: UserService, public router: Router, public serviceProvider: ServiceProvider) {
    //this.firebaseAuth.auth.setPersistence('local'); //wanneer pagina word gesloten word nog onthouden of ingelogd of niet

    this.firebaseAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.loggedInUser = null;
          serviceProvider.forgetAllServices();
        } else {
          userService.getUserByKey(auth.displayName).then(user => {
            this.loggedInUser = user;
            serviceProvider.createLeningService();
            serviceProvider.createProductService();
            serviceProvider.createUserService();
          });
          //createUser(new UserDto('Stu', 'dent', 'Student', 'Student', 'student@hu.nl', Rollen.Student));
          //this.firebaseAuth.auth.sendPasswordResetEmail("lucas.bos@student.hu.nl");
        }
      }
    );
  }

  createUser(user: UserDto) {
    this.userService.newUser(user);
    this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.wachtwoord);
  }

  loginToApp(loginnaam: string, wachtwoord: string, displayErrorFunction: (error: string) => void): void {
    this.userService.getEmailAndIdFromLoginnaam(loginnaam).then( value => {
      let error: boolean = value.email == null;
      if(!error) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(value.email, wachtwoord).catch(reason => {
          //displayErrorFunction(reason.code);
          displayErrorFunction('Uw gebruikersnaam of wachtwoord is niet juist, probeer het opnieuw.');
          error = true;
        }).then(() => {
          if (!error) this.firebaseAuth.auth.currentUser.updateProfile({displayName: value.id, photoURL: ''});
        });
      }
      if(error) displayErrorFunction('Uw gebruikersnaam of wachtwoord is niet juist, probeer het opnieuw.');
    });
  }

  public isLoggedIn(): boolean {
    return this.loggedInUser != null;
  }

  public getLoggedInUser(): UserDto {
    return this.loggedInUser;
  }

  logout(): void {
    this.firebaseAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
