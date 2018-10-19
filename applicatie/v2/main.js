angular.module('KRRclass', ['chart.js']).controller('MainCtrl', ['$scope', '$http', mainCtrl]);


function mainCtrl($scope, $http) {


    $scope.myAppList = ["gdb:game", "gdb:developer", "gdb:rating"];
    $scope.mysparqlendpoint = "http://localhost:5820/ownOntology/query?query="


    $scope.myInstances = [91, 81, 88, 77];
    $scope.myClasses = ["Plant 1", "Plant 2", "Plant 3", "Plant 4"];
    $scope.myjaar = [1996, 2008, 2016, 2008];
    $scope.mygame = ["Plant 1", "Plant 2", "Plant 3", "Plant 4"];
    $scope.myQuery = encodeURI("SELECT ?class (COUNT(?s) AS ?c) WHERE { ?s a ?class } GROUP BY ?class").replace(/#/g, '%23');


    $scope.myDynamicLabels = [];
    $scope.myDynamicData = [];


    $scope.doMyAction = function () {
        //$scope.result = "Here is my input: " +$scope.myInput+"!";
        $http({
                method: "GET",
                url: $scope.mysparqlendpoint + $scope.myQuery,
                headers: {
                    'Accept': 'application/sparql-results+json',
                    'Content-Type': 'application/sparql-results+json'
                }
            })
            .success(function (data, status) {


                $scope.result = data;
                console.log(data);
                $scope.myDynamicLabels = [];
                $scope.myDynamicData = [];

                // now iterate on the results
                angular.forEach(data.results.bindings, function (val) {
                    $scope.myDynamicLabels.push(val.c.datatype);
                    $scope.myDynamicData.push(val.c.value);
                });
            })
            .error(function (error) {
                console.log('Error ' + error);
            });



    };

}
