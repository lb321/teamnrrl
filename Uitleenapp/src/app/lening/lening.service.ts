import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {LeningDto} from "./lening.dto";
import {LeningStatus} from "./leningstatus.enum";
import {ReplaySubject} from "rxjs/ReplaySubject";
import * as firebase from "firebase";
import Reference = firebase.database.Reference;
import {OphaalmomentDto} from "./ophaalmoment/ophaalmoment.dto";

@Injectable()
export class LeningService {
  private leninglist: FirebaseListObservable<any>;
  private leningen: LeningDto[];
  private aantalLeningen: number = 0;
  private leninglistObservable = new ReplaySubject(1);

  constructor(public afDatabase: AngularFireDatabase) {
    this.leninglist = this.afDatabase.list('/leningen');
    this.leninglist.subscribe( item => {
      this.leningen = item;
      this.aantalLeningen = this.leningen.length;
      this.leninglistObservable.next(this.leningen);
    });
  }

  leningIndienen(lening: LeningDto) {
    let nieuweLening = {
      'leningnummer': this.aantalLeningen + 1,
      'studentnummer': lening.user.studentnummer,
      'klascode': lening.klascode,
      'blok': lening.blok,
      'leningstatus': LeningStatus.getStringValue(LeningStatus.Ingediend),
      'uitgeleendeProducten': [

      ],
      'ophaalmomenten': [

      ]
    };
    for(const product of lening.producten){
      nieuweLening.uitgeleendeProducten.push({'productid': product.productId});
    }
    this.leninglist.push(nieuweLening);
  }

  getLeninglistObservable() {
    return this.leninglistObservable;
  }

  setOphaalmomenten(lening: LeningDto) {
    this.leninglist.forEach(leningen => {
      leningen.forEach(lening1 => {
        if(lening.leningnummer == lening1.leningnummer){
          let ophaalmomenten = [];
          for(const ophaalmoment of lening.ophaalmomenten){
            if((typeof ophaalmoment.begintijd).toString().toLocaleLowerCase() == 'date' ) ophaalmomenten.push({'begintijd': ophaalmoment.begintijd.getTime(), 'eindtijd': ophaalmoment.eindtijd.getTime()});
            else ophaalmomenten.push(ophaalmoment);
          }
          this.afDatabase.database.ref('/leningen/' + lening1.$key + '/ophaalmoment').set(
            ophaalmomenten
          );
        }
      });
    });
  }

}
