import React from 'react';

type Sort = {
  field: string; // Default: 'id'
  order: string; // Default: 'ASC'
}

/**
 * React Admin List component props
 *
 * Some of those props are manipulable, other aren't meant to
 * See https://github.com/marmelab/react-admin/blob/master/packages/ra-ui-materialui/src/list/List.js#L70
 *
 * Difference between React.ReactNode and JSX.Element is that React.ReactNode accepts null
 * We use JSX.Element when the prop cannot be null
 *
 * See https://marmelab.com/react-admin/List.html
 */
export type ListProps = {
  actions: React.ReactNode; // TODO should use ListActionProps as props
  aside: React.ReactNode; // To display additional information on the side of the list
  basePath: string;
  bulkActionButtons: React.ReactNode | string;
  children: JSX.Element;
  className: string;
  classes: object;
  component: JSX.Element; // Wrapper component, defaults to @material-ui/core/Card  - See https://github.com/marmelab/react-admin/blob/master/packages/ra-ui-materialui/src/list/List.js#L241
  currentSort: Sort;
  data: {
    [key: string]: any;
  };
  defaultTitle: string;
  displayedFilters: {
    [key: string]: any;
  };
  empty: React.ReactNode; // Component to render when no records to display
  exporter: Function | boolean; // You can hide ExportButton if exporter = (null || false)
  filterDefaultValues: {
    [key: string]: any;
  };
  filter: { // The permanent filter to apply to the query - Example: { is_published: true }
    // Default: {}
    [key: string]: any;
  };
  filters: React.ReactNode; // A React component used to display the filter form
  filterValues: {
    [key: string]: any;
  };
  hasCreate: boolean;
  hasEdit: boolean;
  hasList: boolean;
  hasShow: boolean;
  ids: string[];
  loading: boolean;
  onSelect: Function;
  onToggleItem: Function;
  onUnselectItems: Function;
  page: number;
  pagination: React.ReactNode | boolean;
  perPage: number; // Default: 10
  refresh: Function;
  resource: string;
  selectedIds: string[];
  setFilters: Function;
  setPage: Function;
  setPerPage: Function;
  setSort: Function;
  showFilter: Function;
  sort: Sort;
  title: string | React.ReactNode; // See https://github.com/marmelab/react-admin/blob/master/packages/ra-ui-materialui/src/layout/Title.js#L29
};
