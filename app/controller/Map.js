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
            mapRefreshButton: '#mapNavigationView .button[cls=mapRefreshButton]',
            mapLoadingIcon: '#mapNavigationView .button[cls=mapLoadingIcon]',
            mapCmp: '#leafletmap'
        },
        control: {
            mapNavigationView: {
                back: '_onMapNavigationViewDetailViewBack'
            },
            mapCenterButton: {
                tap: '_onMapNavigationViewCenterButtonTap'
            },
            mapRefreshButton: {
                tap: '_onMapNavigationViewRefreshButtonTap'
            }
        },

        lLayerGroup: null,
        lLayerControl: null,
        markersLoaded: false,
        map: null,

        monumentsStore: null
    },

    /**
     * @private
     */
    init: function(){
        var me = this;
        me.setLLayerGroup(window.L.layerGroup());

        me.getApplication().on({
            geolocationready: { fn: me._setupLeafletMap, scope: me },
            locationupdate: { fn: me._updateLeafletMap, scope: me }
        });


        this.setMonumentsStore(Ext.getStore('Monuments'));
        me.getMonumentsStore().on({
            load: {
                fn: me._updateMarkersOnMap,
                scope: me
            }
        });
        console.log("map init finsihed");
    },

    /**
     * @private
     * Sets up LeafletMap component. Is called right after the user's geolocation is available.
     * @param {Denkmap.util.Geolocation} geo
     */
    _setupLeafletMap: function (geo) {
        var me = this,
            lLayerControl = new window.L.Control.Layers();
        console.log("Setup map");

        lLayerControl.addTo(me.getMapCmp().getMap());
        me.setLLayerControl(lLayerControl);
        me.getLLayerControl().addOverlay(me.getLLayerGroup(), 'Monuments');
        me._enableAllLayers();
        lLayerControl.removeFrom(me.getMapCmp().getMap());
        me.setMap(me.getMapCmp().getMap());
        me.getMap().on('moveend', me._updateLeafletMap, me);
        me._updateLeafletMap();
    },

    /**
     * @private
     * Makes the layer visible and remove the control widget
     * @param geo
     */
    _enableAllLayers: function() {
        //this is currently an ugly hack as no clean method to enable a layer is known
        var inputNodeList = document.getElementsByClassName('leaflet-control-layers-selector'),
            i;
        for (i = 0; i<inputNodeList.length; i++) { inputNodeList[i].checked=true; }
        this.getLLayerControl()._onInputClick();
    },

    /**
     * @private
     * Updates LeafletMap component. Is called right after a locationupdate.
     */
    _updateLeafletMap: function() {
        var me = this,
            map = me.getMap(),
            proxyUrl;
        console.log("Map update");

        proxyUrl = Denkmap.util.Config.getWebservices().monument.getUrl(
            map.getCenter().lat,
            map.getCenter().lng
        );
        me.getMonumentsStore().getProxy().setUrl(proxyUrl);
        me.getMonumentsStore().load();
    },

    _updateMarkersOnMap: function() {
        var me = this;
        me.getLLayerGroup().clearLayers();

        me.getMonumentsStore().each(function(monument) {
            me.getLLayerGroup().addLayer(me._createLMarkerFromModel(monument));
        });
        me.setMarkersLoaded(true);
    },

    /**
     * @private
     * @param record
     * @returns {L.marker} marker
     */
    _createLMarkerFromModel: function(model) {
        var me = this,
            lat = model.get('geometry').coordinates[1],
            lon = model.get('geometry').coordinates[0],
            objectType = Ext.create('Denkmap.util.ObjectType'),
            style = objectType.getStyleForMonument(model.get('properties')),
            marker = window.L.circleMarker([lat, lon], style),
            popupHtml;

        popupHtml = "<ul>";
        if (model.get('properties').baugruppe) {
            popupHtml += "<li><b>Baugruppe:</b>&nbsp;" + model.get('properties').baugruppe + "</li>";
        }
        if (model.get('properties').objtext) {
            popupHtml += "<li><b>Objekt:</b>&nbsp;" + model.get('properties').objtext + "</li>";
        }
        if (model.get('properties').baujahr) {
            popupHtml += "<li><b>Baujahr:</b>&nbsp;" + model.get('properties').baujahr + "</li>";
        }
        popupHtml += "</ul>";

        marker.bindPopup(popupHtml);
        marker.record = model;

        return marker;
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
    _onMapNavigationViewRefreshButtonTap: function () {
        var me = this;
        me.setMarkersLoaded(false);
        me._updateLeafletMap(me.getMapCmp().getGeo());
        me._enterLoadingState(true);
    },

    /**
     * @private
     */
    _centerMapToCurrentPosition: function(geo) {
        this.getMapCmp().setMapCenter(this.getCurrentLocationLatLng());
    },

    /**
     * @private
     * @param {boolean} silentLoading Indicates whether a blocking loading message should be overlaid or not.
     * @param {boolean} recursiveCall Private param that should always be false when called from outside.
     */
    _enterLoadingState: function(silentLoading,recursiveCall) {
        if(!recursiveCall) {
            this._showLoadMask(silentLoading);
        }
        if(this.getMarkersLoaded()) {
            this._hideLoadMask(silentLoading);
        } else {
            Ext.defer(this._enterLoadingState, 200, this, [silentLoading,true]);
        }
    },


    /**
     * @private
     */
    _showLoadMask: function(silentLoading) {
        console.log("show load mask");
        this.getMapCenterButton().disable();
        this.getMapRefreshButton().hide();
        this.getMapLoadingIcon().show();
        if(!silentLoading) {
            this.getMapNavigationView().setMasked({
                xtype: 'loadmask',
                message: "Loading...",
                zIndex: Denkmap.util.Config.getZIndex().overlayLeafletMap
            });
        }
    },

    /**
     * @private
     */
    _hideLoadMask: function(silentLoading) {
        console.log("hide load mask");
        this.getMapLoadingIcon().hide();
        this.getMapCenterButton().enable();
        this.getMapRefreshButton().show();
        if(!silentLoading) {this.getMapNavigationView().setMasked(false);}
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
