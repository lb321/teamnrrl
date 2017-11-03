import {Component, ViewChild} from "@angular/core";
import {LeningDto} from "../lening.dto";
import {IProductTableInterface} from "../../product/IProductTable.interface";
import {ThemeproviderService} from "../../theme/themeprovider.service";
import {LeningStatus} from "../leningstatus.enum";
import {GeselecteerdeLeningService} from "../geselecteerdeLening.service";
import {OphaalmomentenComponent} from "../ophaalmoment/ophaalmomenten/ophaalmomenten.component";
import {Router} from "@angular/router";
import {ProductStatus} from "../../product/productstatus.enum";
import {ServiceProvider} from "../../service.provider";
import {Rollen} from "../../authentication/rollen.enum";

@Component({
  selector: 'LeningDetailsComponent',
  templateUrl: './leningDetails.component.html'
})
export class LeningDetailsComponent extends IProductTableInterface {
  @ViewChild('ophaalComponent') ophaalComponent: OphaalmomentenComponent;
  public lening: LeningDto = null;

  constructor(public geselecteerdeLeningService: GeselecteerdeLeningService, public themeProvider: ThemeproviderService, public serviceProvider: ServiceProvider, public router:Router) {
    super();
    this.lening = this.geselecteerdeLeningService.getGeselecteerdeLening();
    this.options.editable = false;
    this.options.filterable = false;

    this.geselecteerdeLeningService.getGeselecteerdeLeningObservable().subscribe(lening => {
      this.lening = lening;
      this.productSource['localData'] = this.lening.producten;
      this.productSource['localdata'] = this.lening.producten;
      if (this.productTable) this.productTable.updateBoundData();
    });
  }

  initWidgets = (tab) => {
    switch (tab) {
      case 0:
        break;
      case 1:
        this.initOphaalmomentenComponent();
        break;
    }
  };

  initOphaalmomentenComponent() {
    this.ophaalComponent.createTable();
  }

  showOphaalMomentAangevenBtn(): boolean {
    return (LeningStatus.equals(this.lening.leningstatus, LeningStatus.Ingediend) || LeningStatus.equals(this.lening.leningstatus, LeningStatus.Klaargelegd)) && Rollen.equals(this.serviceProvider.getAuthService().getLoggedInUser().rol, Rollen.Beheerder);
  }

  showMarkeerOpgehaaldBtn(): boolean {
    return LeningStatus.equals(this.lening.leningstatus, LeningStatus.Klaargelegd) && Rollen.equals(this.serviceProvider.getAuthService().getLoggedInUser().rol, Rollen.Beheerder);
  }

  showLeningRetournerenAdministrerenBtn(): boolean {
    return LeningStatus.equals(this.lening.leningstatus, LeningStatus.Producten_uitgeleend) && Rollen.equals(this.serviceProvider.getAuthService().getLoggedInUser().rol, Rollen.Beheerder);
  }

  leningOpgehaaldAdministreren(): void {
    this.serviceProvider.getLeningService().setLeningStatus(this.lening.leningnummer,LeningStatus.Producten_uitgeleend);
    this.lening.leningstatus = LeningStatus.Producten_uitgeleend;
      for(let i = 0;i<this.lening.producten.length;i++)  {
        this.serviceProvider.getProductService().setProductStatus(this.lening.producten[i].productId,ProductStatus.Uitgeleend);
        this.lening.producten[i].productstatus = ProductStatus.Uitgeleend;
      }
      this.geselecteerdeLeningService.selecteerLening(this.lening);
      this.router.navigate(['/leningen']);
  }

}


