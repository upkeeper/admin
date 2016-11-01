angular.module("Upkeeper")
    .directive("paginationBar", function () {
        return {
            restrict: "E",
            scope: {
                createPermission: '=',
                createItem: '&',
                deleteItems: '&'

            },
            controller: ['PermissionService', '$rootScope', (PermissionService, $rootScope) => { }],
            template: `
            <div class="row">
                <div class="buttontoolbar">
                    <div class="btn-group">
                        <input class="btn btn-success" type="button" value="Create" ng-click="createItem()" ng-show="!PermissionService.HasPermission(createPermission)">
                        <input class="btn btn-danger" type="button" value="Delete" data-toggle="modal" data-target="#promptMessage" ng-show="!PermissionService.HasPermission(Application_Delete)">
                    </div>
                    <dir-pagination-controls max-size="5" boundary-links="true">
                    </dir-pagination-controls>
                </div>
            </div>
            <div class="modal fade" id="promptMessage" tabindex="-1" role="dialog" aria-labelledby="promptMessage">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form id="dlgForm">
                            <div class="modal-header">
                                <button class="close" data-dissmiss="modal" aria-label="Close">
                                    <span aria-hidden="true">
                                    </span>
                                </button>
                                <h4 class="modal-title">
                                    Are you sure?
                                </h4>
                            </div>
                            <div class="modal-footer">
                                <input class="btn btn-danger" value="Delete" ng-click="deleteItems()" data-dismiss="modal">
                                <input class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <div>
                        </form>
                    </div>
                </div>
            </div>                
            `
        }
    });