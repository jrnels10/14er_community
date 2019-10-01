// import React, { Component } from 'react';
// import { loadModules } from 'esri-loader';

// export function popupTemplate(view) {
//     return loadModules(["esri/widgets/Popup/PopupViewModel"])
//         .then(async ([PopupVM]) => {
//             export default class popup extends Component {
//                 constructor(props, ...rest) {
//                     super(props, ...rest);
//                     this.state = {
//                         vm: new PopupViewModel(),
//                         maxZoomed: false,
//                         minZoomed: false
//                     };
//                 }

//                 onViewLoaded = (view) => {
//                     this.state.vm.view = view;
//                     watchUtils.init(view, "popupTemp", this.onPopupClick);
//                   };

//                 render() {

//                     return (
//                         <div></div>
//                     );
//                 }
//             }



//             popup.propTypes = {};

//         })
// }
