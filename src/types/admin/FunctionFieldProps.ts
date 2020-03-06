import React from 'react';
import { FieldProps } from './FieldProps';

/**
 * TODO All "any" types are unknown
 *
 * See https://marmelab.com/react-admin/List.html
 */
export type FunctionFieldProps = {
  label: string;
  sortBy: string;
  render: Function;
} & FieldProps;
