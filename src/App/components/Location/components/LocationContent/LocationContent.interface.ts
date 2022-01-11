import { TCity, TCountry, TTimezone } from '../../../../lib/types';
import { IAppLocation } from '../../../../lib/interfaces';
import { TTheme } from '../../../../redux/themeRedux/theme.interface';

export interface ILocationContentProps extends Partial<IAppLocation> {
  type: TTheme;
  city: TCity;
  country: TCountry;
  timezone: TTimezone;
  hours: number;
  minutes: number;
  host: boolean;
}
