/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import get from 'lodash.get';
import React, { useState } from 'react';
import { useInput } from 'react-admin';
import * as ReactColor from 'react-color';
import { ColorResult } from 'react-color';

import { Record } from '../../../utils/record';
import ColorField from '../fields/ColorField';

const ColorInput = (props: Props) => {
  const {
    label,
    source,
    options,
    picker = 'Twitter',
    record,
  } = props;
  const Picker = ReactColor[`${picker}Picker`];
  console.debug('ColorInput - record', record);

  const {
    input: { name, onChange },
    meta: { touched, error },
    isRequired,
  } = useInput(props);
  const [show, setShow]: [boolean, Function] = useState(false);

  return (
    <div>
      <div
        onClick={() => setShow(!show)}
      >
        <ColorField
          source={source}
          record={record}
        />
        {label}
      </div>
      {
        show ? (
          <div
            css={css`
              position: absolute;
              z-index: 2;
            `}
          >
            <div
              css={css`
                  position: fixed;
                  top: 0; bottom: 0;
                  left: 0; right: 0;
                `}
            />
            <Picker
              {...options}
              color={get(record, source)}
              onChange={(color: ColorResult) => {
                const { hex } = color;

                onChange(hex);
                setShow(false);
                record[source] = hex;
              }}
            />
          </div>
        ) : null
      }
    </div>
  );
};

type Props = {
  source: string;
  record?: Record;
  label?: string;
  options?: any; // Object, pickerOptions
  picker?: string;
}

export default ColorInput;
