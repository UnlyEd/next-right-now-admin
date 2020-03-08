import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';
import { ListProps } from '../../types/admin/ListProps';

const ProductList = (props: ListProps): JSX.Element => {
  console.log('ProductList.props', props);
  return (
    <List
      {...props}
      sort={{
        field: 'titleEN',
        order: 'DESC',
      }}
    >
      <Datagrid rowClick="edit">
        <TextField source="title" />
        <TextField source="titleEN" label={'Title (EN)'} />
        <TextField source="titleFR" label={'Title (FR)'} />
        {/*<ArrayField source="images"><SingleFieldList><ChipField source="id" /></SingleFieldList></ArrayField>*/}
        {/*<ReferenceArrayField source="imagesIds" reference="images"><TextField source="id" /></ReferenceArrayField>*/}
        <TextField source="customer.label" label={'Customer'} />
        <TextField source="price" />
      </Datagrid>
    </List>
  );
};

export default ProductList;
