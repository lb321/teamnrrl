import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import {UserDto} from './user.dto';
import {rollen} from './rollen.enum';

@Injectable()
export class AuthenticationService {
  private users: UserDto[] = [];
  private loggedInUser: UserDto = null;

  constructor(private firebaseAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    this.firebaseAuth.auth.signInAnonymously();
    afDatabase.list('/users').forEach((item) => {
      this.users.push(new UserDto(item[0]['voornaam'], item[0]['achternaam'], item[0]['inlognaam'], item[0]['wachtwoord'], item[0]['email'], item[0]['rol']));
    });

    /*this.firebaseAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.user = null;
          this.loggedIn = false;
        } else {
          console.log(auth);
          this.loginToApp(this.username, this.password);
          //this.username = auth.displayName;
          //this.newUser(new UserDto('Lucas', 'Bos', 'LBos', 'LBos321', 'lucas.bos@student.hu.nl', rollen.Beheerder));
          //this.userExists("Lucas");
        }
      }
    );*/
  }

  newUser(user: UserDto) {
    /*this.items.push({
      'voornaam': user.voornaam,
      'achternaam': user.achternaam,
      'inlognaam': user.inlognaam,
      'wachtwoord': user.wachtwoord,
      'email': user.email,
      'rol': rollen[user.rol]
      });*/
  }

  getUser(inlognaam: string, wachtwoord: string): UserDto {
    /*this.items.forEach(item => {
      console.log(item[0]['inlognaam'] + ', ' + inlognaam + ', ' + wachtwoord + ', ' + item[0]['wachtwoord']);
      if (item[0]['inlognaam'].valueOf() == inlognaam.valueOf() && item[0]['wachtwoord'].valueOf() == wachtwoord.valueOf()) {
        console.log('set user');
        user = new UserDto(item[0]['voornaam'], item[0]['achternaam'], inlognaam, wachtwoord, item[0]['email'], item[0]['rol']);
        return;
      }

    });*/
    for (const user of this.users){
      if (user.inlognaam == inlognaam && user.wachtwoord == wachtwoord) {
        return user;
      }
    }
    return null;
  }

  loginToApp(loginnaam: string, wachtwoord: string) {
    const user: UserDto = this.getUser(loginnaam, wachtwoord);
    this.loggedInUser = user;
  }

  public isLoggedIn(): boolean {
    return this.loggedInUser != null;
  }

  public getLoggedInUser(): UserDto {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = null;
  }

}
