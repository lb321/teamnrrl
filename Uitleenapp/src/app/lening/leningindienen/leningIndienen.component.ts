import {Component} from '@angular/core';
import {ThemeproviderService} from '../../theme/themeprovider.service';
import {IProductTableInterface} from '../../product/IProductTable.interface';
import {LeningDto} from '../lening.dto';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ProductDto} from '../../product/product.dto';
import {ProductStatus} from '../../product/productstatus.enum';
import {LeningStatus} from '../leningstatus.enum';
import {Router} from '@angular/router';
import {ServiceProvider} from "../../service.provider";

@Component({
  selector: 'LeningIndienenComponent',
  templateUrl: './leningIndienen.component.html'
})
export class LeningIndienenComponent extends IProductTableInterface {
  public klascode = '';
  private geleendeProducten: ProductDto[] = [];
  public foutmeldingen: string[] = [];

  constructor(public serviceProvider: ServiceProvider, public themeProvider: ThemeproviderService, public authService: AuthenticationService, public router: Router) {
    super();
    super.setVoorraadData(this.serviceProvider.getProductService().getProductenNogOpVoorraadObservable());
    this.productSource.dataFields.push({name: 'aantal', type: 'number'});
    this.columns.push({
        text: 'Aantal', dataField: 'aantal', editable: true,
        validation: (cell: any, value: any): any => {
          const voorraad = Number(this.productTable.getRows()[cell.row]['voorraad']);
          if (!Number(value) && value.toString().length > 0) return { message: 'Aantal kan alleen een nummer zijn', result: false };
          else return true;
        }
    });
  }

  indienen() {
    this.foutmeldingen = [];
    this.geleendeProducten = [];
    if (this.klascode.length < 1) this.foutmeldingen.push('Geef a.u.b. een klascode');
    for (const row of this.productTable.getRows()){
      if (Number(row.aantal) > Number(row.voorraad)) this.foutmeldingen.push('Er zijn niet genoeg ' + row.productnaam + 's op voorraad.');
      else if (Number(row.aantal) != 0 && this.foutmeldingen.length < 1){
        const producten = this.serviceProvider.getProductService().getProductenByNameAndStatus(row.productnaam, ProductStatus.Beschikbaar);
        for (let i = 0; i < row.aantal; i++) { //voeg de geleende producten toe aan de lijst
          const geleendProduct = new ProductDto(row.productnaam, row.productbeschrijving, ProductStatus.Beschikbaar);
          geleendProduct.productId = producten.pop().productId;
          this.geleendeProducten.push(geleendProduct);
        }
      }
    }
    if(this.geleendeProducten.length < 1) {
      this.foutmeldingen.push('Geef aan welke producten u wilt lenen door aantallen te geven.');
    }
    if (this.foutmeldingen.length < 1) {// geen foutmeldingen, dan lening toevoegen in systeem
      const lening: LeningDto = new LeningDto(this.authService.getLoggedInUser(), this.klascode, 'A', this.geleendeProducten, LeningStatus.Ingediend);
      this.serviceProvider.getLeningService().leningIndienen(lening); //voeg de lening toe
      for (const product of lening.producten) {
        this.serviceProvider.getProductService().setProductStatus(product.productId, ProductStatus.Aangevraagd); //verander de status van de geleende producten
      }
      this.router.navigateByUrl('/leningen');
    }
  }
}
