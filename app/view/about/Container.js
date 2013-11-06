/**
 * Main container for about tab.
 */
Ext.define('Denkmap.view.about.Container', {
    extend: 'Ext.Container',
    alias: 'widget.aboutcontainer',
    requires: [
        'Ext.TitleBar'
    ],

    config: {
        title: 'About',
        url: 'about',
        id: 'aboutContainer',
        iconCls: 'lab',
        layout: 'vbox',
        scrollable: true,
        items: [
            {
                xtype: 'titlebar',
                cls: 'titlebar',
                docked: 'top',
                title: 'About Denkmap'
            },
            {
                html:   '<div class="about-content">' +
                    '<div class="logo">' +
                    '<img src="./resources/images/denkmap-logo.png" />' +
                    '</div>' +
                    '</div>'
            }
        ]
    }
});