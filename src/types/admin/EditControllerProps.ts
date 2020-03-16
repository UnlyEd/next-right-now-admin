import { Record } from '../../utils/record';
import { Redirect } from './Redirect';

/**
 * React Admin "EditController" component props
 *
 * Difference between React.ReactNode and JSX.Element is that React.ReactNode accepts null
 * We use JSX.Element when the prop cannot be null
 */
export type EditControllerProps = {
  basePath: string;
  defaultTitle: string;
  loaded: boolean;
  loading: boolean;
  record: Record;
  redirect: Redirect;
  resource: string;
  save: (data: any, redirectTo: any, _a: any) => void;
  saving: boolean;
  translate: (key: string, options: any) => string;
  version: number;
};
