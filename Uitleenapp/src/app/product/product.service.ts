import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Injectable} from '@angular/core';
import {ProductDto} from './product.dto';
import {ProductStatus} from './productstatus.enum';

@Injectable()
export class ProductService {
  private producten: FirebaseListObservable<any>;
  private aantalProducten = 0;

  constructor(public afDatabase: AngularFireDatabase) {
    this.producten = this.afDatabase.list('/producten');
    this.producten.subscribe(items => {
      this.aantalProducten = 0;
      items.forEach(product => {
        this.aantalProducten += 1;
      });
    });
  }

  getAlleProducten() {
    return this.producten;
  }

  voegProductToe(product: ProductDto) {
    this.producten.push({
      'productid': this.aantalProducten + 1,
      'productbeschrijving': product.productbeschrijving,
      'productnaam': product.productnaam,
      'productstatus': ProductStatus[product.productstatus.valueOf()]
    });
  }
}
