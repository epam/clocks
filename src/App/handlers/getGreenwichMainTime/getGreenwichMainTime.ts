import cityMapping from '../../lib/city-timezones.json';
import { ICityData } from '../../lib/interfaces';

const getGreenwichMainTime = () =>
  (cityMapping as ICityData[]).find(city => city.city_ascii === 'London');

export default getGreenwichMainTime;
