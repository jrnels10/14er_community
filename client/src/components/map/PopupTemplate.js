import React, { Component } from 'react';
import { Consumer } from './../../Context';

export default function PopupTemplate(props) {

        var measureThisAction = {
            title: "Measure Length",
            id: "measure-this",
            image:
                "https://developers.arcgis.com/javascript/latest/sample-code/popup-actions/live/Measure_Distance16.png"
        };

        var template = {
            // autocasts as new PopupTemplate()
            title: "Fourteener",
            content: "Have you summitted {name}?",
            actions: [measureThisAction]
        };
    

   
}