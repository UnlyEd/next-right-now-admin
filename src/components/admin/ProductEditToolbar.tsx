import React from 'react';
import { DeleteButton, SaveButton, Toolbar } from 'react-admin';

const ProductEditToolbar = (props) => {
  console.debug('ProductEditToolbar.props', props);
  const { record } = props;
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
            <a href={'https://nrn-customer1.now.sh/'} target={'_blank'}>Published content</a> has been restricted (because we use them to showcase <a href={'https://github.com/UnlyEd/next-right-now'} target={'_blank'}>NRN</a>) - Create your own products to play around with it
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
