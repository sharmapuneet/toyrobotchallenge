import React from 'react';
import { render } from '@testing-library/react';
import type { TableStateType } from '../../types';
import { TableTop } from './TableTop';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (tableState: TableStateType): any => {
  return render(<TableTop tableState={tableState} />);
};

test('TableTop should not have any table cell', () => {
  const tableState: TableStateType = {
    gridSize: 0,
    robotIsPlaced: false,
  };

  const app = setup(tableState);
  expect(app.queryByTestId('tableCell')).not.toBeInTheDocument();
})

test('TableTop shouls have 5 table cells', () => {
  const tableState: TableStateType = {
    gridSize: 5,
    robotIsPlaced: false,
  };

  const app = setup(tableState);
  expect(app.getAllByTestId('tableCell')).toHaveLength(25);
})
