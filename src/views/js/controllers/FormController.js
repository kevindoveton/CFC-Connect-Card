String.prototype.hashCode = function() {
	var hash = 0, i, chr;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		chr   = this.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

angular.module('cfcConnect.controllers').controller('FormCtrl', function($scope, localStorageService, $state, HttpService) {	
	$scope.intent = function(intent) {
		$state.go('form.details', {
			form: {
				intent: intent
			}
		});
	}
	
	$scope.details = {
		show: {
			firstName: true,
			lastName: true,
			gender: true,
			age: true,
			family: true,
			number: true,
			email: true
		},
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
	
	var uuid = localStorageService.get('uuid');
	if (uuid == null) {
		// technically this could conflict - but i doubt it would ever happen
		uuid = (Date.now() + navigator.product + navigator.userAgent + history.length).hashCode();
		localStorageService.set('uuid', uuid);
	}
	
	var service = 'early';
	var now = new Date();
	
	// check if day is sunday
	if (now.getDay() == 0) {
		
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
			var form = $state.params.form;
			form.feedback = $scope.feedback.details;
			console.log(form);
		}
	}
	
});
