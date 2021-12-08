import { render, screen } from '@testing-library/react';
import LocationOffsets from './LocationOffsets';

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
    render(<LocationOffsets hours={2} minutes={30} host />);
    expect(screen.getByText(/You are here/i)).toBeInTheDocument();
    expect(screen.queryByText(/HOURS/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/MINUTES/i)).not.toBeInTheDocument();
  });
});
