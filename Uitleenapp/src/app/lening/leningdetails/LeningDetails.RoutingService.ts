
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class LeningDetailsRoutingService {
  public leningNummer = 0;

  constructor(public router: Router) {

  }

  public showLeningdetailsVanLeningMetNummer(leningnummer: number) {
    this.leningNummer = leningnummer;
    this.router.navigate(['/leningen/details']);
  }
}
