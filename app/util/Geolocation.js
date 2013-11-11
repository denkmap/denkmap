/**
 * Geolocation util.
 */
Ext.define('Denkmap.util.Geolocation', {
    extend: 'Ext.util.Geolocation',

    config: {
        available: false,
        autoUpdate: false,
        timeout: 20000,

        listeners: {
            locationupdate: function(geo, eOpts) {
                geo.setAvailable(true);
            },
            locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message, eOpts) {
                geo.setAvailable(false);
            }
        }
    }
});