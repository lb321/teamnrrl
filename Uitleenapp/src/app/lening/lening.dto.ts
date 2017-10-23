import {UserDto} from '../authentication/user.dto';
import {ProductDto} from '../product/product.dto';
import {LeningStatus} from './leningstatus.enum';
import {Ophaaltijd} from './ophaaltijd';

export class LeningDto {
  public leningnummer: number;
  public ophaaltijden: Ophaaltijd[] = [];
  constructor(public user: UserDto, public klascode: string, public blok: string, public producten: ProductDto[], public leningStatus: LeningStatus) {

  }
}
