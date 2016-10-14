angular.module("Upkeeper")
    .directive("rotateFlip", function () {
        var first = true;
        return {
            restrict: "A",
            scope: {
                flag: "=rotateFlip"
            },
            link: function (scope, element) {
                scope.$watch("flag", function () {
                    element.toggleClass("rotated", scope.flag);
                    first = false;
                });
            }
        }
    });