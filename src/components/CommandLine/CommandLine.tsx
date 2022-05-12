import React, { ReactElement, useState } from 'react';
import { ActionEnum, DirectionEnum } from '../../types';
import type { CommandType, TableStateType } from '../../types';
import { CommandLineInputHandler } from './CommandLineInputHandler';
import { CommandLineStyled } from './CommandLineStyles';

// Type definition for CommandLine props.
interface PropsType {
  onCommand: (newTableState: TableStateType) => void;
  tableState: TableStateType;
};

/**
 * CommandLine compoennt. 
 * 
 * This component is a wrapper for CommandLineInputHandler component and is 
 * responsible to take in commands from the user which then followed by robot.
 */
export const CommandLine = (props: PropsType): ReactElement => {
  const { onCommand, tableState } = props;
  const [error, setError] = useState<string | null>(null);

  // function to place a robot in the table.
  const placeRobot = (command: CommandType): void => {
    const { faceDirection, xcoord, ycoord } = command;

    let placeError = null;

    if (faceDirection === undefined || xcoord === undefined || ycoord === undefined) {
      placeError = 'Bad Command: expected 4 arguments';
    } else {
      if (xcoord < 0 || ycoord < 0 || xcoord >= tableState.gridSize || ycoord >= tableState.gridSize) {
        placeError = 'Bad Command: coordinates are off the table';
      };

      if (!Number.isInteger(xcoord) || !Number.isInteger(ycoord)) {
        placeError = 'Bad Command: X and Y coordinates must be integers';
      };

      const allowedDirections = Object.values(DirectionEnum) as string[];
      if (!faceDirection || !allowedDirections.includes(faceDirection)) {
        placeError = `Bad Command: direction must be one of ${Object.values(allowedDirections).join(', ')}`;
      };
    };

    setError(placeError);
    onCommand({
      ...tableState,
      faceDirection: !placeError ? (faceDirection as DirectionEnum) : tableState.faceDirection,
      robotIsPlaced: !placeError ? true : tableState.robotIsPlaced,
      xcoord: !placeError ? xcoord : tableState.xcoord,
      ycoord: !placeError ? ycoord : tableState.ycoord,
    });
  };

  // function to move the robot within the table.
  const moveRobot = (): void => {
    const { faceDirection, gridSize, robotIsPlaced, xcoord, ycoord } = tableState;
    let x = xcoord;
    let y = ycoord;

    if (!robotIsPlaced || x === undefined || y === undefined) {
      setError('Cannot move unplaced robot');
    } else {
      switch (faceDirection) {
        case DirectionEnum.East:
          x = x >= gridSize - 1 ? x : x + 1;
          break;
        case DirectionEnum.North:
          y = y >= gridSize - 1 ? y : y + 1
          break;
        case DirectionEnum.South:
          y = y === 0 ? y : y - 1;
          break;
        default:
          x = x === 0 ? x : x - 1;
      };
      setError(x === xcoord && y === ycoord ? 'Cannot move robot off the table' : null);
    };

    onCommand({
      ...tableState,
      xcoord: x,
      ycoord: y,
    });
  };

  // function to change the direction of robot.
  const turnRobot = (command: CommandType): void => {
    const { faceDirection, robotIsPlaced } = tableState;
    const { baseCommand } = command;
    let newDir = faceDirection;

    if (!robotIsPlaced || !faceDirection) {
      setError('Cannot turn unplaced robot');
    }
    switch (faceDirection) {
      case DirectionEnum.East:
        newDir = baseCommand === ActionEnum.Left ? DirectionEnum.North : DirectionEnum.South;
        break;
      case DirectionEnum.North:
        newDir = baseCommand === ActionEnum.Left ? DirectionEnum.West : DirectionEnum.East;
        break;
      case DirectionEnum.South:
        newDir = baseCommand === ActionEnum.Left ? DirectionEnum.East : DirectionEnum.West;
        break;
      default:
        newDir = baseCommand === ActionEnum.Left ? DirectionEnum.South : DirectionEnum.North;
    };

    onCommand({
      ...tableState,
      faceDirection: newDir,
    });
  };

  // function to handle the action commands - PLACE, MOVE, LEFT, RIGHT.
  const handleCommand = (command: CommandType): void => {
    const { baseCommand } = command;

    switch (baseCommand) {
      case ActionEnum.Place:
        placeRobot(command);
        break;
      case ActionEnum.Move:
        moveRobot();
        break;
      case ActionEnum.Left:
      case ActionEnum.Right:
        turnRobot(command);
        break;
      default:
        setError(`Bad command, Please use one of: ${Object.values(ActionEnum).join(', ')}`);
    };
  };

  return (
    <CommandLineStyled>
      <CommandLineInputHandler error={error} onCommand={handleCommand} />
    </CommandLineStyled>
  );
};
