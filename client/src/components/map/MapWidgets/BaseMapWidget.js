import { loadModules } from 'esri-loader';

export async function basemapWidget(view) {
    return loadModules(["esri/widgets/BasemapGallery", "esri/widgets/Expand"])
        .then(async ([BasemapGallery, Expand]) => {
            var basemapGallery = new BasemapGallery({
                view: view
            });

            var expandBasemap = new Expand({
                view: view,
                content: basemapGallery
            });

            view.ui.add(expandBasemap, {
                position: "top-right"
            });
        });
}