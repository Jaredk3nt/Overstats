var OverwatchStats = angular.module('OverwatchStats', []);

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

var OUTCOME = {
    WIN   : {value: 1, name: "Victory"},
    LOSS  : {value: 0, name: "Defeat"},
    TIE   : {value: 2, name: "Draw"}
};

let mapNames = Object.keys(MAP);
let outcomeTypes = Object.keys(OUTCOME);

function match(m, sr, o, d) {
    this.map = m;
    this.skillrating = sr;
  	this.outcome = o;
	this.date = d;
}

var m1 = new match(MAP.EICHENWALD, 2500, OUTCOME.WIN, "10/07/16");
var m2 = new match(MAP.ANUBIS, 2434, OUTCOME.LOSS, "10/07/16");
var matchesList = [];
matchesList.push(m2);


OverwatchStats.controller('matchListController', 
                          function matchListController($scope) {
	$scope.matches = matchesList;
    $scope.maps = mapNames;
    $scope.outcomes = outcomeTypes;
  
  	$scope.addMatch = function() {
	  	// grab values from modal
		var m = new match($scope.newMap, $scope.newSR, $scope.newOutcome, "");
    	$scope.matches.push(m);
        console.log(matches);
  }
})