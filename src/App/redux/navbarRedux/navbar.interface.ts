export interface IFont {
  label: string;
  value: string;
}

export type TTheme = 'light' | 'dark';

export interface IThemes {
  [name: string]: TTheme;
}

export interface INavbarInitialState {
  dashboardFont: IFont;
  hasCountry: boolean;
  hasDate: boolean;
  hasTimezone: boolean;
  auto: boolean;
  theme: TTheme;
}
