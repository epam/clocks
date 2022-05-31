import React from 'react';
import { render } from '@testing-library/react';
import useLocations from '../useLocations';
import { BrowserRouter as Router, useSearchParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import i18n from '../../../dictionary/i18n';
import reducer from '../../../redux/reducer';
import { act } from 'react-dom/test-utils';

import { mockedCityKeys, mockedLocationsDB } from './mockData';

const store = createStore(reducer);

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

    // setting userLocation to "Tashkent" and checking locations and searchParams;
    act(() => {
      useLocationsHook.setLocations(mockedLocationsDB['Tashkent']);
    });

    expect(useLocationsHook.locations).toEqual(mockedLocationsDB['Tashkent']);

    expect(JSON.parse(atob(searchParams.get('locations')))).toEqual(mockedLocationsDB['Tashkent']);

    // finding "Paris" from database and checking "country" property
    const find = useLocationsHook.findLocation(mockedLocationsDB['Paris']['Paris48.86669293']);
    expect(find['country']).toEqual('France');

    // Getting location offset "Paris" and London and expecting to be equal -120 and -60;
    const ParisOffset = useLocationsHook.getLocationOffset('Europe/Paris');
    expect(ParisOffset).toEqual(-120);
    const LondonOffset = useLocationsHook.getLocationOffset('Europe/London');
    expect(LondonOffset).toEqual(-60);

    // three locations added and dragged "Tashkent" and dropped into "Paris" and checked their orders
    act(() => {
      useLocationsHook.setLocations({
        ...mockedLocationsDB['Tashkent'],
        ...mockedLocationsDB['Paris'],
        ...mockedLocationsDB['London']
      });
    });

    const Tashkent = useLocationsHook.findLocation(
      mockedLocationsDB['Tashkent']['Tashkent41.31170188']
    );

    const Paris = useLocationsHook.findLocation(mockedLocationsDB['Paris']['Paris48.86669293']);

    expect(Object.keys(useLocationsHook.locations)).toEqual([
      mockedCityKeys['Tashkent'],
      mockedCityKeys['Paris'],
      mockedCityKeys['London']
    ]);

    let locationsKeysFromSearchParams = Object.keys(
      JSON.parse(atob(searchParams.get('locations')))
    );
    expect(locationsKeysFromSearchParams).toEqual([
      mockedCityKeys['Tashkent'],
      mockedCityKeys['Paris'],
      mockedCityKeys['London']
    ]);

    act(() => {
      useLocationsHook.dragAndDropLocation(Tashkent, Paris);
    });

    expect(Object.keys(useLocationsHook.locations)).toEqual([
      mockedCityKeys['Paris'],
      mockedCityKeys['Tashkent'],
      mockedCityKeys['London']
    ]);

    locationsKeysFromSearchParams = Object.keys(JSON.parse(atob(searchParams.get('locations'))));

    expect(locationsKeysFromSearchParams).toEqual([
      mockedCityKeys['Paris'],
      mockedCityKeys['Tashkent'],
      mockedCityKeys['London']
    ]);
  });
});
