import React from 'react';

/**
 * TODO All "any" types are unknown
 *
 * See https://marmelab.com/react-admin/List.html
 */
export type ListActionsProps = {
  currentSort: any;
  className: any;
  resource: string; // 'posts', 'comments', etc.
  filters: any;
  displayedFilters: any;
  exporter: any | boolean; // You can hide ExportButton if exporter = (null || false)
  filterValues: any;
  permanentFilter: any;
  hasCreate: boolean;
  basePath: string; // '/posts', '/comments', etc.
  selectedIds: string[];
  onUnselectItems: Function;
  showFilter: boolean; // ? check
  maxResults: number;
  total: number; // ? check
};
