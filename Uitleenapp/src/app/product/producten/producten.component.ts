import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ProductService} from '../product.service';
import { jqxDataTableComponent  } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdatatable';
import {ThemeproviderService} from '../../theme/themeprovider.service';
import {IProductTableInterface} from "../IProductTable.interface";

@Component({
  selector: 'ProductenComponent',
  templateUrl: './producten.component.html'
})
export class ProductenComponent extends IProductTableInterface {
   constructor(public productService: ProductService, public themeProvider: ThemeproviderService) {
     super(productService, themeProvider);
  }
}
