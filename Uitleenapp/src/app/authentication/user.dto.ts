import {rollen} from './rollen.enum';

export class UserDto {
  constructor(public voornaam: string, public achternaam: string, public inlognaam: string, public wachtwoord: string, public email: string, public rol: rollen) {

  }
}
