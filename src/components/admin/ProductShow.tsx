import React from 'react';
import { ImageField, NumberField, Show, ShowController, SimpleShowLayout, TextField } from 'react-admin';
import { ShowControllerProps } from '../../types/admin/ShowControllerProps';
import { ShowProps } from '../../types/admin/ShowProps';
import { Product } from '../../types/data/Product';

const ProductShow = (props: ShowProps): JSX.Element => {
  console.debug('ProductShow.props', props);
  return (
    <ShowController {...props}>
      {(controllerProps: ShowControllerProps) => {
        const { record, loading }: ShowControllerProps & { record: Product } = controllerProps;

        if (!loading) {
          console.debug('productShow.controllerProps:', controllerProps, 'record:', record);
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
