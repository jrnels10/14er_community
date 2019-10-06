export const PeakLabelDefault = {
    labelPlacement: "above-center",
    labelExpressionInfo: {
        value: "{NAME}"
    },
    symbol: {
        type: "label-3d", // autocasts as new LabelSymbol3D()
        symbolLayers: [
            {
                type: "text", // autocasts as new TextSymbol3DLayer()
                material: {
                    color: "#0d4160"
                },
                halo: {
                    color: [255, 255, 255, 0.7],
                    size: 2
                },
                size: 10
            }
        ],
        verticalOffset: {
            screenLength: 150,
            maxWorldLength: 2000,
            minWorldLength: 30
        },
        callout: {
            type: "line", // autocasts as new LineCallout3D()
            size: 0.5,
            color: [0, 0, 0],
            border: {
                color: [255, 255, 255, 0.7]
            }
        }
    }
}