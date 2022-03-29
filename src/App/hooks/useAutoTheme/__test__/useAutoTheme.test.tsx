import React, { FC } from 'react';
import { render } from '@testing-library/react';
import useAutoTheme from '../useAutoTheme';

test('useAutoTheme hook', () => {
  function Wrapper() {
    const { setAutoTheme } = useAutoTheme();

    return null;
  }

  render(<Wrapper />);
  //   expect(setAutoTheme).toHaveBeenCalledTimes(1);
});
