import React from 'react';
import { ReferenceInput, SelectInput, Create, NumberInput, SimpleForm, TextInput } from 'react-admin';

const ProductCreate = (props): JSX.Element => {
  console.debug('productCreate.props', props);
  return (
    <Create {...props}>
      <SimpleForm
        redirect={'list'}
      >
        {/*<ReferenceInput label="Customer" source="customer" reference="Customer">*/}
        {/*  <SelectInput optionText="label" />*/}
        {/*</ReferenceInput>*/}
        <TextInput source="titleEN" label={"Title (EN)"} />
        <TextInput source="titleFR" label={"Title (FR)"} />
        <NumberInput source="price" defaultValue={5} />
      </SimpleForm>
    </Create>
  );
};

export default ProductCreate;
