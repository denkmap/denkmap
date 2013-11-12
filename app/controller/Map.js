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
        }
    },

    /**
     * @private
     */
    init: function(){
        var me = this;
        me.getApplication().on({
            geolocationready: { fn: me._createLeafletMapWrapper, scope: me }
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
     * Creates LeafletMap component. Is called right after the user's geolocation is available.
     * @param {Denkmap.util.Geolocation} geo
     */
    _createLeafletMapWrapper: function (geo) {
        var me = this;
        console.log("Map create");
        me._centerMapToCurrentPosition(geo);
        me._loadGeoJsonLayer('./resources/remote/denkmal.geojson');
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