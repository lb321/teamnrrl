import {ProductStatus} from './productstatus.enum';

export class ProductDto {
  public productId: number;
  constructor( public productnaam: string, public productbeschrijving: string, public productstatus: ProductStatus){

  }
}
