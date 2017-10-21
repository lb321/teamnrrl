import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {LeningDto} from "./lening.dto";

@Injectable()
export class LeningService {
  private leninglist: FirebaseListObservable<any>;
  private leningen: LeningDto[];
  private aantalLeningen: number = 0;

  constructor(public afDatabase: AngularFireDatabase) {
    this.leninglist = this.afDatabase.list('/leningen');
    this.leninglist.subscribe( item => {
      this.aantalLeningen = 0;
      item.forEach((lening, index, array) => {
        //voeg toe aan leningen
      });
    });
  }

  leningIndienen(lening: LeningDto) {
    this.leninglist.push({
      //'studentnummer': lening.user
    });
  }
}
