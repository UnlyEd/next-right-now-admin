import { Location } from './Location';
import { Match } from './Match';
import { Options } from './Options';

/**
 * React Admin "Show" component props
 */
export type ShowProps = {
  basePath: string;
  hasCreate: boolean;
  hasEdit: boolean;
  hasList: boolean;
  hasShow: boolean;
  id: string;
  location: Location;
  match: Match;
  options: Options;
  permissions: any[] | undefined;
  refresh: Function;
  resource: string;
};
