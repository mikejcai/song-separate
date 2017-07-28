(function() {
	'use strict';

	angular
		.module('app')
		.controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['$scope', '$http', 'dataService'];

	function mainCtrl($scope, $http, dataService) {

		$scope.form1Focused = false;
		$scope.showForm1 = true;
		$scope.showForm2 = false;
		$scope.collapseForm2 = false;


		var vm = this;
		vm.matchedSongs = [];
		vm.recomdSongs = [];
		vm.numRecs = 20;
		vm.frac = 25;
		vm.selectedSongID = '';
		vm.queryBySong = queryBySong;
		vm.queryRecom = queryRecom;

		/*============================================
		=            function definitions            =
		============================================*/
		

		function queryBySong (song, artist) {
			// $scope.form1Focused = false;

			dataService.getSongMatches(song, artist)
				.then(function(data) {
					vm.matchedSongs = data;
					if (vm.matchedSongs.length > 0) {
						$scope.showForm2 = true;
					}
					console.log(vm.matchedSongs);
				});

		}

		function queryRecom(numRecs, frac, songID) {
			var selectedArtistID = '';
			for (var i = 0; i < vm.matchedSongs.length; i++) {

				if (vm.matchedSongs[i].songId === songID) {
					console.log('here');
					selectedArtistID = vm.matchedSongs[i].artistId;
					break;
				}
			}

			console.log('selectedartist', selectedArtistID);

			dataService.getRecommendedSongs(songID, selectedArtistID, numRecs, frac)
				.then(function(data) {
					$scope.showForm1 = false;
					vm.recomdSongs = data;
					console.log(data);
				});

		}
		
		/*=====  End of function definitions  ======*/
	}
})();