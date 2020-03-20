import React from 'react';
import { BulkDeleteButton } from 'react-admin';

const ProductBulkActionButtons = (props) => {
  console.debug('ProductBulkActionButtons.props', props);
  const { record } = props;
  // XXX Do not allow to delete published content
  return (
    <>
      {/*<BulkDeleteButton {...props} />*/}
      Bulk delete has been disabled
    </>
  );
};

export default ProductBulkActionButtons;
