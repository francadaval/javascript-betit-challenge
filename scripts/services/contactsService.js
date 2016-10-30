/**
 *	Service that provides functions for contacts management.
 *
 *	Provided functions return promises.
 */

BetitChalengeApp.service('contactsService',['localStorageService','utils',
	function(storage,utils) {

		/**
		 * Storages contacts list in a single object 'contacts' that is stored
		 * with localStorageService.
		 */
		const CONTACT_LIST_KEY = 'contactsList';
		var contacts = {};

		/**
		 * Add a new contact to the list.
		 * Verify email unicity.
		 * Return a promise.
		 */
		this.addContact = function( contact ) {
			if( angular.isDefined(contacts[contact.email]) )
				return utils.rejectedPromise();

			contacts[contact.email] = contact;	
			return storage.save( CONTACT_LIST_KEY, contacts );
		};

		/**
		 * Update contact in the list.
		 * Verify that email exists.
		 * Return a promise.
		 */
		this.updateContact = function( contact ) {
			if( !angular.isDefined(contacts[contact.email]) )
				return utils.rejectedPromise();

			contacts[contact.email] = contact;	
			return storage.save( CONTACT_LIST_KEY, contacts );
		};

		/**
		 * Add a new contact to the list.
		 * Verify that email exists.
		 * Return a promise.
		 */
		this.removeContact = function( contact ) {
			if( !angular.isDefined(contacts[contact.email]) )
				return utils.rejectedPromise();

			delete contacts[contact.email];
			return storage.save( CONTACT_LIST_KEY, contacts );
		};

		/**
		 * Reads contacts list from storageservice.
		 * If list doesn't exists creates a new one.
		 */
		this.readContactsList = function() {
			return storage.read(CONTACT_LIST_KEY).then( function(list){
				if( list != null )
					angular.merge(contacts,list);

				return contacts;
			}, function(){
				return storage.save( CONTACT_LIST_KEY, contacts ).then(function(){
					return contacts;
				});
			});
		}
	}
]);