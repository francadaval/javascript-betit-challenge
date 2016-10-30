/*
 *	Betit challenege for javascript developer
 *	Francisco José Cadaval Arrola
 */
var BetitChalengeApp = angular.module('BetitChalengeApp', ['ngMaterial','ngMessages']);

/*
 *	Config, define Angular Material Theming
 *
 */
BetitChalengeApp.config( ['$mdThemingProvider','$mdAriaProvider',
	function($mdThemingProvider,$mdAriaProvider){
		$mdThemingProvider
			.theme('default')
			.primaryPalette('blue');

		$mdAriaProvider.disableWarnings();
	}
]);

/*
 *	Main controller, it controls main view.
 *
 */
BetitChalengeApp.controller('MainController',['$scope','contactsService','dataService',
	'$mdDialog', function($scope,contactsService,dataService,$mdDialog){

		var views = {
			contactsList: {
				title: 'Contacts List',
				element: 'bca-contacts-list'
			},
			contactForm: {
				title: 'Contact Form',
				element: 'bca-contact-form'
			}
		};

		/**
		 *	Functions to set app view
		 */
		$scope.newContactView = function(){
			$scope.edit_contact = null;
			$scope.view = views.contactForm;
		};

		$scope.editContactView = function(contact){
			$scope.edit_contact = angular.extend({},contact);
			$scope.view = views.contactForm;	
		};

		$scope.contactsListView = function(){
			$scope.view = views.contactsList;
		};

		/**
		 *	Functions to open generic dialogs
		 */
		$scope.alertDialog = function( title, text, ok_text ) {
			var dialog = $mdDialog.alert()
				.title(title)
				.textContent(text)
				.ok(ok_text);

			return $mdDialog.show(dialog);
		};

		$scope.confirmDialog = function( title, text, ok_text, cancel_text ) {
			var dialog = $mdDialog.confirm()
				.title( title )
				.textContent( text )
				.ok( ok_text )
				.cancel( cancel_text );

			return $mdDialog.show(dialog);
		};

		// Initialization
		contactsService.readContactsList().then(function(contacts){
			$scope.contacts = contacts;
			dataService.init().then(function(){
				$scope.view = views.contactsList;
			});
		});
	}
]);

/*
 *	This directive loads main view template when $scope.view changes.
 *
 */
BetitChalengeApp.directive('bcaView',['$compile',function($compile){
	return {
		restrict: 'E',
		link: function( scope, element, attrs ) {
			scope.$watch('view',function() {
				if( scope.view ) {
					var viewElementStr = '<' + scope.view.element + '></' + scope.view.element + '>';
					element.empty();
					element.append($compile(viewElementStr)(scope));
				}
			});
		}
	};
}]);

/*
 *	Filter that changes ISO 3166-1-alpha-2 codes to English country names.
 *	Defined as 'stateful' to allow refreshig when list is asynchronously loaded.
 */
BetitChalengeApp.filter('country',['dataService','$timeout',
	function(dataService,$timeout){

		var countriesList;
		dataService.loadCountriesList().then(function(list){
			countriesList = list;
		});

		function countryFilter(code) {
			for( var i in countriesList ) {
				var country = countriesList[i];
				if( country.code == code )
					return country.name;
			}

			return code;
		};

		countryFilter.$stateful = true;

		return countryFilter;
	}
]);