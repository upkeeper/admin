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
                        <input class="btn btn-danger" type="button" value="Delete" ng-click="deleteItems()" ng-show="!PermissionService.HasPermission(Application_Delete)">
                    </div>
                    <dir-pagination-controls max-size="5" boundary-links="true">
                    </dir-pagination-controls>
                </div>
            </div>
            `
        }
    });