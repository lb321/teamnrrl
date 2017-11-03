import {Component} from '@angular/core';
import {ThemeproviderService} from '../../theme/themeprovider.service';
import {IProductTableInterface} from '../IProductTable.interface';
import {ServiceProvider} from "../../service.provider";

@Component({
  selector: 'ProductenComponent',
  templateUrl: './producten.component.html'
})
export class ProductenComponent extends IProductTableInterface {
   constructor(public serviceProvider: ServiceProvider, public themeProvider: ThemeproviderService) {
     super();
     this.options.editable = false;
     super.setVoorraadData(this.serviceProvider.getProductService().getVoorraadObserable());
  }
}
