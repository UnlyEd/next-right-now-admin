import React from 'react';
import { BulkDeleteButton } from 'react-admin';

const ProductBulkActionButtons = (props) => {
  const { record } = props;
  console.log('ProductBulkActionButtons.props', props);
  // XXX Do not allow to delete published content
  return (
    <>
      {/*<BulkDeleteButton {...props} />*/}
      Bulk delete has been disabled
    </>
  );
};

export default ProductBulkActionButtons;
