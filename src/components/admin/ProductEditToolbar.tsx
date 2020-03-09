import React from 'react';
import { SaveButton, DeleteButton, Toolbar } from 'react-admin';

const ProductEditToolbar = (props) => {
  const { record } = props;
  console.log('ProductEditToolbar.props', props);
  return (
    <Toolbar {...props} style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <SaveButton />

      {
        record.status === 'DRAFT' && (
          <DeleteButton />
        )
      }
    </Toolbar>
  );
};

export default ProductEditToolbar;
