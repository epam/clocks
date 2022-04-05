import React from 'react';
import { render } from '@testing-library/react';
import * as redux from 'react-redux';

import useTheme from '../useTheme';
import { THEME } from '../../../redux/constants';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

describe('useTheme behaviour', () => {
  const useSelectorMock = redux.useSelector as jest.Mock<typeof redux.useSelector>;
  let currentTheme: string;

  const mockStore = {
    settings: {
      theme: THEME.light
    }
  };

  beforeEach(() => {
    useSelectorMock.mockImplementation(selector => selector(mockStore));
  });

  afterEach(() => {
    useSelectorMock.mockClear();
  });

  const Wrapper = () => {
    currentTheme = useTheme('lightClass', 'darkClass');
    return <></>;
  };

  it('checks default light mode', () => {
    render(<Wrapper />);
    expect(currentTheme).toBe('lightClass');
  });
});
