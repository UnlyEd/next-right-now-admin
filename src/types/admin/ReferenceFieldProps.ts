import React from 'react';
import { FieldProps } from './FieldProps';

/**
 * TODO All "any" types are unknown
 *
 * See https://marmelab.com/react-admin/List.html
 */
export type ReferenceFieldProps = {
  sortable: boolean; // Default: true
  label: string;
  reference: string;
  sortBy: string;
} & FieldProps;
