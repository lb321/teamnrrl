import {Injectable} from "@angular/core";
import {LeningDto} from "./lening.dto";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {OphaalmomentDto} from "./ophaalmoment/ophaalmoment.dto";
import {ServiceProvider} from "../service.provider";

@Injectable()
export class GeselecteerdeLeningService {
  private geselecteerdeLening: LeningDto;
  private geselecteerdeLeningObservable = new ReplaySubject<LeningDto>(1);

  constructor(public serviceProvider: ServiceProvider) {

  }

  selecteerLening(lening: LeningDto) {
    this.geselecteerdeLening = lening;
    this.geselecteerdeLeningObservable.next(this.geselecteerdeLening);
  }

  selecteerLeningMetNummer(leningnummer: number){
    this.serviceProvider.getLeningService().getLeninglistObservable().subscribe(leninglist => {
      JSON.parse(JSON.stringify(leninglist)).forEach( lening => {
        if(lening.leningnummer == leningnummer) {
          this.geselecteerdeLening = new LeningDto(this.serviceProvider.getUserService().getUserByStudentnummer(lening.studentnummer), lening.klascode, lening.blok, [], lening.leningstatus);
          this.geselecteerdeLening.leningnummer = leningnummer;
          for(const product of lening.uitgeleendeProducten){
            this.geselecteerdeLening.producten.push(this.serviceProvider.getProductService().getProductByID(product.productid));
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
