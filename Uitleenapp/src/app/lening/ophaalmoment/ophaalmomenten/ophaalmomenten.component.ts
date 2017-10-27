import {AfterViewInit, Component, ViewChild} from "@angular/core";
import DataTableColumns = jqwidgets.DataTableColumns;
import { jqxDataTableComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdatatable';
import {ThemeproviderService} from '../../../theme/themeprovider.service';
import {GeselecteerdeLeningService} from "../../geselecteerdeLening.service";

@Component({
  selector: 'OphaalmomentenComponent',
  templateUrl: './ophaalmomenten.component.html'
})
export class OphaalmomentenComponent implements  AfterViewInit {
  @ViewChild('ophaalmomenten') ophaalmomentenTable: jqxDataTableComponent;
  public source =  {
    dataType: 'array',
    dataFields: [
      {name: 'begintijd', type: 'date'},
      {name: 'eindtijd', type: 'date'}
    ],
    localData: []
  };

  public columns: DataTableColumns[] = [
    {text: 'Begintijd', dataField: 'begintijd', cellsFormat: 'dddd dd MMM yyyy HH:mm', editable: false},
    {text: 'Eindtijd', dataField: 'eindtijd', cellsFormat: 'dddd dd MMM yyyy HH:mm', editable: false}
  ];

  public sourceAdapter = new jqx.dataAdapter(this.source, {autoBind: true});

  public options =
    {
      width: 580,
      sortable: true,
      pageable: true,
      editable: false,
      altRows: true,
      columnsResize: true,
      pagerButtonsCount: 10
    };

  constructor(public themeProvider: ThemeproviderService,  public geselecteerdeLeningService: GeselecteerdeLeningService) {
    this.geselecteerdeLeningService.getGeselecteerdeLeningObservable().subscribe(lening => {
      this.source['localData'] = lening.ophaalmomenten;
      this.source['localdata'] = lening.ophaalmomenten;
      if(this.ophaalmomentenTable) this.ophaalmomentenTable.updateBoundData();
    });
  }

  createTable() {
    if (this.ophaalmomentenTable) {
      this.ophaalmomentenTable.createComponent(this.options);
      this.ophaalmomentenTable.updateBoundData();
      this.ophaalmomentenTable.refresh();
    }
  }

  ngAfterViewInit(): void {
    this.createTable();
  }
}
