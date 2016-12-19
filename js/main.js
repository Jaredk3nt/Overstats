// ENVIRONMENT SETUP
// MAP object, works as ENUM for map types and names
var MAP_TYPE = [
		{value:0, name: "Hybrid"},
		{value:1, name: "Control Point"},
		{value:2, name: "Payload"},
		{value:3, name: "Assault"}
];

var MAP = [
	{value: 0, name: "Eichenwald", code: MAP_TYPE[0]},
	{value: 1, name: "King's Row", code: MAP_TYPE[0]},
	{value: 2, name: "Hollywood", code: MAP_TYPE[0]},
	{value: 3, name: "Numbani", code: MAP_TYPE[0]},

	{value: 4, name: "Ilios", code: MAP_TYPE[1]},
	{value: 5, name: "Lijiang Tower", code: MAP_TYPE[1]},
	{value: 6, name: "Nepal", code: MAP_TYPE[1]},

	{value: 7, name: "Dorado", code: MAP_TYPE[2]},
	{value: 8, name: "Route 66", code: MAP_TYPE[2]},
	{value: 9, name: "Watchpoint: Gibraltar", code: MAP_TYPE[2]},

	{value: 10, name: "Volskaya Industries", code: MAP_TYPE[3]},
	{value: 11, name: "Temple of Anubis", code: MAP_TYPE[3]},
	{value: 12, name: "Hanamura", code: MAP_TYPE[3]}
];

// OUTCOME object, works as ENUM for outcome types
var OUTCOME = [
    {value: 0, name: "Defeat"},
    {value: 1, name: "Victory"},
    {value: 2, name: "Draw"}
];

// Match object used to store individual match data
function match(m, sr, o, d, ch) {
    this.map = m;
    this.skillrating = sr;
	this.outcome = o;
	this.date = d;
	this.gain = ch;
}

// Angular app init
var OverwatchStats = angular.module('OverwatchStats', []);
var localStorageAvaliable = false;

// TEST CODE
var matchesList = [];

window.onload = function () {

};

function clearStorage() {
	localStorage.clear();
}

function nameInput() {
	document.getElementById("username_input").style.display = "block";
}

// Modal functionality
function showMatchModal() {
	"use strict";
	var modal = document.getElementById("add_match_modal");
	var overlay = document.getElementById("overlay");
	overlay.style.display = "block";
	modal.style.display = "block";
}

function closeAddModal() {
	var modal = document.getElementById("add_match_modal");
	var overlay = document.getElementById("overlay");
	overlay.style.display = "none";
	modal.style.display = "none";
}

function loadFromStorage() {
	"use strict";
	var storedJSON = localStorage.getItem('matches');
	if (storedJSON !== null) {
		var data = JSON.parse(storedJSON);
		console.log(storedJSON);
		//console.log(data[2].map.name);
		return data;
	}
	return [];
}

function addMatchLS(m) {
	"use strict";
	var storedJSON = localStorage.getItem('matches');
	var matches = [];
	if (storedJSON !== null) {
		matches = JSON.parse(storedJSON);
	}

    matches.push(m);
    localStorage.setItem('matches', JSON.stringify(matches));
}

function calculateWinPercentage(matches) {
    var winCount = [0,0,0,0,0]; // [0] total wins, [1] hybrid wins, [2] control point wins, [3] payload, [4] assault
	var matchCount = [0,0,0,0,0];
    for (var match of matches) {
		var mapType = match.map.code.value;
		var win = match.outcome.value;
		//console.log(mapType);
		// update match count
		matchCount[mapType]++;
		matchCount[4]++;
		// if victory update wincount
		if (win === 1) {
			winCount[mapType]++;
			winCount[4]++;
		}
		console.log(matchCount);
    }
	var winRates = [0,0,0,0,0];
	if (matchCount[4] > 0) {
		for (var i = 0; i < winCount.length; i++) {
			console.log(winCount[i] + " " + matchCount[i]);
			var percentage = Math.round((winCount[i]/matchCount[i]) * 100);
			if(isNaN(percentage)){
				percentage = 0;
			}
			winRates[i] = percentage;
		}
	}

	console.log(winRates);
    return winRates;
}

// ANGULAR LIST CONTROLLER
OverwatchStats.controller('matchListController', function matchListController($scope) {
	$scope.matches = [];
	// if local-storage is avaliable then pull the match history
	if (typeof(Storage) !== "undefined") {
		localStorageAvaliable = true;
		$scope.matches = loadFromStorage();
	}
	if ($scope.matches == null) {
		$scope.matches = [];
	}
	//update current SR to be the most recent stored game played
	$scope.currentSR = 0;
	if($scope.matches.length > 0) {
		$scope.currentSR = $scope.matches[$scope.matches.length - 1].skillrating;
	}

    $scope.maps = MAP;
    $scope.outcomes = OUTCOME;
	$scope.username = "Novakin#1349";

    $scope.winPercentages = calculateWinPercentage($scope.matches);


	$scope.addMatch = function () {
        // check input data
        if ($scope.newMap == null || $scope.newOutcome == null || $scope.newSR == null || $scope.newSR < 0 || $scope.newSR > 5000) {
            return;
        }

		var netGain = $scope.newSR - $scope.currentSR;
		var gainString = "";
		if (netGain >= 0) {
			gainString = "+";
		}
		gainString += netGain;
		if ($scope.currentSR === 0) {
			gainString = " ";
		}
		// grab values from modal
		var m = new match($scope.newMap, $scope.newSR, $scope.newOutcome, $scope.newDate, gainString);
		$scope.matches.push(m);
		addMatchLS(m);


		$scope.currentSR = $scope.newSR;
		closeAddModal();
		$scope.winPercentages = calculateWinPercentage($scope.matches);
		// $scope.$apply( function() {
		//
		// });
    };

    $scope.remove = function (index) {
        var count = $scope.matches.length - 1;
        $scope.matches.splice(count - index, 1);
        $scope.winPercentage = calculateWinPercentage($scope.matches);

        localStorage.setItem('matches', JSON.stringify($scope.matches));
    };

	$scope.changeName = function (keyEvent) {
		if (keyEvent.which === 13) {
			$scope.username = $scope.newUsername;
			document.getElementById("username_input").style.display = "none";
		}
	}
});
