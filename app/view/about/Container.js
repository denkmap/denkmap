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
                                'organised by <a href="http://www.stadt-zuerich.ch/opendata">Open Data Zürich</a>.</p>' +
                            '</div>' +
                            '<dl class="denkmap-definitionlist">' +
                                '<dt>Version</dt>' +
                                '<dd>' + Denkmap.util.Config.getVersion() + '</dd>' +
                                '<dt>More Information</dt>' +
                                '<dd>Wiki: <a href="http://make.opendata.ch/wiki/project:denkmalfuehrer">make.opendata.ch</a></dd>' +
                                '<dd>Report a bug: <a href="https://github.com/denkmap/denkmap/issues">GitHub</a></dd>' +
                                '<dt>Team</dt>' +
                                '<dd>Pirmin Kalberer</dd>' +
                                '<dd>Thomas Husmann</dd>' +
                                '<dd>Stefan Oderbolz</dd>' +
                                '<dd>Adi Herzog</dd>' +
                                '<dd>Priska Haller</dd>' +
                                '<dd>Andi Vonlaufen</dd>' +
                                '<dd>Beat Estermann</dd>' +
                                '<dd>Oliver Berchtold</dd>' +
                                '<dt>Credits</dt>' +
                                '<dd>Map data: <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a></dd>' +
                                '<dd>Tiles: <a href="http://geodienste.lyrk.de/" target="_blank">Lyrk</a> (<a href="https://geodienste.lyrk.de/copyright" target="_blank">Copyright</a>)</dd>' +
                                '<dd>Base data: <a href="http://www.geolion.zh.ch/geodatenservice/show?nbid=935" target="_blank">Geodaten &copy; GIS-ZH</a> (License: <a href="http://www.geolion.zh.ch/GIS-ZH%20Lizenz.pdf" target="_blank">GIS-ZH Lizenz</a>)</dd>' +
                            '</dl>' +
                        '</div>'
            }
        ]
    }
});
