/*===========   Reading Service    ===========*/
angular.module('cfcConnect').factory('HttpService', function ($http, $q, localStorageService, $state) {
	return {
		gender: function(name) {
			return new Promise(function(accept, reject) {
				$http({
					method: 'GET',
					url: 'https://api.genderize.io/',
					params: {
						name: name
					}
				}).then(function(success) {
					try {
						if (success.data.gender !== null) {
							accept(success.data.gender);
						}
						else {
							reject(false);
						}
					}
					catch(err) {
						console.warn(err);
						reject(false);
					}
				});
			})
		},
		
		postCard: function(obj) {
			return new Promise(function(accept, reject) {
				$http({
					method: 'POST',
					url: '/api/v1/cards/',
					headers: {
						'Content-Type': "application/json"
					},
					data: obj
				}).then(function(success) {
					try {
						if (success.data !== null) {
							accept(success.data);
						}
						else {
							reject(false);
						}
					}
					catch(err) {
						console.warn(err);
						reject(false);
					}
				});
			})
		},
		
		getAllCards: function() {
			return new Promise(function(accept, reject) {
				$http({
					method: 'GET',
					url: '/api/v1/cards/',
					params: {}
				}).then(function(success) {
					try {
						if (success.data !== null) {
							accept(success.data);
						}
						else {
							reject(false);
						}
					}
					catch(err) {
						console.warn(err);
						reject(false);
					}
				});
			})
		},
		
		getCardById: function(_id) {
			return new Promise(function(accept, reject) {
				if (typeof(_id) == 'undefined') reject('requires id')
				$http({
					method: 'GET',
					url: '/api/v1/cards/'+_id,
					params: {}
				}).then(function(success) {
					try {
						if (success.data !== null) {
							accept(success.data);
						}
						else {
							reject(false);
						}
					}
					catch(err) {
						console.warn(err);
						reject(false);
					}
				});
			})
		}
	}
});
