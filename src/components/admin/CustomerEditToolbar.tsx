import React from 'react';
import { SaveButton, Toolbar } from 'react-admin';

const CustomerEditToolbar = (props) => {
  console.debug('CustomerEditToolbar.props', props);
  return (
    <Toolbar {...props} style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <SaveButton />
    </Toolbar>
  );
};

export default CustomerEditToolbar;
