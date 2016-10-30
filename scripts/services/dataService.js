/**
 * Service to load data from server.
 * Static data can be loaded asynchronously or can be loaded at start with 'init'
 * function. 
 */
BetitChalengeApp.service('dataService', ['$http','utils',function($http,utils){

	var countriesList = null;
	var $this = this;

	this.loadCountriesList = function() {
		if( countriesList == null ) {
			countriesList = [];
			return $http.get('/country-list').then(function(response){
				list = response.data;
				for( var i in list )
					countriesList.push(list[i]);

				return countriesList;
			});
		} else
			return utils.resolvedPromise(countriesList);
	};

	this.init = function() {
		return this.loadCountriesList();
	};
}]);