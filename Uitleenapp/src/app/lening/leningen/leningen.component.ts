import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {jqxDataTableComponent} from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdatatable';
import DataTableColumns = jqwidgets.DataTableColumns;
import {ThemeproviderService} from '../../theme/themeprovider.service';
import {LeningService} from '../lening.service';

@Component({
  selector: 'LeningenComponent',
  templateUrl: './leningen.component.html'
})
export class LeningenComponent implements AfterViewInit {
  @ViewChild('leningtable') leningTable: jqxDataTableComponent;

  public source =  {
    dataType: 'array',
    dataFields: [
      {name: 'leningnummer', type: 'number'},
      {name: 'leningstatus', type: 'string'},
      {name: 'studentnummer', type: 'number'},
      {name: 'aantalproducten', type: 'number'},
      {name: 'blok', type: 'string'},
      {name: 'klascode', type: 'string'}
    ],
    localData: []
  };

  adapter = new jqx.dataAdapter(this.source, {autoBind: true})

  public columns: DataTableColumns[] = [
    {text: 'Leningnummer', dataField: 'leningnummer', editable: false, width: 115},
    {text: 'Status', dataField: 'leningstatus', editable: false, width: 85},
    {text: 'Studentnummer', dataField: 'studentnummer', editable: false, width: 120},
    {text: 'Aantal producten', dataField: 'aantalproducten', editable: false, width: 125},
    {text: 'Blok', dataField: 'blok', editable: false, width: 45},
    {text: 'Klascode', dataField: 'klascode', editable: false, width: 90}
  ];

  public options =
    {
      width: 580,
      sortable: true,
      filterable: true,
      pageable: true,
      editable: false,
      altRows: true,
      columnsResize: true,
      pagerButtonsCount: 10
    };

  constructor(public leningService: LeningService, public themeProvider: ThemeproviderService){
    this.leningService.getLeninglistObservable().subscribe(leningen => {
        const leningenjson = JSON.parse(JSON.stringify(leningen));
        const leninglist = Object.keys(leningenjson).map(function(k) {
          return leningenjson[k];
        });
        for (const leningitem of leninglist){
          leningitem['aantalproducten'] = leningitem['uitgeleendeProducten'].length;
        }
        this.source['localData'] = leninglist;
        this.source['localdata'] = leninglist;
        if (this.leningTable) this.leningTable.updateBoundData();
    });
  }


  ngAfterViewInit(): void {
    if (this.leningTable) {
      this.leningTable.createComponent(this.options);
      this.leningTable.refresh();
    }
  }
}
