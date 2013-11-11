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
                            '<div class="introduction">' +
                                '<p>This project was started at the <a href="http://opendata.ch/projects/open-data-zuerich-hacknights/">Zurich Hacknights</a> ' +
                                'organised by <a href="www.stadt-zuerich.ch/opendata">Open Data Zürich</a>.</p>' +
                            '</div>' +
                            '<dl class="denkmap-definitionlist">' +
                                '<dt>Version</dt>' +
                                '<dd>' + Denkmap.util.Config.getVersion() + '</dd>' +
                                '<dt>More Information</dt>' +
                                '<dd>Wiki: <a href="http://make.opendata.ch/wiki/project:denkmalfuehrer">make.opendata.ch</a></dd>' +
                                '<dd>Report a bug: <a href="https://github.com/denkmap/denkmap/issues">GitHub</a></dd>' +
                                '<dt>Team</dt>' +
                                '<dd>Stefan Oderbolz</dd>' +
                                '<dd>Thomas Husmann</dd>' +
                                '<dd>Adi Herzog</dd>' +
                                '<dd>Priska Haller</dd>' +
                                '<dd>Andi</dd>' +
                                '<dd>Beat Estermann</dd>' +
                                '<dd>Pirmin Kalberer</dd>' +
                            '</dl>' +
                        '</div>'
            }
        ]
    }
});
