export async function findLayerById(view, title) {
    try {
        return view.map.allLayers.find((layer) => {
            return layer.id === title;
        });
    } catch (error) {
        return error
    }

}