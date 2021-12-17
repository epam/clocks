import generateIdFormat from '../generateIdFormat/generateIdFormat';
import cityMapping from '../../lib/city-timezones.json';
import { ICityData } from '../../lib/interfaces';
import { IUserLocation } from './getUserLocation.interface';

const locations: ICityData[] = [...cityMapping];

async function getUserLocation(): Promise<IUserLocation> {
  let error = false;
  let message = '';
  let id = '';

  // eslint-disable-next-line no-undef
  function handleError(err: GeolocationPositionError): void {
    error = true;
    switch (err.code) {
      case err.PERMISSION_DENIED:
        message = 'User denied the request for Geolocation';
        break;
      case err.POSITION_UNAVAILABLE:
        message = 'Location information is unavailable';
        break;
      case err.TIMEOUT:
        message = 'request time is out';
        break;
      default:
        message = 'Something went wrong';
    }
  }

  if (navigator.geolocation) {
    try {
      id = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            locations.sort((a, b) => {
              const first =
                Math.abs(a.lat - coords['latitude']) +
                Math.abs(a.lng - coords['longitude']);
              const second =
                Math.abs(b.lat - coords['latitude']) +
                Math.abs(b.lng - coords['longitude']);

              return first - second;
            });

            const city = locations[0];
            const { city_ascii: cityAscii, iso2, lat, lng }: ICityData = city;
            const id = generateIdFormat(cityAscii, iso2, lat, lng);
            resolve(id);
          },
          props => {
            handleError(props);
            reject(new Error(''));
          },
          {
            timeout: 0
          }
        );
      });
    } catch (err) {
      console.warn('Getting user location is refused!');
    }
  } else {
    error = true;
    message = 'geolocation is not supported by this browser!';
  }

  return { error, message, id };
}

export default getUserLocation;
