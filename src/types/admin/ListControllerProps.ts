import { Record } from '../../utils/record';
import { DisplayedFilters } from './DisplayedFilters';
import { FilterValues } from './FilterValues';
import { Sort } from './Sort';

/**
 * React Admin "ListController" component props
 *
 * Difference between React.ReactNode and JSX.Element is that React.ReactNode accepts null
 * We use JSX.Element when the prop cannot be null
 */
export type ListControllerProps = {
  basePath: string;
  currentSort: Sort;
  data: {
    [key: string]: Record;
  };
  defaultTitle: string;
  displayedFilters: DisplayedFilters;
  filterValues: FilterValues;
  hasCreate: boolean;
  hideFilter: (filterName: string) => void;
  ids: string[];
  loaded: boolean;
  loading: boolean;
  onSelect: (newIds: string[]) => void;
  onToggleItem: (id: string) => void;
  onUnselectItems: () => void;
  page: number;
  perPage: number; // Default: 10
  resource: string;
  selectedIds: string[];
  setFilters: (filters, displayedFilters: DisplayedFilters) => any;
  setPage: (newPage: any) => void;
  setPerPage: (newPerPage: number) => void;
  setSort: (newSort: Sort) => void;
  showFilter: (filterName: string, defaultValue: any) => void;
  translate: (key: string, options: any) => string;
};
