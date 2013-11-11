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
            popUp;
        console.log("Load GeoJSON layer: ", geojsonURL);

        popUp = function(feature, layer) {
            layer.bindPopup(
                "<ul>" +
                "<li><b>Baugruppe:</b>&nbsp;" + feature.properties.baugruppe + "</li>" +
                "<li><b>Baujahr:</b>&nbsp;" + feature.properties.baujahr + "</li>" +
                "</ul>"
            );
        };

        geojsonLayer = new L.GeoJSON.AJAX(
            geojsonURL,
            {
                onEachFeature: popUp,
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: "#ff7800",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                }

            }
        );
         console.log(geojsonLayer);

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
        this.getMapCmp().setMapCenter(this.getCurrentLocationLatLng(geo));
    },

    /**
     * Get the current gps coordiantes.
     * @returns {L.latLng}
     */
    getCurrentLocationLatLng: function(geo) {
        return L.latLng(geo.getLatitude(), geo.getLongitude());
    }
});