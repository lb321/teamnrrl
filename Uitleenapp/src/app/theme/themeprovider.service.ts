import {ReplaySubject} from "rxjs/ReplaySubject";

export class ThemeproviderService {
  public selectedTheme: string = 'Base';
  public selectedThemeObservable = new ReplaySubject<string>(1);
  private themes: string[] = [
    'Base',
    'Flat',
    'Light',
    'Dark',
    'Glacier',
    'Artic',
    'Web',
    'Bootstrap',
    'Metro',
    'Metro Dark',
    'Office',
    'Orange',
    'Fresh',
    'Energy Blue',
    'Dark Blue',
    'Black',
    'Shiny Black',
    'Classic',
    'Summer',
    'High Contrast'
  ];

  constructor() {
    this.selectedTheme = this.themes[0];
    this.selectedThemeObservable.next(this.selectedTheme);
  }

  getSelectedTheme(): string {
    return this.selectedTheme;
  }

  getAllThemes(): string[] {
    return this.themes;
  }

  selectTheme(event: any) {
    let chosenTheme: string = this.themes[event.args.index];
    chosenTheme = chosenTheme.toLocaleLowerCase();
    chosenTheme = chosenTheme.replace(' ', '');
    this.selectedTheme = chosenTheme;
    this.selectedThemeObservable.next(this.selectedTheme);
    //MainPanelProviderService.refreshMainPanel();
  }

  getSelectedThemeObservable(){
    return this.selectedThemeObservable;
  }
}
