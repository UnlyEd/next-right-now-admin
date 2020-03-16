/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useDataProvider } from 'react-admin';

import { FileStackResult } from '../../../types/fileStack/FileStackResult';
import { FileStackUploadedFile } from '../../../types/fileStack/FileStackUploadedFile';
import { Record } from '../../../utils/record';

const AssetInput = (props: Props) => {
  const {
    label,
    source,
    record,
  } = props;
  const FileStackAssetPicker = require('filestack-react').default;
  console.debug('AssetInput.props', props);
  const dataProvider = useDataProvider();

  return (
    <div>
      {label}
      <FileStackAssetPicker
        apikey={process.env.FILESTACK_API_KEY}
        // actionOptions={PickerOptions}
        // componentDisplayMode={{
        //   type: 'button',
        //   customText: 'Click here to open picker',
        //   customClass: 'some-custom-class',
        // }}
        onSuccess={async (result: FileStackResult) => {
          const { filesUploaded } = result;
          console.log('filesUploaded', filesUploaded);
          const fileUploaded: FileStackUploadedFile = filesUploaded[0];
          console.log('fileUploaded', fileUploaded);

          if (fileUploaded) {
            console.log('dataProvider', dataProvider);
            const res: any = await dataProvider.create('Asset', {
              data: {
                handle: fileUploaded.handle,
                fileName: fileUploaded.filename,
                title: fileUploaded.filename,
                size: fileUploaded.size,
                mimeType: fileUploaded.mimeType || 'image/png', // TODO
                status: 'PUBLISHED',
              },
            });
            console.debug('res', res);
          }
        }}
      />
    </div>
  );
};

type Props = {
  source: string;
  record?: Record;
  label?: string;
}

export default AssetInput;
