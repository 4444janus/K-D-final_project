angular.module('KRRclass', ['chart.js']).controller('MainCtrl', ['$scope', '$http', mainCtrl]);



//function that runs when the search button is clicked
//$('#search').click(function () {
//    var light = [];
//    var water = [];
//    var price = [];
//    var sort_plant = [];
//    //sort plant
//    if ($('#inside').prop('checked')) sort_plant = "inside";
//    if ($('#outside').prop('checked')) sort_plant = "outside";
//
//
//    //light
//    if ($('#lowL').prop('checked')) light.push("low light");
//    if ($('#mediumL').prop('checked')) light.push("medium light");
//    if ($('#highL').prop('checked')) light.push("high light");
//
//    //water
//    if ($('#lowW').prop('checked')) water.push("low water");
//    if ($('#mediumW').prop('checked')) water.push("medium water");
//    if ($('#highW').prop('checked')) water.push("high water");
//
//    //price
//    if ($('#0').prop('checked')) price.push("0-5");
//    if ($('#5').prop('checked')) price.push("5-10");
//    if ($('#10').prop('checked')) price.push("10-20");
//    if ($('#20').prop('checked')) price.push("20-30");
//    if ($('#30').prop('checked')) price.push("30-40");
//    if ($('#40').prop('checked')) price.push("40+");
//
//    console.log(water)
//    console.log(light)
//    console.log(price)
//    console.log(sort_plant)
//
//    if (light.length == 0 && water.length == 0 && price.length == 0 && sort_plant.length == 0) {
//        window.alert("please select something")
//    } else {
//
//
//
//    }
//
//
//
//});





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



function mainCtrl($scope, $http) {


    $scope.mysparqlendpoint = "http://localhost:5820/plant/query?query="
    $scope.dbpedia = "http://dbpedia.org/sparql?query="



    $scope.plantquery = "SELECT ?plant WHERE {  ?plant ?a ?lant .} LIMIT 20"
    $scope.plantquery2 = "SELECT ?plant  WHERE {  ?lant ?a ?plant .  FILTER (?plant) } LIMIT 20"
    $scope.plantquery3 = "PREFIX pl: <http://www.semanticweb.org/ruud/BetterPlants/> SELECT * WHERE { {?plant pl:has_latin_name ?latin .} UNION {?plant pl:has_water_requirement ?water .} UNION {?plant pl:has_special_feature ?special .} UNION {?plant pl:has_price_range ?price .} UNION {?plant pl:has_light_requirement ?light .} UNION {?plant pl:has_leaf_colour ?colour .}} LIMIT 20"

    $scope.eigenontologyquery = "PREFIX dbo: <http://dbpedia.org/ontology/> PREFIX pl: <http://www.semanticweb.org/ruud/BetterPlants/> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT * WHERE { ?plant pl:has_latin_name ?latin_name . OPTIONAL{?plant pl:has_water_requirement ?water} OPTIONAL{?plant pl:has_special_feature ?special} OPTIONAL{?plant pl:has_light_requirement ?light} OPTIONAL{?plant pl:has_leaf_colour ?leaf_colour} OPTIONAL{?plant pl:has_appropriate_location ?location} OPTIONAL{?plant pl:additional_information ?information} OPTIONAL{?plant pl:has_size_at_maturity ?size} OPTIONAL{?plant pl:attracts_wildlife ?wildlife} OPTIONAL{?plant pl:has_bloom_time ?bloom_time} OPTIONAL{?plant pl:has_flower_colour ?flower_colour} OPTIONAL{?plant pl:has_soil_requirement ?soil_requirement} OPTIONAL{?plant pl:is_plant_type ?plant_type} OPTIONAL{?plant pl:has_common_name ?common_name} \
    FILTER (?location = pl:Garden) \
    FILTER (?flower_colour = pl:purple) \
    FILTER (?water = pl:Low) \
    FILTER (?light = pl:sun) \
    FILTER (?soil_requirement = pl:loam)\
    } \
    ORDER BY ?plant\
    LIMIT 200"

    $scope.querydbpedia = "PREFIX umbelrc: <http://umbel.org/umbel/rc/> PREFIX yago: <http://dbpedia.org/class/yago/> PREFIX dbp: <http://dbpedia.org/property/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX dbo: <http://dbpedia.org/ontology/> PREFIX dbr: <http://dbpedia.org/resource/> SELECT * WHERE {  ?plant a dbo:Plant .  ?plant a yago:Plant100017222 .  ?plant a umbelrc:Plant .  OPTIONAL{?plant dbo:thumbnail ?thumbnail} OPTIONAL{?plant dbo:abstract ?abstact . FILTER langMatches(lang(?abstact),'en')} OPTIONAL{?plant dbp:binomial ?binomial} OPTIONAL{?plant dbo:family ?family} OPTIONAL{?plant foaf:isPrimaryTopicOf ?wikiLink} } ORDER BY ?plant LIMIT 20"

    console.log($scope.mysparqlendpoint + encodeURI($scope.plantquery).replace(/#/g, '%23'));


    $http({
            method: "GET",
            headers: {
                'Accept': 'application/sparql-results+json',
                'Content-Type': 'application/sparql-results+json'
            },
            url: $scope.dbpedia + encodeURI($scope.querydbpedia).replace(/#/g, '%23'),

        })
        .success(function (data, status) {

            //            var results = data.results.bindings;
            //
            //            $("#result").empty();
            //            console.log(results)
            //            for (var i = 0; i < results.length; i++)
            //                if (results[i].hasOwnProperty('thumbnail')) {
            //                    $('#result').append('<tr><td>' + '<img src=' + '"' + results[i].thumbnail.value + '"' + 'alt="Image"' + 'width="80"' + 'height="80">' + '</td><td>' + results[i].plant.value + '</td><td>' + results[i].wikiLink.value + '</td><td>' + results[i].abstact.value + '</td><td>' + results[i].family.value + '</td><td>' + results[i].binomial.value + '</td></tr>');
            //                } else $('#result').append('<tr><td>' + 'not found' + '</td><td>' + results[i].plant.value + '</td><td>' + results[i].wikiLink.value + '</td><td>' + results[i].abstact.value + '</td><td>' + results[i].family.value + '</td><td>' + results[i].binomial.value + '</td></tr>');
            //
            //                for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].plant.value + '</td></tr>');
            //                for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].abstact.value + '</td></tr>');
            //                for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].binomial.value + '</td></tr>');
            //                for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].family.value + '</td></tr>');
            //                for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].thumbnail.value + '</td></tr>');
            //                for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].wikiLink.value + '</td></tr>');


            angular.forEach(data.results.bindings, function (val) {
                //console.log(val)


            })
        })
        .error(function (error) {
            console.log('Error');
        });


    $('#search').click(function () {
        var light = [];
        var water = [];
        var soil = [];
        var colour = [];


        //water
        if ($('#lowW').prop('checked')) water.push("Low");
        if ($('#moderateW').prop('checked')) water.push("Moderate");
        if ($('#noneW').prop('checked')) water.push("None");

        //light
        if ($('#sun').prop('checked')) light.push("sun");
        if ($('#part_shade').prop('checked')) light.push("part_shade");
        if ($('#shade').prop('checked')) light.push("shade");
        
        //soil
        if ($('#clay').prop('checked')) soil.push("clay");
        if ($('#loam').prop('checked')) soil.push("loam");
        if ($('#many').prop('checked')) soil.push("many");
        if ($('#rock').prop('checked')) soil.push("rock");
        if ($('#sand').prop('checked')) soil.push("sand");
        
        //colour
        if ($('#blue').prop('checked')) colour.push("blue");
        if ($('#brown').prop('checked')) colour.push("brown");
        if ($('#burgundy').prop('checked')) colour.push("burgundy");
        if ($('#gray').prop('checked')) colour.push("gray");
        if ($('#Green').prop('checked')) colour.push("Green");
        if ($('#indigo').prop('checked')) colour.push("indigo");
        if ($('#lavender').prop('checked')) colour.push("lavender");
        if ($('#magenta').prop('checked')) colour.push("magenta");
        if ($('#orange').prop('checked')) colour.push("orange");
        if ($('#pink').prop('checked')) colour.push("pink");
        if ($('#purple').prop('checked')) colour.push("purple");
        if ($('#red').prop('checked')) colour.push("red");
        if ($('#silver').prop('checked')) colour.push("silver");
        if ($('#white').prop('checked')) colour.push("white");
        if ($('#yellow').prop('checked')) colour.push("yellow");



        var waterquery = "";
        var lightquery = "";
        var soilquery = "";
        var colourquery = "";

        console.log(water)


        if (water.length == 0) {
            window.alert("please select water requirement")
        } else {

            if (water.length == 1) {
                waterquery += water[0];
                console.log(waterquery)
            } else if (water.length == 2) {
                waterquery += water[0] + "|| ?water =pl:" + water[1];
                console.log(waterquery)

            } else {
                waterquery += water[0] + "|| ?water =pl:" + water[1] + "|| ?water =pl:" + water[2];
                console.log(waterquery)
            };

            if (light.length == 0) {
                window.alert("please select light requirement")
            } else if (light.length == 1) {
                lightquery += light[0];
                console.log(lightquery)
            } else if (light.length == 2) {
                lightquery += light[0] + "|| ?light =pl:" + light[1];
                console.log(lightquery)

            } else {
                lightquery += light[0] + "|| ?light =pl:" + light[1] + "|| ?light =pl:" + light[2];
                console.log(lightquery)
            };
            
            if (soil.length == 0) {
                window.alert("please select soil requirement")
            } else if (soil.length == 1) {
                soilquery += soil[0];
                console.log(soilquery)
            } else if (soil.length == 2) {
                soilquery += soil[0] + "|| ?soil_requirement =pl:" + soil[1];
                console.log(soilquery)
            } else if (soil.length == 3) {  
                soilquery += soil[0] + "|| ?soil_requirement =pl:" + soil[1] + "|| ?soil_requirement =pl:" + soil[2];
                console.log(soilquery)
            } else if (soil.length == 4) {
                soilquery += soil[0] + "|| ?soil_requirement =pl:" + soil[1] + "|| ?soil_requirement =pl:" + soil[2] + "|| ?soil_requirement =pl:" + soil[3];
                console.log(soilquery)
            } else {
                soilquery += soil[0] + "|| ?soil_requirement =pl:" + soil[1] + "|| ?soil_requirement =pl:" + soil[2] + "|| ?soil_requirement =pl:" + soil[3] + "|| ?soil_requirement =pl:" + soil[4];
            };
            
            if (colour.length == 0) {
                window.alert("please select a colour, veranderen naar alle kleuren in query")
           } else if ( colour.length == 1) {
               colourquery += colour[0];
               console.log(colourquery)
           } else if ( colour.length == 2) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1];
               console.log(colourquery)
           } else if ( colour.length == 3) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2];
               console.log(colourquery)
           } else if ( colour.length == 4) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3];
               console.log(colourquery)
           } else if ( colour.length == 5) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3] + "|| ?flower_colour =pl:" + colour[4];
               console.log(colourquery)
           } else if ( colour.length == 6) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3] + "|| ?flower_colour =pl:" + colour[4] + "|| ?flower_colour =pl:" + colour[5];
               console.log(colourquery)               
           } else if ( colour.length == 7) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3] + "|| ?flower_colour =pl:" + colour[4] + "|| ?flower_colour =pl:" + colour[5] + "|| ?flower_colour =pl:" + colour[6];
               console.log(colourquery)                  
           } else if ( colour.length == 8) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3] + "|| ?flower_colour =pl:" + colour[4] + "|| ?flower_colour =pl:" + colour[5] + "|| ?flower_colour =pl:" + colour[6] + "|| ?flower_colour =pl:" + colour[7];                 
               console.log(colourquery)   
           } else if ( colour.length == 9) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3] + "|| ?flower_colour =pl:" + colour[4] + "|| ?flower_colour =pl:" + colour[5] + "|| ?flower_colour =pl:" + colour[6] + "|| ?flower_colour =pl:" + colour[7] + "|| ?flower_colour =pl:" + colour[8];                 console.log(colourquery)   
           } else if ( colour.length == 10) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3] + "|| ?flower_colour =pl:" + colour[4] + "|| ?flower_colour =pl:" + colour[5] + "|| ?flower_colour =pl:" + colour[6] + "|| ?flower_colour =pl:" + colour[7] + "|| ?flower_colour =pl:" + colour[8] + "|| ?flower_colour =pl:" + colour[9];         
               console.log(colourquery)   
           } else if ( colour.length == 11) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3] + "|| ?flower_colour =pl:" + colour[4] + "|| ?flower_colour =pl:" + colour[5] + "|| ?flower_colour =pl:" + colour[6] + "|| ?flower_colour =pl:" + colour[7] + "|| ?flower_colour =pl:" + colour[8] + "|| ?flower_colour =pl:" + colour[9] + "|| ?flower_colour =pl:" + colour[10];           
               console.log(colourquery)                  
           } else if ( colour.length == 12) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3] + "|| ?flower_colour =pl:" + colour[4] + "|| ?flower_colour =pl:" + colour[5] + "|| ?flower_colour =pl:" + colour[6] + "|| ?flower_colour =pl:" + colour[7] + "|| ?flower_colour =pl:" + colour[8] + "|| ?flower_colour =pl:" + colour[9] + "|| ?flower_colour =pl:" + colour[10] + "|| ?flower_colour =pl:" + colour[11];
               console.log(colourquery)                  
           } else if ( colour.length == 13) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3] + "|| ?flower_colour =pl:" + colour[4] + "|| ?flower_colour =pl:" + colour[5] + "|| ?flower_colour =pl:" + colour[6] + "|| ?flower_colour =pl:" + colour[7] + "|| ?flower_colour =pl:" + colour[8] + "|| ?flower_colour =pl:" + colour[9] + "|| ?flower_colour =pl:" + colour[10] + "|| ?flower_colour =pl:" + colour[11] + "|| ?flower_colour =pl:" + colour[12];
               console.log(colourquery)                  
           } else if ( colour.length == 14) {
               colourquery += colour[0] + "|| ?flower_colour =pl:" + colour[1] + "|| ?flower_colour =pl:" + colour[2] + "|| ?flower_colour =pl:" + colour[3] + "|| ?flower_colour =pl:" + colour[4] + "|| ?flower_colour =pl:" + colour[5] + "|| ?flower_colour =pl:" + colour[6] + "|| ?flower_colour =pl:" + colour[7] + "|| ?flower_colour =pl:" + colour[8] + "|| ?flower_colour =pl:" + colour[9] + "|| ?flower_colour =pl:" + colour[10] + "|| ?flower_colour =pl:" + colour[11] + "|| ?flower_colour =pl:" + colour[12] + "|| ?flower_colour =pl:" + colour[1];
               console.log(colourquery)                 
           }
                //else {
//                for (var i = 0; i > colour.length; i++) {
//                    colourquery += colour[i] + "|| ?flower_colour =pl:" + colour[i];
//                console.log(colourquery)
//                }
//            }


            $scope.eigenontologyquery = "PREFIX dbo: <http://dbpedia.org/ontology/> PREFIX pl: <http://www.semanticweb.org/ruud/BetterPlants/> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT * WHERE { ?plant pl:has_latin_name ?latin_name . OPTIONAL{?plant pl:has_water_requirement ?water} OPTIONAL{?plant pl:has_special_feature ?special} OPTIONAL{?plant pl:has_light_requirement ?light} OPTIONAL{?plant pl:has_leaf_colour ?leaf_colour} OPTIONAL{?plant pl:has_appropriate_location ?location} OPTIONAL{?plant pl:additional_information ?information} OPTIONAL{?plant pl:has_size_at_maturity ?size} OPTIONAL{?plant pl:attracts_wildlife ?wildlife} OPTIONAL{?plant pl:has_bloom_time ?bloom_time} OPTIONAL{?plant pl:has_flower_colour ?flower_colour} OPTIONAL{?plant pl:has_soil_requirement ?soil_requirement} OPTIONAL{?plant pl:is_plant_type ?plant_type} OPTIONAL{?plant pl:has_common_name ?common_name} \
    FILTER (?location = pl:Garden) \
    FILTER (?flower_colour = pl:" + colourquery + ") \
    FILTER (?water = pl:" + waterquery + ") \
    FILTER (?light = pl:" + lightquery + ") \
    FILTER (?soil_requirement = pl:" + soilquery + ")\
    } \
    ORDER BY ?plant\
    LIMIT 200"


            $http({
                    method: "GET",
                    headers: {
                        'Accept': 'application/sparql-results+json',
                        'Content-Type': 'application/sparql-results+json'
                    },
                    url: $scope.mysparqlendpoint + encodeURI($scope.eigenontologyquery).replace(/#/g, '%23'),

                })
                .success(function (data, status) {

                    var results = data.results.bindings;

                    $("#result").empty();

                    console.log(results);
                    console.log(results[0].plant.value);
                    
                    $('#result').append('<tr><th> Name </th><th> Light</th><th> Water </th><th> Location </th><th> Colour </th><th>Soil</th></tr>')
                
                    for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].plant.value + '</td><td>' + results[i].light.value + '</td><td>' + results[i].water.value + '</td><td>' + results[i].location.value + '</td><td>' + results[i].flower_colour.value + '</td><td>' + results[i].soil_requirement.value + '</td></tr>');

                    //            for (var i = 0; i < results.length; i++)
                    //                if (results[i].hasOwnProperty('thumbnail')) {
                    //                    $('#result').append('<tr><td>' + results[i].plant.value + '</td><td>' + results[i].wikiLink.value + '</td><td>' + results[i].abstact.value + '</td><td>' + results[i].family.value + '</td><td>' + results[i].binomial.value + '</td></tr>');
                    //                } else $('#result').append('<tr><td>' + 'not found' + '</td><td>' + results[i].plant.value + '</td><td>' + results[i].wikiLink.value + '</td><td>' + results[i].abstact.value + '</td><td>' + results[i].family.value + '</td><td>' + results[i].binomial.value + '</td></tr>');



                    //            for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].plant.value + '</td></tr>');
                    //            if (results[i].water.value)
                    //            for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].latin.value + '</td></tr>');
                    //            for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].water.value + '</td></tr>');
                    //            for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].special.value + '</td></tr>');
                    //            //for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].price.value + '</td></tr>');
                    //            //for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].light.value + '</td></tr>');
                    //            for (var i = 0; i < results.length; i++) $('#result').append('<tr><td>' + results[i].colour.value + '</td></tr>');

                    //console.log(data);
                    $scope.resultQ1 = data;
                    //        angular.foreach(data, function(value, key){
                    //            this.push(key +  ' ', value)
                    //        })
                    angular.forEach(data.results.bindings, function (val) {
                        //console.log(val)
                        //            $scope.myDynamicLabels.push(val.c.value);
                        //            $scope.myDynamicData.push(val.c.value);
                        //                if (val.water.value === undefined) $('#result').append('<tr><td>' + 'undefined' + '</td><td>' + 'undefined' + '</td></tr>');
                        //                else $('#result').append('<tr><td>' + val.water.value + '</td><td>' + val.water.value + '</td></tr>');
                        //                        $('#result').append('<tr><td>' + val.plant.value + '</td><td>' + val.plant.value + '</td></tr>')

                    })
                })
                .error(function (error) {
                    console.log('Error');
                });

        }



    });

    $scope.myDynamicLabels1 = [];
    $scope.myDynamicData1 = [];

    // TODO : type here code for your Ex 2
    $scope.doMyAction = function () {
        console.log('test');
        $scope.result = "Here is my input: " + $scope.myInput + "!";

        $scope.dynamicQuery = "Select ?s where { ?s a <http://data.vu.nl/coda/ontology/class#" + $scope.myInput + "> } limit 5";
        //$scope.dynamicQuery = $scope.myInput;
        console.log($scope.mysparqlendpoint + encodeURI($scope.myInput).replace(/#/g, '%23'));
        $http({
                method: "GET",
                headers: {
                    'Accept': 'application/sparql-results+json',
                    'Content-Type': 'application/sparql-results+json'
                },
                url: $scope.mysparqlendpoint + encodeURI($scope.myInput).replace(/#/g, '%23'),

            })
            .success(function (data, status) {

                console.log(data);
                $scope.resultQ2 = data;
            })
            .error(function (error) {
                console.log('Error');
            });



    };

}
