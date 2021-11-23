/* eslint-disable camelcase */
interface CityData {
    readonly lat: number;
    readonly lng: number;
    readonly pop: number;
    readonly city: string;
    readonly iso2: string;
    readonly iso3: string;
    readonly country: string;
    readonly timezone: string;
    readonly province: string;
    readonly exactCity: string;
    readonly city_ascii: string;
    readonly state_ansi: string;
    readonly exactProvince: string;
    readonly names: string;
}

export default CityData;
