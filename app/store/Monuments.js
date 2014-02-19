/**
 * Store for monuments.
 */
Ext.define('Denkmap.store.Monuments', {
    requires: ['Ext.data.proxy.Rest'],
    extend: 'Ext.data.Store',
    config: {
        autoLoad: false,
        model: 'Denkmap.model.Monument',
        proxy: {
            type: 'rest',
            url: './nearby/0,0',
            pageParam: false,
            startParam: false,
            extraParams: {
                'limit': Denkmap.util.Config.getWebservices().monument.limit,
                'radius': Denkmap.util.Config.getWebservices().monument.radius
            },
            reader: {
                type: 'json'
            }
        }
    }
});