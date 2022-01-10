/* eslint-disable camelcase */
import { ReactNode } from 'react';

export interface IContext<State, Actions> {
  state: Partial<State>;
  actions: Partial<Actions>;
}

export interface IProviderProp {
  children: ReactNode;
}

export interface ICityData {
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

export interface IMatchingLocation {
  rating: number;
  target: ICityData;
}
