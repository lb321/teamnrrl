import {Rollen} from './rollen.enum';

export class UserDto {
  public studentnummer: number;

  constructor(public voornaam: string, public achternaam: string, public inlognaam: string, public wachtwoord: string, public email: string, public rol: Rollen) {

  }
}
