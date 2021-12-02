import { render, fireEvent } from "@testing-library/react";
import Game from "./Game";

it("renders game headings", () => {
  const { getByText } = render(<Game />);
  getByText("TIC-TAC-LIVEN");
});

it("renders board and check for step counter update", () => {
  const { getByText, getByTestId } = render(<Game />);

  // Expect "Current step: 0" to be found
  getByText("Current step: 0");

  const square0 = getByTestId(`square-0`);
  fireEvent.click(square0);

  // Expect "Current step: 1" to be found
  getByText("Current step: 1");
});

it("renders board and check if state changes on click in played square", () => {
  const { getByTestId } = render(<Game />);

  const square0 = getByTestId(`square-0`);
  // testes if content is X
  expect(square0.textContent).toEqual("X");
  fireEvent.click(square0);

  // testes if content is still X
  expect(square0.textContent).toEqual("X");
});

it("renders board and check if X can win", () => {
  const { getByText, getByTestId } = render(<Game />);

  // starting board
  // [
  //   X,_,_,
  //   _,_,_,
  //   _,_,_
  // ]

  // gameSequence
  // [
  //   X,_,_,
  //   O,X,_,
  //   O,_,X
  // ]

  const gameSequence = [3, 4, 6, 8];

  playGame(gameSequence, getByTestId);

  getByText("Winner: ❌");
});

it("renders board and check if restarts ", () => {
  const { getByText, getByTestId } = render(<Game />);

  const restart = getByTestId("restart");

  fireEvent.click(restart);

  getByText("Current step: 0");
});

it("renders board and check if player alternated after restart", () => {
  const { getByText } = render(<Game />);

  getByText("Next player: ⭕");
});

it("renders board and checks if O can win", () => {
  const { getByText, getByTestId } = render(<Game />);

  // starting board
  // [
  //   _,_,_,
  //   _,_,_,
  //   _,_,_
  // ]

  // gameSequence
  // [
  //   O,_,_,
  //   X,O,_,
  //   X,X,O
  // ]

  const gameSequence = [0, 6, 4, 7, 8];

  playGame(gameSequence, getByTestId);

  getByText("Winner: ⭕");

  // restarts board
  const restart = getByTestId(`restart`);
  fireEvent.click(restart);
  getByText("Current step: 0");
});

it("renders board and checks if game can end in draw", () => {
  const { getByText, getByTestId } = render(<Game />);

  // starting board
  // [
  //   _,_,_,
  //   _,_,_,
  //   _,_,_
  // ]

  // gameSequence
  // [
  //   O,X,O,
  //   O,X,X,
  //   X,O,O
  // ]

  const gameSequence = [4, 2, 6, 0, 1, 7, 5, 3, 8];

  playGame(gameSequence, getByTestId);

  getByText("Draw: Game over");
});

function playGame(sequence: Array<number>, getByTestId: Function) {
  for (let i = 0; i < sequence.length; i++) {
    // id of the square
    const id = sequence[i];
    // gets element of the square
    const htmlElement = getByTestId(`square-${id}`);
    // clicks element
    fireEvent.click(htmlElement);
  }
}
