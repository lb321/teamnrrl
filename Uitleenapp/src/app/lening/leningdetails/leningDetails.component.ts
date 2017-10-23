import {Component} from "@angular/core";
import {LeningDetailsRoutingService} from './LeningDetails.RoutingService';
import {LeningService} from "../lening.service";
import {LeningDto} from "../lening.dto";
import {UserService} from "../../authentication/user.service";
import {ProductService} from "../../product/product.service";
import {IProductTableInterface} from "../../product/IProductTable.interface";
import {ThemeproviderService} from "../../theme/themeprovider.service";
import {LeningStatus} from "../leningstatus.enum";

@Component({
  selector: 'LeningDetailsComponent',
  templateUrl: './leningDetails.component.html'
})
export class LeningDetailsComponent extends IProductTableInterface{
  public leningnummer: number;
  public lening: LeningDto;
  public geleendeProductIDs: number[] = [];

  constructor(public routingService: LeningDetailsRoutingService, public leningService: LeningService, public userService: UserService, public productService: ProductService, public themeProvider: ThemeproviderService) {
    super();
    this.leningnummer = routingService.leningNummer;

    // lening object vullen
    this.leningService.getLeninglistObservable().subscribe(leninglist => {
      JSON.parse(JSON.stringify(leninglist)).forEach(lening => {
        if(lening.leningnummer == this.leningnummer) {
          this.lening = new LeningDto(userService.getUserByStudentnummer(lening.studentnummer), lening.klascode, lening.blok, [], lening.leningstatus);
          for(const product of lening.uitgeleendeProducten){
            this.geleendeProductIDs.push(product.productid);
          }
          return;
        }
      });
    });

    // geleendeproducten variabele van lening object vullen
    this.productService.getProductListObservable().subscribe( productlist => {
      this.lening.producten = [];
      for(const productid of this.geleendeProductIDs) {
        this.lening.producten.push(this.productService.getProductByID(productid));
      }
      this.productSource['localData'] = this.lening.producten;
      this.productSource['localdata'] = this.lening.producten;
      if (this.productTable) this.productTable.updateBoundData();
    });
  }

  showOphaalMomentAangevenBtn(): boolean {
    return LeningStatus.equals(this.lening.leningStatus, LeningStatus.Ingediend);
  }

  showMarkeerOpgehaaldBtn(): boolean {
    return LeningStatus.equals(this.lening.leningStatus, LeningStatus.Klaargelegd);
  }
}
