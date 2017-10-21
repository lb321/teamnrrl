import {ViewChild, AfterViewInit} from "@angular/core";
import {jqxDataTableComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxdatatable";
import {ThemeproviderService} from "../theme/themeprovider.service";
import {ProductService} from "./product.service";
import DataTableColumns = jqwidgets.DataTableColumns;

export abstract class IProductTableInterface implements AfterViewInit{
  @ViewChild('productTable') productTable: jqxDataTableComponent;
  public productSource =  {
    dataType: 'array',
    dataFields: [
      {name: 'productnaam', type: 'string'},
      {name: 'productbeschrijving', type: 'string'},
      {name: 'voorraad', type: 'number'}
      ],
    localData: []
  };

  public columns: DataTableColumns[] = [
    {text: 'Product naam', dataField: 'productnaam', editable: false},
    {text: 'Product beschrijving', dataField: 'productbeschrijving', editable: false},
    {text: 'Voorraad', dataField: 'voorraad', editable: false}
  ];

  public options =
    {
      width: 580,
      sortable: true,
      filterable: true,
      pageable: true,
      editable: true,
      altRows: true,
      columnsResize: true,
      pagerButtonsCount: 10
    };

  /*{'width': 500},
  {'sortable': true},
  {'filterable': true},
  {'pageable': true},
  {'altRows': true},
  {'columnsResize': true},
  {'pagerButtonsCount': 10}*/

  constructor(public productService: ProductService, public themeProvider: ThemeproviderService) {
    this.productService.getVoorraadObserable().subscribe(voorraad => {
      const voorraadJson = JSON.parse(JSON.stringify(voorraad));
      const nieuweVoorraad = Object.keys(voorraadJson).map(function(k) {
        return voorraadJson[k];
      });
      this.productSource['localData'] = nieuweVoorraad;
      this.productSource['localdata'] = nieuweVoorraad;
      if (this.productTable) this.productTable.updateBoundData();
    });
  }

  ngAfterViewInit(): void {
    if(this.productTable) {
      console.log('set dingen');
      this.productTable.updateBoundData();
      this.productTable.columns(this.columns);
      this.productTable.source(new jqx.dataAdapter(this.productSource, {autoBind: true}));
      this.productTable.setOptions(this.options);
      this.productTable.refresh();
    }
  }

}
