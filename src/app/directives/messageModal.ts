angular.module('Upkeeper')
    .directive('messageModal', () => {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            templateUrl: '../views/app/views/Home/MessageModal.html'
        }
    })