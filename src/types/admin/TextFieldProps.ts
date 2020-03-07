import React from 'react';
import { FieldProps } from './FieldProps';

/**
 * TODO All "any" types are unknown
 *
 * See https://marmelab.com/react-admin/List.html
 */
export type TextFieldProps = {
  sortable: boolean; // Default: true
} & FieldProps;
