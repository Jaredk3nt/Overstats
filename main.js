// ENVIRONMENT SETUP
// MAP object, works as ENUM for map types and names
/*
var MAP = {
	EICHENWALD 	: {value: 0, name: "Eichenwald", code: "Hybrid"},
  	KINGSROW   	: {value: 1, name: "King's Row", code: "Hybrid"},
	HOLLYWOOD  	: {value: 2, name: "Hollywood", code: "Hybrid"},
	NUMBANI    	: {value: 3, name: "Numbani", code: "Hybrid"},
	
	ILIOS		: {value: 4, name: "Ilios", code: "ControlPoint"},
	LIJIANG		: {value: 5, name: "Lijiang Tower", code: "ControlPoint"},
	NEPAL		: {value: 6, name: "Nepal", code: "ControlPoint"},
	
	DORADO		: {value: 7, name: "Dorado", code: "Payload"},
	ROUTE		: {value: 8, name: "Route 66", code: "Payload"},
	GIBRALTAR	: {value: 9, name: "Watchpoint Gibraltar", code: "Payload"},
	
	VOLSKAYA	: {value: 10, name: "Volskaya Industries", code: "Assault"},
	ANUBIS		: {value: 11, name: "Temple of Anubis", code: "Assault"},
	HANAMURA	: {value: 12, name: "Hanamura", code: "Assault"}
};
*/
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

// TEST CODE
var m1 = new match(MAP[0], 2500, OUTCOME[1], "10/07/16");
var m2 = new match(MAP[11], 2434, OUTCOME[2], "10/07/16");
var matchesList = [];
matchesList.push(m2);

// ANGULAR LIST CONTROLLER
OverwatchStats.controller('matchListController', 
                          function matchListController($scope) {
	$scope.matches = matchesList;
    $scope.maps = MAP;
    $scope.outcomes = OUTCOME;
  
  	$scope.addMatch = function() {
	  	// grab values from modal
        console.log($scope.newMap);
		var m = new match($scope.newMap, $scope.newSR, $scope.newOutcome, "");
    	$scope.matches.push(m);
        console.log(matches);
  }
})