import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {LeningDto} from "./lening.dto";
import {LeningStatus} from "./leningstatus.enum";
import {ReplaySubject} from "rxjs/ReplaySubject";
import * as firebase from "firebase";

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

  private getLeninglijst(): ReplaySubject<any[]> {
    let leninglijstObservable = new ReplaySubject(1);
    this.afDatabase.database.ref('/leningen').once('value', value => {
      const snapshot = value.val();
      const leninglijst = Object.keys(snapshot).map(function(key) {
        let arr = snapshot[key];
        arr['key'] = key;
        return arr;
      });
      leninglijstObservable.next( leninglijst);
    });
    return leninglijstObservable;
  }

  setLeningStatus(leningnummer: number, leningstatus: LeningStatus) {
    const leninglijstObservable = this.getLeninglijst();
    leninglijstObservable.subscribe(leninglijst => {
      for(const lening of leninglijst){
        if(lening.leningnummer == leningnummer) {
          this.afDatabase.database.ref('/leningen/' + lening.key).update({
            'leningstatus': LeningStatus.getStringValue(leningstatus)
          });
          break;
        }
      }
      leninglijstObservable.unsubscribe();
    });
  }

  getLeninglistObservable() {
    return this.leninglistObservable;
  }

  setOphaalmomenten(nieuweLening: LeningDto) {
    const leninglijstObservable = this.getLeninglijst();
    leninglijstObservable.subscribe(leninglijst => {
      for(const lening of leninglijst){
        if(lening.leningnummer == nieuweLening.leningnummer) {
          let ophaalmomenten = [];
          for(const ophaalmoment of nieuweLening.ophaalmomenten){
            if((typeof ophaalmoment.begintijd).toString().toLocaleLowerCase() == 'date' ) ophaalmomenten.push({'begintijd': ophaalmoment.begintijd.getTime(), 'eindtijd': ophaalmoment.eindtijd.getTime()});
            else ophaalmomenten.push(ophaalmoment);
          }
          this.afDatabase.database.ref('/leningen/' + lening.key).update({
            ophaalmomenten: ophaalmomenten
          });
          leninglijstObservable.unsubscribe();
          break;
        }
      }
    });
  }

}
