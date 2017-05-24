angular.module('cfcConnect.controllers').controller('ModalAdminCardCtrl', function($scope, $state, close, card) {
	$scope.card = card;
	$scope.close = close;
});
