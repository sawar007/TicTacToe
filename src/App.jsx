import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import { winning_combination } from './WINNING_COMBINATION';
import GameOver from './components/GameOver';

function getDerivedActivePlayer(turn) {
	let currentPlayer = 'X';
	if (turn.length > 0 && turn[0].player === 'X') {
		currentPlayer = 'O';
	}
	return currentPlayer;
}
const initialGameBoard = [
	[null, null, null],

	[null, null, null],

	[null, null, null],
];

function App() {
	const [currentSetPlayer, setCurrentSetPlayer] = useState({ X: 'Player 1', O: 'Player 2' });
	const [currentTurn, setCurrentTurn] = useState([]);
	const derivedActivePlayer = getDerivedActivePlayer(currentTurn);

	let gameBoard = [...initialGameBoard.map((item) => [...item])];
	for (const turn of currentTurn) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}
	let winnerSymbol;
	winnerSymbol = computeWinningCombination(gameBoard);
	const hasDraw = currentTurn.length === 9 && !winnerSymbol;

	function handleSelectActivePlayer(rowIndex, colIndex) {
		setCurrentTurn((prevTurn) => {
			const currentPlayer = getDerivedActivePlayer(prevTurn);
			const updatedTurn = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurn];
			return updatedTurn;
		});
	}
	function handleRestart() {
		setCurrentTurn([]);
	}
	function setCurretPlayer(symbol, newName) {
		setCurrentSetPlayer((prevPlayers) => {
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	}

	function computeWinningCombination(gameBoard) {
		for (const combination of winning_combination) {
			console.log(combination[0].row);
			console.log(gameBoard);
			const firstSelection = gameBoard[combination[0].row][combination[0].col];
			const secondSelection = gameBoard[combination[1].row][combination[1].col];
			const thirdSelection = gameBoard[combination[2].row][combination[2].col];
			if (firstSelection && firstSelection === secondSelection && firstSelection === thirdSelection) {
				return currentSetPlayer[firstSelection];
			}
		}
	}
	return (
		<main>
			<div id='game-container'>
				<ol id='players' className='highlight-player'>
					<Player
						name='Player 1'
						symbol='X'
						isActive={derivedActivePlayer === 'X'}
						setPlayerName={setCurretPlayer}
						handlePlayerName={setCurretPlayer}
					></Player>
					<Player
						name='Player 2'
						symbol='O'
						isActive={derivedActivePlayer === 'O'}
						handlePlayerName={setCurretPlayer}
					></Player>
					{(winnerSymbol || hasDraw) && <GameOver playerSymbol={winnerSymbol} onRestart={handleRestart}></GameOver>}
				</ol>
				<GameBoard onSelect={handleSelectActivePlayer} turns={gameBoard}></GameBoard>
			</div>
		</main>
	);
}

export default App;
