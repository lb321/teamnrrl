import {Component} from '@angular/core';
import {ProductService} from '../product.service';
import {ThemeproviderService} from '../../theme/themeprovider.service';
import {IProductTableInterface} from '../IProductTable.interface';

@Component({
  selector: 'ProductenComponent',
  templateUrl: './producten.component.html'
})
export class ProductenComponent extends IProductTableInterface {
   constructor(public productService: ProductService, public themeProvider: ThemeproviderService) {
     super();
     this.options.editable = false;
     super.setVoorraadData(this.productService);
  }
}
