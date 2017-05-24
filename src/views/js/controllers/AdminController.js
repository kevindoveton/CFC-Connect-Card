angular.module('cfcConnect.controllers').controller('AdminCtrl', function($scope, localStorageService, $state, HttpService, ModalService) {	
	$scope.rows = [];
	$scope.loading = true; // show loader
	HttpService.getAllCards().then(function(d) {
		
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
				intent: _intent,
				details: card.details,
				feedback: card.feedback,
				uuid: card.uuid
			});
		}
		$scope.loading = false;
		$scope.$apply();
	});
	
	$scope.showCard = function(_card) {
		ModalService.showModal({
			templateUrl: 'modals/single-card.html',
			controller: 'ModalAdminCardCtrl',
			inputs: {
				card: _card
			}
		}).then(function(modal) {
			modal.close.then(function(result) {
			
			});
		});
	}
	
});
