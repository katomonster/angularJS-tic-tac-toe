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

	$scope.updateSquare = function ($index, $event) {
		if ($event.target.innerText) return;
		const curPlayer = $scope.isXcurPlayer ? 'X' : 'O';
		$scope.values[$index] = curPlayer;
		$scope.isXcurPlayer = !$scope.isXcurPlayer;
		$scope.handleActiveClass($event);
		$scope.getWinner();
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
	};

	$scope.getCurrentWinnerOrPlayer = function () {
		if ($scope.winner) return "Hurray!!! The winner is: " + $scope.winner + " !";
		else return "It is " + ($scope.isXcurPlayer ? "X's" : "O's") + " turn";
	}

	$scope.resetToDefault = function () {
		$scope.values = ['', '', '', '', '', '', '', '', ''];
		$scope.isXcurPlayer = false;
		$scope.winner = null;
		document.querySelectorAll('li.active, li.winner').forEach(li => {
			li.classList.remove('active', 'winner');
		});
	}

}]); 