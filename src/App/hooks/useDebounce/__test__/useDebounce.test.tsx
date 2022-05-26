import React from 'react';
import { render } from '@testing-library/react';
import useDebounce from '../useDebounce';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

it('useDebounce sets debounced text', () => {
  const text = 'hello';
  let debouncedText;

  function MyComponent() {
    debouncedText = useDebounce(text);
    return null;
  }

  render(<MyComponent />);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(debouncedText).toEqual('hello');
});
