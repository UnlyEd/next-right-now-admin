import React from 'react';
import { Edit, EditController, ImageField, NumberInput, SimpleForm, TextInput } from 'react-admin';
import { EditControllerProps } from '../../types/admin/EditControllerProps';
import { EditProps } from '../../types/admin/EditProps';
import { Product } from '../../types/data/Product';
// import ProductEditToolbar from './ProductEditToolbar';

const ProductEdit = (props: EditProps): JSX.Element => {
  console.debug('ProductEdit.props', props);
  return (
    <EditController {...props}>
      {(controllerProps: EditControllerProps) => {
        const { record, loading }: EditControllerProps & { record: Product } = controllerProps;

        if (!loading) {
          console.debug('productEdit.controllerProps:', controllerProps, 'record:', record);
          return (
            <Edit
              undoable={false}
              {...props}
            >
              <SimpleForm
                // XXX Using custom toolbar breaks updates/deletes because props get injected to the DOM instead of being passed down to children, somehow
                // toolbar={<ProductEditToolbar />}
                redirect={false}
              >
                <ImageField source="images" src="url" title="Image" />
                <TextInput source="titleEN" label={'Title (EN)'} />
                <TextInput source="titleFR" label={'Title (FR)'} />
                <TextInput source="descriptionEN" label={'Description (EN)'} multiline={true} />
                <TextInput source="descriptionFR" label={'Description (FR)'} multiline={true} />
                <NumberInput source="price" />
              </SimpleForm>
            </Edit>
          );
        } else {
          return null;
        }
      }}
    </EditController>
  );
};

export default ProductEdit;
