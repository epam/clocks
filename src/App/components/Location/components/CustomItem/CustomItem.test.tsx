import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import CustomItem from './CustomItem';
import i18n from '../../../../dictionary';

const target = {
  city: 'Chicago',
  city_ascii: 'Chicago',
  lat: 41.82999066,
  lng: -87.75005497,
  pop: 5915976,
  country: 'United States of America',
  iso2: 'US',
  iso3: 'USA',
  province: 'Illinois',
  exactCity: 'Chicago',
  exactProvince: 'IL',
  state_ansi: 'IL',
  timezone: 'America/Chicago',
  names: ''
};

const select = jest.fn();

const Wrapper = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('CustomItem component', () => {
  it('renders properly without badge', () => {
    render(
      <Wrapper>
        <CustomItem
          type="light"
          target={target}
          onSelect={select}
          added={false}
        />
      </Wrapper>
    );
    expect(screen.getByRole('menuitem')).toBeInTheDocument();
    expect(screen.getByText(/Chicago/i)).toBeInTheDocument();
    expect(screen.getByText(/United States of America/i)).toBeInTheDocument();
    expect(screen.getByText(/Illinois/i)).toBeInTheDocument();
  });
  it('renders properly with badge', () => {
    render(
      <Wrapper>
        <CustomItem type="light" target={target} onSelect={select} added />
      </Wrapper>
    );
    expect(screen.getByText(/Added/i)).toBeInTheDocument();
    expect(screen.getByTestId('Badge')).toBeInTheDocument();
  });
  it('clickable', () => {
    render(
      <Wrapper>
        <CustomItem
          type="light"
          target={target}
          onSelect={select}
          added={false}
        />
      </Wrapper>
    );
    userEvent.click(screen.getByRole('menuitem'));
    expect(select).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenLastCalledWith(target);
  });
});
