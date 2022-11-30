import packageJSON from '../../../package.json';

// TODO TEMP approach for releasing...
export const RELEASE_VERSIONS = {
  currentVersion: {
    version: packageJSON.version,
    changes: [
      'Added Lane view instead Planning mode',
      'Redesign Settings',
      'Some minor Improvements'
    ]
  },
  previousVersion: {
    version: '2.4.5',
    changes: [
      'Improved location search',
      'added search using time zone abbreviations',
      'added country flags for dropdown list entries',
      'Improved search algorithm',
      'Added new time zone display options in Settings.'
    ]
  }
};
