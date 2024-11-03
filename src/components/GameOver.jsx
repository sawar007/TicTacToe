export default function GameOver({ playerSymbol, onRestart }) {
	return (
		<div id='game-over'>
			<h2>Game Over!</h2>
			{playerSymbol && <p>{playerSymbol} won!</p>}
			{!playerSymbol && <p> It's a draw</p>}

			<p>
				<button onClick={onRestart}>Rematch!</button>
			</p>
		</div>
	);
}
