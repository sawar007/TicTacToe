import { useState } from 'react';

export default function Player({ name, symbol, isActive, handlePlayerName }) {
	const [playerName, setPlayerName] = useState(name);
	const [isEditing, setIsEditing] = useState(false);

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className='player'>
				{isEditing ? (
					<input
						type='text'
						required
						defaultValue={playerName}
						onChange={(event) => {
							setPlayerName(event.target.value);
						}}
					/>
				) : (
					<span className='player-name'>{playerName}</span>
				)}
				<span className='player-symbol'>{symbol}</span>
			</span>
			<button
				onClick={() => {
					setIsEditing((prev) => !prev);
					handlePlayerName(symbol, playerName);
				}}
			>
				{isEditing ? 'Save' : 'Edit'}
			</button>
		</li>
	);
}
