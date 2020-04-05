import React from 'react';
import { Create, CreateController, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { CreateControllerProps } from '../../types/admin/CreateControllerProps';
import { CreateProps } from '../../types/admin/CreateProps';
import { Product } from '../../types/data/Product';

const ProductCreate = (props: CreateProps): JSX.Element => {
  console.debug('ProductCreate.props', props);
  return (
    <CreateController {...props}>
      {(controllerProps: CreateControllerProps) => {
        const { record, loading }: CreateControllerProps & { record: Product | {} } = controllerProps;

        if (!loading) {
          console.debug('productCreate.controllerProps:', controllerProps, 'record:', record);
          return (
            <Create {...props}>
              <SimpleForm
                redirect={'list'}
              >
                <ReferenceInput label="Customer" source="customer.id" reference="Customer">
                  <SelectInput optionText="label" />
                </ReferenceInput>
                <TextInput source="titleEN" label={'Title (EN)'} />
                <TextInput source="titleFR" label={'Title (FR)'} />
                <NumberInput source="price" defaultValue={5} />
              </SimpleForm>
            </Create>
          );
        } else {
          return null;
        }
      }}
    </CreateController>
  );
};

export default ProductCreate;
