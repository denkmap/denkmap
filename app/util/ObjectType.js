/**
 * Handle object types
 */
Ext.define('Denkmap.util.ObjectType', {

    config: {
        /**
         * @cfg {object} default style of object styles
         **/
        defaultStyle: {
            radius: 11,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        },

        /**
         * @cfg {object} All available object types
         **/
        objectTypes: {
            bruecke: {
                regex: new RegExp("Brücke", "gi"),
                style: {
                    fillColor: "#CC9933"
                }
            },
            bauernhaus: {
                regex: new RegExp("Bauernh", "gi"),
                style: {
                    fillColor: "#996633"
                }
            },
            schulhaus: {
                regex: new RegExp("(Schul|ETH|Uni|Konservatorium|Institut|Klinik)", "gi"),
                style: {
                    fillColor: "#CCFF66"
                }
            },
            bahnhof: {
                regex: new RegExp("Bahn", "gi"),
                style: {
                    fillColor: "#FF0000"
                }
            },
            schloss: {
                regex: new RegExp("(Schloss|Burg)", "gi"),
                style: {
                    fillColor: "#00CCFF"
                }
            },
            villa: {
                regex: new RegExp("Villa", "gi"),
                style: {
                    fillColor: "#006600"
                }
            },
            kirche: {
                regex: new RegExp("(Kirch|Münster|Synagoge)", "gi"),
                style: {
                    fillColor: "#FF00FF"
                }
            },
            garten: {
                regex: new RegExp("Garten", "gi"),
                style: {
                    fillColor: "#66CC66"
                }
            },
            amt: {
                regex: new RegExp("(Amt|Ämt|Verwaltung|Kanton|Schweiz|Bezirk)", "gi"),
                style: {
                    fillColor: "#EAA400"
                }
            },
            kultur: {
                regex: new RegExp("(Museum|Theater|Tonhalle|Kultur)", "gi"),
                style: {
                    fillColor: "#CB59E8"
                }
            },
            hotel: {
                regex: new RegExp("(Hotel)", "gi"),
                style: {
                    fillColor: "#FF0099"
                }
            },
            haus: {
                regex: new RegExp("(Haus|Häuser|Heim|Altbau|Neubau|Bau|Palais|Herrschaft|Zier)", "gi"),
                style: {
                    fillColor: "#669999"
                }
            }
        }
    },

    /**
     * @private
     * initializes the configuration
     */
    constructor: function(config) {
        this.initConfig(config);
        return this;
    },


    /**
     * @public
     * Return the styling for a requested monument
     */
    getStyleForMonument: function(monument) {
        var monumentType,
            index,
            style = {},
            types = [monument.baugruppe, monument.objtext];

        for (index = 0; index < types.length; ++index) {
            monumentType = types[index];
            if (!monumentType) {
                continue;
            }
            return this._getStyleForMonumentType(monumentType);
        }
        Ext.apply(style, this.getDefaultStyle());
        return style;
    },

    /**
     * @private
     * Returns the style for a monument type or returns a default style
     */
    _getStyleForMonumentType: function(monumentType) {
        var objectType,
            objectTypeName,
            style = {},
            objectTypes = this.getObjectTypes();

        Ext.apply(style, this.getDefaultStyle());

        for (objectTypeName in objectTypes) {
            objectType = objectTypes[objectTypeName];
            if (monumentType.match(objectType.regex)) {
                Ext.apply(style, objectType.style);
                return style;
            }
        }
        return style;
    }

});
