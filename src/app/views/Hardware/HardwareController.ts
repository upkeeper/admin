namespace upk {
    class HardwareController {
        searchbarvalue = "Hardware Name: ";
        hardwares: Array<Hardware>;

        static $inject: Array<string> = ['$location', 'hardwareService', 'PermissionService'];
        constructor(private $location: ng.ILocationService, private hardwareService: IHardwareService, private PermissionService: IPermissionService) {
            hardwareService.getHardwares().then(res => this.hardwares = res.data);
        }

        editHardware(hardware) {
            if (this.PermissionService.HasPermission('Hardware_View'))
                this.$location.path('/Hardware/' + hardware.Id);
        }

        create() {
            if (this.PermissionService.HasPermission('Hardware_Create_Edit'))
                this.$location.path('/Hardware/Create');
        }
    }
    angular.module('Upkeeper')
        .controller('HardwareController', HardwareController);
}

