namespace upk {
    class PlatformsController {
        searchbarvalue: string;
        platforms: Array<Platform>;

        static $inject = ['$location', 'platformService', 'PermissionService'];
        constructor(private $location: ng.ILocationService, private platformService: IPlatformService, private PermissionService: IPermissionService) {
            this.searchbarvalue = "Platform: ";
            platformService.getPlatforms().then(res => this.platforms = res.data);
        }

        editPlatform(platform: Platform) {
            if (this.PermissionService.HasPermission('Platform_Create_Edit'))
                this.$location.path('/Platforms/' + platform.Id);
        };

        create() {
            if (this.PermissionService.HasPermission('Platform_Create_Edit'))
                this.$location.path('/Platforms/Create');
        };


    }
    angular.module('Upkeeper')
        .controller('PlatformsController', PlatformsController);
}

