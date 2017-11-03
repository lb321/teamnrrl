import {Component} from "@angular/core";
import {ThemeproviderService} from "../../theme/themeprovider.service";
import {ProductDto} from "../product.dto";
import {ProductService} from "../product.service";
import {ProductStatus} from "../productstatus.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'ProductToevoegenComponent',
  templateUrl: './productToevoegen.component.html'
})
export class ProductToevoegenComponent {
  public nieuwproduct: ProductDto;
  public productnaam = "";
  public beschrijving = "";
  public aantal = 0;
  public errormessage = "";

  constructor(public themeproviderService: ThemeproviderService, public productService: ProductService, public router: Router) {
  }

  private toevoegen() {
    if (this.check()) {
      this.nieuwproduct = new ProductDto(this.productnaam, this.beschrijving, ProductStatus.Beschikbaar);
      for (let _i = 0; _i < this.aantal; _i++) {
        this.productService.voegProductToe(this.nieuwproduct);
      }
      this.router.navigateByUrl("/producten");
    }
  }

  private check(): boolean {
    this.errormessage = "";
    if (isNaN(Number(this.aantal))) {
      this.errormessage = "Vul een getal in bij aantal";
      return false;
    }
      if (this.productnaam.length < 1 || this.beschrijving.length < 1 || this.aantal == 0) {
        this.errormessage = "Vul alle velden in";
        return false;
      }
      else if(this.aantal < 0){
        this.errormessage = "Vul een positief getal in bij aantal";
        return false;
      }
      else {
        return true;
      }

  }
}
