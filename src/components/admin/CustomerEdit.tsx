import React from 'react';
import { Edit, EditController, SimpleForm, TextField, TextInput } from 'react-admin';
import { EditControllerProps } from '../../types/admin/EditControllerProps';
import { EditProps } from '../../types/admin/EditProps';
import { Customer } from '../../types/data/Customer';
import CustomerEditToolbar from './CustomerEditToolbar';
import AssetInput from './inputs/AssetInput';
import ColorInput from './inputs/ColorInput';

const CustomerEdit = (props: EditProps): JSX.Element => {
  console.debug('CustomerEdit.props', props);
  // Not SSR compatible
  // const RichTextInput = require('ra-input-rich-text');

  return (
    <EditController {...props}>
      {(controllerProps: EditControllerProps) => {
        const { record, loading }: EditControllerProps & { record: Customer } = controllerProps;

        if (!loading) {
          console.debug('customerEdit.controllerProps:', controllerProps, 'record:', record);
          return (
            <Edit
              {...props}
              {...controllerProps}
              undoable={false}
            >
              <SimpleForm
                toolbar={<CustomerEditToolbar />}
                redirect={false}
              >
                <TextField source="ref" label={'Reference (#)'} />
                <TextInput source="labelEN" label={'Label (EN)'} />
                <TextInput source="labelFR" label={'Label (FR)'} />
                <AssetInput source={'theme.logo'} />
                <ColorInput source="theme.primaryColor" label={'Color'} />
                {/* XXX See https://github.com/marmelab/react-admin/issues/4512 */}
                {/*<RichTextInput source="termsEN.html" label={'Terms (EN)'} />*/}
                {/*<TextInput source="termsEN.html" label={'Terms (EN)'} />*/}
                {/*<TextInput source="termsFR.html" label={'Terms (FR)'} />*/}
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

export default CustomerEdit;
