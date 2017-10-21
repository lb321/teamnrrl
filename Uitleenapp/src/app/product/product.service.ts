import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Injectable} from '@angular/core';
import {ProductDto} from './product.dto';
import {ProductStatus} from './productstatus.enum';
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class ProductService {
  private productlist: FirebaseListObservable<any>;
  public producten: ProductDto[];
  private aantalProducten = 0;
  private voorraad = {};
  private productListObservable = new ReplaySubject(1);
  private voorraadObservable = new ReplaySubject(1);

  constructor(public afDatabase: AngularFireDatabase) {
    this.productlist = this.afDatabase.list('/producten');
    this.productlist.subscribe(items => {
      this.aantalProducten = 0;
      this.voorraad = {};
      this.producten = [];
      items.forEach((product, index, array) => {
        this.producten.push(new ProductDto(product.productnaam, product.productbeschrijving, product.productstatus));
        this.aantalProducten += 1;
        if (product.productstatus == ProductStatus[ProductStatus.Beschikbaar]) {
          if (this.voorraad[product.productnaam]) {
            this.voorraad[product.productnaam].voorraad += 1;
          } else {
            this.voorraad[product.productnaam] = {'productnaam': product.productnaam, 'productbeschrijving': product.productbeschrijving, 'voorraad': 1};
          }
        }
        if(index + 1 == array.length){ //er is door elk element heen geloopt, roep de subscribers aan.
          this.productListObservable.next(this.producten);
          this.voorraadObservable.next(this.voorraad);
        }
      });
    });
  }

  getAlleProducten(): ProductDto[] {
    return this.producten;
  }

  getVoorraadLijst() {
    return this.voorraad;
  }

  voegProductToe(product: ProductDto) {
    this.productlist.push({
      'productid': this.aantalProducten + 1,
      'productbeschrijving': product.productbeschrijving,
      'productnaam': product.productnaam,
      'productstatus': ProductStatus[product.productstatus.valueOf()]
    });
  }

  getProductObservable() {
    return this.productListObservable;
  }

  getVoorraadObserable(){
    return this.voorraadObservable;
  }
}
