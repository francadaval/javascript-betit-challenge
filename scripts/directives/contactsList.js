/**
 * Directive to show contacts list.
 */

BetitChalengeApp.directive('bcaContactsList',function(){
	return {
		retrict: 'E',
		controller: 'ContactsListController',
		templateUrl: '/templates/contactsList.html'
	}
});


BetitChalengeApp.controller('ContactsListController',['$scope', function($scope) {

	$scope.isEmptyList = function() {
		return Object.keys($scope.contacts).length == 0;
	}

}]);

