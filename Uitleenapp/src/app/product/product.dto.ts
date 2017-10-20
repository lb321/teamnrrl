import {ProductStatus} from './productstatus.enum';

export class ProductDto {
  constructor(public productId: number, public productnaam: string, public productbeschrijving: string, public productstatus: ProductStatus){

  }
}
