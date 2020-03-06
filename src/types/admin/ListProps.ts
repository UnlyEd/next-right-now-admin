import React from 'react';

/**
 * TODO All "any" types are unknown
 *
 * See https://marmelab.com/react-admin/List.html
 */
export type ListProps = {
  title: string | React.ReactNode;
  actions: React.ReactNode; // TODO should use ListActionProps as props
  exporter: any | boolean; // You can hide ExportButton if exporter = (null || false)
  bulkActionButtons: any;
  filters: React.ReactNode;
  perPage: number; // Default: 10
  sort: {
    field: string; // Default: 'id'
    order: string; // Default: 'ASC'
  };
  filter: object; // Example: { is_published: true }
  filterDefaultValues: any;
  pagination: any;
  aside: React.ReactNode; // To display additional information on the side of the list
  empty: any;
};
