import {Component} from "@angular/core";
import {ThemeproviderService} from "../../theme/themeprovider.service";
import {ProductService} from "../../product/product.service";
import {IProductTableInterface} from "../../product/IProductTable.interface";

@Component({
  selector: 'LeningIndienenComponent',
  templateUrl: './leningIndienen.component.html'
})
export class LeningIndienenComponent extends IProductTableInterface {
  public klascode = '';
  public foutmeldingen: string[] = [];

  constructor(public productService: ProductService, public themeProvider: ThemeproviderService) {
    super(productService, themeProvider);
    this.productSource.dataFields.push({name: 'aantal', type: 'number'});
    this.columns.push({
        text: 'Aantal', dataField: 'aantal', editable: true,
        validation: (cell: any, value: any): any => {
          const voorraad = Number(this.productTable.getRows()[cell.row]['voorraad']);
          if(!Number(value) && value.toString().length > 0) return { message: 'Aantal kan alleen een nummer zijn', result: false };
          else return true;
        }
    });
  }

  indienen() {
    this.foutmeldingen = [];
    if(this.klascode.length < 1) this.foutmeldingen.push('Geef a.u.b. een klascode');
    for(const row of this.productTable.getRows()){
      if(Number(row.aantal) > Number(row.voorraad)) this.foutmeldingen.push('Er zijn niet genoeg ' + row.productnaam + 's op voorraad.');
    }
  }
}
