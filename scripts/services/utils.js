/*
 *	General purpouses functions.
 *
 */
BetitChalengeApp.service('utils',['$q',function($q){
	
	this.rejectedPromise = function( reject ) {
		var deferred = $q.defer();
		deferred.reject(reject);
		return deferred.promise;
	};

	this.resolvedPromise = function( data ) {
		var deferred = $q.defer();
		deferred.resolve( data );
		return deferred.promise;
	};

}]);