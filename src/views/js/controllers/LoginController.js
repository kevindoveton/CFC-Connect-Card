angular.module('cfcConnect.controllers').controller('LoginCtrl', function($scope, HttpService, $state) {
	$scope.showError = false;
	// $scope.login = function() {
	// 	HttpService.login({
	// 		username: $scope.username, 
	// 		password: $scope.password
	// 	}).then(function(success) {
	// 		if (success.status == 401) {
	// 			$scope.showError = true;
	// 		}
	// 		else if (success.data.loginStatus) {
	// 			$state.go('admin');
	// 		}
	// 	});
	// }
});
