let _ = require('lodash');
let fs = require('fs');
let path = require('path');

function isCoordInPolygon ( coords, polygon) {
    console.log('coords', coords);
    console.log('polygon', polygon);
    for(let i = 0; i < polygon.length; i++){
        let val = []
        for(let j = 0; j < polygon[i].length-1; j++){
            if(polygon[i][j] === coords[j]){
                val.push(true)
            } else {
                val.push(false)
            }
        }
        if (val.every(check => check === true)){
            return true
        }
    }
    return false
}

let ctrl = {

    processData: function (req,res) {
        try{
            // converted the KML file to JSON as i don't know how to handle a KML File.
            let reqObj = req.body;
            let obj;
            const filePath = path.resolve(__dirname + `./../Downloads/FullStackTest_DeliveryAreas.geojson`);
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) throw err;
                obj = JSON.parse(data);
                for (const feature of obj.features) {
                    console.log('obj.features.length', obj.features.length);
                    if (!_.isEmpty(feature.geometry) && feature.geometry.type === 'Polygon'){
                        let val = isCoordInPolygon([reqObj.location[0], reqObj.location[1]], feature.geometry.coordinates[0]);
                        if (val){
                            let foundPolygon = feature.properties.name;
                            return res.status(200).json({ data: foundPolygon });
                        }
                        // check if location is inside feature.geometry.coordinates
                        // if yes return properties.name
                    }
                }
                return res.status(200).json({ message: "Not Found" });

            });

        } catch(err){
            res.json({message: err});
        }
    }

}
module.exports = ctrl;