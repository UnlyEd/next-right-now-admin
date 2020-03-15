import React from 'react';
import { Datagrid, ImageField, List, ListController, TextField } from 'react-admin';
import { ListControllerProps } from '../../types/admin/ListControllerProps';
import { ListProps } from '../../types/admin/ListProps';
import CustomerBulkActionButtons from './CustomerBulkActionButtons';
import ColorField from './fields/ColorField';

const CustomerList = (props: ListProps): JSX.Element => {
  console.debug('CustomerList.props', props);
  return (
    <ListController {...props}>
      {(controllerProps: ListControllerProps) => {
        console.debug('CustomerList.controllerProps', controllerProps);
        return (
          <List
            {...props}
            {...controllerProps}
            sort={{
              field: 'labelEN',
              order: 'DESC',
            }}
            bulkActionButtons={<CustomerBulkActionButtons />}
          >
            <Datagrid rowClick="edit">
              <TextField source="ref" label={'Reference (#)'} />
              <ImageField source={'theme.logo.url'} title={'theme.logo.title'} label={'Logo'} />
              <TextField source="labelEN" label={'Label (EN)'} />
              <TextField source="labelFR" label={'Label (FR)'} />
              <ColorField source="theme.primaryColor" label="Color" />
            </Datagrid>
          </List>
        );
      }}
    </ListController>
  );
};

export default CustomerList;
