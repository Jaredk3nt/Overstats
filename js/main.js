// ENVIRONMENT SETUP
// MAP object, works as ENUM for map types and names
var MAP = [
	{value: 0, name: "Eichenwald", code: "Hybrid"},
	{value: 1, name: "King's Row", code: "Hybrid"},
	{value: 2, name: "Hollywood", code: "Hybrid"},
	{value: 3, name: "Numbani", code: "Hybrid"},
	
	{value: 4, name: "Ilios", code: "ControlPoint"},
	{value: 5, name: "Lijiang Tower", code: "ControlPoint"},
	{value: 6, name: "Nepal", code: "ControlPoint"},
	
	{value: 7, name: "Dorado", code: "Payload"},
	{value: 8, name: "Route 66", code: "Payload"},
	{value: 9, name: "Watchpoint: Gibraltar", code: "Payload"},
	
	{value: 10, name: "Volskaya Industries", code: "Assault"},
	{value: 11, name: "Temple of Anubis", code: "Assault"},
	{value: 12, name: "Hanamura", code: "Assault"}
];

// OUTCOME object, works as ENUM for outcome types
var OUTCOME = [
    {value: 0, name: "Defeat"},
    {value: 1, name: "Victory"},
    {value: 2, name: "Draw"}
];

// Match object used to store individual match data
function match(m, sr, o, d) {
    this.map = m;
    this.skillrating = sr;
	this.outcome = o;
	this.date = d;
}

// Angular app init
var OverwatchStats = angular.module('OverwatchStats', []);
var localStorageAvaliable = false;

// TEST CODE
var matchesList = [];



window.onload = function () {
	//localStorage.clear(); //just in case (testing purposes only)
};

function nameInput() {
	document.getElementById("username_input").style.display = "block";
}

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
    var winCount = 0;
	var matchCount = 0;
    for (var match of matches) {
        matchCount++;
        if (match.outcome.value === OUTCOME[1].value) {
            winCount++;
        }
    }
    
    if (matchCount > 0) {
        var percent = (winCount / matchCount) * 100;
        return Math.round(percent * 100) / 100;
    }
    
    return 0;
}

// ANGULAR LIST CONTROLLER
OverwatchStats.controller('matchListController', function matchListController($scope) {
	$scope.matches = [];
	if (typeof(Storage) !== "undefined") {
		localStorageAvaliable = true;
		$scope.matches = loadFromStorage();
	}
	if ($scope.matches == null) {
		$scope.matches = [];
	}
	$scope.currentSR = 0;
	if($scope.matches.length > 0) {
		$scope.currentSR = $scope.matches[$scope.matches.length - 1].skillrating;
	}
	
	$scope.gain = "+20 SR";
    $scope.maps = MAP;
    $scope.outcomes = OUTCOME;
	$scope.username = "Novakin#1349";
    
    $scope.winPercentage = calculateWinPercentage($scope.matches);
  
	$scope.addMatch = function () {
        // check input data
        if ($scope.newMap == null || $scope.newOutcome == null || $scope.newSR == null || $scope.newSR < 0 || $scope.newSR > 5000) {
            return;
        }
		
		// grab values from modal
		var m = new match($scope.newMap, $scope.newSR, $scope.newOutcome, $scope.newDate);
		$scope.matches.push(m);
		addMatchLS(m);
        
        $scope.winPercentage = calculateWinPercentage($scope.matches);
		$scope.currentSR = $scope.newSR;
		closeAddModal();
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