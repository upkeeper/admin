(function() {
    angular.module('Upkeeper')
        .controller('CodemirrorController', ['$scope', function($scope) {

            var codemirrorInstance = null;
            
            $scope.editorOptions = {
                mode: 'xml',
                htmlMode: true,
                lineWrapping: true,
                lineNumbers: true,
                //readOnly: 'nocursor',
                onLoad: function(_cm) {
                    var _doc = _cm.getDoc();
                    _cm.setOption('firstLineNumber', 1);
                    //_doc.markClean()
                    codemirrorInstance = _cm;

                }
            };

            $scope.cmModel = '';
        }]);
})();