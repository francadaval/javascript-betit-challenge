/**
 * Directive to show contacts form.
 */
BetitChalengeApp.directive('bcaContactForm',function(){
	return {
		retrict: 'E',
		controller: 'ContactFormController',
		templateUrl: '/templates/contactForm.html'
	}
});

/**
 * Contacts form's controller
 */
BetitChalengeApp.controller('ContactFormController',['$scope','contactsService','dataService',
	function($scope,contactsService,dataService){

		// Load countries list to populate countrys dropdown.
		dataService.loadCountriesList().then(function(list){
			$scope.countriesList = list;
		});

		/*
		 *	Check if $scope.edit_contact is defined (edit-contact mode) or not
		 *  (new-contact mode).
		 */
		if( $scope.edit_contact != null ) {
			$scope.form_contact = {};
			angular.extend( $scope.form_contact, $scope.edit_contact );
			$scope.editing = true;
		} else {
			$scope.form_contact = {};
			$scope.editing = false;
		}

		function add() {
			contactsService.addContact( $scope.form_contact ).then(function(){
				$scope.contactsListView();
			});
		};

		function update() {
			contactsService.updateContact( $scope.form_contact ).then(function(){
				$scope.alertDialog('Updated contact', 'Contact data has been updated.','Ok')
					.then(function(){
						$scope.contactsListView();
					});
			});
		};

		function updateMail() {
			contactsService.addContact( $scope.form_contact ).then(function(){
				contactsService.removeContact( $scope.edit_contact ).then(function(){
					$scope.alertDialog('Updated contact', 'Contact data has been updated.','Ok')
						.then(function(){
							$scope.contactsListView();
						});
				});
			});
		};

		function remove() {
			contactsService.removeContact( $scope.form_contact ).then(function(){
				$scope.alertDialog('Removed contact', 'Contact data has been removed.','Ok')
					.then(function(){
						$scope.contactsListView();
					});
			});
		};

		/**
		 *	Those scope functions excute actions in contacts data a returns
		 *	to list view.
		 */
		$scope.add = add;

		$scope.update = function() {
			if( $scope.form_contact.email != $scope.edit_contact.email ) {
				$scope.confirmDialog( "Changed email!!", "Are you sure you want "
					+ "to change contact email?", 'Change', 'Cancel' ).then(updateMail);
			} else {
				update();
			}
		};

		$scope.remove = function() {
			$scope.confirmDialog( "Remove contact", "Are you sure you want"
				+ "to remove this contact?", 'Remove', 'Keep' ).then(remove);
		};

		$scope.cancel = function() {
			$scope.contactsListView();
		};
	}
]);