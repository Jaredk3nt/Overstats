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
	{value: 9, name: "Watchpoint Gibraltar", code: "Payload"},
	
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

function loadFromStorage() {
	var storedJSON = localStorage.getItem('matches');
	if(storedJSON !== null) {
		var data = JSON.parse(storedJSON);
		console.log(storedJSON);
		//console.log(data[2].map.name);
		return data;
	}
	return [];
}

function addMatchLS(m) {
	var storedJSON = localStorage.getItem('matches');
	var matches = [];
	if(storedJSON !== null) {
		matches = JSON.parse(storedJSON);
	}

    matches.push(m);
    localStorage.setItem('matches', JSON.stringify(matches));
}

// ANGULAR LIST CONTROLLER
OverwatchStats.controller('matchListController', 
                          function matchListController($scope) {
	$scope.matches = [];
	if (typeof(Storage) !== "undefined") {
		localStorageAvaliable = true;
		$scope.matches = loadFromStorage();
	}
	if($scope.matches === null){
		$scope.matches = [];
	}
	
    $scope.maps = MAP;
    $scope.outcomes = OUTCOME;
  
  	$scope.addMatch = function() {
	  	// grab values from modal
		var m = new match($scope.newMap, $scope.newSR, $scope.newOutcome, "");
		$scope.matches.push(m);
		addMatchLS(m);
  }
});

//{"matches": [ {"map": x, "skillrating": x, "outcome": x, "date": x}, {...}, ... ]}