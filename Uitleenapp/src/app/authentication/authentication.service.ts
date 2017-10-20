import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import {UserDto} from './user.dto';
import {rollen} from './rollen.enum';

@Injectable()
export class AuthenticationService {
  private loggedInUser: UserDto = null;

  constructor(private firebaseAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    this.firebaseAuth.auth.setPersistence('local'); //wanneer pagina word gesloten word nog onthouden of ingelogd of niet
    this.firebaseAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.loggedInUser = null;
        } else {
          const user = this.afDatabase.database.ref('/users/' + auth.displayName);
          user.once('value').then(snapshot => {
            const usr = snapshot.val();
            this.loggedInUser = new UserDto(usr.voornaam, usr.achternaam, usr.inlognaam, usr.wachtwoord, usr.email, usr.rol);
          });
          //this.newUser(new UserDto('Stu', 'dent', 'Student', 'Student', 'student@hu.nl', rollen.Student));
          //this.firebaseAuth.auth.sendPasswordResetEmail("lucas.bos@student.hu.nl");
        }
      }
    );
  }

  newUser(user: UserDto) {
    this.afDatabase.list("/usernames").push({
      'email': user.email
    }); //handmatig in /usernames het id in de username veranderen en het id van de user toevoegen
    this.afDatabase.list("/users").push({
      'voornaam': user.voornaam,
      'achternaam': user.achternaam,
      'inlognaam': user.inlognaam,
      'wachtwoord': user.wachtwoord,
      'email': user.email,
      'rol': rollen[user.rol]
      });
    this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.wachtwoord);
  }

  loginToApp(loginnaam: string, wachtwoord: string, displayErrorFunction: (error: string) => void): void {
    const username = this.afDatabase.database.ref('/usernames/' + loginnaam);
    let uname = '';
    username.once('value').then(snapshot => {
      const usr = snapshot.val();
      if (usr != null) {
        uname = usr.email;
        let error: boolean = false;
        this.firebaseAuth.auth.signInWithEmailAndPassword(uname, wachtwoord).catch(reason => {
          displayErrorFunction(reason.code); error = true;
        }).then( () => {
          if(!error) this.firebaseAuth.auth.currentUser.updateProfile({displayName: usr.id, photoURL: ''});
        });
      }
      else displayErrorFunction("Verkeerde username");
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
  }

}
