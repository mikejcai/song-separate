(function() {
	'use strict';

	angular
		.module('app')
		.factory('dataService', dataService);

	dataService.$inject = ['$http'];

	function dataService($http) {
		var self = this;

		self.services = {
			getSongMatches: getSongMatches,
			getRecommendedSongs: getRecommendedSongs
		};

		return self.services;

		/*============================================
		=            function definitions            =
		============================================*/
		
		function getSongMatches (song, artist) {
			var query_url = 'http://10.2.62.101:9010/SongSelection?song_name=' + song + '&artist_name=' + artist;
			//var query_url = 'api/query1.json';
			
			return $http.get(query_url)
						.then(function(results) {
							return results.data;
						}, function(error) {
							console.log('Failed to load song matches: ', error);
						});
		}

		function getRecommendedSongs (refSongId, refArtistId, numRecSongs, frac) {
			var query_url = 'http://10.2.62.101:9010/SongRecommendation?song_key=' + refSongId 
			 	+ '&artist_key=' + refArtistId 
			 	+ '&num_recs=' + numRecSongs 
			 	+ '&num_same_artist=' + Math.floor(frac*numRecSongs/100)
			// 	+ '&sim_artist_param=' + simArtistParam
			// 	+ '&user_name=' + userName 
			// 	+ '&sim_user_param=' + simUserParam;

			//var query_url = 'api/query2.json';

			return $http.get(query_url)
						.then(function(results) {
							console.log(refSongId, refArtistId, numRecSongs, frac);
							return results.data;
						}, function(error) {
							console.log('Failed to load recomended songs: ', error);
						});
		}

		/*=====  End of function definitions  ======*/
	}
})();