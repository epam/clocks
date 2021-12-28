import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import LocationOffsets from './LocationOffsets';
import i18n from '../../../../dictionary';

describe('LocationOffsets in different conditions', () => {
  it('displays minutes and hours in plural', () => {
    render(<LocationOffsets hours={4} minutes={30} host={false} />);
    expect(screen.getByText(/HOURS/i)).toBeInTheDocument();
    expect(screen.getByText(/MINUTES/i)).toBeInTheDocument();
  });
  it('displays negative sign if offset is minus', () => {
    render(<LocationOffsets hours={-4} minutes={30} host={false} />);
    expect(screen.getByText(/- 4/)).toBeInTheDocument();
  });
  it('displays hour in singular and without minute', () => {
    render(<LocationOffsets hours={1} minutes={0} host={false} />);
    expect(screen.getByText(/HOUR/i)).toBeInTheDocument();
    expect(screen.queryByText(/HOURS/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/MINUTES/i)).not.toBeInTheDocument();
  });
  it('do not shows offsets if host is true', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LocationOffsets hours={2} minutes={30} host />
      </I18nextProvider>
    );
    expect(screen.getByText(/You are here/i)).toBeInTheDocument();
    expect(screen.queryByText(/HOURS/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/MINUTES/i)).not.toBeInTheDocument();
  });
});
