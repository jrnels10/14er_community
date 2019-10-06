var measureThisAction = {
    title: "Completed ?",
    id: "completedPeak",
    image:
        "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png"
};

export const PeakPopup = {
    title: "{NAME}",
    content: [{
        type: "fields",
        fieldInfos: [{
            fieldName: "elev_feet",
            label: "Elevation ft",
            format: {
                digitSeparator: true
            }
        }, {
            fieldName: "elev_meter",
            label: "Elevation meter",
            format: {
                digitSeparator: true
            }
        }, {
            fieldName: "avgDifficulty",
            label: "Average Difficulty",
            format: {
                digitSeparator: true
            }
        }, {
            fieldName: "completedCount",
            label: "Completed by Users"
        }]
    }],
    actions: [measureThisAction]
};