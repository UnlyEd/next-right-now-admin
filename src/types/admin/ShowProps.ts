import { Location } from './Location';
import { Match } from './Match';

/**
 * React Admin "List" component props
 *
 * Difference between React.ReactNode and JSX.Element is that React.ReactNode accepts null
 * We use JSX.Element when the prop cannot be null
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
  options: {
    label: string;
  };
  permissions: any[] | undefined;
  refresh: Function;
  resource: string;
};
