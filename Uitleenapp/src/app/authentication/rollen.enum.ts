export enum Rollen {
  Beheerder,
  Student
}

export namespace Rollen {
  export function getStringValue(rol: Rollen): string {
    let string = rol.toString();
    if((typeof rol).toString() == 'number'){
      string = Rollen[rol];
    }
    return string;
  }

  export function equals(rol1: Rollen, rol2: Rollen): boolean {
    return getStringValue(rol1) == getStringValue(rol2);
  }
}
