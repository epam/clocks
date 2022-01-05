import { TTheme } from '../../context/theme/ThemeContext.interface';

interface IThemes {
  [name: string]: TTheme;
}
interface IThemeInitialState {
  auto: boolean;
  theme: TTheme;
}

export type { IThemeInitialState, IThemes };
