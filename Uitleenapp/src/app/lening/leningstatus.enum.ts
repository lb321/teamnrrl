export enum LeningStatus {
  Ingediend,
  Klaargelegd,
  Producten_uitgeleend,
  Afgerond
}

export namespace LeningStatus {
  export function getStringValue(status: LeningStatus): string {
    let string = status.toString();
    if((typeof status).toString() == 'number'){
      string = LeningStatus[status];
    }
    return string;
  }

  export function equals(status1: LeningStatus, status2: LeningStatus): boolean {
    return getStringValue(status1) == getStringValue(status2);
  }
}
