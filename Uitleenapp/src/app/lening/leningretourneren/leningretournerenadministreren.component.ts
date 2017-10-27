import {IProductTableInterface} from "../../product/IProductTable.interface";
import {GeselecteerdeLeningService} from "../geselecteerdeLening.service";
import {ProductService} from "../../product/product.service";
import {LeningService} from "../lening.service";
import {Router} from "@angular/router";
import {LeningDto} from "../lening.dto";
import {Component} from "@angular/core";
import {ThemeproviderService} from "../../theme/themeprovider.service";
import {LeningStatus} from "../leningstatus.enum";
import {ProductStatus} from "../../product/productstatus.enum";

@Component({
  selector:'LeningRetournerenAdministrerenComponent', templateUrl:'./leningretournerenadministreren.component.html'
})
export class LeningRetournerenAdministrerenComponent extends IProductTableInterface{
  public lening: LeningDto = null;

  constructor(public geselecteerdeleningservice:GeselecteerdeLeningService, public productservice:ProductService, public leningservice:LeningService, public router:Router, public themeprovider:ThemeproviderService){
    super();
    this.lening = this.geselecteerdeleningservice.getGeselecteerdeLening();
    this.options.editable = true;
    this.options.filterable = false;
    this.productSource.dataFields.push({
      name:'defect', type:'bool'
    });
    this.columns.push({
      text:'Defect', editable:true, dataField:'defect', columnType:'checkbox'
    });

    this.geselecteerdeleningservice.getGeselecteerdeLeningObservable().subscribe(lening => {
      this.lening = lening;
      this.productSource['localData'] = this.lening.producten;
      this.productSource['localdata'] = this.lening.producten;
      if (this.productTable) this.productTable.updateBoundData();
    });
  }
  retournerenadministreren():void{
    this.leningservice.setLeningStatus(this.lening.leningnummer, LeningStatus.Afgerond);
    this.lening.leningstatus = LeningStatus.Afgerond;
    for(const row of ((this.productTable) as any).getrows()){
      if(row.defect){
        this.productservice.setProductStatus(row.productId, ProductStatus.Defect);
        //this.lening.getGeleendProductByProductId(row.productId).productstatus = ProductStatus.Defect;
      }
      else{
        this.productservice.setProductStatus(row.productId, ProductStatus.Beschikbaar);
        //this.lening.getGeleendProductByProductId(row.productId).productstatus = ProductStatus.Beschikbaar;
      }
    }
    this.router.navigate(['/leningen']);
  }
}
