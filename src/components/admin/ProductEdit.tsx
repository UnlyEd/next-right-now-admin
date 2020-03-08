import React from 'react';
import { ArrayInput, Edit, FileField, ImageField, NumberInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

const ProductEdit = (props): JSX.Element => {
  console.log('productEdit props', props);
  return (
    <Edit {...props}>
      <SimpleForm>
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
        <NumberInput source="price" />
        <TextInput source="title" />
        <TextInput source="titleEN" />
        <TextInput source="titleFR" />
        {/*<TextInput source="description" />*/}
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
