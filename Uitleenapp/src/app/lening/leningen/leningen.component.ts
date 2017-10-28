import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {jqxDataTableComponent} from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdatatable';
import DataTableColumns = jqwidgets.DataTableColumns;
import {ThemeproviderService} from '../../theme/themeprovider.service';
import {LeningService} from '../lening.service';
import {GeselecteerdeLeningService} from "../geselecteerdeLening.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../authentication/authentication.service";
import {Rollen} from "../../authentication/rollen.enum";

@Component({
  selector: 'LeningenComponent',
  templateUrl: './leningen.component.html'
})
export class LeningenComponent implements AfterViewInit {
  public geselecteerdeLening = 0;
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

  adapter = new jqx.dataAdapter(this.source, {autoBind: true});

  public columns: DataTableColumns[] = [
    {text: 'Leningnummer', dataField: 'leningnummer', editable: false, width: 115},
    {text: 'Status', dataField: 'leningstatus', editable: false, width: 85},
    {text: 'Studentnummer', dataField: 'studentnummer', editable: false, width: 120},
    {text: 'Aantal producten', dataField: 'aantalproducten', editable: false, width: 125},
    {text: 'Blok', dataField: 'blok', editable: false, width: 45},
    {text: 'Klascode', dataField: 'klascode', editable: false, width: 90}
    /*{text: 'Details', dataField: null, columnType: 'none', editable: false, cellsRenderer: function (row, column, value) {
        // render custom column.
        return "<jqxButton [auto-create]='true' data-row='" + row + "' class='detailButtons'>Details</jqxButton>";
      }
    }*/
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

  constructor(public leningService: LeningService, public themeProvider: ThemeproviderService, public geselecteerdeLeningService: GeselecteerdeLeningService, public router: Router, public authService: AuthenticationService){
    this.leningService.getLeninglistObservable().subscribe(leningen => {
        const leningenjson = JSON.parse(JSON.stringify(leningen));
        const leninglist = Object.keys(leningenjson).map(function(k) {
          return leningenjson[k];
        });
        let leningTableSource = [];
        for (const leningitem of leninglist){
          leningitem['aantalproducten'] = leningitem['uitgeleendeProducten'].length;
          if(!Rollen.equals(this.authService.getLoggedInUser().rol, Rollen.Student)
            || leningitem.studentnummer == authService.getLoggedInUser().studentnummer) { //als de beheerder is ingelogd of de student en het studentnr van de lening gelijk is aan die van de ingelogd student
            leningTableSource.push(leningitem);
          }
        }
        this.source['localData'] = leningTableSource;
        this.source['localdata'] = leningTableSource;
        if (this.leningTable) this.leningTable.updateBoundData();
    });
  }

  selectRow() {
    this.geselecteerdeLening = this.leningTable.getSelection().pop().leningnummer;
  }

  unSelectRow() {
    this.geselecteerdeLening = 0;
  }

  ngAfterViewInit(): void {
    if (this.leningTable) {
      this.leningTable.createComponent(this.options);
      this.leningTable.refresh();
    }
  }

  showLeningDetails() {
    this.geselecteerdeLeningService.selecteerLeningMetNummer(this.geselecteerdeLening);
    this.router.navigate(['/leningen/details']);
  }
}
