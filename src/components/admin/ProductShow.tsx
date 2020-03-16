import React from 'react';
import { ImageField, NumberField, Show, ShowController, TextField, SimpleShowLayout } from 'react-admin';

const ProductShow = (props): JSX.Element => {
  console.debug('productShow.props', props);
  return (
    <ShowController {...props}>
      {(controllerProps) => {
        const { record, loading } = controllerProps;

        if (!loading) {
          console.debug('productShow.controllerProps', controllerProps, record);
          return (
            <Show {...props}>
              <SimpleShowLayout>
                <ImageField source="images" src="url" title="Image" />
                <TextField source="titleEN" label={'Title (EN)'} />
                <TextField source="titleFR" label={'Title (FR)'} />
                <TextField source="descriptionEN" label={'Description (EN)'} multiline={true} />
                <TextField source="descriptionFR" label={'Description (FR)'} multiline={true} />
                <NumberField source="price" />
              </SimpleShowLayout>
            </Show>
          );
        } else {
          return null;
        }
      }}
    </ShowController>
  );
};

export default ProductShow;
