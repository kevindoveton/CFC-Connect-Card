angular.module('cfcConnect.controllers').controller('FormFeedbackCtrl', function($scope, localStorageService, $state, HttpService) {
	
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
			$scope.$parent.form.feedback = $scope.feedback.details;
			$scope.$parent.submit($scope.$parent.form);
		}
	}
	
});
