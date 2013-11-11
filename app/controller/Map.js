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

        geojsonLayer = new L.GeoJSON.AJAX(
            geojsonURL,
            {
                onEachFeature: popUp,
                pointToLayer: function (feature, latlng) {
                    /*jshint maxcomplexity:100*/
                    var style = {
                        radius: 11,
                        fillColor: "#ff7800",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    };


                    switch (me._normalizeMonument(feature.properties)) {
                        case "bruecke":
                            style.fillColor = "#CC9933";
                            break;
                        case "bauernhaus":
                            style.fillColor = "#996633";
                            break;
                        case "schulhaus":
                            style.fillColor = "#CCFF66";
                            break;
                        case "bahnhof":
                            style.fillColor = "#FF0000";
                            break;
                        case "schloss":
                            style.fillColor = "#00CCFF";
                            break;
                        case "villa":
                            style.fillColor = "#006600";
                            break;
                        case "kirche":
                            style.fillColor = "#FF00FF";
                            break;
                        case "garten":
                            style.fillColor = "#66CC66";
                            break;
                        case "amt":
                            style.fillColor = "#EAA400";
                            break;
                        case "kultur":
                            style.fillColor = "#CB59E8";
                            break;
                        case "hotel":
                            style.fillColor = "#FF0099";
                            break;
                        case "haus":
                            style.fillColor = "#669999";
                            break;
                    }
                    return L.circleMarker(latlng, style);
                }

            }
        );
        geojsonLayer.addTo(this.getMapCmp().getMap());
        console.log("Added to map");
    },

    /**
     * @private
     * Normalized the monuments to certain types.
     * @param {String} monument
     */
    _normalizeMonument: function (monument) {
        /*jshint maxcomplexity:100*/
        var re,
            monumentType,
            index,
            types;

        if (monument.baugruppe) {
            monumentType = monument.baugruppe;
        } else if (monument.objtext) {
            monumentType = monument.objtext;
        } else {
            return "";
        }

        types = [monument.baugruppe, monument.objtext];
        for (index = 0; index < types.length; ++index) {
            monumentType = types[index];
            if (!monumentType) {
                continue;
            }

            re = new RegExp("Brücke", "gi");
            if (monumentType.match(re)) {
                return "bruecke";
            }
            re = new RegExp("Bauernh", "gi");
            if (monumentType.match(re)) {
                return "bauernhaus";
            }
            re = new RegExp("(Schul|ETH|Uni|Konservatorium|Institut|Klinik)", "gi");
            if (monumentType.match(re)) {
                return "schulhaus";
            }
            re = new RegExp("Bahn", "gi");
            if (monumentType.match(re)) {
                return "bahnhof";
            }
            re = new RegExp("(Schloss|Burg)", "gi");
            if (monumentType.match(re)) {
                return "schloss";
            }
            re = new RegExp("Villa", "gi");
            if (monumentType.match(re)) {
                return "villa";
            }
            re = new RegExp("(Kirch|Münster|Synagoge)", "gi");
            if (monumentType.match(re)) {
                return "kirche";
            }
            re = new RegExp("Garten", "gi");
            if (monumentType.match(re)) {
                return "garten";
            }
            re = new RegExp("(Amt|Ämt|Verwaltung|Kanton|Schweiz)", "gi");
            if (monumentType.match(re)) {
                return "amt";
            }
            re = new RegExp("(Museum|Theater|Tonhalle|Kultur)", "gi");
            if (monumentType.match(re)) {
                return "kultur";
            }
            re = new RegExp("(Hotel)", "gi");
            if (monumentType.match(re)) {
                return "hotel";
            }
            re = new RegExp("(Haus|Häuser|Heim|Altbau|Neubau|Bau|Palais|Herrschaft|Zier)", "gi");
            if (monumentType.match(re)) {
                return "haus";
            }
        }
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