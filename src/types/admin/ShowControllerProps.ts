import { Record } from '../../utils/record';
import { Redirect } from './Redirect';

/**
 * React Admin "ShowController" component props
 */
export type ShowControllerProps = {
  basePath: string;
  defaultTitle: string;
  loaded: boolean;
  loading: boolean;
  record: Record;
  redirect: Redirect;
  resource: string;
  translate: (key: string, options: any) => string;
  version: number;
};
