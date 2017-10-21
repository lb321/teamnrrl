import {UserDto} from "../authentication/user.dto";
import {ProductDto} from "../product/product.dto";
import {LeningStatus} from "./leningstatus.enum";

export class LeningDto {
  public leningnummer: number;
  constructor(public user: UserDto, public klascode: string, public blok: string, public producten: ProductDto[], public leningStatus: LeningStatus) {

  }
}
