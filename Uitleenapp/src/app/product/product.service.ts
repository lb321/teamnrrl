import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Injectable} from '@angular/core';
import {ProductDto} from './product.dto';
import {ProductStatus} from './productstatus.enum';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class ProductService {
  private productlist: FirebaseListObservable<any>;
  public producten: ProductDto[];
  private aantalProducten = 0;
  private voorraad = {};
  private productListObservable = new ReplaySubject(1);
  private voorraadObservable = new ReplaySubject(1); // alle producten
  private productenNogOpVoorraadObservable = new ReplaySubject(1); //producten die nog op voorraad zijn dus voorraad > 1

  constructor(public afDatabase: AngularFireDatabase) {
    this.productlist = this.afDatabase.list('/producten');
    this.productlist.subscribe(items => {
      this.aantalProducten = 0;
      this.voorraad = {};
      this.producten = [];
      items.forEach((item, index, array) => {
        let product = new ProductDto(item.productnaam, item.productbeschrijving, item.productstatus);
        product.productId = item.productid;
        this.producten.push(product);
        this.aantalProducten += 1;
        if (this.voorraad[product.productnaam + ',' + product.productbeschrijving]) {
          if (ProductStatus.equals(product.productstatus, ProductStatus.Beschikbaar))
            this.voorraad[product.productnaam + ',' + product.productbeschrijving].voorraad += 1;
        } else {
          this.voorraad[product.productnaam + ',' + product.productbeschrijving] = {'productnaam': product.productnaam, 'productbeschrijving': product.productbeschrijving, 'voorraad': ProductStatus.equals(product.productstatus, ProductStatus.Beschikbaar) ? 1 : 0};
        }
        if(index + 1 == array.length){ //er is door elk element heen geloopt, zend de nieuwe lijsten naar de subscribers.
          this.productListObservable.next(this.producten);
          this.voorraadObservable.next(this.voorraad);
          let productenNogOpVoorraad = {};
          for(const key of Object.keys(this.voorraad)){
            if(this.voorraad[key].voorraad > 0) {
              productenNogOpVoorraad[key] = this.voorraad[key];
            }
          }
          this.productenNogOpVoorraadObservable.next(productenNogOpVoorraad);
        }
      });
    });
  }

  voegProductToe(product: ProductDto) {
    this.productlist.push({
      'productid': this.aantalProducten + 1,
      'productbeschrijving': product.productbeschrijving,
      'productnaam': product.productnaam,
      'productstatus': ProductStatus.getStringValue(product.productstatus)
    });
  }

  setProductStatus(productId: number, status: ProductStatus) {
    this.afDatabase.database.ref('/producten').once('value', snap => {
      const snapshot = snap.val();
      const productenlijst = Object.keys(snapshot).map(function(key) {
        let arr = snapshot[key];
        arr['key'] = key;
        return arr;
      });
      for(let product of productenlijst){
        if(product.productid == productId) {
          this.afDatabase.database.ref('/producten/' + product.key).update({
            'productstatus': ProductStatus.getStringValue(status)
          });
          return;
        }
      }
    });
  }

  getProductenByName(productnaam: string): ProductDto[] {
    let productenMetNaam: ProductDto[] = [];
    for(const product of this.producten){
      if(product.productnaam == productnaam) productenMetNaam.push(product);
    }
    return productenMetNaam;
  }

  getProductenByNameAndStatus(productnaam: string, productstatus: ProductStatus) {
    let productenMetNaamEnStatus: ProductDto[] = [];
    for(const product of this.producten){
      if(product.productnaam == productnaam && ProductStatus.equals(product.productstatus, productstatus)) productenMetNaamEnStatus.push(product);
    }
    return productenMetNaamEnStatus;
  }

  getProductByID(id: number): ProductDto {
    if(this.producten) {
      for (const product of this.producten) {
        if (product.productId == id) return product;
      }
    }
    return null;
  }

  getProductenNogOpVoorraadObservable() {
    return this.productenNogOpVoorraadObservable;
  }

  getProductListObservable() {
    return this.productListObservable;
  }

  getVoorraadObserable() {
    return this.voorraadObservable;
  }
}
