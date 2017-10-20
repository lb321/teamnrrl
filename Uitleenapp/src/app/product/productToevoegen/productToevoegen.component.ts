import {Component} from "@angular/core";
import {ThemeproviderService} from "../../theme/themeprovider.service";
import {ProductDto} from "../product.dto";
import {ProductService} from "../product.service";
import {ProductStatus} from "../productstatus.enum";

@Component({
  selector: 'ProductToevoegenComponent',
  templateUrl: './productToevoegen.component.html'
})
export class ProductToevoegenComponent {
  public nieuwproduct: ProductDto;
  public productnaam = "";
  public beschrijving = "";
  public aantal = 0;

  constructor(public themeproviderService: ThemeproviderService, public productService: ProductService){
  }

  private toevoegen(){
    for (var _i = 0; _i < this.aantal; _i++) {
      this.nieuwproduct = new ProductDto(this.productnaam, this.beschrijving, ProductStatus.Beschikbaar);
      this.productService.voegProductToe(this.nieuwproduct)
    }
  }
}
