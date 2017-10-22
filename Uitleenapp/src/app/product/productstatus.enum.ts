
export enum ProductStatus {
  Beschikbaar,
  Aangevraagd,
  Klaargelegd,
  Uitgeleend,
  Defect
}

export namespace ProductStatus {
  export function getStringValue(status: ProductStatus): string {
    let string = status.toString();
    if((typeof status).toString() == 'number'){
      string = ProductStatus[status];
    }
    return string;
  }

  export function equals(status1: ProductStatus, status2: ProductStatus): boolean {
    return getStringValue(status1) == getStringValue(status2);
  }
}
