import React from 'react';
import { DeleteButton, SaveButton, Toolbar } from 'react-admin';

const ProductEditToolbar = (props) => {
  const { record } = props;
  console.log('ProductEditToolbar.props', props);
  return (
    <Toolbar {...props} style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      {
        record.status === 'PUBLISHED' && (
          <div>
            <a href={'https://nrn-customer1.now.sh/'}>Published content</a> has been restricted (because we use them to showcase <a href={'https://github.com/UnlyEd/next-right-now'}>NRN</a>) - Create your own post to play around with it
          </div>
        )
      }
      {
        record.status === 'DRAFT' && (
          <>
            <SaveButton />

            <DeleteButton />
          </>
        )
      }
    </Toolbar>
  );
};

export default ProductEditToolbar;
