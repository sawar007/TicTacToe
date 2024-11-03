import { useState } from 'react';

export default function GameBoard({ onSelect, turns }) {
	return (
		<ol id='game-board'>
			{turns.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button onClick={() => onSelect(rowIndex, colIndex)} disabled={playerSymbol !== null}>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
