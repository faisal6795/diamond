import { useEffect, useState } from 'react';
import TableItem from './TableItem/TableItem';
import { Container, GameBoard, Score, ScoreBoard } from './App.styles';

const SIZE = 8;

function App() {

	const [score, setScore] = useState(SIZE * SIZE);
	const [isWon, setWon] = useState(false);
	const [isGameOver, setGameOver] = useState(false);
	const [diamondPositions, setDiamondPositions] = useState([]);
	const descriptionText = 'Find all the diamonds behind the tiles in the lowest moves possible';
	const winText = 'Congratulations! You have found all the diamonds.';
	const gameOverText = 'Game Over!';

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
		const nearestDiamond = getNearestDiamond(row, col);
		if (nearestDiamond.row === row) {
			return nearestDiamond.col > col ? 'right' : 'left';
		} else if (nearestDiamond.col === col) {
			return nearestDiamond.row > row ? 'down' : 'up';
		} else if (nearestDiamond.row > row) {
			return nearestDiamond.col > col ? 'bottom-right' : 'bottom-left';
		} else if (nearestDiamond.row < row) {
			return nearestDiamond.col > col ? 'top-right' : 'top-left';
		}
	}

	function getNearestDiamond(row, col) {
		let nearestDiamond,
			minRows = SIZE,
			minCols = SIZE;
		diamondPositions.forEach(diamond => {
			if ((Math.abs(diamond.row - row) + Math.abs(diamond.col - col)) < (minRows + minCols)) {
				minRows = Math.abs(diamond.row - row);
				minCols = Math.abs(diamond.col - col);
				nearestDiamond = diamond;
			}
		});
		return nearestDiamond;
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
			if (getHighscore() < score) setHighscore(score);
		}
	}

	function isWonOrLost() {
		return isWon || isGameOver;
	}

	function getHighscore() {
		return localStorage.getItem('highScore') || 0;
	}

	function setHighscore(score) {
		localStorage.setItem('highScore', score)
	}

	function playAgain() {
		window.location.reload();
	}

	return (
		<Container>
			<h1>Diamond Explorer</h1>
			<p className={isWonOrLost() ? 'final-msg' : ''}>{isWon ? winText : isGameOver ? gameOverText : descriptionText}</p>
			<ScoreBoard>
				<Score className='score'><p>Your Score</p><strong>{score}</strong></Score>
				{isWonOrLost() ?
					<button className='restart-btn' onClick={playAgain}>Play Again</button> :
					<p className='diamond-count'>Diamonds Left: {remainingDiamonds() || SIZE}</p>}
				<Score className='highscore'><p>Highscore</p><strong>{getHighscore()}</strong></Score>
			</ScoreBoard>
			<GameBoard gameOver={isWonOrLost()}>{getRows()}</GameBoard>
		</Container>
	);
}

export default App;
