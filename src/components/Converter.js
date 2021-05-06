import React, { useState } from 'react';
import Convert from '../lib/convert'

const Converter = () => {
  const [output, setOutput] = useState('-');

  const validator = (input) => {
    if (/^\d+$/.test(input)) {
      const num = parseInt(input)

      if (num > 999999999 || num < 0) {
        setOutput('-');
      } else {
        setOutput(Convert.numToText(input));
      }
    } else if (/^[a-zA-Z ]*$/.test(input) && input.length > 0) {
      setOutput(Convert.textToNum(input));
    } else {
      setOutput('-');
    }
  };
  
  const onChange = (e) => {
    const { value } = e.target;

    validator(value);
  };

  return (
    <div>
      <input
        data-testid="input"
        type='text'
        onChange={onChange}
        style={{ width: '600px' }} />
      <div>
        <p>
            Output: <span data-testid="output">{output}</span>
        </p>
      </div>
    </div>
  )
};

export default Converter;
