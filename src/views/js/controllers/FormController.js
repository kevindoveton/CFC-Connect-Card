String.prototype.hashCode = function() {
	var hash = 0;
	if (this.length === 0) return hash;
	for (var i = 0; i < this.length; i++) {
		var chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};
var _showDetails = showDetails('other')
angular.module('cfcConnect.controllers').controller('FormCtrl', function($scope, localStorageService, $state, HttpService) {
	
	$scope.getUuid = getUuid;
	
	$scope.form = {};
	
	$scope.submit = function(form) {
		HttpService.postCard(form).then(function() {
			$scope.loading = false;
			$scope.$apply();
			$state.go('form.thankyou')
		});
	}
	
});

/**
 * @param {Object} Storage Service
 * @returns {String} UUID
 */
function getUuid(storage) {
	var uuid = storage.get('uuid');
	if (uuid == null) {
		// technically this could conflict - but i doubt it would ever happen
		uuid = (Date.now() + navigator.product + navigator.userAgent + history.length).hashCode();
		storage.set('uuid', uuid);
	}
	
	return uuid;
}
