let _ = require('lodash');
let fs = require('fs');

let ctrl = {

    processData: function (req,res) {
        try{
            // converted the KML file to JSON as i don't know how to handle a KML File.
            let obj;
            fs.readFile('../FullStackTest_DeliveryAreas.geojson', 'utf8', function (err, data) {
                if (err) throw err;
                obj = JSON.parse(data);
            });

            for (const feature of obj.features) {
                if (!_.isEmpty(feature.geometry) && feature.geometry.type === 'Polygon'){
                    // check if location is inside feature.geometry.coordinates
                    // if yes return properties.name
                    // Could not complete it because of lack of time.
                }
            }
        } catch(err){
            res.json({message: err});
        }
    }

}
module.exports = ctrl;