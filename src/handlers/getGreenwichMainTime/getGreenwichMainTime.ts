import { cityMapping } from '../../constants/index';
import { ICityData } from '../../types/timezones';

const getGreenwichMainTime = () =>
  (cityMapping as ICityData[]).find(city => city.city_ascii === 'London');

export default getGreenwichMainTime;
