import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {UserDto} from './user.dto';
import {Injectable} from '@angular/core';
import {rollen} from './rollen.enum';

@Injectable()
export class UserService {
  private userList: FirebaseListObservable<any>;
  private users: UserDto[] = [];
  constructor(public afDatabase: AngularFireDatabase) {
    this.userList = this.afDatabase.list('/users');
    this.userList.subscribe( userlist => {
      this.users = userlist;
    });
  }

  getEmailAndIdFromLoginnaam(loginnaam: string): Promise<any> {
    return this.afDatabase.database.ref('/usernames/' + loginnaam).once('value').then(snapshot => {
      const snap = snapshot.val();
      if (snap != null) {
        return {'email' : snap.email, 'id': snap.id};
      }
      return {};
    });
  }

  getUserByKey(key: string): Promise<UserDto> {
    const usr = this.afDatabase.database.ref('/users/' + key);
    return usr.once('value').then(snapshot => {
      let returnedUser: UserDto = null;
      const user = snapshot.val();
      returnedUser = new UserDto(user.voornaam, user.achternaam, user.inlognaam, user.wachtwoord, user.email, user.rol);
      if(user.studentnummer) returnedUser.studentnummer = user.studentnummer;
      return returnedUser;
    });
    //return returnedUser;
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
      'rol': rollen[user.rol],
      'studentnummer': user.studentnummer
    });
  }

  getUserByStudentnummer(studentnummer: number): UserDto {
    for(const user of this.users){
      if(user.studentnummer == studentnummer) return user;
    }
    return null;
  }
}
