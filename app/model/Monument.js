/**
 * Model for a monument
 */
Ext.define('Denkmap.model.Monument', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: '_id',

        fields: [
            { name: '_id', type: 'auto' },
            { name: 'geometry', type: 'auto' },
            { name: 'properties', type: 'auto' }
        ]
    }
});