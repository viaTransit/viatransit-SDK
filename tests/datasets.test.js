//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const datasetsAssets = require('./assets/datasets');
const datasets1 = new viatransit.Datasets();
const datasets2 = new viatransit.Datasets();

describe('Datasets', () => {

    describe('Model', () => {

        it('should be properly filled from viaTransit API format', () => {
            datasets1.fill(datasetsAssets.datasetsAPI);
            assert.strictEqual(datasets1.id, '2684335908');
            assert.strictEqual(datasets1.uploadedBy, 'userId');
            assert.strictEqual(datasets1.verified, true);
            assert.isObject(datasets1.feature);
        });

        it('should be properly filled from viaTransit DB format', () => {
            datasets2.fillFromDatabase(datasetsAssets.datasetsDB);
            assert.strictEqual(datasets2.id, '2684335908');
            assert.strictEqual(datasets2.uploadedBy, 'userId');
            assert.strictEqual(datasets2.verified, false);
            assert.isObject(datasets2.feature);
        });

        it('should be complete', () => {
            assert.isTrue(datasets1.isComplete('parking'));
        })

        it('should be verified', () => {
            assert.isTrue(datasets1.isVerified());
        })

        it('datasets should have a valid type', () => {
            assert.isTrue(datasets1.isVerified());
        })

        it('datasets should have coordinates', () => {
            assert.isTrue(datasets1.isVerified());
        })

        it('datasets should have valid properties', () => {
            assert.isTrue(datasets1.hasProperties('parking'));
        })

        it('should not be verified', () => {
            assert.isFalse(datasets2.isVerified());
        })

        it('datasets should not have a valid type', () => {
            assert.isFalse(datasets2.hasValidType());
        })

        it('datasets should not have coordinates', () => {
            assert.isFalse(datasets2.hasCoordinates());
        })

        it('datasets should not be complete', () => {
            let datasets = new viatransit.Datasets(datasetsAssets.badFeature);                    
            assert.isFalse(datasets.isComplete('parking'));

            datasets = new viatransit.Datasets(datasetsAssets.badFeatureType);
            assert.isFalse(datasets.isComplete('parking'));
            
            datasets = new viatransit.Datasets(datasetsAssets.badFeatureProperties);        
            assert.isFalse(datasets.isComplete('parking'));
        })

        it('should not be complete, missing kind parameter', () => {
            assert.isFalse(datasets1.isComplete());
        })

        it('datasets should not have valid properties', () => {
            assert.isFalse(datasets2.hasProperties('parking'));
        })

        it('datasets should not have valid properties, missing kind parameter', () => {
            assert.isFalse(datasets2.hasProperties());
        });

        it('should find config according properties', () => {
            assert.isObject(datasets1.findConfigProperties('parking'));
        });
        
        it('should not find config', () => {
            assert.isFalse(datasets2.findConfigProperties('parking'));
        });

        it('should works with attributes', () => {
            assert.isNull(datasets1.getAttribute('blabla'));
        });

        it('should get differentes kinds of datasets', () => {
            assert.isArray(datasets1.getKinds());
            assert.isString(datasets1.getKinds()[0]);
        });

        it('should not get feature properties, wrong kind', () => {
            const properties = viatransit.Utils.getDatasetsFeatureProperties('WRONG_KIND');
            assert.isNull(properties);
        });

        it('should get feature properties according a kind', () => {
            const properties = viatransit.Utils.getDatasetsFeatureProperties('cycleways');
            assert.isArray(properties);
        });

    });

});