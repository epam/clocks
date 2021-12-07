import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomItem from './CustomItem';

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
  timezone: 'America/Chicago'
};

const select = jest.fn();

describe('CustomItem component', () => {
  it('renders properly without badge', () => {
    render(<CustomItem target={target} onSelect={select} added={false} />);
    expect(screen.getByRole('menuitem')).toBeInTheDocument();
    expect(screen.getByText(/Chicago/i)).toBeInTheDocument();
    expect(screen.getByText(/United States of America/i)).toBeInTheDocument();
    expect(screen.getByText(/Illinois/i)).toBeInTheDocument();
  });
  it('renders properly with badge', () => {
    render(<CustomItem target={target} onSelect={select} added />);
    expect(screen.getByText(/Added/i)).toBeInTheDocument();
    expect(screen.getByTestId('Badge')).toBeInTheDocument();
  });
  it('clickable', () => {
    render(<CustomItem target={target} onSelect={select} added={false} />);
    userEvent.click(screen.getByRole('menuitem'));
    expect(select).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenLastCalledWith(target);
  });
});
