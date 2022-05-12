import React, { ReactElement } from 'react';
import { Table, TableCell, TableCellActive } from './TableTopStyles';
import type { TableStateType } from '../../types';

/**
 * function getColumnCells. 
 * 
 * This function creates the active table cells and other table cells
 * based on the coordinates.
 */
const getColumnCells = (rowNumber: number, tableState: TableStateType): ReactElement[] => {
  const { faceDirection, gridSize, robotIsPlaced, xcoord, ycoord } = tableState;
  const cells = [];

  for (let i = 0; i < gridSize; i++) {
    if (i === xcoord && rowNumber === ycoord && robotIsPlaced && faceDirection) {
      cells.push(<TableCellActive faceDirection={faceDirection} key={`col${rowNumber}${i}`} data-testid="activeCell" />)
    } else {
      cells.push(<TableCell key={`col${rowNumber}${i}`} data-testid="tableCell" />)
    };
  };

  return cells;
}

/**
 * function getTableRows. 
 * 
 * This function creates the table rows as per the grid size.
 */
const getTableRows = (tableState: TableStateType): ReactElement[] => {
  const { gridSize } = tableState;
  const rows = [];

  for (let i = gridSize - 1; i >= 0; i--) {
    rows.push(<tr key={`row ${i}`}>{getColumnCells(i, tableState)}</tr>);
  };

  return rows;
}

/**
 * TableTop compoennt. 
 * 
 * This component is used to render a table with x*x units grid.
 */
export const TableTop = (props: { tableState: TableStateType }): ReactElement => {
  const {
    tableState
  } = props;

  return (
    <Table>
      <tbody>{getTableRows(tableState)}</tbody>
    </Table>
  );
};
