/*
 *	CRUD Service for local storage
 *	
 *	If localStorage is not available tryes to use sessionStorage.
 *  If neither of those are available store data in local variable in order to 
 *  be able to demostrate functionality.
 *
 *	Although local storage writing and reading are asynchronuous provided functions
 *	return a promise to be able to be substituted by any synchronous or asynchrous
 *  key-value storage system.
 */
BetitChalengeApp.service('localStorageService',['$window','utils',function($window,utils){

	var $this = this;

	/**
	 * Test if 'type' storage is available in current browser.
	 */
	function storageAvailable(type) {
		try {
			var storage = $window[type],
				x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return false;
		}
	};

	/**
	 * Save value with key.
	 */
	function save( key, value ) {
		if( type == 'object' )
			storage[key] = value;
		else
			storage.setItem( key, JSON.stringify(value) );
	};

	/**
	 * Read value with key.
	 */
	function read( key ) {
		if( type == 'object' )
			return angular.isDefined(storage[key]) ? storage[key] : null;
		else
			return JSON.parse( storage.getItem( key ) );
	};

	/**
	 * Read value with key.
	 */
	function remove( key ) {
		if( type == 'object' )
			delete storage[key];
		else
			return storage.removeItem( key );
	};


	/**
	 * At service creation selects available storage.
	 */
	var storage;
	var type;

	if( storageAvailable('localStorage') ) {
		storage = $window.localStorage;
		type = 'local';
	} else if( storageAvailable('sessionStorage') ) {
		storage = $window.sessionStorage;
		type = 'session';
	} else {
		storage = {};
		type = 'object';
	}

	/**
	 * Service provided creation function, verify if key already exists.
	 * Returns promise.
	 */
	this.create = function( key, value ) {
		if( read(key) != null )
			return utils.rejectedPromise();

		save( key, value );
		return utils.resolvedPromise(value);
	};

	/**
	 * Service provided reading. If key doesn't exists returns null in promise
	 * resolution.
	 * Returns promise.
	 */
	this.read = function( key ) {
		var value = read(key);

		return value != null ? utils.resolvedPromise(value) : utils.rejectedPromise();
	};

	/**
	 * Service provided updating function, verify if key already exists.
	 * Returns promise.
	 */
	this.update = function( key, value ) {
		if( read(key) == null )
			return utils.rejectedPromise();

		save( key, value );
		return utils.resolvedPromise();
	};

	/**
	 * Service provided saving function, ignores if key already exists.
	 * Returns promise.
	 */
	this.save = function( key, value ) {
		save( key, value );
		return utils.resolvedPromise();
	};

	/**
	 * Service provided deletion function, verify if key already exists.
	 * Returns promise.
	 */
	this.delete = function( key ) {
		if( read(key) != null )
			return utils.rejectedPromise();
		
		remove( key );
		return utils.resolvedPromise();
	};
}]);