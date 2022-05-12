import React, { ReactElement, ChangeEvent, KeyboardEvent, useState } from 'react';
import {
  CommandLineButtonStyled,
  CommandLineErrorStyled,
  CommandLineInputStyled,
  CommandLineLabelStyled,
} from './CommandLineStyles';
import type { CommandType } from '../../types';

// Prop type defination for the input handler.
interface PropsType {
  error: string | null;
  onCommand: (command: CommandType) => void;
}

/**
 * CommandLineInputHandler component. 
 * 
 * This component renders the input field, error message and submit button.
 */
export const CommandLineInputHandler = (props: PropsType): ReactElement => {
  const { error, onCommand } = props;
  const [command, setCommand] = useState<string>('');

  // This function creates the executable command and executes once
  // the enter is pressed from keyboard or enter button is clicked.
  const issueCommand = (): void => {
    const [baseCommand, xcoord, ycoord, faceDirection] = command.trim().toUpperCase().split(/[ ,]+/);

    const parsedCommand = {
      baseCommand,
      error: null,
      faceDirection: faceDirection || undefined,
      fullString: command,
      xcoord: xcoord ? parseInt(xcoord, 10) : undefined,
      ycoord: ycoord ? parseInt(ycoord, 10) : undefined,
    } as CommandType;

    onCommand(parsedCommand);
    setCommand('');
  }

  // This function executes when the enter is pressed from keyboard.
  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      issueCommand();
    };
  };

  // This function updates the command and send for execution.
  const updateCommand = (event: ChangeEvent<HTMLInputElement>): void => {
    setCommand(event.target.value);
  };

  return (
    <>
      <CommandLineLabelStyled htmlFor="command-input">
        <p>Please type your commands here:</p>
        <CommandLineInputStyled
          aria-label="command-input"
          id="command-input"
          onChange={updateCommand}
          onKeyPress={handleEnterPress}
          placeholder="Ex - PLACE 1 1 NORTH"
          type="text"
          value={command}
        />
      </CommandLineLabelStyled>
      {error && <CommandLineErrorStyled aria-label="error-message">{error}</CommandLineErrorStyled>}
      <CommandLineButtonStyled type="button" onClick={issueCommand}>
        Enter
      </CommandLineButtonStyled>
    </>
  );
};
