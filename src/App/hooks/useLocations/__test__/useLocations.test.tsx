import React from 'react';
import { render } from '@testing-library/react';
import useLocations from '../useLocations';
import { BrowserRouter as Router, useSearchParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import i18n from '../../../dictionary/i18n';

import reducer from '../../../redux/reducer';
import { act } from 'react-dom/test-utils';

const store = createStore(reducer);

const cityKeys = {
  Tashkent: 'Tashkent41.31170188',
  Paris: 'Paris48.86669293',
  London: 'London51.49999473'
};

const locationsDB = {
  'Tashkent41.31170188': {
    city: 'Tashkent',
    lat: 41.31170188,
    userLocation: true,
    offset: -300
  },
  'Paris48.86669293': {
    city: 'Paris',
    lat: 48.86669293,
    offset: -120
  },
  'London51.49999473': {
    city: 'London',
    lat: 51.49999473,
    offset: -60
  }
};

describe('useLocations tests', () => {
  const mockNavigator = {
    geolocation: {
      getCurrentPosition: () => {}
    }
  };

  beforeEach(() => {
    i18n.init();
    (window as any).navigator = mockNavigator;
  });

  it('useLocations tests', () => {
    let useLocationsHook: any = {};
    let searchParams: any = {};

    function MyComponent() {
      searchParams = useSearchParams()[0];
      useLocationsHook = useLocations();
      return null;
    }

    render(
      <Provider store={store}>
        <Router>
          <MyComponent />
        </Router>
      </Provider>
    );

    // checking initially locations and searchParams are equal to "null";
    expect(useLocationsHook.locations).toBe(null);
    expect(searchParams.get('locations')).toEqual(null);

    // setting userLocation to Tashkent and checking locations and searchParams;
    act(() => {
      useLocationsHook.setLocations({
        'Tashkent41.31170188': {
          city: 'Tashkent',
          lat: 41.31170188,
          userLocation: true,
          offset: -300
        }
      });
    });

    expect(useLocationsHook.locations).toEqual({
      'Tashkent41.31170188': {
        city: 'Tashkent',
        lat: 41.31170188,
        userLocation: true,
        offset: -300
      }
    });

    expect(JSON.parse(atob(searchParams.get('locations')))).toEqual({
      'Tashkent41.31170188': {
        city: 'Tashkent',
        lat: 41.31170188,
        userLocation: true,
        offset: -300
      }
    });

    // finding Paris from database and checking "country" property
    const find = useLocationsHook.findLocation({
      city: 'Paris',
      lat: 48.86669293,
      offset: -120,
      userLocation: false
    });
    expect(find['country']).toEqual('France');

    // Getting location offset Paris and London and expecting to be equal -120 and -60;
    const ParisOffset = useLocationsHook.getLocationOffset('Europe/Paris');
    expect(ParisOffset).toEqual(-120);
    const LondonOffset = useLocationsHook.getLocationOffset('Europe/London');
    expect(LondonOffset).toEqual(-60);

    // three locations added and dragged Tashkent and dropped into Paris and checked their orders
    act(() => {
      useLocationsHook.setLocations({
        'Tashkent41.31170188': {
          city: 'Tashkent',
          lat: 41.31170188,
          userLocation: true,
          offset: -300
        },
        'Paris48.86669293': {
          city: 'Paris',
          lat: 48.86669293,
          offset: -120
        },
        'London51.49999473': {
          city: 'London',
          lat: 51.49999473,
          offset: -60
        }
      });
    });

    const Tashkent = useLocationsHook.findLocation({
      city: 'Tashkent',
      lat: 41.31170188,
      userLocation: true,
      offset: -300
    });

    const Paris = useLocationsHook.findLocation({
      city: 'Paris',
      lat: 48.86669293,
      offset: -120,
      userLocation: false
    });

    expect(Object.keys(useLocationsHook.locations)).toEqual([
      cityKeys['Tashkent'],
      cityKeys['Paris'],
      cityKeys['London']
    ]);

    let locationsKeysFromSearchParams = Object.keys(
      JSON.parse(atob(searchParams.get('locations')))
    );
    expect(locationsKeysFromSearchParams).toEqual([
      cityKeys['Tashkent'],
      cityKeys['Paris'],
      cityKeys['London']
    ]);

    act(() => {
      useLocationsHook.dragAndDropLocation(Tashkent, Paris);
    });

    expect(Object.keys(useLocationsHook.locations)).toEqual([
      cityKeys['Paris'],
      cityKeys['Tashkent'],
      cityKeys['London']
    ]);

    locationsKeysFromSearchParams = Object.keys(JSON.parse(atob(searchParams.get('locations'))));
    expect(locationsKeysFromSearchParams).toEqual([
      cityKeys['Paris'],
      cityKeys['Tashkent'],
      cityKeys['London']
    ]);
  });
});
