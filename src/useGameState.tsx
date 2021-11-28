/**
 * Obs: O controle de estado principal da aplicação deve ser mantido neste hook
 */

import { useState } from "react";

type Player = 'X' | 'O'

let nextPlayer: Player = 'X';
let currentBoard = Array(9).fill(null);
const useGameState = () => {
  const [stepNumber, setStepNumber] = useState(0);

  // Nome do parâmetro trocado de nextPlayer para playerMove
  const computeMove = (playerMove: Player, squareId: any) => {

    // Adiciona a jogada do jogador no quadrado do tabuleiro
    currentBoard[squareId] = playerMove;

    if (playerMove === 'X') {
      nextPlayer = 'O'
    } else {
      nextPlayer = 'X'
    }
    setStepNumber((currentStepNumber) => currentStepNumber + 1);
  }

  return {
    nextPlayer,
    stepNumber,
    currentBoard,
    computeMove
  }
}

export default useGameState;
