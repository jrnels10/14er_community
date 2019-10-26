import { loadModules } from 'esri-loader';

export async function findLayerById(view, title) {
    try {
        return view.map.allLayers.find((layer) => {
            return layer.id === title;
        });
    } catch (error) {
        return error
    }

}

export async function query(where, mapLayer) {
    try {
        return loadModules(["esri/tasks/support/Query"])
            .then(async ([Query]) => {
                var query = mapLayer.createQuery();
                query.where = where;
                query.outSpatialReference = { wkid: 102100 };
                query.returnGeometry = true;
                query.outFields = ["*"];
                return mapLayer.queryFeatures(query);
            }).catch(error => {
                return error
                // errorUtils(error, "query in Tools.js", { where: where, featureLayer: featureLayer.id })
            });
    } catch (error) {
        return error
        // errorUtils(error, "query in Tools.js", { where: where, featureLayer: featureLayer.id })
    }
};