const app = angular.module('TicTacToeApp', []);

app.controller("TicTacToeController", ['$scope', function($scope) {
	const winningPattern = [
		'036',
		'147',
		'258',
		'012',
		'345',
		'678',
		'048',
		'246'
	];

	$scope.values = ['', '', '', '', '', '', '', '', ''];
	$scope.isXcurPlayer = false;
	$scope.winner = null;
	$scope.history = [];	
	$scope.gameover = false;

	$scope.updateSquare = function ($index, $event) {
		if ($event.target.innerText || $scope.winner) return;
		const curPlayer = $scope.isXcurPlayer ? 'X' : 'O';
		const newValues = $scope.values.slice();
		newValues[$index] = curPlayer;
		$scope.values = newValues.slice();
		$scope.isXcurPlayer = !$scope.isXcurPlayer;
		$scope.handleActiveClass($event);
		$scope.getWinner();
		$scope.addHistory(newValues);
	};

	$scope.handleActiveClass = function ($event) {
		const activeLi = document.querySelector('.active');
		if (activeLi) activeLi.classList.remove('active');
		$event.target.classList.add('active');
	};

	$scope.getWinner = function () {
		const xSquares = $scope.values.map((s, i) => s === 'X' ? i : '').join('');
		const oSquares = $scope.values.map((s, i) => s === 'O' ? i : '').join('');
		let winningSquares = null;

		for (let i = 0; i < winningPattern.length; i++) {
			const pattern = winningPattern[i];
			if (xSquares.indexOf(pattern) > -1) {
				$scope.winner = 'X';
				winningSquares = pattern.split('');
				break;
			} else if (oSquares.indexOf(pattern) > -1) {
				$scope.winner = 'O';
				winningSquares = pattern.split('');
				break;
			}
		}
		if (winningSquares) {
			winningSquares.map(index => document.querySelectorAll('li')[index].classList.add('winner') );
		}

		if ($scope.values.indexOf('') === -1) {
			$scope.gameover = true;
		}
	};

	$scope.getCurrentWinnerOrPlayer = function () {
		if ($scope.winner) return "Hurray!!! The winner is: " + $scope.winner + " !";
		else return "It is " + ($scope.isXcurPlayer ? "X's" : "O's") + " turn";
	}

	$scope.resetToDefault = function () {
		$scope.values = ['', '', '', '', '', '', '', '', ''];
		$scope.isXcurPlayer = false;
		$scope.winner = null;
		$scope.history = [];
		$scope.gameover = false;
		resetClasses();
	}

	$scope.addHistory = function (newValues) {
		const newHistory = $scope.history.concat([newValues]);
		$scope.history = newHistory.slice();
	}
	$scope.handleHistory = function ($index) {
		$scope.values = $scope.history[$index - 1];
		$scope.history = $scope.history.slice(0, $index);
		resetClasses()
	}

	const resetClasses = () => {
		document.querySelectorAll('li.active, li.winner').forEach(li => {
			li.classList.remove('active', 'winner');
		});
	}
}]); 