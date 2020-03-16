import { Record } from '../../utils/record';
import { Redirect } from './Redirect';

/**
 * React Admin "CreateController" component props
 */
export type CreateControllerProps = {
  basePath: string;
  defaultTitle: string;
  loaded: boolean;
  loading: boolean;
  record: Record | {};
  redirect: Redirect;
  resource: string;
  save: (data: any, redirectTo: any, _a: any) => void;
  saving: boolean;
  translate: (key: string, options: any) => string;
  version: number;
};
