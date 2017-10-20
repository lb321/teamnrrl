export class ThemeproviderService {
  public selectedTheme: string = 'Base';
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
    console.log('change theme to: ' + chosenTheme);
    //MainPanelProviderService.refreshMainPanel();
  }
}
