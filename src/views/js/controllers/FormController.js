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
	$scope.setIntent = function(_intent) {
		$scope.intent = _intent;
		_showDetails = showDetails(_intent);
		$state.go('form.details', {
			form: {
				intent: _intent,
				uuid: _uuid
			}
		});
	}
	
	$scope.details = {
		show: _showDetails,
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
			var form = $state.params.form;
			console.log(form);
			form.details = $scope.details.values;
			$state.go('form.feedback', {
				form: form
			});
		}
	}
	
	$scope.changeGender = function() {
		HttpService.gender($scope.details.values.firstName).then(function(val) {
			$scope.details.values.gender = val;
			$scope.$apply();
		});
	};
	
	var _uuid = localStorageService.get('uuid');
	if (_uuid == null) {
		// technically this could conflict - but i doubt it would ever happen
		_uuid = (Date.now() + navigator.product + navigator.userAgent + history.length).hashCode();
		localStorageService.set('uuid', _uuid);
	}
	
	// TODO: analyse who uses this most then update default
	var service = 'together'; // most people go to together
	
	var now = new Date();
	// check if day is sunday
	if (now.getDay() == 0) {
		service = 'early';
		
		// past 10am 
		if (now.getHours() > 10) {
			service = 'together';
		}
		
		// past 6pm
		if (now.getHours() > 18) {
			service = 'live';
		}
	}
	
	$scope.feedback = {
		show: {
			service: true,
			likeMost: true,
			likeLeast: true,
			feedback: true
		},
		details: {
			service: service,
			likeMost: '',
			likeLeast: '',
			feedback: ''
		},
		submit: function() {
			$scope.loading = true;
			var form = $state.params.form;
			form.feedback = $scope.feedback.details;
			console.log(form);
			HttpService.postCard(form).then(function() {
				$scope.loading = false;
				$scope.$apply();
				$state.go('form.thankyou')
			});
		}
	}
	
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
