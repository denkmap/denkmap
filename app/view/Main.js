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
        'Denkmap.view.map.NavigationView',
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
                xtype: 'mapnavigationview'
            },
            {
                xtype: 'aboutcontainer'
            }
        ]
    }
});
