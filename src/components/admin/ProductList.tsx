import React from 'react';
import { Datagrid, DateField, List, TextField } from 'react-admin';

export const ProductList = (props): JSX.Element => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        {/*<TextField source="id" />*/}
        <TextField source="title" />
        {/*<ArrayField source="images"><SingleFieldList><ChipField source="id" /></SingleFieldList></ArrayField>*/}
        {/*<ReferenceArrayField source="imagesIds" reference="images"><TextField source="id" /></ReferenceArrayField>*/}
        <TextField source="customer.label" />
        <TextField source="price" />
        <TextField source="description" />
        {/*<TextField source="descriptionEN" />*/}
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  );
};
