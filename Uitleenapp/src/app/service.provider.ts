import {Injectable} from "@angular/core";
import {ProductService} from "./product/product.service";
import {LeningService} from "./lening/lening.service";
import {UserService} from "./authentication/user.service";
import {AngularFireDatabase} from "angularfire2/database-deprecated";

@Injectable()
export class ServiceProvider {
  private productService: ProductService;
  private leningService: LeningService;
  private userService: UserService;

  constructor(public afDatabase: AngularFireDatabase) {

  }

  getProductService(): ProductService {
    return this.productService;
  }

  createProductService(): void {
    this.productService = new ProductService(this.afDatabase);
  }

  getLeningService(): LeningService {
    return this.leningService;
  }

  createLeningService(): void {
    this.leningService = new LeningService(this.afDatabase);
  }

  getUserService(): UserService {
    return this.userService;
  }

  createUserService(): void {
    this.userService = new UserService(this.afDatabase);
  }

  forgetAllServices(): void {
    this.userService = null;
    this.productService = null;
    this.leningService = null;
  }

}
