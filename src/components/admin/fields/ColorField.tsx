import get from 'lodash.get';
import React from 'react';
import { Record } from '../../../utils/record';

const ColorField = (props: Props) => {
  const { record = {}, source } = props;

  return (
    <span>
      {get(record, source)}
      <div
        style={{
          backgroundColor: get(record, source),
          width: 15,
          height: 15,
          marginLeft: 5,
          border: '1px solid rgba(0, 0, 0, .2)',
          display: 'inline-block',
        }}
      />
    </span>
  );
};

type Props = {
  source: string;
  record?: Record;
  label?: string;
}

export default ColorField;
