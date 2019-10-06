export const rendererDefault = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
        type: "point-3d", // autocasts as new PointSymbol3D()
        symbolLayers: [
            {
                type: "icon", // autocasts as new IconSymbol3DLayer()
                resource: {
                    primitive: "circle"
                },
                material: {
                    color: "black"
                },
                size: 6
            }
        ]
    }
};

export const renderer3DBarChart = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
        type: "point-3d", // autocasts as new PointSymbol3D()
        symbolLayers: [
            {
                type: "object", // autocasts as new ObjectSymbol3DLayer()
                resource: {
                    primitive: "cylinder"
                },
                width: 5000 // width of the symbol in meters
            }
        ]
    },
    label: "14er",
    visualVariables: [
        {
            type: "color",
            field: "avgDifficulty",
            stops: [
                {
                    value: 0,
                    opacity: 50,
                    color: [255, 255, 255, 0.5]
                },
                {
                    value: 10,
                    color: "#03385c"
                }
            ]
        },
        {
            type: "size",
            field: "completedCount",
            stops: [
                {
                    value: 0,
                    size: 6000
                },
                {
                    value: 5,
                    size: 50000
                }
            ],
            axis: "height"
        },
        {
            type: "size",
            axis: "width-and-depth",
            useSymbolValue: true // uses the width value defined in the symbol layer (50,000)
        }
    ]
};