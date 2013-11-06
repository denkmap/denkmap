/**
 * Main tabpanel of application.
 */
Ext.define('Denkmap.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    id: 'mainTabPanel',
    requires: [
        'Ext.TitleBar',
        'Denkmap.view.about.Container',
        'Ext.ux.LeafletMap'
    ],

    config: {
        tabBar: {
            docked: 'bottom',
            layout: {
                pack: 'start'
            }
        },

        items: [
            {
                title: 'Map',
                iconCls: 'map',
                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Denkmap'
                },

                // Ext.ux.LeafletMap Component
                xtype: 'leafletmap',
                id: 'leafletmap',
                useCurrentLocation: true,
                autoMapCenter: false,
                enableOwnPositionMarker: true,
                mapOptions: {
                    zoom: 15
                },

                //tileLayerUrl: 'http://{s}.tile.cloudmade.com/{apikey}/{styleId}@2x/256/{z}/{x}/{y}.png',
                tileLayerOptions: {
                    //apikey: '14841398f0e34016bf1a754840465247',
                    styleId: 997,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> and  &copy; <a href="http://www.geolion.zh.ch/geodatenservice/show?nbid=691">Geodaten GIS-ZH</a>',
                    detectRetina: true
                }
            },
            {
                xtype: 'aboutcontainer'
            }
        ]
    }
});
