import {NavigationEnd, Router} from "@angular/router";
import {Component, ElementRef, ViewChild} from "@angular/core";
import {ThemeproviderService} from "../../theme/themeprovider.service";

@Component({
  selector: 'BreadcrumpComponent',
  templateUrl: './breadcrump.component.html'
})
export class BreadcrumpComponent {
  @ViewChild('breadcrump') breadcrump: ElementRef;
  public breadcrumpItems = [];
  public jqxWidgetHeaderClass: string = '';
  public jqxRcAllClass: string = '';

  constructor(public router: Router, public themeProvider: ThemeproviderService){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.breadcrumpItems = [];
        let url = this.router.routerState.snapshot.url;
        if (!url.indexOf('/home')) url = '/';
        let urlarray = url.split('/');
        urlarray.shift(); //haal eerste (lege) item uit de array
        for (let item of urlarray) {
          this.breadcrumpItems.push({
            text: item.charAt(0).toUpperCase() + item.slice(1),
            url: url.substring(0, url.indexOf(item) + item.length)
          });
        }
      }
    });
    this.themeProvider.getSelectedThemeObservable().subscribe(newTheme => {
        this.jqxWidgetHeaderClass = 'jqx-widget-header';
        this.jqxRcAllClass = 'jqx-rc-all'
        if(newTheme.toLocaleLowerCase() != 'base') {
          this.jqxWidgetHeaderClass += '-' + newTheme;
          this.jqxRcAllClass += '-' + newTheme;
        }
    });
  }
}
