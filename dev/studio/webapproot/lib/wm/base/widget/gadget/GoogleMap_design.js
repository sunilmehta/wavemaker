/*
 *  Copyright (C) 2011 VMWare, Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

dojo.provide("wm.base.widget.gadget.GoogleMap_design");
dojo.require("wm.base.widget.gadget.GoogleMap");
dojo.require("wm.base.Control_design");


wm.Object.extendSchema(wm.gadget.GoogleMap, {
    dataSet: { readonly: true, group: "data", order: 1, bindTarget: 1, type: "wm.Variable", isList: true, createWire: 1, editor: "wm.prop.DataSetSelect", editorProps: {listMatch: true, widgetDataSets: true, allowAllTypes: true}},
    selectedItem: { ignore: 1, bindSource: 1, isObject: true, simpleBindProp: true },
    addressField: {group: "Marker", order: 1, editor:"wm.prop.FieldSelect", editorProps: {}},
    latitudeField: {group: "Marker", order: 2, editor:"wm.prop.FieldSelect", editorProps: {}},
    longitudeField: {group: "Marker", order: 3, editor:"wm.prop.FieldSelect", editorProps: {}},
    titleField: {group: "Marker", order: 4, editor:"wm.prop.FieldSelect", editorProps: {}},
    descriptionField: {group: "Marker", order: 5, editor:"wm.prop.FieldSelect", editorProps: {}},
    iconField: {group: "Marker", order: 6, editor:"wm.prop.FieldSelect", editorProps: {}},
    latitude: {group: "Map", order: 1, bindTarget: 1},
    longitude: {group: "Map", order: 2, bindTarget: 1},
    zoom: {group: "Map", order: 3, options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]},
    mapType: {group: "Map", order: 4, options:["ROADMAP", "SATELLITE", "HYBRID", "TERRAIN"]},
    setZoom: {group: "method", method: true},
    setLatitude:{group: "method", method: true},
    setLongitude:{group: "method", method: true},
    fitToMarkers:{group: "method", method: true},
    setMapType:{group: "method", method: true},
    setDataSet:{group: "method", method: true},
    selectMarkerByIndex:{group: "method", method: true},
    hint:{ignore:1},
    disabled:{ignore:1}
    
});


wm.gadget.GoogleMap.extend({
    listProperties: function() {
	var props = this.inherited(arguments);
	props.selectedItem.type = this.dataSet ? this.dataSet.type : "";
	return props
    }
});
