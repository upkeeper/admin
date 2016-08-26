(function(){
	angular.module('Upkeeper')
	 .filter('aspDate', () => {
		return input => {
			if(input){
				return input;
			}
			else {
				return;
			}
		};
	});
})();