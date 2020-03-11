import React from 'react';
import { Edit, SimpleForm, TextField, TextInput } from 'react-admin';
import CustomerEditToolbar from './CustomerEditToolbar';

const CustomerEdit = (props): JSX.Element => {
  // Not SSR compatible
  const RichTextInput = require('ra-input-rich-text');

  console.log('customerEdit props', props);
  return (
    <Edit {...props}>
      <SimpleForm
        toolbar={<CustomerEditToolbar />}
        redirect={false}
      >
        <TextField source="ref" label={'Reference (#)'} />
        <TextInput source="labelEN" label={'Label (EN)'} />
        <TextInput source="labelFR" label={'Label (FR)'} />
        {/* XXX See https://github.com/marmelab/react-admin/issues/4512 */}
        {/*<RichTextInput source="termsEN.html" label={'Terms (EN)'} />*/}
        {/*<TextInput source="termsEN.html" label={'Terms (EN)'} />*/}
        {/*<TextInput source="termsFR.html" label={'Terms (FR)'} />*/}
      </SimpleForm>
    </Edit>
  );
};

export default CustomerEdit;
