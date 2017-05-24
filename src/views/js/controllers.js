'use strict';

/* Controllers */
angular.module('cfcConnect.controllers', []).controller('AppCtrl', function ($scope, $rootScope, $http, $templateCache) {

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 		
		// state change
		$scope.loading = true;
		console.log('start')
	})

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
		$scope.loading = false;
	});
	
});
