import {Injectable} from "@angular/core";
import {LeningDto} from "./lening.dto";
import {LeningService} from "./lening.service";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {UserService} from "../authentication/user.service";
import {ProductService} from "../product/product.service";
import {OphaalmomentDto} from "./ophaalmoment/ophaalmoment.dto";

@Injectable()
export class GeselecteerdeLeningService {
  private geselecteerdeLening: LeningDto;
  private geselecteerdeLeningObservable = new ReplaySubject<LeningDto>(1);

  constructor(private leningService: LeningService, public userService: UserService, public productService: ProductService){

  }

  selecteerLening(lening: LeningDto) {
    this.geselecteerdeLening = lening;
    this.geselecteerdeLeningObservable.next(this.geselecteerdeLening);
  }

  selecteerLeningMetNummer(leningnummer: number){
    this.leningService.getLeninglistObservable().subscribe(leninglist => {
      JSON.parse(JSON.stringify(leninglist)).forEach( lening => {
        if(lening.leningnummer == leningnummer) {
          this.geselecteerdeLening = new LeningDto(this.userService.getUserByStudentnummer(lening.studentnummer), lening.klascode, lening.blok, [], lening.leningstatus);
          this.geselecteerdeLening.leningnummer = leningnummer;
          for(const product of lening.uitgeleendeProducten){
            this.geselecteerdeLening.producten.push(this.productService.getProductByID(product.productid));
          }
          if(lening.ophaalmomenten) {
            for (const ophaalmoment of lening.ophaalmomenten) {
              this.geselecteerdeLening.ophaalmomenten.push(new OphaalmomentDto(ophaalmoment.begintijd, ophaalmoment.eindtijd));
            }
          }
          this.geselecteerdeLeningObservable.next(this.geselecteerdeLening);
          return;
        }
      });
    });
  }

  getGeselecteerdeLening() {
    return this.geselecteerdeLening;
  }

  getGeselecteerdeLeningObservable() {
    return this.geselecteerdeLeningObservable;
  }
}
