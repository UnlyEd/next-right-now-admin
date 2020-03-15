import React from 'react';
import { ChipField, Datagrid, ImageField, List, ListController, TextField } from 'react-admin';
import { ListProps } from '../../types/admin/ListProps';
import ProductBulkActionButtons from './ProductBulkActionButtons';

const ProductList = (props: ListProps): JSX.Element => {
  console.debug('ProductList.props', props);
  return (
    <ListController {...props}>
      {(controllerProps) => {
        console.debug('ProductList.controllerProps', controllerProps);
        return (
          <List
            {...props}
            {...controllerProps}
            sort={{
              field: 'titleEN',
              order: 'DESC',
            }}
            bulkActionButtons={<ProductBulkActionButtons />}
          >
            <Datagrid rowClick="edit">
              <ImageField source={'images[0].url'} title={'images[0]title'} label={'Image'} />
              <TextField source="titleEN" label={'Title (EN)'} />
              <TextField source="titleFR" label={'Title (FR)'} />
              {/*<ArrayField source="images"><SingleFieldList><ChipField source="id" /></SingleFieldList></ArrayField>*/}
              {/*<ReferenceArrayField source="imagesIds" reference="images"><TextField source="id" /></ReferenceArrayField>*/}
              <TextField source="customer.label" label={'Customer'} />
              <TextField source="price" />
              <ChipField source="status" color={'primary'} />
            </Datagrid>
          </List>
        );
      }}
    </ListController>
  );
};

export default ProductList;
