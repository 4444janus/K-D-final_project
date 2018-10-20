angular.module('KRRclass', ['chart.js']).controller('MainCtrl', ['$scope', '$http', mainCtrl]);



//$(document).ready(function () {
//    function form() {
//        var light = [];
//        var water = [];
//        var price = [];
//
//        if ($('#lowL').prop('checked')) light.push("low light");
//
//    }
//})
//console.log("light")
//
//var light = [];
//var water = [];
//var price = [];
//
//if ($('#lowL').prop('checked')) light.push("low light");
//if ($('#lowL').prop('checked')) console.log(light);


$('#search').click(function () {
    var light = [];
    var water = [];
    var price = [];
//light
    if ($('#lowL').prop('checked')) light.push("low light");
    if ($('#mediumL').prop('checked')) light.push("medium light");
    if ($('#highL').prop('checked')) light.push("high light");
    if ($('#lowL').prop('checked')) console.log(light);
//water
    if ($('#lowW').prop('checked')) light.push("low water");
    if ($('#mediumW').prop('checked')) light.push("medium water");
    if ($('#highW').prop('checked')) light.push("high water");
    if ($('#lowW').prop('checked')) console.log(water);
});





//function mainCtrl($scope, $http) {
//
//
//    $scope.myAppList = ["gdb:game", "gdb:developer", "gdb:rating"];
//    $scope.mysparqlendpoint = "http://localhost:5820/ownOntology/query?query="
//
//
//    $scope.myInstances = [91, 81, 88, 77];
//    $scope.myClasses = ["Plant 1", "Plant 2", "Plant 3", "Plant 4"];
//    $scope.myjaar = [1996, 2008, 2016, 2008];
//    $scope.mygame = ["Plant 1", "Plant 2", "Plant 3", "Plant 4"];
//    $scope.myQuery = encodeURI("SELECT ?class (COUNT(?s) AS ?c) WHERE { ?s a ?class } GROUP BY ?class").replace(/#/g, '%23');
//
//
//    $scope.myDynamicLabels = [];
//    $scope.myDynamicData = [];
//
//
//    $scope.doMyAction = function () {
//        //$scope.result = "Here is my input: " +$scope.myInput+"!";
//        $http({
//                method: "GET",
//                url: $scope.mysparqlendpoint + $scope.myQuery,
//                headers: {
//                    'Accept': 'application/sparql-results+json',
//                    'Content-Type': 'application/sparql-results+json'
//                }
//            })
//            .success(function (data, status) {
//
//
//                $scope.result = data;
//                console.log(data);
//                $scope.myDynamicLabels = [];
//                $scope.myDynamicData = [];
//
//                // now iterate on the results
//                angular.forEach(data.results.bindings, function (val) {
//                    $scope.myDynamicLabels.push(val.c.datatype);
//                    $scope.myDynamicData.push(val.c.value);
//                });
//            })
//            .error(function (error) {
//                console.log('Error ' + error);
//            });
//
//
//
//    };
//
//}



function mainCtrl($scope, $http){

	// TODO : type here code for your Ex 1
	$scope.myAppName = "Awesomename";
    $scope.myAppList = [ "codaonto:Study", "codaonto:Treatment", "codaonto:Variable" ];
    $scope.mysparqlendpoint = "http://localhost:5820/plant/query?query="
  


	// TODO : type here code for your Ex 2
    $scope.myInstances = [91, 81, 88, 77];
    $scope.myClasses = [ "Super Mario 64","Mario kart Wii", "Doom","Mirror's edge" ];

    $scope.myDynamicLabels = [];
    $scope.myDynamicData = [];

    //$scope.sparqlquery2 = "SELECT ?class (COUNT(?s) AS ?c) WHERE { ?s a ?class } GROUP BY ?class"
    $scope.plantquery = "SELECT ?plant WHERE {  ?plant ?a ?lant .} LIMIT 20"
    //url : $scope.mysparqlendpoint+encodeURI("Select ?s where { ?s a <http://data.vu.nl/coda/ontology/class#"+$scope.myarg+"> } limit 5").replace(/#/g, '%23'),
    //url : $scope.mysparqlendpoint+encodeURI("SELECT ?class (COUNT(?s) AS ?c) WHERE { ?s a ?class } GROUP BY ?class").replace(/#/g, '%23'),
    //encodeURI("SELECT ?class (COUNT(?s) AS ?c) WHERE { ?s a ?class } GROUP BY ?class").replace(/#/g, '%23'),
    //console.log($scope.mysparqlendpoint+encodeURI($scope.sparqlquery2).replace(/#/g, '%23'));
    console.log($scope.mysparqlendpoint+encodeURI($scope.plantquery).replace(/#/g, '%23'));
        $http( {
        method: "GET",
        headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
        url : $scope.mysparqlendpoint+encodeURI($scope.plantquery).replace(/#/g, '%23'),

    } )
    .success(function(data, status ) {
            
            var results = data.results.bindings;
            
            $("#result").empty();
            
            console.log(results);
            console.log(results[0].plant.value);
            
//            for (var i = 0; i > results.length; i++) 
            $('#result').append('<tr><td>' + results[0].plant.value + '</td><td>' + results[1].plant.value + '</td></tr>')

        //console.log(data);
        $scope.resultQ1=data;
//        angular.foreach(data, function(value, key){
//            this.push(key +  ' ', value)
//        })
    angular.forEach(data.results.bindings, function(val)
        {
//            $scope.myDynamicLabels.push(val.c.value);
//            $scope.myDynamicData.push(val.c.value);
//        $('#result').append('<tr><td>' + results[val].plant.value + '</td><td>' + results[val].plant.value + '</td></tr>')

        })
    })
    .error(function(error ){
        console.log('Error');
    });



    $scope.myDynamicLabels1 = [];
    $scope.myDynamicData1 = [];

	// TODO : type here code for your Ex 2
	$scope.doMyAction = function(){
        console.log('test');
        $scope.result = "Here is my input: " +$scope.myInput+"!";

        $scope.dynamicQuery = "Select ?s where { ?s a <http://data.vu.nl/coda/ontology/class#"+$scope.myInput+"> } limit 5";
        //$scope.dynamicQuery = $scope.myInput;
        console.log($scope.mysparqlendpoint+encodeURI($scope.myInput).replace(/#/g, '%23'));
        $http( {
        method: "GET",
        headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
        url : $scope.mysparqlendpoint+encodeURI($scope.myInput).replace(/#/g, '%23'),

    } )
    .success(function(data, status ) {

        console.log(data);
        $scope.resultQ2=data;
    })
    .error(function(error ){
        console.log('Error');
    });



	};

}