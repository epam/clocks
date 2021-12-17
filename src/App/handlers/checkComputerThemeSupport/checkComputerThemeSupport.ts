function checkComputerThemeSupport(): boolean {
  if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
    return true;
  }
  return false;
}

export default checkComputerThemeSupport;
