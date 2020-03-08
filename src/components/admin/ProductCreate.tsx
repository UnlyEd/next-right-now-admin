import React from 'react';
import { Create, NumberInput, SimpleForm, TextInput } from 'react-admin';

const ProductCreate = (props): JSX.Element => {
  console.log('productCreate props', props);
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput source="price" />
        <TextInput source="title" />
        <TextInput source="titleEN" />
        <TextInput source="titleFR" />
      </SimpleForm>
    </Create>
  );
};

export default ProductCreate;
