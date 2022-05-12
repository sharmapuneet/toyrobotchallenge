import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Please type your commands here:/i);
  expect(linkElement).toBeInTheDocument();
});

test('Place the robot on table', () => {
  const app = render(<App />);
  const input = app.getByLabelText('command-input');

  fireEvent.change(input, { target: { value: 'PLACE 0 0 NORTH' } });
  fireEvent.click(app.getByText('Enter'));
  expect(app.getByTestId('activeCell')).toBeInTheDocument();
});

test('Move the robot on table 1 step towards North', () => {
  const app = render(<App />);
  const input = app.getByLabelText('command-input');

  fireEvent.change(input, { target: { value: 'PLACE 0 0 NORTH' } });
  fireEvent.click(app.getByText('Enter'));

  expect(app.getAllByRole('cell')[20]).toHaveAttribute('data-testid', 'activeCell');

  fireEvent.change(input, { target: { value: 'MOVE' } });
  fireEvent.click(app.getByText('Enter'));

  expect(app.getAllByRole('cell')[15]).toHaveAttribute('data-testid', 'activeCell');
});

test('Move the robot on table 1 step towards North then 1 step towards East', () => {
  const app = render(<App />);
  const input = app.getByLabelText('command-input');

  fireEvent.change(input, { target: { value: 'PLACE 0 0 NORTH' } });
  fireEvent.click(app.getByText('Enter'));

  expect(app.getAllByRole('cell')[20]).toHaveAttribute('data-testid', 'activeCell');

  fireEvent.change(input, { target: { value: 'MOVE' } });
  fireEvent.click(app.getByText('Enter'));

  expect(app.getAllByRole('cell')[15]).toHaveAttribute('data-testid', 'activeCell');

  fireEvent.change(input, { target: { value: 'RIGHT' } });
  fireEvent.click(app.getByText('Enter'));

  expect(app.getAllByRole('cell')[15]).toHaveAttribute('data-testid', 'activeCell');

  fireEvent.change(input, { target: { value: 'MOVE' } });
  fireEvent.click(app.getByText('Enter'));

  expect(app.getAllByRole('cell')[16]).toHaveAttribute('data-testid', 'activeCell');
});
