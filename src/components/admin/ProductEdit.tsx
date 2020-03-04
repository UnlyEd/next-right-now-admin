import React from 'react';
import { DateInput, Edit, SimpleForm, TextInput } from 'react-admin';

export const ProductEdit = (props): JSX.Element => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="status" />
        <DateInput source="updatedAt" />
        <DateInput source="createdAt" />
        <TextInput source="id" />
        {/*<ArrayInput source="images"><SimpleFormIterator><TextInput source="id" /></SimpleFormIterator></ArrayInput>*/}
        {/*<ReferenceArrayInput source="imagesIds" reference="images"><TextInput source="id" /></ReferenceArrayInput>*/}
        <TextInput source="customer.id" />
        <TextInput source="customer.id" />
        <TextInput source="price" />
        <TextInput source="title" />
        <TextInput source="description" />
      </SimpleForm>
    </Edit>
  );
};
