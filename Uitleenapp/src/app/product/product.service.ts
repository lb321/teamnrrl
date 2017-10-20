import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Injectable} from '@angular/core';
import {ProductDto} from './product.dto';
import {ProductStatus} from './productstatus.enum';

@Injectable()
export class ProductService {
  private producten: FirebaseListObservable<any>;

  constructor(public afDatabase: AngularFireDatabase) {
    this.producten = this.afDatabase.list('/producten');
  }

  getAlleProducten() {
    return this.producten;
  }

  voegProductToe(product: ProductDto) {
    this.producten.push({
      'productid': product.productId,
      'productbeschrijving': product.productbeschrijving,
      'productnaam': product.productnaam,
      'productstatus': ProductStatus[product.productstatus.valueOf()]
    });
  }
}
