'use strict';
app.controller('AppCtrl', ['$scope', function ($scope) {
	$scope.$menuList = Menu;
	$scope.$functions = angular.getFunctions();
	// config
	$scope.app = {
		name: 'x373241884y',
		version: '2.4.7',
		// for chart colors
		color: {
			primary: '#7266ba',
			info: '#23b7e5',
			success: '#27c24c',
			warning: '#fad733',
			danger: '#f05050',
			light: '#e8eff0',
			dark: '#3a3f51',
			black: '#1c2b36'
		},
		settings: {
			themeID: 8,
			navbarHeaderColor: 'bg-info',//bg-black
			navbarCollapseColor: 'bg-info',
			asideColor: 'bg-light',
			headerFixed: true,
			asideFixed: true,
			asideFolded: false,
			asideDock: false,
			container: false
		}
	};
	$scope.selectItem = function (item) {
		console.log(item);
		if( item.ActionId){
			$scope.goto('/' + item.ActionId);
		}
		if(item.ActionName==="Home"){
			$scope.goto('/Welcome');
		}
	};
}]);
