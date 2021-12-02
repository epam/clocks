import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomInput from './CustomInput';

const MockComponent = () => {
  const [value, setValue] = React.useState('');
  return <CustomInput value={value} setValue={setValue} autoFocus />;
};

describe('Custom input Component: ', () => {
  it('renders properly', () => {
    render(<CustomInput value="" setValue={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search cities')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search cities')).not.toBeRequired();
    expect(screen.getByPlaceholderText('Search cities')).toBeEmptyDOMElement();
    expect(screen.getByLabelText('input-cleaner')).toBeInTheDocument();
  });
  it('works as expected', () => {
    render(<MockComponent />);
    const input = screen.getByPlaceholderText('Search cities');
    const button = screen.getByLabelText('input-cleaner');

    userEvent.type(input, 'React');
    expect(input).toHaveFocus();
    expect(input).toHaveValue('React');
    userEvent.click(button);
    expect(input).toHaveValue('');
  });
});
