import React from 'react';
import { ArrayInput, Edit, FileField, ImageField, NumberInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

import ProductEditToolbar from './ProductEditToolbar';

const ProductEdit = (props): JSX.Element => {
  console.log('productEdit props', props);
  return (
    <Edit {...props}>
      {/* XXX Using custom toolbar breaks updates because props get injected to the DOM instead of being passed down to children, somehow*/}
      {/*<SimpleForm toolbar={<ProductEditToolbar />}>*/}
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
        <TextInput source="titleEN" label={'Title (EN)'} />
        <TextInput source="titleFR" label={'Title (FR)'} />
        <TextInput source="descriptionEN" label={'Description (EN)'} multiline={true} />
        <TextInput source="descriptionFR" label={'Description (FR)'} multiline={true} />
        <NumberInput source="price" />
        {/*<TextInput source="description" />*/}
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
