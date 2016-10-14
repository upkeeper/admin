module upk {
    class AddComputerController {
        computer: Computer;
        hardwares: Hardware[];
        platforms: Platform[];

        assignments = [
            { value: 1, text: 'Disabled' },
            { value: 0, text: 'Normal' },
            { value: 2, text: 'Reinstall' },
            { value: 3, text: 'Reinstall from scratch' }
        ];

        static $inject = ['$location', 'computerService', 'hardwareService', 'platformService'];

        constructor(private $location: ng.ILocationService, private computerService: IComputerService,
            private hardwareService: IHardwareService, private platformService: IPlatformService) {
            hardwareService.getHardwares().then(res => this.hardwares = res.data);
            platformService.getPlatforms().then(res => this.platforms = res.data);
        }

        save() {
            this.computerService.addComputer(this.computer).then(() => this.$location.path('/Computers'));
        };
    }

    angular.module('Upkeeper')
        .controller('AddComputerController', AddComputerController);
}
