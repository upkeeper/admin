angular.module("Upkeeper")
    .directive("paginationBar", function () {
        return {
            restrict: "E",
            scope: {
              createPermission: '=',
              createItem: '&'
                
            },
            controller: ['PermissionService', (PermissionService) => {
            }],
            template: `
            <div class="row">
                <div class="buttontoolbar">
                    <div class="btn-group">
                        <input class="btn btn-success" type="button" value="Create" ng-click="createItem()" ng-show="!PermissionService.HasPermission(createPermission)">
                    </div>
                    <dir-pagination-controls max-size="5" boundary-links="true">
                    </dir-pagination-controls>
                </div>
            </div>
            `
        }
    });