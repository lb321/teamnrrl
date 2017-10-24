import {ThemeproviderService} from '../../../theme/themeprovider.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { jqxValidatorComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxvalidator';
import { jqxDateTimeInputComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdatetimeinput';
import {LeningDto} from "../../lening.dto";
import {OphaalmomentDto} from "../ophaalmoment.dto";
import {LeningService} from "../../lening.service";
import {GeselecteerdeLeningService} from "../../geselecteerdeLening.service";

@Component({
  selector: 'OphaalmomentAangevenComponent',
  templateUrl: './ophaalmomentAangeven.component.html'
})
export class OphaalmomentAangevenComponent implements  AfterViewInit {
  @ViewChild('myValidator') myValidator: jqxValidatorComponent;
  @ViewChild('vanInput') vanInput: jqxDateTimeInputComponent;
  @ViewChild('totInput') totInput: jqxDateTimeInputComponent;
  private lening: LeningDto;

  validationRules: any[] = [
    {
      input: '.totInput', message: 'De begintijd moet voor de eindtijd liggen.', action: 'valueChanged, keyUp, blur',
      rule: (input: any, commit: any): any => {
        let datetimeVan = this.vanInput.value();
        let datetimeTot = this.totInput.value();
        let result = datetimeVan < datetimeTot;
        return result;
      }
    },
    {
      input: '.vanInput', message: 'Kies een datum en tijd in de toekomst', action: 'valueChanged, keyUp, blur',
      rule: (input: any, commit: any): any => {
        let datetimeVan = this.vanInput.value();
        let result = datetimeVan > Date.now();
        return result;
      }
    }
  ];

  constructor(public themeProvider: ThemeproviderService, public geselecteerdeLeningService: GeselecteerdeLeningService, public leningService: LeningService) {
    this.geselecteerdeLeningService.getGeselecteerdeLeningObservable().subscribe(lening => {
      this.lening = lening;
    });
  }

  slaOphaalMomentOp() {
    this.myValidator.validate(document.getElementById('form'));
  }

  ngAfterViewInit(): void {
    if(this.myValidator) {
      this.myValidator.onSuccess(() => {
        this.lening.ophaalmomenten.push(
          new OphaalmomentDto(this.vanInput.value(), this.totInput.value())
        );
        this.leningService.setOphaalmomenten(this.lening);
        this.geselecteerdeLeningService.selecteerLening(this.lening);
      });
    }
  }
}
