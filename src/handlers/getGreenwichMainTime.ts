import CityData from '../types/city-timezones';
import cityMapping from '../constants/cityMapping';

const getGreenwichMainTime = () => (cityMapping as CityData[]).find(city => city.city_ascii === 'London');

export default getGreenwichMainTime;
