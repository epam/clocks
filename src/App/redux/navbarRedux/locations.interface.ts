export interface IFont {
  label: string;
  value: string;
}

export interface INavbarInitialState {
  dashboardFont: IFont;
  hasCountry: boolean;
  hasDate: boolean;
  hasTimezone: boolean;
}
