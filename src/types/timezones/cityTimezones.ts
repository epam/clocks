/* eslint-disable camelcase */
interface ICityData {
  readonly city: string;
  readonly lat: number;
  readonly lng: number;
  readonly iso2: string;
  readonly country: string;
  readonly timezone: string;
  readonly province: string;
  readonly city_ascii: string;
  readonly names: string;
}

export type { ICityData };
