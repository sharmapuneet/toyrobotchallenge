import React, { useState } from 'react'
import { CommandLine } from './components/CommandLine/CommandLine'
import { TableTop } from './components/TableTop/TableTop'
import type { TableStateType } from './types'

const App: React.FC = () => {
  const initialState: TableStateType = {
    gridSize: 5,
    robotIsPlaced: false,
  }
  const [tableState, setTableState] = useState(initialState)

  const processCommand = (newTableState: TableStateType): void => {
    setTableState(newTableState)
  }

  return (
    <>
      <TableTop tableState={tableState} />
      <CommandLine onCommand={processCommand} tableState={tableState} />
    </>
  )
}

export default App
