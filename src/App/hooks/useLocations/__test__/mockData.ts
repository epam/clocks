import { IUrlLocations } from '../../../redux/types';

export const mockedCityKeys = {
  Tashkent: 'Tashkent41.31170188',
  Paris: 'Paris48.86669293',
  London: 'London51.49999473'
};

export const mockedLocationsDB: {
  Tashkent: IUrlLocations;
  Paris: IUrlLocations;
  London: IUrlLocations;
} = {
  Tashkent: {
    'Tashkent41.31170188': {
      city: 'Tashkent',
      lat: 41.31170188,
      userLocation: true,
      offset: -300
    }
  },
  Paris: {
    'Paris48.86669293': {
      city: 'Paris',
      lat: 48.86669293,
      offset: -120
    }
  },
  London: {
    'London51.49999473': {
      city: 'London',
      lat: 51.49999473,
      offset: -60
    }
  }
};
