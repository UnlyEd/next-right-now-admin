import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';
import { ListProps } from '../../types/admin/ListProps';
import CustomerBulkActionButtons from './CustomerBulkActionButtons';

const CustomerList = (props: ListProps): JSX.Element => {
  console.log('CustomerList.props', props);
  return (
    <List
      {...props}
      sort={{
        field: 'labelEN',
        order: 'DESC',
      }}
      bulkActionButtons={<CustomerBulkActionButtons />}
    >
      <Datagrid rowClick="edit">
        <TextField source="ref" label={'Reference (#)'} />
        <TextField source="labelEN" label={'Label (EN)'} />
        <TextField source="labelFR" label={'Label (FR)'} />
      </Datagrid>
    </List>
  );
};

export default CustomerList;
