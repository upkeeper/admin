angular.module("Upkeeper")
    .directive("saveButton", () => {
        return {
            restrict: "E",
            scope: {
              deletePermission: '='  ,
              deleteItem: '&'
            },
            controller: ['PermissionService', (PermissionService) => {
                
            }],
            template: `
            <div class="row">
                <div class="col-xs-12">
                    <div class="buttontoolbar">
                        <div class="btn-group">
                            <input class="btn btn-success" type="submit" value="Save" ng-disabled="form.$invalid">
                            <input class="btn btn-danger" type="button" value="Delete" ng-click="deleteItem()" ng-disabled="PermissionService.HasPermission(deletePermission)">
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    });