import { timezonesDB } from '../redux/timezonesDB';

const useCountryToAbbreviation = (countryTimezone: string | undefined) => {
  let foundTimezone: any;
  if (countryTimezone) {
    foundTimezone = timezonesDB.timezones.find(timezone => {
      return timezone.values.includes(countryTimezone);
    })!;
  }

  if (foundTimezone) {
    return foundTimezone['abbreviation'];
  } else {
    return '';
  }
};

export default useCountryToAbbreviation;
