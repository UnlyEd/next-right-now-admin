import get from 'lodash.get';
import React from 'react';
import { Record } from '../../../utils/record';

const ColorField = (props: Props) => {
  const { record = {}, source } = props;

  return (
    <span>
      <div
        style={{
          backgroundColor: get(record, source),
          width: 15,
          height: 15,
          marginRight: 5,
          border: '1px solid rgba(0, 0, 0, .2)',
          display: 'inline-block',
        }}
      />
      {get(record, source)}
    </span>
  );
};

type Props = {
  source: string;
  record?: Record;
  label?: string;
}

export default ColorField;
