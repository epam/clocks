import { ICityData } from '../../types/timezones';
import cityMapping from '../../constants/cityMapping';

const getGreenwichMainTime = () => (cityMapping as ICityData[]).find(city => city.city_ascii === 'London');

export default getGreenwichMainTime;
