angular.module('cfcConnect.controllers').controller('FormButtonsCtrl', function($scope, localStorageService, $state, HttpService) {
	
	const _uuid = $scope.$parent.getUuid(localStorageService);

	$scope.setIntent = function(_intent) {
		$scope.$parent.form.intent = _intent;
		$scope.$parent.form.uuid = _uuid;
		$state.go('form.details', {});
	}
	
});
