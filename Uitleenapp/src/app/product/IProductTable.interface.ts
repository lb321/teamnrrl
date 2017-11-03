import {ViewChild, AfterViewInit} from "@angular/core";
import {jqxDataTableComponent} from "jqwidgets-framework/jqwidgets-ts/angular_jqxdatatable";
import {ProductService} from "./product.service";
import DataTableColumns = jqwidgets.DataTableColumns;
import {ReplaySubject} from "rxjs/ReplaySubject";

export abstract class IProductTableInterface implements AfterViewInit{
  @ViewChild('productTable') productTable: jqxDataTableComponent;
  public productSource =  {
    dataType: 'array',
    dataFields: [
      {name: 'productId', type: 'number'},
      {name: 'productnaam', type: 'string'},
      {name: 'productbeschrijving', type: 'string'},
      {name: 'productstatus', type: 'string'}
      ],
    localData: []
  };

  public columns: DataTableColumns[] = [
    {text: 'ProductID', dataField: 'productId', editable: false},
    {text: 'Product naam', dataField: 'productnaam', editable: false},
    {text: 'Product beschrijving', dataField: 'productbeschrijving', editable: false},
    {text: 'Product status', dataField: 'productstatus', editable: false}
  ];

  public sourceAdapter = new jqx.dataAdapter(this.productSource, {autoBind: true});

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

  constructor() {

  }

  setVoorraadData(voorraadObservable: ReplaySubject<any>) {
    this.productSource.dataFields[0] = null;
    this.productSource.dataFields[3] = null;
    this.productSource.dataFields.push({name: 'voorraad', type: 'number'});
    this.columns[0] = null;
    this.columns[3] = null;
    this.columns.push({text: 'Voorraad', dataField: 'voorraad', editable: false});
    voorraadObservable.subscribe(voorraad => {
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
      /*this.productTable.updateBoundData();
      this.productTable.columns(this.columns);
      this.productTable.source(new jqx.dataAdapter(this.productSource, {autoBind: true}));
      this.productTable.setOptions(this.options);*/
      this.productTable.createComponent(this.options);
      this.productTable.refresh();
    }
  }

}
