angular.module('cfcConnect.controllers').controller('FormDetailsCtrl', function($scope, localStorageService, $state, HttpService) {
	
	$scope.details = {
		show: showDetails($scope.$parent.form.intent),
		values: {
			firstName: '',
			lastName: '',
			gender: 'male',
			age: '26-39',
			family: 'own',
			number: '',
			email: ''
		},
		next: function() {
			$scope.$parent.form.details = $scope.details.values;
			$state.go('form.feedback', {});
		}
	}
	
	$scope.changeGender = function() {
		HttpService.gender($scope.details.values.firstName).then(function(val) {
			$scope.details.values.gender = val;
			$scope.$apply();
		});
	};
	
});

/**
 * @param {String} intent
 * @returns {Object} show
 */
function showDetails(intent) {
	const _firstName = true; // always true
	const _lastName = true; // always true
	var _gender = false;
	var _age = false;
	var _family = false;
	var _number = false;
	const _email = true;
	// connect specific
	if (intent == 'connect') {
		_gender = true;
		_age = true;
		_number = true;
	}
	// team specific
	if (intent == 'team') {
		_age = true;
		_number = true;
	}
	
	// other
	if (intent == 'other') {
		_gender = true;
		_age = true;
		_family = true;
		_number = true;
	}
	
	return {
		firstName: _firstName,
		lastName: _lastName,
		gender: _gender,
		age: _age,
		family: _family,
		number: _number,
		email: _email
	}
}
