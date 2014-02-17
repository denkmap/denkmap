/**
 *
 * Main controller for handle interaction with leaflet map.
 *
 */
Ext.define('Denkmap.controller.Map', {
    extend: 'Ext.app.Controller',
    config: {

        /**
         * @event maptypeupdaterequest
         * Fired on marker update request.
         */

        refs: {
            mapNavigationView: '#mapNavigationView',
            mapCenterButton: '#mapNavigationView .button[cls=mapCenterButton]',
            mapCmp: '#leafletmap'
        },
        control: {
            mapNavigationView: {
                back: '_onMapNavigationViewDetailViewBack'
            },
            mapCenterButton: {
                tap: '_onMapNavigationViewCenterButtonTap'
            }
        },

        lLayerGroup: null,
        lLayerControl: null,

        monumentsStore: null
    },

    /**
     * @private
     */
    init: function(){
        var me = this;
        me.setLLayerGroup(window.L.layerGroup());

        me.getApplication().on({
            geolocationready: { fn: me._setupLeafletMap, scope: me },
            locationupdate: { fn: me._updateLeafletMap, scope: me }
        });
        this.setMonumentsStore(Ext.getStore('Monuments'));
        me.getMonumentsStore().on({
            load: {
                fn: function() {
                    me._updateMarkersOnMap()
                },
                scope: me
            }
        });
        console.log("map init finsihed");
    },

    /**
     * @private
     * Loads a GeoJSON layer from the specified URL.
     * @param {string} geojsonURL
     */
    _loadGeoJsonLayer: function(geojsonURL) {
        var geojsonLayer,
            popUp,
            objectType,
            me = this;
        console.log("Load GeoJSON layer: ", geojsonURL);

        popUp = function(feature, layer) {
            var popupHtml = "<ul>";
            if (feature.properties.baugruppe) {
                popupHtml += "<li><b>Baugruppe:</b>&nbsp;" + feature.properties.baugruppe + "</li>";
            }
            if (feature.properties.objtext) {
                popupHtml += "<li><b>Objekt:</b>&nbsp;" + feature.properties.objtext + "</li>";
            }
            if (feature.properties.baujahr) {
                popupHtml += "<li><b>Baujahr:</b>&nbsp;" + feature.properties.baujahr + "</li>";
            }
            popupHtml += "</ul>";

            layer.bindPopup(popupHtml);
        };

        objectType = Ext.create('Denkmap.util.ObjectType');

        geojsonLayer = new L.GeoJSON.AJAX(
            geojsonURL,
            {
                onEachFeature: popUp,
                pointToLayer: function (feature, latlng) {
                    var style = objectType.getStyleForMonument(feature.properties);
                    return L.circleMarker(latlng, style);
                }

            }
        );
        geojsonLayer.addTo(this.getMapCmp().getMap());
        console.log("Added to map");
    },


    /**
     * @private
     * Sets up LeafletMap component. Is called right after the user's geolocation is available.
     * @param {Denkmap.util.Geolocation} geo
     */
    _setupLeafletMap: function (geo) {
        var me = this,
            lLayerControl = new window.L.Control.Layers();
        console.log("Setup map");

        lLayerControl.addTo(me.getMapCmp().getMap());
        this.setLLayerControl(lLayerControl);
        this.getLLayerControl().addOverlay(me.getLLayerGroup(), 'monuments');

        me._updateLeafletMap(geo);
    },

    /**
     * @private
     * Updates LeafletMap component. Is called right after a locationupdate.
     * @param {Denkmap.util.Geolocation} geo
     */
    _updateLeafletMap: function (geo) {
        var me = this,
            proxyUrl;
        console.log("Map update");
        me._centerMapToCurrentPosition(geo);

        proxyUrl = Denkmap.util.Config.getWebservices().monument.getUrl(geo.getLatitude(), geo.getLongitude());
        me.getMonumentsStore().getProxy().setUrl(proxyUrl);
        me.getMonumentsStore().load();
    },

    _updateMarkersOnMap: function() {
        var me = this;
        me.getLLayerGroup().clearLayers();

        me.getMonumentsStore().each(function(monument) {
            me.getLLayerGroup().addLayer(me._createLMarkerFromModel(monument));
        });
    },

    /**
     * @private
     * @param record
     * @returns {L.marker} marker
     */
    _createLMarkerFromModel: function(model) {
        console.log(model.get('geometry').coordinates);
        console.log(model.get('geometry').coordinates[0]);
        console.log(model.get('geometry').coordinates[1]);
        var me = this,
            lat = model.get('geometry').coordinates[0],
            lon = model.get('geometry').coordinates[1],
            marker = window.L.marker([lat, lon]);
        marker.record=model;
        console.log(marker);
        return marker;
    },

    /**
     * @private
     */
    _onMapNavigationViewCenterButtonTap: function () {
        this._centerMapToCurrentPosition();
    },

    /**
     * @private
     */
    _centerMapToCurrentPosition: function(geo) {
        console.log('centerMapToCurrentPosition');
        this.getMapCmp().setMapCenter(this.getCurrentLocationLatLng());
    },

    /**
     * Get the current gps coordiantes.
     * @returns {L.latLng}
     */
    getCurrentLocationLatLng: function() {
        var geo = this.getMapCmp().getGeo();
        return L.latLng(geo.getLatitude(), geo.getLongitude());
    }
});