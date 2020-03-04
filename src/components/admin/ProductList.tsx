import React from 'react';
import { Datagrid, DateField, List, TextField } from 'react-admin';

export const ProductList = (props): JSX.Element => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="status" />
        <DateField source="updatedAt" />
        <DateField source="createdAt" />
        <TextField source="id" />
        {/*<ArrayField source="images"><SingleFieldList><ChipField source="id" /></SingleFieldList></ArrayField>*/}
        {/*<ReferenceArrayField source="imagesIds" reference="images"><TextField source="id" /></ReferenceArrayField>*/}
        <TextField source="customer.id" />
        <TextField source="customer.id" />
        <TextField source="price" />
        <TextField source="title" />
        {/*<TextField source="description" />*/}
      </Datagrid>
    </List>
  );
};
