import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AuthenticationService} from './authentication/authentication.service';
import {ThemeproviderService} from './theme/themeprovider.service';
import { jqxDockPanelComponent  } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdockpanel';
import { jqxDropDownListComponent  } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxdropdownlist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('mainDockPanel') DockPanel: jqxDockPanelComponent;
  @ViewChild('menu') firstElement: ElementRef;
  @ViewChild('themeselector') themeselector: jqxDropDownListComponent;
  @ViewChild('content') last: ElementRef;

  title = 'Uitleen app';
  constructor(public authenticationservice: AuthenticationService, public themeprovider: ThemeproviderService) {
  }

  ngAfterViewInit(): void {
    this.DockPanel.refresh();
  }
}
