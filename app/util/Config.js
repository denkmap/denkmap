/**
 * Configuration for denkmap application
 */
Ext.define('Denkmap.util.Config', {
    singleton: true,

    config: {
        /**
         * @cfg {String} version Current version number of application
         **/
        version: '1.1.{BUILD_NR}',

        leafletMap: {
            zoom: 15,
            getTileLayerUrl: function(isRetina) {
                if(isRetina) {
                    return 'http://{s}.tiles.lyrk.org/lr/{z}/{x}/{y}?apikey={apikey}';
                } else {
                    return 'http://{s}.tiles.lyrk.org/ls/{z}/{x}/{y}?apikey={apikey}';
                }
            },
            tileLayerAttribution: 'Data: &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> and &copy; <a href="http://www.geolion.zh.ch/geodatenservice/show?nbid=691">GIS-ZH</a> | Tiles: <a href="http://geodienste.lyrk.de/" target="_blank">Lyrk</a>',
            apiKey: '4099deb66be745a3b4889c3a2b48237c'
        },

        webservices: {
            monument: {
                getUrl: function(latitude, longitude) {
                    return './nearby/' + latitude + ',' + longitude;
                },
                radius: 1000,
                limit: 25
            }
        },

        /**
         * @cfg {Object} zIndex zIndex for components
         * @cfg {Number} [zIndex.overlayLeafletMap=1500] (required) zIndex for panel to overlay leaflet map components
         */
        zIndex: {
            overlayLeafletMap: 1500
        }
    },

    /**
     * @private
     * initializes the configuration
     */
    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
