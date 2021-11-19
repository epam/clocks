import { CityData } from 'city-timezones';
import cityMapping from '../constants/cityMapping';

const getGreenwichMainTime = () => (cityMapping as CityData[]).find(city => city.city_ascii === 'London');

export default getGreenwichMainTime;
