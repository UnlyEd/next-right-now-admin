import React from 'react';
import { ArrayInput, Edit, FileField, ImageField, NumberInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

import ProductEditToolbar from './ProductEditToolbar';

const ProductEdit = (props): JSX.Element => {
  console.log('productEdit props', props);
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<ProductEditToolbar />}>
        <ArrayInput source="images">
          <SimpleFormIterator>
            <ImageField source="url" label="Image" title="fileName" />
            <FileField source="url" label="Image" />
          </SimpleFormIterator>
        </ArrayInput>
        <ImageField source="images" src="url" title="Image" />
        {/*<ReferenceArrayInput*/}
        {/*  label="Images"*/}
        {/*  source="imagesIds"*/}
        {/*  reference="Asset"*/}
        {/*>*/}
        {/*  <TextInput source="id" />*/}
        {/*</ReferenceArrayInput>*/}
        <TextInput source="titleEN" label={'Title (EN)'} />
        <TextInput source="titleFR" label={'Title (FR)'} />
        <NumberInput source="price" />
        {/*<TextInput source="description" />*/}
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
