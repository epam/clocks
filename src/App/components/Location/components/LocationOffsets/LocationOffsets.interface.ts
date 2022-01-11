import { TTheme } from '../../../../redux/themeRedux/theme.interface';

export interface ILocationOffsetsProps {
  type: TTheme;
  hours: number;
  minutes: number;
  host: boolean;
}
