import { useEffect, useState } from 'react';
import TableItem from './TableItem';
import './App.css';

const SIZE = 8;

function App() {

	const [score, setScore] = useState(SIZE * SIZE);
	const [isWon, setWon] = useState(false);
	const [isGameOver, setGameOver] = useState(false);
	const [diamondPositions, setDiamondPositions] = useState([]);

	useEffect(() => {
		const getDiamondPositions = () => {
			const positions = [];
			while (positions.length < SIZE) {
				const row = Math.floor(Math.random() * SIZE);
				const col = Math.floor(Math.random() * SIZE);
				if (positions.findIndex(item => item.row === row && item.col === col) === -1)
					positions.push({ row, col, visible: false });
			}
			return positions;
		}
		setDiamondPositions(getDiamondPositions());
	}, []);

	function getRows() {
		let rows = [];
		for (let index = 0; index < SIZE; index++) {
			rows.push(getRowItems(index));
		}
		return rows;
	}

	function getRowItems(rowIndex) {
		let rowItems = [];
		for (let colIndex = 0; colIndex < SIZE; colIndex++) {
			rowItems.push(<TableItem
				key={`${rowIndex}${colIndex}`}
				row={rowIndex}
				col={colIndex}
				getDirection={(row, col) => getDirection(row, col)}
				isDiamond={(row, col) => isDiamond(row, col)}
				showDiamond={(row, col) => showDiamond(row, col)}
				decrementScore={decrementScore}
			/>);
		}
		return rowItems;
	}

	function getDirection(row, col) {
		let nearestDiamond,
			minRows = SIZE,
			minCols = SIZE;
		diamondPositions.forEach(diamond => {
			if ((diamond.row - row + diamond.col - col) < (minRows + minCols)) {
				minRows = Math.abs(diamond.row - row);
				minCols = Math.abs(diamond.col - col);
				nearestDiamond = diamond;
			}
		});
		if ((nearestDiamond.row - row) < (nearestDiamond.col - col) || nearestDiamond.row === row) {
			return nearestDiamond.col > col ? 'right' : 'left';
		} else {
			return nearestDiamond.row > row ? 'down' : 'up';
		}
	}

	function decrementScore() {
		setScore(score - 1 === 0 ? 0 : score - 1);
		setGameOver(score - 1 === 0);
	}

	function getDiamondIndex(row, col) {
		return diamondPositions.findIndex(position => position.row === row && position.col === col);
	}

	function isDiamond(row, col) {
		return getDiamondIndex(row, col) > -1;
	}

	function remainingDiamonds() {
		return diamondPositions.filter(diamond => !diamond.visible).length;
	}

	function showDiamond(row, col) {
		const temp = [...diamondPositions];
		temp[getDiamondIndex(row, col)].visible = true;
		setDiamondPositions(temp);
		if (!remainingDiamonds()) {
			setWon(true);
			const prev = localStorage.getItem('highScore') || 0;
			if (prev < score) localStorage.setItem('highScore', score);
		}
	}

	function playAgain() {
		window.location.reload();
	}

	function renderGame() {
		return <>
			<div className="score-board">
				<p>Highscore: {localStorage.getItem('highScore') || 0}</p>
				<p>Diamonds Left: {remainingDiamonds() || SIZE}</p>
				<p>Your Score: {score}</p>
			</div>
			<div className="game-board">{getRows()}</div>
		</>
	}

	function renderResult() {
		return <div className='game-over'>
			<div className="game-over-text">
				{isGameOver ? 'Game Over' : 'Congratulations! You have found all the diamonds.'}
			</div>
			<p>Highscore: {localStorage.getItem('highScore') || 0}</p>
			<p className="score">Your Score: {score}</p>
			<button onClick={playAgain}>Play Again</button>
		</div>
	}

	return (
		<>
			<h1>Diamond Explorer</h1>
			<p>Find all the diamonds behind the tiles in the lowest moves possible</p>
			<div>{isGameOver || isWon ? renderResult() : renderGame()}</div>
		</>
	);
}

export default App;
