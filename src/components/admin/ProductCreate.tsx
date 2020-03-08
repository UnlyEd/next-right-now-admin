import React from 'react';
import { Create, NumberInput, SimpleForm, TextInput } from 'react-admin';

const ProductCreate = (props): JSX.Element => {
  console.log('productCreate props', props);
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="titleEN" label={"Title (EN)"} />
        <TextInput source="titleFR" label={"Title (FR)"} />
        <NumberInput source="price" />
      </SimpleForm>
    </Create>
  );
};

export default ProductCreate;
