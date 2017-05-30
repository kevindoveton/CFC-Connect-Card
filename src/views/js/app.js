'use strict';

// Declare app level module which depends on filters, and services
angular.module('cfcConnect', [
	'cfcConnect.controllers',
	'cfcConnect.filters',
	'cfcConnect.services',
	'cfcConnect.directives',
	'ui.router',
	'LocalStorageModule',
	'angularModalService'
]).config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
	// ui router
	$stateProvider.state({
		name: 'form',
		url: '/form',
		templateUrl: '/partials/form.html',
		controller: 'FormCtrl',
		params: {
			form: null
		}
	});
	
	$stateProvider.state({
		name: 'form.buttons',
		url: '/buttons',
		controller: 'FormButtonsCtrl',
		templateUrl: '/partials/form-buttons.html',
	});
	
	$stateProvider.state({
		name: 'form.details',
		url: '/details',
		controller: 'FormDetailsCtrl',
		templateUrl: '/partials/form-details.html',
	});
	
	$stateProvider.state({
		name: 'form.feedback',
		url: '/feedback',
		controller: 'FormFeedbackCtrl',
		templateUrl: '/partials/form-feedback.html',
	});
	
	$stateProvider.state({
		name: 'form.thankyou',
		url: '/thankyou',
		controller: 'FormThankyouCtrl',
		templateUrl: '/partials/form-thankyou.html',
	});
	
	$stateProvider.state({
		name: 'login',
		url: '/login',
		templateUrl: '/partials/login.html',
		controller: 'LoginCtrl'
	});
	
	$stateProvider.state({
		name: 'admin',
		url: '/admin',
		templateUrl: '/partials/admin.html',
		controller: 'AdminCtrl',
		params: {}
	});
	
	// default route
	$urlRouterProvider.otherwise('/form/buttons');
	
	localStorageServiceProvider.setPrefix('cfcConnect');
	localStorageServiceProvider.setStorageCookie(10*365, '/', false); // expire in ten years

});
