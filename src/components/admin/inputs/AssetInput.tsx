/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import get from 'lodash.get';
import React, { useState } from 'react';
import { useDataProvider, useInput } from 'react-admin';

import { Asset } from '../../../types/data/Asset';
import { FileStackResult } from '../../../types/fileStack/FileStackResult';
import { FileStackUploadedFile } from '../../../types/fileStack/FileStackUploadedFile';
import { Record } from '../../../utils/record';

/**
 * GraphCMS Asset input
 */
const AssetInput = (props: Props) => {
  console.debug('AssetInput.props', props);
  const {
    source,
    className,
    label,
    record,
  } = props;
  const value: Asset = get(record, source);

  if (!get(value, 'id') || !get(value, 'url')) {
    throw new Error(`[AssetInput] The "source" prop must be a string that points towards the asset object but no "id" and/or "url" field could be found. (ex: use "theme.logo", but NOT "theme.logo.id")`);
  }

  const FileStackAssetPicker = require('filestack-react').default;
  const dataProvider = useDataProvider();
  const assetUrl = get(record, `${source}.url`);
  const assetTitle = get(record, `${source}.title`);
  const {
    input: { name, onChange },
    meta: { touched, error },
    isRequired,
  } = useInput({
    ...props,
    source: `${source}.id`,
  });
  const [newUploadedAsset, setNewUploadedAsset]: [Asset, Function] = useState(null); // Displayed instead of the record asset once uploaded

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
      {
        newUploadedAsset ? (
          <img
            src={newUploadedAsset.url}
            title={newUploadedAsset.title}
            alt={newUploadedAsset.title}
            width={'100%'}
          />
        ) : (
          <img
            src={assetUrl}
            title={assetTitle}
            alt={assetTitle}
            width={'100%'}
          />
        )
      }

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
                ...get(record, source),
                ...newAssetTmp,
              };
              // const newRecord: Asset = deepmerge(record, arrayToNestedObject(source.split('.'), newAsset));
              console.debug('newAsset', newAsset);
              // console.debug('newRecord', record);
              onChange(newAsset.id);
              setNewUploadedAsset(newAsset);
            }
          }}
        />
      </div>
    </div>
  );
};

type Props = {
  source: string;
  record?: Record;
  label?: string;
  className?: string;
}

export default AssetInput;
