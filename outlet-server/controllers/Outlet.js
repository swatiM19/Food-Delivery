let _ = require('lodash');
let fs = require('fs');
let path = require('path');

function isCoordInPolygon (latitude, longitude, polygon) {
    const x = latitude; const y = longitude
    // check here if it is inside polygon or not.
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
                    if (!_.isEmpty(feature.geometry) && feature.geometry.type === 'Polygon'){
                        let val = isCoordInPolygon(reqObj.location[0], reqObj.location[1], feature.geometry.coordinates);
                        if (val){
                            let foundPolygon = feature.properties.name;
                            res.json({ foundPolygon });
                        }
                        // check if location is inside feature.geometry.coordinates
                        // if yes return properties.name
                        // Could not complete it because of lack of time.
                    }
                }
                res.json({ message: "Not Found" });

            });

        } catch(err){
            res.json({message: err});
        }
    }

}
module.exports = ctrl;