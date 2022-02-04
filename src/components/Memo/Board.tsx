import React from 'react'

/* UI */
import { Box } from '@/UI/Boxes/Box'
import {
  Board,
  Cell,
  Decorator1,
  Decorator2,
  Decorator3,
  Decorator4,
  DecoratorCenter,
} from '@/UI/Terminals/Terminal_1/Board'

/* Components */
import StandBy from '@/components/Miscellaneous/StandBy'
import Offline from '@/components/Miscellaneous/Offline'



/** 
 * Generate game board
 * */
const boardSize = 30 
const CellGen = () => {
  let components = []
  for (let i = 1; i < boardSize + 1; i++) {
    components = [
      ...components,
      <Cell key={i} data-attr={i}>
        <DecoratorCenter>+</DecoratorCenter>
        <Decorator1>+</Decorator1>
        <Decorator2>+</Decorator2>
        <Decorator3>+</Decorator3>
        <Decorator4>+</Decorator4>
      </Cell>,
    ]
  }
  return components
}


export default function GameBoard({ dialogueStatus, gameStatus, level }) {

  return (
    <Box blur={dialogueStatus} mt={20}>
      <Board>
        {gameStatus === 'offline' ? <Offline /> : null}
        {gameStatus === 'stand by' ? <StandBy /> : null}
        {CellGen().map((el) => el)}
      </Board>
    </Box>
  )
}
