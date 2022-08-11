import { timezonesDB } from '../redux/timezonesDB';

export default function countryToAbbreviationTimezone(countryTimezone: string | undefined) {
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
}
