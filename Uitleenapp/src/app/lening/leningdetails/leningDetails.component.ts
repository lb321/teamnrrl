import {Component, ViewChild} from "@angular/core";
import {LeningDto} from "../lening.dto";
import {ProductService} from "../../product/product.service";
import {IProductTableInterface} from "../../product/IProductTable.interface";
import {ThemeproviderService} from "../../theme/themeprovider.service";
import {LeningStatus} from "../leningstatus.enum";
import {GeselecteerdeLeningService} from "../geselecteerdeLening.service";
import {OphaalmomentenComponent} from "../ophaalmoment/ophaalmomenten/ophaalmomenten.component";
import {Router} from "@angular/router";

@Component({
  selector: 'LeningDetailsComponent',
  templateUrl: './leningDetails.component.html'
})
export class LeningDetailsComponent extends IProductTableInterface {
  @ViewChild('ophaalComponent') ophaalComponent: OphaalmomentenComponent;
  public lening: LeningDto = null;

  constructor(public geselecteerdeLeningService: GeselecteerdeLeningService, public themeProvider: ThemeproviderService) {
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
    return LeningStatus.equals(this.lening.leningstatus, LeningStatus.Ingediend) || LeningStatus.equals(this.lening.leningstatus, LeningStatus.Klaargelegd);
  }

  showMarkeerOpgehaaldBtn(): boolean {
    return LeningStatus.equals(this.lening.leningstatus, LeningStatus.Klaargelegd);
  }

  showLeningRetournerenAdministrerenBtn(): boolean {
    return LeningStatus.equals(this.lening.leningstatus, LeningStatus.Producten_uitgeleend);
  }
}
