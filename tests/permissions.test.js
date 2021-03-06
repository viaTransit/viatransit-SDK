//Imports
const assert = require('chai').assert;
const viatransit = require('../src/index');

//Assets
const permissionAssets = require('./assets/permissions.js');

describe('Permissions', () => {

    describe('Model', () => {
        it('should be properly filled from Database', () => {
            let permission = new viatransit.Permission();

            permission.fillFromDatabase(permissionAssets.dbFormat);
            assert.typeOf(permission.id, 'string');
            assert.strictEqual(permission.id, "2684335908");
            assert.isArray(permission.permissions);
            for (let perm of permission.permissions) {
                assert.typeOf(perm, 'string');
            }
            assert.isObject(permission.attributes);
        });

        it('should be properly filled from API', () => {
            let permission = new viatransit.Permission();

            permission.fillFromAPI(permissionAssets.apiFormat);
            assert.typeOf(permission.id, 'string');
            assert.strictEqual(permission.id, "342684335908");
            for (let perm of permission.permissions) {
                assert.typeOf(perm, 'string');
            }
            assert.isObject(permission.attributes);
        });

        it('should return false because of user does\'nt have permission', () => {
            let permission = new viatransit.Permission();

            permission.fillFromAPI(permissionAssets.dbFormat);
            assert.strictEqual(permission.hasPermission("user.remove.all"), false);
        });

        it('should return true because of user have permission', () => {
            let permission = new viatransit.Permission();

            permission.fillFromAPI(permissionAssets.dbFormat);
            assert.strictEqual(permission.hasPermission("user.remove.self"), true);
        });

        it('should return false because of user is not master', () => {
            let permission = new viatransit.Permission();

            permission.fillFromAPI(permissionAssets.dbFormat);
            assert.strictEqual(permission.isMaster(), false);
        });
    });
});