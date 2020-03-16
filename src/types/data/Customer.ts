import { GraphCMSSystemFields } from './GraphCMSSystemFields';
import { Theme } from './Theme';

export declare type Customer = {
  id?: string;
  ref?: string;
  labelFR?: string;
  labelEN?: string;
  termsEN?: {
    html: string;
  };
  termsFR?: {
    html: string;
  };
  theme?: Theme;
} & GraphCMSSystemFields;
