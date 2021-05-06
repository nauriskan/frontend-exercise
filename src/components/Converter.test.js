import React from 'react';
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Converter from './Converter';

describe('Converter component', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Converter />)
      
    expect(asFragment(<Converter />)).toMatchSnapshot()
  });

  it('should handle invalid character input', () => {
    render(<Converter />)

    const input = screen.getByTestId('input');
    const output = screen.getByTestId('output');
      
    userEvent.type(input, '!one');
    expect(output.textContent).toBe('-');
  });

  it('should handle empty input', () => {
    render(<Converter />)

    const input = screen.getByTestId('input');
    const output = screen.getByTestId('output');
      
    userEvent.type(input, '');
    expect(output.textContent).toBe('-');
  });

  it('should handle exceeded max number input', () => {
    render(<Converter />)

    const input = screen.getByTestId('input');
    const output = screen.getByTestId('output');
      
    userEvent.type(input, '1000000000');
    expect(output.textContent).toBe('-');
  });
});
