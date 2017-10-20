import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";

@Injectable()
export class LeningService {
  private leningen: FirebaseListObservable<any>;

  constructor(public afDatabase: AngularFireDatabase) {
    this.leningen = this.afDatabase.list('/leningen');
  }
}
