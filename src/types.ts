export enum ActionEnum {
  Place = 'PLACE',
  Move = 'MOVE',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export interface CommandType {
  baseCommand: string
  faceDirection?: DirectionEnum
  fullString: string
  error: string | null
  xcoord?: number
  ycoord?: number
}

export enum DirectionEnum {
  East = 'EAST',
  North = 'NORTH',
  South = 'SOUTH',
  West = 'WEST',
}

export interface TableStateType {
  gridSize: number
  faceDirection?: DirectionEnum
  robotIsPlaced: boolean
  xcoord?: number
  ycoord?: number
}

export interface ActiveCellProps {
  faceDirection: DirectionEnum;
};
