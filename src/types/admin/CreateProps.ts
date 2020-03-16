import { Location } from './Location';
import { Match } from './Match';
import { Options } from './Options';

/**
 * React Admin "Create" component props
 */
export type CreateProps = {
  basePath: string;
  hasCreate: boolean;
  hasEdit: boolean;
  hasList: boolean;
  hasShow: boolean;
  location: Location;
  match: Match;
  options: Options;
  permissions: any[] | undefined;
  resource: string;
};
