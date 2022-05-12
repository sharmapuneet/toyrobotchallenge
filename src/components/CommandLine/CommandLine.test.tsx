import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ActionEnum, DirectionEnum } from '../../types';
import type { TableStateType } from '../../types';
import { CommandLine } from './CommandLine';

const setup = (tableState: TableStateType): any => {
  const mock = jest.fn();
  const utils = render(<CommandLine onCommand={mock} tableState={tableState} />);
  const input = utils.getByLabelText('command-input');
  return {
    input,
    ...utils,
  };
};

test('Should not allow a command not in the Enum list', () => {
  const tableState: TableStateType = {
    gridSize: 5,
    robotIsPlaced: false,
  };

  const allowedCommands = Object.values(ActionEnum) as string[];

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'COMMANDO' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText(`Bad command, Please use one of: ${Object.values(allowedCommands).join(', ')}`)).toBeInTheDocument();
})

test('Should not allow PLACE unless 4 arguments are in the command', () => {
  const tableState: TableStateType = {
    gridSize: 5,
    robotIsPlaced: false,
  };

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'PLACE 1 1' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Bad Command: expected 4 arguments')).toBeInTheDocument();
})

test('Should not allow bad X coordinate with PLACE', () => {
  const tableState: TableStateType = {
    gridSize: 5,
    robotIsPlaced: false,
  };

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'PLACE X 0 NORTH' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Bad Command: X and Y coordinates must be integers')).toBeInTheDocument();
})

test('Should not allow bad Y coordinate with PLACE', () => {
  const tableState: TableStateType = {
    gridSize: 5,
    robotIsPlaced: false,
  };

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'PLACE 0 X NORTH' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Bad Command: X and Y coordinates must be integers')).toBeInTheDocument();
})

test('Should not allow invalid direction facing with PLACE', () => {
  const tableState: TableStateType = {
    gridSize: 5,
    robotIsPlaced: false,
  };

  const allowedDirections = Object.values(DirectionEnum) as string[];

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'PLACE 0 0 NORF' } });
  fireEvent.click(getByText('Enter'));
  expect(
    getByText(`Bad Command: direction must be one of ${Object.values(allowedDirections).join(', ')}`)
  ).toBeInTheDocument();
})

test('Should not allow robot PLACE off the table', () => {
  const tableState: TableStateType = {
    gridSize: 5,
    robotIsPlaced: false,
  };

  const { getByText, input } = setup(tableState)
  fireEvent.change(input, { target: { value: 'PLACE 2 7 EAST' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Bad Command: coordinates are off the table')).toBeInTheDocument()
});

// MOVE
test('No Robot on the Table shouldnt move', () => {
  const tableState: TableStateType = {
    faceDirection: DirectionEnum.South,
    gridSize: 5,
    robotIsPlaced: false,
    xcoord: 0,
    ycoord: 0,
  };

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'MOVE' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Cannot move unplaced robot')).toBeInTheDocument()
});

test('South Facing Robot at Y coord 0 should not move', () => {
  const tableState: TableStateType = {
    faceDirection: DirectionEnum.South,
    gridSize: 5,
    robotIsPlaced: true,
    xcoord: 0,
    ycoord: 0,
  };

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'MOVE' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Cannot move robot off the table')).toBeInTheDocument();
})

test('North Facing Robot at Y coord gridSize - 1 should not move', () => {
  const tableState: TableStateType = {
    faceDirection: DirectionEnum.North,
    gridSize: 5,
    robotIsPlaced: true,
    xcoord: 0,
    ycoord: 4,
  };

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'MOVE' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Cannot move robot off the table')).toBeInTheDocument();
})

test('East Facing Robot at X coord gridSize - 1 should not move', () => {
  const tableState: TableStateType = {
    faceDirection: DirectionEnum.East,
    gridSize: 5,
    robotIsPlaced: true,
    xcoord: 4,
    ycoord: 2,
  };

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'MOVE' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Cannot move robot off the table')).toBeInTheDocument();
})

test('West Facing Robot at X coord 0 should not move', () => {
  const tableState: TableStateType = {
    faceDirection: DirectionEnum.West,
    gridSize: 5,
    robotIsPlaced: true,
    xcoord: 0,
    ycoord: 2,
  };

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'MOVE' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Cannot move robot off the table')).toBeInTheDocument();
})

// LEFT and RIGHT
test('Should not allow unplaced robot to turn LEFT', () => {
  const tableState: TableStateType = {
    faceDirection: DirectionEnum.West,
    gridSize: 5,
    robotIsPlaced: false,
    xcoord: 2,
    ycoord: 2,
  };

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'LEFT' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Cannot turn unplaced robot')).toBeInTheDocument();
})

test('Should not allow unplaced robot to turn RIGHT', () => {
  const tableState: TableStateType = {
    faceDirection: DirectionEnum.West,
    gridSize: 5,
    robotIsPlaced: false,
    xcoord: 2,
    ycoord: 2,
  };

  const { getByText, input } = setup(tableState);
  fireEvent.change(input, { target: { value: 'RIGHT' } });
  fireEvent.click(getByText('Enter'));
  expect(getByText('Cannot turn unplaced robot')).toBeInTheDocument();
})
