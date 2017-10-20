
import {Component} from "@angular/core";
import {ProductService} from "../product.service";

@Component({
  selector: 'ProductenComponent',
  templateUrl: './producten.component.html'
})
export class ProductenComponent {
  public producten: any;
  constructor(productService: ProductService) {
    this.producten = productService.getAlleProducten();
  }
}
