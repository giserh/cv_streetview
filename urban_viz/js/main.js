// this function is called after the HTML document is fully loaded 
/**
 * Created by lezhi on 3/17/2016.
 */

$(function(){

    var centers = {
        barcelona   :[41.390298, 2.162001],
        boston      :[42.352131, -71.090669],
        brasilia    :[-15.797616, -47.891761],
        chicago     :[41.875604, -87.645203],
        hongkong    :[22.302156, 114.170416],
        london      :[51.507360, -0.127630],
        munich      :[48.139741, 11.565510],
        paris       :[48.857527, 2.341560],
        newyork     :[40.747783, -73.968068],
        sanfrancisco:[37.767394, -122.447354],
        singapore   :[1.302876, 103.829547],
        tokyo       :[35.684226, 139.755518]
    };

    //var data = [];

    var dataLoaded = function (_data) {
        // pre-processing
        // assigning centers to geojson objects
        var dataCenters = [centers.boston, centers.chicago, centers.newyork, centers.sanfrancisco];
        dataCenters = dataCenters.map( function(d) {
            return [d[1], d[0]];
        });
        _data.forEach( function(d, i) {
            d.center = dataCenters[i];
    });


        //var polygonMap = d3.custom.mapVis().shapeType("polygon");
        var pointMap = d3.custom.mapVis().shapeType("point");
        //d3.selectAll(".map")
        //    .data(_data)
        //    .call(polygonMap);
        d3.selectAll(".map-dot")
            .data(_data)
            .call(pointMap);
    };

    var startHere = function(){
        queue()
            //.defer(d3.json, "data/boundary_boston.geojson")
            //.defer(d3.json, "data/boundary_chicago.geojson")
            //.defer(d3.json, "data/boundary_newyork.geojson")
            //.defer(d3.json, "data/boundary_sanfrancisco.geojson")
            .defer(d3.csv, "data/labels_dense_boston.csv")
            .defer(d3.csv, "data/labels_dense_chicago.csv")
            .defer(d3.csv, "data/labels_dense_newyork.csv")
            .defer(d3.csv, "data/labels_dense_sanfrancisco.csv")
            .await(function(error, boston, chicago, newyork, sanfrancisco) {
                if (error) {
                    console.log(error);
                } else {
                    //boston.forEach( function(d) {
                    //    for(var i= 0; i<24; i++){
                    //        d[i] = +d[i];
                    //    }
                    //});
                    return dataLoaded([boston, chicago, newyork, sanfrancisco]);
                }
            });
    }
    startHere();
})