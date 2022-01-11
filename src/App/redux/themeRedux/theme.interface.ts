type TTheme = 'light' | 'dark';

interface IThemes {
  [name: string]: TTheme;
}
interface IThemeInitialState {
  auto: boolean;
  theme: TTheme;
}

export type { IThemeInitialState, IThemes, TTheme };
