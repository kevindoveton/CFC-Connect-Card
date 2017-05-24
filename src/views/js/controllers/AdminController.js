angular.module('cfcConnect.controllers').controller('AdminCtrl', function($scope, localStorageService, $state, HttpService) {	
	$scope.rows = [];
	HttpService.getAllCards().then(function(d) {
		console.log(d);
		for (var i = 0; i < d.length; i++) {
			var card = d[i];
			var _name = card.details.firstName;
			if (typeof(card.details.lastName) !== 'undefined') {
				_name += ' ' + card.details.lastName;
			}
			var _intent = '';
			switch(card.intent) {
				case 'prayer': 
					_intent = 'Prayer Request';
					break;
				case 'connect':
					_intent = 'Get Connected';
					break;
				default:
					_intent = 'Other';
					break;
			}
			
			$scope.rows.push({
				name: _name,
				intent: _intent
			});
		}
		$scope.$apply();
	});
});
