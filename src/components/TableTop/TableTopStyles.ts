import styled from 'styled-components';
import { ActiveCellProps, DirectionEnum } from '../../types';

// Styled component for Table container.
const Table = styled.table`
  margin: 0 auto;
`;

// Styled component for Table Cells.
const TableCell = styled.td`
  border: 1px solid black;
  height: 70px;
  width: 70px;
`;

/**
 * TableCellActive. 
 * 
 * Styled component for Active Table Cells (Where Robot is present).
 * This component uses faceDIrection prop to rotate the robot as per the direction selected.
 */
const TableCellActive = styled.td<ActiveCellProps>`
  border: 1px solid black;
  background: url(/robot.png) center no-repeat;

  ${(props): string | false =>
    props.faceDirection === DirectionEnum.East &&
    `
      transform: rotate(90deg);
    `};

  ${(props): string | false =>
    props.faceDirection === DirectionEnum.North &&
    `
    transform: rotate(360deg);
    `};

  ${(props): string | false =>
    props.faceDirection === DirectionEnum.South &&
    `
      transform: rotate(180deg);
    `};

  ${(props): string | false =>
    props.faceDirection === DirectionEnum.West &&
    `
      transform: rotate(270deg);
    `};
`;

export { Table, TableCell, TableCellActive };
