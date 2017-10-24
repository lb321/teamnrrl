import {UserDto} from '../authentication/user.dto';
import {ProductDto} from '../product/product.dto';
import {LeningStatus} from './leningstatus.enum';
import {OphaalmomentDto} from './ophaalmoment/ophaalmoment.dto';

export class LeningDto {
  public leningnummer: number;
  public ophaalmomenten: OphaalmomentDto[] = [];
  constructor(public user: UserDto, public klascode: string, public blok: string, public producten: ProductDto[], public leningstatus: LeningStatus) {

  }
}
