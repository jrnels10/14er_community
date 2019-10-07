import Data from '../../Data';
import { loadModules } from 'esri-loader';
import { getPeaksDetails } from '../../../API/PeaksAPI';
import { userPeaksFields } from './layerSchemas';
import { rendererDefault, renderer3DBarChart } from './layerRenderers';
import { PeakLabelDefault } from './layerLabeling';
import { PeakPopup } from './layerPopup';

export async function PeakFeatureLayer(renderType) {
    // debugger
    const peakLayerData = await getPeaksDetails();
    // debugger
    return loadModules([
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/geometry/Point",
        "esri/layers/FeatureLayer"])
        .then(async ([GraphicsLayer, Graphic, Point, FeatureLayer]) => {
            var features = Data.operationalLayers[3].featureCollection.layers[0].featureSet.features;
            var fields = Data.operationalLayers[3].featureCollection.layers[0].layerDefinition.fields;
            var gLayer = new GraphicsLayer();
            features.map(item => {
                var point = new Point(item.geometry);
                var g = new Graphic({
                    geometry: point,
                    attributes: item.attributes
                });
                peakLayerData.data.peakDetails.map(peakDetail => {
                    if (peakDetail.name === item.attributes.name) {
                        let att = {
                            completedCount: peakDetail.attribute.completed.completedCount,
                            userCompleted: peakDetail.attribute.completed.userCompleted,
                            avgDifficulty: peakDetail.attribute.difficulty.avgDifficulty,
                            userDifficulty: peakDetail.attribute.difficulty.userDifficulty
                        }
                        return g.attributes = Object.assign(item.attributes, att)
                    }
                    else {
                        return null;
                    }
                })
                return gLayer.add(g);
            });

            userPeaksFields.map(item => {
                return fields.push(item);
            })
            var layerFields = fields;
            var layer = new FeatureLayer({
                id: "peakLayer",
                source: gLayer.graphics,
                objectIdField: "id",
                fields: layerFields,
                geometryType: "point"
            });

            layer.renderer = renderType ? await renderer3DBarChart() : rendererDefault
            layer.labelingInfo = [PeakLabelDefault]
            layer.popupTemplate = PeakPopup
            return layer
        });
};

