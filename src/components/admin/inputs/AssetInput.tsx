/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import get from 'lodash.get';
import React from 'react';
import { useDataProvider, useInput } from 'react-admin';

import { Asset } from '../../../types/data/Asset';
import { FileStackResult } from '../../../types/fileStack/FileStackResult';
import { FileStackUploadedFile } from '../../../types/fileStack/FileStackUploadedFile';
import { Record } from '../../../utils/record';

/**
 * GraphCMS Asset input
 */
const AssetInput = (props: Props) => {
  const {
    assetSource,
    className,
    label,
    record,
  } = props;
  const FileStackAssetPicker = require('filestack-react').default;
  console.debug('AssetInput.props', props);
  const dataProvider = useDataProvider();
  const assetUrl = get(record, `${assetSource}.url`);
  const assetTitle = get(record, `${assetSource}.title`);
  const {
    input: { name, onChange },
    meta: { touched, error },
    isRequired,
  } = useInput({
    ...props,
    source: `${assetSource}.id`,
  });

  return (
    <div
      className={className}
      css={css`
        margin-bottom: 20px;
        max-width: 250px;

        .assetPicker-container {
          float: right;
        }
      `}
    >
      {label}<br />
      <img
        src={assetUrl}
        title={assetTitle}
        alt={assetTitle}
        width={'100%'}
      />

      <div className={'assetPicker-container'}>
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
              const res: any = await dataProvider.create('Asset', {
                data: {
                  handle: fileUploaded.handle,
                  fileName: fileUploaded.filename,
                  title: fileUploaded.filename,
                  size: fileUploaded.size,
                  mimeType: fileUploaded.mimeType || 'image/png', // TODO resolve proper mimeType
                  status: 'PUBLISHED',
                },
              });
              console.debug('res', res);
              const newAssetTmp: Asset = res.data;
              const newAsset: Asset = {
                ...get(record, assetSource),
                ...newAssetTmp,
              };
              // const newRecord: Asset = deepmerge(record, arrayToNestedObject(assetSource.split('.'), newAsset));
              console.debug('newAsset', newAsset);
              // console.debug('newRecord', record);
              onChange(newAsset.id);
            }
          }}
        />
      </div>
    </div>
  );
};

type Props = {
  assetSource: string;
  record?: Record;
  label?: string;
  className?: string;
}

export default AssetInput;
